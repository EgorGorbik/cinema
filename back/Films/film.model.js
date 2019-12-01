var mongoose = require('../config/model');

var filmsSchema = new mongoose.Schema({
    name: String,
    date: String,
    hall: Number,
    duration: String,
    movieSessionId: String
});

mongoose.model('Film', filmsSchema);
