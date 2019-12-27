import React, {Component} from 'react';
import {Redirect, Route, Switch, withRouter} from "react-router";
import {connect} from "react-redux";
import AdminLogIn from "../Admin/Components/LogIn";
import Profile from "../Admin/Components/Profile";


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