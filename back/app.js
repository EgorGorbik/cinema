const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./Users/user.router');
require('./Users/user.model');
const app = express();
app.use(bodyParser.json());
const server = app.listen(5000, () => console.log('Server started on port 5000'));
userRouter(app);
