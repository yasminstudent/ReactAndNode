import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Routes from "./routes/Routes";

class App extends Component {
  //Render renderiza os componentes no html
  render() {
    return <Routes />;
  }
}

export default App;
