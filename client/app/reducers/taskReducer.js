import {logDev} from '../../../utils/logDev';

const initialState = {
    tasks: [],
    tasksRequest: {
        loading: false,
        loaded: false,
        errors: null
    },
    task: {},
    currentlySelectedTask: {},
    taskRequest: {
        loading: false,
        loaded: false,
        errors: null
    },
    displayCreateTaskForm: false,
    displayUpdateTaskForm: false,
    startTimeHours: null,
    startTimeMinutes: null
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
           logDev.default('TASK ERRORS', action.taskErrors);
           return Object.assign({}, state, {
                taskRequest: {
                    loading: false,
                    loaded: false,
                    errors: action.taskErrors
                },
                task: null,       
            });   
        case 'SELECT_TASK':
            logDev.default('SELECT TASK');
            return Object.assign({}, state, {
                    currentlySelectedTask: action.selectedTask
            });
        case 'SHOW_CREATE_TASK_FORM':
            logDev.default('SHOW_CREATE_TASK_FORM');
            return Object.assign({}, state, {
                displayCreateTaskForm: true
            });   
        case 'HIDE_TASK_FORMS':
            logDev.default('HIDE_TASK_FORMS');
            return Object.assign({}, state, {
                displayCreateTaskForm: false,
                displayUpdateTaskForm: false
            });       
        case 'CREATE_TASK_SUCCESS':
            // push new task into task array
            let updatedTasks = Object.assign([], state.tasks);
            logDev.default('BEFORE PUSHING TASK', action.task);
            updatedTasks.push(action.task);
            return Object.assign({}, state, {
                displayCreateTaskForm: false,
                tasks: updatedTasks
            });
        case 'UPDATE_TASK_SUCCESS':
            logDev.default('UPDATE_TASK');
            let tasksBeforeUpdate = Object.assign([], state.tasks);
            logDev.default('tasksBeforeUpdate', tasksBeforeUpdate);
            for(let i = 0; i < tasksBeforeUpdate.length; ++i) {
                if(tasksBeforeUpdate[i]._id === action.task._id) {
                    tasksBeforeUpdate.splice(i, 1, action.task);
                }
            }
            logDev.default('tasksAfterUpdate', tasksBeforeUpdate)
            return Object.assign({}, state, {
                displayCreateTaskForm: false,
                displayUpdateTaskForm: false,
                tasks: tasksBeforeUpdate
            });
        case 'TASKS_BY_SLOT_ID_UPDATED_SUCCESS':
            logDev.default('TASKS_BY_SLOT_ID_UPDATED_SUCCESS');
            let tasksBeforeSlotUpdate = Object.assign([], state.tasks);
            for(let i = 0; i < tasksBeforeSlotUpdate.length; ++i) {
                if(tasksBeforeSlotUpdate[i].slot == action.updatedSlot._id) {
                    tasksBeforeSlotUpdate[i].title = action.updatedSlot.title;
                    tasksBeforeSlotUpdate[i].category = action.updatedSlot.category;
                }
            }
            return Object.assign({}, state, {
                tasks: tasksBeforeSlotUpdate
            });  
        case 'TASK_DELETED_SUCCESS':
            logDev.default('REMOVE_TASK');
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
        case 'TASKS_BY_SLOT_ID_DELETED_SUCCESS':
            logDev.default('TASKS_BY_SLOT_ID_DELETED_SUCCESS');
            let tasksBeforeSlotDeletion = Object.assign([], state.tasks);
            let taskAfterSlotDeletion = tasksBeforeSlotDeletion.filter(task => {
                if(task.slot != action.deletedSlotIdInTask) {
                    return true;
                }
                return false;
            });
            return Object.assign({}, state, {
                 tasks: taskAfterSlotDeletion
            });
        case 'ON_CHOOSE_TIME':
            logDev.default('ON_CHOOSE_TIME');
            return Object.assign({}, state, {
                    startTimeHours: action.startTimeHours,
                    startTimeMinutes: action.startTimeMinutes
            });
        // reset startTimeHours and startTimeMinutes to null 
        case 'RESET_ADD_TASK':
            logDev.default('RESET_ADD_TASK');
            return Object.assign({}, state, {
                    startTimeHours: null,
                    startTimeMinutes: null
            });
    }
    return state;
}

export default taskInfo;