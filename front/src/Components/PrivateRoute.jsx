import React from 'react';
import {Redirect, Route, Switch, withRouter} from "react-router";
import {connect} from "react-redux";

export const PrivateRoute = ({component: Component, isAdmin, ...rest}) => (
    <Route
        {...rest}
        render={props => {
            return (isAdmin ? (<Component {...props}/>) : (<Redirect to={{pathname: '/sdf'}}/>))
        }

        }
    />
)

const mapStateToProps = (state) => ({
    isAdmin: state.isAdmin
});

const mapDispatchToProps =  ({
});

export default (connect(
    mapStateToProps,
    mapDispatchToProps
)(PrivateRoute));
