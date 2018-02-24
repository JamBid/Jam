import React, {Component} from 'react';

class Category extends Component {
    constructor(props){
        super(props);

        this.state = {
            select: "",
            search: ""
        }
    }

    //function that is used when there is a change on an input like field
    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]:value
        });
    }

    //function for the click search button
    handleClick = (event) => {
        event.preventDefault();

        console.log(this.state.search+"   "+this.state.select)
    }

    render() {
        return (
            <div className="col-8">
                <form className="form-inline float-right">
                    <div className="btn-group">
                        
                        {/* category drop down */}
                        <select className={this.props.className} name="select" onChange={this.handleChange}>
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
                    </div>
                    {/* search field */}
                    <input className="form-control form-control-sm navbar-search"
                        id="navbar-search-input"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        name="search"
                        onChange={this.handleChange}/>
                    {/* search button */}
                    <button className="btn btn-sm my-2 my-sm-0 navbar-search" id="navbar-search-btn" type="submit" onClick={this.handleClick}>Search</button>
                </form>
            </div>
        )
    }
}

export default Category;