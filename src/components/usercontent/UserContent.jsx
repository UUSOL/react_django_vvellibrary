import React, {useState, useEffect} from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import {useCookies} from 'react-cookie';

function UserContent() {
    const [token, setToken, removeToken] = useCookies(['vvelToken']);
    const [csrftoken, setCsrfToken] = useCookies(['csrftoken']);
    const [usersBooks, setUsersBooks] = useState([]);
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
            setUsersBooks(newBooks)
         })
     }

    useEffect( () => {
        if (!token['vvelToken']) {
            history.push('/login2');
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
            return response.json();
        })
        .then(response => {
            setUsersBooks(response)
        })
    }, []);

    return (
        <div className="UserContent">
            <div className="book-covers">  
                {usersBooks.length > 0 && usersBooks.map(book => {
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
        </div>
    );
}


export default UserContent;
