import React, { useState } from 'react';
import './CategoryForm.css';

const CategoryForm = ({ loadCategories }) => {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://0.0.0.0:5000/api/v1/categories/insert_category", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name
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
                setName('');
                loadCategories();
            })
            .catch(e => { setMessage("Такая категория уже есть") });
    }

    return (
        <form className="category-form" onSubmit={handleSubmit}>
            <div className="category-form__field">
                <label htmlFor="name">Название</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => { setName(e.target.value); setMessage(''); }}
                />
            </div>
            <button className="category-form__submit" type="submit">Добавить</button>
            <div className="category-form__message">{message}</div>
        </form>
    )
}

export default CategoryForm;