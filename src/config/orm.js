/*The functions here will serve as common sql commands for all the models.
  Each ORM will return a promise of the resulting data from the query.*/

var orm = {
    selectAll:function(table, connection){        
        return new Promise(function(resolve, reject){
            connection.query("SELECT * FROM ??", table, function(error, data){
                if(error) return reject(error);

                return resolve(data);
            });
        });
    },
    selectAllDistinct:function(table, col, connection){        
        return new Promise(function(resolve, reject){
            connection.query("SELECT distinct ?? FROM ??", [col,table], function(error, data){
                if(error) return reject(error);

                return resolve(data);
            });
        });
    },
    selectAllForOne:function(table, conCol, condition, connection){
        return new Promise(function(resolve, reject){
            connection.query("SELECT * FROM ?? WHERE ?? = ?", [table, conCol, condition], function(error, data){
                if(error) return reject(error);

                return resolve(data);
            });
        });
    },
    insertOne: function(table, cols, values, connection){
        return new Promise(function(resolve, reject){
            connection.query("INSERT INTO ?? (??) VALUES (?)", [table, cols, values], function(error, data){
                if(error) return reject(error);

                return resolve(data.insertId);
            });
        });
    },
    updateOne: function(table, values, id, connection){
        return new Promise(function(resolve, reject){
            connection.query("UPDATE ?? SET ? WHERE id = ?", [table, values, id], function(error, data){
                if(error) return reject(error);

                return resolve(data);
            });
        });
    }
}

module.exports = orm;