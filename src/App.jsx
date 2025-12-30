import React from 'react';
import Header from './components/Header';
import Hero from './sections/Hero';
import Research from './sections/Research';
import Experience from './sections/Experience';
import Teaching from './sections/Teaching';
import Contact from './sections/Contact';

function App() {
  return (
    <div className="min-h-screen bg-background text-gray-800 font-sans selection:bg-primary/20 selection:text-primary">
      <Header />
      <main>
        <Hero />
        <Research />
        <Experience />
        <Teaching />
        <Contact />
      </main>

      <footer className="bg-white py-8 border-t border-gray-100">
        <div className="container mx-auto px-6 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Yen-Hsiang Huang. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
