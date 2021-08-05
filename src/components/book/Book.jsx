import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';

function Book(props) {
    let [book, setBook] = useState({});
    let [bookId, setBookId] = useState(props.match.params.id)
    let history = useHistory();

    useEffect(() => {
        //if (!bookId || bookId !== props.match.params.id) {
            
            fetch(`http://127.0.0.1:8000/api/books/${bookId}`, {
                'method': 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                console.log(response)
                return response.json();
            })
            .then(response => {
                console.log(response)
                setBook(response)
            })
            .catch(_ => {
                history.push('/');
            })
        //}
    }, []);

    return (
        <div>
            <h2>{book.title}</h2>
            <p>{book.id}</p>
            <p>{book.ranking}</p>
            <p>{book.summary}</p>
        </div>
    );
}

export default Book;