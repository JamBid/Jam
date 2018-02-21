import React, {Component} from 'react';
import './ProductNew.css';

import QA from '../QA';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

import API from '../../utils/API';
import ProdImages from '../ProdImages';


class ProductNew extends Component {

    constructor (props) {
        super(props)
        this.state = {
          startDate: moment(),
          prodInfo: {
            mages: []
          }
        };
        this.handleChange = this.handleChange.bind(this);
      }
      
    
      handleChange(date) {
        this.setState({
          startDate: date
        });
      }

      loadProd = () => {
        let prodId = window.location.pathname.substr(window.location.pathname.lastIndexOf("/"));

        API.getProduct(prodId)
        .then( res => {
            console.log(res)
            this.setState({prodInfo: res.data})
        })
        .catch(err => console.log(err))
    }

    
    render() {
        return (
            <div>
                {/*<!-- New Product form -->*/}
                <div className="row">

                    {/* media pane */}
                    <div className="col-5">
                        {/* <ProdImages images={this.state.prodInfo.images} /> */}

                        <div className="card-image">
                            <img className="product-img" src={'https://cdn.pixabay.com/photo/2018/02/17/19/25/mammal-3160684_960_720.jpg'} />
                        </div>
                    </div>
                    
                    {/* bid pane */}
                    <div className="col-7">
                        {/* card */}
                        <div className="card form-area">
                            <div className="card-body form-area">
                                <h4 className="card-title">New Product</h4>
                                {/* <hr className="hr-full"/> */}

                                {/* form */}
                                <form action='' method='POST' className="form-sign-up" encType="multipart/form-data">
                                    {/* title */}
                                    <div className="form-group">
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text field-title form-btn-b">Title</span>
                                            </div>
                                            <textarea name="email" className="form-control field-title form-input"></textarea>
                                        </div>
                                    </div>

                                    {/* category */}
                                    <div className="form-group form-input">
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text form-btn-b">Category</span>
                                            </div>
                                            <select className="form-control category-dropdown" >
                                                <option></option>
                                                <option disabled>Automotives</option>
                                                <option>Cars</option>
                                                <option>SUVs</option>
                                                <option>Parts</option>
                                                <hr/>
                                                <option disabled>Electronics</option>
                                                <option>Phones</option>
                                                <option>Computers</option>
                                                <option>Parts</option>
                                                <hr/>
                                                <option disabled>Furniture</option>
                                                <option>Indoor</option>
                                                <option>Outdoor</option>
                                                <option>Antique</option>
                                                <hr/>
                                            </select>
                                        </div>
                                    </div>

                                    {/* end time */}
                                    <div className="form-group form-input">
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text input-md form-btn-b">End Time:</span>
                                            </div>
                                            <DatePicker
                                                className=""
                                                selected={this.state.startDate}
                                                onChange={this.handleChange}
                                                showTimeSelect
                                                timeIntervals={30}
                                                dateFormat="LLL"
                                            />
                                        </div>
                                    </div>

                                    {/* add image */}
                                    <ul className="nav nav-pills mb-3 form-toggle" id="pills-tab" role="tablist">
                                        <li className="nav-item w-50 text-center">
                                            <a className="nav-link form-toggle active" id="img-url-tab" data-toggle="pill" href="#img-url" role="tab" aria-selected="true">Add Image URL</a>
                                        </li>
                                        <li className="nav-item w-50 text-center">
                                            <a className="nav-link form-toggle" id="img-upload-tab" data-toggle="pill" href="#img-upload" role="tab" aria-selected="false">Upload Image</a>
                                        </li>
                                    </ul>
                                    <div className="tab-content" id="pills-tabContent">
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
                                            <div className="form-group">
                                                <input type="file" className="form-control-file form-input" name="imgUpload" aria-describedby="fileHelp"/>
                                                <small className="form-text text-muted">File should be less than 1 mb</small>
                                            </div>
                                        </div>
                                    </div>
                                    {/* submit */}
                                    <input className="btn btn-md btn-block form-btn" value="Update" type="submit" id="update" />
                                </form>

                            </div> {/*  -card-body */}
                        </div> {/*  -card */}
                    </div> {/*  -card */}
                </div> {/*  -row */}

                {/* description */}
                <div className="row mt-5">
                    <div className="col-12">
                        <div className="card">
                            <h4 className="card-header form-header">Description</h4>
                            <div className="card-block">
                                <textarea type="text" className="form-control form-textarea-e" name="description" placeholder="Be thorough!"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* return policy */}
                <div className="row mt-5">
                    <div className="col-12">
                        <div className="card">
                            <h4 className="card-header form-header">Policy</h4>
                            <div className="card-block">
                                <textarea type="text" className="form-control form-textarea-e" name="policy" placeholder="Be thorough!"></textarea>
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

export default ProductNew;
