import React, {useState, useEffect} from 'react';

function Category(props) {
    const [genres, setGenres] = useState([]);
    const [sortBy, setSortBy] = useState([]);

    const displayGenre = (ev) => {
        console.log(ev.target.dataset.name)
        props.cbDisplayGenre(ev.target.dataset.id, ev.target.dataset.name);
    }
    useEffect(() => {
        if (!genres.length) {
            const stringToFetch = 'https://vvelonlinelibrary.herokuapp.com/api/genres/';
            //const stringToFetch = 'http://127.0.0.1:8000/api/genres/';
            
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
            .then(response => {
                setGenres(response)
            })
        }
    }, []);
    const notExistingIndexInDb = -5;
    return (
        <div>
            <h2>Категории:</h2>
            {console.log('render category')}
            <span key={notExistingIndexInDb} data-id={notExistingIndexInDb} data-name='all' onClick={displayGenre}>Все    </span>
            {genres.length && genres.map(genre => <span key={genre.id} 
                                                    data-id={genre.id}
                                                    data-name={genre.name}
                                                    onClick={displayGenre}>     
                                                        {genre.name + '   '}
                                                    </span>)}
        </div>
    )
}

export default Category;