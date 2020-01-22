export default (state = null, action) => {
    switch (action.type) {
        case 'SET_SESSION':
            return action.session
        default:
            return state;
    }
};