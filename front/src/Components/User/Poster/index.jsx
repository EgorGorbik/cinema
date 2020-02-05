import React from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import './styles/_index.scss';
import {Button} from "react-bootstrap";

function Poster(props) {
    return (
        <div className='poster_block'>
            <img className='poster_photo' src={ props.info.src ? `http://localhost:5000/${props.info.src}` : './../../../img/noposter.jpg'}/>
            <button className="btn_buy" onClick={() => props.history.push(`/film/${props.info._id}`)}>
                <span className="text">Купить</span>
            </button>
        </div>
    )
}

const mapStateToProps = (state) => ({
    admin: state.admin,
    loader: state.loader,
    films: state.films
});

const mapDispatchToProps = (dispatch) =>  ({
    getFilms: () => {dispatch({type: 'GET_FILMS'})},
    loginAdmin: (admin) => {dispatch({type: "LOGIN_ADMIN", admin: admin})},
    logoutAdmin: () => {dispatch({type: "LOGOUT_ADMIN"})},
    checkIsAdmin: (admin) => {dispatch({type: "CHECK_IS_ADMIN", admin: admin})}
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Poster));