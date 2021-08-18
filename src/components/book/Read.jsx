import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import './Read.css';

function Read(props) {
    return (
        <iframe 
            width="100%" 
            height="700px" 
            src={props.book.url_to_read || props.book.url_to_download} 
            frameborder="0" 
            allowfullscreen="true"  
            allowtransparency="true">    
        </iframe>  
        )
}

export default Read;
