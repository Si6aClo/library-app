import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './SingleBookPage.css';


const SingleBookPage = () => {
    const { bookId } = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [author, setAuthor] = useState('');
    const [category, setCategory] = useState('');
    const [count, setCount] = useState(0);

    const [message, setMessage] = useState('');
    const [categories, setCategories] = useState([])

    useEffect(() => {
        loadBook();
        loadCategories();
    }, [])

    const loadBook = () => {
        // make a GET request to the "http://127.0.0.1:8080/api/v1/books/get_book/${bookId}"
        // endpoint and set the book state to the response
        fetch(`http://127.0.0.1:8080/api/v1/books/get_book/${bookId}`, {
            method: 'GET'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error();
                }
                return response.json()
            })
            .then(data => {
                setTitle(data.name);
                setDescription(data.description);
                setAuthor(data.author);
                setCategory(data.category);
                setCount(data.count);
            })
            .catch(e => { console.log(e) });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // make a PUT request to the `http://127.0.0.1:8080/api/v1/books/update_book/${bookId}`
        // endpoint with the data from the form
        fetch(`http://127.0.0.1:8080/api/v1/books/update_book/${bookId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: title,
                description: description,
                author: author,
                category: category,
                count: count
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
            })
            .catch(e => setMessage("Something went wrong!"));
    }

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

    return (
        <div className="container">
            <h1 className='update-title'>Обновить Книгу</h1>
            <form onSubmit={handleSubmit} className='book-update-form'>
                <div className="book-update-form__field">
                    <label htmlFor="title">Название</label>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        className="form-control"
                        id="title"
                        placeholder="Enter title"
                    />
                </div>
                <div className="book-update-form__field">
                    <label htmlFor="description">Описание</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        type="text"
                        className="form-control"
                        id="description"
                        placeholder="Enter description"
                    />
                </div>
                <div className="book-update-form__field">
                    <label htmlFor="author">Автор</label>
                    <input
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        type="text"
                        className="form-control"
                        id="author"
                        placeholder="Enter author"
                    />
                </div>
                <div className="book-update-form__field">
                    <label htmlFor="category">Категория</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="form-control"
                        id="category"
                    >
                        {categories.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </select>
                </div>
                <div className="book-update-form__field">
                    <label htmlFor="count">Количество</label>
                    <div>
                        <button
                            id='minus'
                            onClick={() => setCount(Number(count) - 1)}
                            type="button"
                            className="btn btn-primary"
                        >
                            -
                        </button>
                        <input
                            value={count}
                            onChange={(e) => setCount(e.target.value)}
                            type="number"
                            className="form-control"
                            id="count"
                            placeholder="Enter count"
                        />
                        <button
                            id='plus'
                            onClick={() => setCount(Number(count) + 1)}
                            type="button"
                            className="btn btn-primary"
                        >
                            +
                        </button>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Сохранить</button>
            </form>
            <p id="update-message">{message}</p>
        </div>
    );
}

export default SingleBookPage;