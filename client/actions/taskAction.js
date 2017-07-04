import axios from 'axios';

export const fetchTasksByDay = (day) => {
    return dispatch => {
        dispatch({
            type: 'LOAD_TASKS_REQUESTED'
        });
        axios.get('/api/task', {
            params: {
                day: day
            }
            })
            .then(result => {
                console.log('result',result);
                dispatch({
                    type: 'LOAD_TASKS_OK',
                    tasks: result.data.resource
                });
            })
            .catch(result => {
                dispatch({
                    type: 'LOAD_TASKS_FAIL',
                    tasksErrors: result.message
                })
            })
    }
}

// fistly, this function loads Slot by Id
// to write slot data into Task
// then is case of success request
// SHOW_CREATE_TASK_FORM will be display
export const addTask = (id) => {
    return dispatch => {
        dispatch({
            type: 'LOAD_SLOT_REQUESTED'
        });
        return axios.get(`/api/slot/${id}`)
            .then(res => {
                dispatch({
                    type: 'LOAD_SLOT_OK',
                    slot: res.data.resource 
                });
            })
            .then(() => {
                dispatch({
                    type: 'SHOW_CREATE_TASK_FORM'
                });
            })
            .catch(error => {
                dispatch({
                    type: 'LOAD_SLOT_FAIL',
                    slotErrors: result.message
                });
            });
    }
}

export const hideTaskForms = () => {
    return {
        type: 'HIDE_TASK_FORMS',
    }
}

// in case of successful post request
export const createTaskSuccess = (task) => {
    return {
        type: 'CREATE_TASK_SUCCESS',
        task
    }
}

// creates task by API post request
export const createTask = (task) => {
    console.log('CREATE TASK ACTION', task);
    return dispatch => {
        return axios.post('/api/task', task)
            .then(res => {
                let data = res.data.result;
                console.log('CREATE TASK DATA',res);
                 console.log('CREATE TASK == ',task);
                dispatch(createTaskSuccess(data));
            })
            .catch(error => {
                console.log(error)
            });
    }
}

// when update task button in Task Component has been clicked this function
// will be fired, it load task by id from database and 
// write it into task state,
// so other component can use this state
// after this it will fire SHOW_UPDATE_TASK_FORM
// that will display this form
export const onClickUpdateTask = (id) => {
    return dispatch => {
        dispatch({
            type: 'LOAD_TASK_REQUESTED'
        });
        return axios.get(`/api/task/${id}`)
            .then(res => {
                console.log('onClickUpdateTask RESPONSE', res);
                 console.log('onClickUpdateTask ID', id);
                dispatch({
                    type: 'LOAD_TASK_OK',
                    task: res.data.resource 
                });
            })
            .then(() => {
                dispatch({
                    type: 'SHOW_UPDATE_TASK_FORM'
                });
            })
            .catch(error => {
                dispatch({
                    type: 'LOAD_TASK_FAIL',
                    taskErrors: error
                });
            });
    }
}

// this function fired after update button in the UpdateTaskComponent
// has been clicked, it makes put API request to
// update task in the database
export const updateTask = (task) => {
    console.log('UPDATE TASK = ', task);
    console.log('UPDATE TASK ID = ', task.id);
    return dispatch => {
        return axios.put(`/api/task/${task.id}`, task)
            .then(res => {
                console.log('UPDATE TASK RESPONCE', res);
                dispatch({
                    type: 'UPDATE_TASK_SUCCESS',
                    task
                });
            })
            .then(() => {
                dispatch({
                    type: 'DISPLAY_NOTHING',
                });
            })
            .catch(error => {
                throw error;
            });
    }
}

export const removeTask = (id) => {
    return dispatch => {
        return axios.delete(`/api/task/${id}`)
            .then(res => {
                console.log('removeTaskActionResponse', res);
                dispatch({
                    type: 'TASK_DELETED_SUCCESS',
                    deletedTaskId: id
                });
            })
            .catch(error => {
                throw error;
            });
    }
}