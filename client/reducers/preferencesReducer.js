const initialState = {
    twentyFourHoursFormat: true,
    twelveHoursFormat: false,
    timeInterval: 30
}

const preferencesInfo = (state = initialState, action) => {
    switch(action.type) {
        case 'TWENTY_FOUR_HOURS_FORMAT':
            return Object.assign({}, state, {
                twentyFourHoursFormat: true,
                twelveHoursFormat: false
            });
        case 'TWELVE_HOURS_FORMAT':
            return Object.assign({}, state, {
                twentyFourHoursFormat: false,
                twelveHoursFormat: true
            });
        // change time Intervals
        case 'SHOW_EVERY_HOUR':
            return Object.assign({}, state, {
                timeInterval: 60
            });
        case 'SHOW_EVERY_15_MINUTES':
            return Object.assign({}, state, {
                timeInterval: 15
            });
        case 'SHOW_EVERY_30_MINUTES':
            return Object.assign({}, state, {
                timeInterval: 30
            });
        default:
            return state;
    }
}

export default preferencesInfo;