/**
 * Created by Luc on 22/06/2016.
 */

module.exports = function(router, passport){

    router.get('/', function(req, res){
        res.render('index.ejs');
    });

    router.get('/signup', function(req, res){
        res.render('signup.ejs');
    });

    router.post('/signup', passport.authenticate('local-signup',{
        successRedirect: '/home',
        failureRedirect: '/auth/signup'
    }), function(req, res){
        res.send(req.body);
    });

    router.post('/login', passport.authenticate('local-login',{
        successRedirect: '/home',
        failureRedirect: '/auth/signup'
    }), function(req, res){
        res.send({status: true, user: req.body.username});
    });

    router.get('/logout', function(req, res){
        req.session.destroy();
        req.logout();
        res.redirect('/');
    });
};