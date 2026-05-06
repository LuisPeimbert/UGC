import { useState, useEffect, useRef } from "react";
import MiLogo from "/logo.png";

/* ─── HOOK: detect mobile ───────────────────────────────────────────────────── */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return isMobile;
}

/* ─── GOOGLE FONTS ─────────────────────────────────────────────────────────── */
const FontLink = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800;900&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --crimson:       #8B1A28;
      --crimson-dark:  #5C0F1A;
      --crimson-mid:   #A82235;
      --crimson-light: #C42A42;
      --gold:          #B8833A;
      --gold-light:    #D4A055;
      --gold-pale:     #F0D9B5;
      --white:         #FFFFFF;
      --off-white:     #F8F6F2;
      --warm-gray:     #EAE6DF;
      --gray:          #7A7570;
      --gray-dark:     #2E2B28;
      --text:          #1A1612;
      --font-display:  'Playfair Display', Georgia, serif;
      --font-body:     'DM Sans', 'Segoe UI', sans-serif;
      --font-serif:    'Libre Baskerville', Georgia, serif;
    }

    body { font-family: var(--font-body); background: var(--off-white); color: var(--text); }
    h1, h2, h3 { font-family: var(--font-display); }
    a { text-decoration: none; }
    button { font-family: var(--font-body); }

    /* ── Animations ── */
    @keyframes fadeUp   { from { opacity:0; transform:translateY(28px) } to { opacity:1; transform:translateY(0) } }
    @keyframes fadeIn   { from { opacity:0 } to { opacity:1 } }
    @keyframes scaleIn  { from { opacity:0; transform:scale(0.96) } to { opacity:1; transform:scale(1) } }
    @keyframes pulse    { 0%,100% { transform:scale(1) } 50% { transform:scale(1.06) } }

    .fade-up   { animation: fadeUp   0.7s ease both; }
    .fade-in   { animation: fadeIn   0.5s ease both; }
    .scale-in  { animation: scaleIn  0.5s ease both; }

    /* ── Cards hover ── */
    .card-hover { transition: transform 0.3s ease, box-shadow 0.3s ease; cursor: pointer; }
    .card-hover:hover { transform: translateY(-6px); box-shadow: 0 24px 48px rgba(0,0,0,0.10) !important; }

    /* ── Section label ── */
    .section-label {
      display: inline-block;
      font-family: var(--font-body);
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--gold);
      margin-bottom: 16px;
    }
    .section-label::before {
      content: '';
      display: inline-block;
      width: 24px;
      height: 1px;
      background: var(--gold);
      vertical-align: middle;
      margin-right: 10px;
    }

    /* ── Divider line ── */
    .gold-line {
      width: 48px; height: 2px;
      background: var(--gold);
      margin: 20px 0 32px;
    }

    /* ── Buttons ── */
    .btn-primary {
      display: inline-block;
      background: var(--crimson);
      color: #fff;
      font-family: var(--font-body);
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      padding: 14px 36px;
      border: none;
      cursor: pointer;
      transition: background 0.2s, transform 0.2s;
    }
    .btn-primary:hover { background: var(--crimson-dark); transform: translateY(-1px); }

    .btn-gold {
      display: inline-block;
      background: var(--gold);
      color: #fff;
      font-family: var(--font-body);
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      padding: 14px 36px;
      border: none;
      cursor: pointer;
      transition: background 0.2s, transform 0.2s;
    }
    .btn-gold:hover { background: var(--gold-light); transform: translateY(-1px); }

    .btn-outline {
      display: inline-block;
      background: transparent;
      color: #fff;
      font-family: var(--font-body);
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      padding: 13px 36px;
      border: 1px solid rgba(255,255,255,0.5);
      cursor: pointer;
      transition: background 0.2s, border-color 0.2s;
    }
    .btn-outline:hover { background: rgba(255,255,255,0.12); border-color: rgba(255,255,255,0.8); }

    /* ── Form inputs ── */
    .form-input {
      width: 100%;
      padding: 13px 16px;
      font-family: var(--font-body);
      font-size: 14px;
      border: 1px solid #D8D2C8;
      background: #FDFCFA;
      color: var(--text);
      outline: none;
      transition: border-color 0.2s;
    }
    .form-input:focus { border-color: var(--crimson); }

    .form-label {
      display: block;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--gray-dark);
      margin-bottom: 6px;
    }

    /* ── Navbar ── */
    @media(max-width:960px) {
      .nav-links { display:none !important; }
      .nav-hamburger { display:flex !important; }
    }

    /* ── MOBILE RESPONSIVE ── */
    @media(max-width:768px) {
      /* Stats: 2 columnas en móvil */
      .stats-grid { grid-template-columns: 1fr 1fr !important; }

      /* Niveles: 1 columna en móvil */
      .niveles-grid { grid-template-columns: 1fr !important; }
      .nivel-border-right { border-right: none !important; border-bottom: 1px solid #DDD8CF !important; }

      /* Historia: 1 columna */
      .historia-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
      .historia-img { display: none !important; }

      /* Planteles: 1 columna */
      .planteles-grid { grid-template-columns: 1fr !important; gap: 24px !important; }

      /* Lead form: 1 columna */
      .leadform-grid { grid-template-columns: 1fr !important; gap: 0 !important; }
      .leadform-copy { padding-bottom: 40px !important; }

      /* Footer: 1 columna */
      .footer-grid { grid-template-columns: 1fr !important; gap: 40px !important; }

      /* Carrera detail: 1 columna */
      .carrera-grid { grid-template-columns: 1fr !important; }

      /* Form grid: 1 columna en móvil */
      .form-col2 { grid-template-columns: 1fr !important; }

      /* Secciones: menos padding */
      .section-pad { padding: 60px 16px !important; }
      .section-pad-sm { padding: 40px 16px !important; }

      /* Hero: padding reducido */
      .hero-content { padding: 0 20px !important; }

      /* Botones full width en móvil */
      .btn-hero-wrap { flex-direction: column !important; }
      .btn-hero-wrap .btn-gold,
      .btn-hero-wrap .btn-outline { width: 100% !important; text-align: center !important; padding: 15px 20px !important; }

      /* Misión/Visión: 1 columna */
      .mision-grid { grid-template-columns: 1fr !important; }

      /* Ocultar flechas del hero en móvil (se usa swipe) */
      .hero-arrow { display: none !important; }

      /* WhatsApp button más pequeño en móvil */
      .wa-btn { width: 50px !important; height: 50px !important; bottom: 16px !important; right: 16px !important; }
    }

    @media(max-width:480px) {
      .stats-grid { grid-template-columns: 1fr 1fr !important; }
      .form-col2 { grid-template-columns: 1fr !important; }
    }
  `}</style>
);

/* ─── CONSTANTS ────────────────────────────────────────────────────────────── */
const WHATSAPP_NUM = "526671234567";
const WHATSAPP_MSG = encodeURIComponent("Hola, me interesa obtener información sobre las carreras de la UGC Campus Culiacán.");
const MOODLE_URL   = "https://ugcsinaloa.moodlecloud.com/login/index.php";
const CONTACT_EMAIL = "dirgeneralculiacan@ugc.mx";

const licenciaturas = [
  { code:"LDER", nombre:"Derecho",                          icono:"⚖️", desc:"Fórmate como un profesional del derecho con visión crítica y compromiso social.", duracion:"9 cuatrimestres", modalidad:"Escolarizada / Mixta" },
  { code:"LAE",  nombre:"Administración de Empresas",       icono:"📊", desc:"Desarrolla habilidades de liderazgo, gestión y estrategia para dirigir organizaciones con éxito.", duracion:"9 cuatrimestres", modalidad:"Escolarizada / Mixta" },
  { code:"LMER", nombre:"Mercadotecnia",                    icono:"📣", desc:"Crea estrategias de marketing digital y tradicional, analiza mercados y conecta marcas con sus audiencias.", duracion:"9 cuatrimestres", modalidad:"Escolarizada / Mixta" },
  { code:"LCIA", nombre:"Comercio Internacional y Aduanas", icono:"🌐", desc:"Especialízate en operaciones de comercio exterior, regulaciones aduaneras y negocios globales.", duracion:"9 cuatrimestres", modalidad:"Escolarizada / Mixta" },
  { code:"LCON", nombre:"Contaduría",                       icono:"🧾", desc:"Domina la contabilidad, fiscalidad y finanzas empresariales con alta demanda laboral.", duracion:"9 cuatrimestres", modalidad:"Escolarizada / Mixta" },
];

const maestrias = [
  { code:"MED", nombre:"Maestría en Educación y Docencia", icono:"🎓", desc:"Eleva tu práctica docente con fundamentos pedagógicos modernos, investigación educativa y herramientas digitales.", duracion:"4 cuatrimestres", modalidad:"En línea / Mixta" },
];

const doctorados = [
  { code:"DPI", nombre:"Doctorado en Transformación Disruptiva con IA", icono:"🤖", desc:"El primer doctorado de su tipo. Forma líderes que integran inteligencia artificial para transformar sistemas educativos y organizacionales.", duracion:"6 cuatrimestres", modalidad:"En línea / Mixta" },
];

const becas = [
  { tipo:"Beca de Excelencia Académica", icono:"🏆", desc:"Para estudiantes con promedio mínimo de 9.0. Cubre hasta el 30% de la colegiatura." },
  { tipo:"Beca por Referido",             icono:"🤝", desc:"Si recomiendas a un amigo o familiar y se inscribe, ambos reciben un descuento especial." },
  { tipo:"Beca Empresarial",              icono:"🏢", desc:"Para empleados de empresas con convenio activo con la UGC. Consulta si tu empresa está en el listado." },
  { tipo:"Beca de Continuidad",           icono:"📈", desc:"Para alumnos que mantienen buen promedio y puntualidad en pagos a lo largo de su carrera." },
];

const empresas = ["COPPEL","CULIACÁN ROJO","DESPACHOS JURÍDICOS ASOCIADOS","SINALOA FRESH","GRUPO BAFAR","H. AYUNTAMIENTO DE CULIACÁN","FENIX CONTADORES","IMPORTADORA DEL PACÍFICO"];

const heroSlides = [
  { img: "/hero1.webp", tag:"20 años formando líderes",      title:"Tu futuro\nempieza aquí",                   sub:"Estudia sin dejar de trabajar con horarios flexibles diseñados para ti." },
  { img: "/hero2.webp", tag:"Educación accesible",           title:"Calidad universitaria\nal alcance de todos", sub:"Licenciaturas, maestrías y doctorado con colegiaturas accesibles." },
  { img: "/hero3.webp", tag:"Campus Culiacán",               title:"Un campus\npensado para ti",                sub:"Instalaciones modernas y un ambiente que impulsa tu desarrollo." },
  { img: "/hero4.webp", tag:"Comunidad UGC",                 title:"Forma parte de\nnuestra comunidad",         sub:"Únete a miles de egresados que ya transformaron su vida profesional." },
];

const INITIAL_POSTS = [
  { id:1, titulo:"Graduación generación 2024: un logro que inspira",    categoria:"Graduaciones",      fecha:"20 Mar 2025", img:"https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80", resumen:"Más de 120 egresados recibieron su título universitario en una emotiva ceremonia que reunió a familias, docentes y autoridades de la UGC.", tipo:"post" },
  { id:2, titulo:"Charla: El futuro del trabajo y la IA",              categoria:"Charlas UGC",        fecha:"10 Feb 2025", img:"https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80", resumen:"Expertos en tecnología y recursos humanos compartieron perspectivas sobre cómo prepararse para los empleos del futuro.", tipo:"post" },
  { id:3, titulo:"Simulacro de juicio oral en Derecho",                categoria:"Clases",             fecha:"28 Ene 2025", img:"https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80", resumen:"Los alumnos de Derecho vivieron una experiencia real al participar en un simulacro de juicio oral con metodología activa.", tipo:"post" },
  { id:4, titulo:"Feria de emprendimiento UGC 2025",                  categoria:"Eventos académicos", fecha:"15 Mar 2025", img:"https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80", resumen:"Estudiantes presentaron sus proyectos de negocio ante mentores y empresarios locales en la primera feria de emprendimiento del año.", tipo:"post" },
];

/* ─── SHARED COMPONENTS ────────────────────────────────────────────────────── */

function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUM}?text=${WHATSAPP_MSG}`}
      target="_blank" rel="noopener noreferrer"
      className="wa-btn"
      style={{
        position: "fixed", bottom: 24, right: 24, zIndex: 9999,
        width: 60, height: 60, borderRadius: "50%",
        background: "#25D366",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 4px 20px rgba(37,211,102,0.5)", textDecoration: "none",
        transition: "transform 0.2s",
      }}
      onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
      onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
    >
      <svg width="32" height="32" viewBox="0 0 32 32" fill="white">
        <path d="M16 2C8.268 2 2 8.268 2 16c0 2.46.666 4.76 1.822 6.74L2 30l7.494-1.788A13.934 13.934 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.44 11.44 0 01-5.87-1.615l-.42-.252-4.45 1.062 1.09-4.316-.276-.444A11.5 11.5 0 1116 27.5zm6.34-8.616c-.348-.174-2.06-1.016-2.38-1.132-.318-.116-.55-.174-.782.174-.232.348-.9 1.132-1.1 1.364-.202.232-.406.26-.754.086-.348-.174-1.47-.542-2.8-1.726-1.034-.924-1.732-2.064-1.934-2.412-.202-.348-.022-.536.152-.708.156-.156.348-.406.522-.608.174-.202.232-.348.348-.58.116-.232.058-.436-.028-.608-.086-.174-.782-1.886-1.072-2.582-.282-.678-.568-.586-.782-.596l-.666-.012c-.232 0-.608.086-.928.434-.318.348-1.216 1.188-1.216 2.9s1.244 3.364 1.418 3.596c.174.232 2.45 3.74 5.936 5.246.83.358 1.478.572 1.984.732.834.264 1.592.226 2.192.138.668-.1 2.06-.842 2.35-1.656.29-.814.29-1.512.202-1.656-.086-.144-.318-.232-.666-.406z"/>
      </svg>
    </a>
  );
}

function Navbar({ currentPage, setPage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const navItems = [
    { label:"Inicio",           page:"home" },
    { label:"Conócenos",        page:"conocenos" },
    { label:"Oferta Educativa", page:"oferta" },
    { label:"Plataforma",       page:"moodle" },
    { label:"Vida Estudiantil", page:"blog" },
    { label:"Becas",            page:"becas" },
  ];

  return (
    <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:1000, background: scrolled ? "rgba(92,15,26,0.98)" : "rgba(92,15,26,0.90)", backdropFilter:"blur(14px)", borderBottom: scrolled ? "1px solid rgba(184,131,58,0.25)" : "none", transition:"all 0.35s ease" }}>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 20px", display:"flex", alignItems:"center", justifyContent:"space-between", height:68 }}>
        <button onClick={()=>{ setPage("home"); setMenuOpen(false); }} style={{ background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center" }}>
          <img src="/logo.png" alt="UGC" style={{ height:46, width:"auto" }} />
        </button>

        <div className="nav-links" style={{ display:"flex", gap:2, alignItems:"center" }}>
          {navItems.map(item => (
            <button key={item.page} onClick={()=>setPage(item.page)} style={{ background:"none", border:"none", cursor:"pointer", fontFamily:"var(--font-body)", fontSize:13, fontWeight:500, letterSpacing:"0.04em", padding:"8px 14px", color: currentPage===item.page ? "var(--gold-light)" : "rgba(255,255,255,0.8)", borderBottom: currentPage===item.page ? "1px solid var(--gold)" : "1px solid transparent", transition:"all 0.2s" }}
              onMouseEnter={e=>{ if(currentPage!==item.page) e.currentTarget.style.color="#fff"; }}
              onMouseLeave={e=>{ if(currentPage!==item.page) e.currentTarget.style.color="rgba(255,255,255,0.8)"; }}
            >{item.label}</button>
          ))}
          <button onClick={()=>setPage("informes")} className="btn-gold" style={{ marginLeft:12, padding:"10px 22px", fontSize:12, letterSpacing:"0.08em" }}>Solicitar Informes</button>
        </div>

        <button className="nav-hamburger" onClick={()=>setMenuOpen(!menuOpen)} style={{ display:"none", background:"none", border:"none", color:"#fff", fontSize:28, cursor:"pointer", alignItems:"center", padding:"4px 8px" }}>
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ background:"var(--crimson-dark)", padding:"8px 0 20px", borderTop:"1px solid rgba(255,255,255,0.08)" }}>
          {[...navItems, { label:"Solicitar Informes", page:"informes" }].map(item => (
            <button key={item.page} onClick={()=>{ setPage(item.page); setMenuOpen(false); }} style={{ display:"flex", width:"100%", textAlign:"left", background:"none", border:"none", cursor:"pointer", color: currentPage===item.page ? "var(--gold-light)" : "#fff", fontFamily:"var(--font-body)", fontSize:15, fontWeight: currentPage===item.page ? 600 : 400, padding:"14px 24px", borderBottom:"1px solid rgba(255,255,255,0.06)", alignItems:"center", justifyContent:"space-between" }}>
              {item.label}
              {currentPage===item.page && <span style={{ color:"var(--gold)", fontSize:12 }}>●</span>}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

/* ── Lead Form ─────────────────────────────────────────────────────────────── */
function LeadForm({ defaultPrograma = "", compact = false }) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ nombre:"", apellido:"", telefono:"", email:"", programa: defaultPrograma, mensaje:"" });
  const set = (k,v) => setForm(f=>({...f,[k]:v}));

  const handleSubmit = () => {
    const subject = encodeURIComponent(`Solicitud de información – ${form.programa || "UGC"}`);
    const body = encodeURIComponent(`Nombre: ${form.nombre} ${form.apellido}\nTeléfono: ${form.telefono}\nCorreo: ${form.email}\nPrograma: ${form.programa}\nMensaje: ${form.mensaje}`);
    window.open(`mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`);
    setSent(true);
  };

  if (sent) return (
    <div style={{ textAlign:"center", padding:"48px 24px" }}>
      <div style={{ fontSize:48, marginBottom:16 }}>✅</div>
      <h3 style={{ fontFamily:"var(--font-display)", fontSize:24, color:"var(--crimson)", marginBottom:12 }}>¡Solicitud Enviada!</h3>
      <p style={{ color:"var(--gray)", fontSize:15 }}>Un asesor académico se pondrá en contacto contigo muy pronto.</p>
    </div>
  );

  return (
    <div>
      <div className="form-col2" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
        <div style={{ marginBottom:16 }}>
          <label className="form-label">Nombre</label>
          <input className="form-input" type="text" value={form.nombre} onChange={e=>set("nombre",e.target.value)} placeholder="Juan" />
        </div>
        <div style={{ marginBottom:16 }}>
          <label className="form-label">Apellido</label>
          <input className="form-input" type="text" value={form.apellido} onChange={e=>set("apellido",e.target.value)} placeholder="García" />
        </div>
      </div>
      <div className="form-col2" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
        <div style={{ marginBottom:16 }}>
          <label className="form-label">Teléfono</label>
          <input className="form-input" type="tel" value={form.telefono} onChange={e=>set("telefono",e.target.value)} placeholder="667 123 4567" />
        </div>
        <div style={{ marginBottom:16 }}>
          <label className="form-label">Correo Electrónico</label>
          <input className="form-input" type="email" value={form.email} onChange={e=>set("email",e.target.value)} placeholder="juan@correo.com" />
        </div>
      </div>
      <div style={{ marginBottom:16 }}>
        <label className="form-label">Programa de Interés</label>
        <select className="form-input" value={form.programa} onChange={e=>set("programa",e.target.value)}>
          <option value="">— Selecciona un programa —</option>
          <optgroup label="Licenciaturas">{licenciaturas.map(c=><option key={c.code}>{c.nombre}</option>)}</optgroup>
          <optgroup label="Maestría">{maestrias.map(c=><option key={c.code}>{c.nombre}</option>)}</optgroup>
          <optgroup label="Doctorado">{doctorados.map(c=><option key={c.code}>{c.nombre}</option>)}</optgroup>
        </select>
      </div>
      {!compact && (
        <div style={{ marginBottom:20 }}>
          <label className="form-label">Mensaje (opcional)</label>
          <textarea className="form-input" rows={3} value={form.mensaje} onChange={e=>set("mensaje",e.target.value)} placeholder="¿Tienes alguna pregunta adicional?" style={{ resize:"vertical" }} />
        </div>
      )}
      <button onClick={handleSubmit} className="btn-primary" style={{ width:"100%", padding:"15px", fontSize:13, letterSpacing:"0.1em" }}>
        Enviar Solicitud
      </button>
      <p style={{ textAlign:"center", fontSize:11, color:"var(--gray)", marginTop:12, letterSpacing:"0.05em" }}>
        Tu información es confidencial y no será compartida.
      </p>
    </div>
  );
}

/* ─── HOME PAGE ─────────────────────────────────────────────────────────────── */
function HomePage({ setPage, setSelectedCarrera }) {
  const isMobile = useIsMobile();
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartX = useRef(null);

  useEffect(() => {
    const t = setInterval(() => setCurrentSlide(p=>(p+1)%heroSlides.length), 6000);
    return () => clearInterval(t);
  }, []);

  // Swipe support for hero on mobile
  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      setCurrentSlide(p => diff > 0 ? (p+1)%heroSlides.length : (p-1+heroSlides.length)%heroSlides.length);
    }
    touchStartX.current = null;
  };

  const [openLevel, setOpenLevel] = useState(null);

  const niveles = [
    { key:"licenciaturas", label:"Licenciaturas", count:`${licenciaturas.length} programas`, desc:"Formación profesional de alto nivel con validez oficial ante la SEP.", programas: licenciaturas },
    { key:"maestrias",     label:"Maestrías",     count:`${maestrias.length} programa`,     desc:"Especialización y desarrollo de competencias avanzadas para profesionales.", programas: maestrias },
    { key:"doctorados",    label:"Doctorado",     count:`${doctorados.length} programa`,    desc:"Investigación de vanguardia e innovación en áreas de transformación global.", programas: doctorados },
  ];

  const stats = [
    { num:"20+", label:"Años de experiencia académica" },
    { num:"3,000+", label:"Egresados formados" },
    { num:"RVOE", label:"Validez oficial SEP" },
    { num:"100+", label:"Empresas con convenio" },
  ];

  return (
    <div>
      {/* ── HERO CAROUSEL ── */}
      <section
        style={{ height: isMobile ? "100svh" : "90vh", position:"relative", overflow:"hidden", display:"flex", alignItems:"center", color:"white" }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Flechas — ocultas en móvil via CSS */}
        <button className="hero-arrow" onClick={()=>setCurrentSlide((currentSlide-1+heroSlides.length)%heroSlides.length)}
          style={{ position:"absolute", left:20, zIndex:10, background:"rgba(0,0,0,0.2)", border:"none", color:"white", fontSize:40, cursor:"pointer", borderRadius:"50%", width:50, height:50, display:"flex", alignItems:"center", justifyContent:"center", paddingBottom:"6px" }}>‹</button>
        <button className="hero-arrow" onClick={()=>setCurrentSlide((currentSlide+1)%heroSlides.length)}
          style={{ position:"absolute", right:20, zIndex:10, background:"rgba(0,0,0,0.2)", border:"none", color:"white", fontSize:40, cursor:"pointer", borderRadius:"50%", width:50, height:50, display:"flex", alignItems:"center", justifyContent:"center", paddingBottom:"6px" }}>›</button>

        {heroSlides.map((slide, idx) => (
          <div key={idx} style={{ position:"absolute", inset:0, backgroundImage:`url(${slide.img})`, backgroundSize:"cover", backgroundPosition:"center", opacity: currentSlide===idx ? 1 : 0, transition:"opacity 1.6s ease-in-out" }} />
        ))}
        <div style={{ position:"absolute", inset:0, background: isMobile ? "linear-gradient(180deg, rgba(92,15,26,0.75) 0%, rgba(26,22,18,0.70) 100%)" : "linear-gradient(110deg, rgba(92,15,26,0.82) 50%, rgba(26,22,18,0.40) 10%)" }} />

        <div className="hero-content" style={{ maxWidth:1280, margin:"0 auto", padding: isMobile ? "0 20px" : "0 48px", width:"100%", position:"relative" }}>
          <div style={{ maxWidth: isMobile ? "100%" : 680 }}>
            <span style={{ fontFamily:"var(--font-body)", fontSize:11, fontWeight:600, letterSpacing:"0.2em", textTransform:"uppercase", color:"var(--gold-light)", display:"block", marginBottom:16 }}>
              — {heroSlides[currentSlide].tag}
            </span>
            <h1 style={{ fontFamily:"var(--font-display)", fontSize: isMobile ? "clamp(2.2rem,9vw,3rem)" : "clamp(3rem,5.5vw,5rem)", fontWeight:800, lineHeight:1.1, marginBottom:20, whiteSpace:"pre-line" }}>
              {heroSlides[currentSlide].title}
            </h1>
            <p style={{ fontFamily:"var(--font-body)", fontSize: isMobile ? "1rem" : "clamp(1rem,1.8vw,1.25rem)", opacity:0.9, marginBottom:36, lineHeight:1.7, maxWidth:520 }}>
              {heroSlides[currentSlide].sub}
            </p>
            <div className="btn-hero-wrap" style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
              <button onClick={()=>setPage("informes")} className="btn-gold" style={{ padding:"15px 40px" }}>Solicitar Información</button>
              <button onClick={()=>setPage("oferta")} className="btn-outline" style={{ padding:"15px 40px" }}>Ver Programas</button>
            </div>
          </div>
        </div>

        {/* Slide dots */}
        <div style={{ position:"absolute", bottom:28, left:"50%", transform:"translateX(-50%)", display:"flex", gap:10 }}>
          {heroSlides.map((_,idx)=>(
            <button key={idx} onClick={()=>setCurrentSlide(idx)} style={{ width: currentSlide===idx ? 28 : 10, height:10, borderRadius:5, border:"none", background: currentSlide===idx ? "var(--gold)" : "rgba(255,255,255,0.35)", cursor:"pointer", transition:"all 0.3s" }} />
          ))}
        </div>
      </section>

      {/* ── NIVELES ACADÉMICOS ── */}
      <section className="section-pad" style={{ padding:"100px 24px", background:"var(--off-white)" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <span className="section-label" style={{ justifyContent:"center", display:"flex", alignItems:"center" }}>Formación Universitaria</span>
            <h2 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(1.8rem,3.5vw,2.8rem)", color:"var(--crimson)", marginTop:8 }}>Niveles Académicos</h2>
            <div className="gold-line" style={{ margin:"20px auto 0" }} />
          </div>

          <div className="niveles-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:0, border:"1px solid #DDD8CF" }}>
            {niveles.map((nivel, ni) => (
              <div key={nivel.key} className={ni<2 ? "nivel-border-right" : ""} style={{ borderRight: ni<2 ? "1px solid #DDD8CF" : "none", background:"#fff" }}>
                <button onClick={()=>setOpenLevel(openLevel===nivel.key ? null : nivel.key)} style={{ width:"100%", background:"none", border:"none", cursor:"pointer", padding: isMobile ? "28px 20px" : "40px 36px", textAlign:"left", borderBottom:"3px solid transparent", transition:"border-color 0.2s", ...(openLevel===nivel.key ? { borderBottomColor:"var(--gold)" } : {}) }}>
                  <div style={{ fontFamily:"var(--font-body)", fontSize:11, fontWeight:600, letterSpacing:"0.15em", textTransform:"uppercase", color:"var(--gold)", marginBottom:8 }}>{nivel.count}</div>
                  <h3 style={{ fontFamily:"var(--font-display)", fontSize: isMobile ? 20 : 26, color:"var(--crimson)", marginBottom:10 }}>{nivel.label}</h3>
                  {!isMobile && <p style={{ fontFamily:"var(--font-body)", fontSize:14, color:"var(--gray)", lineHeight:1.7 }}>{nivel.desc}</p>}
                  <div style={{ marginTop:16, fontFamily:"var(--font-body)", fontSize:12, fontWeight:600, letterSpacing:"0.08em", color: openLevel===nivel.key ? "var(--crimson)" : "var(--gold)", textTransform:"uppercase" }}>
                    {openLevel===nivel.key ? "Cerrar ↑" : "Ver ↓"}
                  </div>
                </button>

                {openLevel===nivel.key && (
                  <div style={{ background:"var(--off-white)", borderTop:"1px solid #DDD8CF", padding:"8px 0" }}>
                    {nivel.programas.map(prog => (
                      <button key={prog.code} onClick={()=>{ setSelectedCarrera(prog); setPage("carrera"); }} style={{ display:"flex", alignItems:"center", gap:12, width:"100%", background:"none", border:"none", cursor:"pointer", padding: isMobile ? "14px 20px" : "16px 36px", textAlign:"left", borderBottom:"1px solid #EAE6DF", transition:"background 0.15s" }}
                        onMouseEnter={e=>e.currentTarget.style.background="#fff"}
                        onMouseLeave={e=>e.currentTarget.style.background="transparent"}
                      >
                        <span style={{ fontSize:20 }}>{prog.icono}</span>
                        <div style={{ flex:1, minWidth:0 }}>
                          <div style={{ fontFamily:"var(--font-body)", fontSize:13, fontWeight:600, color:"var(--text)", whiteSpace: isMobile ? "normal" : "nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{prog.nombre}</div>
                          <div style={{ fontFamily:"var(--font-body)", fontSize:11, color:"var(--gray)", marginTop:2 }}>{prog.duracion}</div>
                        </div>
                        <span style={{ color:"var(--crimson)", fontSize:14, flexShrink:0 }}>→</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LEAD FORM ── */}
      <section className="section-pad" style={{ padding:"100px 24px", background:"#5C0F1A", position:"relative", overflow:"hidden" }}>
        {!isMobile && <>
          <div style={{ position:"absolute", top:0, left:0, width:"42%", height:"100%", background:"var(--crimson-dark)", zIndex:0 }} />
          <div style={{ position:"absolute", top:0, left:"42%", width:"8%", height:"100%", background:"linear-gradient(to right, var(--crimson-dark), transparent)", zIndex:0 }} />
        </>}

        <div className="leadform-grid" style={{ maxWidth:1200, margin:"0 auto", position:"relative", zIndex:1, display:"grid", gridTemplateColumns:"1fr 1fr", gap:80, alignItems:"center" }}>
          <div className="leadform-copy" style={{ color:"#fff" }}>
            <span style={{ fontFamily:"var(--font-body)", fontSize:11, fontWeight:600, letterSpacing:"0.2em", textTransform:"uppercase", color:"var(--gold-light)", display:"block", marginBottom:16 }}>— Dar el primer paso</span>
            <h2 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(1.8rem,3vw,2.8rem)", lineHeight:1.15, marginBottom:20 }}>Solicita información<br/><em>sin compromiso</em></h2>
            <div style={{ width:48, height:2, background:"var(--gold)", marginBottom:24 }} />
            <p style={{ fontFamily:"var(--font-body)", fontSize:15, lineHeight:1.8, opacity:0.88, marginBottom:28 }}>
              Un asesor académico personalizado te contactará para resolver todas tus dudas sobre costos, becas, modalidad y fechas de inicio.
            </p>
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              {["Orientación académica personalizada", "Información de costos y becas disponibles", "Sin compromisos de inscripción"].map(item => (
                <div key={item} style={{ display:"flex", alignItems:"center", gap:12 }}>
                  <div style={{ width:20, height:20, borderRadius:"50%", background:"rgba(184,131,58,0.2)", border:"1px solid var(--gold)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <span style={{ color:"var(--gold-light)", fontSize:11 }}>✓</span>
                  </div>
                  <span style={{ fontFamily:"var(--font-body)", fontSize:14, opacity:0.85 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background:"#fff", padding: isMobile ? "32px 24px" : "48px 44px", boxShadow:"0 24px 64px rgba(0,0,0,0.12)" }}>
            <h3 style={{ fontFamily:"var(--font-display)", fontSize:22, color:"var(--crimson)", marginBottom:8 }}>Empieza tu proceso hoy</h3>
            <p style={{ fontFamily:"var(--font-body)", fontSize:13, color:"var(--gray)", marginBottom:28 }}>Completa el formulario y nos ponemos en contacto.</p>
            <LeadForm compact={false} />
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ padding: isMobile ? "48px 16px" : "80px 24px", background:"var(--crimson-dark)" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div className="stats-grid" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:1, background:"rgba(255,255,255,0.08)" }}>
            {stats.map((s,i) => (
              <div key={i} style={{ padding: isMobile ? "32px 16px" : "48px 32px", textAlign:"center", background:"var(--crimson-dark)" }}>
                <div style={{ fontFamily:"var(--font-display)", fontSize:"clamp(1.8rem,4vw,3.2rem)", fontWeight:800, color:"var(--gold-light)", lineHeight:1, marginBottom:10 }}>{s.num}</div>
                <div style={{ fontFamily:"var(--font-body)", fontSize: isMobile ? 11 : 13, color:"rgba(255,255,255,0.65)", letterSpacing:"0.04em", lineHeight:1.5 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─── CONÓCENOS ─────────────────────────────────────────────────────────────── */
function ConocenosPage() {
  const isMobile = useIsMobile();
  const planteles = [
    { ciudad:"Culiacán, Sinaloa", dir:"Blvd. Pedro Infante 2345, Col. Ejidal, Culiacán, Sin. C.P. 80200", tel:"(667) 123 4567", email:"informes.cln@ugc.edu.mx", img:"https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80" },
    { ciudad:"San Lucas, B.C.S.", dir:"Av. Constituyentes 890, Col. Centro, Cabo San Lucas, B.C.S. C.P. 23450", tel:"(624) 143 0000", email:"informes.bcs@ugc.edu.mx", img:"https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80" },
  ];

  return (
    <div style={{ paddingTop:68 }}>
      <div style={{ background:"var(--crimson-dark)", padding: isMobile ? "48px 20px 60px" : "80px 24px 100px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", right:0, top:0, width:"40%", height:"100%", backgroundImage:"url(https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80)", backgroundSize:"cover", backgroundPosition:"center", opacity:0.12 }} />
        <div style={{ maxWidth:1000, margin:"0 auto", position:"relative" }}>
          <span className="section-label" style={{ color:"var(--gold-light)" }}>Universidad del Golfo de California</span>
          <h1 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(2rem,5vw,4rem)", color:"#fff", marginTop:8, marginBottom:20 }}>Nuestra Institución</h1>
          <div style={{ width:48, height:2, background:"var(--gold)" }} />
        </div>
      </div>

      {/* Historia */}
      <section className="section-pad" style={{ padding:"80px 24px", background:"#fff" }}>
        <div className="historia-grid" style={{ maxWidth:1100, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:80, alignItems:"center" }}>
          <div>
            <span className="section-label">Nuestra Historia</span>
            <h2 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(1.6rem,2.5vw,2.4rem)", color:"var(--crimson)", margin:"8px 0 24px" }}>Más de 20 años formando profesionales de excelencia</h2>
            <div className="gold-line" />
            <p style={{ fontFamily:"var(--font-body)", fontSize:15, color:"var(--gray)", lineHeight:1.85, marginBottom:20 }}>
              La Universidad del Golfo de California nace con la misión de brindar educación universitaria de calidad y accesible para personas que buscan superarse sin sacrificar sus responsabilidades personales y laborales.
            </p>
            <p style={{ fontFamily:"var(--font-body)", fontSize:15, color:"var(--gray)", lineHeight:1.85, marginBottom:32 }}>
              Desde nuestra fundación, hemos mantenido el compromiso de integrar docentes activos en sus respectivas industrias, garantizando una formación práctica, actualizada y directamente conectada con las demandas del mercado laboral.
            </p>
            <div className="mision-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
              {[
                { tit:"Misión", txt:"Formar profesionales íntegros y competentes mediante programas académicos de calidad, con validez oficial, que respondan a las necesidades del entorno social y productivo." },
                { tit:"Visión", txt:"Ser la institución universitaria de mayor preferencia en el noroeste de México por su modelo educativo flexible, su cuerpo docente especializado y su impacto en el desarrollo regional." },
              ].map(item => (
                <div key={item.tit} style={{ background:"var(--off-white)", padding:"24px 20px", borderTop:"3px solid var(--gold)" }}>
                  <h4 style={{ fontFamily:"var(--font-display)", fontSize:18, color:"var(--crimson)", marginBottom:10 }}>{item.tit}</h4>
                  <p style={{ fontFamily:"var(--font-body)", fontSize:13, color:"var(--gray)", lineHeight:1.7 }}>{item.txt}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="historia-img" style={{ position:"relative" }}>
            <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80" alt="UGC Campus" style={{ width:"100%", display:"block" }} />
            <div style={{ position:"absolute", bottom:-20, right:-20, width:120, height:120, background:"var(--gold)", zIndex:-1 }} />
          </div>
        </div>
      </section>

      {/* Planteles */}
      <section className="section-pad" style={{ padding:"80px 24px", background:"var(--off-white)" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <span className="section-label">Presencia Nacional</span>
            <h2 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(1.8rem,3vw,2.6rem)", color:"var(--crimson)", marginTop:8 }}>Nuestros Planteles</h2>
            <div className="gold-line" style={{ margin:"20px auto 0" }} />
          </div>
          <div className="planteles-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:40 }}>
            {planteles.map(p => (
              <div key={p.ciudad} style={{ background:"#fff", overflow:"hidden", boxShadow:"0 4px 20px rgba(0,0,0,0.06)" }}>
                <div style={{ height:220, overflow:"hidden" }}>
                  <img src={p.img} alt={p.ciudad} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
                </div>
                <div style={{ padding: isMobile ? "24px 20px" : "36px 32px", borderTop:"3px solid var(--gold)" }}>
                  <h3 style={{ fontFamily:"var(--font-display)", fontSize:20, color:"var(--crimson)", marginBottom:16 }}>{p.ciudad}</h3>
                  <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                    <div style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
                      <span style={{ fontSize:16, marginTop:2 }}>📍</span>
                      <p style={{ fontFamily:"var(--font-body)", fontSize:14, color:"var(--gray)", lineHeight:1.6 }}>{p.dir}</p>
                    </div>
                    <div style={{ display:"flex", gap:12, alignItems:"center" }}>
                      <span style={{ fontSize:16 }}>📞</span>
                      <a href={`tel:${p.tel}`} style={{ fontFamily:"var(--font-body)", fontSize:14, color:"var(--crimson)", fontWeight:600 }}>{p.tel}</a>
                    </div>
                    <div style={{ display:"flex", gap:12, alignItems:"center" }}>
                      <span style={{ fontSize:16 }}>✉️</span>
                      <a href={`mailto:${p.email}`} style={{ fontFamily:"var(--font-body)", fontSize:13, color:"var(--crimson)", fontWeight:600 }}>{p.email}</a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─── OFERTA EDUCATIVA ──────────────────────────────────────────────────────── */
function OfertaPage({ setPage, setSelectedCarrera }) {
  const isMobile = useIsMobile();
  const [activeLevel, setActiveLevel] = useState("licenciaturas");

  const niveles = [
    { key:"licenciaturas", label:"Licenciaturas", programas: licenciaturas },
    { key:"maestrias",     label:"Maestrías",     programas: maestrias },
    { key:"doctorados",    label:"Doctorado",     programas: doctorados },
  ];

  const current = niveles.find(n=>n.key===activeLevel);

  return (
    <div style={{ paddingTop:68 }}>
      <div style={{ background:"var(--crimson-dark)", padding: isMobile ? "32px 20px 40px" : "20px 24px 40px" }}>
        <div style={{ maxWidth:1000, margin:"0 auto" }}>
          <span className="section-label" style={{ color:"var(--gold-light)" }}>Programas Académicos</span>
          <h1 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(2rem,5vw,4rem)", color:"#fff", marginTop:8, marginBottom:20 }}>Oferta Educativa</h1>
          <div style={{ width:48, height:2, background:"var(--gold)" }} />
        </div>
      </div>

      {/* Tabs */}
      <div style={{ background:"#fff", borderBottom:"1px solid #DDD8CF", position:"sticky", top:68, zIndex:100, overflowX:"auto" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 16px", display:"flex", gap:0 }}>
          {niveles.map(nivel => (
            <button key={nivel.key} onClick={()=>setActiveLevel(nivel.key)} style={{ background:"none", border:"none", cursor:"pointer", fontFamily:"var(--font-body)", fontSize: isMobile ? 13 : 14, fontWeight:600, letterSpacing:"0.05em", padding: isMobile ? "16px 20px" : "22px 36px", color: activeLevel===nivel.key ? "var(--crimson)" : "var(--gray)", borderBottom: activeLevel===nivel.key ? "2px solid var(--crimson)" : "2px solid transparent", transition:"all 0.2s", whiteSpace:"nowrap" }}>
              {nivel.label}
            </button>
          ))}
        </div>
      </div>

      <section style={{ padding: isMobile ? "40px 16px 80px" : "80px 24px 120px", background:"var(--off-white)" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap: isMobile ? 20 : 32 }}>
            {current.programas.map(prog => (
              <div key={prog.code} style={{ background:"#fff", overflow:"hidden", boxShadow:"0 2px 12px rgba(0,0,0,0.05)", display:"flex", flexDirection:"column" }}>
                <div style={{ background:"var(--crimson)", padding:"40px 24px", textAlign:"center", display:"flex", flexDirection:"column", alignItems:"center", minHeight:160, justifyContent:"center" }}>
                  <h3 style={{ fontFamily:"var(--font-display)", fontSize:22, color:"#fff", margin:0, fontWeight:800, lineHeight:1.2 }}>{prog.nombre}</h3>
                  <span style={{ marginTop:14, fontFamily:"var(--font-body)", fontSize:11, fontWeight:600, letterSpacing:"0.12em", textTransform:"uppercase", color:"var(--gold-light)", borderTop:"1px solid rgba(184,131,58,0.3)", paddingTop:8 }}>{prog.modalidad}</span>
                </div>
                <div style={{ padding:"28px 24px", flex:1, display:"flex", flexDirection:"column" }}>
                  <p style={{ fontFamily:"var(--font-body)", fontSize:14, color:"var(--gray)", lineHeight:1.8, marginBottom:20, flex:1 }}>{prog.desc}</p>
                  <div style={{ marginBottom:20 }}>
                    <span style={{ fontFamily:"var(--font-body)", fontSize:12, color:"var(--gray)", background:"#F5F2ED", padding:"6px 14px", borderRadius:4 }}>⏱ {prog.duracion}</span>
                  </div>
                  <button onClick={()=>{ setSelectedCarrera(prog); setPage("carrera"); }} className="btn-primary" style={{ width:"100%", padding:"14px", cursor:"pointer" }}>
                    Ver Programa Completo
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─── CARRERA DETAIL ────────────────────────────────────────────────────────── */
function CarreraPage({ carrera, setPage }) {
  const isMobile = useIsMobile();
  if (!carrera) return <div style={{ paddingTop:150, textAlign:"center" }}>Selecciona una carrera primero.</div>;

  return (
    <div style={{ paddingTop:68 }}>
      <div style={{ background:"var(--crimson-dark)", padding: isMobile ? "32px 20px" : "20px 24px 40px", position:"relative", overflow:"hidden" }}>
        <div style={{ maxWidth:1100, margin:"0 auto", display:"flex", gap:24, alignItems:"center", flexWrap:"wrap" }}>
          {!isMobile && (
            <div style={{ width:90, height:90, background:"rgba(255,255,255,0.08)", border:"1px solid rgba(184,131,58,0.4)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <span style={{ fontFamily:"var(--font-display)", fontSize:26, fontWeight:800, color:"var(--gold-light)" }}>{carrera.code}</span>
            </div>
          )}
          <div style={{ flex:1, minWidth:0 }}>
            <button onClick={()=>setPage("oferta")} style={{ background:"none", border:"none", cursor:"pointer", fontFamily:"var(--font-body)", fontSize:13, color:"var(--gold-light)", marginBottom:12, display:"flex", alignItems:"center", gap:8 }}>← Volver a la oferta</button>
            <span style={{ fontFamily:"var(--font-body)", fontSize:11, fontWeight:600, letterSpacing:"0.15em", textTransform:"uppercase", color:"var(--gold-light)" }}>{carrera.nivel || "Licenciatura"}</span>
            <h1 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(1.6rem,4vw,3.2rem)", color:"#fff", margin:"8px 0 16px" }}>{carrera.nombre}</h1>
            <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
              <span style={{ fontFamily:"var(--font-body)", fontSize:13, color:"rgba(255,255,255,0.7)", background:"rgba(255,255,255,0.08)", padding:"6px 14px" }}>⏱ {carrera.duracion}</span>
              <span style={{ fontFamily:"var(--font-body)", fontSize:13, color:"rgba(255,255,255,0.7)", background:"rgba(255,255,255,0.08)", padding:"6px 14px" }}>🏫 {carrera.modalidad}</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth:1100, margin: isMobile ? "0 auto 60px" : "-20px auto 100px", padding:"0 16px" }}>
        <div className="carrera-grid" style={{ background:"#fff", boxShadow:"0 12px 48px rgba(0,0,0,0.08)", display:"grid", gridTemplateColumns:"1fr 420px", gap:0, overflow:"hidden" }}>
          <div style={{ padding: isMobile ? "32px 20px" : "60px 56px" }}>
            <span className="section-label">Descripción del Programa</span>
            <h2 style={{ fontFamily:"var(--font-display)", fontSize: isMobile ? 22 : 28, color:"var(--crimson)", margin:"8px 0 20px" }}>Acerca de {carrera.nombre}</h2>
            <div className="gold-line" />
            <p style={{ fontFamily:"var(--font-body)", fontSize:15, color:"var(--gray)", lineHeight:1.85, marginBottom:32 }}>{carrera.desc}</p>
            <h3 style={{ fontFamily:"var(--font-display)", fontSize:20, color:"var(--text)", marginBottom:16 }}>Perfil del Egresado</h3>
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              {["Capacidad de liderazgo en entornos organizacionales complejos.", "Habilidades técnicas actualizadas según las demandas del mercado.", "Pensamiento crítico y resolución de problemas bajo presión.", "Dominio de herramientas digitales especializadas del área."].map(item=>(
                <div key={item} style={{ display:"flex", gap:14, alignItems:"flex-start" }}>
                  <div style={{ width:6, height:6, borderRadius:"50%", background:"var(--gold)", marginTop:8, flexShrink:0 }} />
                  <p style={{ fontFamily:"var(--font-body)", fontSize:14, color:"var(--gray)", lineHeight:1.6 }}>{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background:"var(--off-white)", borderLeft:"1px solid #EAE6DF", padding: isMobile ? "32px 20px" : "60px 44px" }}>
            <h3 style={{ fontFamily:"var(--font-display)", fontSize:20, color:"var(--crimson)", marginBottom:8 }}>¿Te interesa este programa?</h3>
            <p style={{ fontFamily:"var(--font-body)", fontSize:13, color:"var(--gray)", marginBottom:24, lineHeight:1.6 }}>Completa el formulario y recibe el plan de estudios completo.</p>
            <LeadForm defaultPrograma={carrera.nombre} compact={false} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── MOODLE PAGE ───────────────────────────────────────────────────────────── */
function MoodlePage() {
  const isMobile = useIsMobile();
  return (
    <div style={{ paddingTop:68, minHeight:"100vh", background:"linear-gradient(135deg, var(--crimson-dark) 0%, #3A0812 50%, var(--crimson-dark) 100%)", display:"flex", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden" }}>
      {[300,500,700].map(s=>(
        <div key={s} style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:s, height:s, borderRadius:"50%", border:"1px solid rgba(184,131,58,0.12)", pointerEvents:"none" }} />
      ))}
      <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at 20% 50%, rgba(139,26,40,0.5) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(184,131,58,0.1) 0%, transparent 60%)" }} />
      <div style={{ position:"relative", zIndex:1, textAlign:"center", padding: isMobile ? "48px 24px" : "60px 40px", maxWidth:620, width:"100%" }}>
        <img src={MiLogo} alt="UGC" style={{ height: isMobile ? 60 : 80, marginBottom:32, filter:"brightness(0) invert(1)" }} />
        <div style={{ width:1, height:48, background:"linear-gradient(to bottom, transparent, rgba(184,131,58,0.5), transparent)", margin:"0 auto 32px" }} />
        <span style={{ fontFamily:"var(--font-body)", fontSize:11, fontWeight:600, letterSpacing:"0.2em", textTransform:"uppercase", color:"var(--gold-light)" }}>Acceso Académico</span>
        <h1 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(1.8rem,4vw,3.2rem)", color:"#fff", margin:"16px 0 16px" }}>Plataforma Educativa</h1>
        <p style={{ fontFamily:"var(--font-body)", fontSize:15, color:"rgba(255,255,255,0.7)", lineHeight:1.8, maxWidth:440, margin:"0 auto 40px" }}>
          Accede a tus materias, actividades, materiales de estudio y comunicación con tus docentes desde cualquier dispositivo.
        </p>
        <a href={MOODLE_URL} target="_blank" rel="noopener noreferrer" className="btn-gold" style={{ padding:"18px 48px", fontSize:14, letterSpacing:"0.1em", display:"inline-block" }}>
          Ingresar a Moodle UGC
        </a>
        <div style={{ marginTop:36, padding:"20px 24px", border:"1px solid rgba(255,255,255,0.08)", display:"inline-block", width: isMobile ? "100%" : "auto" }}>
          <p style={{ fontFamily:"var(--font-body)", fontSize:13, color:"rgba(255,255,255,0.5)", marginBottom:8 }}>¿Problemas de acceso?</p>
          <a href="mailto:soporte@ugc.edu.mx" style={{ fontFamily:"var(--font-body)", fontSize:13, color:"var(--gold-light)", fontWeight:600 }}>soporte@ugc.edu.mx</a>
          <span style={{ color:"rgba(255,255,255,0.3)", margin:"0 10px" }}>|</span>
          <a href="tel:6671234567" style={{ fontFamily:"var(--font-body)", fontSize:13, color:"var(--gold-light)", fontWeight:600 }}>667 123 4567</a>
        </div>
      </div>
    </div>
  );
}

/* ─── BLOG / VIDA ESTUDIANTIL ───────────────────────────────────────────────── */
const CATEGORIAS = ["Todas","Graduaciones","Charlas UGC","Clases","Eventos académicos","Galería"];

function BlogPage() {
  const isMobile = useIsMobile();
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [filtro, setFiltro] = useState("Todas");
  const [adminOpen, setAdminOpen] = useState(false);
  const [adminPass, setAdminPass] = useState("");
  const [adminAuth, setAdminAuth] = useState(false);
  const [newPost, setNewPost] = useState({ titulo:"", categoria:"Graduaciones", img:"", resumen:"", tipo:"post" });
  const [preview, setPreview] = useState(null);

  const savePost = () => {
    if (!newPost.titulo || !newPost.resumen) return;
    const updated = [{ ...newPost, id: Date.now(), fecha: new Date().toLocaleDateString("es-MX",{day:"numeric",month:"short",year:"numeric"}) }, ...posts];
    setPosts(updated);
    setNewPost({ titulo:"", categoria:"Graduaciones", img:"", resumen:"", tipo:"post" });
  };

  const deletePost = (id) => setPosts(posts.filter(p=>p.id!==id));
  const visible = filtro==="Todas" ? posts : posts.filter(p=>p.categoria===filtro);

  return (
    <div style={{ paddingTop:68 }}>
      <div style={{ background:"var(--crimson-dark)", padding: isMobile ? "48px 20px 60px" : "80px 24px 100px" }}>
        <div style={{ maxWidth:1000, margin:"0 auto", display:"flex", justifyContent:"space-between", alignItems:"flex-end", flexWrap:"wrap", gap:20 }}>
          <div>
            <span className="section-label" style={{ color:"var(--gold-light)" }}>Universidad del Golfo de California</span>
            <h1 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(2rem,5vw,4rem)", color:"#fff", marginTop:8 }}>Vida Estudiantil</h1>
            <div style={{ width:48, height:2, background:"var(--gold)", marginTop:16 }} />
          </div>
          <button onClick={()=>setAdminOpen(true)} style={{ background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.2)", color:"rgba(255,255,255,0.7)", fontFamily:"var(--font-body)", fontSize:12, padding:"10px 20px", cursor:"pointer" }}>
            ⚙ Administrar
          </button>
        </div>
      </div>

      <div style={{ background:"#fff", borderBottom:"1px solid #EAE6DF", padding:"0 16px", overflowX:"auto" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", display:"flex", gap:0 }}>
          {CATEGORIAS.map(cat=>(
            <button key={cat} onClick={()=>setFiltro(cat)} style={{ background:"none", border:"none", cursor:"pointer", fontFamily:"var(--font-body)", fontSize: isMobile ? 12 : 13, fontWeight:600, padding: isMobile ? "14px 12px" : "18px 20px", color: filtro===cat ? "var(--crimson)" : "var(--gray)", borderBottom: filtro===cat ? "2px solid var(--crimson)" : "2px solid transparent", whiteSpace:"nowrap", transition:"all 0.2s" }}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      <section style={{ padding: isMobile ? "40px 16px 80px" : "80px 24px 120px", background:"var(--off-white)" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          {visible.length === 0 && <p style={{ textAlign:"center", color:"var(--gray)", fontFamily:"var(--font-body)" }}>No hay publicaciones en esta categoría.</p>}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap: isMobile ? 20 : 32 }}>
            {visible.map(post => (
              <div key={post.id} className="card-hover" style={{ background:"#fff", overflow:"hidden", boxShadow:"0 2px 10px rgba(0,0,0,0.05)", cursor:"pointer" }} onClick={()=>setPreview(post)}>
                <div style={{ height:200, overflow:"hidden", background:"var(--warm-gray)" }}>
                  {post.img ? <img src={post.img} alt={post.titulo} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} /> : <div style={{ width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:40 }}>📷</div>}
                </div>
                <div style={{ padding:"24px 20px 28px" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10, alignItems:"center" }}>
                    <span style={{ fontFamily:"var(--font-body)", fontSize:11, fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--gold)" }}>{post.categoria}</span>
                    <span style={{ fontFamily:"var(--font-body)", fontSize:11, color:"var(--gray)" }}>{post.fecha}</span>
                  </div>
                  <h3 style={{ fontFamily:"var(--font-display)", fontSize:18, color:"var(--text)", marginBottom:10, lineHeight:1.3 }}>{post.titulo}</h3>
                  <p style={{ fontFamily:"var(--font-body)", fontSize:13, color:"var(--gray)", lineHeight:1.7 }}>{post.resumen}</p>
                  <div style={{ marginTop:16, fontFamily:"var(--font-body)", fontSize:13, fontWeight:600, color:"var(--crimson)" }}>Leer más →</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Post Preview Modal */}
      {preview && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.75)", zIndex:2000, display:"flex", alignItems: isMobile ? "flex-end" : "center", justifyContent:"center", padding: isMobile ? 0 : 24 }} onClick={()=>setPreview(null)}>
          <div style={{ background:"#fff", maxWidth:700, width:"100%", maxHeight: isMobile ? "90vh" : "85vh", overflowY:"auto", borderRadius: isMobile ? "16px 16px 0 0" : 0 }} onClick={e=>e.stopPropagation()}>
            {preview.img && <img src={preview.img} alt="" style={{ width:"100%", height:220, objectFit:"cover", display:"block" }} />}
            <div style={{ padding: isMobile ? "28px 20px" : "40px 44px" }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:14 }}>
                <span style={{ fontFamily:"var(--font-body)", fontSize:11, fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--gold)" }}>{preview.categoria}</span>
                <span style={{ fontFamily:"var(--font-body)", fontSize:11, color:"var(--gray)" }}>{preview.fecha}</span>
              </div>
              <h2 style={{ fontFamily:"var(--font-display)", fontSize: isMobile ? 22 : 28, color:"var(--crimson)", marginBottom:16 }}>{preview.titulo}</h2>
              <p style={{ fontFamily:"var(--font-body)", fontSize:15, color:"var(--gray)", lineHeight:1.85 }}>{preview.resumen}</p>
              <button onClick={()=>setPreview(null)} style={{ marginTop:28, fontFamily:"var(--font-body)", fontSize:13, color:"var(--crimson)", background:"none", border:"none", cursor:"pointer", fontWeight:600 }}>← Cerrar</button>
            </div>
          </div>
        </div>
      )}

      {/* Admin Modal */}
      {adminOpen && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.75)", zIndex:2000, display:"flex", alignItems: isMobile ? "flex-end" : "center", justifyContent:"center", padding: isMobile ? 0 : 24 }} onClick={()=>setAdminOpen(false)}>
          <div style={{ background:"#fff", maxWidth:640, width:"100%", maxHeight:"90vh", overflowY:"auto", padding: isMobile ? "32px 20px" : "48px 44px", borderRadius: isMobile ? "16px 16px 0 0" : 0 }} onClick={e=>e.stopPropagation()}>
            <h2 style={{ fontFamily:"var(--font-display)", fontSize:24, color:"var(--crimson)", marginBottom:8 }}>Panel de Administración</h2>
            <p style={{ fontFamily:"var(--font-body)", fontSize:13, color:"var(--gray)", marginBottom:24 }}>Gestiona las publicaciones de Vida Estudiantil.</p>
            {!adminAuth ? (
              <div>
                <label className="form-label">Contraseña de administrador</label>
                <input className="form-input" type="password" value={adminPass} onChange={e=>setAdminPass(e.target.value)} placeholder="Ingresa la contraseña" style={{ marginBottom:16 }} />
                <button onClick={()=>{ if(adminPass==="ugcadmin2025") setAdminAuth(true); else alert("Contraseña incorrecta"); }} className="btn-primary" style={{ width:"100%" }}>Acceder</button>
              </div>
            ) : (
              <div>
                <h3 style={{ fontFamily:"var(--font-display)", fontSize:18, color:"var(--text)", marginBottom:16 }}>Nueva Publicación</h3>
                <div style={{ display:"flex", flexDirection:"column", gap:14, marginBottom:24 }}>
                  <div><label className="form-label">Título</label><input className="form-input" value={newPost.titulo} onChange={e=>setNewPost(p=>({...p,titulo:e.target.value}))} /></div>
                  <div className="form-col2" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                    <div><label className="form-label">Categoría</label>
                      <select className="form-input" value={newPost.categoria} onChange={e=>setNewPost(p=>({...p,categoria:e.target.value}))}>
                        {CATEGORIAS.filter(c=>c!=="Todas").map(c=><option key={c}>{c}</option>)}
                      </select>
                    </div>
                    <div><label className="form-label">Tipo</label>
                      <select className="form-input" value={newPost.tipo} onChange={e=>setNewPost(p=>({...p,tipo:e.target.value}))}>
                        <option value="post">Artículo</option>
                        <option value="galeria">Galería</option>
                      </select>
                    </div>
                  </div>
                  <div><label className="form-label">URL de Imagen</label><input className="form-input" value={newPost.img} onChange={e=>setNewPost(p=>({...p,img:e.target.value}))} placeholder="https://..." /></div>
                  <div><label className="form-label">Resumen / Descripción</label><textarea className="form-input" rows={4} value={newPost.resumen} onChange={e=>setNewPost(p=>({...p,resumen:e.target.value}))} style={{ resize:"vertical" }} /></div>
                </div>
                <button onClick={savePost} className="btn-primary" style={{ width:"100%", marginBottom:28 }}>Publicar</button>
                <h3 style={{ fontFamily:"var(--font-display)", fontSize:16, color:"var(--text)", marginBottom:12 }}>Publicaciones existentes</h3>
                <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                  {posts.map(p=>(
                    <div key={p.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 16px", background:"var(--off-white)", borderLeft:"3px solid var(--gold)" }}>
                      <div>
                        <div style={{ fontFamily:"var(--font-body)", fontSize:13, fontWeight:600, color:"var(--text)" }}>{p.titulo}</div>
                        <div style={{ fontFamily:"var(--font-body)", fontSize:12, color:"var(--gray)" }}>{p.categoria} · {p.fecha}</div>
                      </div>
                      <button onClick={()=>deletePost(p.id)} style={{ background:"none", border:"none", cursor:"pointer", color:"#c0392b", fontSize:20, padding:"4px 8px" }}>✕</button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <button onClick={()=>{ setAdminOpen(false); setAdminAuth(false); setAdminPass(""); }} style={{ marginTop:20, fontFamily:"var(--font-body)", fontSize:13, color:"var(--gray)", background:"none", border:"none", cursor:"pointer" }}>Cerrar panel</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── BECAS ─────────────────────────────────────────────────────────────────── */
function BecasPage() {
  const isMobile = useIsMobile();
  return (
    <div style={{ paddingTop:68 }}>
      <div style={{ background:"var(--crimson-dark)", padding: isMobile ? "48px 20px 60px" : "80px 24px 100px" }}>
        <div style={{ maxWidth:1000, margin:"0 auto" }}>
          <span className="section-label" style={{ color:"var(--gold-light)" }}>Apoyo Financiero</span>
          <h1 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(2rem,5vw,4rem)", color:"#fff", marginTop:8, marginBottom:20 }}>Programa de Becas</h1>
          <div style={{ width:48, height:2, background:"var(--gold)" }} />
        </div>
      </div>

      <section className="section-pad" style={{ padding:"80px 24px", background:"var(--off-white)" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <span className="section-label">Tipos de Beca</span>
            <h2 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(1.6rem,3vw,2.4rem)", color:"var(--crimson)", marginTop:8 }}>Apoyamos tu formación profesional</h2>
            <div className="gold-line" style={{ margin:"20px auto 0" }} />
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap: isMobile ? 16 : 28 }}>
            {becas.map((b,i) => (
              <div key={i} style={{ background:"#fff", padding: isMobile ? "28px 20px" : "40px 32px", borderTop:"3px solid var(--gold)", boxShadow:"0 2px 12px rgba(0,0,0,0.04)" }}>
                <div style={{ fontSize:32, marginBottom:16 }}>{b.icono}</div>
                <h3 style={{ fontFamily:"var(--font-display)", fontSize:18, color:"var(--crimson)", marginBottom:10 }}>{b.tipo}</h3>
                <p style={{ fontFamily:"var(--font-body)", fontSize:14, color:"var(--gray)", lineHeight:1.7 }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: isMobile ? "48px 20px" : "80px 24px", background:"var(--crimson-dark)" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:40 }}>
            <span className="section-label" style={{ color:"var(--gold-light)" }}>Convenios Activos</span>
            <h2 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(1.6rem,3vw,2.4rem)", color:"#fff", marginTop:8 }}>Empresas con Convenio</h2>
            <p style={{ fontFamily:"var(--font-body)", fontSize:14, color:"rgba(255,255,255,0.65)", marginTop:10, maxWidth:480, margin:"10px auto 0" }}>Si trabajas en alguna de estas organizaciones, es posible que cuentes con beneficios especiales de colegiatura.</p>
          </div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:10, justifyContent:"center" }}>
            {empresas.map(e=>(
              <span key={e} style={{ fontFamily:"var(--font-body)", fontSize:11, fontWeight:600, letterSpacing:"0.06em", color:"rgba(255,255,255,0.8)", padding:"8px 16px", border:"1px solid rgba(184,131,58,0.3)", background:"rgba(255,255,255,0.04)" }}>{e}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad" style={{ padding:"80px 24px", background:"#fff" }}>
        <div style={{ maxWidth:680, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:40 }}>
            <span className="section-label">¿Quieres saber más?</span>
            <h2 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(1.6rem,3vw,2.4rem)", color:"var(--crimson)", marginTop:8 }}>Solicita Información sobre Becas</h2>
            <div className="gold-line" style={{ margin:"20px auto 0" }} />
          </div>
          <div style={{ background:"var(--off-white)", padding: isMobile ? "32px 20px" : "48px 44px", borderTop:"3px solid var(--gold)" }}>
            <LeadForm compact={false} />
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─── INFORMES PAGE ─────────────────────────────────────────────────────────── */
function InformesPage() {
  const isMobile = useIsMobile();
  return (
    <div style={{ paddingTop:68 }}>
      <div style={{ background:"var(--crimson-dark)", padding: isMobile ? "48px 20px 60px" : "80px 24px 100px" }}>
        <div style={{ maxWidth:800, margin:"0 auto" }}>
          <span className="section-label" style={{ color:"var(--gold-light)" }}>Primer Paso</span>
          <h1 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(2rem,5vw,4rem)", color:"#fff", marginTop:8, marginBottom:20 }}>Solicitar Informes</h1>
          <div style={{ width:48, height:2, background:"var(--gold)" }} />
        </div>
      </div>
      <section style={{ padding: isMobile ? "40px 16px 80px" : "80px 24px 120px", background:"var(--off-white)" }}>
        <div style={{ maxWidth:680, margin:"0 auto" }}>
          <div style={{ background:"#fff", padding: isMobile ? "32px 20px" : "52px 48px", borderTop:"3px solid var(--gold)", boxShadow:"0 8px 32px rgba(0,0,0,0.06)" }}>
            <h2 style={{ fontFamily:"var(--font-display)", fontSize: isMobile ? 22 : 26, color:"var(--crimson)", marginBottom:8 }}>Nos ponemos en contacto contigo</h2>
            <p style={{ fontFamily:"var(--font-body)", fontSize:14, color:"var(--gray)", marginBottom:28, lineHeight:1.7 }}>Completa el formulario y un asesor académico te contactará para resolver todas tus preguntas.</p>
            <LeadForm compact={false} />
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─── FOOTER ────────────────────────────────────────────────────────────────── */
function Footer({ setPage }) {
  const isMobile = useIsMobile();
  return (
    <footer style={{ background:"var(--gray-dark)", color:"#fff" }}>
      <div style={{ maxWidth:1200, margin:"0 auto", padding: isMobile ? "48px 20px 0" : "80px 32px 0" }}>
        <div className="footer-grid" style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr", gap: isMobile ? 0 : 80, paddingBottom: isMobile ? 0 : 64, borderBottom: isMobile ? "none" : "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ marginBottom: isMobile ? 36 : 0 }}>
            <img src={MiLogo} alt="UGC" style={{ height:48, marginBottom:20, filter:"brightness(0) invert(1)", opacity:0.9 }} />
            <p style={{ fontFamily:"var(--font-body)", fontSize:14, color:"rgba(255,255,255,0.5)", lineHeight:1.8, maxWidth:360 }}>Formando líderes con visión global y compromiso social desde hace más de 20 años. Campus Culiacán y San Lucas, B.C.S.</p>
          </div>
          {isMobile ? (
            /* En móvil: navegación y contacto en fila */
            <div style={{ gridColumn:"1 / -1", display:"grid", gridTemplateColumns:"1fr 1fr", gap:24, paddingTop:32, borderTop:"1px solid rgba(255,255,255,0.07)", marginBottom:32 }}>
              <div>
                <h4 style={{ fontFamily:"var(--font-body)", fontSize:11, fontWeight:600, letterSpacing:"0.15em", textTransform:"uppercase", color:"var(--gold)", marginBottom:16 }}>Navegación</h4>
                {[["Inicio","home"],["Conócenos","conocenos"],["Oferta Educativa","oferta"],["Becas","becas"],["Vida Estudiantil","blog"]].map(([label,page])=>(
                  <button key={page} onClick={()=>setPage(page)} style={{ display:"block", background:"none", border:"none", cursor:"pointer", fontFamily:"var(--font-body)", fontSize:14, color:"rgba(255,255,255,0.5)", padding:"5px 0" }}>{label}</button>
                ))}
              </div>
              <div>
                <h4 style={{ fontFamily:"var(--font-body)", fontSize:11, fontWeight:600, letterSpacing:"0.15em", textTransform:"uppercase", color:"var(--gold)", marginBottom:16 }}>Contacto</h4>
                <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                  <div style={{ fontFamily:"var(--font-body)", fontSize:13, color:"rgba(255,255,255,0.5)" }}>📍 Blvd. Pedro Infante 2345, Culiacán</div>
                  <div style={{ fontFamily:"var(--font-body)", fontSize:13, color:"rgba(255,255,255,0.5)" }}>📞 (667) 123 4567</div>
                  <div style={{ fontFamily:"var(--font-body)", fontSize:13, color:"rgba(255,255,255,0.5)" }}>✉️ informes.cln@ugc.edu.mx</div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div>
                <h4 style={{ fontFamily:"var(--font-body)", fontSize:11, fontWeight:600, letterSpacing:"0.15em", textTransform:"uppercase", color:"var(--gold)", marginBottom:20 }}>Navegación</h4>
                {[["Inicio","home"],["Conócenos","conocenos"],["Oferta Educativa","oferta"],["Becas","becas"],["Vida Estudiantil","blog"]].map(([label,page])=>(
                  <button key={page} onClick={()=>setPage(page)} style={{ display:"block", background:"none", border:"none", cursor:"pointer", fontFamily:"var(--font-body)", fontSize:14, color:"rgba(255,255,255,0.5)", padding:"6px 0", transition:"color 0.2s" }}
                    onMouseEnter={e=>e.currentTarget.style.color="#fff"}
                    onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.5)"}
                  >{label}</button>
                ))}
              </div>
              <div>
                <h4 style={{ fontFamily:"var(--font-body)", fontSize:11, fontWeight:600, letterSpacing:"0.15em", textTransform:"uppercase", color:"var(--gold)", marginBottom:20 }}>Contacto</h4>
                <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                  <div style={{ fontFamily:"var(--font-body)", fontSize:14, color:"rgba(255,255,255,0.5)" }}>📍 Blvd. Pedro Infante 2345, Culiacán</div>
                  <div style={{ fontFamily:"var(--font-body)", fontSize:14, color:"rgba(255,255,255,0.5)" }}>📞 (667) 123 4567</div>
                  <div style={{ fontFamily:"var(--font-body)", fontSize:14, color:"rgba(255,255,255,0.5)" }}>✉️ informes.cln@ugc.edu.mx</div>
                </div>
              </div>
            </>
          )}
        </div>
        <div style={{ padding:"24px 0", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:8, borderTop: isMobile ? "1px solid rgba(255,255,255,0.07)" : "none" }}>
          <p style={{ fontFamily:"var(--font-body)", fontSize:11, color:"rgba(255,255,255,0.25)", letterSpacing:"0.04em" }}>© 2026 Universidad del Golfo de California · Campus Culiacán.</p>
          <p style={{ fontFamily:"var(--font-body)", fontSize:11, color:"rgba(255,255,255,0.25)" }}>Validez Oficial SEP · RVOE</p>
        </div>
      </div>
    </footer>
  );
}

/* ─── APP ───────────────────────────────────────────────────────────────────── */
export default function App() {
  const [page, setPage] = useState("home");
  const [selectedCarrera, setSelectedCarrera] = useState(null);

  const setPageWithScroll = (p) => {
    setPage(p);
    window.scrollTo({ top:0, behavior:"smooth" });
  };

  const renderPage = () => {
    switch(page) {
      case "home":      return <HomePage setPage={setPageWithScroll} setSelectedCarrera={setSelectedCarrera} />;
      case "conocenos": return <ConocenosPage />;
      case "oferta":    return <OfertaPage setPage={setPageWithScroll} setSelectedCarrera={setSelectedCarrera} />;
      case "carrera":   return <CarreraPage carrera={selectedCarrera} setPage={setPageWithScroll} />;
      case "moodle":    return <MoodlePage />;
      case "blog":      return <BlogPage />;
      case "becas":     return <BecasPage />;
      case "informes":  return <InformesPage />;
      default:          return <HomePage setPage={setPageWithScroll} setSelectedCarrera={setSelectedCarrera} />;
    }
  };

  return (
    <>
      <FontLink />
      <div style={{ fontFamily:"var(--font-body)", background:"var(--off-white)", minHeight:"100vh" }}>
        <Navbar currentPage={page} setPage={setPageWithScroll} />
        <main>{renderPage()}</main>
        <WhatsAppButton />
        {page !== "moodle" && <Footer setPage={setPageWithScroll} />}
      </div>
    </>
  );
}
