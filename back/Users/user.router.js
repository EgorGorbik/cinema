const verifyToken = require('../shared/jwt/verifyToken');
const Controller = require('./user.controller') ;

function router(app) {
    let controller = new Controller();
    app.get('/users', (req, res) => controller.getUsers(req, res));
    app.get('/user/:id', (req, res) => controller.getUser(req, res));
    app.post('/user/', (req, res) => controller.createUser(req, res));
    app.put('/user/:id', (req, res) => controller.updateUser(req, res));
    app.delete('/user/:id', (req, res) => controller.deleteUser(req, res));

    app.post('/user/registration', (req, res) => controller.registerUser(req, res));
    app.post('/user/login', (req, res) => controller.loginUser(req, res));
    app.post('/user/getPermission', verifyToken, (req, res) => controller.getPermission(req, res));
    app.post('/user/logout', verifyToken, (req, res) => controller.logoutUser(req, res));
}
module.exports = router;
