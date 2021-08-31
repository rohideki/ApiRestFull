const axios = require('axios');

let api = axios.create({
    baseURL = 'localhost:3333'
})

module.exports = api