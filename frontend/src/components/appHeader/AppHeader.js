import { Link, NavLink } from 'react-router-dom';
import './AppHeader.css';

const AppHeader = () => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                <Link to={'/'}>
                    <span>Библиотека</span> Балашихинской церкви
                </Link>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li><NavLink
                        to={'/'}
                        style={({ isActive }) => ({ color: isActive ? '#9F0013' : 'inherit' })}
                    >Книги</NavLink></li>
                    <li><NavLink
                        to={'/categories'}
                        style={({ isActive }) => ({ color: isActive ? '#9F0013' : 'inherit' })}
                    >Категории</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;