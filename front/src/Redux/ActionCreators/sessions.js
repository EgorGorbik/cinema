export const setSessionsSuccess = (sessions) => ({type: 'SET_SESSIONS', sessions: sessions});
export const deleteSessionSuccess = (id) => ({type: 'DEL_SESSION_SUCCESS', id: id});
export const createSessionSuccess = (data) => ({type: 'SET_SESSION_SUCCESS', session: data});
export const editSessionSuccess = (data) => ({type: 'EDIT_SESSION_SUCCESS', session: data});
