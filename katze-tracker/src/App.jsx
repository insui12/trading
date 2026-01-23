import React, { useEffect, useRef, useState } from 'react';

// --- 1. 아이콘 및 데이터 상수 (변경 없음) ---
const ICONS = {
  grid: <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />,
  eye: <><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></>,
  eyeOff: <><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223a10.477 10.477 0 00-1.938 3.777C3.334 15.338 6.46 17.5 10 17.5c1.617 0 3.155-.379 4.507-1.05m2.453-2.005A10.445 10.445 0 0018.066 12C16.774 8.662 13.648 6.5 10 6.5c-.681 0-1.34.074-1.973.215" /><path strokeLinecap="round" strokeLinejoin="round" d="M4.707 4.707l14.586 14.586" /><path strokeLinecap="round" strokeLinejoin="round" d="M14.12 14.12a3 3 0 01-4.24-4.24" /></>,
  building: <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3h.75m-.75 3h.75m-.75 3h.75m-.75 3h.75" />,
  calculator: <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z" />,
  chart: <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />,
  bell: <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />,
  community: <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.75-7.5A9.094 9.094 0 0018 3.75m-4.5 14.97a9.11 9.11 0 01-9 0m9 0a9.1 9.1 0 003.75-7.5 9.094 9.094 0 00-3.75-7.5m-9 15a9.1 9.1 0 01-3.75-7.5 9.094 9.094 0 013.75-7.5m9 15v-3.75a3.75 3.75 0 00-3.75-3.75H9a3.75 3.75 0 00-3.75 3.75V18.75m9 0H9m4.5-12a3 3 0 11-6 0 3 3 0 016 0zm7.5 2.25a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />,
  heatmap: <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
};

const MENU_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: "grid" },
  { id: "watchlist", label: "Watchlist", icon: "eye" },
  { id: "exchanges", label: "Exchanges", icon: "building" },
  { id: "calculator", label: "Calculator", icon: "calculator" },
  { id: "heatmap", label: "Heatmap", icon: "heatmap" },
  { id: "analytics", label: "Analytics", icon: "chart" },
  { id: "alerts", label: "Alerts", icon: "bell" },
  { id: "community", label: "Community", icon: "community" }
];

const EXCHANGES = {
  Bitget: { code: "BG", colors: { bg: "rgba(14, 165, 233, 0.12)", primary: "#0EA5E9", border: "rgba(14, 165, 233, 0.2)" } },
  Upbit: { code: "UB", colors: { bg: "rgba(37, 99, 235, 0.12)", primary: "#2563EB", border: "rgba(37, 99, 235, 0.2)" } },
};

const COINS = ["SOL", "TRX", "ARB", "USDT", "USDC", "XPL", "DOT", "XRP", "SUI"];
const NETWORK_OPTIONS = [
  { value: "TRC20", label: "TRC20 (Tron)" },
  { value: "ERC20", label: "ERC20 (Ethereum)" },
  { value: "BEP20", label: "BEP20 (BSC)" },
  { value: "SOL", label: "SOL (Solana)" },
  { value: "ARB", label: "ARB (Arbitrum)" },
  { value: "OP", label: "OP (Optimism)" },
  { value: "MATIC", label: "MATIC (Polygon)" },
  { value: "AVAXC", label: "AVAX-C (Avalanche C-Chain)" },
  { value: "XRP", label: "XRP (XRPL)" },
  { value: "DOT", label: "DOT (Polkadot)" },
  { value: "SUI", label: "SUI" },
  { value: "XPL", label: "XPL" },
];
const DEFAULT_NETWORK_BY_SYMBOL = {
  SOL: "SOL",
  TRX: "TRC20",
  ARB: "ARB",
  USDT: "TRC20",
  USDC: "TRC20",
  XRP: "XRP",
  DOT: "DOT",
  SUI: "SUI",
  XPL: "XPL",
  ETH: "ERC20",
};
const UPBIT_BASE_URL = "https://api.upbit.com/v1";
const BITGET_BASE_URL = "https://api.bitget.com";
const REFRESH_MS = 10000;
const LOCAL_API_BASE = "http://127.0.0.1:8000";
const LOCAL_WS_URL = "ws://127.0.0.1:8000/ws/logs";
const LOG_LIMIT = 200;
const STEP_META = {
  1: { label: "매수", color: "34,197,94" },
  2: { label: "헷징", color: "239,68,68" },
  3: { label: "전송", color: "249,115,22" },
  4: { label: "입금 확인", color: "14,165,233" },
  5: { label: "매도", color: "168,85,247" },
  6: { label: "숏 정리", color: "20,184,166" },
  7: { label: "환전", color: "245,158,11" },
  8: { label: "USDT 전송", color: "250,204,21" },
};

const toNumber = (value) => {
  const num = typeof value === "string" ? Number(value) : value;
  return Number.isFinite(num) ? num : null;
};

const formatPrice = (value) => {
  if (!Number.isFinite(value)) return "N/A";
  return `$${value.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
};

const formatGap = (value) => {
  if (!Number.isFinite(value)) return "N/A";
  return `${value.toFixed(2)}%`;
};
const getDefaultNetworkForSymbol = (symbol) => {
  const key = (symbol || "").trim().toUpperCase();
  return DEFAULT_NETWORK_BY_SYMBOL[key] || "TRC20";
};


const getStepMeta = (step) => STEP_META[step] || { label: "대기 중", color: "148,163,184" };

async function fetchUpbitMarketSet() {
  const response = await fetch(`${UPBIT_BASE_URL}/market/all?isDetails=false`);
  if (!response.ok) throw new Error("Upbit market list error");
  const data = await response.json();
  return new Set(data.map((item) => item.market));
}

async function fetchUpbitTickers(markets) {
  if (markets.length === 0) return new Map();
  const response = await fetch(`${UPBIT_BASE_URL}/ticker?markets=${markets.join(",")}`);
  if (!response.ok) throw new Error("Upbit ticker error");
  const data = await response.json();
  const map = new Map();
  data.forEach((item) => {
    map.set(item.market, toNumber(item.trade_price));
  });
  return map;
}

function extractBitgetPrice(data) {
  if (!data) return null;
  const candidates = [data.last, data.close, data.price, data.lastPr, data.lastPrice];
  for (const value of candidates) {
    const parsed = toNumber(value);
    if (parsed !== null) return parsed;
  }
  return null;
}

function extractBitgetPair(data) {
  if (!data) return null;
  if (data.baseCoin && data.quoteCoin) {
    return { base: data.baseCoin, quote: data.quoteCoin };
  }
  const symbolName = data.symbolName || data.symbol;
  if (!symbolName) return null;
  const cleaned = symbolName.replace(/_SPBL$/i, "").replace("/", "");
  if (cleaned.endsWith("USDT")) {
    return { base: cleaned.slice(0, -4), quote: "USDT" };
  }
  return null;
}

async function fetchBitgetTickers(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Bitget tickers error (${response.status})`);
  const payload = await response.json();
  return Array.isArray(payload.data) ? payload.data : [];
}

async function fetchBitgetPrices(coins) {
  const endpoints = [
    `${BITGET_BASE_URL}/api/v2/spot/market/tickers`,
    `${BITGET_BASE_URL}/api/spot/v1/market/tickers`,
  ];
  let data = null;
  let lastError = null;

  for (const url of endpoints) {
    try {
      data = await fetchBitgetTickers(url);
      break;
    } catch (error) {
      lastError = error;
    }
  }

  if (!data) throw lastError || new Error("Bitget tickers error");

  const coinSet = new Set(coins);
  const map = new Map();

  data.forEach((item) => {
    const pair = extractBitgetPair(item);
    if (!pair || pair.quote !== "USDT") return;
    if (!coinSet.has(pair.base)) return;
    const price = extractBitgetPrice(item);
    if (price !== null) map.set(pair.base, price);
  });

  return map;
}

const SvgIcon = ({ name, className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
    {ICONS[name] || ICONS.grid}
  </svg>
);

const ExchangeBadge = ({ name, size = 'md' }) => {
  const ex = EXCHANGES[name] || { code: "??", colors: { bg: "#333", primary: "#888", border: "#444" } };
  return (
    <span className={`inline-flex items-center rounded-md font-medium border transition-all hover:scale-105 cursor-pointer gap-1.5 ${size === 'sm' ? 'px-2 py-1 text-[10px]' : 'px-2.5 py-1 text-[11px]'}`}
          style={{ backgroundColor: ex.colors.bg, borderColor: ex.colors.border, color: ex.colors.primary }}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: ex.colors.primary }}></span>
      {name}
    </span>
  );
};

// --- 2. 사이드바 컨텐츠 (재사용을 위해 분리) ---
const SidebarContent = ({ activeNav, setActiveNav, isDark, setIsDark, setMobileMenuOpen }) => (
  <>
    <div className="p-5 border-b border-border h-[73px] flex items-center shrink-0">
      <div className="flex items-center gap-3 w-full">
        <div className="w-10 h-10 rounded-xl overflow-hidden border border-accent/20 shadow-lg shadow-accent/10 flex-shrink-0 bg-black flex items-center justify-center">
            {/* 로고가 없을 경우를 대비한 Fallback 처리 */}
            <img src="/logo.jpg" alt="K" className="w-full h-full object-cover opacity-80" onError={(e) => {e.target.style.display='none'; e.target.parentElement.innerText='K'}}/>
        </div>
        <div className="lg:block md:hidden overflow-hidden whitespace-nowrap">
          <h1 className="text-text-primary font-semibold text-[15px]">MATGA</h1>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_var(--color-accent)]"></span>
            <span className="text-accent text-xs font-medium">Online</span>
          </div>
        </div>
      </div>
    </div>

    <nav className="p-3 flex-1 overflow-y-auto">
      <div className="text-[10px] uppercase tracking-wider text-text-muted font-medium px-3 mb-2 lg:block md:hidden">Menu</div>
      <ul className="space-y-0.5">
        {MENU_ITEMS.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => { setActiveNav(item.id); if(setMobileMenuOpen) setMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 md:justify-center lg:justify-start
                ${activeNav === item.id ? 'bg-bg-active text-text-primary shadow-sm' : 'text-text-secondary hover:text-text-primary hover:bg-bg-hover'}`}
            >
              <span className={`flex-shrink-0 ${activeNav === item.id ? 'text-accent' : ''}`}>
                <SvgIcon name={item.icon} className="w-[18px] h-[18px]" />
              </span>
              <span className="lg:block md:hidden truncate">{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>

    <div className="p-3 border-t border-border shrink-0 mt-auto">
      <button onClick={() => setIsDark(!isDark)} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] text-text-secondary hover:bg-bg-hover md:justify-center lg:justify-start">
          <div className="w-[18px] h-[18px] flex items-center justify-center shrink-0">{isDark ? '🌙' : '☀️'}</div>
          <span className="lg:block md:hidden">{isDark ? 'Dark Mode' : 'Light Mode'}</span>
      </button>
    </div>
  </>
);

// --- 3. 메인 App 컴포넌트 ---
export default function App() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [isDark, setIsDark] = useState(true);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const hasLoadedRef = useRef(false);
  const isFetchingRef = useRef(false);
  const [botForm, setBotForm] = useState({
    bitgetApiKey: "",
    bitgetSecret: "",
    bitgetPassword: "",
    upbitAccess: "",
    upbitSecret: "",
    bitgetUsdtAddress: "",
    upbitSolAddress: "",
    symbolName: "SOL",
    symbolNetwork: getDefaultNetworkForSymbol("SOL"),
    qty: "0.11",
  });
  const [maskedFields, setMaskedFields] = useState({
    bitgetApiKey: true,
    bitgetSecret: true,
    bitgetPassword: true,
    upbitAccess: true,
    upbitSecret: true,
  });
  const [botStatus, setBotStatus] = useState({
    connected: false,
    running: false,
    msg: "대기 중",
    currentStep: 0,
    currentStepLabel: "",
    currentStepTotal: 8,
  });
  const [botError, setBotError] = useState("");
  const [botActionLoading, setBotActionLoading] = useState(false);
  const [tradeLogs, setTradeLogs] = useState([]);
  const [logConnection, setLogConnection] = useState("disconnected");
  const hasSeededLogsRef = useRef(false);

  const updateBotForm = (field) => (event) => {
    const { value } = event.target;
    setBotForm((prev) => ({ ...prev, [field]: value }));
  };

  const toggleMask = (field) => {
    setMaskedFields((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  useEffect(() => {
    const nextNetwork = getDefaultNetworkForSymbol(botForm.symbolName);
    setBotForm((prev) => (prev.symbolNetwork === nextNetwork ? prev : { ...prev, symbolNetwork: nextNetwork }));
  }, [botForm.symbolName]);

  const validateBotForm = () => {
    const requiredFields = [
      ["bitgetApiKey", "Bitget API Key"],
      ["bitgetSecret", "Bitget Secret"],
      ["bitgetPassword", "Bitget Password"],
      ["upbitAccess", "Upbit Access"],
      ["upbitSecret", "Upbit Secret"],
      ["bitgetUsdtAddress", "Bitget USDT Address"],
      ["upbitSolAddress", "Upbit SOL Address"],
    ];

    for (const [field, label] of requiredFields) {
      if (!botForm[field].trim()) {
        return `${label}을(를) 입력해 주세요.`;
      }
    }

    if (!botForm.symbolNetwork.trim()) {
      return "Network is required.";
    }

    const qty = Number(botForm.qty);
    if (!Number.isFinite(qty) || qty <= 0) {
      return "QTY는 0보다 큰 숫자여야 합니다.";
    }

    return "";
  };

  const handleStart = async () => {
    setBotError("");
    const validationError = validateBotForm();
    if (validationError) {
      setBotError(validationError);
      return;
    }

    setBotActionLoading(true);
    try {
      const payload = {
        BITGET_API: {
          apiKey: botForm.bitgetApiKey.trim(),
          secret: botForm.bitgetSecret.trim(),
          password: botForm.bitgetPassword.trim(),
        },
        UPBIT_ACCESS: botForm.upbitAccess.trim(),
        UPBIT_SECRET: botForm.upbitSecret.trim(),
        BITGET_USDT_ADDRESS: botForm.bitgetUsdtAddress.trim(),
        UPBIT_SOL_ADDRESS: botForm.upbitSolAddress.trim(),
        SYMBOL_NAME: botForm.symbolName.trim() || "SOL",
        SYMBOL_NETWORK: botForm.symbolNetwork.trim(),
        QTY: Number(botForm.qty),
      };

      const response = await fetch(`${LOCAL_API_BASE}/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.success) {
        setBotError(result.msg || "봇 시작에 실패했습니다.");
        return;
      }
      setTradeLogs([]);
      hasSeededLogsRef.current = false;
      setBotStatus((prev) => ({
        ...prev,
        running: true,
        msg: result.msg || "실행 중...",
        currentStep: 0,
        currentStepLabel: "",
        currentStepTotal: prev.currentStepTotal || 8,
      }));
    } catch (error) {
      setBotError("로컬 서버에 연결할 수 없습니다.");
    } finally {
      setBotActionLoading(false);
    }
  };

  const handleStop = async () => {
    setBotError("");
    setBotActionLoading(true);
    try {
      const response = await fetch(`${LOCAL_API_BASE}/stop`, { method: "POST" });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.success) {
        setBotError(result.msg || "중단 요청에 실패했습니다.");
        return;
      }
      setBotStatus((prev) => ({ ...prev, running: false, msg: result.msg || "대기 중" }));
    } catch (error) {
      setBotError("로컬 서버에 연결할 수 없습니다.");
    } finally {
      setBotActionLoading(false);
    }
  };

  const startDisabled = botActionLoading || botStatus.running || !botStatus.connected;
  const stopDisabled = botActionLoading || !botStatus.running || !botStatus.connected;
  const progressTotal = botStatus.currentStepTotal || 8;
  const progressCurrent = Math.min(botStatus.currentStep || 0, progressTotal);
  const progressRatio = progressTotal ? (progressCurrent / progressTotal) * 100 : 0;
  const stepMeta = getStepMeta(progressCurrent);
  const stepLabel = botStatus.currentStepLabel || stepMeta.label;
  const stepColor = stepMeta.color;

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) metaTheme.setAttribute('content', isDark ? '#0a0a0a' : '#f8fafc');
  }, [isDark]);

  // 데이터 시뮬레이션 (대시보드용 가짜 데이터)
  useEffect(() => {
    let cancelled = false;

    const loadData = async () => {
      if (isFetchingRef.current) return;
      isFetchingRef.current = true;
      if (!hasLoadedRef.current) setLoading(true);

      try {
        const bitgetPromise = fetchBitgetPrices(COINS);

        const upbitMarketSet = await fetchUpbitMarketSet();
        const upbitMarkets = COINS.map((coin) => `KRW-${coin}`).filter((market) => upbitMarketSet.has(market));
        if (!upbitMarkets.includes("KRW-USDT") && upbitMarketSet.has("KRW-USDT")) {
          upbitMarkets.push("KRW-USDT");
        }
        const upbitTickers = await fetchUpbitTickers(upbitMarkets);
        const bitgetPrices = await bitgetPromise;

        const krwPerUsdt = upbitTickers.get("KRW-USDT");
        const rows = COINS.map((coin, index) => {
          const bitgetPrice = coin === "USDT" ? 1 : bitgetPrices.get(coin) ?? null;
          const upbitKrw = upbitTickers.get(`KRW-${coin}`) ?? null;
          const upbitPrice = krwPerUsdt && Number.isFinite(upbitKrw) ? upbitKrw / krwPerUsdt : null;

          const hasPrices = Number.isFinite(bitgetPrice) && Number.isFinite(upbitPrice) && bitgetPrice > 0 && upbitPrice > 0;
          let priceA = null;
          let priceB = null;
          let exchangeA = null;
          let exchangeB = null;
          let gap = null;
          let strategy = null;

          if (hasPrices) {
            if (bitgetPrice <= upbitPrice) {
              priceA = bitgetPrice;
              priceB = upbitPrice;
              exchangeA = "Bitget";
              exchangeB = "Upbit";
            } else {
              priceA = upbitPrice;
              priceB = bitgetPrice;
              exchangeA = "Upbit";
              exchangeB = "Bitget";
            }

            gap = ((priceB - priceA) / priceA) * 100;
            strategy = { long: exchangeA, short: exchangeB };
          }

          return {
            id: coin,
            ticker: `${coin}-USDT`,
            exchangeA,
            exchangeB,
            priceA,
            priceB,
            gap,
            strategy,
            sortIndex: index,
          };
        });

        if (!cancelled) {
          const sortedRows = [...rows].sort((a, b) => {
            const gapA = Number.isFinite(a.gap) ? a.gap : -1;
            const gapB = Number.isFinite(b.gap) ? b.gap : -1;
            if (gapA === gapB) return a.sortIndex - b.sortIndex;
            return gapB - gapA;
          });
          setData(sortedRows);
          setLoading(false);
          hasLoadedRef.current = true;
        }
      } catch (error) {
        console.error("Failed to load prices:", error);
        if (!cancelled) {
          setLoading(false);
          hasLoadedRef.current = true;
        }
      } finally {
        isFetchingRef.current = false;
      }
    };

    loadData();
    const interval = setInterval(loadData, REFRESH_MS);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    let active = true;

    const fetchStatus = async () => {
      try {
        const response = await fetch(`${LOCAL_API_BASE}/status`);
        if (!response.ok) throw new Error("Status error");
        const payload = await response.json();
        if (!active) return;
        const stepTotal = Number(payload.current_step_total) || 8;
        const stepValue = Number(payload.current_step) || 0;
        setBotStatus({
          connected: true,
          running: Boolean(payload.is_running),
          msg: payload.status_msg || "대기 중",
          currentStep: stepValue,
          currentStepLabel: payload.current_step_label || "",
          currentStepTotal: stepTotal,
        });
        if (!hasSeededLogsRef.current && Array.isArray(payload.logs) && payload.logs.length) {
          setTradeLogs(payload.logs);
          hasSeededLogsRef.current = true;
        }
      } catch (error) {
        if (!active) return;
        setBotStatus((prev) => ({ ...prev, connected: false }));
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 5000);
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    let ws;
    let reconnectTimer;
    let active = true;

    const connect = () => {
      if (!active) return;
      setLogConnection("connecting");
      ws = new WebSocket(LOCAL_WS_URL);

      ws.onopen = () => {
        if (active) setLogConnection("connected");
      };
      ws.onmessage = (event) => {
        if (!active) return;
        hasSeededLogsRef.current = true;
        const line = String(event.data || "").trim();
        if (!line) return;
        setTradeLogs((prev) => {
          const next = [...prev, line];
          return next.length > LOG_LIMIT ? next.slice(-LOG_LIMIT) : next;
        });
      };
      ws.onclose = () => {
        if (!active) return;
        setLogConnection("disconnected");
        reconnectTimer = setTimeout(connect, 2000);
      };
      ws.onerror = () => {
        if (ws && ws.readyState === WebSocket.OPEN) {
          ws.close();
        }
      };
    };

    connect();
    return () => {
      active = false;
      if (reconnectTimer) clearTimeout(reconnectTimer);
      if (ws) ws.close();
    };
  }, []);

  return (
    // ✅ [핵심 수정] Flexbox 레이아웃 적용: 전체 화면을 가로로 나열하여 겹침 방지
    <div className="flex h-screen bg-bg-primary text-text-primary font-sans transition-colors duration-300 overflow-hidden">
      
      {/* ✅ [핵심 수정] 사이드바: fixed 제거하고 flex-shrink-0으로 크기 고정 (데스크탑용) */}
      <aside className="hidden md:flex flex-col bg-bg-secondary border-r border-border flex-shrink-0 w-[72px] lg:w-60 h-full transition-all duration-300 z-30">
        <SidebarContent 
          activeNav={activeNav} setActiveNav={setActiveNav} 
          isDark={isDark} setIsDark={setIsDark} 
        />
      </aside>

      {/* 모바일 사이드바 (오버레이 방식) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
          <aside className="absolute top-0 left-0 w-72 h-full bg-bg-secondary border-r border-border flex flex-col shadow-2xl animate-slide-in-left">
            <button className="absolute top-4 right-4 p-2 text-text-muted" onClick={() => setIsMobileMenuOpen(false)}>✕</button>
            <SidebarContent 
              activeNav={activeNav} setActiveNav={setActiveNav} 
              isDark={isDark} setIsDark={setIsDark} 
              setMobileMenuOpen={setIsMobileMenuOpen}
            />
          </aside>
        </div>
      )}

      {/* ✅ [핵심 수정] 메인 컨텐츠: flex-1 적용으로 남은 공간 자동 채움 (margin 제거) */}
      <main className="flex-1 h-full overflow-hidden flex flex-col relative w-full">
        {/* 모바일 헤더 */}
        <header className="md:hidden h-14 border-b border-border flex items-center px-4 bg-bg-secondary justify-between flex-shrink-0 z-20">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsMobileMenuOpen(true)} className="p-1 text-text-secondary hover:bg-bg-hover rounded">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
            <span className="font-semibold">MATGA</span>
          </div>
          <button onClick={() => setIsDark(!isDark)} className="p-2">{isDark ? '🌙' : '☀️'}</button>
        </header>

        {/* 메인 컨텐츠 영역 (스크롤 가능) */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {activeNav === 'dashboard' ? (
            <div className="flex flex-col gap-4 max-w-[1600px] mx-auto pb-10 h-full">
              {/* 필터 바 */}
              <div className="flex items-center gap-5 flex-wrap bg-bg-card border border-border rounded-xl px-4 py-2.5 overflow-x-auto shrink-0">
                <span className="text-text-muted text-xs font-medium shrink-0">Filter:</span>
                {Object.keys(EXCHANGES).map(ex => (
                   <label key={ex} className="flex items-center gap-2 cursor-pointer text-xs font-medium select-none whitespace-nowrap">
                     <div className="w-9 h-5 rounded-full bg-accent relative transition-colors">
                       <div className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-white shadow-sm"></div>
                     </div>
                     {ex}
                   </label>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1 min-h-0">
                <div className="flex flex-col gap-4 lg:col-span-2 min-h-0 min-w-0">
                  <div className="bg-bg-card border border-border rounded-2xl flex flex-col shadow-sm flex-1 min-h-0 min-w-0">
                  <div className="px-5 py-4 border-b border-border flex justify-between items-center shrink-0 bg-bg-card rounded-t-2xl">
                    <div className="flex flex-col">
                      <h2 className="font-semibold text-sm text-text-primary">Price Gap Monitor</h2>
                      <p className="text-[10px] text-text-muted hidden md:block mt-0.5">Real-time arbitrage opportunities</p>
                    </div>
                    <div className="flex items-center gap-2 text-text-muted text-xs bg-bg-tertiary px-3 py-1.5 rounded-lg">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
                        <span>{data.length} pairs</span>
                    </div>
                  </div>
                  
                  <div className="flex-1 overflow-auto min-w-0">
                     {loading ? (
                       <div className="flex items-center justify-center h-full text-text-muted animate-pulse">Loading data...</div>
                     ) : (
                       <table className="w-full text-left border-collapse min-w-[800px]">
                          <thead className="bg-bg-secondary/95 sticky top-0 z-10 backdrop-blur-sm shadow-sm">
                              <tr className="border-b border-border text-[10px] text-text-muted uppercase tracking-wider font-semibold">
                                  <th className="w-10 px-2 py-3 text-center">#</th>
                                  <th className="px-5 py-3 text-center">Ticker</th>
                                  <th className="px-5 py-3 text-center">Exchanges</th>
                                  <th className="px-5 py-3 text-center">Price A</th>
                                  <th className="px-5 py-3 text-center">Price B</th>
                                  <th className="px-5 py-3 text-center">Gap</th>
                                  <th className="px-5 py-3 text-center hidden xl:table-cell">Strategy</th>
                              </tr>
                          </thead>
                          <tbody className="divide-y divide-border">
                              {data.map((item, idx) => (
                                  <tr key={item.id} className="group hover:bg-bg-hover transition-colors cursor-pointer">
                                      <td className="px-2 py-3 text-center text-text-muted text-xs">{idx + 1}</td>
                                      <td className="px-5 py-3 font-medium text-[13px] text-text-primary text-center">{item.ticker}</td>
                                      <td className="px-5 py-3 text-center">
                                          {item.exchangeA && item.exchangeB ? (
                                            <div className="flex items-center justify-center gap-1.5 flex-wrap">
                                              <ExchangeBadge name={item.exchangeA} size="sm" />
                                              <span className="text-text-muted text-[10px]">&harr;</span>
                                              <ExchangeBadge name={item.exchangeB} size="sm" />
                                            </div>
                                          ) : (
                                            <span className="text-[10px] bg-bg-tertiary border border-border px-2 py-1 rounded text-text-muted whitespace-nowrap">
                                              N/A
                                            </span>
                                          )}
                                      </td>
                                      <td className={`px-5 py-3 text-center font-mono text-[13px] ${Number.isFinite(item.priceA) ? 'text-text-primary/90' : 'text-text-muted'}`}>
                                          {formatPrice(item.priceA)}
                                      </td>
                                      <td className={`px-5 py-3 text-center font-mono text-[13px] ${Number.isFinite(item.priceB) ? 'text-text-primary/90' : 'text-text-muted'}`}>
                                          {formatPrice(item.priceB)}
                                      </td>
                                      <td className="px-5 py-3 text-center">
                                          <div className={`inline-flex items-center px-2 py-1 rounded-md font-mono text-xs font-semibold ${Number.isFinite(item.gap) ? (item.gap > 0.5 ? 'bg-accent-muted text-accent border border-accent/20' : 'bg-bg-tertiary text-text-secondary border border-border') : 'bg-bg-tertiary text-text-muted border border-border'}`}>
                                              {formatGap(item.gap)}
                                          </div>
                                      </td>
                                      <td className="px-5 py-3 text-center hidden xl:table-cell">
                                          {item.strategy ? (
                                            <div className="flex items-center justify-center gap-2">
                                                <div className="flex items-center gap-1.5">
                                                    <span className="text-[10px] text-[var(--color-positive)] font-semibold whitespace-nowrap">
                                                      Long
                                                    </span>
                                                    <ExchangeBadge name={item.strategy.long} size="sm" />
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <span className="text-[10px] text-[var(--color-negative)] font-semibold whitespace-nowrap">
                                                      Short
                                                    </span>
                                                    <ExchangeBadge name={item.strategy.short} size="sm" />
                                                </div>
                                            </div>
                                          ) : (
                                            <span className="text-[10px] bg-bg-tertiary border border-border px-2 py-1 rounded text-text-muted whitespace-nowrap">
                                              N/A
                                            </span>
                                          )}
                                      </td>
                                  </tr>
                              ))}
                          </tbody>
                       </table>
                     )}
                  </div>
                </div>

                <div className="bg-bg-card border border-border rounded-2xl p-4 shadow-sm flex flex-col flex-1 min-h-0 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h2 className="font-semibold text-sm text-text-primary">Trade Logs</h2>
                        <p className="text-[10px] text-text-muted mt-0.5">매매 관련 로그만 표시됩니다.</p>
                      </div>
                      <span className="text-[10px] text-text-muted">{tradeLogs.length} lines</span>
                    </div>
                    <div className="mt-3 flex-1 overflow-auto rounded-lg border border-border bg-bg-tertiary p-3 font-mono text-[11px] text-text-secondary">
                      {tradeLogs.length ? (
                        tradeLogs.map((line, idx) => (
                          <div key={`${idx}-${line.slice(0, 12)}`} className="break-all">{line}</div>
                        ))
                      ) : (
                        <div className="text-text-muted">아직 매매 로그가 없습니다.</div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4 lg:col-span-1 min-h-0">
                  <div className="bg-bg-card border border-border rounded-2xl p-4 shadow-sm flex flex-col flex-1 min-h-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h2 className="font-semibold text-sm text-text-primary">Auto Trading Control</h2>
                        <p className="text-[10px] text-text-muted mt-0.5">Local agent: 127.0.0.1:8000</p>
                      </div>
                      <span className={`text-[10px] px-2 py-1 rounded-md border ${botStatus.connected ? 'bg-accent-muted text-accent border-[var(--color-accent)]' : 'bg-bg-tertiary text-text-muted border-border'}`}>
                        {botStatus.connected ? 'Connected' : 'Offline'}
                      </span>
                    </div>

                    <div className="mt-3 rounded-xl border border-border bg-bg-tertiary/40 p-3">
                      <div className="flex items-center justify-between text-[10px] text-text-muted">
                        <span>진행 단계</span>
                        <span>{progressCurrent}/{progressTotal}</span>
                      </div>
                      <div className="mt-2 h-2 rounded-full bg-bg-tertiary border border-border overflow-hidden">
                        <div className="h-full bg-accent transition-all duration-300" style={{ width: `${progressRatio}%` }}></div>
                      </div>
                      <div className="mt-2">
                        <span
                          className="inline-flex items-center rounded-md border px-2 py-1 text-[10px] font-semibold"
                          style={{
                            color: `rgb(${stepColor})`,
                            borderColor: `rgba(${stepColor}, 0.35)`,
                            backgroundColor: `rgba(${stepColor}, 0.15)`,
                          }}
                        >
                          {`Step ${progressCurrent}/${progressTotal} ${stepLabel}`}
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 flex-1 overflow-auto pr-1">
                      <div className="flex flex-col gap-3 text-xs">
                        <label className="flex flex-col gap-1">
                          <span className="text-[10px] text-text-muted">Bitget API Key</span>
                          <div className="relative">
                            <button
                              type="button"
                              onClick={() => toggleMask("bitgetApiKey")}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary focus:outline-none"
                              aria-label="Toggle Bitget API Key visibility"
                              aria-pressed={!maskedFields.bitgetApiKey}
                            >
                              <SvgIcon name={maskedFields.bitgetApiKey ? "eye" : "eyeOff"} className="w-4 h-4" />
                            </button>
                            <input
                              type={maskedFields.bitgetApiKey ? "password" : "text"}
                              value={botForm.bitgetApiKey}
                              onChange={updateBotForm("bitgetApiKey")}
                              className="w-full rounded-lg border border-border bg-bg-tertiary pl-3 pr-9 py-2 text-xs text-text-primary placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)]"
                              placeholder="bitget api key"
                            />
                          </div>
                        </label>
                        <label className="flex flex-col gap-1">
                          <span className="text-[10px] text-text-muted">Bitget Secret</span>
                          <div className="relative">
                            <button
                              type="button"
                              onClick={() => toggleMask("bitgetSecret")}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary focus:outline-none"
                              aria-label="Toggle Bitget Secret visibility"
                              aria-pressed={!maskedFields.bitgetSecret}
                            >
                              <SvgIcon name={maskedFields.bitgetSecret ? "eye" : "eyeOff"} className="w-4 h-4" />
                            </button>
                            <input
                              type={maskedFields.bitgetSecret ? "password" : "text"}
                              value={botForm.bitgetSecret}
                              onChange={updateBotForm("bitgetSecret")}
                              className="w-full rounded-lg border border-border bg-bg-tertiary pl-3 pr-9 py-2 text-xs text-text-primary placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)]"
                              placeholder="bitget secret"
                            />
                          </div>
                        </label>
                        <label className="flex flex-col gap-1">
                          <span className="text-[10px] text-text-muted">Bitget Password</span>
                          <div className="relative">
                            <button
                              type="button"
                              onClick={() => toggleMask("bitgetPassword")}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary focus:outline-none"
                              aria-label="Toggle Bitget Password visibility"
                              aria-pressed={!maskedFields.bitgetPassword}
                            >
                              <SvgIcon name={maskedFields.bitgetPassword ? "eye" : "eyeOff"} className="w-4 h-4" />
                            </button>
                            <input
                              type={maskedFields.bitgetPassword ? "password" : "text"}
                              value={botForm.bitgetPassword}
                              onChange={updateBotForm("bitgetPassword")}
                              className="w-full rounded-lg border border-border bg-bg-tertiary pl-3 pr-9 py-2 text-xs text-text-primary placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)]"
                              placeholder="bitget password"
                            />
                          </div>
                        </label>
                        <label className="flex flex-col gap-1">
                          <span className="text-[10px] text-text-muted">Upbit Access Key</span>
                          <div className="relative">
                            <button
                              type="button"
                              onClick={() => toggleMask("upbitAccess")}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary focus:outline-none"
                              aria-label="Toggle Upbit Access Key visibility"
                              aria-pressed={!maskedFields.upbitAccess}
                            >
                              <SvgIcon name={maskedFields.upbitAccess ? "eye" : "eyeOff"} className="w-4 h-4" />
                            </button>
                            <input
                              type={maskedFields.upbitAccess ? "password" : "text"}
                              value={botForm.upbitAccess}
                              onChange={updateBotForm("upbitAccess")}
                              className="w-full rounded-lg border border-border bg-bg-tertiary pl-3 pr-9 py-2 text-xs text-text-primary placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)]"
                              placeholder="upbit access key"
                            />
                          </div>
                        </label>
                        <label className="flex flex-col gap-1">
                          <span className="text-[10px] text-text-muted">Upbit Secret Key</span>
                          <div className="relative">
                            <button
                              type="button"
                              onClick={() => toggleMask("upbitSecret")}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary focus:outline-none"
                              aria-label="Toggle Upbit Secret Key visibility"
                              aria-pressed={!maskedFields.upbitSecret}
                            >
                              <SvgIcon name={maskedFields.upbitSecret ? "eye" : "eyeOff"} className="w-4 h-4" />
                            </button>
                            <input
                              type={maskedFields.upbitSecret ? "password" : "text"}
                              value={botForm.upbitSecret}
                              onChange={updateBotForm("upbitSecret")}
                              className="w-full rounded-lg border border-border bg-bg-tertiary pl-3 pr-9 py-2 text-xs text-text-primary placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)]"
                              placeholder="upbit secret key"
                            />
                          </div>
                        </label>
                        <label className="flex flex-col gap-1">
                          <span className="text-[10px] text-text-muted">Bitget USDT Address</span>
                          <input
                            type="text"
                            value={botForm.bitgetUsdtAddress}
                            onChange={updateBotForm("bitgetUsdtAddress")}
                            className="w-full rounded-lg border border-border bg-bg-tertiary px-3 py-2 text-xs text-text-primary placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)]"
                            placeholder="bitget USDT address"
                          />
                        </label>
                        <label className="flex flex-col gap-1">
                          <span className="text-[10px] text-text-muted">Upbit SOL Address</span>
                          <input
                            type="text"
                            value={botForm.upbitSolAddress}
                            onChange={updateBotForm("upbitSolAddress")}
                            className="w-full rounded-lg border border-border bg-bg-tertiary px-3 py-2 text-xs text-text-primary placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)]"
                            placeholder="upbit SOL address"
                          />
                        </label>
                        <label className="flex flex-col gap-1">
                          <span className="text-[10px] text-text-muted">Symbol</span>
                          <input
                            type="text"
                            value={botForm.symbolName}
                            onChange={updateBotForm("symbolName")}
                            className="w-full rounded-lg border border-border bg-bg-tertiary px-3 py-2 text-xs text-text-primary placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)]"
                            placeholder="SOL"
                          />
                        </label>
                        <label className="flex flex-col gap-1">
                          <span className="text-[10px] text-text-muted">Network</span>
                          <select
                            value={botForm.symbolNetwork}
                            onChange={updateBotForm("symbolNetwork")}
                            className="w-full rounded-lg border border-border bg-bg-tertiary px-3 py-2 text-xs text-text-primary focus:outline-none focus:border-[var(--color-accent)]"
                          >
                            {NETWORK_OPTIONS.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </label>
                        <label className="flex flex-col gap-1">
                          <span className="text-[10px] text-text-muted">QTY</span>
                          <input
                            type="number"
                            min="0"
                            step="0.0001"
                            value={botForm.qty}
                            onChange={updateBotForm("qty")}
                            className="w-full rounded-lg border border-border bg-bg-tertiary px-3 py-2 text-xs text-text-primary placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)]"
                            placeholder="0.11"
                          />
                        </label>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={handleStart}
                        disabled={startDisabled}
                        className={`rounded-lg px-3 py-2 text-xs font-semibold transition-all ${startDisabled ? 'bg-bg-tertiary text-text-muted border border-border' : 'bg-accent text-white hover:brightness-125'}`}
                      >
                        {botActionLoading && !botStatus.running ? 'Starting...' : 'Start'}
                      </button>
                      <button
                        type="button"
                        onClick={handleStop}
                        disabled={stopDisabled}
                        className={`rounded-lg px-3 py-2 text-xs font-semibold transition-all ${stopDisabled ? 'bg-bg-tertiary text-text-muted border border-border' : 'bg-[var(--color-negative)] text-white hover:brightness-125'}`}
                      >
                        {botActionLoading && botStatus.running ? 'Stopping...' : 'Stop'}
                      </button>
                    </div>

                    {botError && (
                      <div className="mt-3 text-[11px] text-negative">
                        {botError}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full min-h-[50vh] text-text-muted gap-4 opacity-60">
              <div className="w-16 h-16 rounded-2xl bg-bg-tertiary flex items-center justify-center text-2xl opacity-50">🚧</div>
              <p className="font-medium">Dashboard Only Mode</p>
              <p className="text-xs opacity-50 text-center max-w-md">
                현재 대시보드 기능만 활성화되어 있습니다.<br/>
                다른 메뉴는 추가 파일 구현 후 이용 가능합니다.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
