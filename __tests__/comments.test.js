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


describe("GET/api/articles/:article_id/comments", () => {
    test("400 - responds with a 400 Bad Request if id is an invalid type", async () => {
        const {body}  = await request(app).get("/api/articles/BadID/comments").expect(400)
        expect(body.msg).toBe("Bad Request")
    })

    test("404 - responds with a 400 Not Found if id is not in DB", async () => {
        const {body}  = await request(app).get("/api/articles/7897688/comments").expect(404)
        expect(body.msg).toBe("Not Found")
    })

    test("200 - responds with 200 and empty array if article_id exists but has no comments", async () => {
        const expectedComments = []

        const {body}  = await request(app).get("/api/articles/2/comments").expect(200)
        expect(body.comments).toEqual(expectedComments)
    })

    test("200 - responds with 200 and array of comments for existing article_id", async () => {
        const {body}  = await request(app).get("/api/articles/5/comments").expect(200)
        const commentsArray = body.comments

        expect (commentsArray).toBeSortedBy("created_at", { descending: true })
        expect(commentsArray.length).toBe(2)

        commentsArray.forEach( (comment) => {
            expect(comment).toMatchObject( 
                {
                    comment_id: expect.any(Number),
                    votes: expect.any(Number),
                    created_at: expect.any(String),
                    author: expect.any(String),
                    body: expect.any(String),
                    article_id: 5,
                }
            )
        })
    })
})