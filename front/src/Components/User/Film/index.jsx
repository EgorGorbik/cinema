import React, {useEffect} from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import Header from "../../Admin/Header";
import Loader from "../../shared/Loader";

function Film(props) {
    useEffect(() => {
        props.getFilm(props.match.params.id)
    }, [])

    if(props.loader || !props.film) {
        return <Loader/>
    }

    return(
        <>
            <Header/>
            <img className='poster_photo' src={ props.film.src ? `http://localhost:5000/${props.film.src}` : './../../../img/noposter.jpg'}/>
            <div></div>
        </>
    )
}

const mapStateToProps = (state) => ({
    admin: state.admin,
    loader: state.loader,
    films: state.films,
    film: state.film
});

const mapDispatchToProps = (dispatch) =>  ({
    getFilms: () => {dispatch({type: 'GET_FILMS'})},
    getFilm: (id) => {dispatch({type: 'GET_FILM', id: id})},
    loginAdmin: (admin) => {dispatch({type: "LOGIN_ADMIN", admin: admin})},
    logoutAdmin: () => {dispatch({type: "LOGOUT_ADMIN"})},
    checkIsAdmin: (admin) => {dispatch({type: "CHECK_IS_ADMIN", admin: admin})}
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Film));