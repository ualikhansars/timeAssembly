const initialState = {
    currentDay: '', // will be change to the current day
    chosenDay: '',
    currentDayOfTheWeek: null,
    currentDayNumber: null,
    currentMonth: '',
    currentHour: null,
    currentMinutes: null,
    timezone: null,
    now: ''
}

const daysReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'ON_CLICK_DAY_IN_THE_WEEK':
            return Object.assign({}, state, {
                chosenDay:  action.chosenDay
            });
        case 'GET_CURRENT_DATE_AND_TIME':
            return Object.assign({}, state, {
                currentDayOfTheWeek: action.currentDayOfTheWeek,
                chosenDay: action.currentDayOfTheWeek,
                currentDayNumber: action.currentDayNumber,
                currentMonth: action.currentMonth,
                currentHour: action.currentHour,
                currentMinutes: action.currentMinutes,
                timezone: action.timezone,
                now: action.now
            });
        default:
            return state;    
    }
}

export default daysReducer;