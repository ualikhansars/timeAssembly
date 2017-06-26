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
            .then(response => {
                console.log('removeSlotActionResponse', response);
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
            .then(response => {
                let data = response.data.result;
                dispatch(createSlotSuccess(data));
            })
            .catch(error => {
                console.log(error)
            });
    }
}


