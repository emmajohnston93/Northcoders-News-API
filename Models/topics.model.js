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



   

module.exports = { fetchTopics, fetchArticleByID }
