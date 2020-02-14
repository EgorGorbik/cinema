import {takeEvery, put, call} from "@redux-saga/core/effects";
import {loaderToFalse, loaderToTrue} from "../ActionCreators/loader.action";
import axios from "axios";
import {accessDenied, loginAdminError, loginAdminSuccess, logoutAdminSuccess} from "../ActionCreators/admin.action";
import * as users from "../Service/user.service";
import {setUserSuccess, logoutUserSuccess, setUserFailed} from "../ActionCreators/user.action";
import {cancelChoosePlaces} from "../Service/session.service";

function* loginUser(action) {
    try {
        yield put(loaderToTrue());
        let { data } = yield call(users.loginUser, action.user);
        localStorage.setItem('user_access_token', data.accessToken)
        yield put(setUserSuccess(data.user));
        yield put(loaderToFalse());
    } catch (error) {
        yield put(setUserFailed(error.response.data.error));
        yield put(loaderToFalse());
    }
}

function* isUserCheck() {
    yield put(loaderToTrue());
    try {
        let { data } = yield call(users.checkIsUser);
       // const data = yield axios({method: 'POST', url: 'http://localhost:5000/admin/getPermission', headers: {Authorization: 'Bearer ' + localStorage.getItem('admin_access_token')} } )
        yield put(setUserSuccess(data.user));
        yield put(loaderToFalse());
    } catch (error) {
     /*   yield put(loaderToTrue());
        yield put(accessDenied());*/
        yield put(loaderToFalse());
    }
}

function* deleteChoosePlaces(action) {
    yield put(loaderToTrue());
    try {
        let obj = {
            idSession: action.idSession,
            idPlaces: action.user.chooseTicketInfo.idPlaces
        }
        let session = yield call(cancelChoosePlaces, obj);
        action.user.chooseTicketInfo.idPlaces = [];
        let { data } = yield call(users.updateUser, action.user);
        // const data = yield axios({method: 'POST', url: 'http://localhost:5000/admin/getPermission', headers: {Authorization: 'Bearer ' + localStorage.getItem('admin_access_token')} } )
        yield put(setUserSuccess(data));
        yield put(loaderToFalse());
    } catch (error) {
        /*   yield put(loaderToTrue());
           yield put(accessDenied());*/
        yield put(loaderToFalse());
    }
}

function* logoutUser() {
    let { data } = yield call(users.logoutUser);
    localStorage.removeItem('user_access_token');
    yield put(logoutUserSuccess());
    yield put(loaderToFalse());
}

function* registerUser(user) {
    yield put(loaderToTrue());
    try {
        let { data } = yield call(users.registerUser, user);
        yield put(setUserSuccess(data.user));
        localStorage.setItem('user_access_token', data.accessToken);
        yield put(loaderToFalse());
    } catch (error) {
        yield put(setUserFailed(error.response.statusText));
        yield put(loaderToFalse());
    }
}

export default function* watchUserAuthManipulation() {
    yield takeEvery("LOGIN_USER", loginUser);
    yield takeEvery("CHECK_IS_USER", isUserCheck);
    yield takeEvery("LOGOUT_USER", logoutUser);
    yield takeEvery("REGISTER_USER", registerUser);
    yield takeEvery("DELETE_CHOOSE_PLACES", deleteChoosePlaces);
}