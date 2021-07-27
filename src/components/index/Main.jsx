import './Main.css';
import BookGalery from './BookGalery.jsx';
import React, {useState} from 'react';


function Main() {
    const [books, setBooks] = useState({   
            classic: [{
                id: 3,
                cover_src: './bla',
            }],
            novels: [ { 
                id: 4,
                cover_src: './bla',
            }],
            detectives: [ { 
                id: 5,
                cover_src: './bla',
            }],
            fairyTailes: [{ 
                id: 2,
                cover_src: './bla',
            }],
    });
    
    const genres = ['classic', 'novels', 'detectives', 'fairyTailes'];
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
                            <img alt="people reading books" src={`./images/people/big${index}.jpg`} />
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