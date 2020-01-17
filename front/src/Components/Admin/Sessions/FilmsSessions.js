import React from 'react';
import '../styles/_index.scss';
import Film from "./Film";
import {withRouter} from "react-router";
import {connect} from "react-redux";

function FilmsSessions(props) {

    const date = React.createRef();

    console.log(props.sessions)

    function h() {
        console.log(date.current.value)
        props.getSessions(date.current.value)
    }

    return (
        <div className='film_content'>
            <input ref={date} type='date' onChange={(e) => {console.log(e.target.value)}}/>
            <button onClick={() => h()}>Найти</button>
            <div className='films'>
                {props.sessions.map((e) => <Film />)}
                <Film/>
                <Film/>
                <Film/>
            </div>
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
)(FilmsSessions));