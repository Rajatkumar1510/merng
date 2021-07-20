import { ApolloServer } from "apollo-server";
import mongoose from "mongoose";

import typeDefs from "./graphql/typeDefs.js";
import resolvers from "./graphql/resolvers/index.js";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});
//  server initialization  and mongoose database connection initialization
const PORT = process.env.PORT || 4001;
const connection_url =
  "mongodb+srv://naruto:naruto@cluster0.ddp57.mongodb.net/social?retryWrites=true&w=majority";
mongoose
  .connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    server.listen(PORT).then((res) => {
      console.log(`server is runing at ${res.url}`);
    })
  )
  .catch((err) => {
    console.log(err);
  });
