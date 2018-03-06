import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt from 'jsonwebtoken';

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

const cert = "phrase";

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      userId: null
    }
  }

  componentDidMount(){
    let obj = this;
    let token = JSON.parse(sessionStorage.getItem("JamBid"));
    if(token){
      if(token.token)
        jwt.verify(token.token, cert, (err, decode) => {
          if(err) console.log("err",err);

          if(decode)
            obj.setState({userId:decode.userId})
        });
    }
  }

  //login method
  handleClickLogin = (userName, password, toggle) => {
    let obj = this;
    API.logUserIn(userName, password)
    .then(function(result){
      if(result.data[0]){
        jwt.sign({userId: result.data[0].id}, cert, (err, token) => {
          if (err) console.log("err", err);
          else {
            sessionStorage.setItem("JamBid", JSON.stringify({ token:token, time: new Date() }));
            obj.setState({userId: result.data[0].id}, toggle);
          }
        });
      }
    })
    .catch(function(error){
      console.log("error: "+error);
    })
  }

  //logout method
  handleClickLogout = () => {
    this.setState({userId:null},sessionStorage.removeItem("JamBid"));
  }

  render() {
    return (
      <Router>
        <div>
        <Nav userName='' password=''  userId={this.state.userId} handleLogin={this.handleClickLogin} handleLogout={this.handleClickLogout}/>
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