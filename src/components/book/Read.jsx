import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import './Read.css';

function Read(props) {
    let [book, setBook] = useState({});

    return (
        <iframe 
            src="http://docs.google.com/gview?url=https://vvellibrary.s3.eu-central-1.amazonaws.com/books/Skott_V_Ayivengo.pdf&embedded=true"
            style={{backgroundColor:"white", width:"800px", height:"800px", position:"relative", zIndex:"1"}} frameBorder="0">    
        </iframe>
    )
}

export default Read;
