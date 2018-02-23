import React, {Component} from 'react';

class Category extends Component {

    render() {
        return (
            <select className={this.props.className}>
            {/* <select className="form-control category-dropdown"> */}

                    {/* category dropdown */}
                    <option value="all">All Categories</option>

                    <option disabled>Automotives</option>
                    <option value="cars">Cars</option>
                    <option value="suvs">SUVs</option>
                    <option value="carParts">Parts</option>

                    <option className="select-hr" disabled></option>

                    <option disabled>Electronics</option>
                    <option value="phones">Phones</option>
                    <option value="computers">Computers</option>
                    <option value="electronicParts">Parts</option>
                    
                    <option className="select-hr" disabled></option>

                    <option disabled>Furniture</option>
                    <option value="indoor">Indoor</option>
                    <option value="outdoor">Outdoor</option>
                    <option value="anituqe">Antique</option>
            </select>
        )
    }
}

export default Category;