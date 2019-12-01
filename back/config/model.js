var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cinema', {
    keepAlive: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});


module.exports = mongoose;
