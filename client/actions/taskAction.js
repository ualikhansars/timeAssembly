import axios from 'axios';

export const fetchTasks = () => {
    return dispatch => {
        dispatch({
            type: 'LOAD_TASKS_REQUESTED'
        });
        axios.get('/api/task')
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

export const hideCreateTaskForm = () => {
    return {
        type: 'HIDE_CREATE_TASK_FORM',
    }
}

// in case of successful post request
export const createTaskSuccess = (task) => {
    return {
        type: 'CREATE_TASK_SUCCESS',
        task
    }
}

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