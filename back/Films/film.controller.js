const joi = require('joi');
const Film = require('./film.service');
const multer = require('multer');


class filmController {
    constructor() {
        this.film = new Film();
        this.schemaFilm = joi.object().keys({
            name: joi.string().required(),
            duration: joi.string(),
            description: joi.string(),
        });
        this.storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, 'public')
            },
            filename: function (req, file, cb) {
                console.log(req.params)
                console.log(file)
                cb(null, req.params.name + '.jpg' )
            }
        })
        this.upload = multer({ storage: this.storage }).single('file')
    }

    async createFilm(req, res) {
        let film = await this.film.createFilm(req.body);
        res.send(film);
    }
    async createPoster(req, res) {
        this.upload(req, res, function (err) {
            if (err) {
                return res.status(500).json(err)
            }
            return res.status(200).send(req.file)
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
