"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const downloadJson = (url) => {
    return new Promise((resolve, reject) => {
        http_1.default.get(url, res => {
            const { statusCode } = res;
            const contentType = res.headers["content-type"];
            let error;
            if (statusCode !== 200) {
                error = new Error("Request Failed.\n" + `Status Code: ${statusCode}`);
            }
            else if (!/^application\/json/.test(contentType)) {
                error = new Error("Invalid content-type.\n" +
                    `Expected application/json but received ${contentType}`);
            }
            if (error) {
                console.error(error.message);
                // Consume response data to free up memory
                res.resume();
                reject(error);
            }
            res.setEncoding("utf-8");
            let rawData = "";
            res.on("data", (chunk) => {
                rawData += chunk;
            });
            res.on("end", () => {
                try {
                    const parsedData = JSON.parse(rawData);
                    resolve(parsedData);
                }
                catch (error) {
                    console.error(error.message);
                    reject(error);
                }
            });
        });
    });
};
exports.downloadJson = downloadJson;
//# sourceMappingURL=downloader.js.map