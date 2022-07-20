const request = require("supertest");

const app = require("../api.js");

describe("API server", () => {
  let api;

  beforeAll(() => {
    // this must be the port that you are running the front end on
    api = app.listen(5500, () =>
      console.log(`Test server running on port 5500`)
    );
  });

  afterAll((done) => {
    // close the server, then run done
    console.log("Stopping test server");
    api.close(done);
  });

  // Get routes
  // it("responds to get /habits with status 200", (done) => {
  //   request(api).get("/habits").expect(200, done);
  // });

  // it("responds to get /users with status 200", (done) => {
  //   request(api).get("/users").expect(200, done);
  // });

  // it("retrieves all users", (done) => {
  //   request(api)
  //     .get("/users")
  //     .expect(200)
  //     .expect({
  //       "id": 1,
  //       "username": "username",
  //       "passwordDigest": "$2a$10$9LR1x94XKwxDVoWRw6CZA.VWXMPD7I9wpI.zKcJMTCdgNwduIFSEO"
  //       },
  //       {
  //       "id": 2,
  //       "username": "username1",
  //       "passwordDigest": "$2a$10$9LR1x94XKwxDVoWRw6CZA.VWXMPD7I9wpI.zKcJMTCdgNwduIFSEO"
  //       },
  //       {
  //       "id": 3,
  //       "username": "ll",
  //       "passwordDigest": "$2a$10$991M2Dr2jpLpfKDBOJrLTuGKrTX4bGtTohTKEi/xlduabxudATD2G"
  //       },done
  //     );
  // });

  // it("responds to get /posts/1/comments with status 200", (done) => {
  //   request(api).get("/posts/1/comments").expect(200, done);
  // });

  // it("responds to get /posts/17af4l4zs5vim/comments/2hj8fx39csl5104ruk with status 200", (done) => {
  //   request(api).get("/posts/1/comments/1e111e47l50yg8bd").expect(200, done);
  // });

  it("responds to a unknown request with a 404", (done) => {
    request(api).get("/habits/42").expect(404).expect({}, done);
  });

  it("responds to non existing paths with 404", (done) => {
    request(api).get("/no").expect(404, done);
  });

  it("responds to invalid method request with 405", (done) => {
    request(api).post("/").expect(405, done);
  });
});
