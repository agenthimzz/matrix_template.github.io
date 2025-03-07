
import React, { useState, useEffect } from 'react';
import DigitalRain from '../components/DigitalRain';
import Terminal from '../components/Terminal';
import { Terminal as TerminalIcon, Github, Mail, Linkedin } from 'lucide-react';

const Index = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="animate-pulse mb-4">
            <TerminalIcon size={48} className="text-matrix-text mx-auto" />
          </div>
          <p className="text-matrix-text text-xl font-mono">Initializing...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-matrix-bg overflow-hidden relative">
      {/* Background Digital Rain */}
      <DigitalRain />
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col py-8 px-4">
        <header className="mb-6">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center">
              <TerminalIcon className="text-matrix-text mr-2" />
              <span className="text-matrix-text font-mono">Terminal Portfolio</span>
            </div>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/example" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-matrix-dimmed hover:text-matrix-text transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a 
                href="mailto:contact@example.com" 
                className="text-matrix-dimmed hover:text-matrix-text transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
              <a 
                href="https://linkedin.com/in/example" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-matrix-dimmed hover:text-matrix-text transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </header>
        
        <main className="flex-1 flex items-center justify-center">
          <Terminal />
        </main>
        
        <footer className="mt-6">
          <div className="container mx-auto text-center text-matrix-dimmed text-sm font-mono">
            <p>© {new Date().getFullYear()} Matrix Terminal Portfolio</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
