/**
 * Created by Luc on 24/06/2016.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectSchema = new Schema({
    name: String,
    creator:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    creation_date:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Project', projectSchema);