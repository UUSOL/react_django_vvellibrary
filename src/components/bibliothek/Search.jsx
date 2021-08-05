import React, {useState, useEffect} from 'react';
import Category from './Category';


function Search(props) {
    const [books, setBooks] = useState([])
    let [page, setPage] = useState(1);
    const [booksToRender, setBooksToRender] = useState([])
    let [sortBy, setSortBy] = useState('');
    let [userInput, setUserInput] = useState('');
    let [category, setCategory] = useState('');
    let [genreId, setGenreId] = useState();
    
    const next = () => {
        setPage(++page)
        setBooksToRender(booksToRender.slice(0, page * 10))
    }
    
    const customSort = (arr) => {   
        if(sortBy === 'ranking') {
           arr.sort((book1, book2) => book2.ranking - book1.ranking);
        }
        else if (sortBy === 'title') {
           arr.sort((book1, book2) => (book1.title < book2.title) ? -1 : 1)
        }
        return arr;
    }


    const cbDisplayGenre = (genre_id, genre_name) => {
        if (genre_id !== genreId) {
            console.log(genre_id);
            if(genre_id === -5) { //mean no such id in db
                const newBooks = customSort([...books]);
                setBooksToRender(newBooks);
            } else {        
                setBooksToRender(books.filter(book => +genre_id in book.genres));
            }
            setPage(1);
            setCategory(genre_name)
        }
    }

    const sortBooks = (ev) => {   
        if(ev.target.dataset.sortby !== sortBy) {    
            if(ev.target.dataset.sortby === 'ranking') {
                console.log('in ranking sort')
                booksToRender.sort((book1, book2) => book2.ranking - book1.ranking);
            }                
            else if (ev.target.dataset.sortby === 'title') {
                console.log('in title sort')
                booksToRender.sort((book1, book2) => (book1.title < book2.title) ? -1 : 1)
            }
            setSortBy(ev.target.dataset.sortby);
            setPage(1);
        }
    }

    const searchBook = (ev) => {
        const minSizeOfSearch = 3;
        setUserInput(ev.target.value);
        setBooksToRender(books.filter(book => book.title.toLowerCase().includes(ev.target.value.toLowerCase())));
    }

    useEffect(() => {
        if (!books.length) {
            //const stringToFetch = 'http://127.0.0.1:8000/api/books/search';
            const stringToFetch = 'https://vvelonlinelibrary.herokuapp.com/api/books/search';
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
                setBooks(response)
                setBooksToRender(response.slice(0,10))
            })
        }
    }, [sortBy]);

    return (
        <div>
            <input type='text' defaultValue={userInput} onChange={searchBook} />
            <h2>Все книги {(category) ? 'в категории ' + category: null}</h2>
            <nav>
                
                <span data-field='all'>все  </span>
                <span data-field='books'>книги  </span>
                <span data-field='authors'>авторы  </span>
            </nav>
            <nav>
                <h3>Сортировать: </h3>
                <span data-sortby='ranking' onClick={sortBooks}>По популярности    </span>
                <span data-sortby='title' onClick={sortBooks}>По названию книги</span>
            </nav>
            <Category cbDisplayGenre={cbDisplayGenre} />
            {booksToRender.length && booksToRender.slice(0, page * 10).map(book => <div key={book.id}>
                    <hr />
                    <h2>Книга {book.title}</h2>
                    <p>Рейтинг {book.ranking}</p>
                    <hr/>
                </div>)}
    
            <button onClick={next} disabled={booksToRender.length / (page * 10) < 1}>Показать еще</button>    
        </div>
    )
}

export default Search;