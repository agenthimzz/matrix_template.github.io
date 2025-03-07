
import React, { useEffect, useRef } from 'react';
import { typeText } from '../utils/terminalUtils';

interface TerminalOutputProps {
  content: string;
  type?: 'default' | 'error' | 'success' | 'info';
  delay?: number;
  typingSpeed?: number;
  className?: string;
  instant?: boolean;
}

const TerminalOutput: React.FC<TerminalOutputProps> = ({
  content,
  type = 'default',
  delay = 0,
  typingSpeed = 20,
  className = '',
  instant = false
}) => {
  const outputRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (instant && outputRef.current) {
        outputRef.current.textContent = content;
        return;
      }
      
      typeText(content, outputRef.current, typingSpeed);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [content, delay, typingSpeed, instant]);
  
  const getTypeColor = () => {
    switch (type) {
      case 'error':
        return 'text-matrix-error';
      case 'success':
        return 'text-matrix-text';
      case 'info':
        return 'text-matrix-highlight';
      default:
        return 'text-matrix-dimmed';
    }
  };
  
  return (
    <div 
      ref={outputRef}
      className={`font-mono whitespace-pre-line mb-2 ${getTypeColor()} ${className}`}
    ></div>
  );
};

export default TerminalOutput;
