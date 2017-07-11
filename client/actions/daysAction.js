export const onClickDayInTheWeek = (day) => {
    return {
        type: 'ON_CLICK_DAY_IN_THE_WEEK',
        chosenDay: day
    }
}

// this function fired when time in Day component has been clicked
// it will dispatch startTimeHour and finishTimeHour to reducer
export const onClickTime = (hour, min) => {
    return dispatch => {
        dispatch({
            type: 'ON_CHOOSE_TIME',
            startTimeHours: hour,
            startTimeMinutes: min 
        });
        return dispatch({
            type: 'DISPLAY_SLOTS'
        });
    }
}    
