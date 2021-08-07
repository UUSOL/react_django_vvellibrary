import './BookGalery.css';
import React from 'react';
import { NavLink } from 'react-router-dom';

class BookGalery extends React.PureComponent {
    divRef = null
    setDivRef = (ref) => {
            this.divRef = ref;
           // console.log(this.divRef)
    }

    scrollRight = () => {
        this.divRef && this.divRef.scroll({
              top: 0,
              left: this.divRef.scrollLeft + 350,
              behavior: 'smooth'
        });
    }

    scrollLeft = () => {
        this.divRef && this.divRef.scroll({
              top: 0,
              left: this.divRef.scrollLeft - 350,
              behavior: 'smooth'
        });
    }
    render(){
       
        return (
            <React.Fragment>
      
            <div className="book-covers" ref={this.setDivRef}>
                        	
                { this.props.bookArr.map( (book, index) => {
                        return (
                            <NavLink className="book-info" 
                                    key={book.title + index} 
                                    to={`/books/${book.id}`}>
                                <img src={book.cover_src} />
                            </NavLink>
                        );
                    })
                }
            </div>
            <div className="buttons">
                <button onClick={this.scrollLeft} className="left" > &#60; </button>
                <button onClick={this.scrollRight} className="right" > &#62; </button>
            </div>	
            </React.Fragment>
        )
    }
}

export default BookGalery;