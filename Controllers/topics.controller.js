const { fetchTopics, fetchArticleByID, fetchDecendingArticles, fetchComments, addComment, updateArticle, removeComment  } = require('../Models/topics.model');
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

const patchArticle = (req, res, next) => {
      const { article_id } = req.params;
      const { inc_votes } = req.body;
      updateArticle(article_id, inc_votes).then((article) => { 
      res.status(200).send({ article });      
      })
      .catch((err) => {
      next(err);      
      })

}

const deleteComment = (req, res, next) => {
      const { comment_id } = req.params
      removeComment(comment_id)
      .then((comment) => {
       res.status(204).send({ comment }); 
      })
      .catch((err) => {
       next(err);      
        })
}






module.exports = { getTopics, getEndpoints, getArticleByID, getDecendingArticles, getComments, postComment, patchArticle, deleteComment }