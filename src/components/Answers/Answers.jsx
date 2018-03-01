import React, {Component} from 'react';
import moment from 'moment';
import API from '../../utils/API';

import './Answers.css';


class Answers extends Component {
    constructor(props){
        super(props);

        this.state = {
            questionId: props.questionId,
            userId: props.userId || null,
            answers: props.answers || []
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            questionId:nextProps.questionId,
            userId: nextProps.userId,
            answers: nextProps.answers
        });
    }

    //function for loading user info
    loadQs = () => {
        let obj = this;

        API.getQuestions(this.state.prodId)
        .then( res => {
            let questions = res.data;
            //generates an array of the promises
            let qPromises = [];
            for(let i in questions){
                qPromises.push(this.getAs(questions[i]))
            }

            //runs through all the promises
            Promise.all(qPromises)
                .then(function(results){
                    obj.setState({questions:results});
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    }

    //function to submit an answer
    submitAnswer = (qId) => {

    }

    render() {
        return (
            [<div className="list-group list-group-flush">
                {this.state.answers.map((a,j) =>
                    <div key={j+1} className="list-group-item form-text">
                        <div>{a.note}</div>
                        <footer className="blockquote-footer float-left">[username], {moment(a.createdTs).format('LLL')}</footer>
                    </div>
                )}
            </div>,
            <div className="card-footer accordion-footer">
                {/* answer button */}
                <div className="form-group">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text form-btn-b">Answer</span>
                        </div>
                        <input className="form-control form-input" name="answer" /> 
                        <div className="input-group-append">
                            <button className="btn btn-md btn-block form-btn" type="submit">Submit</button>
                        </div>
                    </div>  {/*  -input-group */}
                </div> {/*  -form-group */}
            </div>]
        )
    }
}

export default Answers;