const initialState = {
    tasks: [],
    tasksRequest: {
        loading: false,
        loaded: false,
        errors: null
    },
    task: {},
    showCreateTaskForm: false
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
        case 'SHOW_CREATE_TASK_FORM':
            console.log('SHOW_CREATE_TASK_FORM');
            return Object.assign({}, state, {
                showCreateTaskForm: true
            });
        case 'HIDE_CREATE_TASK_FORM':
            console.log('HIDE_CREATE_TASK_FORM');
            return Object.assign({}, state, {
                showCreateTaskForm: false
            });       
        case 'CREATE_TASK_SUCCESS':
            // push new task into task array
            let updatedTasks = Object.assign([], state.tasks);
            console.log('BEFORE PUSHING TASK', action.task);
            updatedTasks.push(action.task);
            return Object.assign({}, state, {
                showCreateTaskForm: false,
                tasks: updatedTasks
            });
        case 'TASK_DELETED_SUCCESS':
            console.log('REMOVE_TASK');
            let tasksBeforeDeletion = Object.assign([], state.tasks); 
            let deletedTaskId = action.deletedTaskId;
            // if id == task.id then delete it from slots array 
            let tasksAfterDeletion = tasksBeforeDeletion.filter(task => {
                if(task._id != deletedTaskId) {
                    return true;
                }
                return false; 
            });
            // create new slots without deleted slot
            return Object.assign({}, state, {
                tasks: tasksAfterDeletion
            });
    }
    return state;
}

export default taskInfo;