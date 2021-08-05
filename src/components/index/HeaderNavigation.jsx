import './HeaderNavigation.css';
import { NavLink } from 'react-router-dom';
import {useCookies} from 'react-cookie';
import {useState} from 'react';

function HeaderNavigation() {
    const [token, setToken, removeToken] = useCookies(['vvelToken']);

    const test = () => {
        console.log('here')
        removeToken(['vvelToken'])
    }
    return (
        <div className="HeaderNavigation">
            <input type="text" placeholder="Введите автора или книгу" />
            <i className="fa fa-search"></i>  
            <NavLink to="/search2" activeClassName="SActivated">Найти книгу</NavLink>
            <NavLink to="/genres" activeClassName="SActivated">Библиотека</NavLink>
            <NavLink onClick={(token['vvelToken']) ? test : null} 
                    to={ (token['vvelToken']) ? '/' : '/login2'} activeClassName="SActivated">
                    { (token['vvelToken']) ? 'Выйти' : 'Войти'}
            </NavLink> 
        </div>   
    );
}

export default HeaderNavigation;