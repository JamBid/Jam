import React, {Component} from 'react';
import './Account.css';


class Account extends Component {
    render() {
        return (
            <div>

                {/*<!-- Account -->*/}
                <div className="input-group mb-3 info">
                    {/* email */}
                    <div className="input-group-prepend">
                        <span className="input-group-text info" id="">Email:</span>
                    </div>
                    <textarea name="email" className="update-task form-control update">email@gmail.com</textarea>
                </div>

                <div className="input-group mb-3 info">
                    {/*  first name */}
                    <div className="input-group-prepend">
                        <span className="input-group-text info">First Name: </span>
                    </div>
                    <textarea name="firstName" className="update-task form-control update">firstName</textarea>
                    {/* last name */}
                    <div className="input-group-prepend">
                        <span className="input-group-text info">Last Name:</span>
                    </div>
                    <textarea name="lastName" className="update-task form-control update" >lastName</textarea>
                </div>
                <div className="input-group mb-3 info">
                    {/* password */}
                    <div className="input-group-">
                        <span className="input-group-text info" id="">Password:</span>
                    </div>
                    <input name="password" type="password" className="form-control" />
                </div>

                <img id='profile-picture'  src={"https://lh3.googleusercontent.com/AkTbUA_l8OICZ7xKGMY3-w0_kgCIRz_yEXMOYgHokTR9P_vszUvdp4udMP_o4VaCDkg=w300-rw"} className="img-fluid rounded profile-picture"/>

                {/* upload - new profile picture */}
                <div className="form-group">
                    <label for="profilepic"><i className="fas fa-image"></i> Profile Picture</label>
                    <input type="file" className="form-control-file" id="upload-btn" name="uploadFile" aria-describedby="fileHelp"/>
                    <small name="fileHelp" className="form-text text-muted">File should be less than 3 mb</small>
                </div>

                <div className="input-group mb-3 info">
                    {/* URL - new profile picture */}
                    <div className="input-group-prepend">
                        <span className="input-group-text info" id="">URL: </span>
                    </div>
                    <textarea name="" className="update-task form-control update">
                        https://pkief.gallerycdn.vsassets.io/extensions/pkief/markdown-checkbox/1.1.1/1515486227107/Microsoft.VisualStudio.Services.Icons.Default
                    </textarea>
                </div>

                <button className="btn btn-md btn-primary" id="submit" type="submit">Submit</button>

            </div>
        )
    }
}

export default Account;