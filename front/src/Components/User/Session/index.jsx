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
import {socket} from "../../../config/socket";

function Session(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [film, changeFilm] = useState('');
    const [date, changeDate] = useState('');
    const [time, changeTime] = useState('');

    const [ choosePlaces, changeChoosePlaces ] = useState([]);

    useEffect(() => {
        props.getFilms();
        props.getSession(props.match.params.id)
    }, [])

    useEffect(() => {
        console.log(props.session)
        if(props.session && props.films) {
            let film = props.films.find(el => el._id === props.session.filmId) ;
            changeFilm(film.name);
            changeDate(props.session.date);
            changeTime(props.session.time)
        }
    }, [props.session])

    useEffect(() => {
        if(!props.user.data) {
            choosePlaces.forEach(e => {e.element.style.backgroundColor = 'white'})
        }
    }, [props.user])

    useEffect(() => {
        props.session && props.user.data &&
        socket.emit('connectSessionRoom',{
            id: props.session._id
        });
    }, [props.session])

    if(props.loader || !props.session) {
        return <Loader/>
    }

    console.log(props.session)


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

    function choosePlace(e, element) {
        if(props.user.data) {
            let isChoosePlace = choosePlaces.find(el => el.id === e.id);
                if(isChoosePlace) {
                    props.cancelChoosePlace(+element.target.id, props.session._id)
                    socket.emit('cancelChoosePlace',{
                        idPlace: element.target.id,
                        idRoom: props.session._id
                    });
                    changeChoosePlaces((prevState => {
                        let newState = prevState;
                        let index = newState.findIndex(el => el.id === e.id);
                        newState.splice(index, 1);
                        return [...newState]
                    }));
                    element.target.style.backgroundColor = 'white';
                } else {
                    if(choosePlaces.length < 4) {
                        props.choosePlace(+element.target.id, props.session._id)
                        socket.emit('choosePlace',{
                            idPlace: element.target.id,
                            idRoom: props.session._id
                        });
                        e.element = element.target;
                        changeChoosePlaces((prevState => [...prevState, e]));
                        e.element.style.backgroundColor = '#F58080';
                    }
                }
        } else {
            handleShow();
        }
    }

    const payment = () => {
        let totalPrice = props.session.price * choosePlaces.length;
        let isPay = window.confirm(`общая стоимость ${totalPrice}р. Оплатить заказ?`);

    }

    return (
        <div>{
           !localStorage.getItem('user_access_token') &&
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Войдите в систему!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Вы не можете выбирать места пока вы не в системе. Пожалуйста выполните вход или зарегистрируйтесь.</Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => props.history.push('/login')}>Войти</Button>
                    <Button onClick={() => props.history.push('/registration')}>Зарегистрироваться</Button>
                </Modal.Footer>
            </Modal>
        }



            <Header/>
            <div className='session_header'>
                <div className='session_information'>
                    <h3>{film}</h3>
                    <div>{date}</div>
                    <div>{props.session.time}</div>
                </div>
                <div className='choose_place'> {
                    props.user.data &&
                    <div>
                        <h3>Выбранные места</h3>
                        {choosePlaces[0] && <Button onClick={() => payment()}>оплатить</Button>}
                        {choosePlaces.map(e => <div>{`${e.row} ряд ${e.place} место`}</div>)}
                    </div>
                }
                </div>
            </div>
            <div>{hall}</div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    sessions: state.sessions,
    session: state.session,
    films: state.films,
    loader: state.loader,
    user: state.user
});

const mapDispatchToProps = (dispatch) =>  ({
    getFilms: () => {dispatch({type: 'GET_FILMS'})},
    getSessions: (date) => {dispatch({type: 'GET_SESSIONS', date: date})},
    getSession: (id) => {dispatch({type: 'GET_SESSION', id: id})},
    deleteSession: (id) => {dispatch({type: 'DEL_SESSION', id: id})},
    choosePlace: (idPlace, idSession) => {dispatch({type: 'CHOOSE_PLACE', data: {idPlace: idPlace, idSession: idSession}})},
    cancelChoosePlace: (idPlace, idSession) => {dispatch({type: 'CANCEL_CHOOSE_PLACE', data: {idPlace: idPlace, idSession: idSession}})},
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Session));