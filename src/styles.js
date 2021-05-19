import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const lightTheme = {
  fontColor: "#2c2c2c",
  bgColor: "white",
};

export const darkTheme = {
  fontColor: "lightgray",
  bgColor: "white",
};

export const GlobalStyles = createGlobalStyle`
    ${reset}
    input {
      all: unset;
    }
    * {
      box-sizing: border-box;
    }
    body {
        background-color: #FAFAFA;
        font-size: 14px;
        font-family:'Open Sans', sans-serif;
    }
    a {
      text-decoration: none;
    }
`;
