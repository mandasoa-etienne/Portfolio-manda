"use client";

import { useState, useEffect, useRef } from "react";
import { Code, Palette, Globe, Users, Award, Lightbulb } from "lucide-react";

const stats = [
  { label: "Projets réalisés", value: "12+", icon: Code },
  { label: "Années d'expérience", value: "3+", icon: Award },
  { label: "Technologies maîtrisées", value: "15+", icon: Lightbulb },
];

const infos = [
  { label: "Localisation", value: "Madagascar" },
  { label: "Disponibilité", value: "Stage / Alternance", accent: true },
  { label: "Langues", value: "Français, Anglais, Malgache" },
];

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
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

  return (
    <section
      id="apropos"
      ref={sectionRef}
      className="py-24 sm:py-28 px-6 sm:px-8 bg-[#050505] relative overflow-hidden"
    >
      {/* Décoration de fond */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-600/5 to-transparent pointer-events-none" />

      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="absolute bottom-0 -right-32 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div
          className={`transition-all duration-1000 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-20"
          }`}
        >
          {/* ============================= */}
          {/* EN-TÊTE */}
          {/* ============================= */}
          <div className="mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
              À propos{" "}
              <span className="text-blue-500">de moi</span>
            </h2>

            <p className="text-[#64748b] text-xs sm:text-sm font-mono mt-1">
              Qui je suis et ce qui me motive
            </p>
          </div>

          {/* ============================= */}
          {/* PRÉSENTATION */}
          {/* ============================= */}
          <div className="mb-14 max-w-5xl">
            <p className="text-[#94a3b8] text-base sm:text-lg leading-relaxed mb-5">
              Étudiant en informatique à l&apos;
              <span className="text-white font-medium">
                École Nationale d&apos;Informatique (ENI)
              </span>{" "}
              de Fianarantsoa, je termine actuellement ma licence en Génie
              Logiciel et Base de Données. Passionné par le développement
              full-stack, j&apos;aime construire des applications de bout en
              bout, de la conception de la base de données jusqu&apos;à
              l&apos;interface utilisateur.
            </p>

            <p className="text-[#94a3b8] text-base sm:text-lg leading-relaxed mb-5">
              Ma démarche : comprendre en profondeur les outils que
              j&apos;utilise plutôt que de les survoler. J&apos;ai commencé
              avec{" "}
              <span className="text-blue-500 font-medium">
                Symfony et PHP
              </span>{" "}
              sur des projets de logistique et de transport, avant
              d&apos;évoluer vers un stack plus moderne —{" "}
              <span className="text-blue-500 font-medium">
                Vue 3, TypeScript, NestJS et React Native
              </span>
              .
            </p>

            <p className="text-[#94a3b8] text-base sm:text-lg leading-relaxed">
              Basé à Madagascar, je m&apos;intéresse particulièrement aux
              problématiques locales : comment adapter des solutions web
              modernes à un contexte d&apos;infrastructure et de marché
              spécifique.
            </p>
          </div>

          {/* ============================= */}
          {/* STATS + SIDEBAR */}
          {/* ============================= */}
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-start">
            
            {/* ============================= */}
            {/* STATISTIQUES - GAUCHE */}
            {/* ============================= */}
            <div className="lg:col-span-3 grid grid-cols-3 gap-4 sm:gap-5">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="
                    group
                    relative
                    text-center
                    py-6
                    px-3
                    rounded-2xl
                    bg-white/[0.03]
                    border
                    border-white/10
                    hover:border-blue-500/60
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:shadow-[0_10px_40px_rgba(37,99,235,0.15)]
                    overflow-hidden
                  "
                >
                  {/* Effet bleu */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/[0.06] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div
                    className="
                      relative
                      w-10 h-10
                      sm:w-12 sm:h-12
                      mx-auto mb-3
                      rounded-xl
                      bg-blue-600/10
                      border border-blue-500/20
                      flex items-center justify-center
                      group-hover:bg-blue-600/20
                      transition-colors duration-300
                    "
                  >
                    <stat.icon className="w-5 h-5 text-blue-500" />
                  </div>

                  <div className="relative text-xl sm:text-2xl font-bold text-white">
                    {stat.value}
                  </div>

                  <div className="relative text-[11px] sm:text-xs text-[#64748b] mt-1 leading-tight">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* ============================= */}
            {/* SIDEBAR - DROITE */}
            {/* ============================= */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Informations */}
              <div
                className="
                  p-6
                  rounded-2xl
                  bg-white/[0.04]
                  border-2
                  border-white/10
                  hover:border-blue-500/50
                  transition-colors
                  duration-300
                "
              >
                <h3 className="text-base font-bold mb-4 flex items-center gap-2.5 text-white">
                  <span
                    className="
                      w-8 h-8
                      rounded-lg
                      bg-blue-600/10
                      border border-blue-500/30
                      flex items-center justify-center
                      flex-shrink-0
                    "
                  >
                    <Globe size={15} className="text-blue-500" />
                  </span>

                  Informations
                </h3>

                <div className="text-sm">
                  {infos.map((info, i) => (
                    <div
                      key={info.label}
                      className={`
                        flex
                        justify-between
                        items-center
                        gap-4
                        py-3
                        ${
                          i < infos.length - 1
                            ? "border-b border-white/10"
                            : ""
                        }
                      `}
                    >
                      <span className="text-[#64748b] whitespace-nowrap">
                        {info.label}
                      </span>

                      <span
                        className={`
                          font-medium
                          text-right
                          ${
                            info.accent
                              ? "text-blue-500"
                              : "text-white"
                          }
                        `}
                      >
                        {info.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ce que je recherche */}
              <div
                className="
                  p-6
                  rounded-2xl
                  bg-gradient-to-br
                  from-blue-600/10
                  to-transparent
                  border-2
                  border-blue-500/30
                  hover:border-blue-500/50
                  transition-colors
                  duration-300
                "
              >
                <h3 className="text-base font-bold mb-3 flex items-center gap-2.5 text-white">
                  <span
                    className="
                      w-8 h-8
                      rounded-lg
                      bg-blue-600/10
                      border border-blue-500/30
                      flex items-center justify-center
                      flex-shrink-0
                    "
                  >
                    <Users size={15} className="text-blue-500" />
                  </span>

                  Ce que je recherche
                </h3>

                <p className="text-[#94a3b8] text-sm leading-relaxed">
                  Actuellement à la recherche d&apos;un stage dans le
                  développement full-stack. Je souhaite mettre mes
                  compétences au service de projets innovants et
                  challengants.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}