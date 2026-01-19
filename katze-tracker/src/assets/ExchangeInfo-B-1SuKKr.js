import {r as m, A as c, a as x, j as e, E as i} from "./index-fz5sT9EK.js";
const d = t => t === 0 ? "0%" : `${t}%`;
function u() {
    const [t,o] = m.useState({})
      , l = c.map(r => x[r]).filter(r => r.description)
      , n = (r, s) => {
        s.preventDefault(),
        s.stopPropagation(),
        o(a => ({
            ...a,
            [r]: !a[r]
        }))
    }
    ;
    return e.jsxs("div", {
        className: "space-y-3 md:space-y-4",
        children: [e.jsxs("div", {
            className: "bg-[var(--color-bg-card)] rounded-xl md:rounded-2xl p-4 md:p-6 border border-[var(--color-border)]",
            children: [e.jsx("h2", {
                className: "text-[var(--color-text-primary)] font-semibold text-base md:text-lg mb-1 md:mb-2",
                children: "Supported Exchanges"
            }), e.jsx("p", {
                className: "text-[var(--color-text-muted)] text-xs md:text-sm",
                children: "Connected decentralized perpetual exchanges"
            })]
        }), e.jsx("div", {
            className: "grid gap-3 md:gap-4",
            children: l.map(r => e.jsxs("a", {
                href: r.referral,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "bg-[var(--color-bg-card)] rounded-xl md:rounded-2xl p-3 md:p-5 border border-[var(--color-border)] hover:border-[var(--color-accent)]/30 transition-all duration-200 group block",
                children: [e.jsxs("div", {
                    className: "flex items-center justify-between",
                    children: [e.jsxs("div", {
                        className: "flex items-center gap-2 md:gap-3",
                        children: [e.jsx(i, {
                            exchange: r.name,
                            size: "md",
                            clickable: !1
                        }), e.jsx("span", {
                            className: "text-[var(--color-text-muted)] text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 md:py-1 bg-[var(--color-bg-tertiary)] rounded-md md:rounded-lg",
                            children: r.chain
                        })]
                    }), e.jsxs("div", {
                        className: "flex items-center gap-2",
                        children: [e.jsxs("button", {
                            onClick: s => n(r.name, s),
                            className: "md:hidden flex items-center gap-1 px-2 py-1.5 text-xs text-[var(--color-text-muted)] bg-[var(--color-bg-tertiary)] rounded-md",
                            children: [t[r.name] ? "Less" : "More", e.jsx("svg", {
                                className: `w-3 h-3 transition-transform ${t[r.name] ? "rotate-180" : ""}`,
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                children: e.jsx("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                    d: "M19 9l-7 7-7-7"
                                })
                            })]
                        }), e.jsx("svg", {
                            className: "w-4 h-4 text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] transition-colors",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24",
                            children: e.jsx("path", {
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeWidth: 2,
                                d: "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            })
                        })]
                    })]
                }), e.jsxs("div", {
                    className: `${t[r.name] ? "block" : "hidden"} md:block mt-3 md:mt-4`,
                    children: [e.jsx("p", {
                        className: "text-[var(--color-text-secondary)] text-xs md:text-sm mb-3 md:mb-5 leading-relaxed",
                        children: r.description
                    }), e.jsxs("div", {
                        className: "grid grid-cols-3 gap-2 md:gap-4",
                        children: [e.jsxs("div", {
                            className: "bg-[var(--color-bg-tertiary)] rounded-lg md:rounded-xl p-2 md:p-3",
                            children: [e.jsx("span", {
                                className: "text-[var(--color-text-muted)] text-[9px] md:text-[10px] uppercase tracking-wider block mb-0.5 md:mb-1",
                                children: "Maker/Taker"
                            }), e.jsxs("span", {
                                className: "text-[var(--color-text-primary)] font-medium text-xs md:text-sm",
                                children: [d(r.fees.maker), "/", d(r.fees.taker)]
                            })]
                        }), e.jsxs("div", {
                            className: "bg-[var(--color-bg-tertiary)] rounded-lg md:rounded-xl p-2 md:p-3",
                            children: [e.jsx("span", {
                                className: "text-[var(--color-text-muted)] text-[9px] md:text-[10px] uppercase tracking-wider block mb-0.5 md:mb-1",
                                children: "Funding"
                            }), e.jsx("span", {
                                className: "text-[var(--color-positive)] font-medium text-xs md:text-sm",
                                children: r.funding || "-"
                            })]
                        }), e.jsxs("div", {
                            className: "bg-[var(--color-bg-tertiary)] rounded-lg md:rounded-xl p-2 md:p-3",
                            children: [e.jsx("span", {
                                className: "text-[var(--color-text-muted)] text-[9px] md:text-[10px] uppercase tracking-wider block mb-0.5 md:mb-1",
                                children: "Investors"
                            }), e.jsx("span", {
                                className: "text-[var(--color-text-secondary)] font-medium text-xs md:text-sm truncate block",
                                children: r.investors || "-"
                            })]
                        })]
                    })]
                })]
            }, r.name))
        })]
    })
}
export {u as default};
