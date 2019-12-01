var mongoose = require('../config/model');

var movieSessonsSchema = new mongoose.Schema({
    places: Array
});

mongoose.model('MovieSessions', movieSessonsSchema);
