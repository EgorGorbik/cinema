import { takeEvery, put, delay, call, all } from "redux-saga/effects";
import axios from 'axios';
import {loginAdminError, loginAdminSuccess} from "../ActionCreators/admin.action";
import adminSaga from './admin.saga';
import filmsSaga from './film.saga';
import sessionsSaga from './session.saga';
import usersSaga from './users.saga';



export default function* rootSaga() {
    yield all([adminSaga(), filmsSaga(), sessionsSaga(), usersSaga()]);
}

