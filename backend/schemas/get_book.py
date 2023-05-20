from pydantic import BaseModel, Field


class BookInfoResponse(BaseModel):
    name: str = Field(title="Name of book")
    description: str = Field(title="Description of book")
    author: str = Field(title="Author of book")
    category: str = Field(title="Name of category")
    count: int = Field(title="Count of book")

class Book(BaseModel):
    id: int = Field(title="Id of book")
    name: str = Field(title="Name of book")
    description: str = Field(title="Description of book")
    author: str = Field(title="Author of book")
    category: str = Field(title="Name of category")
    count: int = Field(title="Count of book")

class AllBooksResponse(BaseModel):
    books: list[Book] = Field(title="List of all books")