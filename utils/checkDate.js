export const isDueDate = (currentDate, dueDate) => {
    let currentDay = Number(currentDate.substring(8, 10));
    let currentMonth = Number(currentDate.substring(5, 7));
    let currentYear = Number(currentDate.substring(0, 4));
    let dueDay = Number(dueDate.substring(8, 10));
    let dueMonth = Number(dueDate.substring(5, 7));
    let dueYear = Number(dueDate.substring(0, 4));
    if(currentYear > dueYear) return true;
    else if(currentYear < dueYear) return false;
    if(currentYear === dueYear) {
        if(currentMonth > dueMonth) return true;
        else if(currentMonth < dueMonth) return false;
        else if(currentMonth === dueMonth) {
            if(currentDay > dueDay) return true;
            else {
                return false;
            }
        }
    }
}