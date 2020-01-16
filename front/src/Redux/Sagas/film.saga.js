import {takeEvery} from "@redux-saga/core/effects";
import {call, put} from "redux-saga/effects";
import {loaderToFalse, loaderToTrue} from "../ActionCreators/loader.action";
import {loginAdminError, loginAdminSuccess} from "../ActionCreators/admin.action";
import * as films from '../Service/film.service';
import {getFilmsSuccess, deleteFilmSuccess, createFilmSuccess, editFilmSuccess} from "../ActionCreators/films.action";

function* getFilms(action) {
    try {
        let { data } = yield call(films.getFilms);
        console.log(data);
        yield put(getFilmsSuccess(data));
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
        let {data}= yield call(films.addFilm, action.film);
        let f = yield call(films.addPoster, action.file, data._id);
        console.log(f.data.filename)
        console.log(data)
        yield put(createFilmSuccess(data))
    } catch (error) {
        console.log(error)
    }
}

function* editFilm(action) {
    try {
        let {data}= yield call(films.editFilm, action.film);
        let f = yield call(films.addPoster, action.file, data._id);
        console.log(action.film)
        yield put(editFilmSuccess(data))
    } catch (error) {

    }
}

export default function* watchFilms() {
    yield takeEvery("GET_FILM", getFilms);
    yield takeEvery("DELETE_FILM", deleteFilm);
    yield takeEvery("ADD_FILM", addFilm);
    yield takeEvery("EDIT_FILM", editFilm);
}