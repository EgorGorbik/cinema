export default (state = null, action) => {
    switch (action.type) {
        case 'SET_SESSION':
            return action.session
        case 'SET_SESSION_FAILD':
            return null
        default:
            return state;
    }
};