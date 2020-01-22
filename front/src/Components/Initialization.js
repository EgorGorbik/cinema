import React, {useEffect} from 'react';
import Router from "./Router/Router";
import {withRouter} from "react-router";
import {connect} from "react-redux";

function Initialization(props) {
    //здесь происходят действия при перезагрузке страницы

    console.log(props.admin)
    useEffect(() => {
        props.checkIsAdmin();
    }, [props.checkIsAdmin]);

    return (
        <Router/>
    )
}

const mapStateToProps = (state) => ({
    sessions: state.sessions,
    films: state.films,
    admin: state.admin
});

const mapDispatchToProps = (dispatch) =>  ({
    getSessions: (date) => {console.log(date); dispatch({type: 'GET_SESSIONS', date: date})},
    checkIsAdmin: (admin) => {dispatch({type: "CHECK_IS_ADMIN", admin: admin})}
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Initialization));