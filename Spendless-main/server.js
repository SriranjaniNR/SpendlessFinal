const express = require('express');
const app = express();
var mongoose = require('mongoose');
require('dotenv').config()
var session = require('express-session');
app.set('view engine', 'html');

app.engine('html', require('ejs').renderFile);

app.use(express.static(__dirname + '/public/'));
 
var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;
var $ = require("jquery")(window);


mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser: true});
const db =mongoose.connection;
db.on('error',(error) =>console.error(error))
db.once('open',() =>console.log("welcome"))

mongoose.createConnection(process.env.DATABASE_URL2,{useNewUrlParser: true});
const db2 =mongoose.connection;
db2.on('error',(error) =>console.error(error))
db2.once('open',() =>console.log("welcome2"))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const username =require('./username')
app.use('/19BCT0165',username)


app.listen(8000, () => {
    console.log("port is 8000");
})