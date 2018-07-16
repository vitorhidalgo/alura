import React, { Component } from 'react';

export default class Login extends Component{
    constructor(props){
        super(props);
        var msg = '';
        const queryParams = new URLSearchParams(props.location.search);
        const queryMsg = queryParams.get('msg');

        if(queryMsg){msg = queryMsg};
        this.state = { msg:msg };
    }

    login(e){
        e.preventDefault();
        fetch(
            'http://localhost:8080/api/public/login', 
            {
                method:'POST',
                body:JSON.stringify(
                    {
                        login:this.user.value,
                        senha:this.password.value
                    }
                ),
                headers: new Headers(
                    {
                        'Content-type':'application/json'
                    }
                )
            }
        )
        .then(response => 
            {
                if(response.ok)
                {
                    return response.text();
                }
                else
                {
                    throw new Error('Não foi possível fazer o login');
                }
            }
        )
        .then(
            token => 
            {
                localStorage.setItem('auth-token', token);
                this.props.history.push('/timeline');
            }
        )
        .catch(error => 
            {
                this.setState({msg:error.message});
            }
        );
    }

    render(){
        return(
            <div className="login-box">
                <h1 className="header-logo">Instalura</h1>
                <span>{this.state.msg}</span>
                <form onSubmit={this.login.bind(this)}> 
                    <input type="text" ref={(input) => this.user = input} />
                    <input type="password" ref={(input) => this.password = input}/>
                    <input type="submit" value="login"/>
                </form>
            </div>
        );
    }
}