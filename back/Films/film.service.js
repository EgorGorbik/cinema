var mongoose = require('../config/model');
const MovieSession = require('../MovieSessions/movieSessions.service');
let firstHall = require('../shared/hallsPlaces/1hall');
let secondHall = require('../shared/hallsPlaces/2hall');
let thirdHall = require('../shared/hallsPlaces/3hall');

class ServiceFilm {
    constructor() {
        this.movieSession = new MovieSession();
        this.film = mongoose.model('Film');
    }

    async createFilm(userArg) {
        let movieSession;
        switch(userArg.hall) {
            case '1':
                movieSession = await this.movieSession.createMovieSession({places: firstHall});
                break;
            case '2':
                movieSession = await this.movieSession.createMovieSession({places: secondHall});
                break;
            case '3':
                movieSession = await this.movieSession.createMovieSession({places: thirdHall});
                break;
        }
        userArg.movieSessionId = movieSession._id

        console.log(movieSession)
        let film = new this.film(userArg);
        film.save();
        return film;
    }

    async getFilms() {
        try {
            return await this.film.find();
        } catch (e) {
            return e.message
        }
    }

    async getFilm(_id) {
        try {
            return await this.film.find({_id});
        } catch (e) {
            return e.message
        }
    }

    async updateFilm(_id, userArg) {
        try {
            return await this.film.findOneAndUpdate({_id}, userArg, {new: true})
        } catch (e) {
            return e.message
        }
    }

    async deleteFilm(_id) {
        try {
            let film = await this.film.findOneAndDelete({_id});
            await this.movieSession.deleteMovieSession(film.movieSessionId);
            return film;
        } catch (e) {
            return await e.message
        }
    }
}

module.exports = ServiceFilm;
