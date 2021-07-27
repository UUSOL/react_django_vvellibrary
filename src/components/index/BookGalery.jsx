import './BookGalery.css';
import React from 'react';


function BookGalery(props) {
    const bookCovers = props.bookArr.map((book) => {
            return (
                <div className="book-info" key={book.id + props.genre}>
                    <img src={book.cover_src} />
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