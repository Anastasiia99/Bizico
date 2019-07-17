import React from "react";
import { getArtById } from "../../common/api";
import "./FullArticle.scss";
import { Row, Col } from "antd";
import { SettingContext } from "../../common/SettingConProv";

import classNames from "classnames";

class FullArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      item: []
    };
  }
  static contextType = SettingContext;

  componentDidMount() {
    getArtById(this.props.match.params.id).then(result => {
      console.log(result);
      this.setState({
        isLoaded: true,
        item: result.data
      });
    });
  }
  render() {
    const { mode } = this.context;
    const isNight = mode === "night";
    const {
      item: { body_html, title, cover_image }
    } = this.state;
    return (
      <div>
        <Row>
          <Col
            span={23}
            offset={1}
            className={classNames("full-article", { darkArt: isNight })}
          >
            {cover_image && (
              <img className="coverImg" alt=" " src={cover_image} />
            )}

            <h1 className={classNames("longer", { darkArt: isNight })}>
              {title}
            </h1>
            <div dangerouslySetInnerHTML={{ __html: body_html }} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default FullArticle;
