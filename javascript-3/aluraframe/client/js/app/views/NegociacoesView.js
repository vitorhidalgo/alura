'use strict';

System.register(['./View', '../helpers/DateHelper', '../controllers/NegociacaoController'], function (_export, _context) {
	"use strict";

	var View, DateHelper, currentInstance, _createClass, NegociacoesView;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}

		return call && (typeof call === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
		if (typeof superClass !== "function" && superClass !== null) {
			throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
		}

		subClass.prototype = Object.create(superClass && superClass.prototype, {
			constructor: {
				value: subClass,
				enumerable: false,
				writable: true,
				configurable: true
			}
		});
		if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	return {
		setters: [function (_View2) {
			View = _View2.View;
		}, function (_helpersDateHelper) {
			DateHelper = _helpersDateHelper.DateHelper;
		}, function (_controllersNegociacaoController) {
			currentInstance = _controllersNegociacaoController.currentInstance;
		}],
		execute: function () {
			_createClass = function () {
				function defineProperties(target, props) {
					for (var i = 0; i < props.length; i++) {
						var descriptor = props[i];
						descriptor.enumerable = descriptor.enumerable || false;
						descriptor.configurable = true;
						if ("value" in descriptor) descriptor.writable = true;
						Object.defineProperty(target, descriptor.key, descriptor);
					}
				}

				return function (Constructor, protoProps, staticProps) {
					if (protoProps) defineProperties(Constructor.prototype, protoProps);
					if (staticProps) defineProperties(Constructor, staticProps);
					return Constructor;
				};
			}();

			_export('NegociacoesView', NegociacoesView = function (_View) {
				_inherits(NegociacoesView, _View);

				function NegociacoesView(elemento) {
					_classCallCheck(this, NegociacoesView);

					var _this = _possibleConstructorReturn(this, (NegociacoesView.__proto__ || Object.getPrototypeOf(NegociacoesView)).call(this, elemento));

					elemento.addEventListener('click', function (event) {
						if (event.target.nodeName == 'TH') {
							currentInstance().ordena(event.target.textContent.toLowerCase());
						}
					});
					return _this;
				}

				_createClass(NegociacoesView, [{
					key: 'template',
					value: function template(model) {
						return '\n\t\t    <table class="table table-hover table-bordered">\n\t\t        <thead>\n\t\t            <tr>\n\t\t                <th>DATA</th>\n\t\t                <th>QUANTIDADE</th>\n\t\t                <th>VALOR</th>\n\t\t                <th>VOLUME</th>\n\t\t            </tr>\n\t\t        </thead>\n\t\t        \n\t\t\t\t<tbody>\n\t\t\t\t\t' + model.negociacoes.map(function (n) {
							return '\n\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t<td>' + DateHelper.dataParaTexto(n.data) + '</td>\n\t\t\t\t\t\t\t\t<td>' + n.quantidade + '</td>\n\t\t\t\t\t\t\t\t<td>' + n.valor + '</td>\n\t\t\t\t\t\t\t\t<td>' + n.volume + '</td>\n\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t';
						}).join('') + '\n\t\t        </tbody>\n\t\t        \n\t\t\t\t<tfoot>\n\t\t\t\t\t<td colspan="3"></td>\n\t\t\t\t\t<td>\n\t\t\t\t\t\t' + model.volumeTotal + '\n\t\t\t\t\t</td>\n\t\t        </tfoot>\n\t\t    </table>\n\t\t';
					}
				}]);

				return NegociacoesView;
			}(View));

			_export('NegociacoesView', NegociacoesView);
		}
	};
});
//# sourceMappingURL=NegociacoesView.js.map