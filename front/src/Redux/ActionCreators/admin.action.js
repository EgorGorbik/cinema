export const loginAdminSuccess = (admin) => ({type: 'SET_ADMIN', admin});
export const logoutAdminSuccess = (admin) => ({type: 'LOGOUT_ADMIN_SUCCESS'});
export const loginAdminError = () => ({type: 'LOGIN_FAILED'});
export const accessDenied = () => ({type: 'ACCESS_DENIED'});