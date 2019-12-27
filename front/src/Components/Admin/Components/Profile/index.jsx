import React, { useState, useEffect } from 'react';
import {connect} from "react-redux";
import {Redirect} from "react-router";
import Header from "../../../shared/Header";
import {withRouter} from "react-router";
import Films from "./Components/Films";

function Profile(props) {
    const [isLoading, changeLoading] = useState(false);
    const [mustRedirect, changeRedirectFlag] = useState(false);

    console.log(props.films)

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

    useEffect(() => {
        props.checkIsAdmin({a: 1});
    }, [props.checkIsAdmin]);

    if(mustRedirect) {
        return(<Redirect to='/admin/login'/>)
    }

    if(isLoading){
        return <div>Loading...</div>
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
    getFilms: () => {dispatch({type: 'GET_FILM'})},
    loginAdmin: (admin) => {dispatch({type: "LOGIN_ADMIN", admin: admin})},
    logoutAdmin: () => {dispatch({type: "LOGOUT_ADMIN"})},
    checkIsAdmin: (admin) => {dispatch({type: "CHECK_IS_ADMIN", admin: admin})}
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile));