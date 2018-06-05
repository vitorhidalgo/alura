import {ListaNegociacoes} from '../models/ListaNegociacoes';
import {Mensagem} from '../models/Mensagem';
import {NegociacoesView} from '../views/NegociacoesView';
import {MensagemView} from '../views/MensagemView';
import {NegociacaoService} from '../services/NegociacaoService';
import {DateHelper} from '../helpers/DateHelper';
import {BindHelper} from '../helpers/BindHelper';
import {Negociacao} from '../models/Negociacao';

export class NegociacaoController 
{
	constructor()
	{
		let $ = document.querySelector.bind(document);

		this._ordemAtual = '';
		this._inputData       = $('#data');
		this._inputQuantidade = $('#quantidade');
		this._inputValor      = $('#valor');

		this._listaNegociacoes = new BindHelper
		(
			new ListaNegociacoes(), 
			new NegociacoesView($('#negociacoesView')), 
			'adiciona', 'esvazia', 'ordena', 'inverterOrdem'
		);
		
		this._mensagem = new BindHelper
		(
			new Mensagem(),
			new MensagemView($('#mensagemView')),
			'texto'
		);

		this._ordemAtual = '';
		this._service = new NegociacaoService();
		
		this._init();
	};

	_init()
	{
		this._service
			.lista()
			.catch
			(
				erro => 
				{
					console.log(erro);
					this._mensagem.texto = erro;
				}
			);
			
		setInterval
		(
			() => 
			{
				this.importaNegociacoes();
			}, 
			3000
		);
	};
	
	adiciona(event)
	{
		event.preventDefault();

		let negociacao = this._criarNegociacao();

		this._service
			.cadastra(negociacao)
			.then(mensagem => {
				this._listaNegociacoes.adiciona(negociacao);
				this._mensagem.texto = mensagem;
				this._limpaFormulario();
			})
			.catch(erro => this._mensagem.texto = erro);
	};

	importaNegociacoes() 
	{
		this._service
			.importa(this._listaNegociacoes.negociacoes)
			.then
			(
				negociacoes => negociacoes.forEach
				(
					negociacao => 
					{
						this._listaNegociacoes.adiciona(negociacao);
						this._mensagem.texto = 'Negociações do período importadas';
					}
				)
			)
			.catch(erro => this._mensagem.texto = erro);
	};

	apaga()
	{
		this._service
			.apaga()
			.then(mensagem => {
				this._mensagem.texto = mensagem;
				this._listaNegociacoes.esvazia();
			})
			.catch(erro => this._mensagem.texto = erro);
	};

	_criarNegociacao()
	{
		return new Negociacao
		(
			DateHelper.textoParaData(this._inputData.value),
			parseInt(this._inputQuantidade.value),
			parseFloat(this._inputValor.value)
		);
	};

	_limpaFormulario()
	{
		this._inputData.value = '';
		this._inputQuantidade.value = 1;
		this._inputValor.value = 0.0;
		this._inputData.focus();
	};

	ordena(coluna)
	{
		if(this._ordemAtual === coluna)
		{
			this._listaNegociacoes.inverterOrdem();
		}
		else
		{
			this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);
		}
		this._ordemAtual = coluna;
	};
}

let negociacaoController = new NegociacaoController();
export function currentInstance()
{
	return negociacaoController;
}