//const bodyParser = require("body-parser");
const db = require("./config/db")
const cors = require("cors");
//const cookieParser = require('cookie-parser');
//const helmet = require('helmet')
//const mongoSanitize = require("express-mongo-sanitize")
require("dotenv").config()

const express = require('express');
const app = require("express")();
//app.enable('trust proxy')
//app.use(bodyParser.json());
app.use(cors());
//app.use(helmet());
//app.use(mongoSanitize())
app.disable('x-powered-by')
//app.use(cookieParser());
app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({limit: '10mb',extended: true, parameterLimit:90000}));



const {
    SENSOR_PORT,

} = process.env
const sensor_port = process.env.SENSOR_PORT || 3001;
app.listen(sensor_port, () => {
  console.log(`Sensors rodando na porta ${sensor_port}`);
})

db.on("open", () => {
  console.log("Conectado ao mongo pelo SENSORS SERVICE! ");
});
db.on("error", (err) => {
  console.log(err);
});

const sensor = require('./routes/sensor.route')

app.use("/", sensor)