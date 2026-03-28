import fs from "fs";
import rockCalendarData from "../src/data/rockCalendarData.js";

const files = new Set(fs.readdirSync("./public/covers"));

let missing = 0;

for (const entry of rockCalendarData) {
  const file = entry.cover?.replace("/covers/", "");
  if (!file || !files.has(file)) {
    missing++;
    console.log("MISSING:", entry.month, entry.day, entry.artist, "-", entry.title, "=>", entry.cover);
  }
}

console.log("TOTAL MISSING:", missing);