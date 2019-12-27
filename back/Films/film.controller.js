const joi = require('joi');
const Film = require('./film.service');

class filmController {
    constructor() {
        this.film = new Film();
        this.schemaFilm = joi.object().keys({
            name: joi.string().required(),
            duration: joi.string(),
            description: joi.string(),
        });
    }

    async createFilm(req, res) {
        joi.validate(req.body, this.schemaFilm, async (err, result) => {
            if (err) {
                res.send(err.message)
            } else {
                let film = await this.film.createFilm(req.body);
                res.send(film);
            }
        })
    }

    async getFilms(req, res) {
        let films = await this.film.getFilms();
        res.send(films)
    }

    async getFilm(req, res) {
        let film = await this.film.getFilm(req.params.id);
        res.send(film)
    }

    async updateFilm(req, res) {
        let film = await this.film.updateFilm(req.params.id, req.body);
        res.send(film);
    }

    async deleteFilm(req, res) {
        let result = await this.film.deleteFilm(req.params.id);
        if(result === null) {
            res.send('This user does not exist')
        } else {
            res.send(result)
        }
    }
}

module.exports = filmController;
