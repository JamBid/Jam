import React, {Component} from 'react';
import API from '../../utils/API';
import './homepage.css';

class Homepage extends Component {
    constructor(props){
        super(props);

        this.state = {
            products: []
        }
    }

    componentDidMount() {
        this.loadRecentProds();
    }

    loadRecentProds = () => {
        API.getRecentProducts()
            .then( res => {
                console.log(res)
                this.setState({products: res.data})
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                {/*<!-- Homepage -->*/}
                <div className="container ">
                    <div className="d-flex align-content-between flex-wrap justify-content-center">
                        {this.state.products.map(p => (
                            <div className="p-4 my-flex-item">
                                <a href={`/prod/${p.id}`} >
                                    <div className="card rounded-circle border-dark">
                                        <div className="card-body home-category text-center">
                                            <img className="imgCard" src={p.images[0].image} alt=""/>
                                            <p>{p.prodName}</p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        ))}
                        {/*<div className="p-4 my-flex-item">
                            <div className="card rounded-circle border-dark">
                                <div className="card-body home-category">
                                    <img src={carPng} alt=""/>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 my-flex-item">
                            <div className="card rounded-circle border-dark">
                                <div className="card-body home-category">
                                    <img src={carPng} alt=""/>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 my-flex-item">
                            <div className="card rounded-circle border-dark">
                                <div className="card-body home-category">
                                    <img src={carPng} alt=""/>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 my-flex-item">
                            <div className="card rounded-circle border-dark">
                                <div className="card-body home-category">
                                    <img src={carPng} alt=""/>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 my-flex-item">
                            <div className="card rounded-circle border-dark">
                                <div className="card-body home-category">
                                    <img src={carPng} alt=""/>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 my-flex-item">
                            <div className="card rounded-circle border-dark">
                                <div className="card-body home-category">
                                    <img src={carPng} alt=""/>
                                </div>
                            </div>
                        </div>*/}
                    
                    </div>
                </div>
            </div>
        )
    }
}

export default Homepage;