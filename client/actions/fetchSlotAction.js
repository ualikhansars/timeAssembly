import axios from 'axios';

const url = '/api/slot';

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
                    slots: result.data.resource
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


