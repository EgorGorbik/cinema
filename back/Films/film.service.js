var mongoose = require('../config/model');

class ServiceFilm {
    constructor() {
        this.film = mongoose.model('Film');
    }

    async createFilm(userArg) {
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
            return await this.film.findOneAndDelete({_id});
        } catch (e) {
            return await e.message
        }
    }
}

module.exports = ServiceFilm;
