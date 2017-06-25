const initialState = {
    loading: false, 
    loaded: false, 
    slots: [], 
    errors: null,
    showCreateSlotForm: false
};

const SlotInfo = (state = initialState, action) => {
    switch (action.type) {
        case 'LOAD_INFO_REQUESTED':
            return Object.assign({}, state, {
                loading: true,
                loaded: false,
                slots: null,
                errors: null
            });
        case 'LOAD_INFO_OK':
            return Object.assign({}, state, {
                loading: false,
                loaded: true,
                slots: action.slots,
                errors: null
            }); 
        case 'LOAD_INFO_FAIL':
           return Object.assign({}, state, {
                loading: false,
                loaded: false,
                slots: null,
                errors: action.errors
            });
        case 'SHOW_SLOT_FORM':
            return Object.assign({}, state, {
                showCreateSlotForm: true
            }); 
        case 'HIDE_SLOT_FORM':
            return Object.assign({}, state, {
                showCreateSlotForm: false
            });
        case 'UPDATE_SLOT':
            console.log('UPDATE_SLOT');
        case 'CREATE_SLOT_SUCCESS':
            let updatedSlots = Object.assign([], state.slots);
            updatedSlots.push(action.slot);
            return Object.assign({}, state, {
                showCreateSlotForm: false,
                slots: updatedSlots
            });
            
        case 'REMOVE_SLOT':
            console.log('REMOVE_SLOT');
        case 'ON_UPDATE_SLOT':
            console.log('ON_UPDATE_SLOT');   
        default:
            return state;
  }
}

export default SlotInfo;




