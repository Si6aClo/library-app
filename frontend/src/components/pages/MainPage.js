import React, { useState, useEffect } from "react";

import BookForm from "../bookForm/BookForm";
import ListOfBooks from "../listOfBooks/ListOfBooks";
import './MainPage.css';

const MainPage = () => {
    const [books, setBooks] = useState([])
    useEffect(() => {
        loadBooks();
    }, [])

    const loadBooks = () => {
        // make a GET request to the 127.0.0.1:8080/api/v1/books/get_all_books endpoint
        fetch('http://127.0.0.1:8080/api/v1/books/get_all_books', {
            method: 'GET'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error();
                }
                return response.json()
            })
            .then(data => {
                setBooks(data.books);
            })
            .catch(e => { console.log(e) });
    }

    return (
        <div className="main-page">
            <h1 className="main-page__title">Книги</h1>
            <BookForm loadBooks={loadBooks}/>
            <ListOfBooks books={books} loadBooks={loadBooks}/>
        </div>
    )
}

export default MainPage;


