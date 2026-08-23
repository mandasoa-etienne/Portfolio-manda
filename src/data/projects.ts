// src/data/projects.ts

export type Project = {
  id: string;
  title: string;
  description: string;
  stack: string[];
  githubUrl: string;
  demoUrl?: string;
  images: string[];
};

export const projects: Project[] = [
  {
    id: "madaimmo",
    title: "MadaImmo",
    description:
      "Plateforme immobilière full-stack pour Madagascar, avec visites virtuelles 360° prévues via Three.js. Backend NestJS avec authentification JWT et frontend Vue 3 en architecture modulaire.",
    stack: ["Vue 3", "TypeScript", "NestJS", "Prisma", "MariaDB", "Pinia"],
    githubUrl: "https://github.com/TON_PSEUDO/madaimmo",
    demoUrl: "",
    images: [
      "/images/madaImmo.png",
      "/images/crudmadaimmo.png",
      "/images/dashmadaimmo.png",
      "/images/addmada.png",
    ],
  },

  {
    id: "transpomada",
    title: "TranspoMada",
    description:
      "Plateforme de transport et logistique connectant clients et transporteurs à Madagascar. Intègre une carte interactive avec calcul de distance et gestion des trajets.",
    stack: ["Symfony", "PHP", "Twig", "Leaflet.js", "MySQL"],
    githubUrl: "https://github.com/TON_PSEUDO/transpomada",
    demoUrl: "",
    images: ["/images/cov.jpg",
              "/images/covoi.jpg",
              "/images/covoiturage.jpg",
              

    ],
  },

  {
    id: "gestion-bibliotheque",
    title: "Gestion de Bibliothèque",
    description:
      "Application desktop permettant de gérer les livres, les membres et les emprunts d'une bibliothèque. Le projet met en œuvre la programmation orientée objet et la gestion des données avec SQLite.",
    stack: ["C++", "SQLite", "POO","JMerise","CLI","SQL"],
    githubUrl: "https://github.com/TON_PSEUDO/gestion-bibliotheque",
    demoUrl: "",
    images: [
      "/images/bibli.jpg",
      "/images/biblio.jpg",
      "/images/bibliotheque.jpg"
    ],
  },

  {
    id: "gestion-recrutement",
    title: "Gestion de Recrutement",
    description:
      "Application web de gestion du recrutement permettant de gérer les candidats, les offres d'emploi et le suivi des candidatures à travers une interface centralisée.",
    stack: ["Symfony", "PHP", "MySQL", "Twig", "Bootstrap"],
    githubUrl: "https://github.com/TON_PSEUDO/gestion-recrutement",
    demoUrl: "",
    images: [
      "/images/recrutement.png",
      "/images/recrutement-dashboard.png",
    ],
  },

  {
    id: "gestion-pharmacie",
    title: "Gestion de Pharmacie",
    description:
      "Application web destinée à la gestion d'une pharmacie avec suivi des médicaments, gestion des stocks, produits et opérations de vente.",
    stack: ["Symfony", "PHP", "PostgreSQL", "Twig", "Bootstrap"],
    githubUrl: "https://github.com/TON_PSEUDO/gestion-pharmacie",
    demoUrl: "",
    images: [
      "/images/pharma.jpg",
      "/images/pharmacie.jpg",
    ],
  },
];