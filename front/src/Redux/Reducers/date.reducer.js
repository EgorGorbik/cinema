export default (state = null, action) => {
    switch (action.type) {
        case 'SET_DATES_SUCCESS':
            return action.dates
        case 'SET_DATE_FAILD':
            return null;
        default:
            return state;
    }
};