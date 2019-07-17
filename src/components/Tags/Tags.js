import React from "react";
import { Layout, Select, Col, Button, Modal, Icon, Switch } from "antd";
import { Link, withRouter } from "react-router-dom";
import { getTags } from "../../common/api";
import Cookies from "js-cookie";
import icon from "../../assets/icon.svg";
import { SettingContext } from "../../common/SettingConProv";

const { Header } = Layout;
const { Option } = Select;
const classNames = require("classnames");

class Tags extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      visible: false
    };
  }
  static contextType = SettingContext;

  componentDidMount() {
    getTags().then(result => {
      console.log(result);
      this.setState({
        tags: result.data
      });
    });
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
  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  onChange = checked => {
    console.log(`switch to ${checked}`);
  };

  handleChange = value => {
    console.log(`selected ${value}`);
    this.props.history.push(`/${value}`);
  };

  logout = () => {
    this.props.history.push("/auth/login");
    Cookies.set("user", "0.0");
  };
  render() {
    const { mode, changeMode } = this.context;
    const tags = this.tagsSelect();
    const isNight = mode === "night";

    if (this.props.history.location.pathname === "/auth/login") {
      return null;
    }

    return (
      <Header className={classNames("newsHeader", { darkMode: isNight })}>
        <Col span={2}>
          <Link to="/">
            <img
              className={classNames("mainIcon", {
                darkIcon: isNight
              })}
              alt=""
              src={icon}
            />
          </Link>
        </Col>
        <Col
          xs={{ span: 12, offset: 2 }}
          md={{ span: 14, offset: 2 }}
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

        <Button
          className="logout"
          type="primary"
          htmlType="submit"
          onClick={this.logout}
        >
          Log out
        </Button>

        <Icon
          className={classNames("settIcon", {
            settDark: isNight
          })}
          type="setting"
          theme="outlined"
          onClick={this.showModal}
        />

        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={<div />}
        >
          <p>
            <Switch
              onChange={changeMode}
              checkedChildren="🌙"
              unCheckedChildren="🌞"
              defaultChecked={mode === "day"}
            />
          </p>
        </Modal>
      </Header>
    );
  }
}
export default withRouter(Tags);
