export default (state = null, action) => {
    switch (action.type) {
        case 'SET_FILM':
            return action.film
        case 'SET_FILM_FAILD':
            return null;
        default:
            return state;
    }
};