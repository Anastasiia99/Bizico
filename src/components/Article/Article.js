import React, { Fragment } from "react";
import { Card, Icon, Avatar } from "antd";
import { Link } from "react-router-dom";
import { SettingContext } from "../../common/SettingConProv";
import "./Article.scss";

const { Meta } = Card;
const classNames = require("classnames");

class Article extends React.Component {
  static contextType = SettingContext;
  render() {
    const { mode } = this.context;
    const isNight = mode === "night";
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
        className={classNames("card", { darkCard: isNight })}
        key={title}
        loading={!isLoaded}
        cover={coverImage && <img alt="example" src={coverImage} />}
        actions={[
          <Fragment>
            <div className={classNames("likes", { darkLikes: isNight })}>
              <Icon type="heart" />
              <span className="span">{positiveReactionsCount}</span>
            </div>
          </Fragment>,
          <Fragment>
            <div className={classNames("likes", { darkLikes: isNight })}>
              <Icon type="message" />
              <span className="span">{commentsCount}</span>
            </div>
          </Fragment>
        ]}
      >
        <Meta
          avatar={avatar}
          title={
            <Link
              className={classNames("links", { darkLinks: isNight })}
              to={`/articles/${id}`}
            >
              {title}
            </Link>
          }
          description={
            <div className={classNames("descript", { darkDescr: isNight })}>
              {description}
            </div>
          }
        />
      </Card>
    );
  }
}

Article.defaultProps = { hideAvatar: false };
export default Article;
