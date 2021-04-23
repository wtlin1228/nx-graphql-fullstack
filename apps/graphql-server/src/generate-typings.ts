import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
  typePaths: ['./apps/graphql-server/src/app/modules/**/*.graphql'],
  path: join(
    process.cwd(),
    './libs/util-graphql-interface/src/lib/graphql.schema.ts'
  ),
  outputAs: 'class',
});
