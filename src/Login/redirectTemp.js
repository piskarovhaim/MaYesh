import React, { Component } from "react";
import { Redirect } from 'react-router';

class RedirectTemp extends Component {
    render(){
        return(
            <Redirect to={this.props.location.location.l}/>
        )
    }
}
export default RedirectTemp;