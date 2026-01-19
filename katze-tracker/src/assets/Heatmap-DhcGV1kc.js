import {r as b, j as e} from "./index-fz5sT9EK.js";
const j = (s, o=!0) => {
    if (s == null)
        return o ? "rgba(255, 255, 255, 0.03)" : "rgba(0, 0, 0, 0.03)";
    const l = Math.abs(s);
    return l < .05 ? o ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)" : l < .1 ? "rgba(34, 197, 94, 0.15)" : l < .2 ? "rgba(34, 197, 94, 0.25)" : l < .3 ? "rgba(34, 197, 94, 0.4)" : l < .5 ? "rgba(34, 197, 94, 0.55)" : l < .8 ? "rgba(34, 197, 94, 0.7)" : l < 1 ? "rgba(34, 197, 94, 0.85)" : "rgba(234, 179, 8, 0.9)"
}
  , N = s => {
    if (s == null)
        return "var(--color-text-muted)";
    const o = Math.abs(s);
    return o < .1 ? "var(--color-text-tertiary)" : o < .3 ? "var(--color-text-secondary)" : o >= 1 ? "#0a0a0a" : o >= .5 ? "white" : "var(--color-text-primary)"
}
;
function w({priceGaps: s=[], onRowClick: o}) {
    const [l,p] = b.useState(null)
      , [m,u] = b.useState("maxGap")
      , x = b.useMemo( () => {
        const t = new Set;
        s.forEach(r => {
            r.exchangeA && t.add(r.exchangeA),
            r.exchangeB && t.add(r.exchangeB)
        }
        );
        const i = Array.from(t).sort()
          , a = new Map;
        s.forEach(r => {
            const d = r.ticker;
            a.has(d) || a.set(d, {
                ticker: d,
                exchanges: {},
                maxGap: 0,
                gaps: []
            });
            const v = a.get(d)
              , f = `${r.exchangeA}-${r.exchangeB}`;
            v.exchanges[f] = {
                gap: r.priceGap,
                exchangeA: r.exchangeA,
                exchangeB: r.exchangeB,
                priceA: r.priceA?.value,
                priceB: r.priceB?.value,
                raw: r
            },
            v.gaps.push(r),
            Math.abs(r.priceGap) > v.maxGap && (v.maxGap = Math.abs(r.priceGap))
        }
        );
        let c = Array.from(a.values());
        m === "maxGap" ? c.sort( (r, d) => d.maxGap - r.maxGap) : c.sort( (r, d) => r.ticker.localeCompare(d.ticker));
        const n = new Set;
        s.forEach(r => {
            n.add(`${r.exchangeA}-${r.exchangeB}`)
        }
        );
        const h = Array.from(n).sort();
        return {
            tickers: c,
            pairs: h,
            exchanges: i
        }
    }
    , [s, m])
      , g = (t, i) => {
        const a = t.exchanges[i];
        a?.raw && o && o(a.raw)
    }
    ;
    return s.length === 0 ? e.jsx("div", {
        className: "p-6 flex items-center justify-center h-64",
        children: e.jsx("div", {
            className: "text-[var(--color-text-secondary)]",
            children: "Loading data..."
        })
    }) : e.jsxs("div", {
        className: "p-4 md:p-6",
        children: [e.jsxs("div", {
            className: "mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4",
            children: [e.jsxs("div", {
                children: [e.jsx("h1", {
                    className: "text-xl md:text-2xl font-bold text-[var(--color-text-primary)]",
                    children: "Gap Heatmap"
                }), e.jsx("p", {
                    className: "text-sm text-[var(--color-text-secondary)] mt-1",
                    children: "Visualize price gaps across exchange pairs"
                })]
            }), e.jsxs("div", {
                className: "flex items-center gap-2",
                children: [e.jsx("span", {
                    className: "text-xs text-[var(--color-text-secondary)]",
                    children: "Sort:"
                }), e.jsx("button", {
                    onClick: () => u("maxGap"),
                    className: `px-3 py-1.5 text-xs rounded-lg border transition-colors ${m === "maxGap" ? "bg-[var(--color-accent)] text-white border-[var(--color-accent)]" : "border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)]"}`,
                    children: "Max Gap"
                }), e.jsx("button", {
                    onClick: () => u("ticker"),
                    className: `px-3 py-1.5 text-xs rounded-lg border transition-colors ${m === "ticker" ? "bg-[var(--color-accent)] text-white border-[var(--color-accent)]" : "border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)]"}`,
                    children: "Ticker"
                })]
            })]
        }), e.jsxs("div", {
            className: "mb-4 flex flex-wrap items-center gap-3 text-xs",
            children: [e.jsx("span", {
                className: "text-[var(--color-text-secondary)]",
                children: "Gap Range:"
            }), e.jsxs("div", {
                className: "flex items-center gap-1",
                children: [e.jsx("div", {
                    className: "w-4 h-4 rounded",
                    style: {
                        background: "rgba(255, 255, 255, 0.05)"
                    }
                }), e.jsx("span", {
                    className: "text-[var(--color-text-muted)]",
                    children: "<0.05%"
                })]
            }), e.jsxs("div", {
                className: "flex items-center gap-1",
                children: [e.jsx("div", {
                    className: "w-4 h-4 rounded",
                    style: {
                        background: "rgba(34, 197, 94, 0.25)"
                    }
                }), e.jsx("span", {
                    className: "text-[var(--color-text-muted)]",
                    children: "0.1-0.2%"
                })]
            }), e.jsxs("div", {
                className: "flex items-center gap-1",
                children: [e.jsx("div", {
                    className: "w-4 h-4 rounded",
                    style: {
                        background: "rgba(34, 197, 94, 0.55)"
                    }
                }), e.jsx("span", {
                    className: "text-[var(--color-text-muted)]",
                    children: "0.3-0.5%"
                })]
            }), e.jsxs("div", {
                className: "flex items-center gap-1",
                children: [e.jsx("div", {
                    className: "w-4 h-4 rounded",
                    style: {
                        background: "rgba(34, 197, 94, 0.85)"
                    }
                }), e.jsx("span", {
                    className: "text-[var(--color-text-muted)]",
                    children: "0.8-1%"
                })]
            }), e.jsxs("div", {
                className: "flex items-center gap-1",
                children: [e.jsx("div", {
                    className: "w-4 h-4 rounded",
                    style: {
                        background: "rgba(234, 179, 8, 0.9)"
                    }
                }), e.jsx("span", {
                    className: "text-[var(--color-text-muted)]",
                    children: ">1%"
                })]
            })]
        }), e.jsx("div", {
            className: "bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl overflow-hidden",
            children: e.jsx("div", {
                className: "overflow-x-auto",
                children: e.jsxs("table", {
                    className: "w-full min-w-[600px]",
                    children: [e.jsx("thead", {
                        children: e.jsxs("tr", {
                            className: "border-b border-[var(--color-border)]",
                            children: [e.jsx("th", {
                                className: "px-3 py-3 text-left text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider bg-[var(--color-bg-tertiary)] sticky left-0 z-10",
                                children: "Ticker"
                            }), x.pairs.map(t => e.jsx("th", {
                                className: "px-2 py-3 text-center text-[10px] font-medium text-[var(--color-text-secondary)] uppercase tracking-wider bg-[var(--color-bg-tertiary)]",
                                children: t.split("-").map( (i, a) => e.jsxs("span", {
                                    children: [a > 0 && e.jsx("span", {
                                        className: "text-[var(--color-text-muted)]",
                                        children: " / "
                                    }), e.jsx("span", {
                                        children: i.slice(0, 4)
                                    })]
                                }, a))
                            }, t))]
                        })
                    }), e.jsx("tbody", {
                        children: x.tickers.map( (t, i) => e.jsxs("tr", {
                            className: `border-b border-[var(--color-border)] ${i % 2 === 0 ? "" : "bg-[var(--color-bg-tertiary)]/30"}`,
                            children: [e.jsx("td", {
                                className: "px-3 py-2 text-sm font-medium text-[var(--color-text-primary)] sticky left-0 bg-[var(--color-bg-card)] z-10 border-r border-[var(--color-border)]",
                                children: e.jsxs("div", {
                                    className: "flex items-center gap-2",
                                    children: [e.jsx("span", {
                                        children: t.ticker
                                    }), t.maxGap >= .5 && e.jsxs("span", {
                                        className: "text-[10px] px-1.5 py-0.5 rounded bg-[var(--color-accent-muted)] text-[var(--color-accent)]",
                                        children: [t.maxGap.toFixed(2), "%"]
                                    })]
                                })
                            }), x.pairs.map(a => {
                                const c = t.exchanges[a]
                                  , n = c?.gap
                                  , h = `${t.ticker}-${a}`
                                  , r = l === h;
                                return e.jsxs("td", {
                                    className: "px-1 py-1 text-center relative",
                                    onMouseEnter: () => p(h),
                                    onMouseLeave: () => p(null),
                                    children: [e.jsx("button", {
                                        onClick: () => g(t, a),
                                        disabled: !c,
                                        className: `
                            w-full h-8 rounded-md text-xs font-medium transition-all duration-150
                            ${c ? "cursor-pointer hover:scale-105 hover:shadow-lg" : "cursor-default"}
                            ${r ? "ring-2 ring-[var(--color-accent)] ring-offset-1 ring-offset-[var(--color-bg-card)]" : ""}
                          `,
                                        style: {
                                            backgroundColor: j(n),
                                            color: N(n)
                                        },
                                        children: n != null ? `${n.toFixed(2)}%` : "-"
                                    }), r && c && e.jsxs("div", {
                                        className: "absolute z-20 bottom-full left-1/2 -translate-x-1/2 mb-2 p-3 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-lg shadow-lg min-w-[180px] text-left animate-fade-in",
                                        children: [e.jsx("div", {
                                            className: "text-sm font-semibold text-[var(--color-text-primary)] mb-2",
                                            children: t.ticker
                                        }), e.jsxs("div", {
                                            className: "space-y-1 text-xs",
                                            children: [e.jsxs("div", {
                                                className: "flex justify-between",
                                                children: [e.jsxs("span", {
                                                    className: "text-[var(--color-text-secondary)]",
                                                    children: [c.exchangeA, ":"]
                                                }), e.jsxs("span", {
                                                    className: "text-[var(--color-text-primary)] font-mono",
                                                    children: ["$", c.priceA?.toFixed(4)]
                                                })]
                                            }), e.jsxs("div", {
                                                className: "flex justify-between",
                                                children: [e.jsxs("span", {
                                                    className: "text-[var(--color-text-secondary)]",
                                                    children: [c.exchangeB, ":"]
                                                }), e.jsxs("span", {
                                                    className: "text-[var(--color-text-primary)] font-mono",
                                                    children: ["$", c.priceB?.toFixed(4)]
                                                })]
                                            }), e.jsx("div", {
                                                className: "border-t border-[var(--color-border)] pt-1 mt-1",
                                                children: e.jsxs("div", {
                                                    className: "flex justify-between",
                                                    children: [e.jsx("span", {
                                                        className: "text-[var(--color-text-secondary)]",
                                                        children: "Gap:"
                                                    }), e.jsxs("span", {
                                                        className: "text-[var(--color-positive)] font-semibold",
                                                        children: [n?.toFixed(3), "%"]
                                                    })]
                                                })
                                            })]
                                        }), e.jsx("div", {
                                            className: "text-[10px] text-[var(--color-text-muted)] mt-2",
                                            children: "Click to view chart"
                                        })]
                                    })]
                                }, a)
                            }
                            )]
                        }, t.ticker))
                    })]
                })
            })
        }), e.jsxs("div", {
            className: "mt-6 grid grid-cols-2 md:grid-cols-4 gap-4",
            children: [e.jsxs("div", {
                className: "bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-4 text-center",
                children: [e.jsx("div", {
                    className: "text-2xl font-bold text-[var(--color-text-primary)]",
                    children: x.tickers.length
                }), e.jsx("div", {
                    className: "text-xs text-[var(--color-text-secondary)] mt-1",
                    children: "Total Tickers"
                })]
            }), e.jsxs("div", {
                className: "bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-4 text-center",
                children: [e.jsx("div", {
                    className: "text-2xl font-bold text-[var(--color-text-primary)]",
                    children: x.pairs.length
                }), e.jsx("div", {
                    className: "text-xs text-[var(--color-text-secondary)] mt-1",
                    children: "Exchange Pairs"
                })]
            }), e.jsxs("div", {
                className: "bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-4 text-center",
                children: [e.jsx("div", {
                    className: "text-2xl font-bold text-[var(--color-positive)]",
                    children: x.tickers.filter(t => t.maxGap >= .3).length
                }), e.jsx("div", {
                    className: "text-xs text-[var(--color-text-secondary)] mt-1",
                    children: "0.3%+ Opportunities"
                })]
            }), e.jsxs("div", {
                className: "bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-4 text-center",
                children: [e.jsxs("div", {
                    className: "text-2xl font-bold text-[var(--color-warning)]",
                    children: [Math.max(...x.tickers.map(t => t.maxGap), 0).toFixed(2), "%"]
                }), e.jsx("div", {
                    className: "text-xs text-[var(--color-text-secondary)] mt-1",
                    children: "Max Gap"
                })]
            })]
        })]
    })
}
export {w as default};
