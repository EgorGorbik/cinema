import {takeEvery} from "@redux-saga/core/effects";
import {call, put} from "redux-saga/effects";
import {loaderToFalse, loaderToTrue} from "../ActionCreators/loader.action";
import {getDatesSuccess} from "../ActionCreators/date.action";
import {loginAdminError, loginAdminSuccess} from "../ActionCreators/admin.action";
import * as filmService from '../Service/film.service';
import {
    getFilmsSuccess,
    deleteFilmSuccess,
    createFilmSuccess,
    editFilmSuccess,
    getFilmSuccess
} from "../ActionCreators/films.action";

function* getFilms(action) {
    try {
        yield put(loaderToTrue());
        let { data } = yield call(filmService.getFilms);
        yield put(getFilmsSuccess(data));
        yield put(loaderToFalse());
    } catch (error) {
        alert(error)
    }
}

function* getFilm(action) {
    try {
        yield put(loaderToTrue());
        let { data } = yield call(filmService.getFilm, action.id);
        console.log(data)
        yield put(getFilmSuccess(data[0]));
        yield put(loaderToFalse());
    } catch (error) {
        alert(error)
    }
}

function* getSessionsForFilm(action) {
    try {
        yield put(loaderToTrue());
        let { data } = yield call(filmService.getSessionsForFilm, action.id);
        console.log(data)
        yield put(getDatesSuccess(data));
        yield put(loaderToFalse());
    } catch (error) {
        alert(error)
    }
}

function* deleteFilm(action) {
    try {
        let  data  = yield call(filmService.delFilm, action.id);
        yield put(deleteFilmSuccess(action.id))
    } catch (error) {

    }
}

function* addFilm(action) {
    try {
        let f = yield call(filmService.addPoster, action.file, 123);
        let film = action.film;
        film.src = f.data.filename;
        let {data} = yield call(filmService.addFilm, action.film);
        yield put(createFilmSuccess(data))
    } catch (error) {
        console.log(error)
    }
}

function* editFilm(action) {
    try {
        let f = yield call(filmService.addPoster, action.file, 123);
        let film = action.film;
        film.src = f.data.filename;
        console.log('before the request')
        let {data}= yield call(filmService.editFilm, action.film);
        console.log(data)
        yield put(editFilmSuccess(data))
    } catch (error) {
        console.log(error)
    }
}

export default function* watchFilms() {
    yield takeEvery("GET_FILMS", getFilms);
    yield takeEvery("GET_SESSIONS_FOR_FILM", getSessionsForFilm);
    yield takeEvery("GET_FILM", getFilm);
    yield takeEvery("DELETE_FILM", deleteFilm);
    yield takeEvery("ADD_FILM", addFilm);
    yield takeEvery("EDIT_FILM", editFilm);
}