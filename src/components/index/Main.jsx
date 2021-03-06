import './Main.css';
import BookGalery from './BookGalery.jsx';
import React, {useState, useEffect} from 'react';
import {useCookies} from 'react-cookie';
import { NavLink } from 'react-router-dom';


function Main(props) {  
    const [books, setBooks] = useState({
        'Классика': null,
        'Романы': null,
        'Детективы': null,
        'Сказки': null,
    });
    const [csrftoken] = useCookies(['csrftoken']);

    useEffect(() => {
        //const stringToFetch = 'http://127.0.0.1:8000/api/books/'
        const stringToFetch = 'https://vvelonlinelibrary.herokuapp.com/api/books/';
        fetch(stringToFetch, {
            'method': 'GET',
              headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken['csrftoken']
                }
        })
        .then(response => response.json())
        .then(response => {
            // data from backend will come already sorted 
            setBooks({
                'Классика': response.splice(0, 10),
                'Романы': response.splice(0, 10),
                'Детективы': response.splice(0, 10),
                'Сказки': response.splice(0, 10)
        })})
        .catch();
    }, []);

    const genres = ['Классика', 'Романы', 'Детективы', 'Сказки'];
    const genresEn = ['classic', 'novel', 'detective', 'fairyTail']
    const galery = genres.map( (genre, index) => {
        return (             
                <section key={genre} className={ (index % 2 === 0) ? 'left-side' : 'right-side'}> 
                    {   index % 2 === 0 &&
                        <div className="img-containter">
                            <img alt="Man reading a book" src={`https://vvellibrary.s3.eu-central-1.amazonaws.com/images/${genresEn[index]}.JPG`} />
                        </div>
                    }
                    <div className="container">
                        <div className="genre">	
                            <span className="title">{genre}</span>	       
                            <div className="comment">
                                <p>Топ-10 книг в жанре {genre} по версии наших читателей</p>
                                <NavLink to={`/genres/${index+1}`}>подробнее</NavLink>
                            </div>	
                        </div>
                        {books['Классика'] && <BookGalery bookArr={books[genre]} />}      
                    </div>
                    {   index % 2 !== 0 &&
                        <div className="img-containter">
                             <img alt="Woman reading a book" src={`https://vvellibrary.s3.eu-central-1.amazonaws.com/images/${genresEn[index]}.JPG`} />
                        </div>
                    }
                </section>      
        );
    });
    // books['классика'] means the data already come from backend and exists in state
    return (
        <main className="main">
            {books['Классика'] && galery}
        </main>
    );
}

export default Main;