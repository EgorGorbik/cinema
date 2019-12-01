const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./Users/user.router');
const filmRouter = require('./Films/film.router');
require('./Users/user.model');
require('./Films/film.model');
const app = express();
app.use(bodyParser.json());
const server = app.listen(5000, () => console.log('Server started on port 5000'));
userRouter(app);
filmRouter(app);
