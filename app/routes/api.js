/**
 * Created by Luc on 24/06/2016.
 */

var User = require('../models/users').User;
var Project = require('../models/projects');

module.exports = function(router){

    router.get('/project', function(req, res){
        Project.find({})
            .populate('creator', 'username')
            .exec(function(err, project){

                res.json(project);
            });
    });

    router.post('/project', function(req, res){
        var project = new Project();
        project.name = req.body.name;
        project.creator = req.user._id;
        project.save(function(err, object){
            if(err) console.log(err);
            else{
                Project.find({})
                    .populate('creator')
                    .exec(function(err, project){
                        console.log(JSON.stringify(project, null, '\t'));
                    });
            }
        });
        res.send(200);
    });
};