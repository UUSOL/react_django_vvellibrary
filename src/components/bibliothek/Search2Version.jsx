import React, {useState, useEffect} from 'react';
import Category from './Category';
import './Search2Version.css';
import {NavLink} from 'react-router-dom';

function Search(props) {
    const [books, setBooks] = useState([])
    let [page, setPage] = useState(1);
    let [userInput, setUserInput] = useState('');
    let [column, setColumn] = useState('all');
    
    const next = () => {
        setPage(++page)
    }

    const searchBook = (ev) => {
        const minSizeOfSearch = 3;
            setUserInput(ev.target.value)
    }
     
    const changeColumnToSearch = (ev) => {
        setColumn(ev.target.dataset.field);
    }
    useEffect(() => {
       
            //const stringToFetch = `http://127.0.0.1:8000/api/search/`;
            const stringToFetch = `'https://vvelonlinelibrary.herokuapp.com/api/search/`;
            fetch(stringToFetch, {
                'method': 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'query': userInput,
                    'column': column
                })
            })
            .then(response => {
                console.log(response)
                return response.json();
            })
            .then(response => {
                setBooks(response)
            })
        
    }, [column, userInput]);

    return (
        <div className="Search2Version">
           
            <input type='text' defaultValue={userInput} onChange={searchBook} 
                placeholder='введите книгу или автора' />
            {userInput && <h2>Найдено {books.length} книг по запросу {userInput}</h2>}
            <nav className='sort-buttons'>
                <span onClick={changeColumnToSearch} data-field='all'>все</span>
                <span onClick={changeColumnToSearch} data-field='books'>книги</span>
                <span onClick={changeColumnToSearch} data-field='authors'>авторы</span>
            </nav>

            { books.length > 0 && books.slice(0, page * 10).map(book => {
                    return (
                        <NavLink class="book-covers" to={`/books/${book.id}`}>
                            <img src={book.cover_src} />
                        </NavLink>	
                    );
                })
            }
    
            <button onClick={next} disabled={books.length / (page * 10) < 1}>Показать еще</button>

        </div>
        )
}

export default Search;