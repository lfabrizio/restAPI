const express = require('express');
const router = express.Router();
const Ninja = require('../models/ninja');

// get a list of ninjas from the database

router.get('/ninjas', function(req, res) {
    //Ninja.find({}).then(function(ninjas){
        //res.send(ninjas);
    //}); 
    
    
   Ninja.geoNear(
       {type: "Point", coordinates:[parseFloat(req.query.lng).pareseFloat(req.query.lat)]},
       {maxDistance:100000, sphere: true})
       .then(function(ninjas){
           res.send(ninjas);
       });
});

// add a new ninja to the database
router.post('/ninjas', function(req, res, next) {
   Ninja.create(req.body).then(function(ninja){
        res.send(ninja);
    })  .catch(next)
});
    
// update a ninja to the database
router.put('/ninjas/:id', function(req, res, next) {
    Ninja.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
       Ninja.findOne({_id: req.params.id}).then(function(ninja){
        res.send(ninja); 
       });
    });
});


// delete a ninja from database
router.delete('/ninjas/:id', function(req, res, next) {
    Ninja.findByIdAndRemove({_id: req.params.id}).then(function(ninja){
        res.send(ninja);
    });
});


module.exports = router;