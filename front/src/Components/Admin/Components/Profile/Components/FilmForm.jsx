import React, {Component, useRef, useState, useEffect} from 'react';
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {withRouter} from "react-router";
import {connect} from "react-redux";

export function FilmForm(props) {
    const [isEmptyField, changeFieldFlag] = useState(false);

    let film = useRef();
    let duration = useRef();
    let description = useRef();


    useEffect(() => {
        if(props.initial) {
            film.current.value = props.initial.name;
            duration.current.value = props.initial.duration;
            description.current.value = props.initial.description;
        }
    })


    return(
        <Form className='create_film_form'>
            {isEmptyField && <Alert className='admin_login_alert' variant="danger" >
                <p>
                    Все поля должны быть заполнены!
                </p>
            </Alert>}
            <Form.Group>
                <Form.Label>Фильм</Form.Label>
                <Form.Control type="text" placeholder="Enter film" ref={film}/>
            </Form.Group>

            <Form.Group>
                <Form.Label>Длительность</Form.Label>
                <Form.Control type="time" placeholder="Enter duration" ref={duration}/>
            </Form.Group>

            <Form.Group>
                <Form.Label>Описание</Form.Label>
                <Form.Control as="textarea" rows="3" placeholder="Enter description" ref={description}/>
            </Form.Group>
            <Button className='admin_login_button'  variant="primary" onClick={() => {saveFilm()}}>
                Сохранить
            </Button>
        </Form>
    )

    function saveFilm() {
        if((film.current.value.trim() === '') ||
            (duration.current.value.trim() === '') ||
            (description.current.value.trim() === '')) {
                changeFieldFlag(true)
        } else if(props.initial) {
            props.editFilm({
                id:  props.initial._id,
                name: film.current.value,
                duration: duration.current.value,
                description: description.current.value
            })
        } else {
            props.addFilm({
                name: film.current.value,
                duration: duration.current.value,
                description: description.current.value,
            })
        }
        film.current.value = '';
        duration.current.value = '';
        description.current.value = '';
        changeFieldFlag(false)
    }
}

const mapStateToProps = (state) => ({
    admin: state.admin,
    loader: state.loader,
    films: state.films
});

const mapDispatchToProps = (dispatch) =>  ({
    getFilms: () => {dispatch({type: 'GET_FILM'})},
    addFilm: (data) => {dispatch({type: 'ADD_FILM', film: data})},
    editFilm: (film) => {dispatch({type: 'EDIT_FILM', film: film})},
    deleteFilm: (id) => {dispatch({type: 'DELETE_FILM', id: id})},
    loginAdmin: (admin) => {dispatch({type: "LOGIN_ADMIN", admin: admin})},
    logoutAdmin: () => {dispatch({type: "LOGOUT_ADMIN"})},
    checkIsAdmin: (admin) => {dispatch({type: "CHECK_IS_ADMIN", admin: admin})}
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(FilmForm));