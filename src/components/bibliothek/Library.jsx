import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import Genres from './Genres';


function Library(props) {
    let [genreToSearch, setGenreToSearch] = useState(props.match.params.genres);
    const [genres, setGenres] = useState([]);
    const [books, setBooks] = useState([]);
    let [page, setPage] = useState(1);
    let [sortBy, setSortBy] = useState('');

    let history = useHistory();

    useEffect(() => {

        if (!genres.length) {
            console.log('in fetch genres')
            const stringToFetch = `http://127.0.0.1:8000/api/genres/`;
            
            fetch(stringToFetch, {
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
                setGenres(response)
            })
        }
           
        fetch(`http://127.0.0.1:8000/api/genres/${genreToSearch}`, {
                'method': 'GET',
                headers: {
                   'Content-Type': 'application/json'
                }
        })
        .then(response => {
            
            console.log('in fetch books')
                return response.json();
            })
        .then(response => {
            setBooks(response)
            setPage(1)
            //sort
        })
    }, [genreToSearch]);
      


    const cbDisplayGenre = (genre_id, genre_name) => {
        if (genre_id !== genreToSearch){
            history.push(`/genres/${genre_id}`)
            setGenreToSearch(genre_id)
        }
    }

    const next = () => {
        setPage(++page)
    }

    const sort = (_sortBy) => {
        if(_sortBy === 'ranking') {
            console.log('in ranking sort')
            books.sort((book1, book2) => book2.ranking - book1.ranking);
        }                
        else if (_sortBy === 'title') {
            console.log('in title sort')
            books.sort((book1, book2) => (book1.title < book2.title) ? -1 : 1)
        }
    }

    const sortBooks = (ev) => {
      
        if(ev.target.dataset.sortby !== sortBy) {
        
            if(ev.target.dataset.sortby === 'ranking') {
                console.log('in ranking sort')
                books.sort((book1, book2) => book2.ranking - book1.ranking);
            }                
            else if (ev.target.dataset.sortby === 'title') {
                console.log('in title sort')
                books.sort((book1, book2) => (book1.title < book2.title) ? -1 : 1)
            }
            setPage(1);
            setSortBy(ev.target.dataset.sortby);
        }
    }


    return (
        <div>
            {console.log('library render')}
           
           <h1>Hello</h1>
            <nav>
                <span data-sortby='ranking' onClick={sortBooks}>По популярности</span>
                <span data-sortby='title' onClick={sortBooks}>По названию книги</span>
            </nav>
           {genres.length && <Genres genres={genres} cbDisplayGenre={cbDisplayGenre} />}
           {books.length && books.slice(0, page*10).map(book => {
               
               return (
                   <div key={book.id}>
                        <hr />  
                        <h2>Книга - {book.title}</h2>
                        <p>Ranking: {book.ranking}</p>
                        <hr />  
                   </div>
               )
           })
           }
          <button onClick={next} disabled={books.length / (page * 10) < 1}>Показать еще</button>
        </div>
    )
}

export default Library;