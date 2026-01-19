(function() {
    const f = document.createElement("link").relList;
    if (f && f.supports && f.supports("modulepreload"))
        return;
    for (const g of document.querySelectorAll('link[rel="modulepreload"]'))
        o(g);
    new MutationObserver(g => {
        for (const A of g)
            if (A.type === "childList")
                for (const j of A.addedNodes)
                    j.tagName === "LINK" && j.rel === "modulepreload" && o(j)
    }
    ).observe(document, {
        childList: !0,
        subtree: !0
    });
    function m(g) {
        const A = {};
        return g.integrity && (A.integrity = g.integrity),
        g.referrerPolicy && (A.referrerPolicy = g.referrerPolicy),
        g.crossOrigin === "use-credentials" ? A.credentials = "include" : g.crossOrigin === "anonymous" ? A.credentials = "omit" : A.credentials = "same-origin",
        A
    }
    function o(g) {
        if (g.ep)
            return;
        g.ep = !0;
        const A = m(g);
        fetch(g.href, A)
    }
}
)();
var br = {
    exports: {}
}
  , Rn = {};
var Rd;
function Vh() {
    if (Rd)
        return Rn;
    Rd = 1;
    var i = Symbol.for("react.transitional.element")
      , f = Symbol.for("react.fragment");
    function m(o, g, A) {
        var j = null;
        if (A !== void 0 && (j = "" + A),
        g.key !== void 0 && (j = "" + g.key),
        "key"in g) {
            A = {};
            for (var w in g)
                w !== "key" && (A[w] = g[w])
        } else
            A = g;
        return g = A.ref,
        {
            $$typeof: i,
            type: o,
            key: j,
            ref: g !== void 0 ? g : null,
            props: A
        }
    }
    return Rn.Fragment = f,
    Rn.jsx = m,
    Rn.jsxs = m,
    Rn
}
var Bd;
function Qh() {
    return Bd || (Bd = 1,
    br.exports = Vh()),
    br.exports
}
var r = Qh()
  , Sr = {
    exports: {}
}
  , ae = {};
var wd;
function Xh() {
    if (wd)
        return ae;
    wd = 1;
    var i = Symbol.for("react.transitional.element")
      , f = Symbol.for("react.portal")
      , m = Symbol.for("react.fragment")
      , o = Symbol.for("react.strict_mode")
      , g = Symbol.for("react.profiler")
      , A = Symbol.for("react.consumer")
      , j = Symbol.for("react.context")
      , w = Symbol.for("react.forward_ref")
      , _ = Symbol.for("react.suspense")
      , y = Symbol.for("react.memo")
      , E = Symbol.for("react.lazy")
      , C = Symbol.for("react.activity")
      , G = Symbol.iterator;
    function ee(h) {
        return h === null || typeof h != "object" ? null : (h = G && h[G] || h["@@iterator"],
        typeof h == "function" ? h : null)
    }
    var q = {
        isMounted: function() {
            return !1
        },
        enqueueForceUpdate: function() {},
        enqueueReplaceState: function() {},
        enqueueSetState: function() {}
    }
      , D = Object.assign
      , H = {};
    function Q(h, O, L) {
        this.props = h,
        this.context = O,
        this.refs = H,
        this.updater = L || q
    }
    Q.prototype.isReactComponent = {},
    Q.prototype.setState = function(h, O) {
        if (typeof h != "object" && typeof h != "function" && h != null)
            throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
        this.updater.enqueueSetState(this, h, O, "setState")
    }
    ,
    Q.prototype.forceUpdate = function(h) {
        this.updater.enqueueForceUpdate(this, h, "forceUpdate")
    }
    ;
    function J() {}
    J.prototype = Q.prototype;
    function le(h, O, L) {
        this.props = h,
        this.context = O,
        this.refs = H,
        this.updater = L || q
    }
    var ce = le.prototype = new J;
    ce.constructor = le,
    D(ce, Q.prototype),
    ce.isPureReactComponent = !0;
    var je = Array.isArray;
    function Me() {}
    var I = {
        H: null,
        A: null,
        T: null,
        S: null
    }
      , he = Object.prototype.hasOwnProperty;
    function Ce(h, O, L) {
        var Y = L.ref;
        return {
            $$typeof: i,
            type: h,
            key: O,
            ref: Y !== void 0 ? Y : null,
            props: L
        }
    }
    function we(h, O) {
        return Ce(h.type, O, h.props)
    }
    function He(h) {
        return typeof h == "object" && h !== null && h.$$typeof === i
    }
    function Te(h) {
        var O = {
            "=": "=0",
            ":": "=2"
        };
        return "$" + h.replace(/[=:]/g, function(L) {
            return O[L]
        })
    }
    var Qe = /\/+/g;
    function k(h, O) {
        return typeof h == "object" && h !== null && h.key != null ? Te("" + h.key) : O.toString(36)
    }
    function me(h) {
        switch (h.status) {
        case "fulfilled":
            return h.value;
        case "rejected":
            throw h.reason;
        default:
            switch (typeof h.status == "string" ? h.then(Me, Me) : (h.status = "pending",
            h.then(function(O) {
                h.status === "pending" && (h.status = "fulfilled",
                h.value = O)
            }, function(O) {
                h.status === "pending" && (h.status = "rejected",
                h.reason = O)
            })),
            h.status) {
            case "fulfilled":
                return h.value;
            case "rejected":
                throw h.reason
            }
        }
        throw h
    }
    function z(h, O, L, Y, W) {
        var te = typeof h;
        (te === "undefined" || te === "boolean") && (h = null);
        var se = !1;
        if (h === null)
            se = !0;
        else
            switch (te) {
            case "bigint":
            case "string":
            case "number":
                se = !0;
                break;
            case "object":
                switch (h.$$typeof) {
                case i:
                case f:
                    se = !0;
                    break;
                case E:
                    return se = h._init,
                    z(se(h._payload), O, L, Y, W)
                }
            }
        if (se)
            return W = W(h),
            se = Y === "" ? "." + k(h, 0) : Y,
            je(W) ? (L = "",
            se != null && (L = se.replace(Qe, "$&/") + "/"),
            z(W, O, L, "", function(Bt) {
                return Bt
            })) : W != null && (He(W) && (W = we(W, L + (W.key == null || h && h.key === W.key ? "" : ("" + W.key).replace(Qe, "$&/") + "/") + se)),
            O.push(W)),
            1;
        se = 0;
        var Xe = Y === "" ? "." : Y + ":";
        if (je(h))
            for (var De = 0; De < h.length; De++)
                Y = h[De],
                te = Xe + k(Y, De),
                se += z(Y, O, L, te, W);
        else if (De = ee(h),
        typeof De == "function")
            for (h = De.call(h),
            De = 0; !(Y = h.next()).done; )
                Y = Y.value,
                te = Xe + k(Y, De++),
                se += z(Y, O, L, te, W);
        else if (te === "object") {
            if (typeof h.then == "function")
                return z(me(h), O, L, Y, W);
            throw O = String(h),
            Error("Objects are not valid as a React child (found: " + (O === "[object Object]" ? "object with keys {" + Object.keys(h).join(", ") + "}" : O) + "). If you meant to render a collection of children, use an array instead.")
        }
        return se
    }
    function U(h, O, L) {
        if (h == null)
            return h;
        var Y = []
          , W = 0;
        return z(h, Y, "", "", function(te) {
            return O.call(L, te, W++)
        }),
        Y
    }
    function K(h) {
        if (h._status === -1) {
            var O = h._result;
            O = O(),
            O.then(function(L) {
                (h._status === 0 || h._status === -1) && (h._status = 1,
                h._result = L)
            }, function(L) {
                (h._status === 0 || h._status === -1) && (h._status = 2,
                h._result = L)
            }),
            h._status === -1 && (h._status = 0,
            h._result = O)
        }
        if (h._status === 1)
            return h._result.default;
        throw h._result
    }
    var V = typeof reportError == "function" ? reportError : function(h) {
        if (typeof window == "object" && typeof window.ErrorEvent == "function") {
            var O = new window.ErrorEvent("error",{
                bubbles: !0,
                cancelable: !0,
                message: typeof h == "object" && h !== null && typeof h.message == "string" ? String(h.message) : String(h),
                error: h
            });
            if (!window.dispatchEvent(O))
                return
        } else if (typeof process == "object" && typeof process.emit == "function") {
            process.emit("uncaughtException", h);
            return
        }
        console.error(h)
    }
      , P = {
        map: U,
        forEach: function(h, O, L) {
            U(h, function() {
                O.apply(this, arguments)
            }, L)
        },
        count: function(h) {
            var O = 0;
            return U(h, function() {
                O++
            }),
            O
        },
        toArray: function(h) {
            return U(h, function(O) {
                return O
            }) || []
        },
        only: function(h) {
            if (!He(h))
                throw Error("React.Children.only expected to receive a single React element child.");
            return h
        }
    };
    return ae.Activity = C,
    ae.Children = P,
    ae.Component = Q,
    ae.Fragment = m,
    ae.Profiler = g,
    ae.PureComponent = le,
    ae.StrictMode = o,
    ae.Suspense = _,
    ae.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = I,
    ae.__COMPILER_RUNTIME = {
        __proto__: null,
        c: function(h) {
            return I.H.useMemoCache(h)
        }
    },
    ae.cache = function(h) {
        return function() {
            return h.apply(null, arguments)
        }
    }
    ,
    ae.cacheSignal = function() {
        return null
    }
    ,
    ae.cloneElement = function(h, O, L) {
        if (h == null)
            throw Error("The argument must be a React element, but you passed " + h + ".");
        var Y = D({}, h.props)
          , W = h.key;
        if (O != null)
            for (te in O.key !== void 0 && (W = "" + O.key),
            O)
                !he.call(O, te) || te === "key" || te === "__self" || te === "__source" || te === "ref" && O.ref === void 0 || (Y[te] = O[te]);
        var te = arguments.length - 2;
        if (te === 1)
            Y.children = L;
        else if (1 < te) {
            for (var se = Array(te), Xe = 0; Xe < te; Xe++)
                se[Xe] = arguments[Xe + 2];
            Y.children = se
        }
        return Ce(h.type, W, Y)
    }
    ,
    ae.createContext = function(h) {
        return h = {
            $$typeof: j,
            _currentValue: h,
            _currentValue2: h,
            _threadCount: 0,
            Provider: null,
            Consumer: null
        },
        h.Provider = h,
        h.Consumer = {
            $$typeof: A,
            _context: h
        },
        h
    }
    ,
    ae.createElement = function(h, O, L) {
        var Y, W = {}, te = null;
        if (O != null)
            for (Y in O.key !== void 0 && (te = "" + O.key),
            O)
                he.call(O, Y) && Y !== "key" && Y !== "__self" && Y !== "__source" && (W[Y] = O[Y]);
        var se = arguments.length - 2;
        if (se === 1)
            W.children = L;
        else if (1 < se) {
            for (var Xe = Array(se), De = 0; De < se; De++)
                Xe[De] = arguments[De + 2];
            W.children = Xe
        }
        if (h && h.defaultProps)
            for (Y in se = h.defaultProps,
            se)
                W[Y] === void 0 && (W[Y] = se[Y]);
        return Ce(h, te, W)
    }
    ,
    ae.createRef = function() {
        return {
            current: null
        }
    }
    ,
    ae.forwardRef = function(h) {
        return {
            $$typeof: w,
            render: h
        }
    }
    ,
    ae.isValidElement = He,
    ae.lazy = function(h) {
        return {
            $$typeof: E,
            _payload: {
                _status: -1,
                _result: h
            },
            _init: K
        }
    }
    ,
    ae.memo = function(h, O) {
        return {
            $$typeof: y,
            type: h,
            compare: O === void 0 ? null : O
        }
    }
    ,
    ae.startTransition = function(h) {
        var O = I.T
          , L = {};
        I.T = L;
        try {
            var Y = h()
              , W = I.S;
            W !== null && W(L, Y),
            typeof Y == "object" && Y !== null && typeof Y.then == "function" && Y.then(Me, V)
        } catch (te) {
            V(te)
        } finally {
            O !== null && L.types !== null && (O.types = L.types),
            I.T = O
        }
    }
    ,
    ae.unstable_useCacheRefresh = function() {
        return I.H.useCacheRefresh()
    }
    ,
    ae.use = function(h) {
        return I.H.use(h)
    }
    ,
    ae.useActionState = function(h, O, L) {
        return I.H.useActionState(h, O, L)
    }
    ,
    ae.useCallback = function(h, O) {
        return I.H.useCallback(h, O)
    }
    ,
    ae.useContext = function(h) {
        return I.H.useContext(h)
    }
    ,
    ae.useDebugValue = function() {}
    ,
    ae.useDeferredValue = function(h, O) {
        return I.H.useDeferredValue(h, O)
    }
    ,
    ae.useEffect = function(h, O) {
        return I.H.useEffect(h, O)
    }
    ,
    ae.useEffectEvent = function(h) {
        return I.H.useEffectEvent(h)
    }
    ,
    ae.useId = function() {
        return I.H.useId()
    }
    ,
    ae.useImperativeHandle = function(h, O, L) {
        return I.H.useImperativeHandle(h, O, L)
    }
    ,
    ae.useInsertionEffect = function(h, O) {
        return I.H.useInsertionEffect(h, O)
    }
    ,
    ae.useLayoutEffect = function(h, O) {
        return I.H.useLayoutEffect(h, O)
    }
    ,
    ae.useMemo = function(h, O) {
        return I.H.useMemo(h, O)
    }
    ,
    ae.useOptimistic = function(h, O) {
        return I.H.useOptimistic(h, O)
    }
    ,
    ae.useReducer = function(h, O, L) {
        return I.H.useReducer(h, O, L)
    }
    ,
    ae.useRef = function(h) {
        return I.H.useRef(h)
    }
    ,
    ae.useState = function(h) {
        return I.H.useState(h)
    }
    ,
    ae.useSyncExternalStore = function(h, O, L) {
        return I.H.useSyncExternalStore(h, O, L)
    }
    ,
    ae.useTransition = function() {
        return I.H.useTransition()
    }
    ,
    ae.version = "19.2.3",
    ae
}
var Hd;
function Mr() {
    return Hd || (Hd = 1,
    Sr.exports = Xh()),
    Sr.exports
}
var T = Mr()
  , Ar = {
    exports: {}
}
  , Bn = {}
  , Er = {
    exports: {}
}
  , jr = {};
var Ud;
function Zh() {
    return Ud || (Ud = 1,
    (function(i) {
        function f(z, U) {
            var K = z.length;
            z.push(U);
            e: for (; 0 < K; ) {
                var V = K - 1 >>> 1
                  , P = z[V];
                if (0 < g(P, U))
                    z[V] = U,
                    z[K] = P,
                    K = V;
                else
                    break e
            }
        }
        function m(z) {
            return z.length === 0 ? null : z[0]
        }
        function o(z) {
            if (z.length === 0)
                return null;
            var U = z[0]
              , K = z.pop();
            if (K !== U) {
                z[0] = K;
                e: for (var V = 0, P = z.length, h = P >>> 1; V < h; ) {
                    var O = 2 * (V + 1) - 1
                      , L = z[O]
                      , Y = O + 1
                      , W = z[Y];
                    if (0 > g(L, K))
                        Y < P && 0 > g(W, L) ? (z[V] = W,
                        z[Y] = K,
                        V = Y) : (z[V] = L,
                        z[O] = K,
                        V = O);
                    else if (Y < P && 0 > g(W, K))
                        z[V] = W,
                        z[Y] = K,
                        V = Y;
                    else
                        break e
                }
            }
            return U
        }
        function g(z, U) {
            var K = z.sortIndex - U.sortIndex;
            return K !== 0 ? K : z.id - U.id
        }
        if (i.unstable_now = void 0,
        typeof performance == "object" && typeof performance.now == "function") {
            var A = performance;
            i.unstable_now = function() {
                return A.now()
            }
        } else {
            var j = Date
              , w = j.now();
            i.unstable_now = function() {
                return j.now() - w
            }
        }
        var _ = []
          , y = []
          , E = 1
          , C = null
          , G = 3
          , ee = !1
          , q = !1
          , D = !1
          , H = !1
          , Q = typeof setTimeout == "function" ? setTimeout : null
          , J = typeof clearTimeout == "function" ? clearTimeout : null
          , le = typeof setImmediate < "u" ? setImmediate : null;
        function ce(z) {
            for (var U = m(y); U !== null; ) {
                if (U.callback === null)
                    o(y);
                else if (U.startTime <= z)
                    o(y),
                    U.sortIndex = U.expirationTime,
                    f(_, U);
                else
                    break;
                U = m(y)
            }
        }
        function je(z) {
            if (D = !1,
            ce(z),
            !q)
                if (m(_) !== null)
                    q = !0,
                    Me || (Me = !0,
                    Te());
                else {
                    var U = m(y);
                    U !== null && me(je, U.startTime - z)
                }
        }
        var Me = !1
          , I = -1
          , he = 5
          , Ce = -1;
        function we() {
            return H ? !0 : !(i.unstable_now() - Ce < he)
        }
        function He() {
            if (H = !1,
            Me) {
                var z = i.unstable_now();
                Ce = z;
                var U = !0;
                try {
                    e: {
                        q = !1,
                        D && (D = !1,
                        J(I),
                        I = -1),
                        ee = !0;
                        var K = G;
                        try {
                            t: {
                                for (ce(z),
                                C = m(_); C !== null && !(C.expirationTime > z && we()); ) {
                                    var V = C.callback;
                                    if (typeof V == "function") {
                                        C.callback = null,
                                        G = C.priorityLevel;
                                        var P = V(C.expirationTime <= z);
                                        if (z = i.unstable_now(),
                                        typeof P == "function") {
                                            C.callback = P,
                                            ce(z),
                                            U = !0;
                                            break t
                                        }
                                        C === m(_) && o(_),
                                        ce(z)
                                    } else
                                        o(_);
                                    C = m(_)
                                }
                                if (C !== null)
                                    U = !0;
                                else {
                                    var h = m(y);
                                    h !== null && me(je, h.startTime - z),
                                    U = !1
                                }
                            }
                            break e
                        } finally {
                            C = null,
                            G = K,
                            ee = !1
                        }
                        U = void 0
                    }
                } finally {
                    U ? Te() : Me = !1
                }
            }
        }
        var Te;
        if (typeof le == "function")
            Te = function() {
                le(He)
            }
            ;
        else if (typeof MessageChannel < "u") {
            var Qe = new MessageChannel
              , k = Qe.port2;
            Qe.port1.onmessage = He,
            Te = function() {
                k.postMessage(null)
            }
        } else
            Te = function() {
                Q(He, 0)
            }
            ;
        function me(z, U) {
            I = Q(function() {
                z(i.unstable_now())
            }, U)
        }
        i.unstable_IdlePriority = 5,
        i.unstable_ImmediatePriority = 1,
        i.unstable_LowPriority = 4,
        i.unstable_NormalPriority = 3,
        i.unstable_Profiling = null,
        i.unstable_UserBlockingPriority = 2,
        i.unstable_cancelCallback = function(z) {
            z.callback = null
        }
        ,
        i.unstable_forceFrameRate = function(z) {
            0 > z || 125 < z ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : he = 0 < z ? Math.floor(1e3 / z) : 5
        }
        ,
        i.unstable_getCurrentPriorityLevel = function() {
            return G
        }
        ,
        i.unstable_next = function(z) {
            switch (G) {
            case 1:
            case 2:
            case 3:
                var U = 3;
                break;
            default:
                U = G
            }
            var K = G;
            G = U;
            try {
                return z()
            } finally {
                G = K
            }
        }
        ,
        i.unstable_requestPaint = function() {
            H = !0
        }
        ,
        i.unstable_runWithPriority = function(z, U) {
            switch (z) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                break;
            default:
                z = 3
            }
            var K = G;
            G = z;
            try {
                return U()
            } finally {
                G = K
            }
        }
        ,
        i.unstable_scheduleCallback = function(z, U, K) {
            var V = i.unstable_now();
            switch (typeof K == "object" && K !== null ? (K = K.delay,
            K = typeof K == "number" && 0 < K ? V + K : V) : K = V,
            z) {
            case 1:
                var P = -1;
                break;
            case 2:
                P = 250;
                break;
            case 5:
                P = 1073741823;
                break;
            case 4:
                P = 1e4;
                break;
            default:
                P = 5e3
            }
            return P = K + P,
            z = {
                id: E++,
                callback: U,
                priorityLevel: z,
                startTime: K,
                expirationTime: P,
                sortIndex: -1
            },
            K > V ? (z.sortIndex = K,
            f(y, z),
            m(_) === null && z === m(y) && (D ? (J(I),
            I = -1) : D = !0,
            me(je, K - V))) : (z.sortIndex = P,
            f(_, z),
            q || ee || (q = !0,
            Me || (Me = !0,
            Te()))),
            z
        }
        ,
        i.unstable_shouldYield = we,
        i.unstable_wrapCallback = function(z) {
            var U = G;
            return function() {
                var K = G;
                G = U;
                try {
                    return z.apply(this, arguments)
                } finally {
                    G = K
                }
            }
        }
    }
    )(jr)),
    jr
}
var Gd;
function Kh() {
    return Gd || (Gd = 1,
    Er.exports = Zh()),
    Er.exports
}
var Nr = {
    exports: {}
}
  , Pe = {};
var Ld;
function Jh() {
    if (Ld)
        return Pe;
    Ld = 1;
    var i = Mr();
    function f(_) {
        var y = "https://react.dev/errors/" + _;
        if (1 < arguments.length) {
            y += "?args[]=" + encodeURIComponent(arguments[1]);
            for (var E = 2; E < arguments.length; E++)
                y += "&args[]=" + encodeURIComponent(arguments[E])
        }
        return "Minified React error #" + _ + "; visit " + y + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    }
    function m() {}
    var o = {
        d: {
            f: m,
            r: function() {
                throw Error(f(522))
            },
            D: m,
            C: m,
            L: m,
            m,
            X: m,
            S: m,
            M: m
        },
        p: 0,
        findDOMNode: null
    }
      , g = Symbol.for("react.portal");
    function A(_, y, E) {
        var C = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
        return {
            $$typeof: g,
            key: C == null ? null : "" + C,
            children: _,
            containerInfo: y,
            implementation: E
        }
    }
    var j = i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
    function w(_, y) {
        if (_ === "font")
            return "";
        if (typeof y == "string")
            return y === "use-credentials" ? y : ""
    }
    return Pe.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = o,
    Pe.createPortal = function(_, y) {
        var E = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
        if (!y || y.nodeType !== 1 && y.nodeType !== 9 && y.nodeType !== 11)
            throw Error(f(299));
        return A(_, y, null, E)
    }
    ,
    Pe.flushSync = function(_) {
        var y = j.T
          , E = o.p;
        try {
            if (j.T = null,
            o.p = 2,
            _)
                return _()
        } finally {
            j.T = y,
            o.p = E,
            o.d.f()
        }
    }
    ,
    Pe.preconnect = function(_, y) {
        typeof _ == "string" && (y ? (y = y.crossOrigin,
        y = typeof y == "string" ? y === "use-credentials" ? y : "" : void 0) : y = null,
        o.d.C(_, y))
    }
    ,
    Pe.prefetchDNS = function(_) {
        typeof _ == "string" && o.d.D(_)
    }
    ,
    Pe.preinit = function(_, y) {
        if (typeof _ == "string" && y && typeof y.as == "string") {
            var E = y.as
              , C = w(E, y.crossOrigin)
              , G = typeof y.integrity == "string" ? y.integrity : void 0
              , ee = typeof y.fetchPriority == "string" ? y.fetchPriority : void 0;
            E === "style" ? o.d.S(_, typeof y.precedence == "string" ? y.precedence : void 0, {
                crossOrigin: C,
                integrity: G,
                fetchPriority: ee
            }) : E === "script" && o.d.X(_, {
                crossOrigin: C,
                integrity: G,
                fetchPriority: ee,
                nonce: typeof y.nonce == "string" ? y.nonce : void 0
            })
        }
    }
    ,
    Pe.preinitModule = function(_, y) {
        if (typeof _ == "string")
            if (typeof y == "object" && y !== null) {
                if (y.as == null || y.as === "script") {
                    var E = w(y.as, y.crossOrigin);
                    o.d.M(_, {
                        crossOrigin: E,
                        integrity: typeof y.integrity == "string" ? y.integrity : void 0,
                        nonce: typeof y.nonce == "string" ? y.nonce : void 0
                    })
                }
            } else
                y == null && o.d.M(_)
    }
    ,
    Pe.preload = function(_, y) {
        if (typeof _ == "string" && typeof y == "object" && y !== null && typeof y.as == "string") {
            var E = y.as
              , C = w(E, y.crossOrigin);
            o.d.L(_, E, {
                crossOrigin: C,
                integrity: typeof y.integrity == "string" ? y.integrity : void 0,
                nonce: typeof y.nonce == "string" ? y.nonce : void 0,
                type: typeof y.type == "string" ? y.type : void 0,
                fetchPriority: typeof y.fetchPriority == "string" ? y.fetchPriority : void 0,
                referrerPolicy: typeof y.referrerPolicy == "string" ? y.referrerPolicy : void 0,
                imageSrcSet: typeof y.imageSrcSet == "string" ? y.imageSrcSet : void 0,
                imageSizes: typeof y.imageSizes == "string" ? y.imageSizes : void 0,
                media: typeof y.media == "string" ? y.media : void 0
            })
        }
    }
    ,
    Pe.preloadModule = function(_, y) {
        if (typeof _ == "string")
            if (y) {
                var E = w(y.as, y.crossOrigin);
                o.d.m(_, {
                    as: typeof y.as == "string" && y.as !== "script" ? y.as : void 0,
                    crossOrigin: E,
                    integrity: typeof y.integrity == "string" ? y.integrity : void 0
                })
            } else
                o.d.m(_)
    }
    ,
    Pe.requestFormReset = function(_) {
        o.d.r(_)
    }
    ,
    Pe.unstable_batchedUpdates = function(_, y) {
        return _(y)
    }
    ,
    Pe.useFormState = function(_, y, E) {
        return j.H.useFormState(_, y, E)
    }
    ,
    Pe.useFormStatus = function() {
        return j.H.useHostTransitionStatus()
    }
    ,
    Pe.version = "19.2.3",
    Pe
}
var Yd;
function $h() {
    if (Yd)
        return Nr.exports;
    Yd = 1;
    function i() {
        if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
            try {
                __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(i)
            } catch (f) {
                console.error(f)
            }
    }
    return i(),
    Nr.exports = Jh(),
    Nr.exports
}
var qd;
function Wh() {
    if (qd)
        return Bn;
    qd = 1;
    var i = Kh()
      , f = Mr()
      , m = $h();
    function o(e) {
        var t = "https://react.dev/errors/" + e;
        if (1 < arguments.length) {
            t += "?args[]=" + encodeURIComponent(arguments[1]);
            for (var l = 2; l < arguments.length; l++)
                t += "&args[]=" + encodeURIComponent(arguments[l])
        }
        return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    }
    function g(e) {
        return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11)
    }
    function A(e) {
        var t = e
          , l = e;
        if (e.alternate)
            for (; t.return; )
                t = t.return;
        else {
            e = t;
            do
                t = e,
                (t.flags & 4098) !== 0 && (l = t.return),
                e = t.return;
            while (e)
        }
        return t.tag === 3 ? l : null
    }
    function j(e) {
        if (e.tag === 13) {
            var t = e.memoizedState;
            if (t === null && (e = e.alternate,
            e !== null && (t = e.memoizedState)),
            t !== null)
                return t.dehydrated
        }
        return null
    }
    function w(e) {
        if (e.tag === 31) {
            var t = e.memoizedState;
            if (t === null && (e = e.alternate,
            e !== null && (t = e.memoizedState)),
            t !== null)
                return t.dehydrated
        }
        return null
    }
    function _(e) {
        if (A(e) !== e)
            throw Error(o(188))
    }
    function y(e) {
        var t = e.alternate;
        if (!t) {
            if (t = A(e),
            t === null)
                throw Error(o(188));
            return t !== e ? null : e
        }
        for (var l = e, a = t; ; ) {
            var n = l.return;
            if (n === null)
                break;
            var u = n.alternate;
            if (u === null) {
                if (a = n.return,
                a !== null) {
                    l = a;
                    continue
                }
                break
            }
            if (n.child === u.child) {
                for (u = n.child; u; ) {
                    if (u === l)
                        return _(n),
                        e;
                    if (u === a)
                        return _(n),
                        t;
                    u = u.sibling
                }
                throw Error(o(188))
            }
            if (l.return !== a.return)
                l = n,
                a = u;
            else {
                for (var c = !1, s = n.child; s; ) {
                    if (s === l) {
                        c = !0,
                        l = n,
                        a = u;
                        break
                    }
                    if (s === a) {
                        c = !0,
                        a = n,
                        l = u;
                        break
                    }
                    s = s.sibling
                }
                if (!c) {
                    for (s = u.child; s; ) {
                        if (s === l) {
                            c = !0,
                            l = u,
                            a = n;
                            break
                        }
                        if (s === a) {
                            c = !0,
                            a = u,
                            l = n;
                            break
                        }
                        s = s.sibling
                    }
                    if (!c)
                        throw Error(o(189))
                }
            }
            if (l.alternate !== a)
                throw Error(o(190))
        }
        if (l.tag !== 3)
            throw Error(o(188));
        return l.stateNode.current === l ? e : t
    }
    function E(e) {
        var t = e.tag;
        if (t === 5 || t === 26 || t === 27 || t === 6)
            return e;
        for (e = e.child; e !== null; ) {
            if (t = E(e),
            t !== null)
                return t;
            e = e.sibling
        }
        return null
    }
    var C = Object.assign
      , G = Symbol.for("react.element")
      , ee = Symbol.for("react.transitional.element")
      , q = Symbol.for("react.portal")
      , D = Symbol.for("react.fragment")
      , H = Symbol.for("react.strict_mode")
      , Q = Symbol.for("react.profiler")
      , J = Symbol.for("react.consumer")
      , le = Symbol.for("react.context")
      , ce = Symbol.for("react.forward_ref")
      , je = Symbol.for("react.suspense")
      , Me = Symbol.for("react.suspense_list")
      , I = Symbol.for("react.memo")
      , he = Symbol.for("react.lazy")
      , Ce = Symbol.for("react.activity")
      , we = Symbol.for("react.memo_cache_sentinel")
      , He = Symbol.iterator;
    function Te(e) {
        return e === null || typeof e != "object" ? null : (e = He && e[He] || e["@@iterator"],
        typeof e == "function" ? e : null)
    }
    var Qe = Symbol.for("react.client.reference");
    function k(e) {
        if (e == null)
            return null;
        if (typeof e == "function")
            return e.$$typeof === Qe ? null : e.displayName || e.name || null;
        if (typeof e == "string")
            return e;
        switch (e) {
        case D:
            return "Fragment";
        case Q:
            return "Profiler";
        case H:
            return "StrictMode";
        case je:
            return "Suspense";
        case Me:
            return "SuspenseList";
        case Ce:
            return "Activity"
        }
        if (typeof e == "object")
            switch (e.$$typeof) {
            case q:
                return "Portal";
            case le:
                return e.displayName || "Context";
            case J:
                return (e._context.displayName || "Context") + ".Consumer";
            case ce:
                var t = e.render;
                return e = e.displayName,
                e || (e = t.displayName || t.name || "",
                e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"),
                e;
            case I:
                return t = e.displayName || null,
                t !== null ? t : k(e.type) || "Memo";
            case he:
                t = e._payload,
                e = e._init;
                try {
                    return k(e(t))
                } catch {}
            }
        return null
    }
    var me = Array.isArray
      , z = f.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE
      , U = m.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE
      , K = {
        pending: !1,
        data: null,
        method: null,
        action: null
    }
      , V = []
      , P = -1;
    function h(e) {
        return {
            current: e
        }
    }
    function O(e) {
        0 > P || (e.current = V[P],
        V[P] = null,
        P--)
    }
    function L(e, t) {
        P++,
        V[P] = e.current,
        e.current = t
    }
    var Y = h(null)
      , W = h(null)
      , te = h(null)
      , se = h(null);
    function Xe(e, t) {
        switch (L(te, t),
        L(W, e),
        L(Y, null),
        t.nodeType) {
        case 9:
        case 11:
            e = (e = t.documentElement) && (e = e.namespaceURI) ? ld(e) : 0;
            break;
        default:
            if (e = t.tagName,
            t = t.namespaceURI)
                t = ld(t),
                e = ad(t, e);
            else
                switch (e) {
                case "svg":
                    e = 1;
                    break;
                case "math":
                    e = 2;
                    break;
                default:
                    e = 0
                }
        }
        O(Y),
        L(Y, e)
    }
    function De() {
        O(Y),
        O(W),
        O(te)
    }
    function Bt(e) {
        e.memoizedState !== null && L(se, e);
        var t = Y.current
          , l = ad(t, e.type);
        t !== l && (L(W, e),
        L(Y, l))
    }
    function Wl(e) {
        W.current === e && (O(Y),
        O(W)),
        se.current === e && (O(se),
        Mn._currentValue = K)
    }
    var ye, nl;
    function Cl(e) {
        if (ye === void 0)
            try {
                throw Error()
            } catch (l) {
                var t = l.stack.trim().match(/\n( *(at )?)/);
                ye = t && t[1] || "",
                nl = -1 < l.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < l.stack.indexOf("@") ? "@unknown:0:0" : ""
            }
        return `
` + ye + e + nl
    }
    var ac = !1;
    function nc(e, t) {
        if (!e || ac)
            return "";
        ac = !0;
        var l = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        try {
            var a = {
                DetermineComponentFrameRoot: function() {
                    try {
                        if (t) {
                            var B = function() {
                                throw Error()
                            };
                            if (Object.defineProperty(B.prototype, "props", {
                                set: function() {
                                    throw Error()
                                }
                            }),
                            typeof Reflect == "object" && Reflect.construct) {
                                try {
                                    Reflect.construct(B, [])
                                } catch (N) {
                                    var S = N
                                }
                                Reflect.construct(e, [], B)
                            } else {
                                try {
                                    B.call()
                                } catch (N) {
                                    S = N
                                }
                                e.call(B.prototype)
                            }
                        } else {
                            try {
                                throw Error()
                            } catch (N) {
                                S = N
                            }
                            (B = e()) && typeof B.catch == "function" && B.catch(function() {})
                        }
                    } catch (N) {
                        if (N && S && typeof N.stack == "string")
                            return [N.stack, S.stack]
                    }
                    return [null, null]
                }
            };
            a.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
            var n = Object.getOwnPropertyDescriptor(a.DetermineComponentFrameRoot, "name");
            n && n.configurable && Object.defineProperty(a.DetermineComponentFrameRoot, "name", {
                value: "DetermineComponentFrameRoot"
            });
            var u = a.DetermineComponentFrameRoot()
              , c = u[0]
              , s = u[1];
            if (c && s) {
                var d = c.split(`
`)
                  , b = s.split(`
`);
                for (n = a = 0; a < d.length && !d[a].includes("DetermineComponentFrameRoot"); )
                    a++;
                for (; n < b.length && !b[n].includes("DetermineComponentFrameRoot"); )
                    n++;
                if (a === d.length || n === b.length)
                    for (a = d.length - 1,
                    n = b.length - 1; 1 <= a && 0 <= n && d[a] !== b[n]; )
                        n--;
                for (; 1 <= a && 0 <= n; a--,
                n--)
                    if (d[a] !== b[n]) {
                        if (a !== 1 || n !== 1)
                            do
                                if (a--,
                                n--,
                                0 > n || d[a] !== b[n]) {
                                    var M = `
` + d[a].replace(" at new ", " at ");
                                    return e.displayName && M.includes("<anonymous>") && (M = M.replace("<anonymous>", e.displayName)),
                                    M
                                }
                            while (1 <= a && 0 <= n);
                        break
                    }
            }
        } finally {
            ac = !1,
            Error.prepareStackTrace = l
        }
        return (l = e ? e.displayName || e.name : "") ? Cl(l) : ""
    }
    function b0(e, t) {
        switch (e.tag) {
        case 26:
        case 27:
        case 5:
            return Cl(e.type);
        case 16:
            return Cl("Lazy");
        case 13:
            return e.child !== t && t !== null ? Cl("Suspense Fallback") : Cl("Suspense");
        case 19:
            return Cl("SuspenseList");
        case 0:
        case 15:
            return nc(e.type, !1);
        case 11:
            return nc(e.type.render, !1);
        case 1:
            return nc(e.type, !0);
        case 31:
            return Cl("Activity");
        default:
            return ""
        }
    }
    function Dr(e) {
        try {
            var t = ""
              , l = null;
            do
                t += b0(e, l),
                l = e,
                e = e.return;
            while (e);
            return t
        } catch (a) {
            return `
Error generating stack: ` + a.message + `
` + a.stack
        }
    }
    var uc = Object.prototype.hasOwnProperty
      , cc = i.unstable_scheduleCallback
      , ic = i.unstable_cancelCallback
      , S0 = i.unstable_shouldYield
      , A0 = i.unstable_requestPaint
      , rt = i.unstable_now
      , E0 = i.unstable_getCurrentPriorityLevel
      , Or = i.unstable_ImmediatePriority
      , Rr = i.unstable_UserBlockingPriority
      , Un = i.unstable_NormalPriority
      , j0 = i.unstable_LowPriority
      , Br = i.unstable_IdlePriority
      , N0 = i.log
      , T0 = i.unstable_setDisableYieldValue
      , Ya = null
      , st = null;
    function ul(e) {
        if (typeof N0 == "function" && T0(e),
        st && typeof st.setStrictMode == "function")
            try {
                st.setStrictMode(Ya, e)
            } catch {}
    }
    var ot = Math.clz32 ? Math.clz32 : M0
      , z0 = Math.log
      , _0 = Math.LN2;
    function M0(e) {
        return e >>>= 0,
        e === 0 ? 32 : 31 - (z0(e) / _0 | 0) | 0
    }
    var Gn = 256
      , Ln = 262144
      , Yn = 4194304;
    function Dl(e) {
        var t = e & 42;
        if (t !== 0)
            return t;
        switch (e & -e) {
        case 1:
            return 1;
        case 2:
            return 2;
        case 4:
            return 4;
        case 8:
            return 8;
        case 16:
            return 16;
        case 32:
            return 32;
        case 64:
            return 64;
        case 128:
            return 128;
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
            return e & 261888;
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
            return e & 3932160;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
            return e & 62914560;
        case 67108864:
            return 67108864;
        case 134217728:
            return 134217728;
        case 268435456:
            return 268435456;
        case 536870912:
            return 536870912;
        case 1073741824:
            return 0;
        default:
            return e
        }
    }
    function qn(e, t, l) {
        var a = e.pendingLanes;
        if (a === 0)
            return 0;
        var n = 0
          , u = e.suspendedLanes
          , c = e.pingedLanes;
        e = e.warmLanes;
        var s = a & 134217727;
        return s !== 0 ? (a = s & ~u,
        a !== 0 ? n = Dl(a) : (c &= s,
        c !== 0 ? n = Dl(c) : l || (l = s & ~e,
        l !== 0 && (n = Dl(l))))) : (s = a & ~u,
        s !== 0 ? n = Dl(s) : c !== 0 ? n = Dl(c) : l || (l = a & ~e,
        l !== 0 && (n = Dl(l)))),
        n === 0 ? 0 : t !== 0 && t !== n && (t & u) === 0 && (u = n & -n,
        l = t & -t,
        u >= l || u === 32 && (l & 4194048) !== 0) ? t : n
    }
    function qa(e, t) {
        return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0
    }
    function C0(e, t) {
        switch (e) {
        case 1:
        case 2:
        case 4:
        case 8:
        case 64:
            return t + 250;
        case 16:
        case 32:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
            return t + 5e3;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
            return -1;
        case 67108864:
        case 134217728:
        case 268435456:
        case 536870912:
        case 1073741824:
            return -1;
        default:
            return -1
        }
    }
    function wr() {
        var e = Yn;
        return Yn <<= 1,
        (Yn & 62914560) === 0 && (Yn = 4194304),
        e
    }
    function rc(e) {
        for (var t = [], l = 0; 31 > l; l++)
            t.push(e);
        return t
    }
    function ka(e, t) {
        e.pendingLanes |= t,
        t !== 268435456 && (e.suspendedLanes = 0,
        e.pingedLanes = 0,
        e.warmLanes = 0)
    }
    function D0(e, t, l, a, n, u) {
        var c = e.pendingLanes;
        e.pendingLanes = l,
        e.suspendedLanes = 0,
        e.pingedLanes = 0,
        e.warmLanes = 0,
        e.expiredLanes &= l,
        e.entangledLanes &= l,
        e.errorRecoveryDisabledLanes &= l,
        e.shellSuspendCounter = 0;
        var s = e.entanglements
          , d = e.expirationTimes
          , b = e.hiddenUpdates;
        for (l = c & ~l; 0 < l; ) {
            var M = 31 - ot(l)
              , B = 1 << M;
            s[M] = 0,
            d[M] = -1;
            var S = b[M];
            if (S !== null)
                for (b[M] = null,
                M = 0; M < S.length; M++) {
                    var N = S[M];
                    N !== null && (N.lane &= -536870913)
                }
            l &= ~B
        }
        a !== 0 && Hr(e, a, 0),
        u !== 0 && n === 0 && e.tag !== 0 && (e.suspendedLanes |= u & ~(c & ~t))
    }
    function Hr(e, t, l) {
        e.pendingLanes |= t,
        e.suspendedLanes &= ~t;
        var a = 31 - ot(t);
        e.entangledLanes |= t,
        e.entanglements[a] = e.entanglements[a] | 1073741824 | l & 261930
    }
    function Ur(e, t) {
        var l = e.entangledLanes |= t;
        for (e = e.entanglements; l; ) {
            var a = 31 - ot(l)
              , n = 1 << a;
            n & t | e[a] & t && (e[a] |= t),
            l &= ~n
        }
    }
    function Gr(e, t) {
        var l = t & -t;
        return l = (l & 42) !== 0 ? 1 : sc(l),
        (l & (e.suspendedLanes | t)) !== 0 ? 0 : l
    }
    function sc(e) {
        switch (e) {
        case 2:
            e = 1;
            break;
        case 8:
            e = 4;
            break;
        case 32:
            e = 16;
            break;
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
            e = 128;
            break;
        case 268435456:
            e = 134217728;
            break;
        default:
            e = 0
        }
        return e
    }
    function oc(e) {
        return e &= -e,
        2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2
    }
    function Lr() {
        var e = U.p;
        return e !== 0 ? e : (e = window.event,
        e === void 0 ? 32 : Td(e.type))
    }
    function Yr(e, t) {
        var l = U.p;
        try {
            return U.p = e,
            t()
        } finally {
            U.p = l
        }
    }
    var cl = Math.random().toString(36).slice(2)
      , Je = "__reactFiber$" + cl
      , tt = "__reactProps$" + cl
      , Fl = "__reactContainer$" + cl
      , fc = "__reactEvents$" + cl
      , O0 = "__reactListeners$" + cl
      , R0 = "__reactHandles$" + cl
      , qr = "__reactResources$" + cl
      , Va = "__reactMarker$" + cl;
    function dc(e) {
        delete e[Je],
        delete e[tt],
        delete e[fc],
        delete e[O0],
        delete e[R0]
    }
    function Il(e) {
        var t = e[Je];
        if (t)
            return t;
        for (var l = e.parentNode; l; ) {
            if (t = l[Fl] || l[Je]) {
                if (l = t.alternate,
                t.child !== null || l !== null && l.child !== null)
                    for (e = od(e); e !== null; ) {
                        if (l = e[Je])
                            return l;
                        e = od(e)
                    }
                return t
            }
            e = l,
            l = e.parentNode
        }
        return null
    }
    function Pl(e) {
        if (e = e[Je] || e[Fl]) {
            var t = e.tag;
            if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3)
                return e
        }
        return null
    }
    function Qa(e) {
        var t = e.tag;
        if (t === 5 || t === 26 || t === 27 || t === 6)
            return e.stateNode;
        throw Error(o(33))
    }
    function ea(e) {
        var t = e[qr];
        return t || (t = e[qr] = {
            hoistableStyles: new Map,
            hoistableScripts: new Map
        }),
        t
    }
    function Ze(e) {
        e[Va] = !0
    }
    var kr = new Set
      , Vr = {};
    function Ol(e, t) {
        ta(e, t),
        ta(e + "Capture", t)
    }
    function ta(e, t) {
        for (Vr[e] = t,
        e = 0; e < t.length; e++)
            kr.add(t[e])
    }
    var B0 = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$")
      , Qr = {}
      , Xr = {};
    function w0(e) {
        return uc.call(Xr, e) ? !0 : uc.call(Qr, e) ? !1 : B0.test(e) ? Xr[e] = !0 : (Qr[e] = !0,
        !1)
    }
    function kn(e, t, l) {
        if (w0(t))
            if (l === null)
                e.removeAttribute(t);
            else {
                switch (typeof l) {
                case "undefined":
                case "function":
                case "symbol":
                    e.removeAttribute(t);
                    return;
                case "boolean":
                    var a = t.toLowerCase().slice(0, 5);
                    if (a !== "data-" && a !== "aria-") {
                        e.removeAttribute(t);
                        return
                    }
                }
                e.setAttribute(t, "" + l)
            }
    }
    function Vn(e, t, l) {
        if (l === null)
            e.removeAttribute(t);
        else {
            switch (typeof l) {
            case "undefined":
            case "function":
            case "symbol":
            case "boolean":
                e.removeAttribute(t);
                return
            }
            e.setAttribute(t, "" + l)
        }
    }
    function Lt(e, t, l, a) {
        if (a === null)
            e.removeAttribute(l);
        else {
            switch (typeof a) {
            case "undefined":
            case "function":
            case "symbol":
            case "boolean":
                e.removeAttribute(l);
                return
            }
            e.setAttributeNS(t, l, "" + a)
        }
    }
    function xt(e) {
        switch (typeof e) {
        case "bigint":
        case "boolean":
        case "number":
        case "string":
        case "undefined":
            return e;
        case "object":
            return e;
        default:
            return ""
        }
    }
    function Zr(e) {
        var t = e.type;
        return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio")
    }
    function H0(e, t, l) {
        var a = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
        if (!e.hasOwnProperty(t) && typeof a < "u" && typeof a.get == "function" && typeof a.set == "function") {
            var n = a.get
              , u = a.set;
            return Object.defineProperty(e, t, {
                configurable: !0,
                get: function() {
                    return n.call(this)
                },
                set: function(c) {
                    l = "" + c,
                    u.call(this, c)
                }
            }),
            Object.defineProperty(e, t, {
                enumerable: a.enumerable
            }),
            {
                getValue: function() {
                    return l
                },
                setValue: function(c) {
                    l = "" + c
                },
                stopTracking: function() {
                    e._valueTracker = null,
                    delete e[t]
                }
            }
        }
    }
    function hc(e) {
        if (!e._valueTracker) {
            var t = Zr(e) ? "checked" : "value";
            e._valueTracker = H0(e, t, "" + e[t])
        }
    }
    function Kr(e) {
        if (!e)
            return !1;
        var t = e._valueTracker;
        if (!t)
            return !0;
        var l = t.getValue()
          , a = "";
        return e && (a = Zr(e) ? e.checked ? "true" : "false" : e.value),
        e = a,
        e !== l ? (t.setValue(e),
        !0) : !1
    }
    function Qn(e) {
        if (e = e || (typeof document < "u" ? document : void 0),
        typeof e > "u")
            return null;
        try {
            return e.activeElement || e.body
        } catch {
            return e.body
        }
    }
    var U0 = /[\n"\\]/g;
    function pt(e) {
        return e.replace(U0, function(t) {
            return "\\" + t.charCodeAt(0).toString(16) + " "
        })
    }
    function mc(e, t, l, a, n, u, c, s) {
        e.name = "",
        c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" ? e.type = c : e.removeAttribute("type"),
        t != null ? c === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + xt(t)) : e.value !== "" + xt(t) && (e.value = "" + xt(t)) : c !== "submit" && c !== "reset" || e.removeAttribute("value"),
        t != null ? vc(e, c, xt(t)) : l != null ? vc(e, c, xt(l)) : a != null && e.removeAttribute("value"),
        n == null && u != null && (e.defaultChecked = !!u),
        n != null && (e.checked = n && typeof n != "function" && typeof n != "symbol"),
        s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? e.name = "" + xt(s) : e.removeAttribute("name")
    }
    function Jr(e, t, l, a, n, u, c, s) {
        if (u != null && typeof u != "function" && typeof u != "symbol" && typeof u != "boolean" && (e.type = u),
        t != null || l != null) {
            if (!(u !== "submit" && u !== "reset" || t != null)) {
                hc(e);
                return
            }
            l = l != null ? "" + xt(l) : "",
            t = t != null ? "" + xt(t) : l,
            s || t === e.value || (e.value = t),
            e.defaultValue = t
        }
        a = a ?? n,
        a = typeof a != "function" && typeof a != "symbol" && !!a,
        e.checked = s ? e.checked : !!a,
        e.defaultChecked = !!a,
        c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" && (e.name = c),
        hc(e)
    }
    function vc(e, t, l) {
        t === "number" && Qn(e.ownerDocument) === e || e.defaultValue === "" + l || (e.defaultValue = "" + l)
    }
    function la(e, t, l, a) {
        if (e = e.options,
        t) {
            t = {};
            for (var n = 0; n < l.length; n++)
                t["$" + l[n]] = !0;
            for (l = 0; l < e.length; l++)
                n = t.hasOwnProperty("$" + e[l].value),
                e[l].selected !== n && (e[l].selected = n),
                n && a && (e[l].defaultSelected = !0)
        } else {
            for (l = "" + xt(l),
            t = null,
            n = 0; n < e.length; n++) {
                if (e[n].value === l) {
                    e[n].selected = !0,
                    a && (e[n].defaultSelected = !0);
                    return
                }
                t !== null || e[n].disabled || (t = e[n])
            }
            t !== null && (t.selected = !0)
        }
    }
    function $r(e, t, l) {
        if (t != null && (t = "" + xt(t),
        t !== e.value && (e.value = t),
        l == null)) {
            e.defaultValue !== t && (e.defaultValue = t);
            return
        }
        e.defaultValue = l != null ? "" + xt(l) : ""
    }
    function Wr(e, t, l, a) {
        if (t == null) {
            if (a != null) {
                if (l != null)
                    throw Error(o(92));
                if (me(a)) {
                    if (1 < a.length)
                        throw Error(o(93));
                    a = a[0]
                }
                l = a
            }
            l == null && (l = ""),
            t = l
        }
        l = xt(t),
        e.defaultValue = l,
        a = e.textContent,
        a === l && a !== "" && a !== null && (e.value = a),
        hc(e)
    }
    function aa(e, t) {
        if (t) {
            var l = e.firstChild;
            if (l && l === e.lastChild && l.nodeType === 3) {
                l.nodeValue = t;
                return
            }
        }
        e.textContent = t
    }
    var G0 = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
    function Fr(e, t, l) {
        var a = t.indexOf("--") === 0;
        l == null || typeof l == "boolean" || l === "" ? a ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : a ? e.setProperty(t, l) : typeof l != "number" || l === 0 || G0.has(t) ? t === "float" ? e.cssFloat = l : e[t] = ("" + l).trim() : e[t] = l + "px"
    }
    function Ir(e, t, l) {
        if (t != null && typeof t != "object")
            throw Error(o(62));
        if (e = e.style,
        l != null) {
            for (var a in l)
                !l.hasOwnProperty(a) || t != null && t.hasOwnProperty(a) || (a.indexOf("--") === 0 ? e.setProperty(a, "") : a === "float" ? e.cssFloat = "" : e[a] = "");
            for (var n in t)
                a = t[n],
                t.hasOwnProperty(n) && l[n] !== a && Fr(e, n, a)
        } else
            for (var u in t)
                t.hasOwnProperty(u) && Fr(e, u, t[u])
    }
    function gc(e) {
        if (e.indexOf("-") === -1)
            return !1;
        switch (e) {
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
            return !1;
        default:
            return !0
        }
    }
    var L0 = new Map([["acceptCharset", "accept-charset"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"], ["crossOrigin", "crossorigin"], ["accentHeight", "accent-height"], ["alignmentBaseline", "alignment-baseline"], ["arabicForm", "arabic-form"], ["baselineShift", "baseline-shift"], ["capHeight", "cap-height"], ["clipPath", "clip-path"], ["clipRule", "clip-rule"], ["colorInterpolation", "color-interpolation"], ["colorInterpolationFilters", "color-interpolation-filters"], ["colorProfile", "color-profile"], ["colorRendering", "color-rendering"], ["dominantBaseline", "dominant-baseline"], ["enableBackground", "enable-background"], ["fillOpacity", "fill-opacity"], ["fillRule", "fill-rule"], ["floodColor", "flood-color"], ["floodOpacity", "flood-opacity"], ["fontFamily", "font-family"], ["fontSize", "font-size"], ["fontSizeAdjust", "font-size-adjust"], ["fontStretch", "font-stretch"], ["fontStyle", "font-style"], ["fontVariant", "font-variant"], ["fontWeight", "font-weight"], ["glyphName", "glyph-name"], ["glyphOrientationHorizontal", "glyph-orientation-horizontal"], ["glyphOrientationVertical", "glyph-orientation-vertical"], ["horizAdvX", "horiz-adv-x"], ["horizOriginX", "horiz-origin-x"], ["imageRendering", "image-rendering"], ["letterSpacing", "letter-spacing"], ["lightingColor", "lighting-color"], ["markerEnd", "marker-end"], ["markerMid", "marker-mid"], ["markerStart", "marker-start"], ["overlinePosition", "overline-position"], ["overlineThickness", "overline-thickness"], ["paintOrder", "paint-order"], ["panose-1", "panose-1"], ["pointerEvents", "pointer-events"], ["renderingIntent", "rendering-intent"], ["shapeRendering", "shape-rendering"], ["stopColor", "stop-color"], ["stopOpacity", "stop-opacity"], ["strikethroughPosition", "strikethrough-position"], ["strikethroughThickness", "strikethrough-thickness"], ["strokeDasharray", "stroke-dasharray"], ["strokeDashoffset", "stroke-dashoffset"], ["strokeLinecap", "stroke-linecap"], ["strokeLinejoin", "stroke-linejoin"], ["strokeMiterlimit", "stroke-miterlimit"], ["strokeOpacity", "stroke-opacity"], ["strokeWidth", "stroke-width"], ["textAnchor", "text-anchor"], ["textDecoration", "text-decoration"], ["textRendering", "text-rendering"], ["transformOrigin", "transform-origin"], ["underlinePosition", "underline-position"], ["underlineThickness", "underline-thickness"], ["unicodeBidi", "unicode-bidi"], ["unicodeRange", "unicode-range"], ["unitsPerEm", "units-per-em"], ["vAlphabetic", "v-alphabetic"], ["vHanging", "v-hanging"], ["vIdeographic", "v-ideographic"], ["vMathematical", "v-mathematical"], ["vectorEffect", "vector-effect"], ["vertAdvY", "vert-adv-y"], ["vertOriginX", "vert-origin-x"], ["vertOriginY", "vert-origin-y"], ["wordSpacing", "word-spacing"], ["writingMode", "writing-mode"], ["xmlnsXlink", "xmlns:xlink"], ["xHeight", "x-height"]])
      , Y0 = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
    function Xn(e) {
        return Y0.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e
    }
    function Yt() {}
    var yc = null;
    function xc(e) {
        return e = e.target || e.srcElement || window,
        e.correspondingUseElement && (e = e.correspondingUseElement),
        e.nodeType === 3 ? e.parentNode : e
    }
    var na = null
      , ua = null;
    function Pr(e) {
        var t = Pl(e);
        if (t && (e = t.stateNode)) {
            var l = e[tt] || null;
            e: switch (e = t.stateNode,
            t.type) {
            case "input":
                if (mc(e, l.value, l.defaultValue, l.defaultValue, l.checked, l.defaultChecked, l.type, l.name),
                t = l.name,
                l.type === "radio" && t != null) {
                    for (l = e; l.parentNode; )
                        l = l.parentNode;
                    for (l = l.querySelectorAll('input[name="' + pt("" + t) + '"][type="radio"]'),
                    t = 0; t < l.length; t++) {
                        var a = l[t];
                        if (a !== e && a.form === e.form) {
                            var n = a[tt] || null;
                            if (!n)
                                throw Error(o(90));
                            mc(a, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name)
                        }
                    }
                    for (t = 0; t < l.length; t++)
                        a = l[t],
                        a.form === e.form && Kr(a)
                }
                break e;
            case "textarea":
                $r(e, l.value, l.defaultValue);
                break e;
            case "select":
                t = l.value,
                t != null && la(e, !!l.multiple, t, !1)
            }
        }
    }
    var pc = !1;
    function es(e, t, l) {
        if (pc)
            return e(t, l);
        pc = !0;
        try {
            var a = e(t);
            return a
        } finally {
            if (pc = !1,
            (na !== null || ua !== null) && (Ou(),
            na && (t = na,
            e = ua,
            ua = na = null,
            Pr(t),
            e)))
                for (t = 0; t < e.length; t++)
                    Pr(e[t])
        }
    }
    function Xa(e, t) {
        var l = e.stateNode;
        if (l === null)
            return null;
        var a = l[tt] || null;
        if (a === null)
            return null;
        l = a[t];
        e: switch (t) {
        case "onClick":
        case "onClickCapture":
        case "onDoubleClick":
        case "onDoubleClickCapture":
        case "onMouseDown":
        case "onMouseDownCapture":
        case "onMouseMove":
        case "onMouseMoveCapture":
        case "onMouseUp":
        case "onMouseUpCapture":
        case "onMouseEnter":
            (a = !a.disabled) || (e = e.type,
            a = !(e === "button" || e === "input" || e === "select" || e === "textarea")),
            e = !a;
            break e;
        default:
            e = !1
        }
        if (e)
            return null;
        if (l && typeof l != "function")
            throw Error(o(231, t, typeof l));
        return l
    }
    var qt = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u")
      , bc = !1;
    if (qt)
        try {
            var Za = {};
            Object.defineProperty(Za, "passive", {
                get: function() {
                    bc = !0
                }
            }),
            window.addEventListener("test", Za, Za),
            window.removeEventListener("test", Za, Za)
        } catch {
            bc = !1
        }
    var il = null
      , Sc = null
      , Zn = null;
    function ts() {
        if (Zn)
            return Zn;
        var e, t = Sc, l = t.length, a, n = "value"in il ? il.value : il.textContent, u = n.length;
        for (e = 0; e < l && t[e] === n[e]; e++)
            ;
        var c = l - e;
        for (a = 1; a <= c && t[l - a] === n[u - a]; a++)
            ;
        return Zn = n.slice(e, 1 < a ? 1 - a : void 0)
    }
    function Kn(e) {
        var t = e.keyCode;
        return "charCode"in e ? (e = e.charCode,
        e === 0 && t === 13 && (e = 13)) : e = t,
        e === 10 && (e = 13),
        32 <= e || e === 13 ? e : 0
    }
    function Jn() {
        return !0
    }
    function ls() {
        return !1
    }
    function lt(e) {
        function t(l, a, n, u, c) {
            this._reactName = l,
            this._targetInst = n,
            this.type = a,
            this.nativeEvent = u,
            this.target = c,
            this.currentTarget = null;
            for (var s in e)
                e.hasOwnProperty(s) && (l = e[s],
                this[s] = l ? l(u) : u[s]);
            return this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1) ? Jn : ls,
            this.isPropagationStopped = ls,
            this
        }
        return C(t.prototype, {
            preventDefault: function() {
                this.defaultPrevented = !0;
                var l = this.nativeEvent;
                l && (l.preventDefault ? l.preventDefault() : typeof l.returnValue != "unknown" && (l.returnValue = !1),
                this.isDefaultPrevented = Jn)
            },
            stopPropagation: function() {
                var l = this.nativeEvent;
                l && (l.stopPropagation ? l.stopPropagation() : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0),
                this.isPropagationStopped = Jn)
            },
            persist: function() {},
            isPersistent: Jn
        }),
        t
    }
    var Rl = {
        eventPhase: 0,
        bubbles: 0,
        cancelable: 0,
        timeStamp: function(e) {
            return e.timeStamp || Date.now()
        },
        defaultPrevented: 0,
        isTrusted: 0
    }, $n = lt(Rl), Ka = C({}, Rl, {
        view: 0,
        detail: 0
    }), q0 = lt(Ka), Ac, Ec, Ja, Wn = C({}, Ka, {
        screenX: 0,
        screenY: 0,
        clientX: 0,
        clientY: 0,
        pageX: 0,
        pageY: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        getModifierState: Nc,
        button: 0,
        buttons: 0,
        relatedTarget: function(e) {
            return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget
        },
        movementX: function(e) {
            return "movementX"in e ? e.movementX : (e !== Ja && (Ja && e.type === "mousemove" ? (Ac = e.screenX - Ja.screenX,
            Ec = e.screenY - Ja.screenY) : Ec = Ac = 0,
            Ja = e),
            Ac)
        },
        movementY: function(e) {
            return "movementY"in e ? e.movementY : Ec
        }
    }), as = lt(Wn), k0 = C({}, Wn, {
        dataTransfer: 0
    }), V0 = lt(k0), Q0 = C({}, Ka, {
        relatedTarget: 0
    }), jc = lt(Q0), X0 = C({}, Rl, {
        animationName: 0,
        elapsedTime: 0,
        pseudoElement: 0
    }), Z0 = lt(X0), K0 = C({}, Rl, {
        clipboardData: function(e) {
            return "clipboardData"in e ? e.clipboardData : window.clipboardData
        }
    }), J0 = lt(K0), $0 = C({}, Rl, {
        data: 0
    }), ns = lt($0), W0 = {
        Esc: "Escape",
        Spacebar: " ",
        Left: "ArrowLeft",
        Up: "ArrowUp",
        Right: "ArrowRight",
        Down: "ArrowDown",
        Del: "Delete",
        Win: "OS",
        Menu: "ContextMenu",
        Apps: "ContextMenu",
        Scroll: "ScrollLock",
        MozPrintableKey: "Unidentified"
    }, F0 = {
        8: "Backspace",
        9: "Tab",
        12: "Clear",
        13: "Enter",
        16: "Shift",
        17: "Control",
        18: "Alt",
        19: "Pause",
        20: "CapsLock",
        27: "Escape",
        32: " ",
        33: "PageUp",
        34: "PageDown",
        35: "End",
        36: "Home",
        37: "ArrowLeft",
        38: "ArrowUp",
        39: "ArrowRight",
        40: "ArrowDown",
        45: "Insert",
        46: "Delete",
        112: "F1",
        113: "F2",
        114: "F3",
        115: "F4",
        116: "F5",
        117: "F6",
        118: "F7",
        119: "F8",
        120: "F9",
        121: "F10",
        122: "F11",
        123: "F12",
        144: "NumLock",
        145: "ScrollLock",
        224: "Meta"
    }, I0 = {
        Alt: "altKey",
        Control: "ctrlKey",
        Meta: "metaKey",
        Shift: "shiftKey"
    };
    function P0(e) {
        var t = this.nativeEvent;
        return t.getModifierState ? t.getModifierState(e) : (e = I0[e]) ? !!t[e] : !1
    }
    function Nc() {
        return P0
    }
    var e1 = C({}, Ka, {
        key: function(e) {
            if (e.key) {
                var t = W0[e.key] || e.key;
                if (t !== "Unidentified")
                    return t
            }
            return e.type === "keypress" ? (e = Kn(e),
            e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? F0[e.keyCode] || "Unidentified" : ""
        },
        code: 0,
        location: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        repeat: 0,
        locale: 0,
        getModifierState: Nc,
        charCode: function(e) {
            return e.type === "keypress" ? Kn(e) : 0
        },
        keyCode: function(e) {
            return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0
        },
        which: function(e) {
            return e.type === "keypress" ? Kn(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0
        }
    })
      , t1 = lt(e1)
      , l1 = C({}, Wn, {
        pointerId: 0,
        width: 0,
        height: 0,
        pressure: 0,
        tangentialPressure: 0,
        tiltX: 0,
        tiltY: 0,
        twist: 0,
        pointerType: 0,
        isPrimary: 0
    })
      , us = lt(l1)
      , a1 = C({}, Ka, {
        touches: 0,
        targetTouches: 0,
        changedTouches: 0,
        altKey: 0,
        metaKey: 0,
        ctrlKey: 0,
        shiftKey: 0,
        getModifierState: Nc
    })
      , n1 = lt(a1)
      , u1 = C({}, Rl, {
        propertyName: 0,
        elapsedTime: 0,
        pseudoElement: 0
    })
      , c1 = lt(u1)
      , i1 = C({}, Wn, {
        deltaX: function(e) {
            return "deltaX"in e ? e.deltaX : "wheelDeltaX"in e ? -e.wheelDeltaX : 0
        },
        deltaY: function(e) {
            return "deltaY"in e ? e.deltaY : "wheelDeltaY"in e ? -e.wheelDeltaY : "wheelDelta"in e ? -e.wheelDelta : 0
        },
        deltaZ: 0,
        deltaMode: 0
    })
      , r1 = lt(i1)
      , s1 = C({}, Rl, {
        newState: 0,
        oldState: 0
    })
      , o1 = lt(s1)
      , f1 = [9, 13, 27, 32]
      , Tc = qt && "CompositionEvent"in window
      , $a = null;
    qt && "documentMode"in document && ($a = document.documentMode);
    var d1 = qt && "TextEvent"in window && !$a
      , cs = qt && (!Tc || $a && 8 < $a && 11 >= $a)
      , is = " "
      , rs = !1;
    function ss(e, t) {
        switch (e) {
        case "keyup":
            return f1.indexOf(t.keyCode) !== -1;
        case "keydown":
            return t.keyCode !== 229;
        case "keypress":
        case "mousedown":
        case "focusout":
            return !0;
        default:
            return !1
        }
    }
    function os(e) {
        return e = e.detail,
        typeof e == "object" && "data"in e ? e.data : null
    }
    var ca = !1;
    function h1(e, t) {
        switch (e) {
        case "compositionend":
            return os(t);
        case "keypress":
            return t.which !== 32 ? null : (rs = !0,
            is);
        case "textInput":
            return e = t.data,
            e === is && rs ? null : e;
        default:
            return null
        }
    }
    function m1(e, t) {
        if (ca)
            return e === "compositionend" || !Tc && ss(e, t) ? (e = ts(),
            Zn = Sc = il = null,
            ca = !1,
            e) : null;
        switch (e) {
        case "paste":
            return null;
        case "keypress":
            if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
                if (t.char && 1 < t.char.length)
                    return t.char;
                if (t.which)
                    return String.fromCharCode(t.which)
            }
            return null;
        case "compositionend":
            return cs && t.locale !== "ko" ? null : t.data;
        default:
            return null
        }
    }
    var v1 = {
        color: !0,
        date: !0,
        datetime: !0,
        "datetime-local": !0,
        email: !0,
        month: !0,
        number: !0,
        password: !0,
        range: !0,
        search: !0,
        tel: !0,
        text: !0,
        time: !0,
        url: !0,
        week: !0
    };
    function fs(e) {
        var t = e && e.nodeName && e.nodeName.toLowerCase();
        return t === "input" ? !!v1[e.type] : t === "textarea"
    }
    function ds(e, t, l, a) {
        na ? ua ? ua.push(a) : ua = [a] : na = a,
        t = Lu(t, "onChange"),
        0 < t.length && (l = new $n("onChange","change",null,l,a),
        e.push({
            event: l,
            listeners: t
        }))
    }
    var Wa = null
      , Fa = null;
    function g1(e) {
        Wf(e, 0)
    }
    function Fn(e) {
        var t = Qa(e);
        if (Kr(t))
            return e
    }
    function hs(e, t) {
        if (e === "change")
            return t
    }
    var ms = !1;
    if (qt) {
        var zc;
        if (qt) {
            var _c = "oninput"in document;
            if (!_c) {
                var vs = document.createElement("div");
                vs.setAttribute("oninput", "return;"),
                _c = typeof vs.oninput == "function"
            }
            zc = _c
        } else
            zc = !1;
        ms = zc && (!document.documentMode || 9 < document.documentMode)
    }
    function gs() {
        Wa && (Wa.detachEvent("onpropertychange", ys),
        Fa = Wa = null)
    }
    function ys(e) {
        if (e.propertyName === "value" && Fn(Fa)) {
            var t = [];
            ds(t, Fa, e, xc(e)),
            es(g1, t)
        }
    }
    function y1(e, t, l) {
        e === "focusin" ? (gs(),
        Wa = t,
        Fa = l,
        Wa.attachEvent("onpropertychange", ys)) : e === "focusout" && gs()
    }
    function x1(e) {
        if (e === "selectionchange" || e === "keyup" || e === "keydown")
            return Fn(Fa)
    }
    function p1(e, t) {
        if (e === "click")
            return Fn(t)
    }
    function b1(e, t) {
        if (e === "input" || e === "change")
            return Fn(t)
    }
    function S1(e, t) {
        return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t
    }
    var ft = typeof Object.is == "function" ? Object.is : S1;
    function Ia(e, t) {
        if (ft(e, t))
            return !0;
        if (typeof e != "object" || e === null || typeof t != "object" || t === null)
            return !1;
        var l = Object.keys(e)
          , a = Object.keys(t);
        if (l.length !== a.length)
            return !1;
        for (a = 0; a < l.length; a++) {
            var n = l[a];
            if (!uc.call(t, n) || !ft(e[n], t[n]))
                return !1
        }
        return !0
    }
    function xs(e) {
        for (; e && e.firstChild; )
            e = e.firstChild;
        return e
    }
    function ps(e, t) {
        var l = xs(e);
        e = 0;
        for (var a; l; ) {
            if (l.nodeType === 3) {
                if (a = e + l.textContent.length,
                e <= t && a >= t)
                    return {
                        node: l,
                        offset: t - e
                    };
                e = a
            }
            e: {
                for (; l; ) {
                    if (l.nextSibling) {
                        l = l.nextSibling;
                        break e
                    }
                    l = l.parentNode
                }
                l = void 0
            }
            l = xs(l)
        }
    }
    function bs(e, t) {
        return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? bs(e, t.parentNode) : "contains"in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1
    }
    function Ss(e) {
        e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
        for (var t = Qn(e.document); t instanceof e.HTMLIFrameElement; ) {
            try {
                var l = typeof t.contentWindow.location.href == "string"
            } catch {
                l = !1
            }
            if (l)
                e = t.contentWindow;
            else
                break;
            t = Qn(e.document)
        }
        return t
    }
    function Mc(e) {
        var t = e && e.nodeName && e.nodeName.toLowerCase();
        return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true")
    }
    var A1 = qt && "documentMode"in document && 11 >= document.documentMode
      , ia = null
      , Cc = null
      , Pa = null
      , Dc = !1;
    function As(e, t, l) {
        var a = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
        Dc || ia == null || ia !== Qn(a) || (a = ia,
        "selectionStart"in a && Mc(a) ? a = {
            start: a.selectionStart,
            end: a.selectionEnd
        } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(),
        a = {
            anchorNode: a.anchorNode,
            anchorOffset: a.anchorOffset,
            focusNode: a.focusNode,
            focusOffset: a.focusOffset
        }),
        Pa && Ia(Pa, a) || (Pa = a,
        a = Lu(Cc, "onSelect"),
        0 < a.length && (t = new $n("onSelect","select",null,t,l),
        e.push({
            event: t,
            listeners: a
        }),
        t.target = ia)))
    }
    function Bl(e, t) {
        var l = {};
        return l[e.toLowerCase()] = t.toLowerCase(),
        l["Webkit" + e] = "webkit" + t,
        l["Moz" + e] = "moz" + t,
        l
    }
    var ra = {
        animationend: Bl("Animation", "AnimationEnd"),
        animationiteration: Bl("Animation", "AnimationIteration"),
        animationstart: Bl("Animation", "AnimationStart"),
        transitionrun: Bl("Transition", "TransitionRun"),
        transitionstart: Bl("Transition", "TransitionStart"),
        transitioncancel: Bl("Transition", "TransitionCancel"),
        transitionend: Bl("Transition", "TransitionEnd")
    }
      , Oc = {}
      , Es = {};
    qt && (Es = document.createElement("div").style,
    "AnimationEvent"in window || (delete ra.animationend.animation,
    delete ra.animationiteration.animation,
    delete ra.animationstart.animation),
    "TransitionEvent"in window || delete ra.transitionend.transition);
    function wl(e) {
        if (Oc[e])
            return Oc[e];
        if (!ra[e])
            return e;
        var t = ra[e], l;
        for (l in t)
            if (t.hasOwnProperty(l) && l in Es)
                return Oc[e] = t[l];
        return e
    }
    var js = wl("animationend")
      , Ns = wl("animationiteration")
      , Ts = wl("animationstart")
      , E1 = wl("transitionrun")
      , j1 = wl("transitionstart")
      , N1 = wl("transitioncancel")
      , zs = wl("transitionend")
      , _s = new Map
      , Rc = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
    Rc.push("scrollEnd");
    function Ct(e, t) {
        _s.set(e, t),
        Ol(t, [e])
    }
    var In = typeof reportError == "function" ? reportError : function(e) {
        if (typeof window == "object" && typeof window.ErrorEvent == "function") {
            var t = new window.ErrorEvent("error",{
                bubbles: !0,
                cancelable: !0,
                message: typeof e == "object" && e !== null && typeof e.message == "string" ? String(e.message) : String(e),
                error: e
            });
            if (!window.dispatchEvent(t))
                return
        } else if (typeof process == "object" && typeof process.emit == "function") {
            process.emit("uncaughtException", e);
            return
        }
        console.error(e)
    }
      , bt = []
      , sa = 0
      , Bc = 0;
    function Pn() {
        for (var e = sa, t = Bc = sa = 0; t < e; ) {
            var l = bt[t];
            bt[t++] = null;
            var a = bt[t];
            bt[t++] = null;
            var n = bt[t];
            bt[t++] = null;
            var u = bt[t];
            if (bt[t++] = null,
            a !== null && n !== null) {
                var c = a.pending;
                c === null ? n.next = n : (n.next = c.next,
                c.next = n),
                a.pending = n
            }
            u !== 0 && Ms(l, n, u)
        }
    }
    function eu(e, t, l, a) {
        bt[sa++] = e,
        bt[sa++] = t,
        bt[sa++] = l,
        bt[sa++] = a,
        Bc |= a,
        e.lanes |= a,
        e = e.alternate,
        e !== null && (e.lanes |= a)
    }
    function wc(e, t, l, a) {
        return eu(e, t, l, a),
        tu(e)
    }
    function Hl(e, t) {
        return eu(e, null, null, t),
        tu(e)
    }
    function Ms(e, t, l) {
        e.lanes |= l;
        var a = e.alternate;
        a !== null && (a.lanes |= l);
        for (var n = !1, u = e.return; u !== null; )
            u.childLanes |= l,
            a = u.alternate,
            a !== null && (a.childLanes |= l),
            u.tag === 22 && (e = u.stateNode,
            e === null || e._visibility & 1 || (n = !0)),
            e = u,
            u = u.return;
        return e.tag === 3 ? (u = e.stateNode,
        n && t !== null && (n = 31 - ot(l),
        e = u.hiddenUpdates,
        a = e[n],
        a === null ? e[n] = [t] : a.push(t),
        t.lane = l | 536870912),
        u) : null
    }
    function tu(e) {
        if (50 < An)
            throw An = 0,
            Qi = null,
            Error(o(185));
        for (var t = e.return; t !== null; )
            e = t,
            t = e.return;
        return e.tag === 3 ? e.stateNode : null
    }
    var oa = {};
    function T1(e, t, l, a) {
        this.tag = e,
        this.key = l,
        this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null,
        this.index = 0,
        this.refCleanup = this.ref = null,
        this.pendingProps = t,
        this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null,
        this.mode = a,
        this.subtreeFlags = this.flags = 0,
        this.deletions = null,
        this.childLanes = this.lanes = 0,
        this.alternate = null
    }
    function dt(e, t, l, a) {
        return new T1(e,t,l,a)
    }
    function Hc(e) {
        return e = e.prototype,
        !(!e || !e.isReactComponent)
    }
    function kt(e, t) {
        var l = e.alternate;
        return l === null ? (l = dt(e.tag, t, e.key, e.mode),
        l.elementType = e.elementType,
        l.type = e.type,
        l.stateNode = e.stateNode,
        l.alternate = e,
        e.alternate = l) : (l.pendingProps = t,
        l.type = e.type,
        l.flags = 0,
        l.subtreeFlags = 0,
        l.deletions = null),
        l.flags = e.flags & 65011712,
        l.childLanes = e.childLanes,
        l.lanes = e.lanes,
        l.child = e.child,
        l.memoizedProps = e.memoizedProps,
        l.memoizedState = e.memoizedState,
        l.updateQueue = e.updateQueue,
        t = e.dependencies,
        l.dependencies = t === null ? null : {
            lanes: t.lanes,
            firstContext: t.firstContext
        },
        l.sibling = e.sibling,
        l.index = e.index,
        l.ref = e.ref,
        l.refCleanup = e.refCleanup,
        l
    }
    function Cs(e, t) {
        e.flags &= 65011714;
        var l = e.alternate;
        return l === null ? (e.childLanes = 0,
        e.lanes = t,
        e.child = null,
        e.subtreeFlags = 0,
        e.memoizedProps = null,
        e.memoizedState = null,
        e.updateQueue = null,
        e.dependencies = null,
        e.stateNode = null) : (e.childLanes = l.childLanes,
        e.lanes = l.lanes,
        e.child = l.child,
        e.subtreeFlags = 0,
        e.deletions = null,
        e.memoizedProps = l.memoizedProps,
        e.memoizedState = l.memoizedState,
        e.updateQueue = l.updateQueue,
        e.type = l.type,
        t = l.dependencies,
        e.dependencies = t === null ? null : {
            lanes: t.lanes,
            firstContext: t.firstContext
        }),
        e
    }
    function lu(e, t, l, a, n, u) {
        var c = 0;
        if (a = e,
        typeof e == "function")
            Hc(e) && (c = 1);
        else if (typeof e == "string")
            c = Dh(e, l, Y.current) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
        else
            e: switch (e) {
            case Ce:
                return e = dt(31, l, t, n),
                e.elementType = Ce,
                e.lanes = u,
                e;
            case D:
                return Ul(l.children, n, u, t);
            case H:
                c = 8,
                n |= 24;
                break;
            case Q:
                return e = dt(12, l, t, n | 2),
                e.elementType = Q,
                e.lanes = u,
                e;
            case je:
                return e = dt(13, l, t, n),
                e.elementType = je,
                e.lanes = u,
                e;
            case Me:
                return e = dt(19, l, t, n),
                e.elementType = Me,
                e.lanes = u,
                e;
            default:
                if (typeof e == "object" && e !== null)
                    switch (e.$$typeof) {
                    case le:
                        c = 10;
                        break e;
                    case J:
                        c = 9;
                        break e;
                    case ce:
                        c = 11;
                        break e;
                    case I:
                        c = 14;
                        break e;
                    case he:
                        c = 16,
                        a = null;
                        break e
                    }
                c = 29,
                l = Error(o(130, e === null ? "null" : typeof e, "")),
                a = null
            }
        return t = dt(c, l, t, n),
        t.elementType = e,
        t.type = a,
        t.lanes = u,
        t
    }
    function Ul(e, t, l, a) {
        return e = dt(7, e, a, t),
        e.lanes = l,
        e
    }
    function Uc(e, t, l) {
        return e = dt(6, e, null, t),
        e.lanes = l,
        e
    }
    function Ds(e) {
        var t = dt(18, null, null, 0);
        return t.stateNode = e,
        t
    }
    function Gc(e, t, l) {
        return t = dt(4, e.children !== null ? e.children : [], e.key, t),
        t.lanes = l,
        t.stateNode = {
            containerInfo: e.containerInfo,
            pendingChildren: null,
            implementation: e.implementation
        },
        t
    }
    var Os = new WeakMap;
    function St(e, t) {
        if (typeof e == "object" && e !== null) {
            var l = Os.get(e);
            return l !== void 0 ? l : (t = {
                value: e,
                source: t,
                stack: Dr(t)
            },
            Os.set(e, t),
            t)
        }
        return {
            value: e,
            source: t,
            stack: Dr(t)
        }
    }
    var fa = []
      , da = 0
      , au = null
      , en = 0
      , At = []
      , Et = 0
      , rl = null
      , wt = 1
      , Ht = "";
    function Vt(e, t) {
        fa[da++] = en,
        fa[da++] = au,
        au = e,
        en = t
    }
    function Rs(e, t, l) {
        At[Et++] = wt,
        At[Et++] = Ht,
        At[Et++] = rl,
        rl = e;
        var a = wt;
        e = Ht;
        var n = 32 - ot(a) - 1;
        a &= ~(1 << n),
        l += 1;
        var u = 32 - ot(t) + n;
        if (30 < u) {
            var c = n - n % 5;
            u = (a & (1 << c) - 1).toString(32),
            a >>= c,
            n -= c,
            wt = 1 << 32 - ot(t) + n | l << n | a,
            Ht = u + e
        } else
            wt = 1 << u | l << n | a,
            Ht = e
    }
    function Lc(e) {
        e.return !== null && (Vt(e, 1),
        Rs(e, 1, 0))
    }
    function Yc(e) {
        for (; e === au; )
            au = fa[--da],
            fa[da] = null,
            en = fa[--da],
            fa[da] = null;
        for (; e === rl; )
            rl = At[--Et],
            At[Et] = null,
            Ht = At[--Et],
            At[Et] = null,
            wt = At[--Et],
            At[Et] = null
    }
    function Bs(e, t) {
        At[Et++] = wt,
        At[Et++] = Ht,
        At[Et++] = rl,
        wt = t.id,
        Ht = t.overflow,
        rl = e
    }
    var $e = null
      , ze = null
      , de = !1
      , sl = null
      , jt = !1
      , qc = Error(o(519));
    function ol(e) {
        var t = Error(o(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", ""));
        throw tn(St(t, e)),
        qc
    }
    function ws(e) {
        var t = e.stateNode
          , l = e.type
          , a = e.memoizedProps;
        switch (t[Je] = e,
        t[tt] = a,
        l) {
        case "dialog":
            re("cancel", t),
            re("close", t);
            break;
        case "iframe":
        case "object":
        case "embed":
            re("load", t);
            break;
        case "video":
        case "audio":
            for (l = 0; l < jn.length; l++)
                re(jn[l], t);
            break;
        case "source":
            re("error", t);
            break;
        case "img":
        case "image":
        case "link":
            re("error", t),
            re("load", t);
            break;
        case "details":
            re("toggle", t);
            break;
        case "input":
            re("invalid", t),
            Jr(t, a.value, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name, !0);
            break;
        case "select":
            re("invalid", t);
            break;
        case "textarea":
            re("invalid", t),
            Wr(t, a.value, a.defaultValue, a.children)
        }
        l = a.children,
        typeof l != "string" && typeof l != "number" && typeof l != "bigint" || t.textContent === "" + l || a.suppressHydrationWarning === !0 || ed(t.textContent, l) ? (a.popover != null && (re("beforetoggle", t),
        re("toggle", t)),
        a.onScroll != null && re("scroll", t),
        a.onScrollEnd != null && re("scrollend", t),
        a.onClick != null && (t.onclick = Yt),
        t = !0) : t = !1,
        t || ol(e, !0)
    }
    function Hs(e) {
        for ($e = e.return; $e; )
            switch ($e.tag) {
            case 5:
            case 31:
            case 13:
                jt = !1;
                return;
            case 27:
            case 3:
                jt = !0;
                return;
            default:
                $e = $e.return
            }
    }
    function ha(e) {
        if (e !== $e)
            return !1;
        if (!de)
            return Hs(e),
            de = !0,
            !1;
        var t = e.tag, l;
        if ((l = t !== 3 && t !== 27) && ((l = t === 5) && (l = e.type,
        l = !(l !== "form" && l !== "button") || ur(e.type, e.memoizedProps)),
        l = !l),
        l && ze && ol(e),
        Hs(e),
        t === 13) {
            if (e = e.memoizedState,
            e = e !== null ? e.dehydrated : null,
            !e)
                throw Error(o(317));
            ze = sd(e)
        } else if (t === 31) {
            if (e = e.memoizedState,
            e = e !== null ? e.dehydrated : null,
            !e)
                throw Error(o(317));
            ze = sd(e)
        } else
            t === 27 ? (t = ze,
            jl(e.type) ? (e = or,
            or = null,
            ze = e) : ze = t) : ze = $e ? Tt(e.stateNode.nextSibling) : null;
        return !0
    }
    function Gl() {
        ze = $e = null,
        de = !1
    }
    function kc() {
        var e = sl;
        return e !== null && (ct === null ? ct = e : ct.push.apply(ct, e),
        sl = null),
        e
    }
    function tn(e) {
        sl === null ? sl = [e] : sl.push(e)
    }
    var Vc = h(null)
      , Ll = null
      , Qt = null;
    function fl(e, t, l) {
        L(Vc, t._currentValue),
        t._currentValue = l
    }
    function Xt(e) {
        e._currentValue = Vc.current,
        O(Vc)
    }
    function Qc(e, t, l) {
        for (; e !== null; ) {
            var a = e.alternate;
            if ((e.childLanes & t) !== t ? (e.childLanes |= t,
            a !== null && (a.childLanes |= t)) : a !== null && (a.childLanes & t) !== t && (a.childLanes |= t),
            e === l)
                break;
            e = e.return
        }
    }
    function Xc(e, t, l, a) {
        var n = e.child;
        for (n !== null && (n.return = e); n !== null; ) {
            var u = n.dependencies;
            if (u !== null) {
                var c = n.child;
                u = u.firstContext;
                e: for (; u !== null; ) {
                    var s = u;
                    u = n;
                    for (var d = 0; d < t.length; d++)
                        if (s.context === t[d]) {
                            u.lanes |= l,
                            s = u.alternate,
                            s !== null && (s.lanes |= l),
                            Qc(u.return, l, e),
                            a || (c = null);
                            break e
                        }
                    u = s.next
                }
            } else if (n.tag === 18) {
                if (c = n.return,
                c === null)
                    throw Error(o(341));
                c.lanes |= l,
                u = c.alternate,
                u !== null && (u.lanes |= l),
                Qc(c, l, e),
                c = null
            } else
                c = n.child;
            if (c !== null)
                c.return = n;
            else
                for (c = n; c !== null; ) {
                    if (c === e) {
                        c = null;
                        break
                    }
                    if (n = c.sibling,
                    n !== null) {
                        n.return = c.return,
                        c = n;
                        break
                    }
                    c = c.return
                }
            n = c
        }
    }
    function ma(e, t, l, a) {
        e = null;
        for (var n = t, u = !1; n !== null; ) {
            if (!u) {
                if ((n.flags & 524288) !== 0)
                    u = !0;
                else if ((n.flags & 262144) !== 0)
                    break
            }
            if (n.tag === 10) {
                var c = n.alternate;
                if (c === null)
                    throw Error(o(387));
                if (c = c.memoizedProps,
                c !== null) {
                    var s = n.type;
                    ft(n.pendingProps.value, c.value) || (e !== null ? e.push(s) : e = [s])
                }
            } else if (n === se.current) {
                if (c = n.alternate,
                c === null)
                    throw Error(o(387));
                c.memoizedState.memoizedState !== n.memoizedState.memoizedState && (e !== null ? e.push(Mn) : e = [Mn])
            }
            n = n.return
        }
        e !== null && Xc(t, e, l, a),
        t.flags |= 262144
    }
    function nu(e) {
        for (e = e.firstContext; e !== null; ) {
            if (!ft(e.context._currentValue, e.memoizedValue))
                return !0;
            e = e.next
        }
        return !1
    }
    function Yl(e) {
        Ll = e,
        Qt = null,
        e = e.dependencies,
        e !== null && (e.firstContext = null)
    }
    function We(e) {
        return Us(Ll, e)
    }
    function uu(e, t) {
        return Ll === null && Yl(e),
        Us(e, t)
    }
    function Us(e, t) {
        var l = t._currentValue;
        if (t = {
            context: t,
            memoizedValue: l,
            next: null
        },
        Qt === null) {
            if (e === null)
                throw Error(o(308));
            Qt = t,
            e.dependencies = {
                lanes: 0,
                firstContext: t
            },
            e.flags |= 524288
        } else
            Qt = Qt.next = t;
        return l
    }
    var z1 = typeof AbortController < "u" ? AbortController : function() {
        var e = []
          , t = this.signal = {
            aborted: !1,
            addEventListener: function(l, a) {
                e.push(a)
            }
        };
        this.abort = function() {
            t.aborted = !0,
            e.forEach(function(l) {
                return l()
            })
        }
    }
      , _1 = i.unstable_scheduleCallback
      , M1 = i.unstable_NormalPriority
      , Le = {
        $$typeof: le,
        Consumer: null,
        Provider: null,
        _currentValue: null,
        _currentValue2: null,
        _threadCount: 0
    };
    function Zc() {
        return {
            controller: new z1,
            data: new Map,
            refCount: 0
        }
    }
    function ln(e) {
        e.refCount--,
        e.refCount === 0 && _1(M1, function() {
            e.controller.abort()
        })
    }
    var an = null
      , Kc = 0
      , va = 0
      , ga = null;
    function C1(e, t) {
        if (an === null) {
            var l = an = [];
            Kc = 0,
            va = Wi(),
            ga = {
                status: "pending",
                value: void 0,
                then: function(a) {
                    l.push(a)
                }
            }
        }
        return Kc++,
        t.then(Gs, Gs),
        t
    }
    function Gs() {
        if (--Kc === 0 && an !== null) {
            ga !== null && (ga.status = "fulfilled");
            var e = an;
            an = null,
            va = 0,
            ga = null;
            for (var t = 0; t < e.length; t++)
                (0,
                e[t])()
        }
    }
    function D1(e, t) {
        var l = []
          , a = {
            status: "pending",
            value: null,
            reason: null,
            then: function(n) {
                l.push(n)
            }
        };
        return e.then(function() {
            a.status = "fulfilled",
            a.value = t;
            for (var n = 0; n < l.length; n++)
                (0,
                l[n])(t)
        }, function(n) {
            for (a.status = "rejected",
            a.reason = n,
            n = 0; n < l.length; n++)
                (0,
                l[n])(void 0)
        }),
        a
    }
    var Ls = z.S;
    z.S = function(e, t) {
        jf = rt(),
        typeof t == "object" && t !== null && typeof t.then == "function" && C1(e, t),
        Ls !== null && Ls(e, t)
    }
    ;
    var ql = h(null);
    function Jc() {
        var e = ql.current;
        return e !== null ? e : Ne.pooledCache
    }
    function cu(e, t) {
        t === null ? L(ql, ql.current) : L(ql, t.pool)
    }
    function Ys() {
        var e = Jc();
        return e === null ? null : {
            parent: Le._currentValue,
            pool: e
        }
    }
    var ya = Error(o(460))
      , $c = Error(o(474))
      , iu = Error(o(542))
      , ru = {
        then: function() {}
    };
    function qs(e) {
        return e = e.status,
        e === "fulfilled" || e === "rejected"
    }
    function ks(e, t, l) {
        switch (l = e[l],
        l === void 0 ? e.push(t) : l !== t && (t.then(Yt, Yt),
        t = l),
        t.status) {
        case "fulfilled":
            return t.value;
        case "rejected":
            throw e = t.reason,
            Qs(e),
            e;
        default:
            if (typeof t.status == "string")
                t.then(Yt, Yt);
            else {
                if (e = Ne,
                e !== null && 100 < e.shellSuspendCounter)
                    throw Error(o(482));
                e = t,
                e.status = "pending",
                e.then(function(a) {
                    if (t.status === "pending") {
                        var n = t;
                        n.status = "fulfilled",
                        n.value = a
                    }
                }, function(a) {
                    if (t.status === "pending") {
                        var n = t;
                        n.status = "rejected",
                        n.reason = a
                    }
                })
            }
            switch (t.status) {
            case "fulfilled":
                return t.value;
            case "rejected":
                throw e = t.reason,
                Qs(e),
                e
            }
            throw Vl = t,
            ya
        }
    }
    function kl(e) {
        try {
            var t = e._init;
            return t(e._payload)
        } catch (l) {
            throw l !== null && typeof l == "object" && typeof l.then == "function" ? (Vl = l,
            ya) : l
        }
    }
    var Vl = null;
    function Vs() {
        if (Vl === null)
            throw Error(o(459));
        var e = Vl;
        return Vl = null,
        e
    }
    function Qs(e) {
        if (e === ya || e === iu)
            throw Error(o(483))
    }
    var xa = null
      , nn = 0;
    function su(e) {
        var t = nn;
        return nn += 1,
        xa === null && (xa = []),
        ks(xa, e, t)
    }
    function un(e, t) {
        t = t.props.ref,
        e.ref = t !== void 0 ? t : null
    }
    function ou(e, t) {
        throw t.$$typeof === G ? Error(o(525)) : (e = Object.prototype.toString.call(t),
        Error(o(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e)))
    }
    function Xs(e) {
        function t(x, v) {
            if (e) {
                var p = x.deletions;
                p === null ? (x.deletions = [v],
                x.flags |= 16) : p.push(v)
            }
        }
        function l(x, v) {
            if (!e)
                return null;
            for (; v !== null; )
                t(x, v),
                v = v.sibling;
            return null
        }
        function a(x) {
            for (var v = new Map; x !== null; )
                x.key !== null ? v.set(x.key, x) : v.set(x.index, x),
                x = x.sibling;
            return v
        }
        function n(x, v) {
            return x = kt(x, v),
            x.index = 0,
            x.sibling = null,
            x
        }
        function u(x, v, p) {
            return x.index = p,
            e ? (p = x.alternate,
            p !== null ? (p = p.index,
            p < v ? (x.flags |= 67108866,
            v) : p) : (x.flags |= 67108866,
            v)) : (x.flags |= 1048576,
            v)
        }
        function c(x) {
            return e && x.alternate === null && (x.flags |= 67108866),
            x
        }
        function s(x, v, p, R) {
            return v === null || v.tag !== 6 ? (v = Uc(p, x.mode, R),
            v.return = x,
            v) : (v = n(v, p),
            v.return = x,
            v)
        }
        function d(x, v, p, R) {
            var $ = p.type;
            return $ === D ? M(x, v, p.props.children, R, p.key) : v !== null && (v.elementType === $ || typeof $ == "object" && $ !== null && $.$$typeof === he && kl($) === v.type) ? (v = n(v, p.props),
            un(v, p),
            v.return = x,
            v) : (v = lu(p.type, p.key, p.props, null, x.mode, R),
            un(v, p),
            v.return = x,
            v)
        }
        function b(x, v, p, R) {
            return v === null || v.tag !== 4 || v.stateNode.containerInfo !== p.containerInfo || v.stateNode.implementation !== p.implementation ? (v = Gc(p, x.mode, R),
            v.return = x,
            v) : (v = n(v, p.children || []),
            v.return = x,
            v)
        }
        function M(x, v, p, R, $) {
            return v === null || v.tag !== 7 ? (v = Ul(p, x.mode, R, $),
            v.return = x,
            v) : (v = n(v, p),
            v.return = x,
            v)
        }
        function B(x, v, p) {
            if (typeof v == "string" && v !== "" || typeof v == "number" || typeof v == "bigint")
                return v = Uc("" + v, x.mode, p),
                v.return = x,
                v;
            if (typeof v == "object" && v !== null) {
                switch (v.$$typeof) {
                case ee:
                    return p = lu(v.type, v.key, v.props, null, x.mode, p),
                    un(p, v),
                    p.return = x,
                    p;
                case q:
                    return v = Gc(v, x.mode, p),
                    v.return = x,
                    v;
                case he:
                    return v = kl(v),
                    B(x, v, p)
                }
                if (me(v) || Te(v))
                    return v = Ul(v, x.mode, p, null),
                    v.return = x,
                    v;
                if (typeof v.then == "function")
                    return B(x, su(v), p);
                if (v.$$typeof === le)
                    return B(x, uu(x, v), p);
                ou(x, v)
            }
            return null
        }
        function S(x, v, p, R) {
            var $ = v !== null ? v.key : null;
            if (typeof p == "string" && p !== "" || typeof p == "number" || typeof p == "bigint")
                return $ !== null ? null : s(x, v, "" + p, R);
            if (typeof p == "object" && p !== null) {
                switch (p.$$typeof) {
                case ee:
                    return p.key === $ ? d(x, v, p, R) : null;
                case q:
                    return p.key === $ ? b(x, v, p, R) : null;
                case he:
                    return p = kl(p),
                    S(x, v, p, R)
                }
                if (me(p) || Te(p))
                    return $ !== null ? null : M(x, v, p, R, null);
                if (typeof p.then == "function")
                    return S(x, v, su(p), R);
                if (p.$$typeof === le)
                    return S(x, v, uu(x, p), R);
                ou(x, p)
            }
            return null
        }
        function N(x, v, p, R, $) {
            if (typeof R == "string" && R !== "" || typeof R == "number" || typeof R == "bigint")
                return x = x.get(p) || null,
                s(v, x, "" + R, $);
            if (typeof R == "object" && R !== null) {
                switch (R.$$typeof) {
                case ee:
                    return x = x.get(R.key === null ? p : R.key) || null,
                    d(v, x, R, $);
                case q:
                    return x = x.get(R.key === null ? p : R.key) || null,
                    b(v, x, R, $);
                case he:
                    return R = kl(R),
                    N(x, v, p, R, $)
                }
                if (me(R) || Te(R))
                    return x = x.get(p) || null,
                    M(v, x, R, $, null);
                if (typeof R.then == "function")
                    return N(x, v, p, su(R), $);
                if (R.$$typeof === le)
                    return N(x, v, p, uu(v, R), $);
                ou(v, R)
            }
            return null
        }
        function X(x, v, p, R) {
            for (var $ = null, ve = null, Z = v, ue = v = 0, fe = null; Z !== null && ue < p.length; ue++) {
                Z.index > ue ? (fe = Z,
                Z = null) : fe = Z.sibling;
                var ge = S(x, Z, p[ue], R);
                if (ge === null) {
                    Z === null && (Z = fe);
                    break
                }
                e && Z && ge.alternate === null && t(x, Z),
                v = u(ge, v, ue),
                ve === null ? $ = ge : ve.sibling = ge,
                ve = ge,
                Z = fe
            }
            if (ue === p.length)
                return l(x, Z),
                de && Vt(x, ue),
                $;
            if (Z === null) {
                for (; ue < p.length; ue++)
                    Z = B(x, p[ue], R),
                    Z !== null && (v = u(Z, v, ue),
                    ve === null ? $ = Z : ve.sibling = Z,
                    ve = Z);
                return de && Vt(x, ue),
                $
            }
            for (Z = a(Z); ue < p.length; ue++)
                fe = N(Z, x, ue, p[ue], R),
                fe !== null && (e && fe.alternate !== null && Z.delete(fe.key === null ? ue : fe.key),
                v = u(fe, v, ue),
                ve === null ? $ = fe : ve.sibling = fe,
                ve = fe);
            return e && Z.forEach(function(Ml) {
                return t(x, Ml)
            }),
            de && Vt(x, ue),
            $
        }
        function F(x, v, p, R) {
            if (p == null)
                throw Error(o(151));
            for (var $ = null, ve = null, Z = v, ue = v = 0, fe = null, ge = p.next(); Z !== null && !ge.done; ue++,
            ge = p.next()) {
                Z.index > ue ? (fe = Z,
                Z = null) : fe = Z.sibling;
                var Ml = S(x, Z, ge.value, R);
                if (Ml === null) {
                    Z === null && (Z = fe);
                    break
                }
                e && Z && Ml.alternate === null && t(x, Z),
                v = u(Ml, v, ue),
                ve === null ? $ = Ml : ve.sibling = Ml,
                ve = Ml,
                Z = fe
            }
            if (ge.done)
                return l(x, Z),
                de && Vt(x, ue),
                $;
            if (Z === null) {
                for (; !ge.done; ue++,
                ge = p.next())
                    ge = B(x, ge.value, R),
                    ge !== null && (v = u(ge, v, ue),
                    ve === null ? $ = ge : ve.sibling = ge,
                    ve = ge);
                return de && Vt(x, ue),
                $
            }
            for (Z = a(Z); !ge.done; ue++,
            ge = p.next())
                ge = N(Z, x, ue, ge.value, R),
                ge !== null && (e && ge.alternate !== null && Z.delete(ge.key === null ? ue : ge.key),
                v = u(ge, v, ue),
                ve === null ? $ = ge : ve.sibling = ge,
                ve = ge);
            return e && Z.forEach(function(kh) {
                return t(x, kh)
            }),
            de && Vt(x, ue),
            $
        }
        function Ee(x, v, p, R) {
            if (typeof p == "object" && p !== null && p.type === D && p.key === null && (p = p.props.children),
            typeof p == "object" && p !== null) {
                switch (p.$$typeof) {
                case ee:
                    e: {
                        for (var $ = p.key; v !== null; ) {
                            if (v.key === $) {
                                if ($ = p.type,
                                $ === D) {
                                    if (v.tag === 7) {
                                        l(x, v.sibling),
                                        R = n(v, p.props.children),
                                        R.return = x,
                                        x = R;
                                        break e
                                    }
                                } else if (v.elementType === $ || typeof $ == "object" && $ !== null && $.$$typeof === he && kl($) === v.type) {
                                    l(x, v.sibling),
                                    R = n(v, p.props),
                                    un(R, p),
                                    R.return = x,
                                    x = R;
                                    break e
                                }
                                l(x, v);
                                break
                            } else
                                t(x, v);
                            v = v.sibling
                        }
                        p.type === D ? (R = Ul(p.props.children, x.mode, R, p.key),
                        R.return = x,
                        x = R) : (R = lu(p.type, p.key, p.props, null, x.mode, R),
                        un(R, p),
                        R.return = x,
                        x = R)
                    }
                    return c(x);
                case q:
                    e: {
                        for ($ = p.key; v !== null; ) {
                            if (v.key === $)
                                if (v.tag === 4 && v.stateNode.containerInfo === p.containerInfo && v.stateNode.implementation === p.implementation) {
                                    l(x, v.sibling),
                                    R = n(v, p.children || []),
                                    R.return = x,
                                    x = R;
                                    break e
                                } else {
                                    l(x, v);
                                    break
                                }
                            else
                                t(x, v);
                            v = v.sibling
                        }
                        R = Gc(p, x.mode, R),
                        R.return = x,
                        x = R
                    }
                    return c(x);
                case he:
                    return p = kl(p),
                    Ee(x, v, p, R)
                }
                if (me(p))
                    return X(x, v, p, R);
                if (Te(p)) {
                    if ($ = Te(p),
                    typeof $ != "function")
                        throw Error(o(150));
                    return p = $.call(p),
                    F(x, v, p, R)
                }
                if (typeof p.then == "function")
                    return Ee(x, v, su(p), R);
                if (p.$$typeof === le)
                    return Ee(x, v, uu(x, p), R);
                ou(x, p)
            }
            return typeof p == "string" && p !== "" || typeof p == "number" || typeof p == "bigint" ? (p = "" + p,
            v !== null && v.tag === 6 ? (l(x, v.sibling),
            R = n(v, p),
            R.return = x,
            x = R) : (l(x, v),
            R = Uc(p, x.mode, R),
            R.return = x,
            x = R),
            c(x)) : l(x, v)
        }
        return function(x, v, p, R) {
            try {
                nn = 0;
                var $ = Ee(x, v, p, R);
                return xa = null,
                $
            } catch (Z) {
                if (Z === ya || Z === iu)
                    throw Z;
                var ve = dt(29, Z, null, x.mode);
                return ve.lanes = R,
                ve.return = x,
                ve
            }
        }
    }
    var Ql = Xs(!0)
      , Zs = Xs(!1)
      , dl = !1;
    function Wc(e) {
        e.updateQueue = {
            baseState: e.memoizedState,
            firstBaseUpdate: null,
            lastBaseUpdate: null,
            shared: {
                pending: null,
                lanes: 0,
                hiddenCallbacks: null
            },
            callbacks: null
        }
    }
    function Fc(e, t) {
        e = e.updateQueue,
        t.updateQueue === e && (t.updateQueue = {
            baseState: e.baseState,
            firstBaseUpdate: e.firstBaseUpdate,
            lastBaseUpdate: e.lastBaseUpdate,
            shared: e.shared,
            callbacks: null
        })
    }
    function hl(e) {
        return {
            lane: e,
            tag: 0,
            payload: null,
            callback: null,
            next: null
        }
    }
    function ml(e, t, l) {
        var a = e.updateQueue;
        if (a === null)
            return null;
        if (a = a.shared,
        (xe & 2) !== 0) {
            var n = a.pending;
            return n === null ? t.next = t : (t.next = n.next,
            n.next = t),
            a.pending = t,
            t = tu(e),
            Ms(e, null, l),
            t
        }
        return eu(e, a, t, l),
        tu(e)
    }
    function cn(e, t, l) {
        if (t = t.updateQueue,
        t !== null && (t = t.shared,
        (l & 4194048) !== 0)) {
            var a = t.lanes;
            a &= e.pendingLanes,
            l |= a,
            t.lanes = l,
            Ur(e, l)
        }
    }
    function Ic(e, t) {
        var l = e.updateQueue
          , a = e.alternate;
        if (a !== null && (a = a.updateQueue,
        l === a)) {
            var n = null
              , u = null;
            if (l = l.firstBaseUpdate,
            l !== null) {
                do {
                    var c = {
                        lane: l.lane,
                        tag: l.tag,
                        payload: l.payload,
                        callback: null,
                        next: null
                    };
                    u === null ? n = u = c : u = u.next = c,
                    l = l.next
                } while (l !== null);
                u === null ? n = u = t : u = u.next = t
            } else
                n = u = t;
            l = {
                baseState: a.baseState,
                firstBaseUpdate: n,
                lastBaseUpdate: u,
                shared: a.shared,
                callbacks: a.callbacks
            },
            e.updateQueue = l;
            return
        }
        e = l.lastBaseUpdate,
        e === null ? l.firstBaseUpdate = t : e.next = t,
        l.lastBaseUpdate = t
    }
    var Pc = !1;
    function rn() {
        if (Pc) {
            var e = ga;
            if (e !== null)
                throw e
        }
    }
    function sn(e, t, l, a) {
        Pc = !1;
        var n = e.updateQueue;
        dl = !1;
        var u = n.firstBaseUpdate
          , c = n.lastBaseUpdate
          , s = n.shared.pending;
        if (s !== null) {
            n.shared.pending = null;
            var d = s
              , b = d.next;
            d.next = null,
            c === null ? u = b : c.next = b,
            c = d;
            var M = e.alternate;
            M !== null && (M = M.updateQueue,
            s = M.lastBaseUpdate,
            s !== c && (s === null ? M.firstBaseUpdate = b : s.next = b,
            M.lastBaseUpdate = d))
        }
        if (u !== null) {
            var B = n.baseState;
            c = 0,
            M = b = d = null,
            s = u;
            do {
                var S = s.lane & -536870913
                  , N = S !== s.lane;
                if (N ? (oe & S) === S : (a & S) === S) {
                    S !== 0 && S === va && (Pc = !0),
                    M !== null && (M = M.next = {
                        lane: 0,
                        tag: s.tag,
                        payload: s.payload,
                        callback: null,
                        next: null
                    });
                    e: {
                        var X = e
                          , F = s;
                        S = t;
                        var Ee = l;
                        switch (F.tag) {
                        case 1:
                            if (X = F.payload,
                            typeof X == "function") {
                                B = X.call(Ee, B, S);
                                break e
                            }
                            B = X;
                            break e;
                        case 3:
                            X.flags = X.flags & -65537 | 128;
                        case 0:
                            if (X = F.payload,
                            S = typeof X == "function" ? X.call(Ee, B, S) : X,
                            S == null)
                                break e;
                            B = C({}, B, S);
                            break e;
                        case 2:
                            dl = !0
                        }
                    }
                    S = s.callback,
                    S !== null && (e.flags |= 64,
                    N && (e.flags |= 8192),
                    N = n.callbacks,
                    N === null ? n.callbacks = [S] : N.push(S))
                } else
                    N = {
                        lane: S,
                        tag: s.tag,
                        payload: s.payload,
                        callback: s.callback,
                        next: null
                    },
                    M === null ? (b = M = N,
                    d = B) : M = M.next = N,
                    c |= S;
                if (s = s.next,
                s === null) {
                    if (s = n.shared.pending,
                    s === null)
                        break;
                    N = s,
                    s = N.next,
                    N.next = null,
                    n.lastBaseUpdate = N,
                    n.shared.pending = null
                }
            } while (!0);
            M === null && (d = B),
            n.baseState = d,
            n.firstBaseUpdate = b,
            n.lastBaseUpdate = M,
            u === null && (n.shared.lanes = 0),
            pl |= c,
            e.lanes = c,
            e.memoizedState = B
        }
    }
    function Ks(e, t) {
        if (typeof e != "function")
            throw Error(o(191, e));
        e.call(t)
    }
    function Js(e, t) {
        var l = e.callbacks;
        if (l !== null)
            for (e.callbacks = null,
            e = 0; e < l.length; e++)
                Ks(l[e], t)
    }
    var pa = h(null)
      , fu = h(0);
    function $s(e, t) {
        e = el,
        L(fu, e),
        L(pa, t),
        el = e | t.baseLanes
    }
    function ei() {
        L(fu, el),
        L(pa, pa.current)
    }
    function ti() {
        el = fu.current,
        O(pa),
        O(fu)
    }
    var ht = h(null)
      , Nt = null;
    function vl(e) {
        var t = e.alternate;
        L(Ue, Ue.current & 1),
        L(ht, e),
        Nt === null && (t === null || pa.current !== null || t.memoizedState !== null) && (Nt = e)
    }
    function li(e) {
        L(Ue, Ue.current),
        L(ht, e),
        Nt === null && (Nt = e)
    }
    function Ws(e) {
        e.tag === 22 ? (L(Ue, Ue.current),
        L(ht, e),
        Nt === null && (Nt = e)) : gl()
    }
    function gl() {
        L(Ue, Ue.current),
        L(ht, ht.current)
    }
    function mt(e) {
        O(ht),
        Nt === e && (Nt = null),
        O(Ue)
    }
    var Ue = h(0);
    function du(e) {
        for (var t = e; t !== null; ) {
            if (t.tag === 13) {
                var l = t.memoizedState;
                if (l !== null && (l = l.dehydrated,
                l === null || rr(l) || sr(l)))
                    return t
            } else if (t.tag === 19 && (t.memoizedProps.revealOrder === "forwards" || t.memoizedProps.revealOrder === "backwards" || t.memoizedProps.revealOrder === "unstable_legacy-backwards" || t.memoizedProps.revealOrder === "together")) {
                if ((t.flags & 128) !== 0)
                    return t
            } else if (t.child !== null) {
                t.child.return = t,
                t = t.child;
                continue
            }
            if (t === e)
                break;
            for (; t.sibling === null; ) {
                if (t.return === null || t.return === e)
                    return null;
                t = t.return
            }
            t.sibling.return = t.return,
            t = t.sibling
        }
        return null
    }
    var Zt = 0
      , ne = null
      , Se = null
      , Ye = null
      , hu = !1
      , ba = !1
      , Xl = !1
      , mu = 0
      , on = 0
      , Sa = null
      , O1 = 0;
    function Re() {
        throw Error(o(321))
    }
    function ai(e, t) {
        if (t === null)
            return !1;
        for (var l = 0; l < t.length && l < e.length; l++)
            if (!ft(e[l], t[l]))
                return !1;
        return !0
    }
    function ni(e, t, l, a, n, u) {
        return Zt = u,
        ne = t,
        t.memoizedState = null,
        t.updateQueue = null,
        t.lanes = 0,
        z.H = e === null || e.memoizedState === null ? Bo : pi,
        Xl = !1,
        u = l(a, n),
        Xl = !1,
        ba && (u = Is(t, l, a, n)),
        Fs(e),
        u
    }
    function Fs(e) {
        z.H = hn;
        var t = Se !== null && Se.next !== null;
        if (Zt = 0,
        Ye = Se = ne = null,
        hu = !1,
        on = 0,
        Sa = null,
        t)
            throw Error(o(300));
        e === null || qe || (e = e.dependencies,
        e !== null && nu(e) && (qe = !0))
    }
    function Is(e, t, l, a) {
        ne = e;
        var n = 0;
        do {
            if (ba && (Sa = null),
            on = 0,
            ba = !1,
            25 <= n)
                throw Error(o(301));
            if (n += 1,
            Ye = Se = null,
            e.updateQueue != null) {
                var u = e.updateQueue;
                u.lastEffect = null,
                u.events = null,
                u.stores = null,
                u.memoCache != null && (u.memoCache.index = 0)
            }
            z.H = wo,
            u = t(l, a)
        } while (ba);
        return u
    }
    function R1() {
        var e = z.H
          , t = e.useState()[0];
        return t = typeof t.then == "function" ? fn(t) : t,
        e = e.useState()[0],
        (Se !== null ? Se.memoizedState : null) !== e && (ne.flags |= 1024),
        t
    }
    function ui() {
        var e = mu !== 0;
        return mu = 0,
        e
    }
    function ci(e, t, l) {
        t.updateQueue = e.updateQueue,
        t.flags &= -2053,
        e.lanes &= ~l
    }
    function ii(e) {
        if (hu) {
            for (e = e.memoizedState; e !== null; ) {
                var t = e.queue;
                t !== null && (t.pending = null),
                e = e.next
            }
            hu = !1
        }
        Zt = 0,
        Ye = Se = ne = null,
        ba = !1,
        on = mu = 0,
        Sa = null
    }
    function et() {
        var e = {
            memoizedState: null,
            baseState: null,
            baseQueue: null,
            queue: null,
            next: null
        };
        return Ye === null ? ne.memoizedState = Ye = e : Ye = Ye.next = e,
        Ye
    }
    function Ge() {
        if (Se === null) {
            var e = ne.alternate;
            e = e !== null ? e.memoizedState : null
        } else
            e = Se.next;
        var t = Ye === null ? ne.memoizedState : Ye.next;
        if (t !== null)
            Ye = t,
            Se = e;
        else {
            if (e === null)
                throw ne.alternate === null ? Error(o(467)) : Error(o(310));
            Se = e,
            e = {
                memoizedState: Se.memoizedState,
                baseState: Se.baseState,
                baseQueue: Se.baseQueue,
                queue: Se.queue,
                next: null
            },
            Ye === null ? ne.memoizedState = Ye = e : Ye = Ye.next = e
        }
        return Ye
    }
    function vu() {
        return {
            lastEffect: null,
            events: null,
            stores: null,
            memoCache: null
        }
    }
    function fn(e) {
        var t = on;
        return on += 1,
        Sa === null && (Sa = []),
        e = ks(Sa, e, t),
        t = ne,
        (Ye === null ? t.memoizedState : Ye.next) === null && (t = t.alternate,
        z.H = t === null || t.memoizedState === null ? Bo : pi),
        e
    }
    function gu(e) {
        if (e !== null && typeof e == "object") {
            if (typeof e.then == "function")
                return fn(e);
            if (e.$$typeof === le)
                return We(e)
        }
        throw Error(o(438, String(e)))
    }
    function ri(e) {
        var t = null
          , l = ne.updateQueue;
        if (l !== null && (t = l.memoCache),
        t == null) {
            var a = ne.alternate;
            a !== null && (a = a.updateQueue,
            a !== null && (a = a.memoCache,
            a != null && (t = {
                data: a.data.map(function(n) {
                    return n.slice()
                }),
                index: 0
            })))
        }
        if (t == null && (t = {
            data: [],
            index: 0
        }),
        l === null && (l = vu(),
        ne.updateQueue = l),
        l.memoCache = t,
        l = t.data[t.index],
        l === void 0)
            for (l = t.data[t.index] = Array(e),
            a = 0; a < e; a++)
                l[a] = we;
        return t.index++,
        l
    }
    function Kt(e, t) {
        return typeof t == "function" ? t(e) : t
    }
    function yu(e) {
        var t = Ge();
        return si(t, Se, e)
    }
    function si(e, t, l) {
        var a = e.queue;
        if (a === null)
            throw Error(o(311));
        a.lastRenderedReducer = l;
        var n = e.baseQueue
          , u = a.pending;
        if (u !== null) {
            if (n !== null) {
                var c = n.next;
                n.next = u.next,
                u.next = c
            }
            t.baseQueue = n = u,
            a.pending = null
        }
        if (u = e.baseState,
        n === null)
            e.memoizedState = u;
        else {
            t = n.next;
            var s = c = null
              , d = null
              , b = t
              , M = !1;
            do {
                var B = b.lane & -536870913;
                if (B !== b.lane ? (oe & B) === B : (Zt & B) === B) {
                    var S = b.revertLane;
                    if (S === 0)
                        d !== null && (d = d.next = {
                            lane: 0,
                            revertLane: 0,
                            gesture: null,
                            action: b.action,
                            hasEagerState: b.hasEagerState,
                            eagerState: b.eagerState,
                            next: null
                        }),
                        B === va && (M = !0);
                    else if ((Zt & S) === S) {
                        b = b.next,
                        S === va && (M = !0);
                        continue
                    } else
                        B = {
                            lane: 0,
                            revertLane: b.revertLane,
                            gesture: null,
                            action: b.action,
                            hasEagerState: b.hasEagerState,
                            eagerState: b.eagerState,
                            next: null
                        },
                        d === null ? (s = d = B,
                        c = u) : d = d.next = B,
                        ne.lanes |= S,
                        pl |= S;
                    B = b.action,
                    Xl && l(u, B),
                    u = b.hasEagerState ? b.eagerState : l(u, B)
                } else
                    S = {
                        lane: B,
                        revertLane: b.revertLane,
                        gesture: b.gesture,
                        action: b.action,
                        hasEagerState: b.hasEagerState,
                        eagerState: b.eagerState,
                        next: null
                    },
                    d === null ? (s = d = S,
                    c = u) : d = d.next = S,
                    ne.lanes |= B,
                    pl |= B;
                b = b.next
            } while (b !== null && b !== t);
            if (d === null ? c = u : d.next = s,
            !ft(u, e.memoizedState) && (qe = !0,
            M && (l = ga,
            l !== null)))
                throw l;
            e.memoizedState = u,
            e.baseState = c,
            e.baseQueue = d,
            a.lastRenderedState = u
        }
        return n === null && (a.lanes = 0),
        [e.memoizedState, a.dispatch]
    }
    function oi(e) {
        var t = Ge()
          , l = t.queue;
        if (l === null)
            throw Error(o(311));
        l.lastRenderedReducer = e;
        var a = l.dispatch
          , n = l.pending
          , u = t.memoizedState;
        if (n !== null) {
            l.pending = null;
            var c = n = n.next;
            do
                u = e(u, c.action),
                c = c.next;
            while (c !== n);
            ft(u, t.memoizedState) || (qe = !0),
            t.memoizedState = u,
            t.baseQueue === null && (t.baseState = u),
            l.lastRenderedState = u
        }
        return [u, a]
    }
    function Ps(e, t, l) {
        var a = ne
          , n = Ge()
          , u = de;
        if (u) {
            if (l === void 0)
                throw Error(o(407));
            l = l()
        } else
            l = t();
        var c = !ft((Se || n).memoizedState, l);
        if (c && (n.memoizedState = l,
        qe = !0),
        n = n.queue,
        hi(lo.bind(null, a, n, e), [e]),
        n.getSnapshot !== t || c || Ye !== null && Ye.memoizedState.tag & 1) {
            if (a.flags |= 2048,
            Aa(9, {
                destroy: void 0
            }, to.bind(null, a, n, l, t), null),
            Ne === null)
                throw Error(o(349));
            u || (Zt & 127) !== 0 || eo(a, t, l)
        }
        return l
    }
    function eo(e, t, l) {
        e.flags |= 16384,
        e = {
            getSnapshot: t,
            value: l
        },
        t = ne.updateQueue,
        t === null ? (t = vu(),
        ne.updateQueue = t,
        t.stores = [e]) : (l = t.stores,
        l === null ? t.stores = [e] : l.push(e))
    }
    function to(e, t, l, a) {
        t.value = l,
        t.getSnapshot = a,
        ao(t) && no(e)
    }
    function lo(e, t, l) {
        return l(function() {
            ao(t) && no(e)
        })
    }
    function ao(e) {
        var t = e.getSnapshot;
        e = e.value;
        try {
            var l = t();
            return !ft(e, l)
        } catch {
            return !0
        }
    }
    function no(e) {
        var t = Hl(e, 2);
        t !== null && it(t, e, 2)
    }
    function fi(e) {
        var t = et();
        if (typeof e == "function") {
            var l = e;
            if (e = l(),
            Xl) {
                ul(!0);
                try {
                    l()
                } finally {
                    ul(!1)
                }
            }
        }
        return t.memoizedState = t.baseState = e,
        t.queue = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: Kt,
            lastRenderedState: e
        },
        t
    }
    function uo(e, t, l, a) {
        return e.baseState = l,
        si(e, Se, typeof a == "function" ? a : Kt)
    }
    function B1(e, t, l, a, n) {
        if (bu(e))
            throw Error(o(485));
        if (e = t.action,
        e !== null) {
            var u = {
                payload: n,
                action: e,
                next: null,
                isTransition: !0,
                status: "pending",
                value: null,
                reason: null,
                listeners: [],
                then: function(c) {
                    u.listeners.push(c)
                }
            };
            z.T !== null ? l(!0) : u.isTransition = !1,
            a(u),
            l = t.pending,
            l === null ? (u.next = t.pending = u,
            co(t, u)) : (u.next = l.next,
            t.pending = l.next = u)
        }
    }
    function co(e, t) {
        var l = t.action
          , a = t.payload
          , n = e.state;
        if (t.isTransition) {
            var u = z.T
              , c = {};
            z.T = c;
            try {
                var s = l(n, a)
                  , d = z.S;
                d !== null && d(c, s),
                io(e, t, s)
            } catch (b) {
                di(e, t, b)
            } finally {
                u !== null && c.types !== null && (u.types = c.types),
                z.T = u
            }
        } else
            try {
                u = l(n, a),
                io(e, t, u)
            } catch (b) {
                di(e, t, b)
            }
    }
    function io(e, t, l) {
        l !== null && typeof l == "object" && typeof l.then == "function" ? l.then(function(a) {
            ro(e, t, a)
        }, function(a) {
            return di(e, t, a)
        }) : ro(e, t, l)
    }
    function ro(e, t, l) {
        t.status = "fulfilled",
        t.value = l,
        so(t),
        e.state = l,
        t = e.pending,
        t !== null && (l = t.next,
        l === t ? e.pending = null : (l = l.next,
        t.next = l,
        co(e, l)))
    }
    function di(e, t, l) {
        var a = e.pending;
        if (e.pending = null,
        a !== null) {
            a = a.next;
            do
                t.status = "rejected",
                t.reason = l,
                so(t),
                t = t.next;
            while (t !== a)
        }
        e.action = null
    }
    function so(e) {
        e = e.listeners;
        for (var t = 0; t < e.length; t++)
            (0,
            e[t])()
    }
    function oo(e, t) {
        return t
    }
    function fo(e, t) {
        if (de) {
            var l = Ne.formState;
            if (l !== null) {
                e: {
                    var a = ne;
                    if (de) {
                        if (ze) {
                            t: {
                                for (var n = ze, u = jt; n.nodeType !== 8; ) {
                                    if (!u) {
                                        n = null;
                                        break t
                                    }
                                    if (n = Tt(n.nextSibling),
                                    n === null) {
                                        n = null;
                                        break t
                                    }
                                }
                                u = n.data,
                                n = u === "F!" || u === "F" ? n : null
                            }
                            if (n) {
                                ze = Tt(n.nextSibling),
                                a = n.data === "F!";
                                break e
                            }
                        }
                        ol(a)
                    }
                    a = !1
                }
                a && (t = l[0])
            }
        }
        return l = et(),
        l.memoizedState = l.baseState = t,
        a = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: oo,
            lastRenderedState: t
        },
        l.queue = a,
        l = Do.bind(null, ne, a),
        a.dispatch = l,
        a = fi(!1),
        u = xi.bind(null, ne, !1, a.queue),
        a = et(),
        n = {
            state: t,
            dispatch: null,
            action: e,
            pending: null
        },
        a.queue = n,
        l = B1.bind(null, ne, n, u, l),
        n.dispatch = l,
        a.memoizedState = e,
        [t, l, !1]
    }
    function ho(e) {
        var t = Ge();
        return mo(t, Se, e)
    }
    function mo(e, t, l) {
        if (t = si(e, t, oo)[0],
        e = yu(Kt)[0],
        typeof t == "object" && t !== null && typeof t.then == "function")
            try {
                var a = fn(t)
            } catch (c) {
                throw c === ya ? iu : c
            }
        else
            a = t;
        t = Ge();
        var n = t.queue
          , u = n.dispatch;
        return l !== t.memoizedState && (ne.flags |= 2048,
        Aa(9, {
            destroy: void 0
        }, w1.bind(null, n, l), null)),
        [a, u, e]
    }
    function w1(e, t) {
        e.action = t
    }
    function vo(e) {
        var t = Ge()
          , l = Se;
        if (l !== null)
            return mo(t, l, e);
        Ge(),
        t = t.memoizedState,
        l = Ge();
        var a = l.queue.dispatch;
        return l.memoizedState = e,
        [t, a, !1]
    }
    function Aa(e, t, l, a) {
        return e = {
            tag: e,
            create: l,
            deps: a,
            inst: t,
            next: null
        },
        t = ne.updateQueue,
        t === null && (t = vu(),
        ne.updateQueue = t),
        l = t.lastEffect,
        l === null ? t.lastEffect = e.next = e : (a = l.next,
        l.next = e,
        e.next = a,
        t.lastEffect = e),
        e
    }
    function go() {
        return Ge().memoizedState
    }
    function xu(e, t, l, a) {
        var n = et();
        ne.flags |= e,
        n.memoizedState = Aa(1 | t, {
            destroy: void 0
        }, l, a === void 0 ? null : a)
    }
    function pu(e, t, l, a) {
        var n = Ge();
        a = a === void 0 ? null : a;
        var u = n.memoizedState.inst;
        Se !== null && a !== null && ai(a, Se.memoizedState.deps) ? n.memoizedState = Aa(t, u, l, a) : (ne.flags |= e,
        n.memoizedState = Aa(1 | t, u, l, a))
    }
    function yo(e, t) {
        xu(8390656, 8, e, t)
    }
    function hi(e, t) {
        pu(2048, 8, e, t)
    }
    function H1(e) {
        ne.flags |= 4;
        var t = ne.updateQueue;
        if (t === null)
            t = vu(),
            ne.updateQueue = t,
            t.events = [e];
        else {
            var l = t.events;
            l === null ? t.events = [e] : l.push(e)
        }
    }
    function xo(e) {
        var t = Ge().memoizedState;
        return H1({
            ref: t,
            nextImpl: e
        }),
        function() {
            if ((xe & 2) !== 0)
                throw Error(o(440));
            return t.impl.apply(void 0, arguments)
        }
    }
    function po(e, t) {
        return pu(4, 2, e, t)
    }
    function bo(e, t) {
        return pu(4, 4, e, t)
    }
    function So(e, t) {
        if (typeof t == "function") {
            e = e();
            var l = t(e);
            return function() {
                typeof l == "function" ? l() : t(null)
            }
        }
        if (t != null)
            return e = e(),
            t.current = e,
            function() {
                t.current = null
            }
    }
    function Ao(e, t, l) {
        l = l != null ? l.concat([e]) : null,
        pu(4, 4, So.bind(null, t, e), l)
    }
    function mi() {}
    function Eo(e, t) {
        var l = Ge();
        t = t === void 0 ? null : t;
        var a = l.memoizedState;
        return t !== null && ai(t, a[1]) ? a[0] : (l.memoizedState = [e, t],
        e)
    }
    function jo(e, t) {
        var l = Ge();
        t = t === void 0 ? null : t;
        var a = l.memoizedState;
        if (t !== null && ai(t, a[1]))
            return a[0];
        if (a = e(),
        Xl) {
            ul(!0);
            try {
                e()
            } finally {
                ul(!1)
            }
        }
        return l.memoizedState = [a, t],
        a
    }
    function vi(e, t, l) {
        return l === void 0 || (Zt & 1073741824) !== 0 && (oe & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = l,
        e = Tf(),
        ne.lanes |= e,
        pl |= e,
        l)
    }
    function No(e, t, l, a) {
        return ft(l, t) ? l : pa.current !== null ? (e = vi(e, l, a),
        ft(e, t) || (qe = !0),
        e) : (Zt & 42) === 0 || (Zt & 1073741824) !== 0 && (oe & 261930) === 0 ? (qe = !0,
        e.memoizedState = l) : (e = Tf(),
        ne.lanes |= e,
        pl |= e,
        t)
    }
    function To(e, t, l, a, n) {
        var u = U.p;
        U.p = u !== 0 && 8 > u ? u : 8;
        var c = z.T
          , s = {};
        z.T = s,
        xi(e, !1, t, l);
        try {
            var d = n()
              , b = z.S;
            if (b !== null && b(s, d),
            d !== null && typeof d == "object" && typeof d.then == "function") {
                var M = D1(d, a);
                dn(e, t, M, yt(e))
            } else
                dn(e, t, a, yt(e))
        } catch (B) {
            dn(e, t, {
                then: function() {},
                status: "rejected",
                reason: B
            }, yt())
        } finally {
            U.p = u,
            c !== null && s.types !== null && (c.types = s.types),
            z.T = c
        }
    }
    function U1() {}
    function gi(e, t, l, a) {
        if (e.tag !== 5)
            throw Error(o(476));
        var n = zo(e).queue;
        To(e, n, t, K, l === null ? U1 : function() {
            return _o(e),
            l(a)
        }
        )
    }
    function zo(e) {
        var t = e.memoizedState;
        if (t !== null)
            return t;
        t = {
            memoizedState: K,
            baseState: K,
            baseQueue: null,
            queue: {
                pending: null,
                lanes: 0,
                dispatch: null,
                lastRenderedReducer: Kt,
                lastRenderedState: K
            },
            next: null
        };
        var l = {};
        return t.next = {
            memoizedState: l,
            baseState: l,
            baseQueue: null,
            queue: {
                pending: null,
                lanes: 0,
                dispatch: null,
                lastRenderedReducer: Kt,
                lastRenderedState: l
            },
            next: null
        },
        e.memoizedState = t,
        e = e.alternate,
        e !== null && (e.memoizedState = t),
        t
    }
    function _o(e) {
        var t = zo(e);
        t.next === null && (t = e.alternate.memoizedState),
        dn(e, t.next.queue, {}, yt())
    }
    function yi() {
        return We(Mn)
    }
    function Mo() {
        return Ge().memoizedState
    }
    function Co() {
        return Ge().memoizedState
    }
    function G1(e) {
        for (var t = e.return; t !== null; ) {
            switch (t.tag) {
            case 24:
            case 3:
                var l = yt();
                e = hl(l);
                var a = ml(t, e, l);
                a !== null && (it(a, t, l),
                cn(a, t, l)),
                t = {
                    cache: Zc()
                },
                e.payload = t;
                return
            }
            t = t.return
        }
    }
    function L1(e, t, l) {
        var a = yt();
        l = {
            lane: a,
            revertLane: 0,
            gesture: null,
            action: l,
            hasEagerState: !1,
            eagerState: null,
            next: null
        },
        bu(e) ? Oo(t, l) : (l = wc(e, t, l, a),
        l !== null && (it(l, e, a),
        Ro(l, t, a)))
    }
    function Do(e, t, l) {
        var a = yt();
        dn(e, t, l, a)
    }
    function dn(e, t, l, a) {
        var n = {
            lane: a,
            revertLane: 0,
            gesture: null,
            action: l,
            hasEagerState: !1,
            eagerState: null,
            next: null
        };
        if (bu(e))
            Oo(t, n);
        else {
            var u = e.alternate;
            if (e.lanes === 0 && (u === null || u.lanes === 0) && (u = t.lastRenderedReducer,
            u !== null))
                try {
                    var c = t.lastRenderedState
                      , s = u(c, l);
                    if (n.hasEagerState = !0,
                    n.eagerState = s,
                    ft(s, c))
                        return eu(e, t, n, 0),
                        Ne === null && Pn(),
                        !1
                } catch {}
            if (l = wc(e, t, n, a),
            l !== null)
                return it(l, e, a),
                Ro(l, t, a),
                !0
        }
        return !1
    }
    function xi(e, t, l, a) {
        if (a = {
            lane: 2,
            revertLane: Wi(),
            gesture: null,
            action: a,
            hasEagerState: !1,
            eagerState: null,
            next: null
        },
        bu(e)) {
            if (t)
                throw Error(o(479))
        } else
            t = wc(e, l, a, 2),
            t !== null && it(t, e, 2)
    }
    function bu(e) {
        var t = e.alternate;
        return e === ne || t !== null && t === ne
    }
    function Oo(e, t) {
        ba = hu = !0;
        var l = e.pending;
        l === null ? t.next = t : (t.next = l.next,
        l.next = t),
        e.pending = t
    }
    function Ro(e, t, l) {
        if ((l & 4194048) !== 0) {
            var a = t.lanes;
            a &= e.pendingLanes,
            l |= a,
            t.lanes = l,
            Ur(e, l)
        }
    }
    var hn = {
        readContext: We,
        use: gu,
        useCallback: Re,
        useContext: Re,
        useEffect: Re,
        useImperativeHandle: Re,
        useLayoutEffect: Re,
        useInsertionEffect: Re,
        useMemo: Re,
        useReducer: Re,
        useRef: Re,
        useState: Re,
        useDebugValue: Re,
        useDeferredValue: Re,
        useTransition: Re,
        useSyncExternalStore: Re,
        useId: Re,
        useHostTransitionStatus: Re,
        useFormState: Re,
        useActionState: Re,
        useOptimistic: Re,
        useMemoCache: Re,
        useCacheRefresh: Re
    };
    hn.useEffectEvent = Re;
    var Bo = {
        readContext: We,
        use: gu,
        useCallback: function(e, t) {
            return et().memoizedState = [e, t === void 0 ? null : t],
            e
        },
        useContext: We,
        useEffect: yo,
        useImperativeHandle: function(e, t, l) {
            l = l != null ? l.concat([e]) : null,
            xu(4194308, 4, So.bind(null, t, e), l)
        },
        useLayoutEffect: function(e, t) {
            return xu(4194308, 4, e, t)
        },
        useInsertionEffect: function(e, t) {
            xu(4, 2, e, t)
        },
        useMemo: function(e, t) {
            var l = et();
            t = t === void 0 ? null : t;
            var a = e();
            if (Xl) {
                ul(!0);
                try {
                    e()
                } finally {
                    ul(!1)
                }
            }
            return l.memoizedState = [a, t],
            a
        },
        useReducer: function(e, t, l) {
            var a = et();
            if (l !== void 0) {
                var n = l(t);
                if (Xl) {
                    ul(!0);
                    try {
                        l(t)
                    } finally {
                        ul(!1)
                    }
                }
            } else
                n = t;
            return a.memoizedState = a.baseState = n,
            e = {
                pending: null,
                lanes: 0,
                dispatch: null,
                lastRenderedReducer: e,
                lastRenderedState: n
            },
            a.queue = e,
            e = e.dispatch = L1.bind(null, ne, e),
            [a.memoizedState, e]
        },
        useRef: function(e) {
            var t = et();
            return e = {
                current: e
            },
            t.memoizedState = e
        },
        useState: function(e) {
            e = fi(e);
            var t = e.queue
              , l = Do.bind(null, ne, t);
            return t.dispatch = l,
            [e.memoizedState, l]
        },
        useDebugValue: mi,
        useDeferredValue: function(e, t) {
            var l = et();
            return vi(l, e, t)
        },
        useTransition: function() {
            var e = fi(!1);
            return e = To.bind(null, ne, e.queue, !0, !1),
            et().memoizedState = e,
            [!1, e]
        },
        useSyncExternalStore: function(e, t, l) {
            var a = ne
              , n = et();
            if (de) {
                if (l === void 0)
                    throw Error(o(407));
                l = l()
            } else {
                if (l = t(),
                Ne === null)
                    throw Error(o(349));
                (oe & 127) !== 0 || eo(a, t, l)
            }
            n.memoizedState = l;
            var u = {
                value: l,
                getSnapshot: t
            };
            return n.queue = u,
            yo(lo.bind(null, a, u, e), [e]),
            a.flags |= 2048,
            Aa(9, {
                destroy: void 0
            }, to.bind(null, a, u, l, t), null),
            l
        },
        useId: function() {
            var e = et()
              , t = Ne.identifierPrefix;
            if (de) {
                var l = Ht
                  , a = wt;
                l = (a & ~(1 << 32 - ot(a) - 1)).toString(32) + l,
                t = "_" + t + "R_" + l,
                l = mu++,
                0 < l && (t += "H" + l.toString(32)),
                t += "_"
            } else
                l = O1++,
                t = "_" + t + "r_" + l.toString(32) + "_";
            return e.memoizedState = t
        },
        useHostTransitionStatus: yi,
        useFormState: fo,
        useActionState: fo,
        useOptimistic: function(e) {
            var t = et();
            t.memoizedState = t.baseState = e;
            var l = {
                pending: null,
                lanes: 0,
                dispatch: null,
                lastRenderedReducer: null,
                lastRenderedState: null
            };
            return t.queue = l,
            t = xi.bind(null, ne, !0, l),
            l.dispatch = t,
            [e, t]
        },
        useMemoCache: ri,
        useCacheRefresh: function() {
            return et().memoizedState = G1.bind(null, ne)
        },
        useEffectEvent: function(e) {
            var t = et()
              , l = {
                impl: e
            };
            return t.memoizedState = l,
            function() {
                if ((xe & 2) !== 0)
                    throw Error(o(440));
                return l.impl.apply(void 0, arguments)
            }
        }
    }
      , pi = {
        readContext: We,
        use: gu,
        useCallback: Eo,
        useContext: We,
        useEffect: hi,
        useImperativeHandle: Ao,
        useInsertionEffect: po,
        useLayoutEffect: bo,
        useMemo: jo,
        useReducer: yu,
        useRef: go,
        useState: function() {
            return yu(Kt)
        },
        useDebugValue: mi,
        useDeferredValue: function(e, t) {
            var l = Ge();
            return No(l, Se.memoizedState, e, t)
        },
        useTransition: function() {
            var e = yu(Kt)[0]
              , t = Ge().memoizedState;
            return [typeof e == "boolean" ? e : fn(e), t]
        },
        useSyncExternalStore: Ps,
        useId: Mo,
        useHostTransitionStatus: yi,
        useFormState: ho,
        useActionState: ho,
        useOptimistic: function(e, t) {
            var l = Ge();
            return uo(l, Se, e, t)
        },
        useMemoCache: ri,
        useCacheRefresh: Co
    };
    pi.useEffectEvent = xo;
    var wo = {
        readContext: We,
        use: gu,
        useCallback: Eo,
        useContext: We,
        useEffect: hi,
        useImperativeHandle: Ao,
        useInsertionEffect: po,
        useLayoutEffect: bo,
        useMemo: jo,
        useReducer: oi,
        useRef: go,
        useState: function() {
            return oi(Kt)
        },
        useDebugValue: mi,
        useDeferredValue: function(e, t) {
            var l = Ge();
            return Se === null ? vi(l, e, t) : No(l, Se.memoizedState, e, t)
        },
        useTransition: function() {
            var e = oi(Kt)[0]
              , t = Ge().memoizedState;
            return [typeof e == "boolean" ? e : fn(e), t]
        },
        useSyncExternalStore: Ps,
        useId: Mo,
        useHostTransitionStatus: yi,
        useFormState: vo,
        useActionState: vo,
        useOptimistic: function(e, t) {
            var l = Ge();
            return Se !== null ? uo(l, Se, e, t) : (l.baseState = e,
            [e, l.queue.dispatch])
        },
        useMemoCache: ri,
        useCacheRefresh: Co
    };
    wo.useEffectEvent = xo;
    function bi(e, t, l, a) {
        t = e.memoizedState,
        l = l(a, t),
        l = l == null ? t : C({}, t, l),
        e.memoizedState = l,
        e.lanes === 0 && (e.updateQueue.baseState = l)
    }
    var Si = {
        enqueueSetState: function(e, t, l) {
            e = e._reactInternals;
            var a = yt()
              , n = hl(a);
            n.payload = t,
            l != null && (n.callback = l),
            t = ml(e, n, a),
            t !== null && (it(t, e, a),
            cn(t, e, a))
        },
        enqueueReplaceState: function(e, t, l) {
            e = e._reactInternals;
            var a = yt()
              , n = hl(a);
            n.tag = 1,
            n.payload = t,
            l != null && (n.callback = l),
            t = ml(e, n, a),
            t !== null && (it(t, e, a),
            cn(t, e, a))
        },
        enqueueForceUpdate: function(e, t) {
            e = e._reactInternals;
            var l = yt()
              , a = hl(l);
            a.tag = 2,
            t != null && (a.callback = t),
            t = ml(e, a, l),
            t !== null && (it(t, e, l),
            cn(t, e, l))
        }
    };
    function Ho(e, t, l, a, n, u, c) {
        return e = e.stateNode,
        typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(a, u, c) : t.prototype && t.prototype.isPureReactComponent ? !Ia(l, a) || !Ia(n, u) : !0
    }
    function Uo(e, t, l, a) {
        e = t.state,
        typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(l, a),
        typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(l, a),
        t.state !== e && Si.enqueueReplaceState(t, t.state, null)
    }
    function Zl(e, t) {
        var l = t;
        if ("ref"in t) {
            l = {};
            for (var a in t)
                a !== "ref" && (l[a] = t[a])
        }
        if (e = e.defaultProps) {
            l === t && (l = C({}, l));
            for (var n in e)
                l[n] === void 0 && (l[n] = e[n])
        }
        return l
    }
    function Go(e) {
        In(e)
    }
    function Lo(e) {
        console.error(e)
    }
    function Yo(e) {
        In(e)
    }
    function Su(e, t) {
        try {
            var l = e.onUncaughtError;
            l(t.value, {
                componentStack: t.stack
            })
        } catch (a) {
            setTimeout(function() {
                throw a
            })
        }
    }
    function qo(e, t, l) {
        try {
            var a = e.onCaughtError;
            a(l.value, {
                componentStack: l.stack,
                errorBoundary: t.tag === 1 ? t.stateNode : null
            })
        } catch (n) {
            setTimeout(function() {
                throw n
            })
        }
    }
    function Ai(e, t, l) {
        return l = hl(l),
        l.tag = 3,
        l.payload = {
            element: null
        },
        l.callback = function() {
            Su(e, t)
        }
        ,
        l
    }
    function ko(e) {
        return e = hl(e),
        e.tag = 3,
        e
    }
    function Vo(e, t, l, a) {
        var n = l.type.getDerivedStateFromError;
        if (typeof n == "function") {
            var u = a.value;
            e.payload = function() {
                return n(u)
            }
            ,
            e.callback = function() {
                qo(t, l, a)
            }
        }
        var c = l.stateNode;
        c !== null && typeof c.componentDidCatch == "function" && (e.callback = function() {
            qo(t, l, a),
            typeof n != "function" && (bl === null ? bl = new Set([this]) : bl.add(this));
            var s = a.stack;
            this.componentDidCatch(a.value, {
                componentStack: s !== null ? s : ""
            })
        }
        )
    }
    function Y1(e, t, l, a, n) {
        if (l.flags |= 32768,
        a !== null && typeof a == "object" && typeof a.then == "function") {
            if (t = l.alternate,
            t !== null && ma(t, l, n, !0),
            l = ht.current,
            l !== null) {
                switch (l.tag) {
                case 31:
                case 13:
                    return Nt === null ? Ru() : l.alternate === null && Be === 0 && (Be = 3),
                    l.flags &= -257,
                    l.flags |= 65536,
                    l.lanes = n,
                    a === ru ? l.flags |= 16384 : (t = l.updateQueue,
                    t === null ? l.updateQueue = new Set([a]) : t.add(a),
                    Ki(e, a, n)),
                    !1;
                case 22:
                    return l.flags |= 65536,
                    a === ru ? l.flags |= 16384 : (t = l.updateQueue,
                    t === null ? (t = {
                        transitions: null,
                        markerInstances: null,
                        retryQueue: new Set([a])
                    },
                    l.updateQueue = t) : (l = t.retryQueue,
                    l === null ? t.retryQueue = new Set([a]) : l.add(a)),
                    Ki(e, a, n)),
                    !1
                }
                throw Error(o(435, l.tag))
            }
            return Ki(e, a, n),
            Ru(),
            !1
        }
        if (de)
            return t = ht.current,
            t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256),
            t.flags |= 65536,
            t.lanes = n,
            a !== qc && (e = Error(o(422), {
                cause: a
            }),
            tn(St(e, l)))) : (a !== qc && (t = Error(o(423), {
                cause: a
            }),
            tn(St(t, l))),
            e = e.current.alternate,
            e.flags |= 65536,
            n &= -n,
            e.lanes |= n,
            a = St(a, l),
            n = Ai(e.stateNode, a, n),
            Ic(e, n),
            Be !== 4 && (Be = 2)),
            !1;
        var u = Error(o(520), {
            cause: a
        });
        if (u = St(u, l),
        Sn === null ? Sn = [u] : Sn.push(u),
        Be !== 4 && (Be = 2),
        t === null)
            return !0;
        a = St(a, l),
        l = t;
        do {
            switch (l.tag) {
            case 3:
                return l.flags |= 65536,
                e = n & -n,
                l.lanes |= e,
                e = Ai(l.stateNode, a, e),
                Ic(l, e),
                !1;
            case 1:
                if (t = l.type,
                u = l.stateNode,
                (l.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || u !== null && typeof u.componentDidCatch == "function" && (bl === null || !bl.has(u))))
                    return l.flags |= 65536,
                    n &= -n,
                    l.lanes |= n,
                    n = ko(n),
                    Vo(n, e, l, a),
                    Ic(l, n),
                    !1
            }
            l = l.return
        } while (l !== null);
        return !1
    }
    var Ei = Error(o(461))
      , qe = !1;
    function Fe(e, t, l, a) {
        t.child = e === null ? Zs(t, null, l, a) : Ql(t, e.child, l, a)
    }
    function Qo(e, t, l, a, n) {
        l = l.render;
        var u = t.ref;
        if ("ref"in a) {
            var c = {};
            for (var s in a)
                s !== "ref" && (c[s] = a[s])
        } else
            c = a;
        return Yl(t),
        a = ni(e, t, l, c, u, n),
        s = ui(),
        e !== null && !qe ? (ci(e, t, n),
        Jt(e, t, n)) : (de && s && Lc(t),
        t.flags |= 1,
        Fe(e, t, a, n),
        t.child)
    }
    function Xo(e, t, l, a, n) {
        if (e === null) {
            var u = l.type;
            return typeof u == "function" && !Hc(u) && u.defaultProps === void 0 && l.compare === null ? (t.tag = 15,
            t.type = u,
            Zo(e, t, u, a, n)) : (e = lu(l.type, null, a, t, t.mode, n),
            e.ref = t.ref,
            e.return = t,
            t.child = e)
        }
        if (u = e.child,
        !Di(e, n)) {
            var c = u.memoizedProps;
            if (l = l.compare,
            l = l !== null ? l : Ia,
            l(c, a) && e.ref === t.ref)
                return Jt(e, t, n)
        }
        return t.flags |= 1,
        e = kt(u, a),
        e.ref = t.ref,
        e.return = t,
        t.child = e
    }
    function Zo(e, t, l, a, n) {
        if (e !== null) {
            var u = e.memoizedProps;
            if (Ia(u, a) && e.ref === t.ref)
                if (qe = !1,
                t.pendingProps = a = u,
                Di(e, n))
                    (e.flags & 131072) !== 0 && (qe = !0);
                else
                    return t.lanes = e.lanes,
                    Jt(e, t, n)
        }
        return ji(e, t, l, a, n)
    }
    function Ko(e, t, l, a) {
        var n = a.children
          , u = e !== null ? e.memoizedState : null;
        if (e === null && t.stateNode === null && (t.stateNode = {
            _visibility: 1,
            _pendingMarkers: null,
            _retryCache: null,
            _transitions: null
        }),
        a.mode === "hidden") {
            if ((t.flags & 128) !== 0) {
                if (u = u !== null ? u.baseLanes | l : l,
                e !== null) {
                    for (a = t.child = e.child,
                    n = 0; a !== null; )
                        n = n | a.lanes | a.childLanes,
                        a = a.sibling;
                    a = n & ~u
                } else
                    a = 0,
                    t.child = null;
                return Jo(e, t, u, l, a)
            }
            if ((l & 536870912) !== 0)
                t.memoizedState = {
                    baseLanes: 0,
                    cachePool: null
                },
                e !== null && cu(t, u !== null ? u.cachePool : null),
                u !== null ? $s(t, u) : ei(),
                Ws(t);
            else
                return a = t.lanes = 536870912,
                Jo(e, t, u !== null ? u.baseLanes | l : l, l, a)
        } else
            u !== null ? (cu(t, u.cachePool),
            $s(t, u),
            gl(),
            t.memoizedState = null) : (e !== null && cu(t, null),
            ei(),
            gl());
        return Fe(e, t, n, l),
        t.child
    }
    function mn(e, t) {
        return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
            _visibility: 1,
            _pendingMarkers: null,
            _retryCache: null,
            _transitions: null
        }),
        t.sibling
    }
    function Jo(e, t, l, a, n) {
        var u = Jc();
        return u = u === null ? null : {
            parent: Le._currentValue,
            pool: u
        },
        t.memoizedState = {
            baseLanes: l,
            cachePool: u
        },
        e !== null && cu(t, null),
        ei(),
        Ws(t),
        e !== null && ma(e, t, a, !0),
        t.childLanes = n,
        null
    }
    function Au(e, t) {
        return t = ju({
            mode: t.mode,
            children: t.children
        }, e.mode),
        t.ref = e.ref,
        e.child = t,
        t.return = e,
        t
    }
    function $o(e, t, l) {
        return Ql(t, e.child, null, l),
        e = Au(t, t.pendingProps),
        e.flags |= 2,
        mt(t),
        t.memoizedState = null,
        e
    }
    function q1(e, t, l) {
        var a = t.pendingProps
          , n = (t.flags & 128) !== 0;
        if (t.flags &= -129,
        e === null) {
            if (de) {
                if (a.mode === "hidden")
                    return e = Au(t, a),
                    t.lanes = 536870912,
                    mn(null, e);
                if (li(t),
                (e = ze) ? (e = rd(e, jt),
                e = e !== null && e.data === "&" ? e : null,
                e !== null && (t.memoizedState = {
                    dehydrated: e,
                    treeContext: rl !== null ? {
                        id: wt,
                        overflow: Ht
                    } : null,
                    retryLane: 536870912,
                    hydrationErrors: null
                },
                l = Ds(e),
                l.return = t,
                t.child = l,
                $e = t,
                ze = null)) : e = null,
                e === null)
                    throw ol(t);
                return t.lanes = 536870912,
                null
            }
            return Au(t, a)
        }
        var u = e.memoizedState;
        if (u !== null) {
            var c = u.dehydrated;
            if (li(t),
            n)
                if (t.flags & 256)
                    t.flags &= -257,
                    t = $o(e, t, l);
                else if (t.memoizedState !== null)
                    t.child = e.child,
                    t.flags |= 128,
                    t = null;
                else
                    throw Error(o(558));
            else if (qe || ma(e, t, l, !1),
            n = (l & e.childLanes) !== 0,
            qe || n) {
                if (a = Ne,
                a !== null && (c = Gr(a, l),
                c !== 0 && c !== u.retryLane))
                    throw u.retryLane = c,
                    Hl(e, c),
                    it(a, e, c),
                    Ei;
                Ru(),
                t = $o(e, t, l)
            } else
                e = u.treeContext,
                ze = Tt(c.nextSibling),
                $e = t,
                de = !0,
                sl = null,
                jt = !1,
                e !== null && Bs(t, e),
                t = Au(t, a),
                t.flags |= 4096;
            return t
        }
        return e = kt(e.child, {
            mode: a.mode,
            children: a.children
        }),
        e.ref = t.ref,
        t.child = e,
        e.return = t,
        e
    }
    function Eu(e, t) {
        var l = t.ref;
        if (l === null)
            e !== null && e.ref !== null && (t.flags |= 4194816);
        else {
            if (typeof l != "function" && typeof l != "object")
                throw Error(o(284));
            (e === null || e.ref !== l) && (t.flags |= 4194816)
        }
    }
    function ji(e, t, l, a, n) {
        return Yl(t),
        l = ni(e, t, l, a, void 0, n),
        a = ui(),
        e !== null && !qe ? (ci(e, t, n),
        Jt(e, t, n)) : (de && a && Lc(t),
        t.flags |= 1,
        Fe(e, t, l, n),
        t.child)
    }
    function Wo(e, t, l, a, n, u) {
        return Yl(t),
        t.updateQueue = null,
        l = Is(t, a, l, n),
        Fs(e),
        a = ui(),
        e !== null && !qe ? (ci(e, t, u),
        Jt(e, t, u)) : (de && a && Lc(t),
        t.flags |= 1,
        Fe(e, t, l, u),
        t.child)
    }
    function Fo(e, t, l, a, n) {
        if (Yl(t),
        t.stateNode === null) {
            var u = oa
              , c = l.contextType;
            typeof c == "object" && c !== null && (u = We(c)),
            u = new l(a,u),
            t.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null,
            u.updater = Si,
            t.stateNode = u,
            u._reactInternals = t,
            u = t.stateNode,
            u.props = a,
            u.state = t.memoizedState,
            u.refs = {},
            Wc(t),
            c = l.contextType,
            u.context = typeof c == "object" && c !== null ? We(c) : oa,
            u.state = t.memoizedState,
            c = l.getDerivedStateFromProps,
            typeof c == "function" && (bi(t, l, c, a),
            u.state = t.memoizedState),
            typeof l.getDerivedStateFromProps == "function" || typeof u.getSnapshotBeforeUpdate == "function" || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (c = u.state,
            typeof u.componentWillMount == "function" && u.componentWillMount(),
            typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount(),
            c !== u.state && Si.enqueueReplaceState(u, u.state, null),
            sn(t, a, u, n),
            rn(),
            u.state = t.memoizedState),
            typeof u.componentDidMount == "function" && (t.flags |= 4194308),
            a = !0
        } else if (e === null) {
            u = t.stateNode;
            var s = t.memoizedProps
              , d = Zl(l, s);
            u.props = d;
            var b = u.context
              , M = l.contextType;
            c = oa,
            typeof M == "object" && M !== null && (c = We(M));
            var B = l.getDerivedStateFromProps;
            M = typeof B == "function" || typeof u.getSnapshotBeforeUpdate == "function",
            s = t.pendingProps !== s,
            M || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (s || b !== c) && Uo(t, u, a, c),
            dl = !1;
            var S = t.memoizedState;
            u.state = S,
            sn(t, a, u, n),
            rn(),
            b = t.memoizedState,
            s || S !== b || dl ? (typeof B == "function" && (bi(t, l, B, a),
            b = t.memoizedState),
            (d = dl || Ho(t, l, d, a, S, b, c)) ? (M || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (typeof u.componentWillMount == "function" && u.componentWillMount(),
            typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()),
            typeof u.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof u.componentDidMount == "function" && (t.flags |= 4194308),
            t.memoizedProps = a,
            t.memoizedState = b),
            u.props = a,
            u.state = b,
            u.context = c,
            a = d) : (typeof u.componentDidMount == "function" && (t.flags |= 4194308),
            a = !1)
        } else {
            u = t.stateNode,
            Fc(e, t),
            c = t.memoizedProps,
            M = Zl(l, c),
            u.props = M,
            B = t.pendingProps,
            S = u.context,
            b = l.contextType,
            d = oa,
            typeof b == "object" && b !== null && (d = We(b)),
            s = l.getDerivedStateFromProps,
            (b = typeof s == "function" || typeof u.getSnapshotBeforeUpdate == "function") || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (c !== B || S !== d) && Uo(t, u, a, d),
            dl = !1,
            S = t.memoizedState,
            u.state = S,
            sn(t, a, u, n),
            rn();
            var N = t.memoizedState;
            c !== B || S !== N || dl || e !== null && e.dependencies !== null && nu(e.dependencies) ? (typeof s == "function" && (bi(t, l, s, a),
            N = t.memoizedState),
            (M = dl || Ho(t, l, M, a, S, N, d) || e !== null && e.dependencies !== null && nu(e.dependencies)) ? (b || typeof u.UNSAFE_componentWillUpdate != "function" && typeof u.componentWillUpdate != "function" || (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(a, N, d),
            typeof u.UNSAFE_componentWillUpdate == "function" && u.UNSAFE_componentWillUpdate(a, N, d)),
            typeof u.componentDidUpdate == "function" && (t.flags |= 4),
            typeof u.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof u.componentDidUpdate != "function" || c === e.memoizedProps && S === e.memoizedState || (t.flags |= 4),
            typeof u.getSnapshotBeforeUpdate != "function" || c === e.memoizedProps && S === e.memoizedState || (t.flags |= 1024),
            t.memoizedProps = a,
            t.memoizedState = N),
            u.props = a,
            u.state = N,
            u.context = d,
            a = M) : (typeof u.componentDidUpdate != "function" || c === e.memoizedProps && S === e.memoizedState || (t.flags |= 4),
            typeof u.getSnapshotBeforeUpdate != "function" || c === e.memoizedProps && S === e.memoizedState || (t.flags |= 1024),
            a = !1)
        }
        return u = a,
        Eu(e, t),
        a = (t.flags & 128) !== 0,
        u || a ? (u = t.stateNode,
        l = a && typeof l.getDerivedStateFromError != "function" ? null : u.render(),
        t.flags |= 1,
        e !== null && a ? (t.child = Ql(t, e.child, null, n),
        t.child = Ql(t, null, l, n)) : Fe(e, t, l, n),
        t.memoizedState = u.state,
        e = t.child) : e = Jt(e, t, n),
        e
    }
    function Io(e, t, l, a) {
        return Gl(),
        t.flags |= 256,
        Fe(e, t, l, a),
        t.child
    }
    var Ni = {
        dehydrated: null,
        treeContext: null,
        retryLane: 0,
        hydrationErrors: null
    };
    function Ti(e) {
        return {
            baseLanes: e,
            cachePool: Ys()
        }
    }
    function zi(e, t, l) {
        return e = e !== null ? e.childLanes & ~l : 0,
        t && (e |= gt),
        e
    }
    function Po(e, t, l) {
        var a = t.pendingProps, n = !1, u = (t.flags & 128) !== 0, c;
        if ((c = u) || (c = e !== null && e.memoizedState === null ? !1 : (Ue.current & 2) !== 0),
        c && (n = !0,
        t.flags &= -129),
        c = (t.flags & 32) !== 0,
        t.flags &= -33,
        e === null) {
            if (de) {
                if (n ? vl(t) : gl(),
                (e = ze) ? (e = rd(e, jt),
                e = e !== null && e.data !== "&" ? e : null,
                e !== null && (t.memoizedState = {
                    dehydrated: e,
                    treeContext: rl !== null ? {
                        id: wt,
                        overflow: Ht
                    } : null,
                    retryLane: 536870912,
                    hydrationErrors: null
                },
                l = Ds(e),
                l.return = t,
                t.child = l,
                $e = t,
                ze = null)) : e = null,
                e === null)
                    throw ol(t);
                return sr(e) ? t.lanes = 32 : t.lanes = 536870912,
                null
            }
            var s = a.children;
            return a = a.fallback,
            n ? (gl(),
            n = t.mode,
            s = ju({
                mode: "hidden",
                children: s
            }, n),
            a = Ul(a, n, l, null),
            s.return = t,
            a.return = t,
            s.sibling = a,
            t.child = s,
            a = t.child,
            a.memoizedState = Ti(l),
            a.childLanes = zi(e, c, l),
            t.memoizedState = Ni,
            mn(null, a)) : (vl(t),
            _i(t, s))
        }
        var d = e.memoizedState;
        if (d !== null && (s = d.dehydrated,
        s !== null)) {
            if (u)
                t.flags & 256 ? (vl(t),
                t.flags &= -257,
                t = Mi(e, t, l)) : t.memoizedState !== null ? (gl(),
                t.child = e.child,
                t.flags |= 128,
                t = null) : (gl(),
                s = a.fallback,
                n = t.mode,
                a = ju({
                    mode: "visible",
                    children: a.children
                }, n),
                s = Ul(s, n, l, null),
                s.flags |= 2,
                a.return = t,
                s.return = t,
                a.sibling = s,
                t.child = a,
                Ql(t, e.child, null, l),
                a = t.child,
                a.memoizedState = Ti(l),
                a.childLanes = zi(e, c, l),
                t.memoizedState = Ni,
                t = mn(null, a));
            else if (vl(t),
            sr(s)) {
                if (c = s.nextSibling && s.nextSibling.dataset,
                c)
                    var b = c.dgst;
                c = b,
                a = Error(o(419)),
                a.stack = "",
                a.digest = c,
                tn({
                    value: a,
                    source: null,
                    stack: null
                }),
                t = Mi(e, t, l)
            } else if (qe || ma(e, t, l, !1),
            c = (l & e.childLanes) !== 0,
            qe || c) {
                if (c = Ne,
                c !== null && (a = Gr(c, l),
                a !== 0 && a !== d.retryLane))
                    throw d.retryLane = a,
                    Hl(e, a),
                    it(c, e, a),
                    Ei;
                rr(s) || Ru(),
                t = Mi(e, t, l)
            } else
                rr(s) ? (t.flags |= 192,
                t.child = e.child,
                t = null) : (e = d.treeContext,
                ze = Tt(s.nextSibling),
                $e = t,
                de = !0,
                sl = null,
                jt = !1,
                e !== null && Bs(t, e),
                t = _i(t, a.children),
                t.flags |= 4096);
            return t
        }
        return n ? (gl(),
        s = a.fallback,
        n = t.mode,
        d = e.child,
        b = d.sibling,
        a = kt(d, {
            mode: "hidden",
            children: a.children
        }),
        a.subtreeFlags = d.subtreeFlags & 65011712,
        b !== null ? s = kt(b, s) : (s = Ul(s, n, l, null),
        s.flags |= 2),
        s.return = t,
        a.return = t,
        a.sibling = s,
        t.child = a,
        mn(null, a),
        a = t.child,
        s = e.child.memoizedState,
        s === null ? s = Ti(l) : (n = s.cachePool,
        n !== null ? (d = Le._currentValue,
        n = n.parent !== d ? {
            parent: d,
            pool: d
        } : n) : n = Ys(),
        s = {
            baseLanes: s.baseLanes | l,
            cachePool: n
        }),
        a.memoizedState = s,
        a.childLanes = zi(e, c, l),
        t.memoizedState = Ni,
        mn(e.child, a)) : (vl(t),
        l = e.child,
        e = l.sibling,
        l = kt(l, {
            mode: "visible",
            children: a.children
        }),
        l.return = t,
        l.sibling = null,
        e !== null && (c = t.deletions,
        c === null ? (t.deletions = [e],
        t.flags |= 16) : c.push(e)),
        t.child = l,
        t.memoizedState = null,
        l)
    }
    function _i(e, t) {
        return t = ju({
            mode: "visible",
            children: t
        }, e.mode),
        t.return = e,
        e.child = t
    }
    function ju(e, t) {
        return e = dt(22, e, null, t),
        e.lanes = 0,
        e
    }
    function Mi(e, t, l) {
        return Ql(t, e.child, null, l),
        e = _i(t, t.pendingProps.children),
        e.flags |= 2,
        t.memoizedState = null,
        e
    }
    function ef(e, t, l) {
        e.lanes |= t;
        var a = e.alternate;
        a !== null && (a.lanes |= t),
        Qc(e.return, t, l)
    }
    function Ci(e, t, l, a, n, u) {
        var c = e.memoizedState;
        c === null ? e.memoizedState = {
            isBackwards: t,
            rendering: null,
            renderingStartTime: 0,
            last: a,
            tail: l,
            tailMode: n,
            treeForkCount: u
        } : (c.isBackwards = t,
        c.rendering = null,
        c.renderingStartTime = 0,
        c.last = a,
        c.tail = l,
        c.tailMode = n,
        c.treeForkCount = u)
    }
    function tf(e, t, l) {
        var a = t.pendingProps
          , n = a.revealOrder
          , u = a.tail;
        a = a.children;
        var c = Ue.current
          , s = (c & 2) !== 0;
        if (s ? (c = c & 1 | 2,
        t.flags |= 128) : c &= 1,
        L(Ue, c),
        Fe(e, t, a, l),
        a = de ? en : 0,
        !s && e !== null && (e.flags & 128) !== 0)
            e: for (e = t.child; e !== null; ) {
                if (e.tag === 13)
                    e.memoizedState !== null && ef(e, l, t);
                else if (e.tag === 19)
                    ef(e, l, t);
                else if (e.child !== null) {
                    e.child.return = e,
                    e = e.child;
                    continue
                }
                if (e === t)
                    break e;
                for (; e.sibling === null; ) {
                    if (e.return === null || e.return === t)
                        break e;
                    e = e.return
                }
                e.sibling.return = e.return,
                e = e.sibling
            }
        switch (n) {
        case "forwards":
            for (l = t.child,
            n = null; l !== null; )
                e = l.alternate,
                e !== null && du(e) === null && (n = l),
                l = l.sibling;
            l = n,
            l === null ? (n = t.child,
            t.child = null) : (n = l.sibling,
            l.sibling = null),
            Ci(t, !1, n, l, u, a);
            break;
        case "backwards":
        case "unstable_legacy-backwards":
            for (l = null,
            n = t.child,
            t.child = null; n !== null; ) {
                if (e = n.alternate,
                e !== null && du(e) === null) {
                    t.child = n;
                    break
                }
                e = n.sibling,
                n.sibling = l,
                l = n,
                n = e
            }
            Ci(t, !0, l, null, u, a);
            break;
        case "together":
            Ci(t, !1, null, null, void 0, a);
            break;
        default:
            t.memoizedState = null
        }
        return t.child
    }
    function Jt(e, t, l) {
        if (e !== null && (t.dependencies = e.dependencies),
        pl |= t.lanes,
        (l & t.childLanes) === 0)
            if (e !== null) {
                if (ma(e, t, l, !1),
                (l & t.childLanes) === 0)
                    return null
            } else
                return null;
        if (e !== null && t.child !== e.child)
            throw Error(o(153));
        if (t.child !== null) {
            for (e = t.child,
            l = kt(e, e.pendingProps),
            t.child = l,
            l.return = t; e.sibling !== null; )
                e = e.sibling,
                l = l.sibling = kt(e, e.pendingProps),
                l.return = t;
            l.sibling = null
        }
        return t.child
    }
    function Di(e, t) {
        return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies,
        !!(e !== null && nu(e)))
    }
    function k1(e, t, l) {
        switch (t.tag) {
        case 3:
            Xe(t, t.stateNode.containerInfo),
            fl(t, Le, e.memoizedState.cache),
            Gl();
            break;
        case 27:
        case 5:
            Bt(t);
            break;
        case 4:
            Xe(t, t.stateNode.containerInfo);
            break;
        case 10:
            fl(t, t.type, t.memoizedProps.value);
            break;
        case 31:
            if (t.memoizedState !== null)
                return t.flags |= 128,
                li(t),
                null;
            break;
        case 13:
            var a = t.memoizedState;
            if (a !== null)
                return a.dehydrated !== null ? (vl(t),
                t.flags |= 128,
                null) : (l & t.child.childLanes) !== 0 ? Po(e, t, l) : (vl(t),
                e = Jt(e, t, l),
                e !== null ? e.sibling : null);
            vl(t);
            break;
        case 19:
            var n = (e.flags & 128) !== 0;
            if (a = (l & t.childLanes) !== 0,
            a || (ma(e, t, l, !1),
            a = (l & t.childLanes) !== 0),
            n) {
                if (a)
                    return tf(e, t, l);
                t.flags |= 128
            }
            if (n = t.memoizedState,
            n !== null && (n.rendering = null,
            n.tail = null,
            n.lastEffect = null),
            L(Ue, Ue.current),
            a)
                break;
            return null;
        case 22:
            return t.lanes = 0,
            Ko(e, t, l, t.pendingProps);
        case 24:
            fl(t, Le, e.memoizedState.cache)
        }
        return Jt(e, t, l)
    }
    function lf(e, t, l) {
        if (e !== null)
            if (e.memoizedProps !== t.pendingProps)
                qe = !0;
            else {
                if (!Di(e, l) && (t.flags & 128) === 0)
                    return qe = !1,
                    k1(e, t, l);
                qe = (e.flags & 131072) !== 0
            }
        else
            qe = !1,
            de && (t.flags & 1048576) !== 0 && Rs(t, en, t.index);
        switch (t.lanes = 0,
        t.tag) {
        case 16:
            e: {
                var a = t.pendingProps;
                if (e = kl(t.elementType),
                t.type = e,
                typeof e == "function")
                    Hc(e) ? (a = Zl(e, a),
                    t.tag = 1,
                    t = Fo(null, t, e, a, l)) : (t.tag = 0,
                    t = ji(null, t, e, a, l));
                else {
                    if (e != null) {
                        var n = e.$$typeof;
                        if (n === ce) {
                            t.tag = 11,
                            t = Qo(null, t, e, a, l);
                            break e
                        } else if (n === I) {
                            t.tag = 14,
                            t = Xo(null, t, e, a, l);
                            break e
                        }
                    }
                    throw t = k(e) || e,
                    Error(o(306, t, ""))
                }
            }
            return t;
        case 0:
            return ji(e, t, t.type, t.pendingProps, l);
        case 1:
            return a = t.type,
            n = Zl(a, t.pendingProps),
            Fo(e, t, a, n, l);
        case 3:
            e: {
                if (Xe(t, t.stateNode.containerInfo),
                e === null)
                    throw Error(o(387));
                a = t.pendingProps;
                var u = t.memoizedState;
                n = u.element,
                Fc(e, t),
                sn(t, a, null, l);
                var c = t.memoizedState;
                if (a = c.cache,
                fl(t, Le, a),
                a !== u.cache && Xc(t, [Le], l, !0),
                rn(),
                a = c.element,
                u.isDehydrated)
                    if (u = {
                        element: a,
                        isDehydrated: !1,
                        cache: c.cache
                    },
                    t.updateQueue.baseState = u,
                    t.memoizedState = u,
                    t.flags & 256) {
                        t = Io(e, t, a, l);
                        break e
                    } else if (a !== n) {
                        n = St(Error(o(424)), t),
                        tn(n),
                        t = Io(e, t, a, l);
                        break e
                    } else
                        for (e = t.stateNode.containerInfo,
                        e.nodeType === 9 ? e = e.body : e = e.nodeName === "HTML" ? e.ownerDocument.body : e,
                        ze = Tt(e.firstChild),
                        $e = t,
                        de = !0,
                        sl = null,
                        jt = !0,
                        l = Zs(t, null, a, l),
                        t.child = l; l; )
                            l.flags = l.flags & -3 | 4096,
                            l = l.sibling;
                else {
                    if (Gl(),
                    a === n) {
                        t = Jt(e, t, l);
                        break e
                    }
                    Fe(e, t, a, l)
                }
                t = t.child
            }
            return t;
        case 26:
            return Eu(e, t),
            e === null ? (l = md(t.type, null, t.pendingProps, null)) ? t.memoizedState = l : de || (l = t.type,
            e = t.pendingProps,
            a = Yu(te.current).createElement(l),
            a[Je] = t,
            a[tt] = e,
            Ie(a, l, e),
            Ze(a),
            t.stateNode = a) : t.memoizedState = md(t.type, e.memoizedProps, t.pendingProps, e.memoizedState),
            null;
        case 27:
            return Bt(t),
            e === null && de && (a = t.stateNode = fd(t.type, t.pendingProps, te.current),
            $e = t,
            jt = !0,
            n = ze,
            jl(t.type) ? (or = n,
            ze = Tt(a.firstChild)) : ze = n),
            Fe(e, t, t.pendingProps.children, l),
            Eu(e, t),
            e === null && (t.flags |= 4194304),
            t.child;
        case 5:
            return e === null && de && ((n = a = ze) && (a = xh(a, t.type, t.pendingProps, jt),
            a !== null ? (t.stateNode = a,
            $e = t,
            ze = Tt(a.firstChild),
            jt = !1,
            n = !0) : n = !1),
            n || ol(t)),
            Bt(t),
            n = t.type,
            u = t.pendingProps,
            c = e !== null ? e.memoizedProps : null,
            a = u.children,
            ur(n, u) ? a = null : c !== null && ur(n, c) && (t.flags |= 32),
            t.memoizedState !== null && (n = ni(e, t, R1, null, null, l),
            Mn._currentValue = n),
            Eu(e, t),
            Fe(e, t, a, l),
            t.child;
        case 6:
            return e === null && de && ((e = l = ze) && (l = ph(l, t.pendingProps, jt),
            l !== null ? (t.stateNode = l,
            $e = t,
            ze = null,
            e = !0) : e = !1),
            e || ol(t)),
            null;
        case 13:
            return Po(e, t, l);
        case 4:
            return Xe(t, t.stateNode.containerInfo),
            a = t.pendingProps,
            e === null ? t.child = Ql(t, null, a, l) : Fe(e, t, a, l),
            t.child;
        case 11:
            return Qo(e, t, t.type, t.pendingProps, l);
        case 7:
            return Fe(e, t, t.pendingProps, l),
            t.child;
        case 8:
            return Fe(e, t, t.pendingProps.children, l),
            t.child;
        case 12:
            return Fe(e, t, t.pendingProps.children, l),
            t.child;
        case 10:
            return a = t.pendingProps,
            fl(t, t.type, a.value),
            Fe(e, t, a.children, l),
            t.child;
        case 9:
            return n = t.type._context,
            a = t.pendingProps.children,
            Yl(t),
            n = We(n),
            a = a(n),
            t.flags |= 1,
            Fe(e, t, a, l),
            t.child;
        case 14:
            return Xo(e, t, t.type, t.pendingProps, l);
        case 15:
            return Zo(e, t, t.type, t.pendingProps, l);
        case 19:
            return tf(e, t, l);
        case 31:
            return q1(e, t, l);
        case 22:
            return Ko(e, t, l, t.pendingProps);
        case 24:
            return Yl(t),
            a = We(Le),
            e === null ? (n = Jc(),
            n === null && (n = Ne,
            u = Zc(),
            n.pooledCache = u,
            u.refCount++,
            u !== null && (n.pooledCacheLanes |= l),
            n = u),
            t.memoizedState = {
                parent: a,
                cache: n
            },
            Wc(t),
            fl(t, Le, n)) : ((e.lanes & l) !== 0 && (Fc(e, t),
            sn(t, null, null, l),
            rn()),
            n = e.memoizedState,
            u = t.memoizedState,
            n.parent !== a ? (n = {
                parent: a,
                cache: a
            },
            t.memoizedState = n,
            t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = n),
            fl(t, Le, a)) : (a = u.cache,
            fl(t, Le, a),
            a !== n.cache && Xc(t, [Le], l, !0))),
            Fe(e, t, t.pendingProps.children, l),
            t.child;
        case 29:
            throw t.pendingProps
        }
        throw Error(o(156, t.tag))
    }
    function $t(e) {
        e.flags |= 4
    }
    function Oi(e, t, l, a, n) {
        if ((t = (e.mode & 32) !== 0) && (t = !1),
        t) {
            if (e.flags |= 16777216,
            (n & 335544128) === n)
                if (e.stateNode.complete)
                    e.flags |= 8192;
                else if (Cf())
                    e.flags |= 8192;
                else
                    throw Vl = ru,
                    $c
        } else
            e.flags &= -16777217
    }
    function af(e, t) {
        if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
            e.flags &= -16777217;
        else if (e.flags |= 16777216,
        !pd(t))
            if (Cf())
                e.flags |= 8192;
            else
                throw Vl = ru,
                $c
    }
    function Nu(e, t) {
        t !== null && (e.flags |= 4),
        e.flags & 16384 && (t = e.tag !== 22 ? wr() : 536870912,
        e.lanes |= t,
        Ta |= t)
    }
    function vn(e, t) {
        if (!de)
            switch (e.tailMode) {
            case "hidden":
                t = e.tail;
                for (var l = null; t !== null; )
                    t.alternate !== null && (l = t),
                    t = t.sibling;
                l === null ? e.tail = null : l.sibling = null;
                break;
            case "collapsed":
                l = e.tail;
                for (var a = null; l !== null; )
                    l.alternate !== null && (a = l),
                    l = l.sibling;
                a === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : a.sibling = null
            }
    }
    function _e(e) {
        var t = e.alternate !== null && e.alternate.child === e.child
          , l = 0
          , a = 0;
        if (t)
            for (var n = e.child; n !== null; )
                l |= n.lanes | n.childLanes,
                a |= n.subtreeFlags & 65011712,
                a |= n.flags & 65011712,
                n.return = e,
                n = n.sibling;
        else
            for (n = e.child; n !== null; )
                l |= n.lanes | n.childLanes,
                a |= n.subtreeFlags,
                a |= n.flags,
                n.return = e,
                n = n.sibling;
        return e.subtreeFlags |= a,
        e.childLanes = l,
        t
    }
    function V1(e, t, l) {
        var a = t.pendingProps;
        switch (Yc(t),
        t.tag) {
        case 16:
        case 15:
        case 0:
        case 11:
        case 7:
        case 8:
        case 12:
        case 9:
        case 14:
            return _e(t),
            null;
        case 1:
            return _e(t),
            null;
        case 3:
            return l = t.stateNode,
            a = null,
            e !== null && (a = e.memoizedState.cache),
            t.memoizedState.cache !== a && (t.flags |= 2048),
            Xt(Le),
            De(),
            l.pendingContext && (l.context = l.pendingContext,
            l.pendingContext = null),
            (e === null || e.child === null) && (ha(t) ? $t(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024,
            kc())),
            _e(t),
            null;
        case 26:
            var n = t.type
              , u = t.memoizedState;
            return e === null ? ($t(t),
            u !== null ? (_e(t),
            af(t, u)) : (_e(t),
            Oi(t, n, null, a, l))) : u ? u !== e.memoizedState ? ($t(t),
            _e(t),
            af(t, u)) : (_e(t),
            t.flags &= -16777217) : (e = e.memoizedProps,
            e !== a && $t(t),
            _e(t),
            Oi(t, n, e, a, l)),
            null;
        case 27:
            if (Wl(t),
            l = te.current,
            n = t.type,
            e !== null && t.stateNode != null)
                e.memoizedProps !== a && $t(t);
            else {
                if (!a) {
                    if (t.stateNode === null)
                        throw Error(o(166));
                    return _e(t),
                    null
                }
                e = Y.current,
                ha(t) ? ws(t) : (e = fd(n, a, l),
                t.stateNode = e,
                $t(t))
            }
            return _e(t),
            null;
        case 5:
            if (Wl(t),
            n = t.type,
            e !== null && t.stateNode != null)
                e.memoizedProps !== a && $t(t);
            else {
                if (!a) {
                    if (t.stateNode === null)
                        throw Error(o(166));
                    return _e(t),
                    null
                }
                if (u = Y.current,
                ha(t))
                    ws(t);
                else {
                    var c = Yu(te.current);
                    switch (u) {
                    case 1:
                        u = c.createElementNS("http://www.w3.org/2000/svg", n);
                        break;
                    case 2:
                        u = c.createElementNS("http://www.w3.org/1998/Math/MathML", n);
                        break;
                    default:
                        switch (n) {
                        case "svg":
                            u = c.createElementNS("http://www.w3.org/2000/svg", n);
                            break;
                        case "math":
                            u = c.createElementNS("http://www.w3.org/1998/Math/MathML", n);
                            break;
                        case "script":
                            u = c.createElement("div"),
                            u.innerHTML = "<script><\/script>",
                            u = u.removeChild(u.firstChild);
                            break;
                        case "select":
                            u = typeof a.is == "string" ? c.createElement("select", {
                                is: a.is
                            }) : c.createElement("select"),
                            a.multiple ? u.multiple = !0 : a.size && (u.size = a.size);
                            break;
                        default:
                            u = typeof a.is == "string" ? c.createElement(n, {
                                is: a.is
                            }) : c.createElement(n)
                        }
                    }
                    u[Je] = t,
                    u[tt] = a;
                    e: for (c = t.child; c !== null; ) {
                        if (c.tag === 5 || c.tag === 6)
                            u.appendChild(c.stateNode);
                        else if (c.tag !== 4 && c.tag !== 27 && c.child !== null) {
                            c.child.return = c,
                            c = c.child;
                            continue
                        }
                        if (c === t)
                            break e;
                        for (; c.sibling === null; ) {
                            if (c.return === null || c.return === t)
                                break e;
                            c = c.return
                        }
                        c.sibling.return = c.return,
                        c = c.sibling
                    }
                    t.stateNode = u;
                    e: switch (Ie(u, n, a),
                    n) {
                    case "button":
                    case "input":
                    case "select":
                    case "textarea":
                        a = !!a.autoFocus;
                        break e;
                    case "img":
                        a = !0;
                        break e;
                    default:
                        a = !1
                    }
                    a && $t(t)
                }
            }
            return _e(t),
            Oi(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, l),
            null;
        case 6:
            if (e && t.stateNode != null)
                e.memoizedProps !== a && $t(t);
            else {
                if (typeof a != "string" && t.stateNode === null)
                    throw Error(o(166));
                if (e = te.current,
                ha(t)) {
                    if (e = t.stateNode,
                    l = t.memoizedProps,
                    a = null,
                    n = $e,
                    n !== null)
                        switch (n.tag) {
                        case 27:
                        case 5:
                            a = n.memoizedProps
                        }
                    e[Je] = t,
                    e = !!(e.nodeValue === l || a !== null && a.suppressHydrationWarning === !0 || ed(e.nodeValue, l)),
                    e || ol(t, !0)
                } else
                    e = Yu(e).createTextNode(a),
                    e[Je] = t,
                    t.stateNode = e
            }
            return _e(t),
            null;
        case 31:
            if (l = t.memoizedState,
            e === null || e.memoizedState !== null) {
                if (a = ha(t),
                l !== null) {
                    if (e === null) {
                        if (!a)
                            throw Error(o(318));
                        if (e = t.memoizedState,
                        e = e !== null ? e.dehydrated : null,
                        !e)
                            throw Error(o(557));
                        e[Je] = t
                    } else
                        Gl(),
                        (t.flags & 128) === 0 && (t.memoizedState = null),
                        t.flags |= 4;
                    _e(t),
                    e = !1
                } else
                    l = kc(),
                    e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = l),
                    e = !0;
                if (!e)
                    return t.flags & 256 ? (mt(t),
                    t) : (mt(t),
                    null);
                if ((t.flags & 128) !== 0)
                    throw Error(o(558))
            }
            return _e(t),
            null;
        case 13:
            if (a = t.memoizedState,
            e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
                if (n = ha(t),
                a !== null && a.dehydrated !== null) {
                    if (e === null) {
                        if (!n)
                            throw Error(o(318));
                        if (n = t.memoizedState,
                        n = n !== null ? n.dehydrated : null,
                        !n)
                            throw Error(o(317));
                        n[Je] = t
                    } else
                        Gl(),
                        (t.flags & 128) === 0 && (t.memoizedState = null),
                        t.flags |= 4;
                    _e(t),
                    n = !1
                } else
                    n = kc(),
                    e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n),
                    n = !0;
                if (!n)
                    return t.flags & 256 ? (mt(t),
                    t) : (mt(t),
                    null)
            }
            return mt(t),
            (t.flags & 128) !== 0 ? (t.lanes = l,
            t) : (l = a !== null,
            e = e !== null && e.memoizedState !== null,
            l && (a = t.child,
            n = null,
            a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (n = a.alternate.memoizedState.cachePool.pool),
            u = null,
            a.memoizedState !== null && a.memoizedState.cachePool !== null && (u = a.memoizedState.cachePool.pool),
            u !== n && (a.flags |= 2048)),
            l !== e && l && (t.child.flags |= 8192),
            Nu(t, t.updateQueue),
            _e(t),
            null);
        case 4:
            return De(),
            e === null && er(t.stateNode.containerInfo),
            _e(t),
            null;
        case 10:
            return Xt(t.type),
            _e(t),
            null;
        case 19:
            if (O(Ue),
            a = t.memoizedState,
            a === null)
                return _e(t),
                null;
            if (n = (t.flags & 128) !== 0,
            u = a.rendering,
            u === null)
                if (n)
                    vn(a, !1);
                else {
                    if (Be !== 0 || e !== null && (e.flags & 128) !== 0)
                        for (e = t.child; e !== null; ) {
                            if (u = du(e),
                            u !== null) {
                                for (t.flags |= 128,
                                vn(a, !1),
                                e = u.updateQueue,
                                t.updateQueue = e,
                                Nu(t, e),
                                t.subtreeFlags = 0,
                                e = l,
                                l = t.child; l !== null; )
                                    Cs(l, e),
                                    l = l.sibling;
                                return L(Ue, Ue.current & 1 | 2),
                                de && Vt(t, a.treeForkCount),
                                t.child
                            }
                            e = e.sibling
                        }
                    a.tail !== null && rt() > Cu && (t.flags |= 128,
                    n = !0,
                    vn(a, !1),
                    t.lanes = 4194304)
                }
            else {
                if (!n)
                    if (e = du(u),
                    e !== null) {
                        if (t.flags |= 128,
                        n = !0,
                        e = e.updateQueue,
                        t.updateQueue = e,
                        Nu(t, e),
                        vn(a, !0),
                        a.tail === null && a.tailMode === "hidden" && !u.alternate && !de)
                            return _e(t),
                            null
                    } else
                        2 * rt() - a.renderingStartTime > Cu && l !== 536870912 && (t.flags |= 128,
                        n = !0,
                        vn(a, !1),
                        t.lanes = 4194304);
                a.isBackwards ? (u.sibling = t.child,
                t.child = u) : (e = a.last,
                e !== null ? e.sibling = u : t.child = u,
                a.last = u)
            }
            return a.tail !== null ? (e = a.tail,
            a.rendering = e,
            a.tail = e.sibling,
            a.renderingStartTime = rt(),
            e.sibling = null,
            l = Ue.current,
            L(Ue, n ? l & 1 | 2 : l & 1),
            de && Vt(t, a.treeForkCount),
            e) : (_e(t),
            null);
        case 22:
        case 23:
            return mt(t),
            ti(),
            a = t.memoizedState !== null,
            e !== null ? e.memoizedState !== null !== a && (t.flags |= 8192) : a && (t.flags |= 8192),
            a ? (l & 536870912) !== 0 && (t.flags & 128) === 0 && (_e(t),
            t.subtreeFlags & 6 && (t.flags |= 8192)) : _e(t),
            l = t.updateQueue,
            l !== null && Nu(t, l.retryQueue),
            l = null,
            e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (l = e.memoizedState.cachePool.pool),
            a = null,
            t.memoizedState !== null && t.memoizedState.cachePool !== null && (a = t.memoizedState.cachePool.pool),
            a !== l && (t.flags |= 2048),
            e !== null && O(ql),
            null;
        case 24:
            return l = null,
            e !== null && (l = e.memoizedState.cache),
            t.memoizedState.cache !== l && (t.flags |= 2048),
            Xt(Le),
            _e(t),
            null;
        case 25:
            return null;
        case 30:
            return null
        }
        throw Error(o(156, t.tag))
    }
    function Q1(e, t) {
        switch (Yc(t),
        t.tag) {
        case 1:
            return e = t.flags,
            e & 65536 ? (t.flags = e & -65537 | 128,
            t) : null;
        case 3:
            return Xt(Le),
            De(),
            e = t.flags,
            (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128,
            t) : null;
        case 26:
        case 27:
        case 5:
            return Wl(t),
            null;
        case 31:
            if (t.memoizedState !== null) {
                if (mt(t),
                t.alternate === null)
                    throw Error(o(340));
                Gl()
            }
            return e = t.flags,
            e & 65536 ? (t.flags = e & -65537 | 128,
            t) : null;
        case 13:
            if (mt(t),
            e = t.memoizedState,
            e !== null && e.dehydrated !== null) {
                if (t.alternate === null)
                    throw Error(o(340));
                Gl()
            }
            return e = t.flags,
            e & 65536 ? (t.flags = e & -65537 | 128,
            t) : null;
        case 19:
            return O(Ue),
            null;
        case 4:
            return De(),
            null;
        case 10:
            return Xt(t.type),
            null;
        case 22:
        case 23:
            return mt(t),
            ti(),
            e !== null && O(ql),
            e = t.flags,
            e & 65536 ? (t.flags = e & -65537 | 128,
            t) : null;
        case 24:
            return Xt(Le),
            null;
        case 25:
            return null;
        default:
            return null
        }
    }
    function nf(e, t) {
        switch (Yc(t),
        t.tag) {
        case 3:
            Xt(Le),
            De();
            break;
        case 26:
        case 27:
        case 5:
            Wl(t);
            break;
        case 4:
            De();
            break;
        case 31:
            t.memoizedState !== null && mt(t);
            break;
        case 13:
            mt(t);
            break;
        case 19:
            O(Ue);
            break;
        case 10:
            Xt(t.type);
            break;
        case 22:
        case 23:
            mt(t),
            ti(),
            e !== null && O(ql);
            break;
        case 24:
            Xt(Le)
        }
    }
    function gn(e, t) {
        try {
            var l = t.updateQueue
              , a = l !== null ? l.lastEffect : null;
            if (a !== null) {
                var n = a.next;
                l = n;
                do {
                    if ((l.tag & e) === e) {
                        a = void 0;
                        var u = l.create
                          , c = l.inst;
                        a = u(),
                        c.destroy = a
                    }
                    l = l.next
                } while (l !== n)
            }
        } catch (s) {
            be(t, t.return, s)
        }
    }
    function yl(e, t, l) {
        try {
            var a = t.updateQueue
              , n = a !== null ? a.lastEffect : null;
            if (n !== null) {
                var u = n.next;
                a = u;
                do {
                    if ((a.tag & e) === e) {
                        var c = a.inst
                          , s = c.destroy;
                        if (s !== void 0) {
                            c.destroy = void 0,
                            n = t;
                            var d = l
                              , b = s;
                            try {
                                b()
                            } catch (M) {
                                be(n, d, M)
                            }
                        }
                    }
                    a = a.next
                } while (a !== u)
            }
        } catch (M) {
            be(t, t.return, M)
        }
    }
    function uf(e) {
        var t = e.updateQueue;
        if (t !== null) {
            var l = e.stateNode;
            try {
                Js(t, l)
            } catch (a) {
                be(e, e.return, a)
            }
        }
    }
    function cf(e, t, l) {
        l.props = Zl(e.type, e.memoizedProps),
        l.state = e.memoizedState;
        try {
            l.componentWillUnmount()
        } catch (a) {
            be(e, t, a)
        }
    }
    function yn(e, t) {
        try {
            var l = e.ref;
            if (l !== null) {
                switch (e.tag) {
                case 26:
                case 27:
                case 5:
                    var a = e.stateNode;
                    break;
                case 30:
                    a = e.stateNode;
                    break;
                default:
                    a = e.stateNode
                }
                typeof l == "function" ? e.refCleanup = l(a) : l.current = a
            }
        } catch (n) {
            be(e, t, n)
        }
    }
    function Ut(e, t) {
        var l = e.ref
          , a = e.refCleanup;
        if (l !== null)
            if (typeof a == "function")
                try {
                    a()
                } catch (n) {
                    be(e, t, n)
                } finally {
                    e.refCleanup = null,
                    e = e.alternate,
                    e != null && (e.refCleanup = null)
                }
            else if (typeof l == "function")
                try {
                    l(null)
                } catch (n) {
                    be(e, t, n)
                }
            else
                l.current = null
    }
    function rf(e) {
        var t = e.type
          , l = e.memoizedProps
          , a = e.stateNode;
        try {
            e: switch (t) {
            case "button":
            case "input":
            case "select":
            case "textarea":
                l.autoFocus && a.focus();
                break e;
            case "img":
                l.src ? a.src = l.src : l.srcSet && (a.srcset = l.srcSet)
            }
        } catch (n) {
            be(e, e.return, n)
        }
    }
    function Ri(e, t, l) {
        try {
            var a = e.stateNode;
            dh(a, e.type, l, t),
            a[tt] = t
        } catch (n) {
            be(e, e.return, n)
        }
    }
    function sf(e) {
        return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && jl(e.type) || e.tag === 4
    }
    function Bi(e) {
        e: for (; ; ) {
            for (; e.sibling === null; ) {
                if (e.return === null || sf(e.return))
                    return null;
                e = e.return
            }
            for (e.sibling.return = e.return,
            e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
                if (e.tag === 27 && jl(e.type) || e.flags & 2 || e.child === null || e.tag === 4)
                    continue e;
                e.child.return = e,
                e = e.child
            }
            if (!(e.flags & 2))
                return e.stateNode
        }
    }
    function wi(e, t, l) {
        var a = e.tag;
        if (a === 5 || a === 6)
            e = e.stateNode,
            t ? (l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l).insertBefore(e, t) : (t = l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l,
            t.appendChild(e),
            l = l._reactRootContainer,
            l != null || t.onclick !== null || (t.onclick = Yt));
        else if (a !== 4 && (a === 27 && jl(e.type) && (l = e.stateNode,
        t = null),
        e = e.child,
        e !== null))
            for (wi(e, t, l),
            e = e.sibling; e !== null; )
                wi(e, t, l),
                e = e.sibling
    }
    function Tu(e, t, l) {
        var a = e.tag;
        if (a === 5 || a === 6)
            e = e.stateNode,
            t ? l.insertBefore(e, t) : l.appendChild(e);
        else if (a !== 4 && (a === 27 && jl(e.type) && (l = e.stateNode),
        e = e.child,
        e !== null))
            for (Tu(e, t, l),
            e = e.sibling; e !== null; )
                Tu(e, t, l),
                e = e.sibling
    }
    function of(e) {
        var t = e.stateNode
          , l = e.memoizedProps;
        try {
            for (var a = e.type, n = t.attributes; n.length; )
                t.removeAttributeNode(n[0]);
            Ie(t, a, l),
            t[Je] = e,
            t[tt] = l
        } catch (u) {
            be(e, e.return, u)
        }
    }
    var Wt = !1
      , ke = !1
      , Hi = !1
      , ff = typeof WeakSet == "function" ? WeakSet : Set
      , Ke = null;
    function X1(e, t) {
        if (e = e.containerInfo,
        ar = Ku,
        e = Ss(e),
        Mc(e)) {
            if ("selectionStart"in e)
                var l = {
                    start: e.selectionStart,
                    end: e.selectionEnd
                };
            else
                e: {
                    l = (l = e.ownerDocument) && l.defaultView || window;
                    var a = l.getSelection && l.getSelection();
                    if (a && a.rangeCount !== 0) {
                        l = a.anchorNode;
                        var n = a.anchorOffset
                          , u = a.focusNode;
                        a = a.focusOffset;
                        try {
                            l.nodeType,
                            u.nodeType
                        } catch {
                            l = null;
                            break e
                        }
                        var c = 0
                          , s = -1
                          , d = -1
                          , b = 0
                          , M = 0
                          , B = e
                          , S = null;
                        t: for (; ; ) {
                            for (var N; B !== l || n !== 0 && B.nodeType !== 3 || (s = c + n),
                            B !== u || a !== 0 && B.nodeType !== 3 || (d = c + a),
                            B.nodeType === 3 && (c += B.nodeValue.length),
                            (N = B.firstChild) !== null; )
                                S = B,
                                B = N;
                            for (; ; ) {
                                if (B === e)
                                    break t;
                                if (S === l && ++b === n && (s = c),
                                S === u && ++M === a && (d = c),
                                (N = B.nextSibling) !== null)
                                    break;
                                B = S,
                                S = B.parentNode
                            }
                            B = N
                        }
                        l = s === -1 || d === -1 ? null : {
                            start: s,
                            end: d
                        }
                    } else
                        l = null
                }
            l = l || {
                start: 0,
                end: 0
            }
        } else
            l = null;
        for (nr = {
            focusedElem: e,
            selectionRange: l
        },
        Ku = !1,
        Ke = t; Ke !== null; )
            if (t = Ke,
            e = t.child,
            (t.subtreeFlags & 1028) !== 0 && e !== null)
                e.return = t,
                Ke = e;
            else
                for (; Ke !== null; ) {
                    switch (t = Ke,
                    u = t.alternate,
                    e = t.flags,
                    t.tag) {
                    case 0:
                        if ((e & 4) !== 0 && (e = t.updateQueue,
                        e = e !== null ? e.events : null,
                        e !== null))
                            for (l = 0; l < e.length; l++)
                                n = e[l],
                                n.ref.impl = n.nextImpl;
                        break;
                    case 11:
                    case 15:
                        break;
                    case 1:
                        if ((e & 1024) !== 0 && u !== null) {
                            e = void 0,
                            l = t,
                            n = u.memoizedProps,
                            u = u.memoizedState,
                            a = l.stateNode;
                            try {
                                var X = Zl(l.type, n);
                                e = a.getSnapshotBeforeUpdate(X, u),
                                a.__reactInternalSnapshotBeforeUpdate = e
                            } catch (F) {
                                be(l, l.return, F)
                            }
                        }
                        break;
                    case 3:
                        if ((e & 1024) !== 0) {
                            if (e = t.stateNode.containerInfo,
                            l = e.nodeType,
                            l === 9)
                                ir(e);
                            else if (l === 1)
                                switch (e.nodeName) {
                                case "HEAD":
                                case "HTML":
                                case "BODY":
                                    ir(e);
                                    break;
                                default:
                                    e.textContent = ""
                                }
                        }
                        break;
                    case 5:
                    case 26:
                    case 27:
                    case 6:
                    case 4:
                    case 17:
                        break;
                    default:
                        if ((e & 1024) !== 0)
                            throw Error(o(163))
                    }
                    if (e = t.sibling,
                    e !== null) {
                        e.return = t.return,
                        Ke = e;
                        break
                    }
                    Ke = t.return
                }
    }
    function df(e, t, l) {
        var a = l.flags;
        switch (l.tag) {
        case 0:
        case 11:
        case 15:
            It(e, l),
            a & 4 && gn(5, l);
            break;
        case 1:
            if (It(e, l),
            a & 4)
                if (e = l.stateNode,
                t === null)
                    try {
                        e.componentDidMount()
                    } catch (c) {
                        be(l, l.return, c)
                    }
                else {
                    var n = Zl(l.type, t.memoizedProps);
                    t = t.memoizedState;
                    try {
                        e.componentDidUpdate(n, t, e.__reactInternalSnapshotBeforeUpdate)
                    } catch (c) {
                        be(l, l.return, c)
                    }
                }
            a & 64 && uf(l),
            a & 512 && yn(l, l.return);
            break;
        case 3:
            if (It(e, l),
            a & 64 && (e = l.updateQueue,
            e !== null)) {
                if (t = null,
                l.child !== null)
                    switch (l.child.tag) {
                    case 27:
                    case 5:
                        t = l.child.stateNode;
                        break;
                    case 1:
                        t = l.child.stateNode
                    }
                try {
                    Js(e, t)
                } catch (c) {
                    be(l, l.return, c)
                }
            }
            break;
        case 27:
            t === null && a & 4 && of(l);
        case 26:
        case 5:
            It(e, l),
            t === null && a & 4 && rf(l),
            a & 512 && yn(l, l.return);
            break;
        case 12:
            It(e, l);
            break;
        case 31:
            It(e, l),
            a & 4 && vf(e, l);
            break;
        case 13:
            It(e, l),
            a & 4 && gf(e, l),
            a & 64 && (e = l.memoizedState,
            e !== null && (e = e.dehydrated,
            e !== null && (l = eh.bind(null, l),
            bh(e, l))));
            break;
        case 22:
            if (a = l.memoizedState !== null || Wt,
            !a) {
                t = t !== null && t.memoizedState !== null || ke,
                n = Wt;
                var u = ke;
                Wt = a,
                (ke = t) && !u ? Pt(e, l, (l.subtreeFlags & 8772) !== 0) : It(e, l),
                Wt = n,
                ke = u
            }
            break;
        case 30:
            break;
        default:
            It(e, l)
        }
    }
    function hf(e) {
        var t = e.alternate;
        t !== null && (e.alternate = null,
        hf(t)),
        e.child = null,
        e.deletions = null,
        e.sibling = null,
        e.tag === 5 && (t = e.stateNode,
        t !== null && dc(t)),
        e.stateNode = null,
        e.return = null,
        e.dependencies = null,
        e.memoizedProps = null,
        e.memoizedState = null,
        e.pendingProps = null,
        e.stateNode = null,
        e.updateQueue = null
    }
    var Oe = null
      , at = !1;
    function Ft(e, t, l) {
        for (l = l.child; l !== null; )
            mf(e, t, l),
            l = l.sibling
    }
    function mf(e, t, l) {
        if (st && typeof st.onCommitFiberUnmount == "function")
            try {
                st.onCommitFiberUnmount(Ya, l)
            } catch {}
        switch (l.tag) {
        case 26:
            ke || Ut(l, t),
            Ft(e, t, l),
            l.memoizedState ? l.memoizedState.count-- : l.stateNode && (l = l.stateNode,
            l.parentNode.removeChild(l));
            break;
        case 27:
            ke || Ut(l, t);
            var a = Oe
              , n = at;
            jl(l.type) && (Oe = l.stateNode,
            at = !1),
            Ft(e, t, l),
            Tn(l.stateNode),
            Oe = a,
            at = n;
            break;
        case 5:
            ke || Ut(l, t);
        case 6:
            if (a = Oe,
            n = at,
            Oe = null,
            Ft(e, t, l),
            Oe = a,
            at = n,
            Oe !== null)
                if (at)
                    try {
                        (Oe.nodeType === 9 ? Oe.body : Oe.nodeName === "HTML" ? Oe.ownerDocument.body : Oe).removeChild(l.stateNode)
                    } catch (u) {
                        be(l, t, u)
                    }
                else
                    try {
                        Oe.removeChild(l.stateNode)
                    } catch (u) {
                        be(l, t, u)
                    }
            break;
        case 18:
            Oe !== null && (at ? (e = Oe,
            cd(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, l.stateNode),
            Ba(e)) : cd(Oe, l.stateNode));
            break;
        case 4:
            a = Oe,
            n = at,
            Oe = l.stateNode.containerInfo,
            at = !0,
            Ft(e, t, l),
            Oe = a,
            at = n;
            break;
        case 0:
        case 11:
        case 14:
        case 15:
            yl(2, l, t),
            ke || yl(4, l, t),
            Ft(e, t, l);
            break;
        case 1:
            ke || (Ut(l, t),
            a = l.stateNode,
            typeof a.componentWillUnmount == "function" && cf(l, t, a)),
            Ft(e, t, l);
            break;
        case 21:
            Ft(e, t, l);
            break;
        case 22:
            ke = (a = ke) || l.memoizedState !== null,
            Ft(e, t, l),
            ke = a;
            break;
        default:
            Ft(e, t, l)
        }
    }
    function vf(e, t) {
        if (t.memoizedState === null && (e = t.alternate,
        e !== null && (e = e.memoizedState,
        e !== null))) {
            e = e.dehydrated;
            try {
                Ba(e)
            } catch (l) {
                be(t, t.return, l)
            }
        }
    }
    function gf(e, t) {
        if (t.memoizedState === null && (e = t.alternate,
        e !== null && (e = e.memoizedState,
        e !== null && (e = e.dehydrated,
        e !== null))))
            try {
                Ba(e)
            } catch (l) {
                be(t, t.return, l)
            }
    }
    function Z1(e) {
        switch (e.tag) {
        case 31:
        case 13:
        case 19:
            var t = e.stateNode;
            return t === null && (t = e.stateNode = new ff),
            t;
        case 22:
            return e = e.stateNode,
            t = e._retryCache,
            t === null && (t = e._retryCache = new ff),
            t;
        default:
            throw Error(o(435, e.tag))
        }
    }
    function zu(e, t) {
        var l = Z1(e);
        t.forEach(function(a) {
            if (!l.has(a)) {
                l.add(a);
                var n = th.bind(null, e, a);
                a.then(n, n)
            }
        })
    }
    function nt(e, t) {
        var l = t.deletions;
        if (l !== null)
            for (var a = 0; a < l.length; a++) {
                var n = l[a]
                  , u = e
                  , c = t
                  , s = c;
                e: for (; s !== null; ) {
                    switch (s.tag) {
                    case 27:
                        if (jl(s.type)) {
                            Oe = s.stateNode,
                            at = !1;
                            break e
                        }
                        break;
                    case 5:
                        Oe = s.stateNode,
                        at = !1;
                        break e;
                    case 3:
                    case 4:
                        Oe = s.stateNode.containerInfo,
                        at = !0;
                        break e
                    }
                    s = s.return
                }
                if (Oe === null)
                    throw Error(o(160));
                mf(u, c, n),
                Oe = null,
                at = !1,
                u = n.alternate,
                u !== null && (u.return = null),
                n.return = null
            }
        if (t.subtreeFlags & 13886)
            for (t = t.child; t !== null; )
                yf(t, e),
                t = t.sibling
    }
    var Dt = null;
    function yf(e, t) {
        var l = e.alternate
          , a = e.flags;
        switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
            nt(t, e),
            ut(e),
            a & 4 && (yl(3, e, e.return),
            gn(3, e),
            yl(5, e, e.return));
            break;
        case 1:
            nt(t, e),
            ut(e),
            a & 512 && (ke || l === null || Ut(l, l.return)),
            a & 64 && Wt && (e = e.updateQueue,
            e !== null && (a = e.callbacks,
            a !== null && (l = e.shared.hiddenCallbacks,
            e.shared.hiddenCallbacks = l === null ? a : l.concat(a))));
            break;
        case 26:
            var n = Dt;
            if (nt(t, e),
            ut(e),
            a & 512 && (ke || l === null || Ut(l, l.return)),
            a & 4) {
                var u = l !== null ? l.memoizedState : null;
                if (a = e.memoizedState,
                l === null)
                    if (a === null)
                        if (e.stateNode === null) {
                            e: {
                                a = e.type,
                                l = e.memoizedProps,
                                n = n.ownerDocument || n;
                                t: switch (a) {
                                case "title":
                                    u = n.getElementsByTagName("title")[0],
                                    (!u || u[Va] || u[Je] || u.namespaceURI === "http://www.w3.org/2000/svg" || u.hasAttribute("itemprop")) && (u = n.createElement(a),
                                    n.head.insertBefore(u, n.querySelector("head > title"))),
                                    Ie(u, a, l),
                                    u[Je] = e,
                                    Ze(u),
                                    a = u;
                                    break e;
                                case "link":
                                    var c = yd("link", "href", n).get(a + (l.href || ""));
                                    if (c) {
                                        for (var s = 0; s < c.length; s++)
                                            if (u = c[s],
                                            u.getAttribute("href") === (l.href == null || l.href === "" ? null : l.href) && u.getAttribute("rel") === (l.rel == null ? null : l.rel) && u.getAttribute("title") === (l.title == null ? null : l.title) && u.getAttribute("crossorigin") === (l.crossOrigin == null ? null : l.crossOrigin)) {
                                                c.splice(s, 1);
                                                break t
                                            }
                                    }
                                    u = n.createElement(a),
                                    Ie(u, a, l),
                                    n.head.appendChild(u);
                                    break;
                                case "meta":
                                    if (c = yd("meta", "content", n).get(a + (l.content || ""))) {
                                        for (s = 0; s < c.length; s++)
                                            if (u = c[s],
                                            u.getAttribute("content") === (l.content == null ? null : "" + l.content) && u.getAttribute("name") === (l.name == null ? null : l.name) && u.getAttribute("property") === (l.property == null ? null : l.property) && u.getAttribute("http-equiv") === (l.httpEquiv == null ? null : l.httpEquiv) && u.getAttribute("charset") === (l.charSet == null ? null : l.charSet)) {
                                                c.splice(s, 1);
                                                break t
                                            }
                                    }
                                    u = n.createElement(a),
                                    Ie(u, a, l),
                                    n.head.appendChild(u);
                                    break;
                                default:
                                    throw Error(o(468, a))
                                }
                                u[Je] = e,
                                Ze(u),
                                a = u
                            }
                            e.stateNode = a
                        } else
                            xd(n, e.type, e.stateNode);
                    else
                        e.stateNode = gd(n, a, e.memoizedProps);
                else
                    u !== a ? (u === null ? l.stateNode !== null && (l = l.stateNode,
                    l.parentNode.removeChild(l)) : u.count--,
                    a === null ? xd(n, e.type, e.stateNode) : gd(n, a, e.memoizedProps)) : a === null && e.stateNode !== null && Ri(e, e.memoizedProps, l.memoizedProps)
            }
            break;
        case 27:
            nt(t, e),
            ut(e),
            a & 512 && (ke || l === null || Ut(l, l.return)),
            l !== null && a & 4 && Ri(e, e.memoizedProps, l.memoizedProps);
            break;
        case 5:
            if (nt(t, e),
            ut(e),
            a & 512 && (ke || l === null || Ut(l, l.return)),
            e.flags & 32) {
                n = e.stateNode;
                try {
                    aa(n, "")
                } catch (X) {
                    be(e, e.return, X)
                }
            }
            a & 4 && e.stateNode != null && (n = e.memoizedProps,
            Ri(e, n, l !== null ? l.memoizedProps : n)),
            a & 1024 && (Hi = !0);
            break;
        case 6:
            if (nt(t, e),
            ut(e),
            a & 4) {
                if (e.stateNode === null)
                    throw Error(o(162));
                a = e.memoizedProps,
                l = e.stateNode;
                try {
                    l.nodeValue = a
                } catch (X) {
                    be(e, e.return, X)
                }
            }
            break;
        case 3:
            if (Vu = null,
            n = Dt,
            Dt = qu(t.containerInfo),
            nt(t, e),
            Dt = n,
            ut(e),
            a & 4 && l !== null && l.memoizedState.isDehydrated)
                try {
                    Ba(t.containerInfo)
                } catch (X) {
                    be(e, e.return, X)
                }
            Hi && (Hi = !1,
            xf(e));
            break;
        case 4:
            a = Dt,
            Dt = qu(e.stateNode.containerInfo),
            nt(t, e),
            ut(e),
            Dt = a;
            break;
        case 12:
            nt(t, e),
            ut(e);
            break;
        case 31:
            nt(t, e),
            ut(e),
            a & 4 && (a = e.updateQueue,
            a !== null && (e.updateQueue = null,
            zu(e, a)));
            break;
        case 13:
            nt(t, e),
            ut(e),
            e.child.flags & 8192 && e.memoizedState !== null != (l !== null && l.memoizedState !== null) && (Mu = rt()),
            a & 4 && (a = e.updateQueue,
            a !== null && (e.updateQueue = null,
            zu(e, a)));
            break;
        case 22:
            n = e.memoizedState !== null;
            var d = l !== null && l.memoizedState !== null
              , b = Wt
              , M = ke;
            if (Wt = b || n,
            ke = M || d,
            nt(t, e),
            ke = M,
            Wt = b,
            ut(e),
            a & 8192)
                e: for (t = e.stateNode,
                t._visibility = n ? t._visibility & -2 : t._visibility | 1,
                n && (l === null || d || Wt || ke || Kl(e)),
                l = null,
                t = e; ; ) {
                    if (t.tag === 5 || t.tag === 26) {
                        if (l === null) {
                            d = l = t;
                            try {
                                if (u = d.stateNode,
                                n)
                                    c = u.style,
                                    typeof c.setProperty == "function" ? c.setProperty("display", "none", "important") : c.display = "none";
                                else {
                                    s = d.stateNode;
                                    var B = d.memoizedProps.style
                                      , S = B != null && B.hasOwnProperty("display") ? B.display : null;
                                    s.style.display = S == null || typeof S == "boolean" ? "" : ("" + S).trim()
                                }
                            } catch (X) {
                                be(d, d.return, X)
                            }
                        }
                    } else if (t.tag === 6) {
                        if (l === null) {
                            d = t;
                            try {
                                d.stateNode.nodeValue = n ? "" : d.memoizedProps
                            } catch (X) {
                                be(d, d.return, X)
                            }
                        }
                    } else if (t.tag === 18) {
                        if (l === null) {
                            d = t;
                            try {
                                var N = d.stateNode;
                                n ? id(N, !0) : id(d.stateNode, !1)
                            } catch (X) {
                                be(d, d.return, X)
                            }
                        }
                    } else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === e) && t.child !== null) {
                        t.child.return = t,
                        t = t.child;
                        continue
                    }
                    if (t === e)
                        break e;
                    for (; t.sibling === null; ) {
                        if (t.return === null || t.return === e)
                            break e;
                        l === t && (l = null),
                        t = t.return
                    }
                    l === t && (l = null),
                    t.sibling.return = t.return,
                    t = t.sibling
                }
            a & 4 && (a = e.updateQueue,
            a !== null && (l = a.retryQueue,
            l !== null && (a.retryQueue = null,
            zu(e, l))));
            break;
        case 19:
            nt(t, e),
            ut(e),
            a & 4 && (a = e.updateQueue,
            a !== null && (e.updateQueue = null,
            zu(e, a)));
            break;
        case 30:
            break;
        case 21:
            break;
        default:
            nt(t, e),
            ut(e)
        }
    }
    function ut(e) {
        var t = e.flags;
        if (t & 2) {
            try {
                for (var l, a = e.return; a !== null; ) {
                    if (sf(a)) {
                        l = a;
                        break
                    }
                    a = a.return
                }
                if (l == null)
                    throw Error(o(160));
                switch (l.tag) {
                case 27:
                    var n = l.stateNode
                      , u = Bi(e);
                    Tu(e, u, n);
                    break;
                case 5:
                    var c = l.stateNode;
                    l.flags & 32 && (aa(c, ""),
                    l.flags &= -33);
                    var s = Bi(e);
                    Tu(e, s, c);
                    break;
                case 3:
                case 4:
                    var d = l.stateNode.containerInfo
                      , b = Bi(e);
                    wi(e, b, d);
                    break;
                default:
                    throw Error(o(161))
                }
            } catch (M) {
                be(e, e.return, M)
            }
            e.flags &= -3
        }
        t & 4096 && (e.flags &= -4097)
    }
    function xf(e) {
        if (e.subtreeFlags & 1024)
            for (e = e.child; e !== null; ) {
                var t = e;
                xf(t),
                t.tag === 5 && t.flags & 1024 && t.stateNode.reset(),
                e = e.sibling
            }
    }
    function It(e, t) {
        if (t.subtreeFlags & 8772)
            for (t = t.child; t !== null; )
                df(e, t.alternate, t),
                t = t.sibling
    }
    function Kl(e) {
        for (e = e.child; e !== null; ) {
            var t = e;
            switch (t.tag) {
            case 0:
            case 11:
            case 14:
            case 15:
                yl(4, t, t.return),
                Kl(t);
                break;
            case 1:
                Ut(t, t.return);
                var l = t.stateNode;
                typeof l.componentWillUnmount == "function" && cf(t, t.return, l),
                Kl(t);
                break;
            case 27:
                Tn(t.stateNode);
            case 26:
            case 5:
                Ut(t, t.return),
                Kl(t);
                break;
            case 22:
                t.memoizedState === null && Kl(t);
                break;
            case 30:
                Kl(t);
                break;
            default:
                Kl(t)
            }
            e = e.sibling
        }
    }
    function Pt(e, t, l) {
        for (l = l && (t.subtreeFlags & 8772) !== 0,
        t = t.child; t !== null; ) {
            var a = t.alternate
              , n = e
              , u = t
              , c = u.flags;
            switch (u.tag) {
            case 0:
            case 11:
            case 15:
                Pt(n, u, l),
                gn(4, u);
                break;
            case 1:
                if (Pt(n, u, l),
                a = u,
                n = a.stateNode,
                typeof n.componentDidMount == "function")
                    try {
                        n.componentDidMount()
                    } catch (b) {
                        be(a, a.return, b)
                    }
                if (a = u,
                n = a.updateQueue,
                n !== null) {
                    var s = a.stateNode;
                    try {
                        var d = n.shared.hiddenCallbacks;
                        if (d !== null)
                            for (n.shared.hiddenCallbacks = null,
                            n = 0; n < d.length; n++)
                                Ks(d[n], s)
                    } catch (b) {
                        be(a, a.return, b)
                    }
                }
                l && c & 64 && uf(u),
                yn(u, u.return);
                break;
            case 27:
                of(u);
            case 26:
            case 5:
                Pt(n, u, l),
                l && a === null && c & 4 && rf(u),
                yn(u, u.return);
                break;
            case 12:
                Pt(n, u, l);
                break;
            case 31:
                Pt(n, u, l),
                l && c & 4 && vf(n, u);
                break;
            case 13:
                Pt(n, u, l),
                l && c & 4 && gf(n, u);
                break;
            case 22:
                u.memoizedState === null && Pt(n, u, l),
                yn(u, u.return);
                break;
            case 30:
                break;
            default:
                Pt(n, u, l)
            }
            t = t.sibling
        }
    }
    function Ui(e, t) {
        var l = null;
        e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (l = e.memoizedState.cachePool.pool),
        e = null,
        t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool),
        e !== l && (e != null && e.refCount++,
        l != null && ln(l))
    }
    function Gi(e, t) {
        e = null,
        t.alternate !== null && (e = t.alternate.memoizedState.cache),
        t = t.memoizedState.cache,
        t !== e && (t.refCount++,
        e != null && ln(e))
    }
    function Ot(e, t, l, a) {
        if (t.subtreeFlags & 10256)
            for (t = t.child; t !== null; )
                pf(e, t, l, a),
                t = t.sibling
    }
    function pf(e, t, l, a) {
        var n = t.flags;
        switch (t.tag) {
        case 0:
        case 11:
        case 15:
            Ot(e, t, l, a),
            n & 2048 && gn(9, t);
            break;
        case 1:
            Ot(e, t, l, a);
            break;
        case 3:
            Ot(e, t, l, a),
            n & 2048 && (e = null,
            t.alternate !== null && (e = t.alternate.memoizedState.cache),
            t = t.memoizedState.cache,
            t !== e && (t.refCount++,
            e != null && ln(e)));
            break;
        case 12:
            if (n & 2048) {
                Ot(e, t, l, a),
                e = t.stateNode;
                try {
                    var u = t.memoizedProps
                      , c = u.id
                      , s = u.onPostCommit;
                    typeof s == "function" && s(c, t.alternate === null ? "mount" : "update", e.passiveEffectDuration, -0)
                } catch (d) {
                    be(t, t.return, d)
                }
            } else
                Ot(e, t, l, a);
            break;
        case 31:
            Ot(e, t, l, a);
            break;
        case 13:
            Ot(e, t, l, a);
            break;
        case 23:
            break;
        case 22:
            u = t.stateNode,
            c = t.alternate,
            t.memoizedState !== null ? u._visibility & 2 ? Ot(e, t, l, a) : xn(e, t) : u._visibility & 2 ? Ot(e, t, l, a) : (u._visibility |= 2,
            Ea(e, t, l, a, (t.subtreeFlags & 10256) !== 0 || !1)),
            n & 2048 && Ui(c, t);
            break;
        case 24:
            Ot(e, t, l, a),
            n & 2048 && Gi(t.alternate, t);
            break;
        default:
            Ot(e, t, l, a)
        }
    }
    function Ea(e, t, l, a, n) {
        for (n = n && ((t.subtreeFlags & 10256) !== 0 || !1),
        t = t.child; t !== null; ) {
            var u = e
              , c = t
              , s = l
              , d = a
              , b = c.flags;
            switch (c.tag) {
            case 0:
            case 11:
            case 15:
                Ea(u, c, s, d, n),
                gn(8, c);
                break;
            case 23:
                break;
            case 22:
                var M = c.stateNode;
                c.memoizedState !== null ? M._visibility & 2 ? Ea(u, c, s, d, n) : xn(u, c) : (M._visibility |= 2,
                Ea(u, c, s, d, n)),
                n && b & 2048 && Ui(c.alternate, c);
                break;
            case 24:
                Ea(u, c, s, d, n),
                n && b & 2048 && Gi(c.alternate, c);
                break;
            default:
                Ea(u, c, s, d, n)
            }
            t = t.sibling
        }
    }
    function xn(e, t) {
        if (t.subtreeFlags & 10256)
            for (t = t.child; t !== null; ) {
                var l = e
                  , a = t
                  , n = a.flags;
                switch (a.tag) {
                case 22:
                    xn(l, a),
                    n & 2048 && Ui(a.alternate, a);
                    break;
                case 24:
                    xn(l, a),
                    n & 2048 && Gi(a.alternate, a);
                    break;
                default:
                    xn(l, a)
                }
                t = t.sibling
            }
    }
    var pn = 8192;
    function ja(e, t, l) {
        if (e.subtreeFlags & pn)
            for (e = e.child; e !== null; )
                bf(e, t, l),
                e = e.sibling
    }
    function bf(e, t, l) {
        switch (e.tag) {
        case 26:
            ja(e, t, l),
            e.flags & pn && e.memoizedState !== null && Oh(l, Dt, e.memoizedState, e.memoizedProps);
            break;
        case 5:
            ja(e, t, l);
            break;
        case 3:
        case 4:
            var a = Dt;
            Dt = qu(e.stateNode.containerInfo),
            ja(e, t, l),
            Dt = a;
            break;
        case 22:
            e.memoizedState === null && (a = e.alternate,
            a !== null && a.memoizedState !== null ? (a = pn,
            pn = 16777216,
            ja(e, t, l),
            pn = a) : ja(e, t, l));
            break;
        default:
            ja(e, t, l)
        }
    }
    function Sf(e) {
        var t = e.alternate;
        if (t !== null && (e = t.child,
        e !== null)) {
            t.child = null;
            do
                t = e.sibling,
                e.sibling = null,
                e = t;
            while (e !== null)
        }
    }
    function bn(e) {
        var t = e.deletions;
        if ((e.flags & 16) !== 0) {
            if (t !== null)
                for (var l = 0; l < t.length; l++) {
                    var a = t[l];
                    Ke = a,
                    Ef(a, e)
                }
            Sf(e)
        }
        if (e.subtreeFlags & 10256)
            for (e = e.child; e !== null; )
                Af(e),
                e = e.sibling
    }
    function Af(e) {
        switch (e.tag) {
        case 0:
        case 11:
        case 15:
            bn(e),
            e.flags & 2048 && yl(9, e, e.return);
            break;
        case 3:
            bn(e);
            break;
        case 12:
            bn(e);
            break;
        case 22:
            var t = e.stateNode;
            e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3,
            _u(e)) : bn(e);
            break;
        default:
            bn(e)
        }
    }
    function _u(e) {
        var t = e.deletions;
        if ((e.flags & 16) !== 0) {
            if (t !== null)
                for (var l = 0; l < t.length; l++) {
                    var a = t[l];
                    Ke = a,
                    Ef(a, e)
                }
            Sf(e)
        }
        for (e = e.child; e !== null; ) {
            switch (t = e,
            t.tag) {
            case 0:
            case 11:
            case 15:
                yl(8, t, t.return),
                _u(t);
                break;
            case 22:
                l = t.stateNode,
                l._visibility & 2 && (l._visibility &= -3,
                _u(t));
                break;
            default:
                _u(t)
            }
            e = e.sibling
        }
    }
    function Ef(e, t) {
        for (; Ke !== null; ) {
            var l = Ke;
            switch (l.tag) {
            case 0:
            case 11:
            case 15:
                yl(8, l, t);
                break;
            case 23:
            case 22:
                if (l.memoizedState !== null && l.memoizedState.cachePool !== null) {
                    var a = l.memoizedState.cachePool.pool;
                    a != null && a.refCount++
                }
                break;
            case 24:
                ln(l.memoizedState.cache)
            }
            if (a = l.child,
            a !== null)
                a.return = l,
                Ke = a;
            else
                e: for (l = e; Ke !== null; ) {
                    a = Ke;
                    var n = a.sibling
                      , u = a.return;
                    if (hf(a),
                    a === l) {
                        Ke = null;
                        break e
                    }
                    if (n !== null) {
                        n.return = u,
                        Ke = n;
                        break e
                    }
                    Ke = u
                }
        }
    }
    var K1 = {
        getCacheForType: function(e) {
            var t = We(Le)
              , l = t.data.get(e);
            return l === void 0 && (l = e(),
            t.data.set(e, l)),
            l
        },
        cacheSignal: function() {
            return We(Le).controller.signal
        }
    }
      , J1 = typeof WeakMap == "function" ? WeakMap : Map
      , xe = 0
      , Ne = null
      , ie = null
      , oe = 0
      , pe = 0
      , vt = null
      , xl = !1
      , Na = !1
      , Li = !1
      , el = 0
      , Be = 0
      , pl = 0
      , Jl = 0
      , Yi = 0
      , gt = 0
      , Ta = 0
      , Sn = null
      , ct = null
      , qi = !1
      , Mu = 0
      , jf = 0
      , Cu = 1 / 0
      , Du = null
      , bl = null
      , Ve = 0
      , Sl = null
      , za = null
      , tl = 0
      , ki = 0
      , Vi = null
      , Nf = null
      , An = 0
      , Qi = null;
    function yt() {
        return (xe & 2) !== 0 && oe !== 0 ? oe & -oe : z.T !== null ? Wi() : Lr()
    }
    function Tf() {
        if (gt === 0)
            if ((oe & 536870912) === 0 || de) {
                var e = Ln;
                Ln <<= 1,
                (Ln & 3932160) === 0 && (Ln = 262144),
                gt = e
            } else
                gt = 536870912;
        return e = ht.current,
        e !== null && (e.flags |= 32),
        gt
    }
    function it(e, t, l) {
        (e === Ne && (pe === 2 || pe === 9) || e.cancelPendingCommit !== null) && (_a(e, 0),
        Al(e, oe, gt, !1)),
        ka(e, l),
        ((xe & 2) === 0 || e !== Ne) && (e === Ne && ((xe & 2) === 0 && (Jl |= l),
        Be === 4 && Al(e, oe, gt, !1)),
        Gt(e))
    }
    function zf(e, t, l) {
        if ((xe & 6) !== 0)
            throw Error(o(327));
        var a = !l && (t & 127) === 0 && (t & e.expiredLanes) === 0 || qa(e, t)
          , n = a ? F1(e, t) : Zi(e, t, !0)
          , u = a;
        do {
            if (n === 0) {
                Na && !a && Al(e, t, 0, !1);
                break
            } else {
                if (l = e.current.alternate,
                u && !$1(l)) {
                    n = Zi(e, t, !1),
                    u = !1;
                    continue
                }
                if (n === 2) {
                    if (u = t,
                    e.errorRecoveryDisabledLanes & u)
                        var c = 0;
                    else
                        c = e.pendingLanes & -536870913,
                        c = c !== 0 ? c : c & 536870912 ? 536870912 : 0;
                    if (c !== 0) {
                        t = c;
                        e: {
                            var s = e;
                            n = Sn;
                            var d = s.current.memoizedState.isDehydrated;
                            if (d && (_a(s, c).flags |= 256),
                            c = Zi(s, c, !1),
                            c !== 2) {
                                if (Li && !d) {
                                    s.errorRecoveryDisabledLanes |= u,
                                    Jl |= u,
                                    n = 4;
                                    break e
                                }
                                u = ct,
                                ct = n,
                                u !== null && (ct === null ? ct = u : ct.push.apply(ct, u))
                            }
                            n = c
                        }
                        if (u = !1,
                        n !== 2)
                            continue
                    }
                }
                if (n === 1) {
                    _a(e, 0),
                    Al(e, t, 0, !0);
                    break
                }
                e: {
                    switch (a = e,
                    u = n,
                    u) {
                    case 0:
                    case 1:
                        throw Error(o(345));
                    case 4:
                        if ((t & 4194048) !== t)
                            break;
                    case 6:
                        Al(a, t, gt, !xl);
                        break e;
                    case 2:
                        ct = null;
                        break;
                    case 3:
                    case 5:
                        break;
                    default:
                        throw Error(o(329))
                    }
                    if ((t & 62914560) === t && (n = Mu + 300 - rt(),
                    10 < n)) {
                        if (Al(a, t, gt, !xl),
                        qn(a, 0, !0) !== 0)
                            break e;
                        tl = t,
                        a.timeoutHandle = nd(_f.bind(null, a, l, ct, Du, qi, t, gt, Jl, Ta, xl, u, "Throttled", -0, 0), n);
                        break e
                    }
                    _f(a, l, ct, Du, qi, t, gt, Jl, Ta, xl, u, null, -0, 0)
                }
            }
            break
        } while (!0);
        Gt(e)
    }
    function _f(e, t, l, a, n, u, c, s, d, b, M, B, S, N) {
        if (e.timeoutHandle = -1,
        B = t.subtreeFlags,
        B & 8192 || (B & 16785408) === 16785408) {
            B = {
                stylesheets: null,
                count: 0,
                imgCount: 0,
                imgBytes: 0,
                suspenseyImages: [],
                waitingForImages: !0,
                waitingForViewTransition: !1,
                unsuspend: Yt
            },
            bf(t, u, B);
            var X = (u & 62914560) === u ? Mu - rt() : (u & 4194048) === u ? jf - rt() : 0;
            if (X = Rh(B, X),
            X !== null) {
                tl = u,
                e.cancelPendingCommit = X(Hf.bind(null, e, t, u, l, a, n, c, s, d, M, B, null, S, N)),
                Al(e, u, c, !b);
                return
            }
        }
        Hf(e, t, u, l, a, n, c, s, d)
    }
    function $1(e) {
        for (var t = e; ; ) {
            var l = t.tag;
            if ((l === 0 || l === 11 || l === 15) && t.flags & 16384 && (l = t.updateQueue,
            l !== null && (l = l.stores,
            l !== null)))
                for (var a = 0; a < l.length; a++) {
                    var n = l[a]
                      , u = n.getSnapshot;
                    n = n.value;
                    try {
                        if (!ft(u(), n))
                            return !1
                    } catch {
                        return !1
                    }
                }
            if (l = t.child,
            t.subtreeFlags & 16384 && l !== null)
                l.return = t,
                t = l;
            else {
                if (t === e)
                    break;
                for (; t.sibling === null; ) {
                    if (t.return === null || t.return === e)
                        return !0;
                    t = t.return
                }
                t.sibling.return = t.return,
                t = t.sibling
            }
        }
        return !0
    }
    function Al(e, t, l, a) {
        t &= ~Yi,
        t &= ~Jl,
        e.suspendedLanes |= t,
        e.pingedLanes &= ~t,
        a && (e.warmLanes |= t),
        a = e.expirationTimes;
        for (var n = t; 0 < n; ) {
            var u = 31 - ot(n)
              , c = 1 << u;
            a[u] = -1,
            n &= ~c
        }
        l !== 0 && Hr(e, l, t)
    }
    function Ou() {
        return (xe & 6) === 0 ? (En(0),
        !1) : !0
    }
    function Xi() {
        if (ie !== null) {
            if (pe === 0)
                var e = ie.return;
            else
                e = ie,
                Qt = Ll = null,
                ii(e),
                xa = null,
                nn = 0,
                e = ie;
            for (; e !== null; )
                nf(e.alternate, e),
                e = e.return;
            ie = null
        }
    }
    function _a(e, t) {
        var l = e.timeoutHandle;
        l !== -1 && (e.timeoutHandle = -1,
        vh(l)),
        l = e.cancelPendingCommit,
        l !== null && (e.cancelPendingCommit = null,
        l()),
        tl = 0,
        Xi(),
        Ne = e,
        ie = l = kt(e.current, null),
        oe = t,
        pe = 0,
        vt = null,
        xl = !1,
        Na = qa(e, t),
        Li = !1,
        Ta = gt = Yi = Jl = pl = Be = 0,
        ct = Sn = null,
        qi = !1,
        (t & 8) !== 0 && (t |= t & 32);
        var a = e.entangledLanes;
        if (a !== 0)
            for (e = e.entanglements,
            a &= t; 0 < a; ) {
                var n = 31 - ot(a)
                  , u = 1 << n;
                t |= e[n],
                a &= ~u
            }
        return el = t,
        Pn(),
        l
    }
    function Mf(e, t) {
        ne = null,
        z.H = hn,
        t === ya || t === iu ? (t = Vs(),
        pe = 3) : t === $c ? (t = Vs(),
        pe = 4) : pe = t === Ei ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1,
        vt = t,
        ie === null && (Be = 1,
        Su(e, St(t, e.current)))
    }
    function Cf() {
        var e = ht.current;
        return e === null ? !0 : (oe & 4194048) === oe ? Nt === null : (oe & 62914560) === oe || (oe & 536870912) !== 0 ? e === Nt : !1
    }
    function Df() {
        var e = z.H;
        return z.H = hn,
        e === null ? hn : e
    }
    function Of() {
        var e = z.A;
        return z.A = K1,
        e
    }
    function Ru() {
        Be = 4,
        xl || (oe & 4194048) !== oe && ht.current !== null || (Na = !0),
        (pl & 134217727) === 0 && (Jl & 134217727) === 0 || Ne === null || Al(Ne, oe, gt, !1)
    }
    function Zi(e, t, l) {
        var a = xe;
        xe |= 2;
        var n = Df()
          , u = Of();
        (Ne !== e || oe !== t) && (Du = null,
        _a(e, t)),
        t = !1;
        var c = Be;
        e: do
            try {
                if (pe !== 0 && ie !== null) {
                    var s = ie
                      , d = vt;
                    switch (pe) {
                    case 8:
                        Xi(),
                        c = 6;
                        break e;
                    case 3:
                    case 2:
                    case 9:
                    case 6:
                        ht.current === null && (t = !0);
                        var b = pe;
                        if (pe = 0,
                        vt = null,
                        Ma(e, s, d, b),
                        l && Na) {
                            c = 0;
                            break e
                        }
                        break;
                    default:
                        b = pe,
                        pe = 0,
                        vt = null,
                        Ma(e, s, d, b)
                    }
                }
                W1(),
                c = Be;
                break
            } catch (M) {
                Mf(e, M)
            }
        while (!0);
        return t && e.shellSuspendCounter++,
        Qt = Ll = null,
        xe = a,
        z.H = n,
        z.A = u,
        ie === null && (Ne = null,
        oe = 0,
        Pn()),
        c
    }
    function W1() {
        for (; ie !== null; )
            Rf(ie)
    }
    function F1(e, t) {
        var l = xe;
        xe |= 2;
        var a = Df()
          , n = Of();
        Ne !== e || oe !== t ? (Du = null,
        Cu = rt() + 500,
        _a(e, t)) : Na = qa(e, t);
        e: do
            try {
                if (pe !== 0 && ie !== null) {
                    t = ie;
                    var u = vt;
                    t: switch (pe) {
                    case 1:
                        pe = 0,
                        vt = null,
                        Ma(e, t, u, 1);
                        break;
                    case 2:
                    case 9:
                        if (qs(u)) {
                            pe = 0,
                            vt = null,
                            Bf(t);
                            break
                        }
                        t = function() {
                            pe !== 2 && pe !== 9 || Ne !== e || (pe = 7),
                            Gt(e)
                        }
                        ,
                        u.then(t, t);
                        break e;
                    case 3:
                        pe = 7;
                        break e;
                    case 4:
                        pe = 5;
                        break e;
                    case 7:
                        qs(u) ? (pe = 0,
                        vt = null,
                        Bf(t)) : (pe = 0,
                        vt = null,
                        Ma(e, t, u, 7));
                        break;
                    case 5:
                        var c = null;
                        switch (ie.tag) {
                        case 26:
                            c = ie.memoizedState;
                        case 5:
                        case 27:
                            var s = ie;
                            if (c ? pd(c) : s.stateNode.complete) {
                                pe = 0,
                                vt = null;
                                var d = s.sibling;
                                if (d !== null)
                                    ie = d;
                                else {
                                    var b = s.return;
                                    b !== null ? (ie = b,
                                    Bu(b)) : ie = null
                                }
                                break t
                            }
                        }
                        pe = 0,
                        vt = null,
                        Ma(e, t, u, 5);
                        break;
                    case 6:
                        pe = 0,
                        vt = null,
                        Ma(e, t, u, 6);
                        break;
                    case 8:
                        Xi(),
                        Be = 6;
                        break e;
                    default:
                        throw Error(o(462))
                    }
                }
                I1();
                break
            } catch (M) {
                Mf(e, M)
            }
        while (!0);
        return Qt = Ll = null,
        z.H = a,
        z.A = n,
        xe = l,
        ie !== null ? 0 : (Ne = null,
        oe = 0,
        Pn(),
        Be)
    }
    function I1() {
        for (; ie !== null && !S0(); )
            Rf(ie)
    }
    function Rf(e) {
        var t = lf(e.alternate, e, el);
        e.memoizedProps = e.pendingProps,
        t === null ? Bu(e) : ie = t
    }
    function Bf(e) {
        var t = e
          , l = t.alternate;
        switch (t.tag) {
        case 15:
        case 0:
            t = Wo(l, t, t.pendingProps, t.type, void 0, oe);
            break;
        case 11:
            t = Wo(l, t, t.pendingProps, t.type.render, t.ref, oe);
            break;
        case 5:
            ii(t);
        default:
            nf(l, t),
            t = ie = Cs(t, el),
            t = lf(l, t, el)
        }
        e.memoizedProps = e.pendingProps,
        t === null ? Bu(e) : ie = t
    }
    function Ma(e, t, l, a) {
        Qt = Ll = null,
        ii(t),
        xa = null,
        nn = 0;
        var n = t.return;
        try {
            if (Y1(e, n, t, l, oe)) {
                Be = 1,
                Su(e, St(l, e.current)),
                ie = null;
                return
            }
        } catch (u) {
            if (n !== null)
                throw ie = n,
                u;
            Be = 1,
            Su(e, St(l, e.current)),
            ie = null;
            return
        }
        t.flags & 32768 ? (de || a === 1 ? e = !0 : Na || (oe & 536870912) !== 0 ? e = !1 : (xl = e = !0,
        (a === 2 || a === 9 || a === 3 || a === 6) && (a = ht.current,
        a !== null && a.tag === 13 && (a.flags |= 16384))),
        wf(t, e)) : Bu(t)
    }
    function Bu(e) {
        var t = e;
        do {
            if ((t.flags & 32768) !== 0) {
                wf(t, xl);
                return
            }
            e = t.return;
            var l = V1(t.alternate, t, el);
            if (l !== null) {
                ie = l;
                return
            }
            if (t = t.sibling,
            t !== null) {
                ie = t;
                return
            }
            ie = t = e
        } while (t !== null);
        Be === 0 && (Be = 5)
    }
    function wf(e, t) {
        do {
            var l = Q1(e.alternate, e);
            if (l !== null) {
                l.flags &= 32767,
                ie = l;
                return
            }
            if (l = e.return,
            l !== null && (l.flags |= 32768,
            l.subtreeFlags = 0,
            l.deletions = null),
            !t && (e = e.sibling,
            e !== null)) {
                ie = e;
                return
            }
            ie = e = l
        } while (e !== null);
        Be = 6,
        ie = null
    }
    function Hf(e, t, l, a, n, u, c, s, d) {
        e.cancelPendingCommit = null;
        do
            wu();
        while (Ve !== 0);
        if ((xe & 6) !== 0)
            throw Error(o(327));
        if (t !== null) {
            if (t === e.current)
                throw Error(o(177));
            if (u = t.lanes | t.childLanes,
            u |= Bc,
            D0(e, l, u, c, s, d),
            e === Ne && (ie = Ne = null,
            oe = 0),
            za = t,
            Sl = e,
            tl = l,
            ki = u,
            Vi = n,
            Nf = a,
            (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null,
            e.callbackPriority = 0,
            lh(Un, function() {
                return qf(),
                null
            })) : (e.callbackNode = null,
            e.callbackPriority = 0),
            a = (t.flags & 13878) !== 0,
            (t.subtreeFlags & 13878) !== 0 || a) {
                a = z.T,
                z.T = null,
                n = U.p,
                U.p = 2,
                c = xe,
                xe |= 4;
                try {
                    X1(e, t, l)
                } finally {
                    xe = c,
                    U.p = n,
                    z.T = a
                }
            }
            Ve = 1,
            Uf(),
            Gf(),
            Lf()
        }
    }
    function Uf() {
        if (Ve === 1) {
            Ve = 0;
            var e = Sl
              , t = za
              , l = (t.flags & 13878) !== 0;
            if ((t.subtreeFlags & 13878) !== 0 || l) {
                l = z.T,
                z.T = null;
                var a = U.p;
                U.p = 2;
                var n = xe;
                xe |= 4;
                try {
                    yf(t, e);
                    var u = nr
                      , c = Ss(e.containerInfo)
                      , s = u.focusedElem
                      , d = u.selectionRange;
                    if (c !== s && s && s.ownerDocument && bs(s.ownerDocument.documentElement, s)) {
                        if (d !== null && Mc(s)) {
                            var b = d.start
                              , M = d.end;
                            if (M === void 0 && (M = b),
                            "selectionStart"in s)
                                s.selectionStart = b,
                                s.selectionEnd = Math.min(M, s.value.length);
                            else {
                                var B = s.ownerDocument || document
                                  , S = B && B.defaultView || window;
                                if (S.getSelection) {
                                    var N = S.getSelection()
                                      , X = s.textContent.length
                                      , F = Math.min(d.start, X)
                                      , Ee = d.end === void 0 ? F : Math.min(d.end, X);
                                    !N.extend && F > Ee && (c = Ee,
                                    Ee = F,
                                    F = c);
                                    var x = ps(s, F)
                                      , v = ps(s, Ee);
                                    if (x && v && (N.rangeCount !== 1 || N.anchorNode !== x.node || N.anchorOffset !== x.offset || N.focusNode !== v.node || N.focusOffset !== v.offset)) {
                                        var p = B.createRange();
                                        p.setStart(x.node, x.offset),
                                        N.removeAllRanges(),
                                        F > Ee ? (N.addRange(p),
                                        N.extend(v.node, v.offset)) : (p.setEnd(v.node, v.offset),
                                        N.addRange(p))
                                    }
                                }
                            }
                        }
                        for (B = [],
                        N = s; N = N.parentNode; )
                            N.nodeType === 1 && B.push({
                                element: N,
                                left: N.scrollLeft,
                                top: N.scrollTop
                            });
                        for (typeof s.focus == "function" && s.focus(),
                        s = 0; s < B.length; s++) {
                            var R = B[s];
                            R.element.scrollLeft = R.left,
                            R.element.scrollTop = R.top
                        }
                    }
                    Ku = !!ar,
                    nr = ar = null
                } finally {
                    xe = n,
                    U.p = a,
                    z.T = l
                }
            }
            e.current = t,
            Ve = 2
        }
    }
    function Gf() {
        if (Ve === 2) {
            Ve = 0;
            var e = Sl
              , t = za
              , l = (t.flags & 8772) !== 0;
            if ((t.subtreeFlags & 8772) !== 0 || l) {
                l = z.T,
                z.T = null;
                var a = U.p;
                U.p = 2;
                var n = xe;
                xe |= 4;
                try {
                    df(e, t.alternate, t)
                } finally {
                    xe = n,
                    U.p = a,
                    z.T = l
                }
            }
            Ve = 3
        }
    }
    function Lf() {
        if (Ve === 4 || Ve === 3) {
            Ve = 0,
            A0();
            var e = Sl
              , t = za
              , l = tl
              , a = Nf;
            (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? Ve = 5 : (Ve = 0,
            za = Sl = null,
            Yf(e, e.pendingLanes));
            var n = e.pendingLanes;
            if (n === 0 && (bl = null),
            oc(l),
            t = t.stateNode,
            st && typeof st.onCommitFiberRoot == "function")
                try {
                    st.onCommitFiberRoot(Ya, t, void 0, (t.current.flags & 128) === 128)
                } catch {}
            if (a !== null) {
                t = z.T,
                n = U.p,
                U.p = 2,
                z.T = null;
                try {
                    for (var u = e.onRecoverableError, c = 0; c < a.length; c++) {
                        var s = a[c];
                        u(s.value, {
                            componentStack: s.stack
                        })
                    }
                } finally {
                    z.T = t,
                    U.p = n
                }
            }
            (tl & 3) !== 0 && wu(),
            Gt(e),
            n = e.pendingLanes,
            (l & 261930) !== 0 && (n & 42) !== 0 ? e === Qi ? An++ : (An = 0,
            Qi = e) : An = 0,
            En(0)
        }
    }
    function Yf(e, t) {
        (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache,
        t != null && (e.pooledCache = null,
        ln(t)))
    }
    function wu() {
        return Uf(),
        Gf(),
        Lf(),
        qf()
    }
    function qf() {
        if (Ve !== 5)
            return !1;
        var e = Sl
          , t = ki;
        ki = 0;
        var l = oc(tl)
          , a = z.T
          , n = U.p;
        try {
            U.p = 32 > l ? 32 : l,
            z.T = null,
            l = Vi,
            Vi = null;
            var u = Sl
              , c = tl;
            if (Ve = 0,
            za = Sl = null,
            tl = 0,
            (xe & 6) !== 0)
                throw Error(o(331));
            var s = xe;
            if (xe |= 4,
            Af(u.current),
            pf(u, u.current, c, l),
            xe = s,
            En(0, !1),
            st && typeof st.onPostCommitFiberRoot == "function")
                try {
                    st.onPostCommitFiberRoot(Ya, u)
                } catch {}
            return !0
        } finally {
            U.p = n,
            z.T = a,
            Yf(e, t)
        }
    }
    function kf(e, t, l) {
        t = St(l, t),
        t = Ai(e.stateNode, t, 2),
        e = ml(e, t, 2),
        e !== null && (ka(e, 2),
        Gt(e))
    }
    function be(e, t, l) {
        if (e.tag === 3)
            kf(e, e, l);
        else
            for (; t !== null; ) {
                if (t.tag === 3) {
                    kf(t, e, l);
                    break
                } else if (t.tag === 1) {
                    var a = t.stateNode;
                    if (typeof t.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (bl === null || !bl.has(a))) {
                        e = St(l, e),
                        l = ko(2),
                        a = ml(t, l, 2),
                        a !== null && (Vo(l, a, t, e),
                        ka(a, 2),
                        Gt(a));
                        break
                    }
                }
                t = t.return
            }
    }
    function Ki(e, t, l) {
        var a = e.pingCache;
        if (a === null) {
            a = e.pingCache = new J1;
            var n = new Set;
            a.set(t, n)
        } else
            n = a.get(t),
            n === void 0 && (n = new Set,
            a.set(t, n));
        n.has(l) || (Li = !0,
        n.add(l),
        e = P1.bind(null, e, t, l),
        t.then(e, e))
    }
    function P1(e, t, l) {
        var a = e.pingCache;
        a !== null && a.delete(t),
        e.pingedLanes |= e.suspendedLanes & l,
        e.warmLanes &= ~l,
        Ne === e && (oe & l) === l && (Be === 4 || Be === 3 && (oe & 62914560) === oe && 300 > rt() - Mu ? (xe & 2) === 0 && _a(e, 0) : Yi |= l,
        Ta === oe && (Ta = 0)),
        Gt(e)
    }
    function Vf(e, t) {
        t === 0 && (t = wr()),
        e = Hl(e, t),
        e !== null && (ka(e, t),
        Gt(e))
    }
    function eh(e) {
        var t = e.memoizedState
          , l = 0;
        t !== null && (l = t.retryLane),
        Vf(e, l)
    }
    function th(e, t) {
        var l = 0;
        switch (e.tag) {
        case 31:
        case 13:
            var a = e.stateNode
              , n = e.memoizedState;
            n !== null && (l = n.retryLane);
            break;
        case 19:
            a = e.stateNode;
            break;
        case 22:
            a = e.stateNode._retryCache;
            break;
        default:
            throw Error(o(314))
        }
        a !== null && a.delete(t),
        Vf(e, l)
    }
    function lh(e, t) {
        return cc(e, t)
    }
    var Hu = null
      , Ca = null
      , Ji = !1
      , Uu = !1
      , $i = !1
      , El = 0;
    function Gt(e) {
        e !== Ca && e.next === null && (Ca === null ? Hu = Ca = e : Ca = Ca.next = e),
        Uu = !0,
        Ji || (Ji = !0,
        nh())
    }
    function En(e, t) {
        if (!$i && Uu) {
            $i = !0;
            do
                for (var l = !1, a = Hu; a !== null; ) {
                    if (e !== 0) {
                        var n = a.pendingLanes;
                        if (n === 0)
                            var u = 0;
                        else {
                            var c = a.suspendedLanes
                              , s = a.pingedLanes;
                            u = (1 << 31 - ot(42 | e) + 1) - 1,
                            u &= n & ~(c & ~s),
                            u = u & 201326741 ? u & 201326741 | 1 : u ? u | 2 : 0
                        }
                        u !== 0 && (l = !0,
                        Kf(a, u))
                    } else
                        u = oe,
                        u = qn(a, a === Ne ? u : 0, a.cancelPendingCommit !== null || a.timeoutHandle !== -1),
                        (u & 3) === 0 || qa(a, u) || (l = !0,
                        Kf(a, u));
                    a = a.next
                }
            while (l);
            $i = !1
        }
    }
    function ah() {
        Qf()
    }
    function Qf() {
        Uu = Ji = !1;
        var e = 0;
        El !== 0 && mh() && (e = El);
        for (var t = rt(), l = null, a = Hu; a !== null; ) {
            var n = a.next
              , u = Xf(a, t);
            u === 0 ? (a.next = null,
            l === null ? Hu = n : l.next = n,
            n === null && (Ca = l)) : (l = a,
            (e !== 0 || (u & 3) !== 0) && (Uu = !0)),
            a = n
        }
        Ve !== 0 && Ve !== 5 || En(e),
        El !== 0 && (El = 0)
    }
    function Xf(e, t) {
        for (var l = e.suspendedLanes, a = e.pingedLanes, n = e.expirationTimes, u = e.pendingLanes & -62914561; 0 < u; ) {
            var c = 31 - ot(u)
              , s = 1 << c
              , d = n[c];
            d === -1 ? ((s & l) === 0 || (s & a) !== 0) && (n[c] = C0(s, t)) : d <= t && (e.expiredLanes |= s),
            u &= ~s
        }
        if (t = Ne,
        l = oe,
        l = qn(e, e === t ? l : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1),
        a = e.callbackNode,
        l === 0 || e === t && (pe === 2 || pe === 9) || e.cancelPendingCommit !== null)
            return a !== null && a !== null && ic(a),
            e.callbackNode = null,
            e.callbackPriority = 0;
        if ((l & 3) === 0 || qa(e, l)) {
            if (t = l & -l,
            t === e.callbackPriority)
                return t;
            switch (a !== null && ic(a),
            oc(l)) {
            case 2:
            case 8:
                l = Rr;
                break;
            case 32:
                l = Un;
                break;
            case 268435456:
                l = Br;
                break;
            default:
                l = Un
            }
            return a = Zf.bind(null, e),
            l = cc(l, a),
            e.callbackPriority = t,
            e.callbackNode = l,
            t
        }
        return a !== null && a !== null && ic(a),
        e.callbackPriority = 2,
        e.callbackNode = null,
        2
    }
    function Zf(e, t) {
        if (Ve !== 0 && Ve !== 5)
            return e.callbackNode = null,
            e.callbackPriority = 0,
            null;
        var l = e.callbackNode;
        if (wu() && e.callbackNode !== l)
            return null;
        var a = oe;
        return a = qn(e, e === Ne ? a : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1),
        a === 0 ? null : (zf(e, a, t),
        Xf(e, rt()),
        e.callbackNode != null && e.callbackNode === l ? Zf.bind(null, e) : null)
    }
    function Kf(e, t) {
        if (wu())
            return null;
        zf(e, t, !0)
    }
    function nh() {
        gh(function() {
            (xe & 6) !== 0 ? cc(Or, ah) : Qf()
        })
    }
    function Wi() {
        if (El === 0) {
            var e = va;
            e === 0 && (e = Gn,
            Gn <<= 1,
            (Gn & 261888) === 0 && (Gn = 256)),
            El = e
        }
        return El
    }
    function Jf(e) {
        return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : Xn("" + e)
    }
    function $f(e, t) {
        var l = t.ownerDocument.createElement("input");
        return l.name = t.name,
        l.value = t.value,
        e.id && l.setAttribute("form", e.id),
        t.parentNode.insertBefore(l, t),
        e = new FormData(e),
        l.parentNode.removeChild(l),
        e
    }
    function uh(e, t, l, a, n) {
        if (t === "submit" && l && l.stateNode === n) {
            var u = Jf((n[tt] || null).action)
              , c = a.submitter;
            c && (t = (t = c[tt] || null) ? Jf(t.formAction) : c.getAttribute("formAction"),
            t !== null && (u = t,
            c = null));
            var s = new $n("action","action",null,a,n);
            e.push({
                event: s,
                listeners: [{
                    instance: null,
                    listener: function() {
                        if (a.defaultPrevented) {
                            if (El !== 0) {
                                var d = c ? $f(n, c) : new FormData(n);
                                gi(l, {
                                    pending: !0,
                                    data: d,
                                    method: n.method,
                                    action: u
                                }, null, d)
                            }
                        } else
                            typeof u == "function" && (s.preventDefault(),
                            d = c ? $f(n, c) : new FormData(n),
                            gi(l, {
                                pending: !0,
                                data: d,
                                method: n.method,
                                action: u
                            }, u, d))
                    },
                    currentTarget: n
                }]
            })
        }
    }
    for (var Fi = 0; Fi < Rc.length; Fi++) {
        var Ii = Rc[Fi]
          , ch = Ii.toLowerCase()
          , ih = Ii[0].toUpperCase() + Ii.slice(1);
        Ct(ch, "on" + ih)
    }
    Ct(js, "onAnimationEnd"),
    Ct(Ns, "onAnimationIteration"),
    Ct(Ts, "onAnimationStart"),
    Ct("dblclick", "onDoubleClick"),
    Ct("focusin", "onFocus"),
    Ct("focusout", "onBlur"),
    Ct(E1, "onTransitionRun"),
    Ct(j1, "onTransitionStart"),
    Ct(N1, "onTransitionCancel"),
    Ct(zs, "onTransitionEnd"),
    ta("onMouseEnter", ["mouseout", "mouseover"]),
    ta("onMouseLeave", ["mouseout", "mouseover"]),
    ta("onPointerEnter", ["pointerout", "pointerover"]),
    ta("onPointerLeave", ["pointerout", "pointerover"]),
    Ol("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")),
    Ol("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),
    Ol("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
    Ol("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")),
    Ol("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")),
    Ol("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
    var jn = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" ")
      , rh = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(jn));
    function Wf(e, t) {
        t = (t & 4) !== 0;
        for (var l = 0; l < e.length; l++) {
            var a = e[l]
              , n = a.event;
            a = a.listeners;
            e: {
                var u = void 0;
                if (t)
                    for (var c = a.length - 1; 0 <= c; c--) {
                        var s = a[c]
                          , d = s.instance
                          , b = s.currentTarget;
                        if (s = s.listener,
                        d !== u && n.isPropagationStopped())
                            break e;
                        u = s,
                        n.currentTarget = b;
                        try {
                            u(n)
                        } catch (M) {
                            In(M)
                        }
                        n.currentTarget = null,
                        u = d
                    }
                else
                    for (c = 0; c < a.length; c++) {
                        if (s = a[c],
                        d = s.instance,
                        b = s.currentTarget,
                        s = s.listener,
                        d !== u && n.isPropagationStopped())
                            break e;
                        u = s,
                        n.currentTarget = b;
                        try {
                            u(n)
                        } catch (M) {
                            In(M)
                        }
                        n.currentTarget = null,
                        u = d
                    }
            }
        }
    }
    function re(e, t) {
        var l = t[fc];
        l === void 0 && (l = t[fc] = new Set);
        var a = e + "__bubble";
        l.has(a) || (Ff(t, e, 2, !1),
        l.add(a))
    }
    function Pi(e, t, l) {
        var a = 0;
        t && (a |= 4),
        Ff(l, e, a, t)
    }
    var Gu = "_reactListening" + Math.random().toString(36).slice(2);
    function er(e) {
        if (!e[Gu]) {
            e[Gu] = !0,
            kr.forEach(function(l) {
                l !== "selectionchange" && (rh.has(l) || Pi(l, !1, e),
                Pi(l, !0, e))
            });
            var t = e.nodeType === 9 ? e : e.ownerDocument;
            t === null || t[Gu] || (t[Gu] = !0,
            Pi("selectionchange", !1, t))
        }
    }
    function Ff(e, t, l, a) {
        switch (Td(t)) {
        case 2:
            var n = Hh;
            break;
        case 8:
            n = Uh;
            break;
        default:
            n = vr
        }
        l = n.bind(null, t, l, e),
        n = void 0,
        !bc || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (n = !0),
        a ? n !== void 0 ? e.addEventListener(t, l, {
            capture: !0,
            passive: n
        }) : e.addEventListener(t, l, !0) : n !== void 0 ? e.addEventListener(t, l, {
            passive: n
        }) : e.addEventListener(t, l, !1)
    }
    function tr(e, t, l, a, n) {
        var u = a;
        if ((t & 1) === 0 && (t & 2) === 0 && a !== null)
            e: for (; ; ) {
                if (a === null)
                    return;
                var c = a.tag;
                if (c === 3 || c === 4) {
                    var s = a.stateNode.containerInfo;
                    if (s === n)
                        break;
                    if (c === 4)
                        for (c = a.return; c !== null; ) {
                            var d = c.tag;
                            if ((d === 3 || d === 4) && c.stateNode.containerInfo === n)
                                return;
                            c = c.return
                        }
                    for (; s !== null; ) {
                        if (c = Il(s),
                        c === null)
                            return;
                        if (d = c.tag,
                        d === 5 || d === 6 || d === 26 || d === 27) {
                            a = u = c;
                            continue e
                        }
                        s = s.parentNode
                    }
                }
                a = a.return
            }
        es(function() {
            var b = u
              , M = xc(l)
              , B = [];
            e: {
                var S = _s.get(e);
                if (S !== void 0) {
                    var N = $n
                      , X = e;
                    switch (e) {
                    case "keypress":
                        if (Kn(l) === 0)
                            break e;
                    case "keydown":
                    case "keyup":
                        N = t1;
                        break;
                    case "focusin":
                        X = "focus",
                        N = jc;
                        break;
                    case "focusout":
                        X = "blur",
                        N = jc;
                        break;
                    case "beforeblur":
                    case "afterblur":
                        N = jc;
                        break;
                    case "click":
                        if (l.button === 2)
                            break e;
                    case "auxclick":
                    case "dblclick":
                    case "mousedown":
                    case "mousemove":
                    case "mouseup":
                    case "mouseout":
                    case "mouseover":
                    case "contextmenu":
                        N = as;
                        break;
                    case "drag":
                    case "dragend":
                    case "dragenter":
                    case "dragexit":
                    case "dragleave":
                    case "dragover":
                    case "dragstart":
                    case "drop":
                        N = V0;
                        break;
                    case "touchcancel":
                    case "touchend":
                    case "touchmove":
                    case "touchstart":
                        N = n1;
                        break;
                    case js:
                    case Ns:
                    case Ts:
                        N = Z0;
                        break;
                    case zs:
                        N = c1;
                        break;
                    case "scroll":
                    case "scrollend":
                        N = q0;
                        break;
                    case "wheel":
                        N = r1;
                        break;
                    case "copy":
                    case "cut":
                    case "paste":
                        N = J0;
                        break;
                    case "gotpointercapture":
                    case "lostpointercapture":
                    case "pointercancel":
                    case "pointerdown":
                    case "pointermove":
                    case "pointerout":
                    case "pointerover":
                    case "pointerup":
                        N = us;
                        break;
                    case "toggle":
                    case "beforetoggle":
                        N = o1
                    }
                    var F = (t & 4) !== 0
                      , Ee = !F && (e === "scroll" || e === "scrollend")
                      , x = F ? S !== null ? S + "Capture" : null : S;
                    F = [];
                    for (var v = b, p; v !== null; ) {
                        var R = v;
                        if (p = R.stateNode,
                        R = R.tag,
                        R !== 5 && R !== 26 && R !== 27 || p === null || x === null || (R = Xa(v, x),
                        R != null && F.push(Nn(v, R, p))),
                        Ee)
                            break;
                        v = v.return
                    }
                    0 < F.length && (S = new N(S,X,null,l,M),
                    B.push({
                        event: S,
                        listeners: F
                    }))
                }
            }
            if ((t & 7) === 0) {
                e: {
                    if (S = e === "mouseover" || e === "pointerover",
                    N = e === "mouseout" || e === "pointerout",
                    S && l !== yc && (X = l.relatedTarget || l.fromElement) && (Il(X) || X[Fl]))
                        break e;
                    if ((N || S) && (S = M.window === M ? M : (S = M.ownerDocument) ? S.defaultView || S.parentWindow : window,
                    N ? (X = l.relatedTarget || l.toElement,
                    N = b,
                    X = X ? Il(X) : null,
                    X !== null && (Ee = A(X),
                    F = X.tag,
                    X !== Ee || F !== 5 && F !== 27 && F !== 6) && (X = null)) : (N = null,
                    X = b),
                    N !== X)) {
                        if (F = as,
                        R = "onMouseLeave",
                        x = "onMouseEnter",
                        v = "mouse",
                        (e === "pointerout" || e === "pointerover") && (F = us,
                        R = "onPointerLeave",
                        x = "onPointerEnter",
                        v = "pointer"),
                        Ee = N == null ? S : Qa(N),
                        p = X == null ? S : Qa(X),
                        S = new F(R,v + "leave",N,l,M),
                        S.target = Ee,
                        S.relatedTarget = p,
                        R = null,
                        Il(M) === b && (F = new F(x,v + "enter",X,l,M),
                        F.target = p,
                        F.relatedTarget = Ee,
                        R = F),
                        Ee = R,
                        N && X)
                            t: {
                                for (F = sh,
                                x = N,
                                v = X,
                                p = 0,
                                R = x; R; R = F(R))
                                    p++;
                                R = 0;
                                for (var $ = v; $; $ = F($))
                                    R++;
                                for (; 0 < p - R; )
                                    x = F(x),
                                    p--;
                                for (; 0 < R - p; )
                                    v = F(v),
                                    R--;
                                for (; p--; ) {
                                    if (x === v || v !== null && x === v.alternate) {
                                        F = x;
                                        break t
                                    }
                                    x = F(x),
                                    v = F(v)
                                }
                                F = null
                            }
                        else
                            F = null;
                        N !== null && If(B, S, N, F, !1),
                        X !== null && Ee !== null && If(B, Ee, X, F, !0)
                    }
                }
                e: {
                    if (S = b ? Qa(b) : window,
                    N = S.nodeName && S.nodeName.toLowerCase(),
                    N === "select" || N === "input" && S.type === "file")
                        var ve = hs;
                    else if (fs(S))
                        if (ms)
                            ve = b1;
                        else {
                            ve = x1;
                            var Z = y1
                        }
                    else
                        N = S.nodeName,
                        !N || N.toLowerCase() !== "input" || S.type !== "checkbox" && S.type !== "radio" ? b && gc(b.elementType) && (ve = hs) : ve = p1;
                    if (ve && (ve = ve(e, b))) {
                        ds(B, ve, l, M);
                        break e
                    }
                    Z && Z(e, S, b),
                    e === "focusout" && b && S.type === "number" && b.memoizedProps.value != null && vc(S, "number", S.value)
                }
                switch (Z = b ? Qa(b) : window,
                e) {
                case "focusin":
                    (fs(Z) || Z.contentEditable === "true") && (ia = Z,
                    Cc = b,
                    Pa = null);
                    break;
                case "focusout":
                    Pa = Cc = ia = null;
                    break;
                case "mousedown":
                    Dc = !0;
                    break;
                case "contextmenu":
                case "mouseup":
                case "dragend":
                    Dc = !1,
                    As(B, l, M);
                    break;
                case "selectionchange":
                    if (A1)
                        break;
                case "keydown":
                case "keyup":
                    As(B, l, M)
                }
                var ue;
                if (Tc)
                    e: {
                        switch (e) {
                        case "compositionstart":
                            var fe = "onCompositionStart";
                            break e;
                        case "compositionend":
                            fe = "onCompositionEnd";
                            break e;
                        case "compositionupdate":
                            fe = "onCompositionUpdate";
                            break e
                        }
                        fe = void 0
                    }
                else
                    ca ? ss(e, l) && (fe = "onCompositionEnd") : e === "keydown" && l.keyCode === 229 && (fe = "onCompositionStart");
                fe && (cs && l.locale !== "ko" && (ca || fe !== "onCompositionStart" ? fe === "onCompositionEnd" && ca && (ue = ts()) : (il = M,
                Sc = "value"in il ? il.value : il.textContent,
                ca = !0)),
                Z = Lu(b, fe),
                0 < Z.length && (fe = new ns(fe,e,null,l,M),
                B.push({
                    event: fe,
                    listeners: Z
                }),
                ue ? fe.data = ue : (ue = os(l),
                ue !== null && (fe.data = ue)))),
                (ue = d1 ? h1(e, l) : m1(e, l)) && (fe = Lu(b, "onBeforeInput"),
                0 < fe.length && (Z = new ns("onBeforeInput","beforeinput",null,l,M),
                B.push({
                    event: Z,
                    listeners: fe
                }),
                Z.data = ue)),
                uh(B, e, b, l, M)
            }
            Wf(B, t)
        })
    }
    function Nn(e, t, l) {
        return {
            instance: e,
            listener: t,
            currentTarget: l
        }
    }
    function Lu(e, t) {
        for (var l = t + "Capture", a = []; e !== null; ) {
            var n = e
              , u = n.stateNode;
            if (n = n.tag,
            n !== 5 && n !== 26 && n !== 27 || u === null || (n = Xa(e, l),
            n != null && a.unshift(Nn(e, n, u)),
            n = Xa(e, t),
            n != null && a.push(Nn(e, n, u))),
            e.tag === 3)
                return a;
            e = e.return
        }
        return []
    }
    function sh(e) {
        if (e === null)
            return null;
        do
            e = e.return;
        while (e && e.tag !== 5 && e.tag !== 27);
        return e || null
    }
    function If(e, t, l, a, n) {
        for (var u = t._reactName, c = []; l !== null && l !== a; ) {
            var s = l
              , d = s.alternate
              , b = s.stateNode;
            if (s = s.tag,
            d !== null && d === a)
                break;
            s !== 5 && s !== 26 && s !== 27 || b === null || (d = b,
            n ? (b = Xa(l, u),
            b != null && c.unshift(Nn(l, b, d))) : n || (b = Xa(l, u),
            b != null && c.push(Nn(l, b, d)))),
            l = l.return
        }
        c.length !== 0 && e.push({
            event: t,
            listeners: c
        })
    }
    var oh = /\r\n?/g
      , fh = /\u0000|\uFFFD/g;
    function Pf(e) {
        return (typeof e == "string" ? e : "" + e).replace(oh, `
`).replace(fh, "")
    }
    function ed(e, t) {
        return t = Pf(t),
        Pf(e) === t
    }
    function Ae(e, t, l, a, n, u) {
        switch (l) {
        case "children":
            typeof a == "string" ? t === "body" || t === "textarea" && a === "" || aa(e, a) : (typeof a == "number" || typeof a == "bigint") && t !== "body" && aa(e, "" + a);
            break;
        case "className":
            Vn(e, "class", a);
            break;
        case "tabIndex":
            Vn(e, "tabindex", a);
            break;
        case "dir":
        case "role":
        case "viewBox":
        case "width":
        case "height":
            Vn(e, l, a);
            break;
        case "style":
            Ir(e, a, u);
            break;
        case "data":
            if (t !== "object") {
                Vn(e, "data", a);
                break
            }
        case "src":
        case "href":
            if (a === "" && (t !== "a" || l !== "href")) {
                e.removeAttribute(l);
                break
            }
            if (a == null || typeof a == "function" || typeof a == "symbol" || typeof a == "boolean") {
                e.removeAttribute(l);
                break
            }
            a = Xn("" + a),
            e.setAttribute(l, a);
            break;
        case "action":
        case "formAction":
            if (typeof a == "function") {
                e.setAttribute(l, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
                break
            } else
                typeof u == "function" && (l === "formAction" ? (t !== "input" && Ae(e, t, "name", n.name, n, null),
                Ae(e, t, "formEncType", n.formEncType, n, null),
                Ae(e, t, "formMethod", n.formMethod, n, null),
                Ae(e, t, "formTarget", n.formTarget, n, null)) : (Ae(e, t, "encType", n.encType, n, null),
                Ae(e, t, "method", n.method, n, null),
                Ae(e, t, "target", n.target, n, null)));
            if (a == null || typeof a == "symbol" || typeof a == "boolean") {
                e.removeAttribute(l);
                break
            }
            a = Xn("" + a),
            e.setAttribute(l, a);
            break;
        case "onClick":
            a != null && (e.onclick = Yt);
            break;
        case "onScroll":
            a != null && re("scroll", e);
            break;
        case "onScrollEnd":
            a != null && re("scrollend", e);
            break;
        case "dangerouslySetInnerHTML":
            if (a != null) {
                if (typeof a != "object" || !("__html"in a))
                    throw Error(o(61));
                if (l = a.__html,
                l != null) {
                    if (n.children != null)
                        throw Error(o(60));
                    e.innerHTML = l
                }
            }
            break;
        case "multiple":
            e.multiple = a && typeof a != "function" && typeof a != "symbol";
            break;
        case "muted":
            e.muted = a && typeof a != "function" && typeof a != "symbol";
            break;
        case "suppressContentEditableWarning":
        case "suppressHydrationWarning":
        case "defaultValue":
        case "defaultChecked":
        case "innerHTML":
        case "ref":
            break;
        case "autoFocus":
            break;
        case "xlinkHref":
            if (a == null || typeof a == "function" || typeof a == "boolean" || typeof a == "symbol") {
                e.removeAttribute("xlink:href");
                break
            }
            l = Xn("" + a),
            e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", l);
            break;
        case "contentEditable":
        case "spellCheck":
        case "draggable":
        case "value":
        case "autoReverse":
        case "externalResourcesRequired":
        case "focusable":
        case "preserveAlpha":
            a != null && typeof a != "function" && typeof a != "symbol" ? e.setAttribute(l, "" + a) : e.removeAttribute(l);
            break;
        case "inert":
        case "allowFullScreen":
        case "async":
        case "autoPlay":
        case "controls":
        case "default":
        case "defer":
        case "disabled":
        case "disablePictureInPicture":
        case "disableRemotePlayback":
        case "formNoValidate":
        case "hidden":
        case "loop":
        case "noModule":
        case "noValidate":
        case "open":
        case "playsInline":
        case "readOnly":
        case "required":
        case "reversed":
        case "scoped":
        case "seamless":
        case "itemScope":
            a && typeof a != "function" && typeof a != "symbol" ? e.setAttribute(l, "") : e.removeAttribute(l);
            break;
        case "capture":
        case "download":
            a === !0 ? e.setAttribute(l, "") : a !== !1 && a != null && typeof a != "function" && typeof a != "symbol" ? e.setAttribute(l, a) : e.removeAttribute(l);
            break;
        case "cols":
        case "rows":
        case "size":
        case "span":
            a != null && typeof a != "function" && typeof a != "symbol" && !isNaN(a) && 1 <= a ? e.setAttribute(l, a) : e.removeAttribute(l);
            break;
        case "rowSpan":
        case "start":
            a == null || typeof a == "function" || typeof a == "symbol" || isNaN(a) ? e.removeAttribute(l) : e.setAttribute(l, a);
            break;
        case "popover":
            re("beforetoggle", e),
            re("toggle", e),
            kn(e, "popover", a);
            break;
        case "xlinkActuate":
            Lt(e, "http://www.w3.org/1999/xlink", "xlink:actuate", a);
            break;
        case "xlinkArcrole":
            Lt(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", a);
            break;
        case "xlinkRole":
            Lt(e, "http://www.w3.org/1999/xlink", "xlink:role", a);
            break;
        case "xlinkShow":
            Lt(e, "http://www.w3.org/1999/xlink", "xlink:show", a);
            break;
        case "xlinkTitle":
            Lt(e, "http://www.w3.org/1999/xlink", "xlink:title", a);
            break;
        case "xlinkType":
            Lt(e, "http://www.w3.org/1999/xlink", "xlink:type", a);
            break;
        case "xmlBase":
            Lt(e, "http://www.w3.org/XML/1998/namespace", "xml:base", a);
            break;
        case "xmlLang":
            Lt(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", a);
            break;
        case "xmlSpace":
            Lt(e, "http://www.w3.org/XML/1998/namespace", "xml:space", a);
            break;
        case "is":
            kn(e, "is", a);
            break;
        case "innerText":
        case "textContent":
            break;
        default:
            (!(2 < l.length) || l[0] !== "o" && l[0] !== "O" || l[1] !== "n" && l[1] !== "N") && (l = L0.get(l) || l,
            kn(e, l, a))
        }
    }
    function lr(e, t, l, a, n, u) {
        switch (l) {
        case "style":
            Ir(e, a, u);
            break;
        case "dangerouslySetInnerHTML":
            if (a != null) {
                if (typeof a != "object" || !("__html"in a))
                    throw Error(o(61));
                if (l = a.__html,
                l != null) {
                    if (n.children != null)
                        throw Error(o(60));
                    e.innerHTML = l
                }
            }
            break;
        case "children":
            typeof a == "string" ? aa(e, a) : (typeof a == "number" || typeof a == "bigint") && aa(e, "" + a);
            break;
        case "onScroll":
            a != null && re("scroll", e);
            break;
        case "onScrollEnd":
            a != null && re("scrollend", e);
            break;
        case "onClick":
            a != null && (e.onclick = Yt);
            break;
        case "suppressContentEditableWarning":
        case "suppressHydrationWarning":
        case "innerHTML":
        case "ref":
            break;
        case "innerText":
        case "textContent":
            break;
        default:
            if (!Vr.hasOwnProperty(l))
                e: {
                    if (l[0] === "o" && l[1] === "n" && (n = l.endsWith("Capture"),
                    t = l.slice(2, n ? l.length - 7 : void 0),
                    u = e[tt] || null,
                    u = u != null ? u[l] : null,
                    typeof u == "function" && e.removeEventListener(t, u, n),
                    typeof a == "function")) {
                        typeof u != "function" && u !== null && (l in e ? e[l] = null : e.hasAttribute(l) && e.removeAttribute(l)),
                        e.addEventListener(t, a, n);
                        break e
                    }
                    l in e ? e[l] = a : a === !0 ? e.setAttribute(l, "") : kn(e, l, a)
                }
        }
    }
    function Ie(e, t, l) {
        switch (t) {
        case "div":
        case "span":
        case "svg":
        case "path":
        case "a":
        case "g":
        case "p":
        case "li":
            break;
        case "img":
            re("error", e),
            re("load", e);
            var a = !1, n = !1, u;
            for (u in l)
                if (l.hasOwnProperty(u)) {
                    var c = l[u];
                    if (c != null)
                        switch (u) {
                        case "src":
                            a = !0;
                            break;
                        case "srcSet":
                            n = !0;
                            break;
                        case "children":
                        case "dangerouslySetInnerHTML":
                            throw Error(o(137, t));
                        default:
                            Ae(e, t, u, c, l, null)
                        }
                }
            n && Ae(e, t, "srcSet", l.srcSet, l, null),
            a && Ae(e, t, "src", l.src, l, null);
            return;
        case "input":
            re("invalid", e);
            var s = u = c = n = null
              , d = null
              , b = null;
            for (a in l)
                if (l.hasOwnProperty(a)) {
                    var M = l[a];
                    if (M != null)
                        switch (a) {
                        case "name":
                            n = M;
                            break;
                        case "type":
                            c = M;
                            break;
                        case "checked":
                            d = M;
                            break;
                        case "defaultChecked":
                            b = M;
                            break;
                        case "value":
                            u = M;
                            break;
                        case "defaultValue":
                            s = M;
                            break;
                        case "children":
                        case "dangerouslySetInnerHTML":
                            if (M != null)
                                throw Error(o(137, t));
                            break;
                        default:
                            Ae(e, t, a, M, l, null)
                        }
                }
            Jr(e, u, s, d, b, c, n, !1);
            return;
        case "select":
            re("invalid", e),
            a = c = u = null;
            for (n in l)
                if (l.hasOwnProperty(n) && (s = l[n],
                s != null))
                    switch (n) {
                    case "value":
                        u = s;
                        break;
                    case "defaultValue":
                        c = s;
                        break;
                    case "multiple":
                        a = s;
                    default:
                        Ae(e, t, n, s, l, null)
                    }
            t = u,
            l = c,
            e.multiple = !!a,
            t != null ? la(e, !!a, t, !1) : l != null && la(e, !!a, l, !0);
            return;
        case "textarea":
            re("invalid", e),
            u = n = a = null;
            for (c in l)
                if (l.hasOwnProperty(c) && (s = l[c],
                s != null))
                    switch (c) {
                    case "value":
                        a = s;
                        break;
                    case "defaultValue":
                        n = s;
                        break;
                    case "children":
                        u = s;
                        break;
                    case "dangerouslySetInnerHTML":
                        if (s != null)
                            throw Error(o(91));
                        break;
                    default:
                        Ae(e, t, c, s, l, null)
                    }
            Wr(e, a, n, u);
            return;
        case "option":
            for (d in l)
                l.hasOwnProperty(d) && (a = l[d],
                a != null) && (d === "selected" ? e.selected = a && typeof a != "function" && typeof a != "symbol" : Ae(e, t, d, a, l, null));
            return;
        case "dialog":
            re("beforetoggle", e),
            re("toggle", e),
            re("cancel", e),
            re("close", e);
            break;
        case "iframe":
        case "object":
            re("load", e);
            break;
        case "video":
        case "audio":
            for (a = 0; a < jn.length; a++)
                re(jn[a], e);
            break;
        case "image":
            re("error", e),
            re("load", e);
            break;
        case "details":
            re("toggle", e);
            break;
        case "embed":
        case "source":
        case "link":
            re("error", e),
            re("load", e);
        case "area":
        case "base":
        case "br":
        case "col":
        case "hr":
        case "keygen":
        case "meta":
        case "param":
        case "track":
        case "wbr":
        case "menuitem":
            for (b in l)
                if (l.hasOwnProperty(b) && (a = l[b],
                a != null))
                    switch (b) {
                    case "children":
                    case "dangerouslySetInnerHTML":
                        throw Error(o(137, t));
                    default:
                        Ae(e, t, b, a, l, null)
                    }
            return;
        default:
            if (gc(t)) {
                for (M in l)
                    l.hasOwnProperty(M) && (a = l[M],
                    a !== void 0 && lr(e, t, M, a, l, void 0));
                return
            }
        }
        for (s in l)
            l.hasOwnProperty(s) && (a = l[s],
            a != null && Ae(e, t, s, a, l, null))
    }
    function dh(e, t, l, a) {
        switch (t) {
        case "div":
        case "span":
        case "svg":
        case "path":
        case "a":
        case "g":
        case "p":
        case "li":
            break;
        case "input":
            var n = null
              , u = null
              , c = null
              , s = null
              , d = null
              , b = null
              , M = null;
            for (N in l) {
                var B = l[N];
                if (l.hasOwnProperty(N) && B != null)
                    switch (N) {
                    case "checked":
                        break;
                    case "value":
                        break;
                    case "defaultValue":
                        d = B;
                    default:
                        a.hasOwnProperty(N) || Ae(e, t, N, null, a, B)
                    }
            }
            for (var S in a) {
                var N = a[S];
                if (B = l[S],
                a.hasOwnProperty(S) && (N != null || B != null))
                    switch (S) {
                    case "type":
                        u = N;
                        break;
                    case "name":
                        n = N;
                        break;
                    case "checked":
                        b = N;
                        break;
                    case "defaultChecked":
                        M = N;
                        break;
                    case "value":
                        c = N;
                        break;
                    case "defaultValue":
                        s = N;
                        break;
                    case "children":
                    case "dangerouslySetInnerHTML":
                        if (N != null)
                            throw Error(o(137, t));
                        break;
                    default:
                        N !== B && Ae(e, t, S, N, a, B)
                    }
            }
            mc(e, c, s, d, b, M, u, n);
            return;
        case "select":
            N = c = s = S = null;
            for (u in l)
                if (d = l[u],
                l.hasOwnProperty(u) && d != null)
                    switch (u) {
                    case "value":
                        break;
                    case "multiple":
                        N = d;
                    default:
                        a.hasOwnProperty(u) || Ae(e, t, u, null, a, d)
                    }
            for (n in a)
                if (u = a[n],
                d = l[n],
                a.hasOwnProperty(n) && (u != null || d != null))
                    switch (n) {
                    case "value":
                        S = u;
                        break;
                    case "defaultValue":
                        s = u;
                        break;
                    case "multiple":
                        c = u;
                    default:
                        u !== d && Ae(e, t, n, u, a, d)
                    }
            t = s,
            l = c,
            a = N,
            S != null ? la(e, !!l, S, !1) : !!a != !!l && (t != null ? la(e, !!l, t, !0) : la(e, !!l, l ? [] : "", !1));
            return;
        case "textarea":
            N = S = null;
            for (s in l)
                if (n = l[s],
                l.hasOwnProperty(s) && n != null && !a.hasOwnProperty(s))
                    switch (s) {
                    case "value":
                        break;
                    case "children":
                        break;
                    default:
                        Ae(e, t, s, null, a, n)
                    }
            for (c in a)
                if (n = a[c],
                u = l[c],
                a.hasOwnProperty(c) && (n != null || u != null))
                    switch (c) {
                    case "value":
                        S = n;
                        break;
                    case "defaultValue":
                        N = n;
                        break;
                    case "children":
                        break;
                    case "dangerouslySetInnerHTML":
                        if (n != null)
                            throw Error(o(91));
                        break;
                    default:
                        n !== u && Ae(e, t, c, n, a, u)
                    }
            $r(e, S, N);
            return;
        case "option":
            for (var X in l)
                S = l[X],
                l.hasOwnProperty(X) && S != null && !a.hasOwnProperty(X) && (X === "selected" ? e.selected = !1 : Ae(e, t, X, null, a, S));
            for (d in a)
                S = a[d],
                N = l[d],
                a.hasOwnProperty(d) && S !== N && (S != null || N != null) && (d === "selected" ? e.selected = S && typeof S != "function" && typeof S != "symbol" : Ae(e, t, d, S, a, N));
            return;
        case "img":
        case "link":
        case "area":
        case "base":
        case "br":
        case "col":
        case "embed":
        case "hr":
        case "keygen":
        case "meta":
        case "param":
        case "source":
        case "track":
        case "wbr":
        case "menuitem":
            for (var F in l)
                S = l[F],
                l.hasOwnProperty(F) && S != null && !a.hasOwnProperty(F) && Ae(e, t, F, null, a, S);
            for (b in a)
                if (S = a[b],
                N = l[b],
                a.hasOwnProperty(b) && S !== N && (S != null || N != null))
                    switch (b) {
                    case "children":
                    case "dangerouslySetInnerHTML":
                        if (S != null)
                            throw Error(o(137, t));
                        break;
                    default:
                        Ae(e, t, b, S, a, N)
                    }
            return;
        default:
            if (gc(t)) {
                for (var Ee in l)
                    S = l[Ee],
                    l.hasOwnProperty(Ee) && S !== void 0 && !a.hasOwnProperty(Ee) && lr(e, t, Ee, void 0, a, S);
                for (M in a)
                    S = a[M],
                    N = l[M],
                    !a.hasOwnProperty(M) || S === N || S === void 0 && N === void 0 || lr(e, t, M, S, a, N);
                return
            }
        }
        for (var x in l)
            S = l[x],
            l.hasOwnProperty(x) && S != null && !a.hasOwnProperty(x) && Ae(e, t, x, null, a, S);
        for (B in a)
            S = a[B],
            N = l[B],
            !a.hasOwnProperty(B) || S === N || S == null && N == null || Ae(e, t, B, S, a, N)
    }
    function td(e) {
        switch (e) {
        case "css":
        case "script":
        case "font":
        case "img":
        case "image":
        case "input":
        case "link":
            return !0;
        default:
            return !1
        }
    }
    function hh() {
        if (typeof performance.getEntriesByType == "function") {
            for (var e = 0, t = 0, l = performance.getEntriesByType("resource"), a = 0; a < l.length; a++) {
                var n = l[a]
                  , u = n.transferSize
                  , c = n.initiatorType
                  , s = n.duration;
                if (u && s && td(c)) {
                    for (c = 0,
                    s = n.responseEnd,
                    a += 1; a < l.length; a++) {
                        var d = l[a]
                          , b = d.startTime;
                        if (b > s)
                            break;
                        var M = d.transferSize
                          , B = d.initiatorType;
                        M && td(B) && (d = d.responseEnd,
                        c += M * (d < s ? 1 : (s - b) / (d - b)))
                    }
                    if (--a,
                    t += 8 * (u + c) / (n.duration / 1e3),
                    e++,
                    10 < e)
                        break
                }
            }
            if (0 < e)
                return t / e / 1e6
        }
        return navigator.connection && (e = navigator.connection.downlink,
        typeof e == "number") ? e : 5
    }
    var ar = null
      , nr = null;
    function Yu(e) {
        return e.nodeType === 9 ? e : e.ownerDocument
    }
    function ld(e) {
        switch (e) {
        case "http://www.w3.org/2000/svg":
            return 1;
        case "http://www.w3.org/1998/Math/MathML":
            return 2;
        default:
            return 0
        }
    }
    function ad(e, t) {
        if (e === 0)
            switch (t) {
            case "svg":
                return 1;
            case "math":
                return 2;
            default:
                return 0
            }
        return e === 1 && t === "foreignObject" ? 0 : e
    }
    function ur(e, t) {
        return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null
    }
    var cr = null;
    function mh() {
        var e = window.event;
        return e && e.type === "popstate" ? e === cr ? !1 : (cr = e,
        !0) : (cr = null,
        !1)
    }
    var nd = typeof setTimeout == "function" ? setTimeout : void 0
      , vh = typeof clearTimeout == "function" ? clearTimeout : void 0
      , ud = typeof Promise == "function" ? Promise : void 0
      , gh = typeof queueMicrotask == "function" ? queueMicrotask : typeof ud < "u" ? function(e) {
        return ud.resolve(null).then(e).catch(yh)
    }
    : nd;
    function yh(e) {
        setTimeout(function() {
            throw e
        })
    }
    function jl(e) {
        return e === "head"
    }
    function cd(e, t) {
        var l = t
          , a = 0;
        do {
            var n = l.nextSibling;
            if (e.removeChild(l),
            n && n.nodeType === 8)
                if (l = n.data,
                l === "/$" || l === "/&") {
                    if (a === 0) {
                        e.removeChild(n),
                        Ba(t);
                        return
                    }
                    a--
                } else if (l === "$" || l === "$?" || l === "$~" || l === "$!" || l === "&")
                    a++;
                else if (l === "html")
                    Tn(e.ownerDocument.documentElement);
                else if (l === "head") {
                    l = e.ownerDocument.head,
                    Tn(l);
                    for (var u = l.firstChild; u; ) {
                        var c = u.nextSibling
                          , s = u.nodeName;
                        u[Va] || s === "SCRIPT" || s === "STYLE" || s === "LINK" && u.rel.toLowerCase() === "stylesheet" || l.removeChild(u),
                        u = c
                    }
                } else
                    l === "body" && Tn(e.ownerDocument.body);
            l = n
        } while (l);
        Ba(t)
    }
    function id(e, t) {
        var l = e;
        e = 0;
        do {
            var a = l.nextSibling;
            if (l.nodeType === 1 ? t ? (l._stashedDisplay = l.style.display,
            l.style.display = "none") : (l.style.display = l._stashedDisplay || "",
            l.getAttribute("style") === "" && l.removeAttribute("style")) : l.nodeType === 3 && (t ? (l._stashedText = l.nodeValue,
            l.nodeValue = "") : l.nodeValue = l._stashedText || ""),
            a && a.nodeType === 8)
                if (l = a.data,
                l === "/$") {
                    if (e === 0)
                        break;
                    e--
                } else
                    l !== "$" && l !== "$?" && l !== "$~" && l !== "$!" || e++;
            l = a
        } while (l)
    }
    function ir(e) {
        var t = e.firstChild;
        for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
            var l = t;
            switch (t = t.nextSibling,
            l.nodeName) {
            case "HTML":
            case "HEAD":
            case "BODY":
                ir(l),
                dc(l);
                continue;
            case "SCRIPT":
            case "STYLE":
                continue;
            case "LINK":
                if (l.rel.toLowerCase() === "stylesheet")
                    continue
            }
            e.removeChild(l)
        }
    }
    function xh(e, t, l, a) {
        for (; e.nodeType === 1; ) {
            var n = l;
            if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
                if (!a && (e.nodeName !== "INPUT" || e.type !== "hidden"))
                    break
            } else if (a) {
                if (!e[Va])
                    switch (t) {
                    case "meta":
                        if (!e.hasAttribute("itemprop"))
                            break;
                        return e;
                    case "link":
                        if (u = e.getAttribute("rel"),
                        u === "stylesheet" && e.hasAttribute("data-precedence"))
                            break;
                        if (u !== n.rel || e.getAttribute("href") !== (n.href == null || n.href === "" ? null : n.href) || e.getAttribute("crossorigin") !== (n.crossOrigin == null ? null : n.crossOrigin) || e.getAttribute("title") !== (n.title == null ? null : n.title))
                            break;
                        return e;
                    case "style":
                        if (e.hasAttribute("data-precedence"))
                            break;
                        return e;
                    case "script":
                        if (u = e.getAttribute("src"),
                        (u !== (n.src == null ? null : n.src) || e.getAttribute("type") !== (n.type == null ? null : n.type) || e.getAttribute("crossorigin") !== (n.crossOrigin == null ? null : n.crossOrigin)) && u && e.hasAttribute("async") && !e.hasAttribute("itemprop"))
                            break;
                        return e;
                    default:
                        return e
                    }
            } else if (t === "input" && e.type === "hidden") {
                var u = n.name == null ? null : "" + n.name;
                if (n.type === "hidden" && e.getAttribute("name") === u)
                    return e
            } else
                return e;
            if (e = Tt(e.nextSibling),
            e === null)
                break
        }
        return null
    }
    function ph(e, t, l) {
        if (t === "")
            return null;
        for (; e.nodeType !== 3; )
            if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !l || (e = Tt(e.nextSibling),
            e === null))
                return null;
        return e
    }
    function rd(e, t) {
        for (; e.nodeType !== 8; )
            if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = Tt(e.nextSibling),
            e === null))
                return null;
        return e
    }
    function rr(e) {
        return e.data === "$?" || e.data === "$~"
    }
    function sr(e) {
        return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading"
    }
    function bh(e, t) {
        var l = e.ownerDocument;
        if (e.data === "$~")
            e._reactRetry = t;
        else if (e.data !== "$?" || l.readyState !== "loading")
            t();
        else {
            var a = function() {
                t(),
                l.removeEventListener("DOMContentLoaded", a)
            };
            l.addEventListener("DOMContentLoaded", a),
            e._reactRetry = a
        }
    }
    function Tt(e) {
        for (; e != null; e = e.nextSibling) {
            var t = e.nodeType;
            if (t === 1 || t === 3)
                break;
            if (t === 8) {
                if (t = e.data,
                t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&" || t === "F!" || t === "F")
                    break;
                if (t === "/$" || t === "/&")
                    return null
            }
        }
        return e
    }
    var or = null;
    function sd(e) {
        e = e.nextSibling;
        for (var t = 0; e; ) {
            if (e.nodeType === 8) {
                var l = e.data;
                if (l === "/$" || l === "/&") {
                    if (t === 0)
                        return Tt(e.nextSibling);
                    t--
                } else
                    l !== "$" && l !== "$!" && l !== "$?" && l !== "$~" && l !== "&" || t++
            }
            e = e.nextSibling
        }
        return null
    }
    function od(e) {
        e = e.previousSibling;
        for (var t = 0; e; ) {
            if (e.nodeType === 8) {
                var l = e.data;
                if (l === "$" || l === "$!" || l === "$?" || l === "$~" || l === "&") {
                    if (t === 0)
                        return e;
                    t--
                } else
                    l !== "/$" && l !== "/&" || t++
            }
            e = e.previousSibling
        }
        return null
    }
    function fd(e, t, l) {
        switch (t = Yu(l),
        e) {
        case "html":
            if (e = t.documentElement,
            !e)
                throw Error(o(452));
            return e;
        case "head":
            if (e = t.head,
            !e)
                throw Error(o(453));
            return e;
        case "body":
            if (e = t.body,
            !e)
                throw Error(o(454));
            return e;
        default:
            throw Error(o(451))
        }
    }
    function Tn(e) {
        for (var t = e.attributes; t.length; )
            e.removeAttributeNode(t[0]);
        dc(e)
    }
    var zt = new Map
      , dd = new Set;
    function qu(e) {
        return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument
    }
    var ll = U.d;
    U.d = {
        f: Sh,
        r: Ah,
        D: Eh,
        C: jh,
        L: Nh,
        m: Th,
        X: _h,
        S: zh,
        M: Mh
    };
    function Sh() {
        var e = ll.f()
          , t = Ou();
        return e || t
    }
    function Ah(e) {
        var t = Pl(e);
        t !== null && t.tag === 5 && t.type === "form" ? _o(t) : ll.r(e)
    }
    var Da = typeof document > "u" ? null : document;
    function hd(e, t, l) {
        var a = Da;
        if (a && typeof t == "string" && t) {
            var n = pt(t);
            n = 'link[rel="' + e + '"][href="' + n + '"]',
            typeof l == "string" && (n += '[crossorigin="' + l + '"]'),
            dd.has(n) || (dd.add(n),
            e = {
                rel: e,
                crossOrigin: l,
                href: t
            },
            a.querySelector(n) === null && (t = a.createElement("link"),
            Ie(t, "link", e),
            Ze(t),
            a.head.appendChild(t)))
        }
    }
    function Eh(e) {
        ll.D(e),
        hd("dns-prefetch", e, null)
    }
    function jh(e, t) {
        ll.C(e, t),
        hd("preconnect", e, t)
    }
    function Nh(e, t, l) {
        ll.L(e, t, l);
        var a = Da;
        if (a && e && t) {
            var n = 'link[rel="preload"][as="' + pt(t) + '"]';
            t === "image" && l && l.imageSrcSet ? (n += '[imagesrcset="' + pt(l.imageSrcSet) + '"]',
            typeof l.imageSizes == "string" && (n += '[imagesizes="' + pt(l.imageSizes) + '"]')) : n += '[href="' + pt(e) + '"]';
            var u = n;
            switch (t) {
            case "style":
                u = Oa(e);
                break;
            case "script":
                u = Ra(e)
            }
            zt.has(u) || (e = C({
                rel: "preload",
                href: t === "image" && l && l.imageSrcSet ? void 0 : e,
                as: t
            }, l),
            zt.set(u, e),
            a.querySelector(n) !== null || t === "style" && a.querySelector(zn(u)) || t === "script" && a.querySelector(_n(u)) || (t = a.createElement("link"),
            Ie(t, "link", e),
            Ze(t),
            a.head.appendChild(t)))
        }
    }
    function Th(e, t) {
        ll.m(e, t);
        var l = Da;
        if (l && e) {
            var a = t && typeof t.as == "string" ? t.as : "script"
              , n = 'link[rel="modulepreload"][as="' + pt(a) + '"][href="' + pt(e) + '"]'
              , u = n;
            switch (a) {
            case "audioworklet":
            case "paintworklet":
            case "serviceworker":
            case "sharedworker":
            case "worker":
            case "script":
                u = Ra(e)
            }
            if (!zt.has(u) && (e = C({
                rel: "modulepreload",
                href: e
            }, t),
            zt.set(u, e),
            l.querySelector(n) === null)) {
                switch (a) {
                case "audioworklet":
                case "paintworklet":
                case "serviceworker":
                case "sharedworker":
                case "worker":
                case "script":
                    if (l.querySelector(_n(u)))
                        return
                }
                a = l.createElement("link"),
                Ie(a, "link", e),
                Ze(a),
                l.head.appendChild(a)
            }
        }
    }
    function zh(e, t, l) {
        ll.S(e, t, l);
        var a = Da;
        if (a && e) {
            var n = ea(a).hoistableStyles
              , u = Oa(e);
            t = t || "default";
            var c = n.get(u);
            if (!c) {
                var s = {
                    loading: 0,
                    preload: null
                };
                if (c = a.querySelector(zn(u)))
                    s.loading = 5;
                else {
                    e = C({
                        rel: "stylesheet",
                        href: e,
                        "data-precedence": t
                    }, l),
                    (l = zt.get(u)) && fr(e, l);
                    var d = c = a.createElement("link");
                    Ze(d),
                    Ie(d, "link", e),
                    d._p = new Promise(function(b, M) {
                        d.onload = b,
                        d.onerror = M
                    }
                    ),
                    d.addEventListener("load", function() {
                        s.loading |= 1
                    }),
                    d.addEventListener("error", function() {
                        s.loading |= 2
                    }),
                    s.loading |= 4,
                    ku(c, t, a)
                }
                c = {
                    type: "stylesheet",
                    instance: c,
                    count: 1,
                    state: s
                },
                n.set(u, c)
            }
        }
    }
    function _h(e, t) {
        ll.X(e, t);
        var l = Da;
        if (l && e) {
            var a = ea(l).hoistableScripts
              , n = Ra(e)
              , u = a.get(n);
            u || (u = l.querySelector(_n(n)),
            u || (e = C({
                src: e,
                async: !0
            }, t),
            (t = zt.get(n)) && dr(e, t),
            u = l.createElement("script"),
            Ze(u),
            Ie(u, "link", e),
            l.head.appendChild(u)),
            u = {
                type: "script",
                instance: u,
                count: 1,
                state: null
            },
            a.set(n, u))
        }
    }
    function Mh(e, t) {
        ll.M(e, t);
        var l = Da;
        if (l && e) {
            var a = ea(l).hoistableScripts
              , n = Ra(e)
              , u = a.get(n);
            u || (u = l.querySelector(_n(n)),
            u || (e = C({
                src: e,
                async: !0,
                type: "module"
            }, t),
            (t = zt.get(n)) && dr(e, t),
            u = l.createElement("script"),
            Ze(u),
            Ie(u, "link", e),
            l.head.appendChild(u)),
            u = {
                type: "script",
                instance: u,
                count: 1,
                state: null
            },
            a.set(n, u))
        }
    }
    function md(e, t, l, a) {
        var n = (n = te.current) ? qu(n) : null;
        if (!n)
            throw Error(o(446));
        switch (e) {
        case "meta":
        case "title":
            return null;
        case "style":
            return typeof l.precedence == "string" && typeof l.href == "string" ? (t = Oa(l.href),
            l = ea(n).hoistableStyles,
            a = l.get(t),
            a || (a = {
                type: "style",
                instance: null,
                count: 0,
                state: null
            },
            l.set(t, a)),
            a) : {
                type: "void",
                instance: null,
                count: 0,
                state: null
            };
        case "link":
            if (l.rel === "stylesheet" && typeof l.href == "string" && typeof l.precedence == "string") {
                e = Oa(l.href);
                var u = ea(n).hoistableStyles
                  , c = u.get(e);
                if (c || (n = n.ownerDocument || n,
                c = {
                    type: "stylesheet",
                    instance: null,
                    count: 0,
                    state: {
                        loading: 0,
                        preload: null
                    }
                },
                u.set(e, c),
                (u = n.querySelector(zn(e))) && !u._p && (c.instance = u,
                c.state.loading = 5),
                zt.has(e) || (l = {
                    rel: "preload",
                    as: "style",
                    href: l.href,
                    crossOrigin: l.crossOrigin,
                    integrity: l.integrity,
                    media: l.media,
                    hrefLang: l.hrefLang,
                    referrerPolicy: l.referrerPolicy
                },
                zt.set(e, l),
                u || Ch(n, e, l, c.state))),
                t && a === null)
                    throw Error(o(528, ""));
                return c
            }
            if (t && a !== null)
                throw Error(o(529, ""));
            return null;
        case "script":
            return t = l.async,
            l = l.src,
            typeof l == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Ra(l),
            l = ea(n).hoistableScripts,
            a = l.get(t),
            a || (a = {
                type: "script",
                instance: null,
                count: 0,
                state: null
            },
            l.set(t, a)),
            a) : {
                type: "void",
                instance: null,
                count: 0,
                state: null
            };
        default:
            throw Error(o(444, e))
        }
    }
    function Oa(e) {
        return 'href="' + pt(e) + '"'
    }
    function zn(e) {
        return 'link[rel="stylesheet"][' + e + "]"
    }
    function vd(e) {
        return C({}, e, {
            "data-precedence": e.precedence,
            precedence: null
        })
    }
    function Ch(e, t, l, a) {
        e.querySelector('link[rel="preload"][as="style"][' + t + "]") ? a.loading = 1 : (t = e.createElement("link"),
        a.preload = t,
        t.addEventListener("load", function() {
            return a.loading |= 1
        }),
        t.addEventListener("error", function() {
            return a.loading |= 2
        }),
        Ie(t, "link", l),
        Ze(t),
        e.head.appendChild(t))
    }
    function Ra(e) {
        return '[src="' + pt(e) + '"]'
    }
    function _n(e) {
        return "script[async]" + e
    }
    function gd(e, t, l) {
        if (t.count++,
        t.instance === null)
            switch (t.type) {
            case "style":
                var a = e.querySelector('style[data-href~="' + pt(l.href) + '"]');
                if (a)
                    return t.instance = a,
                    Ze(a),
                    a;
                var n = C({}, l, {
                    "data-href": l.href,
                    "data-precedence": l.precedence,
                    href: null,
                    precedence: null
                });
                return a = (e.ownerDocument || e).createElement("style"),
                Ze(a),
                Ie(a, "style", n),
                ku(a, l.precedence, e),
                t.instance = a;
            case "stylesheet":
                n = Oa(l.href);
                var u = e.querySelector(zn(n));
                if (u)
                    return t.state.loading |= 4,
                    t.instance = u,
                    Ze(u),
                    u;
                a = vd(l),
                (n = zt.get(n)) && fr(a, n),
                u = (e.ownerDocument || e).createElement("link"),
                Ze(u);
                var c = u;
                return c._p = new Promise(function(s, d) {
                    c.onload = s,
                    c.onerror = d
                }
                ),
                Ie(u, "link", a),
                t.state.loading |= 4,
                ku(u, l.precedence, e),
                t.instance = u;
            case "script":
                return u = Ra(l.src),
                (n = e.querySelector(_n(u))) ? (t.instance = n,
                Ze(n),
                n) : (a = l,
                (n = zt.get(u)) && (a = C({}, l),
                dr(a, n)),
                e = e.ownerDocument || e,
                n = e.createElement("script"),
                Ze(n),
                Ie(n, "link", a),
                e.head.appendChild(n),
                t.instance = n);
            case "void":
                return null;
            default:
                throw Error(o(443, t.type))
            }
        else
            t.type === "stylesheet" && (t.state.loading & 4) === 0 && (a = t.instance,
            t.state.loading |= 4,
            ku(a, l.precedence, e));
        return t.instance
    }
    function ku(e, t, l) {
        for (var a = l.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'), n = a.length ? a[a.length - 1] : null, u = n, c = 0; c < a.length; c++) {
            var s = a[c];
            if (s.dataset.precedence === t)
                u = s;
            else if (u !== n)
                break
        }
        u ? u.parentNode.insertBefore(e, u.nextSibling) : (t = l.nodeType === 9 ? l.head : l,
        t.insertBefore(e, t.firstChild))
    }
    function fr(e, t) {
        e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
        e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
        e.title == null && (e.title = t.title)
    }
    function dr(e, t) {
        e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
        e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
        e.integrity == null && (e.integrity = t.integrity)
    }
    var Vu = null;
    function yd(e, t, l) {
        if (Vu === null) {
            var a = new Map
              , n = Vu = new Map;
            n.set(l, a)
        } else
            n = Vu,
            a = n.get(l),
            a || (a = new Map,
            n.set(l, a));
        if (a.has(e))
            return a;
        for (a.set(e, null),
        l = l.getElementsByTagName(e),
        n = 0; n < l.length; n++) {
            var u = l[n];
            if (!(u[Va] || u[Je] || e === "link" && u.getAttribute("rel") === "stylesheet") && u.namespaceURI !== "http://www.w3.org/2000/svg") {
                var c = u.getAttribute(t) || "";
                c = e + c;
                var s = a.get(c);
                s ? s.push(u) : a.set(c, [u])
            }
        }
        return a
    }
    function xd(e, t, l) {
        e = e.ownerDocument || e,
        e.head.insertBefore(l, t === "title" ? e.querySelector("head > title") : null)
    }
    function Dh(e, t, l) {
        if (l === 1 || t.itemProp != null)
            return !1;
        switch (e) {
        case "meta":
        case "title":
            return !0;
        case "style":
            if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "")
                break;
            return !0;
        case "link":
            if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError)
                break;
            return t.rel === "stylesheet" ? (e = t.disabled,
            typeof t.precedence == "string" && e == null) : !0;
        case "script":
            if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string")
                return !0
        }
        return !1
    }
    function pd(e) {
        return !(e.type === "stylesheet" && (e.state.loading & 3) === 0)
    }
    function Oh(e, t, l, a) {
        if (l.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== !1) && (l.state.loading & 4) === 0) {
            if (l.instance === null) {
                var n = Oa(a.href)
                  , u = t.querySelector(zn(n));
                if (u) {
                    t = u._p,
                    t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++,
                    e = Qu.bind(e),
                    t.then(e, e)),
                    l.state.loading |= 4,
                    l.instance = u,
                    Ze(u);
                    return
                }
                u = t.ownerDocument || t,
                a = vd(a),
                (n = zt.get(n)) && fr(a, n),
                u = u.createElement("link"),
                Ze(u);
                var c = u;
                c._p = new Promise(function(s, d) {
                    c.onload = s,
                    c.onerror = d
                }
                ),
                Ie(u, "link", a),
                l.instance = u
            }
            e.stylesheets === null && (e.stylesheets = new Map),
            e.stylesheets.set(l, t),
            (t = l.state.preload) && (l.state.loading & 3) === 0 && (e.count++,
            l = Qu.bind(e),
            t.addEventListener("load", l),
            t.addEventListener("error", l))
        }
    }
    var hr = 0;
    function Rh(e, t) {
        return e.stylesheets && e.count === 0 && Zu(e, e.stylesheets),
        0 < e.count || 0 < e.imgCount ? function(l) {
            var a = setTimeout(function() {
                if (e.stylesheets && Zu(e, e.stylesheets),
                e.unsuspend) {
                    var u = e.unsuspend;
                    e.unsuspend = null,
                    u()
                }
            }, 6e4 + t);
            0 < e.imgBytes && hr === 0 && (hr = 62500 * hh());
            var n = setTimeout(function() {
                if (e.waitingForImages = !1,
                e.count === 0 && (e.stylesheets && Zu(e, e.stylesheets),
                e.unsuspend)) {
                    var u = e.unsuspend;
                    e.unsuspend = null,
                    u()
                }
            }, (e.imgBytes > hr ? 50 : 800) + t);
            return e.unsuspend = l,
            function() {
                e.unsuspend = null,
                clearTimeout(a),
                clearTimeout(n)
            }
        }
        : null
    }
    function Qu() {
        if (this.count--,
        this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
            if (this.stylesheets)
                Zu(this, this.stylesheets);
            else if (this.unsuspend) {
                var e = this.unsuspend;
                this.unsuspend = null,
                e()
            }
        }
    }
    var Xu = null;
    function Zu(e, t) {
        e.stylesheets = null,
        e.unsuspend !== null && (e.count++,
        Xu = new Map,
        t.forEach(Bh, e),
        Xu = null,
        Qu.call(e))
    }
    function Bh(e, t) {
        if (!(t.state.loading & 4)) {
            var l = Xu.get(e);
            if (l)
                var a = l.get(null);
            else {
                l = new Map,
                Xu.set(e, l);
                for (var n = e.querySelectorAll("link[data-precedence],style[data-precedence]"), u = 0; u < n.length; u++) {
                    var c = n[u];
                    (c.nodeName === "LINK" || c.getAttribute("media") !== "not all") && (l.set(c.dataset.precedence, c),
                    a = c)
                }
                a && l.set(null, a)
            }
            n = t.instance,
            c = n.getAttribute("data-precedence"),
            u = l.get(c) || a,
            u === a && l.set(null, n),
            l.set(c, n),
            this.count++,
            a = Qu.bind(this),
            n.addEventListener("load", a),
            n.addEventListener("error", a),
            u ? u.parentNode.insertBefore(n, u.nextSibling) : (e = e.nodeType === 9 ? e.head : e,
            e.insertBefore(n, e.firstChild)),
            t.state.loading |= 4
        }
    }
    var Mn = {
        $$typeof: le,
        Provider: null,
        Consumer: null,
        _currentValue: K,
        _currentValue2: K,
        _threadCount: 0
    };
    function wh(e, t, l, a, n, u, c, s, d) {
        this.tag = 1,
        this.containerInfo = e,
        this.pingCache = this.current = this.pendingChildren = null,
        this.timeoutHandle = -1,
        this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null,
        this.callbackPriority = 0,
        this.expirationTimes = rc(-1),
        this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0,
        this.entanglements = rc(0),
        this.hiddenUpdates = rc(null),
        this.identifierPrefix = a,
        this.onUncaughtError = n,
        this.onCaughtError = u,
        this.onRecoverableError = c,
        this.pooledCache = null,
        this.pooledCacheLanes = 0,
        this.formState = d,
        this.incompleteTransitions = new Map
    }
    function bd(e, t, l, a, n, u, c, s, d, b, M, B) {
        return e = new wh(e,t,l,c,d,b,M,B,s),
        t = 1,
        u === !0 && (t |= 24),
        u = dt(3, null, null, t),
        e.current = u,
        u.stateNode = e,
        t = Zc(),
        t.refCount++,
        e.pooledCache = t,
        t.refCount++,
        u.memoizedState = {
            element: a,
            isDehydrated: l,
            cache: t
        },
        Wc(u),
        e
    }
    function Sd(e) {
        return e ? (e = oa,
        e) : oa
    }
    function Ad(e, t, l, a, n, u) {
        n = Sd(n),
        a.context === null ? a.context = n : a.pendingContext = n,
        a = hl(t),
        a.payload = {
            element: l
        },
        u = u === void 0 ? null : u,
        u !== null && (a.callback = u),
        l = ml(e, a, t),
        l !== null && (it(l, e, t),
        cn(l, e, t))
    }
    function Ed(e, t) {
        if (e = e.memoizedState,
        e !== null && e.dehydrated !== null) {
            var l = e.retryLane;
            e.retryLane = l !== 0 && l < t ? l : t
        }
    }
    function mr(e, t) {
        Ed(e, t),
        (e = e.alternate) && Ed(e, t)
    }
    function jd(e) {
        if (e.tag === 13 || e.tag === 31) {
            var t = Hl(e, 67108864);
            t !== null && it(t, e, 67108864),
            mr(e, 67108864)
        }
    }
    function Nd(e) {
        if (e.tag === 13 || e.tag === 31) {
            var t = yt();
            t = sc(t);
            var l = Hl(e, t);
            l !== null && it(l, e, t),
            mr(e, t)
        }
    }
    var Ku = !0;
    function Hh(e, t, l, a) {
        var n = z.T;
        z.T = null;
        var u = U.p;
        try {
            U.p = 2,
            vr(e, t, l, a)
        } finally {
            U.p = u,
            z.T = n
        }
    }
    function Uh(e, t, l, a) {
        var n = z.T;
        z.T = null;
        var u = U.p;
        try {
            U.p = 8,
            vr(e, t, l, a)
        } finally {
            U.p = u,
            z.T = n
        }
    }
    function vr(e, t, l, a) {
        if (Ku) {
            var n = gr(a);
            if (n === null)
                tr(e, t, a, Ju, l),
                zd(e, a);
            else if (Lh(n, e, t, l, a))
                a.stopPropagation();
            else if (zd(e, a),
            t & 4 && -1 < Gh.indexOf(e)) {
                for (; n !== null; ) {
                    var u = Pl(n);
                    if (u !== null)
                        switch (u.tag) {
                        case 3:
                            if (u = u.stateNode,
                            u.current.memoizedState.isDehydrated) {
                                var c = Dl(u.pendingLanes);
                                if (c !== 0) {
                                    var s = u;
                                    for (s.pendingLanes |= 2,
                                    s.entangledLanes |= 2; c; ) {
                                        var d = 1 << 31 - ot(c);
                                        s.entanglements[1] |= d,
                                        c &= ~d
                                    }
                                    Gt(u),
                                    (xe & 6) === 0 && (Cu = rt() + 500,
                                    En(0))
                                }
                            }
                            break;
                        case 31:
                        case 13:
                            s = Hl(u, 2),
                            s !== null && it(s, u, 2),
                            Ou(),
                            mr(u, 2)
                        }
                    if (u = gr(a),
                    u === null && tr(e, t, a, Ju, l),
                    u === n)
                        break;
                    n = u
                }
                n !== null && a.stopPropagation()
            } else
                tr(e, t, a, null, l)
        }
    }
    function gr(e) {
        return e = xc(e),
        yr(e)
    }
    var Ju = null;
    function yr(e) {
        if (Ju = null,
        e = Il(e),
        e !== null) {
            var t = A(e);
            if (t === null)
                e = null;
            else {
                var l = t.tag;
                if (l === 13) {
                    if (e = j(t),
                    e !== null)
                        return e;
                    e = null
                } else if (l === 31) {
                    if (e = w(t),
                    e !== null)
                        return e;
                    e = null
                } else if (l === 3) {
                    if (t.stateNode.current.memoizedState.isDehydrated)
                        return t.tag === 3 ? t.stateNode.containerInfo : null;
                    e = null
                } else
                    t !== e && (e = null)
            }
        }
        return Ju = e,
        null
    }
    function Td(e) {
        switch (e) {
        case "beforetoggle":
        case "cancel":
        case "click":
        case "close":
        case "contextmenu":
        case "copy":
        case "cut":
        case "auxclick":
        case "dblclick":
        case "dragend":
        case "dragstart":
        case "drop":
        case "focusin":
        case "focusout":
        case "input":
        case "invalid":
        case "keydown":
        case "keypress":
        case "keyup":
        case "mousedown":
        case "mouseup":
        case "paste":
        case "pause":
        case "play":
        case "pointercancel":
        case "pointerdown":
        case "pointerup":
        case "ratechange":
        case "reset":
        case "resize":
        case "seeked":
        case "submit":
        case "toggle":
        case "touchcancel":
        case "touchend":
        case "touchstart":
        case "volumechange":
        case "change":
        case "selectionchange":
        case "textInput":
        case "compositionstart":
        case "compositionend":
        case "compositionupdate":
        case "beforeblur":
        case "afterblur":
        case "beforeinput":
        case "blur":
        case "fullscreenchange":
        case "focus":
        case "hashchange":
        case "popstate":
        case "select":
        case "selectstart":
            return 2;
        case "drag":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "mousemove":
        case "mouseout":
        case "mouseover":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "scroll":
        case "touchmove":
        case "wheel":
        case "mouseenter":
        case "mouseleave":
        case "pointerenter":
        case "pointerleave":
            return 8;
        case "message":
            switch (E0()) {
            case Or:
                return 2;
            case Rr:
                return 8;
            case Un:
            case j0:
                return 32;
            case Br:
                return 268435456;
            default:
                return 32
            }
        default:
            return 32
        }
    }
    var xr = !1
      , Nl = null
      , Tl = null
      , zl = null
      , Cn = new Map
      , Dn = new Map
      , _l = []
      , Gh = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
    function zd(e, t) {
        switch (e) {
        case "focusin":
        case "focusout":
            Nl = null;
            break;
        case "dragenter":
        case "dragleave":
            Tl = null;
            break;
        case "mouseover":
        case "mouseout":
            zl = null;
            break;
        case "pointerover":
        case "pointerout":
            Cn.delete(t.pointerId);
            break;
        case "gotpointercapture":
        case "lostpointercapture":
            Dn.delete(t.pointerId)
        }
    }
    function On(e, t, l, a, n, u) {
        return e === null || e.nativeEvent !== u ? (e = {
            blockedOn: t,
            domEventName: l,
            eventSystemFlags: a,
            nativeEvent: u,
            targetContainers: [n]
        },
        t !== null && (t = Pl(t),
        t !== null && jd(t)),
        e) : (e.eventSystemFlags |= a,
        t = e.targetContainers,
        n !== null && t.indexOf(n) === -1 && t.push(n),
        e)
    }
    function Lh(e, t, l, a, n) {
        switch (t) {
        case "focusin":
            return Nl = On(Nl, e, t, l, a, n),
            !0;
        case "dragenter":
            return Tl = On(Tl, e, t, l, a, n),
            !0;
        case "mouseover":
            return zl = On(zl, e, t, l, a, n),
            !0;
        case "pointerover":
            var u = n.pointerId;
            return Cn.set(u, On(Cn.get(u) || null, e, t, l, a, n)),
            !0;
        case "gotpointercapture":
            return u = n.pointerId,
            Dn.set(u, On(Dn.get(u) || null, e, t, l, a, n)),
            !0
        }
        return !1
    }
    function _d(e) {
        var t = Il(e.target);
        if (t !== null) {
            var l = A(t);
            if (l !== null) {
                if (t = l.tag,
                t === 13) {
                    if (t = j(l),
                    t !== null) {
                        e.blockedOn = t,
                        Yr(e.priority, function() {
                            Nd(l)
                        });
                        return
                    }
                } else if (t === 31) {
                    if (t = w(l),
                    t !== null) {
                        e.blockedOn = t,
                        Yr(e.priority, function() {
                            Nd(l)
                        });
                        return
                    }
                } else if (t === 3 && l.stateNode.current.memoizedState.isDehydrated) {
                    e.blockedOn = l.tag === 3 ? l.stateNode.containerInfo : null;
                    return
                }
            }
        }
        e.blockedOn = null
    }
    function $u(e) {
        if (e.blockedOn !== null)
            return !1;
        for (var t = e.targetContainers; 0 < t.length; ) {
            var l = gr(e.nativeEvent);
            if (l === null) {
                l = e.nativeEvent;
                var a = new l.constructor(l.type,l);
                yc = a,
                l.target.dispatchEvent(a),
                yc = null
            } else
                return t = Pl(l),
                t !== null && jd(t),
                e.blockedOn = l,
                !1;
            t.shift()
        }
        return !0
    }
    function Md(e, t, l) {
        $u(e) && l.delete(t)
    }
    function Yh() {
        xr = !1,
        Nl !== null && $u(Nl) && (Nl = null),
        Tl !== null && $u(Tl) && (Tl = null),
        zl !== null && $u(zl) && (zl = null),
        Cn.forEach(Md),
        Dn.forEach(Md)
    }
    function Wu(e, t) {
        e.blockedOn === t && (e.blockedOn = null,
        xr || (xr = !0,
        i.unstable_scheduleCallback(i.unstable_NormalPriority, Yh)))
    }
    var Fu = null;
    function Cd(e) {
        Fu !== e && (Fu = e,
        i.unstable_scheduleCallback(i.unstable_NormalPriority, function() {
            Fu === e && (Fu = null);
            for (var t = 0; t < e.length; t += 3) {
                var l = e[t]
                  , a = e[t + 1]
                  , n = e[t + 2];
                if (typeof a != "function") {
                    if (yr(a || l) === null)
                        continue;
                    break
                }
                var u = Pl(l);
                u !== null && (e.splice(t, 3),
                t -= 3,
                gi(u, {
                    pending: !0,
                    data: n,
                    method: l.method,
                    action: a
                }, a, n))
            }
        }))
    }
    function Ba(e) {
        function t(d) {
            return Wu(d, e)
        }
        Nl !== null && Wu(Nl, e),
        Tl !== null && Wu(Tl, e),
        zl !== null && Wu(zl, e),
        Cn.forEach(t),
        Dn.forEach(t);
        for (var l = 0; l < _l.length; l++) {
            var a = _l[l];
            a.blockedOn === e && (a.blockedOn = null)
        }
        for (; 0 < _l.length && (l = _l[0],
        l.blockedOn === null); )
            _d(l),
            l.blockedOn === null && _l.shift();
        if (l = (e.ownerDocument || e).$$reactFormReplay,
        l != null)
            for (a = 0; a < l.length; a += 3) {
                var n = l[a]
                  , u = l[a + 1]
                  , c = n[tt] || null;
                if (typeof u == "function")
                    c || Cd(l);
                else if (c) {
                    var s = null;
                    if (u && u.hasAttribute("formAction")) {
                        if (n = u,
                        c = u[tt] || null)
                            s = c.formAction;
                        else if (yr(n) !== null)
                            continue
                    } else
                        s = c.action;
                    typeof s == "function" ? l[a + 1] = s : (l.splice(a, 3),
                    a -= 3),
                    Cd(l)
                }
            }
    }
    function Dd() {
        function e(u) {
            u.canIntercept && u.info === "react-transition" && u.intercept({
                handler: function() {
                    return new Promise(function(c) {
                        return n = c
                    }
                    )
                },
                focusReset: "manual",
                scroll: "manual"
            })
        }
        function t() {
            n !== null && (n(),
            n = null),
            a || setTimeout(l, 20)
        }
        function l() {
            if (!a && !navigation.transition) {
                var u = navigation.currentEntry;
                u && u.url != null && navigation.navigate(u.url, {
                    state: u.getState(),
                    info: "react-transition",
                    history: "replace"
                })
            }
        }
        if (typeof navigation == "object") {
            var a = !1
              , n = null;
            return navigation.addEventListener("navigate", e),
            navigation.addEventListener("navigatesuccess", t),
            navigation.addEventListener("navigateerror", t),
            setTimeout(l, 100),
            function() {
                a = !0,
                navigation.removeEventListener("navigate", e),
                navigation.removeEventListener("navigatesuccess", t),
                navigation.removeEventListener("navigateerror", t),
                n !== null && (n(),
                n = null)
            }
        }
    }
    function pr(e) {
        this._internalRoot = e
    }
    Iu.prototype.render = pr.prototype.render = function(e) {
        var t = this._internalRoot;
        if (t === null)
            throw Error(o(409));
        var l = t.current
          , a = yt();
        Ad(l, a, e, t, null, null)
    }
    ,
    Iu.prototype.unmount = pr.prototype.unmount = function() {
        var e = this._internalRoot;
        if (e !== null) {
            this._internalRoot = null;
            var t = e.containerInfo;
            Ad(e.current, 2, null, e, null, null),
            Ou(),
            t[Fl] = null
        }
    }
    ;
    function Iu(e) {
        this._internalRoot = e
    }
    Iu.prototype.unstable_scheduleHydration = function(e) {
        if (e) {
            var t = Lr();
            e = {
                blockedOn: null,
                target: e,
                priority: t
            };
            for (var l = 0; l < _l.length && t !== 0 && t < _l[l].priority; l++)
                ;
            _l.splice(l, 0, e),
            l === 0 && _d(e)
        }
    }
    ;
    var Od = f.version;
    if (Od !== "19.2.3")
        throw Error(o(527, Od, "19.2.3"));
    U.findDOMNode = function(e) {
        var t = e._reactInternals;
        if (t === void 0)
            throw typeof e.render == "function" ? Error(o(188)) : (e = Object.keys(e).join(","),
            Error(o(268, e)));
        return e = y(t),
        e = e !== null ? E(e) : null,
        e = e === null ? null : e.stateNode,
        e
    }
    ;
    var qh = {
        bundleType: 0,
        version: "19.2.3",
        rendererPackageName: "react-dom",
        currentDispatcherRef: z,
        reconcilerVersion: "19.2.3"
    };
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
        var Pu = __REACT_DEVTOOLS_GLOBAL_HOOK__;
        if (!Pu.isDisabled && Pu.supportsFiber)
            try {
                Ya = Pu.inject(qh),
                st = Pu
            } catch {}
    }
    return Bn.createRoot = function(e, t) {
        if (!g(e))
            throw Error(o(299));
        var l = !1
          , a = ""
          , n = Go
          , u = Lo
          , c = Yo;
        return t != null && (t.unstable_strictMode === !0 && (l = !0),
        t.identifierPrefix !== void 0 && (a = t.identifierPrefix),
        t.onUncaughtError !== void 0 && (n = t.onUncaughtError),
        t.onCaughtError !== void 0 && (u = t.onCaughtError),
        t.onRecoverableError !== void 0 && (c = t.onRecoverableError)),
        t = bd(e, 1, !1, null, null, l, a, null, n, u, c, Dd),
        e[Fl] = t.current,
        er(e),
        new pr(t)
    }
    ,
    Bn.hydrateRoot = function(e, t, l) {
        if (!g(e))
            throw Error(o(299));
        var a = !1
          , n = ""
          , u = Go
          , c = Lo
          , s = Yo
          , d = null;
        return l != null && (l.unstable_strictMode === !0 && (a = !0),
        l.identifierPrefix !== void 0 && (n = l.identifierPrefix),
        l.onUncaughtError !== void 0 && (u = l.onUncaughtError),
        l.onCaughtError !== void 0 && (c = l.onCaughtError),
        l.onRecoverableError !== void 0 && (s = l.onRecoverableError),
        l.formState !== void 0 && (d = l.formState)),
        t = bd(e, 1, !0, t, l ?? null, a, n, d, u, c, s, Dd),
        t.context = Sd(null),
        l = t.current,
        a = yt(),
        a = sc(a),
        n = hl(a),
        n.callback = null,
        ml(l, n, a),
        l = a,
        t.current.lanes = l,
        ka(t, l),
        Gt(t),
        e[Fl] = t.current,
        er(e),
        new Iu(t)
    }
    ,
    Bn.version = "19.2.3",
    Bn
}
var kd;
function Fh() {
    if (kd)
        return Ar.exports;
    kd = 1;
    function i() {
        if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
            try {
                __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(i)
            } catch (f) {
                console.error(f)
            }
    }
    return i(),
    Ar.exports = Wh(),
    Ar.exports
}
var Ih = Fh();
const Ph = "modulepreload"
  , em = function(i) {
    return "/" + i
}
  , Vd = {}
  , $l = function(f, m, o) {
    let g = Promise.resolve();
    if (m && m.length > 0) {
        let _ = function(y) {
            return Promise.all(y.map(E => Promise.resolve(E).then(C => ({
                status: "fulfilled",
                value: C
            }), C => ({
                status: "rejected",
                reason: C
            }))))
        };
        document.getElementsByTagName("link");
        const j = document.querySelector("meta[property=csp-nonce]")
          , w = j?.nonce || j?.getAttribute("nonce");
        g = _(m.map(y => {
            if (y = em(y),
            y in Vd)
                return;
            Vd[y] = !0;
            const E = y.endsWith(".css")
              , C = E ? '[rel="stylesheet"]' : "";
            if (document.querySelector(`link[href="${y}"]${C}`))
                return;
            const G = document.createElement("link");
            if (G.rel = E ? "stylesheet" : Ph,
            E || (G.as = "script"),
            G.crossOrigin = "",
            G.href = y,
            w && G.setAttribute("nonce", w),
            document.head.appendChild(G),
            E)
                return new Promise( (ee, q) => {
                    G.addEventListener("load", ee),
                    G.addEventListener("error", () => q(new Error(`Unable to preload CSS for ${y}`)))
                }
                )
        }
        ))
    }
    function A(j) {
        const w = new Event("vite:preloadError",{
            cancelable: !0
        });
        if (w.payload = j,
        window.dispatchEvent(w),
        !w.defaultPrevented)
            throw j
    }
    return g.then(j => {
        for (const w of j || [])
            w.status === "rejected" && A(w.reason);
        return f().catch(A)
    }
    )
};
var Qd = {}
  , tm = "@vercel/analytics"
  , lm = "1.6.1"
  , am = () => {
    window.va || (window.va = function(...f) {
        (window.vaq = window.vaq || []).push(f)
    }
    )
}
;
function a0() {
    return typeof window < "u"
}
function n0() {
    try {
        const i = "production"
    } catch {}
    return "production"
}
function nm(i="auto") {
    if (i === "auto") {
        window.vam = n0();
        return
    }
    window.vam = i
}
function um() {
    return (a0() ? window.vam : n0()) || "production"
}
function _r() {
    return um() === "development"
}
function cm(i) {
    return i.scriptSrc ? i.scriptSrc : _r() ? "https://va.vercel-scripts.com/v1/script.debug.js" : i.basePath ? `${i.basePath}/insights/script.js` : "/_vercel/insights/script.js"
}
function im(i={
    debug: !0
}) {
    var f;
    if (!a0())
        return;
    nm(i.mode),
    am(),
    i.beforeSend && ((f = window.va) == null || f.call(window, "beforeSend", i.beforeSend));
    const m = cm(i);
    if (document.head.querySelector(`script[src*="${m}"]`))
        return;
    const o = document.createElement("script");
    o.src = m,
    o.defer = !0,
    o.dataset.sdkn = tm + (i.framework ? `/${i.framework}` : ""),
    o.dataset.sdkv = lm,
    i.disableAutoTrack && (o.dataset.disableAutoTrack = "1"),
    i.endpoint ? o.dataset.endpoint = i.endpoint : i.basePath && (o.dataset.endpoint = `${i.basePath}/insights`),
    i.dsn && (o.dataset.dsn = i.dsn),
    o.onerror = () => {
        const g = _r() ? "Please check if any ad blockers are enabled and try again." : "Be sure to enable Web Analytics for your project and deploy again. See https://vercel.com/docs/analytics/quickstart for more information.";
        console.log(`[Vercel Web Analytics] Failed to load script from ${m}. ${g}`)
    }
    ,
    _r() && i.debug === !1 && (o.dataset.debug = "false"),
    document.head.appendChild(o)
}
function rm({route: i, path: f}) {
    var m;
    (m = window.va) == null || m.call(window, "pageview", {
        route: i,
        path: f
    })
}
function sm() {
    if (!(typeof process > "u" || typeof Qd > "u"))
        return Qd.REACT_APP_VERCEL_OBSERVABILITY_BASEPATH
}
function om(i) {
    return T.useEffect( () => {
        var f;
        i.beforeSend && ((f = window.va) == null || f.call(window, "beforeSend", i.beforeSend))
    }
    , [i.beforeSend]),
    T.useEffect( () => {
        im({
            framework: i.framework || "react",
            basePath: i.basePath ?? sm(),
            ...i.route !== void 0 && {
                disableAutoTrack: !0
            },
            ...i
        })
    }
    , []),
    T.useEffect( () => {
        i.route && i.path && rm({
            route: i.route,
            path: i.path
        })
    }
    , [i.route, i.path]),
    null
}
var Xd = {}
  , fm = "@vercel/speed-insights"
  , dm = "1.3.1"
  , hm = () => {
    window.si || (window.si = function(...f) {
        (window.siq = window.siq || []).push(f)
    }
    )
}
;
function mm() {
    return typeof window < "u"
}
function vm() {
    try {
        const i = "production"
    } catch {}
    return "production"
}
function u0() {
    return vm() === "development"
}
function gm(i) {
    return i.scriptSrc ? i.scriptSrc : u0() ? "https://va.vercel-scripts.com/v1/speed-insights/script.debug.js" : i.dsn ? "https://va.vercel-scripts.com/v1/speed-insights/script.js" : i.basePath ? `${i.basePath}/speed-insights/script.js` : "/_vercel/speed-insights/script.js"
}
function ym(i={}) {
    var f;
    if (!mm() || i.route === null)
        return null;
    hm();
    const m = gm(i);
    if (document.head.querySelector(`script[src*="${m}"]`))
        return null;
    i.beforeSend && ((f = window.si) == null || f.call(window, "beforeSend", i.beforeSend));
    const o = document.createElement("script");
    return o.src = m,
    o.defer = !0,
    o.dataset.sdkn = fm + (i.framework ? `/${i.framework}` : ""),
    o.dataset.sdkv = dm,
    i.sampleRate && (o.dataset.sampleRate = i.sampleRate.toString()),
    i.route && (o.dataset.route = i.route),
    i.endpoint ? o.dataset.endpoint = i.endpoint : i.basePath && (o.dataset.endpoint = `${i.basePath}/speed-insights/vitals`),
    i.dsn && (o.dataset.dsn = i.dsn),
    u0() && i.debug === !1 && (o.dataset.debug = "false"),
    o.onerror = () => {
        console.log(`[Vercel Speed Insights] Failed to load script from ${m}. Please check if any content blockers are enabled and try again.`)
    }
    ,
    document.head.appendChild(o),
    {
        setRoute: g => {
            o.dataset.route = g ?? void 0
        }
    }
}
function xm() {
    if (!(typeof process > "u" || typeof Xd > "u"))
        return Xd.REACT_APP_VERCEL_OBSERVABILITY_BASEPATH
}
function pm(i) {
    T.useEffect( () => {
        var m;
        i.beforeSend && ((m = window.si) == null || m.call(window, "beforeSend", i.beforeSend))
    }
    , [i.beforeSend]);
    const f = T.useRef(null);
    return T.useEffect( () => {
        if (f.current)
            i.route && f.current(i.route);
        else {
            const m = ym({
                framework: i.framework ?? "react",
                basePath: i.basePath ?? xm(),
                ...i
            });
            m && (f.current = m.setRoute)
        }
    }
    , [i.route]),
    null
}
const c0 = "pricegap-theme"
  , Ua = ["dark", "light", "cyberpunk"]
  , i0 = T.createContext(null);
function bm() {
    if (typeof window > "u")
        return "dark";
    try {
        const i = localStorage.getItem(c0);
        if (i && Ua.includes(i))
            return i
    } catch (i) {
        console.warn("[Theme] localStorage 접근 실패:", i)
    }
    return "dark"
}
function Sm({children: i}) {
    const [f,m] = T.useState( () => bm())
      , o = T.useCallback(j => {
        if (!Ua.includes(j)) {
            console.error("[Theme] 유효하지 않은 테마:", j);
            return
        }
        m(j)
    }
    , [])
      , g = T.useCallback( () => {
        m(j => {
            const _ = (Ua.indexOf(j) + 1) % Ua.length;
            return Ua[_]
        }
        )
    }
    , []);
    T.useEffect( () => {
        const j = document.documentElement;
        f === "dark" ? j.removeAttribute("data-theme") : j.setAttribute("data-theme", f);
        try {
            localStorage.setItem(c0, f)
        } catch (_) {
            console.warn("[Theme] localStorage 저장 실패:", _)
        }
        const w = document.querySelector('meta[name="theme-color"]');
        if (w) {
            const _ = {
                dark: "#0a0a0a",
                light: "#f8fafc",
                cyberpunk: "#0d0221"
            };
            w.setAttribute("content", _[f])
        }
        console.log(`[Theme] Applied: ${f}`)
    }
    , [f]);
    const A = {
        theme: f,
        setTheme: o,
        cycleTheme: g,
        themes: Ua
    };
    return r.jsx(i0.Provider, {
        value: A,
        children: i
    })
}
function Cr() {
    const i = T.useContext(i0);
    if (!i)
        throw new Error("useTheme must be used within a ThemeProvider");
    return i
}
const Am = [{
    id: "dashboard",
    label: "Dashboard",
    icon: "grid"
}, {
    id: "watchlist",
    label: "Watchlist",
    icon: "eye"
}, {
    id: "exchanges",
    label: "Exchanges",
    icon: "building"
}, {
    id: "calculator",
    label: "Calculator",
    icon: "calculator"
}, {
    id: "heatmap",
    label: "Heatmap",
    icon: "heatmap"
}, {
    id: "analytics",
    label: "Analytics",
    icon: "chart"
}, {
    id: "alerts",
    label: "Alerts",
    icon: "bell"
}]
  , Em = {
    grid: r.jsx("svg", {
        className: "w-[18px] h-[18px]",
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24",
        strokeWidth: 1.5,
        children: r.jsx("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
        })
    }),
    eye: r.jsxs("svg", {
        className: "w-[18px] h-[18px]",
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24",
        strokeWidth: 1.5,
        children: [r.jsx("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
        }), r.jsx("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        })]
    }),
    zap: r.jsx("svg", {
        className: "w-[18px] h-[18px]",
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24",
        strokeWidth: 1.5,
        children: r.jsx("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
        })
    }),
    chart: r.jsx("svg", {
        className: "w-[18px] h-[18px]",
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24",
        strokeWidth: 1.5,
        children: r.jsx("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
        })
    }),
    building: r.jsx("svg", {
        className: "w-[18px] h-[18px]",
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24",
        strokeWidth: 1.5,
        children: r.jsx("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3h.75m-.75 3h.75m-.75 3h.75"
        })
    }),
    calculator: r.jsx("svg", {
        className: "w-[18px] h-[18px]",
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24",
        strokeWidth: 1.5,
        children: r.jsx("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z"
        })
    }),
    heatmap: r.jsx("svg", {
        className: "w-[18px] h-[18px]",
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24",
        strokeWidth: 1.5,
        children: r.jsx("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
        })
    }),
    bell: r.jsx("svg", {
        className: "w-[18px] h-[18px]",
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24",
        strokeWidth: 1.5,
        children: r.jsx("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
        })
    })
};
function jm({activeNav: i, onNavChange: f, isOpen: m=!1, onClose: o, unreadAlerts: g=0}) {
    const {theme: A, cycleTheme: j} = Cr();
    T.useEffect( () => {
        const E = C => {
            C.key === "Escape" && m && o?.()
        }
        ;
        return window.addEventListener("keydown", E),
        () => window.removeEventListener("keydown", E)
    }
    , [m, o]),
    T.useEffect( () => (m ? document.body.style.overflow = "hidden" : document.body.style.overflow = "",
    () => {
        document.body.style.overflow = ""
    }
    ), [m]);
    const w = E => {
        f(E),
        o?.()
    }
      , _ = () => A === "dark" ? r.jsx("svg", {
        className: "w-4 h-4",
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24",
        strokeWidth: 1.5,
        children: r.jsx("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
        })
    }) : A === "light" ? r.jsx("svg", {
        className: "w-4 h-4",
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24",
        strokeWidth: 1.5,
        children: r.jsx("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
        })
    }) : r.jsx("svg", {
        className: "w-4 h-4",
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24",
        strokeWidth: 1.5,
        children: r.jsx("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75l-9.75-5.25 4.179-2.25m11.142 0l-5.571 3-5.571-3"
        })
    })
      , y = r.jsxs(r.Fragment, {
        children: [r.jsx("div", {
            className: "p-5 border-b border-[var(--color-border)]",
            children: r.jsxs("div", {
                className: "flex items-center gap-3",
                children: [r.jsx("div", {
                    className: "w-10 h-10 rounded-xl overflow-hidden border border-[var(--color-accent)]/20 shadow-lg shadow-[var(--color-accent)]/10 flex-shrink-0",
                    children: r.jsx("img", {
                        src: "/logo.jpg",
                        alt: "Logo",
                        className: "w-full h-full object-cover"
                    })
                }), r.jsxs("div", {
                    className: "lg:block md:hidden",
                    children: [r.jsx("h1", {
                        className: "text-[var(--color-text-primary)] font-semibold text-[15px] tracking-tight",
                        children: "Katze Tracker"
                    }), r.jsxs("div", {
                        className: "flex items-center gap-1.5 mt-0.5",
                        children: [r.jsx("span", {
                            className: "status-dot status-dot-online"
                        }), r.jsx("span", {
                            className: "text-[var(--color-accent)]/80 text-xs font-medium",
                            children: "Online"
                        })]
                    })]
                })]
            })
        }), r.jsxs("nav", {
            className: "p-3 flex-1",
            role: "navigation",
            "aria-label": "Main navigation",
            children: [r.jsx("div", {
                className: "text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] font-medium px-3 mb-2 lg:block md:hidden",
                children: "Menu"
            }), r.jsx("ul", {
                className: "space-y-0.5",
                role: "menubar",
                children: Am.map(E => r.jsx("li", {
                    role: "none",
                    children: r.jsxs("button", {
                        onClick: () => w(E.id),
                        role: "menuitem",
                        "aria-current": i === E.id ? "page" : void 0,
                        className: `
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200
                  md:justify-center lg:justify-start
                  ${i === E.id ? "bg-[var(--color-bg-active)] text-[var(--color-text-primary)] shadow-theme-sm" : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)]"}
                `,
                        title: E.label,
                        children: [r.jsxs("span", {
                            className: `relative flex-shrink-0 ${i === E.id ? "text-[var(--color-accent)]" : ""}`,
                            children: [Em[E.icon], E.id === "alerts" && g > 0 && r.jsx("span", {
                                className: "absolute -top-1.5 -right-1.5 min-w-[16px] h-4 px-1 flex items-center justify-center bg-[var(--color-error)] text-white text-[10px] font-bold rounded-full",
                                children: g > 99 ? "99+" : g
                            })]
                        }), r.jsx("span", {
                            className: "lg:block md:hidden",
                            children: E.label
                        })]
                    })
                }, E.id))
            })]
        }), r.jsx("div", {
            className: "p-3 border-t border-[var(--color-border)]",
            children: r.jsxs("button", {
                onClick: j,
                className: `w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 md:justify-center lg:justify-start ${A === "cyberpunk" ? "text-pink-400 hover:text-pink-300 hover:bg-purple-900/50" : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)]"}`,
                title: `Theme: ${A === "dark" ? "Dark" : A === "light" ? "Light" : "Cyberpunk"}`,
                children: [r.jsx("span", {
                    className: `flex-shrink-0 ${A === "cyberpunk" ? "drop-shadow-[0_0_6px_rgba(255,0,255,0.8)]" : ""}`,
                    children: _()
                }), r.jsx("span", {
                    className: "lg:block md:hidden",
                    children: A === "dark" ? "Dark" : A === "light" ? "Light" : "Cyber"
                })]
            })
        }), r.jsx("div", {
            className: "p-4 border-t border-[var(--color-border)]",
            children: r.jsxs("div", {
                className: "flex items-center justify-between lg:flex md:justify-center",
                children: [r.jsxs("div", {
                    className: "flex items-center gap-2 text-[var(--color-text-muted)] text-[10px] lg:flex md:hidden",
                    children: [r.jsx("div", {
                        className: "w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]/50"
                    }), r.jsx("span", {
                        children: "5 Exchanges"
                    })]
                }), r.jsxs("div", {
                    className: "flex items-center gap-1",
                    children: [r.jsx("a", {
                        href: "https://t.me/Katzenote",
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "p-1.5 rounded-lg hover:bg-[var(--color-bg-hover)] text-[var(--color-text-muted)] hover:text-[#26A5E4] transition-colors",
                        title: "Telegram",
                        children: r.jsx("svg", {
                            className: "w-3.5 h-3.5",
                            fill: "currentColor",
                            viewBox: "0 0 24 24",
                            children: r.jsx("path", {
                                d: "M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"
                            })
                        })
                    }), r.jsx("a", {
                        href: "https://www.youtube.com/@cryptokatze",
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "p-1.5 rounded-lg hover:bg-[var(--color-bg-hover)] text-[var(--color-text-muted)] hover:text-[#FF0000] transition-colors",
                        title: "YouTube",
                        children: r.jsx("svg", {
                            className: "w-3.5 h-3.5",
                            fill: "currentColor",
                            viewBox: "0 0 24 24",
                            children: r.jsx("path", {
                                d: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
                            })
                        })
                    }), r.jsx("a", {
                        href: "https://linktr.ee/cryptokatze",
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "p-1.5 rounded-lg hover:bg-[var(--color-bg-hover)] text-[var(--color-text-muted)] hover:text-[#43E55E] transition-colors",
                        title: "Linktree",
                        children: r.jsx("svg", {
                            className: "w-3.5 h-3.5",
                            fill: "currentColor",
                            viewBox: "0 0 24 24",
                            children: r.jsx("path", {
                                d: "M7.953 15.066l-.038.001c-.931 0-1.69-.761-1.69-1.707 0-.944.756-1.706 1.688-1.706h.04c.931 0 1.689.762 1.689 1.706 0 .946-.758 1.706-1.689 1.706zm8.132 0c-.932 0-1.69-.761-1.69-1.707 0-.944.756-1.706 1.688-1.706h.04c.931 0 1.689.762 1.689 1.706 0 .946-.757 1.706-1.688 1.706h-.039zM12 8.818c-.932 0-1.69-.762-1.69-1.707C10.31 6.166 11.068 5.4 12 5.4h.04c.932 0 1.69.762 1.69 1.707 0 .945-.758 1.706-1.69 1.706L12 8.818zm0 12.727c-.932 0-1.69-.762-1.69-1.707s.756-1.707 1.688-1.707h.04c.932 0 1.69.762 1.69 1.707s-.758 1.707-1.69 1.707H12z"
                            })
                        })
                    })]
                })]
            })
        })]
    });
    return r.jsxs(r.Fragment, {
        children: [r.jsx("aside", {
            className: "hidden md:flex md:w-[72px] lg:w-60 flex-col h-screen bg-[var(--color-bg-secondary)] border-r border-[var(--color-border)] transition-all duration-300",
            children: y
        }), r.jsxs("div", {
            className: `
          md:hidden fixed inset-0 z-50 transition-opacity duration-300
          ${m ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `,
            children: [r.jsx("div", {
                className: "absolute inset-0 bg-black/60 backdrop-blur-sm",
                onClick: o
            }), r.jsxs("aside", {
                className: `
            absolute top-0 left-0 w-72 h-full bg-[var(--color-bg-secondary)] border-r border-[var(--color-border)]
            flex flex-col transform transition-transform duration-300 ease-out
            ${m ? "translate-x-0" : "-translate-x-full"}
          `,
                children: [r.jsx("button", {
                    onClick: o,
                    className: "absolute top-4 right-4 p-2 rounded-lg hover:bg-[var(--color-bg-hover)] text-[var(--color-text-secondary)] transition-colors",
                    "aria-label": "Close menu",
                    children: r.jsx("svg", {
                        className: "w-5 h-5",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        strokeWidth: 1.5,
                        children: r.jsx("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            d: "M6 18L18 6M6 6l12 12"
                        })
                    })
                }), y]
            })]
        })]
    })
}
function Nm({onMenuClick: i, title: f="Katze Tracker"}) {
    const {isDark: m, toggleTheme: o} = Cr();
    return r.jsx("header", {
        className: "md:hidden fixed top-0 left-0 right-0 z-40 pt-[env(safe-area-inset-top)] bg-[var(--color-bg-secondary)] border-b border-[var(--color-border)] backdrop-blur-lg",
        children: r.jsxs("div", {
            className: "h-14 px-4 flex items-center justify-between",
            children: [r.jsx("button", {
                onClick: i,
                className: "p-2 -ml-2 rounded-lg hover:bg-[var(--color-bg-hover)] transition-colors",
                "aria-label": "Open menu",
                children: r.jsx("svg", {
                    className: "w-6 h-6 text-[var(--color-text-primary)]",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    strokeWidth: 1.5,
                    children: r.jsx("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        d: "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    })
                })
            }), r.jsxs("div", {
                className: "flex items-center gap-2",
                children: [r.jsx("div", {
                    className: "w-7 h-7 rounded-lg overflow-hidden border border-[var(--color-accent)]/20",
                    children: r.jsx("img", {
                        src: "/logo.jpg",
                        alt: "Logo",
                        className: "w-full h-full object-cover"
                    })
                }), r.jsx("span", {
                    className: "font-semibold text-sm text-[var(--color-text-primary)]",
                    children: f
                })]
            }), r.jsx("button", {
                onClick: o,
                className: "p-2 -mr-2 rounded-lg hover:bg-[var(--color-bg-hover)] transition-colors",
                "aria-label": m ? "Switch to light mode" : "Switch to dark mode",
                children: m ? r.jsx("svg", {
                    className: "w-5 h-5 text-[var(--color-text-secondary)]",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    strokeWidth: 1.5,
                    children: r.jsx("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        d: "M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                    })
                }) : r.jsx("svg", {
                    className: "w-5 h-5 text-[var(--color-text-secondary)]",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    strokeWidth: 1.5,
                    children: r.jsx("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        d: "M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                    })
                })
            })]
        })
    })
}
const Mt = {
    Variational: {
        name: "Variational",
        code: "VA",
        fees: {
            maker: 0,
            taker: 0
        },
        colors: {
            primary: "#6AA9FF",
            bg: "rgba(106, 169, 255, 0.12)",
            border: "rgba(106, 169, 255, 0.2)"
        },
        chain: "Arbitrum",
        referral: "https://omni.variational.io/?ref=OMNIKATZE",
        description: "P2P perpetuals protocol. Omni app with 500+ markets, $1B OI, $100B+ cumulative volume.",
        funding: "$11.8M",
        investors: "Bain Capital Crypto, Coinbase Ventures, Dragonfly",
        enabled: !0
    },
    Pacifica: {
        name: "Pacifica",
        code: "PC",
        fees: {
            maker: .0075,
            taker: .02
        },
        feesNote: "(~Jan 20th)",
        colors: {
            primary: "#3B82F6",
            bg: "rgba(59, 130, 246, 0.12)",
            border: "rgba(59, 130, 246, 0.2)"
        },
        chain: "Solana",
        referral: "https://app.pacifica.fi/?referral=katze",
        description: "High-performance perpetuals DEX on Solana. AI smart trading tools and Conquest League events.",
        funding: "Self-funded",
        investors: "-",
        enabled: !0
    },
    Lighter: {
        name: "Lighter",
        code: "LT",
        fees: {
            maker: 0,
            taker: 0
        },
        colors: {
            primary: "#94a3b8",
            bg: "rgba(148, 163, 184, 0.12)",
            border: "rgba(148, 163, 184, 0.2)"
        },
        chain: "Arbitrum",
        referral: "https://app.lighter.xyz/trade/ETH?referral=21VT5T3QHHVW",
        description: "Zero-fee perpetuals DEX on Ethereum L2. ZK circuits for verifiable order matching. 10K+ TPS, ms latency.",
        funding: "~$90M",
        investors: "Blockchain Capital, Polychain, Robot Ventures",
        enabled: !0
    },
    Grvt: {
        name: "GRVT",
        code: "GV",
        fees: {
            maker: -1e-4,
            taker: .045
        },
        colors: {
            primary: "#B6E870",
            bg: "rgba(182, 232, 112, 0.12)",
            border: "rgba(182, 232, 112, 0.2)"
        },
        chain: "ZKSync Validium L2",
        referral: "https://grvt.io/exchange/sign-up?ref=katze",
        description: "Hybrid privacy-focused perpetual DEX on zkSync Validium L2. Off-chain orderbook with on-chain settlement for perps, spot, and options. Founded by ex-Goldman Sachs, emphasizing institutional-grade infrastructure, ZK privacy, and self-custody.",
        funding: "$33.3M",
        investors: "ZKsync, Further Ventures, EigenCloud",
        enabled: !0
    },
    Paradex: {
        name: "Paradex",
        code: "PX",
        fees: {
            maker: 0,
            taker: 0
        },
        colors: {
            primary: "#7C3DB8",
            bg: "rgba(124, 61, 184, 0.12)",
            border: "rgba(124, 61, 184, 0.2)"
        },
        chain: "Arbitrum",
        referral: "https://app.paradex.trade/r/katze",
        description: "Zero-fee perpetuals with deep liquidity and privacy features. ~$1B OI, $2B daily volume (Jan 2026).",
        funding: "$35M",
        investors: "Paradigm",
        enabled: !0
    },
    Hyperliquid: {
        name: "Hyperliquid",
        code: "HL",
        fees: {
            maker: .015,
            taker: .045
        },
        colors: {
            primary: "#76CFC1",
            bg: "rgba(118, 207, 193, 0.12)",
            border: "rgba(118, 207, 193, 0.2)"
        },
        chain: "Hyperliquid L1",
        referral: "https://app.hyperliquid.xyz/join/KATZE",
        description: "High-performance L1 DEX. Fully on-chain perps/spot orderbook, sub-second finality. 222+ markets, $10B+ HIP-3 volume.",
        funding: "Self-funded",
        investors: "No VC",
        enabled: !0
    },
    Backpack: {
        name: "Backpack",
        code: "BP",
        fees: {
            maker: .02,
            taker: .04
        },
        colors: {
            primary: "#EF4444",
            bg: "rgba(239, 68, 68, 0.12)",
            border: "rgba(239, 68, 68, 0.2)"
        },
        chain: "Solana",
        referral: "https://backpack.exchange/signup?code=katze",
        description: "Solana-based exchange with perpetuals and spot trading. Integrated with Backpack wallet.",
        funding: "$17M",
        investors: "FTX Ventures, Jump Crypto, Alameda Research",
        enabled: !0
    },
    Extended: {
        name: "Extended",
        code: "EX",
        fees: {
            maker: 0,
            taker: 0
        },
        colors: {
            primary: "#34d399",
            bg: "rgba(52, 211, 153, 0.12)",
            border: "rgba(52, 211, 153, 0.2)"
        },
        enabled: !1
    },
    Nado: {
        name: "Nado",
        code: "ND",
        fees: {
            maker: 0,
            taker: 0
        },
        colors: {
            primary: "#60a5fa",
            bg: "rgba(96, 165, 250, 0.12)",
            border: "rgba(96, 165, 250, 0.2)"
        },
        enabled: !1
    }
}
  , wa = Object.keys(Mt).filter(i => Mt[i].enabled)
  , lv = i => {
    const f = Object.keys(Mt).find(m => m.toLowerCase() === i?.toLowerCase());
    return Mt[f]?.fees || {
        maker: 0,
        taker: 0
    }
}
  , Tm = i => {
    const f = Object.keys(Mt).find(m => m.toLowerCase() === i?.toLowerCase());
    return Mt[f]?.referral || null
}
  , zm = i => {
    const f = Object.keys(Mt).find(m => m.toLowerCase() === i?.toLowerCase());
    return Mt[f]?.colors || {
        primary: "#888888",
        bg: "rgba(136, 136, 136, 0.12)",
        border: "rgba(136, 136, 136, 0.2)"
    }
}
  , _m = i => {
    const f = Object.keys(Mt).find(m => m.toLowerCase() === i?.toLowerCase());
    return Mt[f]?.code || i?.slice(0, 2).toUpperCase() || "??"
}
  , Ga = Object.fromEntries(Object.entries(Mt).map( ([i,f]) => [i, {
    code: f.code,
    color: i.toLowerCase(),
    enabled: f.enabled
}]));
function Mm({exchange: i, size: f="md", clickable: m=!0}) {
    const o = zm(i)
      , g = _m(i)
      , A = Tm(i)
      , j = {
        xs: "px-1.5 py-0.5 text-[9px] gap-1",
        sm: "px-2 py-1 text-[10px] gap-1.5",
        md: "px-2.5 py-1 text-[11px] gap-1.5",
        lg: "px-3 py-1.5 text-xs gap-2"
    }
      , w = {
        xs: "w-1 h-1",
        sm: "w-1.5 h-1.5",
        md: "w-1.5 h-1.5",
        lg: "w-2 h-2"
    }
      , _ = f === "xs" ? g : i
      , y = E => {
        m && A && (E.stopPropagation(),
        window.open(A, "_blank"))
    }
    ;
    return r.jsxs("span", {
        onClick: y,
        className: `
        inline-flex items-center rounded-md font-medium
        transition-all duration-200 hover:scale-105
        ${j[f]}
        ${m && A ? "cursor-pointer hover:brightness-125" : ""}
      `,
        style: {
            backgroundColor: o.bg,
            border: `1px solid ${o.border}`,
            color: o.primary
        },
        children: [r.jsx("span", {
            className: `rounded-full ${w[f]}`,
            style: {
                backgroundColor: o.primary
            }
        }), _]
    })
}
const _t = T.memo(Mm);
function Cm({strategy: i, compact: f=!1}) {
    const {longExchange: m, shortExchange: o} = i;
    return f ? r.jsxs("div", {
        className: "flex items-center gap-1.5",
        children: [r.jsx("span", {
            className: "text-accent-green text-[10px] font-bold",
            children: "Long"
        }), r.jsx(_t, {
            exchange: m,
            size: "xs"
        }), r.jsx("span", {
            className: "text-accent-red text-[10px] font-bold",
            children: "Short"
        }), r.jsx(_t, {
            exchange: o,
            size: "xs"
        })]
    }) : r.jsxs("div", {
        className: "flex items-center gap-2",
        children: [r.jsxs("div", {
            className: "flex items-center gap-1.5 bg-accent-green/10 px-2 py-1 rounded-md border border-accent-green/20",
            children: [r.jsx("span", {
                className: "text-accent-green text-[10px] font-bold",
                children: "LONG"
            }), r.jsx(_t, {
                exchange: m,
                size: "xs"
            })]
        }), r.jsxs("div", {
            className: "flex items-center gap-1.5 bg-accent-red/10 px-2 py-1 rounded-md border border-accent-red/20",
            children: [r.jsx("span", {
                className: "text-accent-red text-[10px] font-bold",
                children: "SHORT"
            }), r.jsx(_t, {
                exchange: o,
                size: "xs"
            })]
        })]
    })
}
const Dm = T.memo(Cm);
function Om({isActive: i, onClick: f, size: m="sm", className: o=""}) {
    const g = {
        sm: "w-4 h-4",
        md: "w-5 h-5",
        lg: "w-6 h-6"
    }
      , A = j => {
        j.stopPropagation(),
        f?.()
    }
    ;
    return r.jsx("button", {
        onClick: A,
        className: `
        group/star p-1.5 rounded-lg transition-all duration-200
        ${i ? "text-yellow-500 hover:text-yellow-400" : "text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-hover)]"}
        ${o}
      `,
        title: i ? "Remove from Watchlist" : "Add to Watchlist",
        children: i ? r.jsx("svg", {
            className: `${g[m]} transition-transform group-hover/star:scale-110`,
            fill: "currentColor",
            viewBox: "0 0 20 20",
            children: r.jsx("path", {
                d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            })
        }) : r.jsx("svg", {
            className: `${g[m]} transition-transform group-hover/star:scale-110`,
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
            children: r.jsx("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 1.5,
                d: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            })
        })
    })
}
const r0 = T.memo(Om);
function Rm() {
    const [i,f] = T.useState({
        minutes: 0,
        seconds: 0
    });
    T.useEffect( () => {
        const o = () => {
            const A = new Date
              , j = A.getMinutes()
              , w = A.getSeconds()
              , _ = 59 - j
              , y = 59 - w;
            return {
                minutes: _,
                seconds: y
            }
        }
        ;
        f(o());
        const g = setInterval( () => {
            f(o())
        }
        , 1e3);
        return () => clearInterval(g)
    }
    , []);
    const m = o => o.toString().padStart(2, "0");
    return r.jsxs("div", {
        className: "flex items-center gap-1.5 text-[11px]",
        children: [r.jsx("span", {
            className: "text-[var(--color-text-muted)]",
            children: "Next Funding:"
        }), r.jsxs("span", {
            className: "text-[var(--color-text-primary)] font-mono font-bold tabular-nums",
            children: [m(i.minutes), ":", r.jsx("span", {
                className: "inline-block animate-fade-in",
                children: m(i.seconds)
            }, i.seconds)]
        })]
    })
}
const Zd = 20;
function Kd({data: i, compact: f}) {
    const m = i.value ?? 0
      , o = m < 1 ? 6 : 2;
    return r.jsx("div", {
        className: "font-mono",
        children: r.jsxs("span", {
            className: "text-[var(--color-text-primary)]/90",
            children: ["$", m.toLocaleString(void 0, {
                minimumFractionDigits: o,
                maximumFractionDigits: o
            })]
        })
    })
}
function Jd({data: i, compact: f}) {
    const m = i.value > 0
      , o = i.interval || 1
      , g = Math.abs(i.value * 100);
    return r.jsxs("div", {
        className: "font-mono text-right",
        children: [r.jsxs("span", {
            className: `${m ? "text-[var(--color-positive)]" : "text-[var(--color-negative)]"}`,
            children: [m ? "+" : "-", g.toFixed(4), "%"]
        }), r.jsxs("span", {
            className: "text-[var(--color-text-muted)] text-[9px] ml-1",
            children: ["/", o, "h"]
        })]
    })
}
function Bm({valueA: i, valueB: f, intervalA: m=1, intervalB: o=1}) {
    const g = (i ?? 0) / (m || 1)
      , A = (f ?? 0) / (o || 1)
      , j = (g - A) * 100
      , w = j >= 0;
    return r.jsxs("div", {
        className: "font-mono text-right",
        children: [r.jsxs("span", {
            className: "font-semibold text-yellow-400",
            children: [w ? "+" : "", j.toFixed(4), "%"]
        }), r.jsx("span", {
            className: "text-[var(--color-text-muted)] text-[9px] ml-1",
            children: "/1h"
        })]
    })
}
function wn({value: i, type: f="price"}) {
    const m = i > .5;
    return r.jsxs("div", {
        className: `
      inline-flex items-center px-2 py-1 rounded-md font-mono text-xs font-semibold
      ${m ? "bg-[var(--color-accent-muted)] text-[var(--color-accent)] border border-[var(--color-accent)]/20" : "bg-[var(--color-bg-hover)] text-[var(--color-text-secondary)] border border-[var(--color-border)]"}
    `,
        children: [f === "price" ? i.toFixed(2) : i.toFixed(0), "%"]
    })
}
function wm({item: i, isPriceGap: f, compact: m, isInWatchlist: o, onToggleWatchlist: g, onRowClick: A, type: j}) {
    return r.jsxs("div", {
        onClick: () => A?.(i),
        className: "p-3 bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl mb-2 cursor-pointer active:bg-[var(--color-bg-hover)] transition-colors touch-manipulation select-none",
        children: [r.jsxs("div", {
            className: "flex items-center justify-between",
            children: [r.jsxs("div", {
                className: "flex items-center gap-2",
                children: [r.jsx("div", {
                    className: "min-w-[44px] min-h-[44px] flex items-center justify-center -m-2",
                    onClick: w => {
                        w.stopPropagation(),
                        g?.(j, i.ticker, i.exchangeA, i.exchangeB)
                    }
                    ,
                    children: r.jsx(r0, {
                        isActive: o?.(j, i.ticker, i.exchangeA, i.exchangeB),
                        onClick: () => {}
                        ,
                        size: "md"
                    })
                }), r.jsx("span", {
                    className: "text-[var(--color-text-primary)] font-semibold text-sm",
                    children: i.ticker
                }), f && ( () => {
                    const w = i.priceA?.value ?? 0
                      , _ = i.priceB?.value ?? 0
                      , y = w < 1 ? 6 : 2
                      , E = _ < 1 ? 6 : 2;
                    return r.jsxs("div", {
                        className: "flex items-center gap-1.5 text-xs text-[var(--color-text-secondary)] font-mono",
                        children: [r.jsxs("span", {
                            children: ["$", w.toLocaleString(void 0, {
                                minimumFractionDigits: y,
                                maximumFractionDigits: y
                            })]
                        }), r.jsx("span", {
                            className: "text-[var(--color-text-muted)]",
                            children: "|"
                        }), r.jsxs("span", {
                            children: ["$", _.toLocaleString(void 0, {
                                minimumFractionDigits: E,
                                maximumFractionDigits: E
                            })]
                        })]
                    })
                }
                )(), !f && ( () => {
                    const w = i.fundingA?.interval || 1
                      , _ = i.fundingB?.interval || 1
                      , y = (i.fundingA?.value ?? 0) / w
                      , E = (i.fundingB?.value ?? 0) / _
                      , C = (y - E) * 100;
                    return r.jsxs("span", {
                        className: "text-xs font-mono text-yellow-400",
                        children: [C >= 0 ? "+" : "", C.toFixed(4), "%/1h"]
                    })
                }
                )()]
            }), f ? r.jsx(wn, {
                value: i.priceGap,
                type: "price"
            }) : r.jsx(wn, {
                value: i.apr,
                type: "funding"
            })]
        }), r.jsxs("div", {
            className: "mt-2 pl-10 flex items-center gap-1.5 text-xs",
            children: [r.jsx("span", {
                className: "text-[var(--color-positive)]",
                children: "Long"
            }), r.jsx(_t, {
                exchange: i.strategy?.longExchange,
                size: "sm",
                clickable: !1
            }), r.jsx("span", {
                className: "mx-1 text-[var(--color-text-muted)]/50",
                children: "·"
            }), r.jsx("span", {
                className: "text-[var(--color-negative)]",
                children: "Short"
            }), r.jsx(_t, {
                exchange: i.strategy?.shortExchange,
                size: "sm",
                clickable: !1
            })]
        })]
    })
}
function Hm({type: i="price", data: f=[], pairCount: m=0, refreshRate: o="2.5s", onRowClick: g, compact: A=!1, isInWatchlist: j, onToggleWatchlist: w, onAlertSettings: _, watchlistItems: y=[], onRefresh: E}) {
    const C = i === "price"
      , G = C ? "Price Gap Monitor" : "Funding Rate Monitor"
      , ee = C ? "Price Gap" : "Funding Rate"
      , [q,D] = T.useState(Zd)
      , [H,Q] = T.useState(!1)
      , [J,le] = T.useState(0)
      , ce = T.useRef(0)
      , je = T.useRef(null)
      , Me = T.useCallback(k => {
        je.current?.scrollTop === 0 && (ce.current = k.touches[0].clientY)
    }
    , [])
      , I = T.useCallback(k => {
        if (je.current?.scrollTop === 0 && ce.current > 0) {
            const me = k.touches[0].clientY - ce.current;
            me > 0 && me < 100 && le(me)
        }
    }
    , [])
      , he = T.useCallback(async () => {
        if (J > 60 && E) {
            Q(!0);
            try {
                await E()
            } finally {
                Q(!1)
            }
        }
        le(0),
        ce.current = 0
    }
    , [J, E])
      , Ce = T.useCallback(k => {
        g?.(k)
    }
    , [g])
      , we = T.useCallback( (k, me, z, U) => {
        w?.(k, me, z, U)
    }
    , [w])
      , He = T.useMemo( () => {
        const k = new Map;
        return y.forEach(me => {
            const z = `${me.type}-${me.ticker}-${me.exchangeA}-${me.exchangeB}`;
            k.set(z, me)
        }
        ),
        k
    }
    , [y])
      , Te = T.useMemo( () => f.slice(0, q), [f, q])
      , Qe = f.length > q;
    return r.jsxs("div", {
        className: "bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl h-full flex flex-col overflow-hidden animate-fade-in",
        children: [r.jsxs("div", {
            className: "px-4 md:px-5 py-3 md:py-4 border-b border-[var(--color-border)] flex items-center justify-between",
            children: [r.jsxs("div", {
                className: "flex items-center gap-2 md:gap-3",
                children: [r.jsxs("h2", {
                    className: "text-[var(--color-text-primary)] font-semibold text-sm tracking-tight",
                    children: [r.jsx("span", {
                        className: "md:hidden",
                        children: ee
                    }), r.jsx("span", {
                        className: "hidden md:inline",
                        children: G
                    })]
                }), C && r.jsxs("div", {
                    className: "items-center gap-1.5 hidden lg:flex",
                    children: [r.jsx("span", {
                        className: "text-[var(--color-text-muted)] text-[10px]",
                        children: "by"
                    }), r.jsx("a", {
                        href: "https://t.me/Katzenote",
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "p-1.5 rounded-lg hover:bg-[var(--color-bg-hover)] text-[var(--color-text-muted)] hover:text-[#26A5E4] transition-colors",
                        title: "Telegram",
                        children: r.jsx("svg", {
                            className: "w-3.5 h-3.5",
                            fill: "currentColor",
                            viewBox: "0 0 24 24",
                            children: r.jsx("path", {
                                d: "M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"
                            })
                        })
                    }), r.jsx("a", {
                        href: "https://www.youtube.com/@cryptokatze",
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "p-1.5 rounded-lg hover:bg-[var(--color-bg-hover)] text-[var(--color-text-muted)] hover:text-[#FF0000] transition-colors",
                        title: "YouTube",
                        children: r.jsx("svg", {
                            className: "w-3.5 h-3.5",
                            fill: "currentColor",
                            viewBox: "0 0 24 24",
                            children: r.jsx("path", {
                                d: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
                            })
                        })
                    }), r.jsx("a", {
                        href: "https://linktr.ee/cryptokatze",
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "p-1.5 rounded-lg hover:bg-[var(--color-bg-hover)] text-[var(--color-text-muted)] hover:text-[#43E55E] transition-colors",
                        title: "Linktree",
                        children: r.jsx("svg", {
                            className: "w-3.5 h-3.5",
                            fill: "currentColor",
                            viewBox: "0 0 24 24",
                            children: r.jsx("path", {
                                d: "M7.953 15.066l-.038.001c-.931 0-1.69-.761-1.69-1.707 0-.944.756-1.706 1.688-1.706h.04c.931 0 1.689.762 1.689 1.706 0 .946-.758 1.706-1.689 1.706zm8.132 0c-.932 0-1.69-.761-1.69-1.707 0-.944.756-1.706 1.688-1.706h.04c.931 0 1.689.762 1.689 1.706 0 .946-.757 1.706-1.688 1.706h-.039zM12 8.818c-.932 0-1.69-.762-1.69-1.707C10.31 6.166 11.068 5.4 12 5.4h.04c.932 0 1.69.762 1.69 1.707 0 .945-.758 1.706-1.69 1.706L12 8.818zm0 12.727c-.932 0-1.69-.762-1.69-1.707s.756-1.707 1.688-1.707h.04c.932 0 1.69.762 1.69 1.707s-.758 1.707-1.69 1.707H12z"
                            })
                        })
                    })]
                })]
            }), r.jsxs("div", {
                className: "flex items-center gap-2 md:gap-3",
                children: [!C && r.jsx(Rm, {}), r.jsxs("div", {
                    className: "flex items-center gap-1.5 md:gap-2 text-[var(--color-text-muted)] text-[11px] md:text-[11px] bg-[var(--color-bg-tertiary)] px-2 md:px-3 py-1.5 rounded-lg",
                    children: [r.jsx("span", {
                        className: "w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse"
                    }), r.jsx("span", {
                        children: m
                    }), r.jsx("span", {
                        className: "text-[var(--color-text-muted)]/50",
                        children: "·"
                    }), r.jsx("span", {
                        children: o
                    })]
                })]
            })]
        }), r.jsxs("div", {
            className: "flex-1 overflow-auto hidden md:block",
            role: "region",
            "aria-label": G,
            children: [r.jsxs("table", {
                className: "w-full",
                role: "table",
                children: [r.jsx("thead", {
                    className: "sticky top-0 z-10",
                    children: r.jsxs("tr", {
                        className: "bg-[var(--color-bg-secondary)]/95 backdrop-blur-sm border-b border-[var(--color-border)]",
                        children: [r.jsx("th", {
                            scope: "col",
                            className: "w-10 px-2 py-3",
                            "aria-label": "Actions"
                        }), r.jsx("th", {
                            scope: "col",
                            className: "text-left px-5 py-3 text-[10px] font-semibold text-[var(--color-text-muted)] uppercase tracking-wider",
                            children: "Ticker"
                        }), r.jsx("th", {
                            scope: "col",
                            className: "text-left px-5 py-3 text-[10px] font-semibold text-[var(--color-text-muted)] uppercase tracking-wider",
                            children: "Exchanges"
                        }), C ? r.jsxs(r.Fragment, {
                            children: [r.jsx("th", {
                                scope: "col",
                                className: "text-right px-5 py-3 text-[10px] font-semibold text-[var(--color-text-muted)] uppercase tracking-wider hidden lg:table-cell",
                                children: "Price A"
                            }), r.jsx("th", {
                                scope: "col",
                                className: "text-right px-5 py-3 text-[10px] font-semibold text-[var(--color-text-muted)] uppercase tracking-wider hidden lg:table-cell",
                                children: "Price B"
                            }), r.jsx("th", {
                                scope: "col",
                                className: "text-right px-5 py-3 text-[10px] font-semibold text-[var(--color-text-muted)] uppercase tracking-wider",
                                children: "Gap"
                            })]
                        }) : r.jsxs(r.Fragment, {
                            children: [r.jsx("th", {
                                scope: "col",
                                className: "text-right px-5 py-3 text-[10px] font-semibold text-[var(--color-text-muted)] uppercase tracking-wider hidden lg:table-cell",
                                children: "Rate A"
                            }), r.jsx("th", {
                                scope: "col",
                                className: "text-right px-5 py-3 text-[10px] font-semibold text-[var(--color-text-muted)] uppercase tracking-wider hidden lg:table-cell",
                                children: "Rate B"
                            }), r.jsx("th", {
                                scope: "col",
                                className: "text-right px-5 py-3 text-[10px] font-semibold text-[var(--color-text-muted)] uppercase tracking-wider hidden xl:table-cell",
                                children: "A-B"
                            }), r.jsx("th", {
                                scope: "col",
                                className: "text-right px-5 py-3 text-[10px] font-semibold text-[var(--color-text-muted)] uppercase tracking-wider",
                                children: "APR"
                            }), r.jsx("th", {
                                scope: "col",
                                className: "text-right px-5 py-3 text-[10px] font-semibold text-[var(--color-text-muted)] uppercase tracking-wider hidden xl:table-cell",
                                children: "Price Gap"
                            })]
                        }), r.jsx("th", {
                            scope: "col",
                            className: "text-left px-5 py-3 text-[10px] font-semibold text-[var(--color-text-muted)] uppercase tracking-wider hidden xl:table-cell",
                            children: "Strategy"
                        })]
                    })
                }), r.jsx("tbody", {
                    className: "divide-y divide-[var(--color-border)]",
                    children: f.map( (k, me) => {
                        const z = `${i}-${k.ticker}-${k.exchangeA}-${k.exchangeB}`
                          , U = He.get(z)
                          , K = j?.(i, k.ticker, k.exchangeA, k.exchangeB);
                        return r.jsxs("tr", {
                            onClick: () => Ce(k),
                            className: "group hover:bg-[var(--color-bg-hover)] cursor-pointer transition-colors duration-150",
                            style: {
                                animationDelay: `${me * 20}ms`
                            },
                            children: [r.jsx("td", {
                                className: "px-2 py-3",
                                children: r.jsxs("div", {
                                    className: "flex items-center gap-1",
                                    children: [r.jsx(r0, {
                                        isActive: K,
                                        onClick: () => we(i, k.ticker, k.exchangeA, k.exchangeB),
                                        size: "sm"
                                    }), _ && K && r.jsx("button", {
                                        onClick: V => {
                                            V.stopPropagation(),
                                            U && _(U)
                                        }
                                        ,
                                        className: `p-1.5 rounded-lg transition-all ${U?.alertEnabled ? "text-yellow-500 hover:text-yellow-400" : "text-[var(--color-text-muted)] hover:text-yellow-500"}`,
                                        title: "Alert Settings",
                                        "aria-label": `Alert settings for ${k.ticker}`,
                                        children: r.jsx("svg", {
                                            className: "w-4 h-4",
                                            fill: U?.alertEnabled ? "currentColor" : "none",
                                            stroke: "currentColor",
                                            viewBox: "0 0 24 24",
                                            children: r.jsx("path", {
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeWidth: 2,
                                                d: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                            })
                                        })
                                    })]
                                })
                            }), r.jsx("td", {
                                className: "px-5 py-3",
                                children: r.jsx("span", {
                                    className: "text-[var(--color-text-primary)] font-medium text-[13px]",
                                    children: k.ticker
                                })
                            }), r.jsx("td", {
                                className: "px-5 py-3",
                                children: r.jsxs("div", {
                                    className: "flex items-center gap-1.5",
                                    children: [r.jsx(_t, {
                                        exchange: k.exchangeA,
                                        size: "sm"
                                    }), r.jsx("span", {
                                        className: "text-[var(--color-text-muted)]/50 text-[10px]",
                                        children: "↔"
                                    }), r.jsx(_t, {
                                        exchange: k.exchangeB,
                                        size: "sm"
                                    })]
                                })
                            }), C ? r.jsxs(r.Fragment, {
                                children: [r.jsx("td", {
                                    className: "px-5 py-3 text-right hidden lg:table-cell",
                                    children: r.jsx(Kd, {
                                        data: k.priceA,
                                        compact: A
                                    })
                                }), r.jsx("td", {
                                    className: "px-5 py-3 text-right hidden lg:table-cell",
                                    children: r.jsx(Kd, {
                                        data: k.priceB,
                                        compact: A
                                    })
                                }), r.jsx("td", {
                                    className: "px-5 py-3 text-right",
                                    children: r.jsx(wn, {
                                        value: k.priceGap,
                                        type: "price"
                                    })
                                })]
                            }) : r.jsxs(r.Fragment, {
                                children: [r.jsx("td", {
                                    className: "px-5 py-3 text-right hidden lg:table-cell",
                                    children: r.jsx(Jd, {
                                        data: k.fundingA,
                                        compact: A
                                    })
                                }), r.jsx("td", {
                                    className: "px-5 py-3 text-right hidden lg:table-cell",
                                    children: r.jsx(Jd, {
                                        data: k.fundingB,
                                        compact: A
                                    })
                                }), r.jsx("td", {
                                    className: "px-5 py-3 text-right hidden xl:table-cell",
                                    children: r.jsx(Bm, {
                                        valueA: k.fundingA?.value,
                                        valueB: k.fundingB?.value,
                                        intervalA: k.fundingA?.interval,
                                        intervalB: k.fundingB?.interval
                                    })
                                }), r.jsx("td", {
                                    className: "px-5 py-3 text-right",
                                    children: r.jsx(wn, {
                                        value: k.apr,
                                        type: "funding"
                                    })
                                }), r.jsx("td", {
                                    className: "px-5 py-3 text-right hidden xl:table-cell",
                                    children: r.jsx(wn, {
                                        value: k.priceGap || 0,
                                        type: "price"
                                    })
                                })]
                            }), r.jsx("td", {
                                className: "px-5 py-3 hidden xl:table-cell",
                                children: r.jsx(Dm, {
                                    strategy: k.strategy,
                                    compact: A
                                })
                            })]
                        }, k.id)
                    }
                    )
                })]
            }), f.length === 0 && r.jsx("div", {
                className: "flex items-center justify-center h-40 text-[var(--color-text-muted)] text-sm",
                children: "No opportunities detected"
            })]
        }), r.jsxs("div", {
            ref: je,
            className: "flex-1 overflow-auto md:hidden p-4 overscroll-contain",
            onTouchStart: Me,
            onTouchMove: I,
            onTouchEnd: he,
            children: [(J > 0 || H) && r.jsx("div", {
                className: "flex items-center justify-center py-2 text-[var(--color-text-muted)] text-xs transition-all",
                style: {
                    height: H ? 40 : J * .5
                },
                children: H ? r.jsxs("div", {
                    className: "flex items-center gap-2",
                    children: [r.jsxs("svg", {
                        className: "w-4 h-4 animate-spin",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        children: [r.jsx("circle", {
                            className: "opacity-25",
                            cx: "12",
                            cy: "12",
                            r: "10",
                            stroke: "currentColor",
                            strokeWidth: "4"
                        }), r.jsx("path", {
                            className: "opacity-75",
                            fill: "currentColor",
                            d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        })]
                    }), "Refreshing..."]
                }) : J > 60 ? "Release to refresh" : "Pull to refresh"
            }), f.length === 0 ? r.jsx("div", {
                className: "flex items-center justify-center h-40 text-[var(--color-text-muted)] text-base",
                children: "No opportunities detected"
            }) : r.jsxs("div", {
                className: "space-y-3",
                children: [Te.map(k => r.jsx(wm, {
                    item: k,
                    isPriceGap: C,
                    compact: A,
                    isInWatchlist: j,
                    onToggleWatchlist: we,
                    onRowClick: Ce,
                    type: i
                }, k.id)), Qe && r.jsxs("button", {
                    onClick: () => D(k => k + Zd),
                    className: "w-full py-3 mt-2 text-sm text-[var(--color-accent)] bg-[var(--color-bg-tertiary)] rounded-xl font-medium active:bg-[var(--color-bg-hover)] transition-colors",
                    children: ["Load more (", f.length - q, " remaining)"]
                })]
            })]
        })]
    })
}
const tc = T.memo(Hm);
function Um({item: i, onClick: f, onRemove: m, onAlertSettings: o}) {
    const g = i.currentData
      , A = i.type === "price";
    if (!g)
        return r.jsx("div", {
            className: "bg-[var(--color-bg-card)] rounded-2xl p-4 border border-[var(--color-border)] animate-pulse",
            children: r.jsx("div", {
                className: "h-20 bg-[var(--color-bg-tertiary)] rounded-xl"
            })
        });
    const j = A ? g.priceGap : g.apr
      , w = j > .5;
    return r.jsxs("div", {
        onClick: f,
        className: "bg-[var(--color-bg-card)] rounded-2xl p-4 border border-[var(--color-border)] hover:border-[var(--color-accent)]/30 transition-all duration-200 cursor-pointer group",
        children: [r.jsxs("div", {
            className: "flex items-center justify-between mb-3",
            children: [r.jsxs("div", {
                className: "flex items-center gap-2",
                children: [r.jsx("span", {
                    className: "text-[var(--color-text-primary)] font-semibold text-lg",
                    children: i.ticker
                }), r.jsx("span", {
                    className: `text-[10px] px-1.5 py-0.5 rounded ${A ? "bg-blue-500/20 text-blue-500" : "bg-purple-500/20 text-purple-500"}`,
                    children: A ? "PRICE" : "FUNDING"
                })]
            }), r.jsxs("div", {
                className: "flex items-center gap-2",
                children: [r.jsx("button", {
                    onClick: _ => {
                        _.stopPropagation(),
                        o?.()
                    }
                    ,
                    className: `p-2.5 rounded-xl transition-all shadow-sm ${i.alertEnabled ? "bg-yellow-400 text-yellow-900 border-2 border-yellow-500" : "bg-yellow-500 text-white hover:bg-yellow-400 border-2 border-yellow-600"}`,
                    title: "Alert Settings",
                    children: r.jsx("svg", {
                        className: "w-5 h-5",
                        fill: i.alertEnabled ? "currentColor" : "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        children: r.jsx("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                            d: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                        })
                    })
                }), r.jsx("button", {
                    onClick: _ => {
                        _.stopPropagation(),
                        m?.()
                    }
                    ,
                    className: "p-2.5 rounded-xl bg-gray-500 text-white hover:bg-red-500 transition-all shadow-sm border-2 border-gray-600 hover:border-red-600",
                    title: "Remove from Watchlist",
                    children: r.jsx("svg", {
                        className: "w-5 h-5",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        children: r.jsx("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                            d: "M6 18L18 6M6 6l12 12"
                        })
                    })
                })]
            })]
        }), r.jsxs("div", {
            className: "flex items-center gap-2 mb-4",
            children: [r.jsx(_t, {
                exchange: i.exchangeA,
                size: "sm"
            }), r.jsx("span", {
                className: "text-[var(--color-text-muted)] text-xs",
                children: "↔"
            }), r.jsx(_t, {
                exchange: i.exchangeB,
                size: "sm"
            })]
        }), r.jsx("div", {
            className: "grid grid-cols-2 gap-3",
            children: A ? r.jsxs(r.Fragment, {
                children: [r.jsxs("div", {
                    className: "bg-[var(--color-bg-tertiary)] rounded-xl p-3",
                    children: [r.jsx("span", {
                        className: "text-[var(--color-text-muted)] text-[10px] uppercase tracking-wider block mb-1",
                        children: "Price A"
                    }), r.jsxs("span", {
                        className: "text-[var(--color-text-primary)] font-mono text-sm",
                        children: ["$", (g.priceA?.value ?? 0).toLocaleString(void 0, {
                            minimumFractionDigits: g.priceA?.value < 1 ? 6 : 2,
                            maximumFractionDigits: g.priceA?.value < 1 ? 6 : 2
                        })]
                    })]
                }), r.jsxs("div", {
                    className: "bg-[var(--color-bg-tertiary)] rounded-xl p-3",
                    children: [r.jsx("span", {
                        className: "text-[var(--color-text-muted)] text-[10px] uppercase tracking-wider block mb-1",
                        children: "Price B"
                    }), r.jsxs("span", {
                        className: "text-[var(--color-text-primary)] font-mono text-sm",
                        children: ["$", (g.priceB?.value ?? 0).toLocaleString(void 0, {
                            minimumFractionDigits: g.priceB?.value < 1 ? 6 : 2,
                            maximumFractionDigits: g.priceB?.value < 1 ? 6 : 2
                        })]
                    })]
                })]
            }) : r.jsxs(r.Fragment, {
                children: [r.jsxs("div", {
                    className: "bg-[var(--color-bg-tertiary)] rounded-xl p-3",
                    children: [r.jsx("span", {
                        className: "text-[var(--color-text-muted)] text-[10px] uppercase tracking-wider block mb-1",
                        children: "Rate A"
                    }), r.jsxs("span", {
                        className: `font-mono text-sm ${g.fundingA?.value > 0 ? "text-[var(--color-positive)]" : "text-[var(--color-negative)]"}`,
                        children: [g.fundingA?.value > 0 ? "+" : "", (g.fundingA?.value * (g.fundingA?.interval || 8) * 100).toFixed(4), "%"]
                    }), r.jsxs("span", {
                        className: "text-[var(--color-text-muted)] text-[9px] ml-1",
                        children: ["/", g.fundingA?.interval || 8, "h"]
                    })]
                }), r.jsxs("div", {
                    className: "bg-[var(--color-bg-tertiary)] rounded-xl p-3",
                    children: [r.jsx("span", {
                        className: "text-[var(--color-text-muted)] text-[10px] uppercase tracking-wider block mb-1",
                        children: "Rate B"
                    }), r.jsxs("span", {
                        className: `font-mono text-sm ${g.fundingB?.value > 0 ? "text-[var(--color-positive)]" : "text-[var(--color-negative)]"}`,
                        children: [g.fundingB?.value > 0 ? "+" : "", (g.fundingB?.value * (g.fundingB?.interval || 8) * 100).toFixed(4), "%"]
                    }), r.jsxs("span", {
                        className: "text-[var(--color-text-muted)] text-[9px] ml-1",
                        children: ["/", g.fundingB?.interval || 8, "h"]
                    })]
                })]
            })
        }), r.jsxs("div", {
            className: "mt-3 flex items-center justify-between",
            children: [r.jsx("span", {
                className: "text-[var(--color-text-muted)] text-xs",
                children: A ? "Price Gap" : "APR"
            }), r.jsxs("div", {
                className: `
          inline-flex items-center px-3 py-1.5 rounded-lg font-mono text-sm font-semibold
          ${w ? "bg-[var(--color-accent-muted)] text-[var(--color-accent)] border border-[var(--color-accent)]/20" : "bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] border border-[var(--color-border)]"}
        `,
                children: [A ? j.toFixed(2) : j.toFixed(0), "%"]
            })]
        }), i.alertEnabled && i.alertThreshold && r.jsxs("div", {
            className: "mt-3 flex items-center gap-2 text-[10px] text-yellow-600 dark:text-yellow-400",
            children: [r.jsx("svg", {
                className: "w-3 h-3",
                fill: "currentColor",
                viewBox: "0 0 20 20",
                children: r.jsx("path", {
                    d: "M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6z"
                })
            }), "Alert at ", i.alertThreshold, "%"]
        })]
    })
}
function Gm({priceGaps: i, fundingGaps: f, watchlistData: m, viewMode: o, onViewModeChange: g, onRowClick: A, isInWatchlist: j, onToggleWatchlist: w, onAlertSettings: _, refreshInterval: y}) {
    const E = m.filter(D => D.type === "price")
      , C = m.filter(D => D.type === "funding")
      , G = i.filter(D => E.some(H => H.ticker === D.ticker && H.exchangeA === D.exchangeA && H.exchangeB === D.exchangeB))
      , ee = f.filter(D => C.some(H => H.ticker === D.ticker && H.exchangeA === D.exchangeA && H.exchangeB === D.exchangeB))
      , q = m.length === 0;
    return r.jsxs("div", {
        className: "p-6 h-full",
        children: [r.jsxs("div", {
            className: "flex items-center justify-between mb-4",
            children: [r.jsxs("div", {
                children: [r.jsx("h1", {
                    className: "text-white font-semibold text-lg",
                    children: "My Watchlist"
                }), r.jsxs("p", {
                    className: "text-white/40 text-sm mt-0.5",
                    children: [m.length, " saved pairs"]
                })]
            }), !q && r.jsxs("div", {
                className: "flex items-center gap-2 bg-white/[0.04] rounded-lg p-1",
                children: [r.jsx("button", {
                    onClick: () => g?.("table"),
                    className: `px-3 py-1.5 rounded-md text-xs font-medium transition-all ${o === "table" ? "bg-white/[0.08] text-white" : "text-white/40 hover:text-white/60"}`,
                    children: r.jsx("svg", {
                        className: "w-4 h-4",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        children: r.jsx("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 1.5,
                            d: "M4 6h16M4 10h16M4 14h16M4 18h16"
                        })
                    })
                }), r.jsx("button", {
                    onClick: () => g?.("card"),
                    className: `px-3 py-1.5 rounded-md text-xs font-medium transition-all ${o === "card" ? "bg-white/[0.08] text-white" : "text-white/40 hover:text-white/60"}`,
                    children: r.jsx("svg", {
                        className: "w-4 h-4",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        children: r.jsx("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 1.5,
                            d: "M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
                        })
                    })
                })]
            })]
        }), q ? r.jsxs("div", {
            className: "flex flex-col items-center justify-center h-[60vh] text-center",
            children: [r.jsx("div", {
                className: "w-16 h-16 rounded-2xl bg-white/[0.04] flex items-center justify-center mb-4",
                children: r.jsx("svg", {
                    className: "w-8 h-8 text-white/20",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: r.jsx("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 1.5,
                        d: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    })
                })
            }), r.jsx("h3", {
                className: "text-white/80 font-medium mb-2",
                children: "No pairs saved yet"
            }), r.jsx("p", {
                className: "text-white/40 text-sm max-w-sm",
                children: "Click the star icon next to any pair in the Dashboard to add it to your Watchlist."
            })]
        }) : o === "card" ? r.jsx("div", {
            className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
            children: m.map(D => r.jsx(Um, {
                item: D,
                onClick: () => A?.(D.currentData, D.type),
                onRemove: () => w?.(D.type, D.ticker, D.exchangeA, D.exchangeB),
                onAlertSettings: () => _?.(D)
            }, D.id))
        }) : r.jsxs("div", {
            className: "flex flex-col gap-4 h-[calc(100vh-180px)]",
            children: [G.length > 0 && r.jsx("div", {
                className: "flex-1 min-h-0 overflow-hidden",
                children: r.jsx(tc, {
                    type: "price",
                    data: G,
                    pairCount: G.length,
                    refreshRate: `${y / 1e3}s`,
                    onRowClick: D => A?.(D, "price"),
                    isInWatchlist: j,
                    onToggleWatchlist: w,
                    onAlertSettings: _,
                    watchlistItems: E,
                    compact: !0
                })
            }), ee.length > 0 && r.jsx("div", {
                className: "flex-1 min-h-0 overflow-hidden",
                children: r.jsx(tc, {
                    type: "funding",
                    data: ee,
                    pairCount: ee.length,
                    refreshRate: `${y / 1e3}s`,
                    onRowClick: D => A?.(D, "funding"),
                    isInWatchlist: j,
                    onToggleWatchlist: w,
                    onAlertSettings: _,
                    watchlistItems: C,
                    compact: !0
                })
            })]
        })]
    })
}
function Lm({isOpen: i, onClose: f, item: m, onSave: o, notificationPermission: g, onRequestPermission: A, soundEnabled: j, onToggleSound: w, onTestSound: _}) {
    const [y,E] = T.useState("")
      , [C,G] = T.useState(!1);
    if (T.useEffect( () => {
        m && (E(m.alertThreshold?.toString() || ""),
        G(m.alertEnabled || !1))
    }
    , [m]),
    !i || !m)
        return null;
    const ee = () => {
        const H = y ? parseFloat(y) : null;
        o?.(H, C && H !== null),
        f?.()
    }
      , q = async () => {
        if (!C && g !== "granted" && await A?.() !== "granted") {
            console.log("[AlertModal] Permission denied");
            return
        }
        G(!C)
    }
      , D = m.type === "price";
    return r.jsx("div", {
        className: "fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/60 backdrop-blur-sm",
        onClick: f,
        role: "presentation",
        children: r.jsxs("div", {
            className: "bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-t-2xl md:rounded-2xl p-4 md:p-6 w-full md:max-w-md md:mx-4 animate-slide-in-up md:animate-fade-in",
            onClick: H => H.stopPropagation(),
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": "alert-modal-title",
            children: [r.jsx("div", {
                className: "md:hidden w-12 h-1.5 bg-[var(--color-border)] rounded-full mx-auto mb-4"
            }), r.jsxs("div", {
                className: "flex items-center justify-between mb-6",
                children: [r.jsx("h3", {
                    id: "alert-modal-title",
                    className: "text-[var(--color-text-primary)] font-semibold text-lg",
                    children: "Alert Settings"
                }), r.jsx("button", {
                    onClick: f,
                    className: "p-1.5 rounded-lg hover:bg-[var(--color-bg-hover)] text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors",
                    "aria-label": "Close alert settings",
                    children: r.jsx("svg", {
                        className: "w-5 h-5",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        children: r.jsx("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 1.5,
                            d: "M6 18L18 6M6 6l12 12"
                        })
                    })
                })]
            }), r.jsxs("div", {
                className: "bg-[var(--color-bg-tertiary)] rounded-xl p-4 mb-6",
                children: [r.jsxs("div", {
                    className: "flex items-center gap-3 mb-2",
                    children: [r.jsx("span", {
                        className: "text-[var(--color-text-primary)] font-semibold text-lg",
                        children: m.ticker
                    }), r.jsx("span", {
                        className: `text-[10px] px-1.5 py-0.5 rounded ${D ? "bg-blue-500/20 text-blue-400" : "bg-purple-500/20 text-purple-400"}`,
                        children: D ? "PRICE" : "FUNDING"
                    })]
                }), r.jsxs("div", {
                    className: "flex items-center gap-2",
                    children: [r.jsx(_t, {
                        exchange: m.exchangeA,
                        size: "sm"
                    }), r.jsx("span", {
                        className: "text-[var(--color-text-muted)] text-xs",
                        children: "↔"
                    }), r.jsx(_t, {
                        exchange: m.exchangeB,
                        size: "sm"
                    })]
                })]
            }), r.jsxs("div", {
                className: "mb-6",
                children: [r.jsx("label", {
                    className: "block text-[var(--color-text-secondary)] text-sm mb-2",
                    children: "Alert Threshold (%)"
                }), r.jsxs("div", {
                    className: "relative",
                    children: [r.jsx("input", {
                        type: "number",
                        step: "0.1",
                        min: "0",
                        value: y,
                        onChange: H => E(H.target.value),
                        placeholder: D ? "e.g. 0.5" : "e.g. 50",
                        className: "w-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-xl px-4 py-3 text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                    }), r.jsx("span", {
                        className: "absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]",
                        children: "%"
                    })]
                }), r.jsx("p", {
                    className: "text-[var(--color-text-muted)] text-xs mt-2",
                    children: D ? "Get notified when price gap exceeds this threshold" : "Get notified when APR exceeds this threshold"
                })]
            }), r.jsxs("div", {
                className: "flex items-center justify-between mb-4 bg-[var(--color-bg-tertiary)] rounded-xl p-4",
                children: [r.jsxs("div", {
                    children: [r.jsx("span", {
                        className: "text-[var(--color-text-primary)] text-sm",
                        children: "Enable Alert"
                    }), g !== "granted" && r.jsx("p", {
                        className: "text-[var(--color-warning)] text-xs mt-1",
                        children: "Browser notification permission required"
                    })]
                }), r.jsx("button", {
                    onClick: q,
                    role: "switch",
                    "aria-checked": C,
                    "aria-label": "Enable alert",
                    className: `relative w-12 h-6 rounded-full transition-colors ${C ? "bg-[var(--color-accent)]" : "bg-[var(--color-bg-hover)]"}`,
                    children: r.jsx("span", {
                        className: `absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${C ? "translate-x-7" : "translate-x-1"}`
                    })
                })]
            }), r.jsxs("div", {
                className: "flex items-center justify-between mb-6 bg-[var(--color-bg-tertiary)] rounded-xl p-4",
                children: [r.jsxs("div", {
                    className: "flex-1",
                    children: [r.jsx("span", {
                        className: "text-[var(--color-text-primary)] text-sm",
                        children: "Sound Notification"
                    }), r.jsx("p", {
                        className: "text-[var(--color-text-muted)] text-xs mt-1",
                        children: "Play alert sound when threshold is exceeded"
                    })]
                }), r.jsxs("div", {
                    className: "flex items-center gap-3",
                    children: [r.jsx("button", {
                        onClick: _,
                        className: "p-2 rounded-lg bg-[var(--color-bg-hover)] hover:bg-[var(--color-accent-muted)] text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors",
                        title: "Test sound",
                        children: r.jsx("svg", {
                            className: "w-4 h-4",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24",
                            strokeWidth: 1.5,
                            children: r.jsx("path", {
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                d: "M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
                            })
                        })
                    }), r.jsx("button", {
                        onClick: w,
                        role: "switch",
                        "aria-checked": j,
                        "aria-label": "Enable sound notification",
                        className: `relative w-12 h-6 rounded-full transition-colors ${j ? "bg-[var(--color-accent)]" : "bg-[var(--color-bg-hover)]"}`,
                        children: r.jsx("span", {
                            className: `absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${j ? "translate-x-7" : "translate-x-1"}`
                        })
                    })]
                })]
            }), r.jsxs("div", {
                className: "flex gap-3",
                children: [r.jsx("button", {
                    onClick: f,
                    className: "flex-1 px-4 py-3 rounded-xl bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-hover)] hover:text-[var(--color-text-primary)] transition-colors font-medium",
                    children: "Cancel"
                }), r.jsx("button", {
                    onClick: ee,
                    className: "flex-1 px-4 py-3 rounded-xl bg-[var(--color-accent-muted)] text-[var(--color-accent)] hover:bg-[var(--color-accent)]/30 transition-colors font-medium",
                    children: "Save"
                })]
            })]
        })
    })
}
const $d = {
    log: (...i) => {}
    ,
    warn: (...i) => {
        console.warn(...i)
    }
    ,
    error: (...i) => {
        console.error(...i)
    }
    ,
    debug: (...i) => {}
    ,
    sensitive: () => {}
    ,
    trade: (...i) => {}
};
async function Ym() {
    try {
        const i = await fetch("https://api.upbit.com/v1/ticker?markets=KRW-USDT");
        if (!i.ok)
            throw new Error(`HTTP ${i.status}`);
        const [f] = await i.json()
          , m = f?.trade_price;
        if (typeof m != "number")
            throw new Error("Invalid response structure");
        return $d.log(`[ExchangeRate] USDT/KRW: ${m}`),
        m
    } catch (i) {
        return $d.error("[ExchangeRate] USDT/KRW fetch failed:", i.message),
        null
    }
}
function qm(i, f) {
    return !i || !f || f === 0 ? 0 : (i - f) / f * 100
}
const km = 6e4
  , s0 = "exchange-rates-cache"
  , Vm = () => {
    try {
        const i = localStorage.getItem(s0);
        if (i) {
            const {usdKrw: f, usdtKrw: m} = JSON.parse(i);
            return {
                usdKrw: f,
                usdtKrw: m
            }
        }
    } catch (i) {
        console.warn("[ExchangeRate] Cache load failed:", i)
    }
    return {
        usdKrw: null,
        usdtKrw: null
    }
}
  , Wd = (i, f) => {
    try {
        localStorage.setItem(s0, JSON.stringify({
            usdKrw: i,
            usdtKrw: f
        }))
    } catch (m) {
        console.warn("[ExchangeRate] Cache save failed:", m)
    }
}
;
function Qm({connections: i=0, usdKrw: f=null}) {
    const m = Vm()
      , [o,g] = T.useState(f || m.usdKrw)
      , [A,j] = T.useState(m.usdtKrw);
    T.useEffect( () => {
        f && (g(f),
        Wd(f, A))
    }
    , [f, A]);
    const w = T.useCallback(async () => {
        const E = await Ym();
        E !== null && (j(E),
        Wd(o, E))
    }
    , [o]);
    if (T.useEffect( () => {
        w();
        const E = setInterval(w, km);
        return () => clearInterval(E)
    }
    , [w]),
    o === null || A === null)
        return r.jsx("div", {
            className: "ml-auto flex items-center gap-3 text-xs text-[var(--color-text-muted)]",
            children: r.jsx("span", {
                className: "animate-pulse",
                children: "Loading rates..."
            })
        });
    const _ = qm(A, o)
      , y = _.toFixed(2);
    return r.jsxs("div", {
        className: "ml-auto flex items-center gap-3 text-xs",
        children: [r.jsxs("span", {
            className: "text-[var(--color-text-muted)]",
            children: [r.jsx("span", {
                className: "text-green-400",
                children: "●"
            }), " ", r.jsx("span", {
                className: "text-[var(--color-text-primary)] font-mono font-bold",
                children: i || 0
            }), " ", "online"]
        }), r.jsxs("span", {
            className: "text-[var(--color-text-muted)]",
            children: ["USD/KRW", " ", r.jsx("span", {
                className: "text-[var(--color-text-primary)] font-mono font-bold",
                children: o.toLocaleString("ko-KR", {
                    maximumFractionDigits: 0
                })
            })]
        }), r.jsxs("span", {
            className: "text-[var(--color-text-muted)]",
            children: ["USDT (Upbit)", " ", r.jsx("span", {
                className: "text-[var(--color-text-primary)] font-mono font-bold",
                children: A.toLocaleString("ko-KR", {
                    maximumFractionDigits: 0
                })
            })]
        }), r.jsxs("span", {
            className: "text-[var(--color-text-muted)]",
            children: ["K-Premium", " ", r.jsxs("span", {
                className: "text-[var(--color-text-primary)] font-mono font-bold",
                children: [_ > 0 ? "+" : "", y, "%"]
            })]
        })]
    })
}
class o0 extends Error {
    constructor(f, m, o=null) {
        super(f),
        this.name = "ApiError",
        this.exchange = m,
        this.status = o
    }
}
class Xm extends Error {
    constructor(f, m) {
        super(`${f} request timed out: ${m}`),
        this.name = "TimeoutError",
        this.exchange = f,
        this.url = m
    }
}
const Hn = 1e4;
async function f0(i, f={}, m=Hn) {
    const o = new AbortController
      , g = setTimeout( () => o.abort(), m);
    try {
        return await fetch(i, {
            ...f,
            signal: o.signal
        })
    } catch (A) {
        throw A.name === "AbortError" ? new Xm("Exchange",i) : A
    } finally {
        clearTimeout(g)
    }
}
async function Zm(i, f, m=Hn) {
    return f0(i, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(f)
    }, m)
}
async function Km(i, f=Hn) {
    return f0(i, {
        method: "GET",
        headers: {
            Accept: "application/json"
        }
    }, f)
}
async function La(i, f="Unknown", m=Hn) {
    const o = await Km(i, m);
    if (!o.ok)
        throw new o0(`${f} API error`,f,o.status);
    return o.json()
}
async function lc(i, f, m="Unknown", o=Hn) {
    const g = await Zm(i, f, o);
    if (!g.ok)
        throw new o0(`${m} API error`,m,g.status);
    return g.json()
}
const d0 = "/api/hyperliquid"
  , Jm = () => lc(`${d0}/info`, {
    type: "allMids"
}, "Hyperliquid")
  , $m = () => lc(`${d0}/info`, {
    type: "metaAndAssetCtxs"
}, "Hyperliquid");
function Wm(i, f) {
    if (!Array.isArray(f) || f.length < 2)
        throw new Error("Invalid Hyperliquid meta response format");
    const [m,o] = f;
    if (!m?.universe || !Array.isArray(o))
        throw new Error("Invalid Hyperliquid meta data structure");
    const g = m.universe
      , A = {};
    return g.forEach( (j, w) => {
        if (j.isDelisted)
            return;
        const _ = o[w]
          , y = j.name;
        let E = y;
        y === "kPEPE" && (E = "1000PEPE"),
        y === "kBONK" && (E = "1000BONK"),
        y === "kSHIB" && (E = "1000SHIB"),
        A[E] = {
            symbol: E,
            markPrice: parseFloat(_.markPx),
            fundingRate: parseFloat(_.funding),
            fundingInterval: 1,
            openInterest: parseFloat(_.openInterest),
            exchange: "Hyperliquid",
            code: "HL"
        }
    }
    ),
    A
}
async function Fm() {
    try {
        const [i,f] = await Promise.all([Jm(), $m()]);
        return Wm(i, f)
    } catch (i) {
        throw console.error("Hyperliquid fetch error:", i),
        i
    }
}
const h0 = "/api/paradex"
  , Im = () => La(`${h0}/v1/markets`, "Paradex")
  , Pm = () => La(`${h0}/v1/markets/summary?market=ALL`, "Paradex");
function e2(i, f) {
    if (!i || !f)
        throw new Error("Invalid Paradex response");
    const m = {}
      , o = i.results || []
      , g = f.results || []
      , A = {};
    return g.forEach(j => {
        A[j.symbol] = j
    }
    ),
    o.forEach(j => {
        if (j.asset_kind !== "PERP")
            return;
        const w = j.symbol.replace("-USD-PERP", "")
          , _ = A[j.symbol];
        if (!_)
            return;
        const y = j.funding_period_hours || 8
          , C = parseFloat(_.funding_rate || 0) / y;
        m[w] = {
            symbol: w,
            markPrice: parseFloat(_.mark_price || _.last_traded_price || 0),
            fundingRate: C,
            fundingInterval: y,
            openInterest: parseFloat(_.open_interest || 0),
            exchange: "Paradex",
            code: "PX"
        }
    }
    ),
    m
}
async function t2() {
    try {
        const [i,f] = await Promise.all([Im(), Pm()]);
        return e2(i, f)
    } catch (i) {
        throw console.error("Paradex fetch error:", i),
        i
    }
}
const l2 = {
    kPEPE: "1000PEPE",
    kBONK: "1000BONK",
    kSHIB: "1000SHIB"
};
function a2(i) {
    return l2[i] || i
}
function n2(i) {
    return i.split("_")[0]
}
const u2 = "/api/pacifica"
  , c2 = () => La(`${u2}/api/v1/info/prices`, "Pacifica");
function i2(i) {
    if (!i || typeof i != "object")
        throw new Error("Invalid Pacifica response");
    const f = {};
    return (i.data || []).forEach(o => {
        const g = a2(o.symbol)
          , A = parseFloat(o.funding);
        f[g] = {
            symbol: g,
            markPrice: parseFloat(o.mark),
            fundingRate: A,
            fundingInterval: 1,
            nextFundingRate: parseFloat(o.next_funding),
            openInterest: parseFloat(o.open_interest),
            volume24h: parseFloat(o.volume_24h),
            exchange: "Pacifica",
            code: "PC"
        }
    }
    ),
    f
}
async function r2() {
    try {
        const i = await c2();
        return i2(i)
    } catch (i) {
        throw console.error("Pacifica fetch error:", i),
        i
    }
}
const m0 = "/api/lighter"
  , s2 = () => La(`${m0}/api/v1/orderBookDetails`, "Lighter")
  , o2 = () => La(`${m0}/api/v1/funding-rates`, "Lighter");
function f2(i, f) {
    if (!i || !f)
        throw new Error("Invalid Lighter response");
    const m = {}
      , o = i.order_book_details || []
      , g = f.funding_rates || []
      , A = {};
    return g.forEach(j => {
        A[j.symbol] = j.rate
    }
    ),
    o.forEach(j => {
        if (j.status !== "active" || j.market_type !== "perp")
            return;
        const w = j.symbol
          , y = (A[w] || 0) / 8;
        m[w] = {
            symbol: w,
            markPrice: parseFloat(j.last_trade_price || 0),
            fundingRate: y,
            fundingInterval: 1,
            openInterest: parseFloat(j.open_interest || 0),
            volume24h: parseFloat(j.daily_quote_token_volume || 0),
            priceChange24h: parseFloat(j.daily_price_change || 0),
            exchange: "Lighter",
            code: "LI"
        }
    }
    ),
    m
}
async function d2() {
    try {
        const [i,f] = await Promise.all([s2(), o2()]);
        return f2(i, f)
    } catch (i) {
        throw console.error("Lighter fetch error:", i),
        i
    }
}
const h2 = "/api/variational";
async function m2() {
    const i = await La(`${h2}/metadata/stats`, "Variational");
    return console.log("[Variational] Received data:", {
        listingsCount: i.listings?.length || 0
    }),
    i
}
function v2(i) {
    if (!i || typeof i != "object")
        throw new Error("Invalid Variational response");
    const f = {};
    return (i.listings || []).forEach(o => {
        const g = o.ticker
          , A = parseFloat(o.mark_price)
          , j = (o.funding_interval_s || 28800) / 3600
          , _ = (parseFloat(o.funding_rate) || 0) / 8760
          , y = parseFloat(o.open_interest?.long_open_interest) || 0
          , E = parseFloat(o.open_interest?.short_open_interest) || 0
          , C = y + E;
        f[g] = {
            symbol: g,
            markPrice: A,
            fundingRate: _,
            fundingInterval: j,
            openInterest: C,
            volume24h: parseFloat(o.volume_24h) || 0,
            exchange: "Variational",
            code: "VA"
        }
    }
    ),
    f
}
async function g2() {
    try {
        const i = await m2()
          , f = v2(i);
        return console.log("[Variational] Parsed symbols:", Object.keys(f).length),
        f
    } catch (i) {
        throw console.error("[Variational] Fetch error:", i.message),
        i
    }
}
const v0 = "/api/grvt"
  , y2 = () => lc(`${v0}/full/v1/instruments`, {
    kind: ["PERPETUAL"],
    is_active: !0
}, "GRVT");
async function x2(i) {
    try {
        return (await lc(`${v0}/full/v1/ticker`, {
            instrument: i
        }, "GRVT")).result
    } catch (f) {
        return console.warn(`[GRVT] Ticker fetch failed for ${i}:`, f.message),
        null
    }
}
async function p2(i) {
    return (await Promise.all(i.map(o => x2(o.instrument)))).filter(o => o !== null)
}
function b2(i, f) {
    const m = {}
      , o = {};
    return i.forEach(g => {
        o[g.instrument] = g
    }
    ),
    f.forEach(g => {
        if (!g || !g.instrument)
            return;
        const A = o[g.instrument];
        if (!A || A.kind !== "PERPETUAL")
            return;
        const j = n2(g.instrument)
          , w = A.funding_interval_hours || 8
          , E = parseFloat(g.funding_rate || "0") / 100 / w;
        m[j] = {
            symbol: j,
            markPrice: parseFloat(g.mark_price || "0"),
            fundingRate: E,
            fundingInterval: w,
            openInterest: parseFloat(g.open_interest || "0"),
            exchange: "Grvt",
            code: "GV"
        }
    }
    ),
    m
}
async function S2() {
    try {
        const f = (await y2()).result || [];
        if (f.length === 0)
            return console.warn("[GRVT] No instruments found"),
            {};
        const m = await p2(f);
        return m.length === 0 ? (console.warn("[GRVT] No tickers found"),
        {}) : b2(f, m)
    } catch (i) {
        throw console.error("[GRVT] Fetch error:", i.message),
        i
    }
}
async function A2() {
    const i = {
        Hyperliquid: null,
        Paradex: null,
        Pacifica: null,
        Lighter: null,
        Variational: null,
        Grvt: null,
        timestamp: Date.now(),
        errors: []
    }
      , f = [{
        name: "Hyperliquid",
        fn: Fm
    }, {
        name: "Paradex",
        fn: t2
    }, {
        name: "Pacifica",
        fn: r2
    }, {
        name: "Lighter",
        fn: d2
    }, {
        name: "Variational",
        fn: g2
    }, {
        name: "Grvt",
        fn: S2
    }];
    return await Promise.all(f.map(async ({name: m, fn: o}) => {
        try {
            i[m] = await o()
        } catch (g) {
            i.errors.push({
                exchange: m,
                error: g.message
            })
        }
    }
    )),
    i
}
function E2(i, f) {
    const m = [];
    return f.forEach( ({symbol: o, exchangeA: g, exchangeB: A}) => {
        const j = i[g]?.[o]
          , w = i[A]?.[o];
        if (!j || !w)
            return;
        const _ = j.markPrice
          , y = w.markPrice;
        if (!_ || !y)
            return;
        const E = (y - _) / _ * 100
          , C = Math.abs(E)
          , G = _ < y ? g : A
          , ee = _ < y ? A : g;
        m.push({
            id: `${o}-${g}-${A}`,
            ticker: o,
            exchangeA: g,
            exchangeB: A,
            priceA: {
                code: Ga[g].code,
                value: _
            },
            priceB: {
                code: Ga[A].code,
                value: y
            },
            priceGap: C,
            strategy: {
                direction: "LONG",
                longExchange: G,
                shortExchange: ee
            }
        })
    }
    ),
    m.sort( (o, g) => g.priceGap - o.priceGap)
}
function j2(i, f) {
    const m = [];
    return f.forEach( ({symbol: o, exchangeA: g, exchangeB: A}) => {
        const j = i[g]?.[o]
          , w = i[A]?.[o];
        if (!j || !w)
            return;
        const _ = j.fundingRate || 0
          , y = w.fundingRate || 0
          , E = j.fundingInterval || 8
          , C = w.fundingInterval || 8
          , G = j.markPrice
          , ee = w.markPrice
          , q = _ / E
          , D = y / C
          , H = Math.abs(q - D)
          , Q = H * 24 * 365 * 100
          , J = G && ee ? Math.abs((ee - G) / G * 100) : 0
          , le = q > D ? A : g
          , ce = q > D ? g : A;
        m.push({
            id: `${o}-${g}-${A}-funding`,
            ticker: o,
            exchangeA: g,
            exchangeB: A,
            fundingA: {
                code: Ga[g].code,
                value: _,
                interval: E
            },
            fundingB: {
                code: Ga[A].code,
                value: y,
                interval: C
            },
            priceA: {
                code: Ga[g].code,
                value: G
            },
            priceB: {
                code: Ga[A].code,
                value: ee
            },
            frGap: H,
            apr: Q,
            priceGap: J,
            strategy: {
                direction: "LONG",
                longExchange: le,
                shortExchange: ce
            }
        })
    }
    ),
    m.sort( (o, g) => g.apr - o.apr)
}
function N2(i) {
    const f = Object.keys(i).filter(g => i[g] && typeof i[g] == "object" && g !== "errors" && g !== "timestamp")
      , m = []
      , o = new Set;
    return f.forEach(g => {
        Object.keys(i[g] || {}).forEach(A => o.add(A))
    }
    ),
    o.forEach(g => {
        const A = f.filter(j => i[j]?.[g]);
        for (let j = 0; j < A.length; j++)
            for (let w = j + 1; w < A.length; w++)
                m.push({
                    symbol: g,
                    exchangeA: A[j],
                    exchangeB: A[w]
                })
    }
    ),
    m
}
const g0 = "pricegap_candle_cache"
  , T2 = 336;
let Rt = {};
function z2() {
    try {
        const i = localStorage.getItem(g0);
        i && (Rt = JSON.parse(i),
        console.log("[CandleCache] Loaded from localStorage"),
        y0())
    } catch (i) {
        console.error("[CandleCache] Failed to load:", i),
        Rt = {}
    }
}
function y0() {
    const i = Math.floor(Date.now() / 36e5) - T2;
    for (const f in Rt)
        for (const m in Rt[f]) {
            const o = Rt[f][m];
            for (const g in o)
                parseInt(g) < i && delete o[g]
        }
}
function _2(i, f, m, o=0) {
    if (!m || isNaN(m))
        return;
    const g = Math.floor(Date.now() / 36e5);
    Rt[i] || (Rt[i] = {}),
    Rt[i][f] || (Rt[i][f] = {});
    const A = Rt[i][f];
    if (!A[g])
        A[g] = {
            o: m,
            h: m,
            l: m,
            c: m,
            v: o,
            count: 1
        };
    else {
        const j = A[g];
        j.h = Math.max(j.h, m),
        j.l = Math.min(j.l, m),
        j.c = m,
        j.v += o,
        j.count++
    }
}
function Fd() {
    try {
        y0(),
        localStorage.setItem(g0, JSON.stringify(Rt))
    } catch (i) {
        console.error("[CandleCache] Failed to persist:", i)
    }
}
z2();
const Tr = {
    EXCHANGE_DATA_MS: 1e4,
    POSITION_UPDATE_MS: 1e4,
    CACHE_PERSIST_MS: 6e4
}
  , al = {
    MAX_LOG_ENTRIES: 50,
    TOP_GAPS_DISPLAY: 50,
    MAX_CANDLE_CACHE_HOURS: 336
}
  , Id = {
    DUPLICATE_SUPPRESSION_MS: 3e4,
    AUTO_CLOSE_MS: 5e3
}
  , x0 = "pricegap-data-cache"
  , M2 = 6e4
  , C2 = "https://api.donkatze.xyz"
  , D2 = "wss"
  , O2 = "api.donkatze.xyz"
  , Pd = `${D2}://${O2}/ws/gaps`
  , e0 = 1e3
  , t0 = 3e4
  , R2 = 3e4;
function B2() {
    try {
        const i = localStorage.getItem(x0);
        if (i) {
            const {priceGaps: f, fundingGaps: m, timestamp: o} = JSON.parse(i);
            if (Date.now() - o < M2)
                return console.log("[ExchangeData] Loaded from cache"),
                {
                    priceGaps: f,
                    fundingGaps: m,
                    timestamp: o
                }
        }
    } catch (i) {
        console.warn("[ExchangeData] Cache load failed:", i.message)
    }
    return null
}
function w2(i, f) {
    try {
        localStorage.setItem(x0, JSON.stringify({
            priceGaps: i.slice(0, al.TOP_GAPS_DISPLAY),
            fundingGaps: f.slice(0, al.TOP_GAPS_DISPLAY),
            timestamp: Date.now()
        }))
    } catch (m) {
        console.warn("[ExchangeData] Cache save failed:", m.message)
    }
}
function H2() {
    const i = B2()
      , [f,m] = T.useState(null)
      , [o,g] = T.useState(i?.priceGaps || [])
      , [A,j] = T.useState(i?.fundingGaps || [])
      , [w,_] = T.useState([])
      , [y,E] = T.useState(!i)
      , [C,G] = T.useState(null)
      , [ee,q] = T.useState(i ? new Date(i.timestamp) : null)
      , [D,H] = T.useState("checking")
      , [Q,J] = T.useState(0)
      , [le,ce] = T.useState(null)
      , je = T.useRef(0)
      , Me = T.useRef(null)
      , I = T.useRef(null)
      , he = T.useRef(null)
      , Ce = T.useRef(null)
      , we = T.useRef(null)
      , He = T.useRef(e0)
      , Te = T.useRef(null)
      , Qe = T.useRef(!0)
      , k = T.useCallback( (V, P="info", h=null) => {
        const L = new Date().toLocaleTimeString("en-US", {
            hour12: !1,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        });
        _(Y => [{
            id: ++je.current,
            time: L,
            type: P,
            status: V,
            exchange: h
        }, ...Y].slice(0, al.MAX_LOG_ENTRIES))
    }
    , [])
      , me = T.useCallback(V => {
        if (!Qe.current)
            return;
        const P = (V.priceGaps || []).slice(0, al.TOP_GAPS_DISPLAY)
          , h = (V.fundingGaps || []).slice(0, al.TOP_GAPS_DISPLAY);
        g(P),
        j(h),
        J(V.connections || 0),
        V.usdKrw && ce(V.usdKrw),
        q(new Date),
        G(null),
        E(!1),
        w2(P, h)
    }
    , [])
      , z = T.useCallback( () => {
        I.current && (I.current.close(),
        I.current = null),
        console.log(`[ExchangeData] WebSocket connecting to ${Pd}...`);
        try {
            const V = new WebSocket(Pd);
            I.current = V,
            V.onopen = () => {
                console.log("[ExchangeData] WebSocket connected"),
                H("ws"),
                G(null),
                He.current = e0,
                k("WebSocket connected - real-time mode", "CLIENT"),
                he.current && (console.log("[ExchangeData] Closing SSE (WS connected)"),
                he.current.close(),
                he.current = null),
                Te.current && (clearInterval(Te.current),
                Te.current = null),
                we.current && clearInterval(we.current),
                we.current = setInterval( () => {
                    V.readyState === WebSocket.OPEN && V.send(JSON.stringify({
                        type: "ping",
                        ts: Date.now()
                    }))
                }
                , R2)
            }
            ,
            V.onmessage = P => {
                try {
                    const h = JSON.parse(P.data);
                    switch (h.type) {
                    case "snapshot":
                        h.data && me(h.data);
                        break;
                    case "gap":
                        if (h.connections !== void 0 && J(h.connections),
                        h.priceGaps || h.fundingGaps) {
                            const O = (h.priceGaps || []).slice(0, al.TOP_GAPS_DISPLAY)
                              , L = (h.fundingGaps || []).slice(0, al.TOP_GAPS_DISPLAY);
                            O.length && g(O),
                            L.length && j(L),
                            q(new Date),
                            E(!1)
                        }
                        break;
                    case "pong":
                        console.debug("[ExchangeData] WebSocket pong received");
                        break;
                    case "error":
                        console.error("[ExchangeData] WebSocket server error:", h.message),
                        G(h.message);
                        break;
                    default:
                        console.debug("[ExchangeData] Unknown message type:", h.type)
                    }
                } catch (h) {
                    console.error("[ExchangeData] WebSocket message parse error:", h)
                }
            }
            ,
            V.onclose = P => {
                if (console.log(`[ExchangeData] WebSocket closed: code=${P.code}`),
                I.current = null,
                we.current && (clearInterval(we.current),
                we.current = null),
                !Qe.current)
                    return;
                const h = He.current;
                console.log(`[ExchangeData] WebSocket reconnecting in ${h}ms...`),
                Ce.current = setTimeout(z, h),
                He.current = Math.min(h * 2, t0)
            }
            ,
            V.onerror = P => {
                console.error("[ExchangeData] WebSocket error:", P)
            }
        } catch (V) {
            console.error("[ExchangeData] WebSocket connection error:", V);
            const P = He.current;
            Ce.current = setTimeout(z, P),
            He.current = Math.min(P * 2, t0)
        }
    }
    , [k, me])
      , U = T.useCallback( () => {
        he.current && (he.current.close(),
        he.current = null),
        console.log("[ExchangeData] SSE connecting...");
        const V = 2
          , P = new EventSource(`${C2}/api/cache/sse?interval=${V}`);
        he.current = P,
        P.addEventListener("gaps", h => {
            if (Qe.current)
                try {
                    const O = JSON.parse(h.data);
                    me(O),
                    D !== "sse" && (H("sse"),
                    k("SSE connected - real-time mode", "CLIENT"))
                } catch (O) {
                    console.error("[ExchangeData] SSE parse error:", O)
                }
        }
        ),
        P.onerror = () => {
            console.log("[ExchangeData] SSE error, reconnecting in 3s..."),
            P.close(),
            he.current = null,
            Qe.current && (Ce.current = setTimeout(U, 3e3))
        }
    }
    , [k, me, D])
      , K = T.useCallback(async () => {
        try {
            k("Fetching prices...", "CLIENT");
            const V = await A2();
            m(V),
            Object.keys(V).filter(Y => V[Y] && Y !== "errors" && Y !== "timestamp").forEach(Y => {
                const W = Object.keys(V[Y] || {}).length;
                k(`${Y}: ${W} symbols`, "CLIENT", Y)
            }
            ),
            V.errors?.forEach( ({exchange: Y, error: W}) => {
                k(`${Y} error: ${W}`, "ERROR", Y)
            }
            ),
            ["Lighter", "Variational"].forEach(Y => {
                const W = V[Y];
                W && Object.entries(W).forEach( ([te,se]) => {
                    se?.price && _2(Y, te, se.price, se.volume24h || 0)
                }
                )
            }
            );
            const h = N2(V)
              , O = E2(V, h)
              , L = j2(V, h);
            g(O.slice(0, al.TOP_GAPS_DISPLAY)),
            j(L.slice(0, al.TOP_GAPS_DISPLAY)),
            q(new Date),
            G(null)
        } catch (V) {
            G(V.message),
            k(`Error: ${V.message}`, "ERROR")
        } finally {
            E(!1)
        }
    }
    , [k]);
    return T.useCallback( () => {
        Me.current || (H("polling"),
        k("REST polling mode", "CLIENT"),
        K(),
        Me.current = setInterval(K, Tr.EXCHANGE_DATA_MS))
    }
    , [k, K]),
    T.useEffect( () => {
        Qe.current = !0,
        console.log("[ExchangeData] Connecting WebSocket directly..."),
        z();
        const V = setInterval(Fd, Tr.CACHE_PERSIST_MS);
        return () => {
            Qe.current = !1,
            Ce.current && (clearTimeout(Ce.current),
            Ce.current = null),
            we.current && (clearInterval(we.current),
            we.current = null),
            Te.current && (clearInterval(Te.current),
            Te.current = null),
            I.current && (I.current.close(),
            I.current = null),
            he.current && (he.current.close(),
            he.current = null),
            Me.current && (clearInterval(Me.current),
            Me.current = null),
            clearInterval(V),
            Fd()
        }
    }
    , [z]),
    {
        exchangeData: f,
        priceGaps: o,
        fundingGaps: A,
        logs: w,
        isLoading: y,
        error: C,
        lastUpdate: ee,
        refreshInterval: D === "ws" || D === "sse" ? 2e3 : Tr.EXCHANGE_DATA_MS,
        dataSource: D,
        connections: Q,
        usdKrw: le,
        refetch: D === "polling" ? K : () => {}
    }
}
function U2(i="exchangeFilter") {
    const [f,m] = T.useState( () => {
        try {
            const E = localStorage.getItem(i);
            if (E) {
                const C = JSON.parse(E);
                if (wa.every(ee => typeof C[ee] == "boolean"))
                    return C
            }
        } catch {}
        return wa.reduce( (E, C) => (E[C] = !0,
        E), {})
    }
    )
      , o = T.useCallback(E => {
        m(C => {
            const G = {
                ...C,
                [E]: !C[E]
            };
            try {
                localStorage.setItem(i, JSON.stringify(G))
            } catch {}
            return G
        }
        )
    }
    , [i])
      , g = T.useCallback( () => {
        const E = wa.reduce( (C, G) => (C[G] = !0,
        C), {});
        m(E);
        try {
            localStorage.setItem(i, JSON.stringify(E))
        } catch {}
    }
    , [i])
      , A = T.useCallback( () => {
        const E = wa.reduce( (C, G) => (C[G] = !1,
        C), {});
        m(E);
        try {
            localStorage.setItem(i, JSON.stringify(E))
        } catch {}
    }
    , [i])
      , j = T.useCallback(E => f[E] ?? !0, [f])
      , w = T.useMemo( () => wa.filter(E => f[E]).length, [f])
      , _ = T.useCallback(E => !E || !Array.isArray(E) ? [] : E.filter(C => f[C.exchangeA] && f[C.exchangeB]), [f]);
    return {
        filter: f,
        toggle: o,
        enableAll: g,
        disableAll: A,
        isEnabled: j,
        enabledCount: w,
        filterGaps: _,
        useFilteredGaps: E => T.useMemo( () => _(E), [E, _]),
        exchanges: wa
    }
}
const ec = "pricegap_watchlist"
  , G2 = {
    version: 1,
    items: [],
    settings: {
        viewMode: "table",
        sortBy: "priceGap",
        sortOrder: "desc"
    }
};
function zr(i) {
    return !i || typeof i != "object" ? !1 : ["__proto__", "constructor", "prototype"].some(m => Object.prototype.hasOwnProperty.call(i, m))
}
function L2(i) {
    if (!i || typeof i != "object" || Array.isArray(i) || typeof i.version != "number" || !Array.isArray(i.items) || !i.settings || typeof i.settings != "object" || Array.isArray(i.settings) || zr(i) || zr(i.settings))
        return !1;
    const {viewMode: f, sortBy: m, sortOrder: o} = i.settings;
    if (f !== void 0 && typeof f != "string" || m !== void 0 && typeof m != "string" || o !== void 0 && !["asc", "desc"].includes(o))
        return !1;
    for (const g of i.items)
        if (!g || typeof g != "object" || typeof g.id != "string" || typeof g.ticker != "string" || !["price", "funding"].includes(g.type) || zr(g))
            return !1;
    return !0
}
function Y2() {
    const [i,f] = T.useState(G2)
      , [m,o] = T.useState(!1);
    T.useEffect( () => {
        try {
            const q = localStorage.getItem(ec);
            if (q) {
                const D = JSON.parse(q);
                L2(D) ? (console.log("[Watchlist] Loaded from localStorage:", D.items?.length || 0, "items"),
                f(D)) : (console.warn("[Watchlist] Invalid data structure, resetting to defaults"),
                localStorage.removeItem(ec))
            } else
                console.log("[Watchlist] No stored data, using defaults")
        } catch (q) {
            console.error("[Watchlist] Failed to load from localStorage:", q),
            localStorage.removeItem(ec)
        }
        o(!0)
    }
    , []),
    T.useEffect( () => {
        if (m)
            try {
                localStorage.setItem(ec, JSON.stringify(i)),
                console.log("[Watchlist] Saved to localStorage:", i.items.length, "items")
            } catch (q) {
                console.error("[Watchlist] Failed to save to localStorage:", q)
            }
    }
    , [i, m]);
    const g = T.useCallback( (q, D, H, Q) => `${q}-${D}-${H}-${Q}`, [])
      , A = T.useCallback( (q, D, H, Q) => {
        const J = g(q, D, H, Q);
        return i.items.some(le => le.id === J)
    }
    , [i.items, g])
      , j = T.useCallback( (q, D, H, Q) => {
        const J = g(q, D, H, Q);
        if (i.items.some(ce => ce.id === J))
            return console.log("[Watchlist] Already exists:", J),
            !1;
        const le = {
            id: J,
            type: q,
            ticker: D,
            exchangeA: H,
            exchangeB: Q,
            alertThreshold: null,
            alertEnabled: !1,
            addedAt: Date.now()
        };
        return f(ce => ({
            ...ce,
            items: [...ce.items, le]
        })),
        console.log("[Watchlist] Added:", J),
        !0
    }
    , [i.items, g])
      , w = T.useCallback( (q, D, H, Q) => {
        const J = g(q, D, H, Q);
        return f(le => ({
            ...le,
            items: le.items.filter(ce => ce.id !== J)
        })),
        console.log("[Watchlist] Removed:", J),
        !0
    }
    , [g])
      , _ = T.useCallback( (q, D, H, Q) => A(q, D, H, Q) ? w(q, D, H, Q) : j(q, D, H, Q), [A, j, w])
      , y = T.useCallback( (q, D, H) => {
        f(Q => ({
            ...Q,
            items: Q.items.map(J => J.id === q ? {
                ...J,
                alertThreshold: D,
                alertEnabled: H
            } : J)
        })),
        console.log("[Watchlist] Alert updated:", q, {
            alertThreshold: D,
            alertEnabled: H
        })
    }
    , [])
      , E = T.useCallback(q => {
        f(D => ({
            ...D,
            settings: {
                ...D.settings,
                viewMode: q
            }
        })),
        console.log("[Watchlist] View mode changed:", q)
    }
    , [])
      , C = T.useCallback( (q, D) => {
        f(H => ({
            ...H,
            settings: {
                ...H.settings,
                sortBy: q,
                sortOrder: D
            }
        })),
        console.log("[Watchlist] Sort settings changed:", {
            sortBy: q,
            sortOrder: D
        })
    }
    , [])
      , G = T.useCallback( (q, D) => i.items.map(H => {
        const J = (H.type === "price" ? q : D).find(le => le.ticker === H.ticker && le.exchangeA === H.exchangeA && le.exchangeB === H.exchangeB);
        return {
            ...H,
            currentData: J || null
        }
    }
    ).filter(H => H.currentData !== null), [i.items])
      , ee = T.useCallback( () => i.items.filter(q => q.alertEnabled && q.alertThreshold !== null), [i.items]);
    return {
        items: i.items,
        settings: i.settings,
        isLoaded: m,
        isInWatchlist: A,
        addToWatchlist: j,
        removeFromWatchlist: w,
        toggleWatchlist: _,
        updateAlert: y,
        setViewMode: E,
        setSortSettings: C,
        getWatchlistData: G,
        getAlertItems: ee,
        createId: g
    }
}
const q2 = "data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAABhgC7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7//////////////////////////////////////////////////////////////////8AAAAATGF2YzU4LjEzAAAAAAAAAAAAAAAAJAAAAAAAAAAAAYZVCy0bAAAAAAD/+9DEAAAIAAGbAAAAIAAANIAAAAQAAAAA/BQGJqABMBgYGBkFKwIDCYDBg0OBAYDBg0Bw4cDBg0ODAgYNAcOBg0OBAYDAwYEBgYHBgQGA4cOBgwIDAYDBg4IBgYMCAwIGBwwODAYMCBg0ODAYMCBgcOBAwOGBAYEDAoYEBgQMGhwIDBocODAYMDhgcMDgwIDBocMCBgQGBQwOGBAwIGA4YEBgQGAwYMCAwGDA4YNDgwIDAgMBwYHDAoYHDAgYEBgcGBAwIGBQwIGBQ4ODAgMCAweGBwYEBgQMChgQMCBgQMC//tQxJgAAADSAAAAAAAAANIAAAAQgwIDBgcMCBgcGBwwIGBAwOGBAwKGBwYEDAgYFDAgMCAwIGBwwKGBwwOGBAwIGBwwIGBAwKGBAwOGBAYEDAoMDhgQMCgwOGBwwODAgMBwwIGBQwOGBAwOGBwwIGBQ4OGBAwIGBQYHDAgYEDA4YEDAoYFDAgYFDAgYEDAoYEDAgYFDAgYEDA4YEDAgYFDAgYFDAgMBwwIGBQwIGBAwIGBQwIDA4YEDA4YEDAgMCBgcMCAQAAAP/70MSwAAADSAAAAAAAAANIAAAAQAAAAA=="
  , l0 = "pricegap_sound_enabled";
function k2() {
    const [i,f] = T.useState("default")
      , [m,o] = T.useState(!1)
      , [g,A] = T.useState( () => typeof window > "u" ? !0 : localStorage.getItem(l0) !== "false")
      , j = T.useRef({})
      , w = T.useRef(null);
    T.useEffect( () => {
        try {
            w.current = new Audio(q2),
            w.current.volume = .5
        } catch (D) {
            console.error("[Sound] Failed to initialize audio:", D)
        }
        return () => {
            w.current && (w.current.pause(),
            w.current.src = "",
            w.current = null)
        }
    }
    , []),
    T.useEffect( () => {
        localStorage.setItem(l0, g ? "true" : "false")
    }
    , [g]),
    T.useEffect( () => {
        "Notification"in window ? (o(!0),
        f(Notification.permission),
        console.log("[Notification] Supported, permission:", Notification.permission)) : console.log("[Notification] Not supported in this browser")
    }
    , []);
    const _ = T.useCallback( () => {
        A(D => !D)
    }
    , [])
      , y = T.useCallback( () => {
        if (!(!g || !w.current))
            try {
                w.current.currentTime = 0,
                w.current.play().catch(D => {
                    console.log("[Sound] Autoplay blocked:", D.message)
                }
                )
            } catch (D) {
                console.error("[Sound] Failed to play:", D)
            }
    }
    , [g])
      , E = T.useCallback(async () => {
        if (!m)
            return console.log("[Notification] Not supported"),
            "denied";
        try {
            const D = await Notification.requestPermission();
            return f(D),
            console.log("[Notification] Permission result:", D),
            D
        } catch (D) {
            return console.error("[Notification] Permission request failed:", D),
            "denied"
        }
    }
    , [m])
      , C = T.useCallback( (D, H={}) => {
        if (y(),
        !m || i !== "granted")
            return console.log("[Notification] Cannot send - supported:", m, "permission:", i),
            null;
        const Q = Date.now()
          , J = j.current[D];
        if (J && Q - J < Id.DUPLICATE_SUPPRESSION_MS)
            return console.log("[Notification] Duplicate suppressed:", D),
            null;
        j.current[D] = Q;
        try {
            const le = new Notification(D,{
                icon: "/logo.jpg",
                badge: "/favicon.ico",
                ...H
            });
            return le.onclick = () => {
                window.focus(),
                le.close()
            }
            ,
            setTimeout( () => {
                le.close()
            }
            , Id.AUTO_CLOSE_MS),
            console.log("[Notification] Sent:", D),
            le
        } catch (le) {
            return console.error("[Notification] Send failed:", le),
            null
        }
    }
    , [m, i, y])
      , G = T.useCallback( (D, H, Q) => {
        if (H < Q)
            return;
        const J = D.type === "price" ? "Price Gap" : "Funding APR"
          , le = `${D.ticker} ${J} Alert`
          , ce = `${D.exchangeA} ↔ ${D.exchangeB}
${J}: ${H.toFixed(2)}% (threshold: ${Q}%)`;
        return C(le, {
            body: ce,
            tag: D.id,
            requireInteraction: !0
        })
    }
    , [C])
      , ee = T.useCallback( (D, H, Q) => {
        Q.length !== 0 && Q.forEach(J => {
            const ce = (J.type === "price" ? D : H).find(je => je.ticker === J.ticker && je.exchangeA === J.exchangeA && je.exchangeB === J.exchangeB);
            if (ce) {
                const je = J.type === "price" ? ce.priceGap : ce.apr;
                je >= J.alertThreshold && (console.log("[Alert] Threshold exceeded:", J.ticker, je, ">=", J.alertThreshold),
                G(J, je, J.alertThreshold))
            }
        }
        )
    }
    , [G])
      , q = T.useCallback( () => {
        w.current && (w.current.currentTime = 0,
        w.current.play().catch(D => {
            console.log("[Sound] Test play blocked:", D.message)
        }
        ))
    }
    , []);
    return {
        isSupported: m,
        permission: i,
        soundEnabled: g,
        requestPermission: E,
        sendNotification: C,
        sendGapAlert: G,
        checkAlerts: ee,
        toggleSound: _,
        testSound: q
    }
}
const p0 = "pricegap_alert_history"
  , V2 = 100;
function Q2() {
    try {
        const i = localStorage.getItem(p0);
        if (i) {
            const f = JSON.parse(i);
            if (Array.isArray(f))
                return f
        }
    } catch (i) {
        console.warn("[useAlertHistory] localStorage 로드 실패:", i)
    }
    return []
}
function X2(i) {
    try {
        localStorage.setItem(p0, JSON.stringify(i))
    } catch (f) {
        console.warn("[useAlertHistory] localStorage 저장 실패:", f)
    }
}
function Z2() {
    const [i,f] = T.useState( () => Q2());
    T.useEffect( () => {
        X2(i)
    }
    , [i]);
    const m = T.useCallback(y => {
        const E = {
            id: `${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
            timestamp: Date.now(),
            seen: !1,
            ...y
        };
        return console.log("[useAlertHistory] 알림 추가:", E),
        f(C => [E, ...C].slice(0, V2)),
        E
    }
    , [])
      , o = T.useCallback(y => {
        f(E => E.map(C => C.id === y ? {
            ...C,
            seen: !0
        } : C))
    }
    , [])
      , g = T.useCallback( () => {
        f(y => y.map(E => ({
            ...E,
            seen: !0
        })))
    }
    , [])
      , A = T.useCallback( () => {
        console.log("[useAlertHistory] 기록 삭제"),
        f([])
    }
    , [])
      , j = T.useCallback( () => i.filter(y => !y.seen).length, [i])
      , w = T.useCallback( () => {
        const y = Date.now()
          , E = y - 1440 * 60 * 1e3
          , C = y - 10080 * 60 * 1e3
          , G = i.filter(Q => Q.timestamp > E)
          , ee = i.filter(Q => Q.timestamp > C)
          , q = i.filter(Q => Q.type === "price")
          , D = i.filter(Q => Q.type === "funding")
          , H = i.length > 0 ? i.reduce( (Q, J) => Q + (J.gap || 0), 0) / i.length : 0;
        return {
            totalCount: i.length,
            todayCount: G.length,
            weekCount: ee.length,
            priceCount: q.length,
            fundingCount: D.length,
            avgGap: H.toFixed(3),
            unreadCount: j()
        }
    }
    , [i, j])
      , _ = T.useCallback( ({type: y="all", ticker: E="", startDate: C=null, endDate: G=null}={}) => i.filter(ee => !(y !== "all" && ee.type !== y || E && !ee.ticker?.toLowerCase().includes(E.toLowerCase()) || C && ee.timestamp < C || G && ee.timestamp > G)), [i]);
    return {
        history: i,
        addAlert: m,
        markAsRead: o,
        markAllAsRead: g,
        clearHistory: A,
        getUnreadCount: j,
        getStats: w,
        getFilteredHistory: _
    }
}
const K2 = T.lazy( () => $l( () => import("./PriceChartModal-CA-9bIoT.js"), []))
  , J2 = T.lazy( () => $l( () => import("./Analytics-CeZGdcfg.js"), []))
  , $2 = T.lazy( () => $l( () => import("./index-CksLid93.js"), []))
  , W2 = T.lazy( () => $l( () => import("./ExchangeInfo-B-1SuKKr.js"), []))
  , F2 = T.lazy( () => $l( () => import("./Calculator-CUh2Z5ZC.js"), []))
  , I2 = T.lazy( () => $l( () => import("./Heatmap-DhcGV1kc.js"), []))
  , P2 = T.lazy( () => $l( () => import("./AlertsHistory-B0d5kkv2.js"), []))
  , Ha = () => r.jsx("div", {
    className: "flex items-center justify-center h-64",
    children: r.jsx("div", {
        className: "text-[var(--color-text-muted)]",
        children: "Loading..."
    })
});
function ev() {
    const [i,f] = T.useState("dashboard")
      , [m,o] = T.useState(null)
      , [g,A] = T.useState("price")
      , [j,w] = T.useState(null)
      , [_,y] = T.useState(!1)
      , [E,C] = T.useState(!1)
      , {filter: G, toggle: ee, filterGaps: q, exchanges: D} = U2("dashboard-exchange-filter")
      , {priceGaps: H, fundingGaps: Q, isLoading: J, error: le, refreshInterval: ce, connections: je, usdKrw: Me, refetch: I} = H2()
      , {isInWatchlist: he, toggleWatchlist: Ce, getWatchlistData: we, getAlertItems: He, updateAlert: Te, setViewMode: Qe, settings: k} = Y2()
      , {permission: me, requestPermission: z, checkAlerts: U, soundEnabled: K, toggleSound: V, testSound: P} = k2()
      , {history: h, getUnreadCount: O, markAsRead: L, markAllAsRead: Y, clearHistory: W} = Z2()
      , {theme: te, cycleTheme: se} = Cr()
      , Xe = T.useMemo( () => q(H), [q, H])
      , De = T.useMemo( () => q(Q), [q, Q]);
    T.useEffect( () => {
        const ye = He();
        ye.length > 0 && H.length > 0 && U(H, Q, ye)
    }
    , [H, Q, He, U]);
    const Bt = (ye, nl) => {
        o(ye),
        A(nl)
    }
      , Wl = () => {
        o(null)
    }
    ;
    return r.jsxs("div", {
        className: "flex min-h-screen bg-[var(--color-bg-primary)]",
        children: [r.jsx(Nm, {
            onMenuClick: () => y(!0)
        }), r.jsx(jm, {
            activeNav: i,
            onNavChange: f,
            isOpen: _,
            onClose: () => y(!1),
            unreadAlerts: O()
        }), r.jsxs("main", {
            className: "flex-1 overflow-auto pt-[calc(env(safe-area-inset-top)+3.5rem)] md:pt-0 pb-safe",
            children: [le && r.jsxs("div", {
                className: "m-6 p-4 bg-red-900/20 border border-red-500/30 rounded-lg text-red-400",
                children: ["Failed to load data. Please try again later.", !1]
            }), i === "analytics" ? r.jsx(T.Suspense, {
                fallback: r.jsx(Ha, {}),
                children: r.jsx(J2, {
                    priceGaps: H,
                    refreshInterval: ce
                })
            }) : i === "manual-trade" ? r.jsx(T.Suspense, {
                fallback: r.jsx(Ha, {}),
                children: r.jsx($2, {
                    priceGaps: H,
                    fundingGaps: Q
                })
            }) : i === "exchanges" ? r.jsx(T.Suspense, {
                fallback: r.jsx(Ha, {}),
                children: r.jsx("div", {
                    className: "p-6 max-w-4xl",
                    children: r.jsx(W2, {})
                })
            }) : i === "calculator" ? r.jsx(T.Suspense, {
                fallback: r.jsx(Ha, {}),
                children: r.jsx(F2, {
                    priceGaps: H
                })
            }) : i === "heatmap" ? r.jsx(T.Suspense, {
                fallback: r.jsx(Ha, {}),
                children: r.jsx(I2, {
                    priceGaps: H,
                    onRowClick: ye => Bt(ye, "price")
                })
            }) : i === "alerts" ? r.jsx(T.Suspense, {
                fallback: r.jsx(Ha, {}),
                children: r.jsx(P2, {
                    history: h,
                    onMarkAsRead: L,
                    onMarkAllAsRead: Y,
                    onClearHistory: W,
                    priceGaps: H,
                    fundingGaps: Q
                })
            }) : i === "watchlist" ? r.jsx(Gm, {
                priceGaps: H,
                fundingGaps: Q,
                watchlistData: we(H, Q),
                viewMode: k.viewMode,
                onViewModeChange: Qe,
                onRowClick: Bt,
                isInWatchlist: he,
                onToggleWatchlist: Ce,
                onAlertSettings: w,
                refreshInterval: ce
            }) : i === "dashboard" ? r.jsx("div", {
                className: "p-6",
                children: J && H.length === 0 ? r.jsx("div", {
                    className: "flex items-center justify-center h-64",
                    children: r.jsx("div", {
                        className: "text-gray-400",
                        children: "Loading exchange data..."
                    })
                }) : r.jsxs("div", {
                    className: "flex flex-col gap-4 h-[calc(100vh-48px)] md:h-[calc(100vh-48px)]",
                    children: [r.jsxs("div", {
                        className: "md:hidden bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl",
                        children: [r.jsxs("button", {
                            onClick: () => C(!E),
                            className: "w-full flex items-center justify-between px-4 py-3 min-h-[44px]",
                            children: [r.jsxs("div", {
                                className: "flex items-center gap-3",
                                children: [r.jsxs("span", {
                                    className: "text-[var(--color-text-secondary)] text-sm font-medium",
                                    children: ["Filters (", Object.values(G).filter(Boolean).length, "/", D.length, ")"]
                                }), r.jsxs("span", {
                                    className: "text-xs text-[var(--color-text-muted)]",
                                    children: [r.jsx("span", {
                                        className: "text-green-400",
                                        children: "●"
                                    }), " ", r.jsx("span", {
                                        className: "font-mono font-bold text-[var(--color-text-primary)]",
                                        children: je || 0
                                    }), " online"]
                                })]
                            }), r.jsx("svg", {
                                className: `w-5 h-5 text-[var(--color-text-muted)] transition-transform duration-200 ${E ? "rotate-180" : ""}`,
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                children: r.jsx("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                    d: "M19 9l-7 7-7-7"
                                })
                            })]
                        }), E && r.jsxs("div", {
                            className: "px-4 pb-4 border-t border-[var(--color-border)] pt-3",
                            children: [r.jsx("div", {
                                className: "grid grid-cols-2 gap-3",
                                children: D.map(ye => r.jsxs("label", {
                                    className: "flex items-center gap-2 cursor-pointer select-none min-h-[44px]",
                                    children: [r.jsx("div", {
                                        onClick: () => ee(ye),
                                        className: `relative w-9 h-5 rounded-full transition-all duration-200 flex-shrink-0 ${G[ye] ? "bg-[var(--color-accent)]" : "bg-[var(--color-text-muted)]/30"}`,
                                        style: {
                                            boxShadow: "inset 0 1px 3px rgba(0,0,0,0.2)"
                                        },
                                        children: r.jsx("div", {
                                            className: `absolute top-0.5 w-4 h-4 rounded-full transition-all duration-200 bg-white ${G[ye] ? "left-[18px]" : "left-0.5"}`,
                                            style: {
                                                boxShadow: "0 1px 3px rgba(0,0,0,0.3)"
                                            }
                                        })
                                    }), r.jsx("span", {
                                        className: `text-sm font-medium ${G[ye] ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-muted)]"}`,
                                        children: ye
                                    })]
                                }, ye))
                            }), r.jsx("div", {
                                className: "mt-4 pt-3 border-t border-[var(--color-border)]",
                                children: r.jsxs("button", {
                                    onClick: se,
                                    className: "w-full flex items-center justify-between px-3 py-2.5 rounded-lg bg-[var(--color-bg-tertiary)] min-h-[44px]",
                                    children: [r.jsx("span", {
                                        className: "text-sm text-[var(--color-text-secondary)]",
                                        children: "Theme"
                                    }), r.jsxs("span", {
                                        className: `flex items-center gap-1.5 text-sm font-medium px-2 py-1 rounded-md ${te === "dark" ? "bg-gray-700 text-gray-200" : te === "light" ? "bg-yellow-100 text-yellow-800" : "bg-purple-900 text-pink-400 shadow-[0_0_10px_rgba(255,0,255,0.5)]"}`,
                                        children: [te === "dark" && r.jsx("svg", {
                                            className: "w-4 h-4",
                                            fill: "currentColor",
                                            viewBox: "0 0 24 24",
                                            children: r.jsx("path", {
                                                d: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                                            })
                                        }), te === "light" && r.jsxs("svg", {
                                            className: "w-4 h-4",
                                            fill: "currentColor",
                                            viewBox: "0 0 24 24",
                                            children: [r.jsx("circle", {
                                                cx: "12",
                                                cy: "12",
                                                r: "5"
                                            }), r.jsx("path", {
                                                d: "M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
                                            })]
                                        }), te === "cyberpunk" && r.jsx("svg", {
                                            className: "w-4 h-4",
                                            fill: "none",
                                            stroke: "currentColor",
                                            strokeWidth: "2",
                                            viewBox: "0 0 24 24",
                                            children: r.jsx("path", {
                                                d: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                                            })
                                        }), te === "dark" ? "Dark" : te === "light" ? "Light" : "Cyber"]
                                    })]
                                })
                            })]
                        })]
                    }), r.jsxs("div", {
                        className: "hidden md:flex items-center gap-5 flex-wrap bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl px-4 py-2.5",
                        children: [r.jsx("span", {
                            className: "text-[var(--color-text-muted)] text-xs font-medium",
                            children: "Filter:"
                        }), D.map(ye => r.jsxs("label", {
                            className: "flex items-center gap-2 cursor-pointer select-none",
                            children: [r.jsx("div", {
                                onClick: () => ee(ye),
                                className: `relative w-9 h-5 rounded-full transition-all duration-200 ${G[ye] ? "bg-[var(--color-accent)]" : "bg-[var(--color-text-muted)]/30"}`,
                                style: {
                                    boxShadow: "inset 0 1px 3px rgba(0,0,0,0.2)"
                                },
                                children: r.jsx("div", {
                                    className: `absolute top-0.5 w-4 h-4 rounded-full transition-all duration-200 bg-white ${G[ye] ? "left-[18px]" : "left-0.5"}`,
                                    style: {
                                        boxShadow: "0 1px 3px rgba(0,0,0,0.3)"
                                    }
                                })
                            }), r.jsx("a", {
                                href: Mt[ye]?.referral,
                                target: "_blank",
                                rel: "noopener noreferrer",
                                onClick: nl => nl.stopPropagation(),
                                className: `text-xs font-medium transition-colors hover:underline ${G[ye] ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-muted)]"}`,
                                children: ye
                            })]
                        }, ye)), r.jsx(Qm, {
                            connections: je,
                            usdKrw: Me
                        })]
                    }), r.jsx("div", {
                        className: "flex-1 min-h-0 overflow-hidden",
                        children: r.jsx(tc, {
                            type: "price",
                            data: Xe,
                            pairCount: Xe.length,
                            refreshRate: `${ce / 1e3}s`,
                            onRowClick: ye => Bt(ye, "price"),
                            isInWatchlist: he,
                            onToggleWatchlist: Ce,
                            onRefresh: I,
                            compact: !0
                        })
                    }), r.jsx("div", {
                        className: "flex-1 min-h-0 overflow-hidden",
                        children: r.jsx(tc, {
                            type: "funding",
                            data: De,
                            pairCount: De.length,
                            refreshRate: `${ce / 1e3}s`,
                            onRowClick: ye => Bt(ye, "funding"),
                            isInWatchlist: he,
                            onToggleWatchlist: Ce,
                            onRefresh: I,
                            compact: !0
                        })
                    })]
                })
            }) : null]
        }), r.jsx(T.Suspense, {
            fallback: null,
            children: r.jsx(K2, {
                isOpen: !!m,
                onClose: Wl,
                gapData: m,
                type: g
            })
        }), r.jsx(Lm, {
            isOpen: !!j,
            onClose: () => w(null),
            item: j,
            onSave: (ye, nl) => {
                j && Te(j.id, ye, nl)
            }
            ,
            notificationPermission: me,
            onRequestPermission: z,
            soundEnabled: K,
            onToggleSound: V,
            onTestSound: P
        }), r.jsx(om, {}), r.jsx(pm, {})]
    })
}
class tv extends T.Component {
    constructor(f) {
        super(f),
        this.state = {
            hasError: !1,
            error: null
        }
    }
    static getDerivedStateFromError(f) {
        return {
            hasError: !0,
            error: f
        }
    }
    componentDidCatch(f, m) {
        console.error("[ErrorBoundary] An error occurred")
    }
    handleReload = () => {
        window.location.reload()
    }
    ;
    handleReset = () => {
        this.setState({
            hasError: !1,
            error: null
        })
    }
    ;
    render() {
        return this.state.hasError ? r.jsx("div", {
            className: "min-h-screen bg-dark-900 flex items-center justify-center p-6",
            children: r.jsxs("div", {
                className: "max-w-md w-full bg-dark-800 rounded-xl border border-dark-700 p-8 text-center",
                children: [r.jsx("div", {
                    className: "w-16 h-16 mx-auto mb-6 rounded-full bg-red-500/10 flex items-center justify-center",
                    children: r.jsx("svg", {
                        className: "w-8 h-8 text-red-500",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        children: r.jsx("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                            d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        })
                    })
                }), r.jsx("h1", {
                    className: "text-xl font-semibold text-white mb-2",
                    children: "오류가 발생했습니다"
                }), r.jsx("p", {
                    className: "text-gray-400 mb-6",
                    children: "예상치 못한 오류가 발생했습니다. 페이지를 새로고침하거나 잠시 후 다시 시도해주세요."
                }), !1, r.jsxs("div", {
                    className: "flex gap-3 justify-center",
                    children: [r.jsx("button", {
                        onClick: this.handleReset,
                        className: "px-4 py-2 bg-dark-700 hover:bg-dark-600 text-white rounded-lg transition-colors",
                        children: "다시 시도"
                    }), r.jsx("button", {
                        onClick: this.handleReload,
                        className: "px-4 py-2 bg-primary-600 hover:bg-primary-500 text-white rounded-lg transition-colors",
                        children: "새로고침"
                    })]
                })]
            })
        }) : this.props.children
    }
}
Ih.createRoot(document.getElementById("root")).render(r.jsx(T.StrictMode, {
    children: r.jsx(tv, {
        children: r.jsx(Sm, {
            children: r.jsx(ev, {})
        })
    })
}));
export {wa as A, _t as E, Tr as P, Mt as a, Tm as b, lv as g, r as j, $d as l, T as r, U2 as u};
