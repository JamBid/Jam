import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './homepage.css';

import automotiveSvg from './images/automotive.svg';
import electronicSvg from './images/electronic.svg';
import furnitureSvg from './images/furniture.svg';


class Homepage extends Component {

    render() {
        return (

            <div>
                {/*<!-- Homepage -->*/}
                <div className="d-flex align-content-between flex-wrap justify-content-center">

                    <Link to="/search/Automotives">
                        <div className="p-2 my-flex-item">
                            <div className="card home-card">
                                <img className="card-image home-image" src={automotiveSvg} alt=""/>
                                <div className="card-img-overlay home-img-overlay text-center ">
                                    <span className="card-img-overlay-text home-img-overlay-text">Automotive</span>
                                </div>
                            </div>
                        </div>
                    </Link>

                    <Link to="/search/Electronics">
                        <div className="p-2 my-flex-item">
                            <div className="card card-area">
                                <img className="card-image home-image" src={electronicSvg} alt=""/>
                                <div className="card-img-overlay home-img-overlay text-center">
                                    <span className="card-img-overlay-text home-img-overlay-text">Electronics</span>
                                </div>
                            </div>
                        </div>
                    </Link>

                    <Link to="/search/Furniture">
                        <div className="p-2 my-flex-item">
                            <div className="card card-area">
                                <img className="card-image home-image" src={furnitureSvg} alt=""/>
                                <div className="card-img-overlay home-img-overlay text-center">
                                    <span className="card-img-overlay-text home-img-overlay-text">Furniture</span>
                                </div>
                            </div>
                        </div>
                    </Link>

                </div>
            </div>
        )
    } 
}

export default Homepage;