import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import API from '../../utils/API';

class Searchpage extends Component {
    constructor(props){
        super(props);

        this.state = {
            products: [],
            search:props.location.search ? this.decodeUrl(props.location.search.split('=')) : "",
            category:props.location.state ? props.location.state.category : 'all',
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

        this.setState(
            {
                search:values,
                category:nextProps.location.state.category,
                update: nextProps.location.state.load
            }
        )
    }

    loadSearchProds = () => {
        API.getProdCategorySearch(this.state.category,this.state.search)
            .then( res => {
                this.setState({products: res.data,update:true})
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                {/*<!-- Homepage -->*/}
                <div className="container ">
                    <div className="d-flex align-content-between flex-wrap justify-content-center">
                        {this.state.products.map((p,i) => (
                            i === 0 || p.category !== this.state.products[i-1].category ?
                                <div key={"c_"+(i+1)} className="row">
                                    <h3>{p.category}</h3>
                                    {this.state.products.map((p2,j) => (
                                        p2.category === p.category ?
                                        <div key={"p_"+(j+1)} className="p-4 my-flex-item">
                                            <Link to={`/product/${p.id}`} >
                                                <div className="card rounded-circle border-dark">
                                                    <div className="card-body home-category text-center">
                                                        <img className="imgCard" src={p.images[0].image} alt=""/>
                                                        <p>{p.prodName}</p>
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
            </div>
        )
    }
}

export default Searchpage;