
Default to using bun instead of other package managers.

- Use `bun <file>` to run Node.js files
- Use `bun test` instead of `npm test`
- Use `bun install` instead of `npm install` or `yarn install` or `pnpm install`
- Use `bun run <script>` instead of `npm run <script>` or `yarn run <script>` or `pnpm run <script>`
- Use `bunx <package> <command>` instead of `npx <package> <command>`
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

Use `bun test` to run tests with Jest or Vitest.

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
bun add -d vite @vitejs/plugin-react
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
bun run dev
```

For more information, read the Bun API docs in `node_modules/bun-types/docs/**.mdx`.
