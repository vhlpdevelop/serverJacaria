const db = require("./config/db")
const cors = require("cors");
//const helmet = require('helmet')
//const mongoSanitize = require("express-mongo-sanitize")
require("dotenv").config()
const app = require("express")();
const express = require('express');
//app.enable('trust proxy')
app.use(cors());
//app.use(helmet());
//app.use(mongoSanitize())
app.disable('x-powered-by')
app.use(express.json({limit: '30mb'}));
app.use(express.urlencoded({limit: '30mb',extended: true, parameterLimit:90000}));
const {
    USER_PORT,

} = process.env
const user_port = process.env.USER_PORT || 5000;
console.log(user_port)
app.listen(user_port, () => {
  console.log(`USER SERVICE rodando na porta ${user_port}`);
})

db.on("open", () => {
  console.log("Conectado ao mongo pelo USER SERVICE! ");
});
db.on("error", (err) => {
  console.log(err);
});

const user = require('./routes/user.route')

app.use("/", user)