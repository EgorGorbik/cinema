var mongoose = require('../config/model');

var filmsSchema = new mongoose.Schema({
    name: String,
    duration: String,
    description: String,
    src: String
});

mongoose.model('Film', filmsSchema);
