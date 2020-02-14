import React, {useEffect, useRef} from 'react';
import Router from "./Router/Router";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {socket} from "../config/socket";
import userEvent from "@testing-library/user-event";

function Initialization(props) {
    //здесь происходят действия при перезагрузке/загрузке страницы

    useEffect(() => {
        socket.on('socketInRoom',(e) => {
            alert(e)
        })

        socket.on('smdChoosePlace',(e) => {
            props.smdChoosePlace(e)
        })

        socket.on('smdCancelChoosePlace',(e) => {
            props.smdCancelChoosePlace(e)
        })

    }, [])

    useEffect(() => {
        props.checkIsAdmin();
    }, []);

    useEffect(() => {
        props.checkIsUser()
    }, [])

    return (
        <Router/>
    )
}

const mapStateToProps = (state) => ({
    sessions: state.sessions,
    films: state.films,
    admin: state.admin
});

const mapDispatchToProps = (dispatch) =>  ({
    getSessions: (date) => {dispatch({type: 'GET_SESSIONS', date: date})},
    checkIsAdmin: (admin) => {dispatch({type: "CHECK_IS_ADMIN", admin: admin})},
    checkIsUser: (user) => {dispatch({type: "CHECK_IS_USER", user: user})},
    smdChoosePlace: (id) => {dispatch({type: "CHOOSE_PLACE_SUCCESS", id: id})},
    smdCancelChoosePlace: (id) => {dispatch({type: "CANCEL_CHOOSE_PLACE_SUCCESS", id: id})},
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Initialization));