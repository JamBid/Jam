import React, {Component} from 'react';

class Signup extends Component {
    render() {
        return (
            <div>
                {/*<!-- options: sign up or login  -->*/}
                <div className="card text-center" id="accordian-header">
                    <div className="card-body">
                        <div className="btn-group btn-group-toggle" data-toggle="buttons">
                        <label className="btn btn-outline-success active" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            <input type="radio" name="options" checked /> Sign Up
                        </label>
                        <label className="btn btn-outline-primary" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            <input type="radio" name="options" /> Login
                        </label>
                        </div>
                    </div>
                </div>

                {/*<!-- sign-up form -->*/}
                <div className="card">
                    <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                        <div className="card card-body">
                            {/*<!-- <h3 className="text-center mb-4">Sign-up</h3> -->*/}
                            <fieldset>
                                <div className="form-group has-error">
                                    <input className="form-control input-md" placeholder="Name" name="name" type="text" />
                                </div>
                                <div className="form-group has-error">
                                    <input className="form-control input-md" placeholder="E-mail Address" name="email" type="text" />
                                </div>
                                <div className="form-group has-success">
                                    <input className="form-control input-md" placeholder="Password" name="password" value="" type="password" />
                                </div>
                                <div className="form-group has-success">
                                    <input className="form-control input-md" placeholder="Confirm Password" name="password" value="" type="password" />
                                </div>
                                <div className="checkbox">
                                    <label className="small">
                                        <input name="terms" type="checkbox" /> I have read and agree to the <a href="toa.html" target="_blank">terms of service</a>
                                    </label>
                                </div>
                                <input className="btn btn-md btn-primary btn-block" value="Sign Me Up" type="submit" />
                            </fieldset>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Signup;