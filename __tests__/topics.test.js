const app = require('../app')
const data = require('../db/data/test-data/index')
const db = require('../db/connection')
const request = require('supertest')
const seed = require('../db/seeds/seed')

require("pg").defaults.parseInt8 = true;

beforeEach( () => {
    return seed(data)
})

afterAll( () => {
    return db.end()
})


describe("GET/api/topics", () => {
    test("200 - responds with a 200 status and an array of 3 topics", async () => {
      const result = await request(app).get("/api/topics").expect(200)
      const topicsArray = result.body.topics
  
      expect(Array.isArray(topicsArray)).toBe(true)
      expect (topicsArray.length).toBe(3)
    })

    test("200 - responds with the correct test data", async () => {
        const expectedTopics = 
            [
                {
                description: 'The man, the Mitch, the legend',
                slug: 'mitch'
                },
                {
                description: 'Not dogs',
                slug: 'cats'
                },
                {
                description: 'what books are made of',
                slug: 'paper'
                }
            ]


        const result = await request(app).get("/api/topics").expect(200)
        const topicsArray = result.body.topics
    
        expect (topicsArray).toEqual(expectedTopics)
      })
})