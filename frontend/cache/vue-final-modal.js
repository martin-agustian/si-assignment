import {
  Fragment,
  Transition,
  computed,
  createBlock,
  createCommentVNode,
  createSlots,
  createVNode,
  mergeProps,
  nextTick,
  onBeforeUnmount,
  onMounted,
  openBlock,
  popScopeId,
  pushScopeId,
  reactive,
  ref,
  renderList,
  renderSlot,
  resolveDynamicComponent,
  shallowReactive,
  toHandlers,
  vShow,
  watch,
  withCtx,
  withDirectives,
  withKeys,
  withModifiers,
  withScopeId
} from "./chunk-EW6SBXYQ.js";
import "./chunk-ENMAWK7U.js";

// node_modules/vue-final-modal/dist/VueFinalModal.esm.js
function C(e) {
  return (C = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e2) {
    return typeof e2;
  } : function(e2) {
    return e2 && typeof Symbol == "function" && e2.constructor === Symbol && e2 !== Symbol.prototype ? "symbol" : typeof e2;
  })(e);
}
function k(e, t, n, o, r, i, a) {
  try {
    var l = e[i](a), u = l.value;
  } catch (e2) {
    return void n(e2);
  }
  l.done ? t(u) : Promise.resolve(u).then(o, r);
}
function A(e, t) {
  for (var n = 0; n < t.length; n++) {
    var o = t[n];
    o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, o.key, o);
  }
}
function L(e, t, n) {
  return t in e ? Object.defineProperty(e, t, { value: n, enumerable: true, configurable: true, writable: true }) : e[t] = n, e;
}
function B(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    t && (o = o.filter(function(t2) {
      return Object.getOwnPropertyDescriptor(e, t2).enumerable;
    })), n.push.apply(n, o);
  }
  return n;
}
function _(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? B(Object(n), true).forEach(function(t2) {
      L(e, t2, n[t2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : B(Object(n)).forEach(function(t2) {
      Object.defineProperty(e, t2, Object.getOwnPropertyDescriptor(n, t2));
    });
  }
  return e;
}
function j(e) {
  return function(e2) {
    if (Array.isArray(e2))
      return P(e2);
  }(e) || function(e2) {
    if (typeof Symbol != "undefined" && Symbol.iterator in Object(e2))
      return Array.from(e2);
  }(e) || function(e2, t) {
    if (!e2)
      return;
    if (typeof e2 == "string")
      return P(e2, t);
    var n = Object.prototype.toString.call(e2).slice(8, -1);
    n === "Object" && e2.constructor && (n = e2.constructor.name);
    if (n === "Map" || n === "Set")
      return Array.from(e2);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return P(e2, t);
  }(e) || function() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function P(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, o = new Array(t); n < t; n++)
    o[n] = e[n];
  return o;
}
var I = function(e) {
  return function(e2, t) {
    return j(e2.querySelectorAll(t) || []);
  }(e, 'button:not([disabled]), select:not([disabled]), a[href]:not([disabled]), area[href]:not([disabled]), [contentEditable=""]:not([disabled]), [contentEditable="true"]:not([disabled]), [contentEditable="TRUE"]:not([disabled]), textarea:not([disabled]), iframe:not([disabled]), input:not([disabled]), summary:not([disabled]), [tabindex]:not([tabindex="-1"])');
};
var V = function(e) {
  return e == document.activeElement;
};
var D = function() {
  function e() {
    !function(e2, t2) {
      if (!(e2 instanceof t2))
        throw new TypeError("Cannot call a class as a function");
    }(this, e), this.root = null, this.elements = [], this.onKeyDown = this.onKeyDown.bind(this), this.enable = this.enable.bind(this), this.disable = this.disable.bind(this), this.firstElement = this.firstElement.bind(this), this.lastElement = this.lastElement.bind(this);
  }
  var t, n, o;
  return t = e, (n = [{ key: "lastElement", value: function() {
    return this.elements[this.elements.length - 1] || null;
  } }, { key: "firstElement", value: function() {
    return this.elements[0] || null;
  } }, { key: "onKeyDown", value: function(e2) {
    if (function(e3) {
      return e3.key === "Tab" || e3.keyCode === 9;
    }(e2)) {
      if (!e2.shiftKey)
        return !document.activeElement || V(this.lastElement()) ? (this.firstElement().focus(), void e2.preventDefault()) : void 0;
      V(this.firstElement()) && (this.lastElement().focus(), e2.preventDefault());
    }
  } }, { key: "enabled", value: function() {
    return !!this.root;
  } }, { key: "enable", value: function(e2) {
    e2 && (this.root = e2, this.elements = I(this.root), this.root.addEventListener("keydown", this.onKeyDown));
  } }, { key: "disable", value: function() {
    this.root.removeEventListener("keydown", this.onKeyDown), this.root = null;
  } }]) && A(t.prototype, n), o && A(t, o), e;
}();
var N = function(e) {
  var t = e.targetTouches ? e.targetTouches[0] : e;
  return { x: t.clientX, y: t.clientY };
};
var R = function(e, t, n) {
  return typeof e != "number" && (e = Math.min(t, n) || t), typeof n != "number" && (n = Math.max(t, e)), Math.min(Math.max(t, e), n);
};
var $ = function(e) {
  return e && Number(e.replace(/px$/, "")) || 0;
};
var H = { down: { pc: "mousedown", m: "touchstart" }, move: { pc: "mousemove", m: "touchmove" }, up: { pc: "mouseup", m: "touchend" } };
var K = function(e, t, n) {
  t && t.addEventListener(H[e].pc, n), t && t.addEventListener(H[e].m, n, { passive: false });
};
var U = function(e, t, n) {
  t && t.removeEventListener(H[e].pc, n), t && t.removeEventListener(H[e].m, n);
};
var F = false;
if (typeof window != "undefined") {
  W = { get passive() {
    F = true;
  } };
  window.addEventListener("testPassive", null, W), window.removeEventListener("testPassive", null, W);
}
var W;
var Y;
var q;
var G = typeof window != "undefined" && window.navigator && window.navigator.platform && (/iP(ad|hone|od)/.test(window.navigator.platform) || window.navigator.platform === "MacIntel" && window.navigator.maxTouchPoints > 1);
var X = [];
var Z = false;
var J = 0;
var Q = -1;
var ee = function(e, t) {
  var n = false;
  return function(e2) {
    for (var t2 = []; e2; ) {
      if (t2.push(e2), e2.classList.contains("vfm"))
        return t2;
      e2 = e2.parentElement;
    }
    return t2;
  }(e).forEach(function(e2) {
    (function(e3) {
      if (!e3 || e3.nodeType !== Node.ELEMENT_NODE)
        return false;
      var t2 = window.getComputedStyle(e3);
      return ["auto", "scroll"].includes(t2.overflowY) && e3.scrollHeight > e3.clientHeight;
    })(e2) && function(e3, t2) {
      return !(e3.scrollTop === 0 && t2 < 0 || e3.scrollTop + e3.clientHeight + t2 >= e3.scrollHeight && t2 > 0);
    }(e2, t) && (n = true);
  }), n;
};
var te = function(e) {
  return X.some(function() {
    return ee(e, -J);
  });
};
var ne = function(e) {
  var t = e || window.event;
  return !!te(t.target) || (t.touches.length > 1 || (t.preventDefault && t.preventDefault(), false));
};
var oe = function(e, t) {
  if (e) {
    if (!X.some(function(t2) {
      return t2.targetElement === e;
    })) {
      var n = { targetElement: e, options: t || {} };
      X = [].concat(j(X), [n]), G ? (e.ontouchstart = function(e2) {
        e2.targetTouches.length === 1 && (Q = e2.targetTouches[0].clientY);
      }, e.ontouchmove = function(t2) {
        t2.targetTouches.length === 1 && function(e2, t3) {
          J = e2.targetTouches[0].clientY - Q, !te(e2.target) && (t3 && t3.scrollTop === 0 && J > 0 || function(e3) {
            return !!e3 && e3.scrollHeight - e3.scrollTop <= e3.clientHeight;
          }(t3) && J < 0 ? ne(e2) : e2.stopPropagation());
        }(t2, e);
      }, Z || (document.addEventListener("touchmove", ne, F ? { passive: false } : void 0), Z = true)) : function(e2) {
        if (q === void 0) {
          var t2 = !!e2 && e2.reserveScrollBarGap === true, n2 = window.innerWidth - document.documentElement.clientWidth;
          if (t2 && n2 > 0) {
            var o = parseInt(getComputedStyle(document.body).getPropertyValue("padding-right"), 10);
            q = document.body.style.paddingRight, document.body.style.paddingRight = "".concat(o + n2, "px");
          }
        }
        Y === void 0 && (Y = document.body.style.overflow, document.body.style.overflow = "hidden");
      }(t);
    }
  } else
    console.error("disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.");
};
var re = function(e) {
  e ? (X = X.filter(function(t) {
    return t.targetElement !== e;
  }), G ? (e.ontouchstart = null, e.ontouchmove = null, Z && X.length === 0 && (document.removeEventListener("touchmove", ne, F ? { passive: false } : void 0), Z = false)) : X.length || (q !== void 0 && (document.body.style.paddingRight = q, q = void 0), Y !== void 0 && (document.body.style.overflow = Y, Y = void 0))) : console.error("enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.");
};
var ie = function() {
};
var ae = "enter";
var le = "entering";
var ue = "leave";
var se = "leavng";
var fe = { t: "ns-resize", tr: "nesw-resize", r: "ew-resize", br: "nwse-resize", b: "ns-resize", bl: "nesw-resize", l: "ew-resize", tl: "nwse-resize" };
var de = { props: { name: { type: String, default: null }, modelValue: { type: Boolean, default: false }, ssr: { type: Boolean, default: true }, classes: { type: [String, Object, Array], default: "" }, overlayClass: { type: [String, Object, Array], default: "" }, contentClass: { type: [String, Object, Array], default: "" }, styles: { type: [Object, Array], default: function() {
  return {};
} }, overlayStyle: { type: [Object, Array], default: function() {
  return {};
} }, contentStyle: { type: [Object, Array], default: function() {
  return {};
} }, lockScroll: { type: Boolean, default: true }, hideOverlay: { type: Boolean, default: false }, clickToClose: { type: Boolean, default: true }, escToClose: { type: Boolean, default: false }, preventClick: { type: Boolean, default: false }, attach: { type: null, default: false, validator: function(e) {
  var t = C(e);
  return t === "boolean" || t === "string" || e.nodeType === Node.ELEMENT_NODE;
} }, transition: { type: [String, Object], default: "vfm" }, overlayTransition: { type: [String, Object], default: "vfm" }, keepOverlay: { type: Boolean, default: false }, zIndexAuto: { type: Boolean, default: true }, zIndexBase: { type: [String, Number], default: 1e3 }, zIndex: { type: [Boolean, String, Number], default: false }, focusRetain: { type: Boolean, default: true }, focusTrap: { type: Boolean, default: false }, fitParent: { type: Boolean, default: true }, drag: { type: Boolean, default: false }, dragSelector: { type: String, default: "" }, keepChangedStyle: { type: Boolean, default: false }, resize: { type: Boolean, default: false }, resizeDirections: { type: Array, default: function() {
  return ["t", "tr", "r", "br", "b", "bl", "l", "tl"];
}, validator: function(e) {
  return ["t", "tr", "r", "br", "b", "bl", "l", "tl"].filter(function(t) {
    return e.indexOf(t) !== -1;
  }).length === e.length;
} }, minWidth: { type: Number, default: 0 }, minHeight: { type: Number, default: 0 }, maxWidth: { type: Number, default: 1 / 0 }, maxHeight: { type: Number, default: 1 / 0 } }, emits: ["update:modelValue", "click-outside", "before-open", "opened", "before-close", "closed", "_before-open", "_opened", "_closed", "drag:start", "drag:move", "drag:end", "resize:start", "resize:move", "resize:end"], setup: function(l, u) {
  var s = u.emit, f = Symbol("vfm"), d = ref(null), c = ref(null), v = ref(null), p = ref(null), m = ref(null), y = ref(null), h = ref(null), b = new D(), g = ref(false), w = reactive({ modal: false, overlay: false, resize: false }), x = ref(null), E = ref(null), S = ref(false), O = ref({}), z = ref({}), M = ref(null), T = ref(null), C2 = ie, k2 = ie, A2 = computed(function() {
    return typeof l.overlayTransition == "string" ? { name: l.overlayTransition } : _({}, l.overlayTransition);
  }), B2 = computed(function() {
    return typeof l.transition == "string" ? { name: l.transition } : _({}, l.transition);
  }), P2 = computed(function() {
    return (l.hideOverlay || x.value === ue) && E.value === ue;
  }), I2 = computed(function() {
    return l.zIndex === false ? !!l.zIndexAuto && +l.zIndexBase + 2 * (h.value || 0) : l.zIndex;
  }), V2 = computed(function() {
    return _({}, I2.value !== false && { zIndex: I2.value });
  }), H2 = computed(function() {
    var e = [z.value];
    return Array.isArray(l.contentStyle) ? e.push.apply(e, j(l.contentStyle)) : e.push(l.contentStyle), e;
  });
  function F2() {
    return { uid: f, props: l, emit: s, vfmContainer: c, vfmContent: v, vfmResize: p, vfmOverlayTransition: m, vfmTransition: y, getAttachElement: G2, modalStackIndex: h, visibility: w, handleLockScroll: q2, $focusTrap: b, toggle: Q2, params: O };
  }
  function W() {
    if (l.modelValue) {
      if (s("_before-open", X2({ type: "_before-open" })), Z2("before-open", false))
        return void k2("show");
      var e = G2();
      if (e || l.attach === false) {
        if (l.attach !== false) {
          if (!d.value)
            return g.value = true, void nextTick(function() {
              W();
            });
          e.appendChild(d.value);
        }
        var t = l.api.openedModals.findIndex(function(e2) {
          return e2.uid === f;
        });
        t !== -1 && l.api.openedModals.splice(t, 1), l.api.openedModals.push(F2()), h.value = l.api.openedModals.length - 1, q2(), l.api.openedModals.filter(function(e2) {
          return e2.uid !== f;
        }).forEach(function(t2, n) {
          t2.getAttachElement() === e && (t2.modalStackIndex.value = n, !t2.props.keepOverlay && (t2.visibility.overlay = false));
        }), g.value = true, w.overlay = true, w.modal = true;
      } else
        e !== false && console.warn("Unable to locate target ".concat(l.attach));
    }
  }
  function Y2() {
    var e = l.api.openedModals.findIndex(function(e2) {
      return e2.uid === f;
    });
    if (e !== -1 && l.api.openedModals.splice(e, 1), l.api.openedModals.length > 0) {
      var t = l.api.openedModals[l.api.openedModals.length - 1];
      t.props.focusTrap && t.$focusTrap.firstElement().focus(), (t.props.focusRetain || t.props.focusTrap) && t.vfmContainer.value.focus(), !t.props.hideOverlay && (t.visibility.overlay = true);
    }
    l.drag && ne2(), l.resize && ce2(), M.value = null, w.overlay = false, w.modal = false;
  }
  function q2() {
    l.modelValue && nextTick(function() {
      l.lockScroll ? oe(c.value, { reserveScrollBarGap: true }) : re(c.value);
    });
  }
  function G2() {
    return l.attach !== false && (typeof l.attach == "string" ? !!window && window.document.querySelector(l.attach) : l.attach);
  }
  function X2() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    return _({ ref: F2() }, e);
  }
  function Z2(e, t) {
    var n = false, o = X2({ type: e, stop: function() {
      n = true;
    } });
    return s(e, o), !!n && (S.value = true, nextTick(function() {
      s("update:modelValue", t);
    }), true);
  }
  function J2(e, t, n) {
    M.value = "".concat(t, ":").concat(n), s(M.value, e);
  }
  function Q2(e, t) {
    var n = arguments;
    return new Promise(function(o, r) {
      C2 = function(e2) {
        o(e2), C2 = ie;
      }, k2 = function(e2) {
        r(e2), k2 = ie;
      };
      var i = typeof e == "boolean" ? e : !l.modelValue;
      i && n.length === 2 && (O.value = t), s("update:modelValue", i);
    });
  }
  function ee2(e) {
    e.stopPropagation();
    var t, n = "resize", o = "drag", r = e.target.getAttribute("direction");
    if (r)
      t = n;
    else {
      if (!function(e2, t2, n2) {
        return n2 === "" || j(t2.querySelectorAll(n2)).includes(e2.target);
      }(e, v.value, l.dragSelector))
        return;
      t = o;
    }
    J2(e, t, "start");
    var i, a, u2, s2, f2 = N(e), d2 = c.value.getBoundingClientRect(), p2 = v.value.getBoundingClientRect(), m2 = window.getComputedStyle(v.value).position === "absolute", y2 = $(z.value.top), h2 = $(z.value.left), b2 = function() {
      if (l.fitParent) {
        var e2 = { absolute: function() {
          return { minTop: 0, minLeft: 0, maxTop: d2.height - p2.height, maxLeft: d2.width - p2.width };
        }, relative: function() {
          return { minTop: y2 + d2.top - p2.top, minLeft: h2 + d2.left - p2.left, maxTop: y2 + d2.bottom - p2.bottom, maxLeft: h2 + d2.right - p2.right };
        } };
        return m2 ? e2.absolute() : e2.relative();
      }
      return {};
    }(), g2 = t === n && (i = document.body, a = "cursor", u2 = fe[r], s2 = i.style[a], i.style[a] = u2, function() {
      i.style[a] = s2;
    }), w2 = function(e2) {
      e2.stopPropagation(), J2(e2, t, "move");
      var i2, a2, u3 = N(e2), s3 = { x: u3.x - f2.x, y: u3.y - f2.y };
      t === n && (s3 = function(e3, t2, n2, o2, r2) {
        var i3 = function(e4) {
          var n3, o3 = t2[e4.axis];
          o3 = l.fitParent ? R(e4.min, o3, e4.max) : o3;
          var i4 = R(e4.minEdge, e4.getEdge(o3), e4.maxEdge);
          return o3 = e4.getOffsetAxis(i4, r2), L(n3 = {}, e4.edgeName, i4), L(n3, e4.axis, o3), n3;
        }, a3 = function(e4, t3, r3, i4) {
          var a4, u5 = o2[t3], s5 = n2[e4] - o2[e4], f3 = (a4 = t3).charAt(0).toUpperCase() + a4.slice(1);
          return { axis: r3, edgeName: t3, min: i4 ? s5 : -u5, max: i4 ? u5 : s5, minEdge: l["min".concat(f3)], maxEdge: l["max".concat(f3)], getEdge: function(e5) {
            return o2[t3] - e5 * (i4 ? 1 : -1);
          }, getOffsetAxis: function(e5, n3) {
            var r4 = o2[t3] - e5;
            return n3 ? i4 ? r4 : 0 : (i4 ? 1 : -1) * r4 / 2;
          } };
        }, u4 = { t: ["top", "height", "y", true], b: ["bottom", "height", "y", false], l: ["left", "width", "x", true], r: ["right", "width", "x", false] }, s4 = { x: 0, y: 0 };
        return e3.split("").forEach(function(e4) {
          var t3 = a3.apply(void 0, j(u4[e4]));
          s4 = _(_({}, s4), i3(t3));
        }), s4;
      }(r, s3, d2, p2, m2)), m2 ? (i2 = p2.top - d2.top + s3.y, a2 = p2.left - d2.left + s3.x) : (i2 = y2 + s3.y, a2 = h2 + s3.x), t === o && l.fitParent && (i2 = R(b2.minTop, i2, b2.maxTop), a2 = R(b2.minLeft, a2, b2.maxLeft));
      var c2 = _(_(_({ position: "relative", top: i2 + "px", left: a2 + "px", margin: "unset", touchAction: "none" }, m2 && { position: "absolute", transform: "unset", width: p2.width + "px", height: p2.height + "px" }), s3.width && { width: s3.width + "px" }), s3.height && { height: s3.height + "px" });
      z.value = _(_({}, z.value), c2);
    };
    K("move", document, w2), K("up", document, function e2(o2) {
      o2.stopPropagation(), t === n && g2 && g2(), setTimeout(function() {
        J2(o2, t, "end");
      }), U("move", document, w2), U("up", document, e2);
    });
  }
  function te2() {
    K("down", v.value, ee2), z.value.touchAction = "none";
  }
  function ne2() {
    U("down", v.value, ee2);
  }
  function de2() {
    w.resize = true, nextTick(function() {
      K("down", p.value, ee2);
    });
  }
  function ce2() {
    U("down", p.value, ee2), w.resize = false;
  }
  return watch(function() {
    return l.modelValue;
  }, function(e) {
    if (S.value)
      S.value = false;
    else if (W(), !e) {
      if (Z2("before-close", true))
        return void k2("hide");
      Y2();
    }
  }), watch(function() {
    return l.lockScroll;
  }, q2), watch(function() {
    return l.hideOverlay;
  }, function(e) {
    l.modelValue && !e && (w.overlay = true);
  }), watch(function() {
    return l.attach;
  }, W), watch(P2, function(e) {
    e && (g.value = false, c.value.style.display = "none");
  }, { flush: "post" }), watch(function() {
    return l.drag;
  }, function(e) {
    g.value && (e ? te2() : ne2());
  }), watch(function() {
    return l.resize;
  }, function(e) {
    g.value && (e ? de2() : ce2());
  }), watch(function() {
    return l.keepChangedStyle;
  }, function(e) {
    e || (z.value = {});
  }), l.api.modals.push(F2()), onMounted(function() {
    W();
  }), onBeforeUnmount(function() {
    var e;
    Y2(), l.lockScroll && c.value && re(c.value), d == null || (e = d.value) === null || e === void 0 || e.remove();
    var t = l.api.modals.findIndex(function(e2) {
      return e2.uid === f;
    });
    l.api.modals.splice(t, 1);
  }), { root: d, vfmContainer: c, vfmContent: v, vfmResize: p, vfmOverlayTransition: m, vfmTransition: y, computedOverlayTransition: A2, computedTransition: B2, visible: g, visibility: w, params: O, calculateZIndex: I2, bindStyle: V2, bindContentStyle: H2, beforeOverlayEnter: function() {
    x.value = le;
  }, afterOverlayEnter: function() {
    x.value = ae;
  }, beforeOverlayLeave: function() {
    x.value = se;
  }, afterOverlayLeave: function() {
    x.value = ue;
  }, beforeModalEnter: function() {
    E.value = le;
  }, afterModalEnter: function() {
    E.value = ae, (l.focusRetain || l.focusTrap) && c.value.focus(), l.focusTrap && b.enable(c.value), l.drag && te2(), l.resize && de2(), s("_opened"), s("opened", X2({ type: "opened" })), C2("show");
  }, beforeModalLeave: function() {
    E.value = se, b.enabled() && b.disable();
  }, afterModalLeave: function() {
    E.value = ue, h.value = null, l.lockScroll && re(c.value), l.keepChangedStyle || (z.value = {});
    var e = false, t = X2({ type: "closed", stop: function() {
      e = true;
    } });
    s("_closed"), s("closed", t), C2("hide"), e || (O.value = {});
  }, onMousedown: function(e) {
    T.value = e == null ? void 0 : e.target;
  }, onMouseupContainer: function() {
    T.value === c.value && M.value !== "resize:move" && (s("click-outside", X2({ type: "click-outside" })), l.clickToClose && s("update:modelValue", false));
  }, onEsc: function() {
    g.value && l.escToClose && s("update:modelValue", false);
  } };
} };
var ce = withScopeId("data-v-2836fdb5");
pushScopeId("data-v-2836fdb5");
var ve = { key: 0, ref: "vfmResize", class: "vfm__resize vfm--absolute vfm--inset vfm--prevent-none vfm--select-none vfm--touch-none" };
popScopeId();
var pe = ce(function(e, t, n, o, r, i) {
  return n.ssr || o.visible ? withDirectives((openBlock(), createBlock("div", { key: 0, ref: "root", style: o.bindStyle, class: ["vfm vfm--inset", [n.attach === false ? "vfm--fixed" : "vfm--absolute", { "vfm--prevent-none": n.preventClick }]], onKeydown: t[4] || (t[4] = withKeys(function() {
    return o.onEsc && o.onEsc.apply(o, arguments);
  }, ["esc"])) }, [createVNode(Transition, mergeProps(o.computedOverlayTransition, { onBeforeEnter: o.beforeOverlayEnter, onAfterEnter: o.afterOverlayEnter, onBeforeLeave: o.beforeOverlayLeave, onAfterLeave: o.afterOverlayLeave }), { default: ce(function() {
    return [!n.hideOverlay && o.visibility.overlay ? (openBlock(), createBlock("div", { key: 0, class: ["vfm__overlay vfm--overlay vfm--absolute vfm--inset", n.overlayClass], style: n.overlayStyle }, null, 6)) : createCommentVNode("v-if", true)];
  }), _: 1 }, 16, ["onBeforeEnter", "onAfterEnter", "onBeforeLeave", "onAfterLeave"]), createVNode(Transition, mergeProps(o.computedTransition, { onBeforeEnter: o.beforeModalEnter, onAfterEnter: o.afterModalEnter, onBeforeLeave: o.beforeModalLeave, onAfterLeave: o.afterModalLeave }), { default: ce(function() {
    return [withDirectives(createVNode("div", { ref: "vfmContainer", class: ["vfm__container vfm--absolute vfm--inset vfm--outline-none", n.classes], style: n.styles, "aria-expanded": o.visibility.modal.toString(), role: "dialog", "aria-modal": "true", tabindex: "-1", onMouseup: t[2] || (t[2] = withModifiers(function() {
      return o.onMouseupContainer && o.onMouseupContainer.apply(o, arguments);
    }, ["self"])), onMousedown: t[3] || (t[3] = withModifiers(function() {
      return o.onMousedown && o.onMousedown.apply(o, arguments);
    }, ["self"])) }, [createVNode("div", { ref: "vfmContent", class: ["vfm__content", [n.contentClass, { "vfm--prevent-auto": n.preventClick }]], style: o.bindContentStyle, onMousedown: t[1] || (t[1] = function(e2) {
      return o.onMousedown(null);
    }) }, [renderSlot(e.$slots, "default", { params: o.params, close: function() {
      return e.$emit("update:modelValue", false);
    } }), o.visibility.resize && o.visibility.modal ? (openBlock(), createBlock("div", ve, [(openBlock(true), createBlock(Fragment, null, renderList(n.resizeDirections, function(e2) {
      return openBlock(), createBlock("div", { key: e2, direction: e2, class: ["vfm--resize-".concat(e2), "vfm--absolute vfm--prevent-auto"] }, null, 10, ["direction"]);
    }), 128))], 512)) : createCommentVNode("v-if", true)], 38)], 46, ["aria-expanded"]), [[vShow, o.visibility.modal]])];
  }), _: 3 }, 16, ["onBeforeEnter", "onAfterEnter", "onBeforeLeave", "onAfterLeave"])], 38)), [[vShow, !n.ssr || o.visible]]) : createCommentVNode("v-if", true);
});
!function(e, t) {
  t === void 0 && (t = {});
  var n = t.insertAt;
  if (e && typeof document != "undefined") {
    var o = document.head || document.getElementsByTagName("head")[0], r = document.createElement("style");
    r.type = "text/css", n === "top" && o.firstChild ? o.insertBefore(r, o.firstChild) : o.appendChild(r), r.styleSheet ? r.styleSheet.cssText = e : r.appendChild(document.createTextNode(e));
  }
}("\n.vfm--fixed[data-v-2836fdb5] {\n  position: fixed;\n}\n.vfm--absolute[data-v-2836fdb5] {\n  position: absolute;\n}\n.vfm--inset[data-v-2836fdb5] {\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n}\n.vfm--overlay[data-v-2836fdb5] {\n  background-color: rgba(0, 0, 0, 0.5);\n}\n.vfm--prevent-none[data-v-2836fdb5] {\n  pointer-events: none;\n}\n.vfm--prevent-auto[data-v-2836fdb5] {\n  pointer-events: auto;\n}\n.vfm--outline-none[data-v-2836fdb5]:focus {\n  outline: none;\n}\n.vfm-enter-active[data-v-2836fdb5],\n.vfm-leave-active[data-v-2836fdb5] {\n  transition: opacity 0.2s;\n}\n.vfm-enter-from[data-v-2836fdb5],\n.vfm-leave-to[data-v-2836fdb5] {\n  opacity: 0;\n}\n.vfm--touch-none[data-v-2836fdb5] {\n  touch-action: none;\n}\n.vfm--select-none[data-v-2836fdb5] {\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n.vfm--resize-tr[data-v-2836fdb5],\n.vfm--resize-br[data-v-2836fdb5],\n.vfm--resize-bl[data-v-2836fdb5],\n.vfm--resize-tl[data-v-2836fdb5] {\n  width: 12px;\n  height: 12px;\n  z-index: 10;\n}\n.vfm--resize-t[data-v-2836fdb5] {\n  top: -6px;\n  left: 0;\n  width: 100%;\n  height: 12px;\n  cursor: ns-resize;\n}\n.vfm--resize-tr[data-v-2836fdb5] {\n  top: -6px;\n  right: -6px;\n  cursor: nesw-resize;\n}\n.vfm--resize-r[data-v-2836fdb5] {\n  top: 0;\n  right: -6px;\n  width: 12px;\n  height: 100%;\n  cursor: ew-resize;\n}\n.vfm--resize-br[data-v-2836fdb5] {\n  bottom: -6px;\n  right: -6px;\n  cursor: nwse-resize;\n}\n.vfm--resize-b[data-v-2836fdb5] {\n  bottom: -6px;\n  left: 0;\n  width: 100%;\n  height: 12px;\n  cursor: ns-resize;\n}\n.vfm--resize-bl[data-v-2836fdb5] {\n  bottom: -6px;\n  left: -6px;\n  cursor: nesw-resize;\n}\n.vfm--resize-l[data-v-2836fdb5] {\n  top: 0;\n  left: -6px;\n  width: 12px;\n  height: 100%;\n  cursor: ew-resize;\n}\n.vfm--resize-tl[data-v-2836fdb5] {\n  top: -6px;\n  left: -6px;\n  cursor: nwse-resize;\n}\n"), de.render = pe, de.__scopeId = "data-v-2836fdb5", de.__file = "lib/VueFinalModal.vue";
var me = { props: {}, methods: { slice: function(e) {
  this.api.dynamicModals.splice(e, 1);
}, beforeOpen: function(e, t, n) {
  var o, r = this;
  return (o = function* () {
    e.ref.params.value = t.params, yield r.$nextTick(), yield r.$nextTick(), t.value || (r.slice(n), t.reject("show"));
  }, function() {
    var e2 = this, t2 = arguments;
    return new Promise(function(n2, r2) {
      var i = o.apply(e2, t2);
      function a(e3) {
        k(i, n2, r2, a, l, "next", e3);
      }
      function l(e3) {
        k(i, n2, r2, a, l, "throw", e3);
      }
      a(void 0);
    });
  })();
}, isString: function(e) {
  return typeof e == "string";
} } };
var ye = { class: "modals-container" };
function he(e, t) {
  var n = _(_({}, e), {}, { props: _({}, e.props) });
  return Object.assign(n.props, { api: { type: Object, default: function() {
    return t;
  } } }), n;
}
me.render = function(e, t, n, o, r, i) {
  return openBlock(), createBlock("div", ye, [(openBlock(true), createBlock(Fragment, null, renderList(e.api.dynamicModals, function(e2, t2) {
    return openBlock(), createBlock(resolveDynamicComponent(e2.component), mergeProps({ key: e2.id }, e2.bind, { modelValue: e2.value, "onUpdate:modelValue": function(t3) {
      return e2.value = t3;
    } }, toHandlers(e2.on), { on_closed: function(e3) {
      return i.slice(t2);
    }, on_beforeOpen: function(t3) {
      return i.beforeOpen(t3, e2);
    }, on_opened: e2.opened }), createSlots({ _: 2 }, [renderList(e2.slots, function(e3, t3) {
      return { name: t3, fn: withCtx(function() {
        return [createCommentVNode(" eslint-disable vue/no-v-html "), i.isString(e3) ? (openBlock(), createBlock("div", { key: 0, innerHTML: e3 }, null, 8, ["innerHTML"])) : (openBlock(), createBlock(resolveDynamicComponent(e3.component), mergeProps({ key: 1 }, e3.bind, toHandlers(e3.on || {})), null, 16))];
      }) };
    })]), 1040, ["modelValue", "onUpdate:modelValue", "on_closed", "on_beforeOpen", "on_opened"]);
  }), 128))]);
}, me.__file = "lib/ModalsContainer.vue";
var be = 0;
var ge = function() {
  var e, t, n = (t = null, { show: function(e2) {
    for (var n2 = this, o = arguments.length, r = new Array(o > 1 ? o - 1 : 0), i = 1; i < o; i++)
      r[i - 1] = arguments[i];
    switch (C(e2)) {
      case "string":
        return this.toggle.apply(this, [e2, true].concat(r));
      case "object":
        return Promise.allSettled([new Promise(function(o2, i2) {
          var a = { value: true, id: Symbol("dynamicModal"), component: t, bind: {}, slots: {}, on: {}, params: r[0], reject: i2, opened: function() {
            o2("show");
          } };
          n2.dynamicModals.push(shallowReactive(Object.assign(a, e2)));
        })]);
    }
  }, hide: function() {
    for (var e2 = arguments.length, t2 = new Array(e2), n2 = 0; n2 < e2; n2++)
      t2[n2] = arguments[n2];
    return this.toggle(t2, false);
  }, hideAll: function() {
    return this.hide.apply(this, j(this.openedModals.map(function(e2) {
      return e2.props.name;
    })));
  }, toggle: function(e2) {
    for (var t2 = arguments.length, n2 = new Array(t2 > 1 ? t2 - 1 : 0), o = 1; o < t2; o++)
      n2[o - 1] = arguments[o];
    var r = Array.isArray(e2) ? this.get.apply(this, j(e2)) : this.get(e2);
    return Promise.allSettled(r.map(function(e3) {
      return e3.toggle.apply(e3, n2);
    }));
  }, get: function() {
    for (var e2 = arguments.length, t2 = new Array(e2), n2 = 0; n2 < e2; n2++)
      t2[n2] = arguments[n2];
    return this.modals.filter(function(e3) {
      return t2.includes(e3.props.name);
    });
  }, dynamicModals: shallowReactive([]), openedModals: [], modals: [], _setDefaultModal: function(e2) {
    t = e2;
  } });
  return L(e = {}, "$vfm", n), L(e, "VueFinalModal", function(e2) {
    var t2 = he(de, e2);
    return e2._setDefaultModal(t2), t2;
  }(n)), L(e, "ModalsContainer", function(e2) {
    return he(me, e2);
  }(n)), e;
};
var we = ge();
var xe = we.$vfm;
var Ee = we.VueFinalModal;
var Se = we.ModalsContainer;
var Oe = function(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = be === 0 ? we : ge(), o = n.$vfm, r = n.VueFinalModal, i = n.ModalsContainer;
  be += 1;
  var a = t.key || "$vfm", l = t.componentName || "VueFinalModal", u = t.dynamicContainerName || "ModalsContainer";
  Object.defineProperty(e.config.globalProperties, a, { get: function() {
    return o;
  } }), e.provide(a, o), e.component(l, r), e.component(u, i);
};
var ze = function(e) {
  return { install: function(t, n) {
    var o = Object.assign({}, e, n);
    Oe(t, o);
  } };
};
ze.install = Oe;
var VueFinalModal_esm_default = ze;

// dep:vue-final-modal
var vue_final_modal_default = VueFinalModal_esm_default;
export {
  xe as $vfm,
  Se as ModalsContainer,
  Ee as VueFinalModal,
  vue_final_modal_default as default,
  ge as defineVfm,
  ze as vfmPlugin
};
//# sourceMappingURL=vue-final-modal.js.map
