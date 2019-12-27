var mongoose = require('../config/model');

var filmsSchema = new mongoose.Schema({
    name: String,
    duration: String,
    description: String
});

mongoose.model('Film', filmsSchema);
