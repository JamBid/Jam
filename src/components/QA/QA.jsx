import React, {Component} from 'react';

class QA extends Component {
    render() {
        return (
            <div>
                {/* question answer */}
                <div className="row mt-5">
                    <div className="col-12">
                        <div className="card">
                            <h4 className="card-header form-header">Q&A</h4>
                            <div className="card-block">
                                <div id="accordion-qa" className="">

                                    {/* 1 */}
                                    <div className="card accordion ">
                                        <div className="card-header accordion-header">
                                        <h5 className="mb-0">
                                            <button className="btn" data-toggle="collapse" data-target="#1" aria-expanded="true" aria-controls="collapseOne">
                                            Question 1
                                            </button>
                                        </h5>
                                        </div>
                                        <div id="1" className="collapse show" data-parent="#accordion-qa">
                                            <div className="card-body">
                                                Answer 1
                                            </div>
                                            <div className="card-footer accordion-footer">
                                                {/* answer button */}
                                                <div className="form-group">
                                                    <div className="input-group">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text form-btn-b">Answer</span>
                                                        </div>
                                                        <input className="form-control form-input"  name="answer" /> 
                                                        <div className="input-group-append">
                                                            <button className="btn btn-md btn-block form-btn" type="submit">Submit</button>
                                                        </div>
                                                    </div>  {/*  -input-group */}
                                                </div> {/*  -form-group */}
                                            </div> {/*  -card-footer */}
                                        </div> {/*  -accordian content */}
                                    </div> {/*  -card */}

                                    {/* 2 */}
                                    <div className="card accordion ">
                                        <div className="card-header accordion-header">
                                        <h5 className="mb-0">
                                            <button className="btn collapsed" data-toggle="collapse" data-target="#2" aria-expanded="false" aria-controls="collapseTwo">
                                                Question 2
                                            </button>
                                        </h5>
                                        </div>
                                        <div id="2" className="collapse" data-parent="#accordion-qa">
                                            <div className="card-body">
                                                Answer 2
                                            </div>
                                             <div className="card-footer accordion-footer">
                                                {/* answer button */}
                                                <div className="form-group">
                                                    <div className="input-group">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text form-btn-b">Answer</span>
                                                        </div>
                                                        <input className="form-control form-input"  name="answer" /> 
                                                        <div className="input-group-append">
                                                            <button className="btn btn-md btn-block form-btn" type="submit">Submit</button>
                                                        </div>
                                                    </div>  {/*  -input-group */}
                                                </div> {/*  -form-group */}
                                            </div> {/*  -card-footer */}
                                        </div> {/*  -accordian content */}
                                    </div> {/*  -card */}

                                    {/* 3 */}
                                    <div className="card accordion ">
                                        <div className="card-header accordion-header">
                                        <h5 className="mb-0">
                                            <button className="btn collapsed" data-toggle="collapse" data-target="#3" aria-expanded="false" aria-controls="collapseThree">
                                                Question 3
                                            </button>
                                        </h5>
                                        </div>
                                        <div id="3" className="collapse" data-parent="#accordion-qa">
                                            <div className="card-body">
                                                Answer 3
                                            </div>
                                            <div className="card-footer accordion-footer">
                                                {/* answer button */}
                                                <div className="form-group">
                                                    <div className="input-group">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text form-btn-b">Answer</span>
                                                        </div>
                                                        <input className="form-control form-input"  name="answer" /> 
                                                        <div className="input-group-append">
                                                            <button className="btn btn-md btn-block form-btn" type="submit">Submit</button>
                                                        </div>
                                                    </div>  
                                                </div> {/*  -form-group */}
                                            </div> {/*  -card-footer */}
                                        </div> {/*  -accordian content */}
                                    </div> {/*  -card */}
                                </div> {/*  -accordian-qa */}

                            </div> {/* -card-block */}
                        </div> {/*  -card */}
                    </div> {/* -col-12 */}
                </div> {/* -row */}

            </div>
        )
    }
}

export default QA;