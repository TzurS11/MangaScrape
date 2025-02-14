document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");
  const html = document.documentElement;
  const highlightLight = document.getElementById("highlight-light");
  const highlightDark = document.getElementById("highlight-dark");

  // Function to update syntax highlighting theme
  const updateSyntaxTheme = (theme) => {
    if (theme === "light") {
      highlightLight.disabled = false;
      highlightDark.disabled = true;
    } else {
      highlightLight.disabled = true;
      highlightDark.disabled = false;
    }
    hljs.highlightAll();
  };

  // Apply the last selected theme
  const currentTheme = localStorage.getItem("theme") || "dark";
  html.setAttribute("data-theme", currentTheme);
  themeToggle.checked = currentTheme === "light";
  themeToggle.nextElementSibling.textContent =
    currentTheme === "light" ? "☀️" : "🌙";
  updateSyntaxTheme(currentTheme);

  themeToggle.addEventListener("change", () => {
    const theme = themeToggle.checked ? "light" : "dark";
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    themeToggle.nextElementSibling.textContent = themeToggle.checked
      ? "☀️"
      : "🌙";
    updateSyntaxTheme(theme);
  });

  // Initial highlighting
  hljs.highlightAll();

  // Code tabs
  const tabs = document.querySelectorAll(".tab");
  let codeBlock = document.getElementById("usage-code");

  const langName = {
    js: "javascript",
    ts: "typescript",
  };

  const codeContent = {
    js: `const { Batoto } = require("mangascrape");

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
getFirstChapter().then(console.log).catch(console.error);`,
    ts: `import { Batoto } from "mangascrape";

const batoto = new Batoto();

async function getFirstChapter(): Promise<string[]> {
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
getFirstChapter().then(console.log).catch(console.error);`,
  };

  const updateCodeBlock = (lang) => {
    const tempElement = document.createElement("code");
    tempElement.className = `hljs language-${langName[lang]}`;
    tempElement.textContent = codeContent[lang];

    // Replace the old code block with the new one
    codeBlock.parentNode.replaceChild(tempElement, codeBlock);

    // Update our reference to the new element
    codeBlock = tempElement;

    // Highlight the new element
    hljs.highlightAll();
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      const lang = tab.getAttribute("data-lang");
      updateCodeBlock(lang);
    });
  });

  // Initial highlighting
  updateCodeBlock("js");
});
