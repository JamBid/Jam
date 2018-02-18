const db = require('../models/models');
const router = require("express").Router();

router.route('/:id')
    .get(function(req, res){
        db.prod_prodImages.selectOneWithAllImage(req.params.id)
        .then(function(results){
            res.send(results)
        });
    })
    /*.put(function(req, res){
           db.products.updateOne(
               {
                   'startingPrice':req.body.startingPrice,
                   'prodName': req.body.prodName,
                   'description': req.body.description,
                   'location': req.body.location,
                   'category': req.body.category
                },
                req.params.id
           )
           .then(function(result){
                res.send(result)
           });           
    });*/

module.exports = router;