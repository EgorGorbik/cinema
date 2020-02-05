import React, {useEffect} from 'react';
import Header from "../Header";
import Button from "react-bootstrap/Button";
import '../styles/_index.scss';
import FilmsSessions from "./FilmsSessions";
import {Redirect, withRouter} from "react-router";
import {connect} from "react-redux";
import Loader from "../../shared/Loader";

function AdminSessions(props) {

    useEffect(() => {
        props.getFilms()
    }, [])

    if(props.loader || props.admin.isAdminLogged === undefined) {
        return <Loader/>
    } else {
        if(!props.admin.isAdminLogged) {
            return (<Redirect to='/admin/login'/>)
        }
    }

    return (
        <div>
            <Header/>
            <FilmsSessions/>
        </div>
    )
}

const mapStateToProps = (state) => ({
    sessions: state.sessions,
    films: state.films,
    admin: state.admin
});

const mapDispatchToProps = (dispatch) =>  ({
    getFilms: () => {dispatch({type: 'GET_FILMS'})},
    getSessions: (date) => {console.log(date); dispatch({type: 'GET_SESSIONS', date: date})},
    checkIsAdmin: (admin) => {dispatch({type: "CHECK_IS_ADMIN", admin: admin})}
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminSessions));