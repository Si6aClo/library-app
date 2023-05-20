from aiosqlite import Connection

from fastapi import APIRouter, Body, Depends, HTTPException, Path
from starlette import status

from db import get_cursor
from schemas.get_book import BookInfoResponse, AllBooksResponse, Book
from schemas.insert_book import CreateBookResponse, CreateBookRequest
from schemas.update_book import UpdateBookResponse, UpdateBookRequest

api_router = APIRouter(tags=["Library"])


@api_router.get(
    "/books/get_book/{book_id}",
    response_model=BookInfoResponse,
    status_code=status.HTTP_200_OK,
)
async def get_book(book_id: int = Path(...), cursor: Connection = Depends(get_cursor), ):
    res = await cursor.execute("SELECT * FROM book WHERE id = ?", (book_id,))
    res = await res.fetchone()
    if res is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Book with this name not exists.",
        )

    category_id = res[1]
    category_res = await cursor.execute("SELECT name FROM category WHERE id = ?", (category_id,))
    category_name = await category_res.fetchone()
    if category_name is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Бро у тебя нет такой категории у книги, ищи ошибки"
        )

    await cursor.close()
    return BookInfoResponse(
        name=res[2],
        description=res[3],
        author=res[4],
        category=category_name[0],
        count=res[5]
    )


@api_router.get(
    "/books/get_all_books",
    response_model=AllBooksResponse,
    status_code=status.HTTP_200_OK,
)
async def get_all_books(cursor: Connection = Depends(get_cursor), ):
    all_books = AllBooksResponse(books=list())
    res = await cursor.execute("SELECT * FROM book")
    res = await res.fetchall()
    for item in res:
        res_category = await cursor.execute("SELECT name FROM category WHERE id = ?", (item[1],))
        res_category = await res_category.fetchone()
        category_name = res_category[0]
        book = Book(
            id=item[0],
            name=item[2],
            description=item[3],
            author=item[4],
            category=category_name,
            count=item[5]
        )
        all_books.books.append(book)

    await cursor.close()
    return all_books


@api_router.post(
    "/books/insert_book",
    response_model=CreateBookResponse,
    status_code=status.HTTP_200_OK,
)
async def insert_book(
        model: CreateBookRequest = Body(..., example={
            "name": "example",
            "description": "example",
            "author": "example",
            "category": "example"
        }),
        cursor: Connection = Depends(get_cursor), ):
    if model.name == "":
        raise HTTPException(status_code=400, detail="Book name can't be empty.")

    res = await cursor.execute("SELECT id FROM category WHERE name = ?", (model.category,))
    category_id = await res.fetchone()
    if category_id is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Category with this name does not exists."
        )

    await cursor.execute("INSERT INTO book (category_id, name, description, author, count) VALUES (?, ?, ?, ?, 1)",
                         (category_id[0], model.name, model.description, model.author,))
    await cursor.commit()
    await cursor.close()
    return CreateBookResponse()


@api_router.put(
    "/books/update_book/{book_id}",
    response_model=UpdateBookResponse,
    status_code=status.HTTP_200_OK,
)
async def update_book(book_id: int = Path(...),
                      model: UpdateBookRequest =
                      Body(..., example={
                          "name": "example",
                          "description": "example",
                          "author": "example",
                          "category": "example",
                          "count": 0
                      }),
                      cursor: Connection = Depends(get_cursor), ):
    if model.name == "":
        raise HTTPException(status_code=400, detail="Book name can't be empty.")
    res = await cursor.execute("SELECT * FROM book WHERE id = ?", (book_id,))
    res = await res.fetchone()
    if res is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Book with this id does not exists."
        )

    res = await cursor.execute("SELECT id FROM category WHERE name = ?", (model.category,))
    category_id = await res.fetchone()
    if category_id is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Category with this name does not exists."
        )
    await cursor.execute(
        "UPDATE book SET category_id = ?, name = ?, description = ?, author = ?, count = ? WHERE id = ?",
        (category_id[0], model.name, model.description, model.author, model.count, book_id,))
    await cursor.commit()
    await cursor.close()
    return UpdateBookResponse()


@api_router.delete(
    "/books/delete_book/{book_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
async def delete_book(book_id: int = Path(...), cursor: Connection = Depends(get_cursor), ):
    await cursor.execute("DELETE FROM book WHERE id = ?", (book_id,))
    await cursor.commit()
    await cursor.close()
