/**
 * Created by Luc on 22/06/2016.
 */

var LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport){
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passRaqToCallback: true
    },
    function(req, username, password, done){
        process.nextTick(function(){
            return done(null, false);
        });
    }));

    passport.use('local-login', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, username, password, done){
        return done(null, {user: "Luc"});
    }));

    passport.serializeUser(function(user, done){
        done(null, {user: "Luc"});
    });

    passport.deserializeUser(function(id, done){
        done(null, {user: 'Luc'});
    })
};