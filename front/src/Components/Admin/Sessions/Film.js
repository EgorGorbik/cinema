import React from 'react';
import Button from "react-bootstrap/Button";
import Session from "./Session";
import {withRouter} from "react-router";
import {connect} from "react-redux";

function Film(props) {
    return (
        <div className='film'>
            <img className='poster' src={'./../../../img/noposter.jpg'}/>
            <div className='session_content'>
                <div className='film_header_content'>
                    <h2>Холоп</h2>
                    <div className='film_btn'>
                        <Button className='btn_change' onClick={() => {props.editFilm(props.info); window.scrollTo(0, 0)}}>Изменить</Button>
                        <Button className='btn_delete' onClick={() => alert('del')}>Удалить</Button>
                    </div>
                </div>

                <div className='sessions'>
                    {props.sessions.map(el => <Session time={el.time} hall={el.hall}/>)}
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