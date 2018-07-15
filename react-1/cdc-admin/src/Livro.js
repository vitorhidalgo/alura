import React, {Component} from 'react';
import $ from 'jquery';
import InputCustom from './components/InputCustom';
import ButtomCustom from './components/ButtomCustom';
import PubSub from 'pubsub-js';
import TratadorError from './TratadorError';
import {Helmet} from 'react-helmet';

class FormularioLivro extends Component{
    constructor()
    {
        super();
        this.state = 
        {
            titulo : '',
            preco : '',
            autorId : ''
        };
        this.enviaForm = this.enviaForm.bind(this);
    }

    enviaForm(e)
    {
        e.preventDefault();
        $.ajax(
            {
                url : 'https://cdc-react.herokuapp.com/api/livros',
                contentType : 'application/json',
                dataType : 'json',
                type : 'post',
                data : JSON.stringify(
                    {
                        titulo : this.state.titulo,
                        preco : this.state.preco,
                        autorId : this.state.autorId
                    }
                ),
                beforeSend : function()
                {
                    PubSub.publish('empty-error', {});
                },
                success : function(response)
                {
                    PubSub.publish('atualiza-lista-livros', response);
                    this.setState({titulo:'',preco:'',autorId:''});
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
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">
                    <InputCustom id="titulo" type="text" name="titulo" value={this.state.titulo} onChange={this.changeInput.bind(this, 'titulo')} label="Título" />
                    <InputCustom id="preco" type="text" name="preco" value={this.state.preco} onChange={this.changeInput.bind(this, 'preco')} label="Preço" />
                    <div className="pure-control-group">
                        <label htmlFor="autorId">Autor</label>
                        <select name="autorId" id="autorId" onChange={this.changeInput.bind(this, 'autorId')} value={this.state.autorId}>
                            <option value="">Selecione o Autor</option>
                            {
                                this.props.autores.map(
                                    function(autor)
                                    {
                                        return <option key={autor.id} value={autor.id}>{autor.nome}</option>
                                    }
                                )
                            }
                        </select>
                        <span className="erro">{this.state.msgError}</span>
                    </div>
                    <ButtomCustom type="submit" label="Gravar" />
                </form>
            </div>
        );
    }
}

export class TabelaLivros extends Component{
    render()
    {
        return(
            <div>            
                <table className="pure-table">
                    <thead>
                        <tr>
                        <th>Título</th>
                        <th>Preço</th>
                        <th>Autor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.lista.map(
                                function(livro)
                                {
                                    return (
                                        <tr key={livro.id}>
                                            <td>{livro.titulo}</td>
                                            <td>{livro.preco}</td>
                                            <td>{livro.autor.nome}</td>
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

export default class LivroBox extends Component{
    constructor()
    {
        super();
        this.state = {lista : [], autores : []};
    }

    componentWillMount()
    {
        $.ajax(
            {
                url : 'https://cdc-react.herokuapp.com/api/livros',
                dataType : 'json',
                success : function(data)
                {
                    this.setState({lista : data });
                }.bind(this)
            }
        );

        $.ajax(
            {
                url : 'https://cdc-react.herokuapp.com/api/autores',
                dataType : 'json',
                success : function(data)
                {
                    this.setState({autores : data });
                }.bind(this)
            }
        );

        PubSub.subscribe(
            'atualiza-lista-livros',
            function(topic, novaListagem)
            {
                this.setState({lista:novaListagem});
            }.bind(this)
        );
    }

    render()
    {
        return(
            <div>
                <Helmet>
                    <title>Livro - React Helmet</title>
                </Helmet>
                <div className="header">
                    <h1>Cadastro de Livros</h1>
                </div>
                <div className="content" id="content">
                    <FormularioLivro autores={this.state.autores}/>
                    <TabelaLivros lista={this.state.lista} />
                </div>
            </div>
        );
    }
}