const joi = require('joi');
const User = require('./user.service');

class userController {
    constructor() {
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
