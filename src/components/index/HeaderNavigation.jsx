import './HeaderNavigation.css';

function HeaderNavigation() {
    return (
        <div className="HeaderNavigation">
            <input type="text" placeholder="Введите автора или книгу" />
            <i className="fa fa-search"></i>
            <a>Библиотека</a>
            <a>Контакт</a>
            <a>Зарегистрироваться</a>    
        </div>   
    );
}

export default HeaderNavigation;