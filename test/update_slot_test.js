// const Slot = require('../models/slot');
// const assert = require('assert');

// describe ('Update slots', function() {
//    var slots; 
//    beforeEach(function(done) {
//          slots = [
//              new Slot({
//                 title: 'Data Structure and Algorithm',
//                 category: 'Study',
//                 total: 5,
//                 free: 5
//              }),
//              new Slot({
//                 title: 'Study',
//                 category: 'Study',
//                 total: 5,
//                 free: 5
//              }),
//             new Slot({
//                 title: 'JavaScript',
//                 category: 'Programming',
//                 total: 5,
//                 free: 5
//              }),
//              new Slot({
//                 title: 'Java',
//                 category: 'Programming',
//                 total: 5,
//                 free: 5
//              }),  
                            
//          ]

//         let i = 0;
//         console.log('saving slots');
//         while(i < slots.length) {
//             slots[i].save();
//             i++;
//         }
//         console.log('slots', slots) 
//         done();
//    });
// });

// it('Decrement free attr in slot', function(done) {
//     Slot.findOneAndUpdate({title: 'JavaScript'}, {$inc: {free: -1}}, {new: true}).then(function() {
//         Slot.findOne({title: 'JavaScript'}).then(function(result) {
//             console.log(result, result);
//             assert(result.free == 4);
//             done();
//         });
//     });
// });