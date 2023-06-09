import {
  Comment,
  Fragment,
  Teleport,
  Transition,
  computed,
  createBaseVNode,
  createBlock,
  createCommentVNode,
  createElementBlock,
  createSlots,
  createTextVNode,
  createVNode,
  defineComponent,
  getCurrentInstance,
  guardReactiveProps,
  h,
  inject,
  isReactive,
  mergeProps,
  nextTick,
  normalizeClass,
  normalizeProps,
  normalizeStyle,
  onActivated,
  onBeforeUnmount,
  onMounted,
  onUnmounted,
  openBlock,
  provide,
  reactive,
  ref,
  renderList,
  renderSlot,
  resolveComponent,
  resolveDirective,
  resolveDynamicComponent,
  toDisplayString,
  unref,
  useSlots,
  vModelCheckbox,
  vModelRadio,
  vModelSelect,
  watch,
  withCtx,
  withDirectives,
  withModifiers
} from "./chunk-EW6SBXYQ.js";
import {
  __commonJS,
  __esm,
  __export,
  __spreadProps,
  __spreadValues,
  __toModule
} from "./chunk-ENMAWK7U.js";

// node_modules/bootstrap/js/dist/dom/data.js
var require_data = __commonJS({
  "node_modules/bootstrap/js/dist/dom/data.js"(exports, module) {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.Data = factory());
    })(exports, function() {
      "use strict";
      const elementMap = new Map();
      const data = {
        set(element, key, instance) {
          if (!elementMap.has(element)) {
            elementMap.set(element, new Map());
          }
          const instanceMap = elementMap.get(element);
          if (!instanceMap.has(key) && instanceMap.size !== 0) {
            console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(instanceMap.keys())[0]}.`);
            return;
          }
          instanceMap.set(key, instance);
        },
        get(element, key) {
          if (elementMap.has(element)) {
            return elementMap.get(element).get(key) || null;
          }
          return null;
        },
        remove(element, key) {
          if (!elementMap.has(element)) {
            return;
          }
          const instanceMap = elementMap.get(element);
          instanceMap.delete(key);
          if (instanceMap.size === 0) {
            elementMap.delete(element);
          }
        }
      };
      return data;
    });
  }
});

// node_modules/bootstrap/js/dist/dom/event-handler.js
var require_event_handler = __commonJS({
  "node_modules/bootstrap/js/dist/dom/event-handler.js"(exports, module) {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.EventHandler = factory());
    })(exports, function() {
      "use strict";
      const getjQuery = () => {
        const {
          jQuery
        } = window;
        if (jQuery && !document.body.hasAttribute("data-bs-no-jquery")) {
          return jQuery;
        }
        return null;
      };
      const namespaceRegex = /[^.]*(?=\..*)\.|.*/;
      const stripNameRegex = /\..*/;
      const stripUidRegex = /::\d+$/;
      const eventRegistry = {};
      let uidEvent = 1;
      const customEvents = {
        mouseenter: "mouseover",
        mouseleave: "mouseout"
      };
      const customEventsRegex = /^(mouseenter|mouseleave)/i;
      const nativeEvents = new Set(["click", "dblclick", "mouseup", "mousedown", "contextmenu", "mousewheel", "DOMMouseScroll", "mouseover", "mouseout", "mousemove", "selectstart", "selectend", "keydown", "keypress", "keyup", "orientationchange", "touchstart", "touchmove", "touchend", "touchcancel", "pointerdown", "pointermove", "pointerup", "pointerleave", "pointercancel", "gesturestart", "gesturechange", "gestureend", "focus", "blur", "change", "reset", "select", "submit", "focusin", "focusout", "load", "unload", "beforeunload", "resize", "move", "DOMContentLoaded", "readystatechange", "error", "abort", "scroll"]);
      function getUidEvent(element, uid) {
        return uid && `${uid}::${uidEvent++}` || element.uidEvent || uidEvent++;
      }
      function getEvent(element) {
        const uid = getUidEvent(element);
        element.uidEvent = uid;
        eventRegistry[uid] = eventRegistry[uid] || {};
        return eventRegistry[uid];
      }
      function bootstrapHandler(element, fn2) {
        return function handler(event) {
          event.delegateTarget = element;
          if (handler.oneOff) {
            EventHandler.off(element, event.type, fn2);
          }
          return fn2.apply(element, [event]);
        };
      }
      function bootstrapDelegationHandler(element, selector, fn2) {
        return function handler(event) {
          const domElements = element.querySelectorAll(selector);
          for (let {
            target
          } = event; target && target !== this; target = target.parentNode) {
            for (let i = domElements.length; i--; ) {
              if (domElements[i] === target) {
                event.delegateTarget = target;
                if (handler.oneOff) {
                  EventHandler.off(element, event.type, selector, fn2);
                }
                return fn2.apply(target, [event]);
              }
            }
          }
          return null;
        };
      }
      function findHandler(events, handler, delegationSelector = null) {
        const uidEventList = Object.keys(events);
        for (let i = 0, len = uidEventList.length; i < len; i++) {
          const event = events[uidEventList[i]];
          if (event.originalHandler === handler && event.delegationSelector === delegationSelector) {
            return event;
          }
        }
        return null;
      }
      function normalizeParams(originalTypeEvent, handler, delegationFn) {
        const delegation = typeof handler === "string";
        const originalHandler = delegation ? delegationFn : handler;
        let typeEvent = getTypeEvent(originalTypeEvent);
        const isNative = nativeEvents.has(typeEvent);
        if (!isNative) {
          typeEvent = originalTypeEvent;
        }
        return [delegation, originalHandler, typeEvent];
      }
      function addHandler(element, originalTypeEvent, handler, delegationFn, oneOff) {
        if (typeof originalTypeEvent !== "string" || !element) {
          return;
        }
        if (!handler) {
          handler = delegationFn;
          delegationFn = null;
        }
        if (customEventsRegex.test(originalTypeEvent)) {
          const wrapFn = (fn3) => {
            return function(event) {
              if (!event.relatedTarget || event.relatedTarget !== event.delegateTarget && !event.delegateTarget.contains(event.relatedTarget)) {
                return fn3.call(this, event);
              }
            };
          };
          if (delegationFn) {
            delegationFn = wrapFn(delegationFn);
          } else {
            handler = wrapFn(handler);
          }
        }
        const [delegation, originalHandler, typeEvent] = normalizeParams(originalTypeEvent, handler, delegationFn);
        const events = getEvent(element);
        const handlers = events[typeEvent] || (events[typeEvent] = {});
        const previousFn = findHandler(handlers, originalHandler, delegation ? handler : null);
        if (previousFn) {
          previousFn.oneOff = previousFn.oneOff && oneOff;
          return;
        }
        const uid = getUidEvent(originalHandler, originalTypeEvent.replace(namespaceRegex, ""));
        const fn2 = delegation ? bootstrapDelegationHandler(element, handler, delegationFn) : bootstrapHandler(element, handler);
        fn2.delegationSelector = delegation ? handler : null;
        fn2.originalHandler = originalHandler;
        fn2.oneOff = oneOff;
        fn2.uidEvent = uid;
        handlers[uid] = fn2;
        element.addEventListener(typeEvent, fn2, delegation);
      }
      function removeHandler(element, events, typeEvent, handler, delegationSelector) {
        const fn2 = findHandler(events[typeEvent], handler, delegationSelector);
        if (!fn2) {
          return;
        }
        element.removeEventListener(typeEvent, fn2, Boolean(delegationSelector));
        delete events[typeEvent][fn2.uidEvent];
      }
      function removeNamespacedHandlers(element, events, typeEvent, namespace) {
        const storeElementEvent = events[typeEvent] || {};
        Object.keys(storeElementEvent).forEach((handlerKey) => {
          if (handlerKey.includes(namespace)) {
            const event = storeElementEvent[handlerKey];
            removeHandler(element, events, typeEvent, event.originalHandler, event.delegationSelector);
          }
        });
      }
      function getTypeEvent(event) {
        event = event.replace(stripNameRegex, "");
        return customEvents[event] || event;
      }
      const EventHandler = {
        on(element, event, handler, delegationFn) {
          addHandler(element, event, handler, delegationFn, false);
        },
        one(element, event, handler, delegationFn) {
          addHandler(element, event, handler, delegationFn, true);
        },
        off(element, originalTypeEvent, handler, delegationFn) {
          if (typeof originalTypeEvent !== "string" || !element) {
            return;
          }
          const [delegation, originalHandler, typeEvent] = normalizeParams(originalTypeEvent, handler, delegationFn);
          const inNamespace = typeEvent !== originalTypeEvent;
          const events = getEvent(element);
          const isNamespace = originalTypeEvent.startsWith(".");
          if (typeof originalHandler !== "undefined") {
            if (!events || !events[typeEvent]) {
              return;
            }
            removeHandler(element, events, typeEvent, originalHandler, delegation ? handler : null);
            return;
          }
          if (isNamespace) {
            Object.keys(events).forEach((elementEvent) => {
              removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
            });
          }
          const storeElementEvent = events[typeEvent] || {};
          Object.keys(storeElementEvent).forEach((keyHandlers) => {
            const handlerKey = keyHandlers.replace(stripUidRegex, "");
            if (!inNamespace || originalTypeEvent.includes(handlerKey)) {
              const event = storeElementEvent[keyHandlers];
              removeHandler(element, events, typeEvent, event.originalHandler, event.delegationSelector);
            }
          });
        },
        trigger(element, event, args) {
          if (typeof event !== "string" || !element) {
            return null;
          }
          const $ = getjQuery();
          const typeEvent = getTypeEvent(event);
          const inNamespace = event !== typeEvent;
          const isNative = nativeEvents.has(typeEvent);
          let jQueryEvent;
          let bubbles = true;
          let nativeDispatch = true;
          let defaultPrevented = false;
          let evt = null;
          if (inNamespace && $) {
            jQueryEvent = $.Event(event, args);
            $(element).trigger(jQueryEvent);
            bubbles = !jQueryEvent.isPropagationStopped();
            nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
            defaultPrevented = jQueryEvent.isDefaultPrevented();
          }
          if (isNative) {
            evt = document.createEvent("HTMLEvents");
            evt.initEvent(typeEvent, bubbles, true);
          } else {
            evt = new CustomEvent(event, {
              bubbles,
              cancelable: true
            });
          }
          if (typeof args !== "undefined") {
            Object.keys(args).forEach((key) => {
              Object.defineProperty(evt, key, {
                get() {
                  return args[key];
                }
              });
            });
          }
          if (defaultPrevented) {
            evt.preventDefault();
          }
          if (nativeDispatch) {
            element.dispatchEvent(evt);
          }
          if (evt.defaultPrevented && typeof jQueryEvent !== "undefined") {
            jQueryEvent.preventDefault();
          }
          return evt;
        }
      };
      return EventHandler;
    });
  }
});

// node_modules/bootstrap/js/dist/dom/manipulator.js
var require_manipulator = __commonJS({
  "node_modules/bootstrap/js/dist/dom/manipulator.js"(exports, module) {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.Manipulator = factory());
    })(exports, function() {
      "use strict";
      function normalizeData(val) {
        if (val === "true") {
          return true;
        }
        if (val === "false") {
          return false;
        }
        if (val === Number(val).toString()) {
          return Number(val);
        }
        if (val === "" || val === "null") {
          return null;
        }
        return val;
      }
      function normalizeDataKey(key) {
        return key.replace(/[A-Z]/g, (chr) => `-${chr.toLowerCase()}`);
      }
      const Manipulator = {
        setDataAttribute(element, key, value) {
          element.setAttribute(`data-bs-${normalizeDataKey(key)}`, value);
        },
        removeDataAttribute(element, key) {
          element.removeAttribute(`data-bs-${normalizeDataKey(key)}`);
        },
        getDataAttributes(element) {
          if (!element) {
            return {};
          }
          const attributes = {};
          Object.keys(element.dataset).filter((key) => key.startsWith("bs")).forEach((key) => {
            let pureKey = key.replace(/^bs/, "");
            pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1, pureKey.length);
            attributes[pureKey] = normalizeData(element.dataset[key]);
          });
          return attributes;
        },
        getDataAttribute(element, key) {
          return normalizeData(element.getAttribute(`data-bs-${normalizeDataKey(key)}`));
        },
        offset(element) {
          const rect = element.getBoundingClientRect();
          return {
            top: rect.top + window.pageYOffset,
            left: rect.left + window.pageXOffset
          };
        },
        position(element) {
          return {
            top: element.offsetTop,
            left: element.offsetLeft
          };
        }
      };
      return Manipulator;
    });
  }
});

// node_modules/bootstrap/js/dist/dom/selector-engine.js
var require_selector_engine = __commonJS({
  "node_modules/bootstrap/js/dist/dom/selector-engine.js"(exports, module) {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.SelectorEngine = factory());
    })(exports, function() {
      "use strict";
      const isElement3 = (obj) => {
        if (!obj || typeof obj !== "object") {
          return false;
        }
        if (typeof obj.jquery !== "undefined") {
          obj = obj[0];
        }
        return typeof obj.nodeType !== "undefined";
      };
      const isVisible2 = (element) => {
        if (!isElement3(element) || element.getClientRects().length === 0) {
          return false;
        }
        return getComputedStyle(element).getPropertyValue("visibility") === "visible";
      };
      const isDisabled = (element) => {
        if (!element || element.nodeType !== Node.ELEMENT_NODE) {
          return true;
        }
        if (element.classList.contains("disabled")) {
          return true;
        }
        if (typeof element.disabled !== "undefined") {
          return element.disabled;
        }
        return element.hasAttribute("disabled") && element.getAttribute("disabled") !== "false";
      };
      const NODE_TEXT = 3;
      const SelectorEngine = {
        find(selector, element = document.documentElement) {
          return [].concat(...Element.prototype.querySelectorAll.call(element, selector));
        },
        findOne(selector, element = document.documentElement) {
          return Element.prototype.querySelector.call(element, selector);
        },
        children(element, selector) {
          return [].concat(...element.children).filter((child) => child.matches(selector));
        },
        parents(element, selector) {
          const parents = [];
          let ancestor = element.parentNode;
          while (ancestor && ancestor.nodeType === Node.ELEMENT_NODE && ancestor.nodeType !== NODE_TEXT) {
            if (ancestor.matches(selector)) {
              parents.push(ancestor);
            }
            ancestor = ancestor.parentNode;
          }
          return parents;
        },
        prev(element, selector) {
          let previous = element.previousElementSibling;
          while (previous) {
            if (previous.matches(selector)) {
              return [previous];
            }
            previous = previous.previousElementSibling;
          }
          return [];
        },
        next(element, selector) {
          let next = element.nextElementSibling;
          while (next) {
            if (next.matches(selector)) {
              return [next];
            }
            next = next.nextElementSibling;
          }
          return [];
        },
        focusableChildren(element) {
          const focusables = ["a", "button", "input", "textarea", "select", "details", "[tabindex]", '[contenteditable="true"]'].map((selector) => `${selector}:not([tabindex^="-"])`).join(", ");
          return this.find(focusables, element).filter((el) => !isDisabled(el) && isVisible2(el));
        }
      };
      return SelectorEngine;
    });
  }
});

// node_modules/bootstrap/js/dist/base-component.js
var require_base_component = __commonJS({
  "node_modules/bootstrap/js/dist/base-component.js"(exports, module) {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory(require_data(), require_event_handler()) : typeof define === "function" && define.amd ? define(["./dom/data", "./dom/event-handler"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.Base = factory(global.Data, global.EventHandler));
    })(exports, function(Data, EventHandler) {
      "use strict";
      const _interopDefaultLegacy = (e) => e && typeof e === "object" && "default" in e ? e : { default: e };
      const Data__default = _interopDefaultLegacy(Data);
      const EventHandler__default = _interopDefaultLegacy(EventHandler);
      const MILLISECONDS_MULTIPLIER = 1e3;
      const TRANSITION_END = "transitionend";
      const getTransitionDurationFromElement = (element) => {
        if (!element) {
          return 0;
        }
        let {
          transitionDuration,
          transitionDelay
        } = window.getComputedStyle(element);
        const floatTransitionDuration = Number.parseFloat(transitionDuration);
        const floatTransitionDelay = Number.parseFloat(transitionDelay);
        if (!floatTransitionDuration && !floatTransitionDelay) {
          return 0;
        }
        transitionDuration = transitionDuration.split(",")[0];
        transitionDelay = transitionDelay.split(",")[0];
        return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
      };
      const triggerTransitionEnd = (element) => {
        element.dispatchEvent(new Event(TRANSITION_END));
      };
      const isElement3 = (obj) => {
        if (!obj || typeof obj !== "object") {
          return false;
        }
        if (typeof obj.jquery !== "undefined") {
          obj = obj[0];
        }
        return typeof obj.nodeType !== "undefined";
      };
      const getElement = (obj) => {
        if (isElement3(obj)) {
          return obj.jquery ? obj[0] : obj;
        }
        if (typeof obj === "string" && obj.length > 0) {
          return document.querySelector(obj);
        }
        return null;
      };
      const execute = (callback) => {
        if (typeof callback === "function") {
          callback();
        }
      };
      const executeAfterTransition = (callback, transitionElement, waitForTransition = true) => {
        if (!waitForTransition) {
          execute(callback);
          return;
        }
        const durationPadding = 5;
        const emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding;
        let called = false;
        const handler = ({
          target
        }) => {
          if (target !== transitionElement) {
            return;
          }
          called = true;
          transitionElement.removeEventListener(TRANSITION_END, handler);
          execute(callback);
        };
        transitionElement.addEventListener(TRANSITION_END, handler);
        setTimeout(() => {
          if (!called) {
            triggerTransitionEnd(transitionElement);
          }
        }, emulatedDuration);
      };
      const VERSION = "5.1.3";
      class BaseComponent {
        constructor(element) {
          element = getElement(element);
          if (!element) {
            return;
          }
          this._element = element;
          Data__default.default.set(this._element, this.constructor.DATA_KEY, this);
        }
        dispose() {
          Data__default.default.remove(this._element, this.constructor.DATA_KEY);
          EventHandler__default.default.off(this._element, this.constructor.EVENT_KEY);
          Object.getOwnPropertyNames(this).forEach((propertyName) => {
            this[propertyName] = null;
          });
        }
        _queueCallback(callback, element, isAnimated = true) {
          executeAfterTransition(callback, element, isAnimated);
        }
        static getInstance(element) {
          return Data__default.default.get(getElement(element), this.DATA_KEY);
        }
        static getOrCreateInstance(element, config = {}) {
          return this.getInstance(element) || new this(element, typeof config === "object" ? config : null);
        }
        static get VERSION() {
          return VERSION;
        }
        static get NAME() {
          throw new Error('You have to implement the static method "NAME", for each component!');
        }
        static get DATA_KEY() {
          return `bs.${this.NAME}`;
        }
        static get EVENT_KEY() {
          return `.${this.DATA_KEY}`;
        }
      }
      return BaseComponent;
    });
  }
});

// node_modules/bootstrap/js/dist/collapse.js
var require_collapse = __commonJS({
  "node_modules/bootstrap/js/dist/collapse.js"(exports, module) {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory(require_data(), require_event_handler(), require_manipulator(), require_selector_engine(), require_base_component()) : typeof define === "function" && define.amd ? define(["./dom/data", "./dom/event-handler", "./dom/manipulator", "./dom/selector-engine", "./base-component"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.Collapse = factory(global.Data, global.EventHandler, global.Manipulator, global.SelectorEngine, global.Base));
    })(exports, function(Data, EventHandler, Manipulator, SelectorEngine, BaseComponent) {
      "use strict";
      const _interopDefaultLegacy = (e) => e && typeof e === "object" && "default" in e ? e : { default: e };
      const Data__default = _interopDefaultLegacy(Data);
      const EventHandler__default = _interopDefaultLegacy(EventHandler);
      const Manipulator__default = _interopDefaultLegacy(Manipulator);
      const SelectorEngine__default = _interopDefaultLegacy(SelectorEngine);
      const BaseComponent__default = _interopDefaultLegacy(BaseComponent);
      const toType2 = (obj) => {
        if (obj === null || obj === void 0) {
          return `${obj}`;
        }
        return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
      };
      const getSelector = (element) => {
        let selector = element.getAttribute("data-bs-target");
        if (!selector || selector === "#") {
          let hrefAttr = element.getAttribute("href");
          if (!hrefAttr || !hrefAttr.includes("#") && !hrefAttr.startsWith(".")) {
            return null;
          }
          if (hrefAttr.includes("#") && !hrefAttr.startsWith("#")) {
            hrefAttr = `#${hrefAttr.split("#")[1]}`;
          }
          selector = hrefAttr && hrefAttr !== "#" ? hrefAttr.trim() : null;
        }
        return selector;
      };
      const getSelectorFromElement = (element) => {
        const selector = getSelector(element);
        if (selector) {
          return document.querySelector(selector) ? selector : null;
        }
        return null;
      };
      const getElementFromSelector = (element) => {
        const selector = getSelector(element);
        return selector ? document.querySelector(selector) : null;
      };
      const isElement3 = (obj) => {
        if (!obj || typeof obj !== "object") {
          return false;
        }
        if (typeof obj.jquery !== "undefined") {
          obj = obj[0];
        }
        return typeof obj.nodeType !== "undefined";
      };
      const getElement = (obj) => {
        if (isElement3(obj)) {
          return obj.jquery ? obj[0] : obj;
        }
        if (typeof obj === "string" && obj.length > 0) {
          return document.querySelector(obj);
        }
        return null;
      };
      const typeCheckConfig = (componentName, config, configTypes) => {
        Object.keys(configTypes).forEach((property) => {
          const expectedTypes = configTypes[property];
          const value = config[property];
          const valueType = value && isElement3(value) ? "element" : toType2(value);
          if (!new RegExp(expectedTypes).test(valueType)) {
            throw new TypeError(`${componentName.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
          }
        });
      };
      const reflow = (element) => {
        element.offsetHeight;
      };
      const getjQuery = () => {
        const {
          jQuery
        } = window;
        if (jQuery && !document.body.hasAttribute("data-bs-no-jquery")) {
          return jQuery;
        }
        return null;
      };
      const DOMContentLoadedCallbacks = [];
      const onDOMContentLoaded = (callback) => {
        if (document.readyState === "loading") {
          if (!DOMContentLoadedCallbacks.length) {
            document.addEventListener("DOMContentLoaded", () => {
              DOMContentLoadedCallbacks.forEach((callback2) => callback2());
            });
          }
          DOMContentLoadedCallbacks.push(callback);
        } else {
          callback();
        }
      };
      const defineJQueryPlugin = (plugin2) => {
        onDOMContentLoaded(() => {
          const $ = getjQuery();
          if ($) {
            const name = plugin2.NAME;
            const JQUERY_NO_CONFLICT = $.fn[name];
            $.fn[name] = plugin2.jQueryInterface;
            $.fn[name].Constructor = plugin2;
            $.fn[name].noConflict = () => {
              $.fn[name] = JQUERY_NO_CONFLICT;
              return plugin2.jQueryInterface;
            };
          }
        });
      };
      const NAME = "collapse";
      const DATA_KEY = "bs.collapse";
      const EVENT_KEY = `.${DATA_KEY}`;
      const DATA_API_KEY = ".data-api";
      const Default = {
        toggle: true,
        parent: null
      };
      const DefaultType = {
        toggle: "boolean",
        parent: "(null|element)"
      };
      const EVENT_SHOW = `show${EVENT_KEY}`;
      const EVENT_SHOWN = `shown${EVENT_KEY}`;
      const EVENT_HIDE = `hide${EVENT_KEY}`;
      const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
      const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
      const CLASS_NAME_SHOW = "show";
      const CLASS_NAME_COLLAPSE = "collapse";
      const CLASS_NAME_COLLAPSING = "collapsing";
      const CLASS_NAME_COLLAPSED = "collapsed";
      const CLASS_NAME_DEEPER_CHILDREN = `:scope .${CLASS_NAME_COLLAPSE} .${CLASS_NAME_COLLAPSE}`;
      const CLASS_NAME_HORIZONTAL = "collapse-horizontal";
      const WIDTH = "width";
      const HEIGHT = "height";
      const SELECTOR_ACTIVES = ".collapse.show, .collapse.collapsing";
      const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="collapse"]';
      class Collapse2 extends BaseComponent__default.default {
        constructor(element, config) {
          super(element);
          this._isTransitioning = false;
          this._config = this._getConfig(config);
          this._triggerArray = [];
          const toggleList = SelectorEngine__default.default.find(SELECTOR_DATA_TOGGLE);
          for (let i = 0, len = toggleList.length; i < len; i++) {
            const elem = toggleList[i];
            const selector = getSelectorFromElement(elem);
            const filterElement = SelectorEngine__default.default.find(selector).filter((foundElem) => foundElem === this._element);
            if (selector !== null && filterElement.length) {
              this._selector = selector;
              this._triggerArray.push(elem);
            }
          }
          this._initializeChildren();
          if (!this._config.parent) {
            this._addAriaAndCollapsedClass(this._triggerArray, this._isShown());
          }
          if (this._config.toggle) {
            this.toggle();
          }
        }
        static get Default() {
          return Default;
        }
        static get NAME() {
          return NAME;
        }
        toggle() {
          if (this._isShown()) {
            this.hide();
          } else {
            this.show();
          }
        }
        show() {
          if (this._isTransitioning || this._isShown()) {
            return;
          }
          let actives = [];
          let activesData;
          if (this._config.parent) {
            const children = SelectorEngine__default.default.find(CLASS_NAME_DEEPER_CHILDREN, this._config.parent);
            actives = SelectorEngine__default.default.find(SELECTOR_ACTIVES, this._config.parent).filter((elem) => !children.includes(elem));
          }
          const container = SelectorEngine__default.default.findOne(this._selector);
          if (actives.length) {
            const tempActiveData = actives.find((elem) => container !== elem);
            activesData = tempActiveData ? Collapse2.getInstance(tempActiveData) : null;
            if (activesData && activesData._isTransitioning) {
              return;
            }
          }
          const startEvent = EventHandler__default.default.trigger(this._element, EVENT_SHOW);
          if (startEvent.defaultPrevented) {
            return;
          }
          actives.forEach((elemActive) => {
            if (container !== elemActive) {
              Collapse2.getOrCreateInstance(elemActive, {
                toggle: false
              }).hide();
            }
            if (!activesData) {
              Data__default.default.set(elemActive, DATA_KEY, null);
            }
          });
          const dimension = this._getDimension();
          this._element.classList.remove(CLASS_NAME_COLLAPSE);
          this._element.classList.add(CLASS_NAME_COLLAPSING);
          this._element.style[dimension] = 0;
          this._addAriaAndCollapsedClass(this._triggerArray, true);
          this._isTransitioning = true;
          const complete = () => {
            this._isTransitioning = false;
            this._element.classList.remove(CLASS_NAME_COLLAPSING);
            this._element.classList.add(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW);
            this._element.style[dimension] = "";
            EventHandler__default.default.trigger(this._element, EVENT_SHOWN);
          };
          const capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
          const scrollSize = `scroll${capitalizedDimension}`;
          this._queueCallback(complete, this._element, true);
          this._element.style[dimension] = `${this._element[scrollSize]}px`;
        }
        hide() {
          if (this._isTransitioning || !this._isShown()) {
            return;
          }
          const startEvent = EventHandler__default.default.trigger(this._element, EVENT_HIDE);
          if (startEvent.defaultPrevented) {
            return;
          }
          const dimension = this._getDimension();
          this._element.style[dimension] = `${this._element.getBoundingClientRect()[dimension]}px`;
          reflow(this._element);
          this._element.classList.add(CLASS_NAME_COLLAPSING);
          this._element.classList.remove(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW);
          const triggerArrayLength = this._triggerArray.length;
          for (let i = 0; i < triggerArrayLength; i++) {
            const trigger = this._triggerArray[i];
            const elem = getElementFromSelector(trigger);
            if (elem && !this._isShown(elem)) {
              this._addAriaAndCollapsedClass([trigger], false);
            }
          }
          this._isTransitioning = true;
          const complete = () => {
            this._isTransitioning = false;
            this._element.classList.remove(CLASS_NAME_COLLAPSING);
            this._element.classList.add(CLASS_NAME_COLLAPSE);
            EventHandler__default.default.trigger(this._element, EVENT_HIDDEN);
          };
          this._element.style[dimension] = "";
          this._queueCallback(complete, this._element, true);
        }
        _isShown(element = this._element) {
          return element.classList.contains(CLASS_NAME_SHOW);
        }
        _getConfig(config) {
          config = __spreadValues(__spreadValues(__spreadValues({}, Default), Manipulator__default.default.getDataAttributes(this._element)), config);
          config.toggle = Boolean(config.toggle);
          config.parent = getElement(config.parent);
          typeCheckConfig(NAME, config, DefaultType);
          return config;
        }
        _getDimension() {
          return this._element.classList.contains(CLASS_NAME_HORIZONTAL) ? WIDTH : HEIGHT;
        }
        _initializeChildren() {
          if (!this._config.parent) {
            return;
          }
          const children = SelectorEngine__default.default.find(CLASS_NAME_DEEPER_CHILDREN, this._config.parent);
          SelectorEngine__default.default.find(SELECTOR_DATA_TOGGLE, this._config.parent).filter((elem) => !children.includes(elem)).forEach((element) => {
            const selected = getElementFromSelector(element);
            if (selected) {
              this._addAriaAndCollapsedClass([element], this._isShown(selected));
            }
          });
        }
        _addAriaAndCollapsedClass(triggerArray, isOpen) {
          if (!triggerArray.length) {
            return;
          }
          triggerArray.forEach((elem) => {
            if (isOpen) {
              elem.classList.remove(CLASS_NAME_COLLAPSED);
            } else {
              elem.classList.add(CLASS_NAME_COLLAPSED);
            }
            elem.setAttribute("aria-expanded", isOpen);
          });
        }
        static jQueryInterface(config) {
          return this.each(function() {
            const _config = {};
            if (typeof config === "string" && /show|hide/.test(config)) {
              _config.toggle = false;
            }
            const data = Collapse2.getOrCreateInstance(this, _config);
            if (typeof config === "string") {
              if (typeof data[config] === "undefined") {
                throw new TypeError(`No method named "${config}"`);
              }
              data[config]();
            }
          });
        }
      }
      EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function(event) {
        if (event.target.tagName === "A" || event.delegateTarget && event.delegateTarget.tagName === "A") {
          event.preventDefault();
        }
        const selector = getSelectorFromElement(this);
        const selectorElements = SelectorEngine__default.default.find(selector);
        selectorElements.forEach((element) => {
          Collapse2.getOrCreateInstance(element, {
            toggle: false
          }).toggle();
        });
      });
      defineJQueryPlugin(Collapse2);
      return Collapse2;
    });
  }
});

// node_modules/bootstrap/js/dist/alert.js
var require_alert = __commonJS({
  "node_modules/bootstrap/js/dist/alert.js"(exports, module) {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory(require_event_handler(), require_base_component()) : typeof define === "function" && define.amd ? define(["./dom/event-handler", "./base-component"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.Alert = factory(global.EventHandler, global.Base));
    })(exports, function(EventHandler, BaseComponent) {
      "use strict";
      const _interopDefaultLegacy = (e) => e && typeof e === "object" && "default" in e ? e : { default: e };
      const EventHandler__default = _interopDefaultLegacy(EventHandler);
      const BaseComponent__default = _interopDefaultLegacy(BaseComponent);
      const getSelector = (element) => {
        let selector = element.getAttribute("data-bs-target");
        if (!selector || selector === "#") {
          let hrefAttr = element.getAttribute("href");
          if (!hrefAttr || !hrefAttr.includes("#") && !hrefAttr.startsWith(".")) {
            return null;
          }
          if (hrefAttr.includes("#") && !hrefAttr.startsWith("#")) {
            hrefAttr = `#${hrefAttr.split("#")[1]}`;
          }
          selector = hrefAttr && hrefAttr !== "#" ? hrefAttr.trim() : null;
        }
        return selector;
      };
      const getElementFromSelector = (element) => {
        const selector = getSelector(element);
        return selector ? document.querySelector(selector) : null;
      };
      const isDisabled = (element) => {
        if (!element || element.nodeType !== Node.ELEMENT_NODE) {
          return true;
        }
        if (element.classList.contains("disabled")) {
          return true;
        }
        if (typeof element.disabled !== "undefined") {
          return element.disabled;
        }
        return element.hasAttribute("disabled") && element.getAttribute("disabled") !== "false";
      };
      const getjQuery = () => {
        const {
          jQuery
        } = window;
        if (jQuery && !document.body.hasAttribute("data-bs-no-jquery")) {
          return jQuery;
        }
        return null;
      };
      const DOMContentLoadedCallbacks = [];
      const onDOMContentLoaded = (callback) => {
        if (document.readyState === "loading") {
          if (!DOMContentLoadedCallbacks.length) {
            document.addEventListener("DOMContentLoaded", () => {
              DOMContentLoadedCallbacks.forEach((callback2) => callback2());
            });
          }
          DOMContentLoadedCallbacks.push(callback);
        } else {
          callback();
        }
      };
      const defineJQueryPlugin = (plugin2) => {
        onDOMContentLoaded(() => {
          const $ = getjQuery();
          if ($) {
            const name = plugin2.NAME;
            const JQUERY_NO_CONFLICT = $.fn[name];
            $.fn[name] = plugin2.jQueryInterface;
            $.fn[name].Constructor = plugin2;
            $.fn[name].noConflict = () => {
              $.fn[name] = JQUERY_NO_CONFLICT;
              return plugin2.jQueryInterface;
            };
          }
        });
      };
      const enableDismissTrigger = (component, method = "hide") => {
        const clickEvent = `click.dismiss${component.EVENT_KEY}`;
        const name = component.NAME;
        EventHandler__default.default.on(document, clickEvent, `[data-bs-dismiss="${name}"]`, function(event) {
          if (["A", "AREA"].includes(this.tagName)) {
            event.preventDefault();
          }
          if (isDisabled(this)) {
            return;
          }
          const target = getElementFromSelector(this) || this.closest(`.${name}`);
          const instance = component.getOrCreateInstance(target);
          instance[method]();
        });
      };
      const NAME = "alert";
      const DATA_KEY = "bs.alert";
      const EVENT_KEY = `.${DATA_KEY}`;
      const EVENT_CLOSE = `close${EVENT_KEY}`;
      const EVENT_CLOSED = `closed${EVENT_KEY}`;
      const CLASS_NAME_FADE = "fade";
      const CLASS_NAME_SHOW = "show";
      class Alert2 extends BaseComponent__default.default {
        static get NAME() {
          return NAME;
        }
        close() {
          const closeEvent = EventHandler__default.default.trigger(this._element, EVENT_CLOSE);
          if (closeEvent.defaultPrevented) {
            return;
          }
          this._element.classList.remove(CLASS_NAME_SHOW);
          const isAnimated = this._element.classList.contains(CLASS_NAME_FADE);
          this._queueCallback(() => this._destroyElement(), this._element, isAnimated);
        }
        _destroyElement() {
          this._element.remove();
          EventHandler__default.default.trigger(this._element, EVENT_CLOSED);
          this.dispose();
        }
        static jQueryInterface(config) {
          return this.each(function() {
            const data = Alert2.getOrCreateInstance(this);
            if (typeof config !== "string") {
              return;
            }
            if (data[config] === void 0 || config.startsWith("_") || config === "constructor") {
              throw new TypeError(`No method named "${config}"`);
            }
            data[config](this);
          });
        }
      }
      enableDismissTrigger(Alert2, "close");
      defineJQueryPlugin(Alert2);
      return Alert2;
    });
  }
});

// node_modules/bootstrap/js/dist/carousel.js
var require_carousel = __commonJS({
  "node_modules/bootstrap/js/dist/carousel.js"(exports, module) {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory(require_event_handler(), require_manipulator(), require_selector_engine(), require_base_component()) : typeof define === "function" && define.amd ? define(["./dom/event-handler", "./dom/manipulator", "./dom/selector-engine", "./base-component"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.Carousel = factory(global.EventHandler, global.Manipulator, global.SelectorEngine, global.Base));
    })(exports, function(EventHandler, Manipulator, SelectorEngine, BaseComponent) {
      "use strict";
      const _interopDefaultLegacy = (e) => e && typeof e === "object" && "default" in e ? e : { default: e };
      const EventHandler__default = _interopDefaultLegacy(EventHandler);
      const Manipulator__default = _interopDefaultLegacy(Manipulator);
      const SelectorEngine__default = _interopDefaultLegacy(SelectorEngine);
      const BaseComponent__default = _interopDefaultLegacy(BaseComponent);
      const TRANSITION_END = "transitionend";
      const toType2 = (obj) => {
        if (obj === null || obj === void 0) {
          return `${obj}`;
        }
        return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
      };
      const getSelector = (element) => {
        let selector = element.getAttribute("data-bs-target");
        if (!selector || selector === "#") {
          let hrefAttr = element.getAttribute("href");
          if (!hrefAttr || !hrefAttr.includes("#") && !hrefAttr.startsWith(".")) {
            return null;
          }
          if (hrefAttr.includes("#") && !hrefAttr.startsWith("#")) {
            hrefAttr = `#${hrefAttr.split("#")[1]}`;
          }
          selector = hrefAttr && hrefAttr !== "#" ? hrefAttr.trim() : null;
        }
        return selector;
      };
      const getElementFromSelector = (element) => {
        const selector = getSelector(element);
        return selector ? document.querySelector(selector) : null;
      };
      const triggerTransitionEnd = (element) => {
        element.dispatchEvent(new Event(TRANSITION_END));
      };
      const isElement3 = (obj) => {
        if (!obj || typeof obj !== "object") {
          return false;
        }
        if (typeof obj.jquery !== "undefined") {
          obj = obj[0];
        }
        return typeof obj.nodeType !== "undefined";
      };
      const typeCheckConfig = (componentName, config, configTypes) => {
        Object.keys(configTypes).forEach((property) => {
          const expectedTypes = configTypes[property];
          const value = config[property];
          const valueType = value && isElement3(value) ? "element" : toType2(value);
          if (!new RegExp(expectedTypes).test(valueType)) {
            throw new TypeError(`${componentName.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
          }
        });
      };
      const isVisible2 = (element) => {
        if (!isElement3(element) || element.getClientRects().length === 0) {
          return false;
        }
        return getComputedStyle(element).getPropertyValue("visibility") === "visible";
      };
      const reflow = (element) => {
        element.offsetHeight;
      };
      const getjQuery = () => {
        const {
          jQuery
        } = window;
        if (jQuery && !document.body.hasAttribute("data-bs-no-jquery")) {
          return jQuery;
        }
        return null;
      };
      const DOMContentLoadedCallbacks = [];
      const onDOMContentLoaded = (callback) => {
        if (document.readyState === "loading") {
          if (!DOMContentLoadedCallbacks.length) {
            document.addEventListener("DOMContentLoaded", () => {
              DOMContentLoadedCallbacks.forEach((callback2) => callback2());
            });
          }
          DOMContentLoadedCallbacks.push(callback);
        } else {
          callback();
        }
      };
      const isRTL = () => document.documentElement.dir === "rtl";
      const defineJQueryPlugin = (plugin2) => {
        onDOMContentLoaded(() => {
          const $ = getjQuery();
          if ($) {
            const name = plugin2.NAME;
            const JQUERY_NO_CONFLICT = $.fn[name];
            $.fn[name] = plugin2.jQueryInterface;
            $.fn[name].Constructor = plugin2;
            $.fn[name].noConflict = () => {
              $.fn[name] = JQUERY_NO_CONFLICT;
              return plugin2.jQueryInterface;
            };
          }
        });
      };
      const getNextActiveElement = (list, activeElement, shouldGetNext, isCycleAllowed) => {
        let index = list.indexOf(activeElement);
        if (index === -1) {
          return list[!shouldGetNext && isCycleAllowed ? list.length - 1 : 0];
        }
        const listLength = list.length;
        index += shouldGetNext ? 1 : -1;
        if (isCycleAllowed) {
          index = (index + listLength) % listLength;
        }
        return list[Math.max(0, Math.min(index, listLength - 1))];
      };
      const NAME = "carousel";
      const DATA_KEY = "bs.carousel";
      const EVENT_KEY = `.${DATA_KEY}`;
      const DATA_API_KEY = ".data-api";
      const ARROW_LEFT_KEY = "ArrowLeft";
      const ARROW_RIGHT_KEY = "ArrowRight";
      const TOUCHEVENT_COMPAT_WAIT = 500;
      const SWIPE_THRESHOLD = 40;
      const Default = {
        interval: 5e3,
        keyboard: true,
        slide: false,
        pause: "hover",
        wrap: true,
        touch: true
      };
      const DefaultType = {
        interval: "(number|boolean)",
        keyboard: "boolean",
        slide: "(boolean|string)",
        pause: "(string|boolean)",
        wrap: "boolean",
        touch: "boolean"
      };
      const ORDER_NEXT = "next";
      const ORDER_PREV = "prev";
      const DIRECTION_LEFT = "left";
      const DIRECTION_RIGHT = "right";
      const KEY_TO_DIRECTION = {
        [ARROW_LEFT_KEY]: DIRECTION_RIGHT,
        [ARROW_RIGHT_KEY]: DIRECTION_LEFT
      };
      const EVENT_SLIDE = `slide${EVENT_KEY}`;
      const EVENT_SLID = `slid${EVENT_KEY}`;
      const EVENT_KEYDOWN = `keydown${EVENT_KEY}`;
      const EVENT_MOUSEENTER = `mouseenter${EVENT_KEY}`;
      const EVENT_MOUSELEAVE = `mouseleave${EVENT_KEY}`;
      const EVENT_TOUCHSTART = `touchstart${EVENT_KEY}`;
      const EVENT_TOUCHMOVE = `touchmove${EVENT_KEY}`;
      const EVENT_TOUCHEND = `touchend${EVENT_KEY}`;
      const EVENT_POINTERDOWN = `pointerdown${EVENT_KEY}`;
      const EVENT_POINTERUP = `pointerup${EVENT_KEY}`;
      const EVENT_DRAG_START = `dragstart${EVENT_KEY}`;
      const EVENT_LOAD_DATA_API = `load${EVENT_KEY}${DATA_API_KEY}`;
      const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
      const CLASS_NAME_CAROUSEL = "carousel";
      const CLASS_NAME_ACTIVE = "active";
      const CLASS_NAME_SLIDE = "slide";
      const CLASS_NAME_END = "carousel-item-end";
      const CLASS_NAME_START = "carousel-item-start";
      const CLASS_NAME_NEXT = "carousel-item-next";
      const CLASS_NAME_PREV = "carousel-item-prev";
      const CLASS_NAME_POINTER_EVENT = "pointer-event";
      const SELECTOR_ACTIVE = ".active";
      const SELECTOR_ACTIVE_ITEM = ".active.carousel-item";
      const SELECTOR_ITEM = ".carousel-item";
      const SELECTOR_ITEM_IMG = ".carousel-item img";
      const SELECTOR_NEXT_PREV = ".carousel-item-next, .carousel-item-prev";
      const SELECTOR_INDICATORS = ".carousel-indicators";
      const SELECTOR_INDICATOR = "[data-bs-target]";
      const SELECTOR_DATA_SLIDE = "[data-bs-slide], [data-bs-slide-to]";
      const SELECTOR_DATA_RIDE = '[data-bs-ride="carousel"]';
      const POINTER_TYPE_TOUCH = "touch";
      const POINTER_TYPE_PEN = "pen";
      class Carousel2 extends BaseComponent__default.default {
        constructor(element, config) {
          super(element);
          this._items = null;
          this._interval = null;
          this._activeElement = null;
          this._isPaused = false;
          this._isSliding = false;
          this.touchTimeout = null;
          this.touchStartX = 0;
          this.touchDeltaX = 0;
          this._config = this._getConfig(config);
          this._indicatorsElement = SelectorEngine__default.default.findOne(SELECTOR_INDICATORS, this._element);
          this._touchSupported = "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0;
          this._pointerEvent = Boolean(window.PointerEvent);
          this._addEventListeners();
        }
        static get Default() {
          return Default;
        }
        static get NAME() {
          return NAME;
        }
        next() {
          this._slide(ORDER_NEXT);
        }
        nextWhenVisible() {
          if (!document.hidden && isVisible2(this._element)) {
            this.next();
          }
        }
        prev() {
          this._slide(ORDER_PREV);
        }
        pause(event) {
          if (!event) {
            this._isPaused = true;
          }
          if (SelectorEngine__default.default.findOne(SELECTOR_NEXT_PREV, this._element)) {
            triggerTransitionEnd(this._element);
            this.cycle(true);
          }
          clearInterval(this._interval);
          this._interval = null;
        }
        cycle(event) {
          if (!event) {
            this._isPaused = false;
          }
          if (this._interval) {
            clearInterval(this._interval);
            this._interval = null;
          }
          if (this._config && this._config.interval && !this._isPaused) {
            this._updateInterval();
            this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
          }
        }
        to(index) {
          this._activeElement = SelectorEngine__default.default.findOne(SELECTOR_ACTIVE_ITEM, this._element);
          const activeIndex = this._getItemIndex(this._activeElement);
          if (index > this._items.length - 1 || index < 0) {
            return;
          }
          if (this._isSliding) {
            EventHandler__default.default.one(this._element, EVENT_SLID, () => this.to(index));
            return;
          }
          if (activeIndex === index) {
            this.pause();
            this.cycle();
            return;
          }
          const order2 = index > activeIndex ? ORDER_NEXT : ORDER_PREV;
          this._slide(order2, this._items[index]);
        }
        _getConfig(config) {
          config = __spreadValues(__spreadValues(__spreadValues({}, Default), Manipulator__default.default.getDataAttributes(this._element)), typeof config === "object" ? config : {});
          typeCheckConfig(NAME, config, DefaultType);
          return config;
        }
        _handleSwipe() {
          const absDeltax = Math.abs(this.touchDeltaX);
          if (absDeltax <= SWIPE_THRESHOLD) {
            return;
          }
          const direction = absDeltax / this.touchDeltaX;
          this.touchDeltaX = 0;
          if (!direction) {
            return;
          }
          this._slide(direction > 0 ? DIRECTION_RIGHT : DIRECTION_LEFT);
        }
        _addEventListeners() {
          if (this._config.keyboard) {
            EventHandler__default.default.on(this._element, EVENT_KEYDOWN, (event) => this._keydown(event));
          }
          if (this._config.pause === "hover") {
            EventHandler__default.default.on(this._element, EVENT_MOUSEENTER, (event) => this.pause(event));
            EventHandler__default.default.on(this._element, EVENT_MOUSELEAVE, (event) => this.cycle(event));
          }
          if (this._config.touch && this._touchSupported) {
            this._addTouchEventListeners();
          }
        }
        _addTouchEventListeners() {
          const hasPointerPenTouch = (event) => {
            return this._pointerEvent && (event.pointerType === POINTER_TYPE_PEN || event.pointerType === POINTER_TYPE_TOUCH);
          };
          const start2 = (event) => {
            if (hasPointerPenTouch(event)) {
              this.touchStartX = event.clientX;
            } else if (!this._pointerEvent) {
              this.touchStartX = event.touches[0].clientX;
            }
          };
          const move = (event) => {
            this.touchDeltaX = event.touches && event.touches.length > 1 ? 0 : event.touches[0].clientX - this.touchStartX;
          };
          const end2 = (event) => {
            if (hasPointerPenTouch(event)) {
              this.touchDeltaX = event.clientX - this.touchStartX;
            }
            this._handleSwipe();
            if (this._config.pause === "hover") {
              this.pause();
              if (this.touchTimeout) {
                clearTimeout(this.touchTimeout);
              }
              this.touchTimeout = setTimeout((event2) => this.cycle(event2), TOUCHEVENT_COMPAT_WAIT + this._config.interval);
            }
          };
          SelectorEngine__default.default.find(SELECTOR_ITEM_IMG, this._element).forEach((itemImg) => {
            EventHandler__default.default.on(itemImg, EVENT_DRAG_START, (event) => event.preventDefault());
          });
          if (this._pointerEvent) {
            EventHandler__default.default.on(this._element, EVENT_POINTERDOWN, (event) => start2(event));
            EventHandler__default.default.on(this._element, EVENT_POINTERUP, (event) => end2(event));
            this._element.classList.add(CLASS_NAME_POINTER_EVENT);
          } else {
            EventHandler__default.default.on(this._element, EVENT_TOUCHSTART, (event) => start2(event));
            EventHandler__default.default.on(this._element, EVENT_TOUCHMOVE, (event) => move(event));
            EventHandler__default.default.on(this._element, EVENT_TOUCHEND, (event) => end2(event));
          }
        }
        _keydown(event) {
          if (/input|textarea/i.test(event.target.tagName)) {
            return;
          }
          const direction = KEY_TO_DIRECTION[event.key];
          if (direction) {
            event.preventDefault();
            this._slide(direction);
          }
        }
        _getItemIndex(element) {
          this._items = element && element.parentNode ? SelectorEngine__default.default.find(SELECTOR_ITEM, element.parentNode) : [];
          return this._items.indexOf(element);
        }
        _getItemByOrder(order2, activeElement) {
          const isNext = order2 === ORDER_NEXT;
          return getNextActiveElement(this._items, activeElement, isNext, this._config.wrap);
        }
        _triggerSlideEvent(relatedTarget, eventDirectionName) {
          const targetIndex = this._getItemIndex(relatedTarget);
          const fromIndex = this._getItemIndex(SelectorEngine__default.default.findOne(SELECTOR_ACTIVE_ITEM, this._element));
          return EventHandler__default.default.trigger(this._element, EVENT_SLIDE, {
            relatedTarget,
            direction: eventDirectionName,
            from: fromIndex,
            to: targetIndex
          });
        }
        _setActiveIndicatorElement(element) {
          if (this._indicatorsElement) {
            const activeIndicator = SelectorEngine__default.default.findOne(SELECTOR_ACTIVE, this._indicatorsElement);
            activeIndicator.classList.remove(CLASS_NAME_ACTIVE);
            activeIndicator.removeAttribute("aria-current");
            const indicators = SelectorEngine__default.default.find(SELECTOR_INDICATOR, this._indicatorsElement);
            for (let i = 0; i < indicators.length; i++) {
              if (Number.parseInt(indicators[i].getAttribute("data-bs-slide-to"), 10) === this._getItemIndex(element)) {
                indicators[i].classList.add(CLASS_NAME_ACTIVE);
                indicators[i].setAttribute("aria-current", "true");
                break;
              }
            }
          }
        }
        _updateInterval() {
          const element = this._activeElement || SelectorEngine__default.default.findOne(SELECTOR_ACTIVE_ITEM, this._element);
          if (!element) {
            return;
          }
          const elementInterval = Number.parseInt(element.getAttribute("data-bs-interval"), 10);
          if (elementInterval) {
            this._config.defaultInterval = this._config.defaultInterval || this._config.interval;
            this._config.interval = elementInterval;
          } else {
            this._config.interval = this._config.defaultInterval || this._config.interval;
          }
        }
        _slide(directionOrOrder, element) {
          const order2 = this._directionToOrder(directionOrOrder);
          const activeElement = SelectorEngine__default.default.findOne(SELECTOR_ACTIVE_ITEM, this._element);
          const activeElementIndex = this._getItemIndex(activeElement);
          const nextElement = element || this._getItemByOrder(order2, activeElement);
          const nextElementIndex = this._getItemIndex(nextElement);
          const isCycling = Boolean(this._interval);
          const isNext = order2 === ORDER_NEXT;
          const directionalClassName = isNext ? CLASS_NAME_START : CLASS_NAME_END;
          const orderClassName = isNext ? CLASS_NAME_NEXT : CLASS_NAME_PREV;
          const eventDirectionName = this._orderToDirection(order2);
          if (nextElement && nextElement.classList.contains(CLASS_NAME_ACTIVE)) {
            this._isSliding = false;
            return;
          }
          if (this._isSliding) {
            return;
          }
          const slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);
          if (slideEvent.defaultPrevented) {
            return;
          }
          if (!activeElement || !nextElement) {
            return;
          }
          this._isSliding = true;
          if (isCycling) {
            this.pause();
          }
          this._setActiveIndicatorElement(nextElement);
          this._activeElement = nextElement;
          const triggerSlidEvent = () => {
            EventHandler__default.default.trigger(this._element, EVENT_SLID, {
              relatedTarget: nextElement,
              direction: eventDirectionName,
              from: activeElementIndex,
              to: nextElementIndex
            });
          };
          if (this._element.classList.contains(CLASS_NAME_SLIDE)) {
            nextElement.classList.add(orderClassName);
            reflow(nextElement);
            activeElement.classList.add(directionalClassName);
            nextElement.classList.add(directionalClassName);
            const completeCallBack = () => {
              nextElement.classList.remove(directionalClassName, orderClassName);
              nextElement.classList.add(CLASS_NAME_ACTIVE);
              activeElement.classList.remove(CLASS_NAME_ACTIVE, orderClassName, directionalClassName);
              this._isSliding = false;
              setTimeout(triggerSlidEvent, 0);
            };
            this._queueCallback(completeCallBack, activeElement, true);
          } else {
            activeElement.classList.remove(CLASS_NAME_ACTIVE);
            nextElement.classList.add(CLASS_NAME_ACTIVE);
            this._isSliding = false;
            triggerSlidEvent();
          }
          if (isCycling) {
            this.cycle();
          }
        }
        _directionToOrder(direction) {
          if (![DIRECTION_RIGHT, DIRECTION_LEFT].includes(direction)) {
            return direction;
          }
          if (isRTL()) {
            return direction === DIRECTION_LEFT ? ORDER_PREV : ORDER_NEXT;
          }
          return direction === DIRECTION_LEFT ? ORDER_NEXT : ORDER_PREV;
        }
        _orderToDirection(order2) {
          if (![ORDER_NEXT, ORDER_PREV].includes(order2)) {
            return order2;
          }
          if (isRTL()) {
            return order2 === ORDER_PREV ? DIRECTION_LEFT : DIRECTION_RIGHT;
          }
          return order2 === ORDER_PREV ? DIRECTION_RIGHT : DIRECTION_LEFT;
        }
        static carouselInterface(element, config) {
          const data = Carousel2.getOrCreateInstance(element, config);
          let {
            _config
          } = data;
          if (typeof config === "object") {
            _config = __spreadValues(__spreadValues({}, _config), config);
          }
          const action = typeof config === "string" ? config : _config.slide;
          if (typeof config === "number") {
            data.to(config);
          } else if (typeof action === "string") {
            if (typeof data[action] === "undefined") {
              throw new TypeError(`No method named "${action}"`);
            }
            data[action]();
          } else if (_config.interval && _config.ride) {
            data.pause();
            data.cycle();
          }
        }
        static jQueryInterface(config) {
          return this.each(function() {
            Carousel2.carouselInterface(this, config);
          });
        }
        static dataApiClickHandler(event) {
          const target = getElementFromSelector(this);
          if (!target || !target.classList.contains(CLASS_NAME_CAROUSEL)) {
            return;
          }
          const config = __spreadValues(__spreadValues({}, Manipulator__default.default.getDataAttributes(target)), Manipulator__default.default.getDataAttributes(this));
          const slideIndex = this.getAttribute("data-bs-slide-to");
          if (slideIndex) {
            config.interval = false;
          }
          Carousel2.carouselInterface(target, config);
          if (slideIndex) {
            Carousel2.getInstance(target).to(slideIndex);
          }
          event.preventDefault();
        }
      }
      EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_SLIDE, Carousel2.dataApiClickHandler);
      EventHandler__default.default.on(window, EVENT_LOAD_DATA_API, () => {
        const carousels = SelectorEngine__default.default.find(SELECTOR_DATA_RIDE);
        for (let i = 0, len = carousels.length; i < len; i++) {
          Carousel2.carouselInterface(carousels[i], Carousel2.getInstance(carousels[i]));
        }
      });
      defineJQueryPlugin(Carousel2);
      return Carousel2;
    });
  }
});

// node_modules/@popperjs/core/lib/enums.js
var top, bottom, right, left, auto, basePlacements, start, end, clippingParents, viewport, popper, reference, variationPlacements, placements, beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite, modifierPhases;
var init_enums = __esm({
  "node_modules/@popperjs/core/lib/enums.js"() {
    top = "top";
    bottom = "bottom";
    right = "right";
    left = "left";
    auto = "auto";
    basePlacements = [top, bottom, right, left];
    start = "start";
    end = "end";
    clippingParents = "clippingParents";
    viewport = "viewport";
    popper = "popper";
    reference = "reference";
    variationPlacements = basePlacements.reduce(function(acc, placement) {
      return acc.concat([placement + "-" + start, placement + "-" + end]);
    }, []);
    placements = [].concat(basePlacements, [auto]).reduce(function(acc, placement) {
      return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
    }, []);
    beforeRead = "beforeRead";
    read = "read";
    afterRead = "afterRead";
    beforeMain = "beforeMain";
    main = "main";
    afterMain = "afterMain";
    beforeWrite = "beforeWrite";
    write = "write";
    afterWrite = "afterWrite";
    modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];
  }
});

// node_modules/@popperjs/core/lib/dom-utils/getNodeName.js
function getNodeName(element) {
  return element ? (element.nodeName || "").toLowerCase() : null;
}
var init_getNodeName = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/getNodeName.js"() {
  }
});

// node_modules/@popperjs/core/lib/dom-utils/getWindow.js
function getWindow(node) {
  if (node == null) {
    return window;
  }
  if (node.toString() !== "[object Window]") {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }
  return node;
}
var init_getWindow = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/getWindow.js"() {
  }
});

// node_modules/@popperjs/core/lib/dom-utils/instanceOf.js
function isElement(node) {
  var OwnElement = getWindow(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}
function isHTMLElement(node) {
  var OwnElement = getWindow(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}
function isShadowRoot(node) {
  if (typeof ShadowRoot === "undefined") {
    return false;
  }
  var OwnElement = getWindow(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}
var init_instanceOf = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/instanceOf.js"() {
    init_getWindow();
  }
});

// node_modules/@popperjs/core/lib/modifiers/applyStyles.js
function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function(name) {
    var style = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name];
    if (!isHTMLElement(element) || !getNodeName(element)) {
      return;
    }
    Object.assign(element.style, style);
    Object.keys(attributes).forEach(function(name2) {
      var value = attributes[name2];
      if (value === false) {
        element.removeAttribute(name2);
      } else {
        element.setAttribute(name2, value === true ? "" : value);
      }
    });
  });
}
function effect(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);
  state.styles = initialStyles;
  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }
  return function() {
    Object.keys(state.elements).forEach(function(name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]);
      var style = styleProperties.reduce(function(style2, property) {
        style2[property] = "";
        return style2;
      }, {});
      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      }
      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function(attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
}
var applyStyles_default;
var init_applyStyles = __esm({
  "node_modules/@popperjs/core/lib/modifiers/applyStyles.js"() {
    init_getNodeName();
    init_instanceOf();
    applyStyles_default = {
      name: "applyStyles",
      enabled: true,
      phase: "write",
      fn: applyStyles,
      effect,
      requires: ["computeStyles"]
    };
  }
});

// node_modules/@popperjs/core/lib/utils/getBasePlacement.js
function getBasePlacement(placement) {
  return placement.split("-")[0];
}
var init_getBasePlacement = __esm({
  "node_modules/@popperjs/core/lib/utils/getBasePlacement.js"() {
    init_enums();
  }
});

// node_modules/@popperjs/core/lib/utils/math.js
var max, min, round;
var init_math = __esm({
  "node_modules/@popperjs/core/lib/utils/math.js"() {
    max = Math.max;
    min = Math.min;
    round = Math.round;
  }
});

// node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js
function getBoundingClientRect(element, includeScale) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  var rect = element.getBoundingClientRect();
  var scaleX = 1;
  var scaleY = 1;
  if (isHTMLElement(element) && includeScale) {
    var offsetHeight = element.offsetHeight;
    var offsetWidth = element.offsetWidth;
    if (offsetWidth > 0) {
      scaleX = round(rect.width) / offsetWidth || 1;
    }
    if (offsetHeight > 0) {
      scaleY = round(rect.height) / offsetHeight || 1;
    }
  }
  return {
    width: rect.width / scaleX,
    height: rect.height / scaleY,
    top: rect.top / scaleY,
    right: rect.right / scaleX,
    bottom: rect.bottom / scaleY,
    left: rect.left / scaleX,
    x: rect.left / scaleX,
    y: rect.top / scaleY
  };
}
var init_getBoundingClientRect = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js"() {
    init_instanceOf();
    init_math();
  }
});

// node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js
function getLayoutRect(element) {
  var clientRect = getBoundingClientRect(element);
  var width = element.offsetWidth;
  var height = element.offsetHeight;
  if (Math.abs(clientRect.width - width) <= 1) {
    width = clientRect.width;
  }
  if (Math.abs(clientRect.height - height) <= 1) {
    height = clientRect.height;
  }
  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width,
    height
  };
}
var init_getLayoutRect = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js"() {
    init_getBoundingClientRect();
  }
});

// node_modules/@popperjs/core/lib/dom-utils/contains.js
function contains(parent, child) {
  var rootNode = child.getRootNode && child.getRootNode();
  if (parent.contains(child)) {
    return true;
  } else if (rootNode && isShadowRoot(rootNode)) {
    var next = child;
    do {
      if (next && parent.isSameNode(next)) {
        return true;
      }
      next = next.parentNode || next.host;
    } while (next);
  }
  return false;
}
var init_contains = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/contains.js"() {
    init_instanceOf();
  }
});

// node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js
function getComputedStyle2(element) {
  return getWindow(element).getComputedStyle(element);
}
var init_getComputedStyle = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js"() {
    init_getWindow();
  }
});

// node_modules/@popperjs/core/lib/dom-utils/isTableElement.js
function isTableElement(element) {
  return ["table", "td", "th"].indexOf(getNodeName(element)) >= 0;
}
var init_isTableElement = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/isTableElement.js"() {
    init_getNodeName();
  }
});

// node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js
function getDocumentElement(element) {
  return ((isElement(element) ? element.ownerDocument : element.document) || window.document).documentElement;
}
var init_getDocumentElement = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js"() {
    init_instanceOf();
  }
});

// node_modules/@popperjs/core/lib/dom-utils/getParentNode.js
function getParentNode(element) {
  if (getNodeName(element) === "html") {
    return element;
  }
  return element.assignedSlot || element.parentNode || (isShadowRoot(element) ? element.host : null) || getDocumentElement(element);
}
var init_getParentNode = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/getParentNode.js"() {
    init_getNodeName();
    init_getDocumentElement();
    init_instanceOf();
  }
});

// node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js
function getTrueOffsetParent(element) {
  if (!isHTMLElement(element) || getComputedStyle2(element).position === "fixed") {
    return null;
  }
  return element.offsetParent;
}
function getContainingBlock(element) {
  var isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") !== -1;
  var isIE = navigator.userAgent.indexOf("Trident") !== -1;
  if (isIE && isHTMLElement(element)) {
    var elementCss = getComputedStyle2(element);
    if (elementCss.position === "fixed") {
      return null;
    }
  }
  var currentNode = getParentNode(element);
  if (isShadowRoot(currentNode)) {
    currentNode = currentNode.host;
  }
  while (isHTMLElement(currentNode) && ["html", "body"].indexOf(getNodeName(currentNode)) < 0) {
    var css = getComputedStyle2(currentNode);
    if (css.transform !== "none" || css.perspective !== "none" || css.contain === "paint" || ["transform", "perspective"].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === "filter" || isFirefox && css.filter && css.filter !== "none") {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }
  return null;
}
function getOffsetParent(element) {
  var window2 = getWindow(element);
  var offsetParent = getTrueOffsetParent(element);
  while (offsetParent && isTableElement(offsetParent) && getComputedStyle2(offsetParent).position === "static") {
    offsetParent = getTrueOffsetParent(offsetParent);
  }
  if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle2(offsetParent).position === "static")) {
    return window2;
  }
  return offsetParent || getContainingBlock(element) || window2;
}
var init_getOffsetParent = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js"() {
    init_getWindow();
    init_getNodeName();
    init_getComputedStyle();
    init_instanceOf();
    init_isTableElement();
    init_getParentNode();
  }
});

// node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js
function getMainAxisFromPlacement(placement) {
  return ["top", "bottom"].indexOf(placement) >= 0 ? "x" : "y";
}
var init_getMainAxisFromPlacement = __esm({
  "node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js"() {
  }
});

// node_modules/@popperjs/core/lib/utils/within.js
function within(min2, value, max2) {
  return max(min2, min(value, max2));
}
function withinMaxClamp(min2, value, max2) {
  var v = within(min2, value, max2);
  return v > max2 ? max2 : v;
}
var init_within = __esm({
  "node_modules/@popperjs/core/lib/utils/within.js"() {
    init_math();
  }
});

// node_modules/@popperjs/core/lib/utils/getFreshSideObject.js
function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
var init_getFreshSideObject = __esm({
  "node_modules/@popperjs/core/lib/utils/getFreshSideObject.js"() {
  }
});

// node_modules/@popperjs/core/lib/utils/mergePaddingObject.js
function mergePaddingObject(paddingObject) {
  return Object.assign({}, getFreshSideObject(), paddingObject);
}
var init_mergePaddingObject = __esm({
  "node_modules/@popperjs/core/lib/utils/mergePaddingObject.js"() {
    init_getFreshSideObject();
  }
});

// node_modules/@popperjs/core/lib/utils/expandToHashMap.js
function expandToHashMap(value, keys) {
  return keys.reduce(function(hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}
var init_expandToHashMap = __esm({
  "node_modules/@popperjs/core/lib/utils/expandToHashMap.js"() {
  }
});

// node_modules/@popperjs/core/lib/modifiers/arrow.js
function arrow(_ref) {
  var _state$modifiersData$;
  var state = _ref.state, name = _ref.name, options = _ref.options;
  var arrowElement = state.elements.arrow;
  var popperOffsets2 = state.modifiersData.popperOffsets;
  var basePlacement = getBasePlacement(state.placement);
  var axis = getMainAxisFromPlacement(basePlacement);
  var isVertical = [left, right].indexOf(basePlacement) >= 0;
  var len = isVertical ? "height" : "width";
  if (!arrowElement || !popperOffsets2) {
    return;
  }
  var paddingObject = toPaddingObject(options.padding, state);
  var arrowRect = getLayoutRect(arrowElement);
  var minProp = axis === "y" ? top : left;
  var maxProp = axis === "y" ? bottom : right;
  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets2[axis] - state.rects.popper[len];
  var startDiff = popperOffsets2[axis] - state.rects.reference[axis];
  var arrowOffsetParent = getOffsetParent(arrowElement);
  var clientSize = arrowOffsetParent ? axis === "y" ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2;
  var min2 = paddingObject[minProp];
  var max2 = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset2 = within(min2, center, max2);
  var axisProp = axis;
  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset2, _state$modifiersData$.centerOffset = offset2 - center, _state$modifiersData$);
}
function effect2(_ref2) {
  var state = _ref2.state, options = _ref2.options;
  var _options$element = options.element, arrowElement = _options$element === void 0 ? "[data-popper-arrow]" : _options$element;
  if (arrowElement == null) {
    return;
  }
  if (typeof arrowElement === "string") {
    arrowElement = state.elements.popper.querySelector(arrowElement);
    if (!arrowElement) {
      return;
    }
  }
  if (true) {
    if (!isHTMLElement(arrowElement)) {
      console.error(['Popper: "arrow" element must be an HTMLElement (not an SVGElement).', "To use an SVG arrow, wrap it in an HTMLElement that will be used as", "the arrow."].join(" "));
    }
  }
  if (!contains(state.elements.popper, arrowElement)) {
    if (true) {
      console.error(['Popper: "arrow" modifier\'s `element` must be a child of the popper', "element."].join(" "));
    }
    return;
  }
  state.elements.arrow = arrowElement;
}
var toPaddingObject, arrow_default;
var init_arrow = __esm({
  "node_modules/@popperjs/core/lib/modifiers/arrow.js"() {
    init_getBasePlacement();
    init_getLayoutRect();
    init_contains();
    init_getOffsetParent();
    init_getMainAxisFromPlacement();
    init_within();
    init_mergePaddingObject();
    init_expandToHashMap();
    init_enums();
    init_instanceOf();
    toPaddingObject = function toPaddingObject2(padding, state) {
      padding = typeof padding === "function" ? padding(Object.assign({}, state.rects, {
        placement: state.placement
      })) : padding;
      return mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
    };
    arrow_default = {
      name: "arrow",
      enabled: true,
      phase: "main",
      fn: arrow,
      effect: effect2,
      requires: ["popperOffsets"],
      requiresIfExists: ["preventOverflow"]
    };
  }
});

// node_modules/@popperjs/core/lib/utils/getVariation.js
function getVariation(placement) {
  return placement.split("-")[1];
}
var init_getVariation = __esm({
  "node_modules/@popperjs/core/lib/utils/getVariation.js"() {
  }
});

// node_modules/@popperjs/core/lib/modifiers/computeStyles.js
function roundOffsetsByDPR(_ref) {
  var x = _ref.x, y = _ref.y;
  var win = window;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: round(x * dpr) / dpr || 0,
    y: round(y * dpr) / dpr || 0
  };
}
function mapToStyles(_ref2) {
  var _Object$assign2;
  var popper2 = _ref2.popper, popperRect = _ref2.popperRect, placement = _ref2.placement, variation = _ref2.variation, offsets = _ref2.offsets, position = _ref2.position, gpuAcceleration = _ref2.gpuAcceleration, adaptive = _ref2.adaptive, roundOffsets = _ref2.roundOffsets, isFixed = _ref2.isFixed;
  var _offsets$x = offsets.x, x = _offsets$x === void 0 ? 0 : _offsets$x, _offsets$y = offsets.y, y = _offsets$y === void 0 ? 0 : _offsets$y;
  var _ref3 = typeof roundOffsets === "function" ? roundOffsets({
    x,
    y
  }) : {
    x,
    y
  };
  x = _ref3.x;
  y = _ref3.y;
  var hasX = offsets.hasOwnProperty("x");
  var hasY = offsets.hasOwnProperty("y");
  var sideX = left;
  var sideY = top;
  var win = window;
  if (adaptive) {
    var offsetParent = getOffsetParent(popper2);
    var heightProp = "clientHeight";
    var widthProp = "clientWidth";
    if (offsetParent === getWindow(popper2)) {
      offsetParent = getDocumentElement(popper2);
      if (getComputedStyle2(offsetParent).position !== "static" && position === "absolute") {
        heightProp = "scrollHeight";
        widthProp = "scrollWidth";
      }
    }
    offsetParent = offsetParent;
    if (placement === top || (placement === left || placement === right) && variation === end) {
      sideY = bottom;
      var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : offsetParent[heightProp];
      y -= offsetY - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }
    if (placement === left || (placement === top || placement === bottom) && variation === end) {
      sideX = right;
      var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : offsetParent[widthProp];
      x -= offsetX - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }
  var commonStyles = Object.assign({
    position
  }, adaptive && unsetSides);
  var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
    x,
    y
  }) : {
    x,
    y
  };
  x = _ref4.x;
  y = _ref4.y;
  if (gpuAcceleration) {
    var _Object$assign;
    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? "0" : "", _Object$assign[sideX] = hasX ? "0" : "", _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }
  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : "", _Object$assign2[sideX] = hasX ? x + "px" : "", _Object$assign2.transform = "", _Object$assign2));
}
function computeStyles(_ref5) {
  var state = _ref5.state, options = _ref5.options;
  var _options$gpuAccelerat = options.gpuAcceleration, gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat, _options$adaptive = options.adaptive, adaptive = _options$adaptive === void 0 ? true : _options$adaptive, _options$roundOffsets = options.roundOffsets, roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
  if (true) {
    var transitionProperty = getComputedStyle2(state.elements.popper).transitionProperty || "";
    if (adaptive && ["transform", "top", "right", "bottom", "left"].some(function(property) {
      return transitionProperty.indexOf(property) >= 0;
    })) {
      console.warn(["Popper: Detected CSS transitions on at least one of the following", 'CSS properties: "transform", "top", "right", "bottom", "left".', "\n\n", 'Disable the "computeStyles" modifier\'s `adaptive` option to allow', "for smooth transitions, or remove these properties from the CSS", "transition declaration on the popper element if only transitioning", "opacity or background-color for example.", "\n\n", "We recommend using the popper element as a wrapper around an inner", "element that can have any CSS property transitioned for animations."].join(" "));
    }
  }
  var commonStyles = {
    placement: getBasePlacement(state.placement),
    variation: getVariation(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration,
    isFixed: state.options.strategy === "fixed"
  };
  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive,
      roundOffsets
    })));
  }
  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: "absolute",
      adaptive: false,
      roundOffsets
    })));
  }
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    "data-popper-placement": state.placement
  });
}
var unsetSides, computeStyles_default;
var init_computeStyles = __esm({
  "node_modules/@popperjs/core/lib/modifiers/computeStyles.js"() {
    init_enums();
    init_getOffsetParent();
    init_getWindow();
    init_getDocumentElement();
    init_getComputedStyle();
    init_getBasePlacement();
    init_getVariation();
    init_math();
    unsetSides = {
      top: "auto",
      right: "auto",
      bottom: "auto",
      left: "auto"
    };
    computeStyles_default = {
      name: "computeStyles",
      enabled: true,
      phase: "beforeWrite",
      fn: computeStyles,
      data: {}
    };
  }
});

// node_modules/@popperjs/core/lib/modifiers/eventListeners.js
function effect3(_ref) {
  var state = _ref.state, instance = _ref.instance, options = _ref.options;
  var _options$scroll = options.scroll, scroll = _options$scroll === void 0 ? true : _options$scroll, _options$resize = options.resize, resize = _options$resize === void 0 ? true : _options$resize;
  var window2 = getWindow(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
  if (scroll) {
    scrollParents.forEach(function(scrollParent) {
      scrollParent.addEventListener("scroll", instance.update, passive);
    });
  }
  if (resize) {
    window2.addEventListener("resize", instance.update, passive);
  }
  return function() {
    if (scroll) {
      scrollParents.forEach(function(scrollParent) {
        scrollParent.removeEventListener("scroll", instance.update, passive);
      });
    }
    if (resize) {
      window2.removeEventListener("resize", instance.update, passive);
    }
  };
}
var passive, eventListeners_default;
var init_eventListeners = __esm({
  "node_modules/@popperjs/core/lib/modifiers/eventListeners.js"() {
    init_getWindow();
    passive = {
      passive: true
    };
    eventListeners_default = {
      name: "eventListeners",
      enabled: true,
      phase: "write",
      fn: function fn() {
      },
      effect: effect3,
      data: {}
    };
  }
});

// node_modules/@popperjs/core/lib/utils/getOppositePlacement.js
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function(matched) {
    return hash[matched];
  });
}
var hash;
var init_getOppositePlacement = __esm({
  "node_modules/@popperjs/core/lib/utils/getOppositePlacement.js"() {
    hash = {
      left: "right",
      right: "left",
      bottom: "top",
      top: "bottom"
    };
  }
});

// node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function(matched) {
    return hash2[matched];
  });
}
var hash2;
var init_getOppositeVariationPlacement = __esm({
  "node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js"() {
    hash2 = {
      start: "end",
      end: "start"
    };
  }
});

// node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js
function getWindowScroll(node) {
  var win = getWindow(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft,
    scrollTop
  };
}
var init_getWindowScroll = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js"() {
    init_getWindow();
  }
});

// node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js
function getWindowScrollBarX(element) {
  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
}
var init_getWindowScrollBarX = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js"() {
    init_getBoundingClientRect();
    init_getDocumentElement();
    init_getWindowScroll();
  }
});

// node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js
function getViewportRect(element) {
  var win = getWindow(element);
  var html = getDocumentElement(element);
  var visualViewport = win.visualViewport;
  var width = html.clientWidth;
  var height = html.clientHeight;
  var x = 0;
  var y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    if (!/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x: x + getWindowScrollBarX(element),
    y
  };
}
var init_getViewportRect = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js"() {
    init_getWindow();
    init_getDocumentElement();
    init_getWindowScrollBarX();
  }
});

// node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js
function getDocumentRect(element) {
  var _element$ownerDocumen;
  var html = getDocumentElement(element);
  var winScroll = getWindowScroll(element);
  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
  var y = -winScroll.scrollTop;
  if (getComputedStyle2(body || html).direction === "rtl") {
    x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}
var init_getDocumentRect = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js"() {
    init_getDocumentElement();
    init_getComputedStyle();
    init_getWindowScrollBarX();
    init_getWindowScroll();
    init_math();
  }
});

// node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js
function isScrollParent(element) {
  var _getComputedStyle = getComputedStyle2(element), overflow = _getComputedStyle.overflow, overflowX = _getComputedStyle.overflowX, overflowY = _getComputedStyle.overflowY;
  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}
var init_isScrollParent = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js"() {
    init_getComputedStyle();
  }
});

// node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js
function getScrollParent(node) {
  if (["html", "body", "#document"].indexOf(getNodeName(node)) >= 0) {
    return node.ownerDocument.body;
  }
  if (isHTMLElement(node) && isScrollParent(node)) {
    return node;
  }
  return getScrollParent(getParentNode(node));
}
var init_getScrollParent = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js"() {
    init_getParentNode();
    init_isScrollParent();
    init_getNodeName();
    init_instanceOf();
  }
});

// node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js
function listScrollParents(element, list) {
  var _element$ownerDocumen;
  if (list === void 0) {
    list = [];
  }
  var scrollParent = getScrollParent(element);
  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = getWindow(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : updatedList.concat(listScrollParents(getParentNode(target)));
}
var init_listScrollParents = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js"() {
    init_getScrollParent();
    init_getParentNode();
    init_getWindow();
    init_isScrollParent();
  }
});

// node_modules/@popperjs/core/lib/utils/rectToClientRect.js
function rectToClientRect(rect) {
  return Object.assign({}, rect, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}
var init_rectToClientRect = __esm({
  "node_modules/@popperjs/core/lib/utils/rectToClientRect.js"() {
  }
});

// node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js
function getInnerBoundingClientRect(element) {
  var rect = getBoundingClientRect(element);
  rect.top = rect.top + element.clientTop;
  rect.left = rect.left + element.clientLeft;
  rect.bottom = rect.top + element.clientHeight;
  rect.right = rect.left + element.clientWidth;
  rect.width = element.clientWidth;
  rect.height = element.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}
function getClientRectFromMixedType(element, clippingParent) {
  return clippingParent === viewport ? rectToClientRect(getViewportRect(element)) : isElement(clippingParent) ? getInnerBoundingClientRect(clippingParent) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
}
function getClippingParents(element) {
  var clippingParents2 = listScrollParents(getParentNode(element));
  var canEscapeClipping = ["absolute", "fixed"].indexOf(getComputedStyle2(element).position) >= 0;
  var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;
  if (!isElement(clipperElement)) {
    return [];
  }
  return clippingParents2.filter(function(clippingParent) {
    return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== "body";
  });
}
function getClippingRect(element, boundary, rootBoundary) {
  var mainClippingParents = boundary === "clippingParents" ? getClippingParents(element) : [].concat(boundary);
  var clippingParents2 = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents2[0];
  var clippingRect = clippingParents2.reduce(function(accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}
var init_getClippingRect = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js"() {
    init_enums();
    init_getViewportRect();
    init_getDocumentRect();
    init_listScrollParents();
    init_getOffsetParent();
    init_getDocumentElement();
    init_getComputedStyle();
    init_instanceOf();
    init_getBoundingClientRect();
    init_getParentNode();
    init_contains();
    init_getNodeName();
    init_rectToClientRect();
    init_math();
  }
});

// node_modules/@popperjs/core/lib/utils/computeOffsets.js
function computeOffsets(_ref) {
  var reference2 = _ref.reference, element = _ref.element, placement = _ref.placement;
  var basePlacement = placement ? getBasePlacement(placement) : null;
  var variation = placement ? getVariation(placement) : null;
  var commonX = reference2.x + reference2.width / 2 - element.width / 2;
  var commonY = reference2.y + reference2.height / 2 - element.height / 2;
  var offsets;
  switch (basePlacement) {
    case top:
      offsets = {
        x: commonX,
        y: reference2.y - element.height
      };
      break;
    case bottom:
      offsets = {
        x: commonX,
        y: reference2.y + reference2.height
      };
      break;
    case right:
      offsets = {
        x: reference2.x + reference2.width,
        y: commonY
      };
      break;
    case left:
      offsets = {
        x: reference2.x - element.width,
        y: commonY
      };
      break;
    default:
      offsets = {
        x: reference2.x,
        y: reference2.y
      };
  }
  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
  if (mainAxis != null) {
    var len = mainAxis === "y" ? "height" : "width";
    switch (variation) {
      case start:
        offsets[mainAxis] = offsets[mainAxis] - (reference2[len] / 2 - element[len] / 2);
        break;
      case end:
        offsets[mainAxis] = offsets[mainAxis] + (reference2[len] / 2 - element[len] / 2);
        break;
      default:
    }
  }
  return offsets;
}
var init_computeOffsets = __esm({
  "node_modules/@popperjs/core/lib/utils/computeOffsets.js"() {
    init_getBasePlacement();
    init_getVariation();
    init_getMainAxisFromPlacement();
    init_enums();
  }
});

// node_modules/@popperjs/core/lib/utils/detectOverflow.js
function detectOverflow(state, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, _options$placement = _options.placement, placement = _options$placement === void 0 ? state.placement : _options$placement, _options$boundary = _options.boundary, boundary = _options$boundary === void 0 ? clippingParents : _options$boundary, _options$rootBoundary = _options.rootBoundary, rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary, _options$elementConte = _options.elementContext, elementContext = _options$elementConte === void 0 ? popper : _options$elementConte, _options$altBoundary = _options.altBoundary, altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary, _options$padding = _options.padding, padding = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
  var altContext = elementContext === popper ? reference : popper;
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary);
  var referenceClientRect = getBoundingClientRect(state.elements.reference);
  var popperOffsets2 = computeOffsets({
    reference: referenceClientRect,
    element: popperRect,
    strategy: "absolute",
    placement
  });
  var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets2));
  var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect;
  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state.modifiersData.offset;
  if (elementContext === popper && offsetData) {
    var offset2 = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function(key) {
      var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
      var axis = [top, bottom].indexOf(key) >= 0 ? "y" : "x";
      overflowOffsets[key] += offset2[axis] * multiply;
    });
  }
  return overflowOffsets;
}
var init_detectOverflow = __esm({
  "node_modules/@popperjs/core/lib/utils/detectOverflow.js"() {
    init_getClippingRect();
    init_getDocumentElement();
    init_getBoundingClientRect();
    init_computeOffsets();
    init_rectToClientRect();
    init_enums();
    init_instanceOf();
    init_mergePaddingObject();
    init_expandToHashMap();
  }
});

// node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js
function computeAutoPlacement(state, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, placement = _options.placement, boundary = _options.boundary, rootBoundary = _options.rootBoundary, padding = _options.padding, flipVariations = _options.flipVariations, _options$allowedAutoP = _options.allowedAutoPlacements, allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
  var variation = getVariation(placement);
  var placements2 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function(placement2) {
    return getVariation(placement2) === variation;
  }) : basePlacements;
  var allowedPlacements = placements2.filter(function(placement2) {
    return allowedAutoPlacements.indexOf(placement2) >= 0;
  });
  if (allowedPlacements.length === 0) {
    allowedPlacements = placements2;
    if (true) {
      console.error(["Popper: The `allowedAutoPlacements` option did not allow any", "placements. Ensure the `placement` option matches the variation", "of the allowed placements.", 'For example, "auto" cannot be used to allow "bottom-start".', 'Use "auto-start" instead.'].join(" "));
    }
  }
  var overflows = allowedPlacements.reduce(function(acc, placement2) {
    acc[placement2] = detectOverflow(state, {
      placement: placement2,
      boundary,
      rootBoundary,
      padding
    })[getBasePlacement(placement2)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function(a, b) {
    return overflows[a] - overflows[b];
  });
}
var init_computeAutoPlacement = __esm({
  "node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js"() {
    init_getVariation();
    init_enums();
    init_detectOverflow();
    init_getBasePlacement();
  }
});

// node_modules/@popperjs/core/lib/modifiers/flip.js
function getExpandedFallbackPlacements(placement) {
  if (getBasePlacement(placement) === auto) {
    return [];
  }
  var oppositePlacement = getOppositePlacement(placement);
  return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
}
function flip(_ref) {
  var state = _ref.state, options = _ref.options, name = _ref.name;
  if (state.modifiersData[name]._skip) {
    return;
  }
  var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis, specifiedFallbackPlacements = options.fallbackPlacements, padding = options.padding, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, _options$flipVariatio = options.flipVariations, flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio, allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state.options.placement;
  var basePlacement = getBasePlacement(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements2 = [preferredPlacement].concat(fallbackPlacements).reduce(function(acc, placement2) {
    return acc.concat(getBasePlacement(placement2) === auto ? computeAutoPlacement(state, {
      placement: placement2,
      boundary,
      rootBoundary,
      padding,
      flipVariations,
      allowedAutoPlacements
    }) : placement2);
  }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements2[0];
  for (var i = 0; i < placements2.length; i++) {
    var placement = placements2[i];
    var _basePlacement = getBasePlacement(placement);
    var isStartVariation = getVariation(placement) === start;
    var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
    var len = isVertical ? "width" : "height";
    var overflow = detectOverflow(state, {
      placement,
      boundary,
      rootBoundary,
      altBoundary,
      padding
    });
    var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;
    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = getOppositePlacement(mainVariationSide);
    }
    var altVariationSide = getOppositePlacement(mainVariationSide);
    var checks = [];
    if (checkMainAxis) {
      checks.push(overflow[_basePlacement] <= 0);
    }
    if (checkAltAxis) {
      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
    }
    if (checks.every(function(check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }
    checksMap.set(placement, checks);
  }
  if (makeFallbackChecks) {
    var numberOfChecks = flipVariations ? 3 : 1;
    var _loop = function _loop2(_i2) {
      var fittingPlacement = placements2.find(function(placement2) {
        var checks2 = checksMap.get(placement2);
        if (checks2) {
          return checks2.slice(0, _i2).every(function(check) {
            return check;
          });
        }
      });
      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };
    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);
      if (_ret === "break")
        break;
    }
  }
  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
}
var flip_default;
var init_flip = __esm({
  "node_modules/@popperjs/core/lib/modifiers/flip.js"() {
    init_getOppositePlacement();
    init_getBasePlacement();
    init_getOppositeVariationPlacement();
    init_detectOverflow();
    init_computeAutoPlacement();
    init_enums();
    init_getVariation();
    flip_default = {
      name: "flip",
      enabled: true,
      phase: "main",
      fn: flip,
      requiresIfExists: ["offset"],
      data: {
        _skip: false
      }
    };
  }
});

// node_modules/@popperjs/core/lib/modifiers/hide.js
function getSideOffsets(overflow, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }
  return {
    top: overflow.top - rect.height - preventedOffsets.y,
    right: overflow.right - rect.width + preventedOffsets.x,
    bottom: overflow.bottom - rect.height + preventedOffsets.y,
    left: overflow.left - rect.width - preventedOffsets.x
  };
}
function isAnySideFullyClipped(overflow) {
  return [top, right, bottom, left].some(function(side) {
    return overflow[side] >= 0;
  });
}
function hide(_ref) {
  var state = _ref.state, name = _ref.name;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var preventedOffsets = state.modifiersData.preventOverflow;
  var referenceOverflow = detectOverflow(state, {
    elementContext: "reference"
  });
  var popperAltOverflow = detectOverflow(state, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state.modifiersData[name] = {
    referenceClippingOffsets,
    popperEscapeOffsets,
    isReferenceHidden,
    hasPopperEscaped
  };
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    "data-popper-reference-hidden": isReferenceHidden,
    "data-popper-escaped": hasPopperEscaped
  });
}
var hide_default;
var init_hide = __esm({
  "node_modules/@popperjs/core/lib/modifiers/hide.js"() {
    init_enums();
    init_detectOverflow();
    hide_default = {
      name: "hide",
      enabled: true,
      phase: "main",
      requiresIfExists: ["preventOverflow"],
      fn: hide
    };
  }
});

// node_modules/@popperjs/core/lib/modifiers/offset.js
function distanceAndSkiddingToXY(placement, rects, offset2) {
  var basePlacement = getBasePlacement(placement);
  var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;
  var _ref = typeof offset2 === "function" ? offset2(Object.assign({}, rects, {
    placement
  })) : offset2, skidding = _ref[0], distance = _ref[1];
  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [left, right].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}
function offset(_ref2) {
  var state = _ref2.state, options = _ref2.options, name = _ref2.name;
  var _options$offset = options.offset, offset2 = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = placements.reduce(function(acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset2);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement], x = _data$state$placement.x, y = _data$state$placement.y;
  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y;
  }
  state.modifiersData[name] = data;
}
var offset_default;
var init_offset = __esm({
  "node_modules/@popperjs/core/lib/modifiers/offset.js"() {
    init_getBasePlacement();
    init_enums();
    offset_default = {
      name: "offset",
      enabled: true,
      phase: "main",
      requires: ["popperOffsets"],
      fn: offset
    };
  }
});

// node_modules/@popperjs/core/lib/modifiers/popperOffsets.js
function popperOffsets(_ref) {
  var state = _ref.state, name = _ref.name;
  state.modifiersData[name] = computeOffsets({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: "absolute",
    placement: state.placement
  });
}
var popperOffsets_default;
var init_popperOffsets = __esm({
  "node_modules/@popperjs/core/lib/modifiers/popperOffsets.js"() {
    init_computeOffsets();
    popperOffsets_default = {
      name: "popperOffsets",
      enabled: true,
      phase: "read",
      fn: popperOffsets,
      data: {}
    };
  }
});

// node_modules/@popperjs/core/lib/utils/getAltAxis.js
function getAltAxis(axis) {
  return axis === "x" ? "y" : "x";
}
var init_getAltAxis = __esm({
  "node_modules/@popperjs/core/lib/utils/getAltAxis.js"() {
  }
});

// node_modules/@popperjs/core/lib/modifiers/preventOverflow.js
function preventOverflow(_ref) {
  var state = _ref.state, options = _ref.options, name = _ref.name;
  var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, padding = options.padding, _options$tether = options.tether, tether = _options$tether === void 0 ? true : _options$tether, _options$tetherOffset = options.tetherOffset, tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow = detectOverflow(state, {
    boundary,
    rootBoundary,
    padding,
    altBoundary
  });
  var basePlacement = getBasePlacement(state.placement);
  var variation = getVariation(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = getMainAxisFromPlacement(basePlacement);
  var altAxis = getAltAxis(mainAxis);
  var popperOffsets2 = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === "function" ? tetherOffset(Object.assign({}, state.rects, {
    placement: state.placement
  })) : tetherOffset;
  var normalizedTetherOffsetValue = typeof tetherOffsetValue === "number" ? {
    mainAxis: tetherOffsetValue,
    altAxis: tetherOffsetValue
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, tetherOffsetValue);
  var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
  var data = {
    x: 0,
    y: 0
  };
  if (!popperOffsets2) {
    return;
  }
  if (checkMainAxis) {
    var _offsetModifierState$;
    var mainSide = mainAxis === "y" ? top : left;
    var altSide = mainAxis === "y" ? bottom : right;
    var len = mainAxis === "y" ? "height" : "width";
    var offset2 = popperOffsets2[mainAxis];
    var min2 = offset2 + overflow[mainSide];
    var max2 = offset2 - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === start ? referenceRect[len] : popperRect[len];
    var maxLen = variation === start ? -popperRect[len] : -referenceRect[len];
    var arrowElement = state.elements.arrow;
    var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state.modifiersData["arrow#persistent"] ? state.modifiersData["arrow#persistent"].padding : getFreshSideObject();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide];
    var arrowLen = within(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
    var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === "y" ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
    var tetherMin = offset2 + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = offset2 + maxOffset - offsetModifierValue;
    var preventedOffset = within(tether ? min(min2, tetherMin) : min2, offset2, tether ? max(max2, tetherMax) : max2);
    popperOffsets2[mainAxis] = preventedOffset;
    data[mainAxis] = preventedOffset - offset2;
  }
  if (checkAltAxis) {
    var _offsetModifierState$2;
    var _mainSide = mainAxis === "x" ? top : left;
    var _altSide = mainAxis === "x" ? bottom : right;
    var _offset = popperOffsets2[altAxis];
    var _len = altAxis === "y" ? "height" : "width";
    var _min = _offset + overflow[_mainSide];
    var _max = _offset - overflow[_altSide];
    var isOriginSide = [top, left].indexOf(basePlacement) !== -1;
    var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;
    var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;
    var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;
    var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);
    popperOffsets2[altAxis] = _preventedOffset;
    data[altAxis] = _preventedOffset - _offset;
  }
  state.modifiersData[name] = data;
}
var preventOverflow_default;
var init_preventOverflow = __esm({
  "node_modules/@popperjs/core/lib/modifiers/preventOverflow.js"() {
    init_enums();
    init_getBasePlacement();
    init_getMainAxisFromPlacement();
    init_getAltAxis();
    init_within();
    init_getLayoutRect();
    init_getOffsetParent();
    init_detectOverflow();
    init_getVariation();
    init_getFreshSideObject();
    init_math();
    preventOverflow_default = {
      name: "preventOverflow",
      enabled: true,
      phase: "main",
      fn: preventOverflow,
      requiresIfExists: ["offset"]
    };
  }
});

// node_modules/@popperjs/core/lib/modifiers/index.js
var init_modifiers = __esm({
  "node_modules/@popperjs/core/lib/modifiers/index.js"() {
    init_applyStyles();
    init_arrow();
    init_computeStyles();
    init_eventListeners();
    init_flip();
    init_hide();
    init_offset();
    init_popperOffsets();
    init_preventOverflow();
  }
});

// node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js
function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}
var init_getHTMLElementScroll = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js"() {
  }
});

// node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js
function getNodeScroll(node) {
  if (node === getWindow(node) || !isHTMLElement(node)) {
    return getWindowScroll(node);
  } else {
    return getHTMLElementScroll(node);
  }
}
var init_getNodeScroll = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js"() {
    init_getWindowScroll();
    init_getWindow();
    init_instanceOf();
    init_getHTMLElementScroll();
  }
});

// node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js
function isElementScaled(element) {
  var rect = element.getBoundingClientRect();
  var scaleX = round(rect.width) / element.offsetWidth || 1;
  var scaleY = round(rect.height) / element.offsetHeight || 1;
  return scaleX !== 1 || scaleY !== 1;
}
function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  var isOffsetParentAnElement = isHTMLElement(offsetParent);
  var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
  var documentElement = getDocumentElement(offsetParent);
  var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isScrollParent(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      offsets = getBoundingClientRect(offsetParent, true);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}
var init_getCompositeRect = __esm({
  "node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js"() {
    init_getBoundingClientRect();
    init_getNodeScroll();
    init_getNodeName();
    init_instanceOf();
    init_getWindowScrollBarX();
    init_getDocumentElement();
    init_isScrollParent();
    init_math();
  }
});

// node_modules/@popperjs/core/lib/utils/orderModifiers.js
function order(modifiers) {
  var map = new Map();
  var visited = new Set();
  var result = [];
  modifiers.forEach(function(modifier) {
    map.set(modifier.name, modifier);
  });
  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function(dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);
        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }
  modifiers.forEach(function(modifier) {
    if (!visited.has(modifier.name)) {
      sort(modifier);
    }
  });
  return result;
}
function orderModifiers(modifiers) {
  var orderedModifiers = order(modifiers);
  return modifierPhases.reduce(function(acc, phase) {
    return acc.concat(orderedModifiers.filter(function(modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}
var init_orderModifiers = __esm({
  "node_modules/@popperjs/core/lib/utils/orderModifiers.js"() {
    init_enums();
  }
});

// node_modules/@popperjs/core/lib/utils/debounce.js
function debounce(fn2) {
  var pending;
  return function() {
    if (!pending) {
      pending = new Promise(function(resolve) {
        Promise.resolve().then(function() {
          pending = void 0;
          resolve(fn2());
        });
      });
    }
    return pending;
  };
}
var init_debounce = __esm({
  "node_modules/@popperjs/core/lib/utils/debounce.js"() {
  }
});

// node_modules/@popperjs/core/lib/utils/format.js
function format(str) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  return [].concat(args).reduce(function(p, c) {
    return p.replace(/%s/, c);
  }, str);
}
var init_format = __esm({
  "node_modules/@popperjs/core/lib/utils/format.js"() {
  }
});

// node_modules/@popperjs/core/lib/utils/validateModifiers.js
function validateModifiers(modifiers) {
  modifiers.forEach(function(modifier) {
    [].concat(Object.keys(modifier), VALID_PROPERTIES).filter(function(value, index, self2) {
      return self2.indexOf(value) === index;
    }).forEach(function(key) {
      switch (key) {
        case "name":
          if (typeof modifier.name !== "string") {
            console.error(format(INVALID_MODIFIER_ERROR, String(modifier.name), '"name"', '"string"', '"' + String(modifier.name) + '"'));
          }
          break;
        case "enabled":
          if (typeof modifier.enabled !== "boolean") {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"enabled"', '"boolean"', '"' + String(modifier.enabled) + '"'));
          }
          break;
        case "phase":
          if (modifierPhases.indexOf(modifier.phase) < 0) {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"phase"', "either " + modifierPhases.join(", "), '"' + String(modifier.phase) + '"'));
          }
          break;
        case "fn":
          if (typeof modifier.fn !== "function") {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"fn"', '"function"', '"' + String(modifier.fn) + '"'));
          }
          break;
        case "effect":
          if (modifier.effect != null && typeof modifier.effect !== "function") {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"effect"', '"function"', '"' + String(modifier.fn) + '"'));
          }
          break;
        case "requires":
          if (modifier.requires != null && !Array.isArray(modifier.requires)) {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"requires"', '"array"', '"' + String(modifier.requires) + '"'));
          }
          break;
        case "requiresIfExists":
          if (!Array.isArray(modifier.requiresIfExists)) {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"requiresIfExists"', '"array"', '"' + String(modifier.requiresIfExists) + '"'));
          }
          break;
        case "options":
        case "data":
          break;
        default:
          console.error('PopperJS: an invalid property has been provided to the "' + modifier.name + '" modifier, valid properties are ' + VALID_PROPERTIES.map(function(s) {
            return '"' + s + '"';
          }).join(", ") + '; but "' + key + '" was provided.');
      }
      modifier.requires && modifier.requires.forEach(function(requirement) {
        if (modifiers.find(function(mod) {
          return mod.name === requirement;
        }) == null) {
          console.error(format(MISSING_DEPENDENCY_ERROR, String(modifier.name), requirement, requirement));
        }
      });
    });
  });
}
var INVALID_MODIFIER_ERROR, MISSING_DEPENDENCY_ERROR, VALID_PROPERTIES;
var init_validateModifiers = __esm({
  "node_modules/@popperjs/core/lib/utils/validateModifiers.js"() {
    init_format();
    init_enums();
    INVALID_MODIFIER_ERROR = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s';
    MISSING_DEPENDENCY_ERROR = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available';
    VALID_PROPERTIES = ["name", "enabled", "phase", "fn", "effect", "requires", "options"];
  }
});

// node_modules/@popperjs/core/lib/utils/uniqueBy.js
function uniqueBy(arr, fn2) {
  var identifiers = new Set();
  return arr.filter(function(item) {
    var identifier = fn2(item);
    if (!identifiers.has(identifier)) {
      identifiers.add(identifier);
      return true;
    }
  });
}
var init_uniqueBy = __esm({
  "node_modules/@popperjs/core/lib/utils/uniqueBy.js"() {
  }
});

// node_modules/@popperjs/core/lib/utils/mergeByName.js
function mergeByName(modifiers) {
  var merged = modifiers.reduce(function(merged2, current) {
    var existing = merged2[current.name];
    merged2[current.name] = existing ? Object.assign({}, existing, current, {
      options: Object.assign({}, existing.options, current.options),
      data: Object.assign({}, existing.data, current.data)
    }) : current;
    return merged2;
  }, {});
  return Object.keys(merged).map(function(key) {
    return merged[key];
  });
}
var init_mergeByName = __esm({
  "node_modules/@popperjs/core/lib/utils/mergeByName.js"() {
  }
});

// node_modules/@popperjs/core/lib/createPopper.js
function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return !args.some(function(element) {
    return !(element && typeof element.getBoundingClientRect === "function");
  });
}
function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }
  var _generatorOptions = generatorOptions, _generatorOptions$def = _generatorOptions.defaultModifiers, defaultModifiers3 = _generatorOptions$def === void 0 ? [] : _generatorOptions$def, _generatorOptions$def2 = _generatorOptions.defaultOptions, defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper4(reference2, popper2, options) {
    if (options === void 0) {
      options = defaultOptions;
    }
    var state = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference2,
        popper: popper2
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state,
      setOptions: function setOptions(setOptionsAction) {
        var options2 = typeof setOptionsAction === "function" ? setOptionsAction(state.options) : setOptionsAction;
        cleanupModifierEffects();
        state.options = Object.assign({}, defaultOptions, state.options, options2);
        state.scrollParents = {
          reference: isElement(reference2) ? listScrollParents(reference2) : reference2.contextElement ? listScrollParents(reference2.contextElement) : [],
          popper: listScrollParents(popper2)
        };
        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers3, state.options.modifiers)));
        state.orderedModifiers = orderedModifiers.filter(function(m) {
          return m.enabled;
        });
        if (true) {
          var modifiers = uniqueBy([].concat(orderedModifiers, state.options.modifiers), function(_ref) {
            var name = _ref.name;
            return name;
          });
          validateModifiers(modifiers);
          if (getBasePlacement(state.options.placement) === auto) {
            var flipModifier = state.orderedModifiers.find(function(_ref2) {
              var name = _ref2.name;
              return name === "flip";
            });
            if (!flipModifier) {
              console.error(['Popper: "auto" placements require the "flip" modifier be', "present and enabled to work."].join(" "));
            }
          }
          var _getComputedStyle = getComputedStyle2(popper2), marginTop = _getComputedStyle.marginTop, marginRight = _getComputedStyle.marginRight, marginBottom = _getComputedStyle.marginBottom, marginLeft = _getComputedStyle.marginLeft;
          if ([marginTop, marginRight, marginBottom, marginLeft].some(function(margin) {
            return parseFloat(margin);
          })) {
            console.warn(['Popper: CSS "margin" styles cannot be used to apply padding', "between the popper and its reference element or boundary.", "To replicate margin, use the `offset` modifier, as well as", "the `padding` option in the `preventOverflow` and `flip`", "modifiers."].join(" "));
          }
        }
        runModifierEffects();
        return instance.update();
      },
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }
        var _state$elements = state.elements, reference3 = _state$elements.reference, popper3 = _state$elements.popper;
        if (!areValidElements(reference3, popper3)) {
          if (true) {
            console.error(INVALID_ELEMENT_ERROR);
          }
          return;
        }
        state.rects = {
          reference: getCompositeRect(reference3, getOffsetParent(popper3), state.options.strategy === "fixed"),
          popper: getLayoutRect(popper3)
        };
        state.reset = false;
        state.placement = state.options.placement;
        state.orderedModifiers.forEach(function(modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });
        var __debug_loops__ = 0;
        for (var index = 0; index < state.orderedModifiers.length; index++) {
          if (true) {
            __debug_loops__ += 1;
            if (__debug_loops__ > 100) {
              console.error(INFINITE_LOOP_ERROR);
              break;
            }
          }
          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }
          var _state$orderedModifie = state.orderedModifiers[index], fn2 = _state$orderedModifie.fn, _state$orderedModifie2 = _state$orderedModifie.options, _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2, name = _state$orderedModifie.name;
          if (typeof fn2 === "function") {
            state = fn2({
              state,
              options: _options,
              name,
              instance
            }) || state;
          }
        }
      },
      update: debounce(function() {
        return new Promise(function(resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy2() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };
    if (!areValidElements(reference2, popper2)) {
      if (true) {
        console.error(INVALID_ELEMENT_ERROR);
      }
      return instance;
    }
    instance.setOptions(options).then(function(state2) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state2);
      }
    });
    function runModifierEffects() {
      state.orderedModifiers.forEach(function(_ref3) {
        var name = _ref3.name, _ref3$options = _ref3.options, options2 = _ref3$options === void 0 ? {} : _ref3$options, effect4 = _ref3.effect;
        if (typeof effect4 === "function") {
          var cleanupFn = effect4({
            state,
            name,
            instance,
            options: options2
          });
          var noopFn = function noopFn2() {
          };
          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }
    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function(fn2) {
        return fn2();
      });
      effectCleanupFns = [];
    }
    return instance;
  };
}
var INVALID_ELEMENT_ERROR, INFINITE_LOOP_ERROR, DEFAULT_OPTIONS, createPopper;
var init_createPopper = __esm({
  "node_modules/@popperjs/core/lib/createPopper.js"() {
    init_getCompositeRect();
    init_getLayoutRect();
    init_listScrollParents();
    init_getOffsetParent();
    init_getComputedStyle();
    init_orderModifiers();
    init_debounce();
    init_validateModifiers();
    init_uniqueBy();
    init_getBasePlacement();
    init_mergeByName();
    init_detectOverflow();
    init_instanceOf();
    init_enums();
    INVALID_ELEMENT_ERROR = "Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.";
    INFINITE_LOOP_ERROR = "Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.";
    DEFAULT_OPTIONS = {
      placement: "bottom",
      modifiers: [],
      strategy: "absolute"
    };
    createPopper = popperGenerator();
  }
});

// node_modules/@popperjs/core/lib/popper-lite.js
var defaultModifiers, createPopper2;
var init_popper_lite = __esm({
  "node_modules/@popperjs/core/lib/popper-lite.js"() {
    init_createPopper();
    init_eventListeners();
    init_popperOffsets();
    init_computeStyles();
    init_applyStyles();
    defaultModifiers = [eventListeners_default, popperOffsets_default, computeStyles_default, applyStyles_default];
    createPopper2 = popperGenerator({
      defaultModifiers
    });
  }
});

// node_modules/@popperjs/core/lib/popper.js
var defaultModifiers2, createPopper3;
var init_popper = __esm({
  "node_modules/@popperjs/core/lib/popper.js"() {
    init_createPopper();
    init_eventListeners();
    init_popperOffsets();
    init_computeStyles();
    init_applyStyles();
    init_offset();
    init_flip();
    init_preventOverflow();
    init_arrow();
    init_hide();
    init_popper_lite();
    init_modifiers();
    defaultModifiers2 = [eventListeners_default, popperOffsets_default, computeStyles_default, applyStyles_default, offset_default, flip_default, preventOverflow_default, arrow_default, hide_default];
    createPopper3 = popperGenerator({
      defaultModifiers: defaultModifiers2
    });
  }
});

// node_modules/@popperjs/core/lib/index.js
var lib_exports = {};
__export(lib_exports, {
  afterMain: () => afterMain,
  afterRead: () => afterRead,
  afterWrite: () => afterWrite,
  applyStyles: () => applyStyles_default,
  arrow: () => arrow_default,
  auto: () => auto,
  basePlacements: () => basePlacements,
  beforeMain: () => beforeMain,
  beforeRead: () => beforeRead,
  beforeWrite: () => beforeWrite,
  bottom: () => bottom,
  clippingParents: () => clippingParents,
  computeStyles: () => computeStyles_default,
  createPopper: () => createPopper3,
  createPopperBase: () => createPopper,
  createPopperLite: () => createPopper2,
  detectOverflow: () => detectOverflow,
  end: () => end,
  eventListeners: () => eventListeners_default,
  flip: () => flip_default,
  hide: () => hide_default,
  left: () => left,
  main: () => main,
  modifierPhases: () => modifierPhases,
  offset: () => offset_default,
  placements: () => placements,
  popper: () => popper,
  popperGenerator: () => popperGenerator,
  popperOffsets: () => popperOffsets_default,
  preventOverflow: () => preventOverflow_default,
  read: () => read,
  reference: () => reference,
  right: () => right,
  start: () => start,
  top: () => top,
  variationPlacements: () => variationPlacements,
  viewport: () => viewport,
  write: () => write
});
var init_lib = __esm({
  "node_modules/@popperjs/core/lib/index.js"() {
    init_enums();
    init_modifiers();
    init_createPopper();
    init_popper();
    init_popper_lite();
  }
});

// node_modules/bootstrap/js/dist/dropdown.js
var require_dropdown = __commonJS({
  "node_modules/bootstrap/js/dist/dropdown.js"(exports, module) {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory((init_lib(), lib_exports), require_event_handler(), require_manipulator(), require_selector_engine(), require_base_component()) : typeof define === "function" && define.amd ? define(["@popperjs/core", "./dom/event-handler", "./dom/manipulator", "./dom/selector-engine", "./base-component"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.Dropdown = factory(global.Popper, global.EventHandler, global.Manipulator, global.SelectorEngine, global.Base));
    })(exports, function(Popper, EventHandler, Manipulator, SelectorEngine, BaseComponent) {
      "use strict";
      const _interopDefaultLegacy = (e) => e && typeof e === "object" && "default" in e ? e : { default: e };
      function _interopNamespace(e) {
        if (e && e.__esModule)
          return e;
        const n = Object.create(null);
        if (e) {
          for (const k in e) {
            if (k !== "default") {
              const d = Object.getOwnPropertyDescriptor(e, k);
              Object.defineProperty(n, k, d.get ? d : {
                enumerable: true,
                get: () => e[k]
              });
            }
          }
        }
        n.default = e;
        return Object.freeze(n);
      }
      const Popper__namespace = _interopNamespace(Popper);
      const EventHandler__default = _interopDefaultLegacy(EventHandler);
      const Manipulator__default = _interopDefaultLegacy(Manipulator);
      const SelectorEngine__default = _interopDefaultLegacy(SelectorEngine);
      const BaseComponent__default = _interopDefaultLegacy(BaseComponent);
      const toType2 = (obj) => {
        if (obj === null || obj === void 0) {
          return `${obj}`;
        }
        return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
      };
      const getSelector = (element) => {
        let selector = element.getAttribute("data-bs-target");
        if (!selector || selector === "#") {
          let hrefAttr = element.getAttribute("href");
          if (!hrefAttr || !hrefAttr.includes("#") && !hrefAttr.startsWith(".")) {
            return null;
          }
          if (hrefAttr.includes("#") && !hrefAttr.startsWith("#")) {
            hrefAttr = `#${hrefAttr.split("#")[1]}`;
          }
          selector = hrefAttr && hrefAttr !== "#" ? hrefAttr.trim() : null;
        }
        return selector;
      };
      const getElementFromSelector = (element) => {
        const selector = getSelector(element);
        return selector ? document.querySelector(selector) : null;
      };
      const isElement3 = (obj) => {
        if (!obj || typeof obj !== "object") {
          return false;
        }
        if (typeof obj.jquery !== "undefined") {
          obj = obj[0];
        }
        return typeof obj.nodeType !== "undefined";
      };
      const getElement = (obj) => {
        if (isElement3(obj)) {
          return obj.jquery ? obj[0] : obj;
        }
        if (typeof obj === "string" && obj.length > 0) {
          return document.querySelector(obj);
        }
        return null;
      };
      const typeCheckConfig = (componentName, config, configTypes) => {
        Object.keys(configTypes).forEach((property) => {
          const expectedTypes = configTypes[property];
          const value = config[property];
          const valueType = value && isElement3(value) ? "element" : toType2(value);
          if (!new RegExp(expectedTypes).test(valueType)) {
            throw new TypeError(`${componentName.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
          }
        });
      };
      const isVisible2 = (element) => {
        if (!isElement3(element) || element.getClientRects().length === 0) {
          return false;
        }
        return getComputedStyle(element).getPropertyValue("visibility") === "visible";
      };
      const isDisabled = (element) => {
        if (!element || element.nodeType !== Node.ELEMENT_NODE) {
          return true;
        }
        if (element.classList.contains("disabled")) {
          return true;
        }
        if (typeof element.disabled !== "undefined") {
          return element.disabled;
        }
        return element.hasAttribute("disabled") && element.getAttribute("disabled") !== "false";
      };
      const noop = () => {
      };
      const getjQuery = () => {
        const {
          jQuery
        } = window;
        if (jQuery && !document.body.hasAttribute("data-bs-no-jquery")) {
          return jQuery;
        }
        return null;
      };
      const DOMContentLoadedCallbacks = [];
      const onDOMContentLoaded = (callback) => {
        if (document.readyState === "loading") {
          if (!DOMContentLoadedCallbacks.length) {
            document.addEventListener("DOMContentLoaded", () => {
              DOMContentLoadedCallbacks.forEach((callback2) => callback2());
            });
          }
          DOMContentLoadedCallbacks.push(callback);
        } else {
          callback();
        }
      };
      const isRTL = () => document.documentElement.dir === "rtl";
      const defineJQueryPlugin = (plugin2) => {
        onDOMContentLoaded(() => {
          const $ = getjQuery();
          if ($) {
            const name = plugin2.NAME;
            const JQUERY_NO_CONFLICT = $.fn[name];
            $.fn[name] = plugin2.jQueryInterface;
            $.fn[name].Constructor = plugin2;
            $.fn[name].noConflict = () => {
              $.fn[name] = JQUERY_NO_CONFLICT;
              return plugin2.jQueryInterface;
            };
          }
        });
      };
      const getNextActiveElement = (list, activeElement, shouldGetNext, isCycleAllowed) => {
        let index = list.indexOf(activeElement);
        if (index === -1) {
          return list[!shouldGetNext && isCycleAllowed ? list.length - 1 : 0];
        }
        const listLength = list.length;
        index += shouldGetNext ? 1 : -1;
        if (isCycleAllowed) {
          index = (index + listLength) % listLength;
        }
        return list[Math.max(0, Math.min(index, listLength - 1))];
      };
      const NAME = "dropdown";
      const DATA_KEY = "bs.dropdown";
      const EVENT_KEY = `.${DATA_KEY}`;
      const DATA_API_KEY = ".data-api";
      const ESCAPE_KEY = "Escape";
      const SPACE_KEY = "Space";
      const TAB_KEY = "Tab";
      const ARROW_UP_KEY = "ArrowUp";
      const ARROW_DOWN_KEY = "ArrowDown";
      const RIGHT_MOUSE_BUTTON = 2;
      const REGEXP_KEYDOWN = new RegExp(`${ARROW_UP_KEY}|${ARROW_DOWN_KEY}|${ESCAPE_KEY}`);
      const EVENT_HIDE = `hide${EVENT_KEY}`;
      const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
      const EVENT_SHOW = `show${EVENT_KEY}`;
      const EVENT_SHOWN = `shown${EVENT_KEY}`;
      const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
      const EVENT_KEYDOWN_DATA_API = `keydown${EVENT_KEY}${DATA_API_KEY}`;
      const EVENT_KEYUP_DATA_API = `keyup${EVENT_KEY}${DATA_API_KEY}`;
      const CLASS_NAME_SHOW = "show";
      const CLASS_NAME_DROPUP = "dropup";
      const CLASS_NAME_DROPEND = "dropend";
      const CLASS_NAME_DROPSTART = "dropstart";
      const CLASS_NAME_NAVBAR = "navbar";
      const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="dropdown"]';
      const SELECTOR_MENU = ".dropdown-menu";
      const SELECTOR_NAVBAR_NAV = ".navbar-nav";
      const SELECTOR_VISIBLE_ITEMS = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)";
      const PLACEMENT_TOP = isRTL() ? "top-end" : "top-start";
      const PLACEMENT_TOPEND = isRTL() ? "top-start" : "top-end";
      const PLACEMENT_BOTTOM = isRTL() ? "bottom-end" : "bottom-start";
      const PLACEMENT_BOTTOMEND = isRTL() ? "bottom-start" : "bottom-end";
      const PLACEMENT_RIGHT = isRTL() ? "left-start" : "right-start";
      const PLACEMENT_LEFT = isRTL() ? "right-start" : "left-start";
      const Default = {
        offset: [0, 2],
        boundary: "clippingParents",
        reference: "toggle",
        display: "dynamic",
        popperConfig: null,
        autoClose: true
      };
      const DefaultType = {
        offset: "(array|string|function)",
        boundary: "(string|element)",
        reference: "(string|element|object)",
        display: "string",
        popperConfig: "(null|object|function)",
        autoClose: "(boolean|string)"
      };
      class Dropdown2 extends BaseComponent__default.default {
        constructor(element, config) {
          super(element);
          this._popper = null;
          this._config = this._getConfig(config);
          this._menu = this._getMenuElement();
          this._inNavbar = this._detectNavbar();
        }
        static get Default() {
          return Default;
        }
        static get DefaultType() {
          return DefaultType;
        }
        static get NAME() {
          return NAME;
        }
        toggle() {
          return this._isShown() ? this.hide() : this.show();
        }
        show() {
          if (isDisabled(this._element) || this._isShown(this._menu)) {
            return;
          }
          const relatedTarget = {
            relatedTarget: this._element
          };
          const showEvent = EventHandler__default.default.trigger(this._element, EVENT_SHOW, relatedTarget);
          if (showEvent.defaultPrevented) {
            return;
          }
          const parent = Dropdown2.getParentFromElement(this._element);
          if (this._inNavbar) {
            Manipulator__default.default.setDataAttribute(this._menu, "popper", "none");
          } else {
            this._createPopper(parent);
          }
          if ("ontouchstart" in document.documentElement && !parent.closest(SELECTOR_NAVBAR_NAV)) {
            [].concat(...document.body.children).forEach((elem) => EventHandler__default.default.on(elem, "mouseover", noop));
          }
          this._element.focus();
          this._element.setAttribute("aria-expanded", true);
          this._menu.classList.add(CLASS_NAME_SHOW);
          this._element.classList.add(CLASS_NAME_SHOW);
          EventHandler__default.default.trigger(this._element, EVENT_SHOWN, relatedTarget);
        }
        hide() {
          if (isDisabled(this._element) || !this._isShown(this._menu)) {
            return;
          }
          const relatedTarget = {
            relatedTarget: this._element
          };
          this._completeHide(relatedTarget);
        }
        dispose() {
          if (this._popper) {
            this._popper.destroy();
          }
          super.dispose();
        }
        update() {
          this._inNavbar = this._detectNavbar();
          if (this._popper) {
            this._popper.update();
          }
        }
        _completeHide(relatedTarget) {
          const hideEvent = EventHandler__default.default.trigger(this._element, EVENT_HIDE, relatedTarget);
          if (hideEvent.defaultPrevented) {
            return;
          }
          if ("ontouchstart" in document.documentElement) {
            [].concat(...document.body.children).forEach((elem) => EventHandler__default.default.off(elem, "mouseover", noop));
          }
          if (this._popper) {
            this._popper.destroy();
          }
          this._menu.classList.remove(CLASS_NAME_SHOW);
          this._element.classList.remove(CLASS_NAME_SHOW);
          this._element.setAttribute("aria-expanded", "false");
          Manipulator__default.default.removeDataAttribute(this._menu, "popper");
          EventHandler__default.default.trigger(this._element, EVENT_HIDDEN, relatedTarget);
        }
        _getConfig(config) {
          config = __spreadValues(__spreadValues(__spreadValues({}, this.constructor.Default), Manipulator__default.default.getDataAttributes(this._element)), config);
          typeCheckConfig(NAME, config, this.constructor.DefaultType);
          if (typeof config.reference === "object" && !isElement3(config.reference) && typeof config.reference.getBoundingClientRect !== "function") {
            throw new TypeError(`${NAME.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
          }
          return config;
        }
        _createPopper(parent) {
          if (typeof Popper__namespace === "undefined") {
            throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");
          }
          let referenceElement = this._element;
          if (this._config.reference === "parent") {
            referenceElement = parent;
          } else if (isElement3(this._config.reference)) {
            referenceElement = getElement(this._config.reference);
          } else if (typeof this._config.reference === "object") {
            referenceElement = this._config.reference;
          }
          const popperConfig = this._getPopperConfig();
          const isDisplayStatic = popperConfig.modifiers.find((modifier) => modifier.name === "applyStyles" && modifier.enabled === false);
          this._popper = Popper__namespace.createPopper(referenceElement, this._menu, popperConfig);
          if (isDisplayStatic) {
            Manipulator__default.default.setDataAttribute(this._menu, "popper", "static");
          }
        }
        _isShown(element = this._element) {
          return element.classList.contains(CLASS_NAME_SHOW);
        }
        _getMenuElement() {
          return SelectorEngine__default.default.next(this._element, SELECTOR_MENU)[0];
        }
        _getPlacement() {
          const parentDropdown = this._element.parentNode;
          if (parentDropdown.classList.contains(CLASS_NAME_DROPEND)) {
            return PLACEMENT_RIGHT;
          }
          if (parentDropdown.classList.contains(CLASS_NAME_DROPSTART)) {
            return PLACEMENT_LEFT;
          }
          const isEnd = getComputedStyle(this._menu).getPropertyValue("--bs-position").trim() === "end";
          if (parentDropdown.classList.contains(CLASS_NAME_DROPUP)) {
            return isEnd ? PLACEMENT_TOPEND : PLACEMENT_TOP;
          }
          return isEnd ? PLACEMENT_BOTTOMEND : PLACEMENT_BOTTOM;
        }
        _detectNavbar() {
          return this._element.closest(`.${CLASS_NAME_NAVBAR}`) !== null;
        }
        _getOffset() {
          const {
            offset: offset2
          } = this._config;
          if (typeof offset2 === "string") {
            return offset2.split(",").map((val) => Number.parseInt(val, 10));
          }
          if (typeof offset2 === "function") {
            return (popperData) => offset2(popperData, this._element);
          }
          return offset2;
        }
        _getPopperConfig() {
          const defaultBsPopperConfig = {
            placement: this._getPlacement(),
            modifiers: [{
              name: "preventOverflow",
              options: {
                boundary: this._config.boundary
              }
            }, {
              name: "offset",
              options: {
                offset: this._getOffset()
              }
            }]
          };
          if (this._config.display === "static") {
            defaultBsPopperConfig.modifiers = [{
              name: "applyStyles",
              enabled: false
            }];
          }
          return __spreadValues(__spreadValues({}, defaultBsPopperConfig), typeof this._config.popperConfig === "function" ? this._config.popperConfig(defaultBsPopperConfig) : this._config.popperConfig);
        }
        _selectMenuItem({
          key,
          target
        }) {
          const items = SelectorEngine__default.default.find(SELECTOR_VISIBLE_ITEMS, this._menu).filter(isVisible2);
          if (!items.length) {
            return;
          }
          getNextActiveElement(items, target, key === ARROW_DOWN_KEY, !items.includes(target)).focus();
        }
        static jQueryInterface(config) {
          return this.each(function() {
            const data = Dropdown2.getOrCreateInstance(this, config);
            if (typeof config !== "string") {
              return;
            }
            if (typeof data[config] === "undefined") {
              throw new TypeError(`No method named "${config}"`);
            }
            data[config]();
          });
        }
        static clearMenus(event) {
          if (event && (event.button === RIGHT_MOUSE_BUTTON || event.type === "keyup" && event.key !== TAB_KEY)) {
            return;
          }
          const toggles = SelectorEngine__default.default.find(SELECTOR_DATA_TOGGLE);
          for (let i = 0, len = toggles.length; i < len; i++) {
            const context = Dropdown2.getInstance(toggles[i]);
            if (!context || context._config.autoClose === false) {
              continue;
            }
            if (!context._isShown()) {
              continue;
            }
            const relatedTarget = {
              relatedTarget: context._element
            };
            if (event) {
              const composedPath = event.composedPath();
              const isMenuTarget = composedPath.includes(context._menu);
              if (composedPath.includes(context._element) || context._config.autoClose === "inside" && !isMenuTarget || context._config.autoClose === "outside" && isMenuTarget) {
                continue;
              }
              if (context._menu.contains(event.target) && (event.type === "keyup" && event.key === TAB_KEY || /input|select|option|textarea|form/i.test(event.target.tagName))) {
                continue;
              }
              if (event.type === "click") {
                relatedTarget.clickEvent = event;
              }
            }
            context._completeHide(relatedTarget);
          }
        }
        static getParentFromElement(element) {
          return getElementFromSelector(element) || element.parentNode;
        }
        static dataApiKeydownHandler(event) {
          if (/input|textarea/i.test(event.target.tagName) ? event.key === SPACE_KEY || event.key !== ESCAPE_KEY && (event.key !== ARROW_DOWN_KEY && event.key !== ARROW_UP_KEY || event.target.closest(SELECTOR_MENU)) : !REGEXP_KEYDOWN.test(event.key)) {
            return;
          }
          const isActive = this.classList.contains(CLASS_NAME_SHOW);
          if (!isActive && event.key === ESCAPE_KEY) {
            return;
          }
          event.preventDefault();
          event.stopPropagation();
          if (isDisabled(this)) {
            return;
          }
          const getToggleButton = this.matches(SELECTOR_DATA_TOGGLE) ? this : SelectorEngine__default.default.prev(this, SELECTOR_DATA_TOGGLE)[0];
          const instance = Dropdown2.getOrCreateInstance(getToggleButton);
          if (event.key === ESCAPE_KEY) {
            instance.hide();
            return;
          }
          if (event.key === ARROW_UP_KEY || event.key === ARROW_DOWN_KEY) {
            if (!isActive) {
              instance.show();
            }
            instance._selectMenuItem(event);
            return;
          }
          if (!isActive || event.key === SPACE_KEY) {
            Dropdown2.clearMenus();
          }
        }
      }
      EventHandler__default.default.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE, Dropdown2.dataApiKeydownHandler);
      EventHandler__default.default.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown2.dataApiKeydownHandler);
      EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, Dropdown2.clearMenus);
      EventHandler__default.default.on(document, EVENT_KEYUP_DATA_API, Dropdown2.clearMenus);
      EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function(event) {
        event.preventDefault();
        Dropdown2.getOrCreateInstance(this).toggle();
      });
      defineJQueryPlugin(Dropdown2);
      return Dropdown2;
    });
  }
});

// node_modules/bootstrap/js/dist/modal.js
var require_modal = __commonJS({
  "node_modules/bootstrap/js/dist/modal.js"(exports, module) {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory(require_event_handler(), require_manipulator(), require_selector_engine(), require_base_component()) : typeof define === "function" && define.amd ? define(["./dom/event-handler", "./dom/manipulator", "./dom/selector-engine", "./base-component"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.Modal = factory(global.EventHandler, global.Manipulator, global.SelectorEngine, global.Base));
    })(exports, function(EventHandler, Manipulator, SelectorEngine, BaseComponent) {
      "use strict";
      const _interopDefaultLegacy = (e) => e && typeof e === "object" && "default" in e ? e : { default: e };
      const EventHandler__default = _interopDefaultLegacy(EventHandler);
      const Manipulator__default = _interopDefaultLegacy(Manipulator);
      const SelectorEngine__default = _interopDefaultLegacy(SelectorEngine);
      const BaseComponent__default = _interopDefaultLegacy(BaseComponent);
      const MILLISECONDS_MULTIPLIER = 1e3;
      const TRANSITION_END = "transitionend";
      const toType2 = (obj) => {
        if (obj === null || obj === void 0) {
          return `${obj}`;
        }
        return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
      };
      const getSelector = (element) => {
        let selector = element.getAttribute("data-bs-target");
        if (!selector || selector === "#") {
          let hrefAttr = element.getAttribute("href");
          if (!hrefAttr || !hrefAttr.includes("#") && !hrefAttr.startsWith(".")) {
            return null;
          }
          if (hrefAttr.includes("#") && !hrefAttr.startsWith("#")) {
            hrefAttr = `#${hrefAttr.split("#")[1]}`;
          }
          selector = hrefAttr && hrefAttr !== "#" ? hrefAttr.trim() : null;
        }
        return selector;
      };
      const getElementFromSelector = (element) => {
        const selector = getSelector(element);
        return selector ? document.querySelector(selector) : null;
      };
      const getTransitionDurationFromElement = (element) => {
        if (!element) {
          return 0;
        }
        let {
          transitionDuration,
          transitionDelay
        } = window.getComputedStyle(element);
        const floatTransitionDuration = Number.parseFloat(transitionDuration);
        const floatTransitionDelay = Number.parseFloat(transitionDelay);
        if (!floatTransitionDuration && !floatTransitionDelay) {
          return 0;
        }
        transitionDuration = transitionDuration.split(",")[0];
        transitionDelay = transitionDelay.split(",")[0];
        return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
      };
      const triggerTransitionEnd = (element) => {
        element.dispatchEvent(new Event(TRANSITION_END));
      };
      const isElement3 = (obj) => {
        if (!obj || typeof obj !== "object") {
          return false;
        }
        if (typeof obj.jquery !== "undefined") {
          obj = obj[0];
        }
        return typeof obj.nodeType !== "undefined";
      };
      const getElement = (obj) => {
        if (isElement3(obj)) {
          return obj.jquery ? obj[0] : obj;
        }
        if (typeof obj === "string" && obj.length > 0) {
          return document.querySelector(obj);
        }
        return null;
      };
      const typeCheckConfig = (componentName, config, configTypes) => {
        Object.keys(configTypes).forEach((property) => {
          const expectedTypes = configTypes[property];
          const value = config[property];
          const valueType = value && isElement3(value) ? "element" : toType2(value);
          if (!new RegExp(expectedTypes).test(valueType)) {
            throw new TypeError(`${componentName.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
          }
        });
      };
      const isVisible2 = (element) => {
        if (!isElement3(element) || element.getClientRects().length === 0) {
          return false;
        }
        return getComputedStyle(element).getPropertyValue("visibility") === "visible";
      };
      const isDisabled = (element) => {
        if (!element || element.nodeType !== Node.ELEMENT_NODE) {
          return true;
        }
        if (element.classList.contains("disabled")) {
          return true;
        }
        if (typeof element.disabled !== "undefined") {
          return element.disabled;
        }
        return element.hasAttribute("disabled") && element.getAttribute("disabled") !== "false";
      };
      const reflow = (element) => {
        element.offsetHeight;
      };
      const getjQuery = () => {
        const {
          jQuery
        } = window;
        if (jQuery && !document.body.hasAttribute("data-bs-no-jquery")) {
          return jQuery;
        }
        return null;
      };
      const DOMContentLoadedCallbacks = [];
      const onDOMContentLoaded = (callback) => {
        if (document.readyState === "loading") {
          if (!DOMContentLoadedCallbacks.length) {
            document.addEventListener("DOMContentLoaded", () => {
              DOMContentLoadedCallbacks.forEach((callback2) => callback2());
            });
          }
          DOMContentLoadedCallbacks.push(callback);
        } else {
          callback();
        }
      };
      const isRTL = () => document.documentElement.dir === "rtl";
      const defineJQueryPlugin = (plugin2) => {
        onDOMContentLoaded(() => {
          const $ = getjQuery();
          if ($) {
            const name = plugin2.NAME;
            const JQUERY_NO_CONFLICT = $.fn[name];
            $.fn[name] = plugin2.jQueryInterface;
            $.fn[name].Constructor = plugin2;
            $.fn[name].noConflict = () => {
              $.fn[name] = JQUERY_NO_CONFLICT;
              return plugin2.jQueryInterface;
            };
          }
        });
      };
      const execute = (callback) => {
        if (typeof callback === "function") {
          callback();
        }
      };
      const executeAfterTransition = (callback, transitionElement, waitForTransition = true) => {
        if (!waitForTransition) {
          execute(callback);
          return;
        }
        const durationPadding = 5;
        const emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding;
        let called = false;
        const handler = ({
          target
        }) => {
          if (target !== transitionElement) {
            return;
          }
          called = true;
          transitionElement.removeEventListener(TRANSITION_END, handler);
          execute(callback);
        };
        transitionElement.addEventListener(TRANSITION_END, handler);
        setTimeout(() => {
          if (!called) {
            triggerTransitionEnd(transitionElement);
          }
        }, emulatedDuration);
      };
      const SELECTOR_FIXED_CONTENT = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top";
      const SELECTOR_STICKY_CONTENT = ".sticky-top";
      class ScrollBarHelper {
        constructor() {
          this._element = document.body;
        }
        getWidth() {
          const documentWidth = document.documentElement.clientWidth;
          return Math.abs(window.innerWidth - documentWidth);
        }
        hide() {
          const width = this.getWidth();
          this._disableOverFlow();
          this._setElementAttributes(this._element, "paddingRight", (calculatedValue) => calculatedValue + width);
          this._setElementAttributes(SELECTOR_FIXED_CONTENT, "paddingRight", (calculatedValue) => calculatedValue + width);
          this._setElementAttributes(SELECTOR_STICKY_CONTENT, "marginRight", (calculatedValue) => calculatedValue - width);
        }
        _disableOverFlow() {
          this._saveInitialAttribute(this._element, "overflow");
          this._element.style.overflow = "hidden";
        }
        _setElementAttributes(selector, styleProp, callback) {
          const scrollbarWidth = this.getWidth();
          const manipulationCallBack = (element) => {
            if (element !== this._element && window.innerWidth > element.clientWidth + scrollbarWidth) {
              return;
            }
            this._saveInitialAttribute(element, styleProp);
            const calculatedValue = window.getComputedStyle(element)[styleProp];
            element.style[styleProp] = `${callback(Number.parseFloat(calculatedValue))}px`;
          };
          this._applyManipulationCallback(selector, manipulationCallBack);
        }
        reset() {
          this._resetElementAttributes(this._element, "overflow");
          this._resetElementAttributes(this._element, "paddingRight");
          this._resetElementAttributes(SELECTOR_FIXED_CONTENT, "paddingRight");
          this._resetElementAttributes(SELECTOR_STICKY_CONTENT, "marginRight");
        }
        _saveInitialAttribute(element, styleProp) {
          const actualValue = element.style[styleProp];
          if (actualValue) {
            Manipulator__default.default.setDataAttribute(element, styleProp, actualValue);
          }
        }
        _resetElementAttributes(selector, styleProp) {
          const manipulationCallBack = (element) => {
            const value = Manipulator__default.default.getDataAttribute(element, styleProp);
            if (typeof value === "undefined") {
              element.style.removeProperty(styleProp);
            } else {
              Manipulator__default.default.removeDataAttribute(element, styleProp);
              element.style[styleProp] = value;
            }
          };
          this._applyManipulationCallback(selector, manipulationCallBack);
        }
        _applyManipulationCallback(selector, callBack) {
          if (isElement3(selector)) {
            callBack(selector);
          } else {
            SelectorEngine__default.default.find(selector, this._element).forEach(callBack);
          }
        }
        isOverflowing() {
          return this.getWidth() > 0;
        }
      }
      const Default$2 = {
        className: "modal-backdrop",
        isVisible: true,
        isAnimated: false,
        rootElement: "body",
        clickCallback: null
      };
      const DefaultType$2 = {
        className: "string",
        isVisible: "boolean",
        isAnimated: "boolean",
        rootElement: "(element|string)",
        clickCallback: "(function|null)"
      };
      const NAME$2 = "backdrop";
      const CLASS_NAME_FADE$1 = "fade";
      const CLASS_NAME_SHOW$1 = "show";
      const EVENT_MOUSEDOWN = `mousedown.bs.${NAME$2}`;
      class Backdrop {
        constructor(config) {
          this._config = this._getConfig(config);
          this._isAppended = false;
          this._element = null;
        }
        show(callback) {
          if (!this._config.isVisible) {
            execute(callback);
            return;
          }
          this._append();
          if (this._config.isAnimated) {
            reflow(this._getElement());
          }
          this._getElement().classList.add(CLASS_NAME_SHOW$1);
          this._emulateAnimation(() => {
            execute(callback);
          });
        }
        hide(callback) {
          if (!this._config.isVisible) {
            execute(callback);
            return;
          }
          this._getElement().classList.remove(CLASS_NAME_SHOW$1);
          this._emulateAnimation(() => {
            this.dispose();
            execute(callback);
          });
        }
        _getElement() {
          if (!this._element) {
            const backdrop = document.createElement("div");
            backdrop.className = this._config.className;
            if (this._config.isAnimated) {
              backdrop.classList.add(CLASS_NAME_FADE$1);
            }
            this._element = backdrop;
          }
          return this._element;
        }
        _getConfig(config) {
          config = __spreadValues(__spreadValues({}, Default$2), typeof config === "object" ? config : {});
          config.rootElement = getElement(config.rootElement);
          typeCheckConfig(NAME$2, config, DefaultType$2);
          return config;
        }
        _append() {
          if (this._isAppended) {
            return;
          }
          this._config.rootElement.append(this._getElement());
          EventHandler__default.default.on(this._getElement(), EVENT_MOUSEDOWN, () => {
            execute(this._config.clickCallback);
          });
          this._isAppended = true;
        }
        dispose() {
          if (!this._isAppended) {
            return;
          }
          EventHandler__default.default.off(this._element, EVENT_MOUSEDOWN);
          this._element.remove();
          this._isAppended = false;
        }
        _emulateAnimation(callback) {
          executeAfterTransition(callback, this._getElement(), this._config.isAnimated);
        }
      }
      const Default$1 = {
        trapElement: null,
        autofocus: true
      };
      const DefaultType$1 = {
        trapElement: "element",
        autofocus: "boolean"
      };
      const NAME$1 = "focustrap";
      const DATA_KEY$1 = "bs.focustrap";
      const EVENT_KEY$1 = `.${DATA_KEY$1}`;
      const EVENT_FOCUSIN = `focusin${EVENT_KEY$1}`;
      const EVENT_KEYDOWN_TAB = `keydown.tab${EVENT_KEY$1}`;
      const TAB_KEY = "Tab";
      const TAB_NAV_FORWARD = "forward";
      const TAB_NAV_BACKWARD = "backward";
      class FocusTrap {
        constructor(config) {
          this._config = this._getConfig(config);
          this._isActive = false;
          this._lastTabNavDirection = null;
        }
        activate() {
          const {
            trapElement,
            autofocus
          } = this._config;
          if (this._isActive) {
            return;
          }
          if (autofocus) {
            trapElement.focus();
          }
          EventHandler__default.default.off(document, EVENT_KEY$1);
          EventHandler__default.default.on(document, EVENT_FOCUSIN, (event) => this._handleFocusin(event));
          EventHandler__default.default.on(document, EVENT_KEYDOWN_TAB, (event) => this._handleKeydown(event));
          this._isActive = true;
        }
        deactivate() {
          if (!this._isActive) {
            return;
          }
          this._isActive = false;
          EventHandler__default.default.off(document, EVENT_KEY$1);
        }
        _handleFocusin(event) {
          const {
            target
          } = event;
          const {
            trapElement
          } = this._config;
          if (target === document || target === trapElement || trapElement.contains(target)) {
            return;
          }
          const elements = SelectorEngine__default.default.focusableChildren(trapElement);
          if (elements.length === 0) {
            trapElement.focus();
          } else if (this._lastTabNavDirection === TAB_NAV_BACKWARD) {
            elements[elements.length - 1].focus();
          } else {
            elements[0].focus();
          }
        }
        _handleKeydown(event) {
          if (event.key !== TAB_KEY) {
            return;
          }
          this._lastTabNavDirection = event.shiftKey ? TAB_NAV_BACKWARD : TAB_NAV_FORWARD;
        }
        _getConfig(config) {
          config = __spreadValues(__spreadValues({}, Default$1), typeof config === "object" ? config : {});
          typeCheckConfig(NAME$1, config, DefaultType$1);
          return config;
        }
      }
      const enableDismissTrigger = (component, method = "hide") => {
        const clickEvent = `click.dismiss${component.EVENT_KEY}`;
        const name = component.NAME;
        EventHandler__default.default.on(document, clickEvent, `[data-bs-dismiss="${name}"]`, function(event) {
          if (["A", "AREA"].includes(this.tagName)) {
            event.preventDefault();
          }
          if (isDisabled(this)) {
            return;
          }
          const target = getElementFromSelector(this) || this.closest(`.${name}`);
          const instance = component.getOrCreateInstance(target);
          instance[method]();
        });
      };
      const NAME = "modal";
      const DATA_KEY = "bs.modal";
      const EVENT_KEY = `.${DATA_KEY}`;
      const DATA_API_KEY = ".data-api";
      const ESCAPE_KEY = "Escape";
      const Default = {
        backdrop: true,
        keyboard: true,
        focus: true
      };
      const DefaultType = {
        backdrop: "(boolean|string)",
        keyboard: "boolean",
        focus: "boolean"
      };
      const EVENT_HIDE = `hide${EVENT_KEY}`;
      const EVENT_HIDE_PREVENTED = `hidePrevented${EVENT_KEY}`;
      const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
      const EVENT_SHOW = `show${EVENT_KEY}`;
      const EVENT_SHOWN = `shown${EVENT_KEY}`;
      const EVENT_RESIZE = `resize${EVENT_KEY}`;
      const EVENT_CLICK_DISMISS = `click.dismiss${EVENT_KEY}`;
      const EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY}`;
      const EVENT_MOUSEUP_DISMISS = `mouseup.dismiss${EVENT_KEY}`;
      const EVENT_MOUSEDOWN_DISMISS = `mousedown.dismiss${EVENT_KEY}`;
      const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
      const CLASS_NAME_OPEN = "modal-open";
      const CLASS_NAME_FADE = "fade";
      const CLASS_NAME_SHOW = "show";
      const CLASS_NAME_STATIC = "modal-static";
      const OPEN_SELECTOR = ".modal.show";
      const SELECTOR_DIALOG = ".modal-dialog";
      const SELECTOR_MODAL_BODY = ".modal-body";
      const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="modal"]';
      class Modal2 extends BaseComponent__default.default {
        constructor(element, config) {
          super(element);
          this._config = this._getConfig(config);
          this._dialog = SelectorEngine__default.default.findOne(SELECTOR_DIALOG, this._element);
          this._backdrop = this._initializeBackDrop();
          this._focustrap = this._initializeFocusTrap();
          this._isShown = false;
          this._ignoreBackdropClick = false;
          this._isTransitioning = false;
          this._scrollBar = new ScrollBarHelper();
        }
        static get Default() {
          return Default;
        }
        static get NAME() {
          return NAME;
        }
        toggle(relatedTarget) {
          return this._isShown ? this.hide() : this.show(relatedTarget);
        }
        show(relatedTarget) {
          if (this._isShown || this._isTransitioning) {
            return;
          }
          const showEvent = EventHandler__default.default.trigger(this._element, EVENT_SHOW, {
            relatedTarget
          });
          if (showEvent.defaultPrevented) {
            return;
          }
          this._isShown = true;
          if (this._isAnimated()) {
            this._isTransitioning = true;
          }
          this._scrollBar.hide();
          document.body.classList.add(CLASS_NAME_OPEN);
          this._adjustDialog();
          this._setEscapeEvent();
          this._setResizeEvent();
          EventHandler__default.default.on(this._dialog, EVENT_MOUSEDOWN_DISMISS, () => {
            EventHandler__default.default.one(this._element, EVENT_MOUSEUP_DISMISS, (event) => {
              if (event.target === this._element) {
                this._ignoreBackdropClick = true;
              }
            });
          });
          this._showBackdrop(() => this._showElement(relatedTarget));
        }
        hide() {
          if (!this._isShown || this._isTransitioning) {
            return;
          }
          const hideEvent = EventHandler__default.default.trigger(this._element, EVENT_HIDE);
          if (hideEvent.defaultPrevented) {
            return;
          }
          this._isShown = false;
          const isAnimated = this._isAnimated();
          if (isAnimated) {
            this._isTransitioning = true;
          }
          this._setEscapeEvent();
          this._setResizeEvent();
          this._focustrap.deactivate();
          this._element.classList.remove(CLASS_NAME_SHOW);
          EventHandler__default.default.off(this._element, EVENT_CLICK_DISMISS);
          EventHandler__default.default.off(this._dialog, EVENT_MOUSEDOWN_DISMISS);
          this._queueCallback(() => this._hideModal(), this._element, isAnimated);
        }
        dispose() {
          [window, this._dialog].forEach((htmlElement) => EventHandler__default.default.off(htmlElement, EVENT_KEY));
          this._backdrop.dispose();
          this._focustrap.deactivate();
          super.dispose();
        }
        handleUpdate() {
          this._adjustDialog();
        }
        _initializeBackDrop() {
          return new Backdrop({
            isVisible: Boolean(this._config.backdrop),
            isAnimated: this._isAnimated()
          });
        }
        _initializeFocusTrap() {
          return new FocusTrap({
            trapElement: this._element
          });
        }
        _getConfig(config) {
          config = __spreadValues(__spreadValues(__spreadValues({}, Default), Manipulator__default.default.getDataAttributes(this._element)), typeof config === "object" ? config : {});
          typeCheckConfig(NAME, config, DefaultType);
          return config;
        }
        _showElement(relatedTarget) {
          const isAnimated = this._isAnimated();
          const modalBody = SelectorEngine__default.default.findOne(SELECTOR_MODAL_BODY, this._dialog);
          if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
            document.body.append(this._element);
          }
          this._element.style.display = "block";
          this._element.removeAttribute("aria-hidden");
          this._element.setAttribute("aria-modal", true);
          this._element.setAttribute("role", "dialog");
          this._element.scrollTop = 0;
          if (modalBody) {
            modalBody.scrollTop = 0;
          }
          if (isAnimated) {
            reflow(this._element);
          }
          this._element.classList.add(CLASS_NAME_SHOW);
          const transitionComplete = () => {
            if (this._config.focus) {
              this._focustrap.activate();
            }
            this._isTransitioning = false;
            EventHandler__default.default.trigger(this._element, EVENT_SHOWN, {
              relatedTarget
            });
          };
          this._queueCallback(transitionComplete, this._dialog, isAnimated);
        }
        _setEscapeEvent() {
          if (this._isShown) {
            EventHandler__default.default.on(this._element, EVENT_KEYDOWN_DISMISS, (event) => {
              if (this._config.keyboard && event.key === ESCAPE_KEY) {
                event.preventDefault();
                this.hide();
              } else if (!this._config.keyboard && event.key === ESCAPE_KEY) {
                this._triggerBackdropTransition();
              }
            });
          } else {
            EventHandler__default.default.off(this._element, EVENT_KEYDOWN_DISMISS);
          }
        }
        _setResizeEvent() {
          if (this._isShown) {
            EventHandler__default.default.on(window, EVENT_RESIZE, () => this._adjustDialog());
          } else {
            EventHandler__default.default.off(window, EVENT_RESIZE);
          }
        }
        _hideModal() {
          this._element.style.display = "none";
          this._element.setAttribute("aria-hidden", true);
          this._element.removeAttribute("aria-modal");
          this._element.removeAttribute("role");
          this._isTransitioning = false;
          this._backdrop.hide(() => {
            document.body.classList.remove(CLASS_NAME_OPEN);
            this._resetAdjustments();
            this._scrollBar.reset();
            EventHandler__default.default.trigger(this._element, EVENT_HIDDEN);
          });
        }
        _showBackdrop(callback) {
          EventHandler__default.default.on(this._element, EVENT_CLICK_DISMISS, (event) => {
            if (this._ignoreBackdropClick) {
              this._ignoreBackdropClick = false;
              return;
            }
            if (event.target !== event.currentTarget) {
              return;
            }
            if (this._config.backdrop === true) {
              this.hide();
            } else if (this._config.backdrop === "static") {
              this._triggerBackdropTransition();
            }
          });
          this._backdrop.show(callback);
        }
        _isAnimated() {
          return this._element.classList.contains(CLASS_NAME_FADE);
        }
        _triggerBackdropTransition() {
          const hideEvent = EventHandler__default.default.trigger(this._element, EVENT_HIDE_PREVENTED);
          if (hideEvent.defaultPrevented) {
            return;
          }
          const {
            classList,
            scrollHeight,
            style
          } = this._element;
          const isModalOverflowing = scrollHeight > document.documentElement.clientHeight;
          if (!isModalOverflowing && style.overflowY === "hidden" || classList.contains(CLASS_NAME_STATIC)) {
            return;
          }
          if (!isModalOverflowing) {
            style.overflowY = "hidden";
          }
          classList.add(CLASS_NAME_STATIC);
          this._queueCallback(() => {
            classList.remove(CLASS_NAME_STATIC);
            if (!isModalOverflowing) {
              this._queueCallback(() => {
                style.overflowY = "";
              }, this._dialog);
            }
          }, this._dialog);
          this._element.focus();
        }
        _adjustDialog() {
          const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
          const scrollbarWidth = this._scrollBar.getWidth();
          const isBodyOverflowing = scrollbarWidth > 0;
          if (!isBodyOverflowing && isModalOverflowing && !isRTL() || isBodyOverflowing && !isModalOverflowing && isRTL()) {
            this._element.style.paddingLeft = `${scrollbarWidth}px`;
          }
          if (isBodyOverflowing && !isModalOverflowing && !isRTL() || !isBodyOverflowing && isModalOverflowing && isRTL()) {
            this._element.style.paddingRight = `${scrollbarWidth}px`;
          }
        }
        _resetAdjustments() {
          this._element.style.paddingLeft = "";
          this._element.style.paddingRight = "";
        }
        static jQueryInterface(config, relatedTarget) {
          return this.each(function() {
            const data = Modal2.getOrCreateInstance(this, config);
            if (typeof config !== "string") {
              return;
            }
            if (typeof data[config] === "undefined") {
              throw new TypeError(`No method named "${config}"`);
            }
            data[config](relatedTarget);
          });
        }
      }
      EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function(event) {
        const target = getElementFromSelector(this);
        if (["A", "AREA"].includes(this.tagName)) {
          event.preventDefault();
        }
        EventHandler__default.default.one(target, EVENT_SHOW, (showEvent) => {
          if (showEvent.defaultPrevented) {
            return;
          }
          EventHandler__default.default.one(target, EVENT_HIDDEN, () => {
            if (isVisible2(this)) {
              this.focus();
            }
          });
        });
        const allReadyOpen = SelectorEngine__default.default.findOne(OPEN_SELECTOR);
        if (allReadyOpen) {
          Modal2.getInstance(allReadyOpen).hide();
        }
        const data = Modal2.getOrCreateInstance(target);
        data.toggle(this);
      });
      enableDismissTrigger(Modal2);
      defineJQueryPlugin(Modal2);
      return Modal2;
    });
  }
});

// node_modules/bootstrap/js/dist/offcanvas.js
var require_offcanvas = __commonJS({
  "node_modules/bootstrap/js/dist/offcanvas.js"(exports, module) {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory(require_selector_engine(), require_manipulator(), require_event_handler(), require_base_component()) : typeof define === "function" && define.amd ? define(["./dom/selector-engine", "./dom/manipulator", "./dom/event-handler", "./base-component"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.Offcanvas = factory(global.SelectorEngine, global.Manipulator, global.EventHandler, global.Base));
    })(exports, function(SelectorEngine, Manipulator, EventHandler, BaseComponent) {
      "use strict";
      const _interopDefaultLegacy = (e) => e && typeof e === "object" && "default" in e ? e : { default: e };
      const SelectorEngine__default = _interopDefaultLegacy(SelectorEngine);
      const Manipulator__default = _interopDefaultLegacy(Manipulator);
      const EventHandler__default = _interopDefaultLegacy(EventHandler);
      const BaseComponent__default = _interopDefaultLegacy(BaseComponent);
      const MILLISECONDS_MULTIPLIER = 1e3;
      const TRANSITION_END = "transitionend";
      const toType2 = (obj) => {
        if (obj === null || obj === void 0) {
          return `${obj}`;
        }
        return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
      };
      const getSelector = (element) => {
        let selector = element.getAttribute("data-bs-target");
        if (!selector || selector === "#") {
          let hrefAttr = element.getAttribute("href");
          if (!hrefAttr || !hrefAttr.includes("#") && !hrefAttr.startsWith(".")) {
            return null;
          }
          if (hrefAttr.includes("#") && !hrefAttr.startsWith("#")) {
            hrefAttr = `#${hrefAttr.split("#")[1]}`;
          }
          selector = hrefAttr && hrefAttr !== "#" ? hrefAttr.trim() : null;
        }
        return selector;
      };
      const getElementFromSelector = (element) => {
        const selector = getSelector(element);
        return selector ? document.querySelector(selector) : null;
      };
      const getTransitionDurationFromElement = (element) => {
        if (!element) {
          return 0;
        }
        let {
          transitionDuration,
          transitionDelay
        } = window.getComputedStyle(element);
        const floatTransitionDuration = Number.parseFloat(transitionDuration);
        const floatTransitionDelay = Number.parseFloat(transitionDelay);
        if (!floatTransitionDuration && !floatTransitionDelay) {
          return 0;
        }
        transitionDuration = transitionDuration.split(",")[0];
        transitionDelay = transitionDelay.split(",")[0];
        return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
      };
      const triggerTransitionEnd = (element) => {
        element.dispatchEvent(new Event(TRANSITION_END));
      };
      const isElement3 = (obj) => {
        if (!obj || typeof obj !== "object") {
          return false;
        }
        if (typeof obj.jquery !== "undefined") {
          obj = obj[0];
        }
        return typeof obj.nodeType !== "undefined";
      };
      const getElement = (obj) => {
        if (isElement3(obj)) {
          return obj.jquery ? obj[0] : obj;
        }
        if (typeof obj === "string" && obj.length > 0) {
          return document.querySelector(obj);
        }
        return null;
      };
      const typeCheckConfig = (componentName, config, configTypes) => {
        Object.keys(configTypes).forEach((property) => {
          const expectedTypes = configTypes[property];
          const value = config[property];
          const valueType = value && isElement3(value) ? "element" : toType2(value);
          if (!new RegExp(expectedTypes).test(valueType)) {
            throw new TypeError(`${componentName.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
          }
        });
      };
      const isVisible2 = (element) => {
        if (!isElement3(element) || element.getClientRects().length === 0) {
          return false;
        }
        return getComputedStyle(element).getPropertyValue("visibility") === "visible";
      };
      const isDisabled = (element) => {
        if (!element || element.nodeType !== Node.ELEMENT_NODE) {
          return true;
        }
        if (element.classList.contains("disabled")) {
          return true;
        }
        if (typeof element.disabled !== "undefined") {
          return element.disabled;
        }
        return element.hasAttribute("disabled") && element.getAttribute("disabled") !== "false";
      };
      const reflow = (element) => {
        element.offsetHeight;
      };
      const getjQuery = () => {
        const {
          jQuery
        } = window;
        if (jQuery && !document.body.hasAttribute("data-bs-no-jquery")) {
          return jQuery;
        }
        return null;
      };
      const DOMContentLoadedCallbacks = [];
      const onDOMContentLoaded = (callback) => {
        if (document.readyState === "loading") {
          if (!DOMContentLoadedCallbacks.length) {
            document.addEventListener("DOMContentLoaded", () => {
              DOMContentLoadedCallbacks.forEach((callback2) => callback2());
            });
          }
          DOMContentLoadedCallbacks.push(callback);
        } else {
          callback();
        }
      };
      const defineJQueryPlugin = (plugin2) => {
        onDOMContentLoaded(() => {
          const $ = getjQuery();
          if ($) {
            const name = plugin2.NAME;
            const JQUERY_NO_CONFLICT = $.fn[name];
            $.fn[name] = plugin2.jQueryInterface;
            $.fn[name].Constructor = plugin2;
            $.fn[name].noConflict = () => {
              $.fn[name] = JQUERY_NO_CONFLICT;
              return plugin2.jQueryInterface;
            };
          }
        });
      };
      const execute = (callback) => {
        if (typeof callback === "function") {
          callback();
        }
      };
      const executeAfterTransition = (callback, transitionElement, waitForTransition = true) => {
        if (!waitForTransition) {
          execute(callback);
          return;
        }
        const durationPadding = 5;
        const emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding;
        let called = false;
        const handler = ({
          target
        }) => {
          if (target !== transitionElement) {
            return;
          }
          called = true;
          transitionElement.removeEventListener(TRANSITION_END, handler);
          execute(callback);
        };
        transitionElement.addEventListener(TRANSITION_END, handler);
        setTimeout(() => {
          if (!called) {
            triggerTransitionEnd(transitionElement);
          }
        }, emulatedDuration);
      };
      const SELECTOR_FIXED_CONTENT = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top";
      const SELECTOR_STICKY_CONTENT = ".sticky-top";
      class ScrollBarHelper {
        constructor() {
          this._element = document.body;
        }
        getWidth() {
          const documentWidth = document.documentElement.clientWidth;
          return Math.abs(window.innerWidth - documentWidth);
        }
        hide() {
          const width = this.getWidth();
          this._disableOverFlow();
          this._setElementAttributes(this._element, "paddingRight", (calculatedValue) => calculatedValue + width);
          this._setElementAttributes(SELECTOR_FIXED_CONTENT, "paddingRight", (calculatedValue) => calculatedValue + width);
          this._setElementAttributes(SELECTOR_STICKY_CONTENT, "marginRight", (calculatedValue) => calculatedValue - width);
        }
        _disableOverFlow() {
          this._saveInitialAttribute(this._element, "overflow");
          this._element.style.overflow = "hidden";
        }
        _setElementAttributes(selector, styleProp, callback) {
          const scrollbarWidth = this.getWidth();
          const manipulationCallBack = (element) => {
            if (element !== this._element && window.innerWidth > element.clientWidth + scrollbarWidth) {
              return;
            }
            this._saveInitialAttribute(element, styleProp);
            const calculatedValue = window.getComputedStyle(element)[styleProp];
            element.style[styleProp] = `${callback(Number.parseFloat(calculatedValue))}px`;
          };
          this._applyManipulationCallback(selector, manipulationCallBack);
        }
        reset() {
          this._resetElementAttributes(this._element, "overflow");
          this._resetElementAttributes(this._element, "paddingRight");
          this._resetElementAttributes(SELECTOR_FIXED_CONTENT, "paddingRight");
          this._resetElementAttributes(SELECTOR_STICKY_CONTENT, "marginRight");
        }
        _saveInitialAttribute(element, styleProp) {
          const actualValue = element.style[styleProp];
          if (actualValue) {
            Manipulator__default.default.setDataAttribute(element, styleProp, actualValue);
          }
        }
        _resetElementAttributes(selector, styleProp) {
          const manipulationCallBack = (element) => {
            const value = Manipulator__default.default.getDataAttribute(element, styleProp);
            if (typeof value === "undefined") {
              element.style.removeProperty(styleProp);
            } else {
              Manipulator__default.default.removeDataAttribute(element, styleProp);
              element.style[styleProp] = value;
            }
          };
          this._applyManipulationCallback(selector, manipulationCallBack);
        }
        _applyManipulationCallback(selector, callBack) {
          if (isElement3(selector)) {
            callBack(selector);
          } else {
            SelectorEngine__default.default.find(selector, this._element).forEach(callBack);
          }
        }
        isOverflowing() {
          return this.getWidth() > 0;
        }
      }
      const Default$2 = {
        className: "modal-backdrop",
        isVisible: true,
        isAnimated: false,
        rootElement: "body",
        clickCallback: null
      };
      const DefaultType$2 = {
        className: "string",
        isVisible: "boolean",
        isAnimated: "boolean",
        rootElement: "(element|string)",
        clickCallback: "(function|null)"
      };
      const NAME$2 = "backdrop";
      const CLASS_NAME_FADE = "fade";
      const CLASS_NAME_SHOW$1 = "show";
      const EVENT_MOUSEDOWN = `mousedown.bs.${NAME$2}`;
      class Backdrop {
        constructor(config) {
          this._config = this._getConfig(config);
          this._isAppended = false;
          this._element = null;
        }
        show(callback) {
          if (!this._config.isVisible) {
            execute(callback);
            return;
          }
          this._append();
          if (this._config.isAnimated) {
            reflow(this._getElement());
          }
          this._getElement().classList.add(CLASS_NAME_SHOW$1);
          this._emulateAnimation(() => {
            execute(callback);
          });
        }
        hide(callback) {
          if (!this._config.isVisible) {
            execute(callback);
            return;
          }
          this._getElement().classList.remove(CLASS_NAME_SHOW$1);
          this._emulateAnimation(() => {
            this.dispose();
            execute(callback);
          });
        }
        _getElement() {
          if (!this._element) {
            const backdrop = document.createElement("div");
            backdrop.className = this._config.className;
            if (this._config.isAnimated) {
              backdrop.classList.add(CLASS_NAME_FADE);
            }
            this._element = backdrop;
          }
          return this._element;
        }
        _getConfig(config) {
          config = __spreadValues(__spreadValues({}, Default$2), typeof config === "object" ? config : {});
          config.rootElement = getElement(config.rootElement);
          typeCheckConfig(NAME$2, config, DefaultType$2);
          return config;
        }
        _append() {
          if (this._isAppended) {
            return;
          }
          this._config.rootElement.append(this._getElement());
          EventHandler__default.default.on(this._getElement(), EVENT_MOUSEDOWN, () => {
            execute(this._config.clickCallback);
          });
          this._isAppended = true;
        }
        dispose() {
          if (!this._isAppended) {
            return;
          }
          EventHandler__default.default.off(this._element, EVENT_MOUSEDOWN);
          this._element.remove();
          this._isAppended = false;
        }
        _emulateAnimation(callback) {
          executeAfterTransition(callback, this._getElement(), this._config.isAnimated);
        }
      }
      const Default$1 = {
        trapElement: null,
        autofocus: true
      };
      const DefaultType$1 = {
        trapElement: "element",
        autofocus: "boolean"
      };
      const NAME$1 = "focustrap";
      const DATA_KEY$1 = "bs.focustrap";
      const EVENT_KEY$1 = `.${DATA_KEY$1}`;
      const EVENT_FOCUSIN = `focusin${EVENT_KEY$1}`;
      const EVENT_KEYDOWN_TAB = `keydown.tab${EVENT_KEY$1}`;
      const TAB_KEY = "Tab";
      const TAB_NAV_FORWARD = "forward";
      const TAB_NAV_BACKWARD = "backward";
      class FocusTrap {
        constructor(config) {
          this._config = this._getConfig(config);
          this._isActive = false;
          this._lastTabNavDirection = null;
        }
        activate() {
          const {
            trapElement,
            autofocus
          } = this._config;
          if (this._isActive) {
            return;
          }
          if (autofocus) {
            trapElement.focus();
          }
          EventHandler__default.default.off(document, EVENT_KEY$1);
          EventHandler__default.default.on(document, EVENT_FOCUSIN, (event) => this._handleFocusin(event));
          EventHandler__default.default.on(document, EVENT_KEYDOWN_TAB, (event) => this._handleKeydown(event));
          this._isActive = true;
        }
        deactivate() {
          if (!this._isActive) {
            return;
          }
          this._isActive = false;
          EventHandler__default.default.off(document, EVENT_KEY$1);
        }
        _handleFocusin(event) {
          const {
            target
          } = event;
          const {
            trapElement
          } = this._config;
          if (target === document || target === trapElement || trapElement.contains(target)) {
            return;
          }
          const elements = SelectorEngine__default.default.focusableChildren(trapElement);
          if (elements.length === 0) {
            trapElement.focus();
          } else if (this._lastTabNavDirection === TAB_NAV_BACKWARD) {
            elements[elements.length - 1].focus();
          } else {
            elements[0].focus();
          }
        }
        _handleKeydown(event) {
          if (event.key !== TAB_KEY) {
            return;
          }
          this._lastTabNavDirection = event.shiftKey ? TAB_NAV_BACKWARD : TAB_NAV_FORWARD;
        }
        _getConfig(config) {
          config = __spreadValues(__spreadValues({}, Default$1), typeof config === "object" ? config : {});
          typeCheckConfig(NAME$1, config, DefaultType$1);
          return config;
        }
      }
      const enableDismissTrigger = (component, method = "hide") => {
        const clickEvent = `click.dismiss${component.EVENT_KEY}`;
        const name = component.NAME;
        EventHandler__default.default.on(document, clickEvent, `[data-bs-dismiss="${name}"]`, function(event) {
          if (["A", "AREA"].includes(this.tagName)) {
            event.preventDefault();
          }
          if (isDisabled(this)) {
            return;
          }
          const target = getElementFromSelector(this) || this.closest(`.${name}`);
          const instance = component.getOrCreateInstance(target);
          instance[method]();
        });
      };
      const NAME = "offcanvas";
      const DATA_KEY = "bs.offcanvas";
      const EVENT_KEY = `.${DATA_KEY}`;
      const DATA_API_KEY = ".data-api";
      const EVENT_LOAD_DATA_API = `load${EVENT_KEY}${DATA_API_KEY}`;
      const ESCAPE_KEY = "Escape";
      const Default = {
        backdrop: true,
        keyboard: true,
        scroll: false
      };
      const DefaultType = {
        backdrop: "boolean",
        keyboard: "boolean",
        scroll: "boolean"
      };
      const CLASS_NAME_SHOW = "show";
      const CLASS_NAME_BACKDROP = "offcanvas-backdrop";
      const OPEN_SELECTOR = ".offcanvas.show";
      const EVENT_SHOW = `show${EVENT_KEY}`;
      const EVENT_SHOWN = `shown${EVENT_KEY}`;
      const EVENT_HIDE = `hide${EVENT_KEY}`;
      const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
      const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
      const EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY}`;
      const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="offcanvas"]';
      class Offcanvas2 extends BaseComponent__default.default {
        constructor(element, config) {
          super(element);
          this._config = this._getConfig(config);
          this._isShown = false;
          this._backdrop = this._initializeBackDrop();
          this._focustrap = this._initializeFocusTrap();
          this._addEventListeners();
        }
        static get NAME() {
          return NAME;
        }
        static get Default() {
          return Default;
        }
        toggle(relatedTarget) {
          return this._isShown ? this.hide() : this.show(relatedTarget);
        }
        show(relatedTarget) {
          if (this._isShown) {
            return;
          }
          const showEvent = EventHandler__default.default.trigger(this._element, EVENT_SHOW, {
            relatedTarget
          });
          if (showEvent.defaultPrevented) {
            return;
          }
          this._isShown = true;
          this._element.style.visibility = "visible";
          this._backdrop.show();
          if (!this._config.scroll) {
            new ScrollBarHelper().hide();
          }
          this._element.removeAttribute("aria-hidden");
          this._element.setAttribute("aria-modal", true);
          this._element.setAttribute("role", "dialog");
          this._element.classList.add(CLASS_NAME_SHOW);
          const completeCallBack = () => {
            if (!this._config.scroll) {
              this._focustrap.activate();
            }
            EventHandler__default.default.trigger(this._element, EVENT_SHOWN, {
              relatedTarget
            });
          };
          this._queueCallback(completeCallBack, this._element, true);
        }
        hide() {
          if (!this._isShown) {
            return;
          }
          const hideEvent = EventHandler__default.default.trigger(this._element, EVENT_HIDE);
          if (hideEvent.defaultPrevented) {
            return;
          }
          this._focustrap.deactivate();
          this._element.blur();
          this._isShown = false;
          this._element.classList.remove(CLASS_NAME_SHOW);
          this._backdrop.hide();
          const completeCallback = () => {
            this._element.setAttribute("aria-hidden", true);
            this._element.removeAttribute("aria-modal");
            this._element.removeAttribute("role");
            this._element.style.visibility = "hidden";
            if (!this._config.scroll) {
              new ScrollBarHelper().reset();
            }
            EventHandler__default.default.trigger(this._element, EVENT_HIDDEN);
          };
          this._queueCallback(completeCallback, this._element, true);
        }
        dispose() {
          this._backdrop.dispose();
          this._focustrap.deactivate();
          super.dispose();
        }
        _getConfig(config) {
          config = __spreadValues(__spreadValues(__spreadValues({}, Default), Manipulator__default.default.getDataAttributes(this._element)), typeof config === "object" ? config : {});
          typeCheckConfig(NAME, config, DefaultType);
          return config;
        }
        _initializeBackDrop() {
          return new Backdrop({
            className: CLASS_NAME_BACKDROP,
            isVisible: this._config.backdrop,
            isAnimated: true,
            rootElement: this._element.parentNode,
            clickCallback: () => this.hide()
          });
        }
        _initializeFocusTrap() {
          return new FocusTrap({
            trapElement: this._element
          });
        }
        _addEventListeners() {
          EventHandler__default.default.on(this._element, EVENT_KEYDOWN_DISMISS, (event) => {
            if (this._config.keyboard && event.key === ESCAPE_KEY) {
              this.hide();
            }
          });
        }
        static jQueryInterface(config) {
          return this.each(function() {
            const data = Offcanvas2.getOrCreateInstance(this, config);
            if (typeof config !== "string") {
              return;
            }
            if (data[config] === void 0 || config.startsWith("_") || config === "constructor") {
              throw new TypeError(`No method named "${config}"`);
            }
            data[config](this);
          });
        }
      }
      EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function(event) {
        const target = getElementFromSelector(this);
        if (["A", "AREA"].includes(this.tagName)) {
          event.preventDefault();
        }
        if (isDisabled(this)) {
          return;
        }
        EventHandler__default.default.one(target, EVENT_HIDDEN, () => {
          if (isVisible2(this)) {
            this.focus();
          }
        });
        const allReadyOpen = SelectorEngine__default.default.findOne(OPEN_SELECTOR);
        if (allReadyOpen && allReadyOpen !== target) {
          Offcanvas2.getInstance(allReadyOpen).hide();
        }
        const data = Offcanvas2.getOrCreateInstance(target);
        data.toggle(this);
      });
      EventHandler__default.default.on(window, EVENT_LOAD_DATA_API, () => SelectorEngine__default.default.find(OPEN_SELECTOR).forEach((el) => Offcanvas2.getOrCreateInstance(el).show()));
      enableDismissTrigger(Offcanvas2);
      defineJQueryPlugin(Offcanvas2);
      return Offcanvas2;
    });
  }
});

// node_modules/bootstrap/js/dist/tooltip.js
var require_tooltip = __commonJS({
  "node_modules/bootstrap/js/dist/tooltip.js"(exports, module) {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory((init_lib(), lib_exports), require_data(), require_event_handler(), require_manipulator(), require_selector_engine(), require_base_component()) : typeof define === "function" && define.amd ? define(["@popperjs/core", "./dom/data", "./dom/event-handler", "./dom/manipulator", "./dom/selector-engine", "./base-component"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.Tooltip = factory(global.Popper, global.Data, global.EventHandler, global.Manipulator, global.SelectorEngine, global.Base));
    })(exports, function(Popper, Data, EventHandler, Manipulator, SelectorEngine, BaseComponent) {
      "use strict";
      const _interopDefaultLegacy = (e) => e && typeof e === "object" && "default" in e ? e : { default: e };
      function _interopNamespace(e) {
        if (e && e.__esModule)
          return e;
        const n = Object.create(null);
        if (e) {
          for (const k in e) {
            if (k !== "default") {
              const d = Object.getOwnPropertyDescriptor(e, k);
              Object.defineProperty(n, k, d.get ? d : {
                enumerable: true,
                get: () => e[k]
              });
            }
          }
        }
        n.default = e;
        return Object.freeze(n);
      }
      const Popper__namespace = _interopNamespace(Popper);
      const Data__default = _interopDefaultLegacy(Data);
      const EventHandler__default = _interopDefaultLegacy(EventHandler);
      const Manipulator__default = _interopDefaultLegacy(Manipulator);
      const SelectorEngine__default = _interopDefaultLegacy(SelectorEngine);
      const BaseComponent__default = _interopDefaultLegacy(BaseComponent);
      const MAX_UID = 1e6;
      const toType2 = (obj) => {
        if (obj === null || obj === void 0) {
          return `${obj}`;
        }
        return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
      };
      const getUID = (prefix) => {
        do {
          prefix += Math.floor(Math.random() * MAX_UID);
        } while (document.getElementById(prefix));
        return prefix;
      };
      const isElement3 = (obj) => {
        if (!obj || typeof obj !== "object") {
          return false;
        }
        if (typeof obj.jquery !== "undefined") {
          obj = obj[0];
        }
        return typeof obj.nodeType !== "undefined";
      };
      const getElement = (obj) => {
        if (isElement3(obj)) {
          return obj.jquery ? obj[0] : obj;
        }
        if (typeof obj === "string" && obj.length > 0) {
          return document.querySelector(obj);
        }
        return null;
      };
      const typeCheckConfig = (componentName, config, configTypes) => {
        Object.keys(configTypes).forEach((property) => {
          const expectedTypes = configTypes[property];
          const value = config[property];
          const valueType = value && isElement3(value) ? "element" : toType2(value);
          if (!new RegExp(expectedTypes).test(valueType)) {
            throw new TypeError(`${componentName.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
          }
        });
      };
      const findShadowRoot = (element) => {
        if (!document.documentElement.attachShadow) {
          return null;
        }
        if (typeof element.getRootNode === "function") {
          const root = element.getRootNode();
          return root instanceof ShadowRoot ? root : null;
        }
        if (element instanceof ShadowRoot) {
          return element;
        }
        if (!element.parentNode) {
          return null;
        }
        return findShadowRoot(element.parentNode);
      };
      const noop = () => {
      };
      const getjQuery = () => {
        const {
          jQuery
        } = window;
        if (jQuery && !document.body.hasAttribute("data-bs-no-jquery")) {
          return jQuery;
        }
        return null;
      };
      const DOMContentLoadedCallbacks = [];
      const onDOMContentLoaded = (callback) => {
        if (document.readyState === "loading") {
          if (!DOMContentLoadedCallbacks.length) {
            document.addEventListener("DOMContentLoaded", () => {
              DOMContentLoadedCallbacks.forEach((callback2) => callback2());
            });
          }
          DOMContentLoadedCallbacks.push(callback);
        } else {
          callback();
        }
      };
      const isRTL = () => document.documentElement.dir === "rtl";
      const defineJQueryPlugin = (plugin2) => {
        onDOMContentLoaded(() => {
          const $ = getjQuery();
          if ($) {
            const name = plugin2.NAME;
            const JQUERY_NO_CONFLICT = $.fn[name];
            $.fn[name] = plugin2.jQueryInterface;
            $.fn[name].Constructor = plugin2;
            $.fn[name].noConflict = () => {
              $.fn[name] = JQUERY_NO_CONFLICT;
              return plugin2.jQueryInterface;
            };
          }
        });
      };
      const uriAttributes = new Set(["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"]);
      const ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
      const SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^#&/:?]*(?:[#/?]|$))/i;
      const DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;
      const allowedAttribute = (attribute, allowedAttributeList) => {
        const attributeName = attribute.nodeName.toLowerCase();
        if (allowedAttributeList.includes(attributeName)) {
          if (uriAttributes.has(attributeName)) {
            return Boolean(SAFE_URL_PATTERN.test(attribute.nodeValue) || DATA_URL_PATTERN.test(attribute.nodeValue));
          }
          return true;
        }
        const regExp = allowedAttributeList.filter((attributeRegex) => attributeRegex instanceof RegExp);
        for (let i = 0, len = regExp.length; i < len; i++) {
          if (regExp[i].test(attributeName)) {
            return true;
          }
        }
        return false;
      };
      const DefaultAllowlist = {
        "*": ["class", "dir", "id", "lang", "role", ARIA_ATTRIBUTE_PATTERN],
        a: ["target", "href", "title", "rel"],
        area: [],
        b: [],
        br: [],
        col: [],
        code: [],
        div: [],
        em: [],
        hr: [],
        h1: [],
        h2: [],
        h3: [],
        h4: [],
        h5: [],
        h6: [],
        i: [],
        img: ["src", "srcset", "alt", "title", "width", "height"],
        li: [],
        ol: [],
        p: [],
        pre: [],
        s: [],
        small: [],
        span: [],
        sub: [],
        sup: [],
        strong: [],
        u: [],
        ul: []
      };
      function sanitizeHtml(unsafeHtml, allowList, sanitizeFn) {
        if (!unsafeHtml.length) {
          return unsafeHtml;
        }
        if (sanitizeFn && typeof sanitizeFn === "function") {
          return sanitizeFn(unsafeHtml);
        }
        const domParser = new window.DOMParser();
        const createdDocument = domParser.parseFromString(unsafeHtml, "text/html");
        const elements = [].concat(...createdDocument.body.querySelectorAll("*"));
        for (let i = 0, len = elements.length; i < len; i++) {
          const element = elements[i];
          const elementName = element.nodeName.toLowerCase();
          if (!Object.keys(allowList).includes(elementName)) {
            element.remove();
            continue;
          }
          const attributeList = [].concat(...element.attributes);
          const allowedAttributes = [].concat(allowList["*"] || [], allowList[elementName] || []);
          attributeList.forEach((attribute) => {
            if (!allowedAttribute(attribute, allowedAttributes)) {
              element.removeAttribute(attribute.nodeName);
            }
          });
        }
        return createdDocument.body.innerHTML;
      }
      const NAME = "tooltip";
      const DATA_KEY = "bs.tooltip";
      const EVENT_KEY = `.${DATA_KEY}`;
      const CLASS_PREFIX = "bs-tooltip";
      const DISALLOWED_ATTRIBUTES = new Set(["sanitize", "allowList", "sanitizeFn"]);
      const DefaultType = {
        animation: "boolean",
        template: "string",
        title: "(string|element|function)",
        trigger: "string",
        delay: "(number|object)",
        html: "boolean",
        selector: "(string|boolean)",
        placement: "(string|function)",
        offset: "(array|string|function)",
        container: "(string|element|boolean)",
        fallbackPlacements: "array",
        boundary: "(string|element)",
        customClass: "(string|function)",
        sanitize: "boolean",
        sanitizeFn: "(null|function)",
        allowList: "object",
        popperConfig: "(null|object|function)"
      };
      const AttachmentMap = {
        AUTO: "auto",
        TOP: "top",
        RIGHT: isRTL() ? "left" : "right",
        BOTTOM: "bottom",
        LEFT: isRTL() ? "right" : "left"
      };
      const Default = {
        animation: true,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: false,
        selector: false,
        placement: "top",
        offset: [0, 0],
        container: false,
        fallbackPlacements: ["top", "right", "bottom", "left"],
        boundary: "clippingParents",
        customClass: "",
        sanitize: true,
        sanitizeFn: null,
        allowList: DefaultAllowlist,
        popperConfig: null
      };
      const Event2 = {
        HIDE: `hide${EVENT_KEY}`,
        HIDDEN: `hidden${EVENT_KEY}`,
        SHOW: `show${EVENT_KEY}`,
        SHOWN: `shown${EVENT_KEY}`,
        INSERTED: `inserted${EVENT_KEY}`,
        CLICK: `click${EVENT_KEY}`,
        FOCUSIN: `focusin${EVENT_KEY}`,
        FOCUSOUT: `focusout${EVENT_KEY}`,
        MOUSEENTER: `mouseenter${EVENT_KEY}`,
        MOUSELEAVE: `mouseleave${EVENT_KEY}`
      };
      const CLASS_NAME_FADE = "fade";
      const CLASS_NAME_MODAL = "modal";
      const CLASS_NAME_SHOW = "show";
      const HOVER_STATE_SHOW = "show";
      const HOVER_STATE_OUT = "out";
      const SELECTOR_TOOLTIP_INNER = ".tooltip-inner";
      const SELECTOR_MODAL = `.${CLASS_NAME_MODAL}`;
      const EVENT_MODAL_HIDE = "hide.bs.modal";
      const TRIGGER_HOVER = "hover";
      const TRIGGER_FOCUS = "focus";
      const TRIGGER_CLICK = "click";
      const TRIGGER_MANUAL = "manual";
      class Tooltip2 extends BaseComponent__default.default {
        constructor(element, config) {
          if (typeof Popper__namespace === "undefined") {
            throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");
          }
          super(element);
          this._isEnabled = true;
          this._timeout = 0;
          this._hoverState = "";
          this._activeTrigger = {};
          this._popper = null;
          this._config = this._getConfig(config);
          this.tip = null;
          this._setListeners();
        }
        static get Default() {
          return Default;
        }
        static get NAME() {
          return NAME;
        }
        static get Event() {
          return Event2;
        }
        static get DefaultType() {
          return DefaultType;
        }
        enable() {
          this._isEnabled = true;
        }
        disable() {
          this._isEnabled = false;
        }
        toggleEnabled() {
          this._isEnabled = !this._isEnabled;
        }
        toggle(event) {
          if (!this._isEnabled) {
            return;
          }
          if (event) {
            const context = this._initializeOnDelegatedTarget(event);
            context._activeTrigger.click = !context._activeTrigger.click;
            if (context._isWithActiveTrigger()) {
              context._enter(null, context);
            } else {
              context._leave(null, context);
            }
          } else {
            if (this.getTipElement().classList.contains(CLASS_NAME_SHOW)) {
              this._leave(null, this);
              return;
            }
            this._enter(null, this);
          }
        }
        dispose() {
          clearTimeout(this._timeout);
          EventHandler__default.default.off(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);
          if (this.tip) {
            this.tip.remove();
          }
          this._disposePopper();
          super.dispose();
        }
        show() {
          if (this._element.style.display === "none") {
            throw new Error("Please use show on visible elements");
          }
          if (!(this.isWithContent() && this._isEnabled)) {
            return;
          }
          const showEvent = EventHandler__default.default.trigger(this._element, this.constructor.Event.SHOW);
          const shadowRoot = findShadowRoot(this._element);
          const isInTheDom = shadowRoot === null ? this._element.ownerDocument.documentElement.contains(this._element) : shadowRoot.contains(this._element);
          if (showEvent.defaultPrevented || !isInTheDom) {
            return;
          }
          if (this.constructor.NAME === "tooltip" && this.tip && this.getTitle() !== this.tip.querySelector(SELECTOR_TOOLTIP_INNER).innerHTML) {
            this._disposePopper();
            this.tip.remove();
            this.tip = null;
          }
          const tip = this.getTipElement();
          const tipId = getUID(this.constructor.NAME);
          tip.setAttribute("id", tipId);
          this._element.setAttribute("aria-describedby", tipId);
          if (this._config.animation) {
            tip.classList.add(CLASS_NAME_FADE);
          }
          const placement = typeof this._config.placement === "function" ? this._config.placement.call(this, tip, this._element) : this._config.placement;
          const attachment = this._getAttachment(placement);
          this._addAttachmentClass(attachment);
          const {
            container
          } = this._config;
          Data__default.default.set(tip, this.constructor.DATA_KEY, this);
          if (!this._element.ownerDocument.documentElement.contains(this.tip)) {
            container.append(tip);
            EventHandler__default.default.trigger(this._element, this.constructor.Event.INSERTED);
          }
          if (this._popper) {
            this._popper.update();
          } else {
            this._popper = Popper__namespace.createPopper(this._element, tip, this._getPopperConfig(attachment));
          }
          tip.classList.add(CLASS_NAME_SHOW);
          const customClass = this._resolvePossibleFunction(this._config.customClass);
          if (customClass) {
            tip.classList.add(...customClass.split(" "));
          }
          if ("ontouchstart" in document.documentElement) {
            [].concat(...document.body.children).forEach((element) => {
              EventHandler__default.default.on(element, "mouseover", noop);
            });
          }
          const complete = () => {
            const prevHoverState = this._hoverState;
            this._hoverState = null;
            EventHandler__default.default.trigger(this._element, this.constructor.Event.SHOWN);
            if (prevHoverState === HOVER_STATE_OUT) {
              this._leave(null, this);
            }
          };
          const isAnimated = this.tip.classList.contains(CLASS_NAME_FADE);
          this._queueCallback(complete, this.tip, isAnimated);
        }
        hide() {
          if (!this._popper) {
            return;
          }
          const tip = this.getTipElement();
          const complete = () => {
            if (this._isWithActiveTrigger()) {
              return;
            }
            if (this._hoverState !== HOVER_STATE_SHOW) {
              tip.remove();
            }
            this._cleanTipClass();
            this._element.removeAttribute("aria-describedby");
            EventHandler__default.default.trigger(this._element, this.constructor.Event.HIDDEN);
            this._disposePopper();
          };
          const hideEvent = EventHandler__default.default.trigger(this._element, this.constructor.Event.HIDE);
          if (hideEvent.defaultPrevented) {
            return;
          }
          tip.classList.remove(CLASS_NAME_SHOW);
          if ("ontouchstart" in document.documentElement) {
            [].concat(...document.body.children).forEach((element) => EventHandler__default.default.off(element, "mouseover", noop));
          }
          this._activeTrigger[TRIGGER_CLICK] = false;
          this._activeTrigger[TRIGGER_FOCUS] = false;
          this._activeTrigger[TRIGGER_HOVER] = false;
          const isAnimated = this.tip.classList.contains(CLASS_NAME_FADE);
          this._queueCallback(complete, this.tip, isAnimated);
          this._hoverState = "";
        }
        update() {
          if (this._popper !== null) {
            this._popper.update();
          }
        }
        isWithContent() {
          return Boolean(this.getTitle());
        }
        getTipElement() {
          if (this.tip) {
            return this.tip;
          }
          const element = document.createElement("div");
          element.innerHTML = this._config.template;
          const tip = element.children[0];
          this.setContent(tip);
          tip.classList.remove(CLASS_NAME_FADE, CLASS_NAME_SHOW);
          this.tip = tip;
          return this.tip;
        }
        setContent(tip) {
          this._sanitizeAndSetContent(tip, this.getTitle(), SELECTOR_TOOLTIP_INNER);
        }
        _sanitizeAndSetContent(template, content, selector) {
          const templateElement = SelectorEngine__default.default.findOne(selector, template);
          if (!content && templateElement) {
            templateElement.remove();
            return;
          }
          this.setElementContent(templateElement, content);
        }
        setElementContent(element, content) {
          if (element === null) {
            return;
          }
          if (isElement3(content)) {
            content = getElement(content);
            if (this._config.html) {
              if (content.parentNode !== element) {
                element.innerHTML = "";
                element.append(content);
              }
            } else {
              element.textContent = content.textContent;
            }
            return;
          }
          if (this._config.html) {
            if (this._config.sanitize) {
              content = sanitizeHtml(content, this._config.allowList, this._config.sanitizeFn);
            }
            element.innerHTML = content;
          } else {
            element.textContent = content;
          }
        }
        getTitle() {
          const title = this._element.getAttribute("data-bs-original-title") || this._config.title;
          return this._resolvePossibleFunction(title);
        }
        updateAttachment(attachment) {
          if (attachment === "right") {
            return "end";
          }
          if (attachment === "left") {
            return "start";
          }
          return attachment;
        }
        _initializeOnDelegatedTarget(event, context) {
          return context || this.constructor.getOrCreateInstance(event.delegateTarget, this._getDelegateConfig());
        }
        _getOffset() {
          const {
            offset: offset2
          } = this._config;
          if (typeof offset2 === "string") {
            return offset2.split(",").map((val) => Number.parseInt(val, 10));
          }
          if (typeof offset2 === "function") {
            return (popperData) => offset2(popperData, this._element);
          }
          return offset2;
        }
        _resolvePossibleFunction(content) {
          return typeof content === "function" ? content.call(this._element) : content;
        }
        _getPopperConfig(attachment) {
          const defaultBsPopperConfig = {
            placement: attachment,
            modifiers: [{
              name: "flip",
              options: {
                fallbackPlacements: this._config.fallbackPlacements
              }
            }, {
              name: "offset",
              options: {
                offset: this._getOffset()
              }
            }, {
              name: "preventOverflow",
              options: {
                boundary: this._config.boundary
              }
            }, {
              name: "arrow",
              options: {
                element: `.${this.constructor.NAME}-arrow`
              }
            }, {
              name: "onChange",
              enabled: true,
              phase: "afterWrite",
              fn: (data) => this._handlePopperPlacementChange(data)
            }],
            onFirstUpdate: (data) => {
              if (data.options.placement !== data.placement) {
                this._handlePopperPlacementChange(data);
              }
            }
          };
          return __spreadValues(__spreadValues({}, defaultBsPopperConfig), typeof this._config.popperConfig === "function" ? this._config.popperConfig(defaultBsPopperConfig) : this._config.popperConfig);
        }
        _addAttachmentClass(attachment) {
          this.getTipElement().classList.add(`${this._getBasicClassPrefix()}-${this.updateAttachment(attachment)}`);
        }
        _getAttachment(placement) {
          return AttachmentMap[placement.toUpperCase()];
        }
        _setListeners() {
          const triggers = this._config.trigger.split(" ");
          triggers.forEach((trigger) => {
            if (trigger === "click") {
              EventHandler__default.default.on(this._element, this.constructor.Event.CLICK, this._config.selector, (event) => this.toggle(event));
            } else if (trigger !== TRIGGER_MANUAL) {
              const eventIn = trigger === TRIGGER_HOVER ? this.constructor.Event.MOUSEENTER : this.constructor.Event.FOCUSIN;
              const eventOut = trigger === TRIGGER_HOVER ? this.constructor.Event.MOUSELEAVE : this.constructor.Event.FOCUSOUT;
              EventHandler__default.default.on(this._element, eventIn, this._config.selector, (event) => this._enter(event));
              EventHandler__default.default.on(this._element, eventOut, this._config.selector, (event) => this._leave(event));
            }
          });
          this._hideModalHandler = () => {
            if (this._element) {
              this.hide();
            }
          };
          EventHandler__default.default.on(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);
          if (this._config.selector) {
            this._config = __spreadProps(__spreadValues({}, this._config), {
              trigger: "manual",
              selector: ""
            });
          } else {
            this._fixTitle();
          }
        }
        _fixTitle() {
          const title = this._element.getAttribute("title");
          const originalTitleType = typeof this._element.getAttribute("data-bs-original-title");
          if (title || originalTitleType !== "string") {
            this._element.setAttribute("data-bs-original-title", title || "");
            if (title && !this._element.getAttribute("aria-label") && !this._element.textContent) {
              this._element.setAttribute("aria-label", title);
            }
            this._element.setAttribute("title", "");
          }
        }
        _enter(event, context) {
          context = this._initializeOnDelegatedTarget(event, context);
          if (event) {
            context._activeTrigger[event.type === "focusin" ? TRIGGER_FOCUS : TRIGGER_HOVER] = true;
          }
          if (context.getTipElement().classList.contains(CLASS_NAME_SHOW) || context._hoverState === HOVER_STATE_SHOW) {
            context._hoverState = HOVER_STATE_SHOW;
            return;
          }
          clearTimeout(context._timeout);
          context._hoverState = HOVER_STATE_SHOW;
          if (!context._config.delay || !context._config.delay.show) {
            context.show();
            return;
          }
          context._timeout = setTimeout(() => {
            if (context._hoverState === HOVER_STATE_SHOW) {
              context.show();
            }
          }, context._config.delay.show);
        }
        _leave(event, context) {
          context = this._initializeOnDelegatedTarget(event, context);
          if (event) {
            context._activeTrigger[event.type === "focusout" ? TRIGGER_FOCUS : TRIGGER_HOVER] = context._element.contains(event.relatedTarget);
          }
          if (context._isWithActiveTrigger()) {
            return;
          }
          clearTimeout(context._timeout);
          context._hoverState = HOVER_STATE_OUT;
          if (!context._config.delay || !context._config.delay.hide) {
            context.hide();
            return;
          }
          context._timeout = setTimeout(() => {
            if (context._hoverState === HOVER_STATE_OUT) {
              context.hide();
            }
          }, context._config.delay.hide);
        }
        _isWithActiveTrigger() {
          for (const trigger in this._activeTrigger) {
            if (this._activeTrigger[trigger]) {
              return true;
            }
          }
          return false;
        }
        _getConfig(config) {
          const dataAttributes = Manipulator__default.default.getDataAttributes(this._element);
          Object.keys(dataAttributes).forEach((dataAttr) => {
            if (DISALLOWED_ATTRIBUTES.has(dataAttr)) {
              delete dataAttributes[dataAttr];
            }
          });
          config = __spreadValues(__spreadValues(__spreadValues({}, this.constructor.Default), dataAttributes), typeof config === "object" && config ? config : {});
          config.container = config.container === false ? document.body : getElement(config.container);
          if (typeof config.delay === "number") {
            config.delay = {
              show: config.delay,
              hide: config.delay
            };
          }
          if (typeof config.title === "number") {
            config.title = config.title.toString();
          }
          if (typeof config.content === "number") {
            config.content = config.content.toString();
          }
          typeCheckConfig(NAME, config, this.constructor.DefaultType);
          if (config.sanitize) {
            config.template = sanitizeHtml(config.template, config.allowList, config.sanitizeFn);
          }
          return config;
        }
        _getDelegateConfig() {
          const config = {};
          for (const key in this._config) {
            if (this.constructor.Default[key] !== this._config[key]) {
              config[key] = this._config[key];
            }
          }
          return config;
        }
        _cleanTipClass() {
          const tip = this.getTipElement();
          const basicClassPrefixRegex = new RegExp(`(^|\\s)${this._getBasicClassPrefix()}\\S+`, "g");
          const tabClass = tip.getAttribute("class").match(basicClassPrefixRegex);
          if (tabClass !== null && tabClass.length > 0) {
            tabClass.map((token) => token.trim()).forEach((tClass) => tip.classList.remove(tClass));
          }
        }
        _getBasicClassPrefix() {
          return CLASS_PREFIX;
        }
        _handlePopperPlacementChange(popperData) {
          const {
            state
          } = popperData;
          if (!state) {
            return;
          }
          this.tip = state.elements.popper;
          this._cleanTipClass();
          this._addAttachmentClass(this._getAttachment(state.placement));
        }
        _disposePopper() {
          if (this._popper) {
            this._popper.destroy();
            this._popper = null;
          }
        }
        static jQueryInterface(config) {
          return this.each(function() {
            const data = Tooltip2.getOrCreateInstance(this, config);
            if (typeof config === "string") {
              if (typeof data[config] === "undefined") {
                throw new TypeError(`No method named "${config}"`);
              }
              data[config]();
            }
          });
        }
      }
      defineJQueryPlugin(Tooltip2);
      return Tooltip2;
    });
  }
});

// node_modules/bootstrap/js/dist/popover.js
var require_popover = __commonJS({
  "node_modules/bootstrap/js/dist/popover.js"(exports, module) {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory(require_tooltip()) : typeof define === "function" && define.amd ? define(["./tooltip"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.Popover = factory(global.Tooltip));
    })(exports, function(Tooltip2) {
      "use strict";
      const _interopDefaultLegacy = (e) => e && typeof e === "object" && "default" in e ? e : { default: e };
      const Tooltip__default = _interopDefaultLegacy(Tooltip2);
      const getjQuery = () => {
        const {
          jQuery
        } = window;
        if (jQuery && !document.body.hasAttribute("data-bs-no-jquery")) {
          return jQuery;
        }
        return null;
      };
      const DOMContentLoadedCallbacks = [];
      const onDOMContentLoaded = (callback) => {
        if (document.readyState === "loading") {
          if (!DOMContentLoadedCallbacks.length) {
            document.addEventListener("DOMContentLoaded", () => {
              DOMContentLoadedCallbacks.forEach((callback2) => callback2());
            });
          }
          DOMContentLoadedCallbacks.push(callback);
        } else {
          callback();
        }
      };
      const defineJQueryPlugin = (plugin2) => {
        onDOMContentLoaded(() => {
          const $ = getjQuery();
          if ($) {
            const name = plugin2.NAME;
            const JQUERY_NO_CONFLICT = $.fn[name];
            $.fn[name] = plugin2.jQueryInterface;
            $.fn[name].Constructor = plugin2;
            $.fn[name].noConflict = () => {
              $.fn[name] = JQUERY_NO_CONFLICT;
              return plugin2.jQueryInterface;
            };
          }
        });
      };
      const NAME = "popover";
      const DATA_KEY = "bs.popover";
      const EVENT_KEY = `.${DATA_KEY}`;
      const CLASS_PREFIX = "bs-popover";
      const Default = __spreadProps(__spreadValues({}, Tooltip__default.default.Default), {
        placement: "right",
        offset: [0, 8],
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
      });
      const DefaultType = __spreadProps(__spreadValues({}, Tooltip__default.default.DefaultType), {
        content: "(string|element|function)"
      });
      const Event2 = {
        HIDE: `hide${EVENT_KEY}`,
        HIDDEN: `hidden${EVENT_KEY}`,
        SHOW: `show${EVENT_KEY}`,
        SHOWN: `shown${EVENT_KEY}`,
        INSERTED: `inserted${EVENT_KEY}`,
        CLICK: `click${EVENT_KEY}`,
        FOCUSIN: `focusin${EVENT_KEY}`,
        FOCUSOUT: `focusout${EVENT_KEY}`,
        MOUSEENTER: `mouseenter${EVENT_KEY}`,
        MOUSELEAVE: `mouseleave${EVENT_KEY}`
      };
      const SELECTOR_TITLE = ".popover-header";
      const SELECTOR_CONTENT = ".popover-body";
      class Popover2 extends Tooltip__default.default {
        static get Default() {
          return Default;
        }
        static get NAME() {
          return NAME;
        }
        static get Event() {
          return Event2;
        }
        static get DefaultType() {
          return DefaultType;
        }
        isWithContent() {
          return this.getTitle() || this._getContent();
        }
        setContent(tip) {
          this._sanitizeAndSetContent(tip, this.getTitle(), SELECTOR_TITLE);
          this._sanitizeAndSetContent(tip, this._getContent(), SELECTOR_CONTENT);
        }
        _getContent() {
          return this._resolvePossibleFunction(this._config.content);
        }
        _getBasicClassPrefix() {
          return CLASS_PREFIX;
        }
        static jQueryInterface(config) {
          return this.each(function() {
            const data = Popover2.getOrCreateInstance(this, config);
            if (typeof config === "string") {
              if (typeof data[config] === "undefined") {
                throw new TypeError(`No method named "${config}"`);
              }
              data[config]();
            }
          });
        }
      }
      defineJQueryPlugin(Popover2);
      return Popover2;
    });
  }
});

// node_modules/bootstrap-vue-3/dist/bootstrap-vue-3.es.js
var import_collapse = __toModule(require_collapse());
var import_alert = __toModule(require_alert());
var import_carousel = __toModule(require_carousel());
var import_dropdown = __toModule(require_dropdown());
var import_modal = __toModule(require_modal());
var import_offcanvas = __toModule(require_offcanvas());
var import_popover = __toModule(require_popover());
var import_tooltip = __toModule(require_tooltip());
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues2 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps2 = (a, b) => __defProps(a, __getOwnPropDescs(b));
function getID(suffix = "") {
  return `__BVID__${Math.random().toString().substr(2, 6)}___BV_${suffix}__`;
}
function useId(id, suffix) {
  return computed(() => id || getID(suffix));
}
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
var injectionKey$5 = Symbol();
var _sfc_main$1p = defineComponent({
  name: "BAccordion",
  props: {
    flush: { type: Boolean, default: false },
    free: { type: Boolean, default: false },
    id: { type: String, default: void 0 }
  },
  setup(props) {
    const computedId = useId(props.id, "accordion");
    const classes = computed(() => ({
      "accordion-flush": props.flush
    }));
    if (!props.free) {
      provide(injectionKey$5, `${computedId.value}`);
    }
    return {
      computedId,
      classes
    };
  }
});
var _hoisted_1$G = ["id"];
function _sfc_render$15(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    id: _ctx.computedId,
    class: normalizeClass(["accordion", _ctx.classes])
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 10, _hoisted_1$G);
}
var BAccordion = _export_sfc(_sfc_main$1p, [["render", _sfc_render$15]]);
function useEventListener(element, event, callback) {
  onMounted(() => {
    var _a;
    (_a = element == null ? void 0 : element.value) == null ? void 0 : _a.addEventListener(event, callback);
  });
  onBeforeUnmount(() => {
    var _a;
    (_a = element == null ? void 0 : element.value) == null ? void 0 : _a.removeEventListener(event, callback);
  });
}
var _sfc_main$1o = defineComponent({
  name: "BCollapse",
  props: {
    accordion: { type: String, required: false },
    id: { type: String, default: getID() },
    modelValue: { type: Boolean, default: false },
    tag: { type: String, default: "div" },
    toggle: { type: Boolean, default: false },
    visible: { type: Boolean, default: false }
  },
  emits: ["update:modelValue", "show", "shown", "hide", "hidden"],
  setup(props, { emit }) {
    const element = ref();
    const instance = ref();
    const classes = computed(() => ({
      show: props.modelValue
    }));
    const close = () => emit("update:modelValue", false);
    useEventListener(element, "show.bs.collapse", () => {
      emit("show");
      emit("update:modelValue", true);
    });
    useEventListener(element, "hide.bs.collapse", () => {
      emit("hide");
      emit("update:modelValue", false);
    });
    useEventListener(element, "shown.bs.collapse", () => emit("shown"));
    useEventListener(element, "hidden.bs.collapse", () => emit("hidden"));
    onMounted(() => {
      var _a;
      instance.value = new import_collapse.default(element.value, {
        parent: props.accordion ? `#${props.accordion}` : void 0,
        toggle: props.toggle
      });
      if (props.visible || props.modelValue) {
        emit("update:modelValue", true);
        (_a = instance.value) == null ? void 0 : _a.show();
      }
    });
    watch(() => props.modelValue, (value) => {
      var _a, _b;
      if (value) {
        (_a = instance.value) == null ? void 0 : _a.show();
      } else {
        (_b = instance.value) == null ? void 0 : _b.hide();
      }
    });
    watch(() => props.visible, (value) => {
      var _a, _b;
      if (value) {
        emit("update:modelValue", !!value);
        (_a = instance.value) == null ? void 0 : _a.show();
      } else {
        emit("update:modelValue", !!value);
        (_b = instance.value) == null ? void 0 : _b.hide();
      }
    });
    return {
      element,
      classes,
      close
    };
  }
});
function _sfc_render$14(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.tag), {
    id: _ctx.id,
    ref: "element",
    class: normalizeClass(["collapse", _ctx.classes]),
    "data-bs-parent": _ctx.accordion || null
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default", {
        visible: _ctx.modelValue,
        close: _ctx.close
      })
    ]),
    _: 3
  }, 8, ["id", "class", "data-bs-parent"]);
}
var BCollapse = _export_sfc(_sfc_main$1o, [["render", _sfc_render$14]]);
var RX_UNDERSCORE = /_/g;
var RX_LOWER_UPPER = /([a-z])([A-Z])/g;
var RX_FIRST_START_SPACE_WORD = /(\s|^)(\w)/;
var RX_SPACE_SPLIT = /\s+/;
var RX_HASH = /^#/;
var RX_HASH_ID = /^#[A-Za-z]+[\w\-:.]*$/;
var arrayIncludes = (array, value) => array.indexOf(value) !== -1;
var from = (...args) => Array.from([...args]);
var concat = (...args) => Array.prototype.concat.apply([], args);
var HAS_WINDOW_SUPPORT = typeof window !== "undefined";
var HAS_DOCUMENT_SUPPORT = typeof document !== "undefined";
var HAS_NAVIGATOR_SUPPORT = typeof navigator !== "undefined";
var IS_BROWSER = HAS_WINDOW_SUPPORT && HAS_DOCUMENT_SUPPORT && HAS_NAVIGATOR_SUPPORT;
var DOCUMENT = HAS_DOCUMENT_SUPPORT ? document : {};
var Element2 = HAS_WINDOW_SUPPORT ? window.Element : class Element22 extends Object {
};
var HTMLElement$1 = HAS_WINDOW_SUPPORT ? window.HTMLElement : class HTMLElement2 extends Element2 {
};
var RX_NUMBER = /^[0-9]*\.?[0-9]+$/;
var isBoolean = (value) => toType(value) === "boolean";
var isObject = (obj) => obj !== null && typeof obj === "object";
var isString = (value) => typeof value === "string";
var isUndefined = (value) => value === void 0;
var isNull = (value) => value === null;
var isUndefinedOrNull = (value) => isUndefined(value) || isNull(value);
var isNumeric = (value) => RX_NUMBER.test(String(value));
var isNumber = (value) => typeof value === "number";
var toType = (value) => typeof value;
var isFunction = (value) => toType(value) === "function";
var isPlainObject = (obj) => Object.prototype.toString.call(obj) === "[object Object]";
var isArray = (value) => Array.isArray(value);
var toString = (val, spaces = 2) => isUndefinedOrNull(val) ? "" : isArray(val) || isPlainObject(val) && val.toString === Object.prototype.toString ? JSON.stringify(val, null, spaces) : String(val);
var startCase = (str) => str.replace(RX_UNDERSCORE, " ").replace(RX_LOWER_UPPER, (str2, $1, $2) => `${$1} ${$2}`).replace(RX_FIRST_START_SPACE_WORD, (str2, $1, $2) => $1 + $2.toUpperCase());
var upperFirst = (str) => {
  str = isString(str) ? str.trim() : String(str);
  return str.charAt(0).toUpperCase() + str.slice(1);
};
var isElement2 = (el) => !!(el && el.nodeType === Node.ELEMENT_NODE);
var getBCR = (el) => isElement2(el) ? el.getBoundingClientRect() : null;
var getActiveElement = (excludes = []) => {
  const { activeElement } = document;
  return activeElement && !excludes.some((el) => el === activeElement) ? activeElement : null;
};
var isActiveElement = (el) => isElement2(el) && el === getActiveElement();
var attemptFocus = (el, options = {}) => {
  try {
    el.focus(options);
  } catch (e) {
    console.error(e);
  }
  return isActiveElement(el);
};
var getStyle = (el, prop) => prop && isElement2(el) ? el.getAttribute(prop) || null : null;
var isVisible = (el) => {
  if (getStyle(el, "display") === "none") {
    return false;
  }
  const bcr = getBCR(el);
  return !!(bcr && bcr.height > 0 && bcr.width > 0);
};
var isEmptySlot = (slot, data) => !slot || slot(data).filter((vnode) => vnode.type !== Comment).length < 1;
var select = (selector, root) => (isElement2(root) ? root : DOCUMENT).querySelector(selector) || null;
var selectAll = (selector, root) => from((isElement2(root) ? root : DOCUMENT).querySelectorAll(selector));
var getAttr = (el, attr) => attr && isElement2(el) ? el.getAttribute(attr) : null;
var setAttr = (el, attr, value) => {
  if (attr && isElement2(el)) {
    el.setAttribute(attr, value);
  }
};
var removeAttr = (el, attr) => {
  if (attr && isElement2(el)) {
    el.removeAttribute(attr);
  }
};
var isTag = (tag, name) => toString(tag).toLowerCase() === toString(name).toLowerCase();
var requestAF = HAS_WINDOW_SUPPORT ? window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || ((cb) => setTimeout(cb, 16)) : (cb) => setTimeout(cb, 0);
function resolveToggleType(el) {
  if (el.classList.contains("offcanvas")) {
    return "offcanvas";
  }
  if (el.classList.contains("collapse")) {
    return "collapse";
  }
  throw Error("Couldn't resolve toggle type");
}
var getTargets = (binding, el) => {
  const { modifiers, arg, value } = binding;
  const targets = Object.keys(modifiers || {});
  const localValue = isString(value) ? value.split(RX_SPACE_SPLIT) : value;
  if (isTag(el.tagName, "a")) {
    const href = getAttr(el, "href") || "";
    if (RX_HASH_ID.test(href)) {
      targets.push(href.replace(RX_HASH, ""));
    }
  }
  concat(arg, localValue).forEach((t) => isString(t) && targets.push(t));
  return targets.filter((t, index, arr) => t && arr.indexOf(t) === index);
};
var BToggle = {
  mounted(el, binding) {
    const targetIds = getTargets(binding, el);
    const targetAttrs = [];
    let targetAttr = "data-bs-target";
    if (el.tagName === "a") {
      targetAttr = "href";
    }
    for (let index = 0; index < targetIds.length; index++) {
      const targetId = targetIds[index];
      const target = document.getElementById(targetId);
      if (target) {
        el.setAttribute("data-bs-toggle", resolveToggleType(target));
        targetAttrs.push(`#${targetId}`);
      }
    }
    if (targetAttrs.length > 0) {
      el.setAttribute(targetAttr, targetAttrs.join(","));
    }
  }
};
var _sfc_main$1n = defineComponent({
  name: "BAccordionItem",
  components: {
    BCollapse
  },
  directives: {
    BToggle
  },
  props: {
    title: { type: String },
    id: { type: String },
    visible: { type: Boolean, default: false }
  },
  setup(props) {
    const computedId = useId(props.id, "accordion_item");
    const parent = inject(injectionKey$5, "");
    return {
      parent,
      computedId
    };
  }
});
var _hoisted_1$F = { class: "accordion-item" };
var _hoisted_2$l = ["id"];
var _hoisted_3$9 = ["aria-expanded", "aria-controls"];
var _hoisted_4$5 = { class: "accordion-body" };
function _sfc_render$13(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_collapse = resolveComponent("b-collapse");
  const _directive_b_toggle = resolveDirective("b-toggle");
  return openBlock(), createElementBlock("div", _hoisted_1$F, [
    createBaseVNode("h2", {
      id: `${_ctx.computedId}heading`,
      class: "accordion-header"
    }, [
      withDirectives((openBlock(), createElementBlock("button", {
        class: normalizeClass(["accordion-button", { collapsed: !_ctx.visible }]),
        type: "button",
        "aria-expanded": _ctx.visible ? "true" : "false",
        "aria-controls": _ctx.computedId
      }, [
        renderSlot(_ctx.$slots, "title", {}, () => [
          createTextVNode(toDisplayString(_ctx.title), 1)
        ])
      ], 10, _hoisted_3$9)), [
        [_directive_b_toggle, void 0, _ctx.computedId]
      ])
    ], 8, _hoisted_2$l),
    createVNode(_component_b_collapse, {
      id: _ctx.computedId,
      class: "accordion-collapse",
      visible: _ctx.visible,
      accordion: _ctx.parent,
      "aria-labelledby": `heading${_ctx.computedId}`
    }, {
      default: withCtx(() => [
        createBaseVNode("div", _hoisted_4$5, [
          renderSlot(_ctx.$slots, "default")
        ])
      ]),
      _: 3
    }, 8, ["id", "visible", "accordion", "aria-labelledby"])
  ]);
}
var BAccordionItem = _export_sfc(_sfc_main$1n, [["render", _sfc_render$13]]);
var toInteger = (value, defaultValue = NaN) => {
  return Number.isInteger(value) ? value : defaultValue;
};
var stringToInteger = (value, defaultValue = NaN) => {
  const integer = parseInt(value, 10);
  return isNaN(integer) ? defaultValue : integer;
};
var toFloat = (value, defaultValue = NaN) => {
  const float = parseFloat(value.toString());
  return isNaN(float) ? defaultValue : float;
};
var _sfc_main$1m = defineComponent({
  name: "BAlert",
  props: {
    dismissLabel: { type: String, default: "Close" },
    dismissible: { type: Boolean, default: false },
    fade: { type: Boolean, default: false },
    modelValue: { type: [Boolean, Number], default: false },
    show: { type: Boolean, default: false },
    variant: { type: String, default: "info" }
  },
  emits: ["dismissed", "dismiss-count-down", "update:modelValue"],
  setup(props, { emit }) {
    const element = ref();
    const instance = ref();
    const classes = computed(() => ({
      [`alert-${props.variant}`]: props.variant,
      "show": props.modelValue,
      "alert-dismissible": props.dismissible,
      "fade": props.modelValue
    }));
    let _countDownTimeout = 0;
    const parseCountDown = (value) => {
      if (typeof value === "boolean") {
        return 0;
      }
      const numberValue = toInteger(value, 0);
      return numberValue > 0 ? numberValue : 0;
    };
    const clearCountDownInterval = () => {
      if (_countDownTimeout === void 0)
        return;
      clearTimeout(_countDownTimeout);
      _countDownTimeout = void 0;
    };
    const countDown = ref(parseCountDown(props.modelValue));
    const isAlertVisible = computed(() => props.modelValue || props.show);
    onBeforeUnmount(() => {
      var _a;
      clearCountDownInterval();
      (_a = instance.value) == null ? void 0 : _a.dispose();
      instance.value = void 0;
    });
    const parsedModelValue = computed(() => {
      if (props.modelValue === true) {
        return true;
      }
      if (props.modelValue === false)
        return false;
      if (toInteger(props.modelValue, 0) < 1) {
        return false;
      }
      return !!props.modelValue;
    });
    const handleShowAndModelChanged = () => {
      countDown.value = parseCountDown(props.modelValue);
      if ((parsedModelValue.value || props.show) && !instance.value)
        instance.value = new import_alert.default(element.value);
    };
    const dismissClicked = () => {
      if (typeof props.modelValue === "boolean") {
        emit("update:modelValue", false);
      } else {
        emit("update:modelValue", 0);
      }
      emit("dismissed");
    };
    watch(() => props.modelValue, handleShowAndModelChanged);
    watch(() => props.show, handleShowAndModelChanged);
    watch(countDown, (newValue) => {
      clearCountDownInterval();
      if (typeof props.modelValue === "boolean")
        return;
      emit("dismiss-count-down", newValue);
      if (newValue === 0 && props.modelValue > 0)
        emit("dismissed");
      if (props.modelValue !== newValue)
        emit("update:modelValue", newValue);
      if (newValue > 0) {
        _countDownTimeout = setTimeout(() => {
          countDown.value--;
        }, 1e3);
      }
    });
    return {
      dismissClicked,
      isAlertVisible,
      element,
      classes
    };
  }
});
var _hoisted_1$E = ["aria-label"];
function _sfc_render$12(_ctx, _cache, $props, $setup, $data, $options) {
  return _ctx.isAlertVisible ? (openBlock(), createElementBlock("div", {
    key: 0,
    ref: "element",
    class: normalizeClass(["alert", _ctx.classes]),
    role: "alert"
  }, [
    renderSlot(_ctx.$slots, "default"),
    _ctx.dismissible ? (openBlock(), createElementBlock("button", {
      key: 0,
      type: "button",
      class: "btn-close",
      "data-bs-dismiss": "alert",
      "aria-label": _ctx.dismissLabel,
      onClick: _cache[0] || (_cache[0] = (...args) => _ctx.dismissClicked && _ctx.dismissClicked(...args))
    }, null, 8, _hoisted_1$E)) : createCommentVNode("", true)
  ], 2)) : createCommentVNode("", true);
}
var BAlert = _export_sfc(_sfc_main$1m, [["render", _sfc_render$12]]);
var mathMin = Math.min;
var mathMax = Math.max;
var injectionKey$4 = Symbol();
var _sfc_main$1l = defineComponent({
  name: "BAvatarGroup",
  props: {
    overlap: { type: [Number, String], default: 0.3 },
    rounded: { type: [Boolean, String], default: false },
    size: { type: String, required: false },
    square: { type: Boolean, default: false },
    tag: { type: String, default: "div" },
    variant: { type: String, required: false }
  },
  setup(props) {
    const computedSize = computed(() => computeSize(props.size));
    const computeOverlap = (value) => isString(value) && isNumeric(value) ? toFloat(value, 0) : value || 0;
    const overlapScale = computed(() => mathMin(mathMax(computeOverlap(props.overlap), 0), 1) / 2);
    const paddingStyle = computed(() => {
      let { value } = computedSize;
      value = value ? `calc(${value} * ${overlapScale.value})` : null;
      return value ? { paddingLeft: value, paddingRight: value } : {};
    });
    provide(injectionKey$4, {
      overlapScale,
      size: props.size,
      square: props.square,
      rounded: props.rounded,
      variant: props.variant
    });
    return {
      paddingStyle
    };
  }
});
function _sfc_render$11(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.tag), {
    class: "b-avatar-group",
    role: "group"
  }, {
    default: withCtx(() => [
      createBaseVNode("div", {
        class: "b-avatar-group-inner",
        style: normalizeStyle(_ctx.paddingStyle)
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 4)
    ]),
    _: 3
  });
}
var BAvatarGroup = _export_sfc(_sfc_main$1l, [["render", _sfc_render$11]]);
var computeSize = (value) => {
  const calcValue = isString(value) && isNumeric(value) ? toFloat(value, 0) : value;
  return isNumber(calcValue) ? `${calcValue}px` : calcValue || null;
};
var _sfc_main$1k = defineComponent({
  name: "BAvatar",
  props: {
    alt: { type: String, default: "avatar" },
    ariaLabel: { type: String, required: false },
    badge: { type: [Boolean, String], default: false },
    badgeLeft: { type: Boolean, default: false },
    badgeOffset: { type: String, required: false },
    badgeTop: { type: Boolean, default: false },
    badgeVariant: { type: String, default: "primary" },
    button: { type: Boolean, default: false },
    buttonType: { type: String, default: "button" },
    disabled: { type: Boolean, default: false },
    icon: { type: String, required: false },
    rounded: { type: [Boolean, String], default: "circle" },
    size: { type: [String, Number], required: false },
    square: { type: Boolean, default: false },
    src: { type: String, required: false },
    text: { type: String, required: false },
    textVariant: { type: String, default: void 0 },
    variant: { type: String, default: "secondary" }
  },
  emits: ["click", "img-error"],
  setup(props, { emit, slots }) {
    const SIZES = ["sm", null, "lg"];
    const FONT_SIZE_SCALE = 0.4;
    const BADGE_FONT_SIZE_SCALE = FONT_SIZE_SCALE * 0.7;
    const parentData = inject(injectionKey$4, null);
    const computeContrastVariant = (colorVariant) => {
      const variant = colorVariant;
      if (variant === "light")
        return "dark";
      if (variant === "warning")
        return "dark";
      return "light";
    };
    const hasDefaultSlot = computed(() => !isEmptySlot(slots.default));
    const hasBadgeSlot = computed(() => !isEmptySlot(slots.badge));
    const showBadge = computed(() => props.badge || props.badge === "" || hasBadgeSlot.value);
    const computedSize = computed(() => (parentData == null ? void 0 : parentData.size) ? parentData.size : computeSize(props.size));
    const computedVariant = computed(() => (parentData == null ? void 0 : parentData.variant) ? parentData.variant : props.variant);
    const computedRounded = computed(() => (parentData == null ? void 0 : parentData.rounded) ? parentData.rounded : props.rounded);
    const attrs = computed(() => ({
      "aria-label": props.ariaLabel || null,
      "disabled": props.disabled || null
    }));
    const badgeClasses = computed(() => ({
      [`bg-${props.badgeVariant}`]: props.badgeVariant
    }));
    const badgeText = computed(() => props.badge === true ? "" : props.badge);
    const badgeTextClasses = computed(() => {
      const textVariant = computeContrastVariant(props.badgeVariant);
      return `text-${textVariant}`;
    });
    const classes = computed(() => ({
      [`b-avatar-${props.size}`]: props.size && SIZES.indexOf(computeSize(props.size)) !== -1,
      [`bg-${computedVariant.value}`]: computedVariant.value,
      [`badge`]: !props.button && computedVariant.value && hasDefaultSlot.value,
      rounded: computedRounded.value === "" || computedRounded.value === true,
      [`rounded-circle`]: !props.square && computedRounded.value === "circle",
      [`rounded-0`]: props.square || computedRounded.value === "0",
      [`rounded-1`]: !props.square && computedRounded.value === "sm",
      [`rounded-3`]: !props.square && computedRounded.value === "lg",
      [`rounded-top`]: !props.square && computedRounded.value === "top",
      [`rounded-bottom`]: !props.square && computedRounded.value === "bottom",
      [`rounded-start`]: !props.square && computedRounded.value === "left",
      [`rounded-end`]: !props.square && computedRounded.value === "right",
      btn: props.button,
      [`btn-${computedVariant.value}`]: props.button ? computedVariant.value : null
    }));
    const textClasses = computed(() => {
      const textVariant = props.textVariant || computeContrastVariant(computedVariant.value);
      return `text-${textVariant}`;
    });
    const iconName = computed(() => {
      if (props.icon)
        return props.icon;
      if (!props.text && !props.src)
        return "person-fill";
      return void 0;
    });
    const badgeStyle = computed(() => {
      const offset2 = props.badgeOffset || "0px";
      const fontSize = SIZES.indexOf(computedSize.value || null) === -1 ? `calc(${computedSize.value} * ${BADGE_FONT_SIZE_SCALE})` : "";
      return {
        fontSize: fontSize || "",
        top: props.badgeTop ? offset2 : "",
        bottom: props.badgeTop ? "" : offset2,
        left: props.badgeLeft ? offset2 : "",
        right: props.badgeLeft ? "" : offset2
      };
    });
    const fontStyle = computed(() => {
      const fontSize = SIZES.indexOf(computedSize.value || null) === -1 ? `calc(${computedSize.value} * ${FONT_SIZE_SCALE})` : null;
      return fontSize ? { fontSize } : {};
    });
    const marginStyle = computed(() => {
      var _a;
      const overlapScale = ((_a = parentData == null ? void 0 : parentData.overlapScale) == null ? void 0 : _a.value) || 0;
      const value = computedSize.value && overlapScale ? `calc(${computedSize.value} * -${overlapScale})` : null;
      return value ? { marginLeft: value, marginRight: value } : {};
    });
    const tag = computed(() => props.button ? props.buttonType : "span");
    const tagStyle = computed(() => __spreadProps2(__spreadValues2({}, marginStyle.value), {
      width: computedSize.value,
      height: computedSize.value
    }));
    const clicked = function(e) {
      if (!props.disabled && props.button)
        emit("click", e);
    };
    const onImgError = (e) => emit("img-error", e);
    return {
      attrs,
      badgeClasses,
      badgeStyle,
      badgeText,
      badgeTextClasses,
      classes,
      clicked,
      fontStyle,
      hasBadgeSlot,
      hasDefaultSlot,
      iconName,
      onImgError,
      showBadge,
      tag,
      tagStyle,
      textClasses
    };
  }
});
var _hoisted_1$D = {
  key: 0,
  class: "b-avatar-custom"
};
var _hoisted_2$k = {
  key: 1,
  class: "b-avatar-img"
};
var _hoisted_3$8 = ["src", "alt"];
function _sfc_render$10(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.tag), mergeProps({
    class: ["b-avatar", _ctx.classes],
    style: _ctx.tagStyle
  }, _ctx.attrs, { onClick: _ctx.clicked }), {
    default: withCtx(() => [
      _ctx.hasDefaultSlot ? (openBlock(), createElementBlock("span", _hoisted_1$D, [
        renderSlot(_ctx.$slots, "default")
      ])) : _ctx.src ? (openBlock(), createElementBlock("span", _hoisted_2$k, [
        createBaseVNode("img", {
          src: _ctx.src,
          alt: _ctx.alt,
          onError: _cache[0] || (_cache[0] = (...args) => _ctx.onImgError && _ctx.onImgError(...args))
        }, null, 40, _hoisted_3$8)
      ])) : _ctx.text ? (openBlock(), createElementBlock("span", {
        key: 2,
        class: normalizeClass(["b-avatar-text", _ctx.textClasses]),
        style: normalizeStyle(_ctx.fontStyle)
      }, toDisplayString(_ctx.text), 7)) : createCommentVNode("", true),
      _ctx.showBadge ? (openBlock(), createElementBlock("span", {
        key: 3,
        class: normalizeClass(["b-avatar-badge", _ctx.badgeClasses]),
        style: normalizeStyle(_ctx.badgeStyle)
      }, [
        _ctx.hasBadgeSlot ? renderSlot(_ctx.$slots, "badge", { key: 0 }) : (openBlock(), createElementBlock("span", {
          key: 1,
          class: normalizeClass(_ctx.badgeTextClasses)
        }, toDisplayString(_ctx.badgeText), 3))
      ], 6)) : createCommentVNode("", true)
    ]),
    _: 3
  }, 16, ["class", "style", "onClick"]);
}
var BAvatar = _export_sfc(_sfc_main$1k, [["render", _sfc_render$10]]);
var assign = (target, ...args) => Object.assign(target, ...args);
var defineProperties = (obj, props) => Object.defineProperties(obj, props);
var defineProperty = (obj, prop, descriptor) => Object.defineProperty(obj, prop, descriptor);
var omit = (obj, props) => Object.keys(obj).filter((key) => props.indexOf(key) === -1).reduce((result, key) => __spreadProps2(__spreadValues2({}, result), { [key]: obj[key] }), {});
var readonlyDescriptor = () => ({ enumerable: true, configurable: false, writable: false });
var BLINK_PROPS = {
  active: { type: Boolean, default: false },
  activeClass: { type: String, default: "router-link-active" },
  append: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  event: { type: [String, Array], default: "click" },
  exact: { type: Boolean, default: false },
  exactActiveClass: { type: String, default: "router-link-exact-active" },
  href: { type: String },
  rel: { type: String, default: null },
  replace: { type: Boolean, default: false },
  routerComponentName: { type: String, default: "router-link" },
  routerTag: { type: String, default: "a" },
  target: { type: String, default: "_self" },
  to: { type: [String, Object], default: null }
};
var _sfc_main$1j = defineComponent({
  name: "BLink",
  props: BLINK_PROPS,
  emits: ["click"],
  setup(props, { emit, attrs }) {
    const instance = getCurrentInstance();
    const link = ref(null);
    const tag = computed(() => {
      const routerName = props.routerComponentName.split("-").map((e) => e.charAt(0).toUpperCase() + e.slice(1)).join("");
      const hasRouter = (instance == null ? void 0 : instance.appContext.app.component(routerName)) !== void 0;
      if (!hasRouter || props.disabled || !props.to) {
        return "a";
      }
      return props.routerComponentName;
    });
    const computedHref = computed(() => {
      const toFallback = "#";
      if (props.href)
        return props.href;
      if (typeof props.to === "string")
        return props.to || toFallback;
      const to = props.to;
      if (Object.prototype.toString.call(to) === "[object Object]" && (to.path || to.query || to.hash)) {
        const path = to.path || "";
        const query = to.query ? `?${Object.keys(to.query).map((e) => `${e}=${to.query[e]}`).join("=")}` : "";
        const hash3 = !to.hash || to.hash.charAt(0) === "#" ? to.hash || "" : `#${to.hash}`;
        return `${path}${query}${hash3}` || toFallback;
      }
      return toFallback;
    });
    const clicked = function(e) {
      if (props.disabled) {
        e.preventDefault();
        e.stopImmediatePropagation();
        return;
      }
      emit("click", e);
    };
    const routerAttr = computed(() => ({
      "to": props.to,
      "href": computedHref.value,
      "target": props.target,
      "rel": props.target === "_blank" && props.rel === null ? "noopener" : props.rel || null,
      "tabindex": props.disabled ? "-1" : typeof attrs.tabindex === "undefined" ? null : attrs.tabindex,
      "aria-disabled": props.disabled ? "true" : null
    }));
    return {
      tag,
      routerAttr,
      link,
      clicked
    };
  }
});
function _sfc_render$$(_ctx, _cache, $props, $setup, $data, $options) {
  return _ctx.tag === "router-link" ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.tag), mergeProps({ key: 0 }, _ctx.routerAttr, { custom: "" }), {
    default: withCtx(({ href, navigate, isActive, isExactActive }) => [
      (openBlock(), createBlock(resolveDynamicComponent(_ctx.routerTag), mergeProps({
        ref: "link",
        href,
        class: [isActive && _ctx.activeClass, isExactActive && _ctx.exactActiveClass]
      }, _ctx.$attrs, { onClick: navigate }), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 2
      }, 1040, ["href", "class", "onClick"]))
    ]),
    _: 3
  }, 16)) : (openBlock(), createBlock(resolveDynamicComponent(_ctx.tag), mergeProps({
    key: 1,
    ref: "link",
    class: { active: _ctx.active, disabled: _ctx.disabled }
  }, _ctx.routerAttr, { onClick: _ctx.clicked }), {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 16, ["class", "onClick"]));
}
var BLink = _export_sfc(_sfc_main$1j, [["render", _sfc_render$$]]);
var isLink = (props) => !!(props.href || props.to);
var suffixPropName = (suffix, value) => value + (suffix ? upperFirst(suffix) : "");
var pluckProps = (keysToPluck, objToPluck, transformFn = (x) => x) => (isArray(keysToPluck) ? keysToPluck.slice() : Object.keys(keysToPluck)).reduce((memo, prop) => {
  memo[transformFn(prop)] = objToPluck[prop];
  return memo;
}, {});
var linkProps = omit(BLINK_PROPS, ["event", "routerTag"]);
var _sfc_main$1i = defineComponent({
  name: "BBadge",
  props: __spreadValues2({
    pill: { type: Boolean, default: false },
    tag: { type: String, default: "span" },
    variant: { type: String, default: "secondary" },
    textIndicator: { type: Boolean, default: false },
    dotIndicator: { type: Boolean, default: false }
  }, linkProps),
  setup(props) {
    const link = computed(() => isLink(props));
    const computedTag = computed(() => link.value ? "b-link" : props.tag);
    const classes = computed(() => ({
      [`bg-${props.variant}`]: props.variant,
      "active": props.active,
      "disabled": props.disabled,
      "text-dark": ["warning", "info", "light"].includes(props.variant),
      "rounded-pill": props.pill,
      "position-absolute top-0 start-100 translate-middle": props.textIndicator || props.dotIndicator,
      "p-2 border border-light rounded-circle": props.dotIndicator,
      "text-decoration-none": link
    }));
    return {
      classes,
      props: link.value ? pluckProps(linkProps, props) : {},
      computedTag
    };
  }
});
function _sfc_render$_(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.computedTag), mergeProps({
    class: ["badge", _ctx.classes]
  }, _ctx.props), {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 16, ["class"]);
}
var BBadge = _export_sfc(_sfc_main$1i, [["render", _sfc_render$_]]);
var BREADCRUMB_SYMBOL = Symbol();
var BREADCRUMB_OBJECT = {
  items: reactive([]),
  reset() {
    this.items = reactive([]);
  }
};
function createBreadcrumb(app) {
  app.provide(BREADCRUMB_SYMBOL, BREADCRUMB_OBJECT);
}
function useBreadcrumb() {
  const context = inject(BREADCRUMB_SYMBOL);
  if (!context) {
    return BREADCRUMB_OBJECT;
  }
  return context;
}
var _sfc_main$1h = defineComponent({
  name: "BBreadcrumbItem",
  props: __spreadProps2(__spreadValues2({}, omit(BLINK_PROPS, ["event", "routerTag"])), {
    active: { type: Boolean, default: false },
    ariaCurrent: { type: String, default: "location" },
    disabled: { type: Boolean, default: false },
    text: { type: String, required: false }
  }),
  emits: ["click"],
  setup(props, { emit }) {
    const liClasses = computed(() => ({
      active: props.active
    }));
    const computedTag = computed(() => props.active ? "span" : "b-link");
    const computedAriaCurrent = computed(() => ({
      "aria-current": props.active ? props.ariaCurrent : void 0
    }));
    const clicked = function(e) {
      if (props.disabled || props.active) {
        e.preventDefault();
        e.stopImmediatePropagation();
        return;
      }
      if (!props.disabled)
        emit("click", e);
    };
    return {
      liClasses,
      computedTag,
      computedAriaCurrent,
      clicked
    };
  }
});
function _sfc_render$Z(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("li", {
    class: normalizeClass(["breadcrumb-item", _ctx.liClasses])
  }, [
    (openBlock(), createBlock(resolveDynamicComponent(_ctx.computedTag), mergeProps({ "aria-current": _ctx.computedAriaCurrent }, _ctx.$props, { onClick: _ctx.clicked }), {
      default: withCtx(() => [
        renderSlot(_ctx.$slots, "default")
      ]),
      _: 3
    }, 16, ["aria-current", "onClick"]))
  ], 2);
}
var BBreadcrumbItem = _export_sfc(_sfc_main$1h, [["render", _sfc_render$Z]]);
var _sfc_main$1g = defineComponent({
  name: "BBreadcrumb",
  components: {
    BBreadcrumbItem
  },
  props: {
    items: { type: Array }
  },
  setup(props) {
    const breadcrumb = useBreadcrumb();
    const computedItems = computed(() => {
      const localItems = props.items || (breadcrumb == null ? void 0 : breadcrumb.items) || [];
      let activeDefined = false;
      const items = localItems.map((item, idx) => {
        if (typeof item === "string") {
          item = { text: item };
          if (idx < localItems.length - 1)
            item.href = "#";
        }
        if (item.active)
          activeDefined = true;
        if (!item.active && !activeDefined) {
          item.active = idx + 1 === localItems.length;
        }
        return item;
      });
      return items;
    });
    return {
      computedItems
    };
  }
});
var _hoisted_1$C = { "aria-label": "breadcrumb" };
var _hoisted_2$j = { class: "breadcrumb" };
function _sfc_render$Y(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_breadcrumb_item = resolveComponent("b-breadcrumb-item");
  return openBlock(), createElementBlock("nav", _hoisted_1$C, [
    createBaseVNode("ol", _hoisted_2$j, [
      renderSlot(_ctx.$slots, "prepend"),
      (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.computedItems, (item, i) => {
        return openBlock(), createBlock(_component_b_breadcrumb_item, mergeProps({ key: i }, item), {
          default: withCtx(() => [
            createTextVNode(toDisplayString(item.text), 1)
          ]),
          _: 2
        }, 1040);
      }), 128)),
      renderSlot(_ctx.$slots, "default"),
      renderSlot(_ctx.$slots, "append")
    ])
  ]);
}
var BBreadcrumb = _export_sfc(_sfc_main$1g, [["render", _sfc_render$Y]]);
var _sfc_main$1f = defineComponent({
  name: "BButton",
  props: __spreadProps2(__spreadValues2({}, BLINK_PROPS), {
    active: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    href: { type: String, required: false },
    pill: { type: Boolean, default: false },
    pressed: { type: Boolean, default: null },
    rel: { type: String, default: null },
    size: { type: String },
    squared: { type: Boolean, default: false },
    tag: { type: String, default: "button" },
    target: { type: String, default: "_self" },
    type: { type: String, default: "button" },
    variant: { type: String, default: "secondary" }
  }),
  emits: ["click", "update:pressed"],
  setup(props, { emit }) {
    const isToggle = props.pressed !== null;
    const isButton = props.tag === "button" && !props.href && !props.to;
    const isLink2 = !!(props.href || props.to);
    const isBLink = !!props.to;
    const nonStandardTag = props.href ? false : !isButton;
    const classes = computed(() => ({
      [`btn-${props.variant}`]: props.variant,
      [`btn-${props.size}`]: props.size,
      "active": props.active || props.pressed,
      "rounded-pill": props.pill,
      "rounded-0": props.squared,
      "disabled": props.disabled
    }));
    const attrs = computed(() => ({
      "aria-disabled": nonStandardTag ? String(props.disabled) : null,
      "aria-pressed": isToggle ? String(props.pressed) : null,
      "autocomplete": isToggle ? "off" : null,
      "disabled": isButton ? props.disabled : null,
      "href": props.href,
      "rel": isLink2 ? props.rel : null,
      "role": nonStandardTag || isLink2 ? "button" : null,
      "target": isLink2 ? props.target : null,
      "type": isButton ? props.type : null,
      "to": !isButton ? props.to : null,
      "append": isLink2 ? props.append : null,
      "activeClass": isBLink ? props.activeClass : null,
      "event": isBLink ? props.event : null,
      "exact": isBLink ? props.exact : null,
      "exactActiveClass": isBLink ? props.exactActiveClass : null,
      "replace": isBLink ? props.replace : null,
      "routerComponentName": isBLink ? props.routerComponentName : null,
      "routerTag": isBLink ? props.routerTag : null
    }));
    const clicked = function(e) {
      if (props.disabled) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      emit("click", e);
      if (isToggle) {
        emit("update:pressed", !props.pressed);
      }
    };
    const computedTag = computed(() => {
      if (isBLink)
        return "b-link";
      return props.href ? "a" : props.tag;
    });
    return {
      classes,
      attrs,
      computedTag,
      clicked
    };
  }
});
function _sfc_render$X(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.computedTag), mergeProps({
    class: ["btn", _ctx.classes]
  }, _ctx.attrs, { onClick: _ctx.clicked }), {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 16, ["class", "onClick"]);
}
var BButton = _export_sfc(_sfc_main$1f, [["render", _sfc_render$X]]);
var _sfc_main$1e = defineComponent({
  name: "BButtonGroup",
  props: {
    ariaRole: { type: String, default: "group" },
    size: { type: String, required: false },
    tag: { type: String, default: "div" },
    vertical: { type: Boolean, default: false }
  },
  setup(props) {
    const classes = computed(() => ({
      "btn-group": !props.vertical,
      "btn-group-vertical": props.vertical,
      [`btn-group-${props.size}`]: props.size
    }));
    return {
      classes
    };
  }
});
function _sfc_render$W(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.tag), {
    class: normalizeClass(_ctx.classes),
    role: "group",
    "aria-role": _ctx.ariaRole
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 8, ["class", "aria-role"]);
}
var BButtonGroup = _export_sfc(_sfc_main$1e, [["render", _sfc_render$W]]);
var _sfc_main$1d = defineComponent({
  name: "BButtonToolbar",
  props: {
    ariaRole: { type: String, default: "group" },
    justify: { type: Boolean, default: false }
  },
  setup(props) {
    const classes = computed(() => ({
      "justify-content-between": props.justify
    }));
    return {
      classes
    };
  }
});
var _hoisted_1$B = ["aria-label"];
function _sfc_render$V(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass([_ctx.classes, "btn-toolbar"]),
    role: "toolbar",
    "aria-label": _ctx.ariaRole
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 10, _hoisted_1$B);
}
var BButtonToolbar = _export_sfc(_sfc_main$1d, [["render", _sfc_render$V]]);
var _sfc_main$1c = defineComponent({
  name: "BCard",
  props: {
    align: { type: String, required: false },
    bgVariant: { type: String, required: false },
    bodyBgVariant: { type: String, required: false },
    bodyClass: { type: [Array, Object, String], required: false },
    bodyTag: { type: String, default: "div" },
    bodyTextVariant: { type: String, required: false },
    borderVariant: { type: String, required: false },
    footer: { type: String, required: false },
    footerBgVariant: { type: String, required: false },
    footerBorderVariant: { type: String, required: false },
    footerClass: { type: [Array, Object, String], required: false },
    footerHtml: { type: String, default: "" },
    footerTag: { type: String, default: "div" },
    footerTextVariant: { type: String, required: false },
    header: { type: String, required: false },
    headerBgVariant: { type: String, required: false },
    headerBorderVariant: { type: String, required: false },
    headerClass: { type: [Array, Object, String], required: false },
    headerHtml: { type: String, default: "" },
    headerTag: { type: String, default: "div" },
    headerTextVariant: { type: String, required: false },
    imgAlt: { type: String, required: false },
    imgBottom: { type: Boolean, default: false },
    imgEnd: { type: Boolean, default: false },
    imgHeight: { type: [String, Number], required: false },
    imgLeft: { type: Boolean, default: false },
    imgRight: { type: Boolean, default: false },
    imgSrc: { type: String, required: false },
    imgStart: { type: Boolean, default: false },
    imgTop: { type: Boolean, default: false },
    imgWidth: { type: [String, Number], required: false },
    noBody: { type: Boolean, default: false },
    overlay: { type: Boolean, default: false },
    subTitle: { type: String, required: false },
    subTitleTag: { type: String, default: "h6" },
    subTitleTextVariant: { type: String, default: "muted" },
    tag: { type: String, default: "div" },
    textVariant: { type: String, required: false },
    title: { type: String, required: false },
    titleTag: { type: String, default: "h4" }
  },
  setup(props) {
    const classes = computed(() => ({
      [`text-${props.align}`]: props.align,
      [`text-${props.textVariant}`]: props.textVariant,
      [`bg-${props.bgVariant}`]: props.bgVariant,
      [`border-${props.borderVariant}`]: props.borderVariant,
      "flex-row": props.imgLeft || props.imgStart,
      "flex-row-reverse": props.imgEnd || props.imgRight
    }));
    const bodyClasses = computed(() => ({
      "card-body": !props.noBody,
      "card-img-overlay": props.overlay,
      [`bg-${props.bodyBgVariant}`]: props.bodyBgVariant,
      [`text-${props.bodyTextVariant}`]: props.bodyTextVariant
    }));
    const footerClasses = computed(() => ({
      [`bg-${props.footerBgVariant}`]: props.footerBgVariant,
      [`border-${props.footerBorderVariant}`]: props.footerBorderVariant,
      [`text-${props.footerTextVariant}`]: props.footerTextVariant
    }));
    const headerClasses = computed(() => ({
      [`bg-${props.headerBgVariant}`]: props.headerBgVariant,
      [`border-${props.headerBorderVariant}`]: props.headerBorderVariant,
      [`text-${props.headerTextVariant}`]: props.headerTextVariant
    }));
    const imgClasses = computed(() => ({
      "card-img": !props.imgEnd && !props.imgRight && !props.imgStart && !props.imgLeft && !props.imgTop && !props.imgTop,
      "card-img-right": props.imgEnd || props.imgRight,
      "card-img-left": props.imgStart || props.imgLeft,
      "card-img-top": props.imgTop,
      "card-img-bottom": props.imgBottom
    }));
    const imgAttr = computed(() => ({
      src: props.imgSrc,
      alt: props.imgAlt,
      height: props.imgHeight,
      width: props.imgWidth
    }));
    const subTitleClasses = computed(() => ({
      [`text-${props.subTitleTextVariant}`]: props.subTitleTextVariant
    }));
    return {
      classes,
      bodyClasses,
      footerClasses,
      headerClasses,
      imgClasses,
      imgAttr,
      subTitleClasses
    };
  }
});
var _hoisted_1$A = ["innerHTML"];
var _hoisted_2$i = ["innerHTML"];
function _sfc_render$U(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.tag), {
    class: normalizeClass(["card", _ctx.classes])
  }, {
    default: withCtx(() => [
      _ctx.imgSrc && !_ctx.imgBottom ? (openBlock(), createElementBlock("img", mergeProps({ key: 0 }, _ctx.imgAttr, { class: _ctx.imgClasses }), null, 16)) : createCommentVNode("", true),
      _ctx.header || _ctx.$slots.header || _ctx.headerHtml ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.headerTag), {
        key: 1,
        class: normalizeClass(["card-header", [_ctx.headerClass, _ctx.headerClasses]])
      }, {
        default: withCtx(() => [
          !!_ctx.headerHtml ? (openBlock(), createElementBlock("div", {
            key: 0,
            innerHTML: _ctx.headerHtml
          }, null, 8, _hoisted_1$A)) : renderSlot(_ctx.$slots, "header", { key: 1 }, () => [
            createTextVNode(toDisplayString(_ctx.header), 1)
          ])
        ]),
        _: 3
      }, 8, ["class"])) : createCommentVNode("", true),
      !_ctx.noBody ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.bodyTag), {
        key: 2,
        class: normalizeClass([_ctx.bodyClass, _ctx.bodyClasses])
      }, {
        default: withCtx(() => [
          _ctx.title && !_ctx.noBody ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.titleTag), {
            key: 0,
            class: "card-title"
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(_ctx.title), 1)
            ]),
            _: 1
          })) : createCommentVNode("", true),
          _ctx.subTitle && !_ctx.noBody ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.subTitleTag), {
            key: 1,
            class: normalizeClass(["card-subtitle mb-2", _ctx.subTitleClasses])
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(_ctx.subTitle), 1)
            ]),
            _: 1
          }, 8, ["class"])) : createCommentVNode("", true),
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["class"])) : createCommentVNode("", true),
      _ctx.noBody ? renderSlot(_ctx.$slots, "default", { key: 3 }) : createCommentVNode("", true),
      _ctx.footer || _ctx.$slots.footer || _ctx.footerHtml ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.footerTag), {
        key: 4,
        class: normalizeClass(["card-footer", [_ctx.footerClass, _ctx.footerClasses]])
      }, {
        default: withCtx(() => [
          !!_ctx.footerHtml ? (openBlock(), createElementBlock("div", {
            key: 0,
            innerHTML: _ctx.footerHtml
          }, null, 8, _hoisted_2$i)) : renderSlot(_ctx.$slots, "footer", { key: 1 }, () => [
            createTextVNode(toDisplayString(_ctx.footer), 1)
          ])
        ]),
        _: 3
      }, 8, ["class"])) : createCommentVNode("", true),
      _ctx.imgSrc && _ctx.imgBottom ? (openBlock(), createElementBlock("img", mergeProps({ key: 5 }, _ctx.imgAttr, { class: _ctx.imgClasses }), null, 16)) : createCommentVNode("", true)
    ]),
    _: 3
  }, 8, ["class"]);
}
var BCard = _export_sfc(_sfc_main$1c, [["render", _sfc_render$U]]);
var _sfc_main$1b = defineComponent({
  name: "BCardBody",
  props: {
    bodyBgVariant: { type: String, required: false },
    bodyClass: { type: [Array, Object, String], required: false },
    bodyTag: { type: String, default: "div" },
    bodyTextVariant: { type: String, required: false },
    overlay: { type: Boolean, default: false },
    subTitle: { type: String, required: false },
    subTitleTag: { type: String, default: "h4" },
    subTitleTextVariant: { type: String, required: false },
    title: { type: String, required: false },
    titleTag: { type: String, default: "h4" }
  },
  setup(props) {
    const classes = computed(() => ({
      [`text-${props.bodyTextVariant}`]: props.bodyTextVariant,
      [`bg-${props.bodyBgVariant}`]: props.bodyBgVariant
    }));
    return {
      classes
    };
  }
});
function _sfc_render$T(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_card_title = resolveComponent("b-card-title");
  const _component_b_card_sub_title = resolveComponent("b-card-sub-title");
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.bodyTag), {
    class: normalizeClass(["card-body", _ctx.classes])
  }, {
    default: withCtx(() => [
      _ctx.title ? (openBlock(), createBlock(_component_b_card_title, {
        key: 0,
        "title-tag": _ctx.titleTag,
        title: _ctx.title
      }, null, 8, ["title-tag", "title"])) : createCommentVNode("", true),
      _ctx.subTitle ? (openBlock(), createBlock(_component_b_card_sub_title, {
        key: 1,
        "sub-title-tag": _ctx.subTitleTag,
        "sub-title": _ctx.subTitle,
        "sub-title-text-variant": _ctx.subTitleTextVariant
      }, null, 8, ["sub-title-tag", "sub-title", "sub-title-text-variant"])) : createCommentVNode("", true),
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 8, ["class"]);
}
var BCardBody = _export_sfc(_sfc_main$1b, [["render", _sfc_render$T]]);
var _sfc_main$1a = defineComponent({
  name: "BCardFooter",
  props: {
    footer: { type: String },
    footerBgVariant: { type: String, required: false },
    footerBorderVariant: { type: String, required: false },
    footerClass: { type: [Array, Object, String], required: false },
    footerHtml: { type: String, required: false },
    footerTag: { type: String, default: "div" },
    footerTextVariant: { type: String, required: false }
  },
  setup(props) {
    const classes = computed(() => ({
      [`text-${props.footerTextVariant}`]: props.footerTextVariant,
      [`bg-${props.footerBgVariant}`]: props.footerBgVariant,
      [`border-${props.footerBorderVariant}`]: props.footerBorderVariant
    }));
    return {
      classes
    };
  }
});
var _hoisted_1$z = ["innerHTML"];
function _sfc_render$S(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.footerTag), {
    class: normalizeClass(["card-footer", [_ctx.footerClass, _ctx.classes]])
  }, {
    default: withCtx(() => [
      !!_ctx.footerHtml ? (openBlock(), createElementBlock("div", {
        key: 0,
        innerHTML: _ctx.footerHtml
      }, null, 8, _hoisted_1$z)) : renderSlot(_ctx.$slots, "default", { key: 1 }, () => [
        createTextVNode(toDisplayString(_ctx.footer), 1)
      ])
    ]),
    _: 3
  }, 8, ["class"]);
}
var BCardFooter = _export_sfc(_sfc_main$1a, [["render", _sfc_render$S]]);
var _sfc_main$19 = defineComponent({
  name: "BCardGroup",
  props: {
    columns: { type: Boolean, default: false },
    deck: { type: Boolean, default: false },
    tag: { type: String, default: "div" }
  },
  setup(props) {
    const classes = computed(() => props.deck ? "card-deck" : props.columns ? "card-columns" : "card-group");
    return {
      classes
    };
  }
});
function _sfc_render$R(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.tag), {
    class: normalizeClass(_ctx.classes)
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 8, ["class"]);
}
var BCardGroup = _export_sfc(_sfc_main$19, [["render", _sfc_render$R]]);
var _sfc_main$18 = defineComponent({
  name: "BCardHeader",
  props: {
    header: { type: String, required: false },
    headerBgVariant: { type: String, required: false },
    headerBorderVariant: { type: String, required: false },
    headerClass: { type: [Array, Object, String], required: false },
    headerHtml: { type: String, required: false },
    headerTag: { type: String, default: "div" },
    headerTextVariant: { type: String, required: false }
  },
  setup(props) {
    const classes = computed(() => ({
      [`text-${props.headerTextVariant}`]: props.headerTextVariant,
      [`bg-${props.headerBgVariant}`]: props.headerBgVariant,
      [`border-${props.headerBorderVariant}`]: props.headerBorderVariant
    }));
    return {
      classes
    };
  }
});
var _hoisted_1$y = ["innerHTML"];
function _sfc_render$Q(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.headerTag), {
    class: normalizeClass(["card-header", [_ctx.headerClass, _ctx.classes]])
  }, {
    default: withCtx(() => [
      !!_ctx.headerHtml ? (openBlock(), createElementBlock("div", {
        key: 0,
        innerHTML: _ctx.headerHtml
      }, null, 8, _hoisted_1$y)) : renderSlot(_ctx.$slots, "default", { key: 1 }, () => [
        createTextVNode(toDisplayString(_ctx.header), 1)
      ])
    ]),
    _: 3
  }, 8, ["class"]);
}
var BCardHeader = _export_sfc(_sfc_main$18, [["render", _sfc_render$Q]]);
var _sfc_main$17 = defineComponent({
  name: "BCardImage",
  props: {
    alt: { type: String, default: null },
    bottom: { type: Boolean, default: false },
    end: { type: Boolean, default: false },
    height: { type: [Number, String], required: false },
    left: { type: Boolean, default: false },
    right: { type: Boolean, default: false },
    src: { type: String, required: false },
    start: { type: Boolean, default: false },
    top: { type: Boolean, default: false },
    width: { type: [Number, String], required: false }
  },
  setup(props) {
    const attrs = computed(() => ({
      src: props.src,
      alt: props.alt,
      width: (typeof props.width === "number" ? props.width : parseInt(props.width, 10)) || void 0,
      height: (typeof props.height === "number" ? props.height : parseInt(props.height, 10)) || void 0
    }));
    const classes = computed(() => {
      const align = props.left ? "float-left" : props.right ? "float-right" : "";
      let baseClass = "card-img";
      if (props.top) {
        baseClass += "-top";
      } else if (props.right || props.end) {
        baseClass += "-right";
      } else if (props.bottom) {
        baseClass += "-bottom";
      } else if (props.left || props.start) {
        baseClass += "-left";
      }
      return {
        [align]: !!align,
        [baseClass]: true
      };
    });
    return {
      attrs,
      classes
    };
  }
});
function _sfc_render$P(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("img", mergeProps({ class: _ctx.classes }, _ctx.attrs), null, 16);
}
var BCardImg = _export_sfc(_sfc_main$17, [["render", _sfc_render$P]]);
var _sfc_main$16 = defineComponent({
  name: "BCardSubTitle",
  props: {
    subTitle: { type: String },
    subTitleTag: { type: String, default: "h6" },
    subTitleTextVariant: { type: String, default: "muted" }
  },
  setup(props) {
    const classes = computed(() => ({
      [`text-${props.subTitleTextVariant}`]: props.subTitleTextVariant
    }));
    return {
      classes
    };
  }
});
function _sfc_render$O(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.subTitleTag), {
    class: normalizeClass(["card-subtitle mb-2", _ctx.classes])
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default", {}, () => [
        createTextVNode(toDisplayString(_ctx.subTitle), 1)
      ])
    ]),
    _: 3
  }, 8, ["class"]);
}
var BCardSubTitle = _export_sfc(_sfc_main$16, [["render", _sfc_render$O]]);
var _sfc_main$15 = defineComponent({
  name: "BCardText"
});
var _hoisted_1$x = { class: "card-text" };
function _sfc_render$N(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("p", _hoisted_1$x, [
    renderSlot(_ctx.$slots, "default")
  ]);
}
var BCardText = _export_sfc(_sfc_main$15, [["render", _sfc_render$N]]);
var _sfc_main$14 = defineComponent({
  name: "BCardTitle",
  props: {
    title: { type: String },
    titleTag: { type: String, default: "h4" }
  }
});
function _sfc_render$M(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.titleTag), { class: "card-title" }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default", {}, () => [
        createTextVNode(toDisplayString(_ctx.title), 1)
      ])
    ]),
    _: 3
  });
}
var BCardTitle = _export_sfc(_sfc_main$14, [["render", _sfc_render$M]]);
var injectionKey$3 = Symbol();
var _sfc_main$13 = defineComponent({
  name: "BCarousel",
  props: {
    background: { type: String, required: false },
    modelValue: { type: Number, default: 0 },
    controls: { type: Boolean, default: false },
    id: { type: String },
    imgHeight: { type: String },
    imgWidth: { type: String },
    indicators: { type: Boolean, default: false },
    interval: { type: Number, default: 5e3 },
    noTouch: { type: Boolean, default: false },
    noWrap: { type: Boolean, default: false }
  },
  emits: ["sliding-start", "sliding-end"],
  setup(props, { slots, emit }) {
    const element = ref();
    const instance = ref();
    const computedId = useId(props.id, "accordion");
    const slides = ref([]);
    useEventListener(element, "slide.bs.carousel", (payload) => emit("sliding-start", payload));
    useEventListener(element, "slid.bs.carousel", (payload) => emit("sliding-end", payload));
    onMounted(() => {
      instance.value = new import_carousel.default(element.value, {
        wrap: !props.noTouch,
        interval: props.interval,
        touch: !props.noTouch
      });
      if (slots.default) {
        slides.value = slots.default().filter((child) => {
          var _a;
          return ((_a = child.type) == null ? void 0 : _a.name) === "BCarouselSlide";
        });
      }
    });
    provide(injectionKey$3, {
      background: props.background,
      width: props.imgWidth,
      height: props.imgHeight
    });
    return {
      element,
      computedId,
      slides
    };
  }
});
var _hoisted_1$w = ["id"];
var _hoisted_2$h = {
  key: 0,
  class: "carousel-indicators"
};
var _hoisted_3$7 = ["data-bs-target", "data-bs-slide-to", "aria-label"];
var _hoisted_4$4 = { class: "carousel-inner" };
var _hoisted_5$4 = ["data-bs-target"];
var _hoisted_6$2 = createBaseVNode("span", {
  class: "carousel-control-prev-icon",
  "aria-hidden": "true"
}, null, -1);
var _hoisted_7$1 = createBaseVNode("span", { class: "visually-hidden" }, "Previous", -1);
var _hoisted_8$1 = [
  _hoisted_6$2,
  _hoisted_7$1
];
var _hoisted_9$1 = ["data-bs-target"];
var _hoisted_10$1 = createBaseVNode("span", {
  class: "carousel-control-next-icon",
  "aria-hidden": "true"
}, null, -1);
var _hoisted_11$1 = createBaseVNode("span", { class: "visually-hidden" }, "Next", -1);
var _hoisted_12$1 = [
  _hoisted_10$1,
  _hoisted_11$1
];
function _sfc_render$L(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    id: _ctx.computedId,
    ref: "element",
    class: "carousel slide",
    "data-bs-ride": "carousel"
  }, [
    _ctx.indicators ? (openBlock(), createElementBlock("div", _hoisted_2$h, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.slides, (slide, i) => {
        return openBlock(), createElementBlock("button", {
          key: i,
          type: "button",
          "data-bs-target": `#${_ctx.computedId}`,
          "data-bs-slide-to": i,
          class: normalizeClass(i === 0 ? "active" : ""),
          "aria-current": "true",
          "aria-label": `Slide ${i}`
        }, null, 10, _hoisted_3$7);
      }), 128))
    ])) : createCommentVNode("", true),
    createBaseVNode("div", _hoisted_4$4, [
      renderSlot(_ctx.$slots, "default")
    ]),
    _ctx.controls ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
      createBaseVNode("button", {
        class: "carousel-control-prev",
        type: "button",
        "data-bs-target": `#${_ctx.computedId}`,
        "data-bs-slide": "prev"
      }, _hoisted_8$1, 8, _hoisted_5$4),
      createBaseVNode("button", {
        class: "carousel-control-next",
        type: "button",
        "data-bs-target": `#${_ctx.computedId}`,
        "data-bs-slide": "next"
      }, _hoisted_12$1, 8, _hoisted_9$1)
    ], 64)) : createCommentVNode("", true)
  ], 8, _hoisted_1$w);
}
var BCarousel = _export_sfc(_sfc_main$13, [["render", _sfc_render$L]]);
var _sfc_main$12 = defineComponent({
  name: "BCarouselSlide",
  props: {
    active: { type: Boolean, default: false },
    background: { type: String, required: false },
    caption: { type: String, required: false },
    captionHtml: { type: String, required: false },
    captionTag: { type: String, default: "h3" },
    contentTag: { type: String, default: "div" },
    contentVisibleUp: { type: String, required: false },
    id: { type: String, required: false },
    imgAlt: { type: String, required: false },
    imgBlank: { type: Boolean, default: false },
    imgBlankColor: { type: String, default: "transparent" },
    imgHeight: { type: String },
    imgSrc: { type: String },
    imgWidth: { type: String },
    interval: { type: [String, Number] },
    text: { type: String, required: false },
    textHtml: { type: String, required: false },
    textTag: { type: String, default: "p" }
  },
  setup(props) {
    const parentData = inject(injectionKey$3, {});
    const computedId = useId(props.id, "accordion");
    const img = computed(() => props.imgBlank ? props.imgBlank : props.imgSrc);
    const computedAttr = computed(() => ({
      background: `${props.background || parentData.background || "rgb(171, 171, 171)"} none repeat scroll 0% 0%`
    }));
    const computedContentClasses = computed(() => ({
      "d-none": props.contentVisibleUp,
      [`d-${props.contentVisibleUp}-block`]: props.contentVisibleUp
    }));
    const showText = computed(() => props.text && !props.textHtml);
    const showTextAsHtml = computed(() => props.textHtml);
    const showCaption = computed(() => props.caption && !props.captionHtml);
    const showCaptionAsHtml = computed(() => props.captionHtml);
    return {
      computedAttr,
      computedContentClasses,
      computedId,
      height: parentData.height,
      img,
      showCaption,
      showCaptionAsHtml,
      showText,
      showTextAsHtml,
      width: parentData.width
    };
  }
});
var _hoisted_1$v = ["id", "data-bs-interval"];
var _hoisted_2$g = { key: 0 };
var _hoisted_3$6 = ["innerHTML"];
var _hoisted_4$3 = { key: 0 };
var _hoisted_5$3 = ["innerHTML"];
function _sfc_render$K(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_img = resolveComponent("b-img");
  return openBlock(), createElementBlock("div", {
    id: _ctx.computedId,
    class: normalizeClass(["carousel-item", { active: _ctx.active }]),
    "data-bs-interval": _ctx.interval,
    style: normalizeStyle(_ctx.computedAttr)
  }, [
    renderSlot(_ctx.$slots, "img", {}, () => [
      createVNode(_component_b_img, {
        class: "d-block w-100",
        alt: _ctx.imgAlt,
        src: _ctx.imgSrc,
        width: _ctx.imgWidth || _ctx.width,
        height: _ctx.imgHeight || _ctx.height,
        blank: _ctx.imgBlank,
        "blank-color": _ctx.imgBlankColor
      }, null, 8, ["alt", "src", "width", "height", "blank", "blank-color"])
    ]),
    _ctx.caption || _ctx.captionHtml || _ctx.text || _ctx.textHtml || _ctx.$slots.default ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.contentTag), {
      key: 0,
      class: normalizeClass(["carousel-caption", _ctx.computedContentClasses])
    }, {
      default: withCtx(() => [
        _ctx.caption || _ctx.captionHtml ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.captionTag), { key: 0 }, {
          default: withCtx(() => [
            _ctx.showCaption ? (openBlock(), createElementBlock("span", _hoisted_2$g, toDisplayString(_ctx.caption), 1)) : createCommentVNode("", true),
            _ctx.showCaptionAsHtml ? (openBlock(), createElementBlock("span", {
              key: 1,
              innerHTML: _ctx.captionHtml
            }, null, 8, _hoisted_3$6)) : createCommentVNode("", true)
          ]),
          _: 1
        })) : createCommentVNode("", true),
        _ctx.text || _ctx.textHtml ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.textTag), { key: 1 }, {
          default: withCtx(() => [
            _ctx.showText ? (openBlock(), createElementBlock("span", _hoisted_4$3, toDisplayString(_ctx.text), 1)) : createCommentVNode("", true),
            _ctx.showTextAsHtml ? (openBlock(), createElementBlock("span", {
              key: 1,
              innerHTML: _ctx.textHtml
            }, null, 8, _hoisted_5$3)) : createCommentVNode("", true)
          ]),
          _: 1
        })) : createCommentVNode("", true),
        renderSlot(_ctx.$slots, "default")
      ]),
      _: 3
    }, 8, ["class"])) : createCommentVNode("", true)
  ], 14, _hoisted_1$v);
}
var BCarouselSlide = _export_sfc(_sfc_main$12, [["render", _sfc_render$K]]);
var _sfc_main$11 = defineComponent({
  name: "BCloseButton",
  props: {
    disabled: { type: Boolean, default: false },
    white: { type: Boolean, default: false }
  },
  setup(props) {
    const classes = computed(() => ({
      "btn-close-white": props.white
    }));
    return {
      classes
    };
  }
});
var _hoisted_1$u = ["disabled"];
function _sfc_render$J(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("button", {
    type: "button",
    class: normalizeClass(["btn-close", _ctx.classes]),
    disabled: _ctx.disabled,
    "aria-label": "Close"
  }, null, 10, _hoisted_1$u);
}
var BCloseButton = _export_sfc(_sfc_main$11, [["render", _sfc_render$J]]);
var getBreakpointProps = (prefix, breakpoints, definition) => breakpoints.concat(["sm", "md", "lg", "xl", "xxl"]).reduce((props, breakpoint) => {
  props[!prefix ? breakpoint : `${prefix}${breakpoint.charAt(0).toUpperCase() + breakpoint.slice(1)}`] = definition;
  return props;
}, Object.create(null));
var getClasses$1 = (props, els, propPrefix, classPrefix = propPrefix) => Object.keys(els).reduce((arr, prop) => {
  if (!props[prop])
    return arr;
  arr.push([classPrefix, prop.replace(propPrefix, ""), props[prop]].filter((e) => e && typeof e !== "boolean").join("-").toLowerCase());
  return arr;
}, []);
var breakpointCol = getBreakpointProps("", [], { type: [Boolean, String, Number], default: false });
var breakpointOffset = getBreakpointProps("offset", [""], { type: [String, Number], default: null });
var breakpointOrder = getBreakpointProps("order", [""], { type: [String, Number], default: null });
var _sfc_main$10 = defineComponent({
  name: "BCol",
  props: __spreadProps2(__spreadValues2(__spreadProps2(__spreadValues2(__spreadProps2(__spreadValues2({
    col: { type: Boolean, default: false },
    cols: { type: [String, Number], default: null }
  }, breakpointCol), {
    offset: { type: [String, Number], default: null }
  }), breakpointOffset), {
    order: { type: [String, Number], default: null }
  }), breakpointOrder), {
    alignSelf: { type: String, default: null },
    tag: { type: String, default: "div" }
  }),
  setup(props) {
    let classList = [];
    const properties = [
      { content: breakpointCol, propPrefix: "cols", classPrefix: "col" },
      { content: breakpointOffset, propPrefix: "offset" },
      { content: breakpointOrder, propPrefix: "order" }
    ];
    properties.forEach((property) => {
      classList = classList.concat(getClasses$1(props, property.content, property.propPrefix, property.classPrefix));
    });
    const classes = computed(() => ({
      col: props.col || !classList.some((e) => /^col-/.test(e) && !props.cols),
      [`col-${props.cols}`]: !!props.cols,
      [`offset-${props.offset}`]: !!props.offset,
      [`order-${props.order}`]: !!props.order,
      [`align-self-${props.alignSelf}`]: !!props.alignSelf
    }));
    return {
      classes,
      classList
    };
  }
});
function _sfc_render$I(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.tag), {
    class: normalizeClass([_ctx.classes, _ctx.classList])
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 8, ["class"]);
}
var BCol = _export_sfc(_sfc_main$10, [["render", _sfc_render$I]]);
var defaultToastOptions = { delay: 5e3, value: true, pos: "top-right" };
var ToastInstance = class {
  constructor(vm) {
    if (isReactive(vm)) {
      this.vm = vm;
    } else {
      this.vm = reactive(vm);
    }
    this.containerPositions = computed(() => {
      let s = new Set([]);
      this.vm.toasts.map((toast) => {
        if (toast.options.pos) {
          s.add(toast.options.pos);
        }
      });
      return s;
    });
  }
  toasts(position) {
    if (position) {
      return computed(() => {
        return this.vm.toasts.filter((toast) => {
          if (toast.options.pos == position && toast.options.value) {
            return toast;
          }
        });
      });
    }
    return computed(() => {
      return this.vm.toasts;
    });
  }
  remove(...forDeletion) {
    this.vm.toasts = this.vm.toasts.filter((item) => {
      if (!forDeletion.includes(item.options.id)) {
        return item;
      }
    });
  }
  isRoot() {
    var _a;
    return (_a = this.vm.root) != null ? _a : false;
  }
  show(content, options = defaultToastOptions) {
    let topts = __spreadValues2(__spreadValues2({ id: getID() }, defaultToastOptions), options);
    let toast = {
      options: reactive(topts),
      content
    };
    this.vm.toasts.push(toast);
    return toast;
  }
  info(content, options = defaultToastOptions) {
    return this.show(content, __spreadValues2({ variant: "info" }, options));
  }
  danger(content, options = defaultToastOptions) {
    return this.show(content, __spreadValues2({ variant: "danger" }, options));
  }
  warning(content, options = defaultToastOptions) {
    return this.show(content, __spreadValues2({ variant: "warning" }, options));
  }
  success(content, options = defaultToastOptions) {
    return this.show(content, __spreadValues2({ variant: "success" }, options));
  }
  hide() {
  }
};
var ToastController = class {
  constructor() {
    this.useToast = useToast;
    this.vms = {};
  }
  getOrCreateViewModel(vm) {
    if (!vm) {
      if (this.rootInstance) {
        return this.vms[this.rootInstance];
      } else {
        let vm2 = { root: true, toasts: [], container: void 0, id: Symbol("toast") };
        this.rootInstance = vm2.id;
        this.vms[vm2.id] = vm2;
        return vm2;
      }
    } else {
      if (vm.root) {
        if (this.rootInstance) {
          return this.vms[this.rootInstance];
        }
        this.rootInstance = vm.id;
      }
      this.vms[vm.id] = vm;
      return vm;
    }
  }
  getVM(id) {
    if (!id && this.rootInstance) {
      return this.vms[this.rootInstance];
    } else if (id) {
      return this.vms[id];
    }
    return void 0;
  }
};
var injectkey = Symbol();
var defaults = {
  container: void 0,
  toasts: [],
  root: false
};
function useToast(vm, key = injectkey) {
  let controller = inject(key !== null ? key : injectkey);
  if (!vm) {
    let local_vm2 = new ToastInstance(controller.getOrCreateViewModel());
    return local_vm2;
  }
  let vm_id = { id: Symbol("toastInstance") };
  let local_vm = __spreadValues2(__spreadValues2(__spreadValues2({}, defaults), vm_id), vm);
  let vm_instance = controller.getOrCreateViewModel(local_vm);
  return new ToastInstance(vm_instance);
}
var BToastPlugin = {
  install: (app, options = {}) => {
    var _a, _b;
    app.provide((_b = (_a = options == null ? void 0 : options.BToast) == null ? void 0 : _a.injectkey) != null ? _b : injectkey, new ToastController());
  }
};
var toastPositions = {
  "top-left": "top-0 start-0",
  "top-center": "top-0 start-50 translate-middle-x",
  "top-right": "top-0 end-0",
  "middle-left": "top-50 start-0 translate-middle-y",
  "middle-center": "top-50 start-50 translate-middle",
  "middle-right": "top-50 end-0 translate-middle-y",
  "bottom-left": "bottom-0 start-0",
  "bottom-center": "bottom-0 start-50 translate-middle-x",
  "bottom-right": "bottom-0 end-0"
};
var _sfc_main$$ = defineComponent({
  name: "BToaster",
  props: {
    position: { type: String, default: "top-right" },
    instance: { type: Object }
  },
  setup(props, { emit }) {
    const positionClass = computed(() => toastPositions[props.position]);
    const handleDestroy = (id) => {
      var _a;
      (_a = props.instance) == null ? void 0 : _a.remove(id);
    };
    return {
      positionClass,
      handleDestroy
    };
  },
  computed: {}
});
function _sfc_render$H(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_toast = resolveComponent("b-toast");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass([[_ctx.positionClass], "b-toaster position-fixed p-3"]),
    style: { "z-index": "11" }
  }, [
    (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.instance.toasts(_ctx.position).value, (toast) => {
      return openBlock(), createBlock(_component_b_toast, {
        id: toast.options.id,
        key: toast.options.id,
        modelValue: toast.options.value,
        "onUpdate:modelValue": ($event) => toast.options.value = $event,
        title: toast.content.title,
        body: toast.content.body,
        component: toast.content.vnode,
        variant: toast.options.variant,
        onDestroyed: _ctx.handleDestroy
      }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "title", "body", "component", "variant", "onDestroyed"]);
    }), 128))
  ], 2);
}
var BToastContainer = _export_sfc(_sfc_main$$, [["render", _sfc_render$H]]);
var _sfc_main$_ = defineComponent({
  name: "BContainer",
  props: {
    gutterX: { type: String, default: null },
    gutterY: { type: String, default: null },
    fluid: { type: [Boolean, String], default: false },
    toast: { type: Object },
    position: { type: String, required: false }
  },
  setup(props, { slots, expose }) {
    const container = ref();
    let toastInstance;
    const classes = computed(() => ({
      container: !props.fluid,
      [`container-fluid`]: typeof props.fluid === "boolean" && props.fluid,
      [`container-${props.fluid}`]: typeof props.fluid === "string",
      [`gx-${props.gutterX}`]: props.gutterX !== null,
      [`gy-${props.gutterY}`]: props.gutterY !== null
    }));
    onMounted(() => {
      if (props.toast)
        ;
    });
    if (props.toast) {
      toastInstance = useToast({ container, root: props.toast.root });
      expose({});
    }
    return () => {
      var _a;
      const subContainers = [];
      toastInstance == null ? void 0 : toastInstance.containerPositions.value.forEach((position) => {
        subContainers.push(h(BToastContainer, { key: position, instance: toastInstance, position }));
      });
      return h("div", { class: [classes.value, props.position], ref: container }, [
        ...subContainers,
        (_a = slots.default) == null ? void 0 : _a.call(slots)
      ]);
    };
  },
  methods: {}
});
function _isObject(item) {
  return item && typeof item === "object" && item.constructor === Object;
}
function mergeDeep(target, source, extendArray = true) {
  const output = target instanceof Date && typeof target.getMonth === "function" ? new Date(target) : Object.assign({}, target);
  if (_isObject(target) && _isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (_isObject(source[key])) {
        if (!(key in target))
          Object.assign(output, { [key]: source[key] });
        else
          output[key] = mergeDeep(target[key], source[key], extendArray);
      } else if (Array.isArray(source[key]) && Array.isArray(target[key])) {
        Object.assign(output, {
          [key]: !extendArray ? source[key] : target[key].concat(source[key].filter((item) => !target[key].includes(item)))
        });
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
}
var _sfc_main$Z = defineComponent({
  name: "BDropdown",
  components: { BButton },
  props: {
    autoClose: { type: [Boolean, String], default: true },
    block: { type: Boolean, default: false },
    boundary: {
      type: [HTMLElement$1, String],
      default: "clippingParents"
    },
    dark: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    dropup: { type: Boolean, default: false },
    dropright: { type: Boolean, default: false },
    dropleft: { type: Boolean, default: false },
    id: { type: String },
    menuClass: { type: [Array, Object, String] },
    noFlip: { type: Boolean, default: false },
    offset: { type: [Number, String], default: 0 },
    popperOpts: { type: Object, default: () => ({}) },
    right: { type: Boolean, default: false },
    role: { type: String, default: "menu" },
    size: { type: String },
    split: { type: Boolean, default: false },
    splitButtonType: { type: String, default: "button" },
    splitClass: { type: [Array, Object, String] },
    splitHref: { type: String, default: null },
    noCaret: { type: Boolean, default: false },
    splitVariant: { type: String },
    text: { type: String },
    toggleClass: { type: [Array, Object, String] },
    toggleText: { type: String, default: "Toggle dropdown" },
    variant: { type: String, default: "secondary" }
  },
  emits: ["show", "shown", "hide", "hidden"],
  setup(props, { emit }) {
    const parent = ref();
    const dropdown = ref();
    const instance = ref();
    const computedId = useId(props.id, "dropdown");
    useEventListener(parent, "show.bs.dropdown", () => emit("show"));
    useEventListener(parent, "shown.bs.dropdown", () => emit("shown"));
    useEventListener(parent, "hide.bs.dropdown", () => emit("hide"));
    useEventListener(parent, "hidden.bs.dropdown", () => emit("hidden"));
    const classes = computed(() => ({
      "d-grid": props.block,
      "d-flex": props.block && props.split
    }));
    const buttonClasses = computed(() => ({
      "dropdown-toggle": !props.split,
      "dropdown-toggle-no-caret": props.noCaret && !props.split,
      "w-100": props.split && props.block
    }));
    const dropdownMenuClasses = computed(() => ({
      "dropdown-menu-dark": props.dark
    }));
    const buttonAttr = computed(() => ({
      "data-bs-toggle": props.split ? null : "dropdown",
      "aria-expanded": props.split ? null : false,
      "ref": props.split ? null : dropdown,
      "href": props.split ? props.splitHref : null
    }));
    const splitAttr = computed(() => ({
      ref: props.split ? dropdown : null
    }));
    const hide2 = () => {
      var _a;
      (_a = instance.value) == null ? void 0 : _a.hide();
    };
    onMounted(() => {
      var _a;
      instance.value = new import_dropdown.default((_a = dropdown.value) == null ? void 0 : _a.$el, {
        autoClose: props.autoClose,
        boundary: props.boundary,
        offset: props.offset.toString(),
        reference: props.offset || props.split ? "parent" : "toggle",
        popperConfig: (defaultConfig) => {
          const dropDownConfig = {
            placement: "bottom-start",
            modifiers: !props.noFlip ? [] : [
              {
                name: "flip",
                options: {
                  fallbackPlacements: []
                }
              }
            ]
          };
          if (props.dropup) {
            dropDownConfig.placement = props.right ? "top-end" : "top-start";
          } else if (props.dropright) {
            dropDownConfig.placement = "right-start";
          } else if (props.dropleft) {
            dropDownConfig.placement = "left-start";
          } else if (props.right) {
            dropDownConfig.placement = "bottom-end";
          }
          return mergeDeep(defaultConfig, mergeDeep(dropDownConfig, props.popperOpts));
        }
      });
    });
    return {
      parent,
      computedId,
      classes,
      buttonClasses,
      buttonAttr,
      splitAttr,
      dropdownMenuClasses,
      dropdown,
      hide: hide2
    };
  }
});
var _hoisted_1$t = { class: "visually-hidden" };
var _hoisted_2$f = ["aria-labelledby", "role"];
function _sfc_render$G(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_button = resolveComponent("b-button");
  return openBlock(), createElementBlock("div", {
    ref: "parent",
    class: normalizeClass([_ctx.classes, "btn-group"])
  }, [
    createVNode(_component_b_button, mergeProps({
      id: _ctx.computedId,
      variant: _ctx.splitVariant || _ctx.variant,
      size: _ctx.size,
      class: [_ctx.buttonClasses, _ctx.split ? _ctx.splitClass : _ctx.toggleClass],
      disabled: _ctx.disabled,
      type: _ctx.splitButtonType
    }, _ctx.buttonAttr), {
      default: withCtx(() => [
        createTextVNode(toDisplayString(_ctx.text) + " ", 1),
        renderSlot(_ctx.$slots, "button-content")
      ]),
      _: 3
    }, 16, ["id", "variant", "size", "class", "disabled", "type"]),
    _ctx.split ? (openBlock(), createBlock(_component_b_button, mergeProps({
      key: 0,
      variant: _ctx.variant,
      size: _ctx.size,
      disabled: _ctx.disabled
    }, _ctx.splitAttr, {
      class: [_ctx.toggleClass, "dropdown-toggle-split dropdown-toggle"],
      "data-bs-toggle": "dropdown",
      "aria-expanded": "false"
    }), {
      default: withCtx(() => [
        createBaseVNode("span", _hoisted_1$t, toDisplayString(_ctx.toggleText), 1)
      ]),
      _: 1
    }, 16, ["variant", "size", "disabled", "class"])) : createCommentVNode("", true),
    createBaseVNode("ul", {
      class: normalizeClass(["dropdown-menu", [_ctx.menuClass, _ctx.dropdownMenuClasses]]),
      "aria-labelledby": _ctx.computedId,
      role: _ctx.role
    }, [
      renderSlot(_ctx.$slots, "default")
    ], 10, _hoisted_2$f)
  ], 2);
}
var BDropdown = _export_sfc(_sfc_main$Z, [["render", _sfc_render$G]]);
var _sfc_main$Y = defineComponent({
  name: "BDropdownDivider",
  props: {
    tag: { type: String, default: "hr" }
  }
});
var _hoisted_1$s = { role: "presentation" };
function _sfc_render$F(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("li", _hoisted_1$s, [
    (openBlock(), createBlock(resolveDynamicComponent(_ctx.tag), {
      class: "dropdown-divider",
      role: "separator",
      "aria-orientation": "horizontal"
    }))
  ]);
}
var BDropdownDivider = _export_sfc(_sfc_main$Y, [["render", _sfc_render$F]]);
var _sfc_main$X = defineComponent({
  name: "BDropdownForm"
});
var _hoisted_1$r = { role: "presentation" };
var _hoisted_2$e = { class: "px-4 py-3" };
function _sfc_render$E(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("li", _hoisted_1$r, [
    createBaseVNode("form", _hoisted_2$e, [
      renderSlot(_ctx.$slots, "default")
    ])
  ]);
}
var BDropdownForm = _export_sfc(_sfc_main$X, [["render", _sfc_render$E]]);
var _sfc_main$W = defineComponent({
  name: "BDropdownGroup",
  inheritAttrs: false,
  props: {
    ariaDescribedby: { type: String },
    header: { type: String },
    headerClasses: { type: [String, Array, Object], default: null },
    headerTag: { type: String, default: "header" },
    headerVariant: { type: String, default: null },
    id: { type: String }
  },
  setup(props) {
    const headerId = computed(() => props.id ? [props.id, "group_dd_header"].join("_") : null);
    const headerRole = computed(() => props.headerTag === "header" ? null : "heading");
    const classes = computed(() => ({
      [`text-${props.headerVariant}`]: props.headerVariant
    }));
    return {
      classes,
      headerId,
      headerRole
    };
  }
});
var _hoisted_1$q = { role: "presentation" };
var _hoisted_2$d = ["id", "aria-describedby"];
function _sfc_render$D(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("li", _hoisted_1$q, [
    (openBlock(), createBlock(resolveDynamicComponent(_ctx.headerTag), {
      id: _ctx.headerId,
      class: normalizeClass(["dropdown-header", [_ctx.classes, _ctx.headerClasses]]),
      role: _ctx.headerRole
    }, {
      default: withCtx(() => [
        renderSlot(_ctx.$slots, "header", {}, () => [
          createTextVNode(toDisplayString(_ctx.header), 1)
        ])
      ]),
      _: 3
    }, 8, ["id", "class", "role"])),
    createBaseVNode("ul", mergeProps({
      id: _ctx.id,
      role: "group",
      class: "list-unstyled"
    }, _ctx.$attrs, {
      "aria-describedby": _ctx.ariaDescribedby || _ctx.headerId
    }), [
      renderSlot(_ctx.$slots, "default")
    ], 16, _hoisted_2$d)
  ]);
}
var BDropdownGroup = _export_sfc(_sfc_main$W, [["render", _sfc_render$D]]);
var _sfc_main$V = {};
var _hoisted_1$p = { class: "dropdown-header" };
function _sfc_render$C(_ctx, _cache) {
  return openBlock(), createElementBlock("li", null, [
    createBaseVNode("h6", _hoisted_1$p, [
      renderSlot(_ctx.$slots, "default")
    ])
  ]);
}
var BDropdownHeader = _export_sfc(_sfc_main$V, [["render", _sfc_render$C]]);
var _sfc_main$U = defineComponent({
  name: "BDropdownItem",
  inheritAttrs: false,
  props: {
    active: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    href: { type: String },
    linkClass: { type: [Array, Object, String] },
    rel: { type: String, default: null },
    target: { type: String, default: "_self" },
    variant: { type: String, default: null }
  },
  emits: ["click"],
  setup(props, { attrs }) {
    const classes = computed(() => ({
      active: props.active,
      disabled: props.disabled,
      [`text-${props.variant}`]: props.variant
    }));
    const tag = computed(() => props.href ? "a" : attrs.to ? "b-link" : "button");
    const componentAttrs = computed(() => __spreadValues2({
      "aria-current": props.active ? "true" : null,
      "href": tag.value === "a" ? props.href : null,
      "rel": props.rel,
      "type": tag.value === "button" ? "button" : null,
      "target": props.target
    }, attrs.to ? __spreadValues2({ activeClass: "active" }, attrs) : {}));
    return {
      classes,
      tag,
      componentAttrs
    };
  }
});
var _hoisted_1$o = { role: "presentation" };
function _sfc_render$B(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("li", _hoisted_1$o, [
    (openBlock(), createBlock(resolveDynamicComponent(_ctx.tag), mergeProps({
      class: ["dropdown-item", [_ctx.classes, _ctx.linkClass]]
    }, _ctx.componentAttrs, {
      onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("click", $event))
    }), {
      default: withCtx(() => [
        renderSlot(_ctx.$slots, "default")
      ]),
      _: 3
    }, 16, ["class"]))
  ]);
}
var BDropdownItem = _export_sfc(_sfc_main$U, [["render", _sfc_render$B]]);
var _sfc_main$T = defineComponent({
  name: "BDropdownItemButton",
  inheritAttrs: false,
  props: {
    active: { type: Boolean, default: false },
    activeClass: { type: String, default: "active" },
    buttonClass: { type: [String, Array, Object] },
    disabled: { type: Boolean, default: false },
    variant: { type: String, default: null }
  },
  emits: ["click"],
  setup(props) {
    const classes = computed(() => ({
      [props.activeClass]: props.active,
      disabled: props.disabled,
      [`text-${props.variant}`]: props.variant
    }));
    const attrs = computed(() => ({
      role: "menuitem",
      type: "button",
      disabled: props.disabled
    }));
    return {
      classes,
      attrs
    };
  }
});
var _hoisted_1$n = { role: "presentation" };
function _sfc_render$A(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("li", _hoisted_1$n, [
    createBaseVNode("button", mergeProps({
      class: ["dropdown-item", [_ctx.classes, _ctx.buttonClass]]
    }, _ctx.attrs, {
      onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("click", $event))
    }), [
      renderSlot(_ctx.$slots, "default")
    ], 16)
  ]);
}
var BDropdownItemButton = _export_sfc(_sfc_main$T, [["render", _sfc_render$A]]);
var _sfc_main$S = defineComponent({
  name: "BDropdownText"
});
var _hoisted_1$m = { role: "presentation" };
var _hoisted_2$c = { class: "px-4 py-1 mb-0 text-muted" };
function _sfc_render$z(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("li", _hoisted_1$m, [
    createBaseVNode("p", _hoisted_2$c, [
      renderSlot(_ctx.$slots, "default")
    ])
  ]);
}
var BDropdownText = _export_sfc(_sfc_main$S, [["render", _sfc_render$z]]);
var _sfc_main$R = defineComponent({
  name: "BForm",
  props: {
    id: { type: String, required: false },
    floating: { type: Boolean, default: false },
    novalidate: { type: Boolean, default: false },
    validated: { type: Boolean, default: false }
  },
  emits: ["submit"],
  setup(props) {
    const classes = computed(() => ({
      "form-floating": props.floating,
      "was-validated": props.validated
    }));
    return {
      classes
    };
  }
});
var _hoisted_1$l = ["id", "novalidate"];
function _sfc_render$y(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("form", {
    id: _ctx.id,
    novalidate: _ctx.novalidate,
    class: normalizeClass(_ctx.classes),
    onSubmit: _cache[0] || (_cache[0] = withModifiers(($event) => _ctx.$emit("submit", $event), ["prevent"]))
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 42, _hoisted_1$l);
}
var BForm = _export_sfc(_sfc_main$R, [["render", _sfc_render$y]]);
var _getComputedAriaInvalid = (props) => computed(() => {
  if (props.ariaInvalid === true || props.ariaInvalid === "true" || props.ariaInvalid === "") {
    return "true";
  }
  const computedState = typeof props.state === "boolean" ? props.state : null;
  return computedState === false ? "true" : props.ariaInvalid;
});
var getClasses = (props) => computed(() => ({
  "form-check": !props.plain && !props.button,
  "form-check-inline": props.inline,
  "form-switch": props.switch,
  [`form-control-${props.size}`]: props.size && props.size !== "md"
}));
var getInputClasses = (props) => computed(() => ({
  "form-check-input": !props.plain && !props.button,
  "is-valid": props.state === true,
  "is-invalid": props.state === false,
  "btn-check": props.button
}));
var getLabelClasses = (props) => computed(() => ({
  "form-check-label": !props.plain && !props.button,
  "btn": props.button,
  [`btn-${props.buttonVariant}`]: props.button,
  [`btn-${props.size}`]: props.button && props.size && props.size !== "md"
}));
var getGroupAttr = (props) => computed(() => ({
  "aria-invalid": _getComputedAriaInvalid(props).value,
  "aria-required": props.required.toString() === "true" ? "true" : null
}));
var getGroupClasses = (props) => computed(() => ({
  "was-validated": props.validated,
  "btn-group": props.buttons && !props.stacked,
  "btn-group-vertical": props.stacked,
  [`btn-group-${props.size}`]: props.size
}));
var slotsToElements = (slots, nodeType, disabled) => slots.filter((e) => e.type.name === nodeType).map((e) => {
  const txtChild = (e.children.default ? e.children.default() : []).find((e2) => e2.type.toString() === "Symbol(Text)");
  return {
    props: __spreadValues2({
      disabled
    }, e.props),
    text: txtChild ? txtChild.children : ""
  };
});
var optionToElement = (option, props) => {
  if (typeof option === "string") {
    return {
      props: {
        value: option,
        disabled: props.disabled
      },
      text: option
    };
  }
  return {
    props: __spreadValues2({
      value: option[props.valueField],
      disabled: props.disabled || option[props.disabledField]
    }, option.props),
    text: option[props.textField],
    html: option[props.htmlField]
  };
};
var bindGroupProps = (el, idx, props, computedName, computedId) => __spreadProps2(__spreadValues2({}, el), {
  props: __spreadValues2({
    "button-variant": props.buttonVariant,
    "form": props.form,
    "name": computedName.value,
    "id": `${computedId.value}_option_${idx}`,
    "button": props.buttons,
    "state": props.state,
    "plain": props.plain,
    "size": props.size,
    "inline": !props.stacked,
    "required": props.required
  }, el.props)
});
var _sfc_main$Q = defineComponent({
  name: "BFormCheckbox",
  inheritAttrs: false,
  props: {
    id: { type: String, default: void 0 },
    ariaLabel: { type: String },
    ariaLabelledBy: { type: String },
    autofocus: { type: Boolean, default: false },
    plain: { type: Boolean, default: false },
    button: { type: Boolean, default: false },
    switch: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    buttonVariant: { type: String, default: "secondary" },
    form: { type: String },
    indeterminate: { type: Boolean },
    inline: { type: Boolean, default: false },
    name: { type: String },
    required: { type: Boolean, default: void 0 },
    size: { type: String, default: "md" },
    state: { type: Boolean, default: null },
    uncheckedValue: { type: [Boolean, String, Array, Object, Number], default: false },
    value: { type: [Boolean, String, Array, Object, Number], default: true },
    modelValue: { type: [Boolean, String, Array, Object, Number], default: null }
  },
  emits: ["update:modelValue", "input", "change"],
  setup(props, { emit }) {
    const computedId = useId(props.id, "form-check");
    const input = ref(null);
    const isFocused = ref(false);
    const localValue = computed({
      get: () => {
        if (props.uncheckedValue) {
          if (!Array.isArray(props.modelValue)) {
            return props.modelValue === props.value;
          }
          return props.modelValue.indexOf(props.value) > -1;
        }
        return props.modelValue;
      },
      set: (newValue) => {
        let emitValue = newValue;
        if (!Array.isArray(props.modelValue)) {
          emitValue = newValue ? props.value : props.uncheckedValue;
        } else {
          if (props.uncheckedValue) {
            emitValue = props.modelValue;
            if (newValue) {
              if (emitValue.indexOf(props.uncheckedValue) > -1)
                emitValue.splice(emitValue.indexOf(props.uncheckedValue), 1);
              emitValue.push(props.value);
            } else {
              if (emitValue.indexOf(props.value) > -1)
                emitValue.splice(emitValue.indexOf(props.value), 1);
              emitValue.push(props.uncheckedValue);
            }
          }
        }
        emit("input", emitValue);
        emit("update:modelValue", emitValue);
        emit("change", emitValue);
      }
    });
    const isChecked = computed(() => {
      if (Array.isArray(props.modelValue)) {
        return props.modelValue.indexOf(props.value) > -1;
      }
      return JSON.stringify(props.modelValue) === JSON.stringify(props.value);
    });
    const classes = getClasses(props);
    const inputClasses = getInputClasses(props);
    const labelClasses = getLabelClasses(props);
    if (props.autofocus) {
      onMounted(() => {
        input.value.focus();
      });
    }
    return {
      input,
      computedId,
      classes,
      inputClasses,
      labelClasses,
      localValue,
      isChecked,
      isFocused
    };
  }
});
var _hoisted_1$k = ["id", "disabled", "required", "name", "form", "aria-label", "aria-labelledby", "aria-required", "value", "indeterminate"];
var _hoisted_2$b = ["for"];
function _sfc_render$x(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.classes)
  }, [
    withDirectives(createBaseVNode("input", mergeProps({ id: _ctx.computedId }, _ctx.$attrs, {
      ref: "input",
      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.localValue = $event),
      class: _ctx.inputClasses,
      type: "checkbox",
      disabled: _ctx.disabled,
      required: _ctx.name && _ctx.required,
      name: _ctx.name,
      form: _ctx.form,
      "aria-label": _ctx.ariaLabel,
      "aria-labelledby": _ctx.ariaLabelledBy,
      "aria-required": _ctx.name && _ctx.required ? "true" : null,
      value: _ctx.value,
      indeterminate: _ctx.indeterminate,
      onFocus: _cache[1] || (_cache[1] = ($event) => _ctx.isFocused = true),
      onBlur: _cache[2] || (_cache[2] = ($event) => _ctx.isFocused = false)
    }), null, 16, _hoisted_1$k), [
      [vModelCheckbox, _ctx.localValue]
    ]),
    _ctx.$slots.default || !_ctx.plain ? (openBlock(), createElementBlock("label", {
      key: 0,
      for: _ctx.computedId,
      class: normalizeClass([_ctx.labelClasses, { active: _ctx.isChecked, focus: _ctx.isFocused }])
    }, [
      renderSlot(_ctx.$slots, "default")
    ], 10, _hoisted_2$b)) : createCommentVNode("", true)
  ], 2);
}
var BFormCheckbox = _export_sfc(_sfc_main$Q, [["render", _sfc_render$x]]);
var _sfc_main$P = defineComponent({
  name: "BFormCheckboxGroup",
  props: {
    modelValue: { type: Array, default: () => [] },
    ariaInvalid: { type: [Boolean, String], default: null },
    autofocus: { type: Boolean, default: false },
    buttonVariant: { type: String, default: "secondary" },
    buttons: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    disabledField: { type: String, default: "disabled" },
    form: { type: String },
    htmlField: { type: String, default: "html" },
    id: { type: String },
    name: { type: String },
    options: { type: Array, default: () => [] },
    plain: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    size: { type: String },
    stacked: { type: Boolean, default: false },
    state: { type: Boolean, default: null },
    switches: { type: Boolean, default: false },
    textField: { type: String, default: "text" },
    validated: { type: Boolean, default: false },
    valueField: { type: String, default: "value" }
  },
  emits: ["update:modelValue", "change", "input"],
  setup(props, { emit, slots }) {
    const slotsName = "BFormCheckbox";
    const computedId = useId(props.id, "checkbox");
    const computedName = useId(props.name, "checkbox");
    const localValue = computed({
      get: () => props.modelValue,
      set: (newValue) => {
        if (JSON.stringify(newValue) === JSON.stringify(props.modelValue))
          return;
        emit("input", newValue);
        emit("update:modelValue", newValue);
        emit("change", newValue);
      }
    });
    const checkboxList = computed(() => (slots.first ? slotsToElements(slots.first(), slotsName, props.disabled) : []).concat(props.options.map((e) => optionToElement(e, props))).concat(slots.default ? slotsToElements(slots.default(), slotsName, props.disabled) : []).map((e, idx) => bindGroupProps(e, idx, props, computedName, computedId)).map((e) => __spreadProps2(__spreadValues2({}, e), {
      props: __spreadValues2({
        switch: props.switches
      }, e.props)
    })));
    const attrs = getGroupAttr(props);
    const classes = getGroupClasses(props);
    return {
      attrs,
      classes,
      checkboxList,
      computedId,
      localValue
    };
  }
});
var _hoisted_1$j = ["id"];
var _hoisted_2$a = ["innerHTML"];
var _hoisted_3$5 = ["textContent"];
function _sfc_render$w(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_form_checkbox = resolveComponent("b-form-checkbox");
  return openBlock(), createElementBlock("div", mergeProps(_ctx.attrs, {
    id: _ctx.computedId,
    role: "group",
    class: [_ctx.classes, "bv-no-focus-ring"],
    tabindex: "-1"
  }), [
    (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.checkboxList, (item, key) => {
      return openBlock(), createBlock(_component_b_form_checkbox, mergeProps({
        key,
        modelValue: _ctx.localValue,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.localValue = $event)
      }, item.props), {
        default: withCtx(() => [
          item.html ? (openBlock(), createElementBlock("span", {
            key: 0,
            innerHTML: item.html
          }, null, 8, _hoisted_2$a)) : (openBlock(), createElementBlock("span", {
            key: 1,
            textContent: toDisplayString(item.text)
          }, null, 8, _hoisted_3$5))
        ]),
        _: 2
      }, 1040, ["modelValue"]);
    }), 128))
  ], 16, _hoisted_1$j);
}
var BFormCheckboxGroup = _export_sfc(_sfc_main$P, [["render", _sfc_render$w]]);
var _sfc_main$O = defineComponent({
  name: "BFormFloatingLabel",
  props: {
    labelFor: { type: String },
    label: { type: String }
  }
});
var _hoisted_1$i = { class: "form-floating" };
var _hoisted_2$9 = ["for"];
function _sfc_render$v(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$i, [
    renderSlot(_ctx.$slots, "default"),
    createBaseVNode("label", { for: _ctx.labelFor }, toDisplayString(_ctx.label), 9, _hoisted_2$9)
  ]);
}
var BFormFloatingLabel = _export_sfc(_sfc_main$O, [["render", _sfc_render$v]]);
var escapeChar = (value) => "\\" + value;
var cssEscape = (value) => {
  value = toString(value);
  const length = value.length;
  const firstCharCode = value.charCodeAt(0);
  return value.split("").reduce((result, char, index) => {
    const charCode = value.charCodeAt(index);
    if (charCode === 0) {
      return result + "\uFFFD";
    }
    if (charCode === 127 || charCode >= 1 && charCode <= 31 || index === 0 && charCode >= 48 && charCode <= 57 || index === 1 && charCode >= 48 && charCode <= 57 && firstCharCode === 45) {
      return result + escapeChar(`${charCode.toString(16)} `);
    }
    if (index === 0 && charCode === 45 && length === 1) {
      return result + escapeChar(char);
    }
    if (charCode >= 128 || charCode === 45 || charCode === 95 || charCode >= 48 && charCode <= 57 || charCode >= 65 && charCode <= 90 || charCode >= 97 && charCode <= 122) {
      return result + char;
    }
    return result + escapeChar(char);
  }, "");
};
var normalizeSlot = (name, scope = {}, $slots = {}) => {
  const names = [name];
  let slot;
  for (let i = 0; i < names.length && !slot; i++) {
    const name2 = names[i];
    slot = $slots[name2];
  }
  return slot && isFunction(slot) ? slot(scope) : slot;
};
var _sfc_main$N = defineComponent({
  name: "BFormValidFeedback",
  props: {
    ariaLive: { type: String, required: false },
    forceShow: { type: Boolean, default: false },
    id: { type: String, required: false },
    role: { type: String, required: false },
    state: { type: Boolean, default: void 0 },
    tag: { type: String, default: "div" },
    tooltip: { type: Boolean, default: false }
  },
  setup(props) {
    const computedShow = computed(() => props.forceShow === true || props.state === true);
    const classes = computed(() => ({
      "d-block": computedShow.value,
      "valid-feedback": !props.tooltip,
      "valid-tooltip": props.tooltip
    }));
    const attrs = computed(() => ({
      "id": props.id || null,
      "role": props.role || null,
      "aria-live": props.ariaLive || null,
      "aria-atomic": props.ariaLive ? "true" : null
    }));
    return {
      attrs,
      classes,
      computedShow
    };
  }
});
function _sfc_render$u(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.tag), mergeProps({ class: _ctx.classes }, _ctx.attrs), {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 16, ["class"]);
}
var BFormValidFeedback = _export_sfc(_sfc_main$N, [["render", _sfc_render$u]]);
var _sfc_main$M = defineComponent({
  name: "BFormInvalidFeedback",
  props: {
    ariaLive: { type: String, required: false },
    forceShow: { type: Boolean, default: false },
    id: { type: String, required: false },
    role: { type: String, required: false },
    state: { type: Boolean, default: void 0 },
    tag: { type: String, default: "div" },
    tooltip: { type: Boolean, default: false }
  },
  setup(props) {
    const computedShow = computed(() => props.forceShow === true || props.state === false);
    const classes = computed(() => ({
      "d-block": computedShow.value,
      "invalid-feedback": !props.tooltip,
      "invalid-tooltip": props.tooltip
    }));
    const attrs = computed(() => ({
      "id": props.id || null,
      "role": props.role || null,
      "aria-live": props.ariaLive || null,
      "aria-atomic": props.ariaLive ? "true" : null
    }));
    return {
      attrs,
      classes,
      computedShow
    };
  }
});
function _sfc_render$t(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.tag), mergeProps({ class: _ctx.classes }, _ctx.attrs), {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 16, ["class"]);
}
var BFormInvalidFeedback = _export_sfc(_sfc_main$M, [["render", _sfc_render$t]]);
var _sfc_main$L = defineComponent({
  name: "BFormRow",
  props: {
    tag: { type: String, default: "div" }
  }
});
function _sfc_render$s(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.tag), { class: "row d-flex flex-wrap" }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  });
}
var BFormRow = _export_sfc(_sfc_main$L, [["render", _sfc_render$s]]);
var _sfc_main$K = defineComponent({
  name: "BFormText",
  props: {
    id: { type: String, required: false },
    inline: { type: Boolean, default: false },
    tag: { type: String, default: "small" },
    textVariant: { type: String, default: "muted" }
  },
  setup(props) {
    const classes = computed(() => ({
      "form-text": !props.inline,
      [`text-${props.textVariant}`]: props.textVariant
    }));
    const attrs = computed(() => ({
      id: props.id || null
    }));
    return {
      attrs,
      classes
    };
  }
});
function _sfc_render$r(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.tag), mergeProps({ class: _ctx.classes }, _ctx.attrs), {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 16, ["class"]);
}
var BFormText = _export_sfc(_sfc_main$K, [["render", _sfc_render$r]]);
var INPUTS = ["input", "select", "textarea"];
var INPUT_SELECTOR = INPUTS.map((v) => `${v}:not([disabled])`).join();
var LEGEND_INTERACTIVE_ELEMENTS = [...INPUTS, "a", "button", "label"];
var SLOT_NAME_LABEL = "label";
var SLOT_NAME_INVALID_FEEDBACK = "invalid-feedback";
var SLOT_NAME_VALID_FEEDBACK = "valid-feedback";
var SLOT_NAME_DESCRIPTION = "description";
var SLOT_NAME_DEFAULT$1 = "default";
var _sfc_main$J = defineComponent({
  name: "BFormGroup",
  components: { BCol, BFormInvalidFeedback, BFormRow, BFormText, BFormValidFeedback },
  props: {
    contentCols: { type: [Boolean, String, Number], required: false },
    contentColsLg: { type: [Boolean, String, Number], required: false },
    contentColsMd: { type: [Boolean, String, Number], required: false },
    contentColsSm: { type: [Boolean, String, Number], required: false },
    contentColsXl: { type: [Boolean, String, Number], required: false },
    description: { type: [String], required: false },
    disabled: { type: Boolean, default: false },
    feedbackAriaLive: { type: String, default: "assertive" },
    id: { type: String, required: false },
    invalidFeedback: { type: String, required: false },
    label: { type: String, required: false },
    labelAlign: { type: [Boolean, String, Number], required: false },
    labelAlignLg: { type: [Boolean, String, Number], required: false },
    labelAlignMd: { type: [Boolean, String, Number], required: false },
    labelAlignSm: { type: [Boolean, String, Number], required: false },
    labelAlignXl: { type: [Boolean, String, Number], required: false },
    labelClass: { type: [Array, Object, String], required: false },
    labelCols: { type: [Boolean, String, Number], required: false },
    labelColsLg: { type: [Boolean, String, Number], required: false },
    labelColsMd: { type: [Boolean, String, Number], required: false },
    labelColsSm: { type: [Boolean, String, Number], required: false },
    labelColsXl: { type: [Boolean, String, Number], required: false },
    labelFor: { type: String, required: false },
    labelSize: { type: String, required: false },
    labelSrOnly: { type: Boolean, default: false },
    state: { type: Boolean, default: null },
    tooltip: { type: Boolean, default: false },
    validFeedback: { type: String, required: false },
    validated: { type: Boolean, default: false },
    floating: { type: Boolean, default: false }
  },
  setup(props, { attrs }) {
    const ariaDescribedby = null;
    const breakPoints = ["xs", "sm", "md", "lg", "xl"];
    const getAlignClasses = (props2, prefix) => {
      const alignClasses = breakPoints.reduce((result, breakpoint) => {
        const propValue = props2[suffixPropName(breakpoint, `${prefix}Align`)] || null;
        if (propValue) {
          result.push(["text", breakpoint, propValue].filter((p) => p).join("-"));
        }
        return result;
      }, []);
      return alignClasses;
    };
    const getColProps = (props2, prefix) => {
      const colProps = breakPoints.reduce((result, breakpoint) => {
        let propValue = props2[suffixPropName(breakpoint, `${prefix}Cols`)];
        propValue = propValue === "" ? true : propValue || false;
        if (!isBoolean(propValue) && propValue !== "auto") {
          propValue = stringToInteger(propValue, 0);
          propValue = propValue > 0 ? propValue : false;
        }
        if (propValue) {
          result[breakpoint || (isBoolean(propValue) ? "col" : "cols")] = propValue;
        }
        return result;
      }, {});
      return colProps;
    };
    const content = ref();
    const updateAriaDescribedby = (newValue, oldValue = null) => {
      if (IS_BROWSER && props.labelFor) {
        const $input = select(`#${cssEscape(props.labelFor)}`, content);
        if ($input) {
          const attr = "aria-describedby";
          const newIds = (newValue || "").split(RX_SPACE_SPLIT);
          const oldIds = (oldValue || "").split(RX_SPACE_SPLIT);
          const ids = (getAttr($input, attr) || "").split(RX_SPACE_SPLIT).filter((id) => !arrayIncludes(oldIds, id)).concat(newIds).filter((id, index, ids2) => ids2.indexOf(id) === index).filter((x) => x).join(" ").trim();
          if (ids) {
            setAttr($input, attr, ids);
          } else {
            removeAttr($input, attr);
          }
        }
      }
    };
    const contentColProps = computed(() => getColProps(props, "content"));
    const labelAlignClasses = computed(() => getAlignClasses(props, "label"));
    const labelColProps = computed(() => getColProps(props, "label"));
    const isHorizontal = computed(() => Object.keys(contentColProps.value).length > 0 || Object.keys(labelColProps.value).length > 0);
    const computedState = computed(() => isBoolean(props.state) ? props.state : null);
    const stateClass = computed(() => {
      const state = computedState.value;
      return state === true ? "is-valid" : state === false ? "is-invalid" : null;
    });
    const computedAriaInvalid = computed(() => {
      if (attrs.ariaInvalid === true || attrs.ariaInvalid === "true" || attrs.ariaInvalid === "") {
        return "true";
      }
      return computedState.value === false ? "true" : attrs.ariaInvalid;
    });
    watch(() => ariaDescribedby, (newValue, oldValue) => {
      if (newValue !== oldValue) {
        updateAriaDescribedby(newValue, oldValue);
      }
    });
    onMounted(() => {
      nextTick(() => {
        updateAriaDescribedby(ariaDescribedby);
      });
    });
    const onLegendClick = (event) => {
      if (props.labelFor) {
        return;
      }
      const { target } = event;
      const tagName = target ? target.tagName : "";
      if (LEGEND_INTERACTIVE_ELEMENTS.indexOf(tagName) !== -1) {
        return;
      }
      const inputs = selectAll(INPUT_SELECTOR, content).filter(isVisible);
      if (inputs.length === 1) {
        attemptFocus(inputs[0]);
      }
    };
    return {
      ariaDescribedby,
      computedAriaInvalid,
      contentColProps,
      isHorizontal,
      labelAlignClasses,
      labelColProps,
      onLegendClick,
      stateClass
    };
  },
  render() {
    const props = this.$props;
    const slots = this.$slots;
    const id = useId();
    const isFieldset = !props.labelFor;
    let $label = null;
    const labelContent = normalizeSlot(SLOT_NAME_LABEL, {}, slots) || props.label;
    const labelId = labelContent ? getID("_BV_label_") : null;
    if (labelContent || this.isHorizontal) {
      const labelTag = isFieldset ? "legend" : "label";
      if (props.labelSrOnly) {
        if (labelContent) {
          $label = h(labelTag, {
            class: "visually-hidden",
            id: labelId,
            for: props.labelFor || null
          }, labelContent);
        }
        if (this.isHorizontal) {
          $label = h(BCol, this.labelColProps, { default: () => $label });
        } else {
          $label = h("div", {}, [$label]);
        }
      } else {
        const renderProps = __spreadProps2(__spreadValues2({
          onClick: isFieldset ? this.onLegendClick : null
        }, this.isHorizontal ? this.labelColProps : {}), {
          tag: this.isHorizontal ? labelTag : null,
          id: labelId,
          for: props.labelFor || null,
          tabIndex: isFieldset ? "-1" : null,
          class: [
            this.isHorizontal ? "col-form-label" : "form-label",
            {
              "bv-no-focus-ring": isFieldset,
              "col-form-label": this.isHorizontal || isFieldset,
              "pt-0": !this.isHorizontal && isFieldset,
              "d-block": !this.isHorizontal && !isFieldset,
              [`col-form-label-${props.labelSize}`]: !!props.labelSize
            },
            this.labelAlignClasses,
            props.labelClass
          ]
        });
        if (this.isHorizontal) {
          $label = h(BCol, renderProps, { default: () => labelContent });
        } else {
          $label = h(labelTag, renderProps, labelContent);
        }
      }
    }
    let $invalidFeedback = null;
    const invalidFeedbackContent = normalizeSlot(SLOT_NAME_INVALID_FEEDBACK, {}, slots) || this.invalidFeedback;
    const invalidFeedbackId = invalidFeedbackContent ? getID("_BV_feedback_invalid_") : null;
    if (invalidFeedbackContent) {
      $invalidFeedback = h(BFormInvalidFeedback, {
        ariaLive: props.feedbackAriaLive,
        id: invalidFeedbackId,
        state: props.state,
        tooltip: props.tooltip,
        tabindex: invalidFeedbackContent ? "-1" : null
      }, { default: () => invalidFeedbackContent });
    }
    let $validFeedback = null;
    const validFeedbackContent = normalizeSlot(SLOT_NAME_VALID_FEEDBACK, {}, slots) || this.validFeedback;
    const validFeedbackId = validFeedbackContent ? getID("_BV_feedback_valid_") : null;
    if (validFeedbackContent) {
      $validFeedback = h(BFormValidFeedback, {
        ariaLive: props.feedbackAriaLive,
        id: validFeedbackId,
        state: props.state,
        tooltip: props.tooltip,
        tabindex: validFeedbackContent ? "-1" : null
      }, { default: () => validFeedbackContent });
    }
    let $description = null;
    const descriptionContent = normalizeSlot(SLOT_NAME_DESCRIPTION, {}, slots) || this.description;
    const descriptionId = descriptionContent ? getID("_BV_description_") : null;
    if (descriptionContent) {
      $description = h(BFormText, {
        id: descriptionId,
        tabindex: "-1"
      }, { default: () => descriptionContent });
    }
    const ariaDescribedby = this.ariaDescribedby = [
      descriptionId,
      props.state === false ? invalidFeedbackId : null,
      props.state === true ? validFeedbackId : null
    ].filter((x) => x).join(" ") || null;
    const contentBlocks = [
      normalizeSlot(SLOT_NAME_DEFAULT$1, { ariaDescribedby, descriptionId, id, labelId }, slots) || "",
      $invalidFeedback,
      $validFeedback,
      $description
    ];
    if (!this.isHorizontal && props.floating)
      contentBlocks.push($label);
    let $content = h("div", {
      ref: "content",
      class: [
        {
          "form-floating": !this.isHorizontal && props.floating
        }
      ]
    }, contentBlocks);
    if (this.isHorizontal) {
      $content = h(BCol, __spreadValues2({ ref: "content" }, this.contentColProps), { default: () => contentBlocks });
    }
    const rowProps = {
      "class": [
        "mb-3",
        this.stateClass,
        {
          "was-validated": props.validated
        }
      ],
      "id": useId(props.id).value,
      "disabled": isFieldset ? props.disabled : null,
      "role": isFieldset ? null : "group",
      "aria-invalid": this.computedAriaInvalid,
      "aria-labelledby": isFieldset && this.isHorizontal ? labelId : null
    };
    if (this.isHorizontal && !isFieldset) {
      return h(BFormRow, rowProps, { default: () => [$label, $content] });
    }
    return h(isFieldset ? "fieldset" : "div", rowProps, this.isHorizontal && isFieldset ? [h(BFormRow, {}, { default: () => [$label, $content] })] : this.isHorizontal || !props.floating ? [$label, $content] : [$content]);
  }
});
var COMMON_INPUT_PROPS = {
  ariaInvalid: {
    type: [Boolean, String],
    default: false
  },
  autocomplete: { type: String, required: false },
  autofocus: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  form: { type: String, required: false },
  formatter: { type: Function, required: false },
  id: { type: String, required: false },
  lazy: { type: Boolean, default: false },
  lazyFormatter: { type: Boolean, default: false },
  list: { type: String, required: false },
  modelValue: { type: [String, Number], default: "" },
  name: { type: String, required: false },
  number: { type: Boolean, default: false },
  placeholder: { type: String, required: false },
  plaintext: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  required: { type: Boolean, default: false },
  size: { type: String, required: false },
  state: { type: Boolean, default: null },
  trim: { type: Boolean, default: false }
};
function useFormInput(props, emit) {
  const input = ref();
  let inputValue = null;
  let neverFormatted = true;
  const computedId = useId(props.id, "input");
  const _formatValue = (value, evt, force = false) => {
    value = String(value);
    if (typeof props.formatter === "function" && (!props.lazyFormatter || force)) {
      neverFormatted = false;
      return props.formatter(value, evt);
    }
    return value;
  };
  const _getModelValue = (value) => {
    if (props.trim)
      return value.trim();
    if (props.number)
      return parseFloat(value);
    return value;
  };
  const handleAutofocus = () => {
    nextTick(() => {
      var _a;
      if (props.autofocus)
        (_a = input.value) == null ? void 0 : _a.focus();
    });
  };
  onMounted(handleAutofocus);
  onMounted(() => {
    if (input.value) {
      input.value.value = props.modelValue;
    }
  });
  onActivated(handleAutofocus);
  const computedAriaInvalid = computed(() => {
    if (props.ariaInvalid) {
      return props.ariaInvalid.toString();
    }
    return props.state === false ? "true" : void 0;
  });
  const onInput = (evt) => {
    const { value } = evt.target;
    const formattedValue = _formatValue(value, evt);
    if (formattedValue === false || evt.defaultPrevented) {
      evt.preventDefault();
      return;
    }
    if (props.lazy)
      return;
    emit("input", formattedValue);
    const nextModel = _getModelValue(formattedValue);
    if (props.modelValue !== nextModel) {
      inputValue = value;
      emit("update:modelValue", nextModel);
    }
  };
  const onChange = (evt) => {
    const { value } = evt.target;
    const formattedValue = _formatValue(value, evt);
    if (formattedValue === false || evt.defaultPrevented) {
      evt.preventDefault();
      return;
    }
    if (!props.lazy)
      return;
    inputValue = value;
    emit("update:modelValue", formattedValue);
    const nextModel = _getModelValue(formattedValue);
    if (props.modelValue !== nextModel) {
      emit("change", formattedValue);
    }
  };
  const onBlur = (evt) => {
    emit("blur", evt);
    if (!props.lazy && !props.lazyFormatter)
      return;
    const { value } = evt.target;
    const formattedValue = _formatValue(value, evt, true);
    inputValue = value;
    emit("update:modelValue", formattedValue);
  };
  const focus2 = () => {
    var _a;
    if (!props.disabled)
      (_a = input.value) == null ? void 0 : _a.focus();
  };
  const blur = () => {
    var _a;
    if (!props.disabled) {
      (_a = input.value) == null ? void 0 : _a.blur();
    }
  };
  watch(() => props.modelValue, (newValue) => {
    if (!input.value)
      return;
    input.value.value = inputValue && neverFormatted ? inputValue : newValue;
    inputValue = null;
    neverFormatted = true;
  });
  return {
    input,
    computedId,
    computedAriaInvalid,
    onInput,
    onChange,
    onBlur,
    focus: focus2,
    blur
  };
}
var allowedTypes = [
  "text",
  "number",
  "email",
  "password",
  "search",
  "url",
  "tel",
  "date",
  "time",
  "range",
  "color"
];
var _sfc_main$I = defineComponent({
  name: "BFormInput",
  props: __spreadProps2(__spreadValues2({}, COMMON_INPUT_PROPS), {
    max: { type: [String, Number], required: false },
    min: { type: [String, Number], required: false },
    step: { type: [String, Number], required: false },
    type: {
      type: String,
      default: "text",
      validator: (value) => allowedTypes.includes(value)
    }
  }),
  emits: ["update:modelValue", "change", "blur", "input"],
  setup(props, { emit }) {
    const classes = computed(() => {
      const isRange = props.type === "range";
      const isColor = props.type === "color";
      return {
        "form-range": isRange,
        "form-control": isColor || !props.plaintext && !isRange,
        "form-control-color": isColor,
        "form-control-plaintext": props.plaintext && !isRange && !isColor,
        [`form-control-${props.size}`]: props.size,
        "is-valid": props.state === true,
        "is-invalid": props.state === false
      };
    });
    const localType = computed(() => allowedTypes.includes(props.type) ? props.type : "text");
    const { input, computedId, computedAriaInvalid, onInput, onChange, onBlur, focus: focus2, blur } = useFormInput(props, emit);
    return {
      classes,
      localType,
      input,
      computedId,
      computedAriaInvalid,
      onInput,
      onChange,
      onBlur,
      focus: focus2,
      blur
    };
  }
});
var _hoisted_1$h = ["id", "name", "form", "type", "disabled", "placeholder", "required", "autocomplete", "readonly", "min", "max", "step", "list", "aria-required", "aria-invalid"];
function _sfc_render$q(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("input", mergeProps({
    id: _ctx.computedId,
    ref: "input",
    class: _ctx.classes,
    name: _ctx.name || void 0,
    form: _ctx.form || void 0,
    type: _ctx.localType,
    disabled: _ctx.disabled,
    placeholder: _ctx.placeholder,
    required: _ctx.required,
    autocomplete: _ctx.autocomplete || void 0,
    readonly: _ctx.readonly || _ctx.plaintext,
    min: _ctx.min,
    max: _ctx.max,
    step: _ctx.step,
    list: _ctx.type !== "password" ? _ctx.list : void 0,
    "aria-required": _ctx.required ? "true" : void 0,
    "aria-invalid": _ctx.computedAriaInvalid
  }, _ctx.$attrs, {
    onInput: _cache[0] || (_cache[0] = ($event) => _ctx.onInput($event)),
    onChange: _cache[1] || (_cache[1] = ($event) => _ctx.onChange($event)),
    onBlur: _cache[2] || (_cache[2] = ($event) => _ctx.onBlur($event))
  }), null, 16, _hoisted_1$h);
}
var BFormInput = _export_sfc(_sfc_main$I, [["render", _sfc_render$q]]);
var _sfc_main$H = defineComponent({
  name: "BFormRadio",
  props: {
    ariaLabel: { type: String },
    ariaLabelledBy: { type: String },
    autofocus: { type: Boolean, default: false },
    modelValue: { type: [Boolean, String, Array, Object, Number], default: null },
    plain: { type: Boolean, default: false },
    button: { type: Boolean, default: false },
    switch: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    buttonVariant: { type: String, default: "secondary" },
    form: { type: String },
    id: { type: String },
    inline: { type: Boolean, default: false },
    name: { type: String },
    required: { type: Boolean, default: false },
    size: { type: String },
    state: { type: Boolean, default: null },
    value: { type: [String, Boolean, Object, Number], default: true }
  },
  emits: ["update:modelValue", "change", "input"],
  setup(props, { emit }) {
    const computedId = useId(props.id, "form-check");
    const input = ref(null);
    const isFocused = ref(false);
    const localValue = computed({
      get: () => Array.isArray(props.modelValue) ? props.modelValue[0] : props.modelValue,
      set: (newValue) => {
        const value = newValue ? props.value : false;
        const emitValue = Array.isArray(props.modelValue) ? [value] : value;
        emit("input", emitValue);
        emit("change", emitValue);
        emit("update:modelValue", emitValue);
      }
    });
    const isChecked = computed(() => {
      if (Array.isArray(props.modelValue)) {
        return (props.modelValue || []).find((e) => e === props.value);
      }
      return JSON.stringify(props.modelValue) === JSON.stringify(props.value);
    });
    const classes = getClasses(props);
    const inputClasses = getInputClasses(props);
    const labelClasses = getLabelClasses(props);
    if (props.autofocus) {
      onMounted(() => {
        input.value.focus();
      });
    }
    return {
      localValue,
      computedId,
      classes,
      inputClasses,
      labelClasses,
      isChecked,
      isFocused,
      input
    };
  }
});
var _hoisted_1$g = ["id", "disabled", "required", "name", "form", "aria-label", "aria-labelledby", "value", "aria-required"];
var _hoisted_2$8 = ["for"];
function _sfc_render$p(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.classes)
  }, [
    withDirectives(createBaseVNode("input", mergeProps({ id: _ctx.computedId }, _ctx.$attrs, {
      ref: "input",
      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.localValue = $event),
      class: _ctx.inputClasses,
      type: "radio",
      disabled: _ctx.disabled,
      required: _ctx.name && _ctx.required,
      name: _ctx.name,
      form: _ctx.form,
      "aria-label": _ctx.ariaLabel,
      "aria-labelledby": _ctx.ariaLabelledBy,
      value: _ctx.value,
      "aria-required": _ctx.name && _ctx.required ? "true" : null,
      onFocus: _cache[1] || (_cache[1] = ($event) => _ctx.isFocused = true),
      onBlur: _cache[2] || (_cache[2] = ($event) => _ctx.isFocused = false)
    }), null, 16, _hoisted_1$g), [
      [vModelRadio, _ctx.localValue]
    ]),
    _ctx.$slots.default || !_ctx.plain ? (openBlock(), createElementBlock("label", {
      key: 0,
      for: _ctx.computedId,
      class: normalizeClass([_ctx.labelClasses, { active: _ctx.isChecked, focus: _ctx.isFocused }])
    }, [
      renderSlot(_ctx.$slots, "default")
    ], 10, _hoisted_2$8)) : createCommentVNode("", true)
  ], 2);
}
var BFormRadio = _export_sfc(_sfc_main$H, [["render", _sfc_render$p]]);
var _sfc_main$G = defineComponent({
  name: "BFormRadioGroup",
  props: {
    modelValue: { type: [String, Boolean, Array, Object, Number], default: "" },
    ariaInvalid: { type: [Boolean, String], default: null },
    autofocus: { type: Boolean, default: false },
    buttonVariant: { type: String, default: "secondary" },
    buttons: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    disabledField: { type: String, default: "disabled" },
    form: { type: String },
    htmlField: { type: String, default: "html" },
    id: { type: String },
    name: { type: String },
    options: { type: Array, default: () => [] },
    plain: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    size: { type: String },
    stacked: { type: Boolean, default: false },
    state: { type: Boolean, default: null },
    textField: { type: String, default: "text" },
    validated: { type: Boolean, default: false },
    valueField: { type: String, default: "value" }
  },
  emits: ["update:modelValue", "input", "change"],
  setup(props, { emit, slots }) {
    const slotsName = "BFormRadio";
    const computedId = useId(props.id, "radio");
    const computedName = useId(props.name, "checkbox");
    const localValue = computed({
      get: () => props.modelValue,
      set: (newValue) => {
        emit("input", newValue);
        emit("update:modelValue", newValue);
        emit("change", newValue);
      }
    });
    const checkboxList = computed(() => (slots.first ? slotsToElements(slots.first(), slotsName, props.disabled) : []).concat(props.options.map((e) => optionToElement(e, props))).concat(slots.default ? slotsToElements(slots.default(), slotsName, props.disabled) : []).map((e, idx) => bindGroupProps(e, idx, props, computedName, computedId)).map((e) => __spreadValues2({}, e)));
    const attrs = getGroupAttr(props);
    const classes = getGroupClasses(props);
    return {
      attrs,
      classes,
      checkboxList,
      computedId,
      localValue
    };
  }
});
var _hoisted_1$f = ["id"];
var _hoisted_2$7 = ["innerHTML"];
var _hoisted_3$4 = ["textContent"];
function _sfc_render$o(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_form_radio = resolveComponent("b-form-radio");
  return openBlock(), createElementBlock("div", mergeProps(_ctx.attrs, {
    id: _ctx.computedId,
    role: "radiogroup",
    class: [_ctx.classes, "bv-no-focus-ring"],
    tabindex: "-1"
  }), [
    (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.checkboxList, (item, key) => {
      return openBlock(), createBlock(_component_b_form_radio, mergeProps({
        key,
        modelValue: _ctx.localValue,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.localValue = $event)
      }, item.props), {
        default: withCtx(() => [
          item.html ? (openBlock(), createElementBlock("span", {
            key: 0,
            innerHTML: item.html
          }, null, 8, _hoisted_2$7)) : (openBlock(), createElementBlock("span", {
            key: 1,
            textContent: toDisplayString(item.text)
          }, null, 8, _hoisted_3$4))
        ]),
        _: 2
      }, 1040, ["modelValue"]);
    }), 128))
  ], 16, _hoisted_1$f);
}
var BFormRadioGroup = _export_sfc(_sfc_main$G, [["render", _sfc_render$o]]);
var _sfc_main$F = defineComponent({
  name: "BFormSelectOption",
  props: {
    value: { required: true },
    disabled: { type: Boolean, default: false }
  }
});
var _hoisted_1$e = ["value", "disabled"];
function _sfc_render$n(_ctx, _cache, $props, $setup, $data, $options) {
  var _a;
  return openBlock(), createElementBlock("option", {
    value: (_a = _ctx.value) != null ? _a : "",
    disabled: _ctx.disabled
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 8, _hoisted_1$e);
}
var BFormSelectOption = _export_sfc(_sfc_main$F, [["render", _sfc_render$n]]);
var _getNested = (obj, path) => {
  if (!obj)
    return obj;
  if (path in obj)
    return obj[path];
  const paths = path.split(".");
  return _getNested(obj[paths[0]], paths.splice(1).join("."));
};
var _normalizeOption = (option, key = null, componentName, props) => {
  if (Object.prototype.toString.call(option) === "[object Object]") {
    const value = _getNested(option, props.valueField);
    const text = _getNested(option, props.textField);
    const html = _getNested(option, props.htmlField);
    const disabled = _getNested(option, props.disabledField);
    const options = option[props.optionsField] || null;
    if (options !== null) {
      return {
        label: String(_getNested(option, props.labelField) || text),
        options: normalizeOptions(options, componentName, props)
      };
    }
    return {
      value: typeof value === "undefined" ? key || text : value,
      text: String(typeof text === "undefined" ? key : text),
      html,
      disabled: Boolean(disabled)
    };
  }
  return {
    value: key || option,
    text: String(option),
    disabled: false
  };
};
var normalizeOptions = (options, componentName, props) => {
  if (Array.isArray(options)) {
    return options.map((option) => _normalizeOption(option, null, componentName, props));
  } else if (Object.prototype.toString.call(options) === "[object Object]") {
    console.warn(`[BootstrapVue warn]: ${componentName} - Setting prop "options" to an object is deprecated. Use the array format instead.`);
    return Object.keys(options).map((key) => {
      const el = options[key];
      switch (typeof el) {
        case "object":
          return _normalizeOption(el.text, String(el.value), componentName, props);
        default:
          return _normalizeOption(el, String(key), componentName, props);
      }
    });
  }
  return [];
};
var _sfc_main$E = defineComponent({
  name: "BFormSelectOptionGroup",
  components: { BFormSelectOption },
  props: {
    label: { type: String, required: true },
    disabledField: { type: String, default: "disabled" },
    htmlField: { type: String, default: "html" },
    options: { type: [Array, Object], default: () => [] },
    textField: { type: String, default: "text" },
    valueField: { type: String, default: "value" }
  },
  setup(props) {
    const formOptions = computed(() => normalizeOptions(props.options, "BFormSelectOptionGroup", props));
    return {
      formOptions
    };
  }
});
var _hoisted_1$d = ["label"];
function _sfc_render$m(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_form_select_option = resolveComponent("b-form-select-option");
  return openBlock(), createElementBlock("optgroup", { label: _ctx.label }, [
    renderSlot(_ctx.$slots, "first"),
    (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.formOptions, (option, index) => {
      return openBlock(), createBlock(_component_b_form_select_option, mergeProps({
        key: `option_${index}`,
        value: option.value,
        disabled: option.disabled
      }, _ctx.$attrs, {
        innerHTML: option.html || option.text
      }), null, 16, ["value", "disabled", "innerHTML"]);
    }), 128)),
    renderSlot(_ctx.$slots, "default")
  ], 8, _hoisted_1$d);
}
var BFormSelectOptionGroup = _export_sfc(_sfc_main$E, [["render", _sfc_render$m]]);
var _sfc_main$D = defineComponent({
  name: "BFormSelect",
  components: { BFormSelectOption, BFormSelectOptionGroup },
  props: {
    ariaInvalid: {
      type: [Boolean, String],
      default: false
    },
    autofocus: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    disabledField: { type: String, default: "disabled" },
    form: { type: String, required: false },
    htmlField: { type: String, default: "html" },
    id: { type: String, required: false },
    labelField: { type: String, default: "label" },
    multiple: { type: Boolean, default: false },
    name: { type: String, required: false },
    options: { type: [Array, Object], default: () => [] },
    optionsField: { type: String, default: "options" },
    plain: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    selectSize: { type: Number, default: 0 },
    size: { type: String, required: false },
    state: {
      type: Boolean,
      default: null
    },
    textField: { type: String, default: "text" },
    valueField: { type: String, default: "value" },
    modelValue: { type: [String, Array, Object, Number], default: "" }
  },
  emits: ["update:modelValue", "change", "input"],
  setup(props, { emit }) {
    const input = ref();
    const computedId = useId(props.id, "input");
    const handleAutofocus = () => {
      nextTick(() => {
        var _a;
        if (props.autofocus)
          (_a = input.value) == null ? void 0 : _a.focus();
      });
    };
    onMounted(handleAutofocus);
    onActivated(handleAutofocus);
    const classes = computed(() => ({
      "form-control": props.plain,
      [`form-control-${props.size}`]: props.size && props.plain,
      "form-select": !props.plain,
      [`form-select-${props.size}`]: props.size && !props.plain,
      "is-valid": props.state === true,
      "is-invalid": props.state === false
    }));
    const computedSelectSize = computed(() => {
      if (props.selectSize || props.plain) {
        return props.selectSize;
      }
      return null;
    });
    const computedAriaInvalid = computed(() => {
      if (props.ariaInvalid) {
        return props.ariaInvalid.toString();
      }
      return props.state === false ? "true" : null;
    });
    const formOptions = computed(() => normalizeOptions(props.options, "BFormSelect", props));
    const localValue = computed({
      get() {
        return props.modelValue;
      },
      set(newValue) {
        emit("change", newValue);
        emit("update:modelValue", newValue);
        emit("input", newValue);
      }
    });
    const focus2 = () => {
      var _a;
      if (!props.disabled)
        (_a = input.value) == null ? void 0 : _a.focus();
    };
    const blur = () => {
      var _a;
      if (!props.disabled) {
        (_a = input.value) == null ? void 0 : _a.blur();
      }
    };
    return {
      input,
      computedId,
      computedSelectSize,
      computedAriaInvalid,
      classes,
      formOptions,
      localValue,
      focus: focus2,
      blur
    };
  }
});
var _hoisted_1$c = ["id", "name", "form", "multiple", "size", "disabled", "required", "aria-required", "aria-invalid"];
function _sfc_render$l(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_form_select_option_group = resolveComponent("b-form-select-option-group");
  const _component_b_form_select_option = resolveComponent("b-form-select-option");
  return withDirectives((openBlock(), createElementBlock("select", mergeProps({
    id: _ctx.computedId,
    ref: "input"
  }, _ctx.$attrs, {
    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.localValue = $event),
    class: _ctx.classes,
    name: _ctx.name,
    form: _ctx.form || null,
    multiple: _ctx.multiple || null,
    size: _ctx.computedSelectSize,
    disabled: _ctx.disabled,
    required: _ctx.required,
    "aria-required": _ctx.required ? "true" : null,
    "aria-invalid": _ctx.computedAriaInvalid
  }), [
    renderSlot(_ctx.$slots, "first"),
    (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.formOptions, (option, index) => {
      return openBlock(), createElementBlock(Fragment, null, [
        Array.isArray(option.options) ? (openBlock(), createBlock(_component_b_form_select_option_group, {
          key: `option_${index}`,
          label: option.label,
          options: option.options
        }, null, 8, ["label", "options"])) : (openBlock(), createBlock(_component_b_form_select_option, {
          key: `option2_${index}`,
          value: option.value,
          disabled: option.disabled,
          innerHTML: option.html || option.text
        }, null, 8, ["value", "disabled", "innerHTML"]))
      ], 64);
    }), 256)),
    renderSlot(_ctx.$slots, "default")
  ], 16, _hoisted_1$c)), [
    [vModelSelect, _ctx.localValue]
  ]);
}
var BFormSelect = _export_sfc(_sfc_main$D, [["render", _sfc_render$l]]);
var _hoisted_1$b = ["id"];
var _hoisted_2$6 = ["aria-label", "aria-controls", "aria-describedby"];
var _sfc_main$C = defineComponent({
  props: {
    disabled: { type: Boolean, default: false },
    id: { type: String },
    noRemove: { type: Boolean, default: false },
    pill: { type: Boolean, default: false },
    removeLabel: { type: String, default: "Remove tag" },
    tag: { type: String, default: "span" },
    title: { type: String },
    variant: { type: String, default: "secondary" }
  },
  emits: ["remove"],
  setup(__props) {
    const props = __props;
    const slots = useSlots();
    const tagText = computed(() => {
      var _a;
      return ((_a = slots.default) == null ? void 0 : _a.call(slots)[0].children) || props.title;
    });
    const computedId = useId(props.id);
    const taglabelId = computed(() => `${computedId.value}taglabel__`);
    const classes = computed(() => [
      `bg-${props.variant}`,
      {
        "text-dark": ["warning", "info", "light"].includes(props.variant),
        "rounded-pill": props.pill,
        "disabled": props.disabled
      }
    ]);
    return (_ctx, _cache) => {
      return openBlock(), createBlock(resolveDynamicComponent(__props.tag), {
        id: unref(computedId),
        title: unref(tagText),
        class: normalizeClass(["badge b-form-tag d-inline-flex align-items-center mw-100", unref(classes)]),
        "aria-labelledby": unref(taglabelId)
      }, {
        default: withCtx(() => [
          createBaseVNode("span", {
            id: unref(taglabelId),
            class: "b-form-tag-content flex-grow-1 text-truncate"
          }, [
            renderSlot(_ctx.$slots, "default", {}, () => [
              createTextVNode(toDisplayString(unref(tagText)), 1)
            ])
          ], 8, _hoisted_1$b),
          !__props.disabled && !__props.noRemove ? (openBlock(), createElementBlock("button", {
            key: 0,
            "aria-keyshortcuts": "Delete",
            type: "button",
            "aria-label": __props.removeLabel,
            class: normalizeClass(["btn-close b-form-tag-remove", {
              "btn-close-white": !["warning", "info", "light"].includes(__props.variant)
            }]),
            "aria-controls": __props.id,
            "aria-describedby": unref(taglabelId),
            onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("remove", unref(tagText)))
          }, null, 10, _hoisted_2$6)) : createCommentVNode("", true)
        ]),
        _: 3
      }, 8, ["id", "title", "class", "aria-labelledby"]);
    };
  }
});
var _hoisted_1$a = ["id"];
var _hoisted_2$5 = ["id", "for", "aria-live"];
var _hoisted_3$3 = ["id", "aria-live"];
var _hoisted_4$2 = ["id"];
var _hoisted_5$2 = ["aria-controls"];
var _hoisted_6$1 = {
  role: "group",
  class: "d-flex"
};
var _hoisted_7 = ["id", "disabled", "value", "type", "placeholder", "form", "required"];
var _hoisted_8 = ["disabled"];
var _hoisted_9 = {
  "aria-live": "polite",
  "aria-atomic": "true"
};
var _hoisted_10 = {
  key: 0,
  class: "d-block invalid-feedback"
};
var _hoisted_11 = {
  key: 1,
  class: "form-text text-muted"
};
var _hoisted_12 = {
  key: 2,
  class: "form-text text-muted"
};
var _hoisted_13 = ["name", "value"];
var _sfc_main$B = defineComponent({
  props: {
    addButtonText: { type: String, default: "Add" },
    addButtonVariant: { type: String, default: "outline-secondary" },
    addOnChange: { type: Boolean, default: false },
    autofocus: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    duplicateTagText: { type: String, default: "Duplicate tag(s)" },
    inputAttrs: { type: Object },
    inputClass: { type: [Array, Object, String] },
    inputId: { type: String },
    inputType: { type: String, default: "text" },
    invalidTagText: { type: String, default: "Invalid tag(s)" },
    form: { type: String },
    limit: { type: Number },
    limitTagsText: { type: String, default: "Tag limit reached" },
    modelValue: { type: Array, default: () => [] },
    name: { type: String },
    noAddOnEnter: { type: Boolean, default: false },
    noOuterFocus: { type: Boolean, default: false },
    noTagRemove: { type: Boolean, default: false },
    placeholder: { type: String, default: "Add tag..." },
    removeOnDelete: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    separator: { type: [String, Array] },
    state: { type: Boolean, default: null },
    size: { type: String },
    tagClass: { type: [String, Array, Object] },
    tagPills: { type: Boolean, default: false },
    tagRemoveLabel: { type: String },
    tagRemovedLabel: { type: String, default: "Tag removed" },
    tagValidator: { type: Function, default: () => true },
    tagVariant: { type: String, default: "secondary" }
  },
  emits: [
    "update:modelValue",
    "input",
    "tag-state",
    "focus",
    "focusin",
    "focusout",
    "blur"
  ],
  setup(__props, { emit }) {
    const props = __props;
    const input = ref(null);
    const computedId = useId();
    const _inputId = computed(() => props.inputId || `${computedId.value}input__`);
    onMounted(() => {
      checkAutofocus();
      if (props.modelValue.length > 0) {
        shouldRemoveOnDelete.value = true;
      }
    });
    onActivated(() => checkAutofocus());
    watch(() => props.modelValue, (newVal) => {
      tags.value = newVal;
    });
    const tags = ref(props.modelValue);
    const inputValue = ref("");
    const shouldRemoveOnDelete = ref(false);
    const focus2 = ref(false);
    const lastRemovedTag = ref("");
    const validTags = ref([]);
    const invalidTags = ref([]);
    const duplicateTags = ref([]);
    const classes = computed(() => ({
      [`form-control-${props.size}`]: props.size,
      "disabled": props.disabled,
      "focus": focus2.value,
      "is-invalid": props.state === false,
      "is-valid": props.state === true
    }));
    const isDuplicate = computed(() => tags.value.includes(inputValue.value));
    const isInvalid = computed(() => inputValue.value === "" ? false : !props.tagValidator(inputValue.value));
    const isLimitReached = computed(() => tags.value.length === props.limit);
    const disableAddButton = computed(() => !isInvalid.value && !isDuplicate.value);
    function checkAutofocus() {
      var _a;
      if (props.autofocus) {
        (_a = input.value) == null ? void 0 : _a.focus();
      }
    }
    function onFocusin(e) {
      if (props.disabled) {
        const target = e.target;
        target.blur();
        return;
      }
      emit("focusin", e);
    }
    function onFocus(e) {
      if (props.disabled || props.noOuterFocus) {
        return;
      }
      focus2.value = true;
      emit("focus", e);
    }
    function onBlur(e) {
      focus2.value = false;
      emit("blur", e);
    }
    function onInput(e) {
      var _a, _b;
      const value = typeof e === "string" ? e : e.target.value;
      shouldRemoveOnDelete.value = false;
      if (((_a = props.separator) == null ? void 0 : _a.includes(value.charAt(0))) && value.length > 0) {
        if (input.value) {
          input.value.value = "";
        }
        return;
      }
      inputValue.value = value;
      if ((_b = props.separator) == null ? void 0 : _b.includes(value.charAt(value.length - 1))) {
        addTag(value.slice(0, value.length - 1));
        return;
      }
      validTags.value = props.tagValidator(value) && !isDuplicate.value ? [value] : [];
      invalidTags.value = props.tagValidator(value) ? [] : [value];
      duplicateTags.value = isDuplicate.value ? [value] : [];
      emit("tag-state", validTags, invalidTags, duplicateTags);
    }
    function onChange(e) {
      if (props.addOnChange) {
        onInput(e);
        if (!isDuplicate.value) {
          addTag(inputValue.value);
        }
      }
    }
    function onKeydown(e) {
      if (e.key === "Enter" && !props.noAddOnEnter) {
        addTag(inputValue.value);
        return;
      }
      if ((e.key === "Backspace" || e.key === "Delete") && props.removeOnDelete && inputValue.value === "" && shouldRemoveOnDelete.value && tags.value.length > 0) {
        removeTag(tags.value[tags.value.length - 1]);
      } else {
        shouldRemoveOnDelete.value = true;
      }
    }
    function addTag(tag) {
      var _a;
      tag = (tag || inputValue.value).trim();
      if (tag === "" || isDuplicate.value || !props.tagValidator(tag) || props.limit && isLimitReached.value) {
        return;
      }
      const newValue = [...props.modelValue, tag];
      inputValue.value = "";
      shouldRemoveOnDelete.value = true;
      emit("update:modelValue", newValue);
      emit("input", newValue);
      (_a = input.value) == null ? void 0 : _a.focus();
    }
    function removeTag(tag) {
      const tagIndex = tags.value.indexOf(tag);
      lastRemovedTag.value = tags.value.splice(tagIndex, 1).toString();
      emit("update:modelValue", tags.value);
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        id: unref(computedId),
        class: normalizeClass(["b-form-tags form-control h-auto", unref(classes)]),
        role: "group",
        tabindex: "-1",
        onFocusin,
        onFocusout: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("focusout", $event))
      }, [
        createBaseVNode("output", {
          id: `${unref(computedId)}selected_tags__`,
          class: "visually-hidden",
          role: "status",
          for: unref(_inputId),
          "aria-live": focus2.value ? "polite" : "off",
          "aria-atomic": "true",
          "aria-relevant": "additions text"
        }, toDisplayString(tags.value.join(", ")), 9, _hoisted_2$5),
        createBaseVNode("div", {
          id: `${unref(computedId)}removed_tags__`,
          role: "status",
          "aria-live": focus2.value ? "assertive" : "off",
          "aria-atomic": "true",
          class: "visually-hidden"
        }, " (" + toDisplayString(__props.tagRemovedLabel) + ") " + toDisplayString(lastRemovedTag.value), 9, _hoisted_3$3),
        renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps({
          addButtonText: __props.addButtonText,
          addButtonVariant: __props.addButtonVariant,
          addTag,
          disableAddButton: unref(disableAddButton),
          disabled: __props.disabled,
          duplicateTagText: __props.duplicateTagText,
          duplicateTags: duplicateTags.value,
          form: __props.form,
          inputAttrs: __spreadProps2(__spreadValues2({}, __props.inputAttrs), {
            disabled: __props.disabled,
            form: __props.form,
            id: unref(_inputId),
            value: inputValue.value
          }),
          inputHandlers: {
            input: onInput,
            keydown: onKeydown,
            change: onChange
          },
          inputId: unref(_inputId),
          inputType: __props.inputType,
          invalidTagText: __props.invalidTagText,
          invalidTags: invalidTags.value,
          isDuplicate: unref(isDuplicate),
          isInvalid: unref(isInvalid),
          isLimitReached: unref(isLimitReached),
          limitTagsText: __props.limitTagsText,
          limit: __props.limit,
          noTagRemove: __props.noTagRemove,
          placeholder: __props.placeholder,
          removeTag,
          required: __props.required,
          separator: __props.separator,
          size: __props.size,
          state: __props.state,
          tagClass: __props.tagClass,
          tagPills: __props.tagPills,
          tagRemoveLabel: __props.tagRemoveLabel,
          tagVariant: __props.tagVariant,
          tags: tags.value
        })), () => [
          createBaseVNode("ul", {
            id: `${unref(computedId)}tag_list__`,
            class: "b-form-tags-list list-unstyled mb-0 d-flex flex-wrap align-items-center"
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(tags.value, (tag) => {
              return openBlock(), createBlock(_sfc_main$C, {
                key: tag,
                class: normalizeClass(__props.tagClass),
                tag: "li",
                variant: __props.tagVariant,
                pill: __props.tagPills,
                onRemove: removeTag
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(tag), 1)
                ]),
                _: 2
              }, 1032, ["class", "variant", "pill"]);
            }), 128)),
            createBaseVNode("li", {
              role: "none",
              "aria-live": "off",
              class: "b-from-tags-field flex-grow-1",
              "aria-controls": `${unref(computedId)}tag_list__`
            }, [
              createBaseVNode("div", _hoisted_6$1, [
                createBaseVNode("input", mergeProps({
                  id: unref(_inputId),
                  ref_key: "input",
                  ref: input,
                  disabled: __props.disabled,
                  value: inputValue.value,
                  type: __props.inputType,
                  placeholder: __props.placeholder,
                  class: "b-form-tags-input w-100 flex-grow-1 p-0 m-0 bg-transparent border-0",
                  style: { "outline": "currentcolor none 0px", "min-width": "5rem" }
                }, __props.inputAttrs, {
                  form: __props.form,
                  required: __props.required,
                  onInput,
                  onChange,
                  onKeydown,
                  onFocus,
                  onBlur
                }), null, 16, _hoisted_7),
                unref(disableAddButton) ? (openBlock(), createElementBlock("button", {
                  key: 0,
                  type: "button",
                  class: normalizeClass(["btn b-form-tags-button py-0", [
                    `btn-${__props.addButtonVariant}`,
                    {
                      "disabled invisible": inputValue.value.length === 0
                    },
                    __props.inputClass
                  ]]),
                  style: { "font-size": "90%" },
                  disabled: __props.disabled || inputValue.value.length === 0 || unref(isLimitReached),
                  onClick: _cache[0] || (_cache[0] = ($event) => addTag(inputValue.value))
                }, [
                  renderSlot(_ctx.$slots, "add-button-text", {}, () => [
                    createTextVNode(toDisplayString(__props.addButtonText), 1)
                  ])
                ], 10, _hoisted_8)) : createCommentVNode("", true)
              ])
            ], 8, _hoisted_5$2)
          ], 8, _hoisted_4$2),
          createBaseVNode("div", _hoisted_9, [
            unref(isInvalid) ? (openBlock(), createElementBlock("div", _hoisted_10, toDisplayString(__props.invalidTagText) + ": " + toDisplayString(inputValue.value), 1)) : createCommentVNode("", true),
            unref(isDuplicate) ? (openBlock(), createElementBlock("small", _hoisted_11, toDisplayString(__props.duplicateTagText) + ": " + toDisplayString(inputValue.value), 1)) : createCommentVNode("", true),
            tags.value.length === __props.limit ? (openBlock(), createElementBlock("small", _hoisted_12, "Tag limit reached")) : createCommentVNode("", true)
          ])
        ]),
        __props.name ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(tags.value, (tag) => {
          return openBlock(), createElementBlock("input", {
            key: tag,
            type: "hidden",
            name: __props.name,
            value: tag
          }, null, 8, _hoisted_13);
        }), 128)) : createCommentVNode("", true)
      ], 42, _hoisted_1$a);
    };
  }
});
var _sfc_main$A = defineComponent({
  name: "BFormTextarea",
  props: __spreadProps2(__spreadValues2({}, COMMON_INPUT_PROPS), {
    noResize: { type: Boolean, default: false },
    rows: { type: [String, Number], required: false, default: 2 },
    wrap: { type: String, default: "soft" }
  }),
  emits: ["update:modelValue", "change", "blur", "input"],
  setup(props, { emit }) {
    const classes = computed(() => ({
      "form-control": !props.plaintext,
      "form-control-plaintext": props.plaintext,
      [`form-control-${props.size}`]: props.size,
      "is-valid": props.state === true,
      "is-invalid": props.state === false
    }));
    const computedStyles = computed(() => props.noResize ? { resize: "none" } : void 0);
    const { input, computedId, computedAriaInvalid, onInput, onChange, onBlur, focus: focus2, blur } = useFormInput(props, emit);
    return {
      input,
      computedId,
      computedAriaInvalid,
      onInput,
      onChange,
      onBlur,
      focus: focus2,
      blur,
      classes,
      computedStyles
    };
  }
});
var _hoisted_1$9 = ["id", "name", "form", "disabled", "placeholder", "required", "autocomplete", "readonly", "aria-required", "aria-invalid", "rows", "wrap"];
function _sfc_render$k(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("textarea", mergeProps({
    id: _ctx.computedId,
    ref: "input",
    class: _ctx.classes,
    name: _ctx.name || void 0,
    form: _ctx.form || void 0,
    disabled: _ctx.disabled,
    placeholder: _ctx.placeholder,
    required: _ctx.required,
    autocomplete: _ctx.autocomplete || void 0,
    readonly: _ctx.readonly || _ctx.plaintext,
    "aria-required": _ctx.required ? "true" : void 0,
    "aria-invalid": _ctx.computedAriaInvalid,
    rows: _ctx.rows,
    style: _ctx.computedStyles,
    wrap: _ctx.wrap || void 0
  }, _ctx.$attrs, {
    onInput: _cache[0] || (_cache[0] = ($event) => _ctx.onInput($event)),
    onChange: _cache[1] || (_cache[1] = ($event) => _ctx.onChange($event)),
    onBlur: _cache[2] || (_cache[2] = ($event) => _ctx.onBlur($event))
  }), null, 16, _hoisted_1$9);
}
var BFormTextarea = _export_sfc(_sfc_main$A, [["render", _sfc_render$k]]);
var BLANK_TEMPLATE = '<svg width="%{w}" height="%{h}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 %{w} %{h}" preserveAspectRatio="none"><rect width="100%" height="100%" style="fill:%{f};"></rect></svg>';
var makeBlankImgSrc = (width, height, color) => {
  const src = encodeURIComponent(BLANK_TEMPLATE.replace("%{w}", String(width)).replace("%{h}", String(height)).replace("%{f}", color));
  return `data:image/svg+xml;charset=UTF-8,${src}`;
};
var _sfc_main$z = defineComponent({
  name: "BImg",
  props: {
    alt: { type: String, default: void 0 },
    blank: { type: Boolean, default: false },
    blankColor: { type: String, default: "transparent" },
    block: { type: Boolean, default: false },
    center: { type: Boolean, default: false },
    fluid: { type: Boolean, default: false },
    fluidGrow: { type: Boolean, default: false },
    height: { type: [Number, String], required: false },
    left: { type: Boolean, default: false },
    right: { type: Boolean, default: false },
    rounded: { type: [Boolean, String], default: false },
    sizes: { type: [String, Array], required: false },
    src: { type: String, required: false },
    srcset: { type: [String, Array], required: false },
    thumbnail: { type: Boolean, default: false },
    width: { type: [Number, String], required: false }
  },
  setup(props) {
    const attrs = computed(() => {
      let src = props.src;
      let width = (typeof props.width === "number" ? props.width : parseInt(props.width, 10)) || null;
      let height = (typeof props.height === "number" ? props.height : parseInt(props.height, 10)) || null;
      let srcset = "";
      if (typeof props.srcset === "string")
        srcset = props.srcset.split(",").filter((x) => x).join(",");
      else if (Array.isArray(props.srcset))
        srcset = props.srcset.filter((x) => x).join(",");
      let sizes = "";
      if (typeof props.sizes === "string")
        sizes = props.sizes.split(",").filter((x) => x).join(",");
      else if (Array.isArray(props.sizes))
        sizes = props.sizes.filter((x) => x).join(",");
      if (props.blank) {
        if (!height && width) {
          height = width;
        } else if (!width && height) {
          width = height;
        }
        if (!width && !height) {
          width = 1;
          height = 1;
        }
        src = makeBlankImgSrc(width, height, props.blankColor || "transparent");
        srcset = "";
        sizes = "";
      }
      return {
        src,
        alt: props.alt,
        width: width || null,
        height: height || null,
        srcset: srcset || null,
        sizes: sizes || null
      };
    });
    const classes = computed(() => {
      let align = "";
      let block = props.block;
      if (props.left) {
        align = "float-start";
      } else if (props.right) {
        align = "float-end";
      } else if (props.center) {
        align = "mx-auto";
        block = true;
      }
      return {
        "img-thumbnail": props.thumbnail,
        "img-fluid": props.fluid || props.fluidGrow,
        "w-100": props.fluidGrow,
        "rounded": props.rounded === "" || props.rounded === true,
        [`rounded-${props.rounded}`]: typeof props.rounded === "string" && props.rounded !== "",
        [align]: !!align,
        "d-block": block
      };
    });
    return {
      attrs,
      classes
    };
  }
});
function _sfc_render$j(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("img", mergeProps({ class: _ctx.classes }, _ctx.attrs), null, 16);
}
var BImg = _export_sfc(_sfc_main$z, [["render", _sfc_render$j]]);
var _sfc_main$y = defineComponent({
  name: "BInputGroup",
  props: {
    append: { type: String, required: false },
    appendHtml: { type: String, required: false },
    id: { type: String, required: false },
    prepend: { type: String, required: false },
    prependHtml: { type: String, required: false },
    size: { type: String, required: false },
    tag: { type: String, default: "div" }
  },
  setup(props) {
    const classes = computed(() => ({
      "input-group-sm": props.size === "sm",
      "input-group-lg": props.size === "lg"
    }));
    const hasAppend = computed(() => props.append || props.appendHtml);
    const hasPrepend = computed(() => props.prepend || props.prependHtml);
    const showAppendHtml = computed(() => !!props.appendHtml);
    const showPrependHtml = computed(() => !!props.prependHtml);
    return {
      classes,
      hasAppend,
      hasPrepend,
      showAppendHtml,
      showPrependHtml
    };
  }
});
var _hoisted_1$8 = {
  key: 0,
  class: "input-group-text"
};
var _hoisted_2$4 = { key: 0 };
var _hoisted_3$2 = ["innerHTML"];
var _hoisted_4$1 = {
  key: 0,
  class: "input-group-text"
};
var _hoisted_5$1 = { key: 0 };
var _hoisted_6 = ["innerHTML"];
function _sfc_render$i(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.tag), {
    id: _ctx.id,
    class: normalizeClass(["input-group", _ctx.classes]),
    role: "group"
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "prepend", {}, () => [
        _ctx.hasPrepend ? (openBlock(), createElementBlock("span", _hoisted_1$8, [
          !_ctx.showPrependHtml ? (openBlock(), createElementBlock("span", _hoisted_2$4, toDisplayString(_ctx.prepend), 1)) : createCommentVNode("", true),
          _ctx.showPrependHtml ? (openBlock(), createElementBlock("span", {
            key: 1,
            innerHTML: _ctx.prependHtml
          }, null, 8, _hoisted_3$2)) : createCommentVNode("", true)
        ])) : createCommentVNode("", true)
      ]),
      renderSlot(_ctx.$slots, "default"),
      renderSlot(_ctx.$slots, "append", {}, () => [
        _ctx.hasAppend ? (openBlock(), createElementBlock("span", _hoisted_4$1, [
          !_ctx.showAppendHtml ? (openBlock(), createElementBlock("span", _hoisted_5$1, toDisplayString(_ctx.append), 1)) : createCommentVNode("", true),
          _ctx.showAppendHtml ? (openBlock(), createElementBlock("span", {
            key: 1,
            innerHTML: _ctx.appendHtml
          }, null, 8, _hoisted_6)) : createCommentVNode("", true)
        ])) : createCommentVNode("", true)
      ])
    ]),
    _: 3
  }, 8, ["id", "class"]);
}
var BInputGroup = _export_sfc(_sfc_main$y, [["render", _sfc_render$i]]);
var _sfc_main$x = defineComponent({
  name: "BInputGroupText",
  props: {
    tag: { type: String, default: "div" }
  }
});
function _sfc_render$h(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.tag), { class: "input-group-text" }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  });
}
var BInputGroupText = _export_sfc(_sfc_main$x, [["render", _sfc_render$h]]);
var _sfc_main$w = defineComponent({
  name: "BInputGroupAddon",
  components: { BInputGroupText },
  props: {
    append: { type: Boolean, default: false },
    id: { type: String, required: false },
    isText: { type: Boolean, default: false },
    tag: { type: String, default: "div" }
  },
  setup(props) {
    const computedClasses = computed(() => ({
      "input-group-append": props.append,
      "input-group-prepend": !props.append
    }));
    return {
      computedClasses
    };
  }
});
function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_input_group_text = resolveComponent("b-input-group-text");
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.tag), {
    id: _ctx.id,
    class: normalizeClass(["d-flex", _ctx.computedClasses])
  }, {
    default: withCtx(() => [
      _ctx.isText ? (openBlock(), createBlock(_component_b_input_group_text, { key: 0 }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      })) : createCommentVNode("", true),
      !_ctx.isText ? renderSlot(_ctx.$slots, "default", { key: 1 }) : createCommentVNode("", true)
    ]),
    _: 3
  }, 8, ["id", "class"]);
}
var BInputGroupAddon = _export_sfc(_sfc_main$w, [["render", _sfc_render$g]]);
var _sfc_main$v = defineComponent({
  name: "BInputGroupAppend",
  components: { BInputGroupAddon },
  props: {
    id: { type: String, required: false },
    isText: { type: Boolean, default: false },
    tag: { type: String, default: "div" }
  }
});
function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_input_group_addon = resolveComponent("b-input-group-addon");
  return openBlock(), createBlock(_component_b_input_group_addon, {
    id: _ctx.id,
    "is-text": _ctx.isText,
    tag: _ctx.tag,
    append: ""
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 8, ["id", "is-text", "tag"]);
}
var BInputGroupAppend = _export_sfc(_sfc_main$v, [["render", _sfc_render$f]]);
var _sfc_main$u = defineComponent({
  name: "BInputGroupPrepend",
  components: { BInputGroupAddon },
  props: {
    id: { type: String, required: false },
    isText: { type: Boolean, default: false },
    tag: { type: String, default: "div" }
  }
});
function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_input_group_addon = resolveComponent("b-input-group-addon");
  return openBlock(), createBlock(_component_b_input_group_addon, {
    id: _ctx.id,
    "is-text": _ctx.isText,
    tag: _ctx.tag,
    append: false
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 8, ["id", "is-text", "tag"]);
}
var BInputGroupPrepend = _export_sfc(_sfc_main$u, [["render", _sfc_render$e]]);
var injectionKey$2 = Symbol();
var _sfc_main$t = defineComponent({
  name: "BListGroup",
  props: {
    flush: { type: Boolean, default: false },
    horizontal: { type: [Boolean, String], default: false },
    numbered: { type: Boolean, default: false },
    tag: { type: String, default: "div" }
  },
  setup(props) {
    const classes = computed(() => {
      const horizontal = props.flush ? false : props.horizontal;
      return {
        "list-group-flush": props.flush,
        "list-group-horizontal": horizontal === true,
        [`list-group-horizontal-${horizontal}`]: typeof horizontal === "string",
        "list-group-numbered": props.numbered
      };
    });
    const calculateTag = () => props.numbered === true ? "ol" : props.tag;
    const computedTag = ref(calculateTag());
    watch(() => props.tag, () => computedTag.value = calculateTag());
    watch(() => props.numbered, () => computedTag.value = calculateTag());
    provide(injectionKey$2, {
      numbered: props.numbered
    });
    return {
      classes,
      computedTag
    };
  }
});
function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.computedTag), {
    class: normalizeClass(["list-group", _ctx.classes])
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 8, ["class"]);
}
var BListGroup = _export_sfc(_sfc_main$t, [["render", _sfc_render$d]]);
var ACTION_TAGS = ["a", "router-link", "button", "b-link"];
var _sfc_main$s = defineComponent({
  name: "BListGroupItem",
  props: {
    action: { type: Boolean, default: false },
    active: { type: Boolean, default: false },
    button: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    href: { type: String },
    tag: { type: String, default: "div" },
    target: { type: String, default: "_self" },
    variant: { type: String }
  },
  setup(props, context) {
    const parentData = inject(injectionKey$2, null);
    const link = computed(() => !props.button && props.href);
    const tagComputed = computed(() => (parentData == null ? void 0 : parentData.numbered) ? "li" : props.button ? "button" : !link.value ? props.tag : "a");
    const classes = computed(() => {
      const action = props.action || link.value || props.button || ACTION_TAGS.includes(props.tag);
      return {
        [`list-group-item-${props.variant}`]: props.variant,
        "list-group-item-action": action,
        "active": props.active,
        "disabled": props.disabled
      };
    });
    const attrs = computed(() => {
      const attrs2 = {};
      if (props.button) {
        if (!context.attrs || !context.attrs.type) {
          attrs2.type = "button";
        }
        if (props.disabled) {
          attrs2.disabled = true;
        }
      }
      return attrs2;
    });
    return {
      tagComputed,
      classes,
      attrs,
      link
    };
  }
});
function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.tagComputed), mergeProps({
    class: ["list-group-item", _ctx.classes],
    "aria-current": _ctx.active ? true : null,
    "aria-disabled": _ctx.disabled ? true : null,
    target: _ctx.link ? _ctx.target : null,
    href: !_ctx.button ? _ctx.href : null
  }, _ctx.attrs), {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 16, ["class", "aria-current", "aria-disabled", "target", "href"]);
}
var BListGroupItem = _export_sfc(_sfc_main$s, [["render", _sfc_render$c]]);
var _sfc_main$r = defineComponent({
  name: "BModal",
  components: { BButton },
  inheritAttrs: false,
  props: {
    bodyBgVariant: { type: String, required: false },
    bodyClass: { type: String, required: false },
    bodyTextVariant: { type: String, required: false },
    busy: { type: Boolean, default: false },
    buttonSize: { type: String, default: "md" },
    cancelDisabled: { type: Boolean, default: false },
    cancelTitle: { type: String, default: "Cancel" },
    cancelVariant: { type: String, default: "secondary" },
    centered: { type: Boolean, default: false },
    contentClass: { type: String, required: false },
    dialogClass: { type: String, required: false },
    footerBgVariant: { type: String, required: false },
    footerBorderVariant: { type: String, required: false },
    footerClass: { type: String, required: false },
    footerTextVariant: { type: String, required: false },
    fullscreen: { type: [Boolean, String], default: false },
    headerBgVariant: { type: String, required: false },
    headerBorderVariant: { type: String, required: false },
    headerClass: { type: String, required: false },
    headerCloseLabel: { type: String, default: "Close" },
    headerCloseWhite: { type: Boolean, default: false },
    headerTextVariant: { type: String, required: false },
    hideBackdrop: { type: Boolean, default: false },
    hideFooter: { type: Boolean, default: false },
    hideHeader: { type: Boolean, default: false },
    hideHeaderClose: { type: Boolean, default: false },
    id: { type: String, required: false },
    modalClass: { type: String, required: false },
    modelValue: { type: Boolean, default: false },
    noCloseOnBackdrop: { type: Boolean, default: false },
    noCloseOnEsc: { type: Boolean, default: false },
    noFade: { type: Boolean, default: false },
    noFocus: { type: Boolean, default: false },
    okDisabled: { type: Boolean, default: false },
    okOnly: { type: Boolean, default: false },
    okTitle: { type: String, default: "Ok" },
    okVariant: { type: String, default: "primary" },
    scrollable: { type: Boolean, default: false },
    show: { type: Boolean, default: false },
    size: { type: String, required: false },
    title: { type: String, required: false },
    titleClass: { type: String, required: false },
    titleSrOnly: { type: Boolean, default: false },
    titleTag: { type: String, default: "h5" }
  },
  emits: ["update:modelValue", "show", "shown", "hide", "hidden", "hide-prevented", "ok", "cancel"],
  setup(props, { emit, slots }) {
    const element = ref();
    const instance = ref();
    const modalClasses = computed(() => [
      {
        fade: !props.noFade,
        show: props.show
      },
      props.modalClass
    ]);
    const modalDialogClasses = computed(() => [
      {
        "modal-fullscreen": typeof props.fullscreen === "boolean" ? props.fullscreen : false,
        [`modal-fullscreen-${props.fullscreen}-down`]: typeof props.fullscreen === "string" ? props.fullscreen : false,
        [`modal-${props.size}`]: props.size,
        "modal-dialog-centered": props.centered,
        "modal-dialog-scrollable": props.scrollable
      },
      props.dialogClass
    ]);
    const computedBodyClasses = computed(() => [
      {
        [`bg-${props.bodyBgVariant}`]: props.bodyBgVariant,
        [`text-${props.bodyTextVariant}`]: props.bodyTextVariant
      },
      props.bodyClass
    ]);
    const computedHeaderClasses = computed(() => [
      {
        [`bg-${props.headerBgVariant}`]: props.headerBgVariant,
        [`border-${props.headerBorderVariant}`]: props.headerBorderVariant,
        [`text-${props.headerTextVariant}`]: props.headerTextVariant
      },
      props.headerClass
    ]);
    const computedFooterClasses = computed(() => [
      {
        [`bg-${props.footerBgVariant}`]: props.footerBgVariant,
        [`border-${props.footerBorderVariant}`]: props.footerBorderVariant,
        [`text-${props.footerTextVariant}`]: props.footerTextVariant
      },
      props.footerClass
    ]);
    const computedTitleClasses = computed(() => [
      {
        ["visually-hidden"]: props.titleSrOnly
      },
      props.titleClass
    ]);
    const hasHeaderCloseSlot = computed(() => !!slots["header-close"]);
    const computedCloseButtonClasses = computed(() => [
      {
        [`btn-close-content`]: hasHeaderCloseSlot.value,
        [`d-flex`]: hasHeaderCloseSlot.value,
        [`btn-close-white`]: !hasHeaderCloseSlot.value && props.headerCloseWhite
      }
    ]);
    const disableCancel = computed(() => props.cancelDisabled || props.busy);
    const disableOk = computed(() => props.okDisabled || props.busy);
    useEventListener(element, "shown.bs.modal", (e) => emit("shown", e));
    useEventListener(element, "hidden.bs.modal", (e) => emit("hidden", e));
    useEventListener(element, "hidePrevented.bs.modal", (e) => emit("hide-prevented", e));
    useEventListener(element, "show.bs.modal", (e) => {
      emit("show", e);
      if (!e.defaultPrevented) {
        emit("update:modelValue", true);
      }
    });
    useEventListener(element, "hide.bs.modal", (e) => {
      emit("hide", e);
      if (!e.defaultPrevented) {
        emit("update:modelValue", false);
      }
    });
    onMounted(() => {
      var _a;
      instance.value = new import_modal.default(element.value, {
        backdrop: props.hideBackdrop ? false : props.noCloseOnBackdrop ? "static" : !props.hideBackdrop,
        keyboard: !props.noCloseOnEsc,
        focus: !props.noFocus
      });
      if (props.modelValue) {
        (_a = instance.value) == null ? void 0 : _a.show();
      }
    });
    watch(() => props.modelValue, (value) => {
      var _a, _b;
      if (value) {
        (_a = instance.value) == null ? void 0 : _a.show();
      } else {
        (_b = instance.value) == null ? void 0 : _b.hide();
      }
    });
    return {
      element,
      disableCancel,
      disableOk,
      modalClasses,
      modalDialogClasses,
      computedBodyClasses,
      computedFooterClasses,
      computedHeaderClasses,
      computedTitleClasses,
      computedCloseButtonClasses
    };
  }
});
var _hoisted_1$7 = ["id"];
var _hoisted_2$3 = ["aria-label"];
function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_button = resolveComponent("b-button");
  return openBlock(), createBlock(Teleport, { to: "body" }, [
    createBaseVNode("div", mergeProps({
      id: _ctx.id,
      ref: "element",
      class: ["modal", _ctx.modalClasses],
      tabindex: "-1"
    }, _ctx.$attrs), [
      createBaseVNode("div", {
        class: normalizeClass(["modal-dialog", _ctx.modalDialogClasses])
      }, [
        createBaseVNode("div", {
          class: normalizeClass(["modal-content", _ctx.contentClass])
        }, [
          !_ctx.hideHeader ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(["modal-header", _ctx.computedHeaderClasses])
          }, [
            (openBlock(), createBlock(resolveDynamicComponent(_ctx.titleTag), {
              class: normalizeClass(["modal-title", _ctx.computedTitleClasses])
            }, {
              default: withCtx(() => [
                renderSlot(_ctx.$slots, "title", {}, () => [
                  createTextVNode(toDisplayString(_ctx.title), 1)
                ])
              ]),
              _: 3
            }, 8, ["class"])),
            !_ctx.hideHeaderClose ? (openBlock(), createElementBlock("button", {
              key: 0,
              type: "button",
              class: normalizeClass(["btn-close", _ctx.computedCloseButtonClasses]),
              "data-bs-dismiss": "modal",
              "aria-label": _ctx.headerCloseLabel
            }, [
              renderSlot(_ctx.$slots, "header-close")
            ], 10, _hoisted_2$3)) : createCommentVNode("", true)
          ], 2)) : createCommentVNode("", true),
          createBaseVNode("div", {
            class: normalizeClass(["modal-body", _ctx.computedBodyClasses])
          }, [
            renderSlot(_ctx.$slots, "default")
          ], 2),
          !_ctx.hideFooter ? (openBlock(), createElementBlock("div", {
            key: 1,
            class: normalizeClass(["modal-footer", _ctx.computedFooterClasses])
          }, [
            renderSlot(_ctx.$slots, "footer", {}, () => [
              !_ctx.okOnly ? (openBlock(), createBlock(_component_b_button, {
                key: 0,
                type: "button",
                class: "btn",
                "data-bs-dismiss": "modal",
                disabled: _ctx.disableCancel,
                size: _ctx.buttonSize,
                variant: _ctx.cancelVariant,
                onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("cancel"))
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.cancelTitle), 1)
                ]),
                _: 1
              }, 8, ["disabled", "size", "variant"])) : createCommentVNode("", true),
              createVNode(_component_b_button, {
                type: "button",
                class: "btn",
                "data-bs-dismiss": "modal",
                disabled: _ctx.disableOk,
                size: _ctx.buttonSize,
                variant: _ctx.okVariant,
                onClick: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("ok"))
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.okTitle), 1)
                ]),
                _: 1
              }, 8, ["disabled", "size", "variant"])
            ])
          ], 2)) : createCommentVNode("", true)
        ], 2)
      ], 2)
    ], 16, _hoisted_1$7)
  ]);
}
var BModal$1 = _export_sfc(_sfc_main$r, [["render", _sfc_render$b]]);
var _sfc_main$q = defineComponent({
  name: "BNav",
  props: {
    align: { type: String },
    fill: { type: Boolean, default: false },
    justified: { type: Boolean, default: false },
    pills: { type: Boolean, default: false },
    tabs: { type: Boolean, default: false },
    vertical: { type: Boolean, default: false }
  },
  setup(props) {
    const classes = computed(() => ({
      "flex-column": props.vertical,
      [`justify-content-${props.align}`]: props.align,
      "nav-tabs": props.tabs,
      "nav-pills": props.pills,
      "nav-fill": props.fill,
      "nav-justified": props.justified
    }));
    return {
      classes
    };
  }
});
function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("ul", {
    class: normalizeClass(["nav", _ctx.classes])
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 2);
}
var BNav = _export_sfc(_sfc_main$q, [["render", _sfc_render$a]]);
var _sfc_main$p = defineComponent({
  name: "BNavItem",
  props: {
    active: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    href: { type: String, required: false }
  },
  setup(props) {
    const classes = computed(() => ({
      active: props.active,
      disabled: props.disabled
    }));
    return {
      classes
    };
  }
});
var _hoisted_1$6 = ["href", "tabindex", "aria-disabled"];
function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("li", {
    class: normalizeClass(["nav-item", _ctx.classes])
  }, [
    createBaseVNode("a", {
      href: _ctx.href,
      class: "nav-link",
      tabindex: _ctx.disabled ? -1 : null,
      "aria-disabled": _ctx.disabled ? true : null
    }, [
      renderSlot(_ctx.$slots, "default")
    ], 8, _hoisted_1$6)
  ], 2);
}
var BNavItem = _export_sfc(_sfc_main$p, [["render", _sfc_render$9]]);
var _sfc_main$o = defineComponent({
  name: "BNavItemDropdown",
  components: {
    BDropdown
  },
  props: {
    autoClose: { type: String, default: "true" },
    id: { type: String },
    dark: { type: Boolean, default: false },
    dropleft: { type: Boolean, default: false },
    dropright: { type: Boolean, default: false },
    dropup: { type: Boolean, default: false },
    right: { type: [Boolean, String], default: false },
    left: { type: [Boolean, String], default: false },
    text: { type: String },
    offset: { type: String },
    offsetParent: { type: Boolean, default: false },
    split: { type: Boolean, default: false },
    splitVariant: { type: String },
    size: { type: String },
    variant: { type: String, default: "link" }
  },
  setup(props) {
    return {
      props
    };
  }
});
var _hoisted_1$5 = { class: "nav-item dropdown" };
function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_dropdown = resolveComponent("b-dropdown");
  return openBlock(), createElementBlock("li", _hoisted_1$5, [
    createVNode(_component_b_dropdown, normalizeProps(guardReactiveProps(_ctx.$props)), createSlots({ _: 2 }, [
      renderList(_ctx.$slots, (_, slot) => {
        return {
          name: slot,
          fn: withCtx((scope) => [
            renderSlot(_ctx.$slots, slot, normalizeProps(guardReactiveProps(scope || {})))
          ])
        };
      })
    ]), 1040)
  ]);
}
var BNavItemDropdown = _export_sfc(_sfc_main$o, [["render", _sfc_render$8]]);
var _sfc_main$n = defineComponent({
  name: "BOffcanvas",
  props: {
    modelValue: { type: Boolean, default: false },
    bodyScrolling: { type: Boolean, default: false },
    backdrop: { type: Boolean, default: true },
    placement: { type: String, default: "start" },
    title: { type: String, required: true }
  },
  emits: ["update:modelValue", "show", "shown", "hide", "hidden"],
  setup(props, { emit }) {
    const element = ref();
    const instance = ref();
    useEventListener(element, "shown.bs.offcanvas", () => emit("shown"));
    useEventListener(element, "hidden.bs.offcanvas", () => emit("hidden"));
    useEventListener(element, "show.bs.offcanvas", () => {
      emit("show");
      emit("update:modelValue", true);
    });
    useEventListener(element, "hide.bs.offcanvas", () => {
      emit("hide");
      emit("update:modelValue", false);
    });
    onMounted(() => {
      var _a;
      instance.value = new import_offcanvas.default(element.value);
      if (props.modelValue) {
        (_a = instance.value) == null ? void 0 : _a.show(element.value);
      }
    });
    const classes = computed(() => ({
      [`offcanvas-${props.placement}`]: props.placement
    }));
    watch(() => props.modelValue, (value) => {
      var _a, _b;
      if (value) {
        (_a = instance.value) == null ? void 0 : _a.show(element.value);
      } else {
        (_b = instance.value) == null ? void 0 : _b.hide();
      }
    });
    return {
      element,
      classes
    };
  }
});
var _hoisted_1$4 = ["data-bs-backdrop", "data-bs-scroll"];
var _hoisted_2$2 = { class: "offcanvas-header" };
var _hoisted_3$1 = {
  id: "offcanvasLabel",
  class: "offcanvas-title"
};
var _hoisted_4 = createBaseVNode("button", {
  type: "button",
  class: "btn-close text-reset",
  "data-bs-dismiss": "offcanvas",
  "aria-label": "Close"
}, null, -1);
var _hoisted_5 = { class: "offcanvas-body" };
function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    ref: "element",
    class: normalizeClass(["offcanvas", _ctx.classes]),
    tabindex: "-1",
    "aria-labelledby": "offcanvasLabel",
    "data-bs-backdrop": _ctx.backdrop,
    "data-bs-scroll": _ctx.bodyScrolling
  }, [
    createBaseVNode("div", _hoisted_2$2, [
      createBaseVNode("h5", _hoisted_3$1, [
        renderSlot(_ctx.$slots, "title", {}, () => [
          createTextVNode(toDisplayString(_ctx.title), 1)
        ])
      ]),
      _hoisted_4
    ]),
    createBaseVNode("div", _hoisted_5, [
      renderSlot(_ctx.$slots, "default")
    ])
  ], 10, _hoisted_1$4);
}
var BOffcanvas = _export_sfc(_sfc_main$n, [["render", _sfc_render$7]]);
var NO_FADE_PROPS = {
  name: "",
  enterActiveClass: "",
  enterToClass: "",
  leaveActiveClass: "",
  leaveToClass: "showing",
  enterFromClass: "showing",
  leaveFromClass: ""
};
var FADE_PROPS = __spreadProps2(__spreadValues2({}, NO_FADE_PROPS), {
  enterActiveClass: "fade showing",
  leaveActiveClass: "fade showing"
});
var _sfc_main$m = defineComponent({
  name: "BTransition",
  props: {
    appear: { type: Boolean, default: false },
    mode: { type: String, required: false },
    noFade: { type: Boolean, default: false },
    transProps: { type: Object, required: false }
  },
  setup(props, { slots }) {
    const transProperties = ref(props.transProps);
    if (!isPlainObject(transProperties.value)) {
      transProperties.value = props.noFade ? NO_FADE_PROPS : FADE_PROPS;
      if (props.appear) {
        transProperties.value = __spreadProps2(__spreadValues2({}, transProperties.value), {
          appear: true,
          appearClass: transProperties.value.enterClass,
          appearActiveClass: transProperties.value.enterActiveClass,
          appearToClass: transProperties.value.enterToClass
        });
      }
    }
    transProperties.value = __spreadProps2(__spreadValues2({
      mode: props.mode
    }, transProperties.value), {
      css: true
    });
    return () => h(Transition, __spreadValues2({}, transProperties.value), {
      default: () => slots.default ? slots.default() : []
    });
  }
});
var POSITION_COVER = { top: 0, left: 0, bottom: 0, right: 0 };
var SLOT_NAME_DEFAULT = "default";
var SLOT_NAME_OVERLAY = "overlay";
var _sfc_main$l = defineComponent({
  name: "BOverlay",
  components: { BTransition: _sfc_main$m },
  props: {
    bgColor: { type: String, required: false },
    blur: { type: String, default: "2px" },
    fixed: { type: Boolean, default: false },
    noCenter: { type: Boolean, default: false },
    noFade: { type: Boolean, default: false },
    noWrap: { type: Boolean, default: false },
    opacity: {
      type: [Number, String],
      default: 0.85,
      validator: (value) => {
        const number = toFloat(value, 0);
        return number >= 0 && number <= 1;
      }
    },
    overlayTag: { type: String, default: "div" },
    rounded: { type: [Boolean, String], default: false },
    show: { type: Boolean, default: false },
    spinnerSmall: { type: Boolean, default: false },
    spinnerType: { type: String, default: "border" },
    spinnerVariant: { type: String, required: false },
    variant: { type: String, default: "light" },
    wrapTag: { type: String, default: "div" },
    zIndex: { type: [Number, String], default: 10 }
  },
  emits: ["click", "hidden", "shown"],
  setup(props, { slots, emit }) {
    const computedRounded = computed(() => props.rounded === true || props.rounded === "" ? "rounded" : !props.rounded ? "" : `rounded-${props.rounded}`);
    const computedVariant = computed(() => props.variant && !props.bgColor ? `bg-${props.variant}` : "");
    const computedSlotScope = computed(() => ({
      spinnerType: props.spinnerType || null,
      spinnerVariant: props.spinnerVariant || null,
      spinnerSmall: props.spinnerSmall
    }));
    return () => {
      const defaultOverlayFn = (scope) => h(resolveComponent("BSpinner"), {
        type: scope.spinnerType,
        variant: scope.spinnerVariant,
        small: scope.spinnerSmall
      });
      let $overlay = "";
      if (props.show) {
        const $background = h("div", {
          class: ["position-absolute", computedVariant.value, computedRounded.value],
          style: __spreadProps2(__spreadValues2({}, POSITION_COVER), {
            opacity: props.opacity,
            backgroundColor: props.bgColor || null,
            backdropFilter: props.blur ? `blur(${props.blur})` : null
          })
        });
        const $content = h("div", {
          class: "position-absolute",
          style: props.noCenter ? __spreadValues2({}, POSITION_COVER) : { top: "50%", left: "50%", transform: "translateX(-50%) translateY(-50%)" }
        }, normalizeSlot(SLOT_NAME_OVERLAY, computedSlotScope.value, slots) || defaultOverlayFn(computedSlotScope.value) || "");
        $overlay = h(props.overlayTag, {
          class: [
            "b-overlay",
            {
              "position-absolute": !props.noWrap || props.noWrap && !props.fixed,
              "position-fixed": props.noWrap && props.fixed
            }
          ],
          style: __spreadProps2(__spreadValues2({}, POSITION_COVER), {
            zIndex: props.zIndex || 10
          }),
          onClick: (event) => emit("click", event),
          key: "overlay"
        }, [$background, $content]);
      }
      const getOverlayTransition = () => h(_sfc_main$m, {
        noFade: props.noFade,
        transProps: { enterToClass: "show" },
        name: "fade",
        onAfterEnter: () => emit("shown"),
        onAfterLeave: () => emit("hidden")
      }, { default: () => $overlay });
      if (props.noWrap)
        return getOverlayTransition();
      const wrapper = h(props.wrapTag, {
        "class": ["b-overlay-wrap position-relative"],
        "aria-busy": props.show ? "true" : null
      }, [h("span", normalizeSlot(SLOT_NAME_DEFAULT, {}, slots)), getOverlayTransition()]);
      return wrapper;
    };
  }
});
function alignment(props) {
  return computed(() => {
    if (props.align === "center") {
      return "justify-content-center";
    } else if (props.align === "end") {
      return "justify-content-end";
    } else if (props.align === "start") {
      return "justify-content-start";
    }
    return "justify-content-start";
  });
}
var BvEvent = class {
  constructor(eventType, eventInit = {}) {
    this.cancelable = true;
    this.componentId = null;
    this.defaultPrevented = false;
    this.nativeEvent = null;
    this.relatedTarget = null;
    this.target = null;
    this.eventType = "";
    this.vueTarget = null;
    if (!eventType) {
      throw new TypeError(`Failed to construct '${this.constructor.name}'. 1 argument required, ${arguments.length} given.`);
    }
    assign(this, BvEvent.Defaults, this.constructor.Defaults, eventInit, { eventType });
    defineProperties(this, {
      type: readonlyDescriptor(),
      cancelable: readonlyDescriptor(),
      nativeEvent: readonlyDescriptor(),
      target: readonlyDescriptor(),
      relatedTarget: readonlyDescriptor(),
      vueTarget: readonlyDescriptor(),
      componentId: readonlyDescriptor()
    });
    let defaultPrevented = false;
    this.preventDefault = function preventDefault() {
      if (this.cancelable) {
        defaultPrevented = true;
      }
    };
    defineProperty(this, "defaultPrevented", {
      enumerable: true,
      get() {
        return defaultPrevented;
      }
    });
  }
  static get Defaults() {
    return {
      eventType: "",
      cancelable: true,
      nativeEvent: null,
      target: null,
      relatedTarget: null,
      vueTarget: null,
      componentId: null
    };
  }
};
var DEFAULT_LIMIT = 5;
var DEFAULT_PER_PAGE = 20;
var DEFAULT_TOTAL_ROWS = 0;
var ELLIPSIS_THRESHOLD = 3;
var SLOT_NAME_ELLIPSIS_TEXT = "ellipsis-text";
var SLOT_NAME_FIRST_TEXT = "first-text";
var SLOT_NAME_LAST_TEXT = "last-text";
var SLOT_NAME_NEXT_TEXT = "next-text";
var SLOT_NAME_PAGE = "page";
var SLOT_NAME_PREV_TEXT = "prev-text";
var sanitizePerPage = (value) => Math.max(toInteger(value) || DEFAULT_PER_PAGE, 1);
var sanitizeTotalRows = (value) => Math.max(toInteger(value) || DEFAULT_TOTAL_ROWS, 0);
var sanitizeCurrentPage = (value, numberOfPages) => {
  const page = toInteger(value) || 1;
  return page > numberOfPages ? numberOfPages : page < 1 ? 1 : page;
};
var _sfc_main$k = defineComponent({
  name: "BPagination",
  props: {
    align: { type: String, default: "start" },
    ariaControls: { type: String, required: false },
    ariaLabel: { type: String, default: "Pagination" },
    disabled: { type: Boolean, default: false },
    ellipsisClass: { type: [Array, String], default: () => [] },
    ellipsisText: { type: String, default: "\u2026" },
    firstClass: { type: [Array, String], default: () => [] },
    firstNumber: { type: Boolean, default: false },
    firstText: { type: String, default: "\xAB" },
    hideEllipsis: { type: Boolean, default: false },
    hideGotoEndButtons: { type: Boolean, default: false },
    labelFirstPage: { type: String, default: "Go to first page" },
    labelLastPage: { type: String, default: "Go to last page" },
    labelNextPage: { type: String, default: "Go to next page" },
    labelPage: { type: String, default: "Go to page" },
    labelPrevPage: { type: String, default: "Go to previous page" },
    lastClass: { type: [Array, String], default: () => [] },
    lastNumber: { type: Boolean, default: false },
    lastText: { type: String, default: "\xBB" },
    limit: { type: Number, default: DEFAULT_LIMIT },
    modelValue: { type: Number, default: 1 },
    nextClass: { type: [Array, String], default: () => [] },
    nextText: { type: String, default: "\u203A" },
    pageClass: { type: [Array, String], default: () => [] },
    perPage: { type: Number, default: DEFAULT_PER_PAGE },
    pills: { type: Boolean, default: false },
    prevClass: { type: [Array, String], default: () => [] },
    prevText: { type: String, default: "\u2039" },
    size: { type: String, required: false },
    totalRows: { type: Number, default: DEFAULT_TOTAL_ROWS }
  },
  emits: ["update:modelValue", "page-click"],
  setup(props, { emit, slots }) {
    const alignment$1 = alignment(props);
    const numberOfPages = computed(() => Math.ceil(sanitizeTotalRows(props.totalRows) / sanitizePerPage(props.perPage)));
    const startNumber = computed(() => {
      let lStartNumber = 1;
      const pagesLeft = numberOfPages.value - props.modelValue;
      if (pagesLeft + 2 < props.limit && props.limit > ELLIPSIS_THRESHOLD) {
        lStartNumber = numberOfPages.value - numberOfLinks.value + 1;
      } else {
        lStartNumber = props.modelValue - Math.floor(numberOfLinks.value / 2);
      }
      if (lStartNumber < 1) {
        lStartNumber = 1;
      } else if (lStartNumber > numberOfPages.value - numberOfLinks.value) {
        lStartNumber = numberOfPages.value - numberOfLinks.value + 1;
      }
      if (props.limit <= ELLIPSIS_THRESHOLD) {
        if (props.lastNumber && numberOfPages.value === lStartNumber + numberOfLinks.value - 1) {
          lStartNumber = Math.max(lStartNumber - 1, 1);
        }
      }
      return lStartNumber;
    });
    const showFirstDots = computed(() => {
      const pagesLeft = numberOfPages.value - props.modelValue;
      let rShowDots = false;
      if (pagesLeft + 2 < props.limit && props.limit > ELLIPSIS_THRESHOLD) {
        if (props.limit > ELLIPSIS_THRESHOLD) {
          rShowDots = true;
        }
      } else {
        if (props.limit > ELLIPSIS_THRESHOLD) {
          rShowDots = !!(!props.hideEllipsis || props.firstNumber);
        }
      }
      if (startNumber.value <= 1) {
        rShowDots = false;
      }
      if (rShowDots && props.firstNumber && startNumber.value < 4) {
        rShowDots = false;
      }
      return rShowDots;
    });
    const numberOfLinks = computed(() => {
      let n = props.limit;
      if (numberOfPages.value <= props.limit) {
        n = numberOfPages.value;
      } else if (props.modelValue < props.limit - 1 && props.limit > ELLIPSIS_THRESHOLD) {
        if (!props.hideEllipsis || props.lastNumber) {
          n = props.limit - (props.firstNumber ? 0 : 1);
        }
        n = Math.min(n, props.limit);
      } else if (numberOfPages.value - props.modelValue + 2 < props.limit && props.limit > ELLIPSIS_THRESHOLD) {
        if (!props.hideEllipsis || props.firstNumber) {
          n = props.limit - (props.lastNumber ? 0 : 1);
        }
      } else {
        if (props.limit > ELLIPSIS_THRESHOLD) {
          n = props.limit - (props.hideEllipsis ? 0 : 2);
        }
      }
      return n;
    });
    computed(() => {
      let n = numberOfLinks.value;
      if (showFirstDots.value && props.firstNumber && startNumber.value < 4) {
        n = n + 2;
      }
      const lastPageNumber = startNumber.value + n - 1;
      if (showLastDots.value && props.lastNumber && lastPageNumber > numberOfPages.value - 3) {
        n = n + (lastPageNumber === numberOfPages.value - 2 ? 2 : 3);
      }
      n = Math.min(n, numberOfPages.value - startNumber.value + 1);
      return n;
    });
    const showLastDots = computed(() => {
      const paginationWindowEnd = numberOfPages.value - numberOfLinks.value;
      let rShowDots = false;
      if (props.modelValue < props.limit - 1 && props.limit > ELLIPSIS_THRESHOLD) {
        if (!props.hideEllipsis || props.lastNumber) {
          rShowDots = true;
        }
      } else {
        if (props.limit > ELLIPSIS_THRESHOLD) {
          rShowDots = !!(!props.hideEllipsis || props.lastNumber);
        }
      }
      if (startNumber.value > paginationWindowEnd) {
        rShowDots = false;
      }
      const lastPageNumber = startNumber.value + numberOfLinks.value - 1;
      if (rShowDots && props.lastNumber && lastPageNumber > numberOfPages.value - 3) {
        rShowDots = false;
      }
      return rShowDots;
    });
    const pagination = reactive({
      pageSize: sanitizePerPage(props.perPage),
      totalRows: sanitizeTotalRows(props.totalRows),
      numberOfPages: numberOfPages.value
    });
    const pageClick = (event, pageNumber) => {
      if (pageNumber === props.modelValue) {
        return;
      }
      const { target } = event;
      const clickEvent = new BvEvent("page-click", {
        cancelable: true,
        vueTarget: this,
        target
      });
      emit("page-click", clickEvent, pageNumber);
      if (clickEvent.defaultPrevented) {
        return;
      }
      emit("update:modelValue", pageNumber);
    };
    const btnSize = computed(() => props.size ? `pagination-${props.size}` : "");
    const styleClass = computed(() => props.pills ? "b-pagination-pills" : "");
    watch(() => props.modelValue, (newValue) => {
      const calculatedValue = sanitizeCurrentPage(newValue, numberOfPages.value);
      if (calculatedValue !== props.modelValue)
        emit("update:modelValue", calculatedValue);
    });
    watch(pagination, (oldValue, newValue) => {
      if (!isUndefinedOrNull(oldValue)) {
        if (newValue.pageSize !== oldValue.pageSize && newValue.totalRows === oldValue.totalRows) {
          emit("update:modelValue", 1);
        } else if (newValue.numberOfPages !== oldValue.numberOfPages && props.modelValue > newValue.numberOfPages) {
          emit("update:modelValue", 1);
        }
      }
    });
    const pages = computed(() => {
      const result = [];
      for (let index = 0; index < numberOfLinks.value; index++) {
        result.push({ number: startNumber.value + index, classes: null });
      }
      return result;
    });
    return () => {
      const buttons = [];
      const pageNumbers = pages.value.map((p) => p.number);
      const isActivePage = (pageNumber) => pageNumber === props.modelValue;
      const noCurrentPage = props.modelValue < 1;
      const fill = props.align === "fill";
      const makeEndBtn = (linkTo, ariaLabel, btnSlot, btnText, btnClass, pageTest) => {
        const isDisabled = props.disabled || isActivePage(pageTest) || noCurrentPage || linkTo < 1 || linkTo > numberOfPages.value;
        const pageNumber = linkTo < 1 ? 1 : linkTo > numberOfPages.value ? numberOfPages.value : linkTo;
        const scope = { disabled: isDisabled, page: pageNumber, index: pageNumber - 1 };
        const btnContent = normalizeSlot(btnSlot, scope, slots) || btnText || "";
        return h("li", {
          class: [
            "page-item",
            {
              "disabled": isDisabled,
              "flex-fill": fill,
              "d-flex": fill && !isDisabled
            },
            btnClass
          ]
        }, h(isDisabled ? "span" : "button", {
          "class": ["page-link", { "flex-grow-1": !isDisabled && fill }],
          "aria-label": ariaLabel,
          "aria-controls": props.ariaControls || null,
          "aria-disabled": isDisabled ? "true" : null,
          "role": "menuitem",
          "type": isDisabled ? null : "button",
          "tabindex": isDisabled ? null : "-1",
          "onClick": (event) => {
            if (isDisabled) {
              return;
            }
            pageClick(event, pageNumber);
          }
        }, btnContent));
      };
      const makeEllipsis = (isLast) => h("li", {
        class: [
          "page-item",
          "disabled",
          "bv-d-xs-down-none",
          fill ? "flex-fill" : "",
          props.ellipsisClass
        ],
        role: "separator",
        key: `ellipsis-${isLast ? "last" : "first"}`
      }, [
        h("span", { class: ["page-link"] }, normalizeSlot(SLOT_NAME_ELLIPSIS_TEXT, {}, slots) || props.ellipsisText || "...")
      ]);
      const makePageButton = (page, idx) => {
        const active = isActivePage(page.number) && !noCurrentPage;
        const tabIndex = props.disabled ? null : active || noCurrentPage && idx === 0 ? "0" : "-1";
        const scope = {
          active,
          disabled: props.disabled,
          page: page.number,
          index: page.number - 1,
          content: page.number
        };
        const btnContent = normalizeSlot(SLOT_NAME_PAGE, scope, slots) || page.number;
        const inner = h(props.disabled ? "span" : "button", {
          "class": ["page-link", { "flex-grow-1": !props.disabled && fill }],
          "aria-controls": props.ariaControls || null,
          "aria-disabled": props.disabled ? "true" : null,
          "aria-label": props.labelPage ? `${props.labelPage} ${page.number}` : null,
          "role": "menuitemradio",
          "type": props.disabled ? null : "button",
          "tabindex": tabIndex,
          "onClick": (event) => {
            if (!props.disabled) {
              pageClick(event, page.number);
            }
          }
        }, btnContent);
        return h("li", {
          class: [
            "page-item",
            {
              "disabled": props.disabled,
              active,
              "flex-fill": fill,
              "d-flex": fill && !props.disabled
            },
            props.pageClass
          ],
          role: "presentation",
          key: `page-${page.number}`
        }, inner);
      };
      if (!props.hideGotoEndButtons && !props.firstNumber) {
        const gotoFirstPageButton = makeEndBtn(1, props.labelFirstPage, SLOT_NAME_FIRST_TEXT, props.firstText, props.firstClass, 1);
        buttons.push(gotoFirstPageButton);
      }
      const previousButton = makeEndBtn(props.modelValue - 1, props.labelFirstPage, SLOT_NAME_PREV_TEXT, props.prevText, props.prevClass, 1);
      buttons.push(previousButton);
      if (props.firstNumber && pageNumbers[0] !== 1) {
        buttons.push(makePageButton({ number: 1 }, 0));
      }
      if (showFirstDots.value) {
        buttons.push(makeEllipsis(false));
      }
      pages.value.forEach((page, idx) => {
        const offset2 = showFirstDots.value && props.firstNumber && pageNumbers[0] !== 1 ? 1 : 0;
        buttons.push(makePageButton(page, idx + offset2));
      });
      if (showLastDots.value) {
        buttons.push(makeEllipsis(true));
      }
      if (props.lastNumber && pageNumbers[pageNumbers.length - 1] !== numberOfPages.value) {
        buttons.push(makePageButton({ number: numberOfPages.value }, -1));
      }
      const nextButton = makeEndBtn(props.modelValue + 1, props.labelNextPage, SLOT_NAME_NEXT_TEXT, props.nextText, props.nextClass, numberOfPages.value);
      buttons.push(nextButton);
      if (!props.lastNumber && !props.hideGotoEndButtons) {
        const gotoLastPageButton = makeEndBtn(numberOfPages.value, props.labelLastPage, SLOT_NAME_LAST_TEXT, props.lastText, props.lastClass, numberOfPages.value);
        buttons.push(gotoLastPageButton);
      }
      const $pagination = h("ul", {
        "class": ["pagination", btnSize.value, alignment$1.value, styleClass.value],
        "role": "menubar",
        "aria-disabled": props.disabled,
        "aria-label": props.ariaLabel || null
      }, buttons);
      return $pagination;
    };
  }
});
var _sfc_main$j = defineComponent({
  name: "BPopover",
  props: {
    container: {
      type: [String, Object],
      default: "body"
    },
    content: { type: String },
    id: { type: String },
    noninteractive: { type: Boolean, default: false },
    placement: { type: String, default: "right" },
    target: {
      type: [String, Object],
      default: void 0
    },
    title: { type: String },
    delay: { type: [Number, Object], default: 0 },
    triggers: { type: String, default: "click" },
    show: { type: Boolean, default: false },
    variant: { type: String, default: void 0 },
    html: { type: Boolean, default: true },
    sanitize: { type: Boolean, default: false }
  },
  emits: ["show", "shown", "hide", "hidden", "inserted"],
  setup(props, { emit, slots }) {
    const element = ref();
    const target = ref();
    const instance = ref();
    const titleRef = ref();
    const contentRef = ref();
    const classes = computed(() => ({
      [`b-popover-${props.variant}`]: props.variant
    }));
    const cleanElementProp = (target2) => {
      if (typeof target2 === "string") {
        return target2;
      } else if (target2 instanceof HTMLElement)
        return target2;
      else if (typeof target2 !== "undefined")
        return target2.$el;
      return void 0;
    };
    const getElement = (element2) => {
      if (!element2)
        return void 0;
      if (typeof element2 === "string") {
        const idElement = document.getElementById(element2);
        return idElement ? idElement : void 0;
      }
      return element2;
    };
    onMounted(() => {
      var _a, _b, _c;
      nextTick(() => {
        target.value = getElement(cleanElementProp(props.target));
        if (target.value)
          instance.value = new import_popover.default(target.value, {
            container: cleanElementProp(props.container),
            trigger: props.triggers,
            placement: props.placement,
            title: props.title || slots.title ? titleRef.value : "",
            content: contentRef.value,
            html: props.html,
            delay: props.delay,
            sanitize: props.sanitize
          });
        else
          console.warn("[B-Popover] Target is a mandatory props.");
      });
      (_b = (_a = element.value) == null ? void 0 : _a.parentNode) == null ? void 0 : _b.removeChild(element.value);
      if (props.show) {
        (_c = instance.value) == null ? void 0 : _c.show();
      }
    });
    watch(() => props.show, (show, oldVal) => {
      var _a, _b;
      if (show !== oldVal) {
        if (show) {
          (_a = instance.value) == null ? void 0 : _a.show();
        } else {
          (_b = instance.value) == null ? void 0 : _b.hide();
        }
      }
    });
    useEventListener(target, "show.bs.popover", () => emit("show"));
    useEventListener(target, "shown.bs.popover", () => emit("shown"));
    useEventListener(target, "hide.bs.popover", () => emit("hide"));
    useEventListener(target, "hidden.bs.popover", () => emit("hidden"));
    useEventListener(target, "inserted.bs.popover", () => emit("inserted"));
    return {
      element,
      titleRef,
      contentRef,
      classes
    };
  }
});
var _hoisted_1$3 = ["id"];
var _hoisted_2$1 = { ref: "titleRef" };
var _hoisted_3 = { ref: "contentRef" };
function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    id: _ctx.id,
    ref: "element",
    class: normalizeClass(["popover b-popover", _ctx.classes]),
    role: "tooltip",
    tabindex: "-1"
  }, [
    createBaseVNode("div", _hoisted_2$1, [
      renderSlot(_ctx.$slots, "title", {}, () => [
        createTextVNode(toDisplayString(_ctx.title), 1)
      ])
    ], 512),
    createBaseVNode("div", _hoisted_3, [
      renderSlot(_ctx.$slots, "default", {}, () => [
        createTextVNode(toDisplayString(_ctx.content), 1)
      ])
    ], 512)
  ], 10, _hoisted_1$3);
}
var BPopover$1 = _export_sfc(_sfc_main$j, [["render", _sfc_render$6]]);
var injectionKey$1 = Symbol();
var _sfc_main$i = defineComponent({
  name: "BProgress",
  props: {
    animated: { type: Boolean, default: false },
    max: { type: [Number, String] },
    height: { type: String },
    precision: { type: [Number, String], default: 0 },
    showProgress: { type: Boolean, default: false },
    showValue: { type: Boolean, default: false },
    striped: { type: Boolean, default: false },
    value: { type: [Number, String], default: 0 },
    variant: { type: String }
  },
  setup(props) {
    provide(injectionKey$1, {
      animated: props.animated,
      max: props.max,
      showProgress: props.showProgress,
      showValue: props.showValue,
      striped: props.striped
    });
  }
});
function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_progress_bar = resolveComponent("b-progress-bar");
  return openBlock(), createElementBlock("div", {
    class: "progress",
    style: normalizeStyle({ height: _ctx.height })
  }, [
    renderSlot(_ctx.$slots, "default", {}, () => [
      createVNode(_component_b_progress_bar, normalizeProps(guardReactiveProps({
        animated: _ctx.animated,
        max: _ctx.max,
        precision: _ctx.precision,
        showProgress: _ctx.showProgress,
        showValue: _ctx.showValue,
        striped: _ctx.striped,
        value: _ctx.value,
        variant: _ctx.variant
      })), null, 16)
    ])
  ], 4);
}
var BProgress = _export_sfc(_sfc_main$i, [["render", _sfc_render$5]]);
var _sfc_main$h = defineComponent({
  name: "BProgressBar",
  props: {
    animated: { type: Boolean, default: false },
    label: { type: String },
    labelHtml: { type: String },
    max: { type: [Number, String] },
    precision: { type: [Number, String], default: 0 },
    showProgress: { type: Boolean, default: false },
    showValue: { type: Boolean, default: false },
    striped: { type: Boolean, default: false },
    value: { type: [Number, String], default: 0 },
    variant: { type: String }
  },
  setup(props, { slots }) {
    const parent = inject(injectionKey$1);
    const classes = computed(() => ({
      "progress-bar-animated": props.animated || (parent == null ? void 0 : parent.animated),
      "progress-bar-striped": props.striped || (parent == null ? void 0 : parent.striped) || props.animated || (parent == null ? void 0 : parent.animated),
      [`bg-${props.variant}`]: props.variant
    }));
    const computedLabel = computed(() => {
      if (props.showValue || (parent == null ? void 0 : parent.showValue)) {
        return parseFloat(props.value).toFixed(props.precision);
      }
      if (props.showProgress || (parent == null ? void 0 : parent.showProgress)) {
        const progress = (props.value * 100 / parseInt(props.max || 100)).toString();
        return parseFloat(progress).toFixed(props.precision);
      }
      return props.label || "";
    });
    const width = computed(() => {
      if (props.max || (parent == null ? void 0 : parent.max)) {
        return `${props.value * 100 / parseInt(props.max || (parent == null ? void 0 : parent.max))}%`;
      }
      return typeof props.value === "string" ? props.value : `${props.value}%`;
    });
    const progressProps = computed(() => {
      const rawProps = {
        "class": ["progress-bar", classes.value],
        "role": "progressbar",
        "aria-valuenow": props.value,
        "aria-valuemin": 0,
        "aria-valuemax": props.max,
        "style": { width: width.value }
      };
      if (props.labelHtml) {
        return __spreadProps2(__spreadValues2({}, rawProps), {
          innerHTML: props.labelHtml
        });
      }
      return rawProps;
    });
    return () => {
      var _a;
      return h("div", progressProps.value, ((_a = slots.default) == null ? void 0 : _a.call(slots)) || computedLabel.value);
    };
  }
});
var rowColsProps = getBreakpointProps("cols", [""], { type: [String, Number], default: null });
var _sfc_main$g = defineComponent({
  name: "BRow",
  props: __spreadValues2({
    tag: { type: String, default: "div" },
    gutterX: { type: String, default: null },
    gutterY: { type: String, default: null },
    alignV: { type: String, default: null },
    alignH: { type: String, default: null },
    alignContent: { type: String, default: null }
  }, rowColsProps),
  setup(props) {
    const rowColsClasses = getClasses$1(props, rowColsProps, "cols", "row-cols");
    const classes = computed(() => ({
      [`gx-${props.gutterX}`]: props.gutterX !== null,
      [`gy-${props.gutterY}`]: props.gutterY !== null,
      [`align-items-${props.alignV}`]: props.alignV,
      [`justify-content-${props.alignH}`]: props.alignH,
      [`align-content-${props.alignContent}`]: props.alignContent
    }));
    return {
      classes,
      rowColsClasses
    };
  }
});
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.tag), {
    class: normalizeClass(["row", [_ctx.classes, _ctx.rowColsClasses]])
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 8, ["class"]);
}
var BRow = _export_sfc(_sfc_main$g, [["render", _sfc_render$4]]);
var _sfc_main$f = defineComponent({
  props: {
    animation: { type: String, default: "wave" },
    height: { type: String },
    size: { type: String },
    type: { type: String, default: "text" },
    variant: { type: String },
    width: { type: String }
  },
  setup(__props) {
    const props = __props;
    const classes = computed(() => [
      `b-skeleton-${props.type}`,
      `b-skeleton-animate-${props.animation}`,
      {
        [`bg-${props.variant}`]: props.variant
      }
    ]);
    const style = computed(() => ({
      width: props.size || props.width,
      height: props.size || props.height
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["b-skeleton", unref(classes)]),
        style: normalizeStyle(unref(style))
      }, null, 6);
    };
  }
});
var _sfc_main$e = defineComponent({
  props: {
    animation: { type: String, default: "wave" }
  },
  setup(__props) {
    const props = __props;
    const classes = computed(() => [`b-skeleton-animate-${props.animation}`]);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["b-skeleton-icon-wrapper position-relative d-inline-block overflow-hidden", unref(classes)])
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 2);
    };
  }
});
var _sfc_main$d = defineComponent({
  props: {
    bordered: { type: Boolean, default: false },
    borderless: { type: Boolean, default: false },
    borderVariant: { type: String },
    captionTop: { type: Boolean, default: false },
    dark: { type: Boolean, default: false },
    hover: { type: Boolean, default: false },
    responsive: { type: [Boolean, String], default: false },
    stacked: { type: [Boolean, String], default: false },
    striped: { type: Boolean, default: false },
    small: { type: Boolean, default: false },
    tableClass: { type: [Array, Object, String] },
    tableVariant: { type: String }
  },
  setup(__props) {
    var _a;
    const props = __props;
    const slots = useSlots();
    const classes = computed(() => [
      {
        "table-bordered": props.bordered,
        "table-borderless": props.borderless,
        [`border-${props.borderVariant}`]: props.borderVariant,
        "caption-top": props.captionTop,
        "table-dark": props.dark,
        "table-hover": props.hover,
        "b-table-stacked": typeof props.stacked === "boolean" && props.stacked,
        [`b-table-stacked-${props.stacked}`]: typeof props.stacked === "string",
        "table-striped": props.striped,
        "table-sm": props.small,
        [`table-${props.tableVariant}`]: props.tableVariant
      },
      props.tableClass
    ]);
    const table = h("table", {
      class: ["table b-table", classes.value],
      role: "table"
    }, (_a = slots.default) == null ? void 0 : _a.call(slots));
    let Render = table;
    if (props.responsive) {
      Render = h("div", {
        class: {
          "table-responsive": typeof props.responsive === "boolean" && props.responsive,
          [`table-responsive-${props.responsive}`]: typeof props.responsive === "string"
        }
      }, table);
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Render));
    };
  }
});
var _hoisted_1$2 = { key: 0 };
var _hoisted_2 = { key: 1 };
var _sfc_main$c = defineComponent({
  props: {
    animation: { type: String, default: "wave" },
    columns: { type: Number, default: 5 },
    hideHeader: { type: Boolean, default: false },
    rows: { type: Number, default: 3 },
    showFooter: { type: Boolean, default: false },
    tableProps: { type: Object }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$d, normalizeProps(guardReactiveProps(__props.tableProps)), {
        default: withCtx(() => [
          !__props.hideHeader ? (openBlock(), createElementBlock("thead", _hoisted_1$2, [
            createBaseVNode("tr", null, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(__props.columns, (th, i) => {
                return openBlock(), createElementBlock("th", { key: i }, [
                  createVNode(_sfc_main$f)
                ]);
              }), 128))
            ])
          ])) : createCommentVNode("", true),
          createBaseVNode("tbody", null, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(__props.rows, (tr, j) => {
              return openBlock(), createElementBlock("tr", { key: j }, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(__props.columns, (td, k) => {
                  return openBlock(), createElementBlock("td", { key: k }, [
                    createVNode(_sfc_main$f, { width: "75%" })
                  ]);
                }), 128))
              ]);
            }), 128))
          ]),
          __props.showFooter ? (openBlock(), createElementBlock("tfoot", _hoisted_2, [
            createBaseVNode("tr", null, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(__props.columns, (th, l) => {
                return openBlock(), createElementBlock("th", { key: l }, [
                  createVNode(_sfc_main$f)
                ]);
              }), 128))
            ])
          ])) : createCommentVNode("", true)
        ]),
        _: 1
      }, 16);
    };
  }
});
var _sfc_main$b = defineComponent({
  props: {
    loading: { type: Boolean, default: false }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return __props.loading ? renderSlot(_ctx.$slots, "loading", { key: 0 }) : renderSlot(_ctx.$slots, "default", { key: 1 });
    };
  }
});
var _sfc_main$a = defineComponent({
  name: "BSpinner",
  props: {
    label: { type: String },
    role: { type: String, default: "status" },
    small: { type: Boolean, default: false },
    tag: { type: String, default: "span" },
    type: { type: String, default: "border" },
    variant: { type: String }
  },
  setup(props) {
    const classes = computed(() => ({
      "spinner-border": props.type === "border",
      "spinner-border-sm": props.type === "border" && props.small,
      "spinner-grow": props.type === "grow",
      "spinner-grow-sm": props.type === "grow" && props.small,
      [`text-${props.variant}`]: !!props.variant
    }));
    return {
      classes
    };
  }
});
var _hoisted_1$1 = {
  key: 0,
  class: "visually-hidden"
};
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.tag), {
    class: normalizeClass(_ctx.classes),
    role: _ctx.label || _ctx.$slots.label ? _ctx.role : null,
    "aria-hidden": _ctx.label || _ctx.$slots.label ? null : true
  }, {
    default: withCtx(() => [
      _ctx.label || _ctx.$slots.label ? (openBlock(), createElementBlock("span", _hoisted_1$1, [
        renderSlot(_ctx.$slots, "label", {}, () => [
          createTextVNode(toDisplayString(_ctx.label), 1)
        ])
      ])) : createCommentVNode("", true)
    ]),
    _: 3
  }, 8, ["class", "role", "aria-hidden"]);
}
var BSpinner = _export_sfc(_sfc_main$a, [["render", _sfc_render$3]]);
var injectionKey = Symbol();
var getTabs = (slots) => {
  if (!slots || !slots.default)
    return [];
  return slots.default().reduce((arr, slot) => {
    if (typeof slot.type === "symbol") {
      arr = arr.concat(slot.children);
    } else {
      arr.push(slot);
    }
    return arr;
  }, []).filter((child) => {
    var _a;
    return ((_a = child.type) == null ? void 0 : _a.name) === "BTab";
  });
};
var _sfc_main$9 = defineComponent({
  name: "BTabs",
  props: {
    activeNavItemClass: { type: [Array, Object, String], default: null },
    activeTabClass: { type: [Array, Object, String], default: null },
    align: { type: String, default: null },
    card: { type: Boolean, default: false },
    contentClass: { type: [Array, Object, String], default: null },
    end: { type: Boolean, default: false },
    fill: { type: Boolean, default: false },
    id: { type: String, default: null },
    justified: { type: Boolean, default: false },
    lazy: { type: Boolean, default: false },
    navClass: { type: [Array, Object, String], default: null },
    navWrapperClass: { type: [Array, Object, String], default: null },
    noFade: { type: Boolean, default: false },
    noNavStyle: { type: Boolean, default: false },
    pills: { type: Boolean, default: false },
    small: { type: Boolean, default: false },
    tag: { type: String, default: "div" },
    vertical: { type: Boolean, default: false },
    modelValue: { type: Number, default: -1 }
  },
  emits: ["update:modelValue", "activate-tab", "click"],
  setup(props, { slots, emit }) {
    const _tabIndex = ref(props.modelValue);
    const _currentTabButton = ref("");
    const tabIndex = computed({
      get: () => _tabIndex.value,
      set: (value) => {
        _tabIndex.value = value;
        if (tabs.value.length > 0 && value >= 0 && value < tabs.value.length) {
          _currentTabButton.value = tabs.value[value].buttonId;
        } else {
          _currentTabButton.value = "";
        }
        emit("update:modelValue", value);
      }
    });
    const tabs = computed(() => {
      let tabs2 = [];
      if (slots.default) {
        tabs2 = getTabs(slots).map((tab, idx) => {
          if (!tab.props)
            tab.props = {};
          const buttonId = tab.props["button-id"] || getID("tab");
          const contentId = tab.props.id || getID();
          const active = tabIndex.value > -1 ? idx === tabIndex.value : tab.props.active === "";
          const titleItemClass = tab.props["title-item-class"];
          const titleLinkAttributes = tab.props["title-link-attributes"];
          return {
            buttonId,
            contentId,
            active,
            disabled: tab.props.disabled === "" || tab.props.disabled === true,
            navItemClasses: [
              {
                active,
                disabled: tab.props.disabled === "" || tab.props.disabled === true
              },
              active && props.activeNavItemClass ? props.activeNavItemClass : null,
              tab.props["title-link-class"]
            ],
            tabClasses: [
              {
                fade: !props.noFade
              },
              active && props.activeTabClass ? props.activeTabClass : null
            ],
            target: `#${contentId}`,
            title: tab.props.title,
            titleItemClass,
            titleLinkAttributes,
            onClick: tab.props.onClick,
            tab
          };
        });
      }
      return tabs2;
    });
    const showEmpty = computed(() => !((tabs == null ? void 0 : tabs.value) && tabs.value.length > 0));
    const classes = computed(() => ({
      "d-flex align-items-start": props.vertical
    }));
    const navTabsClasses = computed(() => ({
      "nav-pills": props.pills,
      "flex-column me-3": props.vertical,
      [`justify-content-${props.align}`]: !!props.align,
      "nav-fill": props.fill,
      "card-header-tabs": props.card,
      "nav-justified": props.justified,
      "nav-tabs": !props.noNavStyle && !props.pills,
      "small": props.small
    }));
    const activateTab = (index) => {
      let result = false;
      if (index !== void 0) {
        if (index > -1 && index < tabs.value.length && !tabs.value[index].disabled && (tabIndex.value < 0 || tabs.value[index].buttonId !== _currentTabButton.value)) {
          const tabEvent = new BvEvent("activate-tab", { cancelable: true, vueTarget: this });
          emit("activate-tab", index, tabIndex.value, tabEvent);
          if (!tabEvent.defaultPrevented) {
            tabIndex.value = index;
            result = true;
          }
        }
      }
      if (!result && props.modelValue !== tabIndex.value) {
        emit("update:modelValue", tabIndex.value);
      }
      return result;
    };
    const handleClick = (event, index) => {
      var _a;
      activateTab(index);
      if (index >= 0 && !tabs.value[index].disabled && ((_a = tabs.value[index]) == null ? void 0 : _a.onClick) && isFunction(tabs.value[index].onClick)) {
        tabs.value[index].onClick(event);
      }
    };
    activateTab(_tabIndex.value);
    watch(() => props.modelValue, (newValue, oldValue) => {
      if (newValue === oldValue)
        return;
      newValue = mathMax(newValue, -1);
      oldValue = mathMax(oldValue, -1);
      if (tabs.value.length <= 0) {
        tabIndex.value = -1;
        return;
      }
      const goForward = newValue > oldValue;
      let index = newValue;
      const maxIdx = tabs.value.length - 1;
      while (index >= 0 && index <= maxIdx && tabs.value[index].disabled) {
        index += goForward ? 1 : -1;
      }
      if (index < 0) {
        activateTab(0);
        return;
      }
      if (index >= tabs.value.length) {
        activateTab(tabs.value.length - 1);
        return;
      }
      activateTab(index);
    });
    watch(() => tabs.value, () => {
      let activeTabIndex = tabs.value.map((tab) => tab.active && !tab.disabled).lastIndexOf(true);
      if (activeTabIndex < 0) {
        if (tabIndex.value >= tabs.value.length) {
          activeTabIndex = tabs.value.map((tab) => !tab.disabled).lastIndexOf(true);
        } else {
          if (tabs.value[tabIndex.value] && !tabs.value[tabIndex.value].disabled)
            activeTabIndex = tabIndex.value;
        }
      }
      if (activeTabIndex < 0) {
        activeTabIndex = tabs.value.map((tab) => !tab.disabled).indexOf(true);
      }
      tabs.value.forEach((tab, idx) => tab.active = idx === activeTabIndex);
      activateTab(activeTabIndex);
    });
    onMounted(() => {
      if (tabIndex.value < 0 && tabs.value.length > 0 && !tabs.value.some((tab) => tab.active)) {
        const firstTab = tabs.value.map((t) => !t.disabled).indexOf(true);
        activateTab(firstTab >= 0 ? firstTab : -1);
      }
    });
    provide(injectionKey, {
      lazy: props.lazy,
      card: props.card
    });
    return {
      tabs,
      showEmpty,
      classes,
      navTabsClasses,
      tabIndex,
      handleClick
    };
  }
});
var _hoisted_1 = ["id", "data-bs-target", "aria-controls", "aria-selected", "onClick"];
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.tag), {
    id: _ctx.id,
    class: normalizeClass(["tabs", _ctx.classes])
  }, {
    default: withCtx(() => [
      _ctx.end ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: normalizeClass(["tab-content", _ctx.contentClass])
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.tabs, ({ tab, contentId, tabClasses, active }, i) => {
          return openBlock(), createBlock(resolveDynamicComponent(tab), {
            key: i,
            id: contentId,
            class: normalizeClass(tabClasses),
            active
          }, null, 8, ["id", "class", "active"]);
        }), 128)),
        _ctx.showEmpty ? (openBlock(), createElementBlock("div", {
          key: "bv-empty-tab",
          class: normalizeClass(["tab-pane active", { "card-body": _ctx.card }])
        }, [
          renderSlot(_ctx.$slots, "empty")
        ], 2)) : createCommentVNode("", true)
      ], 2)) : createCommentVNode("", true),
      createBaseVNode("div", {
        class: normalizeClass([_ctx.navWrapperClass, { "card-header": _ctx.card, "ms-auto": _ctx.vertical && _ctx.end }])
      }, [
        createBaseVNode("ul", {
          class: normalizeClass(["nav", [_ctx.navTabsClasses, _ctx.navClass]]),
          role: "tablist"
        }, [
          renderSlot(_ctx.$slots, "tabs-start"),
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.tabs, ({ tab, buttonId, contentId, navItemClasses, active, target }, idx) => {
            return openBlock(), createElementBlock("li", {
              key: idx,
              class: normalizeClass(["nav-item", tab.props["title-item-class"]])
            }, [
              createBaseVNode("button", mergeProps({
                id: buttonId,
                class: ["nav-link", navItemClasses],
                "data-bs-toggle": "tab",
                "data-bs-target": target,
                role: "tab",
                "aria-controls": contentId,
                "aria-selected": active
              }, tab.props["title-link-attributes"], {
                onClick: withModifiers((e) => _ctx.handleClick(e, idx), ["stop", "prevent"])
              }), [
                tab.children && tab.children.title ? (openBlock(), createBlock(resolveDynamicComponent(tab.children.title), { key: 0 })) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(tab.props.title), 1)
                ], 64))
              ], 16, _hoisted_1)
            ], 2);
          }), 128)),
          renderSlot(_ctx.$slots, "tabs-end")
        ], 2)
      ], 2),
      !_ctx.end ? (openBlock(), createElementBlock("div", {
        key: 1,
        class: normalizeClass(["tab-content", _ctx.contentClass])
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.tabs, ({ tab, contentId, tabClasses, active }, i) => {
          return openBlock(), createBlock(resolveDynamicComponent(tab), {
            key: i,
            id: contentId,
            class: normalizeClass(tabClasses),
            active
          }, null, 8, ["id", "class", "active"]);
        }), 128)),
        _ctx.showEmpty ? (openBlock(), createElementBlock("div", {
          key: "bv-empty-tab",
          class: normalizeClass(["tab-pane active", { "card-body": _ctx.card }])
        }, [
          renderSlot(_ctx.$slots, "empty")
        ], 2)) : createCommentVNode("", true)
      ], 2)) : createCommentVNode("", true)
    ]),
    _: 3
  }, 8, ["id", "class"]);
}
var BTabs = _export_sfc(_sfc_main$9, [["render", _sfc_render$2]]);
var _sfc_main$8 = defineComponent({
  name: "BTab",
  props: {
    active: { type: Boolean, default: false },
    buttonId: { type: String, default: null },
    disabled: { type: Boolean, default: false },
    id: { type: String },
    lazy: { type: Boolean, default: false },
    noBody: { type: [Boolean, String], default: false },
    tag: { type: String, default: "div" },
    title: { type: String },
    titleItemClass: { type: [Array, Object, String], default: null },
    titleLinkAttributes: { type: Object, default: null },
    titleLinkClass: { type: [Array, Object, String], default: null }
  },
  setup(props) {
    const parentData = inject(injectionKey);
    const computedLazy = computed(() => (parentData == null ? void 0 : parentData.lazy) || props.lazy);
    const computedActive = computed(() => props.active && !props.disabled);
    const showSlot = computed(() => computedActive.value || !computedLazy.value);
    const classes = computed(() => ({
      "active": props.active,
      "show": props.active,
      "card-body": parentData.card && props.noBody === false
    }));
    return {
      classes,
      computedLazy,
      computedActive,
      showSlot
    };
  }
});
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.tag), {
    id: _ctx.id,
    class: normalizeClass(["tab-pane", _ctx.classes]),
    role: "tabpanel",
    "aria-labelledby": "profile-tab"
  }, {
    default: withCtx(() => [
      _ctx.showSlot ? renderSlot(_ctx.$slots, "default", { key: 0 }) : createCommentVNode("", true)
    ]),
    _: 3
  }, 8, ["id", "class"]);
}
var BTab = _export_sfc(_sfc_main$8, [["render", _sfc_render$1]]);
var useItemHelper = () => {
  const normaliseFields = (origFields, items) => {
    const fields = [];
    if (!(origFields == null ? void 0 : origFields.length) && (items == null ? void 0 : items.length)) {
      Object.keys(items[0]).forEach((k) => fields.push({ key: k, label: startCase(k) }));
      return fields;
    }
    if (Array.isArray(origFields)) {
      origFields.forEach((f) => {
        if (typeof f === "string") {
          fields.push({ key: f, label: startCase(f) });
        } else if (isObject(f) && f.key && isString(f.key)) {
          fields.push(__spreadValues2({}, f));
        }
      });
      return fields;
    }
    return fields;
  };
  return {
    normaliseFields
  };
};
var _sfc_main$7 = defineComponent({
  name: "BTable",
  props: {
    align: { type: String },
    caption: { type: String },
    captionTop: { type: Boolean, default: false },
    borderless: { type: Boolean, default: false },
    bordered: { type: Boolean, default: false },
    borderVariant: { type: String },
    dark: { type: Boolean, default: false },
    fields: { type: Array, default: () => [] },
    footClone: { type: Boolean, default: false },
    hover: { type: Boolean, default: false },
    items: { type: Array, default: () => [] },
    responsive: { type: [Boolean, String], default: false },
    small: { type: Boolean, default: false },
    striped: { type: Boolean, default: false },
    variant: { type: String }
  },
  setup(props, { slots }) {
    const classes = computed(() => ({
      [`align-${props.align}`]: props.align,
      [`table-${props.variant}`]: props.variant,
      "table-striped": props.striped,
      "table-hover": props.hover,
      "table-dark": props.dark,
      "table-bordered": props.bordered,
      [`border-${props.borderVariant}`]: props.borderVariant,
      "table-borderless": props.borderless,
      "table-sm": props.small,
      "caption-top": props.captionTop
    }));
    const itemHelper = useItemHelper();
    const computedFields = computed(() => itemHelper.normaliseFields(props.fields, props.items));
    return () => {
      let theadTop;
      theadTop = null;
      if (slots["thead-top"]) {
        theadTop = slots["thead-top"]();
      }
      let theadSub;
      theadSub = null;
      if (slots["thead-sub"]) {
        theadSub = h("tr", computedFields.value.map((field) => h("td", {
          scope: "col",
          class: [field.class, field.thClass, field.variant ? `table-${field.variant}` : ""]
        }, slots["thead-sub"](__spreadValues2({ items: computedFields.value }, field)))));
      }
      const tHead = h("thead", [
        theadTop,
        h("tr", computedFields.value.map((field) => {
          var _a;
          const slotName = `head(${field.key})`;
          let thContent = field.label;
          if (slots[slotName]) {
            thContent = (_a = slots[slotName]) == null ? void 0 : _a.call(slots, {
              label: field.label
            });
          }
          return h("th", __spreadProps2(__spreadValues2({}, field.thAttr), {
            scope: "col",
            class: [field.class, field.thClass, field.variant ? `table-${field.variant}` : ""],
            title: field.headerTitle,
            abbr: field.headerAbbr,
            style: field.thStyle
          }), thContent);
        })),
        theadSub
      ]);
      const tBody = [
        h("tbody", props.items.map((tr, index) => h("tr", {
          class: [tr._rowVariant ? `table-${tr._rowVariant}` : null]
        }, computedFields.value.map((field) => {
          var _a;
          const slotName = `cell(${field.key})`;
          let tdContent = tr[field.key];
          if (slots[slotName]) {
            tdContent = (_a = slots[slotName]) == null ? void 0 : _a.call(slots, {
              value: tr[field.key],
              index,
              item: tr,
              items: props.items
            });
          }
          return h("td", __spreadProps2(__spreadValues2({}, field.tdAttr), {
            class: [
              field.class,
              field.tdClass,
              field.variant ? `table-${field.variant}` : "",
              (tr == null ? void 0 : tr._cellVariants) && (tr == null ? void 0 : tr._cellVariants[field.key]) ? `table-${tr == null ? void 0 : tr._cellVariants[field.key]}` : ""
            ]
          }), tdContent);
        }))))
      ];
      const tableContent = [tHead, tBody];
      if (slots["table-caption"]) {
        tableContent.push(h("caption", slots["table-caption"]()));
      } else {
        if (props.caption) {
          const tCaption = h("caption", props.caption);
          tableContent.push(tCaption);
        }
      }
      if (props.footClone) {
        const tFoot = h("tfoot", h("tr", computedFields.value.map((field) => h("th", __spreadProps2(__spreadValues2({}, field.thAttr), {
          scope: "col",
          class: [
            field.class,
            field.thClass,
            field.variant ? `table-${field.variant}` : ""
          ],
          title: field.headerTitle,
          abbr: field.headerAbbr,
          style: field.thStyle
        }), field.label))));
        tableContent.push(tFoot);
      }
      const table = h("table", {
        class: ["table", classes.value]
      }, tableContent);
      if (props.responsive) {
        return h("div", {
          class: {
            "table-responsive": typeof props.responsive === "boolean" && props.responsive,
            [`table-responsive-${props.responsive}`]: typeof props.responsive === "string"
          }
        }, table);
      }
      return table;
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div");
}
var BTable = _export_sfc(_sfc_main$7, [["render", _sfc_render]]);
var _sfc_main$6 = defineComponent({
  props: {
    headVariant: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const classes = computed(() => ({
      [`thead-${props.headVariant}`]: props.headVariant
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("tbody", {
        role: "rowgroup",
        class: normalizeClass(unref(classes))
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 2);
    };
  }
});
var _sfc_main$5 = defineComponent({
  props: {
    colspan: { type: [String, Number] },
    rowspan: { type: [String, Number] },
    stackedHeading: { type: String },
    stickyColumn: { type: Boolean, default: false },
    variant: { type: String }
  },
  setup(props) {
    const slots = useSlots();
    const classes = computed(() => ({
      [`table-${props.variant}`]: props.variant,
      "b-table-sticky-column": props.stickyColumn,
      "table-b-table-default": props.stickyColumn && !props.variant
    }));
    const scope = computed(() => props.colspan ? "colspan" : props.rowspan ? "rowspan" : "col");
    const children = computed(() => {
      var _a, _b;
      return props.stackedHeading ? h("div", (_a = slots.default) == null ? void 0 : _a.call(slots)) : (_b = slots.default) == null ? void 0 : _b.call(slots);
    });
    return () => h("td", {
      "role": "cell",
      "scope": scope.value,
      "class": classes.value,
      "colspan": props.colspan,
      "rowspan": props.rowspan,
      "data-label": props.stackedHeading
    }, children.value);
  }
});
var _sfc_main$4 = defineComponent({
  props: {
    footVariant: { type: String }
  },
  setup(__props) {
    const props = __props;
    const classes = computed(() => ({
      [`table-${props.footVariant}`]: props.footVariant
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("tfoot", {
        role: "rowgroup",
        class: normalizeClass(unref(classes))
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 2);
    };
  }
});
var _sfc_main$3 = defineComponent({
  props: {
    colspan: { type: [String, Number] },
    rowspan: { type: [String, Number] },
    stackedHeading: { type: String },
    stickyColumn: { type: Boolean, default: false },
    variant: { type: String }
  },
  setup(__props) {
    var _a;
    const props = __props;
    const slots = useSlots();
    const classes = computed(() => ({
      [`table-${props.variant}`]: props.variant,
      "b-table-sticky-column": props.stickyColumn,
      "table-b-table-default": props.stickyColumn && !props.variant
    }));
    const scope = computed(() => props.colspan ? "colspan" : props.rowspan ? "rowspan" : "col");
    let content = (_a = slots.default) == null ? void 0 : _a.call(slots);
    if (props.stackedHeading) {
      content = h("div", content);
    }
    const Render = h("th", {
      "role": "columnheader",
      "scope": scope.value,
      "class": classes.value,
      "colspan": props.colspan,
      "rowspan": props.rowspan,
      "data-label": props.stackedHeading
    }, content);
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Render));
    };
  }
});
var _sfc_main$2 = defineComponent({
  props: {
    headVariant: { type: String }
  },
  setup(__props) {
    const props = __props;
    const classes = computed(() => ({
      [`table-${props.headVariant}`]: props.headVariant
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("thead", {
        role: "rowgroup",
        class: normalizeClass(unref(classes))
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 2);
    };
  }
});
var _sfc_main$1 = defineComponent({
  props: {
    variant: { type: String }
  },
  setup(__props) {
    const props = __props;
    const classes = computed(() => ({
      [`table-${props.variant}`]: props.variant
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("tr", {
        role: "row",
        class: normalizeClass(unref(classes))
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 2);
    };
  }
});
var SLOT_NAME_TOAST_TITLE = "toast-title";
var MIN_DURATION = 5e3;
var _sfc_main = defineComponent({
  name: "BToast",
  emits: ["destroyed", "update:modelValue"],
  props: __spreadProps2(__spreadValues2({}, BLINK_PROPS), {
    delay: { type: Number, default: 5e3 },
    bodyClass: { type: String },
    body: { type: [Object, String] },
    headerClass: { type: String },
    headerTag: { type: String, default: "div" },
    animation: { type: Boolean, default: true },
    id: { type: String },
    isStatus: { type: Boolean, default: false },
    autoHide: { type: Boolean, default: true },
    noCloseButton: { type: Boolean, default: false },
    noFade: { type: Boolean, default: false },
    noHoverPause: { type: Boolean, default: false },
    solid: { type: Boolean, default: false },
    static: { type: Boolean, default: false },
    title: { type: String },
    modelValue: { type: Boolean, default: false },
    toastClass: { type: Array },
    variant: { type: String }
  }),
  setup(props, { emit, slots }) {
    const isTransitioning = ref(false);
    const isHiding = ref(false);
    const localShow = ref(false);
    const classes = computed(() => ({
      [`b-toast-${props.variant}`]: props.variant,
      show: localShow.value || isTransitioning.value
    }));
    let dismissTimer;
    let dismissStarted;
    let resumeDismiss;
    const clearDismissTimer = () => {
      clearTimeout(dismissTimer);
      dismissTimer = void 0;
    };
    const computedDuration = computed(() => Math.max(toInteger(props.delay, 0), MIN_DURATION));
    const hide2 = () => {
      if (props.modelValue) {
        dismissStarted = resumeDismiss = 0;
        clearDismissTimer();
        isHiding.value = true;
        requestAF(() => {
          localShow.value = false;
        });
      }
    };
    const show = () => {
      clearDismissTimer();
      emit("update:modelValue", true);
      dismissStarted = resumeDismiss = 0;
      isHiding.value = false;
      nextTick(() => {
        requestAF(() => {
          localShow.value = true;
        });
      });
    };
    const onPause = () => {
      if (!props.autoHide || props.noHoverPause || !dismissTimer || resumeDismiss) {
        return;
      }
      const passed = Date.now() - dismissStarted;
      if (passed > 0) {
        clearDismissTimer();
        resumeDismiss = Math.max(computedDuration.value - passed, MIN_DURATION);
      }
    };
    const onUnPause = () => {
      if (!props.autoHide || props.noHoverPause || !resumeDismiss) {
        resumeDismiss = dismissStarted = 0;
      }
      startDismissTimer();
    };
    watch(() => props.modelValue, (newValue) => {
      newValue ? show() : hide2();
    });
    const startDismissTimer = () => {
      clearDismissTimer();
      if (props.autoHide) {
        dismissTimer = setTimeout(hide2, resumeDismiss || computedDuration.value);
        dismissStarted = Date.now();
        resumeDismiss = 0;
      }
    };
    const OnBeforeEnter = () => {
      isTransitioning.value = true;
      emit("update:modelValue", true);
    };
    const OnAfterEnter = () => {
      isTransitioning.value = false;
      startDismissTimer();
    };
    const OnBeforeLeave = () => {
      isTransitioning.value = true;
    };
    const OnAfterLeave = () => {
      isTransitioning.value = false;
      resumeDismiss = dismissStarted = 0;
      emit("update:modelValue", false);
    };
    computed(() => ({
      OnBeforeEnter,
      OnAfterEnter,
      OnBeforeLeave,
      OnAfterLeave
    }));
    onUnmounted(() => {
      clearDismissTimer();
      if (!props.autoHide) {
        return;
      }
      emit("destroyed", props.id);
    });
    onMounted(() => {
      nextTick(() => {
        if (props.modelValue) {
          requestAF(() => {
            show();
          });
        }
      });
    });
    const onLinkClick = () => {
      nextTick(() => {
        requestAF(() => {
          hide2();
        });
      });
    };
    return () => {
      const makeToast = () => {
        const $headerContent = [];
        const $title = normalizeSlot(SLOT_NAME_TOAST_TITLE, { hide: hide2 }, slots);
        if ($title) {
          $headerContent.push(h($title));
        } else if (props.title) {
          $headerContent.push(h("strong", { class: "me-auto" }, props.title));
        }
        if (!props.noCloseButton && $headerContent.length !== 0) {
          $headerContent.push(h(BCloseButton, {
            class: ["btn-close"],
            onClick: () => {
              hide2();
            }
          }));
        }
        const $innertoast = [];
        if ($headerContent.length > 0) {
          $innertoast.push(h(props.headerTag, {
            class: "toast-header"
          }, { default: () => $headerContent }));
        }
        if (normalizeSlot("default", { hide: hide2 }, slots) || props.body) {
          const $body = h(isLink(props) ? "b-link" : "div", {
            class: ["toast-body", props.bodyClass],
            onClick: isLink(props) ? { click: onLinkClick } : {}
          }, normalizeSlot("default", { hide: hide2 }, slots) || props.body);
          $innertoast.push($body);
        }
        return h("div", {
          class: ["toast", props.toastClass, classes.value],
          tabindex: "0"
        }, $innertoast);
      };
      const $toast = h("div", {
        "class": ["b-toast"],
        "id": props.id,
        "role": isHiding.value ? null : props.isStatus ? "status" : "alert",
        "aria-live": isHiding.value ? null : props.isStatus ? "polite" : "assertive",
        "aria-atomic": isHiding.value ? null : "true",
        "onmouseenter": onPause,
        "onmouseleave": onUnPause
      }, [
        h(_sfc_main$m, {
          noFade: props.noFade,
          onAfterEnter: OnAfterEnter,
          onBeforeEnter: OnBeforeEnter,
          onAfterLeave: OnAfterLeave,
          onBeforeLeave: OnBeforeLeave
        }, () => [localShow.value ? makeToast() : ""])
      ]);
      return $toast;
    };
  }
});
var Components = {
  BAccordion,
  BAccordionItem,
  BAlert,
  BAvatar,
  BAvatarGroup,
  BBadge,
  BBreadcrumb,
  BBreadcrumbItem,
  BButton,
  BButtonGroup,
  BButtonToolbar,
  BCard,
  BCardBody,
  BCardFooter,
  BCardGroup,
  BCardHeader,
  BCardImg,
  BCardSubTitle,
  BCardText,
  BCardTitle,
  BCarousel,
  BCarouselSlide,
  BCloseButton,
  BCol,
  BCollapse,
  BContainer: _sfc_main$_,
  BDropdown,
  BDropdownDivider,
  BDropdownForm,
  BDropdownGroup,
  BDropdownHeader,
  BDropdownItem,
  BDropdownItemButton,
  BDropdownText,
  BForm,
  BFormCheckbox,
  BFormCheckboxGroup,
  BFormFloatingLabel,
  BFormGroup: _sfc_main$J,
  BFormInput,
  BFormInvalidFeedback,
  BFormRadio,
  BFormRadioGroup,
  BFormRow,
  BFormSelect,
  BFormSelectOption,
  BFormSelectOptionGroup,
  BFormText,
  BFormTextarea,
  BFormTag: _sfc_main$C,
  BFormTags: _sfc_main$B,
  BFormValidFeedback,
  BImg,
  BInputGroup,
  BInputGroupAddon,
  BInputGroupAppend,
  BInputGroupPrepend,
  BInputGroupText,
  BLink,
  BListGroup,
  BListGroupItem,
  BModal: BModal$1,
  BNav,
  BNavItem,
  BNavItemDropdown,
  BOffcanvas,
  BOverlay: _sfc_main$l,
  BPagination: _sfc_main$k,
  BPopover: BPopover$1,
  BProgress,
  BProgressBar: _sfc_main$h,
  BRow,
  BSkeleton: _sfc_main$f,
  BSkeletonIcon: _sfc_main$e,
  BSkeletonTable: _sfc_main$c,
  BSkeletonWrapper: _sfc_main$b,
  BSpinner,
  BTab,
  BTable,
  BTableSimple: _sfc_main$d,
  BTbody: _sfc_main$6,
  BTd: _sfc_main$5,
  BTfoot: _sfc_main$4,
  BTh: _sfc_main$3,
  BThead: _sfc_main$2,
  BTr: _sfc_main$1,
  BToast: _sfc_main,
  BToaster: BToastContainer,
  BToastContainer,
  BTabs,
  BTransition: _sfc_main$m,
  BToastPlugin
};
var BModal = {
  mounted(el, binding) {
    let target = binding.value;
    if (Object.keys(binding.modifiers).length > 0) {
      [target] = Object.keys(binding.modifiers);
    }
    el.setAttribute("data-bs-toggle", "modal");
    el.setAttribute("data-bs-target", `#${target}`);
  }
};
var BPopover = {
  mounted(el, binding) {
    let placement = "right";
    const trigger = [];
    if (binding.modifiers.left) {
      placement = "left";
    } else if (binding.modifiers.right) {
      placement = "right";
    } else if (binding.modifiers.bottom) {
      placement = "bottom";
    } else if (binding.modifiers.top) {
      placement = "top";
    }
    if (binding.modifiers.manual) {
      trigger.push("manual");
    } else {
      if (binding.modifiers.click) {
        trigger.push("click");
      }
      if (binding.modifiers.hover) {
        trigger.push("hover");
      }
      if (binding.modifiers.focus) {
        trigger.push("focus");
      }
    }
    el.setAttribute("data-bs-toggle", "popover");
    new import_popover.default(el, {
      trigger: trigger.length === 0 ? "click" : trigger.join(" "),
      placement,
      content: binding.value
    });
  },
  unmounted(el) {
    const instance = import_popover.default.getInstance(el);
    instance == null ? void 0 : instance.dispose();
  }
};
function resolveTrigger(modifiers) {
  if (modifiers.manual) {
    return "manual";
  }
  const trigger = [];
  if (modifiers.click) {
    trigger.push("click");
  }
  if (modifiers.hover) {
    trigger.push("hover");
  }
  if (modifiers.focus) {
    trigger.push("focus");
  }
  if (trigger.length > 0) {
    return trigger.join(" ");
  }
  return "hover focus";
}
function resolvePlacement(modifiers) {
  if (modifiers.left) {
    return "left";
  }
  if (modifiers.right) {
    return "right";
  }
  if (modifiers.bottom) {
    return "bottom";
  }
  return "top";
}
function resolveDelay(values) {
  if (values == null ? void 0 : values.delay) {
    return values.delay;
  }
  return 0;
}
var BTooltip = {
  beforeMount(el, binding) {
    el.setAttribute("data-bs-toggle", "tooltip");
    const isHtml = /<("[^"]*"|'[^']*'|[^'">])*>/.test(el.title);
    const trigger = resolveTrigger(binding.modifiers);
    const placement = resolvePlacement(binding.modifiers);
    const delay = resolveDelay(binding.value);
    new import_tooltip.default(el, {
      trigger,
      placement,
      delay,
      html: isHtml
    });
  },
  updated(el) {
    const title = el.getAttribute("title");
    if (title !== "") {
      const instance = import_tooltip.default.getInstance(el);
      instance == null ? void 0 : instance.toggle();
      el.setAttribute("data-bs-original-title", title || "");
      el.setAttribute("title", "");
      instance == null ? void 0 : instance.toggle();
    }
  },
  unmounted(el) {
    const instance = import_tooltip.default.getInstance(el);
    instance == null ? void 0 : instance.dispose();
  }
};
var observerInstances = new Map();
function destroy(el) {
  if (observerInstances.has(el)) {
    const observer = observerInstances.get(el);
    if (observer && observer.stop) {
      observer.stop();
    }
    observerInstances.delete(el);
  }
}
function bind(el, binding) {
  const options = {
    margin: "0px",
    once: false,
    callback: binding.value
  };
  Object.keys(binding.modifiers).forEach((mod) => {
    if (Number.isInteger(mod)) {
      options.margin = `${mod}px`;
    } else if (mod.toLowerCase() === "once") {
      options.once = true;
    }
  });
  destroy(el);
  const observer = new VisibilityObserver(el, options.margin, options.once, options.callback, binding.instance);
  observerInstances.set(el, observer);
}
var BVisible = {
  beforeMount(el, binding) {
    bind(el, binding);
  },
  updated(el, binding) {
    bind(el, binding);
  },
  unmounted(el) {
    destroy(el);
  }
};
var VisibilityObserver = class {
  constructor(element, margin, once, callback, instance) {
    this.element = element;
    this.margin = margin;
    this.once = once;
    this.callback = callback;
    this.instance = instance;
    this.createObserver();
  }
  createObserver() {
    if (this.observer) {
      this.stop();
    }
    if (this.doneOnce || typeof this.callback !== "function") {
      return;
    }
    try {
      this.observer = new IntersectionObserver(this.handler.bind(this), {
        root: null,
        rootMargin: this.margin,
        threshold: 0
      });
    } catch (e) {
      console.error("Intersection Observer not supported");
      this.doneOnce = true;
      this.observer = void 0;
      this.callback(null);
      return;
    }
    this.instance.$nextTick(() => {
      if (this.observer) {
        this.observer.observe(this.element);
      }
    });
  }
  handler(entries) {
    const [entry] = entries;
    const isIntersecting = Boolean(entry.isIntersecting || entry.intersectionRatio > 0);
    if (isIntersecting !== this.visible) {
      this.visible = isIntersecting;
      this.callback(isIntersecting);
      if (this.once && this.visible) {
        this.doneOnce = true;
        this.stop();
      }
    }
  }
  stop() {
    this.observer && this.observer.disconnect();
    this.observer = null;
  }
};
var focus = {
  mounted(el, binding) {
    if (binding.value !== false) {
      el.focus();
    }
  }
};
var Directives = {
  BModal,
  BPopover,
  BToggle,
  BTooltip,
  BVisible,
  focus
};
var plugin = {
  install(app, options = {}) {
    Object.entries(Components).forEach(([name, component]) => {
      app.component(name, component);
    });
    Object.entries(Directives).forEach(([name, component]) => {
      app.directive(name, component);
    });
    createBreadcrumb(app);
  }
};

// dep:bootstrap-vue-3
var bootstrap_vue_3_default = plugin;
export {
  BAccordion,
  BAccordionItem,
  BAlert,
  BAvatar,
  BAvatarGroup,
  BBadge,
  BBreadcrumb,
  BBreadcrumbItem,
  BButton,
  BButtonGroup,
  BButtonToolbar,
  BCard,
  BCardBody,
  BCardFooter,
  BCardGroup,
  BCardHeader,
  BCardImg,
  BCardSubTitle,
  BCardText,
  BCardTitle,
  BCarousel,
  BCarouselSlide,
  BCloseButton,
  BCol,
  BCollapse,
  _sfc_main$_ as BContainer,
  BDropdown,
  BDropdownDivider,
  BDropdownForm,
  BDropdownGroup,
  BDropdownHeader,
  BDropdownItem,
  BDropdownItemButton,
  BDropdownText,
  BForm,
  BFormCheckbox,
  BFormCheckboxGroup,
  BFormFloatingLabel,
  _sfc_main$J as BFormGroup,
  BFormInput,
  BFormInvalidFeedback,
  BFormRadio,
  BFormRadioGroup,
  BFormRow,
  BFormSelect,
  BFormSelectOption,
  BFormSelectOptionGroup,
  BFormText,
  BFormTextarea,
  BFormValidFeedback,
  BImg,
  BInputGroup,
  BInputGroupAddon,
  BInputGroupAppend,
  BInputGroupPrepend,
  BInputGroupText,
  BLink,
  BListGroup,
  BListGroupItem,
  BModal$1 as BModal,
  BNav,
  BNavItem,
  BOffcanvas,
  _sfc_main$l as BOverlay,
  _sfc_main$k as BPagination,
  BPopover$1 as BPopover,
  BProgress,
  _sfc_main$h as BProgressBar,
  BRow,
  BSpinner,
  BTab,
  BTable,
  _sfc_main$d as BTableSimple,
  BTabs,
  _sfc_main$6 as BTbody,
  _sfc_main$5 as BTd,
  _sfc_main$4 as BTfoot,
  _sfc_main$3 as BTh,
  _sfc_main$2 as BThead,
  _sfc_main as BToast,
  BToastPlugin,
  BToastContainer as BToaster,
  _sfc_main$1 as BTr,
  _sfc_main$m as BTransition,
  plugin as BootstrapVue3,
  BPopover as VBPopover,
  BToggle as VBToggle,
  BTooltip as VBTooltip,
  BVisible as VBVisible,
  bootstrap_vue_3_default as default,
  useToast
};
/*!
  * Bootstrap alert.js v5.1.3 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
/*!
  * Bootstrap base-component.js v5.1.3 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
/*!
  * Bootstrap carousel.js v5.1.3 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
/*!
  * Bootstrap collapse.js v5.1.3 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
/*!
  * Bootstrap data.js v5.1.3 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
/*!
  * Bootstrap dropdown.js v5.1.3 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
/*!
  * Bootstrap event-handler.js v5.1.3 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
/*!
  * Bootstrap manipulator.js v5.1.3 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
/*!
  * Bootstrap modal.js v5.1.3 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
/*!
  * Bootstrap offcanvas.js v5.1.3 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
/*!
  * Bootstrap popover.js v5.1.3 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
/*!
  * Bootstrap selector-engine.js v5.1.3 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
/*!
  * Bootstrap tooltip.js v5.1.3 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
//# sourceMappingURL=bootstrap-vue-3.js.map
