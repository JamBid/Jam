import React, {Component} from 'react';

class Signup extends Component {
    render() {
        return (
            <div>
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

                {/*<!-- sign-up form -->*/}
                <div className="card form-area ">
                    <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                        <div className="card card-body form-area ">
                            {/*<!-- <h3 className="text-center mb-4">Sign-up</h3> -->*/}
                            <fieldset>
                                <div className="form-group has-error">
                                    <input className="form-control input-md form-input" placeholder="Username (letters and numbers only)" name="userName" type="text" />
                                </div>
                                <div className="form-inline mb-3">
                                    <div className="form-group has-error">
                                        <input className="form-control input-md form-input" placeholder="First Name" name="firstName" type="text" />
                                    </div>
                                    <div className="form-group has-error">
                                        <input className="form-control input-md form-input" placeholder="Last Name" name="lastName" type="text" />
                                    </div>
                                </div>
                                <div className="form-group has-error">
                                    <input className="form-control input-md form-input" placeholder="E-mail Address" name="email" type="text" />
                                </div>
                                <div className="form-group has-success">
                                    <input className="form-control input-md form-input" placeholder="Password" name="password" type="password" />
                                </div>
                                <div className="form-group has-success">
                                    <input className="form-control input-md form-input" placeholder="Confirm Password" name="password" type="password" />
                                </div>
                                <div className="checkbox">
                                    <label className="small">
                                        <input name="terms" type="checkbox"/> I have read and agree to the <a href="toa.html" target="_blank">terms of service</a>
                                    </label>
                                </div>
                                <input className="btn btn-md btn-block form-btn" value="Sign Me Up" type="submit" id="signup-btn" />
                            </fieldset>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Signup;