import fs from "fs";

export const readJson = path => {
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(path);
    let rawData = "";
    readStream.on("data", chunk => (rawData += chunk));
    readStream.on("end", () => {
      try {
        const parsedData = JSON.parse(rawData);
        resolve(parsedData);
      } catch (error) {
        console.error(error.message);
        reject(error);
      }
    });
    readStream.on("error", error => {
      reject(error);
    });
  });
};
