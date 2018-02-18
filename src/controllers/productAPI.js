const db = require('../models/models');
const router = require("express").Router();

router.route('/:id')
    .get(function(req, res){
        db.prod_prodImages.selectOneWithAllImage(req.params.id)
        .then(function(results){
            res.send(results)
        })
        .catch(function(error){
            console.log(error);
            res.send({status:'error'});
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
           })
           .catch(function(error){
                console.log(error);
                res.send({status:'error'});
            });
    });*/

router.route('/')
    .post(function(req, res){
        let images = [];

        for(let i = 1; i <= 4; i++){
            if(req.body["image"+i])
                images.push({
                    'image':req.body["image"+i],
                    'imageType':req.body["image"+i+"type"]
                });
        }
        
        db.prod_prodImages.insertNewProd(
            ['prodName','category','description','startingPrice','location',
                'endTimestamp','sellerId'],
            ['productId','image','imageType'],
            [req.body.prodName,req.body.category,req.body.description,req.body.startingPrice,req.body.location,
                req.body.endTimestamp,req,body.sellerId],
            images
        )
        .then(function(result){
            res.send(result);
        })
        .catch(function(error){
            console.log(error);
            res.send({status:'error'});
        });
    })

module.exports = router;