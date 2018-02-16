var orm = require('../config/orm.js');

var users = {

  // select
  selectAll: function(callback) {
    orm.selectAll('users', function(res) {
      callback(res); 
    });
  },

  // grab indiviudal user
  selectOne: function(cols,vals, callback) {
    orm.SelectAllForOne('users', cols, vals, function(res) {
      callback(res);
    });
  },

  // create user
  insertOne: function(cols, vals, callback) {
    orm.insertOne('users', cols, vals, function(res) {
      callback(res);
    });
  },
  
  // update user account info
  updateOne: function(objColVals, condition, callback) {
    orm.updateOne('users', objColVals, condition, function(res) {
      callback(res);
    });
  }

};

// export to controller.js
module.exports = users;



