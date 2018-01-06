import axios from 'axios';
import {logDev} from '../../utils/logDev';
import { log } from 'util';

export default function setAuthToken(token) {
    if(token) {
        logDev.default('set auth token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // set header to every request
    } else {
        delete axios.defaults.headers.common['Authorization']; // delete auth header
    }
}