import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import './Book.css';
import Read from './Read.jsx';


function Book(props) {
    let [book, setBook] = useState({});
    let [bookId, setBookId] = useState(props.match.params.id)
    let history = useHistory();
    let [mode, setMode] = useState('read');


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
                console.log(response)
                return response.json();
            })
            .then(response => {
                console.log(response)
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
				
					<h3>{book.title}</h3>
					<p>{book.genre}</p> 
					<div className="rating">
						<span>Рейтинг: {book.ranking}</span>
						<span className="fa fa-star"></span>
					</div>	
                    <p>Автор: {book.authors}</p>
					<p>Жанр: {book.genre}</p>
					<div>
						<h2>Краткое описание:</h2>
						<p>{book.summary}</p>
					</div>
 
					<div className="buttons">
						<button>Читать онлайн</button>
						<a href={book.url_to_download} target='_blank' download>Скачать</a>				
						<button>Добавить в мою библиотеку</button>
					</div>
				</div>
                </React.Fragment>
            }		
            {mode==='read' &&
                <div className="Read"> 
                    <Read />
                </div>
            }
        </div>     
    );
}

export default Book;