var mongoose = require('../config/model');

var filmsSchema = new mongoose.Schema({
    name: String,
    duration: String
});

mongoose.model('Film', filmsSchema);
