import React from "react";
import { getUser } from "../../common/api";

import { Card, Icon, Avatar, Row, Col } from "antd";

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
      users: { name, profile_image, summary, username }
    } = this.state;
    return (
      <Row>
        <Col span={18}>
          <Card key={username} loading={!isLoaded} hoverable>
            <Meta
              avatar={<Avatar size={200} src={profile_image} />}
              title={name}
              description={summary}
            />
          </Card>
        </Col>
      </Row>
    );
  }
}

export default UserPage;
