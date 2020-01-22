export default (state = {}, action) => {
    let newState = {};
    switch (action.type) {
        case 'SET_ADMIN':
            newState = action.admin;
            newState.isAdminLogged = true;
            newState.error = false;
            return newState;
        case 'LOGIN_FAILED':
            newState.loginError = true;
            return newState;
        case 'LOGOUT_ADMIN_SUCCESS':
            newState.isAdminLogged = false;
        case 'ACCESS_DENIED':
            newState.isAdminLogged = false;
            return newState;
        default:
            return state;
    }
};