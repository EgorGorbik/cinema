var mongoose = require('../config/model');


class ServiceFilm {
    constructor() {
        this.film = mongoose.model('Film');
        this.session = mongoose.model('Sessions');
        /*this.hangTimer();*/
    }

    async hangTimer() {
        let films = await this.film.find();
        films.forEach(el => {
            let currentTime = new Date();
            currentTime = currentTime.getTime();
            setTimeout(() => {this.deleteFilm(el._id); console.log(el._id)}, el.date - currentTime)
        })
    }

    async hangTimerForOneFilm(film) {
        let currentTime = new Date();
        currentTime = currentTime.getTime();
        setTimeout(() => {this.deleteFilm(film._id); console.log(film._id)}, film.date - currentTime)
    }

    async createFilm(userArg) {
        /*let movieSession;
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
        userArg.movieSessionId = movieSession._id*/

        let film = new this.film(userArg);
        film.save();
       /* this.hangTimerForOneFilm(film);*/
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
        console.log('id ' + _id)
        try {
            let k = await this.film.find({_id});
            console.log(k)
            return k
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
            await this.session.deleteMany({filmId: _id});
            return film;
        } catch (e) {
            return await e.message
        }
    }

    async getSessionsForFilm(_id) {
        try {
            let k = await this.session.find({filmId: _id});
            return k
        } catch (e) {
            return await e.message
        }
    }
}

module.exports = ServiceFilm;
