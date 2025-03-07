
import React from 'react';
import { parseCommand } from '../utils/terminalUtils';
import { AboutMe, Project, Skill, Contact } from '../data/terminalData';

interface TerminalCommandProps {
  command: string;
  aboutMe: AboutMe;
  projects: Project[];
  skills: Skill[];
  contact: Contact;
  onClear: () => void;
}

const TerminalCommand: React.FC<TerminalCommandProps> = ({
  command,
  aboutMe,
  projects,
  skills,
  contact,
  onClear
}) => {
  const { command: cmd, args } = parseCommand(command);
  
  // Process the command
  switch (cmd) {
    case 'help':
      return (
        <>
          <div className="text-matrix-highlight mb-4">Available commands:</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
            <div>
              <span className="text-matrix-text font-bold">help</span>
              <span className="text-matrix-dimmed ml-2">Show available commands</span>
            </div>
            <div>
              <span className="text-matrix-text font-bold">about</span>
              <span className="text-matrix-dimmed ml-2">Display information about me</span>
            </div>
            <div>
              <span className="text-matrix-text font-bold">ls</span>
              <span className="text-matrix-dimmed ml-2">List available sections or projects</span>
            </div>
            <div>
              <span className="text-matrix-text font-bold">cat [file]</span>
              <span className="text-matrix-dimmed ml-2">Show content of a file</span>
            </div>
            <div>
              <span className="text-matrix-text font-bold">projects</span>
              <span className="text-matrix-dimmed ml-2">Display my projects</span>
            </div>
            <div>
              <span className="text-matrix-text font-bold">skills</span>
              <span className="text-matrix-dimmed ml-2">Show my skills</span>
            </div>
            <div>
              <span className="text-matrix-text font-bold">contact</span>
              <span className="text-matrix-dimmed ml-2">Display contact information</span>
            </div>
            <div>
              <span className="text-matrix-text font-bold">clear</span>
              <span className="text-matrix-dimmed ml-2">Clear the terminal</span>
            </div>
          </div>
          <div className="text-matrix-dimmed mb-2">
            Try more commands: whoami, date, echo [text], sudo [command]
          </div>
        </>
      );
      
    case 'about':
    case 'whoami':
      return (
        <div className="mb-4">
          <div className="text-matrix-highlight text-xl mb-2">{aboutMe.name}</div>
          <div className="text-matrix-text mb-2">{aboutMe.title}</div>
          <div className="text-matrix-dimmed mb-4">{aboutMe.summary}</div>
          <div className="border-l-2 border-matrix-border pl-4 mb-4">
            {aboutMe.details.map((detail, index) => (
              <div key={index} className="mb-1">{detail}</div>
            ))}
          </div>
        </div>
      );
      
    case 'ls':
      if (args.length > 0 && args[0] === 'projects') {
        return (
          <div className="mb-4">
            <div className="text-matrix-highlight mb-2">Project files:</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {projects.map((project) => (
                <div key={project.id} className="flex">
                  <span className="text-matrix-text">{project.id}</span>
                  <span className="text-matrix-dimmed ml-2">- {project.year}</span>
                </div>
              ))}
            </div>
          </div>
        );
      } else {
        return (
          <div className="mb-4">
            <div className="text-matrix-highlight mb-2">Available sections:</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="text-matrix-text">about_me.txt</div>
              <div className="text-matrix-text">projects/</div>
              <div className="text-matrix-text">skills.json</div>
              <div className="text-matrix-text">contact.cfg</div>
            </div>
          </div>
        );
      }
      
    case 'cat':
      if (args.length === 0) {
        return <div className="text-matrix-error mb-4">Error: Please specify a file name</div>;
      }
      
      const fileName = args[0].toLowerCase();
      
      if (fileName === 'about_me.txt') {
        return (
          <div className="mb-4">
            <div className="text-matrix-highlight text-xl mb-2">{aboutMe.name}</div>
            <div className="text-matrix-text mb-2">{aboutMe.title}</div>
            <div className="text-matrix-dimmed mb-4">{aboutMe.summary}</div>
            <div className="border-l-2 border-matrix-border pl-4 mb-4">
              {aboutMe.details.map((detail, index) => (
                <div key={index} className="mb-1">{detail}</div>
              ))}
            </div>
          </div>
        );
      } else if (fileName === 'skills.json') {
        return (
          <div className="mb-4">
            <div className="text-matrix-highlight mb-2">Skills:</div>
            <pre className="bg-black bg-opacity-50 p-3 rounded border border-matrix-border mb-4 overflow-x-auto">
              {JSON.stringify({ skills }, null, 2)}
            </pre>
          </div>
        );
      } else if (fileName === 'contact.cfg') {
        return (
          <div className="mb-4">
            <div className="text-matrix-highlight mb-2">Contact Information:</div>
            <pre className="bg-black bg-opacity-50 p-3 rounded border border-matrix-border mb-4 overflow-x-auto">
              {`# Contact Configuration
EMAIL=${contact.email}
GITHUB=${contact.github}
LINKEDIN=${contact.linkedin}
${contact.twitter ? `TWITTER=${contact.twitter}` : '# TWITTER=disabled'}`}
            </pre>
          </div>
        );
      } else {
        // Check if it's a project file
        const project = projects.find(p => p.id.toLowerCase() === fileName);
        
        if (project) {
          return (
            <div className="mb-4">
              <div className="text-matrix-highlight text-xl mb-2">{project.name}</div>
              <div className="text-matrix-dimmed mb-4">{project.description}</div>
              <div className="mb-2">
                <span className="text-matrix-text">Technologies: </span>
                {project.technologies.join(', ')}
              </div>
              {project.url && (
                <div className="mb-2">
                  <span className="text-matrix-text">URL: </span>
                  <a href={project.url} target="_blank" rel="noopener noreferrer" className="terminal-link">
                    {project.url}
                  </a>
                </div>
              )}
              {project.githubUrl && (
                <div className="mb-2">
                  <span className="text-matrix-text">GitHub: </span>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="terminal-link">
                    {project.githubUrl}
                  </a>
                </div>
              )}
            </div>
          );
        } else {
          return <div className="text-matrix-error mb-4">Error: File '{fileName}' not found</div>;
        }
      }
      
    case 'projects':
      return (
        <div className="mb-4">
          <div className="text-matrix-highlight mb-2">Projects:</div>
          {projects.map((project) => (
            <div key={project.id} className="mb-6 border-l-2 border-matrix-border pl-4">
              <div className="text-matrix-text text-lg mb-1">{project.name}</div>
              <div className="text-matrix-dimmed mb-2">{project.description}</div>
              <div className="flex flex-wrap gap-2 mb-2">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="bg-matrix-border bg-opacity-30 px-2 py-1 rounded text-sm">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-4 mt-2">
                {project.url && (
                  <a href={project.url} target="_blank" rel="noopener noreferrer" className="terminal-link">
                    Live Demo
                  </a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="terminal-link">
                    View Code
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      );
      
    case 'skills':
      return (
        <div className="mb-4">
          <div className="text-matrix-highlight mb-2">Skills:</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skills.map((skillGroup) => (
              <div key={skillGroup.category} className="mb-4">
                <div className="text-matrix-text mb-2">{skillGroup.category}</div>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill, index) => (
                    <span key={index} className="bg-matrix-border bg-opacity-30 px-2 py-1 rounded text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
      
    case 'contact':
      return (
        <div className="mb-4">
          <div className="text-matrix-highlight mb-2">Contact Information:</div>
          <div className="mb-6">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <div className="text-matrix-text mb-1">Email</div>
                <a href={`mailto:${contact.email}`} className="terminal-link">
                  {contact.email}
                </a>
              </div>
              <div>
                <div className="text-matrix-text mb-1">GitHub</div>
                <a href={contact.github} target="_blank" rel="noopener noreferrer" className="terminal-link">
                  {contact.github}
                </a>
              </div>
              <div>
                <div className="text-matrix-text mb-1">LinkedIn</div>
                <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="terminal-link">
                  {contact.linkedin}
                </a>
              </div>
              {contact.twitter && (
                <div>
                  <div className="text-matrix-text mb-1">Twitter</div>
                  <a href={contact.twitter} target="_blank" rel="noopener noreferrer" className="terminal-link">
                    {contact.twitter}
                  </a>
                </div>
              )}
            </div>
          </div>
          
          <form className="mb-4 bg-black bg-opacity-50 p-4 rounded border border-matrix-border">
            <div className="text-matrix-text mb-4">Send a message:</div>
            <div className="mb-4">
              <label className="block text-matrix-dimmed mb-1">Name:</label>
              <input 
                type="text" 
                className="w-full bg-black bg-opacity-70 border border-matrix-border rounded p-2 text-matrix-text focus:border-matrix-text focus:ring-1 focus:ring-matrix-text"
              />
            </div>
            <div className="mb-4">
              <label className="block text-matrix-dimmed mb-1">Email:</label>
              <input 
                type="email" 
                className="w-full bg-black bg-opacity-70 border border-matrix-border rounded p-2 text-matrix-text focus:border-matrix-text focus:ring-1 focus:ring-matrix-text"
              />
            </div>
            <div className="mb-4">
              <label className="block text-matrix-dimmed mb-1">Message:</label>
              <textarea 
                rows={4}
                className="w-full bg-black bg-opacity-70 border border-matrix-border rounded p-2 text-matrix-text focus:border-matrix-text focus:ring-1 focus:ring-matrix-text"
              ></textarea>
            </div>
            <button type="button" className="terminal-button">
              > transmit_message
            </button>
          </form>
        </div>
      );
      
    case 'clear':
      onClear();
      return null;
      
    case 'date':
      return (
        <div className="text-matrix-dimmed mb-4">
          {new Date().toString()}
        </div>
      );
      
    case 'echo':
      return (
        <div className="text-matrix-text mb-4">
          {args.join(' ') || ''}
        </div>
      );
      
    case 'sudo':
      if (args.length === 0) {
        return <div className="text-matrix-error mb-4">Error: sudo requires a command</div>;
      }
      
      return (
        <div className="text-matrix-error mb-4">
          Access denied: Nice try! Sudo privileges are restricted in this terminal.
        </div>
      );

    case '':
      return null;
      
    default:
      return (
        <div className="text-matrix-error mb-4">
          Command not found: {cmd}. Type 'help' for available commands.
        </div>
      );
  }
};

export default TerminalCommand;
