export default (state = false, action) => {
    switch (action.type) {
        case 'CHANGE_ISADMIN_TO_TRUE':
            return true;
        case 'CHANGE_ISADMIN_TO_FALSE':
            return false;
        default:
            return state;
    }
};
