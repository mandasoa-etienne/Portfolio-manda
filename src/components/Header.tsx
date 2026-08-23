"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Menu, X, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const links = [
  { href: "#accueil", label: "Accueil" },
  { href: "#apropos", label: "À propos" },
  { href: "#competences", label: "Compétences" },
  { href: "#experiences", label: "Expériences" },
  { href: "#projets", label: "Projets" },
  { href: "#contact", label: "Contact" },
];

const socials = [
  { icon: FaGithub, href: "https://github.com/Mandasoa12", label: "GitHub" },
  { icon: FaLinkedin, href: "https://www.linkedin.com/in/manda-andrianavalona-180930376/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:mandaandrianavalona8@gmail.com", label: "Email" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [expanded, setExpanded] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = links.map(link => link.href.replace("#", ""));
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!headerRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 10;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      headerRef.current.style.transform = `translate(${x * 0.5}px, ${y * 0.5}px)`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-blue-500/20 shadow-2xl shadow-blue-500/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setExpanded(true)}
              className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-blue-500 hover:border-blue-400 transition-all duration-300 hover:scale-110 group shadow-[0_0_20px_rgba(37,99,235,0.2)] hover:shadow-[0_0_40px_rgba(37,99,235,0.4)]"
            >
              <Image
                src="/images/profile.jpg"
                alt="Mandasoa"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-white">Mandasoa</h1>
              <p className="text-xs text-blue-400 font-mono">Dev Full Stack</p>
            </div>
          </div>

          {/* Navigation desktop */}
          <nav className="hidden lg:flex items-center gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${
                  activeSection === link.href.replace("#", "")
                    ? "text-white bg-blue-500/20"
                    : "text-[#94a3b8] hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
                {activeSection === link.href.replace("#", "") && (
                  <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.5)]" />
                )}
              </a>
            ))}
          </nav>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-[#64748b] hover:text-white hover:bg-blue-500/20 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(37,99,235,0.2)]"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>

            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
              aria-label="Menu"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Menu mobile */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="flex flex-col gap-2 px-6 pb-6 bg-[#0a0a0a]/95 backdrop-blur-xl border-t border-blue-500/10">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeSection === link.href.replace("#", "")
                    ? "text-white bg-blue-500/20"
                    : "text-[#94a3b8] hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </a>
            ))}
            <div className="flex items-center gap-4 pt-4 border-t border-white/5">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-[#64748b] hover:text-white hover:bg-blue-500/20 transition-all"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </nav>
        </div>
      </header>

      {/* Modal photo */}
      {expanded && (
        <div
          onClick={() => setExpanded(false)}
          className="fixed inset-0 z-[100] bg-[#0a0a0a]/95 backdrop-blur-xl flex items-center justify-center cursor-pointer animate-fade-in"
        >
          <div className="relative w-64 h-64 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-blue-500 shadow-[0_0_80px_rgba(37,99,235,0.4)] animate-scale-in">
            <Image src="/images/profile.jpg" alt="Mandasoa" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-transparent" />
          </div>
        </div>
      )}
    </>
  );
}