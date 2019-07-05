import React, { Fragment } from "react";
import { Card, Icon, Avatar } from "antd";

const { Meta } = Card;

class Article extends React.Component {
  render() {
    const {
      title,
      isLoaded,
      comments_count,
      cover_image,
      positive_reactions_count,
      username,
      profile_image,
      description
    } = this.props;
    return (
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
          avatar={
            <a href={`/user/${username}`}>
              <Avatar src={profile_image} />
            </a>
          }
          title={title}
          description={description}
        />
      </Card>
    );
  }
}

export default Article;
