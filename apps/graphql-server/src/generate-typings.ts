import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
  typePaths: ['./apps/graphql-server/src/app/modules/**/*.graphql'],
  path: join(process.cwd(), './apps/graphql-server/src/graphql.schema.ts'),
  outputAs: 'class',
});
