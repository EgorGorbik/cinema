export default (state = null, action) => {
    switch (action.type) {
        case 'SET_FILMS':
            return action.films
        case 'SET_FILM_SUCCESS':
            return [action.film, ...state]
        case 'EDIT_FILM_SUCCESS':
            return state.map(el => {
                if(el._id === action.film._id) {
                    el = action.film;
                    return el;
                } else {
                    return el;
                }
            })
            return [action.film, ...state]
        case 'DEL_FILM_SUCCESS':
            return state.filter((el) => el._id != action.id);
        default:
            return state;
    }
};