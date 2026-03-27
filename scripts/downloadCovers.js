import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import data from "../src/data/rockCalendarData.js";

const folder = "./public/covers";
if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });

const slug = (str) =>
  str.toLowerCase().replace(/[^a-z0-9]+/g, "-");

const download = async () => {
  for (const entry of data) {
    const name = `${slug(entry.artist)}-${slug(entry.title)}.jpg`;
    const filePath = path.join(folder, name);

    const query = `${entry.artist} ${entry.title} album cover`;
    const url = `https://source.unsplash.com/600x600/?${encodeURIComponent(query)}`;

    try {
      const res = await fetch(url);
      const buffer = await res.buffer();
      fs.writeFileSync(filePath, buffer);

      entry.cover = `/covers/${name}`;
      console.log("saved:", name);
    } catch {
      console.log("fail:", entry.artist);
    }
  }

  fs.writeFileSync(
    "./src/data/rockCalendarData.js",
    "export default " + JSON.stringify(data, null, 2)
  );
};

download();