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


describe("GET/api/articles/:article_id", () => {
    test("400 - responds with a 400 Bad Request if id is an invalid type", async () => {
        const {body}  = await request(app).get("/api/articles/BadID").expect(400)
        expect(body.msg).toBe("Bad Request")
    })

    test("404 - responds with a 400 Bad Request if id is not in DB", async () => {
        const {body}  = await request(app).get("/api/articles/999576").expect(404)
        expect(body.msg).toBe("Not Found")
    })

    test("200 - responds with a 200 and the correct article for valid id", async () => {
        const expectedArticle = {
            article_id: 1,
            title: "Living in the shadow of a great man",
            topic: "mitch",
            author: "butter_bridge",
            body: "I find this existence challenging",
            created_at: "2020-07-09T20:11:00.000Z",
            votes: 100,
            article_img_url:
              "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
          }


        const {body}  = await request(app).get("/api/articles/1").expect(200)
        const returnedArticle = body.article

        expect(returnedArticle).toEqual(expectedArticle)
    })
})