export default (state = {data: null, error: null}, action) => {
    switch (action.type) {
        case 'SET_USER_SUCCESS':
            return {data: action.user};
        case 'SET_USER_FAILED':
            return {error: action.message};
        case 'DEL_USER':
            return {data: null, error: state.error};
        default:
            return state;
    }
};