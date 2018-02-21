import React, {Component} from 'react';

class Login extends Component {
    constructor(props){
        super(props);

        this.state = {
            userName: "",
            password: "",
            handleClick: props.onClick
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
    }

    render() {
        return (
            <div>
                {/*<!-- login form -->*/}
                <div className="card form-area">
                    <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                        <div className="card-body">
                            {/*<!--  <h3 className="text-center mb-4">Login</h3> -->*/}
                            <fieldset>
                                <div className="form-group has-error">
                                    <input className="form-control input-md form-input" placeholder="Username" name="userName" value={this.state.userName} onChange={this.handleChange} type="text" />
                                </div>
                                <div className="form-group has-success">
                                    <input className="form-control input-md form-input" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange} type="password" />
                                </div>
                                <button className="btn btn-md btn-block form-btn" onClick={this.handleClick} type="submit" id="login-btn">Login</button>
                            </fieldset>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;