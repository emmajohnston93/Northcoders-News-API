const { fetchTopics, fetchEndpoints } = require('../Models/topics.model');
const endpoints = require('../endpoints.json');

const getTopics = (req, res, next) => {
    fetchTopics().then((topics) => {
    res.status(200).send({topics})    
    })
    .catch(next);
}

const getEndpoints = (req, res, next) => {
     res.status(200).json(endpoints)   
     .catch(next)
} 




module.exports = { getTopics, getEndpoints }