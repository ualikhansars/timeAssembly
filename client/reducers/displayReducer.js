// this reducer is change display slots and display settings state
// to true or false depending on what element in sidebar has been clicked

const initialState = {
    displaySlots: false,
    displaySettings: false
}

const displayReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'DISPLAY_SLOTS':
           return Object.assign({}, state, {
                displaySlots: true,
                displaySettings: false
           });
        case 'DISPLAY_SETTINGS':
            return Object.assign({}, state, {
                displaySlots: false,
                displaySettings: true
           });
    }
    return state;
}

export default displayReducer;
