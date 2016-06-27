/**
 * Created by Fedora on 22/06/2016.
 */
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
    password: String,
    creation_date:{
        type: Date,
        default: Date.now
    },
    projects:[{
        type: Schema.Types.ObjectId,
        ref: 'Project'
    }],
    token:{
        type: Schema.Types.ObjectId,
        ref: 'Token',
        default: null
    }
});

var tokenSchema = Schema({
    value: String,
    user:{
        type:Schema.Types.ObjectId,
        ref: 'User'
    },
    expireAt:{
        type: Date,
        expires: '1h',
        default: Date.now()
    }
});

userSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password){

    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateToken = function(){
    var token = new Token();
    console.log(token);
    token.value = rand.generate(32);
    token.user = this._id;
    this.token = token._id;
    this.save(function(err){
        if(err) throw err;
        token.save(function(err){
            if(err) throw err;
        });
    });
};

var User = mongoose.model('User', userSchema);
var Token = mongoose.model('Token', tokenSchema);

var Models = {User: User, Token: Token};

module.exports = Models;