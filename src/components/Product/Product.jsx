import React, {Component} from 'react';
import io from 'socket.io-client';
import { Route } from 'react-router-dom';


import '../Product.css';
import list from '../../categoryList';

import API from '../../utils/API';

import Questions from '../Questions';
import TimeRemaining from '../TimeRemaining';
import ProdImages from '../ProdImages';
import Map from '../Map';


class Product extends Component {
    constructor(props){
        super(props);

        this.state = {
            userId: props.userId||null,
            id: "",
            prodName: "",
            category: "",
            description: "",
            startingPrice:"",
            location: "",
            endTimestamp: "",
            sellerName: "",
            sellerId: "",
            images: [],
            socket: null,
            allowBids:false,
            userBid: 0,
            highestBid:{
                amount:null
            }
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
    }

    componentWillReceiveProps(nextProps){
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

    //function to determine if the bidding should be allowed
    setAllowBid = (flag) => {
        if(this.state.allowBids !== flag)
            this.setState({allowBids:flag});
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
                console.log(msg)
            
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

    render() {
        let keys = Object.keys(list);
        return (
            <div>
                {/* Product */}

                {/*<!-- New Product form -->*/}
                <div className="row">

                    {/* bid pane */}
                    <div className="col-md-7 col-sm-12">
                        {/* card */}
                        <div className="card form-area">
                            <div className="card-body form-area form-shrink">

                                {/* form */}
                                <form action='' method='POST' className="form-sign-up" encType="multipart/form-data">
                                    
                                    {/* title */}
                                    <div className="form-group">
                                        <div className="form-control form-header text-center">
                                            <h5 id="title">{this.state.prodName}</h5>
                                        </div> 
                                    </div>

                                    {/* category */}
                                    <div className="form-group field-area">
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text form-btn-b">Category</span>
                                            </div>
                                            <label className="form-control form-input">
                                                {keys.map((k,i) => (
                                                    list[k] === this.state.category ? <span key={"pc_"+i} className="input-text">{k}</span>:null
                                                ))}
                                            </label>
                                        </div>
                                    </div>

                                    {/* seller */}
                                    <div className="form-group field-area">
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text form-btn-b">Seller</span>
                                            </div>
                                            <label className="form-control form-input">
                                                <u><Route render={({history})=>
                                                    <span className="form-text" style={{cursor: "pointer"}}
                                                        onClick={() => {history.push(`/account`, {viewUser:this.state.sellerId})}}>
                                                            {this.state.sellerName}
                                                    </span>
                                                    }/>
                                                </u>
                                            </label>
                                        </div>
                                    </div>

                                    {/* location */}
                                    <div className="form-group field-input">
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text form-btn-b">Location</span>
                                            </div>
                                            <label className="form-control form-input">
                                                <span className="input-text" id="location">{this.state.location ? this.state.location : 'No Location Provided'}</span>                                            
                                            </label> 
                                        </div>
                                    </div>

                                    {/* end time */}
                                    <div className="form-group field-input form-shrink">
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text input-md form-btn-b">End Time</span>
                                            </div>
                                            <label className="form-control form-input">
                                                <TimeRemaining time={this.state.endTimestamp} setAllowBid={this.setAllowBid}/>
                                            </label> 
                                        </div>
                                    </div>

                                    <div className="input-group d-flex justify-content-between">
                                        {/* high bid */}
                                        <div className="form-group split">
                                                <div className="input-group">
                                                    <label className="form-control form-header text-center">
                                                        {this.state.highestBid.amount ? "Highest Bid" : "Starting Price"}
                                                    </label>                                            
                                                    <div className="input-group">
                                                        <div className="input-group-prepend">
                                                            <span className="form-btn-b" id="dollar-sign"> $ </span>
                                                        </div>
                                                        <label className="form-control form-textarea form-input text-center" id="high-bid">
                                                            {this.state.highestBid.amount ? this.state.highestBid.amount : this.state.startingPrice}
                                                        </label>                                         
                                                    </div>
                                                </div> {/* -bid-group */}
                                            </div>

                                        {/* user bid */}
                                        {this.state.userId && this.state.allowBids && this.state.userId !== this.state.sellerId ? 
                                            <div className="form-group split">
                                                <div className="input-group">
                                                    <label className="form-control form-header text-center">
                                                        Your Bid
                                                    </label>                                            
                                                    <div className="input-group">
                                                        <div className="input-group-prepend">
                                                            <span className="form-btn-b" id="dollar-sign"> $ </span>
                                                        </div>
                                                        <input
                                                            type="text"
                                                            className="form-control form-textarea form-input text-center"
                                                            name="userBid"
                                                            value={this.state.yourBid}
                                                            onChange={this.handleChange}/>
                                                        <div className="input-group-append">
                                                            <button className="btn btn-md form-btn" type="submit" onClick={this.sendBid}>Bid</button>
                                                        </div>                                         
                                                    </div>
                                                </div> {/* -input-group */}
                                            </div>
                                         :null}
                                    </div>  {/* -input-group */}

                                </form>
                            </div> {/* -card body */}
                        </div> {/* -card form */}
                    </div> {/* -col */}

                    {/* media pane */}
                    <div className="col-md-4  col-sm-12 h-100">
                        <ProdImages  images={this.state.images} />
                    </div>

                </div>  {/* -row */}

                {/* map */}
                {this.state.location? <Map address={this.state.location}/> :null}

                {/* description */}
                <div className="form-group">
                    <div className="col-12">
                        <div className="card form-input">
                            <h4 className="card-header form-header">Description</h4>
                            <div className="card-body">
                                <span id="description">{this.state.description}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* return policy */}
                <div className="form-group">
                    <div className="col-12">
                        <div className="card form-input">
                            <h4 className="card-header form-header">Policy</h4>
                            <div className="card-body">
                                <span id="policy">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, officiis aliquam quidem ex veritatis maxime perspiciatis sed ducimus. Harum hic perspiciatis cumque architecto et, maiores suscipit reiciendis eligendi fuga ratione.</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* question answer */}
                <Questions productId={this.state.id} userId={this.state.userId} socket={this.state.socket}/>
            </div>
        )
    }
}

export default Product;