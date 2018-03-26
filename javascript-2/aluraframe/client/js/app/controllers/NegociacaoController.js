class NegociacaoController 
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
	};
	
	adiciona(event)
	{
		event.preventDefault();

		try
		{
			this._listaNegociacoes.adiciona(this._criarNegociacao());
			this._mensagem.texto = 'Negociação adicionada com sucesso';
			this._limpaFormulario();
		}
		catch(err)
		{
			this._mensagem.texto = err;
		}
	}

	importaNegociacoes()
	{
		let service = new NegociacaoService();
        
        service.obterNegociacoes().then
        (
			negociacoes => 
			{
				negociacoes.forEach
				(
					negociacao => this._listaNegociacoes.adiciona(negociacao)
					);
				this._mensagem.texto = 'Negociações do período importadas com sucesso';
			}
		)
		.catch(error => this._mensagem.texto = error); 
	}

	apaga()
	{
		this._listaNegociacoes.esvazia();
		
		this._mensagem.texto = 'Negociações deletada com sucesso';
	}

	_criarNegociacao()
	{
		return new Negociacao
		(
			DateHelper.textoParaData(this._inputData.value),
			this._inputQuantidade.value,
			this._inputValor.value
		);
	}

	_limpaFormulario()
	{
		this._inputData.value = '';
		this._inputQuantidade.value = 1;
		this._inputValor.value = 0.0;
		this._inputData.focus();
	}

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
	}
}