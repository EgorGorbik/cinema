import axios from "axios";

export const fetchUserData = async () => {
    try {
        const response = await fetch('http://localhost:5000/films', {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        })
        const data = await response.toJson();
    } catch (e) {
        alert(e)
    }
}

export function updateUser(data) {
    return axios.request({
        method: 'put',
        url: `http://localhost:5000/user/${data._id}`,
        data: data
    });
}

export function loginUser(data) {
    return axios.request({
        method: 'post',
        url: `http://localhost:5000/user/login`,
        data: data
    });
}

export function registerUser(data) {
    return axios.request({
        method: 'post',
        url: `http://localhost:5000/user/registration`,
        data: data.user
    });
}

export function checkIsUser() {
    return axios.request({
        method: 'post',
        url: `http://localhost:5000/user/getPermission`,
        headers: {Authorization: 'Bearer ' + localStorage.getItem('user_access_token')}
    });
}

export function logoutUser() {
    return axios.request({
        method: 'post',
        url: `http://localhost:5000/user/logout`,
        headers: {Authorization: 'Bearer ' + localStorage.getItem('user_access_token')}
    });
}