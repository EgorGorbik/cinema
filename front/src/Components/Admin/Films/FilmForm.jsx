import React, {Component, useRef, useState, useEffect} from 'react';
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import axios from "axios";

export function FilmForm(props) {
    const [isEmptyField, changeFieldFlag] = useState(false);
    const [file, changeFile] = useState();
    const [film, changeFilm] = useState('');
    const [duration, changeDuration] = useState('');
    const [description, changeDescription] = useState('');

    useEffect(() => {
        if(props.initial) {
            changeFilm(props.initial.name);
            changeDuration(props.initial.duration);
            changeDescription(props.initial.description);
        }
    }, [props.initial])


    function handleImg(e) {
        changeFile(e.target.files[0]);
    }

    return(
        <Form className='create_film_form'>
            {isEmptyField && <Alert className='admin_login_alert' variant="danger" >
                <p>
                    Все поля должны быть заполнены!
                </p>
            </Alert>}
            <Form.Group>
                <Form.Label>Фильм</Form.Label>
                <Form.Control placeholder="Enter film" value={film} onChange={(e) => {changeFilm(e.target.value)}}/>
            </Form.Group>

            <Form.Group>
                <Form.Label>Длительность</Form.Label>
                <Form.Control type='time' placeholder="Enter duration" value={duration} onChange={(e) => changeDuration(e.target.value)}/>
            </Form.Group>

            <Form.Group>
                <Form.Label>Описание</Form.Label>
                <Form.Control as="textarea" rows="3" placeholder="Enter description" value={description} onChange={(e) => changeDescription(e.target.value)}/>
            </Form.Group>
            <Form.Label>Загрузить постер</Form.Label>
            <input onChange={e => handleImg(e)} type="file"  name="file" name="f"/>
            <Button className='admin_login_button'  variant="primary" onClick={() => {saveFilm()}}>
                Сохранить
            </Button>
        </Form>
    )

    function saveFilm() {
        if((film.trim() === '') ||
            (duration.trim() === '') ||
            (description.trim() === '') ) {
                changeFieldFlag(true)
        } else if(props.initial) {
            props.editFilm({
                id:  props.initial._id,
                name: film,
                duration: duration,
                description: description
            }, file)
            props.changeFormFlag(false)
            changeFilm('');
            changeDuration('');
            changeDescription('');
            changeFieldFlag(false)
        } else {
            props.addFilm({
                name: film,
                duration: duration,
                description: description,
            }, file)
            props.changeFormFlag(false)
            changeFilm('');
            changeDuration('');
            changeDescription('');
            changeFieldFlag(false)
        }
    }
}

const mapStateToProps = (state) => ({
    admin: state.admin,
    loader: state.loader,
    films: state.films
});

const mapDispatchToProps = (dispatch) =>  ({
    getFilms: () => {dispatch({type: 'GET_FILM'})},
    addFilm: (data, file) => {dispatch({type: 'ADD_FILM', film: data, file: file})},
    editFilm: (film, file) => {dispatch({type: 'EDIT_FILM', film: film, file: file})},
    deleteFilm: (id) => {dispatch({type: 'DELETE_FILM', id: id})},
    loginAdmin: (admin) => {dispatch({type: "LOGIN_ADMIN", admin: admin})},
    logoutAdmin: () => {dispatch({type: "LOGOUT_ADMIN"})},
    checkIsAdmin: (admin) => {dispatch({type: "CHECK_IS_ADMIN", admin: admin})}
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(FilmForm));