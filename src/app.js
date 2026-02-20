const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userSignUpRoute = require('./routes/user.signUp.route');
const userLoginRoute = require('./routes/user.login.route');
const userProfileRoute = require('./routes/user.profile.route');
const homeRoute = require('./routes/home.route');

app.use(cors({
    origin: "https://roxco.xyz",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
    


app.use(cookieParser());
app.use(express.json());

// Mount routes properly
app.use('/api/auth', userLoginRoute);
app.use('/api', userProfileRoute);
app.use('/api', homeRoute);
app.use('/api/auth', userSignUpRoute);
module.exports = app;