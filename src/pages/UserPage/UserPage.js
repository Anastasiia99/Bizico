import React from "react";
import { getUser, getArtByUser } from "../../common/api";

import { Card, Icon, Avatar, Col, Descriptions, Row, Input } from "antd";
import Article from "../../components/Article/Article";

const { Meta } = Card;
const { Search } = Input;

class UserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      users: [],
      items: []
    };
  }
  componentDidMount() {
    getUser(this.props.match.params.username).then(result => {
      console.log(result);
      this.setState({
        isLoaded: true,
        users: result.data
      });
    });

    getArtByUser(this.props.match.params.username).then(result => {
      console.log(result);
      this.setState({
        items: result.data
      });
    });
  }
  handleChange = value => {
    console.log(`selected ${value}`);
  };
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
          coverImage={cover_image}
          title={title}
          positiveReactionsCount={positive_reactions_count}
          commentsCount={comments_count}
          profileImage={profile_image}
          username={username}
          description={description}
          isLoaded={isLoaded}
          id={id}
          key={title}
          hideAvatar
        />
      )
    );
    return listItems;
  }
  render() {
    const {
      isLoaded,
      users: {
        name,
        profile_image,
        summary,
        username,
        location,
        joined_at,
        github_username,
        twitter_username
      }
    } = this.state;
    const cards = this.dataList();
    return (
      <div>
        <Col
          xs={{ span: 20, offset: 2 }}
          md={{ span: 16, offset: 4 }}
          lg={{ span: 14, offset: 5 }}
        >
          <Row>
            <Card key={username} loading={!isLoaded}>
              <Meta
                avatar={
                  <div>
                    <Row>
                      <Avatar size={170} src={profile_image} />
                    </Row>
                    <Row>
                      {github_username && (
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={`https://github.com/${github_username}`}
                        >
                          <Icon className="icons" type="github" />
                        </a>
                      )}
                      {twitter_username && (
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={`https://twitter.com/${twitter_username}`}
                        >
                          <Icon className="icons" type="twitter" />
                        </a>
                      )}
                    </Row>
                  </div>
                }
                title={
                  <div>
                    <h1>{name}</h1>
                    <span>@{username}</span>
                  </div>
                }
                description={
                  <div>
                    {summary}
                    <Descriptions
                      className="descript"
                      border
                      column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                      layout="vertical"
                    >
                      <Descriptions.Item label="Location">
                        {location}
                      </Descriptions.Item>
                      <Descriptions.Item label="Joined at">
                        {joined_at}
                      </Descriptions.Item>
                    </Descriptions>
                  </div>
                }
              />
            </Card>
          </Row>
          <Search
            className="search"
            placeholder="Search"
            onSearch={this.handleChange}
            enterButton
          />
          <Row>{cards}</Row>
        </Col>
      </div>
    );
  }
}

export default UserPage;
