import {takeEvery} from "@redux-saga/core/effects";
import { push } from 'react-router-redux';
import {call, put} from "redux-saga/effects";
import axios from "axios";
import {accessDenied, loginAdminError, loginAdminSuccess, logoutAdminSuccess} from "../ActionCreators/admin.action";
import {loaderToFalse, loaderToTrue} from "../ActionCreators/loader.action";

function* loginAdmin(action) {
    try {
        yield put(loaderToTrue());
        const data = yield call(axios.post, 'http://localhost:5000/admin/login', {
            "username": action.admin.username, "password": action.admin.password
        })
        localStorage.setItem('admin_access_token', data.data.accessToken)
        yield put(loginAdminSuccess(data.data.admin));
        yield put(loaderToFalse());
    } catch (error) {
        yield put(loginAdminError());
        yield put(loaderToFalse());
    }
}

function* isAdminCheck() {
    try {
        yield put(loaderToTrue());
        const data = yield axios({method: 'POST', url: 'http://localhost:5000/admin/getPermission', headers: {Authorization: 'Bearer ' + localStorage.getItem('admin_access_token')} } )
        yield put(loginAdminSuccess(data.data.admin));
        yield put(loaderToFalse());
    } catch (error) {
        yield put(accessDenied());
        yield put(loaderToFalse());
    }
}

function* logoutAdmin() {
    const data = yield axios({method: 'POST', url: 'http://localhost:5000/admin/logout', headers: {Authorization: 'Bearer ' + localStorage.getItem('admin_access_token')} } );
    localStorage.removeItem('admin_access_token');
    yield put(logoutAdminSuccess());
}

export default function* watchLogin() {
    yield takeEvery("LOGIN_ADMIN", loginAdmin);
    yield takeEvery("LOGOUT_ADMIN", logoutAdmin);
    yield takeEvery("CHECK_IS_ADMIN", isAdminCheck);
}