import request from "supertest";
import nock from "nock";

describe("common api routes", () => {
  const server = require("../index").default;
  const mockJson = {
    name: "Test common json mock"
  };

  before(() => {
    nock("http://files.orderful.com")
      .get("/test.json")
      .reply(200, mockJson);
  });

  after(() => {
    nock.cleanAll();
  });

  it("responds to /common", done => {
    request(server)
      .get("/common")
      .expect(200)
      .expect("Hello common route", done);
  });

  it("downloads a file", done => {
    request(server)
      .get("/common/downloader?url=http://files.orderful.com/test.json")
      .expect(200)
      .expect("Content-Type", /json/)
      .expect(mockJson, done);
  });
});
