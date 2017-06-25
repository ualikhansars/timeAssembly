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

export const removeSlot = () => {
    return {
        type: 'REMOVE_SLOT'
    };
}

export const updateSlot = () => {
    return {
        type: 'UPDATE_SLOT',
    }
}

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


