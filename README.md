# GraphQL server with NestJS

## Start server

- `$ nx serve graphql-server`
- open `http://localhost:3333/graphql`

## Generate types by schema

- `$ npm run graphql:type-generator`
- open `apps/graphql-server/src/graphql.schema.ts`

## Initialize a module

- `$ cd apps/graphql-server/src/app/modules`
- `$ nest g resource <module_name>`
