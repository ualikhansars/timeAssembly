import axios from 'axios';

import {removeTaskBySlotId} from './taskAction';

// when createSlot button in slotContainer component is clicked
// this function is fired, it will show
// createSlotForm
export const showCreateSlotForm = () => {
    return dispatch => {
        dispatch({
            type: 'SHOW_CREATE_SLOT_FORM'
        });
        return dispatch({
                type: 'RESET_ADD_TASK'
        });
    }    
}

export const hideSlotForm = () => {
    return {
        type: 'HIDE_SLOT_FORM'
    };
}

export function fetchSlots(id) {
    return dispatch => {
        dispatch({
            type: 'LOAD_SLOTS_REQUESTED'
        });
        axios.get(`/api/slot/`,{ 
            params: {
                userId: id
            }
        })
            .then(res => {    
                console.error('fetch slots response', res);
                if(id) {
                    dispatch({
                        type: 'LOAD_SLOTS_OK',
                        slots: res.data.resource
                    });
                } 
            })
            .catch(result => {
                dispatch({
                    type: 'LOAD_SLOTS_FAIL',
                    slotsErrors: result.message
                })
            })
    }
}

// fetch only temporary tasks
export const fetchTemporarySlots = (id) => {
    return dispatch => {
        return axios.get('/api/slot', {
            params: {
                temporary: true,
                userId: id
            }
        })
            .then(res => {
                    let data = res.data.resource;
                    dispatch({
                        type: 'FETCH_TEMPORARY_SLOTS_SUCCESS',
                        temporarySlots: data
                    });
            })
            .catch(error => {
                dispatch({
                    type: 'FETCH_TEMPORARY_SLOTS_FAIL',
                });
            });
    }
}

export const removeSlot = (id) => {
    return dispatch => {
        return axios.delete(`/api/slot/${id}`)
            .then(res => {
                console.log('removeSlotActionResponse', res);
                dispatch({
                    type: 'SLOT_DELETED_SUCCESS',
                    deletedSlotId: id
                });
            })
            .then(
                axios.delete(`/api/task/bySlotId/${id}`)
            .then(res => {
                    console.log('TASKS_BY_SLOT_ID_DELETED_SUCCESS', res);
                    console.log('TASKS_BY_SLOT_ID_DELETED_SUCCESS id', id);
                    dispatch({
                        type: 'TASKS_BY_SLOT_ID_DELETED_SUCCESS',
                        deletedSlotIdInTask: id
                    });
                })
            )
            .then(() => {
                dispatch({
                    type: 'RESET_ADD_TASK'
                });
            })
            .catch(error => {
                throw error;
            });
    }
}


export const onClickUpdateSlot = (id) => {
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
                    type: 'SHOW_UPDATE_SLOT_FORM'
                });
            })
            .then(() => {
                dispatch({
                    type: 'RESET_ADD_TASK'
                });
            })
            .catch(error => {
                dispatch({
                    type: 'LOAD_SLOT_FAIL',
                    slotErrors: error
                });
            });
    }
}

export const updateSlot = (slot) => {
    console.log('UPDATE SLOT = ', slot);
    return dispatch => {
        return axios.put(`/api/slot/${slot._id}`, slot)
            .then(res => {
                console.log('UPDATE SLOT RESPONCE', res);
                dispatch({
                    type: 'UPDATE_SLOT_SUCCESS',
                    slot
                });
            })
            // then update related tasks by slot id
            .then(
                axios.put(`/api/task/withSlot/${slot._id}`, slot)
            .then(res => {
                    console.log('TASKS_BY_SLOT_ID_UPDATED_SUCCESS', res);
                    dispatch({
                        type: 'TASKS_BY_SLOT_ID_UPDATED_SUCCESS',
                        updatedSlot: slot
                    });
                })
            )
            .catch(error => {
                throw error;
            });
    }
}

// in case of successful post request
export const createSlotSuccess = (slot) => {
    return {
        type: 'CREATE_SLOT_SUCCESS',
        slot
    }
}

export const createSlot = (slot) => {
    return dispatch => {
        return axios.post('/api/slot', slot)
            .then(res => {
                let data = res.data.result;
                dispatch(createSlotSuccess(data));
            })
            .then(() => {
                dispatch({
                    type: 'RESET_ADD_TASK'
                });
            })
            .catch(error => {
                console.log(error)
            });
    }
}


