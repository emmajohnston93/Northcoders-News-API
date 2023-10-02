const db = require('../db/connection.js');
const seed = require('../db/seeds/seed.js');
const app = require('../app.js');
const data = require('../db/data/test-data/index.js');
const request = require('supertest');
const sorted = require('jest-sorted')

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
                        console.log(res.status, res.body);
                    expect(res.body.msg).toBe('Error 404 - Not Found')

                    })
                })

    
        })
        

