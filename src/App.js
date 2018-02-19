import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from './components/Navbar';

// routes
import Homepage from './components/Homepage';
import Account from './components/Account';
import Product from './components/Product';
import NoMatch from "./components/NoMatch";

class App extends Component {
  state = {
    userId: 1
  }

  render() {
    return (
      <Router>
        <div>
          <Nav userId={this.state.userId}/>
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/account" render={props => <Account userId={this.state.userId} />}/>
            <Route path="/product" component={Product} />
            <Route component={NoMatch} />
          </Switch>
        </div>
    </Router>
    );
  }
}

export default App;
