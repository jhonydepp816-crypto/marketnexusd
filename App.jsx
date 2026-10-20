import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import About from '@/components/sections/About';
import Contact from '@/components/sections/Contact';
import Hero from '@/components/sections/Hero';
import Journal from '@/components/sections/Journal';
import Performance from '@/components/sections/Performance';
import Stats from '@/components/sections/Stats';
import Strategy from '@/components/sections/Strategy';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <div className="container dashboard">
          <Performance />
          <Strategy />
          <Journal />
          <About />
        </div>
        <Contact />
      </main>
      <Footer />
    </>
  );
}
