import React, { useState } from 'react';
import { useEnv } from '../../hooks/env.hook';
import './ListOfCategories.css';

const ListOfCategories = ({ categories, loadCategories }) => {
    const [search, setSearch] = useState('');
    const {appHost, apiPort} = useEnv();

    let all_categories = [];

    const deleteCategory = (id) => {
        // make a DELETE request to the "http://127.0.0.1:8080/api/v1/categories/delete_category/{category_id}" endpoint
        fetch(`${appHost}${apiPort}/api/v1/categories/delete_category/${id}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.status !== 204) {
                    throw new Error();
                }
                loadCategories();
                alert("Категория удалена");
            })
            .catch(e => { alert("Произошла ошибка") });
    }

    if (categories.length > 0) {
        all_categories = categories.map((category) => {
            if (category.name.toLowerCase().includes(search.toLowerCase()))
                return (
                    <li className="category-card" key={category.id}>
                        <div className="category-card__name"><span>Название: </span>{category.name}</div>
                        <button className="category-card__delete-button" onClick={() => deleteCategory(category.id)}>Удалить категорию</button>
                    </li>
                )
        })

        all_categories = all_categories.filter((category) => {
            return category !== undefined
        })
    }

    return (
        <div className="list-of-categories">
            <h1 className="list-of-categories__title">Список категорий</h1>
            <div className="list-of-categories__search-bar">
                <input
                    type="text"
                    placeholder="Поиск по названию категории"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)} />
            </div>
            <ul className="list-of-categories__list">
                {all_categories.length > 0 ? all_categories : <div className="list-of-categories__empty">Категории не найдены!</div>}
            </ul>
        </div>
    )
}

export default ListOfCategories;
