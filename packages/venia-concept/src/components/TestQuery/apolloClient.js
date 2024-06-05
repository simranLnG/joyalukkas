// File: apolloClient.js

import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/magento/graphql", // Your GraphQL server's endpoint URL
  cache: new InMemoryCache()
});

export default client;
