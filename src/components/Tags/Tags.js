import React from "react";
import { Layout, Select, Tag, Row, Col } from "antd";
import { Link, withRouter } from "react-router-dom";
import { getTags } from "../../common/api";
import icon from "../../assets/icon.svg";

const { Header } = Layout;
const { Option } = Select;

class Tags extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
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
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }
  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };

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
  tagsSelect() {
    const { tags } = this.state;
    const listTags = tags.map(({ name }) => (
      <Option value={name} key={name}>
        <span>#{name}</span>
      </Option>
    ));
    return listTags;
  }
  handleChange = value => {
    console.log(`selected ${value}`);
    this.props.history.push(`/${value}`);
  };

  render() {
    const { width } = this.state;

    if (width > 990) {
      const tags = this.tagsList();
      return (
        <Header className="newsHeader">
          <Row>
            <Col span={2}>
              <Link to="/">
                <img className="mainIcon" alt="" src={icon} />
              </Link>
            </Col>
            <Col span={22}>{tags}</Col>
          </Row>
        </Header>
      );
    } else {
      const tags = this.tagsSelect();
      return (
        <Header className="newsHeader">
          <Col span={2}>
            <Link to="/">
              <img className="mainIcon" alt="" src={icon} />
            </Link>
          </Col>
          <Col
            xs={{ span: 20, offset: 2 }}
            md={{ span: 16, offset: 2 }}
            lg={{ span: 14, offset: 3 }}
          >
            <Select
              size="large"
              placeholder="Select tag"
              style={{ width: "100%" }}
              onChange={this.handleChange}
            >
              {tags}
            </Select>
          </Col>
        </Header>
      );
    }
  }
}
export default withRouter(Tags);
