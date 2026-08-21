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
      "Plateforme immobilière full-stack pour Madagascar, avec visites virtuelles 360° prévues via Three.js. Backend NestJS avec authentification JWT (access token + refresh token en cookie HttpOnly), frontend Vue 3 en architecture modulaire.",
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
      "Plateforme de transport et logistique connectant clients et transporteurs à Madagascar. Carte interactive Leaflet/OpenStreetMap avec calcul de distance en temps réel, tableau de bord transporteur avec détection de conflits d'horaires.",
    stack: ["Symfony", "PHP", "Twig", "Leaflet.js", "MySQL"],
    githubUrl: "https://github.com/TON_PSEUDO/transpomada",
    demoUrl: "",
    images: ["/images/transpomada.png"],
  },
];