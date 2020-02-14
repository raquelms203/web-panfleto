import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./util/routes";
import GlobalStyle from "./util/styles";

function App() {
  return (
    <>
      <BrowserRouter>
        <GlobalStyle></GlobalStyle> <Routes></Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
