/**
 * Created by Luc on 22/06/2016.
 */

module.exports = function(router){
    router.get('/', function(req, res){
        res.render('index');
    });
};