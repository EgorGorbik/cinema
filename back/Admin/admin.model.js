var mongoose = require('../config/model');

var adminSchema = new mongoose.Schema({
    username: String,
    password: String,
    token: String
});

mongoose.model('Admin', adminSchema);
