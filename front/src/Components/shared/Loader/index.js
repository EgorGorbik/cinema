import React from 'react';
import { Spinner } from 'react-bootstrap';
import './styles/_index.scss';

function Loader(props) {
    return(
        <div className='main_loader'>
            <Spinner animation="border"/>
        </div>
    )
}

export default Loader;