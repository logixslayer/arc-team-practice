# ARC Team Practice

ARC Team Practice is a simple full-stack monorepo foundation for parallel frontend and backend development.

## Architecture

- `apps/web` contains the React frontend.
- `apps/api` contains the Express REST API and Prisma database configuration.
- `docs` contains shared API contracts for frontend and backend development.

The frontend and backend are independent applications that communicate over REST APIs. The SQLite database is managed by Prisma in the API workspace.

## Technology stack

- React, TypeScript, and Vite
- Tailwind CSS
- Node.js, Express, and TypeScript
- SQLite with Prisma
- REST APIs

## Folder structure

```text
arc-team-practice/
├── apps/
│   ├── api/
│   │   ├── prisma/
│   │   │   └── schema.prisma
│   │   ├── src/
│   │   │   └── server.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── web/
│       ├── src/
│       │   ├── App.tsx
│       │   ├── index.css
│       │   └── main.tsx
│       ├── index.html
│       ├── package.json
│       ├── tailwind.config.js
│       ├── tsconfig.json
│       └── vite.config.ts
├── docs/
│   └── api-contracts.md
├── .gitignore
├── package.json
└── README.md
```

## Installation

From the repository root:

```bash
npm install
npm run prisma:generate
```

No database model or database operations are included yet. The Prisma schema is ready for the backend feature branch to add them.

## Run the frontend

```bash
npm run dev:web
```

The Vite development server runs at `http://localhost:5173`.

## Run the backend

```bash
npm run dev:api
```

The Express development server runs at `http://localhost:3000`.

## Run both applications

```bash
npm run dev
```
