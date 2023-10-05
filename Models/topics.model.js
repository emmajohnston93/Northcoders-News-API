const db = require('../db/connection.js');

function fetchTopics() {
    const query = 'SELECT * FROM topics;';
    return db
    .query(query)
    .then((res) => {
     return res.rows;
    })
}

function fetchArticleByID(article_id) {
  const query = 'SELECT * FROM articles WHERE article_id = $1;';
  return db
  .query(query, [article_id])
  .then((res) => {
  if(res.rows.length === 0) {
  return Promise.reject({ status: 404, msg: 'Article with this ID not found'});  
  } else {
   return res.rows[0];
  }
  })
}

function fetchDecendingArticles() {
const query = 'SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, CAST(COUNT(comment_id) AS INT) AS comment_count FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id GROUP BY articles.article_id ORDER BY articles.created_at DESC;';
return db 
.query(query)
.then((res) => {
return res.rows;  
})
}

function fetchComments(article_id) {
const query = 'SELECT comments.comment_id, comments.votes, comments.created_at, comments.author, comments.body, comments.article_id FROM comments WHERE comments.article_id = $1 ORDER BY comments.created_at ASC;';
return db
.query(query, [article_id])
.then((res) => {
  if(res.rows.length === 0) {
    return Promise.reject({ status: 404, msg: 'Article with this ID not found'});  
    } else {
 return res.rows;  
    }
  
})
}
 



   

module.exports = { fetchTopics, fetchArticleByID, fetchDecendingArticles, fetchComments }
