import './BookGalery.css';
import React from 'react';


function BookGalery(props) {
   
    const bookCovers = props.bookArr.map((book) => {
            
            return (
                <div className="book-info" key={book.id + props.genre}>
                    <img src="https://vvellibrary.s3.eu-central-1.amazonaws.com/images/header.jpg" />
                </div>
            );
    });

    return (
        <div className={"book-covers " + props.genre}>	
            {bookCovers}
        </div>
    );
}

export default BookGalery;