const joi = require('joi');
const MovieSession = require('./movieSessions.service');

class movieSessionController {
    constructor() {
        this.movieSession = new MovieSession();
        this.schemaMovieSession = joi.object().keys({
            places: joi.array(),
            date: joi.string(),
            hall: joi.number(),
            filmId: joi.string()
        });
    }

    async createMovieSession(req, res) {
        joi.validate(req.body, this.schemaMovieSession, async (err, result) => {
            if (err) {
                res.send(err.message)
            } else {
                let movieSession = await this.movieSession.createMovieSession(req.body);
                res.send(movieSession);
            }
        })
    }

    async getMovieSessions(req, res) {
        let movieSession = await this.movieSession.getMovieSessions();
        res.send(movieSession)
    }

    async getMovieSession(req, res) {
        let movieSession = await this.movieSession.getMovieSession(req.params.id);
        res.send(movieSession)
    }

    async updateMovieSession(req, res) {
        let movieSession = await this.movieSession.updateMovieSession(req.params.id, req.body);
        res.send(movieSession);
    }

    async deleteMovieSession(req, res) {
        let result = await this.movieSession.deleteMovieSession(req.params.id);
        if(result === null) {
            res.send('This user does not exist')
        } else {
            res.send(result)
        }
    }
}

module.exports = movieSessionController;
