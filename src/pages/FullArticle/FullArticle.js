import React from "react";
import { getArtById } from "../../common/api";
import "./FullArticle.scss";
import { Row, Col } from "antd";

class FullArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      item: []
    };
  }

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
    const {
      item: { body_html, title, cover_image }
    } = this.state;
    return (
      <div className="full-article">
        <Row>
          <Col span={23} offset={1}>
            {cover_image && (
              <img className="coverImg" alt=" " src={cover_image} />
            )}

            <h1 className="longer">{title}</h1>
            <div dangerouslySetInnerHTML={{ __html: body_html }} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default FullArticle;
