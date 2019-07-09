const fs = require("fs");

const readJson = (path: string) => {
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(path);
    let rawData: string = "";
    readStream.on("data", (chunk: string) => (rawData += chunk));
    readStream.on("end", () => {
      try {
        const parsedData = JSON.parse(rawData);
        resolve(parsedData);
      } catch (error) {
        console.error(error.message);
        reject(error);
      }
    });
    readStream.on("error", (error: Error) => {
      reject(error);
    });
  });
};

module.exports = {
  readJson
};
