import React, {useState} from 'react';
import './Genres.css';

function Genres(props) {
    const [genres] = useState(props.genres);

    const displayGenre = (ev) => {
        props.cbDisplayGenre(ev.target.dataset.id, ev.target.dataset.name);
    }
    
    const notExistingIndexInDb = 100;
    return (
        <div className='Genres'>
            <h3>Категории</h3>
            <div>
                <span key={notExistingIndexInDb} data-id={notExistingIndexInDb} data-name='' onClick={displayGenre}>Все</span>
                {genres.length && genres.map(genre => <span key={genre.id} 
                                                    data-id={genre.id}
                                                    data-name={genre.name}
                                                    onClick={displayGenre}>
                                                        {genre.name}
                                                    </span>)}
            </div>
        </div>
    )
}

export default Genres;