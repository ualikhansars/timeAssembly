import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import {deleteCookie} from '../../utils/deleteCookie';

export const setCurrentUser = (user) => {
    return {
        type: 'SET_CURRENT_USER',
        user
    }
}

export const logout = () => {
    return dispatch => {
        localStorage.removeItem('jwtToken');
        deleteCookie();
    }
}
