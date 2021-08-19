import React, {useState, useEffect} from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import {useCookies} from 'react-cookie';
import './UserContent.css';

function UserContent() {
    const [token, setToken, removeToken] = useCookies(['vvelToken']);
    const [csrftoken, setCsrfToken] = useCookies(['csrftoken']);
    const [usersBooks, setUsersBooks] = useState([]);
    let [loading, setLoading] = useState(true);
    let [bookId, setBookId] = useState();
    let history = useHistory();


    const removeBookFromFavorite = (ev) => {
        //const stringToFetch = `http://127.0.0.1:8000/api/choice/`;
        const stringToFetch = 'https://vvelonlinelibrary.herokuapp.com/api/choice/'; 
        fetch(stringToFetch, {
             'method': 'DELETE',
             headers: {
                 'Content-Type': 'application/json',
                 'X-CSRFToken': csrftoken['csrftoken'],
                 'Authorization': `Token ${token['vvelToken']}`
             },
             body: JSON.stringify({
                "BookId": ev.target.dataset.id
            })
         })
         .then(response => {
             console.log(response)
             return response.json();
         })
         .then(response => {
            const newBooks = usersBooks.filter(book => book.id != ev.target.dataset.id)
            console.log(newBooks)
            setUsersBooks(newBooks)
         })
     }

    useEffect( () => {
        if (!token['vvelToken']) {
            history.push('/login');
            return;
        }
       //const stringToFetch = `http://127.0.0.1:8000/api/choice/`;
      
       const stringToFetch = 'https://vvelonlinelibrary.herokuapp.com/api/choice/'; 
       fetch(stringToFetch, {
            'method': 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken['csrftoken'],
                'Authorization': `Token ${token['vvelToken']}`
            }
        })
        .then(response => {
            console.log(response)        
            return response.json();
        })
        .then(response => {
            console.log(response)
            setUsersBooks(response)
            setLoading(false);
        })
    }, []);

    return (
        <div className="UserContent">
            <h2>Ваши закладки:</h2>
            {!loading && usersBooks.length === 0 && 
                <p>У Вас еще нет книг в закладках</p>
            } 
            {!loading && usersBooks.length > 0 &&
                <div className="book-covers">  
                    {usersBooks.map(book => {
                        return (
                            <div key={book.id}>
                                <NavLink key={book.id} to={`/books/${book.id}`}>
                                        <img src={book.cover_src} />
                                </NavLink>	
                                <button 
                                    data-id={book.id} 
                                    onClick={removeBookFromFavorite}>X
                                </button>
                            </div>
                        )
                    })}
                </div>
            }
           
        </div>
    );
}

export default UserContent;
