import { api } from "../axios";

function login(username, password){
    const body = new URLSearchParams();
    body.append('username', username)
    body.append('password', password)
    return api.post('/api/user/login', body)
}


export const userServices = {
    login
}