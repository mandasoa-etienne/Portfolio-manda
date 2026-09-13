"use client";

import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import {
  ArrowUpRight,
  CheckCircle,
  Clock,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  Sparkles,
  XCircle,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

type ContactItem = {
  label: string;
  value: string;
  href: string;
  icon: React.ComponentType<{
    size?: number;
    className?: string;
  }>;
  external: boolean;
};

const contacts: ContactItem[] = [
  {
    label: "Email",
    value: "manda.andrianavalona@gmail.com",
    href: "mailto:manda.andrianavalona@gmail.com",
    icon: Mail,
    external: false,
  },
  {
    label: "GitHub",
    value: "github.com/Mandasoa12",
    href: "https://github.com/mandasoa-etienne",
    icon: FaGithub,
    external: true,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/manda-andrianavalona",
    href: "https://www.linkedin.com/in/manda-andrianavalona-180930376/",
    icon: FaLinkedin,
    external: true,
  },
  {
    label: "Téléphone",
    value: "038 44 673 95",
    href: "tel:+261384467395",
    icon: Phone,
    external: false,
  },
];

// Clés EmailJS — mises en dur pour garantir le fonctionnement
// même si les variables d'environnement posent problème.
const EMAILJS_SERVICE_ID = "service_mb59174";
const EMAILJS_TEMPLATE_ID = "template_95legmm";
const EMAILJS_PUBLIC_KEY = "yq5xtNrHmm_cIujqN";

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
      }
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formRef.current) return;

    setIsSending(true);
    setSendError(false);

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        EMAILJS_PUBLIC_KEY
      );

      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        message: "",
      });

      setTimeout(() => {
        setIsSubmitted(false);
      }, 3500);
    } catch (error) {
      console.error("Erreur EmailJS :", error);
      setSendError(true);

      setTimeout(() => {
        setSendError(false);
      }, 3500);
    } finally {
      setIsSending(false);
    }
  };

  const fieldClasses = (field: string) => `
    w-full
    rounded-xl
    border
    bg-white/[0.025]
    px-4
    py-3.5
    text-sm
    text-white
    placeholder:text-slate-600
    outline-none
    transition-all
    duration-300
    ${
      focusedField === field
        ? "border-blue-400/60 bg-blue-400/[0.035] shadow-[0_0_0_3px_rgba(59,130,246,0.07)]"
        : "border-white/[0.08] hover:border-white/[0.14]"
    }
  `;

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#0a0a0a] py-24 sm:py-32 lg:py-36"
    >
      {/* =====================================================
          PARTICULES - Couleur bleue
      ===================================================== */}
      
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

      {/* =====================================================
          Dégradé de fond - Couleur bleue
      ===================================================== */}

      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${50 + mousePosition.x * 0.1}% ${50 + mousePosition.y * 0.1}%, #2563eb20, transparent 50%)`,
        }}
      />

      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-px w-full -translate-x-1/2 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

        <div className="absolute left-[-220px] top-[15%] h-[500px] w-[500px] rounded-full bg-blue-600/[0.055] blur-[150px]" />

        <div className="absolute bottom-[-220px] right-[-180px] h-[520px] w-[520px] rounded-full bg-blue-500/[0.035] blur-[160px]" />

        <div
          className="absolute inset-0 opacity-[0.012]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "42px 42px",
          }}
        />
      </div>

      {/* =====================================================
          CONTAINER
      ===================================================== */}

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        <div
          className={`transition-all duration-1000 ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-12 opacity-0"
          }`}
        >
          {/* =================================================
              HEADER
          ================================================= */}

          <div className="mb-14 max-w-3xl sm:mb-16">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/[0.055] px-4 py-1.5">
              <Sparkles
                size={14}
                className="text-blue-400"
              />

              <span className="text-xs font-medium uppercase tracking-[0.2em] text-blue-300">
                Contact
              </span>
            </div>

            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Travaillons{" "}
              <span className="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
                ensemble
              </span>
              <span className="text-blue-400">.</span>
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
              Vous avez un projet, une opportunité de stage ou simplement
              envie d&apos;échanger ? N&apos;hésitez pas à me contacter.
            </p>
          </div>

          {/* =================================================
              CONTENT
          ================================================= */}

          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
            {/* =================================================
                LEFT
            ================================================= */}

            <div className="flex flex-col gap-6">
              {/* CONTACTS */}

              <div>
                <div className="mb-5 flex items-center gap-3">
                  <div className="h-px flex-1 bg-gradient-to-r from-blue-500/30 to-transparent" />

                  <span className="whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">
                    Mes coordonnées
                  </span>

                  <div className="h-px flex-1 bg-gradient-to-l from-blue-500/20 to-transparent" />
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {contacts.map((contact) => {
                    const Icon = contact.icon;

                    return (
                      <a
                        key={contact.label}
                        href={contact.href}
                        target={
                          contact.external ? "_blank" : undefined
                        }
                        rel={
                          contact.external
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="group relative flex min-w-0 flex-col gap-4 overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-500/25 hover:bg-blue-500/[0.035]"
                      >
                        <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-blue-500/0 blur-3xl transition-all duration-500 group-hover:bg-blue-500/10" />

                        <div className="relative flex items-center justify-between">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.035] text-slate-300 transition-all duration-300 group-hover:border-blue-500/30 group-hover:bg-blue-500/10 group-hover:text-blue-400">
                            <Icon size={18} />
                          </div>

                          <ArrowUpRight
                            size={16}
                            className="text-slate-600 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue-400"
                          />
                        </div>

                        <div className="relative min-w-0">
                          <p className="mb-1 text-[11px] font-medium uppercase tracking-wider text-slate-500">
                            {contact.label}
                          </p>

                          <p className="truncate text-sm font-medium text-slate-200 transition-colors group-hover:text-blue-300">
                            {contact.value}
                          </p>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* STATUS */}

              <div className="rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-500/[0.07] to-blue-500/[0.025] p-5">
                <div className="flex items-start gap-4">
                  <span className="relative mt-1.5 flex h-2.5 w-2.5 shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-40" />

                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-blue-400" />
                  </span>

                  <div>
                    <p className="text-sm font-semibold text-white">
                      Disponible actuellement
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-400">
                      Stage / Alternance en développement web et mobile
                    </p>
                  </div>
                </div>
              </div>

              {/* LOCATION + RESPONSE */}

              <div className="grid grid-cols-2 gap-3">
                <div className="flex min-w-0 items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.02] px-4 py-4">
                  <MapPin
                    size={17}
                    className="shrink-0 text-blue-400/70"
                  />

                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-wider text-slate-500">
                      Basé à
                    </p>

                    <p className="truncate text-sm font-medium text-slate-200">
                      Madagascar
                    </p>
                  </div>
                </div>

                <div className="flex min-w-0 items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.02] px-4 py-4">
                  <Clock
                    size={17}
                    className="shrink-0 text-blue-400/70"
                  />

                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-wider text-slate-500">
                      Réponse
                    </p>

                    <p className="truncate text-sm font-medium text-slate-200">
                      Sous 24h
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* =================================================
                RIGHT - FORM
            ================================================= */}

            <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#0d0d0d] to-[#080808] p-6 shadow-2xl shadow-black/30 sm:p-8 lg:p-9">
              {/* CORNER */}

              <div className="pointer-events-none absolute left-0 top-0 h-20 w-20 rounded-tl-2xl border-l border-t border-blue-500/20" />

              <div className="pointer-events-none absolute bottom-0 right-0 h-20 w-20 rounded-br-2xl border-b border-r border-blue-500/20" />

              {/* FORM HEADER */}

              <div className="relative mb-8 flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/10 text-blue-400 ring-1 ring-blue-500/20">
                  <MessageSquare size={20} />
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white">
                    Envoyez-moi un message
                  </h3>

                  <p className="mt-1.5 text-sm leading-6 text-slate-400">
                    Décrivez votre projet ou votre demande. Je vous
                    répondrai dès que possible.
                  </p>
                </div>
              </div>

              {/* FORM */}

              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="relative space-y-5"
              >
                {/* NAME */}

                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-slate-300"
                  >
                    Nom
                  </label>

                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        name: e.target.value,
                      })
                    }
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Votre nom"
                    required
                    className={fieldClasses("name")}
                  />
                </div>

                {/* EMAIL */}

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-slate-300"
                  >
                    Email
                  </label>

                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.target.value,
                      })
                    }
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="votre@email.com"
                    required
                    className={fieldClasses("email")}
                  />
                </div>

                {/* MESSAGE */}

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-slate-300"
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        message: e.target.value,
                      })
                    }
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    rows={5}
                    placeholder="Parlez-moi de votre projet..."
                    required
                    className={`${fieldClasses(
                      "message"
                    )} resize-none`}
                  />
                </div>

                {/* BUTTON */}

                <button
                  type="submit"
                  disabled={isSending}
                  className="group relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:from-blue-500 hover:to-blue-400 hover:shadow-lg hover:shadow-blue-600/20 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                  {isSubmitted ? (
                    <>
                      <CheckCircle size={19} />
                      Message envoyé !
                    </>
                  ) : sendError ? (
                    <>
                      <XCircle size={19} />
                      Échec de l&apos;envoi, réessayez
                    </>
                  ) : isSending ? (
                    <>Envoi en cours...</>
                  ) : (
                    <>
                      <Send
                        size={18}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                      Envoyer le message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          STYLES CSS
      ===================================================== */}

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
      `}</style>
    </section>
  );
}
