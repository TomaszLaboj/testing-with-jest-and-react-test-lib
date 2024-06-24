import axios from 'axios';
import React from 'react';
import { useState } from 'react';
const FirstComponent = () => {
    const [responseInfo, setResponseInfo] = useState('');
    console.log(responseInfo)
    const checkForPostcodeNotFound = (response: string) => {
            console.log(response);
        if(response === 'Postcode not found') {
            setResponseInfo( 'We are really sorry but this postcode hasn\'t been found in the data base')
        }
    }
    const handleApiCall = () => {
        axios.get('https://api.postcodes.io/postcodes/S14%202DN')
            .then((response) => {
                console.log(response)
               setResponseInfo(response.data.result.admin_ward);
            })
            .catch((error) => {
                console.log(error)
                checkForPostcodeNotFound(error.response.data.error);
            });

    }
    return (
        <>
            <h1>Hello user</h1>
            <button onClick={handleApiCall}>Press to check postcode</button>
            <p>{responseInfo}</p>
        </>
        );
}
export default FirstComponent;
