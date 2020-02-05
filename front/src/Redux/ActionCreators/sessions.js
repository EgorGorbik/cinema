export const setSessionsSuccess = (sessions) => ({type: 'SET_SESSIONS', sessions: sessions});
export const createSessionSuccess = (data) => ({type: 'SET_SESSION_SUCCESS', session: data});
export const deleteSessionSuccess = (id) => ({type: 'DEL_SESSION_SUCCESS', id: id});
export const setSessionSuccess = (session) => ({type: 'SET_SESSION', session: session});
export const setSessionFaild = () => ({type: 'SET_SESSION_FAILD'});
