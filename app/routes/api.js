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
        res.redirect('/auth');
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

    router.get('/session', function(req, res){
        console.log(req.session);
       res.json(req.session);
    });

    router.get('/project/:id', function(req, res){
        console.log(req.params);
        Project.findOne({_id: req.params.id})
            .exec(function(err, data){
                if(err) throw err;
                else{
                    req.session.project = data;
                    req.session.save();
                    console.log(req.session)
                }
            });
       res.redirect('/');
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