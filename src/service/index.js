import { api } from "../axios";

function login(username, password){
    const body = new URLSearchParams();
    body.append('username', username)
    body.append('password', password)
    return api.post('/api/user/login', body)
}

function login2(username, password){
    const body = new URLSearchParams();
    body.append('username', username)
    body.append('password', password)
    return api.post('/api/user/login-2', body)
}


export const userServices = {
    login,
    login2
}