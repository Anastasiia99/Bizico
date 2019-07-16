import { Col, Spin } from "antd";
import React from "react";
import { getArticles } from "../../common/api";
import Article from "../../components/Article/Article";
import InfiniteScroll from "react-infinite-scroller";

class Articles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      items: [],
      hasMoreItems: true,
      nextHref: null
    };
  }
  loadItems = page => {
    const {
      match: {
        params: { tag }
      }
    } = this.props;
    console.log(page);
    getArticles(tag, page).then(result => {
      console.log(result);
      this.setState({
        isLoaded: true,
        items: [...this.state.items, ...result.data]
      });
    });
  };
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
          key={`${title}-${username}`}
          coverImage={cover_image}
          title={title}
          positiveReactionsCount={positive_reactions_count}
          commentsCount={comments_count}
          profileImage={profile_image}
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
      <Col
        xs={{ span: 20, offset: 2 }}
        md={{ span: 16, offset: 4 }}
        lg={{ span: 14, offset: 5 }}
      >
        <InfiniteScroll
          pageStart={0}
          loadMore={this.loadItems}
          hasMore={this.state.hasMoreItems}
          loader={<Spin className="spin" tip="Loading..." />}
        >
          {cards}
        </InfiniteScroll>
      </Col>
    );
  }
}

export default Articles;
