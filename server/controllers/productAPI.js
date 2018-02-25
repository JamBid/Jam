const db = require('../models/models');
const router = require("express").Router();

//product part api for homepage use
router.route('/recent')
    .get(function(req, res){
        db.prod_prodImages.selectRecentAllLimit(6)
        .then(function(results){
            res.json(results);
        })
        .catch(function(error){
            console.log(error);
            res.sendStatus(500);
        })
    })

//path for searching
router.route('/search')
    .get(function(req,res){
        db.prod_prodImages.selectAllCategoryAndSearch(req.query.category.split(','),req.query.search)
        .then(function(results){
            res.json(results);
        })
        .catch(function(error){
            console.log(error);
            res.sendStatus(500);
        })
    })

//path to get a specific product info
router.route('/:id')
    .get(function(req, res){
        db.prod_prodImages.selectOneWithAllImage(req.params.id)
        .then(function(results){
            res.json(results)
        })
        .catch(function(error){
            console.log(error);
            res.sendStatus(500);
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
            res.json(result);
        })
        .catch(function(error){
            console.log(error);
            res.sendStatus(500);
        });
    })

module.exports = router;