import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "@material-ui/core/styles";
import Routes from "./util/routes";
import GlobalStyle from "./util/styles";
import { theme } from "./util/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <ToastContainer />
        <GlobalStyle />
        <Routes />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
