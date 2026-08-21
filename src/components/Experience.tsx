"use client";

import { useState, useEffect, useRef } from "react";
import { Calendar, MapPin, Briefcase, GraduationCap, Sparkles, TrendingUp } from "lucide-react";

const timeline = [
  {
    date: "2023 — Présent",
    title: "Licence en Génie Logiciel et Base de Données",
    place: "École Nationale d'Informatique (ENI) - Fianarantsoa",
    icon: GraduationCap,
    description:
      "Formation approfondie en génie logiciel avec spécialisation en bases de données. Maîtrise des cycles de développement (Agile, Scrum), conception de systèmes d'information, modélisation UML, et administration de bases de données (MySQL, PostgreSQL, MongoDB). Projets académiques incluant le développement d'applications web full-stack et l'optimisation de requêtes SQL.",
    color: "#3b82f6",
    details: [
      "Conception et modélisation de bases de données relationnelles",
      "Développement d'applications web avec Vue.js et NestJS",
      "Administration de systèmes de gestion de bases de données",
      "Méthodologies agiles et gestion de projet"
    ]
  },
  {
    date: "2025 — 2026",
    title: "Stage Développeur Full Stack",
    place: "NextHope - Ivandry, Antananarivo",
    icon: Briefcase,
    description:
      "Développement d'une plateforme de gestion de recrutement avec intégration ERP sur Symfony. Conception et implémentation de modules personnalisés pour la gestion des candidats et des recrutements. Optimisation des performances et de la sécurité des données.",
    color: "#2563eb",
    details: [
      "Développement backend avec Symfony et PHP",
      "Intégration de modules ERP personnalisés",
      "Gestion des données et sécurité",
      "Tests unitaires et documentation technique"
    ]
  },
  {
    date: "2024 — 2025",
    title: "Projet Académique : Système de Gestion Scolaire",
    place: "ENI Fianarantsoa - Projet de fin d'année",
    icon: Briefcase,
    description:
      "Conception et développement d'un système complet de gestion scolaire avec Vue.js, NestJS et PostgreSQL. Gestion des étudiants, des notes, des emplois du temps et des paiements. Mise en place d'un tableau de bord interactif pour les administrateurs.",
    color: "#1d4ed8",
    details: [
      "Architecture microservices avec NestJS",
      "Interface utilisateur avec Vue 3 et Tailwind CSS",
      "Base de données PostgreSQL avec Prisma ORM",
      "Authentification JWT et gestion des rôles"
    ]
  }
];

export default function Experience() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Effet de parallaxe pour les particules
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      id="experiences"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0a0a0a] px-5 py-24 sm:px-8 sm:py-32 lg:px-10"
    >
      {/* ========================= */}
      {/* PARTICULES - Couleur bleue */}
      {/* ========================= */}
      
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-blue-500/20"
            style={{
              // eslint-disable-next-line react-hooks/purity
              width: Math.random() * 4 + 2 + "px",
              // eslint-disable-next-line react-hooks/purity
              height: Math.random() * 4 + 2 + "px",
              // eslint-disable-next-line react-hooks/purity
              left: Math.random() * 100 + "%",
              // eslint-disable-next-line react-hooks/purity
              top: Math.random() * 100 + "%",
              // eslint-disable-next-line react-hooks/purity
              animation: `float ${Math.random() * 6 + 4}s ease-in-out infinite`,
              // eslint-disable-next-line react-hooks/purity
              animationDelay: Math.random() * 4 + "s",
              transform: `translate(${mousePosition.x * (i % 3 === 0 ? 0.5 : 0.2)}px, ${mousePosition.y * (i % 3 === 0 ? 0.5 : 0.2)}px)`,
            }}
          />
        ))}
      </div>

      {/* ========================= */}
      {/* Dégradé de fond - Couleur bleue */}
      {/* ========================= */}

      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${50 + mousePosition.x * 0.1}% ${50 + mousePosition.y * 0.1}%, #2563eb20, transparent 50%)`,
        }}
      />

      {/* ========================= */}
      {/* BACKGROUND */}
      {/* ========================= */}

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-px w-full -translate-x-1/2 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

        <div className="absolute left-[-200px] top-[25%] h-[480px] w-[480px] rounded-full bg-blue-600/[0.06] blur-[140px]" />

        <div className="absolute bottom-[-200px] right-[-150px] h-[500px] w-[500px] rounded-full bg-blue-500/[0.04] blur-[150px]" />

        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* ========================= */}
      {/* MAIN CONTAINER */}
      {/* ========================= */}

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div
          className={`transition-all duration-1000 ease-out ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          {/* ========================= */}
          {/* HEADER */}
          {/* ========================= */}

          <div className="mb-16">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/[0.06] px-4 py-1.5">
              <Sparkles size={14} className="text-blue-400" />
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-blue-300">
                Parcours
              </p>
            </div>

            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                  Mon{" "}
                  <span className="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
                    parcours
                  </span>
                  <span className="text-blue-400">.</span>
                </h2>

                <p className="mt-5 max-w-xl text-base leading-7 text-slate-400">
                  Formation en génie logiciel et bases de données, avec des expériences
                  professionnelles en développement full stack.
                </p>
              </div>

              <div className="hidden items-center gap-2 text-xs text-slate-500 md:flex">
                <span className="h-2 w-2 rounded-full bg-blue-500" />
                {timeline.length} étapes
              </div>
            </div>
          </div>

          {/* ========================= */}
          {/* TIMELINE */}
          {/* ========================= */}

          <div className="relative">
            {/* Ligne centrale - Couleur bleue */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-blue-400 to-blue-500/20" />

            {timeline.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className={`relative flex flex-col md:flex-row items-start mb-16 last:mb-0 ${
                    index % 2 === 0 ? "md:pr-16" : "md:pl-16 md:flex-row-reverse"
                  }`}
                >
                  {/* Point sur la timeline */}
                  <div
                    className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-4 z-10 bg-[#0a0a0a]"
                    style={{
                      borderColor: item.color,
                      boxShadow: `0 0 30px ${item.color}40`,
                    }}
                  >
                    <div 
                      className="w-2 h-2 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse"
                      style={{ backgroundColor: item.color }}
                    />
                  </div>

                  {/* Carte */}
                  <div
                    className={`w-full md:w-[calc(50%-2.5rem)] ml-16 md:ml-0 ${
                      index % 2 === 0 ? "md:ml-auto" : "md:mr-auto"
                    }`}
                  >
                    <div className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.025] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:bg-white/[0.035]">
                      
                      {/* HOVER GLOW */}
                      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-blue-500/0 blur-3xl transition-all duration-500 group-hover:bg-blue-500/10" />

                      {/* TOP LINE ON HOVER */}
                      <div className="absolute left-8 right-8 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                      {/* En-tête de la carte */}
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
                            style={{ backgroundColor: `${item.color}20` }}
                          >
                            <Icon size={20} style={{ color: item.color }} />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                              {item.title}
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                              <MapPin size={14} />
                              {item.place}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0 text-xs font-mono text-blue-400">
                          <Calendar size={14} />
                          {item.date}
                        </div>
                      </div>

                      {/* Description */}
                      <div className="mt-5">
                        <p className="text-sm leading-relaxed text-slate-400 border-t border-white/[0.06] pt-4">
                          {item.description}
                        </p>
                      </div>

                      {/* Détails supplémentaires */}
                      {item.details && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {item.details.map((detail, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-300 border border-blue-500/20"
                            >
                              {detail}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ========================= */}
          {/* BOTTOM INFO */}
          {/* ========================= */}

          <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-white/[0.07] bg-gradient-to-r from-blue-500/[0.03] to-transparent px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-6">
            <div className="flex items-center gap-3">
              <TrendingUp size={18} className="shrink-0 text-blue-500" />
              <p className="text-sm leading-5 text-slate-500">
                Formation continue et veille technologique permanente.
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-400" />
              </span>
              En constante évolution
            </div>
          </div>
        </div>
      </div>

      {/* ========================= */}
      {/* STYLES CSS */}
      {/* ========================= */}

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
      `}</style>
    </section>
  );
}