var mongoose = require('../config/model');
let firstHall = require('../shared/hallsPlaces/1hall');
let secondHall = require('../shared/hallsPlaces/2hall');
let thirdHall = require('../shared/hallsPlaces/3hall');
const Film = require('../Films/film.service');

class ServiceSession {
    constructor() {
        this.session = mongoose.model('Sessions');
        this.film = new Film();
    }

    async hangTimerForOneFilm(session) {
        let currentTime = new Date();
        currentTime = currentTime.getTime();
        setTimeout(() => {this.deleteSession(session._id); }, session.date - currentTime)
    }

    async createSession(userArg) {
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
        let session = new this.session(userArg);
        try {
            await this.film.getFilm(session.filmId)
        } catch (e) {
            return e.message
        }

        session.save();
        //this.hangTimerForOneFilm(session)
        return session;
    }

    async getSessions() {
        try {
            return await this.session.find();
        } catch (e) {
            return e.message
        }
    }

    async getSession(_id) {
        try {
            return await this.session.find({_id});
        } catch (e) {
            return e.message
        }
    }

    async getSessionByDate(date) {
        try {
            let newSessions = await this.session.find({});
            newSessions = newSessions.filter(e => {if(e.date === date) {return e}})
            return {sessions: newSessions}
        } catch (e) {
            return e.message
        }
    }

    async updateSession(_id, userArg) {
        try {
            return await this.session.findOneAndUpdate({_id}, userArg, {new: true})
        } catch (e) {
            return e.message
        }
    }

    async choosePlace(_id, idPlace) {
        try {
            let session = await this.session.findOne({_id});
            let newPlaces = [];
            session.places.forEach(e => {
                if(e.id !== +idPlace) {newPlaces.push(e)}
                else {
                    e.isFree = false;
                    newPlaces.push(e)
                }
            })
            let newObj = {...session, newPlaces};
            let k = await this.session.findOneAndUpdate({_id}, newObj, {new: true})
            return k
            //return {...state, places: newPlaces}
            //await this.film.find({_id: userArg.filmId})
            //return await this.session.findOneAndUpdate({_id}, userArg, {new: true})
        } catch (e) {
            return e.message
        }
    }

    async deleteSession(_id) {
        try {
            return await this.session.findOneAndDelete({_id});
        } catch (e) {
            return await e.message
        }
    }

    async deleteSessionByFilmId(id) {
        try {
            return await this.session.deleteMany({filmId: id});
        } catch (e) {
            return await e.message
        }
    }
}

module.exports = ServiceSession;
