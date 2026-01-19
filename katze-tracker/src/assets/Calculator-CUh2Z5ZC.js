import {r as a, g as T, j as e, b, A as F} from "./index-fz5sT9EK.js";
const G = () => e.jsx("svg", {
    className: "w-4 h-4",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    children: e.jsx("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
    })
});
function _({priceGaps: k=[]}) {
    const [d,C] = a.useState(1e3)
      , [c,h] = a.useState(.3)
      , [p,R] = a.useState(1)
      , [l,w] = a.useState("Hyperliquid")
      , [n,S] = a.useState("Paradex")
      , [i,A] = a.useState("taker")
      , [x,$] = a.useState("taker")
      , [u,H] = a.useState(.02)
      , [g,D] = a.useState(0)
      , m = T(l)
      , v = T(n)
      , o = a.useMemo( () => {
        const r = d * p
          , s = m[i] || 0
          , M = v[x] || 0
          , j = r * s / 100
          , f = r * M / 100
          , B = j + f
          , E = r * u / 100
          , P = r * g / 100
          , N = B + E + P
          , L = r * c / 100
          , y = L - N
          , W = y / d * 100
          , z = N / r * 100
          , I = (j + f) / r * 100;
        return {
            positionSize: r,
            feeA: j,
            feeB: f,
            totalFees: B,
            feeRateA: s,
            feeRateB: M,
            slippageCost: E,
            fundingCostTotal: P,
            totalCost: N,
            grossProfit: L,
            netProfit: y,
            roi: W,
            breakEvenGap: z,
            minGap: I,
            isProfitable: y > 0
        }
    }
    , [d, c, p, m, v, i, x, u, g])
      , V = r => {
        h(r.gap),
        r.exchangeA && w(r.exchangeA),
        r.exchangeB && S(r.exchangeB)
    }
      , t = (r, s=2) => typeof r != "number" || isNaN(r) ? "0.00" : r.toLocaleString("en-US", {
        minimumFractionDigits: s,
        maximumFractionDigits: s
    });
    return e.jsxs("div", {
        className: "p-4 md:p-6 max-w-6xl mx-auto",
        children: [e.jsxs("div", {
            className: "mb-6",
            children: [e.jsx("h1", {
                className: "text-xl md:text-2xl font-bold text-[var(--color-text-primary)]",
                children: "Arbitrage Calculator"
            }), e.jsx("p", {
                className: "text-sm text-[var(--color-text-secondary)] mt-1",
                children: "Simulate arbitrage trading profits"
            })]
        }), e.jsxs("div", {
            className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
            children: [e.jsxs("div", {
                className: "lg:col-span-2 space-y-6",
                children: [e.jsxs("div", {
                    className: "bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-4 md:p-6",
                    children: [e.jsxs("h2", {
                        className: "text-sm font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2",
                        children: [e.jsx("svg", {
                            className: "w-4 h-4 text-[var(--color-accent)]",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24",
                            strokeWidth: 1.5,
                            children: e.jsx("path", {
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                d: "M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                            })
                        }), "Basic Settings"]
                    }), e.jsxs("div", {
                        className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                        children: [e.jsxs("div", {
                            children: [e.jsx("label", {
                                className: "block text-xs text-[var(--color-text-secondary)] mb-1.5",
                                children: "Entry Amount (USD)"
                            }), e.jsxs("div", {
                                className: "relative",
                                children: [e.jsx("span", {
                                    className: "absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]",
                                    children: "$"
                                }), e.jsx("input", {
                                    type: "number",
                                    value: d,
                                    onChange: r => C(Math.max(0, Number(r.target.value))),
                                    className: "w-full pl-7 pr-3 py-2.5 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)] transition-colors",
                                    placeholder: "1000"
                                })]
                            }), e.jsx("div", {
                                className: "flex gap-2 mt-2",
                                children: [100, 500, 1e3, 5e3].map(r => e.jsxs("button", {
                                    onClick: () => C(r),
                                    className: `px-2 py-1 text-xs rounded-md border transition-colors ${d === r ? "bg-[var(--color-accent)] text-white border-[var(--color-accent)]" : "border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)]"}`,
                                    children: ["$", r]
                                }, r))
                            })]
                        }), e.jsxs("div", {
                            children: [e.jsx("label", {
                                className: "block text-xs text-[var(--color-text-secondary)] mb-1.5",
                                children: "Gap (%)"
                            }), e.jsxs("div", {
                                className: "relative",
                                children: [e.jsx("input", {
                                    type: "number",
                                    value: c,
                                    onChange: r => h(Math.max(0, Number(r.target.value))),
                                    step: "0.01",
                                    className: "w-full px-3 py-2.5 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)] transition-colors",
                                    placeholder: "0.3"
                                }), e.jsx("span", {
                                    className: "absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]",
                                    children: "%"
                                })]
                            }), e.jsx("input", {
                                type: "range",
                                min: "0",
                                max: "2",
                                step: "0.01",
                                value: c,
                                onChange: r => h(Number(r.target.value)),
                                className: "w-full mt-2 accent-[var(--color-accent)]"
                            })]
                        }), e.jsxs("div", {
                            children: [e.jsx("label", {
                                className: "block text-xs text-[var(--color-text-secondary)] mb-1.5",
                                children: "Leverage"
                            }), e.jsxs("div", {
                                className: "relative",
                                children: [e.jsx("input", {
                                    type: "number",
                                    min: "1",
                                    max: "100",
                                    step: "1",
                                    value: p,
                                    onChange: r => R(Math.max(1, Math.min(100, Number(r.target.value) || 1))),
                                    className: "w-full px-3 py-2.5 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                                }), e.jsx("span", {
                                    className: "absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] text-sm",
                                    children: "x"
                                })]
                            })]
                        }), e.jsxs("div", {
                            children: [e.jsx("label", {
                                className: "block text-xs text-[var(--color-text-secondary)] mb-1.5",
                                children: "Est. Slippage (%)"
                            }), e.jsx("input", {
                                type: "number",
                                value: u,
                                onChange: r => H(Math.max(0, Number(r.target.value))),
                                step: "0.01",
                                className: "w-full px-3 py-2.5 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)] transition-colors",
                                placeholder: "0.02"
                            })]
                        })]
                    })]
                }), e.jsxs("div", {
                    className: "bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-4 md:p-6",
                    children: [e.jsxs("h2", {
                        className: "text-sm font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2",
                        children: [e.jsx("svg", {
                            className: "w-4 h-4 text-[var(--color-accent)]",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24",
                            strokeWidth: 1.5,
                            children: e.jsx("path", {
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                d: "M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3h.75m-.75 3h.75m-.75 3h.75"
                            })
                        }), "Exchanges & Fees"]
                    }), e.jsxs("div", {
                        className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                        children: [e.jsxs("div", {
                            className: "space-y-3",
                            children: [e.jsx("div", {
                                className: "text-xs font-medium text-[var(--color-text-secondary)]",
                                children: "Exchange A (Long)"
                            }), e.jsxs("div", {
                                className: "flex items-center gap-2",
                                children: [e.jsx("select", {
                                    value: l,
                                    onChange: r => w(r.target.value),
                                    className: "flex-1 px-3 py-2.5 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)] transition-colors",
                                    children: F.map(r => e.jsx("option", {
                                        value: r,
                                        children: r
                                    }, r))
                                }), b(l) && e.jsx("a", {
                                    href: b(l),
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                    className: "p-2.5 rounded-lg border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-colors",
                                    title: `Trade on ${l}`,
                                    children: e.jsx(G, {})
                                })]
                            }), e.jsxs("div", {
                                className: "flex gap-2",
                                children: [e.jsxs("button", {
                                    onClick: () => A("maker"),
                                    className: `flex-1 px-3 py-2 text-xs rounded-lg border transition-colors ${i === "maker" ? "bg-[var(--color-accent-muted)] border-[var(--color-accent)] text-[var(--color-accent)]" : "border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-hover)]"}`,
                                    children: ["Maker (", m.maker, "%)"]
                                }), e.jsxs("button", {
                                    onClick: () => A("taker"),
                                    className: `flex-1 px-3 py-2 text-xs rounded-lg border transition-colors ${i === "taker" ? "bg-[var(--color-accent-muted)] border-[var(--color-accent)] text-[var(--color-accent)]" : "border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-hover)]"}`,
                                    children: ["Taker (", m.taker, "%)"]
                                })]
                            })]
                        }), e.jsxs("div", {
                            className: "space-y-3",
                            children: [e.jsx("div", {
                                className: "text-xs font-medium text-[var(--color-text-secondary)]",
                                children: "Exchange B (Short)"
                            }), e.jsxs("div", {
                                className: "flex items-center gap-2",
                                children: [e.jsx("select", {
                                    value: n,
                                    onChange: r => S(r.target.value),
                                    className: "flex-1 px-3 py-2.5 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)] transition-colors",
                                    children: F.map(r => e.jsx("option", {
                                        value: r,
                                        children: r
                                    }, r))
                                }), b(n) && e.jsx("a", {
                                    href: b(n),
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                    className: "p-2.5 rounded-lg border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-colors",
                                    title: `Trade on ${n}`,
                                    children: e.jsx(G, {})
                                })]
                            }), e.jsxs("div", {
                                className: "flex gap-2",
                                children: [e.jsxs("button", {
                                    onClick: () => $("maker"),
                                    className: `flex-1 px-3 py-2 text-xs rounded-lg border transition-colors ${x === "maker" ? "bg-[var(--color-accent-muted)] border-[var(--color-accent)] text-[var(--color-accent)]" : "border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-hover)]"}`,
                                    children: ["Maker (", v.maker, "%)"]
                                }), e.jsxs("button", {
                                    onClick: () => $("taker"),
                                    className: `flex-1 px-3 py-2 text-xs rounded-lg border transition-colors ${x === "taker" ? "bg-[var(--color-accent-muted)] border-[var(--color-accent)] text-[var(--color-accent)]" : "border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-hover)]"}`,
                                    children: ["Taker (", v.taker, "%)"]
                                })]
                            })]
                        })]
                    }), e.jsxs("div", {
                        className: "mt-4",
                        children: [e.jsx("label", {
                            className: "block text-xs text-[var(--color-text-secondary)] mb-1.5",
                            children: "Est. Funding Cost (%)"
                        }), e.jsx("input", {
                            type: "number",
                            value: g,
                            onChange: r => D(Number(r.target.value)),
                            step: "0.001",
                            className: "w-full px-3 py-2.5 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)] transition-colors",
                            placeholder: "0"
                        })]
                    })]
                }), k.length > 0 && e.jsxs("div", {
                    className: "bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-4 md:p-6",
                    children: [e.jsxs("h2", {
                        className: "text-sm font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2",
                        children: [e.jsx("svg", {
                            className: "w-4 h-4 text-[var(--color-accent)]",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24",
                            strokeWidth: 1.5,
                            children: e.jsx("path", {
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                d: "M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5"
                            })
                        }), "Select Current Gap"]
                    }), e.jsx("div", {
                        className: "flex flex-wrap gap-2 max-h-32 overflow-auto",
                        children: k.slice(0, 10).map( (r, s) => e.jsxs("button", {
                            onClick: () => V(r),
                            className: "px-3 py-1.5 text-xs rounded-lg bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] hover:border-[var(--color-accent)] text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors",
                            children: [e.jsx("span", {
                                className: "font-medium",
                                children: r.ticker
                            }), e.jsxs("span", {
                                className: "ml-2 text-[var(--color-positive)]",
                                children: [r.gap?.toFixed(3), "%"]
                            })]
                        }, s))
                    })]
                })]
            }), e.jsxs("div", {
                className: "space-y-4",
                children: [e.jsxs("div", {
                    className: `bg-[var(--color-bg-card)] border rounded-xl p-6 text-center ${o.isProfitable ? "border-[var(--color-positive)]/30" : "border-[var(--color-negative)]/30"}`,
                    children: [e.jsx("div", {
                        className: "text-xs text-[var(--color-text-secondary)] mb-2",
                        children: "Est. Net Profit"
                    }), e.jsxs("div", {
                        className: `text-3xl font-bold ${o.isProfitable ? "text-[var(--color-positive)]" : "text-[var(--color-negative)]"}`,
                        children: ["$", t(o.netProfit)]
                    }), e.jsxs("div", {
                        className: `text-sm mt-1 ${o.isProfitable ? "text-[var(--color-positive)]" : "text-[var(--color-negative)]"}`,
                        children: [o.roi >= 0 ? "+" : "", t(o.roi), "% ROI"]
                    })]
                }), e.jsxs("div", {
                    className: "bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-4",
                    children: [e.jsx("h3", {
                        className: "text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-3",
                        children: "Details"
                    }), e.jsxs("div", {
                        className: "space-y-2.5",
                        children: [e.jsxs("div", {
                            className: "flex justify-between text-sm",
                            children: [e.jsx("span", {
                                className: "text-[var(--color-text-secondary)]",
                                children: "Position Size"
                            }), e.jsxs("span", {
                                className: "text-[var(--color-text-primary)] font-medium",
                                children: ["$", t(o.positionSize)]
                            })]
                        }), e.jsxs("div", {
                            className: "flex justify-between text-sm",
                            children: [e.jsx("span", {
                                className: "text-[var(--color-text-secondary)]",
                                children: "Gross Profit (Gap)"
                            }), e.jsxs("span", {
                                className: "text-[var(--color-positive)]",
                                children: ["+$", t(o.grossProfit)]
                            })]
                        }), e.jsx("div", {
                            className: "border-t border-[var(--color-border)] my-2"
                        }), e.jsxs("div", {
                            className: "flex justify-between text-sm",
                            children: [e.jsxs("span", {
                                className: "text-[var(--color-text-secondary)]",
                                children: [l, " Fee (", o.feeRateA, "%)"]
                            }), e.jsxs("span", {
                                className: "text-[var(--color-negative)]",
                                children: ["-$", t(o.feeA)]
                            })]
                        }), e.jsxs("div", {
                            className: "flex justify-between text-sm",
                            children: [e.jsxs("span", {
                                className: "text-[var(--color-text-secondary)]",
                                children: [n, " Fee (", o.feeRateB, "%)"]
                            }), e.jsxs("span", {
                                className: "text-[var(--color-negative)]",
                                children: ["-$", t(o.feeB)]
                            })]
                        }), e.jsxs("div", {
                            className: "flex justify-between text-sm",
                            children: [e.jsx("span", {
                                className: "text-[var(--color-text-secondary)]",
                                children: "Slippage"
                            }), e.jsxs("span", {
                                className: "text-[var(--color-negative)]",
                                children: ["-$", t(o.slippageCost)]
                            })]
                        }), o.fundingCostTotal > 0 && e.jsxs("div", {
                            className: "flex justify-between text-sm",
                            children: [e.jsx("span", {
                                className: "text-[var(--color-text-secondary)]",
                                children: "Funding Cost"
                            }), e.jsxs("span", {
                                className: "text-[var(--color-negative)]",
                                children: ["-$", t(o.fundingCostTotal)]
                            })]
                        }), e.jsx("div", {
                            className: "border-t border-[var(--color-border)] my-2"
                        }), e.jsxs("div", {
                            className: "flex justify-between text-sm font-medium",
                            children: [e.jsx("span", {
                                className: "text-[var(--color-text-secondary)]",
                                children: "Total Cost"
                            }), e.jsxs("span", {
                                className: "text-[var(--color-negative)]",
                                children: ["-$", t(o.totalCost)]
                            })]
                        })]
                    })]
                }), e.jsxs("div", {
                    className: "bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-4",
                    children: [e.jsx("h3", {
                        className: "text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-3",
                        children: "Break-even"
                    }), e.jsxs("div", {
                        className: "space-y-2",
                        children: [e.jsxs("div", {
                            className: "flex justify-between text-sm",
                            children: [e.jsx("span", {
                                className: "text-[var(--color-text-secondary)]",
                                children: "Min Gap (Fees)"
                            }), e.jsxs("span", {
                                className: "text-[var(--color-warning)]",
                                children: [t(o.minGap, 3), "%"]
                            })]
                        }), e.jsxs("div", {
                            className: "flex justify-between text-sm",
                            children: [e.jsx("span", {
                                className: "text-[var(--color-text-secondary)]",
                                children: "Break-even (Total)"
                            }), e.jsxs("span", {
                                className: "text-[var(--color-warning)]",
                                children: [t(o.breakEvenGap, 3), "%"]
                            })]
                        })]
                    }), c > 0 && e.jsx("div", {
                        className: "mt-3 pt-3 border-t border-[var(--color-border)]",
                        children: e.jsxs("div", {
                            className: "flex items-center gap-2",
                            children: [e.jsx("div", {
                                className: `w-2 h-2 rounded-full ${o.isProfitable ? "bg-[var(--color-positive)]" : "bg-[var(--color-negative)]"}`
                            }), e.jsxs("span", {
                                className: "text-xs text-[var(--color-text-secondary)]",
                                children: ["Current gap (", c, "%) is ", o.isProfitable ? "above" : "below", " break-even"]
                            })]
                        })
                    })]
                })]
            })]
        })]
    })
}
export {_ as default};
