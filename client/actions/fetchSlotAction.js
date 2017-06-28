import axios from 'axios';

const url = '/api/slot';

export function fetchSlots() {
    return dispatch => {

        dispatch({
            type: 'LOAD_SLOTS_REQUESTED'
        });

        axios.get(url)
            .then(result => {
                console.log('result',result);
                dispatch({
                    type: 'LOAD_SLOTS_OK',
                    slots: result.data.resource
                });
            })
            .catch(result => {
                dispatch({
                    type: 'LOAD_SLOTS_FAIL',
                    errors: result.message
                })
            })
    }
}


