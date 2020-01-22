import React, {useState} from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {Form, Col, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";

function SessionForm(props) {

    const [film, changeFilm] = useState('');
    const [hall, changeHall] = useState('');
    const [date, changeDate] = useState('');
    const [time, changeTime] = useState('');

    function addSession() {
        console.log(film)
        console.log(hall)
        console.log(date)
        console.log(time)
        let session = {
            filmId: film,
            hall: hall,
            places: [],
            date: date,
            time: time
        }
        props.addSession(session)
    }

    return(
        <div>
            <select onChange={(v) =>  changeFilm(v.target.value)}>
                <option disabled selected="selected">Выберите фильм</option>
                {props.films.map(e => <option value={e._id}>{e.name}</option>)}
            </select>

            <Form.Group as={Row}>
                <Form.Label as="legend" column sm={2}>
                    Выберите зал
                </Form.Label>
                <Col sm={10}>
                    <Form.Check
                        type="radio"
                        label="1 зал"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios1"
                        onClick={() => changeHall('1')}
                    />
                    <Form.Check
                        type="radio"
                        label="2 зал"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios2"
                        onClick={() => changeHall('2')}
                    />
                    <Form.Check
                        type="radio"
                        label="3 зал"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios3"
                        onClick={() => changeHall('3')}
                    />
                </Col>
            </Form.Group>

            <input type='date' onChange={(e) => changeDate(e.target.value)}/>
            <input type='time' onChange={(e) => changeTime(e.target.value)}/>
            <Button onClick={() => addSession()}>Отправить</Button>
        </div>
    )
}

const mapStateToProps = (state) => ({
    sessions: state.sessions,
    films: state.films
});

const mapDispatchToProps = (dispatch) =>  ({
    getSessions: (date) => {console.log(date); dispatch({type: 'GET_SESSIONS', date: date})},
    addSession: (date) => {console.log(date); dispatch({type: 'ADD_SESSION', session: date})},
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(SessionForm));