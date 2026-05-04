import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HeroIntro from './components/HeroIntro';
import About from './components/About';
import Catalog from './components/Catalog';
import Testimonial from './components/Testimonial';
import Footer from './components/Footer';
import FloatingWA from './components/FloatingWA';

function App() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <Hero />
        <HeroIntro />
        <About />
        <Catalog />
        <Testimonial />
      </main>
      <Footer />
      <FloatingWA />
    </>
  );
}

export default App;

