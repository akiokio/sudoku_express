var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    it("should return the remote sample json", () => __awaiter(this, void 0, void 0, function* () {
        const result = yield downloadJson("http://files.orderful.com/test.json");
        expect(result).to.eql(mockJson);
    }));
});
//# sourceMappingURL=downloader.test.js.map