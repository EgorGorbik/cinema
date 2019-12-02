var mongoose = require('../config/model');
let firstHall = require('../shared/hallsPlaces/1hall');
let secondHall = require('../shared/hallsPlaces/2hall');
let thirdHall = require('../shared/hallsPlaces/3hall');

class ServiceMovieSession {
    constructor() {
        this.movieSession = mongoose.model('MovieSessions');
    }

    async hangTimerForOneFilm(movieSession) {
        let currentTime = new Date();
        currentTime = currentTime.getTime();
        setTimeout(() => {this.deleteMovieSession(movieSession._id); console.log(movieSession._id)}, movieSession.date - currentTime)
    }

    async createMovieSession(userArg) {
        switch(userArg.hall) {
            case '1':
                userArg.places = firstHall;
                break;
            case '2':
                userArg.places = secondHall;
                break;
            case '3':
                userArg.places = thirdHall;
                break;
        }
        let movieSession = new this.movieSession(userArg);
        movieSession.save();
        this.hangTimerForOneFilm(movieSession)
        return movieSession;
    }

    async getMovieSessions() {
        try {
            return await this.movieSession.find();
        } catch (e) {
            return e.message
        }
    }

    async getMovieSession(_id) {
        try {
            return await this.movieSession.find({_id});
        } catch (e) {
            return e.message
        }
    }

    async updateMovieSession(_id, userArg) {
        try {
            return await this.movieSession.findOneAndUpdate({_id}, userArg, {new: true})
        } catch (e) {
            return e.message
        }
    }

    async deleteMovieSession(_id) {
        try {
            return await this.movieSession.findOneAndDelete({_id});
        } catch (e) {
            return await e.message
        }
    }

    async deleteMovieSessionByFilmId(id) {
        try {
            return await this.movieSession.deleteMany({filmId: id});
        } catch (e) {
            return await e.message
        }
    }
}

module.exports = ServiceMovieSession;
