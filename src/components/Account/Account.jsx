import React, {Component} from 'react';
import API from '../../utils/API';
import './Account.css';


class Account extends Component {
    constructor(props){
        super(props);

        this.state = {
            userId: 1,//props.userId,
            userInfo: {
                userName:"",
                firstName:"",
                lastName:"",
                email:""
            },
            edit: false,
            editPassword: false,
            editInfo: {
                userName:"",
                firstName:"",
                lastName:"",
                email:""
            },
            password:"",
            retypePassword:""
        }
    }

    componentDidMount() {
        this.loadUser();
    }

    //function for loading user info
    loadUser = () => {
        API.getUser(this.state.userId)
        .then( res => {
            this.setState({userInfo: res.data[0]})
        })
        .catch(err => console.log(err))
    }

    //function to submit change to server
    saveUserChanges = (event) => {
        event.preventDefault();
        let obj = this;
        //builds the object to pass
        let userChange = {};
        if(this.state.editInfo.firstName !== ""){
            userChange = {
                'firstName':this.state.editInfo.firstName,
                'lastName':this.state.editInfo.lastName,
                'email':this.state.editInfo.email
            };
        }

        //checks if the password should be added
        if(this.state.password !== ""){
            if(this.state.password === this.state.retypePassword){
                userChange.password = this.state.password;
            }
        }
        
        if(userChange !== {}){
            API.saveUserChange(userChange, this.state.userId)
            .then(function(data){
                //object used to determine what has updated
                let newUserInfo = obj.state.userInfo;

                //builds the new current info if there are changes
                for(let i in userChange){
                    if(i !== 'password')
                        newUserInfo[i] = userChange[i];
                }

                //updates the component
                obj.setState({
                    userInfo: newUserInfo,
                    edit: false,
                    editPassword: false,
                    editInfo: {
                        userName:"",
                        firstName:"",
                        lastName:"",
                        email:""
                    },
                    password:"",
                    retypePassword:""
                });
            })
            .catch(function(error){
                console.log(error);
            })
        }
    }

    //function to toggle to edit fields
    setEdit = (event) => {
        event.preventDefault();
        let obj = this.state.userInfo;

        this.setState({
            edit: true,
            editInfo: obj
        });
    }

    //function to toggle to cancel edit of fields
    cancelEdit = (event) => {
        this.setState({
            edit: false,
            editInfo: {}
        });

        this.cancelPassword();
    }

    //function to toggle to edit of password
    setPassword = (event) => {
        this.setState({
            editPassword: true
        });
    }

    //function to toggle to cancel edit of password
    cancelPassword = (event) => {
        this.setState({
            editPassword: false,
            password: "",
            retypePassword: ""
        });
    }

    //function to handle changes of value for the edit fields
    handleInput = (event) => {
        //this is needed to break from linking to the json in memory
        let editData = {
            userName:this.state.editInfo.userName,
            firstName:this.state.editInfo.firstName,
            lastName:this.state.editInfo.lastName,
            email:this.state.editInfo.email
        }

        const name = event.target.name;
        const value = event.target.value;

        editData[name] =value;
        this.setState({editInfo:editData});
    }

    //function to handle the change of values for the password fields
    handlePasswordChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-12 text-center">
                        <img id='profile-picture' src={this.state.userInfo.image} className="img-fluid rounded profile-picture" alt=""/>
                    </div>
                    <div className="col-12 text-center">
                        <h2>{this.state.userInfo.firstName} {this.state.userInfo.lastName}</h2>
                    </div>
                </div>
                <div>
                    <div className="row w-50 mx-auto">
                        <div className="col-12">
                            <h3 className="float-left">Personal Info</h3>
                            {!this.state.edit ?
                                <button className="btn btn-info float-right round-button" onClick={this.setEdit}>
                                    <i className="fa fa-pencil"></i>
                                </button>
                            : null}
                        </div>
                        <form className="w-100">
                            <div className="form-group">
                                <label htmlFor="userName" className="col-6 float-left">Username:</label>
                                <input type="text"
                                    name="userName"
                                    className={`col-6 ${!this.state.edit ? "form-control-plaintext":"form-control-plaintext"} float-left`}
                                    readOnly={!this.state.edit ? true : true}
                                    value={!this.state.edit ? this.state.userInfo.userName : this.state.editInfo.userName}
                                    onChange={this.handleInput}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="userName"className="col-6 float-left">First Name:</label>
                                <input type="text"
                                    name="firstName"
                                    className={`col-6 ${!this.state.edit ? "form-control-plaintext":"form-control"} float-left`}
                                    readOnly={!this.state.edit ? true : false}
                                    value={!this.state.edit ? this.state.userInfo.firstName : this.state.editInfo.firstName}
                                    onChange={this.handleInput}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="userName" className="col-6 float-left">Last Name:</label>
                                <input type="text"
                                    name="lastName"
                                    className={`col-6 ${!this.state.edit ? "form-control-plaintext":"form-control"} float-left`}
                                    readOnly={!this.state.edit ? true : false}
                                    value={!this.state.edit ? this.state.userInfo.lastName : this.state.editInfo.lastName}
                                    onChange={this.handleInput}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="userName" className="col-6 float-left">Email:</label>
                                <input type="email"
                                    name="email"
                                    className={`col-6 ${!this.state.edit ? "form-control-plaintext":"form-control"} float-left`}
                                    readOnly={!this.state.edit ? true : false}
                                    value={!this.state.edit ? this.state.userInfo.email : this.state.editInfo.email}
                                    onChange={this.handleInput}/>
                            </div>
                            {this.state.editPassword ?
                                <div>
                                    <br/>
                                    <br/>
                                    <div className="form-group">
                                        <label htmlFor="userName">Password:</label>
                                        <input type="password" name="password" className="form-control" value={this.state.password} onChange={this.handlePasswordChange}/>
                                        <label htmlFor="userName">Re-type Password:</label>
                                        <input type="password" name="retypePassword" className="form-control" value={this.state.retypePassword} onChange={this.handlePasswordChange}/>
                                    </div>
                                </div>
                            :
                            null}
                            {this.state.edit ?
                                <div>
                                    <input className="btn btn-md btn-primary" value="Submit" readOnly onClick={this.saveUserChanges}/>
                                    <input className="btn btn-md btn-danger" value="Cancel" readOnly onClick={this.cancelEdit}/>
                                    {this.state.editPassword ?
                                        <input className="btn btn-md btn-primary" value="Cancel Password Change" readOnly onClick={this.cancelPassword}/>
                                    :
                                        <input className="btn btn-md btn-primary" value="Change Password" readOnly onClick={this.setPassword}/>
                                    }
                                </div>
                            : <div>
                                {this.state.editPassword ?
                                    <div>
                                        <input className="btn btn-md btn-primary" value="Submit" readOnly onClick={this.saveUserChanges}/>
                                        <input className="btn btn-md btn-primary" value="Cancel Password Change" readOnly onClick={this.cancelPassword}/>
                                    </div>
                                :
                                    <input className="btn btn-md btn-primary" value="Change Password" readOnly onClick={this.setPassword}/>
                                }
                              </div>
                            }
                            
                        </form>
                    </div>
                </div>
                }
            </div>
        )
    }
}

export default Account;