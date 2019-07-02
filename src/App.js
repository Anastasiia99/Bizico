import React from 'react';
import {Button} from 'antd';
import './App.css';
import {getArticles} from './common/api.js';


class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
   };
  }
 
  componentDidMount() {

    getArticles()
      
      .then(
        (result) => {
          console.log(result);
          this.setState({
            isLoaded: true,
            items: result.data
          });
        },
        (error) => {
          this.setState({
             isLoaded: true,
             error
            });
          }
  )
  }

  render(){ 
    const {isLoaded, items } = this.state;
    
   return (
    <div className="App">
      <header className="App-header">
        
        <p>
        { isLoaded?items[0].title:<p>Loading...</p>
            }
        </p>
        <Button type="primary">Button</Button>
       
      </header>
    </div>
  );
 }
}
 export default App;
