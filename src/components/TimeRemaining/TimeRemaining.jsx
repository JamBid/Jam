import React, {Component} from 'react';
import moment from 'moment';

class TimeRemaining extends Component {
    constructor(props){
        super(props);

        this.state = {
            endTime: moment().add(8,'days').add(4, 'hours').add(3,'minutes')
        }
    }

    determineIfStillTime(){
        if(this.state.endTime){
            let current = moment();
            let endTime = moment(this.state.endTime);

            if(this.state.endTime.isAfter(current)){
                let remaining = this.state.endTime.diff(current)/1000;
                
                let days = Math.floor(remaining / 86400);
                remaining = remaining % 86400;

                let hours = Math.floor(remaining / 3600);
                remaining = remaining % 3600;

                let minutes = Math.floor(remaining / 60);
                let seconds = Math.floor(remaining % 60);
                
                return (
                    <div>
                        {days > 0 ? `Days: ${days}`: null}
                        {hours > 0 ? `Hours: ${hours}`: null}
                        {minutes > 0 ? `Miuntes: ${minutes}`: null}
                        Seconds: {seconds}
                    </div>
                );
            }
            else{
                return (
                    <div>
                        Sold!
                    </div>
                )
            }
        }

        return (
            <div>
                Not Available.
            </div>
        );
    }

    render() {
        return(
            <div>
                {this.determineIfStillTime()}
            </div>
        )
    }
}

export default TimeRemaining;