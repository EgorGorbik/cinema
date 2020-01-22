import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router";
import Header from "../../shared/Header";
import '../styles/_index.scss';
import Button from "react-bootstrap/Button";
import Hall1 from "../Halls/Hall1";
import Loader from "../../shared/Loader";

function SessionInfo(props) {
    const [film, changeFilm] = useState('');
    const [date, changeDate] = useState('');
    const [time, changeTime] = useState('');

    const [ places, changePlaces ] = useState(null);
    const [ sales, changeSales ] = useState(null);

    useEffect(() => {
        props.getFilms()
        props.getSession(props.match.params.id)
        console.log(props.session)
    }, [])

    useEffect(() => {
        if(props.session) {
            let film = props.films.find(el => el._id === props.session.filmId) ;
            changeFilm(film.name);
            changeDate(props.session.date);
            changeTime(props.session.time)
            console.log(props.session)
            changePlaces(props.session.places.length);
            let salesCounter = 0;
            props.session.places.forEach(e => {if(!e.isFree) salesCounter++;} )
            console.log(salesCounter)
            changeSales(salesCounter);
        }
    }, [props.session])



    if(props.loader) {
        return <Loader/>
    }

    return (
        <div>
            <Header/>
            <div className='session_header'>
                <div className='session_info'>
                    <strong>{film}</strong>
                    <div>{date}</div>
                    <div>{time}</div>
                    <Button>изменить</Button>
                </div>
                <div className='session_statistics'>
                    <div>Всего: {places} мест</div>
                    <div>Куплено: {sales} мест</div>
                    <div>Выручено: 145 р</div>
                </div>
            </div>
            <Hall1/>
        </div>
    )
}

const mapStateToProps = (state) => ({
    sessions: state.sessions,
    session: state.session,
    films: state.films,
    loader: state.loader
});

const mapDispatchToProps = (dispatch) =>  ({
    getFilms: () => {dispatch({type: 'GET_FILM'})},
    getSessions: (date) => {console.log(date); dispatch({type: 'GET_SESSIONS', date: date})},
    getSession: (id) => {dispatch({type: 'GET_SESSION', id: id})},
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(SessionInfo));