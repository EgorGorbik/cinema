export default (state = false, action) => {
    switch (action.type) {
        case 'AUTHORIZED_TO_TRUE':
            return true;
        case 'AUTHORIZED_TO_FALSE':
            return false;
        default:
            return state;
    }
};