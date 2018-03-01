import React, {Component} from 'react';
import moment from 'moment';
import API from '../../utils/API';
import Answers from '../Answers';

import './Questions.css';


class Questions extends Component {
    constructor(props){
        super(props);

        this.state = {
            prodId: props.productId,
            userId: props.userId || null,
            questions: [],
            socket: props.socket
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            prodId:nextProps.productId,
            userId: nextProps.userId,
            socket: nextProps.socket
        });
    }

    componentWillMount() {
        if(this.state.prodId)
            this.loadQs();
    }

    //promise function to get answers for a question
    getAs = (q) =>{
        return new Promise(function(resolve, reject){
            API.getAnswers(q.id)
            .then(answers => {
                q.answers = answers.data;
                return resolve(q);
            })
            .catch(function(error){
                return reject(error);
            });
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
            <div>
                {/* question answer */}
                <div className="form-group">
                    <div className="col-12">
                        <div className="card">
                            <h4 className="card-header form-header">Q&A</h4>
                            <div className="card-block">
                                <div id="accordion-qa" className="">
                                    {this.state.questions.map((q,i) => 
                                        <div key={i+1} className="card accordion">
                                            <div className="card-header accordion-header">
                                                <blockquote className="blockquote form-text" data-toggle="collapse" data-target={`#${i+1}`} aria-expanded="true" aria-controls="collapseOne">
                                                        <h5>{q.note}</h5> 
                                                        <footer className="blockquote-footer float-left">[username], {moment(q.createdTs).format('LLL')}</footer>
                                                </blockquote>
                                                <br/>
                                            </div>
                                            <div id={i+1} className={i===0?"collapse":"collapse"} data-parent="#accordion-qa">
                                                <Answers questionId={q.id} userId={this.state.userId} socket={this.state.socket} productId={this.state.prodId}/>
                                            </div> {/*  -accordian content */}
                                        </div>
                                    )}
                                </div> {/*  -accordian-qa */}

                            </div> {/* -card-block */}
                        </div> {/*  -card */}
                    </div> {/* -col-12 */}
                </div> {/* -row */}

            </div>
        )
    }
}

export default Questions;