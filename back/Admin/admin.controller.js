const joi = require('joi');
const Admin = require('./admin.service');
const jwt = require('../config/jwt');

class adminController {
    constructor() {
        this.admin = new Admin();
        this.tokens = [];
        this.schemaAdmin = joi.object().keys({
            username: joi.string().required(),
            password: joi.string().required(),
            token: joi.string()
        });
    }

    generateAccessToken(admin) {
        let token = jwt.sign(admin, 'access_token');
        this.tokens.push(token);
        return token;
    }

    async createAdmin(req, res) {
        try {
            let admin = await this.admin.createAdmin(req.body);
            const accessToken = this.generateAccessToken(admin);
            admin.accessToken = accessToken;
            res.json({
                username: admin.username,
                password: admin.password,
                accessToken: admin.accessToken
            })
        } catch (e) {
            res.send(e.message)
        }

    }

    async updateAdmin(req, res) {
        const accessToken = req.token;
        jwt.verify(accessToken, 'access_token', async (err, user) => {
            if (err && !this.tokens.includes(req.token)) res.sendStatus(403)
            else {
                 let admin = await this.admin.updateAdmin(req.body);
                res.send(admin);
            }
        })
    }

    async loginAdmin(req, res) {
        let admin = await this.admin.getAdminByUsername(req.body.username);
        if (admin === null) {
            res.status(400).send({ error: "Wrong username" });
        } else if (admin.password !== req.body.password) {
            res.status(400).send({ error: "Wrong password" });
        } else {
            let authAdmin = {_id: admin._id, username: admin.username, password: admin.password};
            const accessToken = this.generateAccessToken(authAdmin);
            res.json({
                admin: admin,
                accessToken: accessToken
            })
        }
    }

    logoutAdmin(req, res) {
        jwt.verify(req.token, 'access_token', async (err, authData) => {
            if (err && !this.tokens.includes(req.token)) {
                res.sendStatus(403);
            } else {
                let index = this.tokens.indexOf(req.token);
                this.tokens.splice(index, 1)
                res.json({
                    message: 'admin success logout'
                })
            }
        });
    }

    getPermission(req, res) {
        jwt.verify(req.token, 'access_token', async (err, authData) => {
            if (err) {
                res.sendStatus(403);
            } else {
                let admin = await this.admin.getAdminByUsername(authData.username);
                res.json({
                    message: 'permission received',
                    admin: admin
                });
            }
        });
    }

}

module.exports = adminController;
