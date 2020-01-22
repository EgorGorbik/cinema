import React, {Component} from 'react';
import {Redirect, Route, Switch, withRouter} from "react-router";
import {connect} from "react-redux";
import AdminLogIn from "../Admin/LogIn";
import Profile from "../Admin/Profile";
import AdminFilms from "../Admin/Films";
import AdminSessions from "../Admin/Sessions";
import SessionInfo from "../Admin/Sessions/SessionInfo";


class Router extends Component {

    render() {
        return(
            <Switch>
                <Route exact path="/">
                    <div>sdf</div>
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