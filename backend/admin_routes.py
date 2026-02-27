from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import jwt
import os

router = APIRouter(prefix="/api/admin")
security = HTTPBearer()

SECRET_KEY = os.environ.get('JWT_SECRET_KEY', 'your-secret-key-change-in-production')

# Modelos
class LoginRequest(BaseModel):
    username: str
    password: str

class DonationCreate(BaseModel):
    value: float
    pix_code: str

class DonationUpdate(BaseModel):
    copied: bool

class PixKeyUpdate(BaseModel):
    pix_key: str

# Credenciais fixas
ADMIN_USERNAME = "donas"
ADMIN_PASSWORD = "Seinao10@@"

# Função para verificar token
def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        token = credentials.credentials
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return payload
    except:
        raise HTTPException(status_code=401, detail="Token inválido ou expirado")

# Login
@router.post("/login")
async def login(request: LoginRequest):
    if request.username == ADMIN_USERNAME and request.password == ADMIN_PASSWORD:
        token = jwt.encode({"username": request.username}, SECRET_KEY, algorithm="HS256")
        return {"token": token, "username": request.username}
    raise HTTPException(status_code=401, detail="Credenciais inválidas")

# Listar todas as doações
@router.get("/donations")
async def get_donations(user = Depends(verify_token), db = Depends(lambda: db)):
    donations = await db.donations.find().sort("created_at", -1).to_list(1000)
    return donations

# Criar nova doação
@router.post("/donations")
async def create_donation(donation: DonationCreate, db = Depends(lambda: db)):
    donation_dict = {
        "value": donation.value,
        "pix_code": donation.pix_code,
        "copied": False,
        "created_at": datetime.utcnow().isoformat()
    }
    result = await db.donations.insert_one(donation_dict)
    donation_dict["_id"] = str(result.inserted_id)
    return donation_dict

# Marcar doação como copiada
@router.patch("/donations/{donation_id}")
async def update_donation(donation_id: str, update: DonationUpdate, user = Depends(verify_token), db = Depends(lambda: db)):
    await db.donations.update_one(
        {"_id": donation_id},
        {"$set": {"copied": update.copied}}
    )
    return {"message": "Doação atualizada"}

# Obter configurações (chave PIX)
@router.get("/config")
async def get_config(user = Depends(verify_token), db = Depends(lambda: db)):
    config = await db.config.find_one({"key": "pix_key"})
    if not config:
        return {"pix_key": ""}
    return {"pix_key": config.get("value", "")}

# Atualizar chave PIX
@router.put("/config/pix-key")
async def update_pix_key(data: PixKeyUpdate, user = Depends(verify_token), db = Depends(lambda: db)):
    await db.config.update_one(
        {"key": "pix_key"},
        {"$set": {"value": data.pix_key}},
        upsert=True
    )
    return {"message": "Chave PIX atualizada"}

# Obter estatísticas
@router.get("/stats")
async def get_stats(user = Depends(verify_token), db = Depends(lambda: db)):
    donations = await db.donations.find().to_list(1000)
    total = sum(d.get("value", 0) for d in donations)
    copied_count = sum(1 for d in donations if d.get("copied", False))
    
    return {
        "total_value": total,
        "total_donations": len(donations),
        "copied_count": copied_count
    }
