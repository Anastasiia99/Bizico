import React, { Fragment } from "react";
import { Row, Col } from "antd";
import { Card, Icon, Avatar } from "antd";
import "./App.css";
import { getArticles } from "./common/api.js";

const { Meta } = Card;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    getArticles().then(
      result => {
        console.log(result);
        this.setState({
          isLoaded: true,
          items: result.data
        });
      },
      error => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    );
  }
  dataList() {
    const { isLoaded, items } = this.state;
    const listItems = items.map(item => (
      <div key={item.title}>
        {
          <Card
            cover={
              <img
                alt="example"
                src={
                  isLoaded
                    ? item.cover_image
                    : "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                }
              />
            }
            actions={[
              <Fragment>
                <Icon type="heart" />
                <span className="span">{item.positive_reactions_count}</span>
              </Fragment>,
              <Fragment>
                <Icon type="message" />
                <span className="span">{item.comments_count}</span>
              </Fragment>
            ]}
          >
            <Meta
              avatar={
                <Avatar
                  src={
                    isLoaded
                      ? item.user.profile_image
                      : "https://res.cloudinary.com/practicaldev/image/fetch/s--4ETXDUD6--/c_fill,f_auto,fl_progressive,h_640,q_auto,w_640/https://thepracticaldev.s3.amazonaws.com/uploads/user/profile_image/173804/3c7fd4e8-d961-4163-8178-4d3693a60c48.jpg"
                  }
                />
              }
              title={isLoaded ? item.title : <p>Loading...</p>}
              description={isLoaded ? item.description : <p>Loading...</p>}
            />
          </Card>
        }
      </div>
    ));
    return <ul>{listItems}</ul>;
  }
  render() {
    const cards = this.dataList();
    return (
      <div className="App">
        <header className="App-header">
          <div>
            <Row>
              <Col span={12} offset={6}>
                {cards}
              </Col>
            </Row>
          </div>
        </header>
      </div>
    );
  }
}
export default App;
