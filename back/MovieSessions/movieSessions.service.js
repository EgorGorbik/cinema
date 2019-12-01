var mongoose = require('../config/model');

class ServiceMovieSession {
    constructor() {
        this.movieSession = mongoose.model('MovieSessions');
    }

    async createMovieSession(userArg) {
        let movieSession = new this.movieSession(userArg);
        movieSession.save();
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
}

module.exports = ServiceMovieSession;
