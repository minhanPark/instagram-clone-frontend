import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

const TOKEN = "token";
const DARK_MODE = "DARK_MODE";

const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));

export const logUserIn = (token) => {
  localStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
};

export const logUserOut = (history) => {
  localStorage.removeItem(TOKEN);
  history.replace();
  window.location.reload();
};

const darkModeVar = makeVar(Boolean(localStorage.getItem(DARK_MODE)));

export const enableDarkMode = () => {
  localStorage.setItem(DARK_MODE, "enbled");
  darkModeVar(true);
};

export const disableDarkMode = () => {
  localStorage.removeItem(DARK_MODE);
  darkModeVar(false);
};

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

export { isLoggedInVar, darkModeVar, client };
