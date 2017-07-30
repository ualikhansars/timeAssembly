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
export const getTimeDependsOnTimeFormat = (hour, min, timeFormat, meridien) => {
    console.log('hour in getTimeDependsOnTimeFormat', hour);
    let displayTime;
    if(timeFormat === 12) {
        if(meridien === 'a.m') {
            if(hour === '00' && min === '00') displayTime = '12:' + min + ' ' + meridien;
            else if(hour === '12' && min === '00') {
                displayTime = hour + ':' + min + ' p.m';
            } 
            else {
                displayTime = hour + ':' + min + ' ' + meridien;
            }
        }
        if(meridien === 'p.m') {
            if(hour === '12' && min === '00') displayTime = hour + ':' + min + ' ' + meridien;
            else if(hour === '24' && min === '00') displayTime = '12:' + min + ' a.m'; 
            else {
                let displayHour = get12HoursFrom24Hours(hour);
                console.log('displayHour', displayHour);
                if(displayHour < 10) {
                    displayTime = '0' + displayHour + ':' + min + ' ' + meridien;
                } else {
                    displayTime = displayHour + ':' + min + ' ' + meridien;
                }
            }
        }
    }
    if(timeFormat === 24) {
        displayTime = hour + ':' + min;
    }
    return displayTime;
}