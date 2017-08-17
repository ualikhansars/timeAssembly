const initialState = {
    slots: [],
    slotsRequest: {
        loading: false, 
        loaded: false,
        errors: null, 
    }, 
    slot: {},
    slotRequest: {
        loading: false, 
        loaded: false,
        errors: null, 
    }, 
    temporarySlots: [],
    displayUpdateSlotForm: false,
    displayCreateSlotForm: false
};

const SlotInfo = (state = initialState, action) => {
    switch (action.type) {
        case 'LOAD_SLOTS_REQUESTED':
            // when data is loading
            return Object.assign({}, state, {
               slotsRequest: {
                   loading: true,
                    loaded: false,
                    errors: null
               },
               slots: null
            });
         /*
            when data is loaded, add slots from api
        */
        case 'LOAD_SLOTS_OK':
            return Object.assign({}, state, {
                slotsRequest: {
                    loading: false,
                    loaded: true,
                    errors: null
                },
                slots: action.slots,
            }); 
        case 'LOAD_SLOTS_FAIL':
            // if api get request failed
           return Object.assign({}, state, {
                slotsRequest: {
                    loading: false,
                    loaded: false,
                    errors: action.slotsErrors
                },
                slots: null,       
            });
        // requested api/slot/id    
        case 'LOAD_SLOT_REQUESTED':
            // when data is loading
            return Object.assign({}, state, {
               slotRequest: {
                    loading: true,
                    loaded: false,
                    errors: null
               },
               slot: null
            });
         /*
            when data is loaded, add slots from api
        */
        case 'LOAD_SLOT_OK':
            return Object.assign({}, state, {
                slotRequest: {
                    loading: false,
                    loaded: true,
                    errors: null
                },
                slot: action.slot,
            }); 
        case 'LOAD_SLOT_FAIL':
            // if api/slot/id get request failed
           return Object.assign({}, state, {
                slotRequest: {
                    loading: false,
                    loaded: false,
                    errors: action.slotErrors
                },
                slot: null,       
            });
        case 'FETCH_TEMPORARY_SLOTS_SUCCESS':
            return Object.assign({}, state, {
                temporarySlots: action.temporarySlots
            });
        case 'FETCH_SLOT_BY_ID':
            return Object.assign({}, state, {
                slot: action.slot
            });
        case 'SHOW_CREATE_SLOT_FORM':
            return Object.assign({}, state, {
                displayCreateSlotForm: true,
                displayUpdateSlotForm: false,
            }); 
        case 'HIDE_SLOT_FORM':
            return Object.assign({}, state, {
                displayCreateSlotForm: false,
                displayUpdateSlotForm: false,
            });
        case 'SHOW_UPDATE_SLOT_FORM':
            console.log('SHOW_UPDATE_SLOT_FORM');
            return Object.assign({}, state, {
                displayCreateSlotForm: false,
                displayUpdateSlotForm: true,
            });
        case 'UPDATE_SLOT_SUCCESS':
            console.log('UPDATE_SLOT');
            return Object.assign({}, state, {
                displayCreateSlotForm: false,
                displayUpdateSlotForm: false
            });
        case 'DECREMENT_SLOT_FREE':
            console.log('DECREMENT_SLOT_FREE');
            console.log('free',  action.updatedSlot.free);
            let freeTasks =  action.updatedSlot.free;
            let slotsBeforeDecrFree = Object.assign([], state.slots);
            if(freeTasks > 0) {
                for(let i = 0; i < slotsBeforeDecrFree.length; ++i) {
                    if(slotsBeforeDecrFree[i]._id == action.updatedSlot._id) {
                            slotsBeforeDecrFree[i].free -= 1;
                    }
                }
            }
            return Object.assign({}, state, {
                slots: slotsBeforeDecrFree
            }); 
        case 'INCREMENT_SLOT_FREE':
            console.log('INCREMENT_SLOT_FREE');
            let slotsBeforeIncFree = Object.assign([], state.slots);
            for(let i = 0; i < slotsBeforeIncFree.length; ++i) {
                if(slotsBeforeIncFree[i]._id == action.updatedSlot._id) {
                        slotsBeforeIncFree[i].free += 1;
                }
            }
            return Object.assign({}, state, {
                slots: slotsBeforeIncFree
            });
        case 'CREATE_SLOT_SUCCESS':
            // push new slot into slots array
            let updatedSlots = Object.assign([], state.slots);
            updatedSlots.push(action.slot);
            return Object.assign({}, state, {
                displayCreateSlotForm: false,
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




