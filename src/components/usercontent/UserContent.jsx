import React, {useState, useEffect} from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import {useCookies} from 'react-cookie';

function UserContent() {
    const [token, setToken, removeToken] = useCookies(['vvelToken']);
    let history = useHistory();

    useEffect( () => {
        if (!token['vvelToken']) {
            history.push('/login2');
            return;
        }
        const stringToFetch = `http://127.0.0.1:8000/api/choice/`;
        fetch(stringToFetch, {
            'method': 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            'Authorization': `Token ${token['vvelToken']}`
        })
        .then(response => {
            //console.log(response)
            return response.json();
        })
        console.log(token['vvelToken']);
    }, []);

    return (
        <div>
            <h1>User Content</h1>
        </div>
    );
}


export default UserContent;
