const db = require('../models/models');
const router = require("express").Router();

//updates a user
router.route('/update')
    .post(function(req, res){
        db.users.updateOne(req.body.userInfo,{id:req.body.userId})
        .then(function(result){
            res.send(result);
        })
        .catch(function(error){
            res.send(error);
        })
    })


//sign up new user
router.route('/signup')
    .post(function(req, res){
        db.users.insertOne(
            ["email","userName","firstName","lastName","password","image","imageType"],
            [req.body.email, req.body.userName, req.body.firstName, req.body.lastName, req.body.password, req.body.image, req.body.imageType])
        .then(function(result) {
            res.send(result);
        })
        .catch(function(error){
            res.send(error);
        });
    })

//gets the info for a specific user
router.route('/:id')
    .get(function(req, res){
        db.users.selectAllWithMultCon({'id':req.params.id})
        .then(function(result){
            res.send(result);
        })
        .catch(function(error){
            res.send(error);
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
            res.send(result);
        })
        .catch(function(error){
            res.send(error);
        });
    })

module.exports = router;
