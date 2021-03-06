import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {useCookies} from 'react-cookie';
import './Book.css';
import Read from './Read.jsx';


function Book(props) {
    //book comes from server in normalized form, where can be multiple rows with the same data
    const [book, setBook] = useState([]);
    let [bookId] = useState(props.match.params.id)
    const [token] = useCookies(['vvelToken']);
    const [csrftoken] = useCookies(['csrftoken'])
    let history = useHistory();
    let [mode, setMode] = useState('show');
    let [loading, setLoading] = useState(true);

    const addBookToUserContent = () => {
        if (!token['vvelToken']) {
            history.push('/login')
            return; 
        }

        fetch('https://vvelonlinelibrary.herokuapp.com/api/choice/', {
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
        .then(response => response.json())
        .then(_ => history.push('/choice'))
        .catch(e => {
           console.log(e.message)
        })
    }

    useEffect(() => {      
        //fetch(`http://127.0.0.1:8000/api/books/${bookId}`, {
        fetch(`https://vvelonlinelibrary.herokuapp.com/api/books/${bookId}`, {
            'method': 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(response => {
            setBook(response)
            setLoading(false)
        })
        .catch(_ => {
            history.push('/');
        })
    }, []);

    return (
        <div className='Book'>	
            {!loading && book.length > 0 && mode==='show' &&
                <React.Fragment>
                    <div className="book-cover">
                        <img alt="Cover of Book" src={book[0].cover_src} />	
                    </div>
                    <div className="book-info">
                        <div className="book-info-title-section">
                            <h3>{book[0].title}</h3>
                            <p>{book[0].genre}</p> 
                            <div className="rating">
                                <span>??????????????: {book[0].ranking}</span>
                            </div>	
                            <p>??????????: {book.reduce((author1, author2) => {
                                //join multiple authors because of 3 normalized form
                                let author_to_render = `${author2.authors__first_name} ${author2.authors__last_name}`
                                return !author1.includes(author_to_render) ? [...author1, author_to_render] : author1;
                            }, []).join(', ')}
                            </p>
                            <p>????????: { book.reduce( (genre1, genre2) => {
                                 //join multiple genres because of 3 normalized form
                                let genre_to_render = genre2.genres__name;
                                return !genre1.includes(genre_to_render) ? [...genre1, genre_to_render] : genre1;
                            }, []).join(', ') }
                            </p>
                        </div>
                        <div>
                            <h2>?????????????? ????????????????:</h2>
                            <p>{book[0].summary}</p>
                        </div>
                        <div className="buttons">
                            <button onClick={() => setMode('read')}>???????????? ????????????</button>
                            <a href={book[0].url_to_download} target='_blank' download>??????????????</a>				
                            <button onClick={addBookToUserContent}>???????????????? ?? ?????? ????????????????</button>
                        </div>
                    </div>
                </React.Fragment>
            }	

            {mode==='read' &&
                <div className="Read"> 
                    <Read book={book[0]} />
                    <button onClick={() => setMode('show')}>X</button>
                </div>
            }
        </div>     
    );
}

export default Book;