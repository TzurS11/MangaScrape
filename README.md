<h1 align="center" id="title">MangaScrape</h1>

<p id="description">MangaScrape is a tool designed to scrape various manga sources providing easy access to manga data and chapters.</p>

<p align="center"><img src="https://img.shields.io/github/license/TzurS11/mangascrape" alt="shields"> <img src="https://img.shields.io/github/last-commit/tzurs11/mangascrape" alt="shields"> <img src="https://img.shields.io/github/package-json/v/tzurs11/mangascrape" alt="shields"> <img src="https://img.shields.io/npm/dw/mangascrape" alt="shields"> <img src="https://img.shields.io/github/stars/tzurs11/mangascrape?style=flat" alt="shields"></p>

<h2>🛠️ Installation Steps:</h2>

```sh
npm i mangascrape
```

<h2>🧐 Features</h2>

Here're some of the project's best features:

- Scrape mangas easily
- Fully typed
- Multiple sources

<h2>🌐 Sources</h2>
[x] Bato.to
<br>
[x] MangaBuddy
<br>
[ ] Mangakakalot
<br>
[ ] Mangadex

<h2>⌨️ Usage</h2>

<h1 align="center" id="title">MangaScrape</h1>

<p id="description">MangaScrape is a tool designed to scrape various manga sources providing easy access to manga data and chapters.</p>

<p align="center"><img src="https://img.shields.io/github/license/TzurS11/mangascrape" alt="shields"> <img src="https://img.shields.io/github/last-commit/tzurs11/mangascrape" alt="shields"> <img src="https://img.shields.io/github/package-json/v/tzurs11/mangascrape" alt="shields"> <img src="https://img.shields.io/npm/dw/mangascrape" alt="shields"> <img src="https://img.shields.io/github/stars/tzurs11/mangascrape?style=flat" alt="shields"></p>

<h2>🛠️ Installation Steps:</h2>

```sh
npm i mangascrape
```

<h2>🧐 Features</h2>

Here're some of the project's best features:

- Scrape mangas easily
- Fully typed
- Multiple sources

<h2>🌐 Sources</h2>
[x] Bato.to
<br>
[x] MangaBuddy
<br>
[ ] Mangakakalot
<br>
[ ] Mangadex

<h2>⌨️ Usage</h2>

```js
const { Batoto, MangaBuddy, Mangakakalot } = require("mangascrape"); // javascript
import { Batoto, MangaBuddy, Mangakakalot } from "mangascrape"; // typescript

const batoto = new Batoto();

async function getFirstChapter() {
  const manga = await batoto.search({
    query: "Demon Slayer",
    genres: { include: { ContentTag: ["Shounen"] } },
  });
  if (manga.results.length < 1) return [];

  const detailed = await batoto.id(manga.results[0].id);
  if (detailed == undefined) return [];
  const chapter = await batoto.chapter(detailed.id, detailed.chapters[0].id);
  return chapter;
}
getFirstChapter().then(console.log).catch(console.error);
```

<h2>🍰 Contribution Guidelines:</h2>

Contributing is easy. Just clone the repository and commit changes.

<h2>🛡️ License:</h2>

This project is licensed under the MIT

<h2>🍰 Contribution Guidelines:</h2>

Contributing is easy. Just clone the repository and commit changes.

<h2>🛡️ License:</h2>

This project is licensed under the MIT
