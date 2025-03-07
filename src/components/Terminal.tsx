
import React, { useState, useRef, useEffect } from 'react';
import TerminalPrompt from './TerminalPrompt';
import TerminalOutput from './TerminalOutput';
import TerminalCommand from './TerminalCommand';
import { simulateBootup } from '../utils/terminalUtils';
import data from '../data/terminalData';

const Terminal: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [bootupComplete, setBootupComplete] = useState(false);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [outputHistory, setOutputHistory] = useState<JSX.Element[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);
  const bootupContainerRef = useRef<HTMLDivElement>(null);
  
  // Simulate terminal bootup sequence
  useEffect(() => {
    if (loading && bootupContainerRef.current) {
      simulateBootup(
        data.bootupSequence, 
        bootupContainerRef.current, 
        () => {
          setTimeout(() => {
            setLoading(false);
            setBootupComplete(true);
          }, 1000);
        }
      );
    }
  }, [loading]);
  
  // Scroll to bottom when output changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [outputHistory]);
  
  // Handle command execution
  const handleCommand = (command: string) => {
    // Add command to history
    setCommandHistory(prev => [...prev, command]);
    
    // Add command and output to terminal
    setOutputHistory(prev => [
      ...prev,
      <div key={`cmd-${prev.length}`} className="flex items-start mb-2">
        <span className="text-matrix-highlight font-mono mr-2">user@matrix:~$</span>
        <span className="text-matrix-text font-mono">{command}</span>
      </div>,
      <div key={`output-${prev.length}`}>
        <TerminalCommand 
          command={command}
          aboutMe={data.aboutMe}
          projects={data.projects}
          skills={data.skills}
          contact={data.contact}
          onClear={() => setOutputHistory([])}
        />
      </div>
    ]);
  };
  
  return (
    <div className="crt-screen terminal-window w-full max-w-5xl mx-auto h-[85vh] overflow-hidden">
      <div className="terminal-header">
        <div className="terminal-title">matrix-terminal@portfolio</div>
        <div className="terminal-controls">
          <div className="terminal-control bg-red-500"></div>
          <div className="terminal-control bg-yellow-500"></div>
          <div className="terminal-control bg-green-500"></div>
        </div>
      </div>
      
      <div 
        ref={terminalRef}
        className="h-[calc(100%-3rem)] overflow-y-auto p-3 pb-5"
      >
        {loading ? (
          <div ref={bootupContainerRef}></div>
        ) : (
          <>
            {bootupComplete && (
              <div className="mb-6">
                <div className="text-center mb-6">
                  <pre className="text-matrix-text inline-block text-xs sm:text-sm md:text-base">
{`
 ███╗   ███╗ █████╗ ████████╗██████╗ ██╗██╗  ██╗
 ████╗ ████║██╔══██╗╚══██╔══╝██╔══██╗██║╚██╗██╔╝
 ██╔████╔██║███████║   ██║   ██████╔╝██║ ╚███╔╝ 
 ██║╚██╔╝██║██╔══██║   ██║   ██╔══██╗██║ ██╔██╗ 
 ██║ ╚═╝ ██║██║  ██║   ██║   ██║  ██║██║██╔╝ ██╗
 ╚═╝     ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝╚═╝  ╚═╝
                                                 
 ██████╗  ██████╗ ██████╗ ████████╗███████╗ ██████╗ ██╗     ██╗ ██████╗     
 ██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝██╔═══██╗██║     ██║██╔═══██╗    
 ██████╔╝██║   ██║██████╔╝   ██║   █████╗  ██║   ██║██║     ██║██║   ██║    
 ██╔═══╝ ██║   ██║██╔══██╗   ██║   ██╔══╝  ██║   ██║██║     ██║██║   ██║    
 ██║     ╚██████╔╝██║  ██║   ██║   ██║     ╚██████╔╝███████╗██║╚██████╔╝    
 ╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝      ╚═════╝ ╚══════╝╚═╝ ╚═════╝     
`}
                  </pre>
                </div>
                <div className="text-matrix-text mb-1">Welcome to my portfolio terminal.</div>
                <div className="text-matrix-dimmed mb-3">Type 'help' to see available commands.</div>
              </div>
            )}
            
            {outputHistory}
            
            <TerminalPrompt 
              onCommand={handleCommand} 
              history={commandHistory}
              autoFocus={true}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Terminal;
