import React, {Component} from 'react';

class NoMatch extends Component {
    render() {
        return (
            <div>
                {/* 404 page */}
                <div className="row mt-5">
                    <div className="col-md-12 text-center">
                        <div className="error-template">
                            <h1>
                                Oops!</h1>
                            <h2>
                                404 Not Found</h2>
                            <div className="error-details">
                                Sorry, an error has occured, Requested page not found!
                            </div>
                            <div className="error-actions mt-4">
                                <a href="/" className="btn btn-primary btn-md">
                                    <span className="glyphicon glyphicon-home" role="img" aria-labelledby="house glyph icon">🏚️</span>
                                     Take Me Home 
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default NoMatch;