import React, { Component } from 'react';
import $ from 'jquery';
import InputCustom from './components/InputCustom';
import ButtomCustom from './components/ButtomCustom';
import PubSub from 'pubsub-js';
import TratadorError from './TratadorError';
import {Helmet} from 'react-helmet';

class FormularioAutor extends Component{
    constructor()
    {
        super();
        this.state = 
        {
            nome : '',
            email : '',
            senha : ''
        };
        this.enviaForm = this.enviaForm.bind(this);
    }
    
    enviaForm(e)
    {
        e.preventDefault();
        $.ajax(
            {
                url : 'https://cdc-react.herokuapp.com/api/autores',
                contentType : 'application/json',
                dataType : 'json',
                type: 'post',
                data: JSON.stringify(
                    {
                        nome : this.state.nome,
                        email : this.state.email,
                        senha : this.state.senha
                    }
                ),
                beforeSend : function()
                {
                    PubSub.publish('empty-error', {});
                },
                success : function(response)
                {
                    PubSub.publish('atualiza-lista-autores', response);
                    this.setState({nome:'', email:'', senha:''});
                }.bind(this),
                error : function(error)
                {
                    if(error.status === 400)
                    {
                        new TratadorError().publishError(error.responseJSON);
                    }
                }
            }
        )
    }

    changeInput(name, e)
    {
        var input = {};
        input[name] = e.target.value;
        this.setState(input);
    }

    render()
    {
        return(
            <div>
                <Helmet>
                    <title>Autor - React Helmet</title>
                    <meta name="title" content="Página de autor" />
                </Helmet>
                <div className="pure-form pure-form-aligned">
                    <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm.bind(this)} method="post">
                        <InputCustom id="nome" type="text" name="nome" value={this.state.nome} onChange={this.changeInput.bind(this, 'nome')} label="Nome" />
                        <InputCustom id="email" type="email" name="email" value={this.state.email} onChange={this.changeInput.bind(this, 'email')} label="Email" />
                        <InputCustom id="senha" type="password" name="senha" value={this.state.senha} onChange={this.changeInput.bind(this, 'senha')} label="Senha" />
                        <ButtomCustom type="submit" label="Gravar" />
                    </form>
                </div>
            </div>
        );
    }
}

export class TabelaAutores extends Component{
    render()
    {
        return(
            <div>            
                <table className="pure-table">
                    <thead>
                        <tr>
                        <th>Nome</th>
                        <th>email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.lista.map(
                                function(autor)
                                {
                                    return (
                                        <tr key={autor.id}>
                                            <td>{autor.nome}</td>
                                            <td>{autor.email}</td>
                                        </tr>
                                    );
                                }
                            )
                        }
                    </tbody>
                </table> 
            </div>
        );
    }
}

export default class AutorBox extends Component{
    constructor()
    {
        super();
        this.state = {lista : []};
    };

    componentWillMount()
    {
        $.ajax(
            {
                url: 'https://cdc-react.herokuapp.com/api/autores',
                dataType : 'json',
                success: function(data)
                {
                    this.setState({lista: data });
                }.bind(this)    
            }
        );

        PubSub.subscribe(
            'atualiza-lista-autores', 
            function(topico, novaListagem)
            {
                this.setState({lista:novaListagem});
            }
            .bind(this)
        );
    };

    render()
    {
        return(
            <div>
                <div className="header">
                    <h1>Cadastro de Autores</h1>
                </div>
                <div className="content" id="content">
                    <FormularioAutor/>
                    <TabelaAutores lista={this.state.lista} />
                </div>
            </div>
        );
    }
}