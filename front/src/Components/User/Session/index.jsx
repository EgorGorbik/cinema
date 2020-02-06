import React, {useEffect, useState} from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import Loader from "../../shared/Loader";
import Header from "../Header";
import PageNotFound from "../../shared/PageNotFound";
import Hall1 from "../../shared/Halls/Hall1";
import Hall2 from "../../shared/Halls/Hall2";
import Hall3 from "../../shared/Halls/Hall3";
import {Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";

function Session(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [film, changeFilm] = useState('');
    const [date, changeDate] = useState('');
    const [time, changeTime] = useState('');

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
        }
    }, [props.session])

    if(props.loader || !props.session) {
        return <Loader/>
    }

    let hall;
    if(!props.session) {
        return <PageNotFound/>
    } else {
        switch(props.session.hall) {
            case 1:
                hall = <Hall1 isUser={true} choosePlace={choosePlace}/>
                break;
            case 2:
                hall = <Hall2 isUser={true} choosePlace={choosePlace}/>
                break;
            case 3:
                hall = <Hall3 isUser={true} choosePlace={choosePlace}/>
                break;
        }
    }

    function choosePlace() {
        if(props.user) {

        } else {
            handleShow();
        }
    }

    console.log(props.session)

    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Войдите в систему!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Вы не можете выбирать места пока вы не в системе. Пожалуйста выполните вход или зарегистрируйтесь.</Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => props.history.push('/login')}>Войти</Button>
                    <Button>Зарегистрироваться</Button>
                </Modal.Footer>
            </Modal>
            <Header/>
            <div className='session_information'>
                <div>{film}</div>
                <div>{date}</div>
                <div>{props.session.time}</div>
            </div>
            <div>{hall}</div>
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
    getFilms: () => {dispatch({type: 'GET_FILMS'})},
    getSessions: (date) => {console.log(date); dispatch({type: 'GET_SESSIONS', date: date})},
    getSession: (id) => {dispatch({type: 'GET_SESSION', id: id})},
    deleteSession: (id) => {dispatch({type: 'DEL_SESSION', id: id})},
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Session));