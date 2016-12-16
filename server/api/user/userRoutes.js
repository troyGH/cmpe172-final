var router = require('express').Router();
var Model = require("./userModel");


// setup boilerplate route jsut to satisfy a request
// for building

//route() will allow you to use same path for different HTTP operation.
//So if you have same URL but with different HTTP OP such as POST,GET etc
//Then use route() to remove redundant code.
router.route('/')
  .get(function(req, res){
    Model.find({}, function (err, users) {
      if (err) errorHandler(err, res);
      res.send(users);
    });
  });

router.route('/')
  .post(function(req, res){
    Model.create(req.body, function (err, user) {
      if (err) errorHandler(err, res);
      res.json(user);
    });
  });


router.route('/:user_id')
  .delete(function(req, res){
    Model.remove({_id: req.params.user_id}, function (err) {
      if (err) errorHandler(err, res);
      res.send({success:true});
    });
  });

router.route('/:user_id')
  .get(function(req, res){
    Model.find({_id: req.params.user_id}, function (err, user) {
      if (err) errorHandler(err, res);
      res.json(user);
    });
  });


router.route('/:user_id')
  .put(function(req, res){
    Model.findOneAndUpdate({_id: req.params.user_id}, req.body, function(err){
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
