import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from './components/Navbar';

// routes
import Homepage from './components/Homepage';
import Account from './components/Account';
import Product from './components/Product';
import NoMatch from "./components/NoMatch";

class App extends Component {
  render() {
    return (
      <Router>
      <div>

        <Nav />

        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/account" component={Account} />
          <Route exact path="/product/:category?/:subcategory?/:id?" component={Product} />
          <Route component={NoMatch} />
        </Switch>

      </div>
    </Router>
    );
  }
}

export default App;
