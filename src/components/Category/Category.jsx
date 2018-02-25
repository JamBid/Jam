import React, {Component} from 'react';

import list from '../../categoryList';

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

    getList(){
        let keys = Object.keys(list);

        return(
            <select className={this.props.className} name="select" onChange={this.handleChange}>
                {/* category dropdown */}
                <option value="all">All Categories</option>
                <option className="select-hr" disabled/>
                {keys.map((ele, i) => {
                    if(Array.isArray(list[ele]) && i !== 0)
                        return(
                            [<option className="select-hr" disabled/>,
                            <option key={i} value={list[ele]}>{ele}</option>]
                        )
                    else
                        return <option key={i} value={list[ele]}>{ele}</option>
                })}
            </select>
        )
    }

    render() {
        return (
            <div className="col-8">
                <form className="form-inline float-right">
                    <div className="btn-group">
                        {/* category drop down */}
                        {this.getList()}
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