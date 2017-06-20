const initialState = {
    showCreateSlotForm: false,
    slot: {}
}

const createSlot = (state=initialState, action) => {
    switch(action.type) {
        case 'CREATE_SLOT':
            
            console.log('CREATE SLOT');
    }
    return createSlot;
}

export default createSlot;