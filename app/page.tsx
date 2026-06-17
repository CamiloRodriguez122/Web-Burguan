"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

// ─── Links ─────────────────────────────────────────────────────────────────
const WHATSAPP_BURGUAN     = "https://api.whatsapp.com/send/?phone=3042108540&text&type=phone_number&app_absent=0";
const WALINK_GRANIZADOS    = "https://wa.link/v0fk7a";
const INSTAGRAM_BURGUAN    = "https://www.instagram.com/burguan_co/";
const INSTAGRAM_GRANIZADOS = "https://www.instagram.com/frozenshots_donjuan/";
const MENU_LINK            = "https://drive.google.com/file/d/1DBDDXr8A9OsxW-Xa5bC4i4ifsBSbckaB/view?usp=drive_link";
const MAPS_LINK            = "https://maps.app.goo.gl/C8JsKQmnqZihfLJi6";
const MAPS_EMBED           = "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3937.4126638751495!2d-75.404945!3d9.296654000000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zOcKwMTcnNDguMCJOIDc1wrAyNCcxNy44Ilc!5e0!3m2!1ses-419!2sco!4v1771857802211!5m2!1ses-419!2sco";

type Theme = "burguan" | "granizados";

const themes = {
  burguan: {
    name: "BURGUAN", logo: "/productos/logoburguan.jpeg",
    tagline: "El placer de comer calle con estilo",
    bg: "linear-gradient(160deg, #1a0505 0%, #0a0000 40%, #110808 100%)",
    primary: "#832324", primaryDark: "#5a1718",
    accent: "#caa056", accentLight: "#f5dfa0",
    cardBg: "rgba(255,255,255,0.04)", text: "#fff", heroGlow: "#ff4444",
    switchLabel: "❄️ Frozenshots", switchBg: "linear-gradient(135deg,#0288d1,#00e5ff)",
    whatsapp: WHATSAPP_BURGUAN, instagram: INSTAGRAM_BURGUAN,
    particles: ["🍔","🔥","🍔","🔥","🍔","🔥"],
  },
  granizados: {
    name: "FROZENSHOTS DON JUAN", logo: "/productos/logofrozenshots.jpg",
    tagline: "El frío más delicioso de la ciudad",
    bg: "linear-gradient(160deg, #020d1f 0%, #001028 40%, #041530 100%)",
    primary: "#0288d1", primaryDark: "#01579b",
    accent: "#00e5ff", accentLight: "#b3f0ff",
    cardBg: "rgba(255,255,255,0.04)", text: "#fff", heroGlow: "#00cfff",
    switchLabel: "🍔 Burguan", switchBg: "linear-gradient(135deg,#832324,#caa056)",
    whatsapp: WALINK_GRANIZADOS, instagram: INSTAGRAM_GRANIZADOS,
    particles: ["🧊","❄️","🍧","💎","🧊","❄️"],
  },
};

type Producto = { nombre: string; tipo: "image"|"video"; src: string; alt?: string; poster?: string; desc?: string };

const productosBurguan: Producto[] = [
  { nombre:"Dogs Burguan",  tipo:"image", src:"/productos/hotdogs.jpeg",     alt:"Dogs Burguan",  desc:"Jugosos y cargados de sabor" },
  { nombre:"Burguers",      tipo:"video", src:"/productos/Burguer3.mp4",     poster:"/productos/burguer1.jpeg", desc:"Hechas con amor y fuego" },
  { nombre:"Salchipapas",   tipo:"image", src:"/productos/salchipapa1.jpeg", alt:"Salchipapas",   desc:"Crujientes e irresistibles" },
  { nombre:"Desgranados",   tipo:"image", src:"/productos/foto1.jpeg",       alt:"Desgranados",   desc:"Sabor de la calle, nivel gourmet" },
  { nombre:"Asados",        tipo:"video", src:"/productos/Asados.mp4",       poster:"/productos/foto1.jpeg",    desc:"Al carbón, con todo el sabor" },
];

type Promo = { id:number; titulo:string; subtitulo:string; precio:string; badge:string; badgeColor:string; src:string; diasSemana:number[]|null; diasLabel:string };

const promos: Promo[] = [
  { id:1, titulo:"2 Granizados Cremosos", subtitulo:"El dúo perfecto para compartir", precio:"$24.000", badge:"🧊 Todos los días", badgeColor:"#0288d1", src:"/productos/promo1.jpg", diasSemana:null, diasLabel:"Todos los días" },
  { id:2, titulo:"5 Granizados 12oz", subtitulo:"Para el grupo, para la familia", precio:"$40.000", badge:"🎉 Solo los martes", badgeColor:"#7b2ff7", src:"/productos/promo2.jpeg", diasSemana:[2], diasLabel:"Promo de los martes" },
  { id:3, titulo:"2 Granizados 16oz + Toppings", subtitulo:"Con todos los toppings que quieras", precio:"$20.000", badge:"🌈 Solo los miércoles", badgeColor:"#e91e8c", src:"/productos/promo3.jpeg", diasSemana:[3], diasLabel:"Promo de los miércoles" },
  { id:4, titulo:"2×1 en Granizados", subtitulo:"Compra uno y el 2do va por la casa", precio:"2×1 🎁", badge:"🎊 Solo los miércoles", badgeColor:"#e91e8c", src:"/productos/promo4.jpeg", diasSemana:[3], diasLabel:"Promo de los miércoles" },
];

function getHoraColombia() {
  const now = new Date();
  let hora = now.getUTCHours() - 5;
  if (hora < 0) hora += 24;
  const offsetMs = 5 * 60 * 60 * 1000;
  const co = new Date(now.getTime() - offsetMs);
  return { hora, minutos: now.getUTCMinutes(), diaSemana: co.getDay() };
}

function getEstado(): { texto: string; abierto: boolean } {
  const { hora, minutos } = getHoraColombia();
  const total = hora * 60 + minutos;
  if (total >= 17 * 60 && total < 23 * 60) return { texto: "Abierto ahora · Domicilio disponible", abierto: true };
  const falta = total < 17 * 60 ? 17 * 60 - total : (24 * 60 - total) + 17 * 60;
  const h = Math.floor(falta / 60), m = falta % 60;
  const cuando = h === 0 ? `en ${m} min` : h < 3 ? `en ${h}h${m > 0 ? ` ${m}min` : ""}` : "a las 5 pm";
  return { texto: `Cerrado · Abrimos ${cuando}`, abierto: false };
}

const WA = "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z";
const IG = "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z";

const resenasBurguan = [
  { nombre:"Valentina M.", texto:"¡Las mejores hamburguesas que he probado! El sabor es increíble 🔥", estrellas:5 },
  { nombre:"Carlos R.",    texto:"El domicilio llegó rapidísimo y todo caliente. 100% recomendado",     estrellas:5 },
  { nombre:"María J.",     texto:"Los dogs son una locura de ricos, ya son mis favoritos en la ciudad", estrellas:5 },
];
const resenasGranizados = [
  { nombre:"Sofía P.",  texto:"¡El granizado de mango es una delicia! Perfecto para el calor 🧊",   estrellas:5 },
  { nombre:"Andrés V.", texto:"El mejor granizado de la ciudad, sin dudas. Vuelvo siempre ❄️",       estrellas:5 },
  { nombre:"Laura C.",  texto:"Los sabores son únicos, no he probado nada igual en toda la región",  estrellas:5 },
];

function Stars({ n }: { n: number }) {
  return <span className="text-amber-400 text-base tracking-wider">{"★".repeat(n)}</span>;
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function Home() {
  const [theme, setTheme] = useState<Theme>("burguan");
  const [switching, setSwitching] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeCard, setActiveCard] = useState(0);
  const [visible, setVisible] = useState<Set<string>>(new Set());
  const [horario, setHorario] = useState({ texto: "", abierto: false });
  const [promoActiva, setPromoActiva] = useState<Promo | null>(null);

  const carRef = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const resumeT = useRef<number | null>(null);
  const touchX = useRef(0);

  const t = themes[theme];
  const isBurguan = theme === "burguan";
  const resenas = isBurguan ? resenasBurguan : resenasGranizados;

  const promosHoy = (() => {
    const { diaSemana } = getHoraColombia();
    return [...promos].sort((a, b) => {
      const ah = a.diasSemana === null || a.diasSemana.includes(diaSemana);
      const bh = b.diasSemana === null || b.diasSemana.includes(diaSemana);
      return ah === bh ? 0 : ah ? -1 : 1;
    });
  })();

  const items = isBurguan ? productosBurguan : promosHoy;

  const isPromoHoy = (p: Promo) => {
    const { diaSemana } = getHoraColombia();
    return p.diasSemana === null || p.diasSemana.includes(diaSemana);
  };

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const upd = () => setHorario(getEstado());
    upd();
    const id = setInterval(upd, 60_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      es => es.forEach(e => { if (e.isIntersecting) setVisible(p => new Set([...p, e.target.id])); }),
      { threshold: 0.08 }
    );
    document.querySelectorAll("[data-obs]").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [theme]);

  useEffect(() => {
    setActiveCard(0);
    const len = items.length;
    const id = setInterval(() => { if (!paused.current) setActiveCard(p => (p + 1) % len); }, 3500);
    return () => { clearInterval(id); if (resumeT.current) clearTimeout(resumeT.current); };
  }, [theme, items.length]);

  useEffect(() => {
    const el = carRef.current;
    if (!el) return;
    const card = el.querySelectorAll("article")[activeCard] as HTMLElement | undefined;
    if (!card) return;
    el.scrollTo({ left: card.offsetLeft - el.offsetWidth / 2 + card.offsetWidth / 2, behavior: "smooth" });
  }, [activeCard]);

  const pause = () => { paused.current = true; };
  const resume = () => {
    if (resumeT.current) clearTimeout(resumeT.current);
    resumeT.current = window.setTimeout(() => { paused.current = false; }, 2500);
  };
  const onTS = (e: React.TouchEvent) => { touchX.current = e.touches[0].clientX; pause(); };
  const onTE = (e: React.TouchEvent) => {
    const d = touchX.current - e.changedTouches[0].clientX;
    if (Math.abs(d) > 40) setActiveCard(p => d > 0 ? (p + 1) % items.length : (p - 1 + items.length) % items.length);
    resume();
  };

  const switchTheme = useCallback(() => {
    setSwitching(true);
    setVisible(new Set());
    setActiveCard(0);
    setTimeout(() => { setTheme(p => p === "burguan" ? "granizados" : "burguan"); setSwitching(false); }, 400);
  }, []);

  const v = (id: string) => visible.has(id);

  return (
    <>
      {/* Dynamic Theme Styles */}
      <style>{`
        body { background: ${t.bg}; transition: background 0.6s ease; }
        .hero-font { font-family: var(--font-playfair), 'Playfair Display', serif; }
        .impact-font { font-family: var(--font-bebas), 'Bebas Neue', sans-serif; letter-spacing: 0.08em; }
      `}</style>

      {/* Theme transition overlay */}
      <div className="fixed inset-0 z-[100] transition-opacity duration-400" style={{ background: t.primary, opacity: switching ? 1 : 0, pointerEvents: switching ? "all" : "none" }} />

      {/* ── PROMO MODAL ──────────────────────────────────────── */}
      {promoActiva && (
        <div className="modal-backdrop fixed inset-0 z-[90] flex items-end sm:items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)" }} onClick={() => setPromoActiva(null)}>
          <div className="modal-card w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl" style={{ background: "#111" }} onClick={e => e.stopPropagation()}>
            <div className="relative h-60">
              <img src={promoActiva.src} alt={promoActiva.titulo} className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(0,0,0,0.7) 0%,transparent 50%)" }} />
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-black text-white" style={{ background: promoActiva.badgeColor }}>{promoActiva.badge}</div>
              <button onClick={() => setPromoActiva(null)} className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center text-white font-bold glass" aria-label="Cerrar">✕</button>
            </div>
            <div className="p-6">
              <h3 className="impact-font text-3xl text-white mb-1">{promoActiva.titulo}</h3>
              <p className="text-sm text-white/50 mb-3">{promoActiva.subtitulo}</p>
              <div className="flex items-center justify-between mb-5">
                <span className="impact-font text-5xl" style={{ color: t.accent }}>{promoActiva.precio}</span>
                <span className="text-xs font-bold px-3 py-1 rounded-full glass" style={{ color: t.accent }}>{promoActiva.diasLabel}</span>
              </div>
              <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer" className="btn-premium flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-black text-base text-white" style={{ background: `linear-gradient(135deg,${t.primary},${t.primaryDark})` }}>
                📍 ¡Ver cómo llegar!
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ── THEME SWITCH BUTTON ────────────────────────────── */}
      {mounted && (
        <button onClick={switchTheme} aria-label="Cambiar tema"
          className="fixed z-50 top-1/2 -translate-y-1/2 px-3 py-3 shadow-2xl flex items-center gap-2 text-sm font-bold text-white transition-all duration-300 active:scale-90 hover:scale-105"
          style={{
            right: isBurguan ? 0 : undefined, left: !isBurguan ? 0 : undefined,
            background: t.switchBg,
            borderRadius: isBurguan ? "12px 0 0 12px" : "0 12px 12px 0",
            border: `1px solid rgba(255,255,255,0.15)`,
            backdropFilter: "blur(10px)",
          }}>
          <span className="text-lg">{isBurguan ? "❄️" : "🍔"}</span>
          <span className="hidden sm:inline">{t.switchLabel}</span>
        </button>
      )}

      <div className={`min-h-screen flex flex-col noise relative overflow-hidden transition-opacity duration-700 ${mounted ? "opacity-100" : "opacity-0"}`}>

        {/* Floating particles */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          {t.particles.map((e, i) => (
            <span key={i} className="absolute pointer-events-none select-none opacity-[0.07] animate-float"
              style={{ top: `${10+(i*17)%80}%`, left: `${5+(i*23)%88}%`, animationDelay: `${i*0.9}s`, animationDuration: `${5+i*0.7}s`, fontSize: `${1.3+(i%3)*0.5}rem` }}>
              {e}
            </span>
          ))}
        </div>

        <main className="flex-1 relative z-10">

          {/* ═══ HERO ═══════════════════════════════════════════ */}
          <section className="min-h-[85vh] flex flex-col items-center justify-center px-5 text-center relative">
            {/* Radial glow behind logo */}
            <div className="absolute w-[500px] h-[500px] rounded-full opacity-20 blur-3xl" style={{ background: `radial-gradient(circle, ${t.heroGlow}44, transparent 70%)` }} />

            <div className="mx-auto w-32 h-32 sm:w-40 sm:h-40 mb-6 rounded-full overflow-hidden animate-glow relative" style={{ border: `2px solid ${t.accent}88`, ["--glow-color" as string]: t.heroGlow + "55" }}>
              <div className="animate-logo-spin w-full h-full relative" style={{ transformStyle: "preserve-3d" }}>
                <Image src={t.logo} alt={`Logo ${t.name}`} fill className="object-cover" style={{ backfaceVisibility: "hidden" }} sizes="160px" priority />
              </div>
            </div>

            <h1 className="hero-font text-5xl sm:text-7xl font-bold text-white mb-2 tracking-tight" style={{ textShadow: `0 0 40px ${t.heroGlow}33, 0 4px 12px rgba(0,0,0,0.5)` }}>
              {t.name}
            </h1>

            <div className="w-24 h-[2px] mx-auto my-4 rounded-full" style={{ background: `linear-gradient(90deg, transparent, ${t.accent}, transparent)` }} />

            <p className="hero-font italic text-xl sm:text-2xl mb-6" style={{ color: t.accentLight + "cc" }}>
              {t.tagline}
            </p>

            {/* Status badge */}
            <div className="glass inline-flex items-center gap-2.5 px-5 py-2 rounded-full text-sm font-semibold mb-8">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: horario.abierto ? "#4ade80" : "#f87171", boxShadow: horario.abierto ? "0 0 8px #4ade80" : "none" }} />
              <span style={{ color: horario.abierto ? "#bbf7d0" : "#fca5a5" }}>{horario.texto || "Cargando..."}</span>
            </div>

            {/* Scroll indicator */}
            <div className="animate-bounce-down opacity-40">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
            </div>
          </section>

          {/* ═══ CTA SECTION ════════════════════════════════════ */}
          <section id="cta" data-obs className={`px-5 mb-12 section-reveal ${v("cta") ? "visible" : ""}`}>
            <div className="flex flex-col gap-4 max-w-md mx-auto">
              {/* WhatsApp CTA */}
              <a href={t.whatsapp} target="_blank" rel="noopener noreferrer"
                className="btn-premium relative group flex items-center justify-between gap-3 py-5 px-6 rounded-2xl font-black text-xl text-white shadow-2xl animate-shimmer"
                style={{ backgroundImage: "linear-gradient(135deg, #25D366 0%, #128C7E 35%, #1ee87a 65%, #128C7E 100%)" }}>
                <span className="absolute inset-0 rounded-2xl animate-ripple opacity-20" style={{ background: "#25D366" }} />
                <div className="relative z-10 flex items-center gap-3">
                  <svg className="w-8 h-8 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d={WA}/></svg>
                  <span className="flex flex-col text-left leading-tight">
                    <span className="text-[11px] font-semibold opacity-75 uppercase tracking-[0.2em]">Domicilios</span>
                    <span>¡Pedir por WhatsApp!</span>
                  </span>
                </div>
                <svg className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7"/></svg>
              </a>

              {/* Action Grid */}
              <div className={`grid ${isBurguan ? "grid-cols-3" : "grid-cols-2"} gap-3`}>
                {isBurguan && (
                  <a href={MENU_LINK} target="_blank" rel="noopener noreferrer" className="glass-card flex flex-col items-center justify-center gap-2 py-5 px-2 rounded-2xl font-bold text-white text-center">
                    <span className="text-2xl">📋</span>
                    <span className="text-[10px] opacity-50 uppercase tracking-[0.2em]">Ver todo</span>
                    <span className="font-black text-sm">Menú</span>
                  </a>
                )}
                <a href={t.instagram} target="_blank" rel="noopener noreferrer"
                  className="glass-card flex flex-col items-center justify-center gap-2 py-5 px-2 rounded-2xl font-bold text-white text-center"
                  style={{ background: "linear-gradient(145deg,rgba(131,58,180,0.3),rgba(253,29,29,0.2))", borderColor: "rgba(253,29,29,0.2)" }}>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d={IG}/></svg>
                  <span className="text-[10px] opacity-50 uppercase tracking-[0.2em]">Síguenos</span>
                  <span className="font-black text-sm">Instagram</span>
                </a>
                <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer" className="glass-card flex flex-col items-center justify-center gap-2 py-5 px-2 rounded-2xl font-bold text-white text-center">
                  <span className="text-2xl">📍</span>
                  <span className="text-[10px] opacity-50 uppercase tracking-[0.2em]">Ir al local</span>
                  <span className="font-black text-sm">Ubicación</span>
                </a>
              </div>
            </div>
          </section>

          {/* ═══ CAROUSEL (Burguan Products / Frozenshots Promos) ════ */}
          <section id="menu" data-obs className={`mb-14 section-reveal ${v("menu") ? "visible" : ""}`} style={{ transitionDelay: "0.1s" }}>
            <div className="px-5 mb-6 text-center">
              <h2 className="impact-font text-4xl sm:text-5xl text-white mb-2">{isBurguan ? "NUESTRA CARTA" : "NUESTRAS PROMOS"}</h2>
              <div className="w-20 h-[2px] mx-auto rounded-full" style={{ background: `linear-gradient(90deg, transparent, ${t.accent}, transparent)` }} />
              {!isBurguan && <p className="text-sm mt-3 text-white/40">Toca una promo para ver los detalles</p>}
            </div>

            <div ref={carRef} className="flex gap-5 overflow-x-auto pb-4 px-10 scrollbar-hide" style={{ scrollBehavior: "smooth" }}
              onMouseEnter={pause} onMouseLeave={resume} onTouchStart={onTS} onTouchEnd={onTE}>
              {(isBurguan ? productosBurguan : promosHoy).map((item, i) => {
                const isActive = i === activeCard;
                const promo = !isBurguan ? (item as unknown as Promo) : null;
                const prod = isBurguan ? (item as Producto) : null;
                const hoy = promo ? isPromoHoy(promo) : true;

                return (
                  <article key={isBurguan ? (prod!.nombre) : (promo!.id)}
                    onClick={() => {
                      setActiveCard(i); pause(); resume();
                      if (promo) setTimeout(() => setPromoActiva(promo), 150);
                    }}
                    className={`flex-shrink-0 w-[75vw] max-w-[280px] rounded-2xl overflow-hidden cursor-pointer ${!isBurguan && hoy ? "promo-today" : ""}`}
                    style={{
                      background: "#111",
                      transform: isActive ? "scale(1.05)" : "scale(0.93)",
                      opacity: isActive ? 1 : hoy ? 0.55 : 0.35,
                      transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1), opacity 0.5s ease, box-shadow 0.5s ease",
                      boxShadow: isActive ? `0 20px 50px ${t.heroGlow}33, 0 8px 20px rgba(0,0,0,0.4)` : "0 4px 16px rgba(0,0,0,0.2)",
                      border: isActive ? `1px solid ${t.accent}44` : "1px solid rgba(255,255,255,0.05)",
                      ["--glow-color" as string]: t.accent + "55",
                    }}>
                    <div className="relative overflow-hidden" style={{ height: "200px" }}>
                      {prod ? (
                        prod.tipo === "image" ? (
                          <img src={prod.src} alt={prod.alt ?? prod.nombre} className="w-full h-full object-cover" style={{ transform: isActive ? "scale(1.08)" : "scale(1)", transition: "transform 0.7s ease" }} loading="lazy" />
                        ) : (
                          <video src={prod.src} poster={prod.poster} className="w-full h-full object-cover" autoPlay loop muted playsInline />
                        )
                      ) : (
                        <img src={promo!.src} alt={promo!.titulo} className="w-full h-full object-cover" style={{ transform: isActive ? "scale(1.08)" : "scale(1)", transition: "transform 0.7s ease" }} loading="lazy" />
                      )}
                      <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(0,0,0,0.6) 0%,transparent 50%)" }} />
                      {promo && <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-black text-white" style={{ background: promo.badgeColor }}>{promo.badge}</div>}
                      {promo && hoy && <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-xs font-black text-white" style={{ background: "#00c853" }}>✓ Hoy</div>}
                      {promo && !hoy && <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-xs font-bold text-white/50 glass">Próximamente</div>}
                      {isActive && prod && <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-xs font-black text-white" style={{ background: t.primary }}>★ Popular</div>}
                      {promo && <p className="absolute bottom-3 left-3 impact-font text-3xl text-white" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.7)" }}>{promo.precio}</p>}
                    </div>
                    <div className="px-4 py-3">
                      <p className="font-extrabold text-sm text-white/90 leading-snug">{prod?.nombre ?? promo?.titulo}</p>
                      <p className="text-xs mt-0.5 text-white/40">{prod?.desc ?? promo?.subtitulo}</p>
                      {promo && isActive && <span className="text-xs font-bold mt-1 inline-block" style={{ color: t.accent }}>→ Toca para ver</span>}
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-4">
              {items.map((_, i) => (
                <button key={i} onClick={() => setActiveCard(i)} className="rounded-full transition-all duration-350"
                  style={{ width: i === activeCard ? "28px" : "8px", height: "8px", background: i === activeCard ? t.accent : `${t.accent}33` }} />
              ))}
            </div>

            {/* Promo availability (frozenshots only) */}
            {!isBurguan && (
              <div className="px-5 mt-6 max-w-md mx-auto">
                <p className="text-center text-xs font-bold mb-3 uppercase tracking-[0.15em] text-white/30">Disponibilidad de promos</p>
                <div className="flex flex-col gap-2">
                  {promos.map(p => {
                    const hoy = isPromoHoy(p);
                    return (
                      <div key={p.id} className="glass flex items-center justify-between px-4 py-2.5 rounded-xl">
                        <span className="text-sm font-bold" style={{ color: hoy ? t.accentLight : "rgba(255,255,255,0.3)" }}>{p.titulo}</span>
                        <span className="text-xs font-black px-2.5 py-0.5 rounded-full" style={{ background: hoy ? "#00c85322" : "rgba(255,255,255,0.05)", color: hoy ? "#4ade80" : "rgba(255,255,255,0.3)" }}>
                          {hoy ? "✓ Hoy" : p.diasLabel}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </section>

          {/* ═══ REVIEWS ════════════════════════════════════════ */}
          <section id="resenas" data-obs className={`px-5 mb-14 section-reveal ${v("resenas") ? "visible" : ""}`} style={{ transitionDelay: "0.12s" }}>
            <div className="text-center mb-6">
              <h2 className="impact-font text-4xl sm:text-5xl text-white mb-2">LO QUE DICEN</h2>
              <div className="w-20 h-[2px] mx-auto rounded-full" style={{ background: `linear-gradient(90deg, transparent, ${t.accent}, transparent)` }} />
            </div>
            <div className="flex flex-col gap-4 max-w-md mx-auto">
              {resenas.map((r, i) => (
                <div key={i} className="glass-card p-5 rounded-2xl" style={{ transitionDelay: `${i * 0.1}s` }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black text-white shrink-0"
                      style={{ background: `linear-gradient(135deg,${t.primary},${t.accent})` }}>{r.nombre[0]}</div>
                    <div>
                      <p className="text-white font-bold text-sm">{r.nombre}</p>
                      <Stars n={r.estrellas} />
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-white/60">{r.texto}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ═══ URGENCY CTA ════════════════════════════════════ */}
          <section id="urgencia" data-obs className={`px-5 mb-14 section-reveal ${v("urgencia") ? "visible" : ""}`}>
            <div className="glass rounded-3xl p-8 text-center max-w-md mx-auto relative overflow-hidden" style={{ border: `1px solid ${t.accent}22` }}>
              <div className="absolute inset-0 opacity-10" style={{ background: `radial-gradient(circle at center, ${t.heroGlow}, transparent 70%)` }} />
              <p className="text-5xl mb-3 relative z-10">{isBurguan ? "🔥" : "🧊"}</p>
              <h3 className="impact-font text-3xl sm:text-4xl text-white mb-3 relative z-10">{isBurguan ? "¿TIENES HAMBRE?" : "¿TIENES CALOR?"}</h3>
              <p className="text-sm text-white/50 mb-5 relative z-10">{isBurguan ? "Haz tu pedido y en 30 minutos tienes tu comida en casa" : "Pide tu granizado a domicilio o ven a visitarnos"}</p>
              <a href={t.whatsapp} target="_blank" rel="noopener noreferrer"
                className="btn-premium relative z-10 inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-black text-white shadow-lg"
                style={{ background: "#25D366" }}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d={WA}/></svg>
                {isBurguan ? "Pedir ahora" : "¡Pedir a domicilio!"}
              </a>
            </div>
          </section>

          {/* ═══ LOCATION ═══════════════════════════════════════ */}
          <section id="ubicacion" data-obs className={`px-5 mb-14 section-reveal ${v("ubicacion") ? "visible" : ""}`} style={{ transitionDelay: "0.1s" }}>
            <div className="text-center mb-6">
              <h2 className="impact-font text-4xl sm:text-5xl text-white mb-2">ENCUÉNTRANOS</h2>
              <div className="w-20 h-[2px] mx-auto rounded-full" style={{ background: `linear-gradient(90deg, transparent, ${t.accent}, transparent)` }} />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl max-w-md mx-auto" style={{ border: `1px solid ${t.accent}1a` }}>
              <div className="h-56">
                <iframe title="Ubicación" src={MAPS_EMBED} className="w-full h-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
              </div>
              <div className="glass p-5 text-center">
                <p className="text-sm text-white/50 mb-4">📍 Sincelejo, Sucre · Horario: 5 pm – 11 pm</p>
                <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer"
                  className="btn-premium inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white shadow-md"
                  style={{ background: `linear-gradient(135deg,${t.primary},${t.primaryDark})` }}>
                  📍 Cómo llegar
                </a>
              </div>
            </div>
          </section>

          {/* ═══ FINAL CTA ══════════════════════════════════════ */}
          <section className="px-5 mb-8">
            <a href={t.whatsapp} target="_blank" rel="noopener noreferrer"
              className="btn-premium flex items-center justify-center gap-3 w-full max-w-md mx-auto py-5 rounded-2xl font-black text-xl text-white shadow-2xl animate-shimmer"
              style={{ backgroundImage: "linear-gradient(135deg, #25D366 0%, #128C7E 35%, #1ee87a 65%, #128C7E 100%)" }}>
              <svg className="w-7 h-7 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d={WA}/></svg>
              {isBurguan ? "¡Hacer mi pedido ahora!" : "¡Pedir granizados a domicilio!"}
            </a>
          </section>

        </main>

        {/* ═══ FOOTER ══════════════════════════════════════════ */}
        <footer className="py-10 px-5 mt-auto" style={{ background: "rgba(0,0,0,0.4)", borderTop: `1px solid ${t.accent}15` }}>
          <div className="text-center max-w-md mx-auto">
            <p className="hero-font text-2xl font-bold text-white mb-1">{t.name}</p>
            <p className="text-sm text-white/30 mb-5">Horario: 5 pm – 11 pm · Sincelejo, Sucre</p>
            <div className="flex justify-center gap-3 mb-5">
              <a href={t.whatsapp} target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full flex items-center justify-center shadow-md glass hover:scale-110 transition-transform" style={{ background: "#25D36633" }}>
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d={WA}/></svg>
              </a>
              <a href={t.instagram} target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full flex items-center justify-center shadow-md glass hover:scale-110 transition-transform" style={{ background: "rgba(253,29,29,0.2)" }}>
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d={IG}/></svg>
              </a>
              <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full flex items-center justify-center shadow-md text-lg glass hover:scale-110 transition-transform">📍</a>
            </div>
            <div className="w-16 h-[1px] mx-auto mb-4" style={{ background: `linear-gradient(90deg, transparent, ${t.accent}44, transparent)` }} />
            <p className="text-xs text-white/20">© 2026 {t.name}. Todos los derechos reservados.</p>
          </div>
        </footer>

        {/* ═══ FLOATING WHATSAPP ════════════════════════════════ */}
        <a href={t.whatsapp} target="_blank" rel="noopener noreferrer"
          className="fixed bottom-6 right-5 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center z-40 hover:scale-110 transition-transform"
          style={{ background: "#25D366" }}>
          <span className="absolute inset-0 rounded-full animate-ripple" style={{ background: "#25D36644" }} />
          <svg className="w-8 h-8 text-white relative z-10" fill="currentColor" viewBox="0 0 24 24"><path d={WA}/></svg>
        </a>

      </div>
    </>
  );
}