const initialState = {
    showCreateSlotForm: false,
    slot: {}
}

const showSlotForm = (state=initialState, action) => {
    switch(action.type) {
        case 'SHOW_SLOT_FORM':
            return Object.assign({}, state, {
                showCreateSlotForm: true
            });
        case 'HIDE_SLOT_FORM':
            return Object.assign({}, state, {
                showCreateSlotForm: false
            });
    }
    return state;
}

const updateSlot = (state=initialState, action) => {
    switch(action.type) {
        case 'UPDATE_SLOT':
            console.log('UPDATE_SLOT');
        case 'CREATE_SLOT':
            console.log('CREATE_SLOT');
        case 'REMOVE_SLOT':
            console.log('REMOVE_SLOT');
    }
}

export default showSlotForm;