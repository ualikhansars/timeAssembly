import axios from 'axios';

export default function setAuthToken(token) {
    if(token) {
        console.log('set auth token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // set header to every request
    } else {
        delete axios.defaults.headers.common['Authorization']; // delete auth header
    }
}