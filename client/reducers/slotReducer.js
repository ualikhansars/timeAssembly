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
            // push new slot into slots array
            let updatedSlots = Object.assign([], state.slots);
            updatedSlots.push(action.slot);
            return Object.assign({}, state, {
                showCreateSlotForm: false,
                slots: updatedSlots
            });
        case 'SLOT_DELETED_SUCCESS':
            console.log('REMOVE_SLOT');
            let slotsBeforeDeletion = Object.assign([], state.slots); 
            let deletedSlotId = action.deletedSlotId;
            // if id == slot.id then delete it from slots array 
            let slotsAfterDeletion = slotsBeforeDeletion.filter(slot => {
                if(slot._id != deletedSlotId) {
                    return true;
                }
                return false; 
            });
            // create new slots without deleted slot
            return Object.assign({}, state, {
                slots: slotsAfterDeletion
            });

        default:
            return state;
  }
}

export default SlotInfo;




