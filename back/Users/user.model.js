var mongoose = require('../config/model');

var usersSchema = new mongoose.Schema({
    name: String,
    surname: String,
    username: String,
    password: String,
});

mongoose.model('User', usersSchema);
