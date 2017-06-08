const initialState = {
    displaySlots: false,
    displaySettings: false
}

const displayReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'DISPLAY_SLOTS':
           state = {
               displaySlots: true,
               displaySettings: false
           }
           break;
        case 'DISPLAY_SETTINGS':
            state = {
                displaySlots: false,
                displaySettings: true
            }
    }
    return initialState;
}

export default displayReducer;
