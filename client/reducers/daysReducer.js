const initialState = {
    currentDay: 'Monday' // will be change to the current day
}

const daysReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'ON_CLICK_DAY_IN_THE_WEEK':
            return Object.assign({}, state, {
                currentDay: action.chosenDay
            });
        default:
            return state;    
    }
}

export default daysReducer;