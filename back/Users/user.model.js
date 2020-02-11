var mongoose = require('../config/model');

var usersSchema = new mongoose.Schema({
    name: String,
    surname: String,
    username: String,
    password: String,
    chooseTicketInfo: Object
});

mongoose.model('User', usersSchema);
