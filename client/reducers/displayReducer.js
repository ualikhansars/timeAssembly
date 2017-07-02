// this reducer is change display slots and display settings state
// to true or false depending on what element in sidebar has been clicked

const initialState = {
    displaySlots: false,
    displaySettings: false,
    showUpdateTaskForm: false
}

const displayReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'DISPLAY_SLOTS':
           return Object.assign({}, state, {
                displaySlots: true,
                displaySettings: false,
                showUpdateTaskForm: false
           });
        case 'DISPLAY_SETTINGS':
            return Object.assign({}, state, {
                displaySlots: false,
                displaySettings: true,
                showUpdateTaskForm: false
           });
        case 'SHOW_UPDATE_TASK_FORM':
            console.log('SHOW_UPDATE_TASK_FORM');
            return Object.assign({}, state, {
                displaySlots: false,
                displaySettings: false,
                showUpdateTaskForm: true
            });
        case 'DISPLAY_NOTHING':
            console.log('HIDE_UPDATE_TASK_FORM');
            return Object.assign({}, state, {
                displaySlots: false,
                displaySettings: false,
                showUpdateTaskForm: false
            });   
    }
    return state;
}

export default displayReducer;
