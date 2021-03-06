import {createStore, combineReducers, applyMiddleware, Reducer} from "redux";
import createSagaMiddleware from 'redux-saga';
import adminReducer from '../Reducers/admin.reducer';
import loaderReducer from '../Reducers/loader.reducer';
import filmsReducer from '../Reducers/films.reducer';
import filmReducer from '../Reducers/film.reducer';
import sessionsReducer from '../Reducers/sessions.reducer';
import sessionReducer from '../Reducers/session.reducer';
import datesReducer from '../Reducers/date.reducer';
import isAuthorizedReducer from '../Reducers/authorized.reducer';
import userReducer from '../Reducers/user.reducer';
import rootSaga from "../Sagas";


const sagaMiddleware = createSagaMiddleware();

export const rootReducer = combineReducers({
    admin: adminReducer,
    dates: datesReducer,
    loader: loaderReducer,
    films: filmsReducer,
    film: filmReducer,
    sessions: sessionsReducer,
    session: sessionReducer,
    isAuthorized: isAuthorizedReducer,
    user: userReducer
});


export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);