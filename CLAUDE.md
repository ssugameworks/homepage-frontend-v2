
Default to using npm instead of other package managers.

- Use `node <file>` to run Node.js files
- Use `npm test` instead of `bun test`
- Use `npm install` instead of `bun install` or `yarn install` or `pnpm install`
- Use `npm run <script>` instead of `bun run <script>` or `yarn run <script>` or `pnpm run <script>`
- Use `npx <package> <command>` instead of `bunx <package> <command>`
- Use `dotenv` package for .env file handling

## APIs

- Use `express` for server setup with WebSockets and routes.
- Use `better-sqlite3` for SQLite.
- Use `ioredis` for Redis.
- Use `pg` or `postgres.js` for Postgres.
- Use `ws` package for WebSocket support.
- Use `node:fs` for file operations (readFile/writeFile).
- Use `child_process` for shell command execution.

## Testing

Use `npm test` to run tests with Jest or Vitest.

```ts#index.test.ts
import { describe, it, expect } from "vitest";

describe("hello world", () => {
  it("should pass", () => {
    expect(1).toBe(1);
  });
});
```

## Frontend

Use `vite` as the bundler and dev server for React. It provides fast HMR (Hot Module Replacement) and optimized builds.

Installation:

```sh
npm install -D vite @vitejs/plugin-react
```

Vite config:

```ts#vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
});
```

HTML entry point:

```html#index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Homepage</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

React entry point:

```tsx#src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/globals.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

Then run:

```sh
npm run dev
```

For more information, read the Bun API docs in `node_modules/bun-types/docs/**.mdx`.
