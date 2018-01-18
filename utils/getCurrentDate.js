// return appropriate format for current date

export const getCurrentDate = () => {
    let now = new Date();
    let day = new String(now.getDate());
    let month = new String(now.getMonth() + 1);
    let year = new String(now.getFullYear());
    let result = new String();

    if(day.length < 2) {
        day = '0' + day;
    }
    if(month.length < 2) {
        month = '0' + month;
    }

    return result = year + '-' + month + '-' + day;
}