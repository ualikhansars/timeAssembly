import {getCurrentDate} from '../utils/getCurrentDate';

export const onClickDayInTheWeek = (day) => {
    return dispatch => {
        dispatch({
            type: 'ON_CLICK_DAY_IN_THE_WEEK',
            chosenDay: day 
        });
        return dispatch({
            type: 'RESET_ADD_TASK'
        });
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

export const getCurrentDayAndTime = () => {
    let now = new Date();
    let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    let months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    let dayNumber = now.getDate();
    let year = now.getFullYear();
    let day = days[ now.getDay() ];
    let month = months[ now.getMonth() ];
    let hour = now.getHours();
    let minutes = now.getMinutes();
    let timezone = now.getTimezoneOffset();
    let currentDate = getCurrentDate();

    return {
        type: 'GET_CURRENT_DATE_AND_TIME',
        currentDayOfTheWeek: day,
        currentDayNumber: dayNumber,
        currentMonth: month,
        currentHour: hour,
        currentMinutes: minutes,
        currentDate,
        timezone,
        now
    }
}   
