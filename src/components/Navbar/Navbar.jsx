import React, {Component} from 'react';
import {Link} from 'react-router-dom';


import './Navbar.css';
import accountSvg from './images/account.svg';
import newAdSvg from './images/newAd.svg';
import notificationSvg from './images/notification.svg';
import shopSvg from './images/shop.svg';
import loginSvg from './images/login.svg';
import logoutSvg from './images/logout.svg';

// sub-components 
import Category from '../Category';
import Signup from '../Signup';
import Login from '../Login';


class Nav extends Component {

    constructor(props){
        super(props);

        this.state={
            userId: props.userId,
            handleLogin: props.handleLogin,
            loginFailed:props.loginFailed
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({userId: nextProps.userId, loginFailed: nextProps.loginFailed});
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
                                <Link className="navbar-brand" to="/">
                                    <span className="bold">
                                        J
                                    </span>
                                    <span className="thin">
                                        am
                                    </span>   
                                </Link>
                            </div>
                        </div>

                        {/*<!-- navbar search -->*/}
                        <Category />
                    </div>
                </nav>

                {/*<!-- bottom Nav Bar -->*/}
                <nav className="navbar navbar-dark">
                    <div className="container">
                        {/* moto */}
                        <div className="col-6">
                            <div className="navbar-quote">
                                    <span className="thin">
                                        Sweet deals that stick
                                    </span>    
                                </div>
                        </div>

                        {/*<!-- Nav links -->*/}
                        <div className="col-6">
                            <ul className="nav float-right">

                                {this.state.userId !== null ?
                                    [<li key={"a"} className="nav-item">
                                        <Link className="nav-link nav-icon" to="/account">
                                            <img src={accountSvg} className="svg-btn" alt=""/>
                                        </Link>
                                    </li>,
                                    <li key={"new"} className="nav-item">
                                        <Link className="nav-link nav-icon" to="/product-new">
                                            <img src={newAdSvg} className="svg-btn" alt=""/> 
                                        </Link>
                                    </li>,
                                    <li key={"not"}className="nav-item">
                                        <Link className="nav-link nav-icon" to="">
                                            <img src={notificationSvg} className="svg-btn" alt=""/> 
                                        </Link>
                                    </li>]
                                : null}

                                <li className="nav-item">
                                    <Link className="nav-link nav-icon" to="" id="shop-btn">
                                        <img src={shopSvg} className="svg-btn" alt=""/> 
                                    </Link>
                                </li>

                                {/*<!-- login button -->*/}
                                {this.state.userId !== null ?
                                    <li className="nav-item">
                                        <Link to="" className="nav-link nav-icon log-btn" data-toggle="collapse" data-target="#navcollapse" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                            <img src={logoutSvg} className="svg-btn" alt=""/>
                                        </Link>
                                    </li> 
                                :  <li className="nav-item">
                                        <Link to="" className="nav-link nav-icon log-btn" data-toggle="collapse" data-target="#navcollapse" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                            <img src={loginSvg} className="svg-btn" alt=""/> 
                                        </Link>
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

                                {/*<!-- options: sign up or login  -->*/}
                                <div className="card text-center" id="accordian-header">
                                    <div className="card-body">
                                        <div className="btn-group btn-group-toggle" data-toggle="buttons">
                                        <label className="btn btn-outline-secondary form-toggle active" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            <input type="radio" name="options" /> Sign Up
                                        </label>
                                        <label className="btn btn-outline-secondary form-toggle" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                            <input type="radio" name="options" /> Login
                                        </label>
                                        </div>
                                    </div>
                                </div>
                                <Signup />
                                <Login onClick={this.state.handleLogin} loginFailed={this.state.loginFailed}/>
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