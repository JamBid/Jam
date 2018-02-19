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

module.exports = router;