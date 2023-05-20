from pydantic import BaseModel, Field


class UpdateCategoryResponse(BaseModel):
    detail: str = Field(title="Detail of operation", default="Category has been updated.")