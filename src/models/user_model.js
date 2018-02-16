var orm = require('../config/orm.js');

var user = {

  // select all
  selectAll: function(callback) {
    orm.selectAll('user', function(res) {
      callback(res); 
    });
  },

  // grabs all distinct values for the columns identified
  selectAllDistinct: function(cols, callback) {
    orm.selectAllDistinct('user', cols, function(res) {
        callback(res);
    });
  },

  // grab all for 1 condition
  selectAllForOne: function(cols,vals, callback) {
    orm.selectOne('user', cols, vals, function(res) {
      callback(res);
    });
  },

  // creates user
  insertOne: function(cols, vals, callback) {
    orm.insertOne('user', cols, vals, function(res) {
      callback(res);
    });
  },
  
  // updates user
  updateOne: function(objColVals, condition, callback) {
    orm.updateOne('user', objColVals, condition, function(res) {
      callback(res);
    });
  }

};

// export to controller.js
module.exports = user;