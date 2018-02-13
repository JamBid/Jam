import React, {Component} from 'react';

class Login extends Component {
    render() {
        return (
            <div>
                {/*<!-- login form -->*/}
                <div className="card">
                    <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                        <div className="card-body">
                        {/*<!--  <h3 className="text-center mb-4">Login</h3> -->*/}
                            <fieldset>
                                <div className="form-group has-error">
                                    <input className="form-control input-md" placeholder="E-mail Address" name="email" type="text" />
                                </div>
                                <div className="form-group has-success">
                                    <input className="form-control input-md" placeholder="Password" name="password" value="" type="password" />
                                </div>
                                <input className="btn btn-md btn-primary btn-block" value="Login" type="submit" />
                            </fieldset>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;