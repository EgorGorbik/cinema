export default (state = null, action) => {
    switch (action.type) {
        case 'SET_SESSION':
            return action.session
        case 'CHOOSE_PLACE_SUCCESS':
            let newPlaces = [];
            state.places.forEach(e => {
                if(e.id !== +action.id) {newPlaces.push(e)}
                else {
                    e.isFree = false;
                    newPlaces.push(e)
                }
            })
            return {...state, places: newPlaces}
        case 'CANCEL_CHOOSE_PLACE_SUCCESS':
            let cancelPlaces = [];
            state.places.forEach(e => {
                if(e.id !== +action.id) {cancelPlaces.push(e)}
                else {
                    e.isFree = true;
                    cancelPlaces.push(e)
                }
            })
            return {...state, places: cancelPlaces}
        case 'SET_SESSION_FAILD':
            return null
        default:
            return state;
    }
};