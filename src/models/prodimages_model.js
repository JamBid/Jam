var orm = require('../config/orm.js');

var prodImages = {

  // select all
  selectAll: function(callback) {
    orm.selectAll('prodImages', function(res) {
      callback(res); 
    });
  },

  // grabs all distinct values for the columns identified
  selectAllDistinct: function(cols, callback) {
    orm.selectAllDistinct('prodImages', cols, function(res) {
        callback(res);
    });
  },

  // grab all for 1 condition
  selectAllForOne: function(cols,vals, callback) {
    orm.selectOne('prodImages', cols, vals, function(res) {
      callback(res);
    });
  },

  // creates product
  insertOne: function(cols, vals, callback) {
    orm.insertOne('prodImages', cols, vals, function(res) {
      callback(res);
    });
  },
  
  // updates product
  updateOne: function(objColVals, condition, callback) {
    orm.updateOne('prodImages', objColVals, condition, function(res) {
      callback(res);
    });
  }

};

// export to controller.js
module.exports = prodImages;