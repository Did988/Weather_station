const mongoose = require('mongoose')
const weatherSchema = mongoose.Schema({
    temperature: {
        type: Number
    },
    humidity: {
        type: Number
    },
    waterLvl: {
        type: Number
    },
    lightValue: {
        type: Number
    }
}, { timestamps: true })

module.exports = mongoose.model('weathers', weatherSchema)