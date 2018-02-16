import React, {Component} from 'react';
import carPng from './images/car.png';

class Homepage extends Component {
    render() {
        return (
            <div>
                {/*<!-- Homepage -->*/}
                <div className="container ">
                    <div className="d-flex align-content-between flex-wrap justify-content-center">
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
                        </div>
                        <div className="p-4 my-flex-item">
                            <div className="card rounded-circle border-dark">
                                <div className="card-body home-category">
                                    <img src={carPng} alt=""/>
                                </div>
                            </div>
                        </div>
                    
                    </div>
                </div>
            </div>
        )
    }
}

export default Homepage;