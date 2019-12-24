const Controller = require('./admin.controller');
const jwt = require('jsonwebtoken');
const verifyToken = require('../shared/jwt/verifyToken');

function router(app) {
    let controller = new Controller();
    app.post('/admin/', (req, res) => controller.createAdmin(req, res));
    app.put('/admin/', verifyToken, (req, res) => controller.updateAdmin(req, res));
    app.post('/admin/login', (req, res) => controller.loginAdmin(req, res));
    app.post('/admin/logout', verifyToken, (req, res) => controller.logoutAdmin(req, res));
    app.post('/admin/getPermission', verifyToken, (req, res) => controller.getPermission(req, res));
    /*app.get('/users', (req, res) => controller.getUsers(req, res));
    app.get('/user/:id', (req, res) => controller.getUser(req, res));
    app.post('/user/', (req, res) => controller.createUser(req, res));
    app.put('/user/:id', (req, res) => controller.updateUser(req, res));
    app.delete('/user/:id', (req, res) => controller.deleteUser(req, res));*/

}

module.exports = router;
