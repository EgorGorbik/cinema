const Controller = require('./session.controller') ;
function router(app) {
    let controller = new Controller();
    app.get('/sessions', (req, res) => controller.getSessions(req, res));
    app.get('/session/:id', (req, res) => controller.getSession(req, res));
    app.get('/session/date/:date', (req, res) => controller.getSessionByDate(req, res));
    app.post('/session/', (req, res) => controller.createSession(req, res));
    app.put('/session/:id', (req, res) => controller.updateSession(req, res));
    app.delete('/session/:id', (req, res) => controller.deleteSession(req, res));

    app.put('/choosePlace', (req, res) => controller.choosePlace(req, res));
    app.put('/cancelChoosePlace', (req, res) => controller.cancelChoosePlace(req, res));
    app.put('/cancelChoosePlaces', (req, res) => controller.cancelChoosePlaces(req, res));
}
module.exports = router;
