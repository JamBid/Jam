import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

import './ProductNew.css';
import API from '../../utils/API';
import list from '../../categoryList';

// import ProdImages from '../ProdImages';


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

    //function that generates a list of options from a specific formatted JSON
    getList(){
        let keys = Object.keys(list);

        return(
            <select className='form-control category-dropdown' name="select" onChange={this.handleSelectChange}>
                {/* category dropdown */}
                <option disabled selected value></option>
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
                {/*<!-- New Product form -->*/}
                <div className="row">

                    {/* bid pane */}
                    <div className="col-md-7 col-sm-12">
                        {/* card */}
                        <div className="card form-area">
                            <div className="card-body form-area form-shrink">
                                {/* submit form */}
                                <input className="btn btn-md btn-block" value="Create Ad" type="submit" id="submit-btn" />
                                {/* <hr className="hr-full"/> */}

                                {/* form */}
                                <form action='' method='POST' className="form-sign-up mt-3" encType="multipart/form-data">
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
                                                {this.getList()}
                                        </div>
                                    </div>

                                    {/* category */}
                                    <div className="form-group">
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text form-btn-b">Location</span>
                                            </div>
                                            <input className="form-control form-input"  name="imgUrl" /> 
                                        </div>
                                    </div>

                                    {/* end time */}
                                    <div className="form-group form-input">
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text input-md form-btn-b">End Time</span>
                                            </div>
                                            <DatePicker
                                                selected={this.state.startDate}
                                                onChange={this.handleChange}
                                                showTimeSelect
                                                timeIntervals={30}
                                                dateFormat="LLL"
                                            />
                                        </div>
                                    </div>

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
                                </form>

                            </div> {/*  -card-body */}
                        </div> {/*  -card */}
                    </div> {/*  -card */}

                    {/* media pane */}
                    <div className="col-md-5 col-sm-12 mb-5 text-center">
                        {/* <ProdImages images={this.state.prodInfo.images} /> */}
                        <img className="product-img mx-auto mt-5" src={'https://cdn.pixabay.com/photo/2018/02/17/19/25/mammal-3160684_960_720.jpg'} alt="stock" />
                    </div>
                    
                </div> {/*  -row */}

                {/* description */}
                <div className="row mt-2">
                    <div className="col-12">
                        <div className="card">
                            <h4 className="card-header form-header">Description</h4>
                            <div className="card-block">
                                <textarea type="text" className="form-control form-textarea-e" name="description" placeholder="500 character max"></textarea>
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
                                <textarea type="text" className="form-control form-textarea-e" name="policy" placeholder="500 character max"></textarea>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default ProductNew;
