import React, { useState, useEffect } from "react";
import {
  Check,
  Clock,
  Smartphone,
  ShieldCheck,
  BookOpen,
  Sparkles,
  Download,
  Infinity,
  RefreshCw,
  Monitor,
  Heart,
  Star,
  Lock,
  Wrench,
  AlertCircle,
  X,
  CreditCard,
  Stethoscope,
  Printer,
  Zap
} from "lucide-react";
import AcuLogo from "./components/AcuLogo";
import MovementTabs from "./components/MovementTabs";
import FAQAccordion from "./components/FAQAccordion";
import HotmartSalesFunnel from "./components/HotmartSalesFunnel";

// Import generated book bundle image (optimized with AVIF and WebP formats)
const bundleImgAvif = "https://res.cloudinary.com/dgncwrnvw/image/upload/v1784904904/ChatGPT_Image_3_lug_2026_10_57_05_bpccss.avif";
const bundleImgWebp = "https://res.cloudinary.com/dgncwrnvw/image/upload/v1784904904/ChatGPT_Image_3_lug_2026_10_57_05_ix0vsb.webp";
const bundleImgPng = "https://i.ibb.co/KxVLBT9R/Chat-GPT-Image-18-lug-2026-17-18-49.png";

const protocolImgAvif = "https://res.cloudinary.com/dgncwrnvw/image/upload/v1784985719/ChatGPT_Image_25_lug_2026_10_19_01_agnrr5.avif";
const protocolImgWebp = "https://res.cloudinary.com/dgncwrnvw/image/upload/v1784985785/ChatGPT_Image_25_lug_2026_10_19_01_rm0ob4.webp";
const protocolImgPng = "https://i.ibb.co/hJZNX1mh/Chat-GPT-Image-15-lug-2026-22-41-37.png";

// ============================================================================
// REGION: GEOLOCATION & DYNAMIC CURRENCY ENGINE
// ============================================================================

/**
 * Interface representing localized currency metrics for high-conversion pricing display.
 */
interface CurrencyInfo {
  code: string;
  symbol: string;
  basico: string;
  completo: string;
  basicoOriginal: string;
  completoOriginal: string;
  bono1: string;
  bono2: string;
  bono3: string;
  bono4: string;
  bono5: string;
  bono6: string;
  bono7: string;
  bonosTotal: string;
  upsell: string;
  protocolo: string;
  protocoloOriginal: string;
  protocoloDownsell: string;
}

/**
 * Fallback currency configuration (USD) if geolocation cannot resolve the client location.
 */
const defaultCurrency: CurrencyInfo = {
  code: "USD",
  symbol: "$",
  basico: "5",
  completo: "15",
  basicoOriginal: "29",
  completoOriginal: "64",
  bono1: "15",
  bono2: "10",
  bono3: "12",
  bono4: "15",
  bono5: "12",
  bono6: "18",
  bono7: "10",
  bonosTotal: "92",
  upsell: "10",
  protocolo: "27",
  protocoloOriginal: "59",
  protocoloDownsell: "10"
};

/**
 * Dictionary mapping regional ISO 3166-1 alpha-2 country codes to localized values.
 */
const currencyMap: Record<string, CurrencyInfo> = {
  MX: { code: "MXN", symbol: "$", basico: "95", completo: "285", basicoOriginal: "550", completoOriginal: "1200", bono1: "285", bono2: "190", bono3: "228", bono4: "285", bono5: "228", bono6: "342", bono7: "190", bonosTotal: "1748", upsell: "190", protocolo: "513", protocoloOriginal: "1100", protocoloDownsell: "190" }, // Mexico
  CO: { code: "COP", symbol: "$", basico: "20.000", completo: "60.000", basicoOriginal: "120.000", completoOriginal: "260.000", bono1: "60.000", bono2: "40.000", bono3: "48.000", bono4: "60.000", bono5: "48.000", bono6: "72.000", bono7: "40.000", bonosTotal: "368.000", upsell: "40.000", protocolo: "108.000", protocoloOriginal: "230.000", protocoloDownsell: "40.000" }, // Colombia
  CL: { code: "CLP", symbol: "$", basico: "4.700", completo: "14.000", basicoOriginal: "27.000", completoOriginal: "60.000", bono1: "14.000", bono2: "9.300", bono3: "11.000", bono4: "14.000", bono5: "11.000", bono6: "16.750", bono7: "9.300", bonosTotal: "85.350", upsell: "9.300", protocolo: "25.200", protocoloOriginal: "54.000", protocoloDownsell: "9.300" }, // Chile
  PE: { code: "PEN", symbol: "S/.", basico: "18.5", completo: "55", basicoOriginal: "110", completoOriginal: "240", bono1: "55", bono2: "37", bono3: "44", bono4: "55", bono5: "44", bono6: "66.5", bono7: "37", bonosTotal: "338.5", upsell: "37", protocolo: "100", protocoloOriginal: "215", protocoloDownsell: "37" }, // Peru
  AR: { code: "ARS", symbol: "$", basico: "4.500", completo: "13.500", basicoOriginal: "26.000", completoOriginal: "58.000", bono1: "13.500", bono2: "9.000", bono3: "10.800", bono4: "13.500", bono5: "10.800", bono6: "16.200", bono7: "9.000", bonosTotal: "82.800", upsell: "9.000", protocolo: "24.300", protocoloOriginal: "52.000", protocoloDownsell: "9.000" }, // Argentina
  BR: { code: "BRL", symbol: "R$", basico: "28", completo: "85", basicoOriginal: "160", completoOriginal: "350", bono1: "85", bono2: "56", bono3: "68", bono4: "85", bono5: "68", bono6: "100", bono7: "56", bonosTotal: "518", upsell: "56", protocolo: "150", protocoloOriginal: "320", protocoloDownsell: "56" }, // Brazil
  ES: { code: "EUR", symbol: "€", basico: "5", completo: "15", basicoOriginal: "29", completoOriginal: "64", bono1: "15", bono2: "10", bono3: "12", bono4: "15", bono5: "12", bono6: "18", bono7: "10", bonosTotal: "92", upsell: "10", protocolo: "27", protocoloOriginal: "59", protocoloDownsell: "10" }, // Spain
  UY: { code: "UYU", symbol: "$U", basico: "215", completo: "650", basicoOriginal: "1250", completoOriginal: "2750", bono1: "650", bono2: "430", bono3: "520", bono4: "650", bono5: "520", bono6: "770", bono7: "430", bonosTotal: "3.970", upsell: "430", protocolo: "1.170", protocoloOriginal: "2.500", protocoloDownsell: "430" }, // Uruguay
  US: defaultCurrency,
};

/**
 * Dynamic fallback mechanism detecting the client timezone if the API geolocation lookup fails.
 */
const getCountryByTimezone = (): string => {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz.includes("Mexico")) return "MX";
    if (tz.includes("Bogota")) return "CO";
    if (tz.includes("Santiago")) return "CL";
    if (tz.includes("Lima")) return "PE";
    if (tz.includes("Argentina") || tz.includes("Buenos_Aires")) return "AR";
    if (tz.includes("Montevideo")) return "UY";
    if (tz.includes("Sao_Paulo") || tz.includes("Rio_de_Janeiro") || tz.includes("Recife") || tz.includes("Manaus")) return "BR";
    if (tz.includes("Madrid")) return "ES";
  } catch (e) {
    // Graceful error isolation
  }
  return "US";
};

export default function App() {
  // --- STATE DECLARATIONS ---
  
  // Simple client-side routing state to support the "/upsell" page request with direct access prevention
  const [currentPath, setCurrentPath] = useState(() => {
    const path = window.location.pathname;
    
    // Check if they are accessing a protected path on initial render
    if (path === "/upsell" || path === "/downsell" || path === "/gracias") {
      const hasActiveSession = sessionStorage.getItem("funnel_session") === "active";
      const urlParams = new URLSearchParams(window.location.search);
      const hasHotmartParams = 
        urlParams.has("transaction") || 
        urlParams.has("hottok") || 
        urlParams.has("email") || 
        urlParams.has("status") ||
        urlParams.has("payment_type") ||
        urlParams.has("billet_url") ||
        urlParams.has("billet_barcode");
      const ref = document.referrer ? document.referrer.toLowerCase() : "";
      const isFromHotmart = ref.includes("hotmart");

      if (!hasActiveSession && !hasHotmartParams && !isFromHotmart) {
        // Direct access is unauthorized, redirect silently to homepage
        window.history.replaceState({}, "", "/");
        return "/";
      }
    } else if (path === "/" || path === "") {
      // Set active session flag when they hit the landing page
      sessionStorage.setItem("funnel_session", "active");
    }
    return path;
  });

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      // Also protect on back/forward navigation
      if (path === "/upsell" || path === "/downsell" || path === "/gracias") {
        const hasActiveSession = sessionStorage.getItem("funnel_session") === "active";
        const urlParams = new URLSearchParams(window.location.search);
        const hasHotmartParams = 
          urlParams.has("transaction") || 
          urlParams.has("hottok") || 
          urlParams.has("email") || 
          urlParams.has("status") ||
          urlParams.has("payment_type") ||
          urlParams.has("billet_url") ||
          urlParams.has("billet_barcode");
        const ref = document.referrer ? document.referrer.toLowerCase() : "";
        const isFromHotmart = ref.includes("hotmart");

        if (!hasActiveSession && !hasHotmartParams && !isFromHotmart) {
          window.history.replaceState({}, "", "/");
          setCurrentPath("/");
          return;
        }
      } else if (path === "/" || path === "") {
        sessionStorage.setItem("funnel_session", "active");
      }
      setCurrentPath(path);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Also listen to currentPath state changes to set the funnel session active when hitting the main route
  useEffect(() => {
    if (currentPath === "/" || currentPath === "") {
      sessionStorage.setItem("funnel_session", "active");
    }
  }, [currentPath]);

  // Localized currency and pricing configuration
  const [currency, setCurrency] = useState<CurrencyInfo>(() => {
    const initialCountry = getCountryByTimezone();
    return currencyMap[initialCountry] || defaultCurrency;
  });

  // Dynamic API lookup for accurate IP Geolocation mapping
  useEffect(() => {
    fetch("https://ipwho.is/")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch country from IP");
        return res.json();
      })
      .then((data) => {
        const country = data.country_code;
        if (country && currencyMap[country]) {
          setCurrency(currencyMap[country]);
        }
      })
      .catch((err) => {
        // Soft fallback to timezone is normal and expected when browser is sandboxed or using tracking protection
        console.debug("IP Geolocation fallback to Timezone detection:", err.message || err);
      });
  }, []);

  // Live countdown timer state (starting from 10 minutes, 51 seconds like the original screenshot)
  const [timeLeft, setTimeLeft] = useState(651); // 10 minutes * 60 + 51 = 651 seconds
  const [showUpsellModal, setShowUpsellModal] = useState(false);
  const [heroImageLoaded, setHeroImageLoaded] = useState(false);
  const [protocolImageLoaded, setProtocolImageLoaded] = useState(false);

  useEffect(() => {
    // High-priority preload link for the hero image to make it load much faster on mobile phones
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = bundleImgAvif;
    document.head.appendChild(link);

    // Preload for the protocol image (upsell/downsell page) so it's fully cached when needed
    const linkProtocol = document.createElement("link");
    linkProtocol.rel = "preload";
    linkProtocol.as = "image";
    linkProtocol.href = protocolImgAvif;
    document.head.appendChild(linkProtocol);

    const img = new Image();
    img.src = bundleImgAvif;
    if (img.complete) {
      setHeroImageLoaded(true);
    } else {
      img.onload = () => {
        setHeroImageLoaded(true);
      };
    }

    const imgProtocol = new Image();
    imgProtocol.src = protocolImgAvif;
    if (imgProtocol.complete) {
      setProtocolImageLoaded(true);
    } else {
      imgProtocol.onload = () => {
        setProtocolImageLoaded(true);
      };
    }

    return () => {
      try {
        document.head.removeChild(link);
      } catch (e) {}
      try {
        document.head.removeChild(linkProtocol);
      } catch (e) {}
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 1 ? prev - 1 : 651)); // Loop for demo purposes
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (currentPath === "/gracias") {
    return (
      <div className="min-h-screen bg-sand-light antialiased font-sans text-gray-800 flex flex-col justify-between" id="gracias-page">
        
        {/* HEADER BAR */}
        <div className="bg-[#09261a] text-white py-4 px-6 text-center shadow-md">
          <AcuLogo size="sm" />
        </div>

        {/* MAIN BODY CONTAINER */}
        <div className="max-w-xl mx-auto px-6 py-12 flex-1 flex flex-col items-center justify-center text-center">
          
          {/* SUCCESS ANIMATED ICON */}
          <div className="w-20 h-20 rounded-full bg-emerald-50 border-4 border-emerald-500 flex items-center justify-center mb-8 shadow-lg animate-bounce">
            <ShieldCheck className="w-12 h-12 text-emerald-600" />
          </div>

          {/* HEADING */}
          <h1 className="font-serif text-3xl sm:text-4xl text-emerald-800 font-bold mb-4 tracking-tight">
            ¡Gracias por tu compra!
          </h1>
          
          <p className="text-gray-700 text-base sm:text-lg mb-6 leading-relaxed">
            Hemos procesado tu pedido de forma segura. En los próximos minutos recibirás un correo electrónico con los enlaces de descarga y las instrucciones de acceso para todo tu material.
          </p>

        </div>

        {/* FOOTER */}
        <footer className="bg-[#09261a] text-gray-400 py-4 text-center text-xs border-t border-emerald-950">
          <p>© {new Date().getFullYear()} Acupuntura Clínica. Todos os derechos reservados.</p>
        </footer>

      </div>
    );
  }

  if (currentPath === "/downsell") {
    return (
      <div className="min-h-screen bg-rose-50/20 antialiased font-sans text-gray-800 flex flex-col justify-between relative" id="downsell-landing-page">
        
        {/* TOP EXTREME URGENCY BANNER */}
        <div className="bg-red-950 text-white text-[11px] md:text-xs py-2.5 px-4 text-center font-mono flex items-center justify-center gap-2 select-none shadow-sm sticky top-0 z-40">
          <span className="inline-block animate-ping text-red-500 font-bold">🚨</span>
          <span className="font-sans font-bold text-red-200 tracking-wide uppercase">
            Última oportunidad: Tu descuento del 50% se desactivará para siempre al salir
          </span>
          <span className="mx-1">•</span>
          <span className="font-bold text-red-400 tracking-widest bg-black/40 px-2 py-0.5 rounded">
            {formatTime(timeLeft)}
          </span>
        </div>

        {/* CONTENT CONTAINER */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 pt-4 sm:pt-6 pb-12 flex-1 flex flex-col items-center justify-start">
          
          {/* CRITICAL ATTENTION NOTICE */}
          <div className="w-full max-w-3xl bg-amber-50/95 border border-amber-300 rounded-xl py-2 px-4 text-center mb-6 shadow-xs animate-pulse">
            <div className="flex items-center justify-center gap-2 text-amber-950 text-xs">
              <span>⚠️</span>
              <p className="font-sans font-bold text-amber-950 uppercase tracking-wide">
                <strong>¡ESPERA!</strong> Esta es tu última oportunidad de ahorrar el 50% antes de perder esta oferta para siempre.
              </p>
            </div>
          </div>

          {/* MAIN TITLES */}
          <h1 className="font-serif text-2xl sm:text-3xl md:text-5xl text-red-800 text-center tracking-tight leading-tight mb-2 font-black px-2">
            ¿Estás Seguro de Dejar Pasar Esto?
          </h1>
          <p className="text-gold-dark italic font-semibold text-base sm:text-lg md:text-xl text-center mb-4 md:mb-6">
            Mapa de Digitopuntura — Último Intento de Descuento
          </p>

          <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed text-center max-w-2xl mx-auto mb-6 md:mb-10 px-2">
            No limites tus conocimientos a la pura teoría del manual. Consigue el <strong className="text-red-700">Mapa de Digitopuntura</strong> ahora mismo para aplicar digitopuntura de forma fácil y segura, utilizando únicamente tus manos. Esta oferta exclusiva de un solo clic nunca volverá a estar disponible para ti.
          </p>

          {/* Main Book Mockup Image - MATCHES EXACTLY THE MAIN HERO LAYOUT AND SIZES */}
          <div className="relative max-w-xl mx-auto mb-10 group rounded-2xl overflow-hidden shadow-2xl border-4 border-white transition-transform duration-500 hover:scale-[1.01] min-h-[250px] sm:min-h-[400px] flex items-center justify-center bg-rose-50/10" id="downsell-book-mockup-wrapper">
            {/* Elegant Skeleton Loader */}
            {!protocolImageLoaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-rose-50/30 rounded-2xl animate-pulse">
                <div className="w-8 h-8 rounded-full border-4 border-red-300 border-t-red-600 animate-spin mb-2"></div>
                <span className="text-[10px] font-mono text-red-800 tracking-wider">Cargando protocolo...</span>
              </div>
            )}
            <picture className={`w-full transition-opacity duration-700 ease-in-out ${protocolImageLoaded ? "opacity-100" : "opacity-0"}`}>
              <source srcSet={protocolImgAvif} type="image/avif" />
              <source srcSet={protocolImgWebp} type="image/webp" />
              <img 
                src={protocolImgPng} 
                alt="Mapa de Digitopuntura" 
                className="w-full h-auto object-cover"
                referrerPolicy="no-referrer"
                onLoad={() => setProtocolImageLoaded(true)}
              />
            </picture>

            {/* Soft decorative shadow overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>

          {/* Core Benefits List Card */}
          <div className="w-full max-w-xl bg-white rounded-3xl border-2 border-red-100 p-6 sm:p-8 shadow-2xl mb-6 md:mb-10">
            <h3 className="font-serif text-lg sm:text-xl font-bold text-red-800 flex items-center gap-1.5 justify-center mb-4 uppercase tracking-wide">
              ⚠️ ¿POR QUÉ NO DEBES DEJARLO IR?
            </h3>
            
            <div className="space-y-3.5 text-xs sm:text-sm text-gray-600">
              <div className="flex items-start gap-2.5">
                <span className="text-red-600 font-bold text-base shrink-0">✔</span>
                <div>
                  <strong className="text-red-950">Atlas de 18 Puntos Ilustrados:</strong> Descubre la ubicación exacta, función y notas de seguridad de cada punto.
                </div>
              </div>
              
              <div className="flex items-start gap-2.5">
                <span className="text-red-600 font-bold text-base shrink-0">✔</span>
                <div>
                  <strong className="text-red-950">6 Protocolos Completos:</strong> Uno para cada patrón de desequilibrio del manual principal de Dietoterapia.
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="text-red-600 font-bold text-base shrink-0">✔</span>
                <div>
                  <strong className="text-red-950">Garantía de Devolución Completa:</strong> Sin riesgos. Si no es lo que esperabas, te reembolsamos ambos productos al 100%.
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="text-red-600 font-bold text-base shrink-0">✔</span>
                <div>
                  <strong className="text-red-950">Acceso Vitalicio Seguro:</strong> Formato digital descargable para siempre en tu móvil, tablet u ordenador.
                </div>
              </div>
            </div>
          </div>

          {/* PRICE DROP ALERT BANNER */}
          <div className="w-full max-w-md bg-red-50 border-2 border-red-200 rounded-3xl p-4 sm:p-5 text-center mb-6 shadow-md">
            <p className="text-[10px] sm:text-xs text-red-700 uppercase tracking-widest font-extrabold mb-1">
              💥 DESCUENTO EXTRA DE ÚLTIMO MINUTO 💥
            </p>
            <div className="flex items-center justify-center gap-3">
              <span className="text-sm sm:text-base text-gray-400 line-through font-semibold">
                {currency.symbol}{currency.protocolo} {currency.code}
              </span>
              <span className="text-2xl sm:text-3xl font-mono font-black text-red-700 flex items-center gap-1.5 animate-pulse">
                <span>{currency.symbol}{currency.protocoloDownsell} {currency.code}</span>
              </span>
            </div>
            <p className="text-[11px] text-red-800 mt-1.5 font-semibold leading-relaxed">
              Hemos reducido el precio del mapa de {currency.symbol}{currency.protocolo} a solo <span className="underline font-black">{currency.symbol}{currency.protocoloDownsell}</span>. ¡Última oportunidad!
            </p>
          </div>

          {/* HOTMART - Sales Funnel Widget */}
          <HotmartSalesFunnel />

          {/* Secure purchase icons */}
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mt-6 text-gray-400 text-[10px] sm:text-[11px] md:text-xs">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-red-600" /> Compra 100% Segura
            </span>
            <span className="hidden sm:inline text-gray-300">•</span>
            <span className="flex items-center gap-1">
              <Download className="w-3.5 h-3.5 text-red-600" /> Acceso Instantáneo
            </span>
          </div>



        </div>

        {/* COMPACT FOOTER */}
        <footer className="bg-red-950 text-gray-400 py-4 sm:py-6 text-center text-[11px] border-t border-red-900/30 w-full mt-auto">
          <p>© {new Date().getFullYear()} AcuSalud Academia. Todos los derechos reservados.</p>
        </footer>

      </div>
    );
  }

  if (currentPath === "/upsell") {
    return (
      <div className="min-h-screen bg-sand-light antialiased font-sans text-gray-800 flex flex-col justify-between relative" id="upsell-landing-page">
        
        {/* TOP URGENT BANNER */}
        <div className="bg-[#09261a] text-white text-[11px] md:text-xs py-2.5 px-4 text-center font-mono flex items-center justify-center gap-2 select-none shadow-sm sticky top-0 z-40">
          <span className="inline-block animate-pulse text-gold-medium font-bold">⚠️</span>
          <span className="font-sans font-medium tracking-wide">
            Oportunidad Única: Esta oferta complementaria solo está disponible aquí
          </span>
          <span className="mx-1">•</span>
          <span className="font-bold text-gold-medium tracking-widest bg-black/30 px-2 py-0.5 rounded">
            {formatTime(timeLeft)}
          </span>
        </div>

        {/* CONTENT CONTAINER - aligned to top */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 pt-4 sm:pt-6 pb-12 flex-1 flex flex-col items-center justify-start">
          
          {/* THANK YOU / SUCCESS NOTICE */}
          <div className="w-full max-w-3xl bg-emerald-50/80 border border-emerald-200 rounded-xl py-2 px-4 text-center mb-6 shadow-xs animate-in fade-in duration-300">
            <div className="flex items-center justify-center gap-2 text-emerald-800 text-xs">
              <span>🎉</span>
              <p className="font-sans font-medium text-emerald-900">
                <strong>¡Gracias por tu compra!</strong> Tu pedido ya se está enviando a tu correo. No cierres esta página, mira esta adición exclusiva recomendada:
              </p>
            </div>
          </div>

          {/* MAIN TITLES */}
          <h1 className="font-serif text-2xl sm:text-3xl md:text-5xl text-forest-dark text-center tracking-tight leading-tight mb-2 font-bold px-2">
            Mapa de Digitopuntura
          </h1>
          <p className="text-gold-dark italic font-semibold text-base sm:text-lg md:text-xl text-center mb-4 md:mb-6">
            18 puntos ilustrados y protocolos completos para los 6 patrones de la Dietoterapia China
          </p>

          <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed text-center max-w-2xl mx-auto mb-6 md:mb-10 px-2">
            Complementa tu programa de Dietoterapia China con una guía práctica para aplicar digitopuntura de forma fácil y segura, utilizando únicamente tus manos.<br /><br />
            Descubrirás 18 puntos ilustrados, 6 protocolos completos para los principales desequilibrios energéticos y rutinas rápidas para molestias comunes como ansiedad, insomnio, dolor de cabeza, náuseas y fatiga.<br /><br />
            Una herramienta práctica para incorporar a tu rutina diaria y potenciar tu bienestar de forma natural.
          </p>

          {/* Main Book Mockup Image - MATCHES EXACTLY THE MAIN HERO LAYOUT AND SIZES */}
          <div className="relative max-w-xl mx-auto mb-10 group rounded-2xl overflow-hidden shadow-2xl border-4 border-white transition-transform duration-500 hover:scale-[1.01] min-h-[250px] sm:min-h-[400px] flex items-center justify-center bg-sand-light/50" id="upsell-book-mockup-wrapper">
            {/* Elegant Skeleton Loader */}
            {!protocolImageLoaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-sand-light/40 animate-pulse">
                <div className="w-10 h-10 rounded-full border-4 border-forest-light border-t-gold-medium animate-spin mb-3"></div>
                <span className="text-xs font-mono text-forest-dark tracking-wider">Cargando material interactivo...</span>
              </div>
            )}
            <picture className={`w-full transition-opacity duration-700 ease-in-out ${protocolImageLoaded ? "opacity-100" : "opacity-0"}`}>
              <source srcSet={protocolImgAvif} type="image/avif" />
              <source srcSet={protocolImgWebp} type="image/webp" />
              <img
                src={protocolImgPng}
                alt="Mapa de Digitopuntura"
                className="w-full h-auto object-cover"
                referrerPolicy="no-referrer"
                onLoad={() => setProtocolImageLoaded(true)}
              />
            </picture>
            
            {/* Soft decorative shadow overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>

          {/* Core Benefits List Card */}
          <div className="w-full max-w-xl bg-white rounded-3xl border border-sand-dark p-6 sm:p-8 shadow-xl mb-6 md:mb-10">
            <h3 className="font-serif text-lg sm:text-xl font-bold text-forest-dark flex items-center gap-1.5 justify-center mb-4 uppercase tracking-wide">
              ¿Qué vas a encontrar en este mapa?
            </h3>
            
            <div className="space-y-3.5 text-xs sm:text-sm text-gray-600">
              <div className="flex items-start gap-2.5">
                <span className="text-emerald-600 font-bold text-base shrink-0">✔</span>
                <div>
                  <strong className="text-forest-dark">Atlas Ilustrado de 18 Puntos:</strong> Con la ubicación exacta, función energética detallada y notas de seguridad completas para cada punto.
                </div>
              </div>
              
              <div className="flex items-start gap-2.5">
                <span className="text-emerald-600 font-bold text-base shrink-0">✔</span>
                <div>
                  <strong className="text-forest-dark">6 Protocolos Completos:</strong> Uno por cada patrón de desequilibrio del manual principal, facilitando la estimulación directa desde afuera.
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="text-emerald-600 font-bold text-base shrink-0">✔</span>
                <div>
                  <strong className="text-forest-dark">Alivio de Situaciones Agudas:</strong> Protocolos rápidos para dolor de cabeza, insomnio, ansiedad, náuseas, fatiga, cólico menstrual e inicio de resfriado.
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="text-emerald-600 font-bold text-base shrink-0">✔</span>
                <div>
                  <strong className="text-forest-dark">Secuencias y Diario de Progreso:</strong> Combinaciones recomendadas para patrones dobles y un diario de seguimiento de 4 semanas.
                </div>
              </div>
            </div>
          </div>

          {/* HOTMART - Sales Funnel Widget */}
          <HotmartSalesFunnel />

          {/* Secure purchase icons */}
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mt-6 text-gray-400 text-[10px] sm:text-[11px] md:text-xs">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Compra 100% Segura
            </span>
            <span className="hidden sm:inline text-gray-300">•</span>
            <span className="flex items-center gap-1">
              <Download className="w-3.5 h-3.5 text-emerald-600" /> Descarga Inmediata
            </span>
          </div>



        </div>

        {/* COMPACT FOOTER */}
        <footer className="bg-forest-dark text-gray-400 py-4 sm:py-6 text-center text-[11px] border-t border-forest-light/20 w-full mt-auto">
          <p>© {new Date().getFullYear()} AcuSalud Academia. Todos los derechos reservados.</p>
        </footer>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sand-light antialiased font-sans text-gray-800">
      
      {/* 1. TOP TIMER BANNER (Dark Green Bar) */}
      <div className="bg-[#09261a] text-white text-[11px] md:text-xs py-2 px-4 text-center font-mono flex items-center justify-center gap-2 select-none shadow-sm sticky top-0 z-40">
        <span className="inline-block animate-pulse text-gold-medium font-bold">⚠️</span>
        <span className="font-sans font-medium tracking-wide">
          Esta oferta exclusiva caducará pronto
        </span>
        <span className="mx-1">•</span>
        <span className="font-bold text-gold-medium tracking-widest bg-black/30 px-2 py-0.5 rounded">
          {formatTime(timeLeft)}
        </span>
      </div>

      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        
        {/* HEADER SECTION */}
        <header className="flex flex-col items-center justify-center mb-6 mt-2">
          <AcuLogo size="sm" />
        </header>

        {/* 2. HERO / PRESENTATION SECTION */}
        <section className="text-center max-w-4xl mx-auto mb-12" id="hero-section">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sand-medium border border-gold-light/30 text-[9px] md:text-[10px] tracking-[0.15em] font-medium text-forest-medium uppercase mb-4 select-none shadow-xs">
            <span>🍃</span> ALIMENTA TU QI • TRANSFORMA VIDAS
          </div>

          {/* Main Display Heading */}
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-forest-dark tracking-tight leading-[1.15] mb-6 font-medium">
            Aprende a aplicar la{" "}
            <span className="text-gold-dark italic font-semibold">Dietoterapia China</span> para tratar a tus pacientes
          </h2>

          {/* Subtext */}
          <p className="text-sm md:text-base text-gray-600 leading-relaxed max-w-3xl mx-auto mb-10">
            Obtén acceso a pautas clínicas prácticas para tratar e indicar alimentos de acuerdo con el diagnóstico energético y potenciar al máximo los resultados de tus consultantes de forma natural.
          </p>

          {/* Main Book Mockup Image */}
          <div className="relative max-w-xl mx-auto mb-10 group rounded-2xl overflow-hidden shadow-2xl border-4 border-white transition-transform duration-500 hover:scale-[1.01] min-h-[250px] sm:min-h-[400px] flex items-center justify-center bg-sand-light/50" id="book-mockup-wrapper">
            {/* Elegant Skeleton Loader */}
            {!heroImageLoaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-sand-light/40 animate-pulse">
                <div className="w-10 h-10 rounded-full border-4 border-forest-light border-t-gold-medium animate-spin mb-3"></div>
                <span className="text-xs font-mono text-forest-dark tracking-wider">Cargando material interactivo...</span>
              </div>
            )}
            <picture className={`w-full transition-opacity duration-700 ease-in-out ${heroImageLoaded ? "opacity-100" : "opacity-0"}`}>
              <source srcSet={bundleImgAvif} type="image/avif" />
              <source srcSet={bundleImgWebp} type="image/webp" />
              <img
                src={bundleImgPng}
                alt="Manual Completo de Dietoterapia China y Bonos de consulta"
                className="w-full h-auto object-cover"
                referrerPolicy="no-referrer"
                onLoad={() => setHeroImageLoaded(true)}
              />
            </picture>
            {/* Soft decorative shadow overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>

          {/* CTA Button 1 */}
          <button
            onClick={() => scrollToSection("plan-completo-card")}
            className="inline-flex flex-col items-center justify-center px-8 py-4 rounded-full bg-[#113827] hover:bg-[#1a4b35] text-white font-extrabold text-xs md:text-sm tracking-widest uppercase transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg shadow-forest-dark/20 cursor-pointer"
            id="hero-cta-btn"
          >
            <span>QUIERO ACCEDER AHORA</span>
            <span className="text-xs mt-1 font-sans">➔</span>
          </button>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-xs text-gray-500 font-medium" id="trust-badges-bar">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4.5 h-4.5 text-gold-medium" />
              <span>Garantía de 7 días</span>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-sand-dark hidden sm:block" />
            <div className="flex items-center gap-1.5">
              <Clock className="w-4.5 h-4.5 text-gold-medium" />
              <span>Acceso de por vida</span>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-sand-dark hidden sm:block" />
            <div className="flex items-center gap-1.5">
              <Smartphone className="w-4.5 h-4.5 text-gold-medium" />
              <span>En cualquier dispositivo</span>
            </div>
          </div>
        </section>

      </div>

      {/* 2.7. "Este material es para ti si..." SECTION (Deep Forest Green Background) */}
      <section className="bg-[#113827] text-white py-16 md:py-20 shadow-inner" id="who-is-it-for-section">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-gold-light tracking-tight font-medium mb-3">
              Este material es para ti si...
            </h3>
            <p className="text-xs md:text-sm text-sand-dark/80 tracking-wide uppercase font-mono max-w-2xl mx-auto">
              Profesionales que buscan transformar la teoría en una práctica clínica real y efectiva.
            </p>
          </div>

          {/* Grid of 8 Pain points with rich old copy */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto mb-12" id="pain-points-grid">
            
            <div className="flex gap-3.5 p-5 rounded-xl bg-[#09261a]/60 border border-forest-light hover:border-gold-medium/50 transition-colors duration-300">
              <Check className="w-5 h-5 text-gold-medium shrink-0 mt-0.5" />
              <p className="text-xs md:text-sm text-sand-light leading-relaxed">
                Ya has estudiado Medicina China, pero aún sientes inseguridad en el día a día para orientar a tus pacientes de forma totalmente personalizada.
              </p>
            </div>

            <div className="flex gap-3.5 p-5 rounded-xl bg-[#09261a]/60 border border-forest-light hover:border-gold-medium/50 transition-colors duration-300">
              <Check className="w-5 h-5 text-gold-medium shrink-0 mt-0.5" />
              <p className="text-xs md:text-sm text-sand-light leading-relaxed">
                No tienes claro qué alimentos específicos indicar o desaconsejar para cada síndrome energético de la Medicina Tradicional China.
              </p>
            </div>

            <div className="flex gap-3.5 p-5 rounded-xl bg-[#09261a]/60 border border-forest-light hover:border-gold-medium/50 transition-colors duration-300">
              <Check className="w-5 h-5 text-gold-medium shrink-0 mt-0.5" />
              <p className="text-xs md:text-sm text-sand-light leading-relaxed">
                Te cuesta traducir la teoría abstracta y compleja de los clásicos en pautas alimentarias y direccionamientos clínicos sencillos, objetivos y fáciles de aplicar.
              </p>
            </div>

            <div className="flex gap-3.5 p-5 rounded-xl bg-[#09261a]/60 border border-forest-light hover:border-gold-medium/50 transition-colors duration-300">
              <Check className="w-5 h-5 text-gold-medium shrink-0 mt-0.5" />
              <p className="text-xs md:text-sm text-sand-light leading-relaxed">
                Deseas agregar un valor real y sumamente diferenciador a tus consultas presenciales u online para destacar con prestigio en tu especialidad local.
              </p>
            </div>

            <div className="flex gap-3.5 p-5 rounded-xl bg-[#09261a]/60 border border-forest-light hover:border-gold-medium/50 transition-colors duration-300">
              <Check className="w-5 h-5 text-gold-medium shrink-0 mt-0.5" />
              <p className="text-xs md:text-sm text-sand-light leading-relaxed">
                Quieres entregar planes de acción prácticos, naturales y terapéuticos totalmente adaptados al cuadro clínico actual de cada consultante.
              </p>
            </div>

            <div className="flex gap-3.5 p-5 rounded-xl bg-[#09261a]/60 border border-forest-light hover:border-gold-medium/50 transition-colors duration-300">
              <Check className="w-5 h-5 text-gold-medium shrink-0 mt-0.5" />
              <p className="text-xs md:text-sm text-sand-light leading-relaxed">
                Buscas aumentar considerablemente el apego, la constancia y los resultados de tus tratamientos clínicos guiando a tus pacientes sin tecnicismos complejos.
              </p>
            </div>

            <div className="flex gap-3.5 p-5 rounded-xl bg-[#09261a]/60 border border-forest-light hover:border-gold-medium/50 transition-colors duration-300">
              <Check className="w-5 h-5 text-gold-medium shrink-0 mt-0.5" />
              <p className="text-xs md:text-sm text-sand-light leading-relaxed">
                Necesitas un material de consulta sumamente rápido, visual y perfectamente estructurado para tener de apoyo inmediato durante el transcurso de tu consulta diaria.
              </p>
            </div>

            <div className="flex gap-3.5 p-5 rounded-xl bg-[#09261a]/60 border border-forest-light hover:border-gold-medium/50 transition-colors duration-300">
              <Check className="w-5 h-5 text-gold-medium shrink-0 mt-0.5" />
              <p className="text-xs md:text-sm text-sand-light leading-relaxed">
                Quieres acelerar notablemente los efectos de la acupuntura, fitoterapia u otras técnicas combinándolas estratégicamente con la alimentación indicada.
              </p>
            </div>

          </div>

          {/* CTA Button 2 */}
          <div className="text-center">
            <button
              onClick={() => scrollToSection("plan-completo-card")}
              className="inline-flex flex-col items-center justify-center px-10 py-5 rounded-full bg-[#c59f5b] hover:bg-[#dfc28d] text-[#113827] font-extrabold text-xs md:text-sm tracking-widest uppercase transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-xl cursor-pointer"
              id="pain-points-cta-btn"
            >
              <span>QUIERO ACCEDER AHORA</span>
              <span className="text-xs mt-1 font-sans">➔</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3. "Lo que vas a aprender" SECTION */}
      <section className="py-16 md:py-20 px-6 bg-sand-medium/60 border-b border-sand-dark/30" id="learning-section">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-forest-dark tracking-tight leading-tight font-semibold mb-2">
              Lo que vas a aprender
            </h3>
            <p className="text-sm md:text-base text-gray-600 font-sans tracking-wide">
              Los Cinco Elementos aplicados a la clínica diaria
            </p>
          </div>

          {/* Interactive Elements Tabs & clinical grid (reusable customized component) */}
          <MovementTabs />
        </div>
      </section>

      {/* 4. "Qué encontrarás dentro del manual" SECTION */}
      <section className="py-16 md:py-20 px-6 bg-sand-medium/35 border-b border-sand-dark/30" id="manual-contents-section">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[10.5px] md:text-xs font-mono tracking-[0.3em] uppercase text-gold-dark font-semibold">
              Estructura del material
            </span>
            <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-forest-dark tracking-tight font-semibold mt-2 mb-4">
              Qué encontrarás dentro del manual
            </h3>
            <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Un recorrido paso a paso diseñado para llevar la teoría milenaria de la Medicina China directamente a la camilla y consulta diaria.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto" id="manual-contents-grid">
            {/* Module 1 */}
            <div className="bg-white border border-sand-dark/40 p-6 rounded-2xl shadow-xs hover:shadow-md hover:border-gold-medium/40 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <span className="font-serif text-4xl font-extrabold text-[#113827]/10 group-hover:text-gold-medium/30 transition-colors duration-300 block mb-3">
                  1
                </span>
                <h4 className="font-serif text-base md:text-lg font-bold text-forest-dark mb-2 leading-snug">
                  Fundamentos de la Dietoterapia
                </h4>
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                  Comprende de forma clara y lógica los principios bioenergéticos que rigen la acción terapéutica de los alimentos comunes en el cuerpo humano.
                </p>
              </div>
            </div>

            {/* Module 2 */}
            <div className="bg-white border border-sand-dark/40 p-6 rounded-2xl shadow-xs hover:shadow-md hover:border-gold-medium/40 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <span className="font-serif text-4xl font-extrabold text-[#113827]/10 group-hover:text-gold-medium/30 transition-colors duration-300 block mb-3">
                  2
                </span>
                <h4 className="font-serif text-base md:text-lg font-bold text-forest-dark mb-2 leading-snug">
                  Los Cinco Elementos
                </h4>
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                  Aprende a clasificar y seleccionar alimentos con coherencia clínica en base a las 5 naturalezas térmicas, los 5 sabores tradicionales y su tropismo de canal.
                </p>
              </div>
            </div>

            {/* Module 3 */}
            <div className="bg-white border border-sand-dark/40 p-6 rounded-2xl shadow-xs hover:shadow-md hover:border-gold-medium/40 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <span className="font-serif text-4xl font-extrabold text-[#113827]/10 group-hover:text-gold-medium/30 transition-colors duration-300 block mb-3">
                  3
                </span>
                <h4 className="font-serif text-base md:text-lg font-bold text-forest-dark mb-2 leading-snug">
                  Diagnóstico Energético
                </h4>
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                  Descubre cómo transformar un diagnóstico tradicional de MTC (Deficiencias, Excesos, Calor, Frío, Estancamientos) en recomendaciones alimentarias sumamente objetivas y sencillas.
                </p>
              </div>
            </div>

            {/* Module 4 */}
            <div className="bg-white border border-sand-dark/40 p-6 rounded-2xl shadow-xs hover:shadow-md hover:border-gold-medium/40 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <span className="font-serif text-4xl font-extrabold text-[#113827]/10 group-hover:text-gold-medium/30 transition-colors duration-300 block mb-3">
                  4
                </span>
                <h4 className="font-serif text-base md:text-lg font-bold text-forest-dark mb-2 leading-snug">
                  Recetas Terapéuticas
                </h4>
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                  Accede a protocolos listos e indicaciones terapéuticas ya formuladas para un uso e indicación inmediatos dentro de tu consulta profesional.
                </p>
              </div>
            </div>

            {/* Module 5 */}
            <div className="bg-white border border-sand-dark/40 p-6 rounded-2xl shadow-xs hover:shadow-md hover:border-gold-medium/40 transition-all duration-300 flex flex-col justify-between group md:col-span-2 lg:col-span-1 max-w-md mx-auto lg:max-w-none">
              <div>
                <span className="font-serif text-4xl font-extrabold text-[#113827]/10 group-hover:text-gold-medium/30 transition-colors duration-300 block mb-3">
                  5
                </span>
                <h4 className="font-serif text-base md:text-lg font-bold text-forest-dark mb-2 leading-snug">
                  Planificación y Orientación Práctica
                </h4>
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                  Modelos prácticos y guías rápidas listas para imprimir que facilitan enormemente el apego, la comprensión y los resultados terapéuticos de tus consultantes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. BONOS EXCLUSIVOS SECTION */}
      <section className="py-16 md:py-20 px-6 bg-sand-medium/40 border-t border-sand-dark/60" id="bonuses-section">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-12">
            <span className="text-xs font-mono tracking-[0.25em] text-gold-dark font-semibold bg-white px-3 py-1 rounded-full border border-sand-dark/80">
              BONOS EXCLUSIVOS
            </span>
            <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-forest-dark tracking-tight leading-tight mt-4 font-medium">
              Además, recibirás estos obsequios de inmediato
            </h3>
          </div>

          {/* 4 Bonus Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="bonuses-cards-grid">
            
            {/* Bono 1 */}
            <div className="bg-white p-6 rounded-2xl border-2 border-gold-light/40 shadow-sm relative flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="absolute -top-3 left-6 bg-gold-medium text-white px-3 py-0.5 rounded text-[10px] font-mono uppercase tracking-widest font-bold">
                Bono 1
              </div>
              <div className="pt-2">
                <h4 className="font-serif text-lg font-bold text-forest-dark mb-2">
                  Tarjetas de Consulta Rápida para Recomendar Alimentos con Certeza
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed mb-6">
                  Tarjetas en formato digital listas para imprimir (tamaño A6) con las principales síndromes clínicos de la MTC y la lista simplificada de sus alimentos indicados y contraindicados.
                </p>
              </div>
              <div className="border-t border-sand-medium pt-3 mt-auto flex items-center justify-between">
                <span className="text-xs text-gray-500 font-mono">Valor individual:</span>
                <span className="text-xs font-bold text-red-700 font-mono line-through">{currency.symbol}{currency.bono1} {currency.code}</span>
              </div>
            </div>

            {/* Bono 2 */}
            <div className="bg-white p-6 rounded-2xl border-2 border-gold-light/40 shadow-sm relative flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="absolute -top-3 left-6 bg-gold-medium text-white px-3 py-0.5 rounded text-[10px] font-mono uppercase tracking-widest font-bold">
                Bono 2
              </div>
              <div className="pt-2">
                <h4 className="font-serif text-lg font-bold text-forest-dark mb-2">
                  Guía de Recetas Terapéuticas de la Medicina China
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed mb-6">
                  Recetario práctico en PDF con sopas reconstituyentes, caldos medicinales y tés curativos estructurados para nutrir la Sangre, tonificar el Qi, templar el frío o drenar la humedad.
                </p>
              </div>
              <div className="border-t border-sand-medium pt-3 mt-auto flex items-center justify-between">
                <span className="text-xs text-gray-500 font-mono">Valor individual:</span>
                <span className="text-xs font-bold text-red-700 font-mono line-through">{currency.symbol}{currency.bono2} {currency.code}</span>
              </div>
            </div>

            {/* Bono 3 */}
            <div className="bg-white p-6 rounded-2xl border-2 border-gold-light/40 shadow-sm relative flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="absolute -top-3 left-6 bg-gold-medium text-white px-3 py-0.5 rounded text-[10px] font-mono uppercase tracking-widest font-bold">
                Bono 3
              </div>
              <div className="pt-2">
                <h4 className="font-serif text-lg font-bold text-forest-dark mb-2">
                  Calendario Estacional de Alimentación según los Cinco Movimientos
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed mb-6">
                  Guía completa temporada por temporada que te indica exactamente qué alimentos priorizar y cuáles evitar para armonizar el Qi de los órganos correspondientes (Hígado en primavera, Corazón en verano, etc.) y mantener la salud de tus pacientes en sintonía con la naturaleza.
                </p>
              </div>
              <div className="border-t border-sand-medium pt-3 mt-auto flex items-center justify-between">
                <span className="text-xs text-gray-500 font-mono">Valor individual:</span>
                <span className="text-xs font-bold text-red-700 font-mono line-through">{currency.symbol}{currency.bono3} {currency.code}</span>
              </div>
            </div>

            {/* Bono 4 */}
            <div className="bg-white p-6 rounded-2xl border-2 border-gold-light/40 shadow-sm relative flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="absolute -top-3 left-6 bg-gold-medium text-white px-3 py-0.5 rounded text-[10px] font-mono uppercase tracking-widest font-bold">
                Bono 4
              </div>
              <div className="pt-2">
                <h4 className="font-serif text-lg font-bold text-forest-dark mb-2">
                  Plantillas de Anamnesis y Seguimiento Nutricional Energético
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed mb-6">
                  Esquemas prácticos y fichas profesionales listas para descargar e imprimir en tu estudio o consultorio. Agilizan el registro clínico del diagnóstico tradicional por lengua, pulso, hábitos alimentarios y la evolución del tratamiento bioenergético de tus pacientes.
                </p>
              </div>
              <div className="border-t border-sand-medium pt-3 mt-auto flex items-center justify-between">
                <span className="text-xs text-gray-500 font-mono">Valor individual:</span>
                <span className="text-xs font-bold text-red-700 font-mono line-through">{currency.symbol}{currency.bono4} {currency.code}</span>
              </div>
            </div>

            {/* Bono 5 */}
            <div className="bg-white p-6 rounded-2xl border-2 border-gold-light/40 shadow-sm relative flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="absolute -top-3 left-6 bg-gold-medium text-white px-3 py-0.5 rounded text-[10px] font-mono uppercase tracking-widest font-bold">
                Bono 5
              </div>
              <div className="pt-2">
                <h4 className="font-serif text-lg font-bold text-forest-dark mb-2">
                  Caldos y Fondos Terapéuticos (17 páginas)
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed mb-6">
                  6 caldos base (uno por cada patrón) + 3 caldos especiales (resfriado, recuperación/posparto, digestivo) + guía paso a paso para transformar cualquier caldo en una comida completa en 15 minutos + pautas detalladas de conservación y seguridad alimentaria.
                </p>
              </div>
              <div className="border-t border-sand-medium pt-3 mt-auto flex items-center justify-between">
                <span className="text-xs text-gray-500 font-mono">Valor individual:</span>
                <span className="text-xs font-bold text-red-700 font-mono line-through">{currency.symbol}{currency.bono5} {currency.code}</span>
              </div>
            </div>

            {/* Bono 6 */}
            <div className="bg-white p-6 rounded-2xl border-2 border-gold-light/40 shadow-sm relative flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="absolute -top-3 left-6 bg-gold-medium text-white px-3 py-0.5 rounded text-[10px] font-mono uppercase tracking-widest font-bold">
                Bono 6
              </div>
              <div className="pt-2">
                <h4 className="font-serif text-lg font-bold text-forest-dark mb-2">
                  Atlas de Diagnóstico por la Lengua (18 páginas)
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed mb-6">
                  12 tablas ilustradas con diagramas vectoriales originales de la lengua (diseñados por código, sin fotos de stock) detallando color, forma, saburra, grietas y manchas. Cada una incluye su patrón energético, síntomas asociados y orientación dietética, además de una tabla comparativa y advertencias sobre los límites de la autoevaluación.
                </p>
              </div>
              <div className="border-t border-sand-medium pt-3 mt-auto flex items-center justify-between">
                <span className="text-xs text-gray-500 font-mono">Valor individual:</span>
                <span className="text-xs font-bold text-red-700 font-mono line-through">{currency.symbol}{currency.bono6} {currency.code}</span>
              </div>
            </div>

            {/* Bono 7 */}
            <div className="bg-white p-6 rounded-2xl border-2 border-gold-light/40 shadow-sm relative flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="absolute -top-3 left-6 bg-gold-medium text-white px-3 py-0.5 rounded text-[10px] font-mono uppercase tracking-widest font-bold">
                Bono 7
              </div>
              <div className="pt-2">
                <h4 className="font-serif text-lg font-bold text-forest-dark mb-2">
                  Combinaciones Alimentarias a Evitar (14 páginas)
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed mb-6">
                  Origen histórico del concepto, principios generales (choque térmico, sobrecarga funcional), combinaciones tradicionales específicas y combinaciones a evitar según el patrón personal. Incluye combinaciones positivas recomendadas, mitos desmontados, casos prácticos y preguntas frecuentes abordados con un enfoque honesto (tradición cultural frente a ciencia verificada).
                </p>
              </div>
              <div className="border-t border-sand-medium pt-3 mt-auto flex items-center justify-between">
                <span className="text-xs text-gray-500 font-mono">Valor individual:</span>
                <span className="text-xs font-bold text-red-700 font-mono line-through">{currency.symbol}{currency.bono7} {currency.code}</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 9. DEEP GREEN INVESTMENT PRICING SECTION */}
      <section className="bg-[#113827] text-white py-16 md:py-24 px-6 shadow-inner relative overflow-hidden" id="pricing-section">
        
        {/* Soft elegant background glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-medium/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-forest-light/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          
          <div className="text-center mb-16">
            <span className="inline-block bg-[#09261a] border border-gold-medium/40 text-gold-light text-[10px] md:text-xs font-mono uppercase tracking-[0.25em] px-4 py-1.5 rounded-full mb-4 shadow-xs">
              🔥 CONDICIONES EXCLUSIVAS DE LANZAMIENTO
            </span>
            <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-gold-light tracking-tight font-medium leading-tight">
              Elige tu plan
            </h3>
          </div>

          {/* Pricing cards grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch max-w-4xl mx-auto px-2 md:px-0" id="pricing-plans-grid">
            
            {/* PLAN BÁSICO CARD */}
            <div className="bg-[#09261a] text-white rounded-3xl border border-forest-light/35 p-6 md:p-8 flex flex-col justify-between shadow-xl transition-all duration-300 hover:border-forest-light/60 text-left relative" id="plan-basico-card">
              
              <div>
                {/* Header Badge */}
                <div className="text-2xl md:text-3xl tracking-wider font-black text-white uppercase mb-6">
                  PLAN BÁSICO
                </div>

                {/* Features List */}
                <div className="space-y-4 pt-4 border-t border-white/10">
                  <div className="flex items-start gap-2.5 text-xs md:text-sm text-sand-light/95">
                    <span className="text-emerald-400 shrink-0 mt-0.5">✔</span>
                    <span>Manual Completo <strong>"Dietoterapia China"</strong></span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs md:text-sm text-white/30 line-through select-none">
                    <span className="text-red-400/60 shrink-0 mt-0.5">❌</span>
                    <span>Sin bonos exclusivos incluidos en el paquete</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs md:text-sm text-white/30 line-through select-none">
                    <span className="text-red-400/60 shrink-0 mt-0.5">❌</span>
                    <span>Sin actualizaciones futuras gratuitas</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs md:text-sm text-white/30 line-through select-none">
                    <span className="text-red-400/60 shrink-0 mt-0.5">❌</span>
                    <span>Sin soporte prioritario de dudas por correo electrónico</span>
                  </div>
                </div>

                {/* Prices - Moved below Features List and centered */}
                <div className="mt-4 mb-3 pt-4 border-t border-white/10 flex flex-col items-center justify-center text-center w-full" id="price-stack-basico">
                  {/* Original Price */}
                  <span className="text-sm md:text-base font-bold text-red-400 line-through tracking-tight mb-1">
                    De {currency.symbol}{currency.basicoOriginal} por solo
                  </span>
                  {/* Current Price */}
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-5xl md:text-6xl font-serif font-black tracking-tight text-white leading-none">
                      {currency.symbol}{currency.basico}
                    </span>
                    {currency.code !== "USD" && (
                      <span className="text-sm font-sans text-sand-dark/60">
                        (~ $5 USD)
                      </span>
                    )}
                  </div>
                  {/* Bottom Label */}
                  <span className="text-xs text-sand-dark/60 mt-2 font-medium tracking-wide">
                    pago único ({currency.code})
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-4 pt-4 border-t border-white/10">
                <button
                  onClick={() => {
                    setShowUpsellModal(true);
                  }}
                  className="block w-full py-4 rounded-xl bg-white hover:bg-sand-light border-2 border-white text-[#09261a] font-extrabold text-sm tracking-wider uppercase transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] text-center cursor-pointer shadow-sm"
                  id="checkout-plan-basico"
                >
                  Quiero el Plan Básico ➔
                </button>
              </div>

            </div>

            {/* ACESSO COMPLETO CARD (RECOMMENDED) */}
            <div className="bg-white text-gray-800 rounded-3xl border-4 border-gold-medium p-6 md:p-8 flex flex-col justify-between shadow-2xl relative transition-all duration-300 hover:shadow-gold-medium/15 text-left scale-100 lg:scale-[1.03] z-10" id="plan-completo-card">
              
              {/* Recommended Corner Ribbon / Badge */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gold-medium text-[#113827] px-3.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest flex items-center gap-1 shadow-md border border-white whitespace-nowrap">
                <span>🎗</span> RECOMENDADO
              </div>

              <div>
                {/* Header Badge */}
                <div className="text-2xl md:text-3xl tracking-wider font-black text-[#113827] uppercase mb-6">
                  PLAN COMPLETO
                </div>


                {/* Features List */}
                <div className="space-y-4 pt-4 border-t border-gray-100">

                  <div className="flex items-start gap-2.5 text-xs md:text-sm text-gray-700">
                    <span className="text-emerald-600 shrink-0 mt-0.5">✔</span>
                    <span>Manual Completo <strong>"Dietoterapia China"</strong></span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs md:text-sm text-gray-700">
                    <span className="text-emerald-600 shrink-0 mt-0.5">✔</span>
                    <span>Acceso <strong>Vitalicio</strong> permanente (descarga para siempre)</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs md:text-sm text-gray-700">
                    <span className="text-emerald-600 shrink-0 mt-0.5">✔</span>
                    <span>Actualizaciones <strong>100% gratis</strong> de por vida</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs md:text-sm text-gray-700 font-sans">
                    <span className="text-emerald-600 shrink-0 mt-0.5">✔</span>
                    <span>Soporte prioritario de dudas por correo electrónico</span>
                  </div>

                  {/* 7 Bonos Exclusivos (without box, using same style and font, flattened list) */}
                  <div className="space-y-2.5 pt-0.5">
                    <div className="flex items-start gap-2.5 text-xs md:text-sm text-gray-700">
                      <span className="shrink-0 mt-0.5">🎁</span>
                      <span><strong>BONO 1:</strong> Tarjetas de Consulta Rápida (Síndromes y Alimentos)</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs md:text-sm text-gray-700">
                      <span className="shrink-0 mt-0.5">🎁</span>
                      <span><strong>BONO 2:</strong> Guía de Recetas de la Medicina Tradicional China</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs md:text-sm text-gray-700">
                      <span className="shrink-0 mt-0.5">🎁</span>
                      <span><strong>BONO 3:</strong> Calendario Estacional según los Cinco Movimientos</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs md:text-sm text-gray-700">
                      <span className="shrink-0 mt-0.5">🎁</span>
                      <span><strong>BONO 4:</strong> Plantillas de Anamnesis y Seguimiento Nutricional</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs md:text-sm text-gray-700">
                      <span className="shrink-0 mt-0.5">🎁</span>
                      <span><strong>BONO 5:</strong> Recetario de Caldos y Fondos Terapéuticos</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs md:text-sm text-gray-700">
                      <span className="shrink-0 mt-0.5">🎁</span>
                      <span><strong>BONO 6:</strong> Atlas de Diagnóstico Clínico por la Lengua</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs md:text-sm text-gray-700">
                      <span className="shrink-0 mt-0.5">🎁</span>
                      <span><strong>BONO 7:</strong> Combinaciones Alimentarias a Evitar en MTC</span>
                    </div>
                  </div>

                  <div className="text-xs text-emerald-900 font-semibold bg-emerald-50/80 p-3 rounded-xl border border-emerald-150 leading-relaxed mt-2">
                    💡 Todo lo necesario para orientar desde tu primera consulta.
                  </div>
                </div>

                {/* Prices - Moved below Features List and centered */}
                <div className="mt-4 mb-3 pt-4 border-t border-gray-100 flex flex-col items-center justify-center text-center w-full" id="price-stack-completo">
                  {/* Original Price */}
                  <span className="text-sm md:text-base font-bold text-red-500 line-through tracking-tight mb-1">
                    De {currency.symbol}{currency.completoOriginal} por solo
                  </span>
                  {/* Current Price */}
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-5xl md:text-6xl font-serif font-black tracking-tight text-[#113827] leading-none">
                      {currency.symbol}{currency.completo}
                    </span>
                    {currency.code !== "USD" && (
                      <span className="text-sm font-sans text-gray-500">
                        (~ $15 USD)
                      </span>
                    )}
                  </div>
                  {/* Bottom Label */}
                  <span className="text-xs text-gray-500 mt-2 font-medium tracking-wide">
                    pago único ({currency.code})
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <button
                  onClick={() => {
                    window.open("https://pay.hotmart.com/O106596188M?off=05w6pih2&checkoutMode=10", "_blank");
                  }}
                  className="block w-full py-4.5 rounded-xl bg-[#113827] hover:bg-[#1b4b35] text-white font-extrabold text-sm tracking-wider uppercase transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-emerald-900/10 text-center cursor-pointer"
                  id="checkout-plan-completo"
                >
                  Quiero el Plan Completo ➔
                </button>
              </div>

            </div>

          </div>

          {/* Secure indicator footer */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-sand-dark/60 font-mono mt-12">
            <span className="flex items-center gap-1">🔒 Pago 100% Seguro y Encriptado</span>
            <span className="hidden sm:inline">•</span>
            <span>Garantía de reembolso de 7 días</span>
          </div>

        </div>
      </section>

      {/* 5. PATIENT TESTIMONIALS SECTION */}
      <section className="py-16 md:py-20 px-6 bg-sand-light border-b border-sand-dark/30" id="patient-testimonials-section">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-forest-dark tracking-tight font-semibold mb-3">
              Mira lo que están diciendo los pacientes tratados con Dietoterapia China
            </h3>
            <p className="text-xs md:text-sm text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Mensajes reales de pacientes reales que experimentaron los cambios clínicos en su alimentación guiada.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12" id="patient-testimonials-grid">
            {/* Card 1 */}
            <div className="bg-white p-6 rounded-2xl border border-sand-dark/40 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between text-left">
              <div>
                <div className="flex items-center gap-0.5 text-amber-400 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-amber-400 stroke-amber-400" />
                  ))}
                </div>
                <p className="text-gray-700 font-sans text-xs md:text-sm leading-relaxed mb-6 italic">
                  "La dieta templada y los caldos de bazo cambiaron mi vida por completo. En solo dos semanas mi digestión mejoró y recuperé mi energía diaria."
                </p>
              </div>
              <div>
                <div className="border-t border-sand-medium/40 my-3" />
                <div className="flex flex-col">
                  <span className="font-sans text-xs md:text-sm font-bold text-gray-900 leading-tight">
                    Sofía Méndez
                  </span>
                  <span className="text-[10px] text-gold-dark font-mono uppercase tracking-wider mt-0.5">
                    Tratamiento: Fatiga y Distensión
                  </span>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-6 rounded-2xl border border-sand-dark/40 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between text-left">
              <div>
                <div className="flex items-center gap-0.5 text-amber-400 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-amber-400 stroke-amber-400" />
                  ))}
                </div>
                <p className="text-gray-700 font-sans text-xs md:text-sm leading-relaxed mb-6 italic">
                  "El dolor de estómago constante desapareció eliminando los lácteos y alimentos fríos. Increíble cómo cosas tan sencillas tienen tanto impacto."
                </p>
              </div>
              <div>
                <div className="border-t border-sand-medium/40 my-3" />
                <div className="flex flex-col">
                  <span className="font-sans text-xs md:text-sm font-bold text-gray-900 leading-tight">
                    Carlos Mendoza
                  </span>
                  <span className="text-[10px] text-gold-dark font-mono uppercase tracking-wider mt-0.5">
                    Tratamiento: Gastritis Crónica
                  </span>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-6 rounded-2xl border border-sand-dark/40 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between text-left">
              <div>
                <div className="flex items-center gap-0.5 text-amber-400 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-amber-400 stroke-amber-400" />
                  ))}
                </div>
                <p className="text-gray-700 font-sans text-xs md:text-sm leading-relaxed mb-6 italic">
                  "Gracias a la terapia de alimentos templados pudimos equilibrar mi energía Yang. No solo mejoró mi digestión, sino también la calidad de mi sueño."
                </p>
              </div>
              <div>
                <div className="border-t border-sand-medium/40 my-3" />
                <div className="flex flex-col">
                  <span className="font-sans text-xs md:text-sm font-bold text-gray-900 leading-tight">
                    Laura Domínguez
                  </span>
                  <span className="text-[10px] text-gold-dark font-mono uppercase tracking-wider mt-0.5">
                    Tratamiento: Insomnio y Frío
                  </span>
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-6 rounded-2xl border border-sand-dark/40 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between text-left">
              <div>
                <div className="flex items-center gap-0.5 text-amber-400 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-amber-400 stroke-amber-400" />
                  ))}
                </div>
                <p className="text-gray-700 font-sans text-xs md:text-sm leading-relaxed mb-6 italic">
                  "La guía estacional ayudó a mi familia a no enfermarse este invierno. Los caldos y tés recomendados son sumamente reconfortantes y eficaces."
                </p>
              </div>
              <div>
                <div className="border-t border-sand-medium/40 my-3" />
                <div className="flex flex-col">
                  <span className="font-sans text-xs md:text-sm font-bold text-gray-900 leading-tight">
                    Andrés Villalobos
                  </span>
                  <span className="text-[10px] text-gold-dark font-mono uppercase tracking-wider mt-0.5">
                    Tratamiento: Deficiencia de Qi
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 5 CTA Button */}
          <div className="text-center">
            <button
              onClick={() => scrollToSection("plan-completo-card")}
              className="inline-flex flex-col items-center justify-center px-10 py-5 rounded-full bg-[#113827] hover:bg-[#1b4b35] text-white font-extrabold text-xs md:text-sm tracking-widest uppercase transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-xl cursor-pointer"
              id="patient-testimonials-cta-btn"
            >
              <span>QUIERO ACCEDER AHORA</span>
              <span className="text-xs mt-1 font-sans">➔</span>
            </button>
          </div>
        </div>
      </section>
      {/* SECTION REMOVED AND MOVED UPWARDS */}

      {/* 11. GARANTÍA INCONDICIONAL SECTION */}
      <section className="py-16 md:py-20 px-6 bg-sand-medium/40 border-y border-sand-dark/50" id="guarantee-section">
        <div className="max-w-3xl mx-auto text-center">
          
          <div className="w-16 h-16 rounded-full bg-[#113827] text-gold-medium flex items-center justify-center mx-auto mb-4 border-2 border-gold-medium/30 shadow">
            <ShieldCheck className="w-9 h-9" />
          </div>

          <span className="text-[10px] font-mono tracking-[0.25em] text-gold-dark font-bold uppercase">
            GARANTÍA INCONDICIONAL
          </span>

          <h3 className="font-serif text-3xl md:text-4xl text-forest-dark tracking-tight leading-tight mt-2 mb-4 font-semibold">
            7 días de garantía total
          </h3>

          <p className="text-xs md:text-sm text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Puedes adquirir el material ahora mismo con total tranquilidad, explorar todo el contenido detalladamente y, si consideras que no agrega un valor sustancial a tu práctica clínica diaria, solo tienes que solicitar el reembolso en un plazo de 7 días y te devolveremos el 100% de tu dinero de inmediato. Sin letra chica y sin complicaciones. El riesgo corre enteramente por nuestra cuenta.
          </p>

        </div>
      </section>

      {/* 12. PREGUNTAS FRECUENTES (FAQs) SECTION */}
      <section className="py-16 md:py-20 px-6 bg-white" id="faqs-section">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-12">
            <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-forest-dark tracking-tight font-medium">
              Preguntas frecuentes
            </h3>
          </div>

          {/* Collapsible Accordion Component */}
          <FAQAccordion />

        </div>
      </section>

      {/* 13. "Somos AcuAcademy" SECTION (Dark Green Background) */}
      <section className="bg-[#113827] text-white py-16 md:py-20 px-6 text-center" id="about-us-section">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          
          {/* Circular Frame enclosing AcuLogo elements */}
          <div className="bg-white p-6 rounded-2xl border-4 border-gold-medium/30 mb-6 flex items-center justify-center shadow-lg">
            <AcuLogo size="sm" />
          </div>

          <span className="text-[10px] font-mono tracking-[0.3em] text-gold-light uppercase font-bold mb-3">
            SOMOS ACUASALUD ACADEMÍA
          </span>

          <h3 className="font-serif text-2xl md:text-4xl text-gold-light tracking-tight font-medium mb-8 leading-tight max-w-xl">
            Formación seria para profesionales de la Medicina China
          </h3>

          <div className="space-y-4 text-xs md:text-sm text-sand-light/90 max-w-2xl leading-relaxed text-justify sm:text-center mb-10" id="about-us-paragraphs">
            <p>
              Ayudamos a los profesionales de la Medicina China a ganar total confianza al aplicar sus conocimientos en la práctica clínica diaria.
            </p>
            <p>
              Nuestro principal propósito y misión es decodificar y simplificar el conocimiento ancestral de la Medicina Tradicional China para transformarlo en materiales clínicos sumamente didácticos, prácticos y directamente aplicables a tu consulta del día a día.
            </p>
            <p>
              Diseñamos herramientas de estudio integrales que permiten a los terapeutas y profesionales sentirse con mayor certeza, confianza y plenamente preparados para diagnosticar y ofrecer indicaciones de primer nivel.
            </p>
            <p>
              Si deseas profundizar tus conocimientos técnicos y emplear la Medicina China con un nivel superior de estrategia, coherencia y solidez en beneficio de tus pacientes, estás definitivamente en el lugar correcto.
            </p>
          </div>

          {/* Button */}
          <button
            onClick={() => scrollToSection("plan-completo-card")}
            className="inline-flex flex-col items-center justify-center px-10 py-5 rounded-full bg-gold-medium hover:bg-gold-light text-forest-dark font-extrabold text-xs md:text-sm tracking-widest uppercase transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-xl cursor-pointer"
            id="final-cta-checkout-btn"
          >
            <span>QUIERO ACCEDER AHORA</span>
            <span className="text-xs mt-1 font-sans">➔</span>
          </button>

        </div>
      </section>

      {/* 15. FOOTER */}
      <footer className="bg-sand-medium border-t border-sand-dark/60 py-8 px-6 text-center">
        <p className="text-[10px] md:text-xs text-gray-500 font-mono">
          © 2026 AcuSalud Academía • Medicina Tradicional China • Todos los derechos reservados.
        </p>
      </footer>


      {/* ONE-TIME UPSELL POP-UP MODAL (HIGH-CONVERSION 50% OFF OFFER) */}
      {showUpsellModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-xs" id="upsell-modal">
          <div className="bg-white rounded-3xl border border-sand-dark w-full max-w-md overflow-y-auto max-h-[95vh] shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 text-center p-5 md:p-6 flex flex-col items-center">
            
            {/* Top Close Button */}
            <button
              onClick={() => {
                setShowUpsellModal(false);
              }}
              className="absolute top-3.5 right-3.5 text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
              aria-label="Cerrar"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Pill Tag */}
            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-emerald-700 to-[#113827] text-[10px] font-bold tracking-[0.15em] text-white uppercase mb-3 shadow-xs select-none">
              <span>🔥</span> OFERTA ESPECIAL EXCLUSIVA
            </div>

            {/* Title */}
            <h3 className="font-serif text-xl md:text-2xl text-forest-dark font-bold tracking-tight leading-snug px-2">
              ¡Espera! Tenemos una Oportunidad Única Para Ti
            </h3>

            {/* Subtitle */}
            <p className="text-xs text-gray-600 mt-2 max-w-sm px-2">
              Haz upgrade al <strong className="text-forest-dark font-bold">Plan Completo</strong> ahora por solo{" "}
              <span className="font-mono font-extrabold text-base text-emerald-800">{currency.symbol}{currency.upsell}</span>{" "}
              {currency.code !== "USD" && (
                <span className="text-xs text-emerald-800 font-bold">
                  (~ $10 USD)
                </span>
              )}
            </p>

            {/* Feature Card */}
            <div className="w-full bg-sand-light border border-sand-dark/80 rounded-2xl p-4 my-3.5 text-left shadow-xs">
              <div className="text-[11px] font-extrabold text-forest-dark uppercase tracking-wider mb-2 flex items-center gap-1 select-none">
                <span className="text-gold-medium animate-pulse">✨</span> Lo que ganas en Completo:
              </div>
              
              <div className="space-y-1.5 text-[11px] md:text-xs text-gray-700 leading-normal">
                <div className="flex items-start gap-1.5">
                  <span className="text-emerald-600 font-bold shrink-0">✔</span>
                  <span>Manual Completo <strong>"Dietoterapia China"</strong> (Acceso Vitalicio)</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="text-emerald-600 font-bold shrink-0">✔</span>
                  <span>Actualizaciones <strong>100% gratis</strong> de por vida</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="text-emerald-600 font-bold shrink-0">✔</span>
                  <span>Soporte prioritario de dudas por correo electrónico</span>
                </div>
                
                <div className="pt-1.5 border-t border-sand-dark/60 mt-1.5 space-y-1.5">
                  <div className="flex items-start gap-1.5 text-forest-medium font-medium">
                    <span className="text-gold-medium font-bold shrink-0">✔</span>
                    <span><strong>BONO 1:</strong> Tarjetas de Consulta Rápida (Síndromes y Alimentos)</span>
                  </div>
                  <div className="flex items-start gap-1.5 text-forest-medium font-medium">
                    <span className="text-gold-medium font-bold shrink-0">✔</span>
                    <span><strong>BONO 2:</strong> Guía de Recetas de la Medicina Tradicional China</span>
                  </div>
                  <div className="flex items-start gap-1.5 text-forest-medium font-medium">
                    <span className="text-gold-medium font-bold shrink-0">✔</span>
                    <span><strong>BONO 3:</strong> Calendario Estacional según los Cinco Movimientos</span>
                  </div>
                  <div className="flex items-start gap-1.5 text-forest-medium font-medium">
                    <span className="text-gold-medium font-bold shrink-0">✔</span>
                    <span><strong>BONO 4:</strong> Plantillas de Anamnesis y Seguimiento Nutricional</span>
                  </div>
                  <div className="flex items-start gap-1.5 text-forest-medium font-medium">
                    <span className="text-gold-medium font-bold shrink-0">✔</span>
                    <span><strong>BONO 5:</strong> Recetario de Caldos y Fondos Terapéuticos</span>
                  </div>
                  <div className="flex items-start gap-1.5 text-forest-medium font-medium">
                    <span className="text-gold-medium font-bold shrink-0">✔</span>
                    <span><strong>BONO 6:</strong> Atlas de Diagnóstico Clínico por la Lengua</span>
                  </div>
                  <div className="flex items-start gap-1.5 text-forest-medium font-medium">
                    <span className="text-gold-medium font-bold shrink-0">✔</span>
                    <span><strong>BONO 7:</strong> Combinaciones Alimentarias a Evitar en MTC</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Upgrade CTA Button */}
            <button
              onClick={() => {
                setShowUpsellModal(false);
                window.open("https://pay.hotmart.com/O106596188M?off=f2t2uhel&checkoutMode=10", "_blank");
              }}
              className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-emerald-700 to-[#c59f5b] hover:from-emerald-800 hover:to-[#dfc28d] text-white font-extrabold text-xs tracking-wider uppercase transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99] shadow-md hover:shadow-emerald-900/10 text-center cursor-pointer"
            >
              ¡SÍ! QUIERO EL PLAN COMPLETO POR {currency.symbol}{currency.upsell}
            </button>

            {/* Decline Link Button */}
            <button
              onClick={() => {
                setShowUpsellModal(false);
                window.open("https://pay.hotmart.com/P106596280S?checkoutMode=10", "_blank");
              }}
              className="w-full mt-2 py-2 rounded-xl border border-sand-dark/60 hover:bg-gray-50 text-gray-500 font-semibold text-xs tracking-wide transition-colors text-center cursor-pointer"
            >
              No, continuar con el Básico ({currency.symbol}{currency.basico})
            </button>

          </div>
        </div>
      )}

    </div>
  );
}
