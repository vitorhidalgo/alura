var ConnectionFactory = 
(
	function()
	{
		const stores   = ['negociacoes'];
		const version  = 4;
		const dbname   = 'aluraframe';
		
		var connection = null;
		var close      = null;

		return class ConnectionFactory
		{
			constructor()
			{
				throw new Error('Não é possível criar instancias de ConnectionFactory');
			}

			static getConnection()
			{
				return new Promise
				(
					(resolve, reject) => 
					{
						let openRequest = window.indexedDB.open(dbname, version);

						openRequest.onupgradeneeded = e => 
						{
							ConnectionFactory._createStores( e.target.result );	
						};

						openRequest.onsuccess = e =>
						{
							if( !connection ) 
							{
								connection = e.target.result;
								close = connection.close.bind(connection);
								connection.close = function()
								{
									throw new Error('Você não pode fechar diretamente a conexão!');
								}
							}
							resolve(connection);
						};

						openRequest.onerror = e =>
						{
							console.log(e.target.error);
							reject(e.target.error.name);
						};
					}
				);
			}

			static _createStores( p_connection )
			{
				stores.forEach
				(
					store => 
					{
						if( p_connection.objectStoreNames.contains(store) ) 
						{
							p_connection.deleteObjectStore(store);
						}

						p_connection.createObjectStore( store, { autoincrement : true } );
					}
				);
			}

			static closeConnection()
			{
				if( connection )
				{
					close();
					connection = null;
				}
			}
		}
	}
)();

