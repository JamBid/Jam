import React, {Component} from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import './ProdImage.css';

class ProdImages extends Component {
    constructor(props){
        super(props);

        this.state ={
            images: [],
            slideIndex: 0
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({images: nextProps.images})
    }

    render() {
        return (
            <Carousel className="carousel">
                {this.state.images.map((img, i) => (
                    <div key={i}>
                        <img src={img.image} alt={`slide ${i}`}/>
                    </div>
                ))}
            </Carousel>
        )
    }
}

export default ProdImages;