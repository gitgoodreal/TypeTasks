# Little Wins

A small task list built with plain HTML, CSS, and TypeScript. The browser loads
the compiled `app.js` and `model.js` modules.

## Run locally

Compile the TypeScript with `npx tsc`, then serve this folder over HTTP so the
browser can load the JavaScript modules. For example, run
`python3 -m http.server` and open `http://localhost:8000`.

## Publish with GitHub Pages

In the repository settings, set **Pages → Build and deployment → Source** to
**GitHub Actions**. The workflow deploys the site on each push to `main`.

- Repository: <https://github.com/gitgoodreal/TypeTasks>
- Live app: <https://gitgoodreal.github.io/TypeTasks/>
