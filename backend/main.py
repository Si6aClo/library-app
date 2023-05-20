from logging import getLogger

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from uvicorn import run

from config import DefaultSettings
from config.utils import get_settings
from endpoints import list_of_routes
from utils.common import get_hostname

logger = getLogger(__name__)


def bind_routes(application: FastAPI, setting: DefaultSettings) -> None:
    """
    Bind all routes to application.
    """
    for route in list_of_routes:
        application.include_router(route, prefix=setting.PATH_PREFIX)


def get_app() -> FastAPI:
    """
    Creates application and all dependable objects.
    """
    description = "API для церковной библиотеки."

    tags_metadata = [
        {
            "name": "Library",
            "description": "Manage Library books and categories.",
        },
        {
            "name": "Health check",
            "description": "API health check.",
        },
        {
            "name": "Email sender",
            "description": "Send db in email.",
        },
    ]

    application = FastAPI(
        title="Library API",
        description=description,
        docs_url="/swagger",
        openapi_url="/openapi",
        version="1.0.0",
        openapi_tags=tags_metadata,
    )
    settings = get_settings()
    bind_routes(application, settings)
    application.state.settings = settings

    origins = [
        "http://localhost:3000",
        "localhost:3000"
    ]

    application.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"]
    )

    return application


app = get_app()

if __name__ == "__main__":  # pragma: no cover
    settings_for_application = get_settings()
    run(
        "main:app",
        host=get_hostname(settings_for_application.APP_HOST),
        port=settings_for_application.APP_PORT,
    )
