const express = require('express');
const { getTopics } = require('./Controllers/topics.controller');
require('dotenv').config();

const app = express();

app.use(express.json())

app.get('/api/topics', getTopics)

app.all('/*', (req, res, next) => {
    console.log('made it')
 res.status(404).send({msg: 'Error 404 - Not Found'}) 
   
    })
   
    


    


module.exports = app