import { downloadJson } from "../utils/downloader";
import { readJson } from "../utils/fileReader";

export const home = (req, res) => {
  res.send("Hello common route");
};

export const one = (req, res) => {
  res.send("Hello common one");
};

export const post = (req, res) => {
  res.send("Got a POST request");
};

export const downloader = async (req, res) => {
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

export const reader = async (req, res) => {
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
