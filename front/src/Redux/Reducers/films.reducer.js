export default (state = [], action) => {
    switch (action.type) {
        case 'SET_FILMS':
            return action.films
        case 'SET_FILM_SUCCESS':
            console.log(action.film)
            return [action.film, ...state]
        case 'EDIT_FILM_SUCCESS':
            return state.filter()
            return [action.film, ...state]
        case 'DEL_FILM_SUCCESS':
            return state.filter((el) => el._id != action.id);
        default:
            return state;
    }
};