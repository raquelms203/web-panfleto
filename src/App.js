import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./util/routes";
import GlobalStyle from "./util/styles";
import { theme } from "./util/theme";
import { ThemeProvider } from "@material-ui/core/styles";


function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <GlobalStyle/><Routes/>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
