import React, {useState, useEffect} from 'react';
import './Genres.css';

function Genres(props) {
    const [genres, setGenres] = useState(props.genres);
    const [sortBy, setSortBy] = useState([]);

    const displayGenre = (ev) => {
        props.cbDisplayGenre(ev.target.dataset.id, ev.target.dataset.name);
    }
    
    const notExistingIndexInDb = 100;
    return (
        <div className='Genres'>
            
        <h2>Категории:</h2>
        {console.log('render genres')}
        <span key={notExistingIndexInDb} data-id={notExistingIndexInDb} data-name='' onClick={displayGenre}>Все</span>
        {genres.length && genres.map(genre => <span key={genre.id} 
                                                data-id={genre.id}
                                                data-name={genre.name}
                                                onClick={displayGenre}>
                                                    {genre.name}
                                                </span>)}
    </div>
 
    )
}

export default Genres;
