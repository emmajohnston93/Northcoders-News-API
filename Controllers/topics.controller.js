const { fetchTopics, fetchArticleByID, fetchDecendingArticles, fetchComments, addComment  } = require('../Models/topics.model');
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

const getComments = (req, res, next) => {
      const { article_id } = req.params;
      fetchComments(article_id)
      .then((comments) => {
      res.status(200).send({ comments });      
      })
      .catch((err) => {
      next(err); 
      })  
}

const postComment = (req, res, next) => {
      const { article_id } = req.params;
      const newComment = req.body;
      addComment(article_id, newComment).then((comment) => { 
      res.status(201).send({ comment });      
      })
      .catch((err) => {
        next(err); 
      })  

}






module.exports = { getTopics, getEndpoints, getArticleByID, getDecendingArticles, getComments, postComment }