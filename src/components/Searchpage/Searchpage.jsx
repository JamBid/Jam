import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import API from '../../utils/API';

class Searchpage extends Component {
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
                {/*<!-- search -->*/}
                <div className="d-flex align-content-between flex-wrap justify-content-center">
                    <div className="row">
                        <div className="p-2 my-flex-item">
                            <div className="card rounded-circle border-dark">
                                <div className="card-body home-category text-center">
                                    <img className="imgCard" alt=""/>
                                    <p>...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Searchpage;