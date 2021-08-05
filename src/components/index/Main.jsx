import './Main.css';
import BookGalery from './BookGalery.jsx';
import React, {useState, useEffect} from 'react';


function Main(props) {
   
    const [books, setBooks] = useState({
        classic: null,
        novel: null,
        detective: null,
        fairyTail: null,
    })
    
    useEffect(() => {
        //const stringToFetch = 'http://127.0.0.1:8000/api/books/'
        const stringToFetch = 'https://vvelonlinelibrary.herokuapp.com/api/books/';
        fetch(stringToFetch, {
            'method': 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
        console.log(response)
           return response.json();
        })
        .then(response => setBooks({
            classic: response.splice(0, 10),
            novel: response.splice(0, 10),
            detective: response.splice(0, 10),
            fairyTail: response.splice(0, 10)
        }))/*
        .then(response => setBooks({
            classic: response.filter(book => book.genres.includes('классика')),
            novel: response.filter(book => book.genres.includes('романы')),
            detective: response.filter(book => book.genres.includes('детективы')),
            fairyTail: response.filter(book => book.genres.includes('сказки')),
        }))*/
        .catch(error => console.log(error))
    }, []);


    const genres = ['classic', 'novel', 'detective', 'fairyTail'];
    const galery = genres.map( (genre, index) => {
        return (  
                  
                <section key={genre} className={ (index % 2 == 0) ? 'left-side' : 'right-side'}>
                   
                    {   
                        index % 2 === 0 &&
                        <div className="img-containter">
                            <img src={`https://vvellibrary.s3.eu-central-1.amazonaws.com/images/${genre}.JPG`} />
                        </div>
                    }
                    <div className="container">
                        <div className="genre">	
                            <span className="title">Классика</span>	       
                            <div className="comment">
                                <p>Топ-10 {genre} по версии наших читателей</p>
                                <a href="./{genre}">подробнее</a>
                            </div>	
                            <div className="buttons">
                                <button data-name={genre} className="left" > &#60; </button>
                                <button data-name={genre} className="right" > &#62; </button>
                            </div>	
                        </div>
                        {   books.length > 0 && 
                            <BookGalery bookArr={books[genre]} />
                        }       
                    </div>
                    {   
                        index % 2 !== 0 &&
                        <div className="img-containter">
                             <img src={`https://vvellibrary.s3.eu-central-1.amazonaws.com/images/${genre}.JPG`} />
                        </div>
                    }
                
                </section>      
        );
    });

    return (
        <main className="main">
            {galery}
        </main>
    );
}

export default Main;