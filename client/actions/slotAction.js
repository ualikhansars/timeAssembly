const url = '/api/slot'

import axios from 'axios';

export function fetchSlots() {
    return dispatch => {

        dispatch({
            type: 'LOAD_INFO_REQUESTED'
        });

        axios.get(url)
            .then(result => {
                console.log('result',result);
                dispatch({
                    type: 'LOAD_INFO_OK',
                    slots: result.data
                });
            })
            .catch(result => {
                dispatch({
                    type: 'LOAD_INFO_FAIL',
                    errors: result.message
                })
            })
    }
}

export const addTask = () => {
    return {
        type: 'ADD_TASK',
    }
}
