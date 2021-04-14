const low = require('lowdb'); // eslint-disable-line
const FileSync = require('lowdb/adapters/FileSync'); // eslint-disable-line

import createModel from './models';

const adapter = new FileSync('apps/graphql-server/src/app/db/db.json');
const db = low(adapter);

db.defaults({ posts: [], users: [], settings: [] });

const models = {
  Settings: createModel(db, 'settings'),
  Post: createModel(db, 'posts'),
  User: createModel(db, 'users'),
};

export { db, models };
