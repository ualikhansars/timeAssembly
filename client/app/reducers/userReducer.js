const initialState = {
    isAuthenticated: false,
    user: {}
}

const userInfo = (state=initialState, action) => {
    switch(action.type) {
        case 'SET_CURRENT_USER':
            return Object.assign({}, state, {
                isAuthenticated: true,
                user: action.user
            });
        case 'LOGOUT':
            return Object.assign({}, state, {
                isAuthenticated: false,
                user: action.user
            });
        default:
            return state;
    }
}

export default userInfo;