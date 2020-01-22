import React, { useState, useEffect } from 'react';
import {connect} from "react-redux";
import {Redirect} from "react-router";
import Header from "../../shared/Header";
import {withRouter} from "react-router";
import Films from "./Films";
import Loader from "../../shared/Loader";

function Profile(props) {

    if(props.loader || props.admin.isAdminLogged === undefined) {
        return <Loader/>
    } else {
        if(!props.admin.isAdminLogged) {
            return (<Redirect to='/admin/login'/>)
        }
    }

    return(
        <div>
            <Header/>
        </div>
    )
}

const mapStateToProps = (state) => ({
    admin: state.admin,
    loader: state.loader,
    films: state.films
});

const mapDispatchToProps = (dispatch) =>  ({
    getFilms: () => {dispatch({type: 'GET_FILM'})},
    loginAdmin: (admin) => {dispatch({type: "LOGIN_ADMIN", admin: admin})},
    logoutAdmin: () => {dispatch({type: "LOGOUT_ADMIN"})},
    checkIsAdmin: (admin) => {dispatch({type: "CHECK_IS_ADMIN", admin: admin})}
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile));