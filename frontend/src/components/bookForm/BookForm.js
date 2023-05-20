// form for adding a book to the database and displaying the form
// form includes title, description, author, category and a submit button

import React, { useEffect, useState } from 'react';
import './BookForm.css';

const BookForm = ({loadBooks}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [author, setAuthor] = useState('');
    const [category, setCategory] = useState('');
    const [message, setMessage] = useState('');

    const [categories, setCategories] = useState([])

    useEffect(() => {
        loadCategories();
    }, [])

    const loadCategories = () => {
        // make a GET request to the "http://127.0.0.1:8080/api/v1/categories/get_categories"
        // endpoint and set the categories state to the response
        fetch("http://127.0.0.1:8080/api/v1/categories/get_categories", {
            method: 'GET'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error();
                }
                return response.json()
            })
            .then(data => {
                setCategories(data.categories.map(category => category.name));
            })
            .catch(e => { console.log(e) });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // make a POST request to the 127.0.0.1:8080/api/v1/books/insert_book endpoint
        // with the data from the form
        fetch('http://127.0.0.1:8080/api/v1/books/insert_book', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: title,
                description: description,
                author: author,
                category: category
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error();
                }
                return response.json()
            })
            .then(data => {
                setMessage(data.detail);
                setTitle('');
                setDescription('');
                setAuthor('');
                setCategory('');
                loadBooks();
            })
            .catch(e => {setMessage("Такая книга уже есть или автор не найден")});
    }

    return (
        <form className="book-form" onSubmit={handleSubmit}>
            <div className="book-form__field">
                <label htmlFor="title">Название</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => {setTitle(e.target.value); setMessage('');}}
                />
            </div>
            <div className="book-form__field">
                <label htmlFor="author">Автор</label>
                <input
                    type="text"
                    id="author"
                    value={author}
                    onChange={(e) => {setAuthor(e.target.value); setMessage('');}}
                />
            </div>
            <div className="book-form__field">
                <label htmlFor="category">Категория</label>
                <select
                    id="category"
                    value={category}
                    onChange={(e) => {setCategory(e.target.value); setMessage('');}}
                >
                    <option value="" disabled>Выберите категорию</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                    ))}
                </select>
            </div>
            <div className="book-form__field" id="description-field">
                <label htmlFor="description">Описание</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => {setDescription(e.target.value); setMessage('');}}
                />
            </div>
            <button type="submit" onClick={handleSubmit}>Добавить</button>
            <div className="book-form__message">{message}</div>
        </form>
    )
}

export default BookForm;