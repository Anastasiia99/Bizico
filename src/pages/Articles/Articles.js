import { Col, Row } from "antd";
import React from "react";
import { getArticles } from "../../common/api";
import Article from "../../components/Article/Article";

class Articles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      items: []
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
        description,
        id
      }) => (
        <Article
          key={title}
          cover_image={cover_image}
          title={title}
          positive_reactions_count={positive_reactions_count}
          comments_count={comments_count}
          profile_image={profile_image}
          username={username}
          description={description}
          isLoaded={isLoaded}
          id={id}
        />
      )
    );
    return listItems;
  }
  render() {
    const cards = this.dataList();
    return (
      <Row>
        <Col xs={{ span: 20, offset: 2 }} md={{ span: 16, offset: 4 }}>
          {cards}
        </Col>
      </Row>
    );
  }
}

export default Articles;
