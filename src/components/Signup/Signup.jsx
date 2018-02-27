import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import API from '../../utils/API';
import './Signup.css';


class Signup extends Component {
    constructor(props){
        super(props);

        this.state = {
            email: "",
            firstName:"",
            lastName:"",
            password: "",
            retypePassword:"",
            userName:""
        }
    }
    //function to update the state when the element detects a change
    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]:value
        });
    }

    handleClick = (event) => {
        event.preventDefault();

      if (!this.state.firstName || !this.state.lastName) {
          alert("First and Last name is required");
      } else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email))){
        alert("We need a valid email")
      } else if (this.state.password.length < 5 || this.state.retypePassword.length < 5) {
        alert(`Choose a more secure password ${this.state.firstName} ${this.state.lastName}`);
      } else{
        alert(`Hello ${this.state.firstName} ${this.state.lastName}`);
      }
      
        API.signUpNewUser({email:this.state.email,
                firstName:this.state.firstName,
                lastName:this.state.lastName,
                password:this.state.password,
                retypePassword: this.state.retypePassword,
                userName:this.state.userName,
                image:null,
                imageType:null})
     
        .then(function(data){
            console.log("You signed up!");
        })
        .catch(function(error){
            console.log(error);
        });
    }

    render() {
        return (
            <div>

                {/*<!-- sign-up form -->*/}
                <div className="card form-area ">
                    <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                        <div className="card card-body form-area ">
                            {/*<!-- <h3 className="text-center mb-4">Sign-up</h3> -->*/}
                            <fieldset>
                                <form>
                                    <div className="form-group has-error">
                                        <input className="form-control input-md form-input"
                                            placeholder="Username (letters and numbers only)"
                                            name="userName"
                                            type="text"
                                            autoComplete="username"
                                            value={this.state.userName}
                                            onChange={this.handleChange}/>
                                    </div>
                                    <div className="form-inline mb-3">
                                        <div className="form-group has-error">
                                            <input className="form-control input-md form-input"
                                                placeholder="First Name"
                                                name="firstName"
                                                type="text"
                                                value={this.state.firstName}
                                                onChange={this.handleChange}/>
                                        </div>
                                        <div className="form-group has-error">
                                            <input className="form-control input-md form-input"
                                                placeholder="Last Name"
                                                name="lastName"
                                                type="text"
                                                value={this.state.lastName}
                                                onChange={this.handleChange}
                                                id="last-name"/>
                                        </div>
                                    </div>
                                    <div className="form-group has-error">
                                        <input className="form-control input-md form-input"
                                            placeholder="E-mail Address"
                                            name="email"
                                            autoComplete="email"
                                            type="email" value={this.state.email}
                                            onChange={this.handleChange} />
                                    </div>
                                    <div className="form-group has-success">
                                        <input className="form-control input-md form-input"
                                            placeholder="Password"
                                            name="password"
                                            type="password"
                                            autoComplete="new-password"
                                            value={this.state.password}
                                            onChange={this.handleChange}/>
                                    </div>
                                    <div className="form-group has-success">
                                        <input className="form-control input-md form-input"
                                            placeholder="Confirm Password"
                                            name="retypePassword"
                                            type="password"
                                            autoComplete="new-password"
                                            value={this.state.retypePassword}
                                            onChange={this.handleChange}/>
                                    </div>
                                    <div className="checkbox">
                                        <label className="small">
                                            <input name="terms" type="checkbox"/> I have read and agree to the <Link to="toa.html" target="_blank">terms of service</Link>
                                        </label>
                                    </div>
                                    <input className="btn btn-md btn-block form-btn"
                                        value="Sign Me Up"
                                        type="submit"
                                        id="signup-btn"
                                        onClick={this.handleClick}/>
                                </form>
                            </fieldset>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Signup;