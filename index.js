const express = require('express')
const app = express()
const ejs = require('ejs')
const mongoose = require('mongoose')
const indexController = require('./Controllers/indexController')
const bodyParser = require('body-parser');
const mqttConnect = require('./Config/mqtt')



// mongoose.connect('mongodb+srv://mushroom:QVSnl72yDmIeOkof@cluster0.luqpo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
//     useNewUrlParser: true
// }, )

// connect Database

const connectDB = async() => {
    try {
        await mongoose.connect('mongodb://localhost:27017/weather')
        console.log('Connected DB')
    } catch (err) {
        console.log(err)
    }
}

connectDB()

app.use(express.static('Public'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
    // app.use(bodyParser)
app.set('view engine', 'ejs')

app.get('/', indexController.read)
app.post('/weather', indexController.create)
app.get('/weather/fetch', indexController.fetch)

app.listen(3000, (req, res) => {
    console.log('App is runing on port 3000')
})