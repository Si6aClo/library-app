import React, { useState, useEffect } from 'react';
import './CategoriesPage.css';
import CategoryForm from '../categoryForm/CategoryForm';
import ListOfCategories from '../listOfCategories/ListOfCategories';

const CategoriesPage = () => {
    const [categories, setCategories] = useState([])
    useEffect(() => {
        loadCategories();
    }, [])

    const loadCategories = () => {
        // make a GET request to the 127.0.0.1:8080/api/v1/categories/get_categories endpoint
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
                setCategories(data.categories);
            })
            .catch(e => { console.log(e) });
    }

    const sendEmail = () => {
        // make a GET request to the 127.0.0.1:8080/api/v1/email_send/send endpoint
        fetch("http://127.0.0.1:8080/api/v1/email_send/send", {
            method: 'POST'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error();
                }
                return response.json()
            })
            .then(data => {
                alert("Данные отправлены на почту");
            })
            .catch(e => { alert("Произошла ошибка") });
        }
    return (
        <div className="categories-page">
            <h1 className="categories-page__title">Категории</h1>
            <CategoryForm loadCategories={loadCategories}/>
            <ListOfCategories categories={categories} loadCategories={loadCategories}/>
            <button className='categories-page__send-email' onClick={sendEmail}>Отправить данные по почте</button>
        </div>
    )
}


export default CategoriesPage;