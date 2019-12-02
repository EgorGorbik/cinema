import React from 'react';
import {Redirect, Route, Switch, withRouter} from "react-router";

export const PrivateRoute = ({component: Component, ...rest}) => (
    <Route
        {...rest}
        render={props =>
            true ? (<Component {...props}/>) : (<Redirect to={{pathname: '/sdf'}}/>)
        }
    />
)

