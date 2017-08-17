// fire this function after sidebar element slots were clicked
// then reset AddTask
export const displaySlots = () => {
    return dispatch => {
        dispatch({
            type: 'DISPLAY_SLOTS'
        });
        return dispatch({
                type: 'RESET_ADD_TASK'
        });
    }
} 

// fire this function after sidebar element settings were clicked
// then reset AddTask
export const displaySettings = () => {
    return {
         type: 'DISPLAY_SETTINGS'
    }
}

// display nothing then reset addTask 
export const displayNothing = () => {
    return dispatch => {
        dispatch({
            type: 'DISPLAY_NOTHING'
        });
        return dispatch({
                type: 'RESET_ADD_TASK'
        });
    }
} 

