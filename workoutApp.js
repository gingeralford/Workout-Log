require("dotenv").config();
let express = require('express');
let app = express();
const sequelize = require("./workoutDb");

let log = require('./controllers/logController')
let user = require('./controllers/userController');
// const { addHook } = require("../../05-Node-Server/server/db");

//maybe not yet?
sequelize.sync();

app.use(require('./middleware/headers'));
app.use(express.json());

app.use('/user', user);

app.use(require('./middleware/validateSession'));

app.use('/log', log);

app.listen(3000, function() {
    console.log('Workout Log is listening on port 3000');
})