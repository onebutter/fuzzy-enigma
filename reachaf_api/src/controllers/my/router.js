import express from 'express';
import graphqlHTTP from 'express-graphql';
import { buildSchema } from 'graphql';

const router = express.Router();

const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const root = {
  hello: () => {
    return 'Hello world!';
  }
};

router.use(
  '/',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);

export default router;
