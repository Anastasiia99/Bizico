import React from "react";
import { getUser, getArtByUser } from "../../common/api";

import { Card, Icon, Avatar, Col, Descriptions, Row, Input } from "antd";
import Article from "../../components/Article/Article";
import { SettingContext } from "../../common/SettingConProv";
import "./UserPage.scss";

const { Meta } = Card;
const { Search } = Input;
const classNames = require("classnames");

class UserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      users: [],
      items: [],
      tmpItems: []
    };
  }
  static contextType = SettingContext;
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
        items: result.data,
        tmpItems: result.data
      });
    });
  }
  handleChange = e => {
    const value = e.target.value;
    if (value) {
      this.setState({
        items: this.state.items.filter(item =>
          item.title.toLowerCase().includes(value.toLowerCase())
        )
      });
    } else
      this.setState({
        items: this.state.tmpItems
      });
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
    const { mode } = this.context;
    const isNight = mode === "night";
    return (
      <div>
        <Col
          xs={{ span: 20, offset: 2 }}
          md={{ span: 16, offset: 4 }}
          lg={{ span: 14, offset: 5 }}
        >
          <Row>
            <Card
              key={username}
              loading={!isLoaded}
              className={classNames("card", { darkCard: isNight })}
            >
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
                          <Icon
                            className={classNames("icons", {
                              darkIcons: isNight
                            })}
                            type="github"
                          />
                        </a>
                      )}
                      {twitter_username && (
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={`https://twitter.com/${twitter_username}`}
                        >
                          <Icon
                            className={classNames("icons", {
                              darkIcons: isNight
                            })}
                            type="twitter"
                          />
                        </a>
                      )}
                    </Row>
                  </div>
                }
                title={
                  <div>
                    <h1
                      className={classNames("username", { darkUser: isNight })}
                    >
                      {name}
                    </h1>
                    <span
                      className={classNames("username", { darkUser: isNight })}
                    >
                      @{username}
                    </span>
                  </div>
                }
                description={
                  <div
                    className={classNames("descript", { darkDescr: isNight })}
                  >
                    {summary}
                    <Descriptions
                      border
                      column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                      layout="vertical"
                      className={classNames("descript", { darkDescr: isNight })}
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
            onChange={this.handleChange}
            allowClear
          />
          <Row>{cards}</Row>
        </Col>
      </div>
    );
  }
}

export default UserPage;
