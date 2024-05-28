const app = require('../app')
const request = require('supertest')
const endpointsJSON = require('../endpoints.json')

describe("GET/api/NonExistent", () => {
  test("404 - responds with a 404 status and a 'Not Found' msg for a non-existent endpoint", async () => {
    const result = await request(app).get("/api/NonExistent").expect(404)
    const body = result.body

    expect(body.msg).toBe('Not Found')
  })
})


describe("GET/api/", () => {
  test("200 - responds with an object describing the available endpoionts", async () => {
    const result = await request(app).get("/api").expect(200)
    const endpointsObj = result.body

    expect(endpointsObj).toEqual(endpointsJSON)
  })
})