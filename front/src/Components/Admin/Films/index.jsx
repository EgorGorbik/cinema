import React, { useState, useEffect } from 'react';
import {connect} from "react-redux";
import {Redirect} from "react-router";
import Header from "../Header";
import {withRouter} from "react-router";
import Films from "./Films";
import Loader from "../../shared/Loader";

function AdminFilms(props) {
    const [isLoading, changeLoading] = useState(false);
    const [mustRedirect, changeRedirectFlag] = useState(false);

    useEffect(() => {
        props.getFilms()
    }, [])

    useEffect(() => {
        if(props.admin.accessDenied) {
            changeRedirectFlag(true)
        }
    }, [props.admin])

    useEffect(() => {
        if(props.loader) {
            changeLoading(true);
        } else {
            changeLoading(false);
        }
    }, [props.loader])


    if(mustRedirect) {
        return(<Redirect to='/admin/login'/>)
    }


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
            <Films/>
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
)(AdminFilms));