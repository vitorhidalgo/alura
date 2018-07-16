import React, { Component } from 'react';

export default class Image extends Component{
    render(){
        return(
            <div className="foto">
                <Header image={this.props.image}/>
                <img alt="foto" className="foto-src" src={this.props.image.urlFoto}/>
                <Info image={this.props.image}/>
                <Update/>
            </div>
        );
    }
}

class Header extends Component{
    render(){
        return(
            <header className="foto-header">
                <figure className="foto-usuario">
                    <img src={this.props.image.urlPerfil} alt="foto do usuario"/>
                    <figcaption className="foto-usuario">
                        <a href="">{this.props.image.loginUsuario}</a>  
                    </figcaption>
                </figure>
                <time className="foto-data">{this.props.image.horario}</time>
            </header>
        );
    }
}

class Info extends Component{
    render(){
        return(
            <div className="foto-info">
                <div className="foto-info-likes">
                {
                    this.props.image.likers.map(liker => {
                        return <a href="" key={liker.login}>{liker.login}, </a>
                    })
                }
                 curtiram.
                </div>
                <p className="foto-info-legenda">
                    <a className="foto-info-autor">{this.props.image.loginUsuario} </a>
                    {this.props.image.comentario}
                </p>
                <ul className="foto-info-comentarios">
                    {
                        this.props.image.comentarios.map(comentario => {
                            return(
                                <li className="comentario" key={comentario.id}>
                                    <a className="foto-info-autor">{comentario.login} </a>
                                    {comentario.texto}
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        );
    }
}

class Update extends Component{
    render(){
        return(
            <section className="fotoAtualizacoes">
                <a href="" className="fotoAtualizacoes-like">Likar</a>
                <form className="fotoAtualizacoes-form">
                    <input type="text" placeholder="Adicione um comentário..." className="fotoAtualizacoes-form-campo"/>
                    <input type="submit" value="Comentar!" className="fotoAtualizacoes-form-submit"/>
                </form>
            </section>
        );
    }
}
