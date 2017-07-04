import axios from 'axios';


// when createSlot button in slotContainer component is clicked
// this function is fired, it will show
// createSlotForm
export const showCreateSlotForm = () => {
    return {
        type: 'SHOW_CREATE_SLOT_FORM'
    };
}

export const hideSlotForm = () => {
    return {
        type: 'HIDE_SLOT_FORM'
    };
}

export function fetchSlots() {
    return dispatch => {
        dispatch({
            type: 'LOAD_SLOTS_REQUESTED'
        });
        axios.get('/api/slot')
            .then(res => {
                dispatch({
                    type: 'LOAD_SLOTS_OK',
                    slots: res.data.resource
                });
            })
            .catch(result => {
                dispatch({
                    type: 'LOAD_SLOTS_FAIL',
                    slotsErrors: result.message
                })
            })
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
        return axios.put(`/api/slot/${slot.id}`, slot)
            .then(res => {
                console.log('UPDATE SLOT RESPONCE', res);
                dispatch({
                    type: 'UPDATE_SLOT_SUCCESS',
                    slot
                });
            })
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
            .catch(error => {
                console.log(error)
            });
    }
}


