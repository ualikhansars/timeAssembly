import {expect, should, assert} from 'chai';
import {isDueDate} from "../utils/checkDate";

describe('Utils test', function() {
  describe('isDueDate', function() {
    let currentDate = '2018-01-19'; // 19 Jan 2018
    let dueDate1 = '2018-02-12'; // 2 Feb 2018 not remove
    let dueDate2 = '2017-11-12'; // 12 Nov 2017 remove
    let dueDate3 = '2017-01-19'; // 19 Jan 2017 remove
    let dueDate4 = '2018-01-19'; // 19 jan 2018 not remove
    let dueDate5 = '2018-01-17'; // 17 Jan 2018  remove

    it('dueDate 2,3 and 5 should be true, for dueDate 1 and 4 false ', function() {
        assert.equal(isDueDate(currentDate, dueDate1), false);
        assert.equal(isDueDate(currentDate, dueDate2), true);
        assert.equal(isDueDate(currentDate, dueDate3), true);
        assert.equal(isDueDate(currentDate, dueDate4), false);
        assert.equal(isDueDate(currentDate, dueDate5), true);
    });
  });
});


