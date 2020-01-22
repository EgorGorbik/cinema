import axios from "axios";

export function getSessions(date) {
    console.log(date)
    return axios.request({
        method: 'get',
        data: {date: date},
        url: `http://localhost:5000/session/date/${date}`
    });
}

export function getSession(id) {
    console.log(id)
    return axios.request({
        method: 'get',
        url: `http://localhost:5000/session/${id}`
    });
}

export function delFilm(id) {
    return axios.request({
        method: 'delete',
        url: `http://localhost:5000/film/${id}`
    });
}

export function addSession(data) {
    return axios.request({
        method: 'post',
        url: `http://localhost:5000/session`,
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
    return axios.request({
        method: 'put',
        url: `http://localhost:5000/film/${data.id}`,
        data: data
    });
}