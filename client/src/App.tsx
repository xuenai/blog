import React from "react";
import { ThemeProvider } from "react-jss";

import "./App.css";

import { Search } from "./components";
import { theme } from "./config";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Search />
    </ThemeProvider>
  );
};

export default App;
