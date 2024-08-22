const weatherModel = require('../Models/weatherModel')
exports.read = async(req, res) => {
    res.render('index')
}

exports.create = async(req, res) => {
    // res.send("Hello")
    try {
        // console.log(req.body.jsonData)
        const weather = await weatherModel(req.body.jsonData).save()
        res.send(weather)
    } catch (err) {
        console.log(err)
    }
}

exports.fetch = async(req, res) => {
    try {
        const data = await weatherModel.findOne().sort({ "_id": -1 });
        res.send(data)
    } catch (err) {
        console.log(err)
    }

}