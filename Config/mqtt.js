const mqtt = require('mqtt')

const host = 'broker.emqx.io'
const port = '1883'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`

const connectUrl = `mqtt://${host}:${port}`

const client = mqtt.connect(connectUrl, {
    clientId,
    clean: true,
    connectTimeout: 4000,
    username: 'emqx',
    password: 'public',
    reconnectPeriod: 1000,
})

const topic = '/nodejs/mqtt'
const axios = require('axios')

client.on('connect', () => {
    console.log('Connected')

    client.subscribe([topic], () => {
        console.log(`Subscribe to topic '${topic}'`)
            // client.publish(topic, 'nodejs mqtt test', { qos: 0, retain: false }, (error) => {
            //     if (error) {
            //         console.error(error)
            //     }
            // })
    })
})

client.on('message', (topic, payload) => {

    const weather = payload.toString()
    const jsonData = JSON.parse(weather)

    // const jsonData = JSON.parse(weather)

    // try {
    //     let jsonData = JSON.parse(weather)

    // } catch (error) {
    //     console.error('Error parsing JSON:', error);
    // }
    // console.log(weather)
    axios.post('http://127.0.0.1:3000/weather', {
            jsonData,
            // headers: {
            //     'Content-Type': 'application/json'
            // }

        })
        .then(function(response) {
            console.log(jsonData)
            console.log(response.data);
        })
        .catch(function(error) {
            console.log(error);
        });
    // console.log('Received Message:', topic, payload.toString())
})