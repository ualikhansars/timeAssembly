// return appropriate for HTMl format for current date

export const getCurrenrDay = () => {
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