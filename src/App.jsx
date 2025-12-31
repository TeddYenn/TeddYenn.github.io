import React from 'react';
import Header from './components/Header';
import Hero from './sections/Hero';
import Research from './sections/Research';
import Experience from './sections/Experience';
import Teaching from './sections/Teaching';
import Contact from './sections/Contact';

function App() {
  return (
    <div className="min-h-screen bg-background dark:bg-gray-900 text-gray-800 dark:text-gray-100 font-sans selection:bg-primary/20 selection:text-primary transition-colors duration-300">
      <Header />
      <main>
        <Hero />
        <Experience />
        <Research />
        <Teaching />
        <Contact />
      </main>

      <footer className="bg-white dark:bg-gray-900 py-8 border-t border-gray-100 dark:border-gray-800 transition-colors duration-300">
        <div className="container mx-auto px-6 text-center text-gray-400 dark:text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Yen-Hsiang Huang. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
