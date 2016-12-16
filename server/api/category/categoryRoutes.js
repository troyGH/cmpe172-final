var router = require('express').Router();
var Model = require("./categoryModel");

// setup boilerplate route jsut to satisfy a request
// for building
router.route('/')
  .get(function(req, res){
    Model.find({}, function (err, categories) {
      if (err) return callback(err);
      res.send(categories);
    });
  });

router.route('/')
  .post(function(req, res){
    Model.create(req.body, function (err, category) {
      if (err) errorHandler(err, res);
      res.json(category);
    });
  });


router.route('/:category_id')
  .delete(function(req, res){
    Model.remove({_id: req.params.category_id}, function (err) {
      if (err) errorHandler(err, res);
      res.send({success:true});
    });
  });

router.route('/:category_id')
  .get(function(req, res){
    Model.find({_id: req.params.category_id}, function (err, user) {
      if (err) errorHandler(err, res);
      res.json(user);
    });
  });


router.route('/:category_id')
  .put(function(req, res){
    Model.findOneAndUpdate({_id: req.params.category_id}, req.body, function(err){
      if (err) errorHandler(err, res);
        res.send({success:true});
    });
  });

function errorHandler(err, res){
  console.log(err);
  res.status(500);
  res.send("Internal error");
}
module.exports = router;
