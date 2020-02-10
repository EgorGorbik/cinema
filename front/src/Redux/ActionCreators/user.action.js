import {socket} from "../../config/socket";

export const setUserSuccess = (user) => {
    socket.emit('setUser',{
        user: user
    });
    return ({type: 'SET_USER_SUCCESS', user})
};
export const setUserFailed = (message) => ({type: 'SET_USER_FAILED', message});
export const logoutUserSuccess = (user) => ({type: 'DEL_USER', user});
