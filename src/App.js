import React, { Component } from 'react';
import Nav from './components/Navbar';

// future routes
import Homepage from './components/Homepage';
import Account from './components/Account';
import Product from './components/Product';

class App extends Component {
  render() {
    return (
      <div>

        <Nav />
        {/* <Homepage /> */}

        <Account />
        
        <hr/>

        <Product />

      </div>
    );
  }
}

export default App;
