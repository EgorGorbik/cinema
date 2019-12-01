const Controller = require('./user.controller') ;
function router(app) {
    let controller = new Controller();
    app.get('/users', (req, res) => controller.getUsers(req, res));
    app.get('/user/:id', (req, res) => controller.getUser(req, res));
    app.post('/user/', (req, res) => controller.createUser(req, res));
    app.put('/user/:id', (req, res) => controller.updateUser(req, res));
    app.delete('/user/:id', (req, res) => controller.deleteUser(req, res));
}
module.exports = router;
