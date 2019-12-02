const Controller = require('./admin.controller');
const jwt = require('jsonwebtoken');

function router(app) {
    let controller = new Controller();
    app.post('/admin/', (req, res) => controller.createAdmin(req, res));
    app.put('/admin/', verifyToken, (req, res) => controller.updateAdmin(req, res));
    /*app.get('/users', (req, res) => controller.getUsers(req, res));
    app.get('/user/:id', (req, res) => controller.getUser(req, res));
    app.post('/user/', (req, res) => controller.createUser(req, res));
    app.put('/user/:id', (req, res) => controller.updateUser(req, res));
    app.delete('/user/:id', (req, res) => controller.deleteUser(req, res));*/

    function verifyToken(req, res, next) {
        // Get auth header value
        const bearerHeader = req.headers['authorization'];
        // Check if bearer is undefined
        if (typeof bearerHeader !== 'undefined') {
            // Split at the space
            const bearer = bearerHeader.split(' ');
            // Get token from array
            const bearerToken = bearer[1];
            // Set the token
            req.token = bearerToken;
            // Next middleware
            next();
        } else {
            // Forbidden
            res.sendStatus(403);
        }

    }
}

module.exports = router;
