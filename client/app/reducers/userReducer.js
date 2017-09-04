const initialState = {
    isAuthenticated: false,
    user: {}
}

const userInfo = (state=initialState, action) => {
    switch(action.type) {
        case 'SET_CURRENT_USER':
            let updatedUser = Object.assign({}, state, {
                isAuthenticated: true,
                user: action.user
            });
            return updatedUser;
        default:
            return state;
    }
}

export default userInfo;