import './Main.css';
import BookGalery from './BookGalery.jsx';
import React, {useState, useEffect} from 'react';


function Main() {
    const [books, setBooks] = useState({   
            classic: [{
                id: 3,
                cover_src: './bla',
            }],
            novel: [ { 
                id: 4,
                cover_src: './bla',
            }],
            detective: [ { 
                id: 5,
                cover_src: './bla',
            }],
            fairyTail: [{ 
                id: 2,
                cover_src: './bla',
            }],
    });
    
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/books/', {
            'method': 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            console.log(response)
            return response.json();
        })
        .then(response => setBooks(response))
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
                        <BookGalery bookArr={books[genre]} />              
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