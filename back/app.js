const express = require('express');
var cors = require('cors')
const bodyParser = require('body-parser');
const userRouter = require('./Users/user.router');
const adminRouter = require('./Admin/admin.router');
const filmRouter = require('./Films/film.router');
const sessionRouter = require('./Sessions/session.router');
const socket = require('socket.io');
const socketEvents = require('./shared/socket/socket');
require('./Users/user.model');
require('./Admin/admin.model');
require('./Films/film.model');
require('./Sessions/session.model');
const app = express();
app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());
const server = app.listen(5000, () => console.log('Server started on port 5000'));
userRouter(app);
adminRouter(app);
sessionRouter(app);
filmRouter(app);

const io = socket(server);
socketEvents(io);


