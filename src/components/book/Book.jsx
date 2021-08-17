import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {useCookies} from 'react-cookie';
import './Book.css';
import Read from './Read.jsx';


function Book(props) {
    let [book, setBook] = useState({});
    let [bookId, setBookId] = useState(props.match.params.id)
    const [token, setToken, removeToken] = useCookies(['vvelToken']);
    const [csrftoken, setCsrfToken] = useCookies(['csrftoken'])
    let history = useHistory();
    let [mode, setMode] = useState('show');

    const addBookToUserContent = () => {
        fetch('http://127.0.0.1:8000/api/choice/', {
            'method': 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken['csrftoken'],
                'Authorization': `Token ${token['vvelToken']}`
            },
            body: JSON.stringify({
                "BookId": bookId
            })
        })
        .then(response => {
            console.log(response)
            return response.json();
        })
        .then(response => {
            console.log(response)
            //setBook(response)
        })
        .catch(e => {
           console.log(e.message)
        })
    }

    useEffect(() => {
        //if (!bookId || bookId !== props.match.params.id) {
            
            //fetch(`http://127.0.0.1:8000/api/books/${bookId}`, {
            fetch(`https://vvelonlinelibrary.herokuapp.com/api/books/${bookId}`, {
                'method': 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                //console.log(response)
                return response.json();
            })
            .then(response => {
                //console.log(response)
                setBook(response)
            })
            .catch(_ => {
                history.push('/');
            })
        //}
    }, []);

    return (
        <div className='Book'>	
        {mode==='show' &&
                <React.Fragment>
				<div className="book-cover">
					<img src={book.cover_src} />	
				</div>
				<div className="book-info">
                    <div className="book-info-title-section">
                        <h3>{book.title}</h3>
                        <p>{book.genre}</p> 
                        <div className="rating">
                            <span>Рейтинг: {book.ranking}</span>
                            <span className="fa fa-star"></span>
                        </div>	
                        <p>Автор: {book.authors}</p>
                        <p>Жанр: {book.genre}</p>
                    </div>
					<div>
						<h2>Краткое описание:</h2>
						<p>{book.summary}</p>
					</div>
 
					<div className="buttons">
						<button onClick={() => setMode('read')}>Читать онлайн</button>
						<a href={book.url_to_download} target='_blank' download>Скачать</a>				
						<button onClick={addBookToUserContent}>Добавить в мою библиотеку</button>
					</div>
				</div>
                </React.Fragment>
            }		
            {mode==='read' &&
                <div className="Read"> 
                    <Read url={book.url_to_download} />
                    <button onClick={() => setMode('show')}>X</button>
                </div>
            }
        </div>     
    );
}

export default Book;