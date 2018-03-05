import React, {Component} from 'react';
import API from '../../utils/API';

class Login extends Component {
    constructor(props){
        super(props);

        this.state = {
            userName: {value: '', isValid: true, message:[], isRequire: true},
            password: {value: '', isValid: true, message:[], isRequire: true}
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

        this.state.handleClick(this.state.userName, this.state.password);
 
         for(let i in this.state)
            this.formValidation(i);

        if (!this.checkForErrors()) {
            let obj = this;
            let userName = this.state.userName;

        API.logUserIn({
                userName:this.state.userName.value,
                password:this.state.password.value
                
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
        })
    }
}

    formValidation = (name) => {
        let valid = true;
        let obj = this.state[name];
        let errorMsg = [];

        if (name === "userName"){
            if (this.state[name].isRequire && !this.state[name].value ){
                errorMsg.push(`Username field is Required`);
                valid = false;
            }
        }
        else if(name === "password"){
            if(this.state[name].value === ""){
                errorMsg.push(`Password field is Required`);
                valid = false;   
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
                {/*<!-- login form -->*/}
                <div className="card form-area">
                    <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
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
                            {/*<!--  <h3 className="text-center mb-4">Login</h3> -->*/}
                            <fieldset>
                                <form>
                                    <div className="form-group has-error">
                                        <input className={this.state.userName.isValid ? "form-control input-md form-input" : "form-control input-md form-input error"}
                                            placeholder="Username"
                                            name="userName"
                                            type="text"
                                            autoComplete="username"
                                            value={this.state.userName.value}
                                            onChange={this.handleChange} 
                                            onBlur={this.handleFocusOut}/>
                                    </div>
                                    <div className="form-group has-success">
                                        <input className={this.state.password.isValid ? "form-control input-md form-input" : "form-control input-md form-input error"}
                                            placeholder="Password"
                                            name="password"
                                            type="password"
                                            autoComplete="new-password"
                                            value={this.state.password.value}
                                            onChange={this.handleChange}
                                            onBlur={this.handleFocusOut}/>
                                    </div>
                                        <input className="btn btn-md btn-block form-btn"
                                        value="Login"
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

export default Login;