import setAuthToken from '../../utils/setAuthToken';

export const setCurrentUser = (user) => {
    return {
        type: 'SET_CURRENT_USER',
        user
    }
}

export const logout = () => {
    return dispatch => {
        localStorage.removeItem('jwtToken');
        setAuthToken(false);
        dispatch(setCurrentUser({}));
        return dispatch({
            type: 'LOGOUT',
            user: {}
        });
    }
}