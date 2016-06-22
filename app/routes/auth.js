/**
 * Created by Luc on 22/06/2016.
 */

module.exports = function(router, passport){

    router.get('/', function(req, res){
        res.render('index.ejs');
    });

    router.get('/logout', function(req, res){
        req.logout();
        res.redirect('/');
    });
};