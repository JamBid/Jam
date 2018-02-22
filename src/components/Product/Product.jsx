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
        this.loadProd();
    }

    //function for loading user info
    loadProd = () => {
        let prodId = window.location.pathname.substr(window.location.pathname.lastIndexOf("/"));

        API.getProduct(prodId)
        .then( res => {
            let prod = res.data;
            API.getUser(prod.sellerId)
            .then(seller => {
                console.log(seller)
                prod.sellerName = seller.data[0].userName;

                this.setState(prod)
            });
        })
        .catch(err => console.log(err))
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
                                                <TimeRemaining time={this.state.endTimestamp}/>
                                            </label> 
                                        </div>
                                    </div>

                                    {/* high bid */}
                                    <div className="form-group">
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text form-btn-b">High Bid</span>
                                            </div>
                                            <label className="form-control form-input">
                                                <span id="high-bid"> $50.00 (REPLACE ME)</span>
                                            </label> 
                                        </div>
                                    </div>

                                    {/* user bid */}
                                    <div className="form-group">
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text form-btn-b">Your Bid:</span>
                                            </div>
                                            <textarea className="form-control form-textarea" name="userBid">$30.00 (REPLACE ME)</textarea>
                                            <div className="input-group-append">
                                                <button className="btn btn-md btn-block form-btn" type="submit">Submit</button>
                                            </div>
                                        </div>
                                    </div>

                                </form>
                            </div> {/* -card body */}
                        </div> {/* -card form */}
                    </div> {/* -col */}
                </div>  {/* -row */}

                {/* map */}
                <div className="row mt-5">
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
                <QA />

                </div>








        )
    }
}

export default Product;