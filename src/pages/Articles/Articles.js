import { Col, Layout, Row, Tag } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { getArticles, getTags } from "../../common/api";
import Article from "../../components/Article/Article";

const { Header, Content } = Layout;

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
  getArtData() {
    const {
      match: {
        params: { tag }
      }
    } = this.props;
    getArticles(tag).then(result => {
      console.log(result);
      this.setState({
        isLoaded: true,
        items: result.data
      });
    });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.match.params.tag !== this.props.match.params.tag) {
      this.getArtData();
    }
  }
  componentDidMount() {
    this.getArtData();
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
        user: { profile_image, username },
        description
      }) => (
        <Article
          cover_image={cover_image}
          title={title}
          positive_reactions_count={positive_reactions_count}
          comments_count={comments_count}
          profile_image={profile_image}
          username={username}
          description={description}
          isLoaded={isLoaded}
        />
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
                <Col xs={{ span: 18 }} ms={{ span: 22, offset: 6 }}>
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
