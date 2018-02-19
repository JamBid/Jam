const db = require('../models/models');
const router = require("express").Router();

//gets the info for a specific user
router.route('/:id')
    .get(function(req, res){
        db.users.selectOne(['id'],[req.params.id])
        .then(function(result){
            res.send(result);
        })
        .catch(function(error){
            res.send(error);
        })
    })

//inserts a new user
router.route('/')
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

module.exports = router;
