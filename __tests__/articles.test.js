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

    test("404 - responds with a 404 Not Found if id is not in DB", async () => {
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
              "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"
          }


        const {body}  = await request(app).get("/api/articles/1").expect(200)
        const returnedArticle = body.article

        expect(returnedArticle).toEqual(expectedArticle)
    })
})


describe("GET/api/articles", () => {
    test("200 - responds with a 200 status and an array of all 13 articles", async () => {
        const result = await request(app).get("/api/articles").expect(200)
        const articlesArray = result.body.articles

        expect(Array.isArray(articlesArray)).toBe(true)
        expect (articlesArray.length).toBe(13)
    })

    test("200 - all articles have the appropriate keys / values", async () => {
        const result = await request(app).get("/api/articles").expect(200)
        const articlesArray = result.body.articles

        articlesArray.forEach( (article) => {
            expect(article).toMatchObject(
                {
                    author: expect.any(String),
                    title: expect.any(String), 
                    article_id: expect.any(Number),
                    topic: expect.any(String),
                    created_at: expect.any(String),
                    votes: expect.any(Number),
                    article_img_url: expect.any(String),
                    comment_count: expect.any(Number),
                }
            )
        });
    })

    test("200 - all articles have the correct comment count", async () => {
        const result = await request(app).get("/api/articles").expect(200)
        const articlesArray = result.body.articles

        articlesArray.forEach( (article) => {
            const id = article.article_id
            const commentCount = article.comment_count

            switch (id) {
                case 1: 
                    expect(commentCount).toBe(11)
                    break;
                case 3: 
                    expect(commentCount).toBe(2)
                    break;
                case 5: 
                    expect(commentCount).toBe(2)
                    break;
                case 6: 
                        expect(commentCount).toBe(1)
                        break;
                case 9: 
                        expect(commentCount).toBe(2)
                           break;
                default:
                    expect(commentCount).toBe(0)
            }
        });
    })

    test("200 - the articles are sorted by the created_at value, in descending order", async () => {
        const result = await request(app).get("/api/articles").expect(200)
        const articlesArray = result.body.articles

        expect(articlesArray).toBeSortedBy("created_at", { descending: true })
    })

    test("200 - the articles do not have a body property", async () => {
        const result = await request(app).get("/api/articles").expect(200)
        const articlesArray = result.body.articles

        articlesArray.forEach( (article) => {
            expect(typeof article.body).toBe('undefined')
        })
    })
})



describe("PATCH/api/articles/:article_id", () => {
    test("400 - responds with a 400 Bad Request if id is an invalid type", async () => {
        const requestBody = {inc_votes: 10}

        const {body}  = await request(app).patch("/api/articles/BadId").send(requestBody).expect(400)

        expect(body.msg).toBe("Bad Request")
    })

    test("400 - responds with a 400 Bad Request if increment amount is an invalid type", async () => {
        const requestBody = {inc_votes: 'A string'}

        const {body}  = await request(app).patch("/api/articles/1").send(requestBody).expect(400)
        
        expect(body.msg).toBe("Bad Request")
    })

    test("200 - responds with an updated article given valid input", async () => {
        const requestBody = {inc_votes: 100}

        const {body}  = await request(app).patch("/api/articles/1").send(requestBody).expect(200)
        
        expect(body.article).toEqual(
            {
            article_id: 1,
            title: "Living in the shadow of a great man",
            topic: "mitch",
            author: "butter_bridge",
            body: "I find this existence challenging",
            created_at: "2020-07-09T20:11:00.000Z",
            votes: 200,
            article_img_url:
              "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"
            }
        )
    })

    test("200 - responds with an updated article given valid input with -ve increment", async () => {
        const requestBody = {inc_votes: -50}

        const {body}  = await request(app).patch("/api/articles/1").send(requestBody).expect(200)
        
        expect(body.article).toEqual(
            {
            article_id: 1,
            title: "Living in the shadow of a great man",
            topic: "mitch",
            author: "butter_bridge",
            body: "I find this existence challenging",
            created_at: "2020-07-09T20:11:00.000Z",
            votes: 50,
            article_img_url:
              "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"
            }
        )
    })

    
    test(`200 - responds with an updated article given valid input with -ve increment which makes votes -ve. 
                could alternatively just reduce to 0 or return a Bad Request. 
                Assumption here is: -ve votes are a -ve reputataion / dislike of the article`, async () => {
        const requestBody = {inc_votes: -150}

        const {body}  = await request(app).patch("/api/articles/1").send(requestBody).expect(200)
        
        expect(body.article).toEqual(
            {
            article_id: 1,
            title: "Living in the shadow of a great man",
            topic: "mitch",
            author: "butter_bridge",
            body: "I find this existence challenging",
            created_at: "2020-07-09T20:11:00.000Z",
            votes: -50,
            article_img_url:
              "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"
            }
        )
    })
})



describe("GET/api/articles?topic=", () => {
    test("200 - responds with a 200 status and an array articles for the given topic (multiple results)", async () => {
        const result = await request(app).get("/api/articles?topic=mitch").expect(200)
        const articlesArray = result.body.articles

        expect (articlesArray.length).toEqual(12)

        articlesArray.forEach( (article) => {
            expect(article).toMatchObject( {topic: 'mitch'} )
        })
    })

    test("200 - responds with a 200 status and an empty array if a valid topic has no articles", async () => {
        const result = await request(app).get("/api/articles?topic=paper").expect(200)
        const articlesArray = result.body.articles

        expect (articlesArray.length).toEqual(0)
    })

    test("404 - responds with a Not Found if topic doesn't exist", async () => {
        const result = await request(app).get("/api/articles?topic=FreddieStarAteMyHamster").expect(404)
        expect(result.body.msg).toBe("Not Found")
    })
})