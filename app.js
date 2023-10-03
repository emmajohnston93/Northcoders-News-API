const express = require('express');
const { getTopics, availableEndpoints, getEndpoints } = require('./Controllers/topics.controller');
require('dotenv').config();
const endpoints = require('./endpoints.json')

const app = express();

app.get('/api/topics', getTopics)

app.get('/api', getEndpoints) 

app.all('/*', (req, res, next) => {
 res.status(404).send({msg: 'Error 404 - Not Found'}) 
 })
   
    
module.exports = app