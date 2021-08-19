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
            
            <NavLink to="/" activeClassName="SActivated">На главную</NavLink>
            <NavLink to="/search" activeClassName="SActivated">Найти книгу</NavLink>
            <NavLink to="/genres/100" activeClassName="SActivated">Библиотека</NavLink>
            <NavLink to="/choice" activeClassName="SActivated">Закладки</NavLink>
            <NavLink onClick={(token['vvelToken']) ? test : null} 
                    to={ (token['vvelToken']) ? '/' : '/login'} activeClassName="SActivated">
                    { (token['vvelToken']) ? 'Выйти' : 'Войти'}
            </NavLink> 
        </div>   
    );
}

export default HeaderNavigation;