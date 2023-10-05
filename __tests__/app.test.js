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
                 expect(res.body.articles.length).toBe(13);
                 
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

                expect(res.body.comments.length).toBe(11);

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

    })

        
            
        

          


        
    
                                 
            
        
