const Controller = require('./film.controller') ;
function router(app) {
    let controller = new Controller();
    app.get('/films', (req, res) => controller.getFilms(req, res));
    app.get('/film/:id', (req, res) => controller.getFilm(req, res));
    app.post('/film/', (req, res) => controller.createFilm(req, res));
    app.put('/film/:id', (req, res) => controller.updateFilm(req, res));
    app.delete('/film/:id', (req, res) => controller.deleteFilm(req, res));
}
module.exports = router;