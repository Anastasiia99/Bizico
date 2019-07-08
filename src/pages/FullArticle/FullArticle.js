import React from "react";
import { getArtById } from "../../common/api";
import "./FullArticle.scss";
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
    const { item } = this.state;
    return (
      <div
        className="full-article"
        dangerouslySetInnerHTML={{ __html: item.body_html }}
      />
    );
  }
}

export default FullArticle;
