const initialState = {
    currentDay: 'monday' // will be change to the current day
}

const daysReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'ON_CLICK_DAY_IN_THE_WEEK':
            let chosenDay = action.chosenDay.toLowerCase();
            return Object.assign({}, state, {
                currentDay: chosenDay
            });
        default:
            return state;    
    }
}

export default daysReducer;