var mongoose = require('../config/model');
class ServiceUser {
    constructor() {
        this.user = mongoose.model('User');
    }

    async getUserByUsername(username) {
        try {
            return await this.user.findOne({username: username});
        } catch (e) {
            return e.message
        }

    }

    async createUser(userArg) {
        let user = new this.user(userArg);
        user.save();
        return user;
    }

    async getUsers() {
        try {
            return await this.user.find();
        } catch (e) {
            return e.message
        }
    }

    async getUser(_id) {
        try {
            return await this.user.find({_id});
        } catch (e) {
            return e.message
        }
    }

    async updateUser(_id, userArg) {
        try {
            return await this.user.findOneAndUpdate({_id}, userArg, {new: true})
        } catch (e) {
            return e.message
        }
    }

    async deleteUser(_id) {
        try {
            return await this.user.findOneAndDelete({_id});
        } catch (e) {
            return await e.message
        }
    }
}

module.exports = ServiceUser;
