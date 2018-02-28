import React, {Component} from 'react';
import io from 'socket.io-client';
import '../Product.css';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

import API from '../../utils/API';
import list from '../../categoryList';

import QA from '../QA';
import TimeRemaining from '../TimeRemaining';
import ProdImages from '../ProdImages';


class ProductNew extends Component {
    constructor(props){
        super(props);

        this.state = {
            userId: props.userId||null,
            id: "",
            sellerId: "",
            prodName: "",
            category: "",
            location: "",
            endTimestamp: "",
            startingPrice:"",
            socket: null,
            highestBid:{
                amount:"None"
            },
            images: [],
            description: "",
            policy: "",
        }
    }

    componentWillMount() {
        let prodId = window.location.pathname.substr(window.location.pathname.lastIndexOf("/")+1);
        this.setState({
            id: prodId,
            socket: io("/prod")
        })
        this.loadProd(prodId);
    }

    componentDidMount(){
        this.state.socket.emit('room', this.state.id);
        this.receive();
        console.log("I mounted")

        console.log(this.state);
    }

    componentWillReceiveProps(nextProps){
        console.log("I got a new id")
        this.setState({userId:nextProps.userId})
    }

    //function for loading user info
    loadProd = (prodId) => {
        let obj = this;
        API.getProduct(prodId)
        .then( res => {
            let prod = res.data;
            API.getUser(prod.sellerId)
            .then(seller => {
                prod.sellerName = seller.data[0].userName;

                this.setState(prod,obj.getHighBid)
            });
        })
        .catch(err => console.log(err))
    }

    //function to retrieve highest bid
    getHighBid = () => {
        let obj = this;
        API.getHighestBid(this.state.id)
        .then( res => {
            if(res.data.length > 0)
                obj.setState({highestBid:res.data[0]})
        })
        .catch(err => console.log(err))
    }

    //method to receive messages from socket
    receive = () => {
        this.state.socket.on('bid', (msg) => {
            console.log(msg);
            if(msg.msg === 'success')
                this.getHighBid();
            else if(msg.msg === 'too low')
                console.log("too low")
            else
                console.log(msg.msg)
            
        });
    }

    // method for emitting a socket.io event
    sendBid = (e) => {
        console.log('sending to socket')
        e.preventDefault();

        if(this.state.userBid !== 0){
            if(isNaN(parseFloat(this.state.userBid)) === false)
                this.state.socket.emit('bid', {room: this.state.id,
                                                "msg":{
                                                    bid:Math.round(parseFloat(this.state.userBid*100))/100,
                                                    prodId: this.state.id,
                                                    userId:this.state.userId
                                                }
            });
            else
                console.log("Not a bid")
        }
        else
            console.log("bid must be greater than 0")
    }

    //function that is used when there is a change on an input
    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]:value
        });
    }

    //function that generates a list of options from a specific formatted JSON
    getList(){
        let keys = Object.keys(list);

        return(
            <select className='form-control category-dropdown' name="select" onChange={this.handleSelectChange}>
                {/* category dropdown */}
                <option disabled selected value>{this.state.category}</option>
                {keys.map((ele, i) => {
                    if(Array.isArray(list[ele]) && i !== 0)
                        return(
                            [<option key={i+"_hr"} className="select-hr" disabled/>,
                            <option key={i} path={ele} value={list[ele]} disabled={Array.isArray(list[ele])?true:false}>{ele}</option>]
                        )
                    else
                        return <option key={i} path={ele} value={list[ele]} disabled={Array.isArray(list[ele])?true:false}>{ele}</option>
                })}
            </select>
            )
        }


    render() {
        return (
            <div>
                <form action='' method='POST' className="form-sign-up mt-3" encType="multipart/form-data">

                    {/*<!-- New Product form -->*/}
                    <div className="row">

                        {/* bid pane */}
                        <div className="col-md-7 col-sm-12">
                            {/* card */}
                            <div className="card form-area">
                                <div className="card-body form-area form-shrink">
                                
                                    {/* submit form */}
                                    <div className="form-group">
                                        <input className="btn btn-md btn-block" value="Update Ad" type="submit" id="submit-btn" />
                                    </div>

                                    {/* form */}
                                        {/* title */}
                                        <div className="form-group">
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text form-btn-b">Title</span>
                                                </div>
                                                <input
                                                    type="text"
                                                    className="form-control form-textarea form-input"
                                                    name="prodNAme"
                                                    value={this.state.prodName}
                                                    onChange={this.handleChange}/> 
                                            </div>
                                        </div>

                                        {/* category */}
                                        <div className="form-group form-input">
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text form-btn-b">Category</span>
                                                </div>
                                                {this.getList()}
                                            </div>
                                        </div>

                                        {/* category */}
                                        <div className="form-group">
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text form-btn-b">Location</span>
                                                </div>
                                                <input
                                                    type="text"
                                                    className="form-control form-textarea form-input"
                                                    name="location"
                                                    value={this.state.location}
                                                    onChange={this.handleChange}/> 
                                            </div>
                                        </div>

                                        {/* end time */}
                                        <div className="form-group form-input">
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text input-md form-btn-b">End Time</span>
                                                </div>
                                                <DatePicker
                                                    selected={this.state.endTimestamp}
                                                    onChange={this.handleChange}
                                                    showTimeSelect
                                                    timeIntervals={30}
                                                    dateFormat="LLL"
                                                />
                                                {/* <TimeRemaining time={this.state.endTimestamp} setAllowBid={this.setAllowBid}/> */}
                                            </div>
                                        </div>

                                        <div className="input-group d-flex justify-content-between">
                                            {/* high bid */}
                                            <div className="form-group split">
                                                    <div className="input-group">
                                                        <label className="form-control form-header text-center">
                                                            Highest Bid
                                                        </label>                                            
                                                        <div className="input-group">
                                                            <div className="input-group-prepend">
                                                                <span className="form-btn-b" id="dollar-sign"> $ </span>
                                                            </div>
                                                            <label className="form-control form-textarea form-input text-center" id="high-bid">
                                                                {this.state.highestBid.amount}
                                                            </label>                                         
                                                        </div>
                                                    </div> {/* -bid-group */}
                                                </div>

                                                {/* minimum bid bid */}
                                                <div className="form-group split">
                                                    <div className="input-group">
                                                        <label className="form-control form-header text-center">
                                                            Minimum Bid
                                                        </label>                                            
                                                        <div className="input-group">
                                                            <div className="input-group-prepend">
                                                                <span className="form-btn-b" id="dollar-sign"> $ </span>
                                                            </div>
                                                            <input
                                                                type="text"
                                                                className="form-control form-textarea form-input text-center"
                                                                name="startingPrice"
                                                                value={this.state.startingPrice}
                                                                onChange={this.handleChange}/>                                      
                                                        </div>
                                                    </div> {/* -input-group */}
                                                </div>
                                        </div>  {/* -input-group */}

                                        {/* add image */}
                                        <div className="form-group form-shrink">
                                        {/* <div className="card-area"> */}
                                            <ul className="nav nav-pills form-toggle" id="pills-tab" role="tablist">
                                                <li className="nav-item w-50 text-center">
                                                    <a className="nav-link form-toggle active" id="img-url-tab" data-toggle="pill" href="#img-url" role="tab" aria-selected="true">Add Image URL</a>
                                                </li>
                                                <li className="nav-item w-50 text-center">
                                                    <a className="nav-link form-toggle" id="img-upload-tab" data-toggle="pill" href="#img-upload" role="tab" aria-selected="false">Upload Image</a>
                                                </li>
                                            </ul>

                                            <div className="card-body form-shrink">
                                                <div className="tab-content form-shrink" id="pills-tabContent">
                                                    {/* image URL */}
                                                    <div className="tab-pane fade show active" id="img-url" role="tabpanel" aria-labelledby="pills-image-tab">
                                                        <div className="form-group">
                                                            <div className="input-group">
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text form-btn-b">URL</span>
                                                                </div>
                                                                <input className="form-control form-input"  name="imgUrl" /> 
                                                            </div>
                                                            <small className="form-text text-muted">File types:  .png .jpg .jpeg</small>
                                                        </div>
                                                    </div>
                                                    {/* image upload */}
                                                    <div className="tab-pane fade" id="img-upload" role="tabpanel" aria-labelledby="pills-upload-tab">
                                                        <div className="form-group ">
                                                            <input type="file" className="form-control form-input" multiple/>
                                                            <small className="form-text text-muted">File should be less than 1 mb</small>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                </div> {/*  -card-body */}
                            </div> {/*  -card */}
                        </div> {/*  -card */}

                        {/* media pane */}
                        <div className="col-md-5 col-sm-12 mb-5 text-center">
                            {/* <ProdImages images={this.state.prodInfo.images} /> */}
                            <ProdImages  images={this.state.images} />
                        </div>
                        
                    </div> {/*  -row */}

                    {/* description */}
                    <div className="form-group">
                        <div className="col-12">
                            <div className="card">
                                <h4 className="card-header form-header">Description</h4>
                                <div className="card-block">
                                    <textarea type="text" className="form-control form-textarea-e" name="description" placeholder="500 character max">{this.state.description}</textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* return policy */}
                    <div className="form-group">
                        <div className="col-12">
                            <div className="card">
                                <h4 className="card-header form-header">Policy</h4>
                                <div className="card-block">
                                    <textarea type="text" className="form-control form-textarea-e" name="policy" placeholder="500 character max">{this.state.policy}</textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* question answer */}
                    <QA productId={this.state.id}/>

                </form>
            </div>
        )
    }
}

export default ProductNew;
