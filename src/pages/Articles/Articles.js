import React, { Fragment } from "react";
import { Row, Col, Tag, Layout } from "antd";
import { Card, Icon, Avatar } from "antd";
import { getArticles, getTags } from "../../common/api";
import { Link } from "react-router-dom";

const { Header, Content } = Layout;
const { Meta } = Card;

class Articles extends React.Component {
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
    getArticles(this.props.match.params.tag).then(result => {
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
        <Link to={`/${name}`}>
          <span>#{name}</span>
        </Link>
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
    );
  }
}

export default Articles;
