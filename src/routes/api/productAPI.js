const db = require('../../models/models');
const router = require("express").Router();

router.route('/:id')
    .get(function(req, res){
        db.prod_prodImages.selectOneWithAllImage(req.params.id)
        .then(function(results){
            res.send(results)
        });
    })
    .put(function(req, res){
           //db.products.updateOne()
           res.send(req.body.price)
    });

module.exports = router;