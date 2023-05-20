from pydantic import BaseModel, Field


class UpdateBookRequest(BaseModel):
    name: str = Field(title="Name of book")
    description: str = Field(title="Description of book")
    author: str = Field(title="Author of book")
    category: str = Field(title="Name of category")
    count: int = Field(title="Count of book")

class UpdateBookResponse(BaseModel):
    detail: str = Field(title="Detail of operation", default="Book has been updated.")
