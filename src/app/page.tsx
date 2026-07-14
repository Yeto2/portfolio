import NavBar from '@/components/layout/NavBar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Services from '@/components/sections/Services';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import WhyMe from '@/components/sections/WhyMe';
import Process from '@/components/sections/Process';
import Testimonials from '@/components/sections/Testimonials';
import Contact from '@/components/sections/Contact';
import {
  profile,
  services,
  skills,
  commerceProjects,
  systemsProjects,
  whyItems,
  processSteps,
  testimonials,
} from '@/data/content';

export default function HomePage() {
  return (
    <>
      <NavBar name={profile.name} />
      <main>
        <Hero profile={profile} />
        <About profile={profile} />
        <Services services={services} />
        <Skills skills={skills} />
        <Projects commerce={commerceProjects} systems={systemsProjects} />
        <WhyMe items={whyItems} />
        <Process steps={processSteps} />
        <Testimonials items={testimonials} />
        <Contact profile={profile} />
      </main>
      <Footer />
    </>
  );
}
