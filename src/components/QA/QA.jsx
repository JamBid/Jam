import React, {Component} from 'react';

class QA extends Component {
    render() {
        return (
            <div>
                {/* question answer */}
                <div className="row mt-5">
                    <div className="col-12">
                        <div class="card">
                            <h4 class="card-header form-header">Q&A</h4>
                            <div class="card-block">
                                <div id="accordion-qa" class="">

                                    {/* 1 */}
                                    <div class="card accordion ">
                                        <div class="card-header accordion-header">
                                        <h5 class="mb-0">
                                            <button class="btn" data-toggle="collapse" data-target="#1" aria-expanded="true" aria-controls="collapseOne">
                                            Question 1
                                            </button>
                                        </h5>
                                        </div>
                                        <div id="1" class="collapse show" data-parent="#accordion-qa">
                                            <div class="card-body">
                                                Answer 1
                                            </div>
                                            <div class="card-footer accordion-footer">
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
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 2 */}
                                    <div class="card accordion ">
                                        <div class="card-header accordion-header">
                                        <h5 class="mb-0">
                                            <button class="btn collapsed" data-toggle="collapse" data-target="#2" aria-expanded="false" aria-controls="collapseTwo">
                                            Question 2
                                            </button>
                                        </h5>
                                        </div>
                                        <div id="2" class="collapse" data-parent="#accordion-qa">
                                            <div class="card-body">
                                            Answer 2
                                            </div>
                                            <div class="card-footer accordion-footer">
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
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 3 */}
                                    <div class="card accordion ">
                                        <div class="card-header accordion-header">
                                        <h5 class="mb-0">
                                            <button class="btn collapsed" data-toggle="collapse" data-target="#3" aria-expanded="false" aria-controls="collapseThree">
                                            Question 3
                                            </button>
                                        </h5>
                                        </div>
                                        <div id="3" class="collapse" data-parent="#accordion-qa">
                                            <div class="card-body">
                                                Answer 3
                                                </div>
                                            <div class="card-footer accordion-footer">
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
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div> {/* -accordion-qa */}
                        </div> {/*  -card */}
                    </div> {/* -col-12 */}
                </div> {/* -row */}

            </div>
        )
    }
}

export default QA;