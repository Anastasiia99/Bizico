import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";

import Articles from "./pages/Articles/Articles";
import UserPage from "./pages/UserPage/UserPage";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Articles} />
          <Route exact path="/:tag" component={Articles} />
          <Route path="/user/:username" component={UserPage} />
        </div>
      </Router>
    );
  }
}
export default App;
