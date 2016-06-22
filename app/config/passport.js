/**
 * Created by Luc on 22/06/2016.
 */

var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/users').User;
var Token = require('../models/users').Token;

module.exports = function(passport){
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, username, password, done){
        process.nextTick(function(){
            console.log(username, password);
            User.findOne({'username': username}, function(err, user){
                if(err) done(err);
                if(user){
                    return done(null, false);
                }
                else{
                    var newUser = new User();
                    newUser.username = username;
                    newUser.password = newUser.generateHash(password);
                    newUser.save(function(err){
                        if(err) throw err;
                        return done(null, newUser);
                    });
                }
            });
        });
    }));

    passport.use('local-login', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, username, password, done){
        User.findOne({'username': username}, function(err, user){
            if(err) throw err;
            if(!user) return done(null, false);
            if(!user.validPassword(password)) return done(null, false);
            return done(null, user);
        });
    }));

    passport.serializeUser(function(user, done){
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done){
        User.findById(id, function(err, user){
           done(err, user);
        });
    });
};