const joi = require('joi');
const User = require('./user.service');
const jwt = require('../config/jwt');

class userController {
    constructor() {
        this.tokens = [];
        this.user = new User();
        this.schemaUser = joi.object().keys({
            name: joi.string().required(),
            surname: joi.string().required(),
            username: joi.string().required(),
            isOnline: joi.boolean(),
            password: joi.string().required(),
            friends: joi.array(),
            friendRequests: joi.array(),
            sentFriendRequests: joi.array()
        });
    }

    generateAccessToken(user) {
        let token = jwt.sign(user, 'access_token');
        this.tokens.push(token);
        return token;
    }

    async loginUser(req, res) {
        console.log(req.body)
        let user = await this.user.getUserByUsername(req.body.username);
        console.log(user)
        if (user === null) {
            res.status(400).send({ error: "Wrong username" });
        } else if (user.password !== req.body.password) {
            res.status(400).send({ error: "Wrong password" });
        } else {
            let authUser = {_id: user._id, username: user.username, password: user.password};
            const accessToken = this.generateAccessToken(authUser);
            res.json({
                user: user,
                accessToken: accessToken
            })
        }
    }

    async registerUser(req, res) {
                let user = await this.user.getUserByUsername(req.body.username);
                if (user !== null) {
                    res.statusMessage = "This username already exists";
                    res.status(400).end();
                } else {
                    let user = req.body;
                    let newUser =  await this.user.createUser(user);
                    console.log(newUser)
                    let authUser = {_id: newUser._id, username: req.body.username, password: req.body.password};
                    console.log(authUser)
                    const accessToken = this.generateAccessToken(authUser);
                    this.tokens.push(accessToken);
                    res.json({
                        user: newUser,
                        accessToken: accessToken
                    })
                }
    }

    getPermission(req, res) {
        jwt.verify(req.token, 'access_token', async (err, authData) => {
            if (err || !this.tokens.includes(req.token)) {
                res.sendStatus(403);
            } else {
                console.log(authData)
                let user = await this.user.getUserByUsername(authData.username);
                res.json({
                    message: 'permission received',
                    user: user
                });
            }
        });
    }

    logoutUser(req, res) {
        jwt.verify(req.token, 'access_token', async (err, authData) => {
            console.log(this.tokens.includes(req.token))
            if (err && !this.tokens.includes(req.token)) {
                res.sendStatus(403);
            } else {
                console.log(this.tokens)
                let index = this.tokens.indexOf(req.token);
                this.tokens.splice(index, 1)
                console.log(this.tokens);
                res.json({
                    message: 'user success logout'
                })
            }
        });
    }


    async createUser(req, res) {
        joi.validate(req.body, this.schemaUser, async (err, result) => {
            if (err) {
                res.send(err.message)
            } else {
                let user = await this.user.createUser(req.body);
                res.send(user);
            }
        })
    }

    async getUsers(req, res) {
        let users = await this.user.getUsers();
        res.send(users)
    }

    async getUser(req, res) {
        let user = await this.user.getUser(req.params.id);
        res.send(user)
    }

    async updateUser(req, res) {
        let user = await this.user.updateUser(req.params.id, req.body);
        res.send(user);
    }

    async deleteUser(req, res) {
        let result = await this.user.deleteUser(req.params.id);
        if(result === null) {
            res.send('This user does not exist')
        } else {
            res.send(result)
        }
    }
}

module.exports = userController;
