from pydantic import BaseModel, Field


class CreateCategoryRequest(BaseModel):
    name: str = Field(title="Name of category")


class CreateCategoryResponse(BaseModel):
    detail: str = Field(title="Detail of operation", default="Category has been added.")
