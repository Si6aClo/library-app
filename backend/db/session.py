from aiosqlite import connect, Connection
from config import get_settings


async def get_cursor() -> Connection:
    engine = await connect(get_settings().SQLITE_PATH)
    return engine


__all__ = [
    "get_cursor",
]
