import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ListOfBooks.css';

const ListOfBooks = ({books, loadBooks}) => {
    const [search, setSearch] = useState('')

    const deleteBook = (id) => {
        // make a DELETE request to the 'http://127.0.0.1:8080/api/v1/books/delete_book/${bookId}' endpoint
        fetch(`http://0.0.0.0:5000/api/v1/books/delete_book/${id}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.status !== 204) {
                    throw new Error();
                }
                loadBooks();
                alert("Книга удалена");
            })
            .catch(e => { console.log(e) });
    }

    let all_books = [];

    if (books.length > 0) {
        let i = 0;
        all_books = books.map((book) => {
            i++;
            if (book.name.toLowerCase().includes(search.toLowerCase()))
            return (
                <li className="book-card" key={i}>
                    <Link to={'' + book.id}>
                        <div className="book-card__title"><span>Название: </span>{book.name}</div>
                        <div className="book-card__author"><span>Автор: </span>{book.author}</div>
                        <div className="book-card__category"><span>Категория: </span>{book.category}</div>
                        <div className="book-card__count"><span>Количество: </span>{book.count}</div>
                    </Link>

                    <button className="book-card__delete-button" onClick={() => deleteBook(book.id)}>Удалить книгу</button>
                </li>
            )
        })

        all_books = all_books.filter((book) => {
            return book !== undefined
        })
    }

    return (
        <div className="list-of-books">
            <h1 className="list-of-books__title">Список книг</h1>
            <div className="list-of-books__search-bar">
                <input
                    type="text" 
                    placeholder="Поиск по названию книги" 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)}/>
            </div>
            <ul className="list-of-books__list">
                {all_books.length > 0 ? all_books : <div className="list-of-books__empty">Книги не найдены!</div>}
            </ul>
        </div>
    )
}

export default ListOfBooks;