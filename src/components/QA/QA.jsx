import React, {Component} from 'react';

class QA extends Component {
    render() {
        return (
            <div>
                    {/* QA cards */}
                    <div className="card mb-3">
                        <div className="card-block">
                            <h5 className="card-title">Question.....?</h5>
                            <p className="card-subtitle mb-2 text-muted">February 17th 2018, 1:06:33 pm</p>
                            <p className="card-text">Answer......!</p>
                        </div>
                    </div>


                    {/* QA form */}
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text info" id="">Question: </span>
                        </div>
                        <textarea name="newQuestion" className="update-task form-control update">
                        </textarea>
                        <div className="input-group-append">
                            <input className="btn btn-md btn-primary" value="Submit" type="submit" />
                        </div>
                    </div>
            </div>
        )
    }
}

export default QA;