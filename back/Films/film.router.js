const Controller = require('./film.controller') ;
var formidable = require('formidable');
var fs = require('fs');
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' +file.originalname )
    }
})
var upload = multer({ storage: storage }).single('file')

function router(app) {
    let controller = new Controller();
    app.get('/films', (req, res) => controller.getFilms(req, res));
    app.get('/film/:id', (req, res) => controller.getFilm(req, res));
    app.post('/film/', (req, res) => controller.createFilm(req, res));
    app.put('/film/:id', (req, res) => controller.updateFilm(req, res));
    app.delete('/film/:id', (req, res) => controller.deleteFilm(req, res));
    app.post('/film/img', (req, res) => {
        upload(req, res, function (err) {
            if (err) {
                return res.status(500).json(err)
            }
            console.log(req.file)
                return res.download('./public/1579099540203-ford-vs-ferrari-ru-sub-370730.jpg');
            //return res.status(200).send(req.file)

        })
    })
}
module.exports = router;
