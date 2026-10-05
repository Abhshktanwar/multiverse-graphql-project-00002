import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

// HttpLink explicitly banakar Apollo ko pass kar rahe hain
const httpLink = new HttpLink({
  uri: "https://rickandmortyapi.com/graphql",
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
