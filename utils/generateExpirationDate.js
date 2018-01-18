export const generateExpirationDate = () => {
    var now = new Date();
    now.setDate(now.getDate() + 3);
    let day = new String(now.getDate());
    let month = new String(now.getMonth() + 1);
    let year = new String(now.getFullYear());

    if(day.length < 2) {
        day = '0' + day;
    }
    if(month.length < 2) {
        month = '0' + month;
    }
    return year + '-' + month + '-' + day;   
}
