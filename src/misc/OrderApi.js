import axios from 'axios'
import { config } from '../../Constants'
import { parseJwt } from './Helpers'

export const orderApi = {
    authenticate,
    signup,
}

function authenticate(username, password) {
    return axios.post('http://localhost:8080/api/auth/authenticate', { username, password });
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