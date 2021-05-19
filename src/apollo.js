import { makeVar } from "@apollo/client";

const isLoggedInVar = makeVar(false);
const darkModeVar = makeVar(false);

export { isLoggedInVar, darkModeVar };
