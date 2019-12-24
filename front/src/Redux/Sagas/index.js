import { takeEvery, put, delay, call, all } from "redux-saga/effects";
import axios from 'axios';
import {loginAdminError, loginAdminSuccess} from "../ActionCreators/admin.action";
import adminSaga from './admin.saga';



export default function* rootSaga() {
    yield all([adminSaga()]);
/*    console.log('watch')
    yield takeEvery("LOGIN_ADMIN", isAdminCheck)*/
}

