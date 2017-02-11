var passport = require('passport');
var Account = require('../models/account');
var Cohort = require('../models/cohort');

module.exports = function (app) {

  app.use(require('body-parser').urlencoded({ extended: true }));

  app.get('/', function (req, res) {
    Cohort.find({}).exec()
      .then(function(data){
        res.render('index', { user : req.user, cohorts: data });
      })
  });

  app.post('/addCohort', function(req, res){
    if (typeof req.user !== "undefined"){
      var newCohort = new Cohort({
        name: req.body.name,
        image: req.body.image,
        description: req.body.description,
        started: req.body.started
      })
      newCohort.save()
        .then(function(){
          res.redirect('/');
        })
    }else{
      res.redirect('/');
    }
  })

  app.get('/register', function(req, res) {
      res.render('register');
  });

  app.delete('/chingu/:id', function(req, res){
    Cohort.findByIdAndDelete(req.params.id).exec()
      .then(function(){
        res.redirect('/');
      })
  });

  app.post('/register', function(req, res) {
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
            return res.render('register');
        }
    });
    passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login'} );
    res.redirect('/');
  });

  app.get('/login', function(req, res) {
      res.render('login', { user : req.user });
  });

  app.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login'}) );

  app.get('/logout', function(req, res) {
      req.logout();
      res.redirect('/');
  });

}