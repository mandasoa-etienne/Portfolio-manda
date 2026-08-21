"use client";

import { useState, useEffect, useRef } from "react";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import { ChevronLeft, ChevronRight, Sparkles, TrendingUp } from "lucide-react";

export default function Projects() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const projectsPerPage = 3;
  const sectionRef = useRef<HTMLElement>(null);

  const totalPages = Math.ceil(projects.length / projectsPerPage);
  const currentProjects = projects.slice(
    currentPage * projectsPerPage,
    (currentPage + 1) * projectsPerPage
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
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

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <section
      id="projets"
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
                Projets
              </p>
            </div>

            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                  Projets{" "}
                  <span className="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
                    réalisés
                  </span>
                  <span className="text-blue-400">.</span>
                </h2>

                <p className="mt-5 max-w-xl text-base leading-7 text-slate-400">
                  Une sélection de mes projets académiques et personnels,
                  illustrant mon expertise technique.
                </p>
              </div>

              <div className="hidden items-center gap-2 text-xs text-slate-500 md:flex">
                <span className="h-2 w-2 rounded-full bg-blue-500" />
                {projects.length} projets
              </div>
            </div>
          </div>

          {/* ========================= */}
          {/* PROJECTS GRID */}
          {/* ========================= */}

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {currentProjects.map((project, index) => (
              <div
                key={project.id}
                className={`transition-all duration-700 ease-out ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>

          {/* ========================= */}
          {/* PAGINATION */}
          {/* ========================= */}

          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-4">
              <button
                onClick={prevPage}
                className="p-3 rounded-xl bg-white/[0.06] text-slate-400 transition-all duration-300 hover:bg-blue-500/20 hover:text-blue-400 hover:scale-110"
                aria-label="Projets précédents"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="flex gap-2">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentPage === index
                        ? "w-6 bg-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                        : "w-2 bg-white/20 hover:bg-white/40"
                    }`}
                    aria-label={`Page ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextPage}
                className="p-3 rounded-xl bg-white/[0.06] text-slate-400 transition-all duration-300 hover:bg-blue-500/20 hover:text-blue-400 hover:scale-110"
                aria-label="Projets suivants"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}

          {/* ========================= */}
          {/* BOTTOM INFO */}
          {/* ========================= */}

          <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-white/[0.07] bg-gradient-to-r from-blue-500/[0.03] to-transparent px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="flex items-center gap-3">
              <TrendingUp size={16} className="shrink-0 text-blue-500" />
              <p className="text-xs leading-5 text-slate-500">
                Chaque projet est une opportunité d&apos;apprendre et d&apos;innover.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-400" />
              </span>
              {projects.length} projets
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