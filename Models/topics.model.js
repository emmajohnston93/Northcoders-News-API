const db = require('../db/connection.js');

function fetchTopics() {
    const query = 'SELECT * FROM topics;';
    return db
    .query(query)
    .then((res) => {
        return res.rows;
    })
    .catch((error) => {
        throw error;
    })
}

module.exports = { fetchTopics }
