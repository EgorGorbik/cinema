const Controller = require('./movieSessions.controller') ;
function router(app) {
    let controller = new Controller();
    app.get('/movieSessions', (req, res) => controller.getMovieSessions(req, res));
    app.get('/movieSession/:id', (req, res) => controller.getMovieSession(req, res));
    app.post('/movieSession/', (req, res) => controller.createMovieSession(req, res));
    app.put('/movieSession/:id', (req, res) => controller.updateMovieSession(req, res));
    app.delete('/movieSession/:id', (req, res) => controller.deleteMovieSession(req, res));
}
module.exports = router;
