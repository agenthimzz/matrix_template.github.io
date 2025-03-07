
// Portfolio content data

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  url?: string;
  githubUrl?: string;
  year: number;
  image?: string;
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Contact {
  email: string;
  github: string;
  linkedin: string;
  twitter?: string;
}

export interface AboutMe {
  name: string;
  title: string;
  summary: string;
  details: string[];
}

export interface PortfolioData {
  aboutMe: AboutMe;
  projects: Project[];
  skills: Skill[];
  contact: Contact;
  bootupSequence: string[];
}

const data: PortfolioData = {
  aboutMe: {
    name: "John Doe",
    title: "Full Stack Developer",
    summary: "Hacking the matrix of web development with a passion for clean code and elegant solutions.",
    details: [
      "I'm a developer with 5+ years of experience building robust applications.",
      "Currently focusing on React, TypeScript, and Node.js ecosystem.",
      "Background in cybersecurity and system architecture.",
      "Passionate about open-source contributions and continuous learning.",
      "When not coding, I enjoy sci-fi, mechanical keyboards, and exploring virtual worlds."
    ]
  },
  
  projects: [
    {
      id: "project1_final.exe",
      name: "Neural Network Visualizer",
      description: "An interactive tool for visualizing neural network architectures and data flow in real-time.",
      technologies: ["React", "TypeScript", "D3.js", "TensorFlow.js"],
      url: "https://neural-viz.example.com",
      githubUrl: "https://github.com/example/neural-viz",
      year: 2023
    },
    {
      id: "secure_gateway.sys",
      name: "Secure API Gateway",
      description: "A highly secure API gateway with advanced rate limiting and JWT authentication.",
      technologies: ["Node.js", "Express", "Redis", "Docker"],
      githubUrl: "https://github.com/example/secure-gateway",
      year: 2022
    },
    {
      id: "hackathon_entry_2024.log",
      name: "Quantum Chat",
      description: "A real-time chat application with end-to-end encryption and self-destructing messages.",
      technologies: ["React", "Firebase", "WebCrypto API", "TailwindCSS"],
      url: "https://quantum-chat.example.com",
      githubUrl: "https://github.com/example/quantum-chat",
      year: 2024
    },
    {
      id: "data_analyzer.pkg",
      name: "Sentiment Analysis Dashboard",
      description: "A dashboard for analyzing sentiment in social media data with ML-based classification.",
      technologies: ["Python", "Flask", "Scikit-learn", "Chart.js"],
      githubUrl: "https://github.com/example/sentiment-dashboard",
      year: 2021
    }
  ],
  
  skills: [
    {
      category: "Languages",
      items: ["JavaScript", "TypeScript", "Python", "Go", "SQL", "HTML/CSS"]
    },
    {
      category: "Frameworks",
      items: ["React", "Next.js", "Node.js", "Express", "Flask", "TailwindCSS"]
    },
    {
      category: "Tools",
      items: ["Git", "Docker", "AWS", "Firebase", "GraphQL", "Jest"]
    },
    {
      category: "Practices",
      items: ["CI/CD", "TDD", "Agile/Scrum", "Microservices", "System Design"]
    }
  ],
  
  contact: {
    email: "contact@example.com",
    github: "https://github.com/example",
    linkedin: "https://linkedin.com/in/example",
    twitter: "https://twitter.com/example"
  },
  
  bootupSequence: [
    "Initializing Personal Portfolio v1.0...",
    "Loading system modules...",
    "Establishing secure connection...",
    "Verifying credentials...",
    "Loading personal data...",
    "Scanning for vulnerabilities...",
    "System check: OK",
    "Welcome to John Doe's Terminal",
    "Access Granted. Type 'help' for available commands."
  ]
};

export default data;
