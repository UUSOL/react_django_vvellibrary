import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import Genres from './Genres';
import {NavLink} from 'react-router-dom';
import './Library.css';
import {useCookies} from 'react-cookie';

function Library(props) {
    const [csrftoken, setCsrfToken] = useCookies(['csrftoken'])
    let [genreToSearch, setGenreToSearch] = useState(props.match.params.genres);
    const [genres, setGenres] = useState([]);
    const [genreToDisplay, setGenreToDisplay] = useState('');
    const [books, setBooks] = useState([]);
    let [page, setPage] = useState(1);
    let [sortBy, setSortBy] = useState('');

    let history = useHistory();

    useEffect(() => {

        if (!genres.length) {
           // console.log('in fetch genres')
            //const stringToFetch = `http://127.0.0.1:8000/api/genres/`;
            const stringToFetch = 'https://vvelonlinelibrary.herokuapp.com/api/genres/';
            fetch(stringToFetch, {
                'method': 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken['csrftoken']
                }
            })
            .then(response => {
              //  console.log(response)
                return response.json();
            })
            .then(response => {
              //  console.log(response)
                setGenres(response)
            })
            .catch(error => console.log(error))
        }
           
        //fetch(`http://127.0.0.1:8000/api/genres/${genreToSearch}`, {
         fetch(`https://vvelonlinelibrary.herokuapp.com/api/genres/${genreToSearch}`, {
            'method': 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken['csrftoken']
            }
        })
        .then(response => {
            
            //console.log('in fetch books')
           // console.log(response)
                return response.json();
            })
        .then(response => {
            //console.log(response)
            setBooks(response)
            setPage(1)
            //sort
        })
    }, [genreToSearch]);
      


    const cbDisplayGenre = (genre_id, genre_name) => {
        if (genre_id !== genreToSearch){
            history.push(`/genres/${genre_id}`)
            setGenreToSearch(genre_id)
            setGenreToDisplay(genre_name)
        }
    }

    const next = () => {
        setPage(++page)
    }

    const sort = (_sortBy) => {
        if(_sortBy === 'ranking') {
           // console.log('in ranking sort')
            books.sort((book1, book2) => book2.ranking - book1.ranking);
        }                
        else if (_sortBy === 'title') {
          //  console.log('in title sort')
            books.sort((book1, book2) => (book1.title < book2.title) ? -1 : 1)
        }
    }

    const sortBooks = (ev) => {
      
        if(ev.target.dataset.sortby !== sortBy) {
        
            if(ev.target.dataset.sortby === 'ranking') {
                //console.log('in ranking sort')
                books.sort((book1, book2) => book2.ranking - book1.ranking);
            }                
            else if (ev.target.dataset.sortby === 'title') {
               // console.log('in title sort')
                books.sort((book1, book2) => (book1.title < book2.title) ? -1 : 1)
            }
            setPage(1);
            setSortBy(ev.target.dataset.sortby);
        }
    }


    return (
        <div className='Library'>
           
                <div>  
                    <div className='title-section'>
                        <h2>Все Книги из категории: {genreToDisplay}</h2>
                        <h4>Сортировать:</h4>
                        <nav>     
                            <span data-sortby='ranking' onClick={sortBooks}>по популярности</span>
                            <span data-sortby='title' onClick={sortBooks}>по названию книги</span>
                        </nav>
                    </div>
                <div className="book-covers">
                    {books.length > 0 && books.slice(0, page*10).map(book => {      
                            return (
                                    <NavLink key={book.id} to={`/books/${book.id}`}>
                                        <img src={book.cover_src} />
                                    </NavLink>	
                            )
                        })
                    }
                </div>
                <button onClick={next} disabled={books.length / (page * 10) < 1}>Показать еще</button>
            </div>
            {genres.length > 0 && <Genres genres={genres} cbDisplayGenre={cbDisplayGenre} />}
          
        </div>
    )
}

export default Library;