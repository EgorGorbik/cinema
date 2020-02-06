import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router";
import Header from "../Header";
import '../styles/_index.scss';
import Button from "react-bootstrap/Button";
import Hall1 from "../../shared/Halls/Hall1";
import Hall2 from "../../shared/Halls/Hall2";
import Hall3 from "../../shared/Halls/Hall3";
import Loader from "../../shared/Loader";
import SessionForm from "./SessionForm"
import { Modal } from 'react-bootstrap';
import PageNotFound from "../../shared/PageNotFound";

function SessionInfo(props) {
    let hall;

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const deleteSession = () => {
        handleClose();
        props.deleteSession(props.match.params.id);
        props.history.push('/admin/sessions')
    }

    const [film, changeFilm] = useState('');
    const [date, changeDate] = useState('');
    const [time, changeTime] = useState('');

    const [ places, changePlaces ] = useState(null);
    const [ sales, changeSales ] = useState(null);

    useEffect(() => {
        props.getFilms();
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


console.log(props.session)
    if(props.loader) {
        return <Loader/>
    }

    if(!props.session) {
        return <PageNotFound/>
    } else {
        switch(props.session.hall) {
            case 1:
                hall = <Hall1/>
                break;
            case 2:
                hall = <Hall2/>
                break;
            case 3:
                hall = <Hall3/>
                break;
        }
    }

    console.log(hall)





    return (
        <div>
            <Header/>
            <div className='session_header'>
                <div className='session_info'>
                    <strong>{film}</strong>
                    <div>{date}</div>
                    <div>{time}</div>
                    <Button variant="danger" onClick={handleShow}>удалить</Button>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Предупреждение!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Вы уверены, что хотите удалить данный санс? Его никак нельзя будет восстановить.</Modal.Body>
                        <Modal.Footer>
                            <Button variant="danger" onClick={deleteSession}>
                                Удалить
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                <div className='session_statistics'>
                    <div>Всего: {places} мест</div>
                    <div>Куплено: {sales} мест</div>
                    <div>Выручено: {(sales * props.session.price).toFixed(2)} р</div>
                </div>
            </div>
            {hall}
        </div>
    );
}

const mapStateToProps = (state) => ({
    sessions: state.sessions,
    session: state.session,
    films: state.films,
    loader: state.loader
});

const mapDispatchToProps = (dispatch) =>  ({
    getFilms: () => {dispatch({type: 'GET_FILMS'})},
    getSessions: (date) => {console.log(date); dispatch({type: 'GET_SESSIONS', date: date})},
    getSession: (id) => {dispatch({type: 'GET_SESSION', id: id})},
    deleteSession: (id) => {dispatch({type: 'DEL_SESSION', id: id})},
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(SessionInfo));