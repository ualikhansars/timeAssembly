var router = express.Router();
var User = require('../models/user');

router.use(expressValidator({
    customValidators: {
      isEmailAvailable(email) {
        return new Promise((resolve, reject) => {
          User.findOne({ email: email }, (err, user) => {
            if (err) throw err;
            if(user == null) {
              resolve();
            } else {
              reject();
            }
          });
        });
      }
    }
  })
);