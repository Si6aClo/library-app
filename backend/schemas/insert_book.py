from pydantic import BaseModel, Field


class CreateBookRequest(BaseModel):
    name: str = Field(title="Name of book")
    description: str = Field(title="Description of book")
    author: str = Field(title="Author of book")
    category: str = Field(title="Name of category")


class CreateBookResponse(BaseModel):
    detail: str = Field(title="Detail of operation", default="Книга была добавлена успешно.")
