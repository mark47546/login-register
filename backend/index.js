require('dotenv').config();
const session = require('express-session')
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const MongoDBStore = require('connect-mongodb-session')(session)

const loginRouter = require('./routes/loginRoutes');

const app = express();
MAX_AGE = 1000*60*60*3
const port = process.env.PORT || 5001

//accept request from localhost:3000
const corsOption = {
    origin: 'http://localhost:3000',
    optionSuccessStatus: 200,
};

//Start connection to database

mongoose.Promise = global.Promise
mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
}).then(() => {
    console.log('Database successfully connected');
}, error => {
    console.log('Database error: '+error);
});

const mongoDBstore =  new MongoDBStore({
    uri: process.env.DB,
    collection: 'mySession',
})

app.use(
    session({
    secret: "a1s2d3f4g5",
    name: "session-id",
    store: mongoDBstore,
    cookie: {
        maxAge: MAX_AGE,
        sameSite: false,
        secure: false
    },
    resave: true,
    saveUninitialized: false,
    })
)

app.use(cors(corsOption));
app.use(express.json());

//Routers
app.use('/api', loginRouter);

//Start Server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})


module.exports = app