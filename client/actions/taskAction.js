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