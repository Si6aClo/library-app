from pydantic import BaseModel, Field


class Category(BaseModel):
    id: int = Field(title="Id of category")
    name: str = Field(title="Name of category")


class AllCategoriesResponse(BaseModel):
    categories: list[Category] = Field(title="List of categories")
