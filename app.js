const express = require('express');
const { getTopics } = require('./Controllers/topics.controller');
require('dotenv').config();

const app = express();


app.get('/api/topics', getTopics)

app.all('/*', (req, res, next) => {
 res.status(404).send({msg: 'Error 404 - Not Found'}) 
   
    })
   
    


    


module.exports = app