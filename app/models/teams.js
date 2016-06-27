/**
 * Created by Fedora on 24/06/2016.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var teamModel = new Schema({
    name: String,
    users:[{
        type:Schema.Types.ObjectId,
        ref: 'User'
    }],
    createdBy:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Team', teamModel);
