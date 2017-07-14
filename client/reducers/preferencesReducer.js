const initialState = {
    twentyFourHoursFormat: true,
    twelveHoursFormat: false
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
        default:
            return state;
    }
}

export default preferencesInfo;