import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import jwt from 'jsonwebtoken';
import '../Product.css';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

import API from '../../utils/API';
import list from '../../categoryList';

// import ProdImages from '../ProdImages';


class ProductNew extends Component {

    constructor (props) {
        super(props)

        this.state = {
            cert: props.cert,
            prodName: "",
            category: "",
            description: "",
            startingPrice: 0,
            location: "",
            endTimestamp: moment(),
            sellerId: props.userId,
            images: [{
                val: "",
                type: "",
                file: null
            }],
            imageCount: 1,
            success:false,
            newProdId:null
        };
    }

    componentWillMount() {
        let obj = this;
        let token = JSON.parse(sessionStorage.getItem("JamBid"));
        if(token){
            if(token.token)
                jwt.verify(token.token, obj.state.cert, (err, decode) => {
                if(err) console.log("err",err);

                if(decode)
                    obj.setState({sellerId:decode.userId});
                });
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({sellerId:nextProps.userId});
    }
      
    //function that is used when there is a change on an input
    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]:value
        });
    }

    //function that is used when there is a change on an input
    handleImageChange = (event) => {
        const name = parseInt(event.target.name, 10);
        let value = event.target.value;
        const type = event.target.getAttribute('imagetype');
        let file = null;
        
        if(type === 'file')
            file = event.target.files[0];
        
        //uses non-mutator method to insert the change into the array
        let obj = this.state.images;
        obj = [
            ...obj.slice(0,name),
            {val:value, type:type, file:file},
            ...obj.slice(name+1)
        ]

        this.setState({
            images:obj
        });
    }

    //function that is used when there is a change on date picker
    handleDateChange = (event) => {
        this.setState({
            endTimestamp:event
        });
    }

    //function to choose to add more than 1 image
    handleImageCount = (event) => {
        event.preventDefault();

        const value = this.state.imageCount +1;

        if(value < 5){
            //uses non-mutator method to insert the change into the array
            let obj = this.state.images;
            obj = [
                ...obj.slice(0,value),
                {val: "",type: "",file: null}
            ]

            this.setState({
                imageCount:value,
                images:obj
            })
        }
    }

    //function handle changing image type
    handleImageTypeChange = (event) =>{
        event.preventDefault();

        const type = event.target.getAttribute('imagetype');
        const name = parseInt(event.target.name, 10);
        
        //uses non-mutator method to insert the change into the array
        let obj = this.state.images;
        obj = [
            ...obj.slice(0,name),
            {val:"", type:type, file:null},
            ...obj.slice(name+1)
        ]
 
        this.setState({
            images:obj
        })
    }

    //function to submit the new prod info
    handleSubmit =(event) =>{
        event.preventDefault();
        let obj = this;

        API.insertNewProd({
            prodName: this.state.prodName,
            category: this.state.category,
            description: this.state.description,
            startingPrice: this.state.startingPrice,
            location: this.state.location,
            endTimestamp: this.state.endTimestamp,
            sellerId: this.state.sellerId,
            images: this.state.images
        })
        .then(res => {
            obj.setState({newProdId:res.data,success:true});
        })
        .catch(err => {
            console.log(err)
        })
    }

    //function that generates a list of options from a specific formatted JSON
    getList(){
        let keys = Object.keys(list);

        return(
            <select className='form-control category-dropdown' defaultValue="" name="category" onChange={this.handleChange}>
                {/* category dropdown */}
                <option disabled value=""></option>
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

    //function to generate the image upload section
    getHtmlImageUpload =() =>{
        let obj = [];

        for(let i = 0; i < this.state.imageCount; i++){
            obj.push([<ul key={`fileTog_${i}`} className="nav nav-pills form-toggle" id="pills-tab" role="tablist">
                        <li className="nav-item w-50 text-center">
                            <a name={i}
                                imagetype="file"
                                onClick={this.handleImageTypeChange}
                                className="nav-link form-toggle active"
                                id="img-url-tab"
                                data-toggle="pill"
                                href={`#img-url_${i}`}
                                role="tab"
                                aria-selected="true">
                                    Add Image URL
                            </a>
                        </li>
                        <li className="nav-item w-50 text-center">
                            <a name={i}
                                imagetype="url"
                                onClick={this.handleImageTypeChange}
                                className="nav-link form-toggle"
                                id="img-upload-tab"
                                data-toggle="pill"
                                href={`#img-upload_${i}`}
                                role="tab"
                                aria-selected="false">
                                    Upload Image
                            </a>
                        </li>
                    </ul>,

                    <div key={`fileInput_${i}`} className="card-body form-shrink">
                        <div className="tab-content form-shrink" id="pills-tabContent">
                            {/* image URL */}
                            <div className="tab-pane fade show active" id={`img-url_${i}`} role="tabpanel" aria-labelledby="pills-image-tab">
                                <div className="form-group">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text form-btn-b">URL</span>
                                        </div>
                                        <input className="form-control form-input"
                                            name={`${i}`}
                                            onChange={this.handleImageChange}
                                            value={this.state.images[i].val}
                                            imagetype="url"
                                            /> 
                                    </div>
                                    <small className="form-text text-muted">File types:  .png .jpg .jpeg</small>
                                </div>
                            </div>
                            {/* image upload */}
                            <div className="tab-pane fade" id={`img-upload_${i}`} role="tabpanel" aria-labelledby="pills-upload-tab">
                                <div className="form-group ">
                                    <input type="file"
                                        className="form-control form-input"
                                        onChange={this.handleImageChange}
                                        value={this.state.images[i].type === 'file' ? this.state.images[i].val : ""}
                                        name={`${i}`}
                                        imagetype="file"
                                        multiple/>
                                    <small className="form-text text-muted">File should be less than 1 mb</small>
                                </div>
                            </div>
                        </div>
                    </div>
                ])
            }

        return(
            obj
        )
    }


    render() {
        return (
            <div>
                {!this.state.sellerId ? <Redirect to="/"/>:null}
                {this.state.success && this.state.newProdId ? <Redirect to={`/product/${this.state.newProdId}`}/>:null}
                <form className="form-sign-up mt-3">

                    {/*<!-- New Product form -->*/}
                    <div className="row">

                        {/* bid pane */}
                        <div className="col-md-7 col-sm-12">
                            {/* card */}
                            <div className="card form-area">
                                <div className="card-body form-area form-shrink">
                                
                                    {/* submit form */}
                                    <div className="form-group">
                                        <button className="btn btn-md btn-block" type="submit" id="submit-btn" onClick={this.handleSubmit}>Create Ad</button>
                                    </div>

                                    {/* form */}
                                        {/* title */}
                                        <div className="form-group">
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text field-title form-btn-b">Title</span>
                                                </div>
                                                <textarea name="prodName"
                                                    className="form-control field-title form-input"
                                                    value={this.state.prodName}
                                                    onChange={this.handleChange}>
                                                </textarea>
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

                                        {/* location */}
                                        <div className="form-group">
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text form-btn-b">Location</span>
                                                </div>
                                                <input className="form-control form-input"
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
                                                    onChange={this.handleDateChange}
                                                    showTimeSelect
                                                    timeIntervals={30}
                                                    dateFormat="LLL"
                                                />
                                            </div>
                                        </div>

                                        {/* location */}
                                        <div className="form-group">
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text form-btn-b">Min Price</span>
                                                </div>
                                                <input type='number'
                                                    className="form-control form-input"
                                                    name="startingPrice"
                                                    value={this.state.startingPrice}
                                                    onChange={this.handleChange}/> 
                                            </div>
                                        </div>

                                        {/* add image */}
                                        {this.state.imageCount < 4 ?
                                            <button onClick={this.handleImageCount} name="imageCount">Add More Image</button>
                                        :null}
                                        <div className="form-group form-shrink">
                                        {/* <div className="card-area"> */}
                                            {this.getHtmlImageUpload()}
                                        </div>

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
                    <div className="form-group">
                        <div className="col-12">
                            <div className="card">
                                <h4 className="card-header form-header">Description</h4>
                                <div className="card-block">
                                    <textarea type="text"
                                        className="form-control form-textarea-e"
                                        name="description"
                                        placeholder="500 character max"
                                        value={this.state.description}
                                        onChange={this.handleChange}>
                                    </textarea>
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
                                    <textarea type="text" className="form-control form-textarea-e" name="policy" placeholder="500 character max"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                </form>
            </div>
        )
    }
}

export default ProductNew;
