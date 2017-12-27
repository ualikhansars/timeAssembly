// this reducer is change display slots and display settings state
// to true or false depending on what element in sidebar has been clicked

const initialState = {
    displaySlots: true,
    displaySettings: false,
    displayTaskProperties: false,
    showUpdateTaskForm: false
}

const displayReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'DISPLAY_SLOTS':
           return Object.assign({}, state, {
                displaySlots: true,
                displaySettings: false,
                displayTaskProperties: false,
                showUpdateTaskForm: false
           });
        case 'DISPLAY_SETTINGS':
            return Object.assign({}, state, {
                displaySlots: false,
                displaySettings: true,
                displayTaskProperties: false,
                showUpdateTaskForm: false
           });
        case 'DISPLAY_TASK_PROPERTIES':
           return Object.assign({}, state, {
               displaySlots: false,
               displaySettings: false,
               displayTaskProperties: true,
               showUpdateTaskForm: false
          });
        case 'SHOW_UPDATE_TASK_FORM':
            console.log('SHOW_UPDATE_TASK_FORM');
            return Object.assign({}, state, {
                displaySlots: false,
                displaySettings: false,
                displayTaskProperties: false,
                showUpdateTaskForm: true
            });
    }
    return state;
}

export default displayReducer;
