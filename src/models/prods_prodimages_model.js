/*The model for maintain format to the view/join between PRODUCTS and PRODIMAGES tables*/

const pool = require('../config/connections');
const prods = require('./product_model');
const prodImgs = require('./prodimages_model');

//function for recursive inserts
const prodImageInsert = function(imageCols, imageArray, prodId, count, connection){
    return new Promise(function(resolve, reject){
        let imageVals = [];

        for(i in imageCols){
            if(imageCols[i] === 'productId')
                imageVals.push(prodId);
            else
                imageVals.push(imageArray[count][imageCols[i]]);
        }

        prodImgs.insertOneConnection(imageCols, imageVals, connection)
        .then(function(data){
            if(count < imageArray.length - 1){
                prodImageInsert(imageCols, imageArray, prodId, count+1, connection)
                .then(function(data){
                    return resolve(data);
                })
                .catch(function(data){
                    return reject(error);
                });
            }
            else{
                return resolve(data);
            }
        })
        .catch(function(error){
            return reject(error);
        });
    });
}


const prod_prodimage = {

    //function that inserts new products with images
    insertNewProd: function(prodCols, imageCols, prodVals, imageVals){
        return new Promise(function(resolve, reject){
            pool.getConnection().then(function(connection){
                connection.beginTransaction(function(error){
                    if(error){
                        pool.closeConnection(connection);
                        return reject(error);
                    }
                    prods.insertOneConnection(prodCols, prodVals, connection)
                    .then(function(data){
                        prodImageInsert(imageCols, imageVals, data, 0, connection)
                        .then(function(data){
                            connection.commit(function(error){
                                if(error){
                                    connection.rollback(function(){});
                                    pool.closeConnection(connection);
                                    return reject(error);
                                }

                                pool.closeConnection(connection);
                                return resolve(data);
                            });
                        })
                        .catch(function(error){
                            if(error){
                                connection.rollback(function(){});
                                pool.closeConnection(connection);
                                return reject(error);
                            }
                        });
                    })
                    .catch(function(error){
                        if(error){
                            connection.rollback(function(){});
                            pool.closeConnection(connection);
                            return reject(error);
                        }
                    });
                });
            });
        });
    },

    //function get a product with their images
    selectOneWithAllImage: function(prodId){
        return new Promise(function(resolve, reject){
            Promise.all([prods.selectOne("id", prodId), prodImgs.selectOne("productId",prodId)])
            .then(function(results){
                let result = {};
                if(results[0][0]){
                    result=results[0][0];
                    if(results[1])
                        result.images=results[1];
                    else
                        result.images=[];
                }
                else
                    result={};

                return resolve(result);
            })
            .catch(function(errors){
                return reject(errors);
            })
        });
    }
}

//exports for use outside file
module.exports = prod_prodimage;