
import React, { useState, useRef, useEffect, KeyboardEvent } from 'react';

interface TerminalPromptProps {
  prompt?: string;
  onCommand: (command: string) => void;
  disabled?: boolean;
  autoFocus?: boolean;
  history?: string[];
}

const TerminalPrompt: React.FC<TerminalPromptProps> = ({
  prompt = 'user@matrix:~$',
  onCommand,
  disabled = false,
  autoFocus = true,
  history = []
}) => {
  const [input, setInput] = useState('');
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Focus input on mount
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);
  
  // Handle command submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (input.trim() && !disabled) {
      onCommand(input.trim());
      setInput('');
      setHistoryIndex(-1);
    }
  };
  
  // Handle key navigation for history
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (history.length === 0) return;
    
    // Up arrow - navigate back in history
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const newIndex = historyIndex < history.length - 1 ? historyIndex + 1 : historyIndex;
      setHistoryIndex(newIndex);
      setInput(history[history.length - 1 - newIndex] || '');
    }
    
    // Down arrow - navigate forward in history
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex <= 0) {
        setHistoryIndex(-1);
        setInput('');
      } else {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex] || '');
      }
    }

    // Tab completion - simple implementation
    if (e.key === 'Tab') {
      e.preventDefault();
      const commonCommands = ['help', 'about', 'projects', 'skills', 'contact', 'clear', 'ls', 'cat'];
      
      const inputParts = input.split(' ');
      const lastPart = inputParts[inputParts.length - 1];
      
      if (lastPart) {
        const matches = commonCommands.filter(cmd => cmd.startsWith(lastPart));
        if (matches.length === 1) {
          inputParts[inputParts.length - 1] = matches[0];
          setInput(inputParts.join(' ') + ' ');
        }
      }
    }
  };
  
  // Handle regular input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  
  return (
    <form onSubmit={handleSubmit} className="flex items-center mb-2">
      <span className="text-matrix-highlight font-mono mr-2">{prompt}</span>
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        autoComplete="off"
        autoCapitalize="off"
        spellCheck="false"
        className="terminal-input flex-1 bg-transparent border-none outline-none text-matrix-text font-mono"
      />
      {input.length === 0 && (
        <span className="terminal-cursor animate-cursor-blink"></span>
      )}
    </form>
  );
};

export default TerminalPrompt;
