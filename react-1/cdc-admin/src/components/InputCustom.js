import React, { Component } from 'react';
import PubSub from 'pubsub-js';

export default class InputCustom extends Component{
    constructor()
    {
        super();
        this.state = { msgError : '' }
    }

    componentDidMount()
    {
        PubSub.subscribe('error-validation', function(topic, error)
        {
            if(error.field === this.props.name)
            {
                this.setState({msgError: error.defaultMessage});
            }
        }.bind(this));

        PubSub.subscribe('empty-error', function(topic)
        {
            this.setState({msgError:''});
        }.bind(this));
    }

    render(){
        return(
            <div className="pure-control-group">
                <label htmlFor={this.props.id}>{this.props.label}</label>
                <input {...this.props} />
                <span className="erro">{this.state.msgError}</span>
            </div>  
        );
    }
}