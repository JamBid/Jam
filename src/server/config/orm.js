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
    selectAllOrder:function(table, sortCols, connection){        
        return new Promise(function(resolve, reject){
            let sql = "SELECT * FROM ?? ORDER BY ";
            
            //builds the order by section (NOTE: no need to escape character as the application controls these values and not the user)
            for(i in sortCols){
                //adds in a comma and space if there are more than 1 col to sort by
                if(i > 0)
                    sql += ", ";

                //adds the column (key in the JSON) and condition of asc or desc
                for(j in sortCols[i]){
                    sql += j +" "+sortCols[i][j];
                }
            }

            connection.query(sql, [table], function(error, data){
                if(error) return reject(error);

                return resolve(data);
            });
        });
    },
    selectAllLimit:function(table, limit, connection){        
        return new Promise(function(resolve, reject){
            connection.query("SELECT * FROM ?? LIMIT ?", [table, limit], function(error, data){
                if(error) return reject(error);

                return resolve(data);
            });
        });
    },
    selectAllLimitOrder:function(table, sortCols, limit, connection){
        return new Promise(function(resolve, reject){
            let sql = "SELECT * FROM ?? ORDER BY ";
            
            //builds the order by section (NOTE: no need to escape character as the application controls these values and not the user)
            for(i in sortCols){
                //adds in a comma and space if there are more than 1 col to sort by
                if(i > 0)
                    sql += ", ";

                //adds the column (key in the JSON) and condition of asc or desc
                for(j in sortCols[i]){
                    sql += j +" "+sortCols[i][j];
                }
            }

            //adds the limit clause
            sql+= " LIMIT ?";

            connection.query(sql, [table, limit], function(error, data){
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
    selectLimitForOneCon:function(table, conCol, condition, limit, connection){
        return new Promise(function(resolve, reject){
            connection.query("SELECT * FROM ?? WHERE ?? = ? LIMIT ?", [table, conCol, condition, limit], function(error, data){
                if(error) return reject(error);

                return resolve(data);
            });
        });
    },
    selectLimitForOneConOrder:function(table, conCol, condition, sortCols, limit, connection){
        return new Promise(function(resolve, reject){
            let sql = "SELECT * FROM ?? WHERE ?? = ? ORDER BY ";
            
            //builds the order by section (NOTE: no need to escape character as the application controls these values and not the user)
            for(i in sortCols){
                //adds in a comma and space if there are more than 1 col to sort by
                if(i > 0)
                    sql += ", ";

                //adds the column (key in the JSON) and condition of asc or desc
                for(j in sortCols[i]){
                    sql += j +" "+sortCols[i][j];
                }
            }

            //adds the limit clause
            sql+= " LIMIT ?";

            connection.query(sql, [table, conCol, condition, limit], function(error, data){
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