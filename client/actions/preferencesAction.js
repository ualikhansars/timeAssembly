// change time Format to 24 base
export const ChangeToTwentyFourHoursFormat = () => {
    return {
        type: 'TWENTY_FOUR_HOURS_FORMAT'
    }
}

// change time Format to 12 base
export const ChangeToTwelveHoursFormat = () => {
    return {
        type: 'TWELVE_HOURS_FORMAT'
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

export const changeStartDisplayHour = (startDisplayHour) => {
    return {
        type: 'CHANGE_START_DISPLAY_HOUR',
        startDisplayHour
    }
}

export const changeFinishDisplayHour = (finishDisplayHour) => {
    return {
        type: 'CHANGE_FINISH_DISPLAY_HOUR',
        finishDisplayHour
    }
}