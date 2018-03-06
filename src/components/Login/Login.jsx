import React, {Component} from 'react';

class Login extends Component {
    constructor(props){
        super(props);

        this.state = {
            userName: "",
            password: "",
            handleClickLogin: props.onClick,
            toggle: props.toggle
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

    handleClickLogin = (event) => {
        event.preventDefault();
        this.state.handleClickLogin(this.state.userName, this.state.password, this.state.toggle);
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({userName: nextProps.userName, password:nextProps.password})
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
                                <form>
                                    <div className="form-group has-error">
                                        <input className="form-control input-md form-input" autoComplete="username" placeholder="Username" name="userName" value={this.state.userName} onChange={this.handleChange} type="text" />
                                    </div>
                                    <div className="form-group has-success">
                                        <input className="form-control input-md form-input" autoComplete="current-password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange} type="password" />
                                    </div>
                                    <button className="btn btn-md btn-block form-btn" onClick={this.handleClickLogin} type="submit" id="login-btn">Login</button>
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