import React, { Fragment } from "react";
import { Card, Icon, Avatar } from "antd";
import { Link } from "react-router-dom";

const { Meta } = Card;

class Article extends React.Component {
  render() {
    const {
      title,
      isLoaded,
      commentsCount,
      coverImage,
      positiveReactionsCount,
      username,
      profileImage,
      description,
      id,
      hideAvatar
    } = this.props;
    const avatar = hideAvatar ? null : (
      <Link to={`/user/${username}`}>
        <Avatar src={profileImage} />
      </Link>
    );
    return (
      <Card
        key={title}
        loading={!isLoaded}
        cover={coverImage && <img alt="example" src={coverImage} />}
        actions={[
          <Fragment>
            <Icon type="heart" />
            <span className="span">{positiveReactionsCount}</span>
          </Fragment>,
          <Fragment>
            <Icon type="message" />
            <span className="span">{commentsCount}</span>
          </Fragment>
        ]}
      >
        <Meta
          avatar={avatar}
          title={
            <Link className="links" to={`/articles/${id}`}>
              {title}
            </Link>
          }
          description={description}
        />
      </Card>
    );
  }
}

Article.defaultProps = { hideAvatar: false };
export default Article;
