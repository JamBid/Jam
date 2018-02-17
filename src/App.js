import React, { Component } from 'react';
import Nav from './components/Navbar';

// future routes
import Homepage from './components/Homepage';
import Account from './components/Account';
import Product from './components/Product';
import TimeRemaining from './components/TimeRemaining';

class App extends Component {
  render() {
    return (
      <div>
        <Nav />
        {/*<Homepage />
        <Account />
        <Product />*/}
        <TimeRemaining />
      </div>
    );
  }
}

export default App;
