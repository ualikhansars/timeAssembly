import React from 'react';
import TimeInterval from '../components/taskContainer/TimeInterval';
// prepare minite and hour to trasfer to
// view component
export const convertTimeToString = (hour, min) => {
    let pushedMin = String(min);
    let pushedHour = String(hour);
    if(hour < 10) {
        pushedHour = '0' + pushedHour;
    }
    if(pushedMin == 0) {
        pushedMin = '00';
    }

    return {
        pushedMin,
        pushedHour
    }
}

// get task and return its propperty
export const addPropertyToTask = (task) => {
    return {
        title: task.title,
        category: task.category,
        description: task.description,
        duration: task.duration,
        startTimeHours: task.startTimeHours,
        startTimeMinutes: task.startTimeMinutes,
        finishTimeHours: task.finishTimeHours,
        finishTimeMinutes: task.finishTimeMinutes,
        day: task.day,
        slot: task.slot,
        id: task._id
    }
}

export const addTimeInterval = (timetable, hour, min, index, timeInterval, meridien) => {
    let updatedTimetable = Object.assign([], timetable);
    if(timeInterval === 30) {
        if(min === 0 || min === 30 || min === 60) {
            let {pushedMin, pushedHour} = convertTimeToString(hour, min);
            updatedTimetable.push(
                <TimeInterval hour={pushedHour} min={pushedMin} meridien={meridien} key={index}/>
            );
        }
    }
    if(timeInterval === 60) {
        if(min === 0 || min === 60) {
           let {pushedMin, pushedHour} = convertTimeToString(hour, min);
            updatedTimetable.push(
                <TimeInterval hour={pushedHour} min={pushedMin} meridien={meridien} key={index}/>
            );
        }
    }
    if(timeInterval === 15) {
        let {pushedMin, pushedHour} = convertTimeToString(hour, min);
        updatedTimetable.push(
            <TimeInterval hour={pushedHour} min={pushedMin} meridien={meridien} key={index}/>
        );
    }
    return updatedTimetable;
}

export const calculateMin = (finishMin) => {
    let min;
    if(finishMin === 0) min = 45;
    if(finishMin === 15) min = 0;
    if(finishMin === 30) min = 15;
    if(finishMin === 45) min = 30;
    return min;
}