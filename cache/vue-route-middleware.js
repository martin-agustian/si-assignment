import {
  __commonJS
} from "./chunk-ENMAWK7U.js";

// node_modules/vue-route-middleware/dist/index.js
var require_dist = __commonJS({
  "node_modules/vue-route-middleware/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
      return typeof obj;
    } : function(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
    var _createClass = function() {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        if (protoProps)
          defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
          defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();
    function _toConsumableArray(arr) {
      if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
          arr2[i] = arr[i];
        }
        return arr2;
      } else {
        return Array.from(arr);
      }
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    var VueRouteMiddleware = function() {
      function VueRouteMiddleware2(definedMiddlewares, to, from, next) {
        var _this = this;
        _classCallCheck(this, VueRouteMiddleware2);
        if (this._isObject(definedMiddlewares)) {
          this.middlewares = definedMiddlewares;
        } else {
          this._error("Defined middlewares must be of type Object!");
          this.middlewares = {};
        }
        this.to = to;
        this.from = from;
        this.next = next;
        this.nextHasCalled = false;
        if (this.to && this.to.matched) {
          to.matched.every(function(route) {
            return _this.applyRouteMiddlewares(route);
          });
        }
        if (this.next && !this.nextHasCalled) {
          this.callNext();
        }
      }
      _createClass(VueRouteMiddleware2, [{
        key: "toMiddleware",
        value: function toMiddleware() {
          return [this.to, this.from, this._isFunction(this.next) ? this.callNext.bind(this) : void 0];
        }
      }, {
        key: "callNext",
        value: function callNext() {
          if (!this.nextHasCalled)
            this.nextHasCalled = true;
          return this.next.apply(this, arguments);
        }
      }, {
        key: "applyRouteMiddlewares",
        value: function applyRouteMiddlewares(route) {
          var _this2 = this;
          if (route.meta && route.meta.middleware) {
            var middlewareKeys = route.meta.middleware;
            if (this._isArray(middlewareKeys)) {
              return middlewareKeys.every(function(middleware) {
                return _this2.applyMiddleware(middleware);
              });
            } else {
              return this.applyMiddleware(middlewareKeys);
            }
          }
          return true;
        }
      }, {
        key: "applyMiddleware",
        value: function applyMiddleware(middleware) {
          var result = this.getMiddleware(middleware).apply(void 0, _toConsumableArray(this.toMiddleware()));
          return result === void 0 ? true : result;
        }
      }, {
        key: "getMiddleware",
        value: function getMiddleware(middleware) {
          if (this._isString(middleware)) {
            if (this.middlewares.hasOwnProperty(middleware)) {
              if (this._isFunction(this.middlewares[middleware])) {
                return this.middlewares[middleware];
              } else {
                this._error(middleware + " is not a function!");
              }
            }
          } else if (this._isFunction(middleware)) {
            return middleware;
          } else {
            this._error("All middlewares must be functions!");
          }
          return function() {
            return true;
          };
        }
      }, {
        key: "_error",
        value: function _error(text) {
          console.error(this.constructor.name + ": " + text);
        }
      }, {
        key: "_isString",
        value: function _isString(toCheck) {
          return typeof toCheck === "string" || toCheck instanceof String;
        }
      }, {
        key: "_isArray",
        value: function _isArray(toCheck) {
          return Array.isArray(toCheck);
        }
      }, {
        key: "_isFunction",
        value: function _isFunction(toCheck) {
          return typeof toCheck === "function";
        }
      }, {
        key: "_isObject",
        value: function _isObject(toCheck) {
          return (typeof toCheck === "undefined" ? "undefined" : _typeof(toCheck)) === "object" && toCheck !== null;
        }
      }]);
      return VueRouteMiddleware2;
    }();
    exports.default = function() {
      var definedGroups = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      return function() {
        for (var _len = arguments.length, toMiddleware = Array(_len), _key = 0; _key < _len; _key++) {
          toMiddleware[_key] = arguments[_key];
        }
        return new (Function.prototype.bind.apply(VueRouteMiddleware, [null].concat([definedGroups], toMiddleware)))();
      };
    };
  }
});

// dep:vue-route-middleware
var vue_route_middleware_default = require_dist();
export {
  vue_route_middleware_default as default
};
//# sourceMappingURL=vue-route-middleware.js.map
