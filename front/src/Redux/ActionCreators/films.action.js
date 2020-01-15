export const getFilmsSuccess = (films) => ({type: 'SET_FILMS', films: films});
export const deleteFilmSuccess = (id) => ({type: 'DEL_FILM_SUCCESS', id: id});
export const createFilmSuccess = (data) => ({type: 'SET_FILM_SUCCESS', film: data});
export const editFilmSuccess = (data) => ({type: 'EDIT_FILM_SUCCESS', film: data});
