import React, {Component} from 'react';
import API from '../../utils/API';

import QA from '../QA';
import ProdImages from '../ProdImages';

class Product extends Component {
    constructor(props){
        super(props);

        this.state = {
            prodInfo: {
                images: []
            }
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
            console.log(res)
            this.setState({prodInfo: res.data})
        })
        .catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                {/* Product */}
                <ProdImages images={this.state.prodInfo.images} />
                <QA />
            </div>
        )
    }
}

export default Product;