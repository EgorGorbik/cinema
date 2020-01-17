import React from 'react';
import Header from "../../shared/Header";
import Button from "react-bootstrap/Button";
import '../styles/_index.scss';
import FilmsSessions from "./FilmsSessions";

function AdminSessions(props) {


    return (
        <div>
            <Header/>
            <FilmsSessions/>
        </div>
    )
}

export default AdminSessions;