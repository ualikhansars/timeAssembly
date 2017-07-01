const initialState = {
    tasks: [],
    tasksRequest: {
        loading: false,
        loaded: false,
        errors: null
    },
    task: {},
}

const taskInfo = (state=initialState, action) => {
    switch(action.type) {
        case 'LOAD_TASKS_REQUESTED':
            return Object.assign({}, state, {
                tasksRequest: {
                    loading: true,
                    loaded: false,
                    errors: null
                },
               tasks: null
            });
        case 'LOAD_TASKS_OK':
            return Object.assign({}, state, {
                tasksRequest: {
                    loading: false,
                    loaded: true,
                    errors: null
                },
               tasks: action.tasks
            });
        case 'LOAD_TASKS_FAIL':
            return Object.assign({}, state, {
                tasksRequest: {
                    loading: false,
                    loaded: false,
                    errors: action.tasksErrors
                },
               tasks: null
            });
        case 'ADD_TASK':
            // return Object.assign({}, state, {
            //     task: action.payload
            // });
    }
    return state;
}

export default taskInfo;