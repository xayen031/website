import Hero from './components/Hero';
import Challenges from './components/Challenges';
import Testimonials from './components/Testimonials';
import Results from './components/Results';
import Expertise from './components/Expertise';
import ContactSection from './components/ContactSection';
import LanguageSwitch from './components/LanguageSwitch';

export default function Home() {
  return (
    <main>
      <LanguageSwitch />
      <Hero />
      <Challenges />
      <Testimonials />
      <Results />
      <Expertise />
      <ContactSection />
    </main>
  );
}
