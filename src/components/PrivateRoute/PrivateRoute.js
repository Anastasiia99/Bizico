import React from "react";
import { Route, Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import { users } from "../../common/auth";

class PrivateRoute extends React.Component {
  render() {
    const { component: Component, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={props =>
          users.find(
            user =>
              user.name === Cookies.get("user").split(".")[0] &&
              user.password === Cookies.get("user").split(".")[1]
          ) ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/auth/login"
              }}
            />
          )
        }
      />
    );
  }
}

export default PrivateRoute;
