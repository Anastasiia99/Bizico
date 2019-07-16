import React from "react";
import { Layout, Select, Tag, Row, Col, Button } from "antd";
import { Link, withRouter } from "react-router-dom";
import { getTags } from "../../common/api";
import Cookies from "js-cookie";
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

  logout = () => {
    this.props.history.push("/auth/login");
    Cookies.set("user", "0.0");
  };
  render() {
    const { width } = this.state;
    console.log(this.props);

    if (this.props.history.location.pathname === "/auth/login") {
      return null;
    }

    if (width > 1075) {
      const tags = this.tagsList();

      return (
        <Header className="newsHeader">
          <Row>
            <Col span={2}>
              <Link to="/">
                <img className="mainIcon" alt="" src={icon} />
              </Link>
            </Col>
            <Col span={20}>{tags}</Col>
            <Button type="primary" htmlType="submit" onClick={this.logout}>
              Log out
            </Button>
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

          <Button type="primary" htmlType="submit" onClick={this.logout}>
            Log out
          </Button>
        </Header>
      );
    }
  }
}
export default withRouter(Tags);
