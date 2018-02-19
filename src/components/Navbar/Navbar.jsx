import React, {Component} from 'react';
import './Navbar.css';
import loginSvg from './images/login.svg';

// sub-components 
import Signup from '../Signup';
import Login from '../Login';


class Nav extends Component {
    constructor(props){
        super(props);

        this.state={
            userId: props.userId
        }
    }

    render() {
      return (
        <div>
            {/*<!-- top Nav Bar  -->*/}
            <div id="nav-background">
                <nav className="navbar navbar-dark">

                    {/*<!-- navbar logo -->*/}
                    <div className="col-4">
                        <div className="mx-auto">
                            <a className="navbar-brand nav-link" href="/">Jam</a>
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
                            <a className="dropdown-item" href="/">All</a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="/">Cateogry 1</a>
                            <a className="dropdown-item" href="/">Cateogry 2</a>
                            <a className="dropdown-item" href="/">Cateogry 3</a>
                        </div>
                        </div>
                        {/* search field */}
                        <input className="form-control form-control-sm navbar-search" id="navbar-search-input" type="search" placeholder="Search" aria-label="Search" />
                        {/* search button */}
                        <button className="btn btn-sm my-2 my-sm-0 navbar-search" id="navbar-search-btn" type="submit">Search</button>
                    </form>
                    </div>
                </nav>

                {/*<!-- bottom Nav Bar -->*/}
                <nav className="navbar navbar-dark">
                    <div className="col-4">
                        <div className="navbar-quote">Sweet deals that stick.</div>
                    </div>

                    {/*<!-- Nav links -->*/}
                    <div className="col-7 ">
                        <ul className="nav float-right">
                            <li className="nav-item">
                                <a className="nav-link" href="" id="shop-btn">Shop</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="" id="notifiction-btn">Notification</a>
                            </li>
                            {this.state.userId !== null ?
                                <li className="nav-item">
                                    <a className="nav-link" href="/account" id="account-btn">Account</a>
                                </li>
                            : null}
                        </ul>

                    </div>

                    {/*<!-- login button -->*/}
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navcollapse" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <img src={loginSvg} id="burger" alt=""/>
                    </button>
                </nav>

                {/*<!-- sign-up & login (collapsed)  -->*/}
                <nav className="navbar navbar-light bg-light p-0"  style={{zIndex:1}}>
                    <div id="navcollapse" className="collapse navbar-collapse" >
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