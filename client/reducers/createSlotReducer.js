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

export default showSlotForm;