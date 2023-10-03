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
            
        

          


        
    
                                 
            
        
