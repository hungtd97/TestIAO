import { api } from "../axios";

function login(username, password){
    let body = {
        username: username,
        password: password
    }
    return api.post('/api/user/login', body)
}


export const userServices = {
    login
}