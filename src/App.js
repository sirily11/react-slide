import React, { Component } from "react";
import "./App.css";
import { Route, HashRouter,BrowserRouter, Switch } from "react-router-dom";
import EditMode from "./Components/pages/EditMode.jsx";
import DisplayMode from "./Components/pages/DisplayMode";

class App extends Component {
  constructor() {
    super();
    this.state = {
      mode: "editor",
      data: [],
      pageNum: 0
    };
  }

  update = data => {
    this.setState({ data: data });
  };

  render() {
    return (
      <HashRouter>
        <div>
          <Switch>
            <Route path="/edit/:id?" component={EditMode} />
            <Route path="/:id/:debug?" component={DisplayMode} />
          </Switch>
        </div>
      </HashRouter>
    );
  }
}

export default App;
