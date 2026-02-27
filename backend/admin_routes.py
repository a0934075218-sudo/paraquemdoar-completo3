from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from datetime import datetime, timezone
import jwt
import os

router = APIRouter(prefix="/api/admin")
security = HTTPBearer()

SECRET_KEY = os.environ.get('JWT_SECRET_KEY', 'doar-brasil-secret-key-2026')

# Reference to db - set by server.py
db = None

def set_db(database):
    global db
    db = database

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

@router.post("/donations")
async def create_donation(donation: DonationCreate):
    donation_dict = {
        "donation_id": str(int(datetime.now(timezone.utc).timestamp() * 1000)),
        "value": donation.value,
        "pix_code": donation.pix_code,
        "copied": False,
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    await db.donations.insert_one(donation_dict)
    return {
        "donation_id": donation_dict["donation_id"],
        "value": donation_dict["value"],
        "pix_code": donation_dict["pix_code"],
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
    return {"message": "Doacao atualizada"}

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
