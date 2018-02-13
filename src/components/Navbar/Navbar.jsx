import React, {Component} from 'react';
import './Navbar.css';
import loginSvg from './images/login.svg';
import Signup from '../Signup';
import Login from '../Login';

class Nav extends Component {
    render() {
      return (
        <div>
            {/*<!-- top Nav Bar  -->*/}
            <div id="nav-background">
                <nav className="navbar navbar-dark sticky-top">

                    {/*<!-- navbar logo -->*/}
                    <div className="col-4">
                        <ul className="list-unstyled">
                            <li>
                                <a className="navbar-brand ml-auto mr-auto" href="/">Jam</a>
                            </li>
                            <li id="navbar-quote">
                                <p>Sweet deals that stick.</p>
                            </li>
                        </ul>
                    </div>

                    {/*<!-- navbar search -->*/}
                    <div className="col-7 my-auto offset-1">
                    <form className="form-inline my-2 my-md-0">
                        <div className="btn-group">
                        <button type="button" className="btn btn-sm dropdown-toggle navbar-search" id="navbar-category-btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Category
                        </button>
                        <div className="dropdown-menu">
                            <a className="dropdown-item" href="/">All</a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="/">Cateogry 1</a>
                            <a className="dropdown-item" href="/">Cateogry 2</a>
                            <a className="dropdown-item" href="/">Cateogry 3</a>
                        </div>
                        </div>
                        <input className="form-control form-control-sm navbar-search" id="navbar-search-input" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-sm my-2 my-sm-0 navbar-search" id="navbar-search-btn" type="submit">Search</button>
                    </form>
                    </div>
                </nav>

                {/*<!-- bottom Nav Bar -->*/}
                <nav className="navbar navbar-dark">
                    {/*<!-- Nav links -->*/}
                    <ul className="nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item">
                        <a className="nav-link" href="/">Shop</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/">Notification</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/">Account</a>
                    </li>
                    </ul>
                    {/*<!-- hamburger -->*/}
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navcollapse" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <img src={loginSvg} id="burger" alt=""/>
                    </button>

                </nav>

                {/*<!-- sign-up & login (collapsed)  -->*/}
                <nav className="navbar navbar-light bg-light py-0 sticky-top"  >
                    <div id="navcollapse" className="collapse navbar-collapse my-2" >
                        <div className="navbar-nav" id="accordion">
                            <div className="mx-auto">
                                <Signup />
                                <Login />
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