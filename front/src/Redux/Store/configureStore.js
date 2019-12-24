import {createStore, combineReducers, applyMiddleware, Reducer} from "redux";
import createSagaMiddleware from 'redux-saga';
import adminReducer from '../Reducers/admin.reducer';
import loaderReducer from '../Reducers/loader.reducer';
import rootSaga from "../Sagas";


const sagaMiddleware = createSagaMiddleware();

export const rootReducer = combineReducers({
    admin: adminReducer,
    loader: loaderReducer
});


export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);