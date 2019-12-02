import {createStore, combineReducers, applyMiddleware, Reducer} from "redux";
import isAdminReducer from '../Reducers/isAdmin.reducer';

export const rootReducer = combineReducers({
    isAdmin: isAdminReducer
});

export const store = createStore(rootReducer)
