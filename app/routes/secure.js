/**
 * Created by Luc on 22/06/2016.
 */

module.exports = function(router){

    router.use(function(req, res, next){
        if(req.isAuthenticated()){
           return next();
        }
        res.redirect('/auth');
    });

    router.get('/profile', function(req, res){
        res.render('secured/profile', {user: req.user});
    });

    router.get('/home', function(req, res){
        res.render('secured/home', {user: req.user});
    });

    router.get('/*', function(req, res){
        res.redirect('/home');
    });
};