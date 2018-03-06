import React, {Component} from 'react';
import API from '../../utils/API';
import './Signup.css';


class Signup extends Component {
    constructor(props){
        super(props);

        this.state = {
            email: {value:"", isValid: true, message:[], isRequired: true},
            firstName:{value:"", isValid: true, message:[], isRequired: true},
            lastName:{value:"", isValid: true, message:[], isRequired: true},
            password: {value:"", isValid: true, message:[], isRequired: true},
            retypePassword: {value:"", isValid: true, message:[], isRequired: true},
            userName: {value:"", isValid: true, message:[], isRequired: true},
            image: {value:"", isValid: true, message:[], isRequired: true},
            terms: {value: false , isValid: true, message:[], isRequired: true}
        }
    }
    //function to update the state when the element detects a change
    handleChange = (event) => {
      
        const name = event.target.name;
        let value = "";
        const type = event.target.type;

        if(type === 'checkbox')
            value = event.target.checked;
        else
            value = event.target.value.trim();

        let obj = this.state[name];
        obj.value = value;

        this.setState({
            [name]:obj
        });
    }

    handleClick = (event) => {

        event.preventDefault();

        for(let i in this.state)
            this.formValidation(i);

        if (!this.checkForErrors()) {
            let obj = this;
            let userName = this.state.userName;

        API.signUpNewUser({
                email:this.state.email.value,
                firstName:this.state.firstName.value,
                lastName:this.state.lastName.value,
                password:this.state.password.value,
                userName:this.state.userName.value,
                image:this.state.image.value,
                imageType:null})

        .then(function(result){
            if(result.data.status === 'good')
                console.log("You signed up!");
            else{
                userName.isValid = false;
                userName.message.push(result.data.msg);

                obj.setState({userName:userName})
            }
        })
        .catch(function(error){
            console.log(error);
        });
    }
}

    formValidation = (name) => {
        let valid = true;
        let obj = this.state[name];
        let errorMsg = [];

        if (name === "userName"){
            if (this.state[name].isRequired && !this.state[name].value){
                errorMsg.push(`Username field is Required`);
                valid = false;
            }
            else{
                if(this.state[name].value.length < 4){
                    errorMsg.push("Username is too short");
                    valid = false;
                }

                if(!this.state[name].value.match(/^[a-zA-Z0-9_.-]*$/)) {
                    errorMsg.push("Use letters and numbers for Username");
                    valid = false;                
                }
            }
        }
        else if(name === "email"){
            if(this.state[name].isRequired && !this.state[name].value){
                errorMsg.push(`Email field is Required`);
                valid = false;
            }
            else{
                if(!this.state[name].value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
                    errorMsg.push("invalid Email");
                    valid = false;
                }
            }
        }
        else if(name === "firstName"){
            if(this.state[name].isRequired && !this.state[name].value){
                errorMsg.push(`First name field is Required`);
                valid = false;
            }
            else{
                if(this.state[name].value.match(/^[0-9]+$/)){
                    errorMsg.push(`Numbers are not allowed`);
                    valid = false;
                }
            }
        }
        else if(name === "lastName"){
            if(this.state[name].isRequired && !this.state[name].value){
                errorMsg.push(`Last name field is Required`);
                valid = false;
            }
            else{
                if(this.state[name].value.match(/^[0-9]+$/)){
                    errorMsg.push(`Numbers are not allowed`);
                    valid = false;
                }
            }
        }
        else
         if(name === "password"){
            if(this.state[name].isRequired && !this.state[name].value){
                errorMsg.push(`Password field is Required`);
                valid = false;   
            }
            else{
                if(this.state[name].value.length < 4 && this.state[name].value === ""){
                    errorMsg.push("Password is too short");
                    valid = false;
                }
            }
        }
        else if(name === "retypePassword"){
            if(this.state[name].isRequired && !this.state[name].value){
                errorMsg.push(`Confirm your password field is Required`);
                valid = false;   
            }
            else{
                if(this.state[name].value !== this.state.password.value){
                    errorMsg.push("Password and Confirm Password does not match");
                    valid = false;
                }
            }
        }
        else if(name === "terms"){
            if(this.state[name].isRequired && !this.state[name].value){
                errorMsg.push("Please indicate you agree with Terms and Conditions");
                valid = true;
            }
        }

        obj.isValid = valid;
        obj.message = errorMsg;

        this.setState({[name]:obj})
        
    }


    handleFocusOut = (event) => {
        const name = event.target.name;

        this.formValidation(name);
        
    }

    checkForErrors = () =>{
        let errorFound = false;

        for(let i in this.state){
            if(!this.state[i].isValid)
                errorFound = true;
        }

        return errorFound;
    }
    

    render() {

      let keys = Object.keys(this.state);

       return (
            <div>

                {/*<!-- sign-up form -->*/}
                <div className="card form-area">
                    <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                        {/*<!-- error modal display -->*/}
                            <div className="card card-body form-area ">
                            {this.checkForErrors() ?
                                <div className="alert alert-danger">
                                    {keys.map((k,i) =>(
                                        this.state[k].message.map((m,j) =>(
                                            <p key={i+"_"+j}>* {m}</p>
                                        ))
                                    ))}
                                </div>
                            :null}

                            {/*<!-- <h3 className="text-center mb-4">Sign-up</h3> -->*/}
                            <fieldset>
                                <form>
                                    <div className="form-group">
                                        <input className={this.state.userName.isValid ? "form-control input-md form-input" : "form-control input-md form-input error"}
                                            placeholder="Username (letters and numbers only)"
                                            name="userName"
                                            type="text"
                                            autoComplete="username"
                                            value={this.state.userName.value}
                                            onChange={this.handleChange} 
                                            onBlur={this.handleFocusOut}/>
                                    </div>
                                    <div className="form-row mb-3">
                                        <div className="col-6 r-pad">
                                            <input className={this.state.firstName.isValid ? "form-control input-md form-input" : "form-control input-md form-input error"}
                                                placeholder="First Name"
                                                name="firstName"
                                                type="text"
                                                value={this.state.firstName.value}
                                                onChange={this.handleChange}
                                                onBlur={this.handleFocusOut} />
                                        </div>
                                        <div className="col-6 l-pad">
                                            <input className={this.state.lastName.isValid ? "form-control input-md form-input" : "form-control input-md form-input error"}
                                                placeholder="Last Name"
                                                name="lastName"
                                                type="text"
                                                value={this.state.lastName.value}
                                                onChange={this.handleChange}
                                                id="last-name"
                                                onBlur={this.handleFocusOut} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <input className={this.state.email.isValid ? "form-control input-md form-input" : "form-control input-md form-input error"}
                                            placeholder="E-mail Address"
                                            name="email"
                                            autoComplete="email"
                                            type="email" value={this.state.email.value}
                                            onChange={this.handleChange} 
                                            onBlur={this.handleFocusOut} />
                                    </div>

                                    <div className="form-row mb-3">
                                        <div className="col-6 r-pad">
                                            <input className={this.state.password.isValid ? "form-control input-md form-input" : "form-control input-md form-input error"}
                                                placeholder="Password"
                                                name="password"
                                                type="password"
                                                autoComplete="new-password"
                                                value={this.state.password.value}
                                                onChange={this.handleChange}
                                                onBlur={this.handleFocusOut} />
                                        </div>
                                        <div className="col-6 l-pad">
                                            <input className={this.state.retypePassword.isValid ? "form-control input-md form-input" : "form-control input-md form-input error"}
                                                id="confirm-password"
                                                placeholder="Confirm Password"
                                                name="retypePassword"
                                                type="password"
                                                autoComplete="new-password"
                                                value={this.state.retypePassword.value}
                                                onChange={this.handleChange}
                                                onBlur={this.handleFocusOut} />
                                        </div>
                                    </div>
                                    <div className="checkbox">
                                        <label className="small">
                                            <input 
                                            className={this.state.image.isValid ? "form-control input-md form-input" : "form-control input-md form-input error"}
                                            type="checkbox"
                                            name="terms" 
                                            checked ={this.state.terms.value}
                                            onChange={this.handleChange}
                                            onBlur={this.handleFocusOut}/> I have read and agree to the terms of service.
                                        </label>
                                    </div>
                                    <div className="form-group">
                                        <input 
                                        type="file" 
                                        className={this.state.image.isValid ? "form-control input-md form-input" : "form-control input-md form-input error"}
                                        name="image"
                                        value={this.state.image.value}
                                        onChange={this.handleChange}
                                        onBlur={this.handleFocusOut} />
                                    </div>


                                    <input className="btn btn-md btn-block form-btn"
                                        value="Sign Me Up"
                                        type="submit"
                                        id="signup-btn"
                                        onClick={this.handleClick} />
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