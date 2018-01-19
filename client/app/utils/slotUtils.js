import {isDueDate} from '../../../utils/checkDate';
let months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

export const removeSlotsAfterDueDate = (slots, currentDate) => {
    for(let slot of slots) {
        let processedDate = processDate(slot.dueDate);
        isDueDate(currentDate, processedDate);
        if(currentDate > slot.dueDate) {
            this.props.removeSlot(slot._id);
        }
    }
}

export const processDate = (dateString) => {
    return dateString.substring(0, 10);
}

export const convertDateFormat = (date) => {
    let processedDate = processDate(date);
    let monthNumber = Number(processedDate.substring(5,7)) - 1; 
    let month = months[monthNumber];
    let day = Number(processedDate.substring(8,10));
    let ending = 'th';
    if(day === 1 || day === 21 || day === 31) ending = 'st';
    else if(day === 2 || day === 22) ending = 'nd';
    else if(day === 3 || day === 23) ending = 'rd';
    return {
        month,
        day,
        ending
    }
}