var orm = require('../config/orm.js');

var questions = {

  // select all
  selectAll: function(callback) {
    orm.selectAll('', function(res) {
      callback(res); 
    });
  },
  
  // grab all for 1 condition
  selectAllForOne: function(cols,vals, callback) {
    orm.selectOne('questions', cols, vals, function(res) {
      callback(res);
    });
  },

  // creates question
  insertOne: function(cols, vals, callback) {
    orm.insertOne('questions', cols, vals, function(res) {
      callback(res);
    });
  },
  
  // update question
  updateOne: function(objColVals, condition, callback) {
    orm.updateOne('questions', objColVals, condition, function(res) {
      callback(res);
    });
  }

};

// export to controller.js
module.exports = questions;