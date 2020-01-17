var mongoose = require('../config/model');

var sessionsSchema = new mongoose.Schema({
    places: Array,
    date: String,
    time: String,
    hall: Number,
    filmId: String
});

mongoose.model('Sessions', sessionsSchema);
