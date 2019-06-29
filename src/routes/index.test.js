import request from "supertest";

describe("loading express", () => {
  const server = require("../index").default;

  it("responds to /", done => {
    request(server)
      .get("/")
      .expect(200)
      .expect("Hello world", done);
  });

  it("404", done => {
    const server = require("../index").default;
    request(server)
      .get("/foo/bar")
      .expect(404, done);
  });
});
