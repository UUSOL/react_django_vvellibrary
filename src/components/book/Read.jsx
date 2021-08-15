import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import './Read.css';

function Read(props) {

    return (
        <React.Fragment>
        <iframe 
            width="100%" 
            height="750px" 
            src="https://www.yumpu.com/ru/embed/view/DboKBI0OZvrsS1uG" 
            frameborder="0" 
            allowfullscreen="true"  
            allowtransparency="true">    
        </iframe>
         <iframe 
         width="100%" 
         height="750px" 
         src="https://vvellibrary.s3.eu-central-1.amazonaws.com/books/Skott_V_Ayivengo.pdf" 
         frameborder="0" 
         allowfullscreen="true"  
         allowtransparency="true">    
        </iframe>
        </React.Fragment>
        )
}

export default Read;
