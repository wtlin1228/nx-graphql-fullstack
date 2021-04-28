# GraphQL fullstack project with Nx, NestJS and Next.js

We want to compare React Query and Apollo Client. So this project create one GraphQL server and two frontend applications with React Query and Apollo Client.

## Frontend (Apollo Client)

### Start server

- `$ nx serve frontend-apollo-client`
- open `http://localhost:4200/`

## Frontend (React Query)

### Start server

- `$ nx serve frontend-react-query`
- open `http://localhost:4200/`

## GraphQL Server

### Start server

- `$ nx serve graphql-server`
- open `http://localhost:3333/graphql`

### Generate types by schema

- `$ npm run graphql:type-generator`
- open `libs/util-graphql-interface/src/lib/graphql.schema.ts`

### Initialize a module

- `$ cd apps/graphql-server/src/app/modules`
- `$ nest g resource <module_name>`
