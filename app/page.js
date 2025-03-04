import Hero from './components/Hero';
import ProblemSolution from './components/ProblemSolution';
import Testimonials from './components/Testimonials';
import ContactCTA from './components/ContactCTA';

export default function Home() {
  return (
    <main>
      <Hero />
      <ProblemSolution />
      <Testimonials />
      <ContactCTA />
    </main>
  );
}
