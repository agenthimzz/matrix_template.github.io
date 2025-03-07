
import React, { useEffect, useRef } from 'react';

const DigitalRain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Matrix characters: letters, numbers, and special symbols
    const matrixChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%"\'#&_(),.;:?!\\|{}<>[]^~';
    
    // Column settings
    const fontSize = 14;
    const columns = Math.ceil(canvas.width / fontSize);
    
    // Array to track the y position of each column
    const drops: number[] = Array(columns).fill(1);
    
    // Draw the matrix rain
    const drawMatrixRain = () => {
      // Apply semi-transparent black to create the fade effect for previous characters
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Set the character color and font
      ctx.fillStyle = '#00FF41';
      ctx.font = `${fontSize}px JetBrains Mono, monospace`;
      
      // Draw each character
      for (let i = 0; i < drops.length; i++) {
        // Random character
        const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        
        // Varying brightness for characters
        const brightness = Math.random() * 0.5 + 0.5; // Between 0.5 and 1
        ctx.fillStyle = `rgba(0, ${Math.floor(255 * brightness)}, ${Math.floor(65 * brightness)}, ${brightness})`;
        
        // Draw the character
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        
        // Move to the next position or reset to top
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        
        // Increment y position
        drops[i]++;
      }
    };
    
    // Animation loop
    const animationId = setInterval(drawMatrixRain, 50);
    
    // Cleanup
    return () => {
      clearInterval(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full z-0"
      style={{ opacity: 0.7 }}
    />
  );
};

export default DigitalRain;
