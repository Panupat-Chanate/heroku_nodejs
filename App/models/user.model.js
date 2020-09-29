var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    _id: {type: String},
    firstName: {type: String},
    lastName: {type: String},
    startYear: {type: String},
    email: {type: String},
    phone: {type: String},
    address: {type: String},
    position: {type: String},
    workplace: {type: String},
    degree1: {type: String},
    degree2: {type: String},
    degree3: {type: String},
    img: { image: Buffer, contentType: String },
    Date: {type: Date, default: Date.now}
});

mongoose.model('tb_alumni', UserSchema);