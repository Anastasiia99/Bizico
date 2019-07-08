import React from "react";
import { getArtById } from "../../common/api";

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
    console.log(item.body_html);
    return <div dangerouslySetInnerHTML={{ __html: item.body_html }} />;
  }
}

export default FullArticle;
