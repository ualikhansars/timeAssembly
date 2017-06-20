const initialState = {
    task: {}
}

const addTaskFromSlot = (state=initialState, action) => {
    switch(action.type) {
        case 'ADD_TASK':
            // return Object.assign({}, state, {
            //     task: action.payload
            // });
    }
    return state;
}

export default addTaskFromSlot;