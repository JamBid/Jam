var orm = require('../config/orm.js');

var bid = {

  // select all
  selectAll: function(callback) {
    orm.selectAll('bid', function(res) {
      callback(res); 
    });
  },

  // grabs all distinct values for the columns identified
  selectAllDistinct: function(cols, callback) {
    orm.selectAllDistinct('bid', cols, function(res) {
        callback(res);
    });
  },

  // grab all for 1 condition
  selectAllForOne: function(cols,vals, callback) {
    orm.selectOne('bid', cols, vals, function(res) {
      callback(res);
    });
  },

  // creates bids
  insertOne: function(cols, vals, callback) {
    orm.insertOne('bid', cols, vals, function(res) {
      callback(res);
    });
  },
  
  // updates bids
  updateOne: function(objColVals, condition, callback) {
    orm.updateOne('bid', objColVals, condition, function(res) {
      callback(res);
    });
  }

};

// export to controller.js
module.exports = bid;