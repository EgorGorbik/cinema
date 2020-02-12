import {takeEvery} from "@redux-saga/core/effects";
import {call, put} from "redux-saga/effects";
import {loaderToFalse, loaderToTrue} from "../ActionCreators/loader.action";
import {loginAdminError, loginAdminSuccess} from "../ActionCreators/admin.action";
import * as films from '../Service/film.service';
import * as sessions from '../Service/session.service';
import * as users from '../Service/user.service';
import {getFilmsSuccess, deleteFilmSuccess, createFilmSuccess, editFilmSuccess} from "../ActionCreators/films.action";
import {createSessionSuccess, setSessionsSuccess, setSessionSuccess, deleteSessionSuccess, setSessionFaild, meCancelChoosePlaceSuccess} from "../ActionCreators/sessions";

function* getSessions(action) {
    try {
        let { data } = yield call(sessions.getSessions, action.date);
        console.log(data)
        yield put(setSessionsSuccess(data.sessions));
       // yield put(getFilmsSuccess(data.films));
    } catch (error) {
        console.log(error)
    }
}

function* getSession(action) {
    try {
        yield put(loaderToTrue());
        let { data } = yield call(sessions.getSession, action.id);
        yield put(setSessionSuccess(data[0]));
        yield put(loaderToFalse());
    } catch (error) {
        yield put(setSessionFaild());
        yield put(loaderToFalse());
    }
}

function* deleteSession(action) {
    try {
        yield put(loaderToTrue());
        let { data } = yield call(sessions.delSession, action.id);
        yield put(deleteSessionSuccess(data._id))
        yield put(loaderToFalse());
    } catch (error) {

    }
}

function* choosePlace(action) {
    try {
        let {data} = yield call(sessions.choosePlace, action.data);
        let user = yield call(users.updateUser, action.user);   // запрос на update user info
        console.log(user)
    } catch (error) {
        alert(error)
    }
}

function* cancelChoosePlace(action) {
    try {
        console.log(action.user)
        let {data} = yield call(sessions.cancelChoosePlace, action.data);   // запрос на присвоению места в бд статуса 'свободно'
        let user = yield call(users.updateUser, action.user);   // запрос на update user info
        console.log(user)
        yield put(meCancelChoosePlaceSuccess(data))
    } catch (error) {
        alert(error)
    }
}

function* addSession(action) {
    try {
        let {data} = yield call(sessions.addSession, action.session);
        // если день на который создаём сеанс совпадает с тем что отображён сейчас
        if(new Date(data.date).getFullYear() === new Date().getFullYear() && new Date(data.date).getMonth() === new Date().getMonth() && new Date(data.date).getDate() === new Date().getDate()) {
            yield put(createSessionSuccess(data))
        }
    } catch (error) {
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
    yield takeEvery("DEL_SESSION", deleteSession);
    yield takeEvery("CHOOSE_PLACE", choosePlace);
    yield takeEvery("CANCEL_CHOOSE_PLACE", cancelChoosePlace);
}