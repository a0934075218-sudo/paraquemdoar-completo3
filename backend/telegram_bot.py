"""
Módulo de notificações via Telegram Bot API.
Envia mensagens quando doações são geradas ou códigos PIX são copiados.
"""
import os
import httpx

BOT_TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN", "")
BASE_URL = f"https://api.telegram.org/bot{BOT_TOKEN}"

# Reference to db - set by server.py
db = None

def set_db(database):
    global db
    db = database


async def get_chat_id():
    """Busca o chat_id configurado no banco."""
    if not db:
        return None
    config = await db.config.find_one({"key": "telegram_chat_id"}, {"_id": 0})
    if config and config.get("value"):
        return config["value"]
    return None


async def send_message(text: str):
    """Envia mensagem para o grupo configurado no Telegram."""
    if not BOT_TOKEN:
        return
    chat_id = await get_chat_id()
    if not chat_id:
        return
    try:
        async with httpx.AsyncClient() as client:
            await client.post(
                f"{BASE_URL}/sendMessage",
                json={
                    "chat_id": chat_id,
                    "text": text,
                    "parse_mode": "HTML",
                },
                timeout=10,
            )
    except Exception as e:
        print(f"Erro ao enviar Telegram: {e}")


async def notify_donation_created(value: float, donor_name: str, device: str):
    """Notifica quando uma nova doação PIX é gerada."""
    nome = donor_name if donor_name else "Anônimo"
    dispositivo = device if device else "Desconhecido"
    text = (
        f"🟢 <b>Nova doação PIX gerada!</b>\n\n"
        f"💰 Valor: <b>R$ {value:,.2f}</b>\n"
        f"👤 Doador: {nome}\n"
        f"📱 Dispositivo: {dispositivo}\n"
        f"📋 Status: <i>Gerado</i>"
    )
    await send_message(text)


async def notify_donation_copied(value: float, donor_name: str):
    """Notifica quando o código PIX é copiado."""
    nome = donor_name if donor_name else "Anônimo"
    text = (
        f"📋 <b>Código PIX copiado!</b>\n\n"
        f"💰 Valor: <b>R$ {value:,.2f}</b>\n"
        f"👤 Doador: {nome}\n"
        f"✅ Status: <i>Copiado</i>"
    )
    await send_message(text)
