import fs from "fs";
import path from "path";

const coversDir = path.resolve("public/covers");
const dataFile = path.resolve("src/data/rockCalendarData.js");

// load covers
const files = fs.readdirSync(coversDir);

// load data
let content = fs.readFileSync(dataFile, "utf-8");

// helper: normalize
const normalize = (str) =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

// find best match
const findMatch = (artist, title) => {
  const key = normalize(artist + "-" + title);

  return files.find((f) => {
    const fNorm = normalize(f);
    return fNorm.includes(normalize(artist)) || fNorm.includes(key);
  });
};

// replace covers
content = content.replace(
  /"artist":\s*"([^"]+)"[\s\S]*?"title":\s*"([^"]+)"[\s\S]*?"cover":\s*"([^"]*)"/g,
  (match, artist, title) => {
    const file = findMatch(artist, title);

    if (file) {
      console.log("✔", artist, "→", file);
      return match.replace(/"cover":\s*"([^"]*)"/, `"cover": "/covers/${file}"`);
    } else {
      console.log("✘ MISSING:", artist, "-", title);
      return match;
    }
  }
);

// write back
fs.writeFileSync(dataFile, content);

console.log("DONE");