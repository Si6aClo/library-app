from aiosqlite import Connection

from fastapi import APIRouter, Body, Depends, HTTPException, Path
from starlette import status

from db import get_cursor
from schemas.get_categories import AllCategoriesResponse, Category
from schemas.insert_category import CreateCategoryResponse, CreateCategoryRequest
from schemas.update_category import UpdateCategoryResponse

api_router = APIRouter(tags=["Library"])


@api_router.get(
    "/categories/get_categories",
    response_model=AllCategoriesResponse,
    status_code=status.HTTP_200_OK,
)
async def get_categories(cursor: Connection = Depends(get_cursor), ):
    all_categories = AllCategoriesResponse(categories=list())
    res = await cursor.execute("SELECT * FROM category")
    all_categories_data = await res.fetchall()
    for item in all_categories_data:
        category = Category(id=item[0], name=item[1])
        all_categories.categories.append(category)
    await cursor.close()
    return all_categories


@api_router.post(
    "/categories/insert_category",
    response_model=CreateCategoryResponse,
    status_code=status.HTTP_200_OK,
)
async def insert_category(model: CreateCategoryRequest = Body(..., example={"name": "example"}),
                          cursor: Connection = Depends(get_cursor), ):
    if model.name == "":
        raise HTTPException(status_code=400, detail="Category can't be empty string.")
    res = await cursor.execute("SELECT id FROM category WHERE name = ?", (model.name,))
    res = await res.fetchone()
    if res is not None:
        raise HTTPException(status_code=400, detail="Category already exists.")
    await cursor.execute("INSERT INTO category (name) VALUES (?)", (model.name,))
    await cursor.commit()
    await cursor.close()
    return CreateCategoryResponse()


@api_router.put(
    "/categories/update_category/{category_id}",
    response_model=UpdateCategoryResponse,
    status_code=status.HTTP_200_OK,
)
async def update_category(category_id: int = Path(...), cursor: Connection = Depends(get_cursor),
                          model: CreateCategoryRequest = Body(..., example={"name": "example"})):
    res = await cursor.execute("SELECT * FROM category WHERE id = ?", (category_id,))
    res = await res.fetchone()
    if res is None:
        raise HTTPException(status_code=404, detail="Category does not exists.")

    await cursor.execute("UPDATE category SET name = ? WHERE id = ?", (model.name, category_id,))
    await cursor.commit()
    await cursor.close()
    return UpdateCategoryResponse()


@api_router.delete(
    "/categories/delete_category/{category_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
async def delete_category(cursor: Connection = Depends(get_cursor), category_id: int = Path(...)):
    await cursor.execute("PRAGMA foreign_keys = ON")
    await cursor.execute("DELETE FROM category WHERE id = ?", (category_id,))
    await cursor.commit()
    await cursor.close()
