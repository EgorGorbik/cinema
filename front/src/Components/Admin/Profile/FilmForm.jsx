import React, {Component, useRef, useState, useEffect} from 'react';
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import axios from "axios";

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


    function handleImg(e) {
        var formData = new FormData();
        console.log(e.target.files[0])
        formData.append('file', e.target.files[0])

        axios.post("http://localhost:5000/film/img", formData, { // receive two parameter endpoint url ,form data
        })
            .then(res => { // then print response status
                console.log(res)
                const base64 = btoa(
                    new Uint8Array(res.data).reduce(
                        (data, byte) => data + String.fromCharCode(byte),
                        '',
                    ),
                );
               console.log(base64)
            })

        /*axios.request({
            method: 'post',
            url: `http://localhost:5000/film/img`,
            data: e.target.files[0]
        });*/
        /*let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            console.log(reader.result);
            console.log(file);
            axios.request({
                method: 'post',
                url: `http://localhost:5000/film/img`,
                data: {"d": reader.result}
            });
        }
        reader.readAsDataURL(file)*/


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
            <Form.Label>Загрузить постер</Form.Label>
            <input onChange={e => handleImg(e)} type="file"  name="file" name="f"/>
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
        props.changeFormFlag(false)
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