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
    
    const query = 'SELECT articles.article_id FROM articles WHERE articles.article_id = $1' 
    return db
    .query(query, [article_id])
    .then((res) => {
      if(res.rows.length === 1) {
        return []
      } 
      return Promise.reject({ status: 404, msg: 'Article with this ID not found'});  
  })  
    } else {
 return res.rows;  
  }
})
}

function addComment(article_id, commentToAdd) {
const { username, body } = commentToAdd
const query = 'INSERT INTO comments (author, body, article_id) VALUES ($1, $2, $3) RETURNING *'
return db
.query(query, [username, body, article_id])
.then((res) => {
  if(res.rows.length === 0) {
    return Promise.reject({ status: 404, msg: 'Article with this ID not found'});  
    } else {  
const newComment = res.rows[0]
return newComment
    }
})
}

function updateArticle(article_id, inc_votes) {
const query = 'UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *'
return db
.query(query, [inc_votes, article_id])
.then((res) => {
  if(res.rows.length === 0) {
    return Promise.reject({ status: 404, msg: 'Article with this ID not found'});  
    } else {  
const newProperty = res.rows[0]
return newProperty
    }
})
}



function removeComment(comment_id) {
  const query = 'DELETE FROM comments WHERE comment_id = $1 RETURNING *'
  return db
  .query(query, [comment_id])
  .then((res) => {
    console.log(res.rows)
    if(res.rows.length === 0) {
      return Promise.reject({ status: 404, msg: 'Comment with this ID not found'});  
      } else {  
  const commentGone = res.rows[0]
  return commentGone
      }
  })
  }




  

 





   

module.exports = { fetchTopics, fetchArticleByID, fetchDecendingArticles, fetchComments, addComment, updateArticle, removeComment }
