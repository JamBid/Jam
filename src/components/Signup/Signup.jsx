import React, {Component} from 'react';
import API from '../../utils/API';
import './Signup.css';

//Validation dependencies
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Button from 'react-validation/build/button';
import { isEmail } from 'validator';

//Validation functions
const required = (value, props) => {
  if (!value || (props.isCheckable && !props.checked)) {
    return <span className="form-error is-visible">Required</span>;
  }
};

const letterNumber = /^[a-zA-Z0-9\-_]{4,10}$/;

const userName = (value) =>{
if (!value.match(letterNumber)){
    return <span className="form-error is-visible">
    {value} Your Username can be 4-10 characters and it must consist of letters and numbers only.</span>;
    }
};

const email = (value) => {
  if (!isEmail(value)) {
    return <span className="form-error is-visible">${value} is not a valid email.</span>;
  }
};

const isEqual = (value, props, components) => {
  const bothUsed = components.password[0].isUsed && components.confirm[0].isUsed;
  const bothChanged = components.password[0].isChanged && components.confirm[0].isChanged;

  if (bothChanged && bothUsed && components.password[0].value !== components.confirm[0].value) {
    return <span className="form-error is-visible">Passwords are not equal.</span>;
  }
};

class Signup extends Component {
    constructor(props){
        super(props);
    
        this.state = {
            email: "",
            firstName:"",
            lastName:"",
            password: "",
            retypePassword:"",
            userName:"",
            image:""
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
      
        API.signUpNewUser({email:this.state.email,
                firstName:this.state.firstName,
                lastName:this.state.lastName,
                password:this.state.password,
                retypePassword: this.state.confirm,
                userName:this.state.userName,
                image:this.state.image
                })
     
        .then(function(data){
            console.log("You signed up!");
        })
        .catch(function(error){
            console.log(error);
        });
    }

    render() 
        {
        return (
          <div>
            <Form>
            <div className="form-group has-error">
                <Input className="form-control input-md form-input"
                    placeholder="Username (letters and numbers only)*"
                    name="userName"
                    type="text"
                    autoComplete="username"
                    value={this.state.userName}
                    onChange={this.handleChange}
                    validations= {[required, userName]} />    
            </div>
             <div className="form-inline mb-3">
                 <div className="form-group has-error">
                 <Input className="form-control input-md form-input"
                    placeholder="First Name*"
                    name="firstName"
                    type="text"
                    value={this.state.firstName}
                    onChange={this.handleChange} 
                    validations= {[required]} />
                </div>
                 <div className="form-group has-error">
                 <Input className="form-control input-md form-input"
                    placeholder="Last Name*"
                    name="lastName"
                    type="text"
                    value={this.state.lastName}
                    onChange={this.handleChange}
                    validations= {[required]} />
            </div>
            </div>
            <div className="form-group has-error">
                <Input className="form-control input-md form-input"
                    placeholder="E-mail Address*"
                    name="email"
                    autoComplete="email"
                    type="email" value={this.state.email}
                    onChange={this.handleChange} 
                    validations= {[required, email]} />
            </div>
            <div className="form-inline mb-3">
                <div className="form-group has-success">
                <Input className="form-control input-md form-input"
                    placeholder="Password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    validations= {[required, isEqual]} />
                </div>
                <div className="form-group has-success">
                <Input className="form-control input-md form-input" 
                    placeholder="Confirm Password"
                    name="confirm"
                    type="password"
                    autoComplete="new-password"
                    value={this.state.confirm}
                    onChange={this.handleChange}
                    validations= {[required, isEqual]} />
                </div>
            </div>
            <div className="checkbox">
                <label className="small">
                 <Input name="terms" 
                    type="checkbox"
                    value="1"
                    validations= {[required]} /> I have read and agree to the terms of service.               
                </label>
            </div>
            <div className="form-group">
                 <Input type="file" className="form-control form-input"
                    placeholder="Image"
                    name="image"
                    value={this.state.image}
                    onChange={this.handleChange}
                    validations= {[required]} />
            </div>
            <div className="row">
                <div className="small-12 medium-6 columns">
                <Button 
                type="submit"
                name="button" 
                onSubmit={this.handleClick}>Submit</Button>

                </div>
            </div>
            </Form>
          </div>
        )
    }
}

export default Signup;