var express = require('express');
var router = express.Router();
var userModule= require("./users");
const { name } = require('ejs');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/feed', function(req, res, next) {
    userModule.find()
    .then(function(alluser){
        res.render('feed',{alluser});
    })
  });
  router.get('/delete/:id', function(req, res, next) {
    userModule.findOneAndDelete({_id:req.params.id})
    .then(function(deletedUser){
        res.redirect("back");
    })
  });
  router.get('/edit/:id', function(req, res, next) {
    userModule.findOne({_id:req.params.id})
    .then(function(foundUser){
        res.render("edit",{foundUser});
    })
  });
  router.post('/update/:id', function(req, res, next) {
    userModule.findOneAndUpdate({_id:req.params.id},{
      username:req.body.userName,
      age:req.body.age,
      email:req.body.email,
      image:req.body.image,
      contact:req.body.contact
    })
    .then(function(UpdatedUser){
        res.redirect("/feed");
    })
  });
  
router.post('/register', function(req, res, next) {
    userModule.create({
        username:req.body.userName,
        age:req.body.age,
        email:req.body.email,
        image:req.body.image,
        contact:req.body.contact
    })
    .then(function(createUser){
      res.redirect("/feed");
    })
    });
   router.get('/like/:id',function(req,res,next){
    userModule.findOne({_id:req.params.id})
    .then(function(like){
      like.Likes.push(like)
      like.save()
      res.redirect('/feed')
    })
   })
   router.get('/unlike/:id',function(req,res,next){
    userModule.findOne({_id:req.params.id})
    .then(function(like){
      like.Likes.splice(0,like.Likes.length)
      like.save()
      res.redirect('/feed')
    })
   })

module.exports = router;
