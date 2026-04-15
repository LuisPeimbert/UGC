import { useState, useEffect, useRef } from "react";

const COLORS = {
  crimson: "#9B1C2E",
  crimsonDark: "#6B1020",
  crimsonLight: "#C42A42",
  gold: "#C8973A",
  goldLight: "#E5B55C",
  white: "#FFFFFF",
  offWhite: "#FAF9F7",
  grayLight: "#F2F0EC",
  gray: "#8A8680",
  grayDark: "#3D3A36",
  text: "#1A1714",
};

const WHATSAPP_NUM = "526671234567";
const WHATSAPP_MSG = encodeURIComponent("Hola, me interesa obtener información sobre las carreras de la UGC Campus Culiacán.");
const MOODLE_URL = "https://ugcsinaloa.moodlecloud.com/login/index.php";

const carreras = [
  { code: "LDER", nombre: "Derecho", nivel: "Licenciatura", icono: "⚖️", desc: "Fórmate como un profesional del derecho con visión crítica y compromiso social. Aprende a defender, mediar y asesorar en el marco legal mexicano.", duracion: "9 cuatrimestres", modalidad: "Escolarizada / Mixta" },
  { code: "LAE", nombre: "Administración de Empresas", nivel: "Licenciatura", icono: "📊", desc: "Desarrolla habilidades de liderazgo, gestión y estrategia para dirigir organizaciones con éxito en un entorno empresarial cambiante.", duracion: "9 cuatrimestres", modalidad: "Escolarizada / Mixta" },
  { code: "LMER", nombre: "Mercadotecnia", nivel: "Licenciatura", icono: "📣", desc: "Crea estrategias de marketing digital y tradicional, analiza mercados y conecta marcas con sus audiencias de forma efectiva.", duracion: "9 cuatrimestres", modalidad: "Escolarizada / Mixta" },
  { code: "LCIA", nombre: "Comercio Internacional y Aduanas", nivel: "Licenciatura", icono: "🌐", desc: "Especialízate en operaciones de comercio exterior, regulaciones aduaneras y negocios globales para competir en mercados internacionales.", duracion: "9 cuatrimestres", modalidad: "Escolarizada / Mixta" },
  { code: "LCON", nombre: "Contaduría", nivel: "Licenciatura", icono: "🧾", desc: "Domina la contabilidad, fiscalidad y finanzas empresariales. Una carrera con alta demanda laboral y campo profesional amplio.", duracion: "9 cuatrimestres", modalidad: "Escolarizada / Mixta" },
  { code: "MED", nombre: "Maestría en Educación y Docencia", nivel: "Posgrado", icono: "🎓", desc: "Eleva tu práctica docente con fundamentos pedagógicos modernos, investigación educativa y herramientas digitales para el aula del siglo XXI.", duracion: "4 cuatrimestres", modalidad: "En línea / Mixta" },
  { code: "DPI", nombre: "Doctorado en Transformación Disruptiva con IA", nivel: "Doctorado", icono: "🤖", desc: "El primer doctorado de su tipo. Forma líderes que integran inteligencia artificial para transformar sistemas educativos y organizacionales.", duracion: "6 cuatrimestres", modalidad: "En línea / Mixta" },
];

const blogPosts = [
  { id: 1, titulo: "Graduación generación 2024: un logro que inspira", categoria: "Graduaciones", fecha: "20 Mar 2025", img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80", resumen: "Más de 120 egresados recibieron su título universitario en una emotiva ceremonia que reunió a familias, docentes y autoridades de la UGC." },
  { id: 2, titulo: "Charla: El futuro del trabajo y la IA", categoria: "Charlas UGC", fecha: "10 Feb 2025", img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80", resumen: "Expertos en tecnología y recursos humanos compartieron perspectivas sobre cómo prepararse para los empleos del futuro." },
  { id: 3, titulo: "Simulacro de juicio oral en Derecho", categoria: "Clases", fecha: "28 Ene 2025", img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80", resumen: "Los alumnos de Derecho vivieron una experiencia real al participar en un simulacro de juicio oral con metodología activa." },
  { id: 4, titulo: "Feria de emprendimiento UGC 2025", categoria: "Eventos académicos", fecha: "15 Mar 2025", img: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&q=80", resumen: "Estudiantes presentaron sus proyectos de negocio ante mentores y empresarios locales en la primera feria de emprendimiento del año." },
];

const becas = [
  { tipo: "Beca de Excelencia Académica", desc: "Para estudiantes con promedio mínimo de 9.0. Cubre hasta el 30% de la colegiatura." },
  { tipo: "Beca por Referido", desc: "Si recomiendas a un amigo o familiar y se inscribe, ambos reciben un descuento especial." },
  { tipo: "Beca Empresarial", desc: "Para empleados de empresas con convenio activo con la UGC. Consulta si tu empresa está en el listado." },
  { tipo: "Beca de Continuidad", desc: "Para alumnos que mantienen buen promedio y puntualidad en pagos a lo largo de su carrera." },
];

const empresas = ["COPPEL", "CULIACÁN ROJO", "DESPACHOS JURÍDICOS ASOCIADOS", "SINALOA FRESH", "GRUPO BAFAR", "H. AYUNTAMIENTO DE CULIACÁN", "FENIX CONTADORES", "IMPORTADORA DEL PACÍFICO"];

const heroSlides = [
  { img: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1400&q=80", tag: "20 años formando líderes", title: "Tu futuro empieza aquí", sub: "Estudia sin dejar de trabajar con horarios flexibles diseñados para ti." },
  { img: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=1400&q=80", tag: "Educación accesible", title: "Calidad universitaria al alcance de todos", sub: "Licenciaturas, maestrías y doctorado con colegiaturas accesibles." },
  { img: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=1400&q=80", tag: "Campus Culiacán", title: "Un campus pensado para ti", sub: "Instalaciones modernas y un ambiente que impulsa tu desarrollo." },
  { img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1400&q=80", tag: "Comunidad UGC", title: "Forma parte de nuestra comunidad", sub: "Únete a miles de egresados que ya transformaron su vida profesional." },
];

function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUM}?text=${WHATSAPP_MSG}`}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "fixed", bottom: 24, right: 24, zIndex: 9999,
        width: 60, height: 60, borderRadius: "50%",
        background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 4px 20px rgba(37,211,102,0.5)", textDecoration: "none",
        transition: "transform 0.2s, box-shadow 0.2s",
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.1)"; e.currentTarget.style.boxShadow = "0 6px 28px rgba(37,211,102,0.65)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(37,211,102,0.5)"; }}
      title="Contactar por WhatsApp"
    >
      <svg width="32" height="32" viewBox="0 0 32 32" fill="white" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 2C8.268 2 2 8.268 2 16c0 2.46.666 4.76 1.822 6.74L2 30l7.494-1.788A13.934 13.934 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.44 11.44 0 01-5.87-1.615l-.42-.252-4.45 1.062 1.09-4.316-.276-.444A11.5 11.5 0 1116 27.5zm6.34-8.616c-.348-.174-2.06-1.016-2.38-1.132-.318-.116-.55-.174-.782.174-.232.348-.9 1.132-1.1 1.364-.202.232-.406.26-.754.086-.348-.174-1.47-.542-2.8-1.726-1.034-.924-1.732-2.064-1.934-2.412-.202-.348-.022-.536.152-.708.156-.156.348-.406.522-.608.174-.202.232-.348.348-.58.116-.232.058-.436-.028-.608-.086-.174-.782-1.886-1.072-2.582-.282-.678-.568-.586-.782-.596l-.666-.012c-.232 0-.608.086-.928.434-.318.348-1.216 1.188-1.216 2.9s1.244 3.364 1.418 3.596c.174.232 2.45 3.74 5.936 5.246.83.358 1.478.572 1.984.732.834.264 1.592.226 2.192.138.668-.1 2.06-.842 2.35-1.656.29-.814.29-1.512.202-1.656-.086-.144-.318-.232-.666-.406z"/>
      </svg>
    </a>
  );
}

function Navbar({ currentPage, setPage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { label: "Inicio", page: "home" },
    { label: "Conócenos", page: "conocenos" },
    { label: "Oferta Educativa", page: "oferta" },
    { label: "Plataforma", page: "moodle" },
    { label: "Vida Estudiantil", page: "blog" },
    { label: "Becas", page: "becas" },
    { label: "Informes", page: "informes" },
  ];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? "rgba(155,28,46,0.97)" : "rgba(155,28,46,0.92)",
      backdropFilter: "blur(12px)",
      borderBottom: scrolled ? `1px solid rgba(200,151,58,0.3)` : "none",
      transition: "all 0.3s ease",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
        <button onClick={() => setPage("home")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 42, height: 42, background: COLORS.gold, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Georgia, serif", fontWeight: 700, color: COLORS.crimsonDark, fontSize: 13 }}>UGC</div>
          <div style={{ textAlign: "left" }}>
            <div style={{ color: COLORS.white, fontWeight: 700, fontSize: 14, letterSpacing: "0.04em", fontFamily: "Georgia, serif" }}>UNIVERSIDAD DEL GOLFO</div>
            <div style={{ color: COLORS.goldLight, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase" }}>de California · Campus Culiacán</div>
          </div>
        </button>

        <div style={{ display: "flex", gap: 4, alignItems: "center" }} className="desktop-nav">
          {navItems.slice(0, -1).map(item => (
            <button key={item.page} onClick={() => setPage(item.page)} style={{
              background: "none", border: "none", cursor: "pointer",
              color: currentPage === item.page ? COLORS.goldLight : "rgba(255,255,255,0.85)",
              fontSize: 13, fontWeight: 500, padding: "6px 10px",
              borderBottom: currentPage === item.page ? `2px solid ${COLORS.gold}` : "2px solid transparent",
              transition: "all 0.2s", letterSpacing: "0.02em",
            }}
              onMouseEnter={e => { if (currentPage !== item.page) e.currentTarget.style.color = COLORS.white; }}
              onMouseLeave={e => { if (currentPage !== item.page) e.currentTarget.style.color = "rgba(255,255,255,0.85)"; }}
            >{item.label}</button>
          ))}
          <button onClick={() => setPage("informes")} style={{
            marginLeft: 8, background: COLORS.gold, border: "none", cursor: "pointer",
            color: COLORS.crimsonDark, fontSize: 13, fontWeight: 700, padding: "8px 20px",
            borderRadius: 4, letterSpacing: "0.03em", transition: "background 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.background = COLORS.goldLight}
            onMouseLeave={e => e.currentTarget.style.background = COLORS.gold}
          >Solicitar Informes</button>
        </div>

        <button onClick={() => setMenuOpen(!menuOpen)} style={{ display: "none", background: "none", border: "none", cursor: "pointer", color: COLORS.white, fontSize: 24 }} className="mobile-menu-btn">☰</button>
      </div>

      {menuOpen && (
        <div style={{ background: COLORS.crimsonDark, padding: "16px 24px 24px" }}>
          {navItems.map(item => (
            <button key={item.page} onClick={() => { setPage(item.page); setMenuOpen(false); }} style={{
              display: "block", width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer",
              color: COLORS.white, fontSize: 15, padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.1)",
            }}>{item.label}</button>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 900px) { .desktop-nav { display: none !important; } .mobile-menu-btn { display: block !important; } }
      `}</style>
    </nav>
  );
}

function Hero({ setPage }) {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setFade(false);
      setTimeout(() => { setCurrent(c => (c + 1) % heroSlides.length); setFade(true); }, 400);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  const slide = heroSlides[current];

  return (
    <div style={{ position: "relative", height: "100vh", minHeight: 600, overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${slide.img})`, backgroundSize: "cover", backgroundPosition: "center", transition: "opacity 0.5s ease", opacity: fade ? 1 : 0 }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(107,16,32,0.85) 0%, rgba(26,23,20,0.65) 100%)" }} />

      <div style={{ position: "relative", zIndex: 2, height: "100%", display: "flex", alignItems: "center", maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ maxWidth: 640, transition: "opacity 0.4s ease", opacity: fade ? 1 : 0 }}>
          <div style={{ display: "inline-block", background: COLORS.gold, color: COLORS.crimsonDark, fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", padding: "6px 16px", borderRadius: 2, marginBottom: 24 }}>
            {slide.tag}
          </div>
          <h1 style={{ color: COLORS.white, fontSize: "clamp(36px, 5vw, 64px)", fontFamily: "Georgia, serif", fontWeight: 700, lineHeight: 1.1, marginBottom: 20 }}>
            {slide.title}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.88)", fontSize: 20, lineHeight: 1.6, marginBottom: 36 }}>{slide.sub}</p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <button onClick={() => setPage("informes")} style={{ background: COLORS.gold, color: COLORS.crimsonDark, border: "none", cursor: "pointer", fontSize: 15, fontWeight: 700, padding: "14px 32px", borderRadius: 4, letterSpacing: "0.03em", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.background = COLORS.goldLight; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = COLORS.gold; e.currentTarget.style.transform = "translateY(0)"; }}
            >Solicitar Informes →</button>
            <button onClick={() => setPage("oferta")} style={{ background: "transparent", color: COLORS.white, border: `2px solid rgba(255,255,255,0.6)`, cursor: "pointer", fontSize: 15, fontWeight: 600, padding: "14px 32px", borderRadius: 4, transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = COLORS.white; e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.6)"; e.currentTarget.style.background = "transparent"; }}
            >Ver Carreras</button>
          </div>
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 8, zIndex: 2 }}>
        {heroSlides.map((_, i) => (
          <button key={i} onClick={() => { setFade(false); setTimeout(() => { setCurrent(i); setFade(true); }, 300); }}
            style={{ width: i === current ? 28 : 8, height: 8, borderRadius: 4, background: i === current ? COLORS.gold : "rgba(255,255,255,0.4)", border: "none", cursor: "pointer", transition: "all 0.3s", padding: 0 }} />
        ))}
      </div>

      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80, background: "linear-gradient(to top, rgba(250,249,247,1), transparent)" }} />
    </div>
  );
}

function StatsBar() {
  const stats = [
    { num: "20+", label: "Años de trayectoria" },
    { num: "5,000+", label: "Egresados exitosos" },
    { num: "7", label: "Programas académicos" },
    { num: "2", label: "Planteles en México" },
  ];
  return (
    <div style={{ background: COLORS.crimson, padding: "40px 24px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 32, textAlign: "center" }}>
        {stats.map(s => (
          <div key={s.num}>
            <div style={{ fontSize: 40, fontWeight: 700, color: COLORS.gold, fontFamily: "Georgia, serif", lineHeight: 1 }}>{s.num}</div>
            <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 14, marginTop: 6, letterSpacing: "0.03em" }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionTitle({ tag, title, sub, light }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 56 }}>
      {tag && <div style={{ display: "inline-block", color: COLORS.crimson, fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 12, borderBottom: `2px solid ${COLORS.gold}`, paddingBottom: 4 }}>{tag}</div>}
      <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontFamily: "Georgia, serif", color: light ? COLORS.white : COLORS.text, fontWeight: 700, lineHeight: 1.2, marginBottom: sub ? 16 : 0 }}>{title}</h2>
      {sub && <p style={{ color: light ? "rgba(255,255,255,0.75)" : COLORS.gray, fontSize: 18, maxWidth: 600, margin: "0 auto", lineHeight: 1.6 }}>{sub}</p>}
    </div>
  );
}

function CarreraCard({ carrera, setPage, setSelectedCarrera }) {
  const [hovered, setHovered] = useState(false);
  const isPosgrado = carrera.nivel !== "Licenciatura";
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: COLORS.white, borderRadius: 8, overflow: "hidden",
        border: `1px solid ${hovered ? COLORS.crimson : "#E8E4DF"}`,
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered ? `0 16px 48px rgba(155,28,46,0.15)` : "0 2px 12px rgba(0,0,0,0.06)",
        transition: "all 0.3s ease", cursor: "pointer",
      }}
      onClick={() => { setSelectedCarrera(carrera); setPage("carrera"); }}
    >
      <div style={{ background: isPosgrado ? COLORS.crimsonDark : COLORS.crimson, padding: "28px 24px 20px", position: "relative" }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>{carrera.icono}</div>
        <div style={{ display: "inline-block", background: isPosgrado ? COLORS.gold : "rgba(255,255,255,0.2)", color: isPosgrado ? COLORS.crimsonDark : COLORS.white, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "4px 12px", borderRadius: 2, marginBottom: 12 }}>{carrera.nivel}</div>
        <h3 style={{ color: COLORS.white, fontSize: 20, fontFamily: "Georgia, serif", fontWeight: 700, lineHeight: 1.2, margin: 0 }}>{carrera.nombre}</h3>
        <div style={{ color: COLORS.gold, fontSize: 12, fontWeight: 700, marginTop: 4 }}>{carrera.code}</div>
      </div>
      <div style={{ padding: "20px 24px 24px" }}>
        <p style={{ color: COLORS.gray, fontSize: 14, lineHeight: 1.65, marginBottom: 16 }}>{carrera.desc}</p>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 20 }}>
          <span style={{ fontSize: 12, color: COLORS.grayDark }}><strong>Duración:</strong> {carrera.duracion}</span>
          <span style={{ fontSize: 12, color: COLORS.grayDark }}><strong>Modalidad:</strong> {carrera.modalidad}</span>
        </div>
        <div style={{ color: COLORS.crimson, fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>Ver programa →</div>
      </div>
    </div>
  );
}

function LeadForm({ titulo = "Solicita informes sin compromiso", compact = false }) {
  const [form, setForm] = useState({ nombre: "", telefono: "", correo: "", carrera: "" });
  const [sent, setSent] = useState(false);

  const inputStyle = { width: "100%", padding: "12px 16px", borderRadius: 4, border: "1px solid #D8D4CE", fontSize: 14, background: COLORS.white, color: COLORS.text, boxSizing: "border-box", outline: "none", transition: "border 0.2s" };

  return sent ? (
    <div style={{ textAlign: "center", padding: "40px 24px" }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
      <h3 style={{ fontFamily: "Georgia, serif", color: COLORS.crimson, fontSize: 24, marginBottom: 12 }}>¡Gracias por contactarnos!</h3>
      <p style={{ color: COLORS.gray }}>Un asesor educativo se comunicará contigo en menos de 24 horas.</p>
    </div>
  ) : (
    <div style={{ background: COLORS.white, borderRadius: 8, padding: compact ? "28px 24px" : "40px 36px", border: "1px solid #E8E4DF", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
      {!compact && <h3 style={{ fontFamily: "Georgia, serif", color: COLORS.crimson, fontSize: 22, marginBottom: 8 }}>{titulo}</h3>}
      {!compact && <p style={{ color: COLORS.gray, marginBottom: 24, fontSize: 14 }}>Completa el formulario y te contactaremos a la brevedad.</p>}
      <div style={{ display: "grid", gridTemplateColumns: compact ? "1fr" : "1fr 1fr", gap: 16 }}>
        {[["nombre", "Nombre completo", "text"], ["telefono", "Teléfono / WhatsApp", "tel"], ["correo", "Correo electrónico", "email"]].map(([k, label, type]) => (
          <div key={k} style={{ gridColumn: k === "nombre" && !compact ? "1 / -1" : undefined }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: COLORS.grayDark, letterSpacing: "0.06em", marginBottom: 6, textTransform: "uppercase" }}>{label}</label>
            <input type={type} value={form[k]} onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))}
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = COLORS.crimson}
              onBlur={e => e.target.style.borderColor = "#D8D4CE"}
            />
          </div>
        ))}
        <div style={{ gridColumn: "1 / -1" }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: COLORS.grayDark, letterSpacing: "0.06em", marginBottom: 6, textTransform: "uppercase" }}>Carrera de interés</label>
          <select value={form.carrera} onChange={e => setForm(f => ({ ...f, carrera: e.target.value }))}
            style={{ ...inputStyle, background: COLORS.white }}
            onFocus={e => e.target.style.borderColor = COLORS.crimson}
            onBlur={e => e.target.style.borderColor = "#D8D4CE"}
          >
            <option value="">Selecciona una carrera...</option>
            {carreras.map(c => <option key={c.code} value={c.code}>{c.nombre} ({c.code})</option>)}
          </select>
        </div>
      </div>
      <button onClick={() => { if (form.nombre && form.correo) setSent(true); }}
        style={{ marginTop: 20, width: "100%", background: COLORS.crimson, color: COLORS.white, border: "none", borderRadius: 4, padding: "14px", fontSize: 15, fontWeight: 700, cursor: "pointer", letterSpacing: "0.03em", transition: "background 0.2s" }}
        onMouseEnter={e => e.currentTarget.style.background = COLORS.crimsonDark}
        onMouseLeave={e => e.currentTarget.style.background = COLORS.crimson}
      >Quiero recibir informes →</button>
      <p style={{ textAlign: "center", fontSize: 12, color: COLORS.gray, marginTop: 12 }}>🔒 Tu información está segura. No compartimos tus datos.</p>
    </div>
  );
}

function HomePage({ setPage, setSelectedCarrera }) {
  return (
    <div>
      <Hero setPage={setPage} />
      <StatsBar />

      {/* Conócenos preview */}
      <section style={{ padding: "96px 24px", background: COLORS.offWhite }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          <div>
            <SectionTitle tag="Quiénes somos" title="Educación que transforma vidas desde 2004" />
            <p style={{ color: COLORS.gray, fontSize: 16, lineHeight: 1.8, marginBottom: 24 }}>
              La Universidad del Golfo de California nació con una misión clara: democratizar el acceso a la educación superior de calidad en el noroeste de México. Hoy, con más de 20 años de historia y presencia en Culiacán y Los Cabos, somos una institución comprometida con el éxito de cada uno de nuestros estudiantes.
            </p>
            <p style={{ color: COLORS.gray, fontSize: 16, lineHeight: 1.8, marginBottom: 32 }}>
              Nuestros horarios flexibles están diseñados especialmente para personas que trabajan, emprendedores y madres y padres de familia que no quieren poner su desarrollo profesional en pausa.
            </p>
            <button onClick={() => setPage("conocenos")} style={{ background: COLORS.crimson, color: COLORS.white, border: "none", cursor: "pointer", padding: "12px 28px", borderRadius: 4, fontSize: 14, fontWeight: 700, letterSpacing: "0.03em", transition: "background 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.background = COLORS.crimsonDark}
              onMouseLeave={e => e.currentTarget.style.background = COLORS.crimson}
            >Conocer más →</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
              { icon: "🎓", title: "Horarios flexibles", desc: "Clases en horario vespertino y sabatino para que puedas trabajar." },
              { icon: "💰", title: "Costo accesible", desc: "Colegiaturas competitivas con opciones de becas y financiamiento." },
              { icon: "📍", title: "Excelente ubicación", desc: "Campus en zonas estratégicas y accesibles de Culiacán." },
              { icon: "🏆", title: "Reconocimiento oficial", desc: "Planes de estudio con validez oficial ante la SEP y RVOE." },
            ].map(item => (
              <div key={item.title} style={{ background: COLORS.white, borderRadius: 8, padding: "24px 20px", border: "1px solid #E8E4DF" }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{item.icon}</div>
                <div style={{ fontWeight: 700, color: COLORS.text, fontSize: 14, marginBottom: 6 }}>{item.title}</div>
                <div style={{ color: COLORS.gray, fontSize: 13, lineHeight: 1.5 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Oferta educativa */}
      <section style={{ padding: "96px 24px", background: COLORS.grayLight }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionTitle tag="Oferta Educativa" title="Encuentra tu camino académico" sub="Programas diseñados para el mundo profesional actual, con enfoque práctico y docentes con experiencia real." />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
            {carreras.map(c => <CarreraCard key={c.code} carrera={c} setPage={setPage} setSelectedCarrera={setSelectedCarrera} />)}
          </div>
          <div style={{ textAlign: "center", marginTop: 48 }}>
            <button onClick={() => setPage("oferta")} style={{ background: COLORS.crimson, color: COLORS.white, border: "none", cursor: "pointer", padding: "14px 36px", borderRadius: 4, fontSize: 15, fontWeight: 700, transition: "background 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.background = COLORS.crimsonDark}
              onMouseLeave={e => e.currentTarget.style.background = COLORS.crimson}
            >Ver todos los programas →</button>
          </div>
        </div>
      </section>

      {/* Moodle CTA */}
      <section style={{ padding: "72px 24px", background: COLORS.crimsonDark }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>💻</div>
          <h2 style={{ color: COLORS.white, fontFamily: "Georgia, serif", fontSize: 36, marginBottom: 16 }}>Acceso a Plataforma Educativa</h2>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 18, marginBottom: 32 }}>Estudiantes UGC: accede a tus materiales, tareas y calificaciones en nuestra plataforma Moodle.</p>
          <a href={MOODLE_URL} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", background: COLORS.gold, color: COLORS.crimsonDark, padding: "14px 36px", borderRadius: 4, fontWeight: 700, fontSize: 15, textDecoration: "none", letterSpacing: "0.03em", transition: "background 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.background = COLORS.goldLight}
            onMouseLeave={e => e.currentTarget.style.background = COLORS.gold}
          >Ingresar a Moodle →</a>
        </div>
      </section>

      {/* Blog preview */}
      <section style={{ padding: "96px 24px", background: COLORS.offWhite }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionTitle tag="Vida Estudiantil" title="Lo que está pasando en la UGC" sub="Eventos, charlas y momentos que hacen grande a nuestra comunidad universitaria." />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 24 }}>
            {blogPosts.map(post => (
              <div key={post.id} style={{ background: COLORS.white, borderRadius: 8, overflow: "hidden", border: "1px solid #E8E4DF", transition: "transform 0.2s, box-shadow 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 36px rgba(0,0,0,0.1)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ height: 180, backgroundImage: `url(${post.img})`, backgroundSize: "cover", backgroundPosition: "center", position: "relative" }}>
                  <span style={{ position: "absolute", top: 12, left: 12, background: COLORS.crimson, color: COLORS.white, fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 2 }}>{post.categoria}</span>
                </div>
                <div style={{ padding: "20px" }}>
                  <div style={{ color: COLORS.gray, fontSize: 12, marginBottom: 8 }}>{post.fecha}</div>
                  <h4 style={{ color: COLORS.text, fontSize: 15, fontWeight: 700, lineHeight: 1.4, marginBottom: 8 }}>{post.titulo}</h4>
                  <p style={{ color: COLORS.gray, fontSize: 13, lineHeight: 1.6 }}>{post.resumen}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <button onClick={() => setPage("blog")} style={{ border: `2px solid ${COLORS.crimson}`, background: "transparent", color: COLORS.crimson, cursor: "pointer", padding: "12px 28px", borderRadius: 4, fontSize: 14, fontWeight: 700, transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.background = COLORS.crimson; e.currentTarget.style.color = COLORS.white; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = COLORS.crimson; }}
            >Ver todas las publicaciones →</button>
          </div>
        </div>
      </section>

      {/* Becas preview */}
      <section style={{ padding: "96px 24px", background: COLORS.grayLight }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          <div>
            <SectionTitle tag="Apoyos y Becas" title="Estudiar sí es posible" />
            <p style={{ color: COLORS.gray, fontSize: 16, lineHeight: 1.8, marginBottom: 24 }}>En la UGC creemos que ningún talento debe quedarse sin educación por razones económicas. Por eso contamos con diversas opciones de apoyo para nuestros estudiantes.</p>
            <button onClick={() => setPage("becas")} style={{ background: COLORS.gold, color: COLORS.crimsonDark, border: "none", cursor: "pointer", padding: "12px 28px", borderRadius: 4, fontSize: 14, fontWeight: 700, transition: "background 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.background = COLORS.goldLight}
              onMouseLeave={e => e.currentTarget.style.background = COLORS.gold}
            >Conocer apoyos →</button>
          </div>
          <div style={{ display: "grid", gap: 16 }}>
            {becas.slice(0, 3).map(b => (
              <div key={b.tipo} style={{ background: COLORS.white, borderRadius: 6, padding: "18px 20px", borderLeft: `4px solid ${COLORS.gold}` }}>
                <div style={{ fontWeight: 700, color: COLORS.text, fontSize: 14, marginBottom: 4 }}>{b.tipo}</div>
                <div style={{ color: COLORS.gray, fontSize: 13 }}>{b.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section style={{ padding: "96px 24px", background: COLORS.crimson, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -40, right: -40, width: 300, height: 300, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
        <div style={{ position: "absolute", bottom: -60, left: -60, width: 250, height: 250, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", position: "relative" }}>
          <h2 style={{ color: COLORS.white, fontFamily: "Georgia, serif", fontSize: "clamp(28px, 4vw, 48px)", marginBottom: 20, lineHeight: 1.2 }}>¿Listo para dar el siguiente paso?</h2>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 20, marginBottom: 40, lineHeight: 1.6 }}>Habla con un asesor hoy mismo. Sin compromiso, con toda la información que necesitas para tomar la mejor decisión de tu vida.</p>
          <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => setPage("informes")} style={{ background: COLORS.gold, color: COLORS.crimsonDark, border: "none", cursor: "pointer", padding: "16px 40px", borderRadius: 4, fontSize: 16, fontWeight: 700, letterSpacing: "0.03em", transition: "all 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.background = COLORS.goldLight}
              onMouseLeave={e => e.currentTarget.style.background = COLORS.gold}
            >Solicitar Informes →</button>
            <a href={`https://wa.me/${WHATSAPP_NUM}?text=${WHATSAPP_MSG}`} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.15)", color: COLORS.white, border: `2px solid rgba(255,255,255,0.5)`, padding: "16px 32px", borderRadius: 4, fontSize: 16, fontWeight: 700, textDecoration: "none", transition: "all 0.2s" }}>💬 WhatsApp</a>
          </div>
        </div>
      </section>

      <Footer setPage={setPage} />
    </div>
  );
}

function ConocenosPage({ setPage }) {
  return (
    <div style={{ paddingTop: 72 }}>
      <div style={{ background: COLORS.crimson, padding: "80px 24px 60px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <h1 style={{ color: COLORS.white, fontFamily: "Georgia, serif", fontSize: "clamp(32px, 5vw, 52px)", marginBottom: 16 }}>Conócenos</h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 18, lineHeight: 1.6 }}>20 años construyendo el futuro de México desde Sinaloa</p>
        </div>
      </div>

      <section style={{ padding: "80px 24px", background: COLORS.offWhite }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}>
          <div>
            <h2 style={{ fontFamily: "Georgia, serif", color: COLORS.crimson, fontSize: 32, marginBottom: 20 }}>Quiénes somos</h2>
            <p style={{ color: COLORS.gray, fontSize: 16, lineHeight: 1.8, marginBottom: 16 }}>La Universidad del Golfo de California (UGC) es una institución de educación superior privada fundada en 2004 con el firme propósito de ofrecer educación universitaria de calidad a personas que, por sus circunstancias laborales o familiares, no podían acceder a ella en los esquemas tradicionales.</p>
            <p style={{ color: COLORS.gray, fontSize: 16, lineHeight: 1.8, marginBottom: 16 }}>Contamos con RVOE (Reconocimiento de Validez Oficial de Estudios) ante la Secretaría de Educación Pública, lo que garantiza que los títulos y grados que otorgamos tienen plena validez oficial en México.</p>
            <p style={{ color: COLORS.gray, fontSize: 16, lineHeight: 1.8 }}>Hoy operamos con dos planteles: Campus Culiacán y Campus Los Cabos, con una comunidad de más de 5,000 egresados que ejercen su profesión en todo el país.</p>
          </div>
          <div>
            <div style={{ background: COLORS.crimson, borderRadius: 8, padding: "36px 32px", marginBottom: 24 }}>
              <h3 style={{ color: COLORS.gold, fontFamily: "Georgia, serif", fontSize: 22, marginBottom: 12 }}>Misión</h3>
              <p style={{ color: "rgba(255,255,255,0.88)", fontSize: 15, lineHeight: 1.7 }}>Formar profesionales íntegros, críticos y competentes, con valores humanistas y compromiso social, capaces de transformar positivamente su entorno mediante una educación superior accesible, flexible y de alta calidad.</p>
            </div>
            <div style={{ background: COLORS.crimsonDark, borderRadius: 8, padding: "36px 32px" }}>
              <h3 style={{ color: COLORS.gold, fontFamily: "Georgia, serif", fontSize: 22, marginBottom: 12 }}>Visión</h3>
              <p style={{ color: "rgba(255,255,255,0.88)", fontSize: 15, lineHeight: 1.7 }}>Ser la universidad privada de referencia en el noroeste de México, reconocida por su excelencia académica, innovación educativa y el impacto positivo de sus egresados en la sociedad y el sector productivo.</p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: "80px 24px", background: COLORS.grayLight }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <SectionTitle tag="Nuestra historia" title="20 años de crecimiento y compromiso" />
          <div style={{ position: "relative" }}>
            {[
              { year: "2004", texto: "Fundación de la UGC en Culiacán, Sinaloa. Inicio de operaciones con dos licenciaturas y 80 alumnos pioneros." },
              { year: "2008", texto: "Ampliación de la oferta educativa con nuevas licenciaturas. Construcción de instalaciones propias." },
              { year: "2012", texto: "Apertura del Campus Los Cabos. La UGC crece para servir al norte de Baja California Sur." },
              { year: "2018", texto: "Lanzamiento de los programas de posgrado: Maestría en Educación y Docencia." },
              { year: "2023", texto: "Inauguración del Doctorado en Transformación Disruptiva con IA, el primero de su tipo en la región." },
              { year: "2024", texto: "Celebración de 20 años formando profesionistas. Más de 5,000 egresados en todo México." },
            ].map((hito, i) => (
              <div key={hito.year} style={{ display: "flex", gap: 24, marginBottom: 32 }}>
                <div style={{ flexShrink: 0, width: 80, textAlign: "right" }}>
                  <span style={{ background: COLORS.crimson, color: COLORS.white, fontWeight: 700, fontSize: 13, padding: "4px 10px", borderRadius: 4 }}>{hito.year}</span>
                </div>
                <div style={{ borderLeft: `2px solid ${COLORS.gold}`, paddingLeft: 24, paddingBottom: 16 }}>
                  <p style={{ color: COLORS.grayDark, fontSize: 15, lineHeight: 1.6 }}>{hito.texto}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "80px 24px", background: COLORS.offWhite }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <SectionTitle tag="Instalaciones" title="Nuestros planteles" sub="Dos campus con infraestructura moderna diseñada para el aprendizaje y la convivencia." />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
            {[
              { ciudad: "Campus Culiacán", img: "https://images.unsplash.com/photo-1562774053-701939374585?w=700&q=80", desc: "Nuestro campus principal, ubicado en Culiacán, Sinaloa. Cuenta con aulas modernas, biblioteca, sala de cómputo, área de posgrado y espacios de convivencia. Acceso en transporte público desde toda la ciudad.", features: ["Aulas climatizadas", "Biblioteca y sala de lectura", "Laboratorio de cómputo", "Cafetería", "Estacionamiento"] },
              { ciudad: "Campus Los Cabos", img: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=700&q=80", desc: "Con presencia en Los Cabos, Baja California Sur, llevamos la misma calidad académica a uno de los polos de desarrollo económico más importantes del país.", features: ["Instalaciones modernas", "Programas presenciales y mixtos", "Acceso a plataforma en línea", "Asesoría académica personalizada", "Vinculación empresarial local"] },
            ].map(plantel => (
              <div key={plantel.ciudad} style={{ background: COLORS.white, borderRadius: 8, overflow: "hidden", border: "1px solid #E8E4DF" }}>
                <div style={{ height: 220, backgroundImage: `url(${plantel.img})`, backgroundSize: "cover", backgroundPosition: "center" }} />
                <div style={{ padding: "28px 24px" }}>
                  <h3 style={{ fontFamily: "Georgia, serif", color: COLORS.crimson, fontSize: 22, marginBottom: 12 }}>{plantel.ciudad}</h3>
                  <p style={{ color: COLORS.gray, fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>{plantel.desc}</p>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {plantel.features.map(f => <li key={f} style={{ color: COLORS.grayDark, fontSize: 13, padding: "4px 0", paddingLeft: 20, position: "relative" }}>
                      <span style={{ position: "absolute", left: 0, color: COLORS.gold, fontWeight: 700 }}>✓</span>{f}
                    </li>)}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer setPage={setPage} />
    </div>
  );
}

function OfertaPage({ setPage, setSelectedCarrera }) {
  const licenciaturas = carreras.filter(c => c.nivel === "Licenciatura");
  const posgrados = carreras.filter(c => c.nivel !== "Licenciatura");
  return (
    <div style={{ paddingTop: 72 }}>
      <div style={{ background: COLORS.crimson, padding: "80px 24px 60px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <h1 style={{ color: COLORS.white, fontFamily: "Georgia, serif", fontSize: "clamp(32px, 5vw, 52px)", marginBottom: 16 }}>Oferta Educativa</h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 18, lineHeight: 1.6 }}>Programas diseñados para el mundo profesional actual</p>
        </div>
      </div>
      <section style={{ padding: "80px 24px", background: COLORS.offWhite }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionTitle tag="Licenciaturas" title="Programas de Pregrado" sub="Cinco licenciaturas con horarios flexibles para que puedas estudiar sin dejar de trabajar." />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24, marginBottom: 80 }}>
            {licenciaturas.map(c => <CarreraCard key={c.code} carrera={c} setPage={setPage} setSelectedCarrera={setSelectedCarrera} />)}
          </div>
          <SectionTitle tag="Posgrados" title="Maestría y Doctorado" sub="Eleva tu nivel académico y profesional con nuestros programas de posgrado." />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
            {posgrados.map(c => <CarreraCard key={c.code} carrera={c} setPage={setPage} setSelectedCarrera={setSelectedCarrera} />)}
          </div>
        </div>
      </section>
      <Footer setPage={setPage} />
    </div>
  );
}

function CarreraPage({ carrera, setPage }) {
  if (!carrera) return null;
  return (
    <div style={{ paddingTop: 72 }}>
      <div style={{ background: carrera.nivel === "Licenciatura" ? COLORS.crimson : COLORS.crimsonDark, padding: "80px 24px 60px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <button onClick={() => setPage("oferta")} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.7)", cursor: "pointer", fontSize: 14, marginBottom: 24, padding: 0 }}>← Volver a Oferta Educativa</button>
          <div style={{ display: "inline-block", background: COLORS.gold, color: COLORS.crimsonDark, fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", padding: "4px 14px", borderRadius: 2, marginBottom: 16 }}>{carrera.nivel} · {carrera.code}</div>
          <h1 style={{ color: COLORS.white, fontFamily: "Georgia, serif", fontSize: "clamp(28px, 4vw, 48px)", marginBottom: 16 }}>{carrera.nombre}</h1>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 18, lineHeight: 1.6 }}>{carrera.desc}</p>
        </div>
      </div>
      <section style={{ padding: "80px 24px", background: COLORS.offWhite }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "2fr 1fr", gap: 48 }}>
          <div>
            <h2 style={{ fontFamily: "Georgia, serif", color: COLORS.crimson, fontSize: 28, marginBottom: 20 }}>Sobre el programa</h2>
            <p style={{ color: COLORS.gray, fontSize: 16, lineHeight: 1.8, marginBottom: 24 }}>{carrera.desc} Este programa está diseñado para formar profesionales competentes, críticos y con habilidades prácticas que el mercado laboral actual exige.</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 32 }}>
              {[["Duración", carrera.duracion], ["Modalidad", carrera.modalidad], ["Nivel", carrera.nivel], ["Reconocimiento", "RVOE-SEP"]].map(([k, v]) => (
                <div key={k} style={{ background: COLORS.white, borderRadius: 6, padding: "16px", border: "1px solid #E8E4DF" }}>
                  <div style={{ color: COLORS.gray, fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>{k}</div>
                  <div style={{ color: COLORS.text, fontSize: 15, fontWeight: 700 }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{ background: COLORS.grayLight, borderRadius: 8, padding: "24px", marginBottom: 24 }}>
              <h3 style={{ color: COLORS.text, fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Perfil de egreso</h3>
              <p style={{ color: COLORS.gray, fontSize: 15, lineHeight: 1.7 }}>Nuestros egresados son profesionales con sólida formación teórica y práctica, capaces de adaptarse a los cambios del entorno laboral, tomar decisiones fundamentadas y contribuir al desarrollo de las organizaciones y la sociedad.</p>
            </div>
            <button style={{ background: COLORS.grayDark, color: COLORS.white, border: "none", cursor: "pointer", padding: "12px 24px", borderRadius: 4, fontSize: 14, fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}>📄 Descargar Plan de Estudios (PDF)</button>
          </div>
          <div>
            <LeadForm titulo="¿Te interesa este programa?" compact />
          </div>
        </div>
      </section>
      <Footer setPage={setPage} />
    </div>
  );
}

function MoodlePage({ setPage }) {
  return (
    <div style={{ paddingTop: 72 }}>
      <div style={{ background: COLORS.crimsonDark, padding: "80px 24px 60px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>💻</div>
          <h1 style={{ color: COLORS.white, fontFamily: "Georgia, serif", fontSize: "clamp(28px, 4vw, 48px)", marginBottom: 16 }}>Plataforma Educativa Moodle</h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 18, lineHeight: 1.6 }}>Tu aula virtual disponible las 24 horas, los 7 días de la semana.</p>
        </div>
      </div>
      <section style={{ padding: "80px 24px", background: COLORS.offWhite }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <p style={{ color: COLORS.gray, fontSize: 16, lineHeight: 1.8, marginBottom: 40 }}>La UGC utiliza Moodle, la plataforma de aprendizaje en línea más utilizada en el mundo, para que puedas acceder a tus materiales de clase, entregar tareas, participar en foros y consultar tus calificaciones desde cualquier dispositivo.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20, marginBottom: 48 }}>
            {[["📚", "Materiales de clase", "Descarga presentaciones, lecturas y recursos de cada materia."], ["✅", "Tareas y entregas", "Sube tus trabajos y recibe retroalimentación en línea."], ["💬", "Foros de discusión", "Interactúa con tus compañeros y docentes."], ["📊", "Calificaciones", "Consulta tu avance académico en tiempo real."]].map(([icon, title, desc]) => (
              <div key={title} style={{ background: COLORS.white, borderRadius: 8, padding: "24px 20px", border: "1px solid #E8E4DF" }}>
                <div style={{ fontSize: 32, marginBottom: 10 }}>{icon}</div>
                <div style={{ fontWeight: 700, color: COLORS.text, fontSize: 14, marginBottom: 6 }}>{title}</div>
                <div style={{ color: COLORS.gray, fontSize: 13, lineHeight: 1.5 }}>{desc}</div>
              </div>
            ))}
          </div>
          <a href={MOODLE_URL} target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-block", background: COLORS.crimson, color: COLORS.white, padding: "16px 48px", borderRadius: 4, fontWeight: 700, fontSize: 16, textDecoration: "none", letterSpacing: "0.03em", transition: "background 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.background = COLORS.crimsonDark}
            onMouseLeave={e => e.currentTarget.style.background = COLORS.crimson}
          >Ingresar a la plataforma →</a>
          <p style={{ color: COLORS.gray, fontSize: 13, marginTop: 16 }}>¿Problemas para ingresar? Contáctanos por WhatsApp y te ayudamos.</p>
        </div>
      </section>
      <Footer setPage={setPage} />
    </div>
  );
}

function BlogPage({ setPage }) {
  const [cat, setCat] = useState("Todas");
  const cats = ["Todas", "Clases", "Eventos académicos", "Charlas UGC", "Graduaciones"];
  const filtered = cat === "Todas" ? blogPosts : blogPosts.filter(p => p.categoria === cat);
  return (
    <div style={{ paddingTop: 72 }}>
      <div style={{ background: COLORS.crimson, padding: "80px 24px 60px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <h1 style={{ color: COLORS.white, fontFamily: "Georgia, serif", fontSize: "clamp(32px, 5vw, 52px)", marginBottom: 16 }}>Vida Estudiantil</h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 18 }}>Noticias, eventos y momentos de nuestra comunidad universitaria</p>
        </div>
      </div>
      <section style={{ padding: "80px 24px", background: COLORS.offWhite }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginBottom: 48 }}>
            {cats.map(c => (
              <button key={c} onClick={() => setCat(c)} style={{ background: cat === c ? COLORS.crimson : "transparent", color: cat === c ? COLORS.white : COLORS.grayDark, border: `1px solid ${cat === c ? COLORS.crimson : "#D8D4CE"}`, cursor: "pointer", padding: "8px 20px", borderRadius: 20, fontSize: 13, fontWeight: 600, transition: "all 0.2s" }}>{c}</button>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 28 }}>
            {filtered.map(post => (
              <div key={post.id} style={{ background: COLORS.white, borderRadius: 8, overflow: "hidden", border: "1px solid #E8E4DF", transition: "transform 0.2s, box-shadow 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 36px rgba(0,0,0,0.1)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ height: 200, backgroundImage: `url(${post.img})`, backgroundSize: "cover", backgroundPosition: "center", position: "relative" }}>
                  <span style={{ position: "absolute", top: 12, left: 12, background: COLORS.crimson, color: COLORS.white, fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 2 }}>{post.categoria}</span>
                </div>
                <div style={{ padding: "24px" }}>
                  <div style={{ color: COLORS.gray, fontSize: 12, marginBottom: 10 }}>{post.fecha}</div>
                  <h3 style={{ color: COLORS.text, fontSize: 16, fontWeight: 700, lineHeight: 1.4, marginBottom: 10 }}>{post.titulo}</h3>
                  <p style={{ color: COLORS.gray, fontSize: 14, lineHeight: 1.6 }}>{post.resumen}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer setPage={setPage} />
    </div>
  );
}

function BecasPage({ setPage }) {
  return (
    <div style={{ paddingTop: 72 }}>
      <div style={{ background: COLORS.crimson, padding: "80px 24px 60px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <h1 style={{ color: COLORS.white, fontFamily: "Georgia, serif", fontSize: "clamp(32px, 5vw, 52px)", marginBottom: 16 }}>Apoyos y Becas</h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 18 }}>Porque ningún sueño debe quedarse sin financiamiento</p>
        </div>
      </div>
      <section style={{ padding: "80px 24px", background: COLORS.offWhite }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <SectionTitle tag="Tipos de apoyo" title="Becas disponibles en la UGC" sub="Contamos con diversas opciones para que el factor económico no sea un obstáculo." />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 24, marginBottom: 80 }}>
            {becas.map(b => (
              <div key={b.tipo} style={{ background: COLORS.white, borderRadius: 8, padding: "28px 24px", border: "1px solid #E8E4DF", borderTop: `4px solid ${COLORS.gold}` }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>🎓</div>
                <h3 style={{ color: COLORS.text, fontSize: 16, fontWeight: 700, marginBottom: 10 }}>{b.tipo}</h3>
                <p style={{ color: COLORS.gray, fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>{b.desc}</p>
                <button onClick={() => setPage("informes")} style={{ background: COLORS.crimson, color: COLORS.white, border: "none", cursor: "pointer", padding: "8px 20px", borderRadius: 4, fontSize: 13, fontWeight: 700 }}>Solicitar →</button>
              </div>
            ))}
          </div>

          <div style={{ background: COLORS.grayLight, borderRadius: 12, padding: "48px", marginBottom: 80 }}>
            <SectionTitle tag="Convenios empresariales" title="Empresas aliadas" sub="Si trabajas en alguna de estas organizaciones, puede que ya tengas acceso a descuentos especiales." />
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center" }}>
              {empresas.map(e => <div key={e} style={{ background: COLORS.white, borderRadius: 4, padding: "12px 24px", border: "1px solid #E8E4DF", fontSize: 13, fontWeight: 700, color: COLORS.grayDark }}>{e}</div>)}
            </div>
          </div>

          <div style={{ maxWidth: 640, margin: "0 auto" }}>
            <SectionTitle tag="Contacto" title="Solicita información sobre becas" />
            <LeadForm titulo="Solicita información sobre becas" />
          </div>
        </div>
      </section>
      <Footer setPage={setPage} />
    </div>
  );
}

function InformesPage({ setPage }) {
  return (
    <div style={{ paddingTop: 72 }}>
      <section style={{ background: COLORS.crimson, padding: "80px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          <div>
            <h1 style={{ color: COLORS.white, fontFamily: "Georgia, serif", fontSize: "clamp(28px, 4vw, 48px)", marginBottom: 16, lineHeight: 1.2 }}>Da el primer paso hacia tu futuro profesional</h1>
            <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 18, lineHeight: 1.7, marginBottom: 32 }}>Habla con uno de nuestros asesores educativos. Resolveremos todas tus dudas sobre carreras, costos, horarios y fechas de inicio. Sin compromiso.</p>
            <div style={{ display: "grid", gap: 16 }}>
              {[["📍", "Dirección", "Culiacán, Sinaloa (campus principal)"], ["📞", "Teléfono", "(667) 123-4567"], ["📧", "Correo", "informes@ugc.edu.mx"], ["🕐", "Horario de atención", "Lun-Vie 9:00-20:00 · Sáb 9:00-14:00"]].map(([icon, label, val]) => (
                <div key={label} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 20, flexShrink: 0, marginTop: 2 }}>{icon}</span>
                  <div>
                    <div style={{ color: COLORS.gold, fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>{label}</div>
                    <div style={{ color: COLORS.white, fontSize: 15 }}>{val}</div>
                  </div>
                </div>
              ))}
            </div>
            <a href={`https://wa.me/${WHATSAPP_NUM}?text=${WHATSAPP_MSG}`} target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 10, marginTop: 32, background: "#25D366", color: COLORS.white, padding: "14px 28px", borderRadius: 4, fontWeight: 700, fontSize: 15, textDecoration: "none", letterSpacing: "0.02em" }}>
              <svg width="20" height="20" viewBox="0 0 32 32" fill="white"><path d="M16 2C8.268 2 2 8.268 2 16c0 2.46.666 4.76 1.822 6.74L2 30l7.494-1.788A13.934 13.934 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm6.34 19.884c-.348-.174-2.06-1.016-2.38-1.132-.318-.116-.55-.174-.782.174-.232.348-.9 1.132-1.1 1.364-.202.232-.406.26-.754.086-.348-.174-1.47-.542-2.8-1.726-1.034-.924-1.732-2.064-1.934-2.412-.202-.348-.022-.536.152-.708.156-.156.348-.406.522-.608.174-.202.232-.348.348-.58.116-.232.058-.436-.028-.608-.086-.174-.782-1.886-1.072-2.582-.282-.678-.568-.586-.782-.596l-.666-.012c-.232 0-.608.086-.928.434-.318.348-1.216 1.188-1.216 2.9s1.244 3.364 1.418 3.596c.174.232 2.45 3.74 5.936 5.246.83.358 1.478.572 1.984.732.834.264 1.592.226 2.192.138.668-.1 2.06-.842 2.35-1.656.29-.814.29-1.512.202-1.656-.086-.144-.318-.232-.666-.406z"/></svg>
              Escribir por WhatsApp
            </a>
          </div>
          <div>
            <LeadForm titulo="Solicitar informes" />
          </div>
        </div>
      </section>

      <section style={{ padding: "80px 24px", background: COLORS.offWhite }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "Georgia, serif", color: COLORS.crimson, fontSize: 32, marginBottom: 16 }}>¿Por qué elegir la UGC?</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24, marginTop: 40 }}>
            {[["✅", "Validez oficial SEP"], ["🕐", "Horarios flexibles"], ["💰", "Costo accesible"], ["🎓", "Docentes con experiencia"], ["🤝", "Red de egresados"], ["💻", "Plataforma en línea"]].map(([icon, label]) => (
              <div key={label} style={{ background: COLORS.white, borderRadius: 8, padding: "24px 16px", border: "1px solid #E8E4DF", textAlign: "center" }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{icon}</div>
                <div style={{ fontWeight: 700, color: COLORS.text, fontSize: 14 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer setPage={setPage} />
    </div>
  );
}

function Footer({ setPage }) {
  return (
    <footer style={{ background: COLORS.text, color: "rgba(255,255,255,0.7)", padding: "64px 24px 32px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 48 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ width: 42, height: 42, background: COLORS.gold, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Georgia, serif", fontWeight: 700, color: COLORS.crimsonDark, fontSize: 13 }}>UGC</div>
              <div>
                <div style={{ color: COLORS.white, fontWeight: 700, fontSize: 13, fontFamily: "Georgia, serif" }}>UNIVERSIDAD DEL GOLFO DE CALIFORNIA</div>
                <div style={{ color: COLORS.gold, fontSize: 11, letterSpacing: "0.1em" }}>Campus Culiacán</div>
              </div>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.7, maxWidth: 280 }}>Educación superior de calidad, accesible y flexible. 20 años transformando vidas en el noroeste de México.</p>
            <div style={{ marginTop: 16, fontSize: 14 }}>
              <div>📞 (667) 123-4567</div>
              <div>📧 informes@ugc.edu.mx</div>
              <div>📍 Culiacán, Sinaloa</div>
            </div>
          </div>
          <div>
            <div style={{ color: COLORS.gold, fontWeight: 700, fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>Institución</div>
            {[["Conócenos", "conocenos"], ["Oferta Educativa", "oferta"], ["Becas y Apoyos", "becas"], ["Vida Estudiantil", "blog"]].map(([label, page]) => (
              <button key={page} onClick={() => setPage(page)} style={{ display: "block", background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.7)", fontSize: 14, padding: "4px 0", textAlign: "left", transition: "color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color = COLORS.white}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.7)"}
              >{label}</button>
            ))}
          </div>
          <div>
            <div style={{ color: COLORS.gold, fontWeight: 700, fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>Carreras</div>
            {carreras.slice(0, 5).map(c => (
              <div key={c.code} style={{ fontSize: 13, padding: "3px 0", color: "rgba(255,255,255,0.65)" }}>{c.code} — {c.nombre.split(" ")[0]}</div>
            ))}
          </div>
          <div>
            <div style={{ color: COLORS.gold, fontWeight: 700, fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>Accesos rápidos</div>
            <a href={MOODLE_URL} target="_blank" rel="noopener noreferrer" style={{ display: "block", color: "rgba(255,255,255,0.7)", fontSize: 14, padding: "4px 0", textDecoration: "none" }}>Plataforma Moodle</a>
            <button onClick={() => setPage("informes")} style={{ display: "block", background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.7)", fontSize: 14, padding: "4px 0", textAlign: "left" }}>Solicitar Informes</button>
            <a href={`https://wa.me/${WHATSAPP_NUM}`} target="_blank" rel="noopener noreferrer" style={{ display: "block", color: "rgba(255,255,255,0.7)", fontSize: 14, padding: "4px 0", textDecoration: "none" }}>WhatsApp</a>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 24, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, fontSize: 12 }}>
          <span>© 2025 Universidad del Golfo de California. Todos los derechos reservados.</span>
          <span>Con Reconocimiento de Validez Oficial de Estudios (RVOE) de la SEP</span>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const [selectedCarrera, setSelectedCarrera] = useState(null);

  const setPageWithScroll = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPage = () => {
    switch (page) {
      case "home": return <HomePage setPage={setPageWithScroll} setSelectedCarrera={setSelectedCarrera} />;
      case "conocenos": return <ConocenosPage setPage={setPageWithScroll} />;
      case "oferta": return <OfertaPage setPage={setPageWithScroll} setSelectedCarrera={setSelectedCarrera} />;
      case "carrera": return <CarreraPage carrera={selectedCarrera} setPage={setPageWithScroll} />;
      case "moodle": return <MoodlePage setPage={setPageWithScroll} />;
      case "blog": return <BlogPage setPage={setPageWithScroll} />;
      case "becas": return <BecasPage setPage={setPageWithScroll} />;
      case "informes": return <InformesPage setPage={setPageWithScroll} />;
      default: return <HomePage setPage={setPageWithScroll} setSelectedCarrera={setSelectedCarrera} />;
    }
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: COLORS.offWhite, minHeight: "100vh" }}>
      <Navbar currentPage={page} setPage={setPageWithScroll} />
      {renderPage()}
      <WhatsAppButton />
    </div>
  );
}
