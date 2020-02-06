import axios from "axios";



export function getFilms() {
    return axios.request({
        method: 'get',
        url: 'http://localhost:5000/films'
    });
}

export function getFilm(id) {
    return axios.request({
        method: 'get',
        url: `http://localhost:5000/film/${id}`
    });
}

export function getSessionsForFilm(id) {
    return axios.request({
        method: 'get',
        url: `http://localhost:5000/sessionsForFilm/${id}`
    });
}

export function delFilm(id) {
    return axios.request({
        method: 'delete',
        url: `http://localhost:5000/film/${id}`
    });
}

export function addFilm(data) {
    return axios.request({
        method: 'post',
        url: `http://localhost:5000/film`,
        data: data
    });
}

export function addPoster(file, name) {
    var formData = new FormData();
    formData.append('file', file)
    return axios.request({
        method: 'post',
        url: `http://localhost:5000/film/img`,
        data: formData
    });
}

export function editFilm(data) {
    console.log('service edit film')
    return axios.request({
        method: 'put',
        url: `http://localhost:5000/film/${data.id}`,
        data: data
    });
}