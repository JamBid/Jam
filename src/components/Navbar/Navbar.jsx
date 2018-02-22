import React, {Component} from 'react';
import './Navbar.css';
import loginSvg from './images/login.svg';
import logoutSvg from './images/logout.svg';

import {Link} from 'react-router-dom';

// sub-components 
import Signup from '../Signup';
import Login from '../Login';


class Nav extends Component {

    constructor(props){
        super(props);

        this.state={
            userId: props.userId,
            handleLogin: props.handleLogin
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({userId: nextProps.userId});
    }

    render() {
      return (
        <div>
            {/*<!-- top Nav Bar  -->*/}
            <div id="nav-background">
                <nav className="navbar navbar-dark">
                    <div className="container">

                        {/*<!-- navbar logo -->*/}
                        <div className="col-4">
                            <div className="mx-auto">
                                <Link className="navbar-brand nav-link" to="/">JAM</Link>
                            </div>
                        </div>

                        {/*<!-- navbar search -->*/}
                        <div className="col-8">
                        <form className="form-inline float-right">
                            <div className="btn-group">
                            <button type="button" className="btn btn-sm dropdown-toggle navbar-search" id="navbar-category-btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Category
                            </button>
                            {/* category drop down */}
                            <div className="dropdown-menu">
                                <Link className="dropdown-item" to="/">All</Link>
                                <div className="dropdown-divider"></div>
                                <Link className="dropdown-item" to="/">Cateogry 1</Link>
                                <Link className="dropdown-item" to="/">Cateogry 2</Link>
                                <Link className="dropdown-item" to="/">Cateogry 3</Link>
                            </div>
                            </div>
                            {/* search field */}
                            <input className="form-control form-control-sm navbar-search" id="navbar-search-input" type="search" placeholder="Search" aria-label="Search" />
                            {/* search button */}
                            <button className="btn btn-sm my-2 my-sm-0 navbar-search" id="navbar-search-btn" type="submit">Search</button>
                        </form>
                        </div>

                    </div>
                </nav>

                {/*<!-- bottom Nav Bar -->*/}
                <nav className="navbar navbar-dark">
                    <div className="container">
                        {/* moto */}
                        <div className="col-6">
                            <div className="navbar-quote">Sweet deals that stick.</div>
                        </div>

                        {/*<!-- Nav links -->*/}
                        <div className="col-6">
                            <ul className="nav float-right">

                                {this.state.userId !== null ?
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/account" id="account-btn">Account</Link>
                                    </li>
                                : null}

                                {this.state.userId !== null ?
                                    <li className="nav-item">
                                        <Link className="nav-link" to="" id="notifiction-btn">Notification</Link>
                                    </li>
                                : null}

                                <li className="nav-item">
                                    <Link className="nav-link" to="" id="shop-btn">Shop</Link>
                                </li>

                                {/*<!-- login button -->*/}
                                {this.state.userId !== null ?
                                    <li className="nav-item">
                                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navcollapse" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                        <img src={logoutSvg} className="log-btn" id="logout" alt=""/>
                                        </button>
                                    </li> 
                                :  <li className="nav-item">
                                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navcollapse" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                            <img src={loginSvg} className="log-btn" id="login" alt=""/> 
                                        </button>
                                    </li> 
                                }
                                
                            </ul>
                        </div>

                    </div>
                </nav>

                {/*<!-- sign-up & login (collapsed)  -->*/}
                <nav className="navbar navbar-light bg-light p-0"  style={{zIndex:1}}>
                    <div id="navcollapse" className="collapse navbar-collapse" >
                        <div className="navbar-nav" id="accordion">
                            <div className="mx-auto">
                                <Signup />
                                <Login onClick={this.state.handleLogin}/>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>

        </div>
      );
    }
  }

  export default Nav;