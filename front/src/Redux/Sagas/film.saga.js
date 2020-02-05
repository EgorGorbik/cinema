import {takeEvery} from "@redux-saga/core/effects";
import {call, put} from "redux-saga/effects";
import {loaderToFalse, loaderToTrue} from "../ActionCreators/loader.action";
import {loginAdminError, loginAdminSuccess} from "../ActionCreators/admin.action";
import * as films from '../Service/film.service';
import {getFilmsSuccess, deleteFilmSuccess, createFilmSuccess, editFilmSuccess, getFilmSuccess} from "../ActionCreators/films.action";

function* getFilms(action) {
    try {
        yield put(loaderToTrue());
        let { data } = yield call(films.getFilms);
        yield put(getFilmsSuccess(data));
        yield put(loaderToFalse());
    } catch (error) {
        alert(error)
    }
}

function* getFilm(action) {
    try {
        yield put(loaderToTrue());
        let { data } = yield call(films.getFilm, action.id);
        console.log(data)
        yield put(getFilmSuccess(data[0]));
        yield put(loaderToFalse());
    } catch (error) {
        alert(error)
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

export default function* watchFilms() {
    yield takeEvery("GET_FILMS", getFilms);
    yield takeEvery("GET_FILM", getFilm);
    yield takeEvery("DELETE_FILM", deleteFilm);
    yield takeEvery("ADD_FILM", addFilm);
    yield takeEvery("EDIT_FILM", editFilm);
}