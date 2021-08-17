const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=8d9f37dc1095324241ac48cb88c4f1b3&query=' + latitude + ',' + longitude
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather services!', undefined)
        } else if (body.error) {
            callback('Cannot find a location!', undefined)
        } else {
            const current = body.current
            const weatherIcon = current.weather_icons[0]
            const weatherInfo = current.weather_descriptions[0]
            const temperature = current.temperature
            const feelslike = current.feelslike
            const windSpeed = current.wind_speed
            const precip = current.precip
            const pressure = current.pressure
            
            callback(undefined, {
                weatherIcon,
                weatherInfo,
                temperature,
                feelslike,
                windSpeed,
                precip,
                pressure
            })
        }
    })
}

module.exports = forecast
