const express = require('express');
const { getTopics, getEndpoints, getArticleByID, getDecendingArticles, getComments, postComment, patchArticle } = require('./Controllers/topics.controller');
require('dotenv').config();
const endpoints = require('./endpoints.json')

const app = express();

app.use(express.json())

app.get('/api/topics', getTopics)

app.get('/api', getEndpoints) 

app.get('/api/articles/:article_id', getArticleByID)

app.get('/api/articles', getDecendingArticles) 
/* This endpoint will respond with an array of article objects, sorted in descending order by the created_at date. Each article in the array will have the following properties: author, title, article_id, topic, created_at, votes, article_img_url, comment_count */

app.get('/api/articles/:article_id/comments', getComments)
/* This endpoint will respond with an array of all the comments for the requested article, sorted by created_at with the most recent first. Each comment in the array will have the following properties: comments_id, votes, created_at, auhor, body, article_id */

app.post('/api/articles/:article_id/comments', postComment)
/* This endpoint will add a comment to the requested article and will include a username and body property */


app.patch('/api/articles/:article_id', patchArticle) 

app.use((err, req, res, next) => {
if(err.code === '22P02') {
  res.status(400).send({msg: 'Search not possible - please use an id number' })   
} else if(err.code === '23503') {
  res.status(404).send({msg: 'Article with this ID not found'}) 
} else if(err.code === '23502') {
  res.status(400).send({msg: 'Must include the required properties for this request'})
} else {
next(err)
}
})


app.use((err, req, res, next) => {
    res.status(err.status).send({msg: err.msg});
  })

app.all('/*', (req, res, next) => {
 res.status(404).send({msg: 'Error 404 - Not Found'}) 
 })
    
module.exports = app