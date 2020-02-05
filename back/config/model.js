var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27018/cinema', {
    keepAlive: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});


module.exports = mongoose;
