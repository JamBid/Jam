import React, {Component} from 'react';
import moment from 'moment';

class TimeRemaining extends Component {
    constructor(props){
        super(props);

        this.state = {
            endTime: moment(props.time,'YYYY-MM-DDTHH:mm:ss.SSSZ'),
            setAllowBidFunc:props.setAllowBid //function used to tell the parent component that it is ok to allow bidding
        }
    }

    componentDidMount(){
        let obj = this;
        if(obj.state.endTime && !obj.timeInterval)
            obj.timeInterval = setInterval(()=>obj.setState(this.forceUpdate()),1000);
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            endTime: moment(nextProps.time,'YYYY-MM-DDTHH:mm:ss.SSSZ'),
            setAllowBidFunc:nextProps.setAllowBid
        },function(){
            if(this.state.endTime && !this.timeInterval)
                this.timeInterval = setInterval(()=>this.setState(this.forceUpdate()),1000);
        })
    }

    componentWillUnmount(){
        clearInterval(this.timeInterval);
    }

    //function to generate the time remaining
    determineIfStillTime(){
        if(this.state.endTime){
            let current = moment();

            if(this.state.endTime.isAfter(current)){
                let remaining = this.state.endTime.diff(current)/1000;
                
                let days = Math.floor(remaining / 86400);
                remaining = remaining % 86400;

                let hours = Math.floor(remaining / 3600);
                remaining = remaining % 3600;

                let minutes = Math.floor(remaining / 60);
                let seconds = Math.floor(remaining % 60);

                this.state.setAllowBidFunc(true);

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
                this.state.setAllowBidFunc(false);

                return (
                    <div>
                        Sold!
                    </div>
                )
            }
        }

        this.state.setAllowBidFunc(false);

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