import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Layout } from "antd";

import "./App.css";

import Articles from "./pages/Articles/Articles";
import UserPage from "./pages/UserPage/UserPage";
import Tags from "./components/Tags/Tags";
import FullArticle from "./pages/FullArticle/FullArticle";

const { Content } = Layout;

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Layout>
            <Tags />
            <Content style={{ padding: "0 50px", marginTop: 64 }}>
              <Route exact path="/" component={Articles} />
              <Route exact path="/:tag" component={Articles} />
              <Route path="/user/:username" component={UserPage} />
              <Route path="/articles/:id" component={FullArticle} />
            </Content>
          </Layout>
        </div>
      </Router>
    );
  }
}
export default App;
