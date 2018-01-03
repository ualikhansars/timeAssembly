// get startHour and startMinutes and duration
//  and return finishHour and finish Minites 

export const calcFinishTime = (startHour, startMin, duration=0) => {
        let finishHour = startHour;
        let finishMin = startMin;
        if(duration < 0) {
            // console.log('duration < 0', duration);
            duration = 0;
        }
        if(duration < 60) {
            let addition = startMin + duration; // 80 or 30
            // console.log('timeCalc startMin', startMin);
            if(addition == 60) {
                // console.log('addition === 60', addition);
                finishHour++;
                finishMin = 0;
            }
            if(addition < 60) { // 30
                if(startMin + duration === 60) {
                    finishMin = 0;
                    finishHour++;
                } 
                finishMin = startMin + duration;
            }  
            if(addition > 60) { // 80
               let balance = startMin - duration;
               finishHour++;
               finishMin = balance;
            }
        } else { // duration > 60
            let parameter = Math.floor(duration / 60); // 200 / 60 === 3
            let balance = duration % 60;
            finishHour = startHour + parameter;
            if(finishMin + balance == 60) {
                finishHour++;
                finishMin = 0;
            } else {
                finishMin = startMin + balance;
            }
        }
        return {
            finishHour,
            finishMin
        }
}

// this function expect hours and mins and
// return time in minutes
export const calcMins = (hours, mins) => {
    return (hours * 60) + mins;
}

// get startTime and finishTime and 
// calculate schedule Time preferences
export const getScheduleTime = (startHour=0, finishHour=24) => {
    let schedule = [];
    for(let i = startHour; i <= finishHour; ++i) {
        schedule.push(i);
    }
    return schedule;
}

// convert 24 hours to 12 hours
export const get12HoursFrom24Hours = (twentyFourHour) => {
    return twentyFourHour - 12;
} 

// convert 12 hours to 12 o'clock hours
export const get24HoursFrom12Hours = (hour) => {
    return hour + 12;
}

// get hour, minutes, timeFormat and meridien
// and return time in proper format
export const getTimeDependsOnTimeFormat = (hour, min, timeFormat) => {
    let displayTime;
    
    if(timeFormat === 12) {
        if(hour === 0 && min === 0 || hour === 24 && min === 0) {
            displayTime = '12:00 a.m';
        } 
        else if(hour === 12 && min === 0) displayTime = '12:00 p.m';
        else if(hour >= 0 && hour < 10) {
            if(min == 0) {
                min = '00';
            }
            displayTime = hour + ':' + min + ' a.m';
        }
        else if(hour >= 10 && hour <= 11) {
            if(min == 0) {
                min = '00';
            }
            displayTime = hour + ':' + min + ' a.m';
        }
        else if(hour >= 12) {
            if(min == 0) {
                min = '00';
            }
            let displayHour = get12HoursFrom24Hours(hour);
            if(displayHour < 10) {
                displayTime = '0' + displayHour + ':' + min + ' p.m';
            } else {
                displayTime = displayHour + ':' + min + ' p.m';
            }
            return displayTime;
        } 
    }
    if(timeFormat === 24) {
        if(min == 0) {
            min = '00';
        }
        displayTime = hour + ':' + min;
    }
    return displayTime;
}

// get start and finish time and calculate
// duration in minutes
export const getDurationInMins = (startHour, startMin, finishHour, finishMin) => {
    let hour = finishHour - startHour;
    let mins = finishMin - startMin;
    return (hour * 60) + mins;
}

export const calcPossibleHoursAndMins = (duration, chosenHours, chosenMins) => {
    let possibleMinsDuration = duration - (chosenHours * 60);
    let possibleMins;
    if(possibleMinsDuration >= 45) possibleMins = 45;
    else if(possibleMinsDuration < 45 && possibleMinsDuration >= 30) possibleMins = 30;
    else if(possibleMinsDuration < 30 && possibleMinsDuration >= 15) possibleMins = 15;
    else {
        possibleMins = 0;
    }
    let possibleHours = Math.floor((duration - chosenMins) / 60);
    console.log('duration', duration);
    console.log('possibleMinsDuration', possibleMinsDuration)
    console.log('possibleMins', possibleMins);
    return {
        possibleHours,
        possibleMins
    }
}

export const convertDurationToHours = (initialDuration) => {
    if(initialDuration < 60) {
        return `${initialDuration} minutes`;
    } else {
        let hours, minutes, hourSpelling;
        hours = Math.floor(initialDuration / 60);
        minutes = Math.floor(initialDuration % 60);
        if(hours === 1) {
            hourSpelling = 'hour';
        } else {
            hourSpelling = 'hours';
        }
        if(minutes === 0) {
            return `${hours} ${hourSpelling}`;
        } else {
            return `${hours} ${hourSpelling} and ${minutes} minutes`;
        }
    }
}

export const convertScheduleTimeBaseOnTimeFormat = (hour, timeFormat) => {
    if(timeFormat === 24) {
        let displayTime;
        if(hour < 10) {
            displayTime = '0' + hour + ':00' ;
        } else {
            displayTime = hour + ':00';
        }
        return displayTime;
    } 
    if(timeFormat === 12) {
        if(hour === 0 || hour === 24) {
            return `12:00 a.m`;
        }
        else if(hour === 12) return `12:00 p.m`;
        else if(hour >= 1 && hour < 10) {
            return '0' + hour + ':00 a.m';
        }
        else if(hour === 10 || hour === 11) {
            return hour + ':00 a.m';
        }
        else if(hour >= 13 && hour <= 23) {
                let displayTime; 
                let displayHour = get12HoursFrom24Hours(hour);
                if(displayHour < 10) {
                    displayTime = '0' + displayHour + ':00 p.m';
                } else {
                    displayTime = displayHour + ':00 p.m';
                }
                return displayTime;
        } 
    }
}

export const getFinishTimeBasedOnDuration = (startHour, startMin, duration) => {
    let finishHour, finishMin;
    finishHour = Number(startHour);
    finishMin = Number(startMin);
    let updatedDuration = Number(duration);
    let durationHours = Math.floor(updatedDuration / 60);
    let durationMins = updatedDuration % 60;
    finishHour += durationHours;
    finishMin += durationMins;
    if(durationMins >= 60) {
        finishHour += 1;
        finishMin = finishMin - 60;
    } 
    return {
        finishHour,
        finishMin
    }
}