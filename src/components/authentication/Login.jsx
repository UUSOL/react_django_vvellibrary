import React, {useState, useEffect} from 'react';
import {useCookies} from 'react-cookie';
import {useHistory} from 'react-router-dom';
import './Login.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState([]);
    const [token, setToken] = useCookies(['vvelToken']);
    const [csrftoken] = useCookies(['csrftoken'])
    const history = useHistory();

    useEffect(() => {
        if(token['vvelToken']) {
            history.goBack();
        }
    }, [token]);


    const isEligableFromFrontEnd = () => {
        const errors = []
        if (!username || !password || !confirm || !email) {
            errors.push('Заполните, пожалуйста, все поля.')
        }
        if(username && !/^[\d\w-_]+$/.test(username)) {
            errors.push('Имя пользователя может содержать только буквы, цифры, тире и нижнее подчеркивание.')
        }
        if(password !== confirm) {
            errors.push('Пароли не совпадают.')
        }
        if(password.lenth < 8) {
            errors.push('Пароль слишком короткий. Введите минимум 8 символов.')
        }
        if(email && (/__{1,}/.test(email) || !/@/.test(email) || email.match(/@/g).length > 1)) {
            errors.push('Введите корректный адрес электронной почты.');
        }
        if (errors.length) {
            setError(errors)
        }
        return errors.length === 0;
    }

    const IsEligableFromBackend = (response) => {
        // from backend error come in form {field: ['error message']}
        if (!Array.isArray(response.username) && 
            !Array.isArray(response.password) && 
            !Array.isArray(response.email)) {
                return true;
        }

        const errors = [];
        if (response.username) {
            const usernameErrorFromBackend = response.username[0];
            switch(usernameErrorFromBackend) {
                case 'A user with that username already exists.':
                    errors.push('Пользователь с таким именем уже существует.');
                    break;
                case 'This field may not be blank.':
                    errors.push('Имя Пользователя не может быть пустым.');
                    break;
                default:
                    errors.push(...response.username);
            }  
        }

        if (response.email) {
            const emailErrorFromBackend = response.email[0];
            switch(emailErrorFromBackend) {
                case 'user with this email address already exists.':
                    errors.push('Пользователь с таким адресом электронной почты уже существует.');
                    break;
                case 'This field may not be blank.':
                    errors.push('Поле email не может быть пустым.');
                    break;
                case 'Enter a valid email address.':
                    errors.push('Введите корректный адрес электронной почты.')
                    break;
                default:
                    errors.push(...response.email);
            }  
        }
        if (response.password) {
            errors.push(...response.password);
        }

        setError(errors);
        return false;
    }


    const login = (body) => {
        if (!username || !password) {
            setError(['Заполните, пожалуйста, все поля']);
            return;
        }

        //const stringToFetch = 'http://127.0.0.1:8000/auth/';
        let stringToFetch = 'https://vvelonlinelibrary.herokuapp.com/auth/';
        fetch(stringToFetch, {
            'method': 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken['csrftoken']
            },
            body: JSON.stringify({username, password})
        })
        .then(response => response.json())
        .then(response => {  
            return (response.token) ? setToken('vvelToken', response.token) :  setError(['Пользователь с такими данными не найден.'])
        })
        .catch(error => setError(['Извините. Что-то пошло не так.']));
    }

    const signup = (body) => {
        if (isEligableFromFrontEnd()) {

            //fetch('http://127.0.0.1:8000/api/users/', {
            fetch('https://vvelonlinelibrary.herokuapp.com/api/users/', {
                'method': 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken['csrftoken']
                },
                body: JSON.stringify({username, password, email})
            })
            .then(response => response.json())
            .then(response => {
                if ( IsEligableFromBackend(response) ){
                    return (response.username === username) ? login() : null;
                }
            })
            .catch(error => setError(['Извините. Что-то пошло не так.']));
        }
    }

    return (    
        <div className="Login">
            { 
                (error.length) ? 
                <div className="error">
                    {error.map(err => <p key={err}>{err}</p>)}
                </div> : null
            }
            <label className="field"> 
                <span>Имя пользователя: </span>  
                <input data-field="username" type="text" 
                    defaultValue={username} onBlur={e => setUsername(e.target.value)} />  
            </label>
            <label className="field"> 
                <span>Ваш пароль: </span>  
                <input data-field="password" type="password" 
                    defaultValue={password} onBlur={e => setPassword(e.target.value)} />  
            </label>

            { history.location.pathname ==='/login' &&
                    <div className='login-buttons'>
                        <button type='button' onClick={login}>Войти</button>
                        <button type='button' onClick={() => history.push('/')}>Отмена</button>
                        <button type='button' onClick={() => history.push('/signup')}>Зарегистрироваться</button>                      
                    </div>           
            }

            { history.location.pathname ==='/signup' &&
                        <React.Fragment>                          
                            <label className="field"> 
                                <span>Подтвердите Ваш пароль: </span>  
                                <input data-field="confirm" type="password" 
                                    defaultValue={confirm} onBlur={e => setConfirm(e.target.value)} />
                            </label>
                            <label className="field"> 
                                <span>Ваш Email: </span>  
                                <input data-field="email" type="email" 
                                    defaultValue={email} onBlur={e => setEmail(e.target.value)} />  
                            </label>
                            <div className='login-buttons'>
                                <button type='button' onClick={signup}>Отправить</button>
                                <button type='button' onClick={() => history.push('/login')}>Отмена</button>
                            </div>
                        </React.Fragment>
            }
        </div>
        )
}

export default Login;