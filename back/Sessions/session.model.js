var mongoose = require('../config/model');

var sessionsSchema = new mongoose.Schema({
    places: Array,
    date: String,
    time: String,
    hall: Number,
    filmId: String,
    price: Number
});

mongoose.model('Sessions', sessionsSchema);
