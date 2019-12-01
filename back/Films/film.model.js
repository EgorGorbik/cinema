var mongoose = require('../config/model');

var filmsSchema = new mongoose.Schema({
    name: String,
    date: String,
    hall: Number,
    duration: String,
    places: Array
});

mongoose.model('Film', filmsSchema);
