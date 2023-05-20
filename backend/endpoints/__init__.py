from endpoints.health_check import api_router as health_check_router
from endpoints.email_sender import api_router as email_sender_router
from endpoints.book_handlers import api_router as books_router
from endpoints.caregory_handlers import api_router as category_router

list_of_routes = [
    health_check_router,
    email_sender_router,
    books_router,
    category_router,
]

__all__ = [
    "list_of_routes",
]
