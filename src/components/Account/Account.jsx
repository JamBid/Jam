import React, {Component} from 'react';
import API from '../../utils/API';
import './Account.css';


class Account extends Component {
    constructor(props){
        super(props);

        this.state = {
            userId: 1, //this should be props.userId
            userInfo: {}
        }
    }

    componentDidMount() {
        this.loadUser();
    }


    //function for loading user info
    loadUser = () => {
        API.getUser(this.state.userId)
        .then( res => {
            console.log(res.data[0])
            this.setState({userInfo: res.data[0]})
        })
        .catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                {/*<!-- Account -->*/}
                <div className="input-group mb-3 info">
                    {/* email */}
                    <div className="input-group-prepend">
                        <span className="input-group-text info">Email:</span>
                    </div>
                    <textarea name="email" className="update-task form-control update" value={this.state.userInfo.email}></textarea>
                </div>

                <div className="input-group mb-3 info">
                    {/*  first name */}
                    <div className="input-group-prepend">
                        <span className="input-group-text info">First Name: </span>
                    </div>
                    <textarea name="firstName" className="update-task form-control update" value={this.state.userInfo.firstName}></textarea>
                    {/* last name */}
                    <div className="input-group-prepend">
                        <span className="input-group-text info">Last Name:</span>
                    </div>
                    <textarea name="lastName" className="update-task form-control update" value={this.state.userInfo.lastName}></textarea>
                </div>
                <div className="input-group mb-3 info">
                    {/* password */}
                    <div className="input-group-">
                        <span className="input-group-text info">Password:</span>
                    </div>
                    <input name="password" type="password" className="form-control" />
                </div>

                <img id='profile-picture'  src={this.state.userInfo.image} className="img-fluid rounded profile-picture"/>

                {/* upload - new profile picture */}
                <div className="form-group">
                    <label><i className="fas fa-image"></i> Profile Picture</label>
                    <input type="file" className="form-control-file" id="upload-btn" name="uploadFile" aria-describedby="fileHelp"/>
                    <small name="fileHelp" className="form-text text-muted">File should be less than 3 mb</small>
                </div>

                <div className="input-group mb-3 info">
                    {/* URL - new profile picture */}
                    <div className="input-group-prepend">
                        <span className="input-group-text info" id="">URL: </span>
                    </div>
                    <textarea name="" className="update-task form-control update" value={this.state.userInfo.image}>
                    </textarea>
                </div>

                <button className="btn btn-md btn-primary" id="submit" type="submit">Submit</button>

            </div>
        )
    }
}

export default Account;