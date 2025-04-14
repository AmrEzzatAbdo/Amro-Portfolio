import About from "@/components/About";
import Certificates from "@/components/Certificates";
import Contact from "@/components/Contact";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Skills from "@/components/Skills";
import Clients from "@/components/Clients";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { useEffect } from "react";

export default function Home() {
  useSmoothScroll();

  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          const headerHeight = 64;
          const targetPosition =
            element.getBoundingClientRect().top + window.scrollY - headerHeight;
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        }
      }
    };

    scrollToHash(); // initial scroll if there's already a hash
    window.addEventListener("hashchange", scrollToHash);

    return () => {
      window.removeEventListener("hashchange", scrollToHash);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <About />
        <Experience />
        <Skills />
        <Education />
        <Certificates />
        <Clients />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
