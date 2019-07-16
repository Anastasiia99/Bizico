import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Layout } from "antd";

import "./App.css";

import Articles from "./pages/Articles/Articles";
import Login from "./pages/Login/Login";
import UserPage from "./pages/UserPage/UserPage";
import Tags from "./components/Tags/Tags";
import FullArticle from "./pages/FullArticle/FullArticle";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

const { Content } = Layout;

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Layout>
            <Tags />
            <Content style={{ padding: "0 50px", marginTop: 64 }}>
              <PrivateRoute exact path="/" component={Articles} />
              <Route path="/auth/login" component={Login} />
              <PrivateRoute path="/test/test" component={Login} />
              <PrivateRoute exact path="/:tag" component={Articles} />
              <PrivateRoute path="/user/:username" component={UserPage} />
              <PrivateRoute path="/articles/:id" component={FullArticle} />
            </Content>
          </Layout>
        </div>
      </Router>
    );
  }
}
export default App;
