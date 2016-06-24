/**
 * Created by Fedora on 24/06/2016.
 */
var User = require('../models/users').User;
var Project = require('../models/projects');

module.exports = function(router){

    router.use(function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        res.redirect('/404');
    });

    router.get('/users', function(req, res){
        User.find({})
            .exec(function(err, data){
                if(err) throw err;
                else res.json(data);
            });
    });

    router.get('/projects', function(req, res){
        Project.find({creator: req.user._id})
            .populate('creator', 'username')
            .exec(function(err, data){
            if(err) throw err;
            else res.json(data);
        });
    });

    router.post('/project', function(req, res){
        var project = new Project();
        project.name = req.body.name;
        project.creator = req.user._id;
        project.save(function(err, project){
            if(err) throw err;
            Project.find({_id: project._id})
                .populate('creator', 'username')
                .exec(function(err, project){
                    res.json(project);
                });
        });
    });


};