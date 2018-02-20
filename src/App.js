import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from './components/Navbar';
import API from './utils/API';

// routes
import Homepage from './components/Homepage';
import Account from './components/Account';
import Product from './components/Product';
import NoMatch from "./components/NoMatch";

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      userId: null
    }
  }

  handleClick = (userName, password) => {
    let obj = this;
    API.logUserIn(userName, password)
    .then(function(result){
      console.log(result.data[0])
      if(result.data[0]){
        obj.setState({userId: result.data[0].id});
      }
    })
    .catch(function(error){
      console.log("error: "+error);
    })
  }

  render() {
    return (
      <Router>
        <div>
          <Nav userId={this.state.userId} handleLogin={this.handleClick}/>
          <Switch>
            <Route exact path="/" component={Homepage}/>
            <Route exact path="/account" render={props => <Account userId={this.state.userId} />}/>
            <Route path="/product/:id" component={Product} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
