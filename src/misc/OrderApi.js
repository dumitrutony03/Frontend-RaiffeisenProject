import axios from 'axios'
import { config } from '../../Constants'
import { parseJwt } from './Helpers'

export const orderApi = {
    authenticate,
    signup,
}

function authenticate(username, password, token) {
    const apiUrl = 'http://localhost:8080/api/auth/authenticate';
    return axios.post(apiUrl, { username, password }, {'Authorization': 'Bearer ' + token});
}

function signup(user) {
    return instance.post('http://localhost:8080/api/admin/register', user, {
        // headers: { 'Content-type': 'application/json' }
    })
}
// -- Axios

const instance = axios.create({
    baseURL: config.url.API_BASE_URL
})