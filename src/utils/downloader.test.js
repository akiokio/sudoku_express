const { expect } = require("chai");
const nock = require("nock");

const { downloadJson } = require("./downloader");

describe("downloadJson", () => {
  const mockJson = {
    name: "Test mock"
  };

  before(() => {
    nock("http://files.orderful.com")
      .get("/test.json")
      .reply(200, mockJson);
  });

  after(() => {
    nock.cleanAll();
  });

  it("should return the remote sample json", async () => {
    const result = await downloadJson("http://files.orderful.com/test.json");
    expect(result).to.eql(mockJson);
  });
});
