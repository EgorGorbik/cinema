const joi = require('joi');
const Session = require('./session.service');


class sessionController {
    constructor() {
        this.session = new Session();
        this.schemaSession = joi.object().keys({
            places: joi.array(),
            date: joi.string(),
            hall: joi.number(),
            filmId: joi.string(),
            time: joi.string(),
            price: joi.number()
        });
    }

    async createSession(req, res) {
        joi.validate(req.body, this.schemaSession, async (err, result) => {
            if (err) {
                res.send(err.message)
            } else {
                let session = await this.session.createSession(req.body);
                res.send(session);
            }
        })
    }

    async choosePlace(req, res) {
        console.log('--------------------------')
        console.log(req.body)
        console.log(req.body.idPlace)
        console.log('--------------------------')
        let session = await this.session.getSession(req.body.idSession);
        console.log(session)
        let newPlacesArray = [];
        newPlacesArray = session[0].places.map(e => {
            if(e.id === +req.body.idPlace) {
                e.isFree = false;
                return e;
            } else {
                return e;
            }
        })
        session[0].places = newPlacesArray
        let rez = await this.session.updateSession(req.body.idSession, session[0])
        res.send(rez)
    }

    async cancelChoosePlace(req, res) {

        let session = await this.session.getSession(req.body.idSession);
        let newPlacesArray = [];
        newPlacesArray = session[0].places.map(e => {
            if(e.id === +req.body.idPlace) {
                e.isFree = true;
                return e;
            } else {
                return e;
            }
        })
        session[0].places = newPlacesArray
        let rez = await this.session.updateSession(req.body.idSession, session[0])
        console.log('-------------------')
        console.log(rez)
        res.send(rez)
    }

    async getSessions(req, res) {
        let session = await this.session.getSessions();
        res.send(session)
    }

    async getSession(req, res) {
        let session = await this.session.getSession(req.params.id);
        res.send(session)
    }

    async getSessionByDate(req, res) {
        let sessions = await this.session.getSessionByDate(req.params.date);
        console.log('======')
        console.log(sessions)
        res.send(sessions)
    }

    async updateSession(req, res) {
        let session = await this.session.updateSession(req.params.id, req.body);
        res.send(session);
    }

    async deleteSession(req, res) {
        let result = await this.session.deleteSession(req.params.id);
        if(result === null) {
            res.send('This user does not exist')
        } else {
            res.send(result)
        }
    }
}

module.exports = sessionController;
