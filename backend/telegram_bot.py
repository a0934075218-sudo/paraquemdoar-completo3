"""
Módulo de notificações via Telegram Bot API.
Envia mensagens quando doações são geradas ou códigos PIX são copiados.
"""
import os
import httpx
from datetime import datetime, timezone

BOT_TOKEN = None

def _get_token():
    global BOT_TOKEN
    if BOT_TOKEN is None:
        BOT_TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN", "")
    return BOT_TOKEN

db = None

def set_db(database):
    global db
    db = database


async def get_chat_id():
    if not db:
        return None
    config = await db.config.find_one({"key": "telegram_chat_id"}, {"_id": 0})
    if config and config.get("value"):
        return config["value"]
    return None


async def send_message(text: str):
    token = _get_token()
    if not token:
        return
    chat_id = await get_chat_id()
    if not chat_id:
        return
    try:
        async with httpx.AsyncClient() as client:
            await client.post(
                f"https://api.telegram.org/bot{token}/sendMessage",
                json={
                    "chat_id": chat_id,
                    "text": text,
                    "parse_mode": "HTML",
                },
                timeout=10,
            )
    except Exception as e:
        print(f"Erro ao enviar Telegram: {e}")


def _format_now():
    now = datetime.now(timezone.utc)
    # Converter para horário de Brasília (UTC-3)
    from datetime import timedelta
    br_time = now - timedelta(hours=3)
    return br_time.strftime("%d/%m/%Y %H:%M:%S")


async def notify_donation_created(value: float, donor_name: str, device: str):
    nome = donor_name if donor_name else "Anônimo"
    data = _format_now()
    text = (
        f"\U0001F7E2 <b>NOVO PIX GERADO! (Para Quem Doar)</b>\n"
        f"━━━━━━━━━━━━━━━━━\n"
        f"\U0001F464 Usuário: {nome}\n"
        f"\U0001F4B0 Valor: <b>R$ {value:,.2f}</b>\n"
        f"\U0001F4C5 Data: {data}\n"
        f"\U0001F4CA Status: \u23F3 Gerado"
    )
    await send_message(text)


async def notify_donation_copied(value: float, donor_name: str):
    nome = donor_name if donor_name else "Anônimo"
    data = _format_now()
    text = (
        f"\U0001F7E2 <b>PIX COPIADO! (Para Quem Doar)</b>\n"
        f"━━━━━━━━━━━━━━━━━\n"
        f"\U0001F464 Usuário: {nome}\n"
        f"\U0001F4B0 Valor: <b>R$ {value:,.2f}</b>\n"
        f"\U0001F4C5 Data: {data}\n"
        f"\U0001F4CA Status: \u2705 Copiado"
    )
    await send_message(text)
