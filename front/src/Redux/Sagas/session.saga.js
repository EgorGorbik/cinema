import {takeEvery} from "@redux-saga/core/effects";
import {call, put} from "redux-saga/effects";
import {loaderToFalse, loaderToTrue} from "../ActionCreators/loader.action";
import {loginAdminError, loginAdminSuccess} from "../ActionCreators/admin.action";
import * as films from '../Service/film.service';
import * as sessions from '../Service/session.service';
import {getFilmsSuccess, deleteFilmSuccess, createFilmSuccess, editFilmSuccess} from "../ActionCreators/films.action";
import {setSessionsSuccess} from "../ActionCreators/sessions";

function* getSessions(action) {
    console.log('inside saga')
    try {
        let { data } = yield call(sessions.getSessions, action.date);
        console.log(data)
        yield put(setSessionsSuccess(data.sessions));
    } catch (error) {

    }
}

function* deleteFilm(action) {
    try {
        let  data  = yield call(films.delFilm, action.id);
        yield put(deleteFilmSuccess(action.id))
    } catch (error) {

    }
}

function* addFilm(action) {
    try {
        let f = yield call(films.addPoster, action.file, 123);
        let film = action.film;
        film.src = f.data.filename;
        let {data} = yield call(films.addFilm, action.film);
        yield put(createFilmSuccess(data))
    } catch (error) {
        console.log(error)
    }
}

function* editFilm(action) {
    try {
        let f = yield call(films.addPoster, action.file, 123);
        let film = action.film;
        film.src = f.data.filename;
        let {data}= yield call(films.editFilm, action.film);
        yield put(editFilmSuccess(data))
    } catch (error) {

    }
}

export default function* watchSagas() {
    yield takeEvery("GET_SESSIONS", getSessions);
}