"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BindHelper = function BindHelper(model, view) {
    _classCallCheck(this, BindHelper);

    for (var _len = arguments.length, props = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        props[_key - 2] = arguments[_key];
    }

    var proxy = ProxyFactory.create(model, props, function (model) {
        return view.update(model);
    });

    view.update(model);

    return proxy;
};
//# sourceMappingURL=BindHelper.js.map