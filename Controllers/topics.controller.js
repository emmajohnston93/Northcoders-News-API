const { fetchTopics, fetchArticleByID, fetchDecendingArticles  } = require('../Models/topics.model');
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

const getArticleByID = (req, res, next) => {
      const { article_id } = req.params;
      fetchArticleByID(article_id)
      .then((article) => {
      res.status(200).send({ article }); 
      })
      .catch((err) => {
       next(err); 
      })
}

const getDecendingArticles = (req, res, next) => {
      fetchDecendingArticles()
      .then((articles) => {
       res.status(200).send({ articles }); 
      })
    
}




module.exports = { getTopics, getEndpoints, getArticleByID, getDecendingArticles }