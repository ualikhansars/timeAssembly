// change time Format to 24 base
export const ChangeToTwentyFourHoursFormat = () => {
    return {
        type: 'TWENTY_FOUR_HOURS_FORMAT',
        timeFormat: 24
    }
}

// change time Format to 12 base
export const ChangeToTwelveHoursFormat = () => {
    return {
        type: 'TWELVE_HOURS_FORMAT',
        timeFormat: 12
    }
}

// time Intervals

// change timeInterval to every hour
export const showEveryHour = () => {
    return {
        type: 'SHOW_EVERY_HOUR'
    }
}

// change timeInterval to every 15 minutes
export const showEvery15Minutes = () => {
    return {
        type: 'SHOW_EVERY_15_MINUTES'
    }
}

// change timeInterval to every 30 minutes
export const showEvery30Minutes = () => {
    return {
        type: 'SHOW_EVERY_30_MINUTES'
    }
}


// change startDisplay Hour
export const changeStartDisplayHour = (startDisplayHour) => {
    return {
        type: 'CHANGE_START_DISPLAY_HOUR',
        startDisplayHour
    }
}

// change finishDisplay Hour
export const changeFinishDisplayHour = (finishDisplayHour) => {
    return {
        type: 'CHANGE_FINISH_DISPLAY_HOUR',
        finishDisplayHour
    }
}

// change meridien to a.m
export const changeMeridienToAM = () => {
    return {
        type: 'CHANGE_MERIDIEN_TO_AM',
        meridien: 'a.m'
    }
}

// change meridien to p.m
export const changeMeridienToPM = () => {
    return {
        type: 'CHANGE_MERIDIEN_TO_PM',
        meridien: 'p.m'
    }
}
