const app = require('../app')
const request = require('supertest')

describe("GET/api/NonExistent", () => {
    test("404 - responds with a 404 status and a 'Not Found' msg for a non-existent endpoint", async () => {
      const result = await request(app).get("/api/NonExistent").expect(404)
      const body = result.body

      expect(body.msg).toBe('Not Found')
    })
})