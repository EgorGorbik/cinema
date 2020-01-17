import React from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import '../styles/_index.scss';

function Session(props) {


    return (
        <div className='session_item'>
            <div>{props.time}</div>
            <div>{props.hall}</div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    sessions: state.sessions
});

const mapDispatchToProps = (dispatch) =>  ({
    getSessions: (date) => {console.log(date); dispatch({type: 'GET_SESSIONS', date: date})},
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Session));