import axios from 'axios';

export const fetchScheduleTimeByUserId = (userId) => {
    return dispatch => {
        return axios.get(`/api/scheduleTime/byUserId/${userId}`)
        .then(result => {
            let startHour = result.data.resource.startHour;
            let finishHour = result.data.resource.finishHour;
            dispatch(changeStartDisplayHourSuccess(startHour));
            dispatch(changeFinishDisplayHourSuccess(finishHour));
        })
        .catch(error => {
           throw error;
        });
    }    
    
}

// change time Format to 24 base
export const changeToTwentyFourHoursFormat = () => {
    return {
        type: 'TWENTY_FOUR_HOURS_FORMAT',
        timeFormat: 24
    }
}

// change time Format to 12 base
export const changeToTwelveHoursFormat = () => {
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
export const changeStartDisplayHour = (startDisplayHour, userId) => {
    return dispatch => {
        return axios.put(`/api/scheduleTime/byUserId/${userId}`, {startHour: startDisplayHour})
            .then(res => {
                console.log('changeStartDisplayHour', res);
                dispatch(changeStartDisplayHourSuccess(startDisplayHour));
            })
            .catch(error => {
                console.log(error)
            });
    }
}

export const changeStartDisplayHourSuccess = (startDisplayHour) => {
    return {
        type: 'CHANGE_START_DISPLAY_HOUR',
        startDisplayHour
    }
}

// change finishDisplay Hour
export const changeFinishDisplayHour = (finishDisplayHour, userId) => {
    return dispatch => {
        return axios.put(`/api/scheduleTime/byUserId/${userId}`, {finishHour: finishDisplayHour})
            .then(res => {
                console.log('changeFinishDisplayHour', res);
                dispatch(changeFinishDisplayHourSuccess(finishDisplayHour));
            })
            .catch(error => {
                console.log(error)
            });
    }
}

export const changeFinishDisplayHourSuccess = (finishDisplayHour) => {
    return {
        type: 'CHANGE_FINISH_DISPLAY_HOUR',
        finishDisplayHour
    }
}

// change meridien to a.m
export const changeMeridienToAM = () => {
    return dispatch => {
        dispatch({
            type: 'CHANGE_MERIDIEN_TO_AM',
            meridien: 'a.m'
        });
        return dispatch({
            type: 'RESET_ADD_TASK'
        });
    }
}

// change meridien to p.m
export const changeMeridienToPM = () => {
    return dispatch => {
        dispatch({
            type: 'CHANGE_MERIDIEN_TO_PM',
            meridien: 'p.m'
        });
        return dispatch({
            type: 'RESET_ADD_TASK'
        });
    }
}
