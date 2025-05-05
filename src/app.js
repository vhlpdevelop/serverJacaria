//const bodyParser = require("body-parser");
//const db = require("./config/db")
const cors = require("cors");
//const helmet = require('helmet')
//const mongoSanitize = require("express-mongo-sanitize")
require("dotenv").config()
const express = require('express');
const httpProxy = require('express-http-proxy');
const app = express();

//const port = 443;	
//app.use(bodyParser.json());
app.use(cors());
//app.use(helmet());
//app.use(mongoSanitize())
app.disable('x-powered-by')
app.use(express.json({limit: '30mb'}));
app.use(express.urlencoded({limit: '30mb',extended: true, parameterLimit:90000}));

//ENV

const {
    HOTSPOT_PORT,
    USER_PORT,
    PORT
} = process.env

//IO SOCKET
/*
var server = require("https").createServer(httpsOptions, app);
const io = require("socket.io")(server, {
  cors: {
    origins: []
  },
});
*/

//PROXYS
const sensors_port = process.env.SENSORS_PORT || 3001;
const user_port = process.env.USER_PORT || 3002;
const SensorsServiceProxy = httpProxy("0.0.0.0:" + sensors_port);
const UserServiceProxy = httpProxy("0.0.0.0:" + user_port);



app.use('/sensors', (req, res, next) => SensorsServiceProxy(req, res, next));
app.use('/user', (req, res, next) => UserServiceProxy(req, res, next));

/*
db.on("open", () => {
  console.log("Conectado ao mongo pelo ADMIN SERVICE! ");
});
db.on("error", (err) => {
  console.log(err);
});
*/

const port = process.env.PORT || 3000;

app.listen(3000, "0.0.0.0", () => {
  console.log(`Servidor rodando na porta 3000`);

});

app.get('/', (req, res) => {
  res.send('Hello World!');
});
/*
server.listen(port, "0.0.0.0", () => {
    console.log(`Servidor rodando na porta 443`);
  
  });
  */