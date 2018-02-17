const faker = require('./fakerFunc.js');
const pool = require('../../src/config/connections.js');
const db = require('../../src/models/models');

//function to clear all the tables
const clearEverything = function(){
    return new Promise(function(resolve, reject){
        pool.getConnection().then(function(connection){
            connection.beginTransaction(function(error){
                if(error){
                    connection.rollback(function(){});
                    pool.closeConnection(connection);
                    return reject(error);
                }
                
                connection.query("SET FOREIGN_KEY_CHECKS = 0", function(error, data){
                    if(error){
                        connection.rollback(function(){});
                        pool.closeConnection(connection);
                        return reject(error);
                    }

                    connection.query("TRUNCATE TABLE answers", function(error, data){
                        if(error){
                            connection.rollback(function(){});
                            pool.closeConnection(connection);
                            return reject(error);
                        }
                    
                        connection.query("TRUNCATE TABLE questions", function(error, data){
                            if(error){
                                connection.rollback(function(){});
                                pool.closeConnection(connection);
                                return reject(error);
                            }

                            connection.query("TRUNCATE TABLE bids", function(error, data){
                                if(error){
                                    connection.rollback(function(){});
                                    pool.closeConnection(connection);
                                    return reject(error);
                                }

                                connection.query("TRUNCATE TABLE prodImages", function(error, data){
                                    if(error){
                                        connection.rollback(function(){});
                                        pool.closeConnection(connection);
                                        return reject(error);
                                    }

                                    connection.query("TRUNCATE TABLE products", function(error, data){
                                        if(error){
                                            connection.rollback(function(){});
                                            pool.closeConnection(connection);
                                            return reject(error);
                                        }

                                        connection.query("TRUNCATE TABLE users", function(error, data){
                                            if(error){
                                                connection.rollback(function(){});
                                                pool.closeConnection(connection);
                                                return reject(error);
                                            }

                                            connection.query("SET FOREIGN_KEY_CHECKS = 1", function(error, data){
                                                if(error){
                                                    connection.rollback(function(){});
                                                    pool.closeConnection(connection);
                                                    return reject(error);
                                                }

                                                connection.commit(function(error){
                                                    if(error){
                                                        connection.rollback(function(){});
                                                        pool.closeConnection(connection);
                                                        return reject(error);
                                                    }
                                                });

                                                pool.closeConnection(connection);
                                                return resolve("All good");
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    })
}

//fuction to insert user and their product
const insertRandomUserProd = function(count, max){
    return new Promise(function(resolve, reject){
        //sets up the user to be inserted
        let userName = 'user'+count;
        let password = '1234';

        let person = faker.getRandomPerson();

        person.userName = userName;
        person.password = password;

        //sets up the product
        let product = faker.getRandomProd();

        //sets up random images for the product
        let prodImages = faker.getRandomProdImage(Math.floor(Math.random() * 4)+1);

        let userId = null;
                
        db.users.insertOne(
            ['username','password','firstname','lastname','email','image','imageType'],
            [person.userName,person.password,person.firstName,person.lastName,person.email,person.avatar,person.imageType])
        .then(function(data){
            userId = data;

            db.prod_prodImages.insertNewProd(
                ['prodName','category','description','startingPrice','location','endTimestamp','sellerId'],
                ['productId','image','imageType'],
                [product.productName,product.department,product.description,product.price,null,product.endDate,userId],
                prodImages
            )
            .then(function(data){
                if(count+1 <= max)
                    insertRandomUserProd(count+1, max)
                    .then(function(data){
                        return resolve(data);
                    })
                    .catch(function(error){
                        return reject(data);
                    });
                else
                    return resolve(data);
            })
            .catch(function(error){
                return reject(error);
            });
        })
        .catch(function(error){
            return reject(error);
        });
    });
}

//function to insert random questions
const insertRandomQuestions = function(count, max){
    return new Promise(function(resolve, reject){
        let prodId = null;

        db.products.selectAll()
        .then(function(data){
            prodId = data[Math.floor(Math.random() * data.length)].id;
        })
        .then(function(){
            db.users.selectAll()
            .then(function(data){
                let userId = data[Math.floor(Math.random() * data.length)].id;
                let question = faker.getRandomQuestion();

                db.questions.insertOne(
                    ['userId','productId','note'],
                    [userId,prodId,question.question]
                )
                .then(function(data){
                    if(count +1 <= max)
                        insertRandomQuestions(count+1, max)
                        .then(function(data){
                            return resolve(data);
                        })
                        .catch(function(error){
                            return reject(error);
                        })
                    else
                        return resolve(data);
                })
                .catch(function(error){
                    return reject(error);
                });
            })
            .catch(function(error){
                return reject(error);
            });
        })
        .catch(function(error){
            return reject(error);
        });
    });
}

//function to insert random questions
const insertRandomAnwsers = function(count, max){
    return new Promise(function(resolve, reject){
        let qId = null;

        db.questions.selectAll()
        .then(function(data){
            qId = data[Math.floor(Math.random() * data.length)].id;
        })
        .then(function(){
            db.users.selectAll()
            .then(function(data){
                let userId = data[Math.floor(Math.random() * data.length)].id;
                let answer = faker.getRandomAnswer();

                db.answers.insertOne(
                    ['userId','questionId','note'],
                    [userId,qId,answer.answer]
                )
                .then(function(data){
                    if(count +1 <= max)
                        insertRandomAnwsers(count+1, max)
                        .then(function(data){
                            return resolve(data);
                        })
                        .catch(function(error){
                            return reject(error);
                        })
                    else
                        return resolve(data);
                })
                .catch(function(error){
                    return reject(error);
                });
            })
            .catch(function(error){
                return reject(error);
            });
        })
        .catch(function(error){
            return reject(error);
        });
    });
}

//function to insert random bids
const insertRandomBids = function(count, max){
    return new Promise(function(resolve, reject){
        let userId = null;

        db.users.selectAll()
        .then(function(data){
            userId = data[Math.floor(Math.random() * data.length)].id;
        })
        .then(function(){
            
            db.products.selectAll()
            .then(function(data){
                let prodId = null;
                let item = null;
                
                //checks to make sure that prodId selected is not the seller for the bidder
                do{
                    item = Math.floor(Math.random() * data.length);
                    if(data[item].sellerId !== userId)
                        prodId = data[item].id;
                }while(prodId == null);

                let bid = faker.getRandomBid(data[item].startingPrice, 9999);

                db.bids.insertOne(
                    ['amount','buyerId','prodId'],
                    [bid.amount,userId,prodId]
                )
                .then(function(data){
                    if(count +1 <= max)
                        insertRandomBids(count+1, max)
                        .then(function(data){
                            return resolve(data);
                        })
                        .catch(function(error){
                            return reject(error);
                        })
                    else
                        return resolve(data);
                })
                .catch(function(error){
                    return reject(error);
                });
            })
            .catch(function(error){
                return reject(error);
            });
        })
        .catch(function(error){
            return reject(error);
        });
    });
}

//function to generate a random data to insert
const generateRandomData = function(){
    if(process.argv.length < 3){
        console.log("Please enter at least 1 integer after the command `node db\\seeder\\seed.js`")
    }
    else{
        //sets up the counters
        let userCount = 0;
        let questionCount = 0;
        let answerCount = 0;
        let bidCount = 0;

        if(process.argv[2])
            userCount = parseInt(process.argv[2]);
        
        if(process.argv[3])
            questionCount = parseInt(process.argv[3]);
        
        if(process.argv[4])
            answerCount = parseInt(process.argv[4]);

        if(process.argv[5])
            bidCount = parseInt(process.argv[5]);

        //calls the database truncation function
        clearEverything()
        .then(function(info){
            //inserts the user with random products for sale
            if(userCount){
                insertRandomUserProd(1, userCount)
                .then(function(data){
                console.log("Inserted "+userCount+" users into the database with products for sale.");
                })
                .then(function(){
                    //inserts the questions
                    if(questionCount)
                        insertRandomQuestions(1, questionCount)
                        .then(function(data){
                            console.log("Inserted "+questionCount+" questions into the database.");
                        })
                        .then(function(){
                            //inserts the answers
                            if(answerCount)
                                insertRandomAnwsers(1, answerCount)
                                .then(function(data){
                                    console.log("Inserted "+answerCount+" answers into the database.");
                                })
                                .catch(function(error){
                                    console.log(error);
                                });
                        })
                        .catch(function(error){
                            console.log(error);
                        });
                })
                .then(function(){
                    if(bidCount){
                        if(userCount > 1){
                            insertRandomBids(1,bidCount)
                            .then(function(data){
                                console.log("Inserted "+bidCount+" bids into the database.")
                            })
                            .catch(function(error){
                                console.log(error);
                            });
                        }
                        else{
                            console.log("Number of users must be greater than 1 to insert any bids.")
                        }
                    }
                })
                .catch(function(error){
                    console.log(error);
                });
            }
        });
    }
}

//executes the main seeder
generateRandomData();