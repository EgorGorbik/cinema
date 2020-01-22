import {createStore, combineReducers, applyMiddleware, Reducer} from "redux";
import createSagaMiddleware from 'redux-saga';
import adminReducer from '../Reducers/admin.reducer';
import loaderReducer from '../Reducers/loader.reducer';
import filmsReducer from '../Reducers/films.reducer';
import sessionsReducer from '../Reducers/sessions.reducer';
import sessionReducer from '../Reducers/session.reducer';
import isAuthorizedReducer from '../Reducers/authorized.reducer';
import rootSaga from "../Sagas";


const sagaMiddleware = createSagaMiddleware();

export const rootReducer = combineReducers({
    admin: adminReducer,
    loader: loaderReducer,
    films: filmsReducer,
    sessions: sessionsReducer,
    session: sessionReducer,
    isAuthorized: isAuthorizedReducer
});


export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);