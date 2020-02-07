import {takeEvery, put, call} from "@redux-saga/core/effects";
import {loaderToFalse, loaderToTrue} from "../ActionCreators/loader.action";
import axios from "axios";
import {accessDenied, loginAdminError, loginAdminSuccess, logoutAdminSuccess} from "../ActionCreators/admin.action";
import * as users from "../Service/user.service";
import {setUserSuccess, logoutUserSuccess, setUserFailed} from "../ActionCreators/user.action";

function* loginUser(action) {
    try {
        yield put(loaderToTrue());
        let { data } = yield call(users.loginUser, action.user);
        localStorage.setItem('user_access_token', data.accessToken)
        yield put(setUserSuccess(data.user));
        yield put(loaderToFalse());
    } catch (error) {
        //yield put(loginAdminError());
        yield put(loaderToFalse());
    }
}

function* isUserCheck() {
    console.log('saga check is user')
    try {
        yield put(loaderToTrue());
        let { data } = yield call(users.checkIsUser);
        console.log(data)
       // const data = yield axios({method: 'POST', url: 'http://localhost:5000/admin/getPermission', headers: {Authorization: 'Bearer ' + localStorage.getItem('admin_access_token')} } )
        yield put(setUserSuccess(data.user));
        yield put(loaderToFalse());
    } catch (error) {
     /*   yield put(loaderToTrue());
        yield put(accessDenied());*/
        yield put(loaderToFalse());
    }
}

function* logoutUser() {
    console.log('logout user saga')
    let { data } = yield call(users.logoutUser);
    console.log(data)
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
        console.log(error.response.statusText);
        yield put(loaderToFalse());
    }
}

export default function* watchUserAuthManipulation() {
    yield takeEvery("LOGIN_USER", loginUser);
    yield takeEvery("CHECK_IS_USER", isUserCheck);
    yield takeEvery("LOGOUT_USER", logoutUser);
    yield takeEvery("REGISTER_USER", registerUser);
}