const path = require('path')
const express = require('express')
const geocode = require('../src/utils/geocode')
const forecast = require('../src/utils/forecast')
const hbs = require('hbs')

const app = express()

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set up handlebars engine and views' location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
hbs.registerHelper('ternary', (a, b, style) => {
    return a === b ? style : ''
})

// Set up static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        page: 'index'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        page: 'about'
    })
})

app.get('/contact', (req, res) => {
    res.render('contact', {
        page: 'contact'
    })
})

app.get('/services', (req, res) => {
    res.render('services', {
        page: 'services'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (geocodeError, {longitude, latitude, location} = {}) => {
        if (geocodeError) {
            return res.send({
                error: geocodeError
            })
        }

        forecast(latitude, longitude, (forecastError, forecastResponse) => {
            if (forecastError) {
                return res.send({
                    error: forecastError
                })
            }

            return res.send({
                forecast: forecastResponse,
                location
            })
        })
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        page: 'error',
        content: 'Page Not Found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})
