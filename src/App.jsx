import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Catalog from './components/Catalog';
import Testimonial from './components/Testimonial';
import Footer from './components/Footer';
import FloatingWA from './components/FloatingWA';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
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

