const joi = require('joi');
const Admin = require('./admin.service');
const jwt = require('../config/jwt');

class adminController {
    constructor() {
        this.admin = new Admin();
        this.schemaAdmin = joi.object().keys({
            username: joi.string().required(),
            password: joi.string().required(),
            token: joi.string()
        });
    }

    generateAccessToken(user) {
        return jwt.sign(user.toJSON(), 'access_token');
    }

    async createAdmin(req, res) {
        try {
            let admin = await this.admin.createAdmin(req.body);
            const accessToken = this.generateAccessToken(admin);
            admin.accessToken = accessToken;
            res.json({
                username: admin.username,
                password: admin.password,
                accessToken: accessToken
            })
        } catch (e) {
            res.send(e.message)
        }

    }

    async updateAdmin(req, res) {
        const accessToken = req.token;
        jwt.verify(accessToken, 'access_token', async (err, user) => {
            if (err) res.sendStatus(403)
            else {
                 let admin = await this.admin.updateAdmin(req.body);
                res.send(admin);
            }
        })
    }

}

module.exports = adminController;
