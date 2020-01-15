import React from 'react';
import '../styles/_index.scss';
import Button from "react-bootstrap/Button";
import {withRouter} from "react-router";
import {connect} from "react-redux";

function Film(props) {
    return(
        <div className='film'>
            <img className='poster' src='../../../../../img/interstellar.jpg'/>
            <div className='content'>
                <div className='film_header_content'>
                    <h2>{props.info.name}</h2>
                    <div className='film_btn'>
                        <Button className='btn_change' onClick={() => props.editFilm(props.info)}>Изменить</Button>
                        <Button className='btn_delete' onClick={() => deleteFilm(props.info._id)}>Удалить</Button>
                    </div>
                </div>
                <div>Длительность: {props.info.duration}</div>
                <p className='description'>{props.info.description}</p>
            </div>
        </div>
    )

    function deleteFilm(id) {
        props.deleteFilm(id)
    }


}

const mapStateToProps = (state) => ({
    admin: state.admin,
    loader: state.loader,
    films: state.films
});

const mapDispatchToProps = (dispatch) =>  ({
    getFilms: () => {dispatch({type: 'GET_FILM'})},
    deleteFilm: (id) => {dispatch({type: 'DELETE_FILM', id: id})},
    loginAdmin: (admin) => {dispatch({type: "LOGIN_ADMIN", admin: admin})},
    logoutAdmin: () => {dispatch({type: "LOGOUT_ADMIN"})},
    checkIsAdmin: (admin) => {dispatch({type: "CHECK_IS_ADMIN", admin: admin})}
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Film));