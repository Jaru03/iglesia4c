"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Globe, Heart, HandHeart, MapPin } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const story = [
  {
    src: "/donaciones/culto.jpeg",
    chapter: "01",
    title: "Todo comienza aquí",
    text: "En nuestra comunidad cada domingo se siembra una semilla. Tu ofrenda nace de un corazón que quiere ver el mundo diferente.",
  },
  {
    src: "/donaciones/mujercaminando.jpeg",
    chapter: "02",
    title: "Alguien emprende el camino",
    text: "Hay misioneros que dejan su hogar y cruzan fronteras. Tu donativo los sostiene mientras caminan hacia donde nadie más va.",
  },
  {
    src: "/donaciones/casa.jpeg",
    chapter: "03",
    title: "Un proyecto toma forma",
    text: "Con lo recaudado construimos espacios reales: centros de atención, hogares de esperanza. Nosotros mismos llevamos la ofrenda al país.",
  },
  {
    src: "/donaciones/niñasafricanas.jpeg",
    chapter: "04",
    title: "Los rostros del cambio",
    text: "Estas niñas tienen nombre, sueños y futuro gracias a quienes decidieron dar. Cada euro recorrió miles de kilómetros para llegar aquí.",
  },
  {
    src: "/donaciones/niñosafricanos.jpeg",
    chapter: "05",
    title: "Por eso seguimos",
    text: "Esta es la razón. No hay mejor inversión que una vida transformada. Tu próxima donación ya tiene un destinatario esperándola.",
  },
];

const pillars = [
  { icon: Globe,     title: "Misioneros en Gira",   text: "Apoyamos a misioneros invitados que viajan periódicamente para recaudar fondos para sus proyectos en el campo misionero." },
  { icon: Heart,     title: "Sostenimiento Mensual", text: "Algunos misioneros reciben apoyo económico mensual para sustentarse mientras trabajan en países donde Dios los ha llamado." },
  { icon: HandHeart, title: "Proyectos de Impacto",  text: "En actividades pro misiones recaudamos para proyectos concretos, como centros de atención a niños con discapacidad." },
  { icon: MapPin,    title: "Transparencia Total",   text: "Nosotros mismos llevamos la ofrenda al país y trabajamos sobre el terreno para garantizar que llega a quien más lo necesita." },
];

export default function MisionesSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef  = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);
  const quoteRef   = useRef<HTMLQuoteElement>(null);
  const activeRef  = useRef(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const slides = gsap.utils.toArray<HTMLElement>(".ms-slide");
      const texts  = gsap.utils.toArray<HTMLElement>(".ms-text");
      const dots   = gsap.utils.toArray<HTMLElement>(".ms-dot");

      // Estado inicial: solo el primero visible
      gsap.set(slides, { autoAlpha: 0 });
      gsap.set(texts,  { autoAlpha: 0 });
      gsap.set(slides[0], { autoAlpha: 1 });
      gsap.set(texts[0],  { autoAlpha: 1, y: 0 });

      // Dots: estado inicial
      dots.forEach((d, i) => gsap.set(d, {
        scale: i === 0 ? 1.8 : 1,
        backgroundColor: i === 0 ? "#fff" : "rgba(255,255,255,0.35)",
      }));

      // ── Transición entre capítulos ──────────────────────────────────
      function goTo(next: number) {
        const prev = activeRef.current;
        if (next === prev) return;
        activeRef.current = next;

        // Cancelar animaciones en curso para evitar superposición
        slides.forEach(s => gsap.killTweensOf(s));
        texts.forEach(t => gsap.killTweensOf(t));

        // Forzar estado limpio de todos los textos e imágenes no activos
        slides.forEach((s, i) => { if (i !== next && i !== prev) gsap.set(s, { autoAlpha: 0, scale: 1 }); });
        texts.forEach((t, i)  => { if (i !== next && i !== prev) gsap.set(t, { autoAlpha: 0, y: 0 }); });

        // Imagen: fade out anterior, fade in siguiente con zoom
        gsap.to(slides[prev], { autoAlpha: 0, scale: 1.04, duration: 0.5, ease: "power2.inOut" });
        gsap.fromTo(slides[next],
          { autoAlpha: 0, scale: 1.06 },
          { autoAlpha: 1, scale: 1,    duration: 0.5, ease: "power2.inOut" }
        );

        // Texto: forzar estado inicial antes de animar para evitar flickers
        gsap.set(texts[prev], { autoAlpha: 0, y: 0 });
        gsap.set(texts[next], { autoAlpha: 0, y: 36 });
        gsap.to(texts[next],
          { autoAlpha: 1, y: 0, duration: 0.45, ease: "power3.out", delay: 0.15 }
        );

        // Dots
        dots.forEach((d, i) => gsap.to(d, {
          scale: i === next ? 1.8 : 1,
          backgroundColor: i === next ? "#fff" : "rgba(255,255,255,0.35)",
          duration: 0.35,
          ease: "power2.inOut",
        }));
      }

      // ── Entrada suave al sticky container ───────────────────────────
      gsap.fromTo(stickyRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // ── ScrollTrigger: pin + snap ────────────────────────────────────
      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: stickyRef.current,
        snap: {
          snapTo: 1 / (story.length - 1),
          duration: { min: 0.4, max: 0.65 },
          ease: "power2.inOut",
          delay: 0.05,
        },
        onUpdate(self) {
          const idx = Math.round(self.progress * (story.length - 1));
          goTo(idx);
        },
      });

      // ── Pillars ──────────────────────────────────────────────────────
      gsap.fromTo(".story-pillar",
        { autoAlpha: 0, y: 50 },
        {
          autoAlpha: 1, y: 0,
          duration: 0.7, stagger: 0.13, ease: "power3.out",
          scrollTrigger: { trigger: pillarsRef.current, start: "top 78%", toggleActions: "play none none none" },
        }
      );

      // ── Quote ────────────────────────────────────────────────────────
      gsap.fromTo(quoteRef.current,
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1, y: 0,
          duration: 1, ease: "power2.out",
          scrollTrigger: { trigger: quoteRef.current, start: "top 82%", toggleActions: "play none none none" },
        }
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ── Heading ───────────────────────────────────────────────────── */}
      <div className="py-20 bg-white px-6">
        <div className="max-w-6xl mx-auto text-center">
          <span className="inline-block text-xs font-semibold tracking-widest text-gray-900 uppercase mb-3">
            ¿A dónde va tu donativo?
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-primary-3 leading-tight mb-5">
            Cada euro llega a las<br className="hidden md:block" /> manos que más lo necesitan
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Déjate llevar por la historia de cómo tu generosidad recorre el mundo.
          </p>
        </div>
      </div>

      {/* ── Wrapper de scroll ────────────────────────────────────────────
           Altura = story.length × 100vh → espacio para snappear          */}
      <div ref={wrapperRef} style={{ height: `${story.length * 100}vh` }}>

        {/* Contenedor fijo ─ se queda pegado mientras dura el wrapper */}
        <div ref={stickyRef} className="h-screen overflow-hidden bg-black">

          {/* Imágenes apiladas */}
          {story.map((s, i) => (
            <div key={i} className="ms-slide absolute inset-0">
              <Image
                src={s.src}
                alt={s.title}
                fill
                className={`object-cover ${i === story.length - 1 ? "object-top" : "object-center"}`}
                sizes="100vw"
                priority={i === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/25 to-transparent" />
            </div>
          ))}

          {/* Textos — uno por capítulo, mismo punto de anclaje */}
          {story.map((s, i) => (
            <div
              key={i}
              className="ms-text absolute bottom-16 left-8 md:left-16 max-w-lg z-10"
            >
              <p className="text-white/45 text-xs font-mono tracking-[0.22em] uppercase mb-3">
                Capítulo {s.chapter} — {story.length.toString().padStart(2, "0")}
              </p>
              <h3 className="text-white text-3xl md:text-5xl font-bold leading-tight mb-4 drop-shadow-lg">
                {s.title}
              </h3>
              <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-sm">
                {s.text}
              </p>
            </div>
          ))}

          {/* Dots indicador — derecha */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 z-10">
            {story.map((_, i) => (
              <div
                key={i}
                className="ms-dot rounded-full"
                style={{ width: 8, height: 8, backgroundColor: "rgba(255,255,255,0.35)" }}
              />
            ))}
          </div>

          {/* Contador top-right */}
          <div className="absolute top-6 right-8 z-10 text-white/30 text-xs font-mono tracking-widest">
            {story.length} capítulos
          </div>
        </div>
      </div>

      {/* ── Pillars ──────────────────────────────────────────────────────── */}
      <div className="py-20 bg-white px-6" ref={pillarsRef}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {pillars.map(({ icon: Icon, title, text }, i) => (
              <div
                key={i}
                className="story-pillar group flex flex-col gap-4 p-6 rounded-2xl border border-gray-100 hover:border-primary-3/40 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-primary-3/10 flex items-center justify-center group-hover:bg-primary-3/20 transition-colors">
                  <Icon className="w-5 h-5 text-primary-3" />
                </div>
                <h3 className="font-semibold text-gray-900 text-base">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>

          <blockquote ref={quoteRef} className="mt-20 text-center max-w-3xl mx-auto">
            <p className="text-lg md:text-xl font-light text-gray-600 italic leading-relaxed">
              "Las misiones se sostienen en las rodillas de los que oran, los pies de los que van y las manos de los que ofrendan."
            </p>
            <cite className="block mt-4 text-sm text-gray-400 not-italic tracking-wide">
              — John R. Mott
            </cite>
          </blockquote>
        </div>
      </div>
    </>
  );
}
