var router = require('express').Router();
var Model = require("./postModel");

// setup boilerplate route jsut to satisfy a request
// for building

router.route('/')
  .get(function(req, res){
    Model.find({}, function (err, posts) {
      if (err) errorHandler(err, res);
      res.send(posts);
    });
  });

router.route('/')
  .post(function(req, res){
    Model.create(req.body, function (err, post) {
      if (err) errorHandler(err, res);
      res.json(post);
    });
  });

router.route('/:post_id')
  .delete(function(req, res){
    Model.remove({_id: req.params.post_id}, function (err) {
      if (err) errorHandler(err, res);
      res.send({success:true});
    });
  });

router.route('/:post_id')
  .get(function(req, res){
    Model.find({_id: req.params.post_id}, function (err, post) {
      if (err) errorHandler(err, res);
      res.json(post);
    });
  });


router.route('/:post_id')
  .put(function(req, res){
    Model.findOneAndUpdate({_id: req.params.post_id}, req.body, function(err){
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
