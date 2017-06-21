const initialState = {
    showCreateSlotForm: false,
    slot: {}
}

const createSlot = (state=initialState, action) => {
    switch(action.type) {
        case 'CREATE_SLOT':
            console.log('CREATE SLOT');
            return Object.assign({}, state, {
                showCreateSlotForm: true
            });
    }
    return state;
}

export default createSlot;