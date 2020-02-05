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
        console.log(date)
        props.getSessions(date);
        changeSelectedDate(convertDateToRussianFormat(new Date()))
    }, [])

    let date = React.createRef();

    console.log(props.films)
    console.log(props.sessions)

    function searchSessionForDay() {
        if(date.current.value) {
            props.getSessions(date.current.value)
            changeSelectedDate(convertDateToRussianFormat(date.current.value))
        }
    }

    function convertDateToInputFormat() {
        let date = new Date();
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        let d = date.getDate();
        if(m < 10) {
            m = '0' + m;
        }
        if(d < 10) {
            d = '0' + d;
        }
        return y + '-' + m + '-' + d;
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
            <input ref={date} type='date' />
            <button onClick={() => searchSessionForDay()}>Найти</button>
            {isFormOpen &&
                <SessionForm changeFormFlag={changeFormFlag}/>
            }
            <div className='date'>{selectedDate}</div>
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
    getSessions: (date) => {dispatch({type: 'GET_SESSIONS', date: date})},
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(FilmsSessions));