import React, {Component} from "react";
import { compose, withProps } from "recompose";
import {withScriptjs,withGoogleMap,GoogleMap,Marker} from "react-google-maps";

import API from '../../utils/API';

class ReactGoogleMaps extends Component{
    constructor(props){
        super(props);

        this.state = {
            position:props.position||null,
            defaultZoom: 11,
            address:props.location||null
        }
    }

    MyMapComponent = compose(
        withProps({
          googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLEMAP}`,
          loadingElement: <div style={{ height: `100%` }} />,
          containerElement: <div style={{ height: `100%` }} />,
          mapElement: <div style={{ height: `100%` }} />
        }),
        withScriptjs,
        withGoogleMap
    )(props => (
        <GoogleMap defaultZoom={props.defaultZoom} defaultCenter={props.position}>
            <Marker position={props.position} />
        </GoogleMap>
    ))

    //function to set the lat/lon
    getLatLon() {
        if(this.state.address)
            API.getLatLon(this.state.address)
            .then(res => {
                if(res.data.results[0])
                    this.setState({position:res.data.results[0].geometry.location})
            })
            .catch(error => console.log(error))
    }

    componentDidMount(){
        this.getLatLon();
    }

    componentWillReceiveProps(nextProps){
        this.setState({address:nextProps.address},this.getLatLon());
    }

    render(){
        return (
            this.state.position ? this.MyMapComponent({position:this.state.position, defaultZoom:this.state.defaultZoom}) : null
        )
    }
}
  
;

export default ReactGoogleMaps;