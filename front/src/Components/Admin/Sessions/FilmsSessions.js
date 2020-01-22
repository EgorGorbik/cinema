import React, {useEffect, useState} from 'react';
import '../styles/_index.scss';
import Film from "./Film";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import Button from "react-bootstrap/Button";
import FilmForm from "../Films/FilmForm";
import Session from "./Session";
import SessionForm from "./SessionForm";

function FilmsSessions(props) {

    const [isFormOpen, changeFormFlag] = useState(false);
    const [selectedDate, changeSelectedDate] = useState('');

    useEffect(() => {
        date = convertDateToInputFormat();
        props.getSessions(date);
        changeSelectedDate(convertDateToRussianFormat(new Date()))
    }, [])

    let date = React.createRef();

    console.log(props.films)

    function searchSessionForDay() {
        console.log(date.current.value)
        props.getSessions(date.current.value)
        changeSelectedDate(convertDateToRussianFormat(date.current.value))
    }

    function convertDateToInputFormat() {
        let date = new Date();
        let y = date.getFullYear();
        let m = date.getMonth();
        let d = date.getDate();
        return y + '-' + m + 1 + '-' + d;
    }

    function convertDateToRussianFormat(d) {
        let date = new Date(d)
        let month = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
        return date.getDate() + ' ' + month[date.getMonth()] + ' ' + date.getFullYear() + ' года';

    }

    function createSession() {
        changeFormFlag(!isFormOpen)
    }

    return (
        <div className='film_content'>
            <Button onClick={() => createSession()}>{isFormOpen? 'Отмена': 'Создать'}</Button>
            <input ref={date} type='date' onChange={(e) => {console.log(e.target.value)}}/>
            <button onClick={() => searchSessionForDay()}>Найти</button>
            <div className='date'>{selectedDate}</div>
            {isFormOpen &&
                <SessionForm changeFormFlag={changeFormFlag}/>
            }
            <div className='films'>
                {props.films.map((e) => <Film id={e._id} name={e.name} src={e.src} />)}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    sessions: state.sessions,
    films: state.films
});

const mapDispatchToProps = (dispatch) =>  ({
    getSessions: (date) => {console.log(date); dispatch({type: 'GET_SESSIONS', date: date})},
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(FilmsSessions));