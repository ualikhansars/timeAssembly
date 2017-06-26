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

export const removeSlot = (slot) => {
    return dispatch => {
        return axios.delete(`/api/slot/${slot.id}/delete`)
            .then(responce => {
                dispatch({
                    type: 'SLOT_DELETED_SUCCESS',
                    deletedSlot: slot
                });
            })
            .catch(error => {
                throw error;
            });
    }
}

export const updateSlot = () => {
    return {
        type: 'UPDATE_SLOT',
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
            .then(responce => {
                let data = responce.data.result;
                console.log('CREATE_SLOT_ACTION_DATA', responce);
                dispatch(createSlotSuccess(data));
            })
            .catch(error => {
                console.log(error)
            });
    }
}


