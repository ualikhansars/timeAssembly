const initialState = {
    loading: false, 
    loaded: false, 
    slots: null, 
    errors: null,
    showCreateSlotForm: false,
     slot: {
        title: '',
        category: '',
        total: 0,
        temporary: false,
        dueDate: null
    } 
};

const SlotInfo = (state = initialState, action) => {
    switch (action.type) {
        case 'LOAD_INFO_REQUESTED':
            return {loading: true, loaded: false };
        case 'LOAD_INFO_OK':
            return {loading: false, loaded: true, slots: action.slots, errors: null };
        case 'LOAD_INFO_FAIL':
            return {loading: false, loaded: false, slots: null, errors: action.errors };
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
        case 'CREATE_SLOT':
            console.log('CREATE_SLOT');
        case 'REMOVE_SLOT':
            console.log('REMOVE_SLOT');
        case 'ON_UPDATE_SLOT':
            console.log('ON_UPDATE_SLOT');   
        default:
            return state;
  }
}

export default SlotInfo;




