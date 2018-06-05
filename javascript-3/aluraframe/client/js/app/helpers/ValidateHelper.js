"use strict";

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, ValidateHelper;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
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

            ValidateHelper = function () {
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
        }
    };
});
//# sourceMappingURL=ValidateHelper.js.map