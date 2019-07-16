import React from "react";
import { Form, Icon, Input, Button, Col, message } from "antd";
import Cookies from "js-cookie";
import { users } from "../../common/auth";

class Login extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        Cookies.set("user", `${values.username}.${values.password}`);
        if (
          users.find(
            user =>
              user.name === values.username && user.password === values.password
          )
        ) {
          console.log("Received values of form: ", Cookies.get());
          this.props.history.push("/");
        } else {
          message.error("Wrong username or password");
        }
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Col span={10} offset={7}>
        <img
          className="rainbowdevimage"
          alt=""
          src="https://practicaldev-herokuapp-com.freetls.fastly.net/assets/rainbowdev-90f426538b5a09913213c62645bad8ac4e35db260bb8d90103d8636e9423d9ec.svg"
        />
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator("username", {
              rules: [
                { required: true, message: "Please input your username!" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Username"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password", {
              rules: [
                { required: true, message: "Please input your Password!" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="Password"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Col>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(Login);

export default WrappedNormalLoginForm;
