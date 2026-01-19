import {r as n, j as e} from "./index-fz5sT9EK.js";
function M({history: t=[], onMarkAsRead: m, onMarkAllAsRead: h, onClearHistory: p, priceGaps: u=[], fundingGaps: b=[]}) {
    const [d,g] = n.useState("all")
      , [i,f] = n.useState("")
      , [j,x] = n.useState(!1)
      , v = n.useMemo( () => t.filter(r => !(d !== "all" && r.type !== d || i && !r.ticker?.toLowerCase().includes(i.toLowerCase()))), [t, d, i])
      , l = n.useMemo( () => {
        const r = Date.now()
          , o = r - 1440 * 60 * 1e3
          , c = r - 10080 * 60 * 1e3
          , s = t.filter(a => a.timestamp > o)
          , k = t.filter(a => a.timestamp > c)
          , w = t.filter(a => !a.seen)
          , C = t.length > 0 ? (t.reduce( (a, A) => a + (A.gap || 0), 0) / t.length).toFixed(3) : "0.000";
        return {
            total: t.length,
            today: s.length,
            week: k.length,
            unread: w.length,
            avgGap: C
        }
    }
    , [t])
      , N = r => {
        const o = new Date(r)
          , s = new Date - o;
        return s < 6e4 ? "Just now" : s < 36e5 ? `${Math.floor(s / 6e4)}m ago` : s < 864e5 ? `${Math.floor(s / 36e5)}h ago` : s < 6048e5 ? `${Math.floor(s / 864e5)}d ago` : o.toLocaleDateString("ko-KR", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        })
    }
      , y = r => (r.type === "price" ? u : b).find(c => c.ticker === r.ticker && c.exchangeA === r.exchangeA && c.exchangeB === r.exchangeB);
    return e.jsxs("div", {
        className: "p-4 md:p-6 max-w-4xl mx-auto",
        children: [e.jsxs("div", {
            className: "mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4",
            children: [e.jsxs("div", {
                children: [e.jsx("h1", {
                    className: "text-xl md:text-2xl font-bold text-[var(--color-text-primary)]",
                    children: "Alerts History"
                }), e.jsx("p", {
                    className: "text-sm text-[var(--color-text-secondary)] mt-1",
                    children: "View and manage your alert history"
                })]
            }), e.jsxs("div", {
                className: "flex items-center gap-2",
                children: [l.unread > 0 && e.jsx("button", {
                    onClick: h,
                    className: "px-3 py-1.5 text-xs rounded-lg bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors",
                    children: "Mark All Read"
                }), e.jsx("button", {
                    onClick: () => x(!0),
                    className: "px-3 py-1.5 text-xs rounded-lg bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-negative)] hover:text-[var(--color-negative)] transition-colors",
                    children: "Clear History"
                })]
            })]
        }), e.jsxs("div", {
            className: "grid grid-cols-2 md:grid-cols-5 gap-3 mb-6",
            children: [e.jsxs("div", {
                className: "bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-3 text-center",
                children: [e.jsx("div", {
                    className: "text-xl font-bold text-[var(--color-text-primary)]",
                    children: l.total
                }), e.jsx("div", {
                    className: "text-[10px] text-[var(--color-text-secondary)] mt-0.5",
                    children: "All"
                })]
            }), e.jsxs("div", {
                className: "bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-3 text-center",
                children: [e.jsx("div", {
                    className: "text-xl font-bold text-[var(--color-accent)]",
                    children: l.today
                }), e.jsx("div", {
                    className: "text-[10px] text-[var(--color-text-secondary)] mt-0.5",
                    children: "Today"
                })]
            }), e.jsxs("div", {
                className: "bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-3 text-center",
                children: [e.jsx("div", {
                    className: "text-xl font-bold text-[var(--color-info)]",
                    children: l.week
                }), e.jsx("div", {
                    className: "text-[10px] text-[var(--color-text-secondary)] mt-0.5",
                    children: "This Week"
                })]
            }), e.jsxs("div", {
                className: "bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-3 text-center",
                children: [e.jsx("div", {
                    className: "text-xl font-bold text-[var(--color-warning)]",
                    children: l.unread
                }), e.jsx("div", {
                    className: "text-[10px] text-[var(--color-text-secondary)] mt-0.5",
                    children: "Unread"
                })]
            }), e.jsxs("div", {
                className: "bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-3 text-center col-span-2 md:col-span-1",
                children: [e.jsxs("div", {
                    className: "text-xl font-bold text-[var(--color-positive)]",
                    children: [l.avgGap, "%"]
                }), e.jsx("div", {
                    className: "text-[10px] text-[var(--color-text-secondary)] mt-0.5",
                    children: "Avg Gap"
                })]
            })]
        }), e.jsxs("div", {
            className: "flex flex-col md:flex-row gap-3 mb-4",
            children: [e.jsx("div", {
                className: "flex gap-2",
                children: ["all", "price", "funding"].map(r => e.jsx("button", {
                    onClick: () => g(r),
                    className: `px-3 py-1.5 text-xs rounded-lg border transition-colors ${d === r ? "bg-[var(--color-accent)] text-white border-[var(--color-accent)]" : "border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)]"}`,
                    children: r === "all" ? "All" : r === "price" ? "Price Gap" : "Funding Gap"
                }, r))
            }), e.jsx("div", {
                className: "flex-1",
                children: e.jsxs("div", {
                    className: "relative",
                    children: [e.jsx("svg", {
                        className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        strokeWidth: 1.5,
                        children: e.jsx("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            d: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        })
                    }), e.jsx("input", {
                        type: "text",
                        value: i,
                        onChange: r => f(r.target.value),
                        placeholder: "Search ticker...",
                        className: "w-full pl-9 pr-3 py-2 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                    })]
                })
            })]
        }), e.jsx("div", {
            className: "bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl overflow-hidden",
            children: v.length === 0 ? e.jsxs("div", {
                className: "p-8 text-center",
                children: [e.jsx("svg", {
                    className: "w-12 h-12 mx-auto text-[var(--color-text-muted)] mb-3",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    strokeWidth: 1,
                    children: e.jsx("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        d: "M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                    })
                }), e.jsx("p", {
                    className: "text-[var(--color-text-secondary)]",
                    children: "No alert history"
                }), e.jsx("p", {
                    className: "text-xs text-[var(--color-text-muted)] mt-1",
                    children: "Set alerts in your Watchlist to see them here"
                })]
            }) : e.jsx("div", {
                className: "divide-y divide-[var(--color-border)]",
                children: v.map(r => {
                    const o = y(r);
                    return e.jsx("div", {
                        onClick: () => !r.seen && m?.(r.id),
                        className: `p-4 hover:bg-[var(--color-bg-hover)] transition-colors cursor-pointer ${r.seen ? "" : "bg-[var(--color-accent-muted)]"}`,
                        children: e.jsxs("div", {
                            className: "flex items-start gap-3",
                            children: [e.jsx("div", {
                                className: `w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${r.type === "price" ? "bg-[var(--color-positive)]/10 text-[var(--color-positive)]" : "bg-[var(--color-info)]/10 text-[var(--color-info)]"}`,
                                children: r.type === "price" ? e.jsx("svg", {
                                    className: "w-4 h-4",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    strokeWidth: 1.5,
                                    children: e.jsx("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        d: "M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                                    })
                                }) : e.jsx("svg", {
                                    className: "w-4 h-4",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    strokeWidth: 1.5,
                                    children: e.jsx("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        d: "M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    })
                                })
                            }), e.jsxs("div", {
                                className: "flex-1 min-w-0",
                                children: [e.jsxs("div", {
                                    className: "flex items-center gap-2 mb-1",
                                    children: [e.jsx("span", {
                                        className: "font-semibold text-[var(--color-text-primary)]",
                                        children: r.ticker
                                    }), e.jsx("span", {
                                        className: `text-xs px-1.5 py-0.5 rounded ${r.type === "price" ? "bg-[var(--color-positive)]/10 text-[var(--color-positive)]" : "bg-[var(--color-info)]/10 text-[var(--color-info)]"}`,
                                        children: r.type === "price" ? "Price" : "Funding"
                                    }), !r.seen && e.jsx("span", {
                                        className: "w-2 h-2 rounded-full bg-[var(--color-accent)]"
                                    })]
                                }), e.jsxs("div", {
                                    className: "text-sm text-[var(--color-text-secondary)]",
                                    children: [e.jsx("span", {
                                        className: "font-medium",
                                        children: r.exchangeA
                                    }), e.jsx("span", {
                                        className: "mx-1",
                                        children: "↔"
                                    }), e.jsx("span", {
                                        className: "font-medium",
                                        children: r.exchangeB
                                    })]
                                }), e.jsxs("div", {
                                    className: "flex items-center gap-4 mt-2 text-xs",
                                    children: [e.jsxs("div", {
                                        children: [e.jsx("span", {
                                            className: "text-[var(--color-text-muted)]",
                                            children: "Triggered: "
                                        }), e.jsxs("span", {
                                            className: "text-[var(--color-positive)] font-medium",
                                            children: [r.gap?.toFixed(3), "%"]
                                        })]
                                    }), e.jsxs("div", {
                                        children: [e.jsx("span", {
                                            className: "text-[var(--color-text-muted)]",
                                            children: "Threshold: "
                                        }), e.jsxs("span", {
                                            className: "text-[var(--color-text-secondary)]",
                                            children: [r.threshold?.toFixed(2), "%"]
                                        })]
                                    }), o && e.jsxs("div", {
                                        children: [e.jsx("span", {
                                            className: "text-[var(--color-text-muted)]",
                                            children: "Current: "
                                        }), e.jsxs("span", {
                                            className: o.gap >= r.threshold ? "text-[var(--color-positive)]" : "text-[var(--color-text-secondary)]",
                                            children: [o.gap?.toFixed(3), "%"]
                                        })]
                                    })]
                                })]
                            }), e.jsx("div", {
                                className: "text-xs text-[var(--color-text-muted)] flex-shrink-0",
                                children: N(r.timestamp)
                            })]
                        })
                    }, r.id)
                }
                )
            })
        }), j && e.jsxs("div", {
            className: "fixed inset-0 z-50 flex items-center justify-center p-4",
            children: [e.jsx("div", {
                className: "absolute inset-0 bg-black/60 backdrop-blur-sm",
                onClick: () => x(!1)
            }), e.jsxs("div", {
                className: "relative bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl p-6 max-w-sm w-full shadow-xl animate-fade-in",
                children: [e.jsx("h3", {
                    className: "text-lg font-semibold text-[var(--color-text-primary)] mb-2",
                    children: "Clear Alert History"
                }), e.jsx("p", {
                    className: "text-sm text-[var(--color-text-secondary)] mb-4",
                    children: "All alert history will be deleted. This action cannot be undone."
                }), e.jsxs("div", {
                    className: "flex gap-3",
                    children: [e.jsx("button", {
                        onClick: () => x(!1),
                        className: "flex-1 px-4 py-2 text-sm rounded-lg border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-hover)] transition-colors",
                        children: "Cancel"
                    }), e.jsx("button", {
                        onClick: () => {
                            p?.(),
                            x(!1)
                        }
                        ,
                        className: "flex-1 px-4 py-2 text-sm rounded-lg bg-[var(--color-negative)] text-white hover:bg-[var(--color-negative)]/90 transition-colors",
                        children: "Delete"
                    })]
                })]
            })]
        })]
    })
}
export {M as default};
