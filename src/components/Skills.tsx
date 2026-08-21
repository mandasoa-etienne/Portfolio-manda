"use client";

import { useState, useEffect, useRef } from "react";
import {
  Code,
  Server,
  Database,
  Wrench,
  ArrowUpRight,
  Sparkles,
  TrendingUp,
} from "lucide-react";

const skillGroups = [
  {
    category: "Frontend",
    icon: Code,
    description: "Interfaces modernes et applications web",
    type: "bar" as const,
    skills: [
      { name: "Vue 3", level: 85 },
      { name: "TypeScript", level: 80 },
      { name: "React / Next.js", level: 75 },
      { name: "Tailwind CSS", level: 90 },
    ],
  },
  {
    category: "Backend",
    icon: Server,
    description: "APIs, logique métier et architecture serveur",
    type: "bar" as const,
    skills: [
      { name: "NestJS", level: 75 },
      { name: "Symfony", level: 80 },
      { name: "PHP", level: 85 },
      { name: "Java", level: 70 },
    ],
  },
  {
    category: "Base de données",
    icon: Database,
    description: "Conception et gestion des données",
    type: "badge" as const,
    skills: [
      { name: "MySQL", level: 85 },
      { name: "PostgreSQL", level: 75 },
    ],
  },
  {
    category: "Outils",
    icon: Wrench,
    description: "Outils de développement et collaboration",
    type: "badge" as const,
    skills: [
      { name: "Git", level: 85 },
      { name: "Docker", level: 65 },
      { name: "VS Code", level: 90 },
      { name: "Postman", level: 80 },
    ],
  },
];

function getLevelLabel(level: number): string {
  if (level >= 85) return "Expert";
  if (level >= 75) return "Avancé";
  if (level >= 60) return "Intermédiaire";
  return "Débutant";
}

function getLevelStyle(level: number): string {
  if (level >= 85) {
    return "bg-blue-500/10 border-blue-400/30 text-blue-300";
  }
  if (level >= 75) {
    return "bg-white/[0.06] border-white/15 text-white";
  }
  if (level >= 60) {
    return "bg-white/[0.04] border-white/10 text-slate-300";
  }
  return "bg-white/[0.03] border-white/10 text-slate-400";
}

export default function Skills() {
  const [isClient, setIsClient] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsClient(true);
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
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
      id="competences"
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

          <div className="mb-20">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/[0.06] px-4 py-1.5">
              <Sparkles size={14} className="text-blue-400" />
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-blue-300">
                Stack technique
              </p>
            </div>

            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                  Compétences{" "}
                  <span className="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
                    techniques
                  </span>
                  <span className="text-blue-400">.</span>
                </h2>

                <p className="mt-6 max-w-xl text-base leading-7 text-slate-400">
                  Les technologies et outils que j&apos;utilise pour concevoir
                  des applications modernes, performantes et maintenables.
                </p>
              </div>

              <div className="hidden items-center gap-2 text-xs text-slate-500 md:flex">
                <span className="h-2 w-2 rounded-full bg-blue-500" />
                Technologies principales
              </div>
            </div>
          </div>

          {/* ========================= */}
          {/* SKILLS GRID */}
          {/* ========================= */}

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
            {skillGroups.map((group, index) => {
              const Icon = group.icon;

              return (
                <div
                  key={group.category}
                  className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.025] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:bg-white/[0.035]"
                >
                  {/* HOVER GLOW */}

                  <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-blue-500/0 blur-3xl transition-all duration-500 group-hover:bg-blue-500/10" />

                  {/* TOP LINE ON HOVER */}

                  <div className="absolute left-8 right-8 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* ========================= */}
                  {/* CATEGORY HEADER */}
                  {/* ========================= */}

                  <div className="flex items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
                    <div className="flex min-w-0 items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-500/15 to-blue-500/5">
                        <Icon
                          size={20}
                          strokeWidth={1.8}
                          className="text-blue-400"
                        />
                      </div>

                      <div className="min-w-0">
                        <h3 className="truncate text-lg font-semibold text-white sm:text-[18px]">
                          {group.category}
                        </h3>

                        <p className="mt-1 text-sm leading-5 text-slate-500">
                          {group.description}
                        </p>
                      </div>
                    </div>

                    <ArrowUpRight
                      size={18}
                      className="shrink-0 text-slate-700 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue-400"
                    />
                  </div>

                  {/* ========================= */}
                  {/* PROGRESS BARS */}
                  {/* ========================= */}

                  {group.type === "bar" && (
                    <div className="mt-8 space-y-6">
                      {group.skills.map((skill) => (
                        <div key={skill.name}>
                          <div className="mb-3 flex items-center justify-between gap-4">
                            <span className="text-sm font-medium text-slate-200">
                              {skill.name}
                            </span>

                            <span className="shrink-0 font-mono text-xs text-slate-500">
                              {skill.level}%
                            </span>
                          </div>

                          <div className="h-2 w-full overflow-hidden rounded-full bg-white/[0.07]">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-[1200ms] ease-out"
                              style={{
                                width: isClient ? `${skill.level}%` : "0%",
                                transitionDelay: `${index * 100 + 150}ms`,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* ========================= */}
                  {/* BADGES */}
                  {/* ========================= */}

                  {group.type === "badge" && (
                    <div className="mt-8 space-y-4">
                      {group.skills.map((skill) => (
                        <div
                          key={skill.name}
                          className="flex min-h-[52px] items-center justify-between gap-4 rounded-2xl border border-white/[0.06] bg-black/20 px-5 py-3 transition-colors duration-300 hover:border-blue-500/20 hover:bg-blue-500/[0.03]"
                        >
                          <span className="text-sm font-medium text-slate-200">
                            {skill.name}
                          </span>

                          <span
                            className={`shrink-0 rounded-xl border px-4 py-2 text-xs font-medium ${getLevelStyle(
                              skill.level
                            )}`}
                          >
                            {getLevelLabel(skill.level)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
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
                Technologies utilisées dans mes projets académiques et
                personnels.
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
      {/* STYLES CSS POUR LES ANIMATIONS */}
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