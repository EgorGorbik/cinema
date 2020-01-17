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
            time: joi.string()
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
