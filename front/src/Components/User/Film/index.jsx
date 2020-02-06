import React, {useEffect, useState} from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import Header from "../../Admin/Header";
import Loader from "../../shared/Loader";
import { Form } from 'react-bootstrap';

function Film(props) {
    const [ dates, addDate ] = useState([]);
    const [ sessions, changeSessions ] = useState();

    useEffect(() => {
        props.getFilm(props.match.params.id);
        props.getSessionsForFilm(props.match.params.id)
    }, [])

    useEffect(() => {
        let actualDates = [];
        props.dates && props.dates.forEach(e => {
            if(!actualDates.includes(e.date)) {
                actualDates.push(e.date)
            }
        })
        addDate(actualDates)
    },[props.dates])

    if(props.loader || !props.film) {
        return <Loader/>
    }

    
    const getSessionsForDay = (date) => {
        changeSessions(props.dates.filter(e => e.date === date))
    }



    return(
        <div className='main'>
            <Header/>
            <div className='film_info'>
                <img className='poster_photo' src={ props.film.src ? `http://localhost:5000/${props.film.src}` : './../../../img/noposter.jpg'}/>
                <div className='about_film'>
                    <h1>{props.film.name}</h1>
                    <div>{props.film.duration}</div>
                    <div className='film_decription'>{props.film.description}</div>
                </div>
            </div>
            <div className='input_select_data'>
                <h4>Выберите дату</h4>
                <Form.Control as="select" onChange={(e) => getSessionsForDay(e.target.value)}>
                    { dates.map(e => <option>{e}</option>) }
                </Form.Control>
                <div>
                    {sessions && sessions.map(e => <div className='session_time' onClick={() => props.history.push(`/session/${e._id}`)}>{e.time}</div>) }
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    admin: state.admin,
    loader: state.loader,
    films: state.films,
    film: state.film,
    dates: state.dates
});

const mapDispatchToProps = (dispatch) =>  ({
    getFilms: () => {dispatch({type: 'GET_FILMS'})},
    getFilm: (id) => {dispatch({type: 'GET_FILM', id: id})},
    getSessionsForFilm: (id) => {dispatch({type: 'GET_SESSIONS_FOR_FILM', id: id})},
    loginAdmin: (admin) => {dispatch({type: "LOGIN_ADMIN", admin: admin})},
    logoutAdmin: () => {dispatch({type: "LOGOUT_ADMIN"})},
    checkIsAdmin: (admin) => {dispatch({type: "CHECK_IS_ADMIN", admin: admin})}
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Film));