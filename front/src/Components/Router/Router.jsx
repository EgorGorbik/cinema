import React, {Component} from 'react';
import {Redirect, Route, Switch, withRouter} from "react-router";
import {connect} from "react-redux";
import AdminLogIn from "../Admin/LogIn";
import Profile from "../Admin/Profile";
import AdminFilms from "../Admin/Films";
import AdminSessions from "../Admin/Sessions";
import SessionInfo from "../Admin/Sessions/SessionInfo";
import Main from "../User/Main";
import Film from "../User/Film";
import Session from "../User/Session";
import Login from "../User/LogIn"
import Registration from "../User/Registration";


class Router extends Component {

    render() {
        return(
            <Switch>
                <Route exact path="/">
                    <Main/>
                </Route>
                <Route exact path="/film/:id">
                    <Film/>
                </Route>
                <Route exact path="/session/:id">
                    <Session/>
                </Route>
                <Route exact path="/login">
                    <Login/>
                </Route>
                <Route exact path="/registration">
                    <Registration/>
                </Route>
                <Route exact path='/admin'>
                    <Profile/>
                </Route>
                <Route exact path='/admin/films'>
                    <AdminFilms/>
                </Route>
                <Route exact path='/admin/sessions'>
                    <AdminSessions/>
                </Route>
                <Route exact path='/admin/session/:id'>
                    <SessionInfo/>
                </Route>
                <Route exact path="/admin/login">
                    <AdminLogIn/>
                </Route>
            </Switch>
        )
    }
}

const mapStateToProps = (state) => ({
    admin: state.admin
});

const mapDispatchToProps = (dispatch) =>  ({
    loginAdmin: (admin) => {dispatch({type: "LOGIN_ADMIN", admin: admin})}
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Router);