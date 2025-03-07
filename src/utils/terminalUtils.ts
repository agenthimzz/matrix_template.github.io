
// Helper function to simulate typing animation
export const typeText = (
  text: string,
  element: HTMLElement | null,
  speed: number = 30,
  callback?: () => void
): void => {
  if (!element) return;
  
  element.textContent = '';
  let i = 0;
  
  const typing = setInterval(() => {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(typing);
      if (callback) callback();
    }
  }, speed);
};

// Function to parse terminal commands
export const parseCommand = (input: string): { command: string; args: string[] } => {
  const parts = input.trim().split(' ');
  const command = parts[0].toLowerCase();
  const args = parts.slice(1);
  
  return { command, args };
};

// Function to generate a random delay between min and max milliseconds
export const randomDelay = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// Function to simulate a system bootup sequence
export const simulateBootup = (
  lines: string[],
  container: HTMLElement | null,
  onComplete?: () => void
): void => {
  if (!container) return;
  
  let lineIndex = 0;
  
  const processNextLine = () => {
    if (lineIndex >= lines.length) {
      if (onComplete) onComplete();
      return;
    }
    
    const line = lines[lineIndex];
    const lineElement = document.createElement('div');
    lineElement.className = 'mb-1 terminal-text';
    container.appendChild(lineElement);
    
    typeText(line, lineElement, randomDelay(20, 50), () => {
      setTimeout(() => {
        lineIndex++;
        processNextLine();
      }, randomDelay(100, 300));
    });
  };
  
  processNextLine();
};

// Function to generate an ASCII art banner
export const generateASCIIBanner = (text: string): string => {
  // This is a simple implementation - you can use more complex ASCII art generators
  const lines = [];
  const borderTop = '┌' + '─'.repeat(text.length + 2) + '┐';
  const borderBottom = '└' + '─'.repeat(text.length + 2) + '┘';
  
  lines.push(borderTop);
  lines.push(`│ ${text} │`);
  lines.push(borderBottom);
  
  return lines.join('\n');
};

// Function to add glitch effect to terminal text
export const addGlitchEffect = (element: HTMLElement | null, duration: number = 200): void => {
  if (!element) return;
  
  element.classList.add('glitch');
  
  setTimeout(() => {
    element.classList.remove('glitch');
  }, duration);
};

// Generate a terminal timestamp
export const getTerminalTimestamp = (): string => {
  const now = new Date();
  return `[${now.toISOString().replace('T', ' ').substring(0, 19)}]`;
};
