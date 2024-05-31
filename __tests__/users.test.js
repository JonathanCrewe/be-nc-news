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


describe("GET/api/users", () => {
    test("200 - responds with a 200 status and an array of 4 users", async () => {
      const result = await request(app).get("/api/users").expect(200)
      const usersArray = result.body.users
  
      expect(Array.isArray(usersArray)).toBe(true)
      expect (usersArray.length).toBe(4)
    })

    test("200 - responds with the correct test data", async () => {
        const expectedUsers = 
            [
                {
                    username: 'butter_bridge',
                    name: 'jonny',
                    avatar_url:
                      'https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg'
                  },
                  {
                    username: 'icellusedkars',
                    name: 'sam',
                    avatar_url: 'https://avatars2.githubusercontent.com/u/24604688?s=460&v=4'
                  },
                  {
                    username: 'rogersop',
                    name: 'paul',
                    avatar_url: 'https://avatars2.githubusercontent.com/u/24394918?s=400&v=4'
                  },
                  {
                    username: 'lurker',
                    name: 'do_nothing',
                    avatar_url:
                      'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png'
                  }
            ]


        const result = await request(app).get("/api/users").expect(200)
        const usersArray = result.body.users
    
        expect (usersArray).toEqual(expectedUsers)
      })
})


describe("GET/api/users/:username", () => {
  test("200 - responds with a 200 status correct user for valid username", async () => {
    const expectedUser = {
      username: 'butter_bridge',
      name: 'jonny',
      avatar_url:
        'https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg'
    }

    const result = await request(app).get("/api/users/butter_bridge").expect(200)
    const user = result.body.user

    expect (user).toEqual(expectedUser)
  })

  test("404 - responds with a 404 Not Found if comment_id is not in DB", async () => {
    const {body}  = await request(app).get("/api/users/BadDrunkenUsername").expect(404)
    expect(body.msg).toBe("Not Found")
})
})