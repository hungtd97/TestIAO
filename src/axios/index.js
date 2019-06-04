/**
 * Copyright by (c) Adamo
 *
 *
 * @file   This file defines axios Instance
 * @author ADAMO
 * @since  10/15/2018
 */

import axios from 'axios'
// import 'url-search-params-polyfill';

const AXIOS_CONFIG = {
    timeout: 15000,
    headers: {
        // 'Accept-Language': 'en-US,en;q=0.9,vi;q=0.8,ja;q=0.7',
        'Content-Type': 'application/json',
        // 'Accept': 'application/json'
    }
}

const BASE_URL = 'http://hungtdse04825.ddns.net:4200'

let instance = null
/**
 * definde firebase services
 */
class AxiosClass {
    constructor() {
        if (!instance) {
            this.app = axios.create(AXIOS_CONFIG);
            this.app.defaults.baseURL = BASE_URL;
            this.app.interceptors.response.use(this.interceptorsResponse, this.interceptorsError)
            instance = this;
        }
        return instance
    }
    setToken = (token) => {
        this.token = token;
        this.app.defaults.headers.common['Authorization'] = token
    }
    post = (url, body) => {
        return this.app.post(url, body)
    }
    get = (url, body) => {
        return this.app.get(url, body)
    }
    interceptorsResponse = (response) => {
        let { resultCode, message, success } = response.data
        // console.log('response', response.data)
        if (success === true || resultCode == 200) {
            return response.data
        } else {
            return Promise.reject(response)
        }
    }
    interceptorsError = (error) => {
        const { response, request } = error
        console.log('interceptorsError', error.response)
        if (response) {
            this.handleErrorReponse(error);
        }
        return Promise.reject(error)
    }
    handleErrorReponse = (error) => {
        try {
            const { response } = error;
            const { data } = response;
            // alert('Thông báo',data.message)
        } catch (err) {
            console.log('handleErrorReponse', err)
        }
    }
}

const api = new AxiosClass();

export { api }
