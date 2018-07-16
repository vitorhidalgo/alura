import React, { Component } from 'react';
import Image from './Image';

export default class Timeline extends Component{
    constructor(){
        super();
        this.state = {images:[]};
    }

    componentDidMount(){
        fetch(`http://localhost:8080/api/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`)
            .then(response => response.json())
            .then(images => this.setState({images:images }));
    }
    
    render(){
        return(
            <div className="fotos container">
            {
                this.state.images.map(image => <Image key={image.id} image={image}/> )
            }
            </div>
        );
    }
}