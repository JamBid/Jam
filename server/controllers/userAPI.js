const db = require('../models/models');
const router = require("express").Router();

const bcrypt = require('bcryptjs');

//updates a user
router.route('/update')
    .post(function(req, res){
        db.users.updateOne(req.body.userInfo,{id:req.body.userId})
        .then(function(result){
            res.json(result);
        })
        .catch(function(error){
            console.log(error);
            res.sendStatus(500);
        })
    })


//sign up new user
router.route('/signup')
    .post(function(req, res){

        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(req.body.password , salt, function(err, hash) {
                req.body.password = hash;

        db.users.insertOne(
            ["email","userName","firstName","lastName","password","image","imageType"],
            [req.body.email, req.body.userName, req.body.firstName, req.body.lastName, req.body.password, req.body.image, req.body.imageType])
        .then(function(result) {
            res.json({status:'good',result:result});
        })
        .catch(function(error){
            console.log(error);
            if(error.code === 'ER_DUP_ENTRY')
                res.json({status:'bad', msg:"Username already in use."});
            else
                res.sendStatus(500);
          });
      })
    });
});
//gets the info for a specific user
router.route('/:id')
    .get(function(req, res){
        db.users.selectAllWithMultCon({'id':req.params.id})
        .then(function(result){
            res.json(result);
        })
        .catch(function(error){
            console.log(error);
            res.sendStatus(500);
        })
    })


router.route('/')
    //inserts a new user
    /*.post(function(req, res){
        db.users.insertOne(
            ["email","userName","firstName","lastName","password","image","imageType"],
            [req.body.email, req.body.userName, req.body.firstName, req.body.lastName, req.body.password, req.body.image, req.body.imageType])
        .then(function(result) {
            res.send(result);
        })
        .catch(function(error){
            res.send(error);
        });
    })*/
    //gets user info from logging in
    .post(function(req,res){
        db.users.selectAllWithMultCon({'userName':req.body.userName,'password':req.body.password})
        .then(function(result){
            res.json(result);
        })
        .catch(function(error){
            console.log(error);
            res.sendStatus(500);
        });
    })

module.exports = router;
