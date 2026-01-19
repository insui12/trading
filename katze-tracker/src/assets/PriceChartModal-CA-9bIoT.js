import {r as O, j as v, E as st} from "./index-fz5sT9EK.js";
function x(n) {
    var t = n.width
      , i = n.height;
    if (t < 0)
        throw new Error("Negative width is not allowed for Size");
    if (i < 0)
        throw new Error("Negative height is not allowed for Size");
    return {
        width: t,
        height: i
    }
}
function Q(n, t) {
    return n.width === t.width && n.height === t.height
}
var Ws = (function() {
    function n(t) {
        var i = this;
        this._resolutionListener = function() {
            return i._onResolutionChanged()
        }
        ,
        this._resolutionMediaQueryList = null,
        this._observers = [],
        this._window = t,
        this._installResolutionListener()
    }
    return n.prototype.dispose = function() {
        this._uninstallResolutionListener(),
        this._window = null
    }
    ,
    Object.defineProperty(n.prototype, "value", {
        get: function() {
            return this._window.devicePixelRatio
        },
        enumerable: !1,
        configurable: !0
    }),
    n.prototype.subscribe = function(t) {
        var i = this
          , s = {
            next: t
        };
        return this._observers.push(s),
        {
            unsubscribe: function() {
                i._observers = i._observers.filter(function(e) {
                    return e !== s
                })
            }
        }
    }
    ,
    n.prototype._installResolutionListener = function() {
        if (this._resolutionMediaQueryList !== null)
            throw new Error("Resolution listener is already installed");
        var t = this._window.devicePixelRatio;
        this._resolutionMediaQueryList = this._window.matchMedia("all and (resolution: ".concat(t, "dppx)")),
        this._resolutionMediaQueryList.addListener(this._resolutionListener)
    }
    ,
    n.prototype._uninstallResolutionListener = function() {
        this._resolutionMediaQueryList !== null && (this._resolutionMediaQueryList.removeListener(this._resolutionListener),
        this._resolutionMediaQueryList = null)
    }
    ,
    n.prototype._reinstallResolutionListener = function() {
        this._uninstallResolutionListener(),
        this._installResolutionListener()
    }
    ,
    n.prototype._onResolutionChanged = function() {
        var t = this;
        this._observers.forEach(function(i) {
            return i.next(t._window.devicePixelRatio)
        }),
        this._reinstallResolutionListener()
    }
    ,
    n
}
)();
function Bs(n) {
    return new Ws(n)
}
var As = (function() {
    function n(t, i, s) {
        var e;
        this._canvasElement = null,
        this._bitmapSizeChangedListeners = [],
        this._suggestedBitmapSize = null,
        this._suggestedBitmapSizeChangedListeners = [],
        this._devicePixelRatioObservable = null,
        this._canvasElementResizeObserver = null,
        this._canvasElement = t,
        this._canvasElementClientSize = x({
            width: this._canvasElement.clientWidth,
            height: this._canvasElement.clientHeight
        }),
        this._transformBitmapSize = i ?? (function(h) {
            return h
        }
        ),
        this._allowResizeObserver = (e = s?.allowResizeObserver) !== null && e !== void 0 ? e : !0,
        this._chooseAndInitObserver()
    }
    return n.prototype.dispose = function() {
        var t, i;
        if (this._canvasElement === null)
            throw new Error("Object is disposed");
        (t = this._canvasElementResizeObserver) === null || t === void 0 || t.disconnect(),
        this._canvasElementResizeObserver = null,
        (i = this._devicePixelRatioObservable) === null || i === void 0 || i.dispose(),
        this._devicePixelRatioObservable = null,
        this._suggestedBitmapSizeChangedListeners.length = 0,
        this._bitmapSizeChangedListeners.length = 0,
        this._canvasElement = null
    }
    ,
    Object.defineProperty(n.prototype, "canvasElement", {
        get: function() {
            if (this._canvasElement === null)
                throw new Error("Object is disposed");
            return this._canvasElement
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(n.prototype, "canvasElementClientSize", {
        get: function() {
            return this._canvasElementClientSize
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(n.prototype, "bitmapSize", {
        get: function() {
            return x({
                width: this.canvasElement.width,
                height: this.canvasElement.height
            })
        },
        enumerable: !1,
        configurable: !0
    }),
    n.prototype.resizeCanvasElement = function(t) {
        this._canvasElementClientSize = x(t),
        this.canvasElement.style.width = "".concat(this._canvasElementClientSize.width, "px"),
        this.canvasElement.style.height = "".concat(this._canvasElementClientSize.height, "px"),
        this._invalidateBitmapSize()
    }
    ,
    n.prototype.subscribeBitmapSizeChanged = function(t) {
        this._bitmapSizeChangedListeners.push(t)
    }
    ,
    n.prototype.unsubscribeBitmapSizeChanged = function(t) {
        this._bitmapSizeChangedListeners = this._bitmapSizeChangedListeners.filter(function(i) {
            return i !== t
        })
    }
    ,
    Object.defineProperty(n.prototype, "suggestedBitmapSize", {
        get: function() {
            return this._suggestedBitmapSize
        },
        enumerable: !1,
        configurable: !0
    }),
    n.prototype.subscribeSuggestedBitmapSizeChanged = function(t) {
        this._suggestedBitmapSizeChangedListeners.push(t)
    }
    ,
    n.prototype.unsubscribeSuggestedBitmapSizeChanged = function(t) {
        this._suggestedBitmapSizeChangedListeners = this._suggestedBitmapSizeChangedListeners.filter(function(i) {
            return i !== t
        })
    }
    ,
    n.prototype.applySuggestedBitmapSize = function() {
        if (this._suggestedBitmapSize !== null) {
            var t = this._suggestedBitmapSize;
            this._suggestedBitmapSize = null,
            this._resizeBitmap(t),
            this._emitSuggestedBitmapSizeChanged(t, this._suggestedBitmapSize)
        }
    }
    ,
    n.prototype._resizeBitmap = function(t) {
        var i = this.bitmapSize;
        Q(i, t) || (this.canvasElement.width = t.width,
        this.canvasElement.height = t.height,
        this._emitBitmapSizeChanged(i, t))
    }
    ,
    n.prototype._emitBitmapSizeChanged = function(t, i) {
        var s = this;
        this._bitmapSizeChangedListeners.forEach(function(e) {
            return e.call(s, t, i)
        })
    }
    ,
    n.prototype._suggestNewBitmapSize = function(t) {
        var i = this._suggestedBitmapSize
          , s = x(this._transformBitmapSize(t, this._canvasElementClientSize))
          , e = Q(this.bitmapSize, s) ? null : s;
        i === null && e === null || i !== null && e !== null && Q(i, e) || (this._suggestedBitmapSize = e,
        this._emitSuggestedBitmapSizeChanged(i, e))
    }
    ,
    n.prototype._emitSuggestedBitmapSizeChanged = function(t, i) {
        var s = this;
        this._suggestedBitmapSizeChangedListeners.forEach(function(e) {
            return e.call(s, t, i)
        })
    }
    ,
    n.prototype._chooseAndInitObserver = function() {
        var t = this;
        if (!this._allowResizeObserver) {
            this._initDevicePixelRatioObservable();
            return
        }
        Os().then(function(i) {
            return i ? t._initResizeObserver() : t._initDevicePixelRatioObservable()
        })
    }
    ,
    n.prototype._initDevicePixelRatioObservable = function() {
        var t = this;
        if (this._canvasElement !== null) {
            var i = vi(this._canvasElement);
            if (i === null)
                throw new Error("No window is associated with the canvas");
            this._devicePixelRatioObservable = Bs(i),
            this._devicePixelRatioObservable.subscribe(function() {
                return t._invalidateBitmapSize()
            }),
            this._invalidateBitmapSize()
        }
    }
    ,
    n.prototype._invalidateBitmapSize = function() {
        var t, i;
        if (this._canvasElement !== null) {
            var s = vi(this._canvasElement);
            if (s !== null) {
                var e = (i = (t = this._devicePixelRatioObservable) === null || t === void 0 ? void 0 : t.value) !== null && i !== void 0 ? i : s.devicePixelRatio
                  , h = this._canvasElement.getClientRects()
                  , r = h[0] !== void 0 ? Ks(h[0], e) : x({
                    width: this._canvasElementClientSize.width * e,
                    height: this._canvasElementClientSize.height * e
                });
                this._suggestNewBitmapSize(r)
            }
        }
    }
    ,
    n.prototype._initResizeObserver = function() {
        var t = this;
        this._canvasElement !== null && (this._canvasElementResizeObserver = new ResizeObserver(function(i) {
            var s = i.find(function(r) {
                return r.target === t._canvasElement
            });
            if (!(!s || !s.devicePixelContentBoxSize || !s.devicePixelContentBoxSize[0])) {
                var e = s.devicePixelContentBoxSize[0]
                  , h = x({
                    width: e.inlineSize,
                    height: e.blockSize
                });
                t._suggestNewBitmapSize(h)
            }
        }
        ),
        this._canvasElementResizeObserver.observe(this._canvasElement, {
            box: "device-pixel-content-box"
        }))
    }
    ,
    n
}
)();
function Vs(n, t) {
    return new As(n,t.transform,t.options)
}
function vi(n) {
    return n.ownerDocument.defaultView
}
function Os() {
    return new Promise(function(n) {
        var t = new ResizeObserver(function(i) {
            n(i.every(function(s) {
                return "devicePixelContentBoxSize"in s
            })),
            t.disconnect()
        }
        );
        t.observe(document.body, {
            box: "device-pixel-content-box"
        })
    }
    ).catch(function() {
        return !1
    })
}
function Ks(n, t) {
    return x({
        width: Math.round(n.left * t + n.width * t) - Math.round(n.left * t),
        height: Math.round(n.top * t + n.height * t) - Math.round(n.top * t)
    })
}
var Js = (function() {
    function n(t, i, s) {
        if (i.width === 0 || i.height === 0)
            throw new TypeError("Rendering target could only be created on a media with positive width and height");
        if (this._mediaSize = i,
        s.width === 0 || s.height === 0)
            throw new TypeError("Rendering target could only be created using a bitmap with positive integer width and height");
        this._bitmapSize = s,
        this._context = t
    }
    return n.prototype.useMediaCoordinateSpace = function(t) {
        try {
            return this._context.save(),
            this._context.setTransform(1, 0, 0, 1, 0, 0),
            this._context.scale(this._horizontalPixelRatio, this._verticalPixelRatio),
            t({
                context: this._context,
                mediaSize: this._mediaSize
            })
        } finally {
            this._context.restore()
        }
    }
    ,
    n.prototype.useBitmapCoordinateSpace = function(t) {
        try {
            return this._context.save(),
            this._context.setTransform(1, 0, 0, 1, 0, 0),
            t({
                context: this._context,
                mediaSize: this._mediaSize,
                bitmapSize: this._bitmapSize,
                horizontalPixelRatio: this._horizontalPixelRatio,
                verticalPixelRatio: this._verticalPixelRatio
            })
        } finally {
            this._context.restore()
        }
    }
    ,
    Object.defineProperty(n.prototype, "_horizontalPixelRatio", {
        get: function() {
            return this._bitmapSize.width / this._mediaSize.width
        },
        enumerable: !1,
        configurable: !0
    }),
    Object.defineProperty(n.prototype, "_verticalPixelRatio", {
        get: function() {
            return this._bitmapSize.height / this._mediaSize.height
        },
        enumerable: !1,
        configurable: !0
    }),
    n
}
)();
function H(n, t) {
    var i = n.canvasElementClientSize;
    if (i.width === 0 || i.height === 0)
        return null;
    var s = n.bitmapSize;
    if (s.width === 0 || s.height === 0)
        return null;
    var e = n.canvasElement.getContext("2d", t);
    return e === null ? null : new Js(e,i,s)
}
const gs = {
    title: "",
    visible: !0,
    lastValueVisible: !0,
    priceLineVisible: !0,
    priceLineSource: 0,
    priceLineWidth: 1,
    priceLineColor: "",
    priceLineStyle: 2,
    baseLineVisible: !0,
    baseLineWidth: 1,
    baseLineColor: "#B2B5BE",
    baseLineStyle: 0,
    priceFormat: {
        type: "price",
        precision: 2,
        minMove: .01
    }
};
var wi, bi;
function q(n, t) {
    const i = {
        0: [],
        1: [n.lineWidth, n.lineWidth],
        2: [2 * n.lineWidth, 2 * n.lineWidth],
        3: [6 * n.lineWidth, 6 * n.lineWidth],
        4: [n.lineWidth, 4 * n.lineWidth]
    }[t];
    n.setLineDash(i)
}
function vs(n, t, i, s) {
    n.beginPath();
    const e = n.lineWidth % 2 ? .5 : 0;
    n.moveTo(i, t + e),
    n.lineTo(s, t + e),
    n.stroke()
}
function z(n, t) {
    if (!n)
        throw new Error("Assertion failed" + (t ? ": " + t : ""))
}
function T(n) {
    if (n === void 0)
        throw new Error("Value is undefined");
    return n
}
function g(n) {
    if (n === null)
        throw new Error("Value is null");
    return n
}
function $(n) {
    return g(T(n))
}
(function(n) {
    n[n.Simple = 0] = "Simple",
    n[n.WithSteps = 1] = "WithSteps",
    n[n.Curved = 2] = "Curved"
}
)(wi || (wi = {})),
(function(n) {
    n[n.Solid = 0] = "Solid",
    n[n.Dotted = 1] = "Dotted",
    n[n.Dashed = 2] = "Dashed",
    n[n.LargeDashed = 3] = "LargeDashed",
    n[n.SparseDotted = 4] = "SparseDotted"
}
)(bi || (bi = {}));
class P {
    constructor() {
        this.t = []
    }
    i(t, i, s) {
        const e = {
            h: t,
            l: i,
            o: s === !0
        };
        this.t.push(e)
    }
    _(t) {
        const i = this.t.findIndex((s => t === s.h));
        i > -1 && this.t.splice(i, 1)
    }
    u(t) {
        this.t = this.t.filter((i => i.l !== t))
    }
    p(t, i, s) {
        const e = [...this.t];
        this.t = this.t.filter((h => !h.o)),
        e.forEach((h => h.h(t, i, s)))
    }
    v() {
        return this.t.length > 0
    }
    m() {
        this.t = []
    }
}
function W(n, ...t) {
    for (const i of t)
        for (const s in i)
            i[s] !== void 0 && Object.prototype.hasOwnProperty.call(i, s) && !["__proto__", "constructor", "prototype"].includes(s) && (typeof i[s] != "object" || n[s] === void 0 || Array.isArray(i[s]) ? n[s] = i[s] : W(n[s], i[s]));
    return n
}
function lt(n) {
    return typeof n == "number" && isFinite(n)
}
function gt(n) {
    return typeof n == "number" && n % 1 == 0
}
function wt(n) {
    return typeof n == "string"
}
function Mt(n) {
    return typeof n == "boolean"
}
function K(n) {
    const t = n;
    if (!t || typeof t != "object")
        return t;
    let i, s, e;
    for (s in i = Array.isArray(t) ? [] : {},
    t)
        t.hasOwnProperty(s) && (e = t[s],
        i[s] = e && typeof e == "object" ? K(e) : e);
    return i
}
function Mi(n) {
    return n !== null
}
function vt(n) {
    return n === null ? void 0 : n
}
const ws = "-apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif";
function Lt(n, t, i) {
    return t === void 0 && (t = ws),
    `${i = i !== void 0 ? `${i} ` : ""}${n}px ${t}`
}
class Ys {
    constructor(t) {
        this.M = {
            S: 1,
            C: 5,
            k: NaN,
            P: "",
            T: "",
            R: "",
            D: "",
            I: 0,
            V: 0,
            B: 0,
            A: 0,
            L: 0
        },
        this.O = t
    }
    N() {
        const t = this.M
          , i = this.F()
          , s = this.W();
        return t.k === i && t.T === s || (t.k = i,
        t.T = s,
        t.P = Lt(i, s),
        t.A = 2.5 / 12 * i,
        t.I = t.A,
        t.V = i / 12 * t.C,
        t.B = i / 12 * t.C,
        t.L = 0),
        t.R = this.H(),
        t.D = this.U(),
        this.M
    }
    H() {
        return this.O.N().layout.textColor
    }
    U() {
        return this.O.$()
    }
    F() {
        return this.O.N().layout.fontSize
    }
    W() {
        return this.O.N().layout.fontFamily
    }
}
function Yt(n) {
    return n < 0 ? 0 : n > 255 ? 255 : Math.round(n) || 0
}
function xi(n) {
    return .199 * n[0] + .687 * n[1] + .114 * n[2]
}
class Ds {
    constructor(t, i) {
        this.q = new Map,
        this.j = t,
        i && (this.q = i)
    }
    Y(t, i) {
        if (t === "transparent")
            return t;
        const s = this.K(t)
          , e = s[3];
        return `rgba(${s[0]}, ${s[1]}, ${s[2]}, ${i * e})`
    }
    Z(t) {
        const i = this.K(t);
        return {
            G: `rgb(${i[0]}, ${i[1]}, ${i[2]})`,
            X: xi(i) > 160 ? "black" : "white"
        }
    }
    J(t) {
        return xi(this.K(t))
    }
    tt(t, i, s) {
        const [e,h,r,o] = this.K(t)
          , [l,a,u,c] = this.K(i)
          , d = [Yt(e + s * (l - e)), Yt(h + s * (a - h)), Yt(r + s * (u - r)), (m = o + s * (c - o),
        m <= 0 || m > 1 ? Math.min(Math.max(m, 0), 1) : Math.round(1e4 * m) / 1e4)];
        var m;
        return `rgba(${d[0]}, ${d[1]}, ${d[2]}, ${d[3]})`
    }
    K(t) {
        const i = this.q.get(t);
        if (i)
            return i;
        const s = (function(r) {
            const o = document.createElement("div");
            o.style.display = "none",
            document.body.appendChild(o),
            o.style.color = r;
            const l = window.getComputedStyle(o).color;
            return document.body.removeChild(o),
            l
        }
        )(t)
          , e = s.match(/^rgba?\s*\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d*\.?\d+))?\)$/);
        if (!e) {
            if (this.j.length)
                for (const r of this.j) {
                    const o = r(t);
                    if (o)
                        return this.q.set(t, o),
                        o
                }
            throw new Error(`Failed to parse color: ${t}`)
        }
        const h = [parseInt(e[1], 10), parseInt(e[2], 10), parseInt(e[3], 10), e[4] ? parseFloat(e[4]) : 1];
        return this.q.set(t, h),
        h
    }
}
class $s {
    constructor() {
        this.it = []
    }
    st(t) {
        this.it = t
    }
    nt(t, i, s) {
        this.it.forEach((e => {
            e.nt(t, i, s)
        }
        ))
    }
}
class G {
    nt(t, i, s) {
        t.useBitmapCoordinateSpace((e => this.et(e, i, s)))
    }
}
class Gs extends G {
    constructor() {
        super(...arguments),
        this.rt = null
    }
    ht(t) {
        this.rt = t
    }
    et({context: t, horizontalPixelRatio: i, verticalPixelRatio: s}) {
        if (this.rt === null || this.rt.lt === null)
            return;
        const e = this.rt.lt
          , h = this.rt
          , r = Math.max(1, Math.floor(i)) % 2 / 2
          , o = l => {
            t.beginPath();
            for (let a = e.to - 1; a >= e.from; --a) {
                const u = h.ot[a]
                  , c = Math.round(u._t * i) + r
                  , d = u.ut * s
                  , m = l * s + r;
                t.moveTo(c, d),
                t.arc(c, d, m, 0, 2 * Math.PI)
            }
            t.fill()
        }
        ;
        h.ct > 0 && (t.fillStyle = h.dt,
        o(h.ft + h.ct)),
        t.fillStyle = h.vt,
        o(h.ft)
    }
}
function Us() {
    return {
        ot: [{
            _t: 0,
            ut: 0,
            wt: 0,
            gt: 0
        }],
        vt: "",
        dt: "",
        ft: 0,
        ct: 0,
        lt: null
    }
}
const Xs = {
    from: 0,
    to: 1
};
class Qs {
    constructor(t, i, s) {
        this.Mt = new $s,
        this.bt = [],
        this.St = [],
        this.xt = !0,
        this.O = t,
        this.Ct = i,
        this.yt = s,
        this.Mt.st(this.bt)
    }
    kt(t) {
        this.Pt(),
        this.xt = !0
    }
    Tt() {
        return this.xt && (this.Rt(),
        this.xt = !1),
        this.Mt
    }
    Pt() {
        const t = this.yt.Dt();
        t.length !== this.bt.length && (this.St = t.map(Us),
        this.bt = this.St.map((i => {
            const s = new Gs;
            return s.ht(i),
            s
        }
        )),
        this.Mt.st(this.bt))
    }
    Rt() {
        const t = this.Ct.N().mode === 2 || !this.Ct.It()
          , i = this.yt.Vt()
          , s = this.Ct.Bt()
          , e = this.O.Et();
        this.Pt(),
        i.forEach(( (h, r) => {
            const o = this.St[r]
              , l = h.At(s)
              , a = h.Lt();
            !t && l !== null && h.It() && a !== null ? (o.vt = l.zt,
            o.ft = l.ft,
            o.ct = l.Ot,
            o.ot[0].gt = l.gt,
            o.ot[0].ut = h.Ft().Nt(l.gt, a.Wt),
            o.dt = l.Ht ?? this.O.Ut(o.ot[0].ut / h.Ft().$t()),
            o.ot[0].wt = s,
            o.ot[0]._t = e.qt(s),
            o.lt = Xs) : o.lt = null
        }
        ))
    }
}
class Hs extends G {
    constructor(t) {
        super(),
        this.jt = t
    }
    et({context: t, bitmapSize: i, horizontalPixelRatio: s, verticalPixelRatio: e}) {
        if (this.jt === null)
            return;
        const h = this.jt.Yt.It
          , r = this.jt.Kt.It;
        if (!h && !r)
            return;
        const o = Math.round(this.jt._t * s)
          , l = Math.round(this.jt.ut * e);
        t.lineCap = "butt",
        h && o >= 0 && (t.lineWidth = Math.floor(this.jt.Yt.ct * s),
        t.strokeStyle = this.jt.Yt.R,
        t.fillStyle = this.jt.Yt.R,
        q(t, this.jt.Yt.Zt),
        (function(a, u, c, d) {
            a.beginPath();
            const m = a.lineWidth % 2 ? .5 : 0;
            a.moveTo(u + m, c),
            a.lineTo(u + m, d),
            a.stroke()
        }
        )(t, o, 0, i.height)),
        r && l >= 0 && (t.lineWidth = Math.floor(this.jt.Kt.ct * e),
        t.strokeStyle = this.jt.Kt.R,
        t.fillStyle = this.jt.Kt.R,
        q(t, this.jt.Kt.Zt),
        vs(t, l, 0, i.width))
    }
}
class qs {
    constructor(t, i) {
        this.xt = !0,
        this.Gt = {
            Yt: {
                ct: 1,
                Zt: 0,
                R: "",
                It: !1
            },
            Kt: {
                ct: 1,
                Zt: 0,
                R: "",
                It: !1
            },
            _t: 0,
            ut: 0
        },
        this.Xt = new Hs(this.Gt),
        this.Jt = t,
        this.yt = i
    }
    kt() {
        this.xt = !0
    }
    Tt(t) {
        return this.xt && (this.Rt(),
        this.xt = !1),
        this.Xt
    }
    Rt() {
        const t = this.Jt.It()
          , i = this.yt.Qt().N().crosshair
          , s = this.Gt;
        if (i.mode === 2)
            return s.Kt.It = !1,
            void (s.Yt.It = !1);
        s.Kt.It = t && this.Jt.ti(this.yt),
        s.Yt.It = t && this.Jt.ii(),
        s.Kt.ct = i.horzLine.width,
        s.Kt.Zt = i.horzLine.style,
        s.Kt.R = i.horzLine.color,
        s.Yt.ct = i.vertLine.width,
        s.Yt.Zt = i.vertLine.style,
        s.Yt.R = i.vertLine.color,
        s._t = this.Jt.si(),
        s.ut = this.Jt.ni()
    }
}
function Zs(n, t, i, s, e, h) {
    n.fillRect(t + h, i, s - 2 * h, h),
    n.fillRect(t + h, i + e - h, s - 2 * h, h),
    n.fillRect(t, i, h, e),
    n.fillRect(t + s - h, i, h, e)
}
function It(n, t, i, s, e, h) {
    n.save(),
    n.globalCompositeOperation = "copy",
    n.fillStyle = h,
    n.fillRect(t, i, s, e),
    n.restore()
}
function yi(n, t, i, s, e, h) {
    n.beginPath(),
    n.roundRect ? n.roundRect(t, i, s, e, h) : (n.lineTo(t + s - h[1], i),
    h[1] !== 0 && n.arcTo(t + s, i, t + s, i + h[1], h[1]),
    n.lineTo(t + s, i + e - h[2]),
    h[2] !== 0 && n.arcTo(t + s, i + e, t + s - h[2], i + e, h[2]),
    n.lineTo(t + h[3], i + e),
    h[3] !== 0 && n.arcTo(t, i + e, t, i + e - h[3], h[3]),
    n.lineTo(t, i + h[0]),
    h[0] !== 0 && n.arcTo(t, i, t + h[0], i, h[0]))
}
function _i(n, t, i, s, e, h, r=0, o=[0, 0, 0, 0], l="") {
    if (n.save(),
    !r || !l || l === h)
        return yi(n, t, i, s, e, o),
        n.fillStyle = h,
        n.fill(),
        void n.restore();
    const a = r / 2;
    var u;
    yi(n, t + a, i + a, s - r, e - r, (u = -a,
    o.map((c => c === 0 ? c : c + u)))),
    h !== "transparent" && (n.fillStyle = h,
    n.fill()),
    l !== "transparent" && (n.lineWidth = r,
    n.strokeStyle = l,
    n.closePath(),
    n.stroke()),
    n.restore()
}
function bs(n, t, i, s, e, h, r) {
    n.save(),
    n.globalCompositeOperation = "copy";
    const o = n.createLinearGradient(0, 0, 0, e);
    o.addColorStop(0, h),
    o.addColorStop(1, r),
    n.fillStyle = o,
    n.fillRect(t, i, s, e),
    n.restore()
}
class Si {
    constructor(t, i) {
        this.ht(t, i)
    }
    ht(t, i) {
        this.jt = t,
        this.ei = i
    }
    $t(t, i) {
        return this.jt.It ? t.k + t.A + t.I : 0
    }
    nt(t, i, s, e) {
        if (!this.jt.It || this.jt.ri.length === 0)
            return;
        const h = this.jt.R
          , r = this.ei.G
          , o = t.useBitmapCoordinateSpace((l => {
            const a = l.context;
            a.font = i.P;
            const u = this.hi(l, i, s, e)
              , c = u.ai;
            return u.li ? _i(a, c.oi, c._i, c.ui, c.ci, r, c.di, [c.ft, 0, 0, c.ft], r) : _i(a, c.fi, c._i, c.ui, c.ci, r, c.di, [0, c.ft, c.ft, 0], r),
            this.jt.pi && (a.fillStyle = h,
            a.fillRect(c.fi, c.mi, c.wi - c.fi, c.gi)),
            this.jt.Mi && (a.fillStyle = i.D,
            a.fillRect(u.li ? c.bi - c.di : 0, c._i, c.di, c.Si - c._i)),
            u
        }
        ));
        t.useMediaCoordinateSpace(( ({context: l}) => {
            const a = o.xi;
            l.font = i.P,
            l.textAlign = o.li ? "right" : "left",
            l.textBaseline = "middle",
            l.fillStyle = h,
            l.fillText(this.jt.ri, a.Ci, (a._i + a.Si) / 2 + a.yi)
        }
        ))
    }
    hi(t, i, s, e) {
        const {context: h, bitmapSize: r, mediaSize: o, horizontalPixelRatio: l, verticalPixelRatio: a} = t
          , u = this.jt.pi || !this.jt.ki ? i.C : 0
          , c = this.jt.Pi ? i.S : 0
          , d = i.A + this.ei.Ti
          , m = i.I + this.ei.Ri
          , f = i.V
          , p = i.B
          , w = this.jt.ri
          , b = i.k
          , M = s.Di(h, w)
          , y = Math.ceil(s.Ii(h, w))
          , _ = b + d + m
          , j = i.S + f + p + y + u
          , C = Math.max(1, Math.floor(a));
        let I = Math.round(_ * a);
        I % 2 != C % 2 && (I += 1);
        const R = c > 0 ? Math.max(1, Math.floor(c * l)) : 0
          , k = Math.round(j * l)
          , U = Math.round(u * l)
          , Kt = this.ei.Vi ?? this.ei.Bi ?? this.ei.Ei
          , bt = Math.round(Kt * a) - Math.floor(.5 * a)
          , it = Math.floor(bt + C / 2 - I / 2)
          , S = it + I
          , N = e === "right"
          , Y = N ? o.width - c : c
          , E = N ? r.width - R : R;
        let A, B, Jt;
        return N ? (A = E - k,
        B = E - U,
        Jt = Y - u - f - c) : (A = E + k,
        B = E + U,
        Jt = Y + u + f),
        {
            li: N,
            ai: {
                _i: it,
                mi: bt,
                Si: S,
                ui: k,
                ci: I,
                ft: 2 * l,
                di: R,
                oi: A,
                fi: E,
                wi: B,
                gi: C,
                bi: r.width
            },
            xi: {
                _i: it / a,
                Si: S / a,
                Ci: Jt,
                yi: M
            }
        }
    }
}
class Wt {
    constructor(t) {
        this.Ai = {
            Ei: 0,
            G: "#000",
            Ri: 0,
            Ti: 0
        },
        this.Li = {
            ri: "",
            It: !1,
            pi: !0,
            ki: !1,
            Ht: "",
            R: "#FFF",
            Mi: !1,
            Pi: !1
        },
        this.zi = {
            ri: "",
            It: !1,
            pi: !1,
            ki: !0,
            Ht: "",
            R: "#FFF",
            Mi: !0,
            Pi: !0
        },
        this.xt = !0,
        this.Oi = new (t || Si)(this.Li,this.Ai),
        this.Ni = new (t || Si)(this.zi,this.Ai)
    }
    ri() {
        return this.Fi(),
        this.Li.ri
    }
    Ei() {
        return this.Fi(),
        this.Ai.Ei
    }
    kt() {
        this.xt = !0
    }
    $t(t, i=!1) {
        return Math.max(this.Oi.$t(t, i), this.Ni.$t(t, i))
    }
    Wi() {
        return this.Ai.Vi ?? null
    }
    Hi() {
        return this.Ai.Vi ?? this.Ai.Bi ?? this.Ei()
    }
    Ui(t) {
        this.Ai.Bi = t ?? void 0
    }
    $i() {
        return this.Fi(),
        this.Li.It || this.zi.It
    }
    qi() {
        return this.Fi(),
        this.Li.It
    }
    Tt(t) {
        return this.Fi(),
        this.Li.pi = this.Li.pi && t.N().ticksVisible,
        this.zi.pi = this.zi.pi && t.N().ticksVisible,
        this.Oi.ht(this.Li, this.Ai),
        this.Ni.ht(this.zi, this.Ai),
        this.Oi
    }
    ji() {
        return this.Fi(),
        this.Oi.ht(this.Li, this.Ai),
        this.Ni.ht(this.zi, this.Ai),
        this.Ni
    }
    Fi() {
        this.xt && (this.Li.pi = !0,
        this.zi.pi = !1,
        this.Yi(this.Li, this.zi, this.Ai))
    }
}
class te extends Wt {
    constructor(t, i, s) {
        super(),
        this.Jt = t,
        this.Ki = i,
        this.Zi = s
    }
    Yi(t, i, s) {
        if (t.It = !1,
        this.Jt.N().mode === 2)
            return;
        const e = this.Jt.N().horzLine;
        if (!e.labelVisible)
            return;
        const h = this.Ki.Lt();
        if (!this.Jt.It() || this.Ki.Gi() || h === null)
            return;
        const r = this.Ki.Xi().Z(e.labelBackgroundColor);
        s.G = r.G,
        t.R = r.X;
        const o = 2 / 12 * this.Ki.k();
        s.Ti = o,
        s.Ri = o;
        const l = this.Zi(this.Ki);
        s.Ei = l.Ei,
        t.ri = this.Ki.Ji(l.gt, h),
        t.It = !0
    }
}
const ie = /[1-9]/g;
class Ms {
    constructor() {
        this.jt = null
    }
    ht(t) {
        this.jt = t
    }
    nt(t, i) {
        if (this.jt === null || this.jt.It === !1 || this.jt.ri.length === 0)
            return;
        const s = t.useMediaCoordinateSpace(( ({context: d}) => (d.font = i.P,
        Math.round(i.Qi.Ii(d, g(this.jt).ri, ie)))));
        if (s <= 0)
            return;
        const e = i.ts
          , h = s + 2 * e
          , r = h / 2
          , o = this.jt.ss;
        let l = this.jt.Ei
          , a = Math.floor(l - r) + .5;
        a < 0 ? (l += Math.abs(0 - a),
        a = Math.floor(l - r) + .5) : a + h > o && (l -= Math.abs(o - (a + h)),
        a = Math.floor(l - r) + .5);
        const u = a + h
          , c = Math.ceil(0 + i.S + i.C + i.A + i.k + i.I);
        t.useBitmapCoordinateSpace(( ({context: d, horizontalPixelRatio: m, verticalPixelRatio: f}) => {
            const p = g(this.jt);
            d.fillStyle = p.G;
            const w = Math.round(a * m)
              , b = Math.round(0 * f)
              , M = Math.round(u * m)
              , y = Math.round(c * f)
              , _ = Math.round(2 * m);
            if (d.beginPath(),
            d.moveTo(w, b),
            d.lineTo(w, y - _),
            d.arcTo(w, y, w + _, y, _),
            d.lineTo(M - _, y),
            d.arcTo(M, y, M, y - _, _),
            d.lineTo(M, b),
            d.fill(),
            p.pi) {
                const j = Math.round(p.Ei * m)
                  , C = b
                  , I = Math.round((C + i.C) * f);
                d.fillStyle = p.R;
                const R = Math.max(1, Math.floor(m))
                  , k = Math.floor(.5 * m);
                d.fillRect(j - k, C, R, I - C)
            }
        }
        )),
        t.useMediaCoordinateSpace(( ({context: d}) => {
            const m = g(this.jt)
              , f = 0 + i.S + i.C + i.A + i.k / 2;
            d.font = i.P,
            d.textAlign = "left",
            d.textBaseline = "middle",
            d.fillStyle = m.R;
            const p = i.Qi.Di(d, "Apr0");
            d.translate(a + e, f + p),
            d.fillText(m.ri, 0, 0)
        }
        ))
    }
}
class se {
    constructor(t, i, s) {
        this.xt = !0,
        this.Xt = new Ms,
        this.Gt = {
            It: !1,
            G: "#4c525e",
            R: "white",
            ri: "",
            ss: 0,
            Ei: NaN,
            pi: !0
        },
        this.Ct = t,
        this.ns = i,
        this.Zi = s
    }
    kt() {
        this.xt = !0
    }
    Tt() {
        return this.xt && (this.Rt(),
        this.xt = !1),
        this.Xt.ht(this.Gt),
        this.Xt
    }
    Rt() {
        const t = this.Gt;
        if (t.It = !1,
        this.Ct.N().mode === 2)
            return;
        const i = this.Ct.N().vertLine;
        if (!i.labelVisible)
            return;
        const s = this.ns.Et();
        if (s.Gi())
            return;
        t.ss = s.ss();
        const e = this.Zi();
        if (e === null)
            return;
        t.Ei = e.Ei;
        const h = s.es(this.Ct.Bt());
        t.ri = s.rs(g(h)),
        t.It = !0;
        const r = this.ns.Xi().Z(i.labelBackgroundColor);
        t.G = r.G,
        t.R = r.X,
        t.pi = s.N().ticksVisible
    }
}
class xs {
    constructor() {
        this.hs = null,
        this.ls = 0
    }
    _s() {
        return this.ls
    }
    us(t) {
        this.ls = t
    }
    Ft() {
        return this.hs
    }
    cs(t) {
        this.hs = t
    }
    ds(t) {
        return []
    }
    fs() {
        return []
    }
    It() {
        return !0
    }
}
var Ci;
(function(n) {
    n[n.Normal = 0] = "Normal",
    n[n.Magnet = 1] = "Magnet",
    n[n.Hidden = 2] = "Hidden",
    n[n.MagnetOHLC = 3] = "MagnetOHLC"
}
)(Ci || (Ci = {}));
class ee extends xs {
    constructor(t, i) {
        super(),
        this.yt = null,
        this.ps = NaN,
        this.vs = 0,
        this.ws = !1,
        this.gs = new Map,
        this.Ms = !1,
        this.bs = new WeakMap,
        this.Ss = new WeakMap,
        this.xs = NaN,
        this.Cs = NaN,
        this.ys = NaN,
        this.ks = NaN,
        this.ns = t,
        this.Ps = i,
        this.Ts = ( (e, h) => r => {
            const o = h()
              , l = e();
            if (r === g(this.yt).Rs())
                return {
                    gt: l,
                    Ei: o
                };
            {
                const a = g(r.Lt());
                return {
                    gt: r.Ds(o, a),
                    Ei: o
                }
            }
        }
        )(( () => this.ps), ( () => this.Cs));
        const s = ( (e, h) => () => {
            const r = this.ns.Et().Is(e())
              , o = h();
            return r && Number.isFinite(o) ? {
                wt: r,
                Ei: o
            } : null
        }
        )(( () => this.vs), ( () => this.si()));
        this.Vs = new se(this,t,s)
    }
    N() {
        return this.Ps
    }
    Bs(t, i) {
        this.ys = t,
        this.ks = i
    }
    Es() {
        this.ys = NaN,
        this.ks = NaN
    }
    As() {
        return this.ys
    }
    Ls() {
        return this.ks
    }
    zs(t, i, s) {
        this.Ms || (this.Ms = !0),
        this.ws = !0,
        this.Os(t, i, s)
    }
    Bt() {
        return this.vs
    }
    si() {
        return this.xs
    }
    ni() {
        return this.Cs
    }
    It() {
        return this.ws
    }
    Ns() {
        this.ws = !1,
        this.Fs(),
        this.ps = NaN,
        this.xs = NaN,
        this.Cs = NaN,
        this.yt = null,
        this.Es(),
        this.Ws()
    }
    Hs(t) {
        if (!this.Ps.doNotSnapToHiddenSeriesIndices)
            return t;
        const i = this.ns
          , s = i.Et();
        let e = null
          , h = null;
        for (const a of i.Us()) {
            const u = a.qs().$s(t, -1);
            if (u) {
                if (u.js === t)
                    return t;
                (e === null || u.js > e) && (e = u.js)
            }
            const c = a.qs().$s(t, 1);
            if (c) {
                if (c.js === t)
                    return t;
                (h === null || c.js < h) && (h = c.js)
            }
        }
        const r = [e, h].filter(Mi);
        if (r.length === 0)
            return t;
        const o = s.qt(t)
          , l = r.map((a => Math.abs(o - s.qt(a))));
        return r[l.indexOf(Math.min(...l))]
    }
    Ys(t) {
        let i = this.bs.get(t);
        i || (i = new qs(this,t),
        this.bs.set(t, i));
        let s = this.Ss.get(t);
        return s || (s = new Qs(this.ns,this,t),
        this.Ss.set(t, s)),
        [i, s]
    }
    ti(t) {
        return t === this.yt && this.Ps.horzLine.visible
    }
    ii() {
        return this.Ps.vertLine.visible
    }
    Ks(t, i) {
        this.ws && this.yt === t || this.gs.clear();
        const s = [];
        return this.yt === t && s.push(this.Zs(this.gs, i, this.Ts)),
        s
    }
    fs() {
        return this.ws ? [this.Vs] : []
    }
    Gs() {
        return this.yt
    }
    Ws() {
        this.ns.Xs().forEach((t => {
            this.bs.get(t)?.kt(),
            this.Ss.get(t)?.kt()
        }
        )),
        this.gs.forEach((t => t.kt())),
        this.Vs.kt()
    }
    Js(t) {
        return t && !t.Rs().Gi() ? t.Rs() : null
    }
    Os(t, i, s) {
        this.Qs(t, i, s) && this.Ws()
    }
    Qs(t, i, s) {
        const e = this.xs
          , h = this.Cs
          , r = this.ps
          , o = this.vs
          , l = this.yt
          , a = this.Js(s);
        this.vs = t,
        this.xs = isNaN(t) ? NaN : this.ns.Et().qt(t),
        this.yt = s;
        const u = a !== null ? a.Lt() : null;
        return a !== null && u !== null ? (this.ps = i,
        this.Cs = a.Nt(i, u)) : (this.ps = NaN,
        this.Cs = NaN),
        e !== this.xs || h !== this.Cs || o !== this.vs || r !== this.ps || l !== this.yt
    }
    Fs() {
        const t = this.ns.tn().map((s => s.qs().sn())).filter(Mi)
          , i = t.length === 0 ? null : Math.max(...t);
        this.vs = i !== null ? i : NaN
    }
    Zs(t, i, s) {
        let e = t.get(i);
        return e === void 0 && (e = new te(this,i,s),
        t.set(i, e)),
        e
    }
}
function Bt(n) {
    return n === "left" || n === "right"
}
class L {
    constructor(t) {
        this.nn = new Map,
        this.en = [],
        this.rn = t
    }
    hn(t, i) {
        const s = (function(e, h) {
            return e === void 0 ? h : {
                an: Math.max(e.an, h.an),
                ln: e.ln || h.ln
            }
        }
        )(this.nn.get(t), i);
        this.nn.set(t, s)
    }
    _n() {
        return this.rn
    }
    un(t) {
        const i = this.nn.get(t);
        return i === void 0 ? {
            an: this.rn
        } : {
            an: Math.max(this.rn, i.an),
            ln: i.ln
        }
    }
    cn() {
        this.dn(),
        this.en = [{
            fn: 0
        }]
    }
    pn(t) {
        this.dn(),
        this.en = [{
            fn: 1,
            Wt: t
        }]
    }
    vn(t) {
        this.mn(),
        this.en.push({
            fn: 5,
            Wt: t
        })
    }
    dn() {
        this.mn(),
        this.en.push({
            fn: 6
        })
    }
    wn() {
        this.dn(),
        this.en = [{
            fn: 4
        }]
    }
    gn(t) {
        this.dn(),
        this.en.push({
            fn: 2,
            Wt: t
        })
    }
    Mn(t) {
        this.dn(),
        this.en.push({
            fn: 3,
            Wt: t
        })
    }
    bn() {
        return this.en
    }
    Sn(t) {
        for (const i of t.en)
            this.xn(i);
        this.rn = Math.max(this.rn, t.rn),
        t.nn.forEach(( (i, s) => {
            this.hn(s, i)
        }
        ))
    }
    static Cn() {
        return new L(2)
    }
    static yn() {
        return new L(3)
    }
    xn(t) {
        switch (t.fn) {
        case 0:
            this.cn();
            break;
        case 1:
            this.pn(t.Wt);
            break;
        case 2:
            this.gn(t.Wt);
            break;
        case 3:
            this.Mn(t.Wt);
            break;
        case 4:
            this.wn();
            break;
        case 5:
            this.vn(t.Wt);
            break;
        case 6:
            this.mn()
        }
    }
    mn() {
        const t = this.en.findIndex((i => i.fn === 5));
        t !== -1 && this.en.splice(t, 1)
    }
}
class ys {
    formatTickmarks(t) {
        return t.map((i => this.format(i)))
    }
}
const Pi = ".";
function J(n, t) {
    if (!lt(n))
        return "n/a";
    if (!gt(t))
        throw new TypeError("invalid length");
    if (t < 0 || t > 16)
        throw new TypeError("invalid length");
    return t === 0 ? n.toString() : ("0000000000000000" + n.toString()).slice(-t)
}
class At extends ys {
    constructor(t, i) {
        if (super(),
        i || (i = 1),
        lt(t) && gt(t) || (t = 100),
        t < 0)
            throw new TypeError("invalid base");
        this.Ki = t,
        this.kn = i,
        this.Pn()
    }
    format(t) {
        const i = t < 0 ? "−" : "";
        return t = Math.abs(t),
        i + this.Tn(t)
    }
    Pn() {
        if (this.Rn = 0,
        this.Ki > 0 && this.kn > 0) {
            let t = this.Ki;
            for (; t > 1; )
                t /= 10,
                this.Rn++
        }
    }
    Tn(t) {
        const i = this.Ki / this.kn;
        let s = Math.floor(t)
          , e = "";
        const h = this.Rn !== void 0 ? this.Rn : NaN;
        if (i > 1) {
            let r = +(Math.round(t * i) - s * i).toFixed(this.Rn);
            r >= i && (r -= i,
            s += 1),
            e = Pi + J(+r.toFixed(this.Rn) * this.kn, h)
        } else
            s = Math.round(s * i) / i,
            h > 0 && (e = Pi + J(0, h));
        return s.toFixed(0) + e
    }
}
class _s extends At {
    constructor(t=100) {
        super(t)
    }
    format(t) {
        return `${super.format(t)}%`
    }
}
class he extends ys {
    constructor(t) {
        super(),
        this.Dn = t
    }
    format(t) {
        let i = "";
        return t < 0 && (i = "-",
        t = -t),
        t < 995 ? i + this.In(t) : t < 999995 ? i + this.In(t / 1e3) + "K" : t < 999999995 ? (t = 1e3 * Math.round(t / 1e3),
        i + this.In(t / 1e6) + "M") : (t = 1e6 * Math.round(t / 1e6),
        i + this.In(t / 1e9) + "B")
    }
    In(t) {
        let i;
        const s = Math.pow(10, this.Dn);
        return i = (t = Math.round(t * s) / s) >= 1e-15 && t < 1 ? t.toFixed(this.Dn).replace(/\.?0+$/, "") : String(t),
        i.replace(/(\.[1-9]*)0+$/, ( (e, h) => h))
    }
}
const ne = /[2-9]/g;
class zt {
    constructor(t=50) {
        this.Vn = 0,
        this.Bn = 1,
        this.En = 1,
        this.An = {},
        this.Ln = new Map,
        this.zn = t
    }
    On() {
        this.Vn = 0,
        this.Ln.clear(),
        this.Bn = 1,
        this.En = 1,
        this.An = {}
    }
    Ii(t, i, s) {
        return this.Nn(t, i, s).width
    }
    Di(t, i, s) {
        const e = this.Nn(t, i, s);
        return ((e.actualBoundingBoxAscent || 0) - (e.actualBoundingBoxDescent || 0)) / 2
    }
    Nn(t, i, s) {
        const e = s || ne
          , h = String(i).replace(e, "0");
        if (this.Ln.has(h))
            return T(this.Ln.get(h)).Fn;
        if (this.Vn === this.zn) {
            const o = this.An[this.En];
            delete this.An[this.En],
            this.Ln.delete(o),
            this.En++,
            this.Vn--
        }
        t.save(),
        t.textBaseline = "middle";
        const r = t.measureText(h);
        return t.restore(),
        r.width === 0 && i.length || (this.Ln.set(h, {
            Fn: r,
            Wn: this.Bn
        }),
        this.An[this.Bn] = h,
        this.Vn++,
        this.Bn++),
        r
    }
}
class re {
    constructor(t) {
        this.Hn = null,
        this.M = null,
        this.Un = "right",
        this.$n = t
    }
    qn(t, i, s) {
        this.Hn = t,
        this.M = i,
        this.Un = s
    }
    nt(t) {
        this.M !== null && this.Hn !== null && this.Hn.nt(t, this.M, this.$n, this.Un)
    }
}
class Ss {
    constructor(t, i, s) {
        this.jn = t,
        this.$n = new zt(50),
        this.Yn = i,
        this.O = s,
        this.F = -1,
        this.Xt = new re(this.$n)
    }
    Tt() {
        const t = this.O.Kn(this.Yn);
        if (t === null)
            return null;
        const i = t.Zn(this.Yn) ? t.Gn() : this.Yn.Ft();
        if (i === null)
            return null;
        const s = t.Xn(i);
        if (s === "overlay")
            return null;
        const e = this.O.Jn();
        return e.k !== this.F && (this.F = e.k,
        this.$n.On()),
        this.Xt.qn(this.jn.ji(), e, s),
        this.Xt
    }
}
class oe extends G {
    constructor() {
        super(...arguments),
        this.jt = null
    }
    ht(t) {
        this.jt = t
    }
    Qn(t, i) {
        if (!this.jt?.It)
            return null;
        const {ut: s, ct: e, te: h} = this.jt;
        return i >= s - e - 7 && i <= s + e + 7 ? {
            ie: this.jt,
            te: h
        } : null
    }
    et({context: t, bitmapSize: i, horizontalPixelRatio: s, verticalPixelRatio: e}) {
        if (this.jt === null || this.jt.It === !1)
            return;
        const h = Math.round(this.jt.ut * e);
        h < 0 || h > i.height || (t.lineCap = "butt",
        t.strokeStyle = this.jt.R,
        t.lineWidth = Math.floor(this.jt.ct * s),
        q(t, this.jt.Zt),
        vs(t, h, 0, i.width))
    }
}
class ci {
    constructor(t) {
        this.se = {
            ut: 0,
            R: "rgba(0, 0, 0, 0)",
            ct: 1,
            Zt: 0,
            It: !1
        },
        this.ne = new oe,
        this.xt = !0,
        this.ee = t,
        this.re = t.Qt(),
        this.ne.ht(this.se)
    }
    kt() {
        this.xt = !0
    }
    Tt() {
        return this.ee.It() ? (this.xt && (this.he(),
        this.xt = !1),
        this.ne) : null
    }
}
class le extends ci {
    constructor(t) {
        super(t)
    }
    he() {
        this.se.It = !1;
        const t = this.ee.Ft()
          , i = t.ae().ae;
        if (i !== 2 && i !== 3)
            return;
        const s = this.ee.N();
        if (!s.baseLineVisible || !this.ee.It())
            return;
        const e = this.ee.Lt();
        e !== null && (this.se.It = !0,
        this.se.ut = t.Nt(e.Wt, e.Wt),
        this.se.R = s.baseLineColor,
        this.se.ct = s.baseLineWidth,
        this.se.Zt = s.baseLineStyle)
    }
}
class ae extends G {
    constructor() {
        super(...arguments),
        this.jt = null
    }
    ht(t) {
        this.jt = t
    }
    le() {
        return this.jt
    }
    et({context: t, horizontalPixelRatio: i, verticalPixelRatio: s}) {
        const e = this.jt;
        if (e === null)
            return;
        const h = Math.max(1, Math.floor(i))
          , r = h % 2 / 2
          , o = Math.round(e.oe.x * i) + r
          , l = e.oe.y * s;
        t.fillStyle = e._e,
        t.beginPath();
        const a = Math.max(2, 1.5 * e.ue) * i;
        t.arc(o, l, a, 0, 2 * Math.PI, !1),
        t.fill(),
        t.fillStyle = e.ce,
        t.beginPath(),
        t.arc(o, l, e.ft * i, 0, 2 * Math.PI, !1),
        t.fill(),
        t.lineWidth = h,
        t.strokeStyle = e.de,
        t.beginPath(),
        t.arc(o, l, e.ft * i + h / 2, 0, 2 * Math.PI, !1),
        t.stroke()
    }
}
const ue = [{
    fe: 0,
    pe: .25,
    ve: 4,
    me: 10,
    we: .25,
    ge: 0,
    Me: .4,
    be: .8
}, {
    fe: .25,
    pe: .525,
    ve: 10,
    me: 14,
    we: 0,
    ge: 0,
    Me: .8,
    be: 0
}, {
    fe: .525,
    pe: 1,
    ve: 14,
    me: 14,
    we: 0,
    ge: 0,
    Me: 0,
    be: 0
}];
class ce {
    constructor(t) {
        this.Xt = new ae,
        this.xt = !0,
        this.Se = !0,
        this.xe = performance.now(),
        this.Ce = this.xe - 1,
        this.ye = t
    }
    ke() {
        this.Ce = this.xe - 1,
        this.kt()
    }
    Pe() {
        if (this.kt(),
        this.ye.N().lastPriceAnimation === 2) {
            const t = performance.now()
              , i = this.Ce - t;
            if (i > 0)
                return void (i < 650 && (this.Ce += 2600));
            this.xe = t,
            this.Ce = t + 2600
        }
    }
    kt() {
        this.xt = !0
    }
    Te() {
        this.Se = !0
    }
    It() {
        return this.ye.N().lastPriceAnimation !== 0
    }
    Re() {
        switch (this.ye.N().lastPriceAnimation) {
        case 0:
            return !1;
        case 1:
            return !0;
        case 2:
            return performance.now() <= this.Ce
        }
    }
    Tt() {
        return this.xt ? (this.Rt(),
        this.xt = !1,
        this.Se = !1) : this.Se && (this.De(),
        this.Se = !1),
        this.Xt
    }
    Rt() {
        this.Xt.ht(null);
        const t = this.ye.Qt().Et()
          , i = t.Ie()
          , s = this.ye.Lt();
        if (i === null || s === null)
            return;
        const e = this.ye.Ve(!0);
        if (e.Be || !i.Ee(e.js))
            return;
        const h = {
            x: t.qt(e.js),
            y: this.ye.Ft().Nt(e.gt, s.Wt)
        }
          , r = e.R
          , o = this.ye.N().lineWidth
          , l = this.Ae(this.Le(), r);
        this.Xt.ht({
            _e: r,
            ue: o,
            ce: l.ce,
            de: l.de,
            ft: l.ft,
            oe: h
        })
    }
    De() {
        const t = this.Xt.le();
        if (t !== null) {
            const i = this.Ae(this.Le(), t._e);
            t.ce = i.ce,
            t.de = i.de,
            t.ft = i.ft
        }
    }
    Le() {
        return this.Re() ? performance.now() - this.xe : 2599
    }
    ze(t, i, s, e) {
        const h = s + (e - s) * i;
        return this.ye.Qt().Xi().Y(t, h)
    }
    Ae(t, i) {
        const s = t % 2600 / 2600;
        let e;
        for (const a of ue)
            if (s >= a.fe && s <= a.pe) {
                e = a;
                break
            }
        z(e !== void 0, "Last price animation internal logic error");
        const h = (s - e.fe) / (e.pe - e.fe);
        return {
            ce: this.ze(i, h, e.we, e.ge),
            de: this.ze(i, h, e.Me, e.be),
            ft: (r = h,
            o = e.ve,
            l = e.me,
            o + (l - o) * r)
        };
        var r, o, l
    }
}
class de extends ci {
    constructor(t) {
        super(t)
    }
    he() {
        const t = this.se;
        t.It = !1;
        const i = this.ee.N();
        if (!i.priceLineVisible || !this.ee.It())
            return;
        const s = this.ee.Ve(i.priceLineSource === 0);
        s.Be || (t.It = !0,
        t.ut = s.Ei,
        t.R = this.ee.Oe(s.R),
        t.ct = i.priceLineWidth,
        t.Zt = i.priceLineStyle)
    }
}
class fe extends Wt {
    constructor(t) {
        super(),
        this.Jt = t
    }
    Yi(t, i, s) {
        t.It = !1,
        i.It = !1;
        const e = this.Jt;
        if (!e.It())
            return;
        const h = e.N()
          , r = h.lastValueVisible
          , o = e.Ne() !== ""
          , l = h.seriesLastValueMode === 0
          , a = e.Ve(!1);
        if (a.Be)
            return;
        r && (t.ri = this.Fe(a, r, l),
        t.It = t.ri.length !== 0),
        (o || l) && (i.ri = this.We(a, r, o, l),
        i.It = i.ri.length > 0);
        const u = e.Oe(a.R)
          , c = this.Jt.Qt().Xi().Z(u);
        s.G = c.G,
        s.Ei = a.Ei,
        i.Ht = e.Qt().Ut(a.Ei / e.Ft().$t()),
        t.Ht = u,
        t.R = c.X,
        i.R = c.X
    }
    We(t, i, s, e) {
        let h = "";
        const r = this.Jt.Ne();
        return s && r.length !== 0 && (h += `${r} `),
        i && e && (h += this.Jt.Ft().He() ? t.Ue : t.$e),
        h.trim()
    }
    Fe(t, i, s) {
        return i ? s ? this.Jt.Ft().He() ? t.$e : t.Ue : t.ri : ""
    }
}
function Ni(n, t, i, s) {
    const e = Number.isFinite(t)
      , h = Number.isFinite(i);
    return e && h ? n(t, i) : e || h ? e ? t : i : s
}
class F {
    constructor(t, i) {
        this.qe = t,
        this.je = i
    }
    Ye(t) {
        return t !== null && this.qe === t.qe && this.je === t.je
    }
    Ke() {
        return new F(this.qe,this.je)
    }
    Ze() {
        return this.qe
    }
    Ge() {
        return this.je
    }
    Xe() {
        return this.je - this.qe
    }
    Gi() {
        return this.je === this.qe || Number.isNaN(this.je) || Number.isNaN(this.qe)
    }
    Sn(t) {
        return t === null ? this : new F(Ni(Math.min, this.Ze(), t.Ze(), -1 / 0),Ni(Math.max, this.Ge(), t.Ge(), 1 / 0))
    }
    Je(t) {
        if (!lt(t) || this.je - this.qe === 0)
            return;
        const i = .5 * (this.je + this.qe);
        let s = this.je - i
          , e = this.qe - i;
        s *= t,
        e *= t,
        this.je = i + s,
        this.qe = i + e
    }
    Qe(t) {
        lt(t) && (this.je += t,
        this.qe += t)
    }
    tr() {
        return {
            minValue: this.qe,
            maxValue: this.je
        }
    }
    static ir(t) {
        return t === null ? null : new F(t.minValue,t.maxValue)
    }
}
class Rt {
    constructor(t, i) {
        this.sr = t,
        this.nr = i || null
    }
    er() {
        return this.sr
    }
    rr() {
        return this.nr
    }
    tr() {
        return {
            priceRange: this.sr === null ? null : this.sr.tr(),
            margins: this.nr || void 0
        }
    }
    static ir(t) {
        return t === null ? null : new Rt(F.ir(t.priceRange),t.margins)
    }
}
const me = [2, 4, 8, 16, 32, 64, 128, 256, 512]
  , pe = "Custom series with conflation reducer must have a priceValueBuilder method";
class ge extends ci {
    constructor(t, i) {
        super(t),
        this.hr = i
    }
    he() {
        const t = this.se;
        t.It = !1;
        const i = this.hr.N();
        if (!this.ee.It() || !i.lineVisible)
            return;
        const s = this.hr.ar();
        s !== null && (t.It = !0,
        t.ut = s,
        t.R = i.color,
        t.ct = i.lineWidth,
        t.Zt = i.lineStyle,
        t.te = this.hr.N().id)
    }
}
class ve extends Wt {
    constructor(t, i) {
        super(),
        this.ye = t,
        this.hr = i
    }
    Yi(t, i, s) {
        t.It = !1,
        i.It = !1;
        const e = this.hr.N()
          , h = e.axisLabelVisible
          , r = e.title !== ""
          , o = this.ye;
        if (!h || !o.It())
            return;
        const l = this.hr.ar();
        if (l === null)
            return;
        r && (i.ri = e.title,
        i.It = !0),
        i.Ht = o.Qt().Ut(l / o.Ft().$t()),
        t.ri = this.lr(e.price),
        t.It = !0;
        const a = this.ye.Qt().Xi().Z(e.axisLabelColor || e.color);
        s.G = a.G;
        const u = e.axisLabelTextColor || a.X;
        t.R = u,
        i.R = u,
        s.Ei = l
    }
    lr(t) {
        const i = this.ye.Lt();
        return i === null ? "" : this.ye.Ft().Ji(t, i.Wt)
    }
}
class we {
    constructor(t, i) {
        this.ye = t,
        this.Ps = i,
        this._r = new ge(t,this),
        this.jn = new ve(t,this),
        this.ur = new Ss(this.jn,t,t.Qt())
    }
    cr(t) {
        W(this.Ps, t),
        this.kt(),
        this.ye.Qt().dr()
    }
    N() {
        return this.Ps
    }
    pr() {
        return this._r
    }
    vr() {
        return this.ur
    }
    mr() {
        return this.jn
    }
    kt() {
        this._r.kt(),
        this.jn.kt()
    }
    ar() {
        const t = this.ye
          , i = t.Ft();
        if (t.Qt().Et().Gi() || i.Gi())
            return null;
        const s = t.Lt();
        return s === null ? null : i.Nt(this.Ps.price, s.Wt)
    }
}
class be {
    constructor() {
        this.wr = new WeakMap
    }
    gr(t, i, s) {
        const e = 1 / i * s;
        if (t >= e)
            return 1;
        const h = e / t
          , r = Math.pow(2, Math.floor(Math.log2(h)));
        return Math.min(r, 512)
    }
    Mr(t, i, s, e=!1, h) {
        if (t.length === 0 || i <= 1)
            return t;
        const r = this.br(i);
        if (r <= 1)
            return t;
        const o = this.Sr(t);
        let l = o.Cr.get(r);
        return l !== void 0 || (l = this.yr(t, r, s, e, h, o.Cr),
        o.Cr.set(r, l)),
        l
    }
    kr(t, i, s, e, h=!1, r) {
        if (s < 1 || t.length === 0)
            return t;
        const o = this.Sr(t)
          , l = o.Cr.get(s);
        if (!l)
            return this.Mr(t, s, e, h, r);
        const a = this.Pr(t, i, s, l, h, e, r);
        return o.Cr.set(s, a),
        a
    }
    br(t) {
        if (t <= 2)
            return 2;
        for (const i of me)
            if (t <= i)
                return i;
        return 512
    }
    Tr(t) {
        if (t.length === 0)
            return 0;
        const i = t[0]
          , s = t[t.length - 1];
        return 31 * t.length + 17 * i.js + 13 * s.js
    }
    yr(t, i, s, e=!1, h, r=new Map) {
        if (i === 2)
            return this.Rr(t, 2, s, e, h);
        const o = i / 2;
        let l = r.get(o);
        return l || (l = this.yr(t, o, s, e, h, r),
        r.set(o, l)),
        this.Dr(l, s, e, h)
    }
    Rr(t, i, s, e=!1, h) {
        const r = this.Ir(t, i, s, e, h);
        return this.Vr(r, e)
    }
    Dr(t, i, s=!1, e) {
        const h = this.Ir(t, 2, i, s, e);
        return this.Vr(h, s)
    }
    Ir(t, i, s, e=!1, h) {
        const r = [];
        for (let o = 0; o < t.length; o += i)
            if (t.length - o >= i) {
                const l = this.Br(t[o], t[o + 1], s, e, h);
                l.Er = !1,
                r.push(l)
            } else if (r.length === 0)
                r.push(this.Ar(t[o], !0));
            else {
                const l = r[r.length - 1];
                r[r.length - 1] = this.Lr(l, t[o], s, e, h)
            }
        return r
    }
    zr(t, i) {
        return (t ?? 1) + (i ?? 1)
    }
    Br(t, i, s, e=!1, h) {
        if (!e || !s || !h) {
            const a = t.Wt[1] > i.Wt[1] ? t.Wt[1] : i.Wt[1]
              , u = t.Wt[2] < i.Wt[2] ? t.Wt[2] : i.Wt[2];
            return {
                Or: t.js,
                Nr: i.js,
                Fr: t.wt,
                Wr: i.wt,
                Hr: t.Wt[0],
                Ur: a,
                $r: u,
                qr: i.Wt[3],
                jr: this.zr(t.jr, i.jr),
                Yr: void 0,
                Er: !1
            }
        }
        const r = s(this.Kr(t, h), this.Kr(i, h))
          , o = h(r)
          , l = o.length ? o[o.length - 1] : 0;
        return {
            Or: t.js,
            Nr: i.js,
            Fr: t.wt,
            Wr: i.wt,
            Hr: t.Wt[0],
            Ur: Math.max(t.Wt[1], l),
            $r: Math.min(t.Wt[2], l),
            qr: l,
            jr: this.zr(t.jr, i.jr),
            Yr: r,
            Er: !1
        }
    }
    Lr(t, i, s, e=!1, h) {
        if (!e || !s || !h)
            return {
                Or: t.Or,
                Nr: i.js,
                Fr: t.Fr,
                Wr: i.wt,
                Hr: t.Hr,
                Ur: t.Ur > i.Wt[1] ? t.Ur : i.Wt[1],
                $r: t.$r < i.Wt[2] ? t.$r : i.Wt[2],
                qr: i.Wt[3],
                jr: t.jr + (i.jr ?? 1),
                Yr: t.Yr,
                Er: !1
            };
        const r = t.Yr
          , o = this.Kr(i, h)
          , l = r ? {
            data: r,
            index: t.Or,
            originalTime: t.Fr,
            time: t.Fr,
            priceValues: h(r)
        } : null
          , a = l ? s(l, o) : o.data
          , u = l ? h(a) : o.priceValues
          , c = u.length ? u[u.length - 1] : 0;
        return {
            Or: t.Or,
            Nr: i.js,
            Fr: t.Fr,
            Wr: i.wt,
            Hr: t.Hr,
            Ur: Math.max(t.Ur, c),
            $r: Math.min(t.$r, c),
            qr: c,
            jr: t.jr + (i.jr ?? 1),
            Yr: a,
            Er: !1
        }
    }
    Zr(t, i, s, e, h, r, o=!1, l) {
        const a = i === e ? h : t[i];
        if (s - i == 1)
            return this.Ar(a, !0);
        const u = i + 1 === e ? h : t[i + 1];
        let c = this.Br(a, u, r, o, l);
        for (let d = i + 2; d < s; d++) {
            const m = d === e ? h : t[d];
            c = this.Lr(c, m, r, o, l)
        }
        return c
    }
    Kr(t, i) {
        const s = t.le ?? {};
        return {
            data: t.le,
            index: t.js,
            originalTime: t.Gr,
            time: t.wt,
            priceValues: i(s)
        }
    }
    Xr(t, i=!1) {
        const s = i === !0
          , e = !!t.Yr;
        return {
            js: t.Or,
            wt: t.Fr,
            Gr: t.Fr,
            Wt: [s ? t.qr : t.Hr, t.Ur, t.$r, t.qr],
            jr: t.jr,
            le: s ? e ? t.Yr : {
                wt: t.Fr
            } : void 0
        }
    }
    Vr(t, i=!1) {
        return t.map((s => this.Xr(s, i)))
    }
    Pr(t, i, s, e, h=!1, r, o) {
        if (e.length === 0)
            return e;
        const l = t.length - 1
          , a = Math.floor(l / s) * s;
        if (Math.min(a + s, t.length) - a < s && t.length > s) {
            const u = t.slice();
            return u[u.length - 1] = i,
            this.Mr(u, s, r, h, o)
        }
        if (Math.floor((l - 1) / s) === Math.floor(l / s) || e.length === 1) {
            const u = Math.min(a + s, t.length)
              , c = u - a;
            if (c <= 0)
                return e;
            const d = c === 1 ? this.Ar(a === l ? i : t[a], !0) : this.Zr(t, a, u, l, i, r, h, o);
            return e[e.length - 1] = this.Xr(d, h),
            e
        }
        {
            const u = t.slice();
            return u[u.length - 1] = i,
            this.Mr(u, s, r, h, o)
        }
    }
    Ar(t, i=!1) {
        return {
            Or: t.js,
            Nr: t.js,
            Fr: t.wt,
            Wr: t.wt,
            Hr: t.Wt[0],
            Ur: t.Wt[1],
            $r: t.Wt[2],
            qr: t.Wt[3],
            jr: t.jr ?? 1,
            Yr: t.le,
            Er: i
        }
    }
    Sr(t) {
        const i = this.Jr(t)
          , s = this.Tr(t);
        return i.Qr !== s && (i.Cr.clear(),
        i.Qr = s),
        i
    }
    Jr(t) {
        let i = this.wr.get(t);
        return i === void 0 && (i = {
            Qr: this.Tr(t),
            Cr: new Map
        },
        this.wr.set(t, i)),
        i
    }
}
class Me extends xs {
    constructor(t) {
        super(),
        this.ns = t
    }
    Qt() {
        return this.ns
    }
}
const xe = {
    Bar: (n, t, i, s) => {
        const e = t.upColor
          , h = t.downColor
          , r = g(n(i, s))
          , o = $(r.Wt[0]) <= $(r.Wt[3]);
        return {
            th: r.R ?? (o ? e : h)
        }
    }
    ,
    Candlestick: (n, t, i, s) => {
        const e = t.upColor
          , h = t.downColor
          , r = t.borderUpColor
          , o = t.borderDownColor
          , l = t.wickUpColor
          , a = t.wickDownColor
          , u = g(n(i, s))
          , c = $(u.Wt[0]) <= $(u.Wt[3]);
        return {
            th: u.R ?? (c ? e : h),
            ih: u.Ht ?? (c ? r : o),
            sh: u.nh ?? (c ? l : a)
        }
    }
    ,
    Custom: (n, t, i, s) => ({
        th: g(n(i, s)).R ?? t.color
    }),
    Area: (n, t, i, s) => {
        const e = g(n(i, s));
        return {
            th: e.vt ?? t.lineColor,
            vt: e.vt ?? t.lineColor,
            eh: e.eh ?? t.topColor,
            rh: e.rh ?? t.bottomColor
        }
    }
    ,
    Baseline: (n, t, i, s) => {
        const e = g(n(i, s));
        return {
            th: e.Wt[3] >= t.baseValue.price ? t.topLineColor : t.bottomLineColor,
            hh: e.hh ?? t.topLineColor,
            ah: e.ah ?? t.bottomLineColor,
            oh: e.oh ?? t.topFillColor1,
            _h: e._h ?? t.topFillColor2,
            uh: e.uh ?? t.bottomFillColor1,
            dh: e.dh ?? t.bottomFillColor2
        }
    }
    ,
    Line: (n, t, i, s) => {
        const e = g(n(i, s));
        return {
            th: e.R ?? t.color,
            vt: e.R ?? t.color
        }
    }
    ,
    Histogram: (n, t, i, s) => ({
        th: g(n(i, s)).R ?? t.color
    })
};
class ye {
    constructor(t) {
        this.fh = (i, s) => s !== void 0 ? s.Wt : this.ye.qs().ph(i),
        this.ye = t,
        this.mh = xe[t.wh()]
    }
    gh(t, i) {
        return this.mh(this.fh, this.ye.N(), t, i)
    }
}
function Cs(n, t, i, s, e=0, h=t.length) {
    let r = h - e;
    for (; 0 < r; ) {
        const o = r >> 1
          , l = e + o;
        s(t[l], i) === n ? (e = l + 1,
        r -= o + 1) : r = o
    }
    return e
}
const at = Cs.bind(null, !0)
  , Ps = Cs.bind(null, !1);
var Ei;
(function(n) {
    n[n.NearestLeft = -1] = "NearestLeft",
    n[n.None = 0] = "None",
    n[n.NearestRight = 1] = "NearestRight"
}
)(Ei || (Ei = {}));
const D = 30;
class _e {
    constructor() {
        this.Mh = [],
        this.bh = new Map,
        this.Sh = new Map,
        this.xh = []
    }
    Ch() {
        return this.yh() > 0 ? this.Mh[this.Mh.length - 1] : null
    }
    kh() {
        return this.yh() > 0 ? this.Ph(0) : null
    }
    sn() {
        return this.yh() > 0 ? this.Ph(this.Mh.length - 1) : null
    }
    yh() {
        return this.Mh.length
    }
    Gi() {
        return this.yh() === 0
    }
    Ee(t) {
        return this.Th(t, 0) !== null
    }
    ph(t) {
        return this.$s(t)
    }
    $s(t, i=0) {
        const s = this.Th(t, i);
        return s === null ? null : {
            ...this.Rh(s),
            js: this.Ph(s)
        }
    }
    Dh() {
        return this.Mh
    }
    Ih(t, i, s) {
        if (this.Gi())
            return null;
        let e = null;
        for (const h of s)
            e = xt(e, this.Vh(t, i, h));
        return e
    }
    ht(t) {
        this.Sh.clear(),
        this.bh.clear(),
        this.Mh = t,
        this.xh = t.map((i => i.js))
    }
    Bh() {
        return this.xh
    }
    Ph(t) {
        return this.Mh[t].js
    }
    Rh(t) {
        return this.Mh[t]
    }
    Th(t, i) {
        const s = this.Eh(t);
        if (s === null && i !== 0)
            switch (i) {
            case -1:
                return this.Ah(t);
            case 1:
                return this.Lh(t);
            default:
                throw new TypeError("Unknown search mode")
            }
        return s
    }
    Ah(t) {
        let i = this.zh(t);
        return i > 0 && (i -= 1),
        i !== this.Mh.length && this.Ph(i) < t ? i : null
    }
    Lh(t) {
        const i = this.Oh(t);
        return i !== this.Mh.length && t < this.Ph(i) ? i : null
    }
    Eh(t) {
        const i = this.zh(t);
        return i === this.Mh.length || t < this.Mh[i].js ? null : i
    }
    zh(t) {
        return at(this.Mh, t, ( (i, s) => i.js < s))
    }
    Oh(t) {
        return Ps(this.Mh, t, ( (i, s) => i.js > s))
    }
    Nh(t, i, s) {
        let e = null;
        for (let h = t; h < i; h++) {
            const r = this.Mh[h].Wt[s];
            Number.isNaN(r) || (e === null ? e = {
                Fh: r,
                Wh: r
            } : (r < e.Fh && (e.Fh = r),
            r > e.Wh && (e.Wh = r)))
        }
        return e
    }
    Vh(t, i, s) {
        if (this.Gi())
            return null;
        let e = null;
        const h = g(this.kh())
          , r = g(this.sn())
          , o = Math.max(t, h)
          , l = Math.min(i, r)
          , a = Math.ceil(o / D) * D
          , u = Math.max(a, Math.floor(l / D) * D);
        {
            const d = this.zh(o)
              , m = this.Oh(Math.min(l, a, i));
            e = xt(e, this.Nh(d, m, s))
        }
        let c = this.bh.get(s);
        c === void 0 && (c = new Map,
        this.bh.set(s, c));
        for (let d = Math.max(a + 1, o); d < u; d += D) {
            const m = Math.floor(d / D);
            let f = c.get(m);
            if (f === void 0) {
                const p = this.zh(m * D)
                  , w = this.Oh((m + 1) * D - 1);
                f = this.Nh(p, w, s),
                c.set(m, f)
            }
            e = xt(e, f)
        }
        {
            const d = this.zh(u)
              , m = this.Oh(l);
            e = xt(e, this.Nh(d, m, s))
        }
        return e
    }
}
function xt(n, t) {
    return n === null ? t : t === null ? n : {
        Fh: Math.min(n.Fh, t.Fh),
        Wh: Math.max(n.Wh, t.Wh)
    }
}
function Dt() {
    return new _e
}
const Ft = {
    setLineStyle: q
};
class Se {
    constructor(t) {
        this.Hh = t
    }
    nt(t, i, s) {
        this.Hh.draw(t, Ft)
    }
    Uh(t, i, s) {
        this.Hh.drawBackground?.(t, Ft)
    }
}
class Ce {
    constructor(t) {
        this.Ln = null,
        this.$h = t
    }
    Tt() {
        const t = this.$h.renderer();
        if (t === null)
            return null;
        if (this.Ln?.qh === t)
            return this.Ln.jh;
        const i = new Se(t);
        return this.Ln = {
            qh: t,
            jh: i
        },
        i
    }
    Yh() {
        return this.$h.zOrder?.() ?? "normal"
    }
}
class Ns {
    constructor(t) {
        this.Kh = null,
        this.Zh = t
    }
    Gh() {
        return this.Zh
    }
    Ws() {
        this.Zh.updateAllViews?.()
    }
    Ys() {
        const t = this.Zh.paneViews?.() ?? [];
        if (this.Kh?.qh === t)
            return this.Kh.jh;
        const i = t.map((s => new Ce(s)));
        return this.Kh = {
            qh: t,
            jh: i
        },
        i
    }
    Qn(t, i) {
        return this.Zh.hitTest?.(t, i) ?? null
    }
}
let Pe = class extends Ns {
    ds() {
        return []
    }
}
;
class Ne {
    constructor(t) {
        this.Hh = t
    }
    nt(t, i, s) {
        this.Hh.draw(t, Ft)
    }
    Uh(t, i, s) {
        this.Hh.drawBackground?.(t, Ft)
    }
}
class ji {
    constructor(t) {
        this.Ln = null,
        this.$h = t
    }
    Tt() {
        const t = this.$h.renderer();
        if (t === null)
            return null;
        if (this.Ln?.qh === t)
            return this.Ln.jh;
        const i = new Ne(t);
        return this.Ln = {
            qh: t,
            jh: i
        },
        i
    }
    Yh() {
        return this.$h.zOrder?.() ?? "normal"
    }
}
function Es(n) {
    return {
        ri: n.text(),
        Ei: n.coordinate(),
        Vi: n.fixedCoordinate?.(),
        R: n.textColor(),
        G: n.backColor(),
        It: n.visible?.() ?? !0,
        pi: n.tickVisible?.() ?? !0
    }
}
class Ee {
    constructor(t, i) {
        this.Xt = new Ms,
        this.Xh = t,
        this.Jh = i
    }
    Tt() {
        return this.Xt.ht({
            ss: this.Jh.ss(),
            ...Es(this.Xh)
        }),
        this.Xt
    }
}
class je extends Wt {
    constructor(t, i) {
        super(),
        this.Xh = t,
        this.Ki = i
    }
    Yi(t, i, s) {
        const e = Es(this.Xh);
        s.G = e.G,
        t.R = e.R;
        const h = 2 / 12 * this.Ki.k();
        s.Ti = h,
        s.Ri = h,
        s.Ei = e.Ei,
        s.Vi = e.Vi,
        t.ri = e.ri,
        t.It = e.It,
        t.pi = e.pi
    }
}
class ke extends Ns {
    constructor(t, i) {
        super(t),
        this.Qh = null,
        this.ta = null,
        this.ia = null,
        this.sa = null,
        this.ye = i
    }
    fs() {
        const t = this.Zh.timeAxisViews?.() ?? [];
        if (this.Qh?.qh === t)
            return this.Qh.jh;
        const i = this.ye.Qt().Et()
          , s = t.map((e => new Ee(e,i)));
        return this.Qh = {
            qh: t,
            jh: s
        },
        s
    }
    Ks() {
        const t = this.Zh.priceAxisViews?.() ?? [];
        if (this.ta?.qh === t)
            return this.ta.jh;
        const i = this.ye.Ft()
          , s = t.map((e => new je(e,i)));
        return this.ta = {
            qh: t,
            jh: s
        },
        s
    }
    na() {
        const t = this.Zh.priceAxisPaneViews?.() ?? [];
        if (this.ia?.qh === t)
            return this.ia.jh;
        const i = t.map((s => new ji(s)));
        return this.ia = {
            qh: t,
            jh: i
        },
        i
    }
    ea() {
        const t = this.Zh.timeAxisPaneViews?.() ?? [];
        if (this.sa?.qh === t)
            return this.sa.jh;
        const i = t.map((s => new ji(s)));
        return this.sa = {
            qh: t,
            jh: i
        },
        i
    }
    ra(t, i) {
        return this.Zh.autoscaleInfo?.(t, i) ?? null
    }
}
function $t(n, t, i, s) {
    n.forEach((e => {
        t(e).forEach((h => {
            h.Yh() === i && s.push(h)
        }
        ))
    }
    ))
}
function Gt(n) {
    return n.Ys()
}
function Le(n) {
    return n.na()
}
function ze(n) {
    return n.ea()
}
const Re = ["Area", "Line", "Baseline"];
class Vt extends Me {
    constructor(t, i, s, e, h) {
        super(t),
        this.jt = Dt(),
        this._r = new de(this),
        this.ha = [],
        this.aa = new le(this),
        this.la = null,
        this.oa = null,
        this._a = null,
        this.ua = [],
        this.ca = new be,
        this.da = new Map,
        this.fa = null,
        this.Ps = s,
        this.pa = i;
        const r = new fe(this);
        if (this.gs = [r],
        this.ur = new Ss(r,this,t),
        Re.includes(this.pa) && (this.la = new ce(this)),
        this.va(),
        this.$h = e(this, this.Qt(), h),
        this.pa === "Custom") {
            const o = this.$h;
            o.ma && this.wa(o.ma)
        }
    }
    m() {
        this._a !== null && clearTimeout(this._a)
    }
    Oe(t) {
        return this.Ps.priceLineColor || t
    }
    Ve(t) {
        const i = {
            Be: !0
        }
          , s = this.Ft();
        if (this.Qt().Et().Gi() || s.Gi() || this.jt.Gi())
            return i;
        const e = this.Qt().Et().Ie()
          , h = this.Lt();
        if (e === null || h === null)
            return i;
        let r, o;
        if (t) {
            const c = this.jt.Ch();
            if (c === null)
                return i;
            r = c,
            o = c.js
        } else {
            const c = this.jt.$s(e.bi(), -1);
            if (c === null || (r = this.jt.ph(c.js),
            r === null))
                return i;
            o = c.js
        }
        const l = r.Wt[3]
          , a = this.ga().gh(o, {
            Wt: r
        })
          , u = s.Nt(l, h.Wt);
        return {
            Be: !1,
            gt: l,
            ri: s.Ji(l, h.Wt),
            Ue: s.Ma(l),
            $e: s.ba(l, h.Wt),
            R: a.th,
            Ei: u,
            js: o
        }
    }
    ga() {
        return this.oa !== null || (this.oa = new ye(this)),
        this.oa
    }
    N() {
        return this.Ps
    }
    cr(t) {
        const i = this.Qt()
          , {priceScaleId: s, visible: e, priceFormat: h} = t;
        s !== void 0 && s !== this.Ps.priceScaleId && i.Sa(this, s),
        e !== void 0 && e !== this.Ps.visible && i.xa();
        const r = t.conflationThresholdFactor !== void 0;
        W(this.Ps, t),
        r && (this.da.clear(),
        this.Qt().dr()),
        h !== void 0 && (this.va(),
        i.Ca()),
        i.ya(this),
        i.ka(),
        this.$h.kt("options")
    }
    ht(t, i) {
        this.jt.ht(t),
        this.da.clear();
        const s = this.Qt().Et().N();
        s.enableConflation && s.precomputeConflationOnInit && this.Pa(s.precomputeConflationPriority),
        this.$h.kt("data"),
        this.la !== null && (i && i.Ta ? this.la.Pe() : t.length === 0 && this.la.ke());
        const e = this.Qt().Kn(this);
        this.Qt().Ra(e),
        this.Qt().ya(this),
        this.Qt().ka(),
        this.Qt().dr()
    }
    Da(t) {
        const i = new we(this,t);
        return this.ha.push(i),
        this.Qt().ya(this),
        i
    }
    Ia(t) {
        const i = this.ha.indexOf(t);
        i !== -1 && this.ha.splice(i, 1),
        this.Qt().ya(this)
    }
    Va() {
        return this.ha
    }
    wh() {
        return this.pa
    }
    Lt() {
        const t = this.Ba();
        return t === null ? null : {
            Wt: t.Wt[3],
            Ea: t.wt
        }
    }
    Ba() {
        const t = this.Qt().Et().Ie();
        if (t === null)
            return null;
        const i = t.Aa();
        return this.jt.$s(i, 1)
    }
    qs() {
        return this.jt
    }
    wa(t) {
        this.fa = t,
        this.da.clear()
    }
    La() {
        return !!this.Qt().Et().N().enableConflation && this.za() > 1
    }
    kr(t) {
        if (!this.La())
            return;
        const i = this.za();
        if (!this.da.has(i))
            return;
        const s = this.pa === "Custom"
          , e = s && this.fa || void 0
          , h = s && this.$h.Oa ? l => {
            const a = l
              , u = this.$h.Oa(a);
            return Array.isArray(u) ? u : [typeof u == "number" ? u : 0]
        }
        : void 0
          , r = this.ca.kr(this.jt.Dh(), t, i, e, s, h)
          , o = Dt();
        o.ht(r),
        this.da.set(i, o)
    }
    Na() {
        const t = this.Qt().Et().N().enableConflation;
        if (this.pa === "Custom" && this.fa === null)
            return this.jt;
        if (!t)
            return this.jt;
        const i = this.za()
          , s = this.da.get(i);
        return s || (this.Fa(i),
        this.da.get(i) ?? this.jt)
    }
    Wa(t) {
        const i = this.jt.ph(t);
        return i === null ? null : this.pa === "Bar" || this.pa === "Candlestick" || this.pa === "Custom" ? {
            Hr: i.Wt[0],
            Ur: i.Wt[1],
            $r: i.Wt[2],
            qr: i.Wt[3]
        } : i.Wt[3]
    }
    Ha(t) {
        const i = [];
        $t(this.ua, Gt, "top", i);
        const s = this.la;
        return s !== null && s.It() && (this._a === null && s.Re() && (this._a = setTimeout(( () => {
            this._a = null,
            this.Qt().Ua()
        }
        ), 0)),
        s.Te(),
        i.unshift(s)),
        i
    }
    Ys() {
        const t = [];
        this.$a() || t.push(this.aa),
        t.push(this.$h, this._r);
        const i = this.ha.map((s => s.pr()));
        return t.push(...i),
        $t(this.ua, Gt, "normal", t),
        t
    }
    qa() {
        return this.ja(Gt, "bottom")
    }
    Ya(t) {
        return this.ja(Le, t)
    }
    Ka(t) {
        return this.ja(ze, t)
    }
    Za(t, i) {
        return this.ua.map((s => s.Qn(t, i))).filter((s => s !== null))
    }
    ds() {
        return [this.ur, ...this.ha.map((t => t.vr()))]
    }
    Ks(t, i) {
        if (i !== this.hs && !this.$a())
            return [];
        const s = [...this.gs];
        for (const e of this.ha)
            s.push(e.mr());
        return this.ua.forEach((e => {
            s.push(...e.Ks())
        }
        )),
        s
    }
    fs() {
        const t = [];
        return this.ua.forEach((i => {
            t.push(...i.fs())
        }
        )),
        t
    }
    ra(t, i) {
        if (this.Ps.autoscaleInfoProvider !== void 0) {
            const s = this.Ps.autoscaleInfoProvider(( () => {
                const e = this.Ga(t, i);
                return e === null ? null : e.tr()
            }
            ));
            return Rt.ir(s)
        }
        return this.Ga(t, i)
    }
    qh() {
        const t = this.Ps.priceFormat;
        return t.base ?? 1 / t.minMove
    }
    Xa() {
        return this.Ja
    }
    Ws() {
        this.$h.kt();
        for (const t of this.gs)
            t.kt();
        for (const t of this.ha)
            t.kt();
        this._r.kt(),
        this.aa.kt(),
        this.la?.kt(),
        this.ua.forEach((t => t.Ws()))
    }
    Ft() {
        return g(super.Ft())
    }
    At(t) {
        if (!((this.pa === "Line" || this.pa === "Area" || this.pa === "Baseline") && this.Ps.crosshairMarkerVisible))
            return null;
        const i = this.jt.ph(t);
        return i === null ? null : {
            gt: i.Wt[3],
            ft: this.Qa(),
            Ht: this.tl(),
            Ot: this.il(),
            zt: this.sl(t)
        }
    }
    Ne() {
        return this.Ps.title
    }
    It() {
        return this.Ps.visible
    }
    nl(t) {
        this.ua.push(new ke(t,this))
    }
    el(t) {
        this.ua = this.ua.filter((i => i.Gh() !== t))
    }
    rl() {
        if (this.pa === "Custom")
            return t => this.$h.Oa(t)
    }
    hl() {
        if (this.pa === "Custom")
            return t => this.$h.al(t)
    }
    ll() {
        return this.jt.Bh()
    }
    $a() {
        return !Bt(this.Ft().ol())
    }
    Ga(t, i) {
        if (!gt(t) || !gt(i) || this.jt.Gi())
            return null;
        const s = this.pa === "Line" || this.pa === "Area" || this.pa === "Baseline" || this.pa === "Histogram" ? [3] : [2, 1]
          , e = this.jt.Ih(t, i, s);
        let h = e !== null ? new F(e.Fh,e.Wh) : null
          , r = null;
        if (this.wh() === "Histogram") {
            const o = this.Ps.base
              , l = new F(o,o);
            h = h !== null ? h.Sn(l) : l
        }
        return this.ua.forEach((o => {
            const l = o.ra(t, i);
            if (l?.priceRange) {
                const a = new F(l.priceRange.minValue,l.priceRange.maxValue);
                h = h !== null ? h.Sn(a) : a
            }
            l?.margins && (r = l.margins)
        }
        )),
        new Rt(h,r)
    }
    Qa() {
        switch (this.pa) {
        case "Line":
        case "Area":
        case "Baseline":
            return this.Ps.crosshairMarkerRadius
        }
        return 0
    }
    tl() {
        switch (this.pa) {
        case "Line":
        case "Area":
        case "Baseline":
            {
                const t = this.Ps.crosshairMarkerBorderColor;
                if (t.length !== 0)
                    return t
            }
        }
        return null
    }
    il() {
        switch (this.pa) {
        case "Line":
        case "Area":
        case "Baseline":
            return this.Ps.crosshairMarkerBorderWidth
        }
        return 0
    }
    sl(t) {
        switch (this.pa) {
        case "Line":
        case "Area":
        case "Baseline":
            {
                const i = this.Ps.crosshairMarkerBackgroundColor;
                if (i.length !== 0)
                    return i
            }
        }
        return this.ga().gh(t).th
    }
    va() {
        switch (this.Ps.priceFormat.type) {
        case "custom":
            {
                const t = this.Ps.priceFormat.formatter;
                this.Ja = {
                    format: t,
                    formatTickmarks: this.Ps.priceFormat.tickmarksFormatter ?? (i => i.map(t))
                };
                break
            }
        case "volume":
            this.Ja = new he(this.Ps.priceFormat.precision);
            break;
        case "percent":
            this.Ja = new _s(this.Ps.priceFormat.precision);
            break;
        default:
            {
                const t = Math.pow(10, this.Ps.priceFormat.precision);
                this.Ja = new At(t,this.Ps.priceFormat.minMove * t)
            }
        }
        this.hs !== null && this.hs._l()
    }
    ja(t, i) {
        const s = [];
        return $t(this.ua, t, i, s),
        s
    }
    za() {
        const {ul: t, cl: i, dl: s} = this.fl();
        return this.ca.gr(t, i, s)
    }
    fl() {
        const t = this.Qt().Et()
          , i = t.ul()
          , s = window.devicePixelRatio || 1
          , e = t.N().conflationThresholdFactor;
        return {
            ul: i,
            cl: s,
            dl: this.Ps.conflationThresholdFactor ?? e ?? 1
        }
    }
    pl(t) {
        const i = this.jt.Dh();
        let s;
        if (this.pa === "Custom" && this.fa !== null) {
            const h = this.rl();
            if (!h)
                throw new Error(pe);
            s = this.ca.Mr(i, t, this.fa, !0, (r => h(r)))
        } else
            s = this.ca.Mr(i, t);
        const e = Dt();
        return e.ht(s),
        e
    }
    Fa(t) {
        const i = this.pl(t);
        this.da.set(t, i)
    }
    Pa(t) {
        if (this.pa === "Custom" && (this.fa === null || !this.rl()))
            return;
        this.da.clear();
        const i = this.Qt().Et().vl();
        for (const s of i) {
            const e = () => {
                this.ml(s)
            }
              , h = typeof window == "object" && window || typeof self == "object" && self;
            h?.gl?.wl ? h.gl.wl(( () => {
                e()
            }
            ), {
                Ml: t
            }) : Promise.resolve().then(( () => e()))
        }
    }
    ml(t) {
        if (this.da.has(t) || this.jt.Dh().length === 0)
            return;
        const i = this.pl(t);
        this.da.set(t, i)
    }
}
const Fe = [3]
  , Te = [0, 1, 2, 3];
class Ie {
    constructor(t) {
        this.Ps = t
    }
    bl(t, i, s) {
        let e = t;
        if (this.Ps.mode === 0)
            return e;
        const h = s.Rs()
          , r = h.Lt();
        if (r === null)
            return e;
        const o = h.Nt(t, r)
          , l = s.Sl().filter((u => u instanceof Vt)).reduce(( (u, c) => {
            if (s.Zn(c) || !c.It())
                return u;
            const d = c.Ft()
              , m = c.qs();
            if (d.Gi() || !m.Ee(i))
                return u;
            const f = m.ph(i);
            if (f === null)
                return u;
            const p = $(c.Lt())
              , w = this.Ps.mode === 3 ? Te : Fe;
            return u.concat(w.map((b => d.Nt(f.Wt[b], p.Wt))))
        }
        ), []);
        if (l.length === 0)
            return e;
        l.sort(( (u, c) => Math.abs(u - o) - Math.abs(c - o)));
        const a = l[0];
        return e = h.Ds(a, r),
        e
    }
}
function dt(n, t, i) {
    return Math.min(Math.max(n, t), i)
}
function yt(n, t, i) {
    return t - n <= i
}
class We extends G {
    constructor() {
        super(...arguments),
        this.jt = null
    }
    ht(t) {
        this.jt = t
    }
    et({context: t, bitmapSize: i, horizontalPixelRatio: s, verticalPixelRatio: e}) {
        if (this.jt === null)
            return;
        const h = Math.max(1, Math.floor(s));
        t.lineWidth = h,
        (function(r, o) {
            r.save(),
            r.lineWidth % 2 && r.translate(.5, .5),
            o(),
            r.restore()
        }
        )(t, ( () => {
            const r = g(this.jt);
            if (r.xl) {
                t.strokeStyle = r.Cl,
                q(t, r.yl),
                t.beginPath();
                for (const o of r.kl) {
                    const l = Math.round(o.Pl * s);
                    t.moveTo(l, -h),
                    t.lineTo(l, i.height + h)
                }
                t.stroke()
            }
            if (r.Tl) {
                t.strokeStyle = r.Rl,
                q(t, r.Dl),
                t.beginPath();
                for (const o of r.Il) {
                    const l = Math.round(o.Pl * e);
                    t.moveTo(-h, l),
                    t.lineTo(i.width + h, l)
                }
                t.stroke()
            }
        }
        ))
    }
}
class Be {
    constructor(t) {
        this.Xt = new We,
        this.xt = !0,
        this.yt = t
    }
    kt() {
        this.xt = !0
    }
    Tt() {
        if (this.xt) {
            const t = this.yt.Qt().N().grid
              , i = {
                Tl: t.horzLines.visible,
                xl: t.vertLines.visible,
                Rl: t.horzLines.color,
                Cl: t.vertLines.color,
                Dl: t.horzLines.style,
                yl: t.vertLines.style,
                Il: this.yt.Rs().Vl(),
                kl: (this.yt.Qt().Et().Vl() || []).map((s => ({
                    Pl: s.coord
                })))
            };
            this.Xt.ht(i),
            this.xt = !1
        }
        return this.Xt
    }
}
class Ae {
    constructor(t) {
        this.$h = new Be(t)
    }
    pr() {
        return this.$h
    }
}
const Ut = {
    Bl: 4,
    El: 1e-4
};
function nt(n, t) {
    const i = 100 * (n - t) / t;
    return t < 0 ? -i : i
}
function Ve(n, t) {
    const i = nt(n.Ze(), t)
      , s = nt(n.Ge(), t);
    return new F(i,s)
}
function ft(n, t) {
    const i = 100 * (n - t) / t + 100;
    return t < 0 ? -i : i
}
function Oe(n, t) {
    const i = ft(n.Ze(), t)
      , s = ft(n.Ge(), t);
    return new F(i,s)
}
function Tt(n, t) {
    const i = Math.abs(n);
    if (i < 1e-15)
        return 0;
    const s = Math.log10(i + t.El) + t.Bl;
    return n < 0 ? -s : s
}
function mt(n, t) {
    const i = Math.abs(n);
    if (i < 1e-15)
        return 0;
    const s = Math.pow(10, i - t.Bl) - t.El;
    return n < 0 ? -s : s
}
function ct(n, t) {
    if (n === null)
        return null;
    const i = Tt(n.Ze(), t)
      , s = Tt(n.Ge(), t);
    return new F(i,s)
}
function rt(n, t) {
    if (n === null)
        return null;
    const i = mt(n.Ze(), t)
      , s = mt(n.Ge(), t);
    return new F(i,s)
}
function Xt(n) {
    if (n === null)
        return Ut;
    const t = Math.abs(n.Ge() - n.Ze());
    if (t >= 1 || t < 1e-15)
        return Ut;
    const i = Math.ceil(Math.abs(Math.log10(t)))
      , s = Ut.Bl + i;
    return {
        Bl: s,
        El: 1 / Math.pow(10, s)
    }
}
class Qt {
    constructor(t, i) {
        if (this.Al = t,
        this.Ll = i,
        (function(s) {
            if (s < 0)
                return !1;
            if (s > 1e18)
                return !0;
            for (let e = s; e > 1; e /= 10)
                if (e % 10 != 0)
                    return !1;
            return !0
        }
        )(this.Al))
            this.zl = [2, 2.5, 2];
        else {
            this.zl = [];
            for (let s = this.Al; s !== 1; ) {
                if (s % 2 == 0)
                    this.zl.push(2),
                    s /= 2;
                else {
                    if (s % 5 != 0)
                        throw new Error("unexpected base");
                    this.zl.push(2, 2.5),
                    s /= 5
                }
                if (this.zl.length > 100)
                    throw new Error("something wrong with base")
            }
        }
    }
    Ol(t, i, s) {
        const e = this.Al === 0 ? 0 : 1 / this.Al;
        let h = Math.pow(10, Math.max(0, Math.ceil(Math.log10(t - i))))
          , r = 0
          , o = this.Ll[0];
        for (; ; ) {
            const c = yt(h, e, 1e-14) && h > e + 1e-14
              , d = yt(h, s * o, 1e-14)
              , m = yt(h, 1, 1e-14);
            if (!(c && d && m))
                break;
            h /= o,
            o = this.Ll[++r % this.Ll.length]
        }
        if (h <= e + 1e-14 && (h = e),
        h = Math.max(1, h),
        this.zl.length > 0 && (l = h,
        a = 1,
        u = 1e-14,
        Math.abs(l - a) < u))
            for (r = 0,
            o = this.zl[0]; yt(h, s * o, 1e-14) && h > e + 1e-14; )
                h /= o,
                o = this.zl[++r % this.zl.length];
        var l, a, u;
        return h
    }
}
class ki {
    constructor(t, i, s, e) {
        this.Nl = [],
        this.Ki = t,
        this.Al = i,
        this.Fl = s,
        this.Wl = e
    }
    Ol(t, i) {
        if (t < i)
            throw new Error("high < low");
        const s = this.Ki.$t()
          , e = (t - i) * this.Hl() / s
          , h = new Qt(this.Al,[2, 2.5, 2])
          , r = new Qt(this.Al,[2, 2, 2.5])
          , o = new Qt(this.Al,[2.5, 2, 2])
          , l = [];
        return l.push(h.Ol(t, i, e), r.Ol(t, i, e), o.Ol(t, i, e)),
        (function(a) {
            if (a.length < 1)
                throw Error("array is empty");
            let u = a[0];
            for (let c = 1; c < a.length; ++c)
                a[c] < u && (u = a[c]);
            return u
        }
        )(l)
    }
    Ul() {
        const t = this.Ki
          , i = t.Lt();
        if (i === null)
            return void (this.Nl = []);
        const s = t.$t()
          , e = this.Fl(s - 1, i)
          , h = this.Fl(0, i)
          , r = this.Ki.N().entireTextOnly ? this.$l() / 2 : 0
          , o = r
          , l = s - 1 - r
          , a = Math.max(e, h)
          , u = Math.min(e, h);
        if (a === u)
            return void (this.Nl = []);
        const c = this.Ol(a, u);
        if (this.ql(i, c, a, u, o, l),
        t.jl() && this.Yl(c, u, a)) {
            const f = this.Ki.Kl();
            this.Zl(i, c, o, l, f, 2 * f)
        }
        const d = this.Nl.map((f => f.Gl))
          , m = this.Ki.Xl(d);
        for (let f = 0; f < this.Nl.length; f++)
            this.Nl[f].Jl = m[f]
    }
    Vl() {
        return this.Nl
    }
    $l() {
        return this.Ki.k()
    }
    Hl() {
        return Math.ceil(2.5 * this.$l())
    }
    ql(t, i, s, e, h, r) {
        const o = this.Nl
          , l = this.Ki;
        let a = s % i;
        a += a < 0 ? i : 0;
        const u = s >= e ? 1 : -1;
        let c = null
          , d = 0;
        for (let m = s - a; m > e; m -= i) {
            const f = this.Wl(m, t, !0);
            c !== null && Math.abs(f - c) < this.Hl() || f < h || f > r || (d < o.length ? (o[d].Pl = f,
            o[d].Jl = l.Ql(m),
            o[d].Gl = m) : o.push({
                Pl: f,
                Jl: l.Ql(m),
                Gl: m
            }),
            d++,
            c = f,
            l.io() && (i = this.Ol(m * u, e)))
        }
        o.length = d
    }
    Zl(t, i, s, e, h, r) {
        const o = this.Nl
          , l = this.so(t, s, h, r)
          , a = this.so(t, e, -r, -h)
          , u = this.Wl(0, t, !0) - this.Wl(i, t, !0);
        o.length > 0 && o[0].Pl - l.Pl < u / 2 && o.shift(),
        o.length > 0 && a.Pl - o[o.length - 1].Pl < u / 2 && o.pop(),
        o.unshift(l),
        o.push(a)
    }
    so(t, i, s, e) {
        const h = (s + e) / 2
          , r = this.Fl(i + s, t)
          , o = this.Fl(i + e, t)
          , l = Math.min(r, o)
          , a = Math.max(r, o)
          , u = Math.max(.1, this.Ol(a, l))
          , c = this.Fl(i + h, t)
          , d = c - c % u
          , m = this.Wl(d, t, !0);
        return {
            Jl: this.Ki.Ql(d),
            Pl: m,
            Gl: d
        }
    }
    Yl(t, i, s) {
        let e = $(this.Ki.er());
        return this.Ki.io() && (e = rt(e, this.Ki.no())),
        e.Ze() - i < t && s - e.Ge() < t
    }
}
function js(n) {
    return n.slice().sort(( (t, i) => g(t._s()) - g(i._s())))
}
var Li;
(function(n) {
    n[n.Normal = 0] = "Normal",
    n[n.Logarithmic = 1] = "Logarithmic",
    n[n.Percentage = 2] = "Percentage",
    n[n.IndexedTo100 = 3] = "IndexedTo100"
}
)(Li || (Li = {}));
const zi = new _s
  , Ri = new At(100,1);
class Ke {
    constructor(t, i, s, e, h) {
        this.eo = 0,
        this.ro = null,
        this.sr = null,
        this.ho = null,
        this.ao = {
            lo: !1,
            oo: null
        },
        this._o = !1,
        this.uo = 0,
        this.co = 0,
        this.do = new P,
        this.fo = new P,
        this.po = [],
        this.vo = null,
        this.mo = null,
        this.wo = null,
        this.Mo = null,
        this.bo = null,
        this.Ja = Ri,
        this.So = Xt(null),
        this.xo = t,
        this.Ps = i,
        this.Co = s,
        this.yo = e,
        this.ko = h,
        this.Po = new ki(this,100,this.To.bind(this),this.Ro.bind(this))
    }
    ol() {
        return this.xo
    }
    N() {
        return this.Ps
    }
    cr(t) {
        if (W(this.Ps, t),
        this._l(),
        t.mode !== void 0 && this.Do({
            ae: t.mode
        }),
        t.scaleMargins !== void 0) {
            const i = T(t.scaleMargins.top)
              , s = T(t.scaleMargins.bottom);
            if (i < 0 || i > 1)
                throw new Error(`Invalid top margin - expect value between 0 and 1, given=${i}`);
            if (s < 0 || s > 1)
                throw new Error(`Invalid bottom margin - expect value between 0 and 1, given=${s}`);
            if (i + s > 1)
                throw new Error(`Invalid margins - sum of margins must be less than 1, given=${i + s}`);
            this.Io(),
            this.wo = null
        }
    }
    Vo() {
        return this.Ps.autoScale
    }
    Bo() {
        return this._o
    }
    io() {
        return this.Ps.mode === 1
    }
    He() {
        return this.Ps.mode === 2
    }
    Eo() {
        return this.Ps.mode === 3
    }
    no() {
        return this.So
    }
    ae() {
        return {
            ln: this.Ps.autoScale,
            Ao: this.Ps.invertScale,
            ae: this.Ps.mode
        }
    }
    Do(t) {
        const i = this.ae();
        let s = null;
        t.ln !== void 0 && (this.Ps.autoScale = t.ln),
        t.ae !== void 0 && (this.Ps.mode = t.ae,
        t.ae !== 2 && t.ae !== 3 || (this.Ps.autoScale = !0),
        this.ao.lo = !1),
        i.ae === 1 && t.ae !== i.ae && ((function(h, r) {
            if (h === null)
                return !1;
            const o = mt(h.Ze(), r)
              , l = mt(h.Ge(), r);
            return isFinite(o) && isFinite(l)
        }
        )(this.sr, this.So) ? (s = rt(this.sr, this.So),
        s !== null && this.Lo(s)) : this.Ps.autoScale = !0),
        t.ae === 1 && t.ae !== i.ae && (s = ct(this.sr, this.So),
        s !== null && this.Lo(s));
        const e = i.ae !== this.Ps.mode;
        e && (i.ae === 2 || this.He()) && this._l(),
        e && (i.ae === 3 || this.Eo()) && this._l(),
        t.Ao !== void 0 && i.Ao !== t.Ao && (this.Ps.invertScale = t.Ao,
        this.zo()),
        this.fo.p(i, this.ae())
    }
    Oo() {
        return this.fo
    }
    k() {
        return this.Co.fontSize
    }
    $t() {
        return this.eo
    }
    No(t) {
        this.eo !== t && (this.eo = t,
        this.Io(),
        this.wo = null)
    }
    Fo() {
        if (this.ro)
            return this.ro;
        const t = this.$t() - this.Wo() - this.Ho();
        return this.ro = t,
        t
    }
    er() {
        return this.Uo(),
        this.sr
    }
    Lo(t, i) {
        const s = this.sr;
        (i || s === null && t !== null || s !== null && !s.Ye(t)) && (this.wo = null,
        this.sr = t)
    }
    $o(t) {
        this.Lo(t),
        this.qo(t !== null)
    }
    Gi() {
        return this.Uo(),
        this.eo === 0 || !this.sr || this.sr.Gi()
    }
    jo(t) {
        return this.Ao() ? t : this.$t() - 1 - t
    }
    Nt(t, i) {
        return this.He() ? t = nt(t, i) : this.Eo() && (t = ft(t, i)),
        this.Ro(t, i)
    }
    Yo(t, i, s) {
        this.Uo();
        const e = this.Ho()
          , h = g(this.er())
          , r = h.Ze()
          , o = h.Ge()
          , l = this.Fo() - 1
          , a = this.Ao()
          , u = l / (o - r)
          , c = s === void 0 ? 0 : s.from
          , d = s === void 0 ? t.length : s.to
          , m = this.Ko();
        for (let f = c; f < d; f++) {
            const p = t[f]
              , w = p.gt;
            if (isNaN(w))
                continue;
            let b = w;
            m !== null && (b = m(p.gt, i));
            const M = e + u * (b - r)
              , y = a ? M : this.eo - 1 - M;
            p.ut = y
        }
    }
    Zo(t, i, s) {
        this.Uo();
        const e = this.Ho()
          , h = g(this.er())
          , r = h.Ze()
          , o = h.Ge()
          , l = this.Fo() - 1
          , a = this.Ao()
          , u = l / (o - r)
          , c = s === void 0 ? 0 : s.from
          , d = s === void 0 ? t.length : s.to
          , m = this.Ko();
        for (let f = c; f < d; f++) {
            const p = t[f];
            let w = p.Hr
              , b = p.Ur
              , M = p.$r
              , y = p.qr;
            m !== null && (w = m(p.Hr, i),
            b = m(p.Ur, i),
            M = m(p.$r, i),
            y = m(p.qr, i));
            let _ = e + u * (w - r)
              , j = a ? _ : this.eo - 1 - _;
            p.Go = j,
            _ = e + u * (b - r),
            j = a ? _ : this.eo - 1 - _,
            p.Xo = j,
            _ = e + u * (M - r),
            j = a ? _ : this.eo - 1 - _,
            p.Jo = j,
            _ = e + u * (y - r),
            j = a ? _ : this.eo - 1 - _,
            p.Qo = j
        }
    }
    Ds(t, i) {
        const s = this.To(t, i);
        return this.t_(s, i)
    }
    t_(t, i) {
        let s = t;
        return this.He() ? s = (function(e, h) {
            return h < 0 && (e = -e),
            e / 100 * h + h
        }
        )(s, i) : this.Eo() && (s = (function(e, h) {
            return e -= 100,
            h < 0 && (e = -e),
            e / 100 * h + h
        }
        )(s, i)),
        s
    }
    Sl() {
        return this.po
    }
    Dt() {
        return this.mo || (this.mo = js(this.po)),
        this.mo
    }
    i_(t) {
        this.po.indexOf(t) === -1 && (this.po.push(t),
        this._l(),
        this.s_())
    }
    n_(t) {
        const i = this.po.indexOf(t);
        if (i === -1)
            throw new Error("source is not attached to scale");
        this.po.splice(i, 1),
        this.po.length === 0 && (this.Do({
            ln: !0
        }),
        this.Lo(null)),
        this._l(),
        this.s_()
    }
    Lt() {
        let t = null;
        for (const i of this.po) {
            const s = i.Lt();
            s !== null && (t === null || s.Ea < t.Ea) && (t = s)
        }
        return t === null ? null : t.Wt
    }
    Ao() {
        return this.Ps.invertScale
    }
    Vl() {
        const t = this.Lt() === null;
        if (this.wo !== null && (t || this.wo.e_ === t))
            return this.wo.Vl;
        this.Po.Ul();
        const i = this.Po.Vl();
        return this.wo = {
            Vl: i,
            e_: t
        },
        this.do.p(),
        i
    }
    r_() {
        return this.do
    }
    h_(t) {
        this.He() || this.Eo() || this.Mo === null && this.ho === null && (this.Gi() || (this.Mo = this.eo - t,
        this.ho = g(this.er()).Ke()))
    }
    a_(t) {
        if (this.He() || this.Eo() || this.Mo === null)
            return;
        this.Do({
            ln: !1
        }),
        (t = this.eo - t) < 0 && (t = 0);
        let i = (this.Mo + .2 * (this.eo - 1)) / (t + .2 * (this.eo - 1));
        const s = g(this.ho).Ke();
        i = Math.max(i, .1),
        s.Je(i),
        this.Lo(s)
    }
    l_() {
        this.He() || this.Eo() || (this.Mo = null,
        this.ho = null)
    }
    o_(t) {
        this.Vo() || this.bo === null && this.ho === null && (this.Gi() || (this.bo = t,
        this.ho = g(this.er()).Ke()))
    }
    __(t) {
        if (this.Vo() || this.bo === null)
            return;
        const i = g(this.er()).Xe() / (this.Fo() - 1);
        let s = t - this.bo;
        this.Ao() && (s *= -1);
        const e = s * i
          , h = g(this.ho).Ke();
        h.Qe(e),
        this.Lo(h, !0),
        this.wo = null
    }
    u_() {
        this.Vo() || this.bo !== null && (this.bo = null,
        this.ho = null)
    }
    Xa() {
        return this.Ja || this._l(),
        this.Ja
    }
    Ji(t, i) {
        switch (this.Ps.mode) {
        case 2:
            return this.c_(nt(t, i));
        case 3:
            return this.Xa().format(ft(t, i));
        default:
            return this.lr(t)
        }
    }
    Ql(t) {
        switch (this.Ps.mode) {
        case 2:
            return this.c_(t);
        case 3:
            return this.Xa().format(t);
        default:
            return this.lr(t)
        }
    }
    Xl(t) {
        switch (this.Ps.mode) {
        case 2:
            return this.d_(t);
        case 3:
            return this.Xa().formatTickmarks(t);
        default:
            return this.f_(t)
        }
    }
    Ma(t) {
        return this.lr(t, g(this.vo).Xa())
    }
    ba(t, i) {
        return t = nt(t, i),
        this.c_(t, zi)
    }
    p_() {
        return this.po
    }
    v_(t) {
        this.ao = {
            oo: t,
            lo: !1
        }
    }
    Ws() {
        this.po.forEach((t => t.Ws()))
    }
    jl() {
        return this.Ps.ensureEdgeTickMarksVisible && this.Vo()
    }
    Kl() {
        return this.k() / 2
    }
    _l() {
        this.wo = null;
        let t = 1 / 0;
        this.vo = null;
        for (const s of this.po)
            s._s() < t && (t = s._s(),
            this.vo = s);
        let i = 100;
        this.vo !== null && (i = Math.round(this.vo.qh())),
        this.Ja = Ri,
        this.He() ? (this.Ja = zi,
        i = 100) : this.Eo() ? (this.Ja = new At(100,1),
        i = 100) : this.vo !== null && (this.Ja = this.vo.Xa()),
        this.Po = new ki(this,i,this.To.bind(this),this.Ro.bind(this)),
        this.Po.Ul()
    }
    s_() {
        this.mo = null
    }
    m_() {
        return this.vo === null || this.He() || this.Eo() ? 1 : 1 / this.vo.qh()
    }
    Xi() {
        return this.ko
    }
    qo(t) {
        this._o = t
    }
    Wo() {
        return this.Ao() ? this.Ps.scaleMargins.bottom * this.$t() + this.co : this.Ps.scaleMargins.top * this.$t() + this.uo
    }
    Ho() {
        return this.Ao() ? this.Ps.scaleMargins.top * this.$t() + this.uo : this.Ps.scaleMargins.bottom * this.$t() + this.co
    }
    Uo() {
        this.ao.lo || (this.ao.lo = !0,
        this.w_())
    }
    Io() {
        this.ro = null
    }
    Ro(t, i) {
        if (this.Uo(),
        this.Gi())
            return 0;
        t = this.io() && t ? Tt(t, this.So) : t;
        const s = g(this.er())
          , e = this.Ho() + (this.Fo() - 1) * (t - s.Ze()) / s.Xe();
        return this.jo(e)
    }
    To(t, i) {
        if (this.Uo(),
        this.Gi())
            return 0;
        const s = this.jo(t)
          , e = g(this.er())
          , h = e.Ze() + e.Xe() * ((s - this.Ho()) / (this.Fo() - 1));
        return this.io() ? mt(h, this.So) : h
    }
    zo() {
        this.wo = null,
        this.Po.Ul()
    }
    w_() {
        if (this.Bo() && !this.Vo())
            return;
        const t = this.ao.oo;
        if (t === null)
            return;
        let i = null;
        const s = this.p_();
        let e = 0
          , h = 0;
        for (const l of s) {
            if (!l.It())
                continue;
            const a = l.Lt();
            if (a === null)
                continue;
            const u = l.ra(t.Aa(), t.bi());
            let c = u && u.er();
            if (c !== null) {
                switch (this.Ps.mode) {
                case 1:
                    c = ct(c, this.So);
                    break;
                case 2:
                    c = Ve(c, a.Wt);
                    break;
                case 3:
                    c = Oe(c, a.Wt)
                }
                if (i = i === null ? c : i.Sn(g(c)),
                u !== null) {
                    const d = u.rr();
                    d !== null && (e = Math.max(e, d.above),
                    h = Math.max(h, d.below))
                }
            }
        }
        if (this.jl() && (e = Math.max(e, this.Kl()),
        h = Math.max(h, this.Kl())),
        e === this.uo && h === this.co || (this.uo = e,
        this.co = h,
        this.wo = null,
        this.Io()),
        i !== null) {
            if (i.Ze() === i.Ge()) {
                const l = 5 * this.m_();
                this.io() && (i = rt(i, this.So)),
                i = new F(i.Ze() - l,i.Ge() + l),
                this.io() && (i = ct(i, this.So))
            }
            if (this.io()) {
                const l = rt(i, this.So)
                  , a = Xt(l);
                if (r = a,
                o = this.So,
                r.Bl !== o.Bl || r.El !== o.El) {
                    const u = this.ho !== null ? rt(this.ho, this.So) : null;
                    this.So = a,
                    i = ct(l, a),
                    u !== null && (this.ho = ct(u, a))
                }
            }
            this.Lo(i)
        } else
            this.sr === null && (this.Lo(new F(-.5,.5)),
            this.So = Xt(null));
        var r, o
    }
    Ko() {
        return this.He() ? nt : this.Eo() ? ft : this.io() ? t => Tt(t, this.So) : null
    }
    g_(t, i, s) {
        return i === void 0 ? (s === void 0 && (s = this.Xa()),
        s.format(t)) : i(t)
    }
    M_(t, i, s) {
        return i === void 0 ? (s === void 0 && (s = this.Xa()),
        s.formatTickmarks(t)) : i(t)
    }
    lr(t, i) {
        return this.g_(t, this.yo.priceFormatter, i)
    }
    f_(t, i) {
        const s = this.yo.priceFormatter;
        return this.M_(t, this.yo.tickmarksPriceFormatter ?? (s ? e => e.map(s) : void 0), i)
    }
    c_(t, i) {
        return this.g_(t, this.yo.percentageFormatter, i)
    }
    d_(t, i) {
        const s = this.yo.percentageFormatter;
        return this.M_(t, this.yo.tickmarksPercentageFormatter ?? (s ? e => e.map(s) : void 0), i)
    }
}
function Fi(n) {
    return n instanceof Vt
}
class Ti {
    constructor(t, i) {
        this.po = [],
        this.b_ = new Map,
        this.eo = 0,
        this.S_ = 0,
        this.x_ = 1,
        this.mo = null,
        this.C_ = !1,
        this.y_ = new P,
        this.ua = [],
        this.Jh = t,
        this.ns = i,
        this.k_ = new Ae(this);
        const s = i.N();
        this.P_ = this.T_("left", s.leftPriceScale),
        this.R_ = this.T_("right", s.rightPriceScale),
        this.P_.Oo().i(this.D_.bind(this, this.P_), this),
        this.R_.Oo().i(this.D_.bind(this, this.R_), this),
        this.I_(s)
    }
    I_(t) {
        if (t.leftPriceScale && this.P_.cr(t.leftPriceScale),
        t.rightPriceScale && this.R_.cr(t.rightPriceScale),
        t.localization && (this.P_._l(),
        this.R_._l()),
        t.overlayPriceScales) {
            const i = Array.from(this.b_.values());
            for (const s of i) {
                const e = g(s[0].Ft());
                e.cr(t.overlayPriceScales),
                t.localization && e._l()
            }
        }
    }
    V_(t) {
        switch (t) {
        case "left":
            return this.P_;
        case "right":
            return this.R_
        }
        return this.b_.has(t) ? T(this.b_.get(t))[0].Ft() : null
    }
    m() {
        this.Qt().B_().u(this),
        this.P_.Oo().u(this),
        this.R_.Oo().u(this),
        this.po.forEach((t => {
            t.m && t.m()
        }
        )),
        this.ua = this.ua.filter((t => {
            const i = t.Gh();
            return i.detached && i.detached(),
            !1
        }
        )),
        this.y_.p()
    }
    E_() {
        return this.x_
    }
    A_(t) {
        this.x_ = t
    }
    Qt() {
        return this.ns
    }
    ss() {
        return this.S_
    }
    $t() {
        return this.eo
    }
    L_(t) {
        this.S_ = t,
        this.z_()
    }
    No(t) {
        this.eo = t,
        this.P_.No(t),
        this.R_.No(t),
        this.po.forEach((i => {
            if (this.Zn(i)) {
                const s = i.Ft();
                s !== null && s.No(t)
            }
        }
        )),
        this.z_()
    }
    O_(t) {
        this.C_ = t
    }
    N_() {
        return this.C_
    }
    F_() {
        return this.po.filter(Fi)
    }
    Sl() {
        return this.po
    }
    Zn(t) {
        const i = t.Ft();
        return i === null || this.P_ !== i && this.R_ !== i
    }
    i_(t, i, s) {
        this.W_(t, i, s ? t._s() : this.po.length)
    }
    n_(t, i) {
        const s = this.po.indexOf(t);
        z(s !== -1, "removeDataSource: invalid data source"),
        this.po.splice(s, 1),
        i || this.po.forEach(( (r, o) => r.us(o)));
        const e = g(t.Ft()).ol();
        if (this.b_.has(e)) {
            const r = T(this.b_.get(e))
              , o = r.indexOf(t);
            o !== -1 && (r.splice(o, 1),
            r.length === 0 && this.b_.delete(e))
        }
        const h = t.Ft();
        h && h.Sl().indexOf(t) >= 0 && (h.n_(t),
        this.H_(h)),
        this.mo = null
    }
    Xn(t) {
        return t === this.P_ ? "left" : t === this.R_ ? "right" : "overlay"
    }
    U_() {
        return this.P_
    }
    q_() {
        return this.R_
    }
    j_(t, i) {
        t.h_(i)
    }
    Y_(t, i) {
        t.a_(i),
        this.z_()
    }
    K_(t) {
        t.l_()
    }
    Z_(t, i) {
        t.o_(i)
    }
    G_(t, i) {
        t.__(i),
        this.z_()
    }
    X_(t) {
        t.u_()
    }
    z_() {
        this.po.forEach((t => {
            t.Ws()
        }
        ))
    }
    Rs() {
        let t = null;
        return this.ns.N().rightPriceScale.visible && this.R_.Sl().length !== 0 ? t = this.R_ : this.ns.N().leftPriceScale.visible && this.P_.Sl().length !== 0 ? t = this.P_ : this.po.length !== 0 && (t = this.po[0].Ft()),
        t === null && (t = this.R_),
        t
    }
    Gn() {
        let t = null;
        return this.ns.N().rightPriceScale.visible ? t = this.R_ : this.ns.N().leftPriceScale.visible && (t = this.P_),
        t
    }
    H_(t) {
        t !== null && t.Vo() && this.J_(t)
    }
    Q_(t) {
        const i = this.Jh.Ie();
        t.Do({
            ln: !0
        }),
        i !== null && t.v_(i),
        this.z_()
    }
    tu() {
        this.J_(this.P_),
        this.J_(this.R_)
    }
    iu() {
        this.H_(this.P_),
        this.H_(this.R_),
        this.po.forEach((t => {
            this.Zn(t) && this.H_(t.Ft())
        }
        )),
        this.z_(),
        this.ns.dr()
    }
    Dt() {
        return this.mo === null && (this.mo = js(this.po)),
        this.mo
    }
    su(t, i) {
        i = dt(i, 0, this.po.length - 1);
        const s = this.po.indexOf(t);
        z(s !== -1, "setSeriesOrder: invalid data source"),
        this.po.splice(s, 1),
        this.po.splice(i, 0, t),
        this.po.forEach(( (e, h) => e.us(h))),
        this.mo = null;
        for (const e of [this.P_, this.R_])
            e.s_(),
            e._l();
        this.ns.dr()
    }
    Vt() {
        return this.Dt().filter(Fi)
    }
    nu() {
        return this.y_
    }
    eu() {
        return this.k_
    }
    nl(t) {
        this.ua.push(new Pe(t))
    }
    el(t) {
        this.ua = this.ua.filter((i => i.Gh() !== t)),
        t.detached && t.detached(),
        this.ns.dr()
    }
    ru() {
        return this.ua
    }
    Za(t, i) {
        return this.ua.map((s => s.Qn(t, i))).filter((s => s !== null))
    }
    J_(t) {
        const i = t.p_();
        if (i && i.length > 0 && !this.Jh.Gi()) {
            const s = this.Jh.Ie();
            s !== null && t.v_(s)
        }
        t.Ws()
    }
    W_(t, i, s) {
        let e = this.V_(i);
        if (e === null && (e = this.T_(i, this.ns.N().overlayPriceScales)),
        this.po.splice(s, 0, t),
        !Bt(i)) {
            const h = this.b_.get(i) || [];
            h.push(t),
            this.b_.set(i, h)
        }
        t.us(s),
        e.i_(t),
        t.cs(e),
        this.H_(e),
        this.mo = null
    }
    D_(t, i, s) {
        i.ae !== s.ae && this.J_(t)
    }
    T_(t, i) {
        const s = {
            visible: !0,
            autoScale: !0,
            ...K(i)
        }
          , e = new Ke(t,s,this.ns.N().layout,this.ns.N().localization,this.ns.Xi());
        return e.No(this.$t()),
        e
    }
}
function _t(n) {
    return {
        hu: n.hu,
        au: {
            te: n.lu.externalId
        },
        ou: n.lu.cursorStyle
    }
}
function Je(n, t, i, s) {
    for (const e of n) {
        const h = e.Tt(s);
        if (h !== null && h.Qn) {
            const r = h.Qn(t, i);
            if (r !== null)
                return {
                    _u: e,
                    au: r
                }
        }
    }
    return null
}
function Ye(n) {
    return n.Ys !== void 0
}
function ks(n, t, i) {
    const s = [n, ...n.Dt()]
      , e = (function(h, r, o) {
        let l, a;
        for (const d of h) {
            const m = d.Za?.(r, o) ?? [];
            for (const f of m)
                u = f.zOrder,
                c = l?.zOrder,
                (!c || u === "top" && c !== "top" || u === "normal" && c === "bottom") && (l = f,
                a = d)
        }
        var u, c;
        return l && a ? {
            lu: l,
            hu: a
        } : null
    }
    )(s, t, i);
    if (e?.lu.zOrder === "top")
        return _t(e);
    for (const h of s) {
        if (e && e.hu === h && e.lu.zOrder !== "bottom" && !e.lu.isBackground)
            return _t(e);
        if (Ye(h)) {
            const r = Je(h.Ys(n), t, i, n);
            if (r !== null)
                return {
                    hu: h,
                    _u: r._u,
                    au: r.au
                }
        }
        if (e && e.hu === h && e.lu.zOrder !== "bottom" && e.lu.isBackground)
            return _t(e)
    }
    return e?.lu ? _t(e) : null
}
class De {
    constructor(t, i, s=50) {
        this.Vn = 0,
        this.Bn = 1,
        this.En = 1,
        this.Ln = new Map,
        this.An = new Map,
        this.uu = t,
        this.cu = i,
        this.zn = s
    }
    du(t) {
        const i = t.time
          , s = this.cu.cacheKey(i)
          , e = this.Ln.get(s);
        if (e !== void 0)
            return e.fu;
        if (this.Vn === this.zn) {
            const r = this.An.get(this.En);
            this.An.delete(this.En),
            this.Ln.delete(T(r)),
            this.En++,
            this.Vn--
        }
        const h = this.uu(t);
        return this.Ln.set(s, {
            fu: h,
            Wn: this.Bn
        }),
        this.An.set(this.Bn, s),
        this.Vn++,
        this.Bn++,
        h
    }
}
class pt {
    constructor(t, i) {
        z(t <= i, "right should be >= left"),
        this.pu = t,
        this.vu = i
    }
    Aa() {
        return this.pu
    }
    bi() {
        return this.vu
    }
    mu() {
        return this.vu - this.pu + 1
    }
    Ee(t) {
        return this.pu <= t && t <= this.vu
    }
    Ye(t) {
        return this.pu === t.Aa() && this.vu === t.bi()
    }
}
function Ii(n, t) {
    return n === null || t === null ? n === t : n.Ye(t)
}
class $e {
    constructor() {
        this.wu = new Map,
        this.Ln = null,
        this.gu = !1
    }
    Mu(t) {
        this.gu = t,
        this.Ln = null
    }
    bu(t, i) {
        this.Su(i),
        this.Ln = null;
        for (let s = i; s < t.length; ++s) {
            const e = t[s];
            let h = this.wu.get(e.timeWeight);
            h === void 0 && (h = [],
            this.wu.set(e.timeWeight, h)),
            h.push({
                index: s,
                time: e.time,
                weight: e.timeWeight,
                originalTime: e.originalTime
            })
        }
    }
    xu(t, i, s, e, h) {
        const r = Math.ceil(i / t);
        return this.Ln !== null && this.Ln.Cu === r && h === this.Ln.yu && s === this.Ln.ku || (this.Ln = {
            yu: h,
            ku: s,
            Vl: this.Pu(r, s, e),
            Cu: r
        }),
        this.Ln.Vl
    }
    Su(t) {
        if (t === 0)
            return void this.wu.clear();
        const i = [];
        this.wu.forEach(( (s, e) => {
            t <= s[0].index ? i.push(e) : s.splice(at(s, t, (h => h.index < t)), 1 / 0)
        }
        ));
        for (const s of i)
            this.wu.delete(s)
    }
    Pu(t, i, s) {
        let e = [];
        const h = r => !i || s.has(r.index);
        for (const r of Array.from(this.wu.keys()).sort(( (o, l) => l - o))) {
            if (!this.wu.get(r))
                continue;
            const o = e;
            e = [];
            const l = o.length;
            let a = 0;
            const u = T(this.wu.get(r))
              , c = u.length;
            let d = 1 / 0
              , m = -1 / 0;
            for (let f = 0; f < c; f++) {
                const p = u[f]
                  , w = p.index;
                for (; a < l; ) {
                    const b = o[a]
                      , M = b.index;
                    if (!(M < w && h(b))) {
                        d = M;
                        break
                    }
                    a++,
                    e.push(b),
                    m = M,
                    d = 1 / 0
                }
                if (d - w >= t && w - m >= t && h(p))
                    e.push(p),
                    m = w;
                else if (this.gu)
                    return o
            }
            for (; a < l; a++)
                h(o[a]) && e.push(o[a])
        }
        return e
    }
}
class ot {
    constructor(t) {
        this.Tu = t
    }
    Ru() {
        return this.Tu === null ? null : new pt(Math.floor(this.Tu.Aa()),Math.ceil(this.Tu.bi()))
    }
    Du() {
        return this.Tu
    }
    static Iu() {
        return new ot(null)
    }
}
function Ge(n, t) {
    return n.weight > t.weight ? n : t
}
class Ue {
    constructor(t, i, s, e) {
        this.S_ = 0,
        this.Vu = null,
        this.Bu = [],
        this.bo = null,
        this.Mo = null,
        this.Eu = new $e,
        this.Au = new Map,
        this.Lu = ot.Iu(),
        this.zu = !0,
        this.Ou = new P,
        this.Nu = new P,
        this.Fu = new P,
        this.Wu = null,
        this.Hu = null,
        this.Uu = new Map,
        this.$u = -1,
        this.qu = [],
        this.ju = 1,
        this.Ps = i,
        this.yo = s,
        this.Yu = i.rightOffset,
        this.Ku = i.barSpacing,
        this.ns = t,
        this.Zu(i),
        this.cu = e,
        this.Gu(),
        this.Eu.Mu(i.uniformDistribution),
        this.Xu(),
        this.Ju()
    }
    N() {
        return this.Ps
    }
    Qu(t) {
        W(this.yo, t),
        this.tc(),
        this.Gu()
    }
    cr(t, i) {
        W(this.Ps, t),
        this.Ps.fixLeftEdge && this.sc(),
        this.Ps.fixRightEdge && this.nc(),
        t.barSpacing !== void 0 && this.ns.gn(t.barSpacing),
        t.rightOffset !== void 0 && this.ns.Mn(t.rightOffset),
        this.Zu(t),
        t.minBarSpacing === void 0 && t.maxBarSpacing === void 0 || this.ns.gn(t.barSpacing ?? this.Ku),
        t.ignoreWhitespaceIndices !== void 0 && t.ignoreWhitespaceIndices !== this.Ps.ignoreWhitespaceIndices && this.Ju(),
        this.tc(),
        this.Gu(),
        t.enableConflation === void 0 && t.conflationThresholdFactor === void 0 || this.Xu(),
        this.Fu.p()
    }
    Is(t) {
        return this.Bu[t]?.time ?? null
    }
    es(t) {
        return this.Bu[t] ?? null
    }
    ec(t, i) {
        if (this.Bu.length < 1)
            return null;
        if (this.cu.key(t) > this.cu.key(this.Bu[this.Bu.length - 1].time))
            return i ? this.Bu.length - 1 : null;
        const s = at(this.Bu, this.cu.key(t), ( (e, h) => this.cu.key(e.time) < h));
        return this.cu.key(t) < this.cu.key(this.Bu[s].time) ? i ? s : null : s
    }
    Gi() {
        return this.S_ === 0 || this.Bu.length === 0 || this.Vu === null
    }
    rc() {
        return this.Bu.length > 0
    }
    Ie() {
        return this.hc(),
        this.Lu.Ru()
    }
    ac() {
        return this.hc(),
        this.Lu.Du()
    }
    lc() {
        const t = this.Ie();
        if (t === null)
            return null;
        const i = {
            from: t.Aa(),
            to: t.bi()
        };
        return this.oc(i)
    }
    oc(t) {
        const i = Math.round(t.from)
          , s = Math.round(t.to)
          , e = g(this._c())
          , h = g(this.uc());
        return {
            from: g(this.es(Math.max(e, i))),
            to: g(this.es(Math.min(h, s)))
        }
    }
    cc(t) {
        return {
            from: g(this.ec(t.from, !0)),
            to: g(this.ec(t.to, !0))
        }
    }
    ss() {
        return this.S_
    }
    L_(t) {
        if (!isFinite(t) || t <= 0 || this.S_ === t)
            return;
        const i = this.ac()
          , s = this.S_;
        if (this.S_ = t,
        this.zu = !0,
        this.Ps.lockVisibleTimeRangeOnResize && s !== 0) {
            const e = this.Ku * t / s;
            this.Ku = e
        }
        if (this.Ps.fixLeftEdge && i !== null && i.Aa() <= 0) {
            const e = s - t;
            this.Yu -= Math.round(e / this.Ku) + 1,
            this.zu = !0
        }
        this.dc(),
        this.fc()
    }
    qt(t) {
        if (this.Gi() || !gt(t))
            return 0;
        const i = this.vc() + this.Yu - t;
        return this.S_ - (i + .5) * this.Ku - 1
    }
    mc(t, i) {
        const s = this.vc()
          , e = i === void 0 ? 0 : i.from
          , h = i === void 0 ? t.length : i.to;
        for (let r = e; r < h; r++) {
            const o = t[r].wt
              , l = s + this.Yu - o
              , a = this.S_ - (l + .5) * this.Ku - 1;
            t[r]._t = a
        }
    }
    wc(t, i) {
        const s = Math.ceil(this.gc(t));
        return i && this.Ps.ignoreWhitespaceIndices && !this.Mc(s) ? this.bc(s) : s
    }
    Mn(t) {
        this.zu = !0,
        this.Yu = t,
        this.fc(),
        this.ns.Sc(),
        this.ns.dr()
    }
    ul() {
        return this.Ku
    }
    gn(t) {
        const i = this.Ku;
        if (this.xc(t),
        this.Ps.rightOffsetPixels !== void 0 && i !== 0) {
            const s = this.Yu * i / this.Ku;
            this.Yu = s
        }
        this.fc(),
        this.ns.Sc(),
        this.ns.dr()
    }
    Cc() {
        return this.Yu
    }
    Vl() {
        if (this.Gi())
            return null;
        if (this.Hu !== null)
            return this.Hu;
        const t = this.Ku
          , i = 5 * (this.ns.N().layout.fontSize + 4) / 8 * (this.Ps.tickMarkMaxCharacterLength || 8)
          , s = Math.round(i / t)
          , e = g(this.Ie())
          , h = Math.max(e.Aa(), e.Aa() - s)
          , r = Math.max(e.bi(), e.bi() - s)
          , o = this.Eu.xu(t, i, this.Ps.ignoreWhitespaceIndices, this.Uu, this.$u)
          , l = this._c() + s
          , a = this.uc() - s
          , u = this.yc()
          , c = this.Ps.fixLeftEdge || u
          , d = this.Ps.fixRightEdge || u;
        let m = 0;
        for (const f of o) {
            if (!(h <= f.index && f.index <= r))
                continue;
            let p;
            m < this.qu.length ? (p = this.qu[m],
            p.coord = this.qt(f.index),
            p.label = this.kc(f),
            p.weight = f.weight) : (p = {
                needAlignCoordinate: !1,
                coord: this.qt(f.index),
                label: this.kc(f),
                weight: f.weight
            },
            this.qu.push(p)),
            this.Ku > i / 2 && !u ? p.needAlignCoordinate = !1 : p.needAlignCoordinate = c && f.index <= l || d && f.index >= a,
            m++
        }
        return this.qu.length = m,
        this.Hu = this.qu,
        this.qu
    }
    Pc() {
        let t;
        this.zu = !0,
        this.gn(this.Ps.barSpacing),
        t = this.Ps.rightOffsetPixels !== void 0 ? this.Ps.rightOffsetPixels / this.ul() : this.Ps.rightOffset,
        this.Mn(t)
    }
    Tc(t) {
        this.zu = !0,
        this.Vu = t,
        this.fc(),
        this.sc()
    }
    Rc(t, i) {
        const s = this.gc(t)
          , e = this.ul()
          , h = e + i * (e / 10);
        this.gn(h),
        this.Ps.rightBarStaysOnScroll || this.Mn(this.Cc() + (s - this.gc(t)))
    }
    h_(t) {
        this.bo && this.u_(),
        this.Mo === null && this.Wu === null && (this.Gi() || (this.Mo = t,
        this.Dc()))
    }
    a_(t) {
        if (this.Wu === null)
            return;
        const i = dt(this.S_ - t, 0, this.S_)
          , s = dt(this.S_ - g(this.Mo), 0, this.S_);
        i !== 0 && s !== 0 && this.gn(this.Wu.ul * i / s)
    }
    l_() {
        this.Mo !== null && (this.Mo = null,
        this.Ic())
    }
    o_(t) {
        this.bo === null && this.Wu === null && (this.Gi() || (this.bo = t,
        this.Dc()))
    }
    __(t) {
        if (this.bo === null)
            return;
        const i = (this.bo - t) / this.ul();
        this.Yu = g(this.Wu).Cc + i,
        this.zu = !0,
        this.fc()
    }
    u_() {
        this.bo !== null && (this.bo = null,
        this.Ic())
    }
    Vc() {
        this.Bc(this.Ps.rightOffset)
    }
    Bc(t, i=400) {
        if (!isFinite(t))
            throw new RangeError("offset is required and must be finite number");
        if (!isFinite(i) || i <= 0)
            throw new RangeError("animationDuration (optional) must be finite positive number");
        const s = this.Yu
          , e = performance.now();
        this.ns.vn({
            Ec: h => (h - e) / i >= 1,
            Ac: h => {
                const r = (h - e) / i;
                return r >= 1 ? t : s + (t - s) * r
            }
        })
    }
    kt(t, i) {
        this.zu = !0,
        this.Bu = t,
        this.Eu.bu(t, i),
        this.fc()
    }
    Lc() {
        return this.Ou
    }
    zc() {
        return this.Nu
    }
    Oc() {
        return this.Fu
    }
    vc() {
        return this.Vu || 0
    }
    Nc(t, i) {
        const s = t.mu()
          , e = i && this.Ps.rightOffsetPixels || 0;
        this.xc((this.S_ - e) / s),
        this.Yu = t.bi() - this.vc(),
        i && (this.Yu = e ? e / this.ul() : this.Ps.rightOffset),
        this.fc(),
        this.zu = !0,
        this.ns.Sc(),
        this.ns.dr()
    }
    Fc() {
        const t = this._c()
          , i = this.uc();
        if (t === null || i === null)
            return;
        const s = !this.Ps.rightOffsetPixels && this.Ps.rightOffset || 0;
        this.Nc(new pt(t,i + s), !0)
    }
    Wc(t) {
        const i = new pt(t.from,t.to);
        this.Nc(i)
    }
    rs(t) {
        return this.yo.timeFormatter !== void 0 ? this.yo.timeFormatter(t.originalTime) : this.cu.formatHorzItem(t.time)
    }
    Ju() {
        if (!this.Ps.ignoreWhitespaceIndices)
            return;
        this.Uu.clear();
        const t = this.ns.tn();
        for (const i of t)
            for (const s of i.ll())
                this.Uu.set(s, !0);
        this.$u++
    }
    Hc() {
        return this.ju
    }
    vl() {
        const t = 1 / (window.devicePixelRatio || 1)
          , i = this.Ps.minBarSpacing;
        if (i >= t)
            return [1];
        const s = [1];
        let e = 2;
        for (; e <= 512; )
            i < t / e && s.push(e),
            e *= 2;
        return s
    }
    yc() {
        const t = this.ns.N().handleScroll
          , i = this.ns.N().handleScale;
        return !(t.horzTouchDrag || t.mouseWheel || t.pressedMouseMove || t.vertTouchDrag || i.axisDoubleClickReset.time || i.axisPressedMouseMove.time || i.mouseWheel || i.pinch)
    }
    _c() {
        return this.Bu.length === 0 ? null : 0
    }
    uc() {
        return this.Bu.length === 0 ? null : this.Bu.length - 1
    }
    Uc(t) {
        return (this.S_ - 1 - t) / this.Ku
    }
    gc(t) {
        const i = this.Uc(t)
          , s = this.vc() + this.Yu - i;
        return Math.round(1e6 * s) / 1e6
    }
    xc(t) {
        const i = this.Ku;
        this.Ku = t,
        this.dc(),
        i !== this.Ku && (this.zu = !0,
        this.$c(),
        this.Xu())
    }
    hc() {
        if (!this.zu)
            return;
        if (this.zu = !1,
        this.Gi())
            return void this.qc(ot.Iu());
        const t = this.vc()
          , i = this.S_ / this.Ku
          , s = this.Yu + t
          , e = new pt(s - i + 1,s);
        this.qc(new ot(e))
    }
    dc() {
        const t = dt(this.Ku, this.jc(), this.Yc());
        this.Ku !== t && (this.Ku = t,
        this.zu = !0)
    }
    Yc() {
        return this.Ps.maxBarSpacing > 0 ? this.Ps.maxBarSpacing : .5 * this.S_
    }
    jc() {
        return this.Ps.fixLeftEdge && this.Ps.fixRightEdge && this.Bu.length !== 0 ? this.S_ / this.Bu.length : this.Ps.minBarSpacing
    }
    Xu() {
        if (!this.Ps.enableConflation)
            return void (this.ju = 1);
        const t = 1 / (window.devicePixelRatio || 1) * (this.Ps.conflationThresholdFactor ?? 1);
        if (this.Ku >= t)
            return void (this.ju = 1);
        const i = t / this.Ku
          , s = Math.pow(2, Math.floor(Math.log2(i)));
        this.ju = Math.min(s, 512)
    }
    fc() {
        const t = this.Kc();
        t !== null && this.Yu < t && (this.Yu = t,
        this.zu = !0);
        const i = this.Zc();
        this.Yu > i && (this.Yu = i,
        this.zu = !0)
    }
    Kc() {
        const t = this._c()
          , i = this.Vu;
        return t === null || i === null ? null : t - i - 1 + (this.Ps.fixLeftEdge ? this.S_ / this.Ku : Math.min(2, this.Bu.length))
    }
    Zc() {
        return this.Ps.fixRightEdge ? 0 : this.S_ / this.Ku - Math.min(2, this.Bu.length)
    }
    Dc() {
        this.Wu = {
            ul: this.ul(),
            Cc: this.Cc()
        }
    }
    Ic() {
        this.Wu = null
    }
    kc(t) {
        let i = this.Au.get(t.weight);
        return i === void 0 && (i = new De((s => this.Gc(s)),this.cu),
        this.Au.set(t.weight, i)),
        i.du(t)
    }
    Gc(t) {
        return this.cu.formatTickmark(t, this.yo)
    }
    qc(t) {
        const i = this.Lu;
        this.Lu = t,
        Ii(i.Ru(), this.Lu.Ru()) || this.Ou.p(),
        Ii(i.Du(), this.Lu.Du()) || this.Nu.p(),
        this.$c()
    }
    $c() {
        this.Hu = null
    }
    tc() {
        this.$c(),
        this.Au.clear()
    }
    Gu() {
        this.cu.updateFormatter(this.yo)
    }
    sc() {
        if (!this.Ps.fixLeftEdge)
            return;
        const t = this._c();
        if (t === null)
            return;
        const i = this.Ie();
        if (i === null)
            return;
        const s = i.Aa() - t;
        if (s < 0) {
            const e = this.Yu - s - 1;
            this.Mn(e)
        }
        this.dc()
    }
    nc() {
        this.fc(),
        this.dc()
    }
    Mc(t) {
        return !this.Ps.ignoreWhitespaceIndices || this.Uu.get(t) || !1
    }
    bc(t) {
        const i = (function*(e) {
            const h = Math.round(e)
              , r = h < e;
            let o = 1;
            for (; ; )
                r ? (yield h + o,
                yield h - o) : (yield h - o,
                yield h + o),
                o++
        }
        )(t)
          , s = this.uc();
        for (; s; ) {
            const e = i.next().value;
            if (this.Uu.get(e))
                return e;
            if (e < 0 || e > s)
                break
        }
        return t
    }
    Zu(t) {
        if (t.rightOffsetPixels !== void 0) {
            const i = t.rightOffsetPixels / (t.barSpacing || this.Ku);
            this.ns.Mn(i)
        }
    }
}
var Wi, Bi, Ai, Vi, Oi;
(function(n) {
    n[n.OnTouchEnd = 0] = "OnTouchEnd",
    n[n.OnNextTap = 1] = "OnNextTap"
}
)(Wi || (Wi = {}));
class Xe {
    constructor(t, i, s) {
        this.Xc = [],
        this.Jc = [],
        this.Qc = null,
        this.S_ = 0,
        this.td = null,
        this.sd = new P,
        this.nd = new P,
        this.ed = null,
        this.rd = t,
        this.Ps = i,
        this.cu = s,
        this.ko = new Ds(this.Ps.layout.colorParsers),
        this.hd = new Ys(this),
        this.Jh = new Ue(this,i.timeScale,this.Ps.localization,s),
        this.Ct = new ee(this,i.crosshair),
        this.ad = new Ie(i.crosshair),
        i.addDefaultPane && (this.ld(0),
        this.Xc[0].A_(2)),
        this.od = this._d(0),
        this.ud = this._d(1)
    }
    Ca() {
        this.dd(L.yn())
    }
    dr() {
        this.dd(L.Cn())
    }
    Ua() {
        this.dd(new L(1))
    }
    ya(t) {
        const i = this.fd(t);
        this.dd(i)
    }
    pd() {
        return this.td
    }
    vd(t) {
        if (this.td?.hu === t?.hu && this.td?.au?.te === t?.au?.te)
            return;
        const i = this.td;
        this.td = t,
        i !== null && this.ya(i.hu),
        t !== null && t.hu !== i?.hu && this.ya(t.hu)
    }
    N() {
        return this.Ps
    }
    cr(t) {
        W(this.Ps, t),
        this.Xc.forEach((i => i.I_(t))),
        t.timeScale !== void 0 && this.Jh.cr(t.timeScale),
        t.localization !== void 0 && this.Jh.Qu(t.localization),
        (t.leftPriceScale || t.rightPriceScale) && this.sd.p(),
        this.od = this._d(0),
        this.ud = this._d(1),
        this.Ca()
    }
    md(t, i, s=0) {
        const e = this.Xc[s];
        if (e === void 0)
            return;
        if (t === "left")
            return W(this.Ps, {
                leftPriceScale: i
            }),
            e.I_({
                leftPriceScale: i
            }),
            this.sd.p(),
            void this.Ca();
        if (t === "right")
            return W(this.Ps, {
                rightPriceScale: i
            }),
            e.I_({
                rightPriceScale: i
            }),
            this.sd.p(),
            void this.Ca();
        const h = this.wd(t, s);
        h !== null && (h.Ft.cr(i),
        this.sd.p())
    }
    wd(t, i) {
        const s = this.Xc[i];
        if (s === void 0)
            return null;
        const e = s.V_(t);
        return e !== null ? {
            Gs: s,
            Ft: e
        } : null
    }
    Et() {
        return this.Jh
    }
    Xs() {
        return this.Xc
    }
    gd() {
        return this.Ct
    }
    Md() {
        return this.nd
    }
    bd(t, i) {
        t.No(i),
        this.Sc()
    }
    L_(t) {
        this.S_ = t,
        this.Jh.L_(this.S_),
        this.Xc.forEach((i => i.L_(t))),
        this.Sc()
    }
    Sd(t) {
        this.Xc.length !== 1 && (z(t >= 0 && t < this.Xc.length, "Invalid pane index"),
        this.Xc.splice(t, 1),
        this.Ca())
    }
    xd(t, i) {
        if (this.Xc.length < 2)
            return;
        z(t >= 0 && t < this.Xc.length, "Invalid pane index");
        const s = this.Xc[t]
          , e = this.Xc.reduce(( (c, d) => c + d.E_()), 0)
          , h = this.Xc.reduce(( (c, d) => c + d.$t()), 0)
          , r = h - 30 * (this.Xc.length - 1);
        i = Math.min(r, Math.max(30, i));
        const o = e / h
          , l = s.$t();
        s.A_(i * o);
        let a = i - l
          , u = this.Xc.length - 1;
        for (const c of this.Xc)
            if (c !== s) {
                const d = Math.min(r, Math.max(30, c.$t() - a / u));
                a -= c.$t() - d,
                u -= 1;
                const m = d * o;
                c.A_(m)
            }
        this.Ca()
    }
    Cd(t, i) {
        z(t >= 0 && t < this.Xc.length && i >= 0 && i < this.Xc.length, "Invalid pane index");
        const s = this.Xc[t]
          , e = this.Xc[i];
        this.Xc[t] = e,
        this.Xc[i] = s,
        this.Ca()
    }
    yd(t, i) {
        if (z(t >= 0 && t < this.Xc.length && i >= 0 && i < this.Xc.length, "Invalid pane index"),
        t === i)
            return;
        const [s] = this.Xc.splice(t, 1);
        this.Xc.splice(i, 0, s),
        this.Ca()
    }
    j_(t, i, s) {
        t.j_(i, s)
    }
    Y_(t, i, s) {
        t.Y_(i, s),
        this.ka(),
        this.dd(this.kd(t, 2))
    }
    K_(t, i) {
        t.K_(i),
        this.dd(this.kd(t, 2))
    }
    Z_(t, i, s) {
        i.Vo() || t.Z_(i, s)
    }
    G_(t, i, s) {
        i.Vo() || (t.G_(i, s),
        this.ka(),
        this.dd(this.kd(t, 2)))
    }
    X_(t, i) {
        i.Vo() || (t.X_(i),
        this.dd(this.kd(t, 2)))
    }
    Q_(t, i) {
        t.Q_(i),
        this.dd(this.kd(t, 2))
    }
    Pd(t) {
        this.Jh.h_(t)
    }
    Td(t, i) {
        const s = this.Et();
        if (s.Gi() || i === 0)
            return;
        const e = s.ss();
        t = Math.max(1, Math.min(t, e)),
        s.Rc(t, i),
        this.Sc()
    }
    Rd(t) {
        this.Dd(0),
        this.Id(t),
        this.Vd()
    }
    Bd(t) {
        this.Jh.a_(t),
        this.Sc()
    }
    Ed() {
        this.Jh.l_(),
        this.dr()
    }
    Dd(t) {
        this.Jh.o_(t)
    }
    Id(t) {
        this.Jh.__(t),
        this.Sc()
    }
    Vd() {
        this.Jh.u_(),
        this.dr()
    }
    tn() {
        return this.Jc
    }
    Us() {
        return this.Qc === null && (this.Qc = this.Jc.filter((t => t.It()))),
        this.Qc
    }
    xa() {
        this.Qc = null
    }
    Ad(t, i, s, e, h) {
        this.Ct.Bs(t, i);
        let r = NaN
          , o = this.Jh.wc(t, !0);
        const l = this.Jh.Ie();
        l !== null && (o = Math.min(Math.max(l.Aa(), o), l.bi())),
        o = this.Ct.Hs(o);
        const a = e.Rs()
          , u = a.Lt();
        if (u !== null && (r = a.Ds(i, u)),
        r = this.ad.bl(r, o, e),
        this.Ct.zs(o, r, e),
        this.Ua(),
        !h) {
            const c = ks(e, t, i);
            this.vd(c && {
                hu: c.hu,
                au: c.au,
                ou: c.ou || null
            }),
            this.nd.p(this.Ct.Bt(), {
                x: t,
                y: i
            }, s)
        }
    }
    Ld(t, i, s) {
        const e = s.Rs()
          , h = e.Lt()
          , r = e.Nt(t, g(h))
          , o = this.Jh.ec(i, !0)
          , l = this.Jh.qt(g(o));
        this.Ad(l, r, null, s, !0)
    }
    zd(t) {
        this.gd().Ns(),
        this.Ua(),
        t || this.nd.p(null, null, null)
    }
    ka() {
        const t = this.Ct.Gs();
        if (t !== null) {
            const i = this.Ct.As()
              , s = this.Ct.Ls();
            this.Ad(i, s, null, t)
        }
        this.Ct.Ws()
    }
    Od(t, i, s) {
        const e = this.Jh.Is(0);
        i !== void 0 && s !== void 0 && this.Jh.kt(i, s);
        const h = this.Jh.Is(0)
          , r = this.Jh.vc()
          , o = this.Jh.Ie();
        if (o !== null && e !== null && h !== null) {
            const l = o.Ee(r)
              , a = this.cu.key(e) > this.cu.key(h)
              , u = t !== null && t > r && !a
              , c = this.Jh.N().allowShiftVisibleRangeOnWhitespaceReplacement
              , d = l && (s !== void 0 || c) && this.Jh.N().shiftVisibleRangeOnNewBar;
            if (u && !d) {
                const m = t - r;
                this.Jh.Mn(this.Jh.Cc() - m)
            }
        }
        this.Jh.Tc(t)
    }
    Ra(t) {
        t !== null && t.iu()
    }
    Kn(t) {
        if ((function(s) {
            return s instanceof Ti
        }
        )(t))
            return t;
        const i = this.Xc.find((s => s.Dt().includes(t)));
        return i === void 0 ? null : i
    }
    Sc() {
        this.Xc.forEach((t => t.iu())),
        this.ka()
    }
    m() {
        this.Xc.forEach((t => t.m())),
        this.Xc.length = 0,
        this.Ps.localization.priceFormatter = void 0,
        this.Ps.localization.percentageFormatter = void 0,
        this.Ps.localization.timeFormatter = void 0
    }
    Nd() {
        return this.hd
    }
    Jn() {
        return this.hd.N()
    }
    B_() {
        return this.sd
    }
    Fd(t, i) {
        const s = this.ld(i);
        this.Wd(t, s),
        this.Jc.push(t),
        this.xa(),
        this.Jc.length === 1 ? this.Ca() : this.dr()
    }
    Hd(t) {
        const i = this.Kn(t)
          , s = this.Jc.indexOf(t);
        z(s !== -1, "Series not found");
        const e = g(i);
        this.Jc.splice(s, 1),
        e.n_(t),
        t.m && t.m(),
        this.xa(),
        this.Jh.Ju(),
        this.Ud(e)
    }
    Sa(t, i) {
        const s = g(this.Kn(t));
        s.n_(t, !0),
        s.i_(t, i, !0)
    }
    Fc() {
        const t = L.Cn();
        t.cn(),
        this.dd(t)
    }
    $d(t) {
        const i = L.Cn();
        i.pn(t),
        this.dd(i)
    }
    wn() {
        const t = L.Cn();
        t.wn(),
        this.dd(t)
    }
    gn(t) {
        const i = L.Cn();
        i.gn(t),
        this.dd(i)
    }
    Mn(t) {
        const i = L.Cn();
        i.Mn(t),
        this.dd(i)
    }
    vn(t) {
        const i = L.Cn();
        i.vn(t),
        this.dd(i)
    }
    dn() {
        const t = L.Cn();
        t.dn(),
        this.dd(t)
    }
    qd() {
        return this.Ps.rightPriceScale.visible ? "right" : "left"
    }
    jd(t, i) {
        if (z(i >= 0, "Index should be greater or equal to 0"),
        i === this.Yd(t))
            return;
        const s = g(this.Kn(t));
        s.n_(t);
        const e = this.ld(i);
        this.Wd(t, e),
        s.Sl().length === 0 && this.Ud(s),
        this.Ca()
    }
    Kd() {
        return this.ud
    }
    $() {
        return this.od
    }
    Ut(t) {
        const i = this.ud
          , s = this.od;
        if (i === s)
            return i;
        if (t = Math.max(0, Math.min(100, Math.round(100 * t))),
        this.ed === null || this.ed.eh !== s || this.ed.rh !== i)
            this.ed = {
                eh: s,
                rh: i,
                Zd: new Map
            };
        else {
            const h = this.ed.Zd.get(t);
            if (h !== void 0)
                return h
        }
        const e = this.ko.tt(s, i, t / 100);
        return this.ed.Zd.set(t, e),
        e
    }
    Gd(t) {
        return this.Xc.indexOf(t)
    }
    Xi() {
        return this.ko
    }
    Xd() {
        return this.Jd()
    }
    Jd(t) {
        const i = new Ti(this.Jh,this);
        this.Xc.push(i);
        const s = t ?? this.Xc.length - 1
          , e = L.yn();
        return e.hn(s, {
            an: 0,
            ln: !0
        }),
        this.dd(e),
        i
    }
    ld(t) {
        return z(t >= 0, "Index should be greater or equal to 0"),
        (t = Math.min(this.Xc.length, t)) < this.Xc.length ? this.Xc[t] : this.Jd(t)
    }
    Yd(t) {
        return this.Xc.findIndex((i => i.F_().includes(t)))
    }
    kd(t, i) {
        const s = new L(i);
        if (t !== null) {
            const e = this.Xc.indexOf(t);
            s.hn(e, {
                an: i
            })
        }
        return s
    }
    fd(t, i) {
        return i === void 0 && (i = 2),
        this.kd(this.Kn(t), i)
    }
    dd(t) {
        this.rd && this.rd(t),
        this.Xc.forEach((i => i.eu().pr().kt()))
    }
    Wd(t, i) {
        const s = t.N().priceScaleId
          , e = s !== void 0 ? s : this.qd();
        i.i_(t, e),
        Bt(e) || t.cr(t.N())
    }
    _d(t) {
        const i = this.Ps.layout;
        return i.background.type === "gradient" ? t === 0 ? i.background.topColor : i.background.bottomColor : i.background.color
    }
    Ud(t) {
        !t.N_() && t.Sl().length === 0 && this.Xc.length > 1 && this.Xc.splice(this.Gd(t), 1)
    }
}
function Ls(n) {
    if (n >= 1)
        return 0;
    let t = 0;
    for (; t < 8; t++) {
        const i = Math.round(n);
        if (Math.abs(i - n) < 1e-8)
            return t;
        n *= 10
    }
    return t
}
function oi(n) {
    return !lt(n) && !wt(n)
}
function zs(n) {
    return lt(n)
}
(function(n) {
    n[n.Disabled = 0] = "Disabled",
    n[n.Continuous = 1] = "Continuous",
    n[n.OnDataUpdate = 2] = "OnDataUpdate"
}
)(Bi || (Bi = {})),
(function(n) {
    n[n.LastBar = 0] = "LastBar",
    n[n.LastVisible = 1] = "LastVisible"
}
)(Ai || (Ai = {})),
(function(n) {
    n.Solid = "solid",
    n.VerticalGradient = "gradient"
}
)(Vi || (Vi = {})),
(function(n) {
    n[n.Year = 0] = "Year",
    n[n.Month = 1] = "Month",
    n[n.DayOfMonth = 2] = "DayOfMonth",
    n[n.Time = 3] = "Time",
    n[n.TimeWithSeconds = 4] = "TimeWithSeconds"
}
)(Oi || (Oi = {}));
const Ki = n => n.getUTCFullYear();
function Qe(n, t, i) {
    return t.replace(/yyyy/g, (s => J(Ki(s), 4))(n)).replace(/yy/g, (s => J(Ki(s) % 100, 2))(n)).replace(/MMMM/g, ( (s, e) => new Date(s.getUTCFullYear(),s.getUTCMonth(),1).toLocaleString(e, {
        month: "long"
    }))(n, i)).replace(/MMM/g, ( (s, e) => new Date(s.getUTCFullYear(),s.getUTCMonth(),1).toLocaleString(e, {
        month: "short"
    }))(n, i)).replace(/MM/g, (s => J((e => e.getUTCMonth() + 1)(s), 2))(n)).replace(/dd/g, (s => J((e => e.getUTCDate())(s), 2))(n))
}
class Rs {
    constructor(t="yyyy-MM-dd", i="default") {
        this.Qd = t,
        this.tf = i
    }
    du(t) {
        return Qe(t, this.Qd, this.tf)
    }
}
class He {
    constructor(t) {
        this.if = t || "%h:%m:%s"
    }
    du(t) {
        return this.if.replace("%h", J(t.getUTCHours(), 2)).replace("%m", J(t.getUTCMinutes(), 2)).replace("%s", J(t.getUTCSeconds(), 2))
    }
}
const qe = {
    sf: "yyyy-MM-dd",
    nf: "%h:%m:%s",
    ef: " ",
    rf: "default"
};
class Ze {
    constructor(t={}) {
        const i = {
            ...qe,
            ...t
        };
        this.hf = new Rs(i.sf,i.rf),
        this.af = new He(i.nf),
        this.lf = i.ef
    }
    du(t) {
        return `${this.hf.du(t)}${this.lf}${this.af.du(t)}`
    }
}
function St(n) {
    return 60 * n * 60 * 1e3
}
function Ht(n) {
    return 60 * n * 1e3
}
const Ct = [{
    _f: (Ji = 1,
    1e3 * Ji),
    uf: 10
}, {
    _f: Ht(1),
    uf: 20
}, {
    _f: Ht(5),
    uf: 21
}, {
    _f: Ht(30),
    uf: 22
}, {
    _f: St(1),
    uf: 30
}, {
    _f: St(3),
    uf: 31
}, {
    _f: St(6),
    uf: 32
}, {
    _f: St(12),
    uf: 33
}];
var Ji;
function Yi(n, t) {
    if (n.getUTCFullYear() !== t.getUTCFullYear())
        return 70;
    if (n.getUTCMonth() !== t.getUTCMonth())
        return 60;
    if (n.getUTCDate() !== t.getUTCDate())
        return 50;
    for (let i = Ct.length - 1; i >= 0; --i)
        if (Math.floor(t.getTime() / Ct[i]._f) !== Math.floor(n.getTime() / Ct[i]._f))
            return Ct[i].uf;
    return 0
}
function qt(n) {
    let t = n;
    if (wt(n) && (t = di(n)),
    !oi(t))
        throw new Error("time must be of type BusinessDay");
    const i = new Date(Date.UTC(t.year, t.month - 1, t.day, 0, 0, 0, 0));
    return {
        cf: Math.round(i.getTime() / 1e3),
        df: t
    }
}
function Di(n) {
    if (!zs(n))
        throw new Error("time must be of type isUTCTimestamp");
    return {
        cf: n
    }
}
function di(n) {
    const t = new Date(n);
    if (isNaN(t.getTime()))
        throw new Error(`Invalid date string=${n}, expected format=yyyy-mm-dd`);
    return {
        day: t.getUTCDate(),
        month: t.getUTCMonth() + 1,
        year: t.getUTCFullYear()
    }
}
function $i(n) {
    wt(n.time) && (n.time = di(n.time))
}
class Gi {
    options() {
        return this.Ps
    }
    setOptions(t) {
        this.Ps = t,
        this.updateFormatter(t.localization)
    }
    preprocessData(t) {
        Array.isArray(t) ? (function(i) {
            i.forEach($i)
        }
        )(t) : $i(t)
    }
    createConverterToInternalObj(t) {
        return g((function(i) {
            return i.length === 0 ? null : oi(i[0].time) || wt(i[0].time) ? qt : Di
        }
        )(t))
    }
    key(t) {
        return typeof t == "object" && "cf"in t ? t.cf : this.key(this.convertHorzItemToInternal(t))
    }
    cacheKey(t) {
        const i = t;
        return i.df === void 0 ? new Date(1e3 * i.cf).getTime() : new Date(Date.UTC(i.df.year, i.df.month - 1, i.df.day)).getTime()
    }
    convertHorzItemToInternal(t) {
        return zs(i = t) ? Di(i) : oi(i) ? qt(i) : qt(di(i));
        var i
    }
    updateFormatter(t) {
        if (!this.Ps)
            return;
        const i = t.dateFormat;
        this.Ps.timeScale.timeVisible ? this.ff = new Ze({
            sf: i,
            nf: this.Ps.timeScale.secondsVisible ? "%h:%m:%s" : "%h:%m",
            ef: "   ",
            rf: t.locale
        }) : this.ff = new Rs(i,t.locale)
    }
    formatHorzItem(t) {
        const i = t;
        return this.ff.du(new Date(1e3 * i.cf))
    }
    formatTickmark(t, i) {
        const s = (function(h, r, o) {
            switch (h) {
            case 0:
            case 10:
                return r ? o ? 4 : 3 : 2;
            case 20:
            case 21:
            case 22:
            case 30:
            case 31:
            case 32:
            case 33:
                return r ? 3 : 2;
            case 50:
                return 2;
            case 60:
                return 1;
            case 70:
                return 0
            }
        }
        )(t.weight, this.Ps.timeScale.timeVisible, this.Ps.timeScale.secondsVisible)
          , e = this.Ps.timeScale;
        if (e.tickMarkFormatter !== void 0) {
            const h = e.tickMarkFormatter(t.originalTime, s, i.locale);
            if (h !== null)
                return h
        }
        return (function(h, r, o) {
            const l = {};
            switch (r) {
            case 0:
                l.year = "numeric";
                break;
            case 1:
                l.month = "short";
                break;
            case 2:
                l.day = "numeric";
                break;
            case 3:
                l.hour12 = !1,
                l.hour = "2-digit",
                l.minute = "2-digit";
                break;
            case 4:
                l.hour12 = !1,
                l.hour = "2-digit",
                l.minute = "2-digit",
                l.second = "2-digit"
            }
            const a = h.df === void 0 ? new Date(1e3 * h.cf) : new Date(Date.UTC(h.df.year, h.df.month - 1, h.df.day));
            return new Date(a.getUTCFullYear(),a.getUTCMonth(),a.getUTCDate(),a.getUTCHours(),a.getUTCMinutes(),a.getUTCSeconds(),a.getUTCMilliseconds()).toLocaleString(o, l)
        }
        )(t.time, s, i.locale)
    }
    maxTickMarkWeight(t) {
        let i = t.reduce(Ge, t[0]).weight;
        return i > 30 && i < 50 && (i = 30),
        i
    }
    fillWeightsForPoints(t, i) {
        (function(s, e=0) {
            if (s.length === 0)
                return;
            let h = e === 0 ? null : s[e - 1].time.cf
              , r = h !== null ? new Date(1e3 * h) : null
              , o = 0;
            for (let l = e; l < s.length; ++l) {
                const a = s[l]
                  , u = new Date(1e3 * a.time.cf);
                r !== null && (a.timeWeight = Yi(u, r)),
                o += a.time.cf - (h || a.time.cf),
                h = a.time.cf,
                r = u
            }
            if (e === 0 && s.length > 1) {
                const l = Math.ceil(o / (s.length - 1))
                  , a = new Date(1e3 * (s[0].time.cf - l));
                s[0].timeWeight = Yi(new Date(1e3 * s[0].time.cf), a)
            }
        }
        )(t, i)
    }
    static pf(t) {
        return W({
            localization: {
                dateFormat: "dd MMM 'yy"
            }
        }, t ?? {})
    }
}
const ut = typeof window < "u";
function Ui() {
    return !!ut && window.navigator.userAgent.toLowerCase().indexOf("firefox") > -1
}
function Zt() {
    return !!ut && /iPhone|iPad|iPod/.test(window.navigator.platform)
}
function li(n) {
    return n + n % 2
}
function th(n) {
    ut && window.chrome !== void 0 && n.addEventListener("mousedown", (t => {
        if (t.button === 1)
            return t.preventDefault(),
            !1
    }
    ))
}
class Ot {
    constructor(t, i, s) {
        this.vf = 0,
        this.mf = null,
        this.wf = {
            _t: Number.NEGATIVE_INFINITY,
            ut: Number.POSITIVE_INFINITY
        },
        this.gf = 0,
        this.Mf = null,
        this.bf = {
            _t: Number.NEGATIVE_INFINITY,
            ut: Number.POSITIVE_INFINITY
        },
        this.Sf = null,
        this.xf = !1,
        this.Cf = null,
        this.yf = null,
        this.kf = !1,
        this.Pf = !1,
        this.Tf = !1,
        this.Rf = null,
        this.Df = null,
        this.If = null,
        this.Vf = null,
        this.Bf = null,
        this.Ef = null,
        this.Af = null,
        this.Lf = 0,
        this.zf = !1,
        this.Of = !1,
        this.Nf = !1,
        this.Ff = 0,
        this.Wf = null,
        this.Hf = !Zt(),
        this.Uf = e => {
            this.$f(e)
        }
        ,
        this.qf = e => {
            if (this.jf(e)) {
                const h = this.Yf(e);
                if (++this.gf,
                this.Mf && this.gf > 1) {
                    const {Kf: r} = this.Zf(V(e), this.bf);
                    r < 30 && !this.Tf && this.Gf(h, this.Jf.Xf),
                    this.Qf()
                }
            } else {
                const h = this.Yf(e);
                if (++this.vf,
                this.mf && this.vf > 1) {
                    const {Kf: r} = this.Zf(V(e), this.wf);
                    r < 5 && !this.Pf && this.tp(h, this.Jf.ip),
                    this.sp()
                }
            }
        }
        ,
        this.np = t,
        this.Jf = i,
        this.Ps = s,
        this.ep()
    }
    m() {
        this.Rf !== null && (this.Rf(),
        this.Rf = null),
        this.Df !== null && (this.Df(),
        this.Df = null),
        this.Vf !== null && (this.Vf(),
        this.Vf = null),
        this.Bf !== null && (this.Bf(),
        this.Bf = null),
        this.Ef !== null && (this.Ef(),
        this.Ef = null),
        this.If !== null && (this.If(),
        this.If = null),
        this.rp(),
        this.sp()
    }
    hp(t) {
        this.Vf && this.Vf();
        const i = this.ap.bind(this);
        if (this.Vf = () => {
            this.np.removeEventListener("mousemove", i)
        }
        ,
        this.np.addEventListener("mousemove", i),
        this.jf(t))
            return;
        const s = this.Yf(t);
        this.tp(s, this.Jf.lp),
        this.Hf = !0
    }
    sp() {
        this.mf !== null && clearTimeout(this.mf),
        this.vf = 0,
        this.mf = null,
        this.wf = {
            _t: Number.NEGATIVE_INFINITY,
            ut: Number.POSITIVE_INFINITY
        }
    }
    Qf() {
        this.Mf !== null && clearTimeout(this.Mf),
        this.gf = 0,
        this.Mf = null,
        this.bf = {
            _t: Number.NEGATIVE_INFINITY,
            ut: Number.POSITIVE_INFINITY
        }
    }
    ap(t) {
        if (this.Nf || this.yf !== null || this.jf(t))
            return;
        const i = this.Yf(t);
        this.tp(i, this.Jf.op),
        this.Hf = !0
    }
    _p(t) {
        const i = ti(t.changedTouches, g(this.Wf));
        if (i === null || (this.Ff = Pt(t),
        this.Af !== null) || this.Of)
            return;
        this.zf = !0;
        const s = this.Zf(V(i), g(this.yf))
          , {up: e, cp: h, Kf: r} = s;
        if (this.kf || !(r < 5)) {
            if (!this.kf) {
                const o = .5 * e
                  , l = h >= o && !this.Ps.dp()
                  , a = o > h && !this.Ps.fp();
                l || a || (this.Of = !0),
                this.kf = !0,
                this.Tf = !0,
                this.rp(),
                this.Qf()
            }
            if (!this.Of) {
                const o = this.Yf(t, i);
                this.Gf(o, this.Jf.pp),
                et(t)
            }
        }
    }
    vp(t) {
        if (t.button !== 0)
            return;
        const i = this.Zf(V(t), g(this.Cf))
          , {Kf: s} = i;
        if (s >= 5 && (this.Pf = !0,
        this.sp()),
        this.Pf) {
            const e = this.Yf(t);
            this.tp(e, this.Jf.mp)
        }
    }
    Zf(t, i) {
        const s = Math.abs(i._t - t._t)
          , e = Math.abs(i.ut - t.ut);
        return {
            up: s,
            cp: e,
            Kf: s + e
        }
    }
    wp(t) {
        let i = ti(t.changedTouches, g(this.Wf));
        if (i === null && t.touches.length === 0 && (i = t.changedTouches[0]),
        i === null)
            return;
        this.Wf = null,
        this.Ff = Pt(t),
        this.rp(),
        this.yf = null,
        this.Ef && (this.Ef(),
        this.Ef = null);
        const s = this.Yf(t, i);
        if (this.Gf(s, this.Jf.gp),
        ++this.gf,
        this.Mf && this.gf > 1) {
            const {Kf: e} = this.Zf(V(i), this.bf);
            e < 30 && !this.Tf && this.Gf(s, this.Jf.Xf),
            this.Qf()
        } else
            this.Tf || (this.Gf(s, this.Jf.Mp),
            this.Jf.Mp && et(t));
        this.gf === 0 && et(t),
        t.touches.length === 0 && this.xf && (this.xf = !1,
        et(t))
    }
    $f(t) {
        if (t.button !== 0)
            return;
        const i = this.Yf(t);
        if (this.Cf = null,
        this.Nf = !1,
        this.Bf && (this.Bf(),
        this.Bf = null),
        Ui() && this.np.ownerDocument.documentElement.removeEventListener("mouseleave", this.Uf),
        !this.jf(t))
            if (this.tp(i, this.Jf.bp),
            ++this.vf,
            this.mf && this.vf > 1) {
                const {Kf: s} = this.Zf(V(t), this.wf);
                s < 5 && !this.Pf && this.tp(i, this.Jf.ip),
                this.sp()
            } else
                this.Pf || this.tp(i, this.Jf.Sp)
    }
    rp() {
        this.Sf !== null && (clearTimeout(this.Sf),
        this.Sf = null)
    }
    xp(t) {
        if (this.Wf !== null)
            return;
        const i = t.changedTouches[0];
        this.Wf = i.identifier,
        this.Ff = Pt(t);
        const s = this.np.ownerDocument.documentElement;
        this.Tf = !1,
        this.kf = !1,
        this.Of = !1,
        this.yf = V(i),
        this.Ef && (this.Ef(),
        this.Ef = null);
        {
            const h = this._p.bind(this)
              , r = this.wp.bind(this);
            this.Ef = () => {
                s.removeEventListener("touchmove", h),
                s.removeEventListener("touchend", r)
            }
            ,
            s.addEventListener("touchmove", h, {
                passive: !1
            }),
            s.addEventListener("touchend", r, {
                passive: !1
            }),
            this.rp(),
            this.Sf = setTimeout(this.Cp.bind(this, t), 240)
        }
        const e = this.Yf(t, i);
        this.Gf(e, this.Jf.yp),
        this.Mf || (this.gf = 0,
        this.Mf = setTimeout(this.Qf.bind(this), 500),
        this.bf = V(i))
    }
    kp(t) {
        if (t.button !== 0)
            return;
        const i = this.np.ownerDocument.documentElement;
        Ui() && i.addEventListener("mouseleave", this.Uf),
        this.Pf = !1,
        this.Cf = V(t),
        this.Bf && (this.Bf(),
        this.Bf = null);
        {
            const e = this.vp.bind(this)
              , h = this.$f.bind(this);
            this.Bf = () => {
                i.removeEventListener("mousemove", e),
                i.removeEventListener("mouseup", h)
            }
            ,
            i.addEventListener("mousemove", e),
            i.addEventListener("mouseup", h)
        }
        if (this.Nf = !0,
        this.jf(t))
            return;
        const s = this.Yf(t);
        this.tp(s, this.Jf.Pp),
        this.mf || (this.vf = 0,
        this.mf = setTimeout(this.sp.bind(this), 500),
        this.wf = V(t))
    }
    ep() {
        this.np.addEventListener("mouseenter", this.hp.bind(this)),
        this.np.addEventListener("touchcancel", this.rp.bind(this));
        {
            const t = this.np.ownerDocument
              , i = s => {
                this.Jf.Tp && (s.composed && this.np.contains(s.composedPath()[0]) || s.target && this.np.contains(s.target) || this.Jf.Tp())
            }
            ;
            this.Df = () => {
                t.removeEventListener("touchstart", i)
            }
            ,
            this.Rf = () => {
                t.removeEventListener("mousedown", i)
            }
            ,
            t.addEventListener("mousedown", i),
            t.addEventListener("touchstart", i, {
                passive: !0
            })
        }
        Zt() && (this.If = () => {
            this.np.removeEventListener("dblclick", this.qf)
        }
        ,
        this.np.addEventListener("dblclick", this.qf)),
        this.np.addEventListener("mouseleave", this.Rp.bind(this)),
        this.np.addEventListener("touchstart", this.xp.bind(this), {
            passive: !0
        }),
        th(this.np),
        this.np.addEventListener("mousedown", this.kp.bind(this)),
        this.Dp(),
        this.np.addEventListener("touchmove", ( () => {}
        ), {
            passive: !1
        })
    }
    Dp() {
        this.Jf.Ip === void 0 && this.Jf.Vp === void 0 && this.Jf.Bp === void 0 || (this.np.addEventListener("touchstart", (t => this.Ep(t.touches)), {
            passive: !0
        }),
        this.np.addEventListener("touchmove", (t => {
            if (t.touches.length === 2 && this.Af !== null && this.Jf.Vp !== void 0) {
                const i = Xi(t.touches[0], t.touches[1]) / this.Lf;
                this.Jf.Vp(this.Af, i),
                et(t)
            }
        }
        ), {
            passive: !1
        }),
        this.np.addEventListener("touchend", (t => {
            this.Ep(t.touches)
        }
        )))
    }
    Ep(t) {
        t.length === 1 && (this.zf = !1),
        t.length !== 2 || this.zf || this.xf ? this.Ap() : this.Lp(t)
    }
    Lp(t) {
        const i = this.np.getBoundingClientRect() || {
            left: 0,
            top: 0
        };
        this.Af = {
            _t: (t[0].clientX - i.left + (t[1].clientX - i.left)) / 2,
            ut: (t[0].clientY - i.top + (t[1].clientY - i.top)) / 2
        },
        this.Lf = Xi(t[0], t[1]),
        this.Jf.Ip !== void 0 && this.Jf.Ip(),
        this.rp()
    }
    Ap() {
        this.Af !== null && (this.Af = null,
        this.Jf.Bp !== void 0 && this.Jf.Bp())
    }
    Rp(t) {
        if (this.Vf && this.Vf(),
        this.jf(t) || !this.Hf)
            return;
        const i = this.Yf(t);
        this.tp(i, this.Jf.zp),
        this.Hf = !Zt()
    }
    Cp(t) {
        const i = ti(t.touches, g(this.Wf));
        if (i === null)
            return;
        const s = this.Yf(t, i);
        this.Gf(s, this.Jf.Op),
        this.Tf = !0,
        this.xf = !0
    }
    jf(t) {
        return t.sourceCapabilities && t.sourceCapabilities.firesTouchEvents !== void 0 ? t.sourceCapabilities.firesTouchEvents : Pt(t) < this.Ff + 500
    }
    Gf(t, i) {
        i && i.call(this.Jf, t)
    }
    tp(t, i) {
        i && i.call(this.Jf, t)
    }
    Yf(t, i) {
        const s = i || t
          , e = this.np.getBoundingClientRect() || {
            left: 0,
            top: 0
        };
        return {
            clientX: s.clientX,
            clientY: s.clientY,
            pageX: s.pageX,
            pageY: s.pageY,
            screenX: s.screenX,
            screenY: s.screenY,
            localX: s.clientX - e.left,
            localY: s.clientY - e.top,
            ctrlKey: t.ctrlKey,
            altKey: t.altKey,
            shiftKey: t.shiftKey,
            metaKey: t.metaKey,
            Np: !t.type.startsWith("mouse") && t.type !== "contextmenu" && t.type !== "click",
            Fp: t.type,
            Wp: s.target,
            _u: t.view,
            Hp: () => {
                t.type !== "touchstart" && et(t)
            }
        }
    }
}
function Xi(n, t) {
    const i = n.clientX - t.clientX
      , s = n.clientY - t.clientY;
    return Math.sqrt(i * i + s * s)
}
function et(n) {
    n.cancelable && n.preventDefault()
}
function V(n) {
    return {
        _t: n.pageX,
        ut: n.pageY
    }
}
function Pt(n) {
    return n.timeStamp || performance.now()
}
function ti(n, t) {
    for (let i = 0; i < n.length; ++i)
        if (n[i].identifier === t)
            return n[i];
    return null
}
class ih {
    constructor(t, i, s) {
        this.Up = null,
        this.$p = null,
        this.qp = !0,
        this.jp = null,
        this.Yp = t,
        this.Kp = t.Zp()[i],
        this.Gp = t.Zp()[s],
        this.Xp = document.createElement("tr"),
        this.Xp.style.height = "1px",
        this.Jp = document.createElement("td"),
        this.Jp.style.position = "relative",
        this.Jp.style.padding = "0",
        this.Jp.style.margin = "0",
        this.Jp.setAttribute("colspan", "3"),
        this.Qp(),
        this.Xp.appendChild(this.Jp),
        this.qp = this.Yp.N().layout.panes.enableResize,
        this.qp ? this.tv() : (this.Up = null,
        this.$p = null)
    }
    m() {
        this.$p !== null && this.$p.m()
    }
    iv() {
        return this.Xp
    }
    sv() {
        return x({
            width: this.Kp.sv().width,
            height: 1
        })
    }
    nv() {
        return x({
            width: this.Kp.nv().width,
            height: 1 * window.devicePixelRatio
        })
    }
    ev(t, i, s) {
        const e = this.nv();
        t.fillStyle = this.Yp.N().layout.panes.separatorColor,
        t.fillRect(i, s, e.width, e.height)
    }
    kt() {
        this.Qp(),
        this.Yp.N().layout.panes.enableResize !== this.qp && (this.qp = this.Yp.N().layout.panes.enableResize,
        this.qp ? this.tv() : (this.Up !== null && (this.Jp.removeChild(this.Up.rv),
        this.Jp.removeChild(this.Up.hv),
        this.Up = null),
        this.$p !== null && (this.$p.m(),
        this.$p = null)))
    }
    tv() {
        const t = document.createElement("div")
          , i = t.style;
        i.position = "fixed",
        i.display = "none",
        i.zIndex = "49",
        i.top = "0",
        i.left = "0",
        i.width = "100%",
        i.height = "100%",
        i.cursor = "row-resize",
        this.Jp.appendChild(t);
        const s = document.createElement("div")
          , e = s.style;
        e.position = "absolute",
        e.zIndex = "50",
        e.top = "-4px",
        e.height = "9px",
        e.width = "100%",
        e.backgroundColor = "",
        e.cursor = "row-resize",
        this.Jp.appendChild(s);
        const h = {
            lp: this.av.bind(this),
            zp: this.lv.bind(this),
            Pp: this.ov.bind(this),
            yp: this.ov.bind(this),
            mp: this._v.bind(this),
            pp: this._v.bind(this),
            bp: this.uv.bind(this),
            gp: this.uv.bind(this)
        };
        this.$p = new Ot(s,h,{
            dp: () => !1,
            fp: () => !0
        }),
        this.Up = {
            hv: s,
            rv: t
        }
    }
    Qp() {
        this.Jp.style.background = this.Yp.N().layout.panes.separatorColor
    }
    av(t) {
        this.Up !== null && (this.Up.hv.style.backgroundColor = this.Yp.N().layout.panes.separatorHoverColor)
    }
    lv(t) {
        this.Up !== null && this.jp === null && (this.Up.hv.style.backgroundColor = "")
    }
    ov(t) {
        if (this.Up === null)
            return;
        const i = this.Kp.cv().E_() + this.Gp.cv().E_()
          , s = i / (this.Kp.sv().height + this.Gp.sv().height)
          , e = 30 * s;
        i <= 2 * e || (this.jp = {
            dv: t.pageY,
            fv: this.Kp.cv().E_(),
            pv: i - e,
            vv: i,
            mv: s,
            wv: e
        },
        this.Up.rv.style.display = "block")
    }
    _v(t) {
        const i = this.jp;
        if (i === null)
            return;
        const s = (t.pageY - i.dv) * i.mv
          , e = dt(i.fv + s, i.wv, i.pv);
        this.Kp.cv().A_(e),
        this.Gp.cv().A_(i.vv - e),
        this.Yp.Qt().Ca()
    }
    uv(t) {
        this.jp !== null && this.Up !== null && (this.jp = null,
        this.Up.rv.style.display = "none")
    }
}
function ii(n, t) {
    return n.gv - t.gv
}
function si(n, t, i) {
    const s = (n.gv - t.gv) / (n.wt - t.wt);
    return Math.sign(s) * Math.min(Math.abs(s), i)
}
class sh {
    constructor(t, i, s, e) {
        this.Mv = null,
        this.bv = null,
        this.Sv = null,
        this.xv = null,
        this.Cv = null,
        this.yv = 0,
        this.kv = 0,
        this.Pv = t,
        this.Tv = i,
        this.Rv = s,
        this.kn = e
    }
    Dv(t, i) {
        if (this.Mv !== null) {
            if (this.Mv.wt === i)
                return void (this.Mv.gv = t);
            if (Math.abs(this.Mv.gv - t) < this.kn)
                return
        }
        this.xv = this.Sv,
        this.Sv = this.bv,
        this.bv = this.Mv,
        this.Mv = {
            wt: i,
            gv: t
        }
    }
    fe(t, i) {
        if (this.Mv === null || this.bv === null || i - this.Mv.wt > 50)
            return;
        let s = 0;
        const e = si(this.Mv, this.bv, this.Tv)
          , h = ii(this.Mv, this.bv)
          , r = [e]
          , o = [h];
        if (s += h,
        this.Sv !== null) {
            const a = si(this.bv, this.Sv, this.Tv);
            if (Math.sign(a) === Math.sign(e)) {
                const u = ii(this.bv, this.Sv);
                if (r.push(a),
                o.push(u),
                s += u,
                this.xv !== null) {
                    const c = si(this.Sv, this.xv, this.Tv);
                    if (Math.sign(c) === Math.sign(e)) {
                        const d = ii(this.Sv, this.xv);
                        r.push(c),
                        o.push(d),
                        s += d
                    }
                }
            }
        }
        let l = 0;
        for (let a = 0; a < r.length; ++a)
            l += o[a] / s * r[a];
        Math.abs(l) < this.Pv || (this.Cv = {
            gv: t,
            wt: i
        },
        this.kv = l,
        this.yv = (function(a, u) {
            const c = Math.log(u);
            return Math.log(1 * c / -a) / c
        }
        )(Math.abs(l), this.Rv))
    }
    Ac(t) {
        const i = g(this.Cv)
          , s = t - i.wt;
        return i.gv + this.kv * (Math.pow(this.Rv, s) - 1) / Math.log(this.Rv)
    }
    Ec(t) {
        return this.Cv === null || this.Iv(t) === this.yv
    }
    Iv(t) {
        const i = t - g(this.Cv).wt;
        return Math.min(i, this.yv)
    }
}
class eh {
    constructor(t, i) {
        this.Vv = void 0,
        this.Bv = void 0,
        this.Ev = void 0,
        this.ws = !1,
        this.Av = t,
        this.Lv = i,
        this.zv()
    }
    kt() {
        this.zv()
    }
    Ov() {
        this.Vv && this.Av.removeChild(this.Vv),
        this.Bv && this.Av.removeChild(this.Bv),
        this.Vv = void 0,
        this.Bv = void 0
    }
    Nv() {
        return this.ws !== this.Fv() || this.Ev !== this.Wv()
    }
    Wv() {
        return this.Lv.Qt().Xi().J(this.Lv.N().layout.textColor) > 160 ? "dark" : "light"
    }
    Fv() {
        return this.Lv.N().layout.attributionLogo
    }
    Hv() {
        const t = new URL(location.href);
        return t.hostname ? "&utm_source=" + t.hostname + t.pathname : ""
    }
    zv() {
        this.Nv() && (this.Ov(),
        this.ws = this.Fv(),
        this.ws && (this.Ev = this.Wv(),
        this.Bv = document.createElement("style"),
        this.Bv.innerText = "a#tv-attr-logo{--fill:#131722;--stroke:#fff;position:absolute;left:10px;bottom:10px;height:19px;width:35px;margin:0;padding:0;border:0;z-index:3;}a#tv-attr-logo[data-dark]{--fill:#D1D4DC;--stroke:#131722;}",
        this.Vv = document.createElement("a"),
        this.Vv.href = `https://www.tradingview.com/?utm_medium=lwc-link&utm_campaign=lwc-chart${this.Hv()}`,
        this.Vv.title = "Charting by TradingView",
        this.Vv.id = "tv-attr-logo",
        this.Vv.target = "_blank",
        this.Vv.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="35" height="19" fill="none"><g fill-rule="evenodd" clip-path="url(#a)" clip-rule="evenodd"><path fill="var(--stroke)" d="M2 0H0v10h6v9h21.4l.5-1.3 6-15 1-2.7H23.7l-.5 1.3-.2.6a5 5 0 0 0-7-.9V0H2Zm20 17h4l5.2-13 .8-2h-7l-1 2.5-.2.5-1.5 3.8-.3.7V17Zm-.8-10a3 3 0 0 0 .7-2.7A3 3 0 1 0 16.8 7h4.4ZM14 7V2H2v6h6v9h4V7h2Z"/><path fill="var(--fill)" d="M14 2H2v6h6v9h6V2Zm12 15h-7l6-15h7l-6 15Zm-7-9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/></g><defs><clipPath id="a"><path fill="var(--stroke)" d="M0 0h35v19H0z"/></clipPath></defs></svg>',
        this.Vv.toggleAttribute("data-dark", this.Ev === "dark"),
        this.Av.appendChild(this.Bv),
        this.Av.appendChild(this.Vv)))
    }
}
function Z(n, t) {
    const i = g(n.ownerDocument).createElement("canvas");
    n.appendChild(i);
    const s = Vs(i, {
        options: {
            allowResizeObserver: !0
        },
        transform: (e, h) => ({
            width: Math.max(e.width, h.width),
            height: Math.max(e.height, h.height)
        })
    });
    return s.resizeCanvasElement(t),
    s
}
function tt(n) {
    n.width = 1,
    n.height = 1,
    n.getContext("2d")?.clearRect(0, 0, 1, 1)
}
function ai(n, t, i, s) {
    n.Uh && n.Uh(t, i, s)
}
function jt(n, t, i, s) {
    n.nt(t, i, s)
}
function ui(n, t, i, s) {
    const e = n(i, s);
    for (const h of e) {
        const r = h.Tt(s);
        r !== null && t(r)
    }
}
function ei(n, t) {
    return i => (function(s) {
        return s.Ft !== void 0
    }
    )(i) ? (i.Ft()?.ol() ?? "") !== t ? [] : i.Ya?.(n) ?? [] : []
}
function Qi(n, t, i, s) {
    if (!n.length)
        return;
    let e = 0;
    const h = n[0].$t(s, !0);
    let r = t === 1 ? i / 2 - (n[0].Hi() - h / 2) : n[0].Hi() - h / 2 - i / 2;
    r = Math.max(0, r);
    for (let o = 1; o < n.length; o++) {
        const l = n[o]
          , a = n[o - 1]
          , u = a.$t(s, !1)
          , c = l.Hi()
          , d = a.Hi();
        if (t === 1 ? c > d - u : c < d + u) {
            const m = d - u * t;
            l.Ui(m);
            const f = m - t * u / 2;
            if ((t === 1 ? f < 0 : f > i) && r > 0) {
                const p = t === 1 ? -1 - f : f - i
                  , w = Math.min(p, r);
                for (let b = e; b < n.length; b++)
                    n[b].Ui(n[b].Hi() + t * w);
                r -= w
            }
        } else
            e = o,
            r = t === 1 ? d - u - c : c - (d + u)
    }
}
class Hi {
    constructor(t, i, s, e) {
        this.Ki = null,
        this.Uv = null,
        this.$v = !1,
        this.qv = new zt(200),
        this.jv = null,
        this.Yv = 0,
        this.Kv = !1,
        this.Zv = () => {
            this.Kv || this.yt.Gv().Qt().dr()
        }
        ,
        this.Xv = () => {
            this.Kv || this.yt.Gv().Qt().dr()
        }
        ,
        this.yt = t,
        this.Ps = i,
        this.Co = i.layout,
        this.hd = s,
        this.Jv = e === "left",
        this.Qv = ei("normal", e),
        this.tm = ei("top", e),
        this.im = ei("bottom", e),
        this.Jp = document.createElement("div"),
        this.Jp.style.height = "100%",
        this.Jp.style.overflow = "hidden",
        this.Jp.style.width = "25px",
        this.Jp.style.left = "0",
        this.Jp.style.position = "relative",
        this.sm = Z(this.Jp, x({
            width: 16,
            height: 16
        })),
        this.sm.subscribeSuggestedBitmapSizeChanged(this.Zv);
        const h = this.sm.canvasElement;
        h.style.position = "absolute",
        h.style.zIndex = "1",
        h.style.left = "0",
        h.style.top = "0",
        this.nm = Z(this.Jp, x({
            width: 16,
            height: 16
        })),
        this.nm.subscribeSuggestedBitmapSizeChanged(this.Xv);
        const r = this.nm.canvasElement;
        r.style.position = "absolute",
        r.style.zIndex = "2",
        r.style.left = "0",
        r.style.top = "0";
        const o = {
            Pp: this.ov.bind(this),
            yp: this.ov.bind(this),
            mp: this._v.bind(this),
            pp: this._v.bind(this),
            Tp: this.rm.bind(this),
            bp: this.uv.bind(this),
            gp: this.uv.bind(this),
            ip: this.hm.bind(this),
            Xf: this.hm.bind(this),
            lp: this.am.bind(this),
            zp: this.lv.bind(this)
        };
        this.$p = new Ot(this.nm.canvasElement,o,{
            dp: () => !this.Ps.handleScroll.vertTouchDrag,
            fp: () => !0
        })
    }
    m() {
        this.$p.m(),
        this.nm.unsubscribeSuggestedBitmapSizeChanged(this.Xv),
        tt(this.nm.canvasElement),
        this.nm.dispose(),
        this.sm.unsubscribeSuggestedBitmapSizeChanged(this.Zv),
        tt(this.sm.canvasElement),
        this.sm.dispose(),
        this.Ki !== null && this.Ki.r_().u(this),
        this.Ki = null
    }
    iv() {
        return this.Jp
    }
    k() {
        return this.Co.fontSize
    }
    lm() {
        const t = this.hd.N();
        return this.jv !== t.P && (this.qv.On(),
        this.jv = t.P),
        t
    }
    om() {
        if (this.Ki === null)
            return 0;
        let t = 0;
        const i = this.lm()
          , s = g(this.sm.canvasElement.getContext("2d", {
            colorSpace: this.yt.Gv().N().layout.colorSpace
        }));
        s.save();
        const e = this.Ki.Vl();
        s.font = this._m(),
        e.length > 0 && (t = Math.max(this.qv.Ii(s, e[0].Jl), this.qv.Ii(s, e[e.length - 1].Jl)));
        const h = this.um();
        for (let a = h.length; a--; ) {
            const u = this.qv.Ii(s, h[a].ri());
            u > t && (t = u)
        }
        const r = this.Ki.Lt();
        if (r !== null && this.Uv !== null && (o = this.Ps.crosshair).mode !== 2 && o.horzLine.visible && o.horzLine.labelVisible) {
            const a = this.Ki.Ds(1, r)
              , u = this.Ki.Ds(this.Uv.height - 2, r);
            t = Math.max(t, this.qv.Ii(s, this.Ki.Ji(Math.floor(Math.min(a, u)) + .11111111111111, r)), this.qv.Ii(s, this.Ki.Ji(Math.ceil(Math.max(a, u)) - .11111111111111, r)))
        }
        var o;
        s.restore();
        const l = t || 34;
        return li(Math.ceil(i.S + i.C + i.V + i.B + 5 + l))
    }
    dm(t) {
        this.Uv !== null && Q(this.Uv, t) || (this.Uv = t,
        this.Kv = !0,
        this.sm.resizeCanvasElement(t),
        this.nm.resizeCanvasElement(t),
        this.Kv = !1,
        this.Jp.style.width = `${t.width}px`,
        this.Jp.style.height = `${t.height}px`)
    }
    fm() {
        return g(this.Uv).width
    }
    cs(t) {
        this.Ki !== t && (this.Ki !== null && this.Ki.r_().u(this),
        this.Ki = t,
        t.r_().i(this.do.bind(this), this))
    }
    Ft() {
        return this.Ki
    }
    On() {
        const t = this.yt.cv();
        this.yt.Gv().Qt().Q_(t, g(this.Ft()))
    }
    pm(t) {
        if (this.Uv === null)
            return;
        const i = {
            colorSpace: this.yt.Gv().N().layout.colorSpace
        };
        if (t !== 1) {
            this.vm(),
            this.sm.applySuggestedBitmapSize();
            const e = H(this.sm, i);
            e !== null && (e.useBitmapCoordinateSpace((h => {
                this.wm(h),
                this.gm(h)
            }
            )),
            this.yt.Mm(e, this.im),
            this.bm(e),
            this.yt.Mm(e, this.Qv),
            this.Sm(e))
        }
        this.nm.applySuggestedBitmapSize();
        const s = H(this.nm, i);
        s !== null && (s.useBitmapCoordinateSpace(( ({context: e, bitmapSize: h}) => {
            e.clearRect(0, 0, h.width, h.height)
        }
        )),
        this.xm(s),
        this.yt.Mm(s, this.tm))
    }
    nv() {
        return this.sm.bitmapSize
    }
    ev(t, i, s, e) {
        const h = this.nv();
        if (h.width > 0 && h.height > 0 && (t.drawImage(this.sm.canvasElement, i, s),
        e)) {
            const r = this.nm.canvasElement;
            t.drawImage(r, i, s)
        }
    }
    kt() {
        this.Ki?.Vl()
    }
    ov(t) {
        if (this.Ki === null || this.Ki.Gi() || !this.Ps.handleScale.axisPressedMouseMove.price)
            return;
        const i = this.yt.Gv().Qt()
          , s = this.yt.cv();
        this.$v = !0,
        i.j_(s, this.Ki, t.localY)
    }
    _v(t) {
        if (this.Ki === null || !this.Ps.handleScale.axisPressedMouseMove.price)
            return;
        const i = this.yt.Gv().Qt()
          , s = this.yt.cv()
          , e = this.Ki;
        i.Y_(s, e, t.localY)
    }
    rm() {
        if (this.Ki === null || !this.Ps.handleScale.axisPressedMouseMove.price)
            return;
        const t = this.yt.Gv().Qt()
          , i = this.yt.cv()
          , s = this.Ki;
        this.$v && (this.$v = !1,
        t.K_(i, s))
    }
    uv(t) {
        if (this.Ki === null || !this.Ps.handleScale.axisPressedMouseMove.price)
            return;
        const i = this.yt.Gv().Qt()
          , s = this.yt.cv();
        this.$v = !1,
        i.K_(s, this.Ki)
    }
    hm(t) {
        this.Ps.handleScale.axisDoubleClickReset.price && this.On()
    }
    am(t) {
        this.Ki !== null && (!this.yt.Gv().Qt().N().handleScale.axisPressedMouseMove.price || this.Ki.He() || this.Ki.Eo() || this.Cm(1))
    }
    lv(t) {
        this.Cm(0)
    }
    um() {
        const t = []
          , i = this.Ki === null ? void 0 : this.Ki;
        return (s => {
            for (let e = 0; e < s.length; ++e) {
                const h = s[e].Ks(this.yt.cv(), i);
                for (let r = 0; r < h.length; r++)
                    t.push(h[r])
            }
        }
        )(this.yt.cv().Dt()),
        t
    }
    wm({context: t, bitmapSize: i}) {
        const {width: s, height: e} = i
          , h = this.yt.cv().Qt()
          , r = h.$()
          , o = h.Kd();
        r === o ? It(t, 0, 0, s, e, r) : bs(t, 0, 0, s, e, r, o)
    }
    gm({context: t, bitmapSize: i, horizontalPixelRatio: s}) {
        if (this.Uv === null || this.Ki === null || !this.Ki.N().borderVisible)
            return;
        t.fillStyle = this.Ki.N().borderColor;
        const e = Math.max(1, Math.floor(this.lm().S * s));
        let h;
        h = this.Jv ? i.width - e : 0,
        t.fillRect(h, 0, e, i.height)
    }
    bm(t) {
        if (this.Uv === null || this.Ki === null)
            return;
        const i = this.Ki.Vl()
          , s = this.Ki.N()
          , e = this.lm()
          , h = this.Jv ? this.Uv.width - e.C : 0;
        s.borderVisible && s.ticksVisible && t.useBitmapCoordinateSpace(( ({context: r, horizontalPixelRatio: o, verticalPixelRatio: l}) => {
            r.fillStyle = s.borderColor;
            const a = Math.max(1, Math.floor(l))
              , u = Math.floor(.5 * l)
              , c = Math.round(e.C * o);
            r.beginPath();
            for (const d of i)
                r.rect(Math.floor(h * o), Math.round(d.Pl * l) - u, c, a);
            r.fill()
        }
        )),
        t.useMediaCoordinateSpace(( ({context: r}) => {
            r.font = this._m(),
            r.fillStyle = s.textColor ?? this.Co.textColor,
            r.textAlign = this.Jv ? "right" : "left",
            r.textBaseline = "middle";
            const o = this.Jv ? Math.round(h - e.V) : Math.round(h + e.C + e.V)
              , l = i.map((a => this.qv.Di(r, a.Jl)));
            for (let a = i.length; a--; ) {
                const u = i[a];
                r.fillText(u.Jl, o, u.Pl + l[a])
            }
        }
        ))
    }
    vm() {
        if (this.Uv === null || this.Ki === null)
            return;
        let t = this.Uv.height / 2;
        const i = []
          , s = this.Ki.Dt().slice()
          , e = this.yt.cv()
          , h = this.lm();
        this.Ki === e.Gn() && this.yt.cv().Dt().forEach((l => {
            e.Zn(l) && s.push(l)
        }
        ));
        const r = this.Ki.Sl()[0]
          , o = this.Ki;
        s.forEach((l => {
            const a = l.Ks(e, o);
            a.forEach((u => {
                u.$i() && u.Wi() === null && (u.Ui(null),
                i.push(u))
            }
            )),
            r === l && a.length > 0 && (t = a[0].Ei())
        }
        )),
        this.Ki.N().alignLabels && this.ym(i, h, t)
    }
    ym(t, i, s) {
        if (this.Uv === null)
            return;
        const e = t.filter((r => r.Ei() <= s))
          , h = t.filter((r => r.Ei() > s));
        e.sort(( (r, o) => o.Ei() - r.Ei())),
        e.length && h.length && h.push(e[0]),
        h.sort(( (r, o) => r.Ei() - o.Ei()));
        for (const r of t) {
            const o = Math.floor(r.$t(i) / 2)
              , l = r.Ei();
            l > -o && l < o && r.Ui(o),
            l > this.Uv.height - o && l < this.Uv.height + o && r.Ui(this.Uv.height - o)
        }
        Qi(e, 1, this.Uv.height, i),
        Qi(h, -1, this.Uv.height, i)
    }
    Sm(t) {
        if (this.Uv === null)
            return;
        const i = this.um()
          , s = this.lm()
          , e = this.Jv ? "right" : "left";
        i.forEach((h => {
            h.qi() && h.Tt(g(this.Ki)).nt(t, s, this.qv, e)
        }
        ))
    }
    xm(t) {
        if (this.Uv === null || this.Ki === null)
            return;
        const i = this.yt.Gv().Qt()
          , s = []
          , e = this.yt.cv()
          , h = i.gd().Ks(e, this.Ki);
        h.length && s.push(h);
        const r = this.lm()
          , o = this.Jv ? "right" : "left";
        s.forEach((l => {
            l.forEach((a => {
                a.Tt(g(this.Ki)).nt(t, r, this.qv, o)
            }
            ))
        }
        ))
    }
    Cm(t) {
        this.Jp.style.cursor = t === 1 ? "ns-resize" : "default"
    }
    do() {
        const t = this.om();
        this.Yv < t && this.yt.Gv().Qt().Ca(),
        this.Yv = t
    }
    _m() {
        return Lt(this.Co.fontSize, this.Co.fontFamily)
    }
}
function hh(n, t) {
    return n.qa?.(t) ?? []
}
function qi(n, t) {
    return n.Ys?.(t) ?? []
}
function Zi(n, t) {
    return n.ds?.(t) ?? []
}
function nh(n, t) {
    return n.Ha?.(t) ?? []
}
class fi {
    constructor(t, i) {
        this.Uv = x({
            width: 0,
            height: 0
        }),
        this.km = null,
        this.Pm = null,
        this.Tm = null,
        this.Rm = null,
        this.Dm = !1,
        this.Im = new P,
        this.Vm = new P,
        this.Bm = 0,
        this.Em = !1,
        this.Am = null,
        this.Lm = !1,
        this.zm = null,
        this.Om = null,
        this.Kv = !1,
        this.Zv = () => {
            this.Kv || this.Nm === null || this.ns().dr()
        }
        ,
        this.Xv = () => {
            this.Kv || this.Nm === null || this.ns().dr()
        }
        ,
        this.Lv = t,
        this.Nm = i,
        this.Nm.nu().i(this.Fm.bind(this), this, !0),
        this.Wm = document.createElement("td"),
        this.Wm.style.padding = "0",
        this.Wm.style.position = "relative";
        const s = document.createElement("div");
        s.style.width = "100%",
        s.style.height = "100%",
        s.style.position = "relative",
        s.style.overflow = "hidden",
        this.Hm = document.createElement("td"),
        this.Hm.style.padding = "0",
        this.Um = document.createElement("td"),
        this.Um.style.padding = "0",
        this.Wm.appendChild(s),
        this.sm = Z(s, x({
            width: 16,
            height: 16
        })),
        this.sm.subscribeSuggestedBitmapSizeChanged(this.Zv);
        const e = this.sm.canvasElement;
        e.style.position = "absolute",
        e.style.zIndex = "1",
        e.style.left = "0",
        e.style.top = "0",
        this.nm = Z(s, x({
            width: 16,
            height: 16
        })),
        this.nm.subscribeSuggestedBitmapSizeChanged(this.Xv);
        const h = this.nm.canvasElement;
        h.style.position = "absolute",
        h.style.zIndex = "2",
        h.style.left = "0",
        h.style.top = "0",
        this.Xp = document.createElement("tr"),
        this.Xp.appendChild(this.Hm),
        this.Xp.appendChild(this.Wm),
        this.Xp.appendChild(this.Um),
        this.$m(),
        this.$p = new Ot(this.nm.canvasElement,this,{
            dp: () => this.Am === null && !this.Lv.N().handleScroll.vertTouchDrag,
            fp: () => this.Am === null && !this.Lv.N().handleScroll.horzTouchDrag
        })
    }
    m() {
        this.km !== null && this.km.m(),
        this.Pm !== null && this.Pm.m(),
        this.Tm = null,
        this.nm.unsubscribeSuggestedBitmapSizeChanged(this.Xv),
        tt(this.nm.canvasElement),
        this.nm.dispose(),
        this.sm.unsubscribeSuggestedBitmapSizeChanged(this.Zv),
        tt(this.sm.canvasElement),
        this.sm.dispose(),
        this.Nm !== null && (this.Nm.nu().u(this),
        this.Nm.m()),
        this.$p.m()
    }
    cv() {
        return g(this.Nm)
    }
    qm(t) {
        this.Nm !== null && this.Nm.nu().u(this),
        this.Nm = t,
        this.Nm !== null && this.Nm.nu().i(fi.prototype.Fm.bind(this), this, !0),
        this.$m(),
        this.Lv.Zp().indexOf(this) === this.Lv.Zp().length - 1 ? (this.Tm = this.Tm ?? new eh(this.Wm,this.Lv),
        this.Tm.kt()) : (this.Tm?.Ov(),
        this.Tm = null)
    }
    Gv() {
        return this.Lv
    }
    iv() {
        return this.Xp
    }
    $m() {
        if (this.Nm !== null && (this.jm(),
        this.ns().tn().length !== 0)) {
            if (this.km !== null) {
                const t = this.Nm.U_();
                this.km.cs(g(t))
            }
            if (this.Pm !== null) {
                const t = this.Nm.q_();
                this.Pm.cs(g(t))
            }
        }
    }
    Ym() {
        this.km !== null && this.km.kt(),
        this.Pm !== null && this.Pm.kt()
    }
    E_() {
        return this.Nm !== null ? this.Nm.E_() : 0
    }
    A_(t) {
        this.Nm && this.Nm.A_(t)
    }
    lp(t) {
        if (!this.Nm)
            return;
        this.Km();
        const i = t.localX
          , s = t.localY;
        this.Zm(i, s, t)
    }
    Pp(t) {
        this.Km(),
        this.Gm(),
        this.Zm(t.localX, t.localY, t)
    }
    op(t) {
        if (!this.Nm)
            return;
        this.Km();
        const i = t.localX
          , s = t.localY;
        this.Zm(i, s, t)
    }
    Sp(t) {
        this.Nm !== null && (this.Km(),
        this.Xm(t))
    }
    ip(t) {
        this.Nm !== null && this.Jm(this.Vm, t)
    }
    Xf(t) {
        this.ip(t)
    }
    mp(t) {
        this.Km(),
        this.Qm(t),
        this.Zm(t.localX, t.localY, t)
    }
    bp(t) {
        this.Nm !== null && (this.Km(),
        this.Em = !1,
        this.tw(t))
    }
    Mp(t) {
        this.Nm !== null && this.Xm(t)
    }
    Op(t) {
        if (this.Em = !0,
        this.Am === null) {
            const i = {
                x: t.localX,
                y: t.localY
            };
            this.iw(i, i, t)
        }
    }
    zp(t) {
        this.Nm !== null && (this.Km(),
        this.Nm.Qt().vd(null),
        this.sw())
    }
    nw() {
        return this.Im
    }
    ew() {
        return this.Vm
    }
    Ip() {
        this.Bm = 1,
        this.ns().dn()
    }
    Vp(t, i) {
        if (!this.Lv.N().handleScale.pinch)
            return;
        const s = 5 * (i - this.Bm);
        this.Bm = i,
        this.ns().Td(t._t, s)
    }
    yp(t) {
        this.Em = !1,
        this.Lm = this.Am !== null,
        this.Gm();
        const i = this.ns().gd();
        this.Am !== null && i.It() && (this.zm = {
            x: i.si(),
            y: i.ni()
        },
        this.Am = {
            x: t.localX,
            y: t.localY
        })
    }
    pp(t) {
        if (this.Nm === null)
            return;
        const i = t.localX
          , s = t.localY;
        if (this.Am === null)
            this.Qm(t);
        else {
            this.Lm = !1;
            const e = g(this.zm)
              , h = e.x + (i - this.Am.x)
              , r = e.y + (s - this.Am.y);
            this.Zm(h, r, t)
        }
    }
    gp(t) {
        this.Gv().N().trackingMode.exitMode === 0 && (this.Lm = !0),
        this.rw(),
        this.tw(t)
    }
    Qn(t, i) {
        const s = this.Nm;
        return s === null ? null : ks(s, t, i)
    }
    hw(t, i) {
        g(i === "left" ? this.km : this.Pm).dm(x({
            width: t,
            height: this.Uv.height
        }))
    }
    sv() {
        return this.Uv
    }
    dm(t) {
        Q(this.Uv, t) || (this.Uv = t,
        this.Kv = !0,
        this.sm.resizeCanvasElement(t),
        this.nm.resizeCanvasElement(t),
        this.Kv = !1,
        this.Wm.style.width = t.width + "px",
        this.Wm.style.height = t.height + "px")
    }
    aw() {
        const t = g(this.Nm);
        t.H_(t.U_()),
        t.H_(t.q_());
        for (const i of t.Sl())
            if (t.Zn(i)) {
                const s = i.Ft();
                s !== null && t.H_(s),
                i.Ws()
            }
        for (const i of t.ru())
            i.Ws()
    }
    nv() {
        return this.sm.bitmapSize
    }
    ev(t, i, s, e) {
        const h = this.nv();
        if (h.width > 0 && h.height > 0 && (t.drawImage(this.sm.canvasElement, i, s),
        e)) {
            const r = this.nm.canvasElement;
            t !== null && t.drawImage(r, i, s)
        }
    }
    pm(t) {
        if (t === 0 || this.Nm === null)
            return;
        t > 1 && this.aw(),
        this.km !== null && this.km.pm(t),
        this.Pm !== null && this.Pm.pm(t);
        const i = {
            colorSpace: this.Lv.N().layout.colorSpace
        };
        if (t !== 1) {
            this.sm.applySuggestedBitmapSize();
            const e = H(this.sm, i);
            e !== null && (e.useBitmapCoordinateSpace((h => {
                this.wm(h)
            }
            )),
            this.Nm && (this.lw(e, hh),
            this.ow(e),
            this.lw(e, qi),
            this.lw(e, Zi)))
        }
        this.nm.applySuggestedBitmapSize();
        const s = H(this.nm, i);
        s !== null && (s.useBitmapCoordinateSpace(( ({context: e, bitmapSize: h}) => {
            e.clearRect(0, 0, h.width, h.height)
        }
        )),
        this._w(s),
        this.lw(s, nh),
        this.lw(s, Zi))
    }
    uw() {
        return this.km
    }
    cw() {
        return this.Pm
    }
    Mm(t, i) {
        this.lw(t, i)
    }
    Fm() {
        this.Nm !== null && this.Nm.nu().u(this),
        this.Nm = null
    }
    Xm(t) {
        this.Jm(this.Im, t)
    }
    Jm(t, i) {
        const s = i.localX
          , e = i.localY;
        t.v() && t.p(this.ns().Et().wc(s), {
            x: s,
            y: e
        }, i)
    }
    wm({context: t, bitmapSize: i}) {
        const {width: s, height: e} = i
          , h = this.ns()
          , r = h.$()
          , o = h.Kd();
        r === o ? It(t, 0, 0, s, e, o) : bs(t, 0, 0, s, e, r, o)
    }
    ow(t) {
        const i = g(this.Nm)
          , s = i.eu().pr().Tt(i);
        s !== null && s.nt(t, !1)
    }
    _w(t) {
        this.dw(t, qi, jt, this.ns().gd())
    }
    lw(t, i) {
        const s = g(this.Nm)
          , e = s.Dt()
          , h = s.ru();
        for (const r of h)
            this.dw(t, i, ai, r);
        for (const r of e)
            this.dw(t, i, ai, r);
        for (const r of h)
            this.dw(t, i, jt, r);
        for (const r of e)
            this.dw(t, i, jt, r)
    }
    dw(t, i, s, e) {
        const h = g(this.Nm)
          , r = h.Qt().pd()
          , o = r !== null && r.hu === e
          , l = r !== null && o && r.au !== void 0 ? r.au.ie : void 0;
        ui(i, (a => s(a, t, o, l)), e, h)
    }
    jm() {
        if (this.Nm === null)
            return;
        const t = this.Lv
          , i = this.Nm.U_().N().visible
          , s = this.Nm.q_().N().visible;
        i || this.km === null || (this.Hm.removeChild(this.km.iv()),
        this.km.m(),
        this.km = null),
        s || this.Pm === null || (this.Um.removeChild(this.Pm.iv()),
        this.Pm.m(),
        this.Pm = null);
        const e = t.Qt().Nd();
        i && this.km === null && (this.km = new Hi(this,t.N(),e,"left"),
        this.Hm.appendChild(this.km.iv())),
        s && this.Pm === null && (this.Pm = new Hi(this,t.N(),e,"right"),
        this.Um.appendChild(this.Pm.iv()))
    }
    fw(t) {
        return t.Np && this.Em || this.Am !== null
    }
    Zm(t, i, s) {
        t = Math.max(0, Math.min(t, this.Uv.width - 1)),
        i = Math.max(0, Math.min(i, this.Uv.height - 1)),
        this.ns().Ad(t, i, s, g(this.Nm))
    }
    sw() {
        this.ns().zd()
    }
    rw() {
        this.Lm && (this.Am = null,
        this.sw())
    }
    iw(t, i, s) {
        this.Am = t,
        this.Lm = !1,
        this.Zm(i.x, i.y, s);
        const e = this.ns().gd();
        this.zm = {
            x: e.si(),
            y: e.ni()
        }
    }
    ns() {
        return this.Lv.Qt()
    }
    tw(t) {
        if (!this.Dm)
            return;
        const i = this.ns()
          , s = this.cv();
        if (i.X_(s, s.Rs()),
        this.Rm = null,
        this.Dm = !1,
        i.Vd(),
        this.Om !== null) {
            const e = performance.now()
              , h = i.Et();
            this.Om.fe(h.Cc(), e),
            this.Om.Ec(e) || i.vn(this.Om)
        }
    }
    Km() {
        this.Am = null
    }
    Gm() {
        if (this.Nm) {
            if (this.ns().dn(),
            document.activeElement !== document.body && document.activeElement !== document.documentElement)
                g(document.activeElement).blur();
            else {
                const t = document.getSelection();
                t !== null && t.removeAllRanges()
            }
            !this.Nm.Rs().Gi() && this.ns().Et().Gi()
        }
    }
    Qm(t) {
        if (this.Nm === null)
            return;
        const i = this.ns()
          , s = i.Et();
        if (s.Gi())
            return;
        const e = this.Lv.N()
          , h = e.handleScroll
          , r = e.kineticScroll;
        if ((!h.pressedMouseMove || t.Np) && (!h.horzTouchDrag && !h.vertTouchDrag || !t.Np))
            return;
        const o = this.Nm.Rs()
          , l = performance.now();
        if (this.Rm !== null || this.fw(t) || (this.Rm = {
            x: t.clientX,
            y: t.clientY,
            cf: l,
            pw: t.localX,
            mw: t.localY
        }),
        this.Rm !== null && !this.Dm && (this.Rm.x !== t.clientX || this.Rm.y !== t.clientY)) {
            if (t.Np && r.touch || !t.Np && r.mouse) {
                const a = s.ul();
                this.Om = new sh(.2 / a,7 / a,.997,15 / a),
                this.Om.Dv(s.Cc(), this.Rm.cf)
            } else
                this.Om = null;
            o.Gi() || i.Z_(this.Nm, o, t.localY),
            i.Dd(t.localX),
            this.Dm = !0
        }
        this.Dm && (o.Gi() || i.G_(this.Nm, o, t.localY),
        i.Id(t.localX),
        this.Om !== null && this.Om.Dv(s.Cc(), l))
    }
}
class ts {
    constructor(t, i, s, e, h) {
        this.xt = !0,
        this.Uv = x({
            width: 0,
            height: 0
        }),
        this.Zv = () => this.pm(3),
        this.Jv = t === "left",
        this.hd = s.Nd,
        this.Ps = i,
        this.ww = e,
        this.gw = h,
        this.Jp = document.createElement("div"),
        this.Jp.style.width = "25px",
        this.Jp.style.height = "100%",
        this.Jp.style.overflow = "hidden",
        this.sm = Z(this.Jp, x({
            width: 16,
            height: 16
        })),
        this.sm.subscribeSuggestedBitmapSizeChanged(this.Zv)
    }
    m() {
        this.sm.unsubscribeSuggestedBitmapSizeChanged(this.Zv),
        tt(this.sm.canvasElement),
        this.sm.dispose()
    }
    iv() {
        return this.Jp
    }
    sv() {
        return this.Uv
    }
    dm(t) {
        Q(this.Uv, t) || (this.Uv = t,
        this.sm.resizeCanvasElement(t),
        this.Jp.style.width = `${t.width}px`,
        this.Jp.style.height = `${t.height}px`,
        this.xt = !0)
    }
    pm(t) {
        if (t < 3 && !this.xt || this.Uv.width === 0 || this.Uv.height === 0)
            return;
        this.xt = !1,
        this.sm.applySuggestedBitmapSize();
        const i = H(this.sm, {
            colorSpace: this.Ps.layout.colorSpace
        });
        i !== null && i.useBitmapCoordinateSpace((s => {
            this.wm(s),
            this.gm(s)
        }
        ))
    }
    nv() {
        return this.sm.bitmapSize
    }
    ev(t, i, s) {
        const e = this.nv();
        e.width > 0 && e.height > 0 && t.drawImage(this.sm.canvasElement, i, s)
    }
    gm({context: t, bitmapSize: i, horizontalPixelRatio: s, verticalPixelRatio: e}) {
        if (!this.ww())
            return;
        t.fillStyle = this.Ps.timeScale.borderColor;
        const h = Math.floor(this.hd.N().S * s)
          , r = Math.floor(this.hd.N().S * e)
          , o = this.Jv ? i.width - h : 0;
        t.fillRect(o, 0, h, r)
    }
    wm({context: t, bitmapSize: i}) {
        It(t, 0, 0, i.width, i.height, this.gw())
    }
}
function mi(n) {
    return t => t.Ka?.(n) ?? []
}
const rh = mi("normal")
  , oh = mi("top")
  , lh = mi("bottom");
class ah {
    constructor(t, i) {
        this.Mw = null,
        this.bw = null,
        this.M = null,
        this.Sw = !1,
        this.Uv = x({
            width: 0,
            height: 0
        }),
        this.xw = new P,
        this.qv = new zt(5),
        this.Kv = !1,
        this.Zv = () => {
            this.Kv || this.Lv.Qt().dr()
        }
        ,
        this.Xv = () => {
            this.Kv || this.Lv.Qt().dr()
        }
        ,
        this.Lv = t,
        this.cu = i,
        this.Ps = t.N().layout,
        this.Vv = document.createElement("tr"),
        this.Cw = document.createElement("td"),
        this.Cw.style.padding = "0",
        this.yw = document.createElement("td"),
        this.yw.style.padding = "0",
        this.Jp = document.createElement("td"),
        this.Jp.style.height = "25px",
        this.Jp.style.padding = "0",
        this.kw = document.createElement("div"),
        this.kw.style.width = "100%",
        this.kw.style.height = "100%",
        this.kw.style.position = "relative",
        this.kw.style.overflow = "hidden",
        this.Jp.appendChild(this.kw),
        this.sm = Z(this.kw, x({
            width: 16,
            height: 16
        })),
        this.sm.subscribeSuggestedBitmapSizeChanged(this.Zv);
        const s = this.sm.canvasElement;
        s.style.position = "absolute",
        s.style.zIndex = "1",
        s.style.left = "0",
        s.style.top = "0",
        this.nm = Z(this.kw, x({
            width: 16,
            height: 16
        })),
        this.nm.subscribeSuggestedBitmapSizeChanged(this.Xv);
        const e = this.nm.canvasElement;
        e.style.position = "absolute",
        e.style.zIndex = "2",
        e.style.left = "0",
        e.style.top = "0",
        this.Vv.appendChild(this.Cw),
        this.Vv.appendChild(this.Jp),
        this.Vv.appendChild(this.yw),
        this.Pw(),
        this.Lv.Qt().B_().i(this.Pw.bind(this), this),
        this.$p = new Ot(this.nm.canvasElement,this,{
            dp: () => !0,
            fp: () => !this.Lv.N().handleScroll.horzTouchDrag
        })
    }
    m() {
        this.$p.m(),
        this.Mw !== null && this.Mw.m(),
        this.bw !== null && this.bw.m(),
        this.nm.unsubscribeSuggestedBitmapSizeChanged(this.Xv),
        tt(this.nm.canvasElement),
        this.nm.dispose(),
        this.sm.unsubscribeSuggestedBitmapSizeChanged(this.Zv),
        tt(this.sm.canvasElement),
        this.sm.dispose()
    }
    iv() {
        return this.Vv
    }
    Tw() {
        return this.Mw
    }
    Rw() {
        return this.bw
    }
    Pp(t) {
        if (this.Sw)
            return;
        this.Sw = !0;
        const i = this.Lv.Qt();
        !i.Et().Gi() && this.Lv.N().handleScale.axisPressedMouseMove.time && i.Pd(t.localX)
    }
    yp(t) {
        this.Pp(t)
    }
    Tp() {
        const t = this.Lv.Qt();
        !t.Et().Gi() && this.Sw && (this.Sw = !1,
        this.Lv.N().handleScale.axisPressedMouseMove.time && t.Ed())
    }
    mp(t) {
        const i = this.Lv.Qt();
        !i.Et().Gi() && this.Lv.N().handleScale.axisPressedMouseMove.time && i.Bd(t.localX)
    }
    pp(t) {
        this.mp(t)
    }
    bp() {
        this.Sw = !1;
        const t = this.Lv.Qt();
        t.Et().Gi() && !this.Lv.N().handleScale.axisPressedMouseMove.time || t.Ed()
    }
    gp() {
        this.bp()
    }
    ip() {
        this.Lv.N().handleScale.axisDoubleClickReset.time && this.Lv.Qt().wn()
    }
    Xf() {
        this.ip()
    }
    lp() {
        this.Lv.Qt().N().handleScale.axisPressedMouseMove.time && this.Cm(1)
    }
    zp() {
        this.Cm(0)
    }
    sv() {
        return this.Uv
    }
    Dw() {
        return this.xw
    }
    Iw(t, i, s) {
        Q(this.Uv, t) || (this.Uv = t,
        this.Kv = !0,
        this.sm.resizeCanvasElement(t),
        this.nm.resizeCanvasElement(t),
        this.Kv = !1,
        this.Jp.style.width = `${t.width}px`,
        this.Jp.style.height = `${t.height}px`,
        this.xw.p(t)),
        this.Mw !== null && this.Mw.dm(x({
            width: i,
            height: t.height
        })),
        this.bw !== null && this.bw.dm(x({
            width: s,
            height: t.height
        }))
    }
    Vw() {
        const t = this.Bw();
        return Math.ceil(t.S + t.C + t.k + t.A + t.I + t.Ew)
    }
    kt() {
        this.Lv.Qt().Et().Vl()
    }
    nv() {
        return this.sm.bitmapSize
    }
    ev(t, i, s, e) {
        const h = this.nv();
        if (h.width > 0 && h.height > 0 && (t.drawImage(this.sm.canvasElement, i, s),
        e)) {
            const r = this.nm.canvasElement;
            t.drawImage(r, i, s)
        }
    }
    pm(t) {
        if (t === 0)
            return;
        const i = {
            colorSpace: this.Ps.colorSpace
        };
        if (t !== 1) {
            this.sm.applySuggestedBitmapSize();
            const e = H(this.sm, i);
            e !== null && (e.useBitmapCoordinateSpace((h => {
                this.wm(h),
                this.gm(h),
                this.Aw(e, lh)
            }
            )),
            this.bm(e),
            this.Aw(e, rh)),
            this.Mw !== null && this.Mw.pm(t),
            this.bw !== null && this.bw.pm(t)
        }
        this.nm.applySuggestedBitmapSize();
        const s = H(this.nm, i);
        s !== null && (s.useBitmapCoordinateSpace(( ({context: e, bitmapSize: h}) => {
            e.clearRect(0, 0, h.width, h.height)
        }
        )),
        this.Lw([...this.Lv.Qt().tn(), this.Lv.Qt().gd()], s),
        this.Aw(s, oh))
    }
    Aw(t, i) {
        const s = this.Lv.Qt().tn();
        for (const e of s)
            ui(i, (h => ai(h, t, !1, void 0)), e, void 0);
        for (const e of s)
            ui(i, (h => jt(h, t, !1, void 0)), e, void 0)
    }
    wm({context: t, bitmapSize: i}) {
        It(t, 0, 0, i.width, i.height, this.Lv.Qt().Kd())
    }
    gm({context: t, bitmapSize: i, verticalPixelRatio: s}) {
        if (this.Lv.N().timeScale.borderVisible) {
            t.fillStyle = this.zw();
            const e = Math.max(1, Math.floor(this.Bw().S * s));
            t.fillRect(0, 0, i.width, e)
        }
    }
    bm(t) {
        const i = this.Lv.Qt().Et()
          , s = i.Vl();
        if (!s || s.length === 0)
            return;
        const e = this.cu.maxTickMarkWeight(s)
          , h = this.Bw()
          , r = i.N();
        r.borderVisible && r.ticksVisible && t.useBitmapCoordinateSpace(( ({context: o, horizontalPixelRatio: l, verticalPixelRatio: a}) => {
            o.strokeStyle = this.zw(),
            o.fillStyle = this.zw();
            const u = Math.max(1, Math.floor(l))
              , c = Math.floor(.5 * l);
            o.beginPath();
            const d = Math.round(h.C * a);
            for (let m = s.length; m--; ) {
                const f = Math.round(s[m].coord * l);
                o.rect(f - c, 0, u, d)
            }
            o.fill()
        }
        )),
        t.useMediaCoordinateSpace(( ({context: o}) => {
            const l = h.S + h.C + h.A + h.k / 2;
            o.textAlign = "center",
            o.textBaseline = "middle",
            o.fillStyle = this.H(),
            o.font = this._m();
            for (const a of s)
                if (a.weight < e) {
                    const u = a.needAlignCoordinate ? this.Ow(o, a.coord, a.label) : a.coord;
                    o.fillText(a.label, u, l)
                }
            this.Lv.N().timeScale.allowBoldLabels && (o.font = this.Nw());
            for (const a of s)
                if (a.weight >= e) {
                    const u = a.needAlignCoordinate ? this.Ow(o, a.coord, a.label) : a.coord;
                    o.fillText(a.label, u, l)
                }
        }
        ))
    }
    Ow(t, i, s) {
        const e = this.qv.Ii(t, s)
          , h = e / 2
          , r = Math.floor(i - h) + .5;
        return r < 0 ? i += Math.abs(0 - r) : r + e > this.Uv.width && (i -= Math.abs(this.Uv.width - (r + e))),
        i
    }
    Lw(t, i) {
        const s = this.Bw();
        for (const e of t)
            for (const h of e.fs())
                h.Tt().nt(i, s)
    }
    zw() {
        return this.Lv.N().timeScale.borderColor
    }
    H() {
        return this.Ps.textColor
    }
    F() {
        return this.Ps.fontSize
    }
    _m() {
        return Lt(this.F(), this.Ps.fontFamily)
    }
    Nw() {
        return Lt(this.F(), this.Ps.fontFamily, "bold")
    }
    Bw() {
        this.M === null && (this.M = {
            S: 1,
            L: NaN,
            A: NaN,
            I: NaN,
            ts: NaN,
            C: 5,
            k: NaN,
            P: "",
            Qi: new zt,
            Ew: 0
        });
        const t = this.M
          , i = this._m();
        if (t.P !== i) {
            const s = this.F();
            t.k = s,
            t.P = i,
            t.A = 3 * s / 12,
            t.I = 3 * s / 12,
            t.ts = 9 * s / 12,
            t.L = 0,
            t.Ew = 4 * s / 12,
            t.Qi.On()
        }
        return this.M
    }
    Cm(t) {
        this.Jp.style.cursor = t === 1 ? "ew-resize" : "default"
    }
    Pw() {
        const t = this.Lv.Qt()
          , i = t.N();
        i.leftPriceScale.visible || this.Mw === null || (this.Cw.removeChild(this.Mw.iv()),
        this.Mw.m(),
        this.Mw = null),
        i.rightPriceScale.visible || this.bw === null || (this.yw.removeChild(this.bw.iv()),
        this.bw.m(),
        this.bw = null);
        const s = {
            Nd: this.Lv.Qt().Nd()
        }
          , e = () => i.leftPriceScale.borderVisible && t.Et().N().borderVisible
          , h = () => t.Kd();
        i.leftPriceScale.visible && this.Mw === null && (this.Mw = new ts("left",i,s,e,h),
        this.Cw.appendChild(this.Mw.iv())),
        i.rightPriceScale.visible && this.bw === null && (this.bw = new ts("right",i,s,e,h),
        this.yw.appendChild(this.bw.iv()))
    }
}
const uh = !!ut && !!navigator.userAgentData && navigator.userAgentData.brands.some((n => n.brand.includes("Chromium"))) && !!ut && (navigator?.userAgentData?.platform ? navigator.userAgentData.platform === "Windows" : navigator.userAgent.toLowerCase().indexOf("win") >= 0);
class ch {
    constructor(t, i, s) {
        var e;
        this.Fw = [],
        this.Ww = [],
        this.Hw = 0,
        this.eo = 0,
        this.S_ = 0,
        this.Uw = 0,
        this.$w = 0,
        this.qw = null,
        this.jw = !1,
        this.Im = new P,
        this.Vm = new P,
        this.nd = new P,
        this.Yw = null,
        this.Kw = null,
        this.Av = t,
        this.Ps = i,
        this.cu = s,
        this.Vv = document.createElement("div"),
        this.Vv.classList.add("tv-lightweight-charts"),
        this.Vv.style.overflow = "hidden",
        this.Vv.style.direction = "ltr",
        this.Vv.style.width = "100%",
        this.Vv.style.height = "100%",
        (e = this.Vv).style.userSelect = "none",
        e.style.webkitUserSelect = "none",
        e.style.msUserSelect = "none",
        e.style.MozUserSelect = "none",
        e.style.webkitTapHighlightColor = "transparent",
        this.Zw = document.createElement("table"),
        this.Zw.setAttribute("cellspacing", "0"),
        this.Vv.appendChild(this.Zw),
        this.Gw = this.Xw.bind(this),
        hi(this.Ps) && this.Jw(!0),
        this.ns = new Xe(this.rd.bind(this),this.Ps,s),
        this.Qt().Md().i(this.Qw.bind(this), this),
        this.tg = new ah(this,this.cu),
        this.Zw.appendChild(this.tg.iv());
        const h = i.autoSize && this.ig();
        let r = this.Ps.width
          , o = this.Ps.height;
        if (h || r === 0 || o === 0) {
            const l = t.getBoundingClientRect();
            r = r || l.width,
            o = o || l.height
        }
        this.sg(r, o),
        this.ng(),
        t.appendChild(this.Vv),
        this.eg(),
        this.ns.Et().Oc().i(this.ns.Ca.bind(this.ns), this),
        this.ns.B_().i(this.ns.Ca.bind(this.ns), this)
    }
    Qt() {
        return this.ns
    }
    N() {
        return this.Ps
    }
    Zp() {
        return this.Fw
    }
    rg() {
        return this.tg
    }
    m() {
        this.Jw(!1),
        this.Hw !== 0 && window.cancelAnimationFrame(this.Hw),
        this.ns.Md().u(this),
        this.ns.Et().Oc().u(this),
        this.ns.B_().u(this),
        this.ns.m();
        for (const t of this.Fw)
            this.Zw.removeChild(t.iv()),
            t.nw().u(this),
            t.ew().u(this),
            t.m();
        this.Fw = [];
        for (const t of this.Ww)
            this.hg(t);
        this.Ww = [],
        g(this.tg).m(),
        this.Vv.parentElement !== null && this.Vv.parentElement.removeChild(this.Vv),
        this.nd.m(),
        this.Im.m(),
        this.Vm.m(),
        this.ag()
    }
    sg(t, i, s=!1) {
        if (this.eo === i && this.S_ === t)
            return;
        const e = (function(o) {
            const l = Math.floor(o.width)
              , a = Math.floor(o.height);
            return x({
                width: l - l % 2,
                height: a - a % 2
            })
        }
        )(x({
            width: t,
            height: i
        }));
        this.eo = e.height,
        this.S_ = e.width;
        const h = this.eo + "px"
          , r = this.S_ + "px";
        g(this.Vv).style.height = h,
        g(this.Vv).style.width = r,
        this.Zw.style.height = h,
        this.Zw.style.width = r,
        s ? this.lg(L.yn(), performance.now()) : this.ns.Ca()
    }
    pm(t) {
        t === void 0 && (t = L.yn());
        for (let i = 0; i < this.Fw.length; i++)
            this.Fw[i].pm(t.un(i).an);
        this.Ps.timeScale.visible && this.tg.pm(t._n())
    }
    cr(t) {
        const i = hi(this.Ps);
        this.ns.cr(t);
        const s = hi(this.Ps);
        s !== i && this.Jw(s),
        t.layout?.panes && this.og(),
        this.eg(),
        this._g(t)
    }
    nw() {
        return this.Im
    }
    ew() {
        return this.Vm
    }
    Md() {
        return this.nd
    }
    ug(t=!1) {
        this.qw !== null && (this.lg(this.qw, performance.now()),
        this.qw = null);
        const i = this.cg(null)
          , s = document.createElement("canvas");
        s.width = i.width,
        s.height = i.height;
        const e = g(s.getContext("2d"));
        return this.cg(e, t),
        s
    }
    dg(t) {
        return t === "left" && !this.fg() || t === "right" && !this.pg() || this.Fw.length === 0 ? 0 : g(t === "left" ? this.Fw[0].uw() : this.Fw[0].cw()).fm()
    }
    vg() {
        return this.Ps.autoSize && this.Yw !== null
    }
    hv() {
        return this.Vv
    }
    mg(t) {
        this.Kw = t,
        this.Kw ? this.hv().style.setProperty("cursor", t) : this.hv().style.removeProperty("cursor")
    }
    wg() {
        return this.Kw
    }
    gg(t) {
        return T(this.Fw[t]).sv()
    }
    og() {
        this.Ww.forEach((t => {
            t.kt()
        }
        ))
    }
    _g(t) {
        (t.autoSize !== void 0 || !this.Yw || t.width === void 0 && t.height === void 0) && (t.autoSize && !this.Yw && this.ig(),
        t.autoSize === !1 && this.Yw !== null && this.ag(),
        t.autoSize || t.width === void 0 && t.height === void 0 || this.sg(t.width || this.S_, t.height || this.eo))
    }
    cg(t, i) {
        let s = 0
          , e = 0;
        const h = this.Fw[0]
          , r = (l, a) => {
            let u = 0;
            for (let c = 0; c < this.Fw.length; c++) {
                const d = this.Fw[c]
                  , m = g(l === "left" ? d.uw() : d.cw())
                  , f = m.nv();
                if (t !== null && m.ev(t, a, u, i),
                u += f.height,
                c < this.Fw.length - 1) {
                    const p = this.Ww[c]
                      , w = p.nv();
                    t !== null && p.ev(t, a, u),
                    u += w.height
                }
            }
        }
        ;
        this.fg() && (r("left", 0),
        s += g(h.uw()).nv().width);
        for (let l = 0; l < this.Fw.length; l++) {
            const a = this.Fw[l]
              , u = a.nv();
            if (t !== null && a.ev(t, s, e, i),
            e += u.height,
            l < this.Fw.length - 1) {
                const c = this.Ww[l]
                  , d = c.nv();
                t !== null && c.ev(t, s, e),
                e += d.height
            }
        }
        s += h.nv().width,
        this.pg() && (r("right", s),
        s += g(h.cw()).nv().width);
        const o = (l, a, u) => {
            g(l === "left" ? this.tg.Tw() : this.tg.Rw()).ev(g(t), a, u)
        }
        ;
        if (this.Ps.timeScale.visible) {
            const l = this.tg.nv();
            if (t !== null) {
                let a = 0;
                this.fg() && (o("left", a, e),
                a = g(h.uw()).nv().width),
                this.tg.ev(t, a, e, i),
                a += l.width,
                this.pg() && o("right", a, e)
            }
            e += l.height
        }
        return x({
            width: s,
            height: e
        })
    }
    Mg() {
        let t = 0
          , i = 0
          , s = 0;
        for (const w of this.Fw)
            this.fg() && (i = Math.max(i, g(w.uw()).om(), this.Ps.leftPriceScale.minimumWidth)),
            this.pg() && (s = Math.max(s, g(w.cw()).om(), this.Ps.rightPriceScale.minimumWidth)),
            t += w.E_();
        i = li(i),
        s = li(s);
        const e = this.S_
          , h = this.eo
          , r = Math.max(e - i - s, 0)
          , o = 1 * this.Ww.length
          , l = this.Ps.timeScale.visible;
        let a = l ? Math.max(this.tg.Vw(), this.Ps.timeScale.minimumHeight) : 0;
        var u;
        a = (u = a) + u % 2;
        const c = o + a
          , d = h < c ? 0 : h - c
          , m = d / t;
        let f = 0;
        const p = window.devicePixelRatio || 1;
        for (let w = 0; w < this.Fw.length; ++w) {
            const b = this.Fw[w];
            b.qm(this.ns.Xs()[w]);
            let M = 0
              , y = 0;
            y = w === this.Fw.length - 1 ? Math.ceil((d - f) * p) / p : Math.round(b.E_() * m * p) / p,
            M = Math.max(y, 2),
            f += M,
            b.dm(x({
                width: r,
                height: M
            })),
            this.fg() && b.hw(i, "left"),
            this.pg() && b.hw(s, "right"),
            b.cv() && this.ns.bd(b.cv(), M)
        }
        this.tg.Iw(x({
            width: l ? r : 0,
            height: a
        }), l ? i : 0, l ? s : 0),
        this.ns.L_(r),
        this.Uw !== i && (this.Uw = i),
        this.$w !== s && (this.$w = s)
    }
    Jw(t) {
        t ? this.Vv.addEventListener("wheel", this.Gw, {
            passive: !1
        }) : this.Vv.removeEventListener("wheel", this.Gw)
    }
    bg(t) {
        switch (t.deltaMode) {
        case t.DOM_DELTA_PAGE:
            return 120;
        case t.DOM_DELTA_LINE:
            return 32
        }
        return uh ? 1 / window.devicePixelRatio : 1
    }
    Xw(t) {
        if (!(t.deltaX !== 0 && this.Ps.handleScroll.mouseWheel || t.deltaY !== 0 && this.Ps.handleScale.mouseWheel))
            return;
        const i = this.bg(t)
          , s = i * t.deltaX / 100
          , e = -i * t.deltaY / 100;
        if (t.cancelable && t.preventDefault(),
        e !== 0 && this.Ps.handleScale.mouseWheel) {
            const h = Math.sign(e) * Math.min(1, Math.abs(e))
              , r = t.clientX - this.Vv.getBoundingClientRect().left;
            this.Qt().Td(r, h)
        }
        s !== 0 && this.Ps.handleScroll.mouseWheel && this.Qt().Rd(-80 * s)
    }
    lg(t, i) {
        const s = t._n();
        s === 3 && this.Sg(),
        s !== 3 && s !== 2 || (this.xg(t),
        this.Cg(t, i),
        this.tg.kt(),
        this.Fw.forEach((e => {
            e.Ym()
        }
        )),
        this.qw?._n() === 3 && (this.qw.Sn(t),
        this.Sg(),
        this.xg(this.qw),
        this.Cg(this.qw, i),
        t = this.qw,
        this.qw = null)),
        this.pm(t)
    }
    Cg(t, i) {
        for (const s of t.bn())
            this.xn(s, i)
    }
    xg(t) {
        const i = this.ns.Xs();
        for (let s = 0; s < i.length; s++)
            t.un(s).ln && i[s].tu()
    }
    xn(t, i) {
        const s = this.ns.Et();
        switch (t.fn) {
        case 0:
            s.Fc();
            break;
        case 1:
            s.Wc(t.Wt);
            break;
        case 2:
            s.gn(t.Wt);
            break;
        case 3:
            s.Mn(t.Wt);
            break;
        case 4:
            s.Pc();
            break;
        case 5:
            t.Wt.Ec(i) || s.Mn(t.Wt.Ac(i))
        }
    }
    rd(t) {
        this.qw !== null ? this.qw.Sn(t) : this.qw = t,
        this.jw || (this.jw = !0,
        this.Hw = window.requestAnimationFrame((i => {
            if (this.jw = !1,
            this.Hw = 0,
            this.qw !== null) {
                const s = this.qw;
                this.qw = null,
                this.lg(s, i);
                for (const e of s.bn())
                    if (e.fn === 5 && !e.Wt.Ec(i)) {
                        this.Qt().vn(e.Wt);
                        break
                    }
            }
        }
        )))
    }
    Sg() {
        this.ng()
    }
    hg(t) {
        this.Zw.removeChild(t.iv()),
        t.m()
    }
    ng() {
        const t = this.ns.Xs()
          , i = t.length
          , s = this.Fw.length;
        for (let e = i; e < s; e++) {
            const h = T(this.Fw.pop());
            this.Zw.removeChild(h.iv()),
            h.nw().u(this),
            h.ew().u(this),
            h.m();
            const r = this.Ww.pop();
            r !== void 0 && this.hg(r)
        }
        for (let e = s; e < i; e++) {
            const h = new fi(this,t[e]);
            if (h.nw().i(this.yg.bind(this, h), this),
            h.ew().i(this.kg.bind(this, h), this),
            this.Fw.push(h),
            e > 0) {
                const r = new ih(this,e - 1,e);
                this.Ww.push(r),
                this.Zw.insertBefore(r.iv(), this.tg.iv())
            }
            this.Zw.insertBefore(h.iv(), this.tg.iv())
        }
        for (let e = 0; e < i; e++) {
            const h = t[e]
              , r = this.Fw[e];
            r.cv() !== h ? r.qm(h) : r.$m()
        }
        this.eg(),
        this.Mg()
    }
    Pg(t, i, s, e) {
        const h = new Map;
        t !== null && this.ns.tn().forEach((c => {
            const d = c.qs().$s(t);
            d !== null && h.set(c, d)
        }
        ));
        let r;
        if (t !== null) {
            const c = this.ns.Et().es(t)?.originalTime;
            c !== void 0 && (r = c)
        }
        const o = this.Qt().pd()
          , l = o !== null && o.hu instanceof Vt ? o.hu : void 0
          , a = o !== null && o.au !== void 0 ? o.au.te : void 0
          , u = this.Tg(e);
        return {
            Gr: r,
            js: t ?? void 0,
            Rg: i ?? void 0,
            Dg: u !== -1 ? u : void 0,
            Ig: l,
            Vg: h,
            Bg: a,
            Eg: s ?? void 0
        }
    }
    Tg(t) {
        let i = -1;
        if (t)
            i = this.Fw.indexOf(t);
        else {
            const s = this.Qt().gd().Gs();
            s !== null && (i = this.Qt().Xs().indexOf(s))
        }
        return i
    }
    yg(t, i, s, e) {
        this.Im.p(( () => this.Pg(i, s, e, t)))
    }
    kg(t, i, s, e) {
        this.Vm.p(( () => this.Pg(i, s, e, t)))
    }
    Qw(t, i, s) {
        this.mg(this.Qt().pd()?.ou ?? null),
        this.nd.p(( () => this.Pg(t, i, s)))
    }
    eg() {
        const t = this.Ps.timeScale.visible ? "" : "none";
        this.tg.iv().style.display = t
    }
    fg() {
        return this.Fw[0].cv().U_().N().visible
    }
    pg() {
        return this.Fw[0].cv().q_().N().visible
    }
    ig() {
        return "ResizeObserver"in window && (this.Yw = new ResizeObserver((t => {
            const i = t[t.length - 1];
            i && this.sg(i.contentRect.width, i.contentRect.height)
        }
        )),
        this.Yw.observe(this.Av, {
            box: "border-box"
        }),
        !0)
    }
    ag() {
        this.Yw !== null && this.Yw.disconnect(),
        this.Yw = null
    }
}
function hi(n) {
    return !!(n.handleScroll.mouseWheel || n.handleScale.mouseWheel)
}
function dh(n) {
    return n.open === void 0 && n.value === void 0
}
function fh(n) {
    return (function(t) {
        return t.open !== void 0
    }
    )(n) || (function(t) {
        return t.value !== void 0
    }
    )(n)
}
function is(n, t, i, s) {
    const e = i.value
      , h = {
        js: t,
        wt: n,
        Wt: [e, e, e, e],
        Gr: s
    };
    return i.color !== void 0 && (h.R = i.color),
    h
}
function mh(n, t, i, s) {
    const e = i.value
      , h = {
        js: t,
        wt: n,
        Wt: [e, e, e, e],
        Gr: s
    };
    return i.lineColor !== void 0 && (h.vt = i.lineColor),
    i.topColor !== void 0 && (h.eh = i.topColor),
    i.bottomColor !== void 0 && (h.rh = i.bottomColor),
    h
}
function ph(n, t, i, s) {
    const e = i.value
      , h = {
        js: t,
        wt: n,
        Wt: [e, e, e, e],
        Gr: s
    };
    return i.topLineColor !== void 0 && (h.hh = i.topLineColor),
    i.bottomLineColor !== void 0 && (h.ah = i.bottomLineColor),
    i.topFillColor1 !== void 0 && (h.oh = i.topFillColor1),
    i.topFillColor2 !== void 0 && (h._h = i.topFillColor2),
    i.bottomFillColor1 !== void 0 && (h.uh = i.bottomFillColor1),
    i.bottomFillColor2 !== void 0 && (h.dh = i.bottomFillColor2),
    h
}
function gh(n, t, i, s) {
    const e = {
        js: t,
        wt: n,
        Wt: [i.open, i.high, i.low, i.close],
        Gr: s
    };
    return i.color !== void 0 && (e.R = i.color),
    e
}
function vh(n, t, i, s) {
    const e = {
        js: t,
        wt: n,
        Wt: [i.open, i.high, i.low, i.close],
        Gr: s
    };
    return i.color !== void 0 && (e.R = i.color),
    i.borderColor !== void 0 && (e.Ht = i.borderColor),
    i.wickColor !== void 0 && (e.nh = i.wickColor),
    e
}
function wh(n, t, i, s, e) {
    const h = T(e)(i)
      , r = Math.max(...h)
      , o = Math.min(...h)
      , l = h[h.length - 1]
      , a = [l, r, o, l]
      , {time: u, color: c, ...d} = i;
    return {
        js: t,
        wt: n,
        Wt: a,
        Gr: s,
        le: d,
        R: c
    }
}
function ht(n) {
    return n.Wt !== void 0
}
function ss(n, t) {
    return t.customValues !== void 0 && (n.Ag = t.customValues),
    n
}
function X(n) {
    return (t, i, s, e, h, r) => (function(o, l) {
        return l ? l(o) : dh(o)
    }
    )(s, r) ? ss({
        wt: t,
        js: i,
        Gr: e
    }, s) : ss(n(t, i, s, e, h), s)
}
function es(n) {
    return {
        Candlestick: X(vh),
        Bar: X(gh),
        Area: X(mh),
        Baseline: X(ph),
        Histogram: X(is),
        Line: X(is),
        Custom: X(wh)
    }[n]
}
function hs(n) {
    return {
        js: 0,
        Lg: new Map,
        Ea: n
    }
}
function ns(n, t) {
    if (n !== void 0 && n.length !== 0)
        return {
            zg: t.key(n[0].wt),
            Og: t.key(n[n.length - 1].wt)
        }
}
function rs(n) {
    let t;
    return n.forEach((i => {
        t === void 0 && (t = i.Gr)
    }
    )),
    T(t)
}
class bh {
    constructor(t) {
        this.Ng = new Map,
        this.Fg = new Map,
        this.Wg = new Map,
        this.Hg = [],
        this.cu = t
    }
    m() {
        this.Ng.clear(),
        this.Fg.clear(),
        this.Wg.clear(),
        this.Hg = []
    }
    Ug(t, i) {
        let s = this.Ng.size !== 0
          , e = !1;
        const h = this.Fg.get(t);
        if (h !== void 0)
            if (this.Fg.size === 1)
                s = !1,
                e = !0,
                this.Ng.clear();
            else
                for (const l of this.Hg)
                    l.pointData.Lg.delete(t) && (e = !0);
        let r = [];
        if (i.length !== 0) {
            const l = i.map((m => m.time))
              , a = this.cu.createConverterToInternalObj(i)
              , u = es(t.wh())
              , c = t.rl()
              , d = t.hl();
            r = i.map(( (m, f) => {
                const p = a(m.time)
                  , w = this.cu.key(p);
                let b = this.Ng.get(w);
                b === void 0 && (b = hs(p),
                this.Ng.set(w, b),
                e = !0);
                const M = u(p, b.js, m, l[f], c, d);
                return b.Lg.set(t, M),
                M
            }
            ))
        }
        s && this.$g(),
        this.qg(t, r);
        let o = -1;
        if (e) {
            const l = [];
            this.Ng.forEach((a => {
                l.push({
                    timeWeight: 0,
                    time: a.Ea,
                    pointData: a,
                    originalTime: rs(a.Lg)
                })
            }
            )),
            l.sort(( (a, u) => this.cu.key(a.time) - this.cu.key(u.time))),
            o = this.jg(l)
        }
        return this.Yg(t, o, (function(l, a, u) {
            const c = ns(l, u)
              , d = ns(a, u);
            if (c !== void 0 && d !== void 0)
                return {
                    Kg: !1,
                    Ta: c.Og >= d.Og && c.zg >= d.zg
                }
        }
        )(this.Fg.get(t), h, this.cu))
    }
    Hd(t) {
        return this.Ug(t, [])
    }
    Zg(t, i, s) {
        if (s && t.La())
            throw new Error("Historical updates are not supported when conflation is enabled. Conflation requires data to be processed in order.");
        const e = i;
        (function(b) {
            b.Gr === void 0 && (b.Gr = b.time)
        }
        )(e),
        this.cu.preprocessData(i);
        const h = this.cu.createConverterToInternalObj([i])(i.time)
          , r = this.Wg.get(t);
        if (!s && r !== void 0 && this.cu.key(h) < this.cu.key(r))
            throw new Error(`Cannot update oldest data, last time=${r}, new time=${h}`);
        let o = this.Ng.get(this.cu.key(h));
        if (s && o === void 0)
            throw new Error("Cannot update non-existing data point when historicalUpdate is true");
        const l = o === void 0;
        o === void 0 && (o = hs(h),
        this.Ng.set(this.cu.key(h), o));
        const a = es(t.wh())
          , u = t.rl()
          , c = t.hl()
          , d = a(h, o.js, i, e.Gr, u, c)
          , m = !s && !l && r !== void 0 && this.cu.key(h) === this.cu.key(r);
        o.Lg.set(t, d),
        s ? this.Gg(t, d, o.js) : m && t.La() && ht(d) ? (t.kr(d),
        this.Xg(t, d)) : this.Xg(t, d);
        const f = {
            Ta: ht(d),
            Kg: s
        };
        if (!l)
            return this.Yg(t, -1, f);
        const p = {
            timeWeight: 0,
            time: o.Ea,
            pointData: o,
            originalTime: rs(o.Lg)
        }
          , w = at(this.Hg, this.cu.key(p.time), ( (b, M) => this.cu.key(b.time) < M));
        this.Hg.splice(w, 0, p);
        for (let b = w; b < this.Hg.length; ++b)
            Nt(this.Hg[b].pointData, b);
        return this.cu.fillWeightsForPoints(this.Hg, w),
        this.Yg(t, w, f)
    }
    Jg(t, i) {
        const s = this.Fg.get(t);
        if (s === void 0 || i <= 0)
            return [[], this.Qg()];
        i = Math.min(i, s.length);
        const e = s.splice(-i).reverse();
        s.length === 0 ? this.Wg.delete(t) : this.Wg.set(t, s[s.length - 1].wt);
        for (const h of e) {
            const r = this.Ng.get(this.cu.key(h.wt));
            if (r && (r.Lg.delete(t),
            r.Lg.size === 0)) {
                this.Ng.delete(this.cu.key(r.Ea)),
                this.Hg.splice(r.js, 1);
                for (let o = r.js; o < this.Hg.length; ++o)
                    Nt(this.Hg[o].pointData, o)
            }
        }
        return [e, this.Yg(t, this.Hg.length - 1, {
            Kg: !1,
            Ta: !1
        })]
    }
    Xg(t, i) {
        let s = this.Fg.get(t);
        s === void 0 && (s = [],
        this.Fg.set(t, s));
        const e = s.length !== 0 ? s[s.length - 1] : null;
        e === null || this.cu.key(i.wt) > this.cu.key(e.wt) ? ht(i) && s.push(i) : ht(i) ? s[s.length - 1] = i : s.splice(-1, 1),
        this.Wg.set(t, i.wt)
    }
    Gg(t, i, s) {
        const e = this.Fg.get(t);
        if (e === void 0)
            return;
        const h = at(e, s, ( (r, o) => r.js < o));
        ht(i) ? e[h] = i : e.splice(h, 1)
    }
    qg(t, i) {
        i.length !== 0 ? (this.Fg.set(t, i.filter(ht)),
        this.Wg.set(t, i[i.length - 1].wt)) : (this.Fg.delete(t),
        this.Wg.delete(t))
    }
    $g() {
        for (const t of this.Hg)
            t.pointData.Lg.size === 0 && this.Ng.delete(this.cu.key(t.time))
    }
    jg(t) {
        let i = -1;
        for (let s = 0; s < this.Hg.length && s < t.length; ++s) {
            const e = this.Hg[s]
              , h = t[s];
            if (this.cu.key(e.time) !== this.cu.key(h.time)) {
                i = s;
                break
            }
            h.timeWeight = e.timeWeight,
            Nt(h.pointData, s)
        }
        if (i === -1 && this.Hg.length !== t.length && (i = Math.min(this.Hg.length, t.length)),
        i === -1)
            return -1;
        for (let s = i; s < t.length; ++s)
            Nt(t[s].pointData, s);
        return this.cu.fillWeightsForPoints(t, i),
        this.Hg = t,
        i
    }
    tM() {
        if (this.Fg.size === 0)
            return null;
        let t = 0;
        return this.Fg.forEach((i => {
            i.length !== 0 && (t = Math.max(t, i[i.length - 1].js))
        }
        )),
        t
    }
    Yg(t, i, s) {
        const e = this.Qg();
        if (i !== -1)
            this.Fg.forEach(( (h, r) => {
                e.F_.set(r, {
                    le: h,
                    iM: r === t ? s : void 0
                })
            }
            )),
            this.Fg.has(t) || e.F_.set(t, {
                le: [],
                iM: s
            }),
            e.Et.sM = this.Hg,
            e.Et.nM = i;
        else {
            const h = this.Fg.get(t);
            e.F_.set(t, {
                le: h || [],
                iM: s
            })
        }
        return e
    }
    Qg() {
        return {
            F_: new Map,
            Et: {
                vc: this.tM()
            }
        }
    }
}
function Nt(n, t) {
    n.js = t,
    n.Lg.forEach((i => {
        i.js = t
    }
    ))
}
function Mh(n, t) {
    return n.wt < t
}
function xh(n, t) {
    return t < n.wt
}
function yh(n, t, i) {
    const s = t.Aa()
      , e = t.bi()
      , h = at(n, s, Mh)
      , r = Ps(n, e, xh);
    if (!i)
        return {
            from: h,
            to: r
        };
    let o = h
      , l = r;
    return h > 0 && h < n.length && n[h].wt >= s && (o = h - 1),
    r > 0 && r < n.length && n[r - 1].wt <= e && (l = r + 1),
    {
        from: o,
        to: l
    }
}
class pi {
    constructor(t, i, s) {
        this.eM = !0,
        this.rM = !0,
        this.hM = !0,
        this.aM = [],
        this.lM = null,
        this.oM = -1,
        this.ee = t,
        this.re = i,
        this._M = s
    }
    kt(t) {
        this.eM = !0,
        t === "data" && (this.rM = !0),
        t === "options" && (this.hM = !0)
    }
    Tt() {
        return this.ee.It() ? (this.uM(),
        this.lM === null ? null : this.cM) : null
    }
    dM() {
        this.aM = this.aM.map((t => ({
            ...t,
            ...this.ee.ga().gh(t.wt)
        })))
    }
    fM() {
        this.lM = null
    }
    uM() {
        const t = this.re.Et()
          , i = t.N().enableConflation ? t.Hc() : 0;
        i !== this.oM && (this.rM = !0,
        this.oM = i),
        this.rM && (this.pM(),
        this.rM = !1),
        this.hM && (this.dM(),
        this.hM = !1),
        this.eM && (this.vM(),
        this.eM = !1)
    }
    vM() {
        const t = this.ee.Ft()
          , i = this.re.Et();
        if (this.fM(),
        i.Gi() || t.Gi())
            return;
        const s = i.Ie();
        if (s === null || this.ee.qs().yh() === 0)
            return;
        const e = this.ee.Lt();
        e !== null && (this.lM = yh(this.aM, s, this._M),
        this.mM(t, i, e.Wt),
        this.wM())
    }
}
class _h {
    constructor(t, i) {
        this.gM = t,
        this.Ki = i
    }
    nt(t, i, s) {
        this.gM.draw(t, this.Ki, i, s)
    }
}
class Sh extends pi {
    constructor(t, i, s) {
        super(t, i, !1),
        this.$h = s,
        this.cM = new _h(this.$h.renderer(),(e => {
            const h = t.Lt();
            return h === null ? null : t.Ft().Nt(e, h.Wt)
        }
        ))
    }
    get ma() {
        return this.$h.conflationReducer
    }
    Oa(t) {
        return this.$h.priceValueBuilder(t)
    }
    al(t) {
        return this.$h.isWhitespace(t)
    }
    pM() {
        const t = this.ee.ga();
        this.aM = this.ee.Na().Dh().map((i => ({
            wt: i.js,
            _t: NaN,
            ...t.gh(i.js),
            MM: i.le
        })))
    }
    mM(t, i) {
        i.mc(this.aM, vt(this.lM))
    }
    wM() {
        this.$h.update({
            bars: this.aM.map(Ch),
            barSpacing: this.re.Et().ul(),
            visibleRange: this.lM,
            conflationFactor: this.re.Et().Hc()
        }, this.ee.N())
    }
}
function Ch(n) {
    return {
        x: n._t,
        time: n.wt,
        originalData: n.MM,
        barColor: n.th
    }
}
const Ph = {
    color: "#2196f3"
}
  , Nh = (n, t, i) => {
    const s = $(i);
    return new Sh(n,t,s)
}
;
function gi(n) {
    const t = {
        value: n.Wt[3],
        time: n.Gr
    };
    return n.Ag !== void 0 && (t.customValues = n.Ag),
    t
}
function os(n) {
    const t = gi(n);
    return n.R !== void 0 && (t.color = n.R),
    t
}
function Eh(n) {
    const t = gi(n);
    return n.vt !== void 0 && (t.lineColor = n.vt),
    n.eh !== void 0 && (t.topColor = n.eh),
    n.rh !== void 0 && (t.bottomColor = n.rh),
    t
}
function jh(n) {
    const t = gi(n);
    return n.hh !== void 0 && (t.topLineColor = n.hh),
    n.ah !== void 0 && (t.bottomLineColor = n.ah),
    n.oh !== void 0 && (t.topFillColor1 = n.oh),
    n._h !== void 0 && (t.topFillColor2 = n._h),
    n.uh !== void 0 && (t.bottomFillColor1 = n.uh),
    n.dh !== void 0 && (t.bottomFillColor2 = n.dh),
    t
}
function Fs(n) {
    const t = {
        open: n.Wt[0],
        high: n.Wt[1],
        low: n.Wt[2],
        close: n.Wt[3],
        time: n.Gr
    };
    return n.Ag !== void 0 && (t.customValues = n.Ag),
    t
}
function kh(n) {
    const t = Fs(n);
    return n.R !== void 0 && (t.color = n.R),
    t
}
function Lh(n) {
    const t = Fs(n)
      , {R: i, Ht: s, nh: e} = n;
    return i !== void 0 && (t.color = i),
    s !== void 0 && (t.borderColor = s),
    e !== void 0 && (t.wickColor = e),
    t
}
function kt(n) {
    return {
        Area: Eh,
        Line: os,
        Baseline: jh,
        Histogram: os,
        Bar: kh,
        Candlestick: Lh,
        Custom: zh
    }[n]
}
function zh(n) {
    const t = n.Gr;
    return {
        ...n.le,
        time: t
    }
}
const Rh = {
    vertLine: {
        color: "#9598A1",
        width: 1,
        style: 3,
        visible: !0,
        labelVisible: !0,
        labelBackgroundColor: "#131722"
    },
    horzLine: {
        color: "#9598A1",
        width: 1,
        style: 3,
        visible: !0,
        labelVisible: !0,
        labelBackgroundColor: "#131722"
    },
    mode: 1,
    doNotSnapToHiddenSeriesIndices: !1
}
  , Fh = {
    vertLines: {
        color: "#D6DCDE",
        style: 0,
        visible: !0
    },
    horzLines: {
        color: "#D6DCDE",
        style: 0,
        visible: !0
    }
}
  , Th = {
    background: {
        type: "solid",
        color: "#FFFFFF"
    },
    textColor: "#191919",
    fontSize: 12,
    fontFamily: ws,
    panes: {
        enableResize: !0,
        separatorColor: "#E0E3EB",
        separatorHoverColor: "rgba(178, 181, 189, 0.2)"
    },
    attributionLogo: !0,
    colorSpace: "srgb",
    colorParsers: []
}
  , ni = {
    autoScale: !0,
    mode: 0,
    invertScale: !1,
    alignLabels: !0,
    borderVisible: !0,
    borderColor: "#2B2B43",
    entireTextOnly: !1,
    visible: !1,
    ticksVisible: !1,
    scaleMargins: {
        bottom: .1,
        top: .2
    },
    minimumWidth: 0,
    ensureEdgeTickMarksVisible: !1
}
  , Ih = {
    rightOffset: 0,
    barSpacing: 6,
    minBarSpacing: .5,
    maxBarSpacing: 0,
    fixLeftEdge: !1,
    fixRightEdge: !1,
    lockVisibleTimeRangeOnResize: !1,
    rightBarStaysOnScroll: !1,
    borderVisible: !0,
    borderColor: "#2B2B43",
    visible: !0,
    timeVisible: !1,
    secondsVisible: !0,
    shiftVisibleRangeOnNewBar: !0,
    allowShiftVisibleRangeOnWhitespaceReplacement: !1,
    ticksVisible: !1,
    uniformDistribution: !1,
    minimumHeight: 0,
    allowBoldLabels: !0,
    ignoreWhitespaceIndices: !1,
    enableConflation: !1,
    conflationThresholdFactor: 1,
    precomputeConflationOnInit: !1,
    precomputeConflationPriority: "background"
};
function ls() {
    return {
        addDefaultPane: !0,
        width: 0,
        height: 0,
        autoSize: !1,
        layout: Th,
        crosshair: Rh,
        grid: Fh,
        overlayPriceScales: {
            ...ni
        },
        leftPriceScale: {
            ...ni,
            visible: !1
        },
        rightPriceScale: {
            ...ni,
            visible: !0
        },
        timeScale: Ih,
        localization: {
            locale: ut ? navigator.language : "",
            dateFormat: "dd MMM 'yy"
        },
        handleScroll: {
            mouseWheel: !0,
            pressedMouseMove: !0,
            horzTouchDrag: !0,
            vertTouchDrag: !0
        },
        handleScale: {
            axisPressedMouseMove: {
                time: !0,
                price: !0
            },
            axisDoubleClickReset: {
                time: !0,
                price: !0
            },
            mouseWheel: !0,
            pinch: !0
        },
        kineticScroll: {
            mouse: !1,
            touch: !0
        },
        trackingMode: {
            exitMode: 1
        }
    }
}
class Ts {
    constructor(t, i, s) {
        this.Yp = t,
        this.bM = i,
        this.SM = s ?? 0
    }
    applyOptions(t) {
        this.Yp.Qt().md(this.bM, t, this.SM)
    }
    options() {
        return this.Ki().N()
    }
    width() {
        return Bt(this.bM) ? this.Yp.dg(this.bM) : 0
    }
    setVisibleRange(t) {
        this.setAutoScale(!1),
        this.Ki().$o(new F(t.from,t.to))
    }
    getVisibleRange() {
        let t, i, s = this.Ki().er();
        if (s === null)
            return null;
        if (this.Ki().io()) {
            const e = this.Ki().m_()
              , h = Ls(e);
            s = rt(s, this.Ki().no()),
            t = Number((Math.round(s.Ze() / e) * e).toFixed(h)),
            i = Number((Math.round(s.Ge() / e) * e).toFixed(h))
        } else
            t = s.Ze(),
            i = s.Ge();
        return {
            from: t,
            to: i
        }
    }
    setAutoScale(t) {
        this.applyOptions({
            autoScale: t
        })
    }
    Ki() {
        return g(this.Yp.Qt().wd(this.bM, this.SM)).Ft
    }
}
class Wh {
    constructor(t, i, s, e) {
        this.Yp = t,
        this.yt = s,
        this.xM = i,
        this.CM = e
    }
    getHeight() {
        return this.yt.$t()
    }
    setHeight(t) {
        const i = this.Yp.Qt()
          , s = i.Gd(this.yt);
        i.xd(s, t)
    }
    getStretchFactor() {
        return this.yt.E_()
    }
    setStretchFactor(t) {
        this.yt.A_(t),
        this.Yp.Qt().Ca()
    }
    paneIndex() {
        return this.Yp.Qt().Gd(this.yt)
    }
    moveTo(t) {
        const i = this.paneIndex();
        i !== t && (z(t >= 0 && t < this.Yp.Zp().length, "Invalid pane index"),
        this.Yp.Qt().yd(i, t))
    }
    getSeries() {
        return this.yt.F_().map((t => this.xM(t))) ?? []
    }
    getHTMLElement() {
        const t = this.Yp.Zp();
        return t && t.length !== 0 && t[this.paneIndex()] ? t[this.paneIndex()].iv() : null
    }
    attachPrimitive(t) {
        this.yt.nl(t),
        t.attached && t.attached({
            chart: this.CM,
            requestUpdate: () => this.yt.Qt().Ca()
        })
    }
    detachPrimitive(t) {
        this.yt.el(t)
    }
    priceScale(t) {
        if (this.yt.V_(t) === null)
            throw new Error(`Cannot find price scale with id: ${t}`);
        return new Ts(this.Yp,t,this.paneIndex())
    }
    setPreserveEmptyPane(t) {
        this.yt.O_(t)
    }
    preserveEmptyPane() {
        return this.yt.N_()
    }
    addCustomSeries(t, i={}, s=0) {
        return this.CM.addCustomSeries(t, i, s)
    }
    addSeries(t, i={}) {
        return this.CM.addSeries(t, i, this.paneIndex())
    }
}
const Bh = {
    color: "#FF0000",
    price: 0,
    lineStyle: 2,
    lineWidth: 1,
    lineVisible: !0,
    axisLabelVisible: !0,
    title: "",
    axisLabelColor: "",
    axisLabelTextColor: ""
};
class as {
    constructor(t) {
        this.hr = t
    }
    applyOptions(t) {
        this.hr.cr(t)
    }
    options() {
        return this.hr.N()
    }
    yM() {
        return this.hr
    }
}
class Ah {
    constructor(t, i, s, e, h, r) {
        this.kM = new P,
        this.ee = t,
        this.PM = i,
        this.TM = s,
        this.cu = h,
        this.CM = e,
        this.RM = r
    }
    m() {
        this.kM.m()
    }
    priceFormatter() {
        return this.ee.Xa()
    }
    priceToCoordinate(t) {
        const i = this.ee.Lt();
        return i === null ? null : this.ee.Ft().Nt(t, i.Wt)
    }
    coordinateToPrice(t) {
        const i = this.ee.Lt();
        return i === null ? null : this.ee.Ft().Ds(t, i.Wt)
    }
    barsInLogicalRange(t) {
        if (t === null)
            return null;
        const i = new ot(new pt(t.from,t.to)).Ru()
          , s = this.ee.qs();
        if (s.Gi())
            return null;
        const e = s.$s(i.Aa(), 1)
          , h = s.$s(i.bi(), -1)
          , r = g(s.kh())
          , o = g(s.sn());
        if (e !== null && h !== null && e.js > h.js)
            return {
                barsBefore: t.from - r,
                barsAfter: o - t.to
            };
        const l = {
            barsBefore: e === null || e.js === r ? t.from - r : e.js - r,
            barsAfter: h === null || h.js === o ? o - t.to : o - h.js
        };
        return e !== null && h !== null && (l.from = e.Gr,
        l.to = h.Gr),
        l
    }
    setData(t) {
        this.cu,
        this.ee.wh(),
        this.PM.DM(this.ee, t),
        this.IM("full")
    }
    update(t, i=!1) {
        this.ee.wh(),
        this.PM.VM(this.ee, t, i),
        this.IM("update")
    }
    pop(t=1) {
        const i = this.PM.BM(this.ee, t);
        i.length !== 0 && this.IM("update");
        const s = kt(this.seriesType());
        return i.map((e => s(e)))
    }
    dataByIndex(t, i) {
        const s = this.ee.qs().$s(t, i);
        return s === null ? null : kt(this.seriesType())(s)
    }
    data() {
        const t = kt(this.seriesType());
        return this.ee.qs().Dh().map((i => t(i)))
    }
    subscribeDataChanged(t) {
        this.kM.i(t)
    }
    unsubscribeDataChanged(t) {
        this.kM._(t)
    }
    applyOptions(t) {
        this.ee.cr(t)
    }
    options() {
        return K(this.ee.N())
    }
    priceScale() {
        return this.TM.priceScale(this.ee.Ft().ol(), this.getPane().paneIndex())
    }
    createPriceLine(t) {
        const i = W(K(Bh), t)
          , s = this.ee.Da(i);
        return new as(s)
    }
    removePriceLine(t) {
        this.ee.Ia(t.yM())
    }
    priceLines() {
        return this.ee.Va().map((t => new as(t)))
    }
    seriesType() {
        return this.ee.wh()
    }
    lastValueData(t) {
        const i = this.ee.Ve(t);
        return i.Be ? {
            noData: !0
        } : {
            noData: !1,
            price: i.gt,
            color: i.R
        }
    }
    attachPrimitive(t) {
        this.ee.nl(t),
        t.attached && t.attached({
            chart: this.CM,
            series: this,
            requestUpdate: () => this.ee.Qt().Ca(),
            horzScaleBehavior: this.cu
        })
    }
    detachPrimitive(t) {
        this.ee.el(t),
        t.detached && t.detached(),
        this.ee.Qt().Ca()
    }
    getPane() {
        const t = this.ee
          , i = g(this.ee.Qt().Kn(t));
        return this.RM(i)
    }
    moveToPane(t) {
        this.ee.Qt().jd(this.ee, t)
    }
    seriesOrder() {
        const t = this.ee.Qt().Kn(this.ee);
        return t === null ? -1 : t.F_().indexOf(this.ee)
    }
    setSeriesOrder(t) {
        const i = this.ee.Qt().Kn(this.ee);
        i !== null && i.su(this.ee, t)
    }
    IM(t) {
        this.kM.v() && this.kM.p(t)
    }
}
class Vh {
    constructor(t, i, s) {
        this.EM = new P,
        this.Nu = new P,
        this.xw = new P,
        this.ns = t,
        this.Jh = t.Et(),
        this.tg = i,
        this.Jh.Lc().i(this.AM.bind(this)),
        this.Jh.zc().i(this.LM.bind(this)),
        this.tg.Dw().i(this.zM.bind(this)),
        this.cu = s
    }
    m() {
        this.Jh.Lc().u(this),
        this.Jh.zc().u(this),
        this.tg.Dw().u(this),
        this.EM.m(),
        this.Nu.m(),
        this.xw.m()
    }
    scrollPosition() {
        return this.Jh.Cc()
    }
    scrollToPosition(t, i) {
        i ? this.Jh.Bc(t, 1e3) : this.ns.Mn(t)
    }
    scrollToRealTime() {
        this.Jh.Vc()
    }
    getVisibleRange() {
        const t = this.Jh.lc();
        return t === null ? null : {
            from: t.from.originalTime,
            to: t.to.originalTime
        }
    }
    setVisibleRange(t) {
        const i = {
            from: this.cu.convertHorzItemToInternal(t.from),
            to: this.cu.convertHorzItemToInternal(t.to)
        }
          , s = this.Jh.cc(i);
        this.ns.$d(s)
    }
    getVisibleLogicalRange() {
        const t = this.Jh.ac();
        return t === null ? null : {
            from: t.Aa(),
            to: t.bi()
        }
    }
    setVisibleLogicalRange(t) {
        z(t.from <= t.to, "The from index cannot be after the to index."),
        this.ns.$d(t)
    }
    resetTimeScale() {
        this.ns.wn()
    }
    fitContent() {
        this.ns.Fc()
    }
    logicalToCoordinate(t) {
        const i = this.ns.Et();
        return i.Gi() ? null : i.qt(t)
    }
    coordinateToLogical(t) {
        return this.Jh.Gi() ? null : this.Jh.wc(t)
    }
    timeToIndex(t, i) {
        const s = this.cu.convertHorzItemToInternal(t);
        return this.Jh.ec(s, i)
    }
    timeToCoordinate(t) {
        const i = this.timeToIndex(t, !1);
        return i === null ? null : this.Jh.qt(i)
    }
    coordinateToTime(t) {
        const i = this.ns.Et()
          , s = i.wc(t)
          , e = i.es(s);
        return e === null ? null : e.originalTime
    }
    width() {
        return this.tg.sv().width
    }
    height() {
        return this.tg.sv().height
    }
    subscribeVisibleTimeRangeChange(t) {
        this.EM.i(t)
    }
    unsubscribeVisibleTimeRangeChange(t) {
        this.EM._(t)
    }
    subscribeVisibleLogicalRangeChange(t) {
        this.Nu.i(t)
    }
    unsubscribeVisibleLogicalRangeChange(t) {
        this.Nu._(t)
    }
    subscribeSizeChange(t) {
        this.xw.i(t)
    }
    unsubscribeSizeChange(t) {
        this.xw._(t)
    }
    applyOptions(t) {
        this.Jh.cr(t)
    }
    options() {
        return {
            ...K(this.Jh.N()),
            barSpacing: this.Jh.ul()
        }
    }
    AM() {
        this.EM.v() && this.EM.p(this.getVisibleRange())
    }
    LM() {
        this.Nu.v() && this.Nu.p(this.getVisibleLogicalRange())
    }
    zM(t) {
        this.xw.p(t.width, t.height)
    }
}
function us(n) {
    return (function(t) {
        if (Mt(t.handleScale)) {
            const s = t.handleScale;
            t.handleScale = {
                axisDoubleClickReset: {
                    time: s,
                    price: s
                },
                axisPressedMouseMove: {
                    time: s,
                    price: s
                },
                mouseWheel: s,
                pinch: s
            }
        } else if (t.handleScale !== void 0) {
            const {axisPressedMouseMove: s, axisDoubleClickReset: e} = t.handleScale;
            Mt(s) && (t.handleScale.axisPressedMouseMove = {
                time: s,
                price: s
            }),
            Mt(e) && (t.handleScale.axisDoubleClickReset = {
                time: e,
                price: e
            })
        }
        const i = t.handleScroll;
        Mt(i) && (t.handleScroll = {
            horzTouchDrag: i,
            vertTouchDrag: i,
            mouseWheel: i,
            pressedMouseMove: i
        })
    }
    )(n),
    n
}
class Oh {
    constructor(t, i, s) {
        this.OM = new Map,
        this.NM = new Map,
        this.FM = new P,
        this.WM = new P,
        this.HM = new P,
        this.Xc = new WeakMap,
        this.UM = new bh(i);
        const e = s === void 0 ? K(ls()) : W(K(ls()), us(s));
        this.$M = i,
        this.Yp = new ch(t,e,i),
        this.Yp.nw().i((r => {
            this.FM.v() && this.FM.p(this.qM(r()))
        }
        ), this),
        this.Yp.ew().i((r => {
            this.WM.v() && this.WM.p(this.qM(r()))
        }
        ), this),
        this.Yp.Md().i((r => {
            this.HM.v() && this.HM.p(this.qM(r()))
        }
        ), this);
        const h = this.Yp.Qt();
        this.jM = new Vh(h,this.Yp.rg(),this.$M)
    }
    remove() {
        this.Yp.nw().u(this),
        this.Yp.ew().u(this),
        this.Yp.Md().u(this),
        this.jM.m(),
        this.Yp.m(),
        this.OM.clear(),
        this.NM.clear(),
        this.FM.m(),
        this.WM.m(),
        this.HM.m(),
        this.UM.m()
    }
    resize(t, i, s) {
        this.autoSizeActive() || this.Yp.sg(t, i, s)
    }
    addCustomSeries(t, i={}, s=0) {
        const e = (h => ({
            type: "Custom",
            isBuiltIn: !1,
            defaultOptions: {
                ...Ph,
                ...h.defaultOptions()
            },
            YM: Nh,
            KM: h
        }))($(t));
        return this.ZM(e, i, s)
    }
    addSeries(t, i={}, s=0) {
        return this.ZM(t, i, s)
    }
    removeSeries(t) {
        const i = T(this.OM.get(t))
          , s = this.UM.Hd(i);
        this.Yp.Qt().Hd(i),
        this.GM(s),
        this.OM.delete(t),
        this.NM.delete(i)
    }
    DM(t, i) {
        this.GM(this.UM.Ug(t, i))
    }
    VM(t, i, s) {
        this.GM(this.UM.Zg(t, i, s))
    }
    BM(t, i) {
        const [s,e] = this.UM.Jg(t, i);
        return s.length !== 0 && this.GM(e),
        s
    }
    subscribeClick(t) {
        this.FM.i(t)
    }
    unsubscribeClick(t) {
        this.FM._(t)
    }
    subscribeCrosshairMove(t) {
        this.HM.i(t)
    }
    unsubscribeCrosshairMove(t) {
        this.HM._(t)
    }
    subscribeDblClick(t) {
        this.WM.i(t)
    }
    unsubscribeDblClick(t) {
        this.WM._(t)
    }
    priceScale(t, i=0) {
        return new Ts(this.Yp,t,i)
    }
    timeScale() {
        return this.jM
    }
    applyOptions(t) {
        this.Yp.cr(us(t))
    }
    options() {
        return this.Yp.N()
    }
    takeScreenshot(t=!1, i=!1) {
        let s, e;
        try {
            i || (s = this.Yp.Qt().N().crosshair.mode,
            this.Yp.cr({
                crosshair: {
                    mode: 2
                }
            })),
            e = this.Yp.ug(t)
        } finally {
            i || s === void 0 || this.Yp.Qt().cr({
                crosshair: {
                    mode: s
                }
            })
        }
        return e
    }
    addPane(t=!1) {
        const i = this.Yp.Qt().Xd();
        return i.O_(t),
        this.XM(i)
    }
    removePane(t) {
        this.Yp.Qt().Sd(t)
    }
    swapPanes(t, i) {
        this.Yp.Qt().Cd(t, i)
    }
    autoSizeActive() {
        return this.Yp.vg()
    }
    chartElement() {
        return this.Yp.hv()
    }
    panes() {
        return this.Yp.Qt().Xs().map((t => this.XM(t)))
    }
    paneSize(t=0) {
        const i = this.Yp.gg(t);
        return {
            height: i.height,
            width: i.width
        }
    }
    setCrosshairPosition(t, i, s) {
        const e = this.OM.get(s);
        if (e === void 0)
            return;
        const h = this.Yp.Qt().Kn(e);
        h !== null && this.Yp.Qt().Ld(t, i, h)
    }
    clearCrosshairPosition() {
        this.Yp.Qt().zd(!0)
    }
    horzBehaviour() {
        return this.$M
    }
    ZM(t, i={}, s=0) {
        z(t.YM !== void 0),
        (function(l) {
            if (l === void 0 || l.type === "custom")
                return;
            const a = l;
            a.minMove !== void 0 && a.precision === void 0 && (a.precision = Ls(a.minMove))
        }
        )(i.priceFormat),
        t.type === "Candlestick" && (function(l) {
            l.borderColor !== void 0 && (l.borderUpColor = l.borderColor,
            l.borderDownColor = l.borderColor),
            l.wickColor !== void 0 && (l.wickUpColor = l.wickColor,
            l.wickDownColor = l.wickColor)
        }
        )(i);
        const e = W(K(gs), K(t.defaultOptions), i)
          , h = t.YM
          , r = new Vt(this.Yp.Qt(),t.type,e,h,t.KM);
        this.Yp.Qt().Fd(r, s);
        const o = new Ah(r,this,this,this,this.$M,(l => this.XM(l)));
        return this.OM.set(o, r),
        this.NM.set(r, o),
        o
    }
    GM(t) {
        const i = this.Yp.Qt();
        i.Od(t.Et.vc, t.Et.sM, t.Et.nM),
        t.F_.forEach(( (s, e) => e.ht(s.le, s.iM))),
        i.Et().Ju(),
        i.Sc()
    }
    JM(t) {
        return T(this.NM.get(t))
    }
    qM(t) {
        const i = new Map;
        t.Vg.forEach(( (e, h) => {
            const r = h.wh()
              , o = kt(r)(e);
            if (r !== "Custom")
                z(fh(o));
            else {
                const l = h.hl();
                z(!l || l(o) === !1)
            }
            i.set(this.JM(h), o)
        }
        ));
        const s = t.Ig !== void 0 && this.NM.has(t.Ig) ? this.JM(t.Ig) : void 0;
        return {
            time: t.Gr,
            logical: t.js,
            point: t.Rg,
            paneIndex: t.Dg,
            hoveredSeries: s,
            hoveredObjectId: t.Bg,
            seriesData: i,
            sourceEvent: t.Eg
        }
    }
    XM(t) {
        let i = this.Xc.get(t);
        return i || (i = new Wh(this.Yp,(s => this.JM(s)),t,this),
        this.Xc.set(t, i)),
        i
    }
}
function Kh(n) {
    if (wt(n)) {
        const t = document.getElementById(n);
        return z(t !== null, `Cannot find element in DOM with id=${n}`),
        t
    }
    return n
}
function Jh(n, t, i) {
    const s = Kh(n)
      , e = new Oh(s,t,i);
    return t.setOptions(e.options()),
    e
}
function Yh(n, t) {
    return Jh(n, new Gi, Gi.pf(t))
}
class Is extends pi {
    constructor(t, i) {
        super(t, i, !0)
    }
    mM(t, i, s) {
        i.mc(this.aM, vt(this.lM)),
        t.Yo(this.aM, s, vt(this.lM))
    }
    QM(t, i) {
        return {
            wt: t,
            gt: i,
            _t: NaN,
            ut: NaN
        }
    }
    pM() {
        const t = this.ee.ga();
        this.aM = this.ee.Na().Dh().map((i => {
            let s;
            if ((i.jr ?? 1) > 1) {
                const e = i.Wt[1]
                  , h = i.Wt[2]
                  , r = i.Wt[3];
                s = Math.abs(e - r) > Math.abs(h - r) ? e : h
            } else
                s = i.Wt[3];
            return this.tb(i.js, s, t)
        }
        ))
    }
}
function Dh(n, t, i, s, e, h, r) {
    if (t.length === 0 || s.from >= t.length || s.to <= 0)
        return;
    const {context: o, horizontalPixelRatio: l, verticalPixelRatio: a} = n
      , u = t[s.from];
    let c = h(n, u)
      , d = u;
    if (s.to - s.from < 2) {
        const m = e / 2;
        o.beginPath();
        const f = {
            _t: u._t - m,
            ut: u.ut
        }
          , p = {
            _t: u._t + m,
            ut: u.ut
        };
        o.moveTo(f._t * l, f.ut * a),
        o.lineTo(p._t * l, p.ut * a),
        r(n, c, f, p)
    } else {
        const m = (p, w) => {
            r(n, c, d, w),
            o.beginPath(),
            c = p,
            d = w
        }
        ;
        let f = d;
        o.beginPath(),
        o.moveTo(u._t * l, u.ut * a);
        for (let p = s.from + 1; p < s.to; ++p) {
            f = t[p];
            const w = h(n, f);
            switch (i) {
            case 0:
                o.lineTo(f._t * l, f.ut * a);
                break;
            case 1:
                o.lineTo(f._t * l, t[p - 1].ut * a),
                w !== c && (m(w, f),
                o.lineTo(f._t * l, t[p - 1].ut * a)),
                o.lineTo(f._t * l, f.ut * a);
                break;
            case 2:
                {
                    const [b,M] = $h(t, p - 1, p);
                    o.bezierCurveTo(b._t * l, b.ut * a, M._t * l, M.ut * a, f._t * l, f.ut * a);
                    break
                }
            }
            i !== 1 && w !== c && (m(w, f),
            o.moveTo(f._t * l, f.ut * a))
        }
        (d !== f || d === f && i === 1) && r(n, c, d, f)
    }
}
const cs = 6;
function ri(n, t) {
    return {
        _t: n._t - t._t,
        ut: n.ut - t.ut
    }
}
function ds(n, t) {
    return {
        _t: n._t / t,
        ut: n.ut / t
    }
}
function $h(n, t, i) {
    const s = Math.max(0, t - 1)
      , e = Math.min(n.length - 1, i + 1);
    var h, r;
    return [(h = n[t],
    r = ds(ri(n[i], n[s]), cs),
    {
        _t: h._t + r._t,
        ut: h.ut + r.ut
    }), ri(n[i], ds(ri(n[e], n[t]), cs))]
}
function Gh(n, t) {
    const i = n.context;
    i.strokeStyle = t,
    i.stroke()
}
class Uh extends G {
    constructor() {
        super(...arguments),
        this.rt = null
    }
    ht(t) {
        this.rt = t
    }
    et(t) {
        if (this.rt === null)
            return;
        const {ot: i, lt: s, ib: e, sb: h, ct: r, Zt: o, nb: l} = this.rt;
        if (s === null)
            return;
        const a = t.context;
        a.lineCap = "butt",
        a.lineWidth = r * t.verticalPixelRatio,
        q(a, o),
        a.lineJoin = "round";
        const u = this.eb.bind(this);
        h !== void 0 && Dh(t, i, h, s, e, u, Gh),
        l && (function(c, d, m, f, p) {
            if (f.to - f.from <= 0)
                return;
            const {horizontalPixelRatio: w, verticalPixelRatio: b, context: M} = c;
            let y = null;
            const _ = Math.max(1, Math.floor(w)) % 2 / 2
              , j = m * b + _;
            for (let C = f.to - 1; C >= f.from; --C) {
                const I = d[C];
                if (I) {
                    const R = p(c, I);
                    R !== y && (M.beginPath(),
                    y !== null && M.fill(),
                    M.fillStyle = R,
                    y = R);
                    const k = Math.round(I._t * w) + _
                      , U = I.ut * b;
                    M.moveTo(k, U),
                    M.arc(k, U, j, 0, 2 * Math.PI)
                }
            }
            M.fill()
        }
        )(t, i, l, s, u)
    }
}
class Xh extends Uh {
    eb(t, i) {
        return i.vt
    }
}
class Qh extends Is {
    constructor() {
        super(...arguments),
        this.cM = new Xh
    }
    tb(t, i, s) {
        return {
            ...this.QM(t, i),
            ...s.gh(t)
        }
    }
    wM() {
        const t = this.ee.N()
          , i = {
            ot: this.aM,
            Zt: t.lineStyle,
            sb: t.lineVisible ? t.lineType : void 0,
            ct: t.lineWidth,
            nb: t.pointMarkersVisible ? t.pointMarkersRadius || t.lineWidth / 2 + 2 : void 0,
            lt: this.lM,
            ib: this.re.Et().ul()
        };
        this.cM.ht(i)
    }
}
const Hh = {
    type: "Line",
    isBuiltIn: !0,
    defaultOptions: {
        color: "#2196f3",
        lineStyle: 0,
        lineWidth: 3,
        lineType: 0,
        lineVisible: !0,
        crosshairMarkerVisible: !0,
        crosshairMarkerRadius: 4,
        crosshairMarkerBorderColor: "",
        crosshairMarkerBorderWidth: 2,
        crosshairMarkerBackgroundColor: "",
        lastPriceAnimation: 0,
        pointMarkersVisible: !1
    },
    YM: (n, t) => new Qh(n,t)
};
class qh extends pi {
    constructor(t, i) {
        super(t, i, !1)
    }
    mM(t, i, s) {
        i.mc(this.aM, vt(this.lM)),
        t.Zo(this.aM, s, vt(this.lM))
    }
    Lb(t, i, s) {
        return {
            wt: t,
            Hr: i.Wt[0],
            Ur: i.Wt[1],
            $r: i.Wt[2],
            qr: i.Wt[3],
            _t: NaN,
            Go: NaN,
            Xo: NaN,
            Jo: NaN,
            Qo: NaN
        }
    }
    pM() {
        const t = this.ee.ga();
        this.aM = this.ee.Na().Dh().map((i => this.tb(i.js, i, t)))
    }
}
class Zh extends G {
    constructor() {
        super(...arguments),
        this.jt = null,
        this.Ib = 0
    }
    ht(t) {
        this.jt = t
    }
    et(t) {
        if (this.jt === null || this.jt.qs.length === 0 || this.jt.lt === null)
            return;
        const {horizontalPixelRatio: i} = t;
        this.Ib = (function(h, r) {
            if (h >= 2.5 && h <= 4)
                return Math.floor(3 * r);
            const o = 1 - .2 * Math.atan(Math.max(4, h) - 4) / (.5 * Math.PI)
              , l = Math.floor(h * o * r)
              , a = Math.floor(h * r)
              , u = Math.min(l, a);
            return Math.max(Math.floor(r), u)
        }
        )(this.jt.ul, i),
        this.Ib >= 2 && Math.floor(i) % 2 != this.Ib % 2 && this.Ib--;
        const s = this.jt.qs;
        this.jt.zb && this.Ob(t, s, this.jt.lt),
        this.jt.Mi && this.gm(t, s, this.jt.lt);
        const e = this.Nb(i);
        (!this.jt.Mi || this.Ib > 2 * e) && this.Fb(t, s, this.jt.lt)
    }
    Ob(t, i, s) {
        if (this.jt === null)
            return;
        const {context: e, horizontalPixelRatio: h, verticalPixelRatio: r} = t;
        let o = ""
          , l = Math.min(Math.floor(h), Math.floor(this.jt.ul * h));
        l = Math.max(Math.floor(h), Math.min(l, this.Ib));
        const a = Math.floor(.5 * l);
        let u = null;
        for (let c = s.from; c < s.to; c++) {
            const d = i[c];
            d.sh !== o && (e.fillStyle = d.sh,
            o = d.sh);
            const m = Math.round(Math.min(d.Go, d.Qo) * r)
              , f = Math.round(Math.max(d.Go, d.Qo) * r)
              , p = Math.round(d.Xo * r)
              , w = Math.round(d.Jo * r);
            let b = Math.round(h * d._t) - a;
            const M = b + l - 1;
            u !== null && (b = Math.max(u + 1, b),
            b = Math.min(b, M));
            const y = M - b + 1;
            e.fillRect(b, p, y, m - p),
            e.fillRect(b, f + 1, y, w - f),
            u = M
        }
    }
    Nb(t) {
        let i = Math.floor(1 * t);
        this.Ib <= 2 * i && (i = Math.floor(.5 * (this.Ib - 1)));
        const s = Math.max(Math.floor(t), i);
        return this.Ib <= 2 * s ? Math.max(Math.floor(t), Math.floor(1 * t)) : s
    }
    gm(t, i, s) {
        if (this.jt === null)
            return;
        const {context: e, horizontalPixelRatio: h, verticalPixelRatio: r} = t;
        let o = "";
        const l = this.Nb(h);
        let a = null;
        for (let u = s.from; u < s.to; u++) {
            const c = i[u];
            c.ih !== o && (e.fillStyle = c.ih,
            o = c.ih);
            let d = Math.round(c._t * h) - Math.floor(.5 * this.Ib);
            const m = d + this.Ib - 1
              , f = Math.round(Math.min(c.Go, c.Qo) * r)
              , p = Math.round(Math.max(c.Go, c.Qo) * r);
            if (a !== null && (d = Math.max(a + 1, d),
            d = Math.min(d, m)),
            this.jt.ul * h > 2 * l)
                Zs(e, d, f, m - d + 1, p - f + 1, l);
            else {
                const w = m - d + 1;
                e.fillRect(d, f, w, p - f + 1)
            }
            a = m
        }
    }
    Fb(t, i, s) {
        if (this.jt === null)
            return;
        const {context: e, horizontalPixelRatio: h, verticalPixelRatio: r} = t;
        let o = "";
        const l = this.Nb(h);
        for (let a = s.from; a < s.to; a++) {
            const u = i[a];
            let c = Math.round(Math.min(u.Go, u.Qo) * r)
              , d = Math.round(Math.max(u.Go, u.Qo) * r)
              , m = Math.round(u._t * h) - Math.floor(.5 * this.Ib)
              , f = m + this.Ib - 1;
            if (u.th !== o) {
                const p = u.th;
                e.fillStyle = p,
                o = p
            }
            this.jt.Mi && (m += l,
            c += l,
            f -= l,
            d -= l),
            c > d || e.fillRect(m, c, f - m + 1, d - c + 1)
        }
    }
}
class tn extends qh {
    constructor() {
        super(...arguments),
        this.cM = new Zh
    }
    tb(t, i, s) {
        return {
            ...this.Lb(t, i, s),
            ...s.gh(t)
        }
    }
    wM() {
        const t = this.ee.N();
        this.cM.ht({
            qs: this.aM,
            ul: this.re.Et().ul(),
            zb: t.wickVisible,
            Mi: t.borderVisible,
            lt: this.lM
        })
    }
}
const fs = {
    type: "Candlestick",
    isBuiltIn: !0,
    defaultOptions: {
        upColor: "#26a69a",
        downColor: "#ef5350",
        wickVisible: !0,
        borderVisible: !0,
        borderColor: "#378658",
        borderUpColor: "#26a69a",
        borderDownColor: "#ef5350",
        wickColor: "#737375",
        wickUpColor: "#26a69a",
        wickDownColor: "#ef5350"
    },
    YM: (n, t) => new tn(n,t)
};
class sn extends G {
    constructor() {
        super(...arguments),
        this.jt = null,
        this.Wb = []
    }
    ht(t) {
        this.jt = t,
        this.Wb = []
    }
    et({context: t, horizontalPixelRatio: i, verticalPixelRatio: s}) {
        if (this.jt === null || this.jt.ot.length === 0 || this.jt.lt === null)
            return;
        this.Wb.length || this.Hb(i);
        const e = Math.max(1, Math.floor(s))
          , h = Math.round(this.jt.Ub * s) - Math.floor(e / 2)
          , r = h + e;
        for (let o = this.jt.lt.from; o < this.jt.lt.to; o++) {
            const l = this.jt.ot[o]
              , a = this.Wb[o - this.jt.lt.from]
              , u = Math.round(l.ut * s);
            let c, d;
            t.fillStyle = l.th,
            u <= h ? (c = u,
            d = r) : (c = h,
            d = u - Math.floor(e / 2) + e),
            t.fillRect(a.Aa, c, a.bi - a.Aa + 1, d - c)
        }
    }
    Hb(t) {
        if (this.jt === null || this.jt.ot.length === 0 || this.jt.lt === null)
            return void (this.Wb = []);
        const i = Math.ceil(this.jt.ul * t) <= 1 ? 0 : Math.max(1, Math.floor(t))
          , s = Math.round(this.jt.ul * t) - i;
        this.Wb = new Array(this.jt.lt.to - this.jt.lt.from);
        for (let h = this.jt.lt.from; h < this.jt.lt.to; h++) {
            const r = this.jt.ot[h]
              , o = Math.round(r._t * t);
            let l, a;
            if (s % 2) {
                const u = (s - 1) / 2;
                l = o - u,
                a = o + u
            } else {
                const u = s / 2;
                l = o - u,
                a = o + u - 1
            }
            this.Wb[h - this.jt.lt.from] = {
                Aa: l,
                bi: a,
                $b: o,
                oe: r._t * t,
                wt: r.wt
            }
        }
        for (let h = this.jt.lt.from + 1; h < this.jt.lt.to; h++) {
            const r = this.Wb[h - this.jt.lt.from]
              , o = this.Wb[h - this.jt.lt.from - 1];
            r.wt === o.wt + 1 && r.Aa - o.bi !== i + 1 && (o.$b > o.oe ? o.bi = r.Aa - i - 1 : r.Aa = o.bi + i + 1)
        }
        let e = Math.ceil(this.jt.ul * t);
        for (let h = this.jt.lt.from; h < this.jt.lt.to; h++) {
            const r = this.Wb[h - this.jt.lt.from];
            r.bi < r.Aa && (r.bi = r.Aa);
            const o = r.bi - r.Aa + 1;
            e = Math.min(o, e)
        }
        if (i > 0 && e < 4)
            for (let h = this.jt.lt.from; h < this.jt.lt.to; h++) {
                const r = this.Wb[h - this.jt.lt.from];
                r.bi - r.Aa + 1 > e && (r.$b > r.oe ? r.bi -= 1 : r.Aa += 1)
            }
    }
}
class en extends Is {
    constructor() {
        super(...arguments),
        this.cM = new sn
    }
    tb(t, i, s) {
        return {
            ...this.QM(t, i),
            ...s.gh(t)
        }
    }
    wM() {
        const t = {
            ot: this.aM,
            ul: this.re.Et().ul(),
            lt: this.lM,
            Ub: this.ee.Ft().Nt(this.ee.N().base, g(this.ee.Lt()).Wt)
        };
        this.cM.ht(t)
    }
}
const ms = {
    type: "Histogram",
    isBuiltIn: !0,
    defaultOptions: {
        color: "#26a69a",
        base: 0
    },
    YM: (n, t) => new en(n,t)
};
({
    ...gs
});
const Et = {
    Hyperliquid: "#84cc16",
    Paradex: "#f97316",
    Pacifica: "#a855f7",
    Lighter: "#6b7280",
    Extended: "#22c55e",
    Nado: "#3b82f6"
}
  , ps = () => {
    const n = window.innerHeight;
    return window.innerWidth < 768 ? Math.min(Math.floor(n * .45), 400) : 380
}
;
function nn({isOpen: n, onClose: t, gapData: i, type: s="price"}) {
    const e = O.useRef(null)
      , h = O.useRef(null)
      , [r,o] = O.useState(!1)
      , [l,a] = O.useState(null)
      , [u,c] = O.useState("line")
      , [d,m] = O.useState(!1);
    if (O.useEffect( () => {
        if (!n) {
            m(!1);
            return
        }
        const C = setTimeout( () => m(!0), 50);
        return () => clearTimeout(C)
    }
    , [n]),
    O.useEffect( () => {
        if (!d || !e.current || !i)
            return;
        let C = !0;
        return h.current && (h.current.remove(),
        h.current = null),
        o(!0),
        a(null),
        (async () => {
            const R = e.current;
            if (!R || !C)
                return;
            const k = Yh(R, {
                width: R.clientWidth,
                height: ps(),
                layout: {
                    background: {
                        color: "transparent"
                    },
                    textColor: "#9ca3af"
                },
                grid: {
                    vertLines: {
                        color: "rgba(255, 255, 255, 0.05)"
                    },
                    horzLines: {
                        color: "rgba(255, 255, 255, 0.05)"
                    }
                },
                rightPriceScale: {
                    borderColor: "rgba(255, 255, 255, 0.1)"
                },
                timeScale: {
                    borderColor: "rgba(255, 255, 255, 0.1)",
                    timeVisible: !0,
                    secondsVisible: !1,
                    tickMarkFormatter: S => {
                        const N = new Date(S * 1e3)
                          , Y = N.getMonth() + 1
                          , E = N.getDate()
                          , A = N.getHours().toString().padStart(2, "0")
                          , B = N.getMinutes().toString().padStart(2, "0");
                        return `${Y}/${E} ${A}:${B}`
                    }
                }
            });
            if (!C) {
                k.remove();
                return
            }
            h.current = k;
            const U = s === "price"
              , Kt = "https://api.donkatze.xyz"
              , bt = `${i.exchangeA}-${i.exchangeB}`
              , it = async S => {
                const N = await fetch(`${Kt}/api/history/chart?type=${S}&ticker=${i.ticker}&exchange_pair=${bt}&period=7d&interval=15m`);
                if (!N.ok)
                    throw new Error("API error");
                return N.json()
            }
            ;
            if (U)
                try {
                    const S = await it("price");
                    if (!C)
                        return;
                    if (S && S.length > 0) {
                        if (u === "gap") {
                            const N = S.map(E => ({
                                time: E.time,
                                value: E.close,
                                color: "rgba(52, 211, 153, 0.8)"
                            }));
                            k.addSeries(ms, {
                                priceFormat: {
                                    type: "custom",
                                    formatter: E => E.toFixed(3) + "%"
                                }
                            }).setData(N)
                        } else
                            k.addSeries(fs, {
                                upColor: "#22c55e",
                                downColor: "#ef4444",
                                borderUpColor: "#22c55e",
                                borderDownColor: "#ef4444",
                                wickUpColor: "#22c55e",
                                wickDownColor: "#ef4444",
                                priceFormat: {
                                    type: "custom",
                                    formatter: Y => Y.toFixed(3) + "%"
                                }
                            }).setData(S);
                        a(null)
                    } else
                        a("No history data (collecting...)")
                } catch (S) {
                    console.error("Price gap history fetch error:", S),
                    a("History unavailable")
                }
            else
                try {
                    const S = await it("funding");
                    if (!C)
                        return;
                    if (S && S.length > 0) {
                        if (u === "gap") {
                            const E = S.map(B => ({
                                time: B.time,
                                value: B.close,
                                color: B.close >= 0 ? "rgba(34, 197, 94, 0.8)" : "rgba(239, 68, 68, 0.8)"
                            }));
                            k.addSeries(ms, {
                                priceFormat: {
                                    type: "custom",
                                    formatter: B => B.toFixed(1) + "% APR"
                                }
                            }).setData(E)
                        } else
                            k.addSeries(fs, {
                                upColor: "#22c55e",
                                downColor: "#ef4444",
                                borderUpColor: "#22c55e",
                                borderDownColor: "#ef4444",
                                wickUpColor: "#22c55e",
                                wickDownColor: "#ef4444",
                                priceFormat: {
                                    type: "custom",
                                    formatter: A => A.toFixed(1) + "% APR"
                                }
                            }).setData(S);
                        const N = S.reduce( (E, A) => E + A.close, 0) / S.length;
                        k.addSeries(Hh, {
                            color: "#f59e0b",
                            lineWidth: 1,
                            lineStyle: 2,
                            priceFormat: {
                                type: "custom",
                                formatter: E => E.toFixed(1) + "% APR"
                            }
                        }).setData([{
                            time: S[0].time,
                            value: N
                        }, {
                            time: S[S.length - 1].time,
                            value: N
                        }]),
                        a(`Avg APR: ${N.toFixed(1)}%`)
                    } else
                        a("No history data (collecting...)")
                } catch (S) {
                    console.error("Funding gap history fetch error:", S),
                    a("History unavailable")
                }
            k.timeScale().fitContent(),
            o(!1)
        }
        )().catch(R => {
            console.error("Chart init error:", R),
            a("Chart failed: " + R.message),
            o(!1)
        }
        ),
        () => {
            C = !1,
            h.current && (h.current.remove(),
            h.current = null)
        }
    }
    , [d, i, u, s]),
    O.useEffect( () => {
        const C = () => {
            h.current && e.current && h.current.applyOptions({
                width: e.current.clientWidth,
                height: ps()
            })
        }
        ;
        return window.addEventListener("resize", C),
        () => window.removeEventListener("resize", C)
    }
    , []),
    !n || !i)
        return null;
    const f = s === "price"
      , p = f ? i.priceA?.value : i.fundingA?.value
      , w = f ? i.priceB?.value : i.fundingB?.value
      , b = i.fundingA?.interval || 1
      , M = i.fundingB?.interval || 1
      , y = (p ?? 0) / b
      , _ = (w ?? 0) / M
      , j = f ? i.priceGap : i.apr;
    return v.jsx("div", {
        className: "fixed inset-0 bg-black/80 backdrop-blur-sm flex items-end md:items-center justify-center z-50 p-0 md:p-4",
        onClick: t,
        children: v.jsxs("div", {
            className: "bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-t-2xl md:rounded-2xl w-full md:max-w-4xl max-h-[95vh] md:max-h-[90vh] overflow-auto animate-slide-in-up md:animate-fade-in",
            onClick: C => C.stopPropagation(),
            children: [v.jsx("div", {
                className: "md:hidden w-12 h-1.5 bg-[var(--color-border)] rounded-full mx-auto mt-3"
            }), v.jsxs("div", {
                className: "px-4 md:px-6 py-4 border-b border-[var(--color-border)] flex flex-col md:flex-row md:items-center justify-between gap-3",
                children: [v.jsxs("div", {
                    className: "flex flex-wrap items-center gap-2 md:gap-4",
                    children: [v.jsx("h2", {
                        className: "text-[var(--color-text-primary)] font-semibold text-lg",
                        children: i.ticker
                    }), v.jsxs("div", {
                        className: "flex items-center gap-2",
                        children: [v.jsx(st, {
                            exchange: i.exchangeA,
                            size: "sm"
                        }), v.jsx("span", {
                            className: "text-[var(--color-text-muted)] text-xs",
                            children: "vs"
                        }), v.jsx(st, {
                            exchange: i.exchangeB,
                            size: "sm"
                        })]
                    }), v.jsx("span", {
                        className: "bg-[var(--color-accent-muted)] text-[var(--color-accent)] px-3 py-1 rounded-lg text-sm font-semibold",
                        children: f ? `${(j ?? 0).toFixed(2)}%` : `${(j ?? 0).toFixed(0)}% APR`
                    })]
                }), v.jsxs("div", {
                    className: "flex items-center gap-3",
                    children: [v.jsxs("div", {
                        className: "flex bg-[var(--color-bg-tertiary)] rounded-lg p-1",
                        children: [v.jsx("button", {
                            onClick: () => c("gap"),
                            className: `px-3 py-1.5 rounded text-xs font-medium transition-colors ${u === "gap" ? "bg-[var(--color-accent-muted)] text-[var(--color-accent)]" : "text-[var(--color-text-muted)]"}`,
                            children: "Gap"
                        }), v.jsx("button", {
                            onClick: () => c("line"),
                            className: `px-3 py-1.5 rounded text-xs font-medium transition-colors ${u === "line" ? "bg-[var(--color-bg-hover)] text-[var(--color-text-primary)]" : "text-[var(--color-text-muted)]"}`,
                            children: f ? "Price" : "Candle"
                        })]
                    }), v.jsx("button", {
                        onClick: t,
                        className: "w-8 h-8 rounded-lg bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-bg-hover)] flex items-center justify-center text-[var(--color-text-secondary)] transition-colors",
                        children: "✕"
                    })]
                })]
            }), f ? v.jsxs("div", {
                className: "px-4 md:px-6 py-4 grid grid-cols-2 gap-3 md:gap-4 border-b border-[var(--color-border)]",
                children: [v.jsxs("div", {
                    className: "bg-[var(--color-bg-tertiary)] rounded-lg p-3 md:p-4",
                    children: [v.jsxs("div", {
                        className: "flex items-center gap-2 mb-2",
                        children: [v.jsx("span", {
                            className: "w-3 h-3 rounded-full",
                            style: {
                                backgroundColor: Et[i.exchangeA]
                            }
                        }), v.jsx("span", {
                            className: "text-[var(--color-text-secondary)] text-sm",
                            children: i.exchangeA
                        })]
                    }), v.jsxs("div", {
                        className: "text-[var(--color-text-primary)] text-xl md:text-2xl font-bold font-mono",
                        children: ["$", (p ?? 0).toLocaleString(void 0, {
                            minimumFractionDigits: (p ?? 0) < 1 ? 6 : 2,
                            maximumFractionDigits: (p ?? 0) < 1 ? 6 : 2
                        })]
                    })]
                }), v.jsxs("div", {
                    className: "bg-[var(--color-bg-tertiary)] rounded-lg p-3 md:p-4",
                    children: [v.jsxs("div", {
                        className: "flex items-center gap-2 mb-2",
                        children: [v.jsx("span", {
                            className: "w-3 h-3 rounded-full",
                            style: {
                                backgroundColor: Et[i.exchangeB]
                            }
                        }), v.jsx("span", {
                            className: "text-[var(--color-text-secondary)] text-sm",
                            children: i.exchangeB
                        })]
                    }), v.jsxs("div", {
                        className: "text-[var(--color-text-primary)] text-xl md:text-2xl font-bold font-mono",
                        children: ["$", (w ?? 0).toLocaleString(void 0, {
                            minimumFractionDigits: (w ?? 0) < 1 ? 6 : 2,
                            maximumFractionDigits: (w ?? 0) < 1 ? 6 : 2
                        })]
                    })]
                })]
            }) : v.jsxs("div", {
                className: "px-4 md:px-6 py-4 border-b border-[var(--color-border)]",
                children: [v.jsxs("div", {
                    className: "grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-4",
                    children: [v.jsxs("div", {
                        className: "bg-[var(--color-bg-tertiary)] rounded-lg p-3 md:p-4",
                        children: [v.jsxs("div", {
                            className: "flex items-center gap-2 mb-2",
                            children: [v.jsx("span", {
                                className: "w-3 h-3 rounded-full",
                                style: {
                                    backgroundColor: Et[i.exchangeA]
                                }
                            }), v.jsx("span", {
                                className: "text-[var(--color-text-secondary)] text-sm",
                                children: i.exchangeA
                            })]
                        }), v.jsxs("div", {
                            className: `text-xl md:text-2xl font-bold font-mono ${(p ?? 0) >= 0 ? "text-[var(--color-positive)]" : "text-[var(--color-negative)]"}`,
                            children: [(p ?? 0) >= 0 ? "+" : "", ((p ?? 0) * 100).toFixed(4), "%"]
                        })]
                    }), v.jsxs("div", {
                        className: "bg-[var(--color-bg-tertiary)] rounded-lg p-3 md:p-4",
                        children: [v.jsxs("div", {
                            className: "flex items-center gap-2 mb-2",
                            children: [v.jsx("span", {
                                className: "w-3 h-3 rounded-full",
                                style: {
                                    backgroundColor: Et[i.exchangeB]
                                }
                            }), v.jsx("span", {
                                className: "text-[var(--color-text-secondary)] text-sm",
                                children: i.exchangeB
                            })]
                        }), v.jsxs("div", {
                            className: `text-xl md:text-2xl font-bold font-mono ${(w ?? 0) >= 0 ? "text-[var(--color-positive)]" : "text-[var(--color-negative)]"}`,
                            children: [(w ?? 0) >= 0 ? "+" : "", ((w ?? 0) * 100).toFixed(4), "%"]
                        })]
                    }), v.jsxs("div", {
                        className: "bg-[var(--color-bg-tertiary)] rounded-lg p-3 md:p-4 border border-[var(--color-warning)]/30",
                        children: [v.jsxs("div", {
                            className: "text-[var(--color-text-secondary)] text-sm mb-2",
                            children: ["Gap (A - B)", !f && " /1h"]
                        }), v.jsxs("div", {
                            className: "text-[var(--color-warning)] text-xl md:text-2xl font-bold font-mono",
                            children: [f ? (((p ?? 0) - (w ?? 0)) * 100).toFixed(4) : ((y - _) * 100).toFixed(4), "%"]
                        }), v.jsxs("div", {
                            className: "text-[var(--color-text-muted)] text-xs",
                            children: ["≈ ", (j ?? 0).toFixed(0), "% APR"]
                        })]
                    })]
                }), v.jsxs("div", {
                    className: "bg-[var(--color-bg-tertiary)] rounded-lg p-3 md:p-4",
                    children: [v.jsx("div", {
                        className: "text-[var(--color-text-secondary)] text-xs uppercase mb-3",
                        children: "Strategy"
                    }), v.jsxs("div", {
                        className: "flex flex-wrap items-center justify-center gap-3 md:gap-6",
                        children: [v.jsxs("div", {
                            className: "flex items-center gap-2",
                            children: [v.jsx("span", {
                                className: "bg-[var(--color-positive)]/20 text-[var(--color-positive)] px-3 py-1 rounded font-bold text-sm",
                                children: "LONG"
                            }), v.jsx(st, {
                                exchange: i.strategy?.longExchange,
                                size: "sm"
                            })]
                        }), v.jsx("span", {
                            className: "text-[var(--color-text-muted)]",
                            children: "+"
                        }), v.jsxs("div", {
                            className: "flex items-center gap-2",
                            children: [v.jsx("span", {
                                className: "bg-[var(--color-negative)]/20 text-[var(--color-negative)] px-3 py-1 rounded font-bold text-sm",
                                children: "SHORT"
                            }), v.jsx(st, {
                                exchange: i.strategy?.shortExchange,
                                size: "sm"
                            })]
                        })]
                    })]
                })]
            }), v.jsxs("div", {
                className: "p-4 md:p-6",
                children: [v.jsxs("div", {
                    className: "flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4",
                    children: [v.jsx("span", {
                        className: "text-[var(--color-text-secondary)] text-sm",
                        children: f ? "Price Gap % (14D)" : "Funding Gap Profit (A-B) 14D"
                    }), l && v.jsx("span", {
                        className: "text-[var(--color-warning)] text-xs",
                        children: l
                    })]
                }), v.jsxs("div", {
                    className: "relative bg-[var(--color-bg-tertiary)] rounded-lg",
                    style: {
                        height: 380
                    },
                    children: [r && v.jsx("div", {
                        className: "absolute inset-0 flex items-center justify-center",
                        children: v.jsx("span", {
                            className: "text-[var(--color-text-muted)]",
                            children: "Loading..."
                        })
                    }), v.jsx("div", {
                        ref: e,
                        style: {
                            width: "100%",
                            height: "100%"
                        }
                    })]
                })]
            }), v.jsx("div", {
                className: "px-4 md:px-6 py-3 border-t border-[var(--color-border)] flex items-center gap-6",
                children: v.jsxs("div", {
                    className: "flex items-center gap-2",
                    children: [v.jsx("span", {
                        className: "w-4 h-3 bg-[var(--color-positive)] rounded"
                    }), v.jsx("span", {
                        className: "text-[var(--color-text-secondary)] text-xs",
                        children: f ? "Price Gap % (|B-A|/A)" : "Funding Gap (A-B) = Profit %"
                    })]
                })
            }), f && v.jsx("div", {
                className: "px-4 md:px-6 py-4 border-t border-[var(--color-border)] bg-[var(--color-bg-tertiary)]",
                children: v.jsxs("div", {
                    className: "flex flex-wrap items-center gap-3 md:gap-4",
                    children: [v.jsx("span", {
                        className: "text-[var(--color-text-secondary)] text-sm",
                        children: "Strategy:"
                    }), v.jsxs("div", {
                        className: "flex flex-wrap items-center gap-2",
                        children: [v.jsx("span", {
                            className: "text-[var(--color-positive)] font-medium",
                            children: "LONG"
                        }), v.jsx(st, {
                            exchange: i.strategy?.longExchange,
                            size: "sm"
                        }), v.jsx("span", {
                            className: "text-[var(--color-text-muted)] mx-1 md:mx-2",
                            children: "+"
                        }), v.jsx("span", {
                            className: "text-[var(--color-negative)] font-medium",
                            children: "SHORT"
                        }), v.jsx(st, {
                            exchange: i.strategy?.shortExchange,
                            size: "sm"
                        })]
                    })]
                })
            })]
        })
    })
}
export {nn as default};
