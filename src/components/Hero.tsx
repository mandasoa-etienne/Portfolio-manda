"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronDown, Download, ArrowRight } from "lucide-react";

interface Particle {
  width: number;
  height: number;
  left: number;
  top: number;
  duration: number;
  delay: number;
}

export default function Hero() {
  const [typedText, setTypedText] = useState("");
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Particle[]>([]);
  const heroRef = useRef<HTMLElement>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const roles = [
    "Développeur Full Stack",
    "Créateur d'Applications",
    "Architecte Logiciel",
    "Innovateur Digital",
  ];

  // Generate particles on client only
  useEffect(() => {
    const newParticles = [...Array(50)].map(() => ({
      width: Math.random() * 4 + 2,
      height: Math.random() * 4 + 2,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: Math.random() * 6 + 4,
      delay: Math.random() * 4,
    }));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setParticles(newParticles);
  }, []);

  // Typing effect
  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      if (typedText.length < currentRole.length) {
        timeout = setTimeout(() => {
          setTypedText(currentRole.slice(0, typedText.length + 1));
        }, 80);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (typedText.length > 0) {
        timeout = setTimeout(() => {
          setTypedText(typedText.slice(0, -1));
        }, 40);
      } else {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsDeleting(false);
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, currentRoleIndex, roles]);

  // Parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollToProjects = () => {
    document.getElementById("projets")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={heroRef}
      id="accueil"
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 relative overflow-hidden bg-[#0a0a0a]"
    >
      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-blue-500/20"
            style={{
              width: p.width + "px",
              height: p.height + "px",
              left: p.left + "%",
              top: p.top + "%",
              animation: `float ${p.duration}s ease-in-out infinite`,
              animationDelay: p.delay + "s",
              transform: `translate(${mousePosition.x * (i % 3 === 0 ? 0.5 : 0.2)}px, ${mousePosition.y * (i % 3 === 0 ? 0.5 : 0.2)}px)`,
            }}
          />
        ))}
      </div>

      {/* Background gradient */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${50 + mousePosition.x * 0.1}% ${50 + mousePosition.y * 0.1}%, #2563eb20, transparent 50%)`,
        }}
      />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left side - unchanged */}
          <div className="space-y-7 animate-slide-in-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-sm text-blue-400 font-medium">
                Disponible pour collaboration
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="text-white">ANDRIANAVALONA</span>
              <br />
              <span className="gradient-text">Mandasoa</span>
              <br />
              <span className="text-white text-2xl sm:text-3xl md:text-4xl">
                <span className="opacity-70">Je suis</span>{" "}
                <span className="text-blue-400 font-mono relative">
                  {typedText}
                  <span className="absolute -right-2 top-0 w-1 h-full bg-blue-500 animate-blink" />
                </span>
              </span>
            </h1>

            <p className="text-[#94a3b8] text-base sm:text-lg max-w-lg leading-relaxed">
              Je conçois et développe des applications web et mobiles de bout en
              bout, avec une approche centrée sur l&apos;expérience utilisateur
              et la performance.
            </p>

            <div className="flex flex-wrap justify-center gap-5 pt-6">
              <button
                onClick={scrollToProjects}
                className="group px-8 py-3 rounded-lg bg-white text-black font-medium border-2 border-black hover:bg-black hover:text-white transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                Voir mes projets
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>

              <a
                href="/manda_cv.pdf"
                download
                className="px-8 py-3 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(37,99,235,0.4)] flex items-center gap-2"
              >
                <Download size={18} />
                Télécharger CV
              </a>
            </div>
          </div>

          {/* Right side - unchanged */}
          <div className="hidden lg:flex items-center justify-center relative animate-float">
            <div className="relative w-80 h-80">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 via-blue-400 to-blue-300 animate-pulse-glow" />

              <div className="absolute inset-1 rounded-full bg-[#0a0a0a] overflow-hidden">
                <Image
                  src="/images/profil.png"
                  alt="Mandasoa"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>

              <div className="absolute -inset-4 rounded-full border-2 border-blue-500/20 animate-spin-slow" />
              <div className="absolute -inset-8 rounded-full border-2 border-blue-400/20 animate-spin-slower" />
              <div className="absolute -inset-12 rounded-full border-2 border-blue-300/10 animate-spin-slowest" />
            </div>

            <div className="absolute -top-4 -right-4 px-4 py-2 rounded-lg glass text-xs font-mono text-blue-400 animate-float border border-blue-500/20">
              🚀 Full Stack
            </div>
            <div
              className="absolute -bottom-4 -left-4 px-4 py-2 rounded-lg glass text-xs font-mono text-blue-300 animate-float border border-blue-500/20"
              style={{ animationDelay: "1s" }}
            >
              💻 5+ Projets
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#64748b] animate-float">
          <span className="text-xs font-mono uppercase tracking-wider">
            Scroll
          </span>
          <ChevronDown size={20} className="animate-bounce text-blue-400" />
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes pulse-glow {
          0%,
          100% {
            opacity: 0.6;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
        }
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes spin-slower {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }
        @keyframes spin-slowest {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        .animate-spin-slower {
          animation: spin-slower 12s linear infinite;
        }
        .animate-spin-slowest {
          animation: spin-slowest 16s linear infinite;
        }
        .animate-blink {
          animation: blink 0.8s step-end infinite;
        }
        .animate-slide-in-left {
          animation: slideInLeft 0.8s ease-out;
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .gradient-text {
          background: linear-gradient(
            135deg,
            #60a5fa 0%,
            #3b82f6 50%,
            #2563eb 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .glass {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
        }
      `}</style>
    </section>
  );
}