const mongoose = require('mongoose');
const URI = "mongodb+srv://jacaria:N1JYTQjpdAkgxbbt@teste.n2ybanz.mongodb.net/?retryWrites=true&w=majority&appName=teste"
/*
mongoose.connect(URI, {
  useNewUrlParser: true, 
  useUnifiedTopology: true 
});
*/
mongoose.connect(URI);
const db = mongoose.connection;
mongoose.Promise = global.Promise
module.exports = db;