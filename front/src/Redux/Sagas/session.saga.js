import {takeEvery} from "@redux-saga/core/effects";
import {call, put} from "redux-saga/effects";
import {loaderToFalse, loaderToTrue} from "../ActionCreators/loader.action";
import {loginAdminError, loginAdminSuccess} from "../ActionCreators/admin.action";
import * as films from '../Service/film.service';
import * as sessions from '../Service/session.service';
import {getFilmsSuccess, deleteFilmSuccess, createFilmSuccess, editFilmSuccess} from "../ActionCreators/films.action";
import {createSessionSuccess, setSessionsSuccess, setSessionSuccess} from "../ActionCreators/sessions";

function* getSessions(action) {
    console.log('inside saga')
    try {
        let { data } = yield call(sessions.getSessions, action.date);
        console.log(data)
        yield put(setSessionsSuccess(data.sessions));
       // yield put(getFilmsSuccess(data.films));
    } catch (error) {
        alert(error)
    }
}

function* getSession(action) {
    try {
        yield put(loaderToTrue());
        let { data } = yield call(sessions.getSession, action.id);
        console.log(data[0])
        yield put(setSessionSuccess(data[0]));
        yield put(loaderToFalse());
    } catch (error) {
        alert(error)
        yield put(loaderToFalse());
    }
}

function* deleteFilm(action) {
    try {
        let  data  = yield call(films.delFilm, action.id);
        yield put(deleteFilmSuccess(action.id))
    } catch (error) {

    }
}

function* addSession(action) {
    try {
        let {data} = yield call(sessions.addSession, action.session);
        console.log(data)
        console.log(new Date(data.date))
        console.log(new Date())
        // если день на который создаём сеанс совпадает с тем что отображён сейчас
        if(new Date(data.date).getFullYear() === new Date().getFullYear() && new Date(data.date).getMonth() === new Date().getMonth() && new Date(data.date).getDate() === new Date().getDate()) {
            yield put(createSessionSuccess(data))
        }
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
    yield takeEvery("ADD_SESSION", addSession);
    yield takeEvery("GET_SESSION", getSession);
}