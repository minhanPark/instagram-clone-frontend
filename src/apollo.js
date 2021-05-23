import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

const TOKEN = "token";

const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));

export const logUserIn = (token) => {
  localStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
};

export const logUserOut = () => {
  localStorage.removeItem(TOKEN);
  isLoggedInVar(false);
};

const darkModeVar = makeVar(false);

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

export { isLoggedInVar, darkModeVar, client };
