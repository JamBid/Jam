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

    importAll(){
        
        if(this.state.images.length > 0){
            console.log(this.state.images)
            return this.state.images.map((img, i) => (
                img.imageType === 'file' ? 
                <div key={i}>
                    <img src={require(`../../files/products/${img.image.split("\\")[img.image.split("\\").length-1]}`)} alt={`slide ${i}`}/>
                </div>
                :
                <div key={i}>
                    <img src={img.image} alt={`slide ${i}`}/>
                </div>
            ))
        }
    }

    render() {
        //let img = this.importAll(require.context('./', false, /\.(png|jpe?g)$/));

        // for(let i in this.state.images){
        //     if(this.state.images[i].imageType === 'file')
            
        // }
        return (
            <Carousel className="carousel mx-auto">
                {this.importAll()}
            </Carousel>
        )
    }
}

export default ProdImages;