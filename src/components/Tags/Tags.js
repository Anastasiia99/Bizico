import React from "react";
import { Layout, Row, Tag } from "antd";
import { Link } from "react-router-dom";
import { getTags } from "../../common/api";

const { Header } = Layout;

class Tags extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: []
    };
  }
  componentDidMount() {
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

  render() {
    const tags = this.tagsList();
    return (
      <Header className="newsHeader">
        <Row>{tags}</Row>
      </Header>
    );
  }
}
export default Tags;
