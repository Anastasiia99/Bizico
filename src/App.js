import React, { Fragment } from "react";
import { Row, Col, Tag, Layout } from "antd";
import { Card, Icon, Avatar } from "antd";
import "./App.css";
import { getArticles, getTags } from "./common/api.js";

const { Meta } = Card;
const { Header, Content } = Layout;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      tags: []
    };
  }

  componentDidMount() {
    getArticles().then(result => {
      console.log(result);
      this.setState({
        isLoaded: true,
        items: result.data
      });
    });
    getTags().then(result => {
      console.log(result);
      this.setState({
        tags: result.data
      });
    });
  }
  tagsList() {
    const { tags } = this.state;
    const listTags = tags.map(({ name }) => (
      <Tag className="tags" key={name}>
        #{name}
      </Tag>
    ));
    return listTags;
  }
  dataList() {
    const { isLoaded, items } = this.state;
    const listItems = items.map(
      ({
        cover_image,
        title,
        positive_reactions_count,
        comments_count,
        user: { profile_image },
        description
      }) => (
        <Card
          key={title}
          loading={!isLoaded}
          cover={cover_image && <img alt="example" src={cover_image} />}
          actions={[
            <Fragment>
              <Icon type="heart" />
              <span className="span">{positive_reactions_count}</span>
            </Fragment>,
            <Fragment>
              <Icon type="message" />
              <span className="span">{comments_count}</span>
            </Fragment>
          ]}
        >
          <Meta
            avatar={<Avatar src={profile_image} />}
            title={title}
            description={description}
          />
        </Card>
      )
    );
    return listItems;
  }
  render() {
    const cards = this.dataList();
    const tags = this.tagsList();
    return (
      <div className="App">
        <header className="App-header">
          <div>
            <Layout>
              <Header className="newsHeader">
                <Row>{tags}</Row>
              </Header>
              <Content style={{ padding: "0 50px", marginTop: 64 }}>
                <Row>
                  <Col span={12} offset={6}>
                    {cards}
                  </Col>
                </Row>
              </Content>
            </Layout>
          </div>
        </header>
      </div>
    );
  }
}
export default App;
