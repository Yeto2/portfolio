import NavBar from '@/components/layout/NavBar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';
import Services from '@/components/sections/Services';
import Contact from '@/components/sections/Contact';
import {
  profile,
  heroServices,
  projects,
  skillGroups,
  services,
} from '@/data/content';

export default function HomePage() {
  return (
    <>
      <NavBar name={profile.name} />
      <main>
        <Hero profile={profile} services={heroServices} />
        <About profile={profile} />
        <Projects projects={projects} />
        <Skills groups={skillGroups} />
        <Services services={services} />
        <Contact profile={profile} />
      </main>
      <Footer />
    </>
  );
}
