"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { FaGithub } from "react-icons/fa";

export default function ProjectCard({ project }: { project: Project }) {
  const [currentImage, setCurrentImage] = useState(0);

  // Carousel automatique TOUJOURS actif
  useEffect(() => {
    // Si une seule image, pas de carousel
    if (project.images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % project.images.length);
    }, 2000); // 2 secondes

    // Nettoyage de l'intervalle
    return () => clearInterval(interval);
  }, [project.images.length]);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImage((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImage((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  return (
    <div
      className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] transition-all duration-500 hover:-translate-y-1 hover:border-blue-500/30 hover:bg-white/[0.035] hover:shadow-[0_20px_60px_rgba(59,130,246,0.08)]"
    >
      {/* HOVER GLOW */}
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-blue-500/0 blur-3xl transition-all duration-500 group-hover:bg-blue-500/10" />
      
      {/* TOP LINE ON HOVER */}
      <div className="absolute left-8 right-8 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Carousel d'images */}
      <div className="relative aspect-video overflow-hidden bg-[#0a0a0a]">
        {project.images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentImage
                ? "opacity-100 scale-100"
                : "opacity-0 scale-110"
            }`}
          >
            <Image
              src={img}
              alt={`${project.title} - Image ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ))}

        {/* Contrôles du carousel */}
        {project.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-black/50 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-blue-500 hover:scale-110"
              aria-label="Image précédente"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-black/50 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-blue-500 hover:scale-110"
              aria-label="Image suivante"
            >
              <ChevronRight size={16} />
            </button>

            {/* Indicateurs de progression */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
              {project.images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImage(index);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === currentImage
                      ? "w-6 bg-blue-400"
                      : "w-3 bg-white/30 hover:bg-white/60"
                  }`}
                  aria-label={`Image ${index + 1}`}
                />
              ))}
            </div>

            {/* Indicateur visuel du défilement automatique */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
              <div className="flex gap-1">
                {project.images.map((_, index) => (
                  <div
                    key={index}
                    className={`h-0.5 rounded-full transition-all duration-[2000ms] ${
                      index === currentImage
                        ? "w-8 bg-blue-400/50"
                        : "w-2 bg-white/20"
                    }`}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Contenu */}
      <div className="p-6 space-y-4">
        <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
          {project.title}
        </h3>

        <p className="text-sm leading-relaxed text-slate-400 line-clamp-2">
          {project.description}
        </p>

        {/* Stack */}
        <div className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 rounded-full text-xs font-mono bg-white/[0.06] text-slate-400 border border-white/[0.06]"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Liens */}
        <div className="flex items-center gap-3 pt-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-white/[0.06] text-slate-400 transition-all duration-300 hover:bg-blue-500/20 hover:text-blue-400 hover:scale-110"
              aria-label="Code source"
            >
              <FaGithub size={18} />
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-white/[0.06] text-slate-400 transition-all duration-300 hover:bg-blue-500/20 hover:text-blue-400 hover:scale-110"
              aria-label="Démo en ligne"
            >
              <ExternalLink size={18} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}