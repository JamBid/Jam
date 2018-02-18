import React, {Component} from 'react';

class NoMatch extends Component {
    render() {
        return (
            <div>
                {/* 404 page */}
                <div class="row mt-5">
                    <div class="col-md-12 text-center">
                        <div class="error-template">
                            <h1>
                                Oops!</h1>
                            <h2>
                                404 Not Found</h2>
                            <div class="error-details">
                                Sorry, an error has occured, Requested page not found!
                            </div>
                            <div class="error-actions mt-4">
                                <a href="/" class="btn btn-primary btn-md">
                                    <span class="glyphicon glyphicon-home">🏚️ </span>
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