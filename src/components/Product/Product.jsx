import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import API from '../../utils/API';

import QA from '../QA';
import TimeRemaining from '../TimeRemaining';
import ProdImages from '../ProdImages';

class Product extends Component {
    constructor(props){
        super(props);

        this.state = {
            userId: null,
            id: "",
            prodName: "",
            category: "",
            description: "",
            startingPrice:"",
            location: "",
            endTimestamp: "",
            sellerName: "",
            sellerId: "",
            images: []
        }
    }

    componentWillMount() {
        let prodId = window.location.pathname.substr(window.location.pathname.lastIndexOf("/")+1);
        this.setState({
            id: prodId
        })
        this.loadProd(prodId);
    }

    componentWillReceiveProps(nextProps){
        this.setState({userId:nextProps.userId})
    }

    //function for loading user info
    loadProd = (prodId) => {
        API.getProduct(prodId)
        .then( res => {
            let prod = res.data;
            API.getUser(prod.sellerId)
            .then(seller => {
                prod.sellerName = seller.data[0].userName;

                this.setState(prod)
            });
        })
        .catch(err => console.log(err))
    }

    //function to determine if the bidding should be allowed
    setAllowBid = (flag) => {
        if(this.state.allowBids !== flag)
            this.setState({allowBids:flag});
    }

    

    render() {
        return (
            <div>
                {/* Product */}

                {/*<!-- New Product form -->*/}
                <div className="row">

                    {/* media pane */}
                    <div className="col-4 ml-auto m-5">
                        <ProdImages  images={this.state.images} />
                    </div>

                    {/* bid pane */}
                    <div className="col-7">
                        {/* card */}
                        <div className="card form-area">
                            <div className="card-body form-area">

                                {/* form */}
                                <form action='' method='POST' className="form-sign-up" encType="multipart/form-data">
                                    
                                    {/* title */}
                                    <div className="form-group">
                                        <div className="form-control form-header">
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
                                                <span className="input-text">{this.state.category}</span>
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
                                                <span className="input-text"><Link to={`/account/${this.state.sellerId}`}>{this.state.sellerName}</Link></span>
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
                                                <span className="input-text" id="location">{this.state.location}</span>                                            
                                            </label> 
                                        </div>
                                    </div>

                                    {/* end time */}
                                    <div className="form-group field-input">
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text input-md form-btn-b">End Time</span>
                                            </div>
                                            <label className="form-control form-input">
                                                <TimeRemaining time={this.state.endTimestamp} setAllowBid={this.setAllowBid}/>
                                            </label> 
                                        </div>
                                    </div>

                                    {/* high bid */}
                                    <div className="input-group d-flex justify-content-between">
                                        <div className="form-group split">
                                            <div className="input-group">
                                                    <label className="form-control form-header text-center">High Bid</label>                                            
                                                <div className="input-group">
                                                    <label className="form-control form-textarea form-input text-center" id="high-bid">$50.00 (REPLACE ME)</label>
                                                </div>
                                            </div>
                                        </div> 

                                        {/* user bid */}
                                        {this.state.userId && this.state.allowBids ?
                                            <div className="form-group split">
                                                <div className="input-group">
                                                        <label className="form-control form-header text-center" name="userBid">
                                                            Your Bid
                                                        </label>                                            
                                                    <div className="input-group">
                                                        <div className="input-group-prepend">
                                                            <span className="form-btn-b" id="dollar-sign"> $ </span>
                                                        </div>
                                                        <label contentEditable="true" type="text" className="form-control form-textarea form-input text-center" name="userBid"></label>
                                                        <div className="input-group-append">
                                                            <button className="btn btn-md form-btn" type="submit">Bid</button>
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
                </div>  {/* -row */}

                {/* map */}
                <div className="row mt-3">
                    <div className="col-12">
                        <div className="card form-input">
                                <h4 className="card-header form-header" data-toggle="collapse" data-target="#map" aria-expanded="true" aria-controls="collapseOne">MAP</h4>
                                <div className="card-body">
                                    <div id="accordion-map" className="">
                                        <div id="map" className="collapse" data-parent="#accordion-map">
                                            <div className="card-body">
                                                MAP GOES HERE
                                            </div>
                                        </div>
                                    </div>
                                </div> {/* -accordion-qa */}
                        </div> {/*  -card */}
                    </div> {/*  -col-12 */}
                </div> {/*  -row */}


                {/* description */}
                <div className="row mt-5">
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
                <div className="row mt-5">
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
                <QA productId={this.state.id}/>
            </div>
        )
    }
}

export default Product;