const express = require('express');
const { getTopics, getEndpoints, getArticleByID, getDecendingArticles, getComments } = require('./Controllers/topics.controller');
require('dotenv').config();
const endpoints = require('./endpoints.json')

const app = express();

app.get('/api/topics', getTopics)

app.get('/api', getEndpoints) 

app.get('/api/articles/:article_id', getArticleByID)

app.get('/api/articles', getDecendingArticles) 
/* This endpoint will respond with an array of article objects, sorted in descending order by the created_at date. Each article in the array will have the following properties: author, title, article_id, topic, created_at, votes, article_img_url, comment_count */

app.get('/api/articles/:article_id/comments', getComments)

app.use((err, req, res, next) => {
if(err.code === '22P02') {
  res.status(400).send({msg: 'Search not possible - please use an id number' }) 
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