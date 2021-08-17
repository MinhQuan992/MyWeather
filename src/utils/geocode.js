const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWluaHF1YW45OTIiLCJhIjoiY2tyb3BoM21rMTVrbzJvbW9wNmlxZWY5bSJ9.Ic9RwC9X59R3p3duFppUuQ&limit=1'
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location!', undefined)
        } else {
            const data = body.features[0]
            const obj = {
                longitude: data.center[0],
                latitude: data.center[1],              
                location: data.place_name
            }
            callback(undefined, obj)
        }
    })
}

module.exports = geocode
