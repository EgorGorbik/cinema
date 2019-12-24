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
            return {logout: true};
        case 'ACCESS_DENIED':
            newState.accessDenied = true;
            return newState;
        default:
            return state;
    }
};