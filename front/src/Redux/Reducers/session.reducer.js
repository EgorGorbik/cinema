export default (state = [], action) => {
    switch (action.type) {
        case 'SET_SESSIONS':
            return action.sessions
        case 'SET_SESSION_SUCCESS':
            return [action.session, ...state]
        case 'EDIT_SESSION_SUCCESS':
            return state.map(el => {
                if(el._id === action.session._id) {
                    el = action.session;
                    return el;
                } else {
                    return el;
                }
            })
            return [action.session, ...state]
        case 'DEL_SESSION_SUCCESS':
            return state.filter((el) => el._id != action.id);
        default:
            return state;
    }
};