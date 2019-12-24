var mongoose = require('../config/model');

class ServiceAdmin {
    constructor() {
        this.admin = mongoose.model('Admin');
    }

    async createAdmin(userArg) {
        let admin = new this.admin(userArg);
        admin.save();
        return admin;
    }

    async updateAdmin(userArg) {
        try {
            return await this.admin.findOneAndUpdate({}, userArg, {new: true})
        } catch (e) {
            return e.message
        }
    }

    async getAdminByUsername(username) {
        try {
            return await this.admin.findOne({username: username});
        } catch (e) {
            return e.message
        }
    }
}

module.exports = ServiceAdmin;
