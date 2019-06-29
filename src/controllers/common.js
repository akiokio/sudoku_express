const { downloadJson } = require("../utils/downloader");
const { readJson } = require("../utils/fileReader");

const home = (req, res) => {
  res.send("Hello common route");
};

const one = (req, res) => {
  res.send("Hello common one");
};

const post = (req, res) => {
  res.send("Got a POST request");
};

const downloader = async (req, res) => {
  if (!req.query.url) {
    res.status(400).send("url param is required");
  }

  try {
    const fileContent = await downloadJson(req.query.url);
    res.json(fileContent);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const reader = async (req, res) => {
  if (!req.query.path) {
    res.status(400).send("path param is required");
  }

  try {
    const fileContent = await readJson(req.query.path);
    res.json(fileContent);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

module.exports = {
  home,
  one,
  post,
  downloader,
  reader
};
