const db = require('../../models/models');

module.exports = function(app){
     //gets all the product info for a specific id
     app.get("/prod/:id", function(req, res){
        db.prod_prodImages.selectOneWithAllImage(req.params.id)
        .then(function(results){
            res.send(results)
        })
     });
}