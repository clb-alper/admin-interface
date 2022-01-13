const path = require('path');
const express = require('express');
const app = express();
const Admin = require('../src/models/admin');
const db = require('../src/db/mongoose')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')

const createAdmin = require('../src/utils/createAdmin')

//utils
const newEntry = require('./utils/newEntry');

//routes 
const routes = require('../src/routes/default')

const port = 3333;

// define paths for express config
const viewsPath = path.join(__dirname, '../templates/views')

// setup handlebars engine and views location
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html');
app.set('views', viewsPath)




app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
createAdmin();
app.use(routes);

setInterval(() => {
    newEntry()

}, 10000)

app.listen(port, () => {
    console.log('server is up on port ' + port)
})







