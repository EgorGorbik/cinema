import React from 'react';
import { Spinner } from 'react-bootstrap';
import './styles/_index.scss';

function PageNotFound(props) {
    return(
        <div className='pnf_main'> {/* pnf - page not found */}
            <div className='pnf_404'>404</div>
            <div className='pnf'>Page Not Found</div>
        </div>
    )
}

export default PageNotFound;