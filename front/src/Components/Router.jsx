import React, {Component} from 'react';
import {Redirect, Route, Switch, withRouter} from "react-router";
import Profile from '../Components/Admin/Profile';
import PrivateRoute from '../Components/PrivateRoute';

class Router extends Component {

    render() {
        return(
            <Switch>
                <PrivateRoute path='/admin/profile' component={Profile}/>
            </Switch>
        )
    }
}

export default Router;
