const db = require('../db/connection.js');
const seed = require('../db/seeds/seed.js');
const app = require('../app.js');
const data = require('../db/data/test-data/index.js');
const request = require('supertest');
const sorted = require('jest-sorted');
const endpoints = require('../endpoints.json');

beforeEach(() => {
    return seed(data);
    })
    
    afterAll(() => {
    return db.end();    
    })
    
    describe('GET /api/topics', () => {
        test('returns an array of topic object each with a slug and description property', () => {
            return request(app)
                .get('/api/topics')
                .expect(200)
                .then(({ body }) => {
                    expect(body.topics).toHaveLength(3);
                    body.topics.forEach((topic) => {
                    expect(topic).toMatchObject({
                    slug: expect.any(String),
                    description: expect.any(String),
                        })
                    
                    })
                })     
            })
        })

            describe('General errors relating to endpoint', () => {
            test('returns a 404 error if the endpoint dosent exist', () => {
                return request(app)
                    .get('/api/topicsss')
                    .expect(404)
                    .then((res) => {
                     expect(res.body.msg).toBe('Error 404 - Not Found')

                    })
                })
    
        })

        describe('GET /api', () => {
            test('returns an object describing all the available endpoints on your API', () => {
                return request(app)
                    .get('/api')
                    .expect(200)
                    .then((res) => {
                     expect(res.body).toEqual(endpoints)
                   
                  
                            })
                        
                        })
                    })   
                    
        describe('GET /api/articles/:article_id', () => {
            test('Returns article objects by ID with the following properties - author, title, article_id, body,topic, created_at, votes, article_img_url', () => {
                return request(app)
                .get('/api/articles/3')
                .expect(200)
                .then((res) => {
                    expect(res.body.article).toMatchObject({
                    author: expect.any(String),
                    title: expect.any(String),
                    article_id: 3,
                    body: expect.any(String),
                    topic: expect.any(String),
                    created_at: expect.any(String),
                    votes: expect.any(Number),
                    article_img_url: expect.any(String),    
              
              })                  
              })
            })    
            
            test('Returns an error when asked for an article id that does not exist', () => {
                return request(app)
                .get('/api/articles/100')
                .expect(404)
                .then((res) => {
                expect(res.body.msg).toBe('Article with this ID not found') 
                    })
                })

            test('Returns an error when asked for anything other than a id number', () => {
                 return request(app)
                 .get('/api/articles/lemon')
                 .expect(400)
                 .then((res) => {
                 expect(res.body.msg).toBe('Search not possible - please use an id number') 
                        })
                    })    
               
             })   
             
        describe('GET /api/articles', () => {
            test('Returns an array of article objects with the required properties, sorted in date decending order, with no body property on any of the article objects', () => {
                return request(app)
                .get('/api/articles')
                .expect(200)
                .then((res) => {
                 expect(Array.isArray(res.body.articles)).toBe(true);
                 expect(res.body.articles.length).toBe(13);
                 expect(res.body.articles.length).toBe(13);
                 res.body.articles.forEach((article) => {
                 expect(article).toEqual(expect.objectContaining({
                    author: expect.any(String),
                    title: expect.any(String),
                    article_id: expect.any(Number),
                    topic: expect.any(String),
                    created_at: expect.any(String),
                    votes: expect.any(Number),
                    article_img_url: expect.any(String),    
                    comment_count: expect.any(Number),

                 }))
               expect(article).not.toHaveProperty('body');
                })
                 
                 expect(res.body.articles).toBeSortedBy('created_at', { descending: true });
                
                 
                })
            })
        })

        describe('GET /api/articles/:article_id/comments', () => {
            test('Returns an array of comments for the requested article, comments should be returned with the most recent first. Each article should have a comment_id, votes, created_at, author, body, article_id', () => {
                return request(app)
                .get('/api/articles/1/comments')
                .expect(200)
                .then((res) => {   
                    expect(Array.isArray(res.body.comments)).toBe(true);
                    expect(res.body.comments.length).toBe(11);
                    res.body.comments.forEach((comment) => {
                    expect(comment).toEqual(expect.objectContaining({
                       comment_id: expect.any(Number), 
                       votes: expect.any(Number),
                       created_at: expect.any(String),
                       author: expect.any(String),
                       body: expect.any(String),
                       article_id: expect.any(Number),
                       
                    })
                    )
                })

                expect(res.body.comments).toBeSortedBy('created_at', { ascending: true });             

            })
      })

      test('Returns an error when asked for comments of an article id that does not exist', () => {
        return request(app)
        .get('/api/articles/75/comments')
        .expect(404)
        .then((res) => { 
         expect(res.body.msg).toBe('Article with this ID not found') 

         })
        })

        test('Returns an error when asked for comments of an article id without using a number', () => {
            return request(app)
            .get('/api/articles/orange/comments')
            .expect(400)
            .then((res) => {
             expect(res.body.msg).toBe('Search not possible - please use an id number') 
                   })
               })  
    

    test('Returns an empty array when asked for an article id that has no comments', () => {
        return request(app)
        .get('/api/articles/2/comments')
        .expect(200)
        .then((res) => {
         expect(res.body.comments).toEqual([]) 
               })
           })  
})

    describe('POST /api/articles/:article_id/comments', () => {
        test('Add a comment to an article with a username and body property', () => {
            return request(app)
                .post('/api/articles/3/comments')
                .send({username: 'butter_bridge', body: 'this is a new comment'}) 
                .expect(201)
                .then((res) => { 
                 expect(res.body.comment).toEqual({article_id: 3, author: 'butter_bridge', body: 'this is a new comment', comment_id: expect.any(Number), created_at: expect.any(String), votes: 0 }) 
                })

            })

            test('Returns an error when trying to post to an article id that does not exist', () => {
                return request(app)
                    .post('/api/articles/50/comments')
                    .send({username: 'icellusedkars', body: 'this is another new comment'}) 
                    .expect(404)
                    .then((res) => { 
                    expect(res.body.msg).toBe('Article with this ID not found') 
                    })
    
                })

               test('Returns an error when trying to post to an article id that is not a number', () => {
                return request(app)
                 .post('/api/articles/banana/comments')
                 .send({username: 'icellusedkars', body: 'this is another new comment'}) 
                 .expect(400)
                 .then((res) => { 
                  expect(res.body.msg).toBe('Search not possible - please use an id number') 
                        })
        
                    })

                 
               test('Returns an error when trying to post a comment without the required properties', () => {
                return request(app)
                 .post('/api/articles/3/comments')
                 .send({}) 
                 .expect(400)
                 .then((res) => { 
                  expect(res.body.msg).toBe('Must include the required properties for this request') 
                        })
        
                    })   

   
                test('Add a comment to an article with a username, body and topic property, topic should be ignored', () => {
                return request(app)
                .post('/api/articles/3/comments')
                 .send({username: 'rogersop', body: 'this is another new comment', topic: 'this property needs to be ignored'}) 
                 .expect(201)
                 .then((res) => { 
                expect(res.body.comment).toEqual({article_id: 3, author: 'rogersop', body: 'this is another new comment', comment_id: expect.any(Number), created_at: expect.any(String), votes: 0 }) 
                 })
                
                })      
        })

       
        describe('PATCH /api/articles/:article_id', () => {
            test('Update an article votes by its id, inc_votes will inc or dec the current votes depending on what is requested', () => {
                const articleUpdate = { inc_votes: 1 }
                return request(app)
                    .patch('/api/articles/1')
                    .send(articleUpdate) 
                    .expect(200)
                    .then((res) => { 
                     expect(res.body.article.votes).toEqual(101) 
                    })
    
                })

            test('Returns an error when updating article votes by an article id that does not exist, using inc_votes', () => {
                const articleUpdate = { inc_votes: 1 }
                return request(app)
                     .patch('/api/articles/100')
                     .send(articleUpdate) 
                     .expect(404)
                     .then((res) => { 
                        expect(res.body.msg).toBe('Article with this ID not found') 
                      })
        
                    })  
                    
          test('Returns an error when updating article votes by an article id, when inc_votes is not given a value', () => {
                const articleUpdate = { inc_votes: undefined }
                 return request(app)
                     .patch('/api/articles/1')
                     .send(articleUpdate) 
                     .expect(400)
                     .then((res) => { 
                      expect(res.body.msg).toBe('Must include the required properties for this request') 
                      })
                
                  })         

             test('Returns an error when updating article votes by an article id, when inc_votes is a sring', () => {
                const articleUpdate = { inc_votes: 'one' }
                  return request(app)
                 .patch('/api/articles/1')
                 .send(articleUpdate) 
                 .expect(400)
                 .then((res) => { 
                  expect(res.body.msg).toBe('Search not possible - please use an id number') 
                        })
                    
                   })              

            })


                    
         describe('DELETE /api/comments/:comment_id', () => {
         test('Returns nothing/undefined when a comment has been deleted by its id', () => {
             return request(app)
             .delete('/api/comments/3')
             .expect(204)
                  
        
              })

            test('Returns a 404 error when trying to delete a comment by an id that dosent exist', () => {
             return request(app)
             .delete('/api/comments/600')
             .expect(404)
             .then((res) => { 
             expect(res.body.msg).toBe('Comment with this ID not found') 
                  })
        
              })

              test('Returns a 400 error when trying to delete a comment by an id that is not a number', () => {
                return request(app)
                .delete('/api/comments/four')
                .expect(400)
                .then((res) => { 
                expect(res.body.msg).toBe('Search not possible - please use an id number') 
                     })
           
                 })
            })       
           
        


        
            
        

          


        
    
                                 
            
        













































        