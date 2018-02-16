var orm = require('../config/orm.js');

var products = {

  // select all
  selectAll: function(callback) {
    orm.selectAll('products', function(res) {
      callback(res); 
    });
  },

  // grabs all distinct values for the columns identified
  selectAllDistinct: function(cols, callback) {
    orm.selectAllDistinct('products', cols, function(res) {
        callback(res);
    });
  },

  // grab all for 1 condition
  selectAllForOne: function(cols,vals, callback) {
    orm.selectOne('products', cols, vals, function(res) {
      callback(res);
    });
  },

  // creates product
  insertOne: function(cols, vals, callback) {
    orm.insertOne('products', cols, vals, function(res) {
      callback(res);
    });
  },
  
  // updates product
  updateOne: function(objColVals, condition, callback) {
    orm.updateOne('products', objColVals, condition, function(res) {
      callback(res);
    });
  }

};

// export to controller.js
module.exports = products;