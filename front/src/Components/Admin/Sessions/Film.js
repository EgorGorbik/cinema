import React from 'react';
import Button from "react-bootstrap/Button";
import Session from "./Session";
import {withRouter} from "react-router";
import {connect} from "react-redux";

function Film(props) {

    console.log(props.sessions)
    return (
        <div className='film'>
            <img className='poster' src={ props.src ? `http://localhost:5000/${props.src}` : './../../../img/noposter.jpg'}/>
            <div className='session_content'>
                <div className='film_header_content'>
                    <h2>{props.name}</h2>
                    <div className='film_btn'>
                        <Button className='btn_change' onClick={() => {props.editFilm(props.info); window.scrollTo(0, 0)}}>Изменить</Button>
                        <Button className='btn_delete' onClick={() => alert('del')}>Удалить</Button>
                    </div>
                </div>

                <div className='sessions'>
                    {props.sessions.map(el => {
                        if(el.filmId.includes(props.id)) return <Session time={el.time} hall={el.hall}/>
                    })}
                </div>
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
)(Film));