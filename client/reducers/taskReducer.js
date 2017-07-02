const initialState = {
    tasks: [],
    tasksRequest: {
        loading: false,
        loaded: false,
        errors: null
    },
    task: {},
    taskRequest: {
        loading: false,
        loaded: false,
        errors: null
    },
    showCreateTaskForm: false,
    showUpdateTaskForm: false
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
         /* 
            Load one task
        */
         case 'LOAD_TASK_REQUESTED':
            // when data is loading
            return Object.assign({}, state, {
               taskRequest: {
                    loading: true,
                    loaded: false,
                    errors: null
               },
               task: null
            });
         /*
            when data is loaded, add slots from api
        */
        case 'LOAD_TASK_OK':
            return Object.assign({}, state, {
                taskRequest: {
                    loading: false,
                    loaded: true,
                    errors: null
                },
                task: action.task,
            }); 
        case 'LOAD_TASK_FAIL':
            // if api/slot/id get request failed
           return Object.assign({}, state, {
                taskRequest: {
                    loading: false,
                    loaded: false,
                    errors: action.taskErrors
                },
                task: null,       
            });    
        case 'SHOW_CREATE_TASK_FORM':
            console.log('SHOW_CREATE_TASK_FORM');
            return Object.assign({}, state, {
                showCreateTaskForm: true
            });   
        case 'HIDE_TASK_FORMS':
            console.log('HIDE_TASK_FORMS');
            return Object.assign({}, state, {
                showCreateTaskForm: false,
                showUpdateTaskForm: false
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
        case 'UPDATE_TASK_SUCCESS':
            console.log('UPDATE_TASK');
            let tasksBeforeUpdate = Object.assign([], state.tasks);
            console.log('tasksBeforeUpdate', tasksBeforeUpdate)
            for(let object of tasksBeforeUpdate) {
                if(object._id == action.task.id) {    
                    object = action.task;
                }
            }
            console.log('tasksAfterUpdate', tasksBeforeUpdate)
            return Object.assign({}, state, {
                showCreateTaskForm: false,
                showUpdateTaskForm: false,
                tasks: tasksBeforeUpdate
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