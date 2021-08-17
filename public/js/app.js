const weatherForm = document.getElementById('form-search')
const textLocation = document.getElementById('text-location')

const labelLocation = document.getElementById('label-location')
const weatherIcon = document.getElementById('weather-icon')
const temperature = document.getElementById('temperature')
const windSpeed = document.getElementById('wind-speed')
const precip = document.getElementById('precip')
const pressure = document.getElementById('pressure')
const weatherDescribe = document.getElementById('weather-describe')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    labelLocation.innerHTML = 'Loading...'
    const location = textLocation.value
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                alert(data.error + ' Please try again!')
                labelLocation.innerHTML = 'Error occurred!'
            } else {
                const forecast = data.forecast

                labelLocation.innerHTML = data.location
                weatherIcon.src = forecast.weatherIcon
                temperature.innerHTML = forecast.temperature + '&deg;C'
                windSpeed.innerHTML = 'Wind: ' + forecast.windSpeed + ' km/h'
                precip.innerHTML = 'Precip: ' + forecast.precip + ' mm'
                pressure.innerHTML = 'Pressure: ' + forecast.pressure + ' mb'

                weatherDescribe.innerHTML = forecast.weatherInfo + '. It feels like ' + forecast.feelslike + '&deg;C.'
            }
        })
    })
})