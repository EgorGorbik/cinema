import axios from "axios";

export function getFilms() {
    return axios.request({
        method: 'get',
        url: 'http://localhost:5000/films'
    });
}

export function delFilm(id) {
    return axios.request({
        method: 'delete',
        url: `http://localhost:5000/film/${id}`
    });
}

export function addFilm(data) {
    console.log(data)
    return axios.request({
        method: 'post',
        url: `http://localhost:5000/film`,
        data: data
    });
}

export function editFilm(data) {
    console.log(data)
    return axios.request({
        method: 'put',
        url: `http://localhost:5000/film/${data.id}`,
        data: data
    });
}