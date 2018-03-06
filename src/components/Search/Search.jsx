import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import API from '../../utils/API';
import './Search.css';

import list from '../../categoryList';

class Search extends Component {
    constructor(props){
        super(props);

        this.state = {
            products: [],
            search:props.location.search ? this.decodeUrl(props.location.search.split('=')) : "",
            category:props.location.state ? props.location.state.category :
                window.location.pathname.substr(window.location.pathname.lastIndexOf('/')+1,
                window.location.pathname.indexOf('?') >-1 ?
                window.location.pathname.indexOf('?')-window.location.pathname.lastIndexOf('/') :
                window.location.pathname.length - window.location.pathname.lastIndexOf('/')-1),
            update:props.location.state ? props.location.state.load : false //used to prevent a loop
        }
    }

    //function to decode the url for the search parameters
    decodeUrl(queryString){
        return decodeURIComponent(queryString[1]).trim();
    }

    componentDidMount() {
       this.loadSearchProds();
    }

    componentDidUpdate(){
        //this if is to prevent a loop
        if(!this.state.update)
            this.loadSearchProds();
    }

    componentWillReceiveProps(nextProps){
        let values = nextProps.location.search.split('=');
        values = this.decodeUrl(values);

        let category = nextProps.location.state ? nextProps.location.state.category :
                window.location.pathname.substr(window.location.pathname.lastIndexOf('/')+1,
                window.location.pathname.indexOf('?') >-1 ?
                window.location.pathname.indexOf('?')-window.location.pathname.lastIndexOf('/') :
                window.location.pathname.length - window.location.pathname.lastIndexOf('/')-1);

        let update = nextProps.location.state ? nextProps.location.state.load : false;

        this.setState(
            {
                search:values,
                category:category,
                update: update
            }
        )
    }

    loadSearchProds = () => {
        let category = list[this.state.category.substr(0,1).toUpperCase()+this.state.category.substr(1)];

        if(Array.isArray(category))
            category = category.join(",");
        else if(!category)
            category = this.state.category;

        API.getProdCategorySearch(category,this.state.search)
            .then( res => {
                this.setState({products: res.data,update:true})
            })
            .catch(err => console.log(err))
    }

    render() {
        let keys = Object.keys(list);
        return (
            <div>
                {/*<!-- search results -->*/}
                <div className="d-flex align-content-between flex-wrap justify-content-center">
                    {this.state.products.map((p,i) => (
                        i === 0 || p.category !== this.state.products[i-1].category ?
                            <div key={"c_"+(i+1)}>
                                {/*figures out the header name*/}
                                {keys.map((k,i) => (
                                    list[k] === p.category ?
                                    <h2 key={"h_"+i}>{k}</h2>
                                    :null
                                ))}
                                {this.state.products.map((p2,j) => (
                                    p2.category === p.category ?
                                    <div key={"p_"+(j+1)} className="p-2 my-flex-item">
                                        <Link to={`/product/${p2.id}`} >
                                            <div className="card card-area">
                                                <img className="card card-image search-image " src={p2.images[0].image} alt=""/>
                                                <div className="card-img-overlay search-img-overlay">
                                                    <p>{p2.prodName}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                :null))}
                            </div>
                        :
                        null
                    ))}
                </div>
            </div>
        )
    }
}

export default Search;