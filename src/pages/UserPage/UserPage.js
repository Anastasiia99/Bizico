import React from "react";
import { getUser } from "../../common/api";

import { Card, Icon, Avatar, Row, Col, Descriptions } from "antd";

const { Meta } = Card;

class UserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      users: []
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
    return (
      <Row gutter={20}>
        <Card key={username} loading={!isLoaded}>
          <Col span={16}>
            <Meta
              avatar={<Avatar size={200} src={profile_image} />}
              title={
                <div>
                  <h1>{name}</h1>
                  <span>@{username}</span>
                </div>
              }
              description={summary}
            />
            <div>
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
            </div>
          </Col>
          <Col span={8}>
            <Descriptions layout="vertical" bordered>
              {location && (
                <Descriptions.Item label="Location">
                  {location}
                </Descriptions.Item>
              )}
              {joined_at && (
                <Descriptions.Item label="Joined at">
                  {joined_at}
                </Descriptions.Item>
              )}
            </Descriptions>
          </Col>
        </Card>
      </Row>
    );
  }
}

export default UserPage;
