import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from './components/Navbar';
import API from './utils/API';

// routes
import Homepage from './components/Homepage';
import Account from './components/Account';
import Product from './components/Product';
import ProductNew from './components/ProductNew';
import ProductUpdate from './components/ProductUpdate';
import NoMatch from "./components/NoMatch";
import Search from "./components/Search";

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
          <div className="container content">
            <Switch>
              <Route exact path="/" component={Homepage}/>
              <Route path="/search/:category" component={Search} />
              <Route exact path="/account" render={props => <Account userId={this.state.userId} />}/>
              <Route path="/product/:id" render={props => <Product userId={this.state.userId} />}/>
              <Route path="/product-new"render={props => <ProductNew userId={this.state.userId} />} />
              <Route path="/product-update/:id"render={props => <ProductUpdate userId={this.state.userId} />} />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;