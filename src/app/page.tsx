import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-[#070707]">
      <Header />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
    </main>
  );
}