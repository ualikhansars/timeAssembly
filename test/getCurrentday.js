 var assert = require('assert');
 describe('#getCurrentDay Funtion', function() {
    it('should return current date in appropriate format', function() {
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

        result = year + '-' + month + '-' + day;
        console.log('result', result);
        assert(result == '2017-07-13');
    });
  });   