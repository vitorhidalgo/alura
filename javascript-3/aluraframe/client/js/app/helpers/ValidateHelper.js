"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ValidateHelper = function () {
    function ValidateHelper(code) {
        _classCallCheck(this, ValidateHelper);

        if (!this._validateCode(code)) throw new Error("O texto " + code + " n\xE3o \xE9 um c\xF3digo v\xE1lido!");
        this._code = code;
    }

    _createClass(ValidateHelper, [{
        key: "_validateCode",
        value: function _validateCode(code) {
            return (/\D{3}-\D{2}-\d{2}/.test(code)
            );
        }
    }, {
        key: "code",
        get: function get() {
            return this._code;
        }
    }]);

    return ValidateHelper;
}();

// let codigo1 = new Codigo('GWZ-JJ-12'); // válido
// console.log(codigo1.texto);
// let codigo2 = new Codigo('1X1-JJ-12'); // inválido
// console.log(codigo2.texto);
//# sourceMappingURL=ValidateHelper.js.map