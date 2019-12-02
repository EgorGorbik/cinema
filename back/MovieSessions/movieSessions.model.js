var mongoose = require('../config/model');

var movieSessonsSchema = new mongoose.Schema({
    places: Array,
    date: String,
    hall: Number,
    filmId: String
});

mongoose.model('MovieSessions', movieSessonsSchema);
