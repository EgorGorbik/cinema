export default (state = false, action) => {
    switch (action.type) {
        case 'LOADER_TO_TRUE':
            console.log('loader to true')
            return true;
        case 'LOADER_TO_FALSE':
            return false;
        default:
            return state;
    }
};