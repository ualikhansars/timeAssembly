import axios from 'axios';

export const showSlotForm = () => {
    return {
        type: 'SHOW_SLOT_FORM'
    };
}

export const hideSlotForm = () => {
    return {
        type: 'HIDE_SLOT_FORM'
    };
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

export const showUpdateSlotForm = () => {
    return {
        type: 'SHOW_UPDATE_SLOT_FORM'
    }
}

export const updateSlot = (id) => {
    return dispatch => {
        return axios.put(`/api/slot/${id}`)
            .then(res => {
                console.log('UPDATE SLOT RESPONCE', res);
                dispatch({
                    type: 'UPDATE_SLOT_SUCCESS',
                    updateSlotId: id
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


