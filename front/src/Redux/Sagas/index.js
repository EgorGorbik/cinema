import { takeEvery, put, delay, call, all } from "redux-saga/effects";
import axios from 'axios';
import {loginAdminError, loginAdminSuccess} from "../ActionCreators/admin.action";
import adminSaga from './admin.saga';
import filmsSaga from './film.saga';
import sessionsSaga from './session.saga';



export default function* rootSaga() {
    yield all([adminSaga(), filmsSaga(), sessionsSaga()]);
/*    console.log('watch')
    yield takeEvery("LOGIN_ADMIN", isAdminCheck)*/
}

