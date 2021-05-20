import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

const isLoggedInVar = makeVar(false);
const darkModeVar = makeVar(false);

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

export { isLoggedInVar, darkModeVar, client };
