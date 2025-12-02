import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, Code2, Database, Layout, Terminal, ChevronRight, ArrowUp, X, ShieldCheck, Menu, Minus, Maximize2, ExternalLink, CheckCircle2, ArrowLeft, Activity, Wifi, Download } from 'lucide-react';

// --- HOOK: TÍTULO ANIMADO (CORRIGIDO E SEGURO) ---
const useTypewriterTitleLoop = (text) => {
  const state = useRef({ phase: 'typing', index: 0 });
  
  useEffect(() => {
    const originalTitle = document.title;
    let timer;
    
    const tick = () => {
      const s = state.current;
      let delay = 100;

      if (s.phase === 'typing') {
        if (s.index < text.length) { 
          s.index++; 
          delay = 100 + Math.random() * 50; 
        } else { 
          s.phase = 'pausing'; 
          delay = 3000; 
        }
      } else if (s.phase === 'pausing') {
          s.phase = 'deleting'; 
          delay = 50; 
      } else if (s.phase === 'deleting') {
        if (s.index > 0) { 
          s.index--; 
          delay = 40; 
        } else { 
          s.phase = 'typing'; 
          delay = 1000; 
        }
      }

      // Cursor piscante simulado
      const cursor = s.phase === 'pausing' ? ((Date.now() / 500) % 2 > 1 ? '_' : ' ') : '_';
      document.title = text.substring(0, s.index) + cursor;
      
      timer = setTimeout(tick, delay);
    };

    tick();
    return () => { clearTimeout(timer); document.title = originalTitle; };
  }, [text]);
};

// --- DADOS DOS PROJETOS ---
const projectsData = [
  {
    id: 1,
    active: true,
    title: "UPT Event Manager",
    subtitle: "Academic Project",
    description: "Platform to create, promote, and manage events, registrations, notifications, and participants easily.",
    longDescription: "Event management platform backed by a Spring Boot REST API. Users can create, publish, and edit events (title, description, date/time, location, category, capacity), manage attendee registrations and waitlists, and issue cancellations or reschedules with participant notifications. Search and filter events by date, category, or location, and use simple dashboards: organizers track registrations, occupancy and basic metrics while attendees view their enrollments and updates. Administrative controls allow moderation of events, categories, and participant lists, streamlining coordination and communication for both organizers and attendees.",
    features: [
      "Create and manage events with details, scheduling, and capacity.",
      "Register attendees and handle waitlists and cancellations.",
      "Search and filter events by date, category, and location.",
      "Send updates and provide simple dashboards for organizers and attendees."
    ],
    tags: ["Java", "Hibernate", "Maven"],
    // Imagem do projeto (usando ImgBB)
    image: "https://i.ibb.co/hJ2KfPwy/520550974-57080c2c-f014-4acd-9ec1-0c99dd6a061e.png",
    links: { live: "", github: "https://github.com/barbosaz1/Equipa10_comp2" } 
  },
  {
    id: 2,
    active: false,
    title: "Project Nexus",
    subtitle: "Java Backend Service",
    description: "High-performance RESTful API managing complex data relationships for e-commerce platforms.",
    longDescription: "Project Nexus is a microservice designed to handle complex data relationships. It focuses on clean architecture, utilizing DTOs for data transfer and custom exception handling for robust error reporting.",
    features: [
      "Spring Boot 3.0 REST API.",
      "Hibernate ORM & JPA mappings.",
      "JWT Authentication security.",
      "MySQL optimized indexing."
    ],
    tags: ["Java", "Spring Boot", "MySQL"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1374&auto=format&fit=crop",
    links: { live: "#", github: "#" }
  },
  {
    id: 3,
    active: false,
    title: "Neon Frames",
    subtitle: "UI Design System",
    description: "A comprehensive design system and brand identity focusing on usability and dark mode aesthetics.",
    longDescription: "Neon Frames is a complete design language built for a crypto analytics dashboard. It emphasizes clarity in complex data visualization while maintaining a striking, futuristic dark mode aesthetic.",
    features: [
      "Complete Figma component library.",
      "Atomic Design methodology.",
      "WCAG AA compliant colors.",
      "Interactive prototypes."
    ],
    tags: ["Figma", "UI/UX", "Branding"],
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1374&auto=format&fit=crop",
    links: { live: "#", github: "#" }
  },
  {
    id: 4,
    active: false,
    title: "Future Project A",
    subtitle: "Coming Soon",
    description: "Description pending...",
    longDescription: "Details coming soon.",
    features: ["Feature 1", "Feature 2"],
    tags: ["Tech A", "Tech B"],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1470&auto=format&fit=crop",
    links: { live: "#", github: "#" }
  },
  {
    id: 5,
    active: false,
    title: "Future Project B",
    subtitle: "Coming Soon",
    description: "Description pending...",
    longDescription: "Details coming soon.",
    features: ["Feature 1", "Feature 2"],
    tags: ["Tech A", "Tech B"],
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1470&auto=format&fit=crop",
    links: { live: "#", github: "#" }
  }
];

// --- DADOS DA TECH STACK ---
const techStack = {
  backend: [
    { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
    { name: "Spring Boot", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
    { name: "Hibernate", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/hibernate/hibernate-original.svg" },
    { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "C", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
  ],
  frontend: [
    { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
    { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  ],
  data: [ 
    { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    { name: "Maven", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/maven/maven-original.svg" },
    { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "R", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg" },
    { 
      name: "MIPS Assembly", 
      icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cG9seWdvbiBwb2ludHM9IjUwIDUgOTUgMjcuNSA5NSA3Mi41IDUwIDk1IDUgNzIuNSA1IDI3LjUiIGZpbGw9IiMzNzcyQTUiLz48dGV4dCB4PSI1MCIgeT0iNjUiIGZvbnQtZmFtaWx5PSJtb25vc3BhY2UiIGZvbnQtc2l6ZT0iMzUiIGZvbnQtd2VpZ2h0PSJib2xkIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSI+QVNNPC90ZXh0Pjwvc3ZnPg==" 
    }, 
  ],
  design: [
    { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
    { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  ]
};

// --- COMPONENTES UI ---

const HackerText = ({ text, className }) => {
  const [displayText, setDisplayText] = useState(text);
  useEffect(() => {
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplayText(text.split("").map((char, index) => {
          if (index < iterations) return text[index];
          return "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()"[Math.floor(Math.random() * 46)];
        }).join(""));
      if (iterations >= text.length) clearInterval(interval);
      iterations += 1 / 3;
    }, 30);
    return () => clearInterval(interval);
  }, [text]);
  return <span className={className}>{displayText}</span>;
};

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => window.scrollY > 300 ? setIsVisible(true) : setIsVisible(false);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  useEffect(() => { window.addEventListener('scroll', toggleVisibility); return () => window.removeEventListener('scroll', toggleVisibility); }, []);
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button 
          initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }} 
          onClick={scrollToTop} 
          className="fixed bottom-6 right-6 z-40 p-3 bg-green-500 text-black rounded-full shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:bg-green-400 hover:scale-110 transition-all duration-300"
        >
          <ArrowUp size={20} strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

const SectionHeading = ({ children }) => (
  <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex items-center gap-4 mb-16">
    <span className="text-green-500/50 text-xl font-mono font-bold">0x</span> 
    <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">{children}</h2>
    <div className="h-px bg-white/10 flex-1 ml-4" />
  </motion.div>
);

const TechLogoCard = ({ name, icon }) => (
  <motion.div 
    whileHover={{ y: -3, borderColor: "rgba(34, 197, 94, 0.4)" }}
    className="flex flex-col items-center justify-center p-4 bg-[#0a0a0a] border border-white/5 rounded-xl transition-all duration-300 group cursor-default relative overflow-hidden"
  >
    <div className="w-12 h-12 mb-3 flex items-center justify-center relative z-10">
       <div className="absolute inset-0 bg-green-500/0 blur-xl rounded-full group-hover:bg-green-500/10 transition-colors duration-500" />
       <img 
         src={icon} 
         alt={name} 
         className="w-10 h-10 object-contain relative z-10 drop-shadow-lg transition-transform duration-300 group-hover:scale-110"
         onError={(e) => { e.target.onerror = null; e.target.src = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/devicon/devicon-original.svg"; }}
       />
    </div>
    <span className="text-gray-500 text-xs font-mono group-hover:text-green-400 transition-colors">{name}</span>
  </motion.div>
);

const ProjectCard = ({ project, onClick }) => (
  <motion.div 
    whileHover={{ y: -8 }}
    onClick={onClick}
    className="group relative bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-green-900/20 hover:border-green-500/30 transition-all duration-500"
  >
    <div className="h-56 overflow-hidden relative">
       <div className="absolute inset-0 bg-green-900/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
       <motion.img 
         src={project.image} 
         alt={project.title} 
         className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" 
       />
    </div>
    <div className="p-8 flex flex-col gap-4">
      <div>
        <motion.h3 className="text-2xl font-bold text-white mb-1 group-hover:text-green-400 transition-colors">{project.title}</motion.h3>
        <span className="text-sm font-mono text-gray-500">{project.subtitle}</span>
      </div>
      <p className="text-gray-400 text-sm leading-relaxed">{project.description}</p>
      <div className="flex flex-wrap gap-2 mt-2">
        {project.tags.map(tag => (<span key={tag} className="text-[10px] uppercase tracking-wider font-mono text-green-400/80 bg-green-900/10 border border-green-500/10 px-2 py-1 rounded">{tag}</span>))}
      </div>
    </div>
  </motion.div>
);

// --- HUD VISUAL ---
const HeroHUD = () => {
  const calculateUptime = () => {
    const birthDate = new Date("2006-09-08"); 
    const now = new Date();
    let years = now.getFullYear() - birthDate.getFullYear();
    let months = now.getMonth() - birthDate.getMonth();
    if (months < 0) { years--; months += 12; }
    return `${years}Y ${months}M`;
  };
  const [uptime] = useState(calculateUptime());

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 0.8 }}
      className="hidden lg:block w-full max-w-sm aspect-square relative"
    >
      <div className="absolute inset-0 bg-green-500/5 rounded-full blur-3xl" />
      <div className="relative w-full h-full bg-[#0c0c0c]/80 border border-green-500/20 rounded-2xl backdrop-blur-md p-6 flex flex-col gap-6 overflow-hidden">
        <div className="flex justify-between items-center border-b border-green-500/20 pb-4">
          <div className="flex items-center gap-2 text-green-500"><Activity size={16} /><span className="text-xs font-mono tracking-widest">SYS_MONITOR</span></div>
          <div className="flex items-center gap-2"><span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /><span className="text-xs font-mono text-green-500/70">ONLINE</span></div>
        </div>
        <div className="space-y-4">
          {[{ label: "CORE_LOGIC", val: "85%" }, { label: "CREATIVITY_ENGINE", val: "92%" }, { label: "CAFFEINE_LEVEL", val: "40%" }].map((item, i) => (
            <div key={i}>
              <div className="flex justify-between text-[10px] font-mono text-gray-500 mb-1"><span>{item.label}</span><span>{item.val}</span></div>
              <div className="h-1.5 bg-green-900/20 rounded-full overflow-hidden"><motion.div className="h-full bg-green-500" initial={{ width: 0 }} animate={{ width: item.val }} transition={{ duration: 1.5, delay: 0.8 + (i * 0.2), ease: "easeOut" }} /></div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3 mt-auto">
          <div className="bg-black/40 p-3 rounded border border-green-500/10"><div className="text-[10px] text-gray-500 font-mono mb-1">UPTIME</div><div className="text-lg text-white font-mono">{uptime}</div></div>
          <div className="bg-black/40 p-3 rounded border border-green-500/10"><div className="text-[10px] text-gray-500 font-mono mb-1">NETWORK</div><div className="flex items-center gap-2 text-green-400"><Wifi size={14} /> <span className="text-sm font-mono">SECURE</span></div></div>
        </div>
      </div>
    </motion.div>
  );
};

// --- SNAKE GAME ---
const SnakeGame = ({ onClose }) => {
  const GRID_SIZE = 20; const CELL_SIZE = 20; const SPEED = 100;
  const [snake, setSnake] = useState([[5, 5], [5, 4], [5, 3]]);
  const [food, setFood] = useState([10, 10]);
  const [direction, setDirection] = useState("RIGHT");
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(parseInt(localStorage.getItem("snakeHighScore") || "0"));
  const gameRef = useRef(null);

  const generateFood = () => {
    let newFood;
    while (true) {
      newFood = [Math.floor(Math.random() * GRID_SIZE), Math.floor(Math.random() * GRID_SIZE)];
      const onSnake = snake.some(s => s[0] === newFood[0] && s[1] === newFood[1]);
      if (!onSnake) break;
    }
    setFood(newFood);
  };

  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      setSnake(prev => {
        const head = [prev[0][0], prev[0][1]];
        switch (direction) { case "RIGHT": head[1]++; break; case "LEFT": head[1]--; break; case "UP": head[0]--; break; case "DOWN": head[0]++; break; }
        if (head[0] < 0 || head[0] >= GRID_SIZE || head[1] < 0 || head[1] >= GRID_SIZE || prev.some(s => s[0] === head[0] && s[1] === head[1])) {
          setGameOver(true);
          if (score > highScore) { setHighScore(score); localStorage.setItem("snakeHighScore", score.toString()); }
          return prev;
        }
        const newSnake = [head, ...prev];
        if (head[0] === food[0] && head[1] === food[1]) { setScore(s => s + 10); generateFood(); } else { newSnake.pop(); }
        return newSnake;
      });
    }, SPEED);
    return () => clearInterval(interval);
  }, [direction, gameOver, food, score, highScore]);

  useEffect(() => {
    const handleKey = (e) => {
      if(["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)) { e.preventDefault(); }
      if (e.ctrlKey && e.key === 'c') { onClose(); return; }
      switch(e.key.toLowerCase()) {
        case "arrowup": case "w": if(direction !== "DOWN") setDirection("UP"); break;
        case "arrowdown": case "s": if(direction !== "UP") setDirection("DOWN"); break;
        case "arrowleft": case "a": if(direction !== "RIGHT") setDirection("LEFT"); break;
        case "arrowright": case "d": if(direction !== "LEFT") setDirection("RIGHT"); break;
        case "escape": onClose(); break;
      }
    };
    window.addEventListener("keydown", handleKey); gameRef.current?.focus(); return () => window.removeEventListener("keydown", handleKey);
  }, [direction, onClose]);

  return (
    <div ref={gameRef} tabIndex={0} className="flex flex-col items-center justify-center h-full bg-black/90 font-mono outline-none">
      <div className="mb-4 text-center"><h3 className="text-green-500 font-bold">SNAKE.EXE</h3><div className="text-sm">Score: {score} | Best: {highScore}</div></div>
      <div className="relative bg-[#111] border border-green-500/30" style={{ width: GRID_SIZE*CELL_SIZE, height: GRID_SIZE*CELL_SIZE }}>
        {snake.map((s, i) => (<div key={i} className="absolute bg-green-500" style={{ top: s[0]*CELL_SIZE, left: s[1]*CELL_SIZE, width: CELL_SIZE-1, height: CELL_SIZE-1 }} />))}
        <div className="absolute bg-red-500 rounded-full" style={{ top: food[0]*CELL_SIZE, left: food[1]*CELL_SIZE, width: CELL_SIZE-2, height: CELL_SIZE-2, margin: 1 }} />
        {gameOver && <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center"><span className="text-red-500 font-bold mb-2">GAME OVER</span><button onClick={() => {setSnake([[5,5],[5,4],[5,3]]); setScore(0); setGameOver(false); setDirection("RIGHT");}} className="px-4 py-2 bg-green-600 rounded text-black font-bold">RETRY</button><button onClick={onClose} className="mt-2 text-xs text-gray-500">EXIT (CTRL+C)</button></div>}
      </div>
      <div className="mt-4 text-xs text-gray-500">WASD / Arrows to move • CTRL+C to exit</div>
    </div>
  );
};

// --- TERMINAL SECRETO ---
const SecretTerminalModal = ({ isOpen, onClose }) => {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("");
  const [isBooting, setIsBooting] = useState(true);
  const [isMaximized, setIsMaximized] = useState(false);
  const [gameMode, setGameMode] = useState(false);
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  const commands = {
    help: "Available: about, skills, projects, contact, clear, snake, exit", 
    snake: "Launching Snake Game module...",
    whoami: "Role: Recruiter | Permissions: Hire_User",
    about: "Rodrigo Barbosa: Engineering Student, Creative Developer.",
    skills: "Core: Java, Python, C, MIPS Assembly. Web: React, Next.js. Tools: Docker, Git.",
    projects: "Check the UI for full details. Top picks: Portfolio, Nexus, Neon Frames.",
    contact: "Email: rb6544758@gmail.com | LinkedIn: /in/rodrigo-barbosa",
    exit: "Terminating session..."
  };

  useEffect(() => {
    if (isOpen) {
      setHistory([]); setInput(""); setIsBooting(true); setIsMaximized(false); setGameMode(false);
      const bootSequence = ["> System Check...", "> Connection Secure.", "> Welcome User."];
      let delay = 0;
      bootSequence.forEach((line, index) => {
        setTimeout(() => { setHistory(prev => [...prev, { type: 'output', content: line }]); if (index === bootSequence.length - 1) { setIsBooting(false); setTimeout(() => inputRef.current?.focus(), 100); } }, delay);
        delay += 250;
      });
    }
  }, [isOpen]);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [history]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      setHistory(prev => [...prev, { type: 'input', content: input }]);
      if (cmd === 'clear') setHistory([]); 
      else if (cmd === 'exit') onClose(); 
      else if (cmd === 'snake') setGameMode(true);
      else if (commands[cmd]) setHistory(prev => [...prev, { type: 'output', content: commands[cmd] }]); 
      else if (cmd !== "") setHistory(prev => [...prev, { type: 'error', content: `Err: ${cmd} not found` }]);
      setInput("");
    }
  };

  const toggleMaximize = (e) => { e.stopPropagation(); setIsMaximized(!isMaximized); };

  const modalVariants = {
    initial: { opacity: 0, scale: 0.95, y: 10 },
    animate: isMaximized 
      ? { opacity: 1, scale: 1, y: 0, width: "100%", height: "100%", borderRadius: 0 }
      : { opacity: 1, scale: 1, y: 0, width: "100%", height: "500px", borderRadius: "0.75rem" },
    exit: { opacity: 0, scale: 0.95, y: 10 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className={`fixed inset-0 z-[100] flex items-center justify-center ${isMaximized ? '' : 'p-4'} bg-black/60 backdrop-blur-sm`}>
          <div className="absolute inset-0" onClick={isMaximized ? undefined : onClose} />
          <motion.div 
            variants={modalVariants}
            initial="initial" animate="animate" exit="exit"
            transition={{ type: "spring", stiffness: 180, damping: 25 }}
            className={`bg-[#0c0c0c] border border-green-500/30 shadow-2xl flex flex-col overflow-hidden relative z-10 ${isMaximized ? 'w-screen h-screen m-0' : 'max-w-4xl w-full'}`}
          >
            <div className="bg-[#151515] px-4 py-3 border-b border-white/5 flex items-center justify-between shrink-0 handle select-none">
              <div className="flex gap-2">
                <button onClick={onClose} className="w-3 h-3 rounded-full bg-[#ff5f57] hover:opacity-80 transition-opacity" />
                <button onClick={onClose} className="w-3 h-3 rounded-full bg-[#febc2e] hover:opacity-80 transition-opacity" />
                <button onClick={toggleMaximize} className="w-3 h-3 rounded-full bg-[#28c840] hover:opacity-80 transition-opacity" />
              </div>
              <div className="text-green-500/50 text-xs font-mono">root@barbosa:~</div>
              <div className="w-10" /> 
            </div>
            {gameMode ? (
              <SnakeGame onClose={() => { setGameMode(false); setTimeout(() => inputRef.current?.focus(), 100); }} />
            ) : (
              <div className="flex-1 p-6 overflow-y-auto font-mono text-sm no-scrollbar" onClick={() => !isBooting && inputRef.current?.focus()}>
                {history.map((line, i) => (
                  <div key={i} className={`mb-1 ${line.type === 'error' ? 'text-red-400' : line.type === 'input' ? 'text-white' : 'text-green-400'}`}>
                    {line.type === 'input' ? <span><span className="text-green-600 font-bold">➜ ~ </span>{line.content}</span> : line.content}
                  </div>
                ))}
                {!isBooting && (
                  <div className="flex gap-2 text-white">
                    <span className="text-green-500 font-bold">➜ ~</span>
                    <input ref={inputRef} type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown} className="bg-transparent border-none outline-none flex-1 text-white caret-green-500" autoFocus />
                  </div>
                )}
                <div ref={bottomRef} />
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const HomeView = ({ onOpenTerminal, onSelectProject }) => {
  const handleScroll = (e, targetId) => {
    e.preventDefault();
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.4 }}
      className="max-w-6xl mx-auto px-4 md:px-12 pt-28 pb-16"
    >
      <section id="home" className="min-h-[85vh] flex items-center justify-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <p className="text-green-400 font-mono mb-6 text-sm tracking-widest uppercase">Hello, World</p>
              
              <div className="overflow-hidden mb-6">
                {/* CORREÇÃO CRÍTICA: Título estático para não causar conflito visual/crash */}
                <motion.h1 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white leading-[0.9]"
                >
                  Rodrigo 
                </motion.h1>
                <div className="flex">
                  <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-700 text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] mr-2"
                  >
                    <HackerText text="Barbosa" />
                  </motion.span>
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="text-5xl md:text-7xl lg:text-8xl font-black text-green-500"
                  >
                    _
                  </motion.span>
                </div>
              </div>

              <h2 className="text-lg md:text-xl text-gray-400 font-mono mb-10 max-w-lg font-light leading-relaxed">
                Engineering Student <span className="text-green-500 mx-2">•</span> Full-Stack <span className="text-green-500 mx-2">•</span> UI Design
              </h2>
              <div className="flex flex-wrap items-center gap-4">
                <button onClick={(e) => handleScroll(e, 'projects')} className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors">View Work</button>
                <button onClick={(e) => handleScroll(e, 'contact')} className="px-8 py-3 bg-white/5 text-white border border-white/10 font-bold rounded-full hover:bg-white/10 transition-colors">Contact</button>
                <motion.button 
                  onClick={onOpenTerminal}
                  whileHover={{ scale: 1.1, rotate: 15 }}
                  whileTap={{ scale: 0.9 }}
                  className="ml-4 p-3 bg-green-500/10 border border-green-500/30 text-green-400 rounded-xl hover:bg-green-500/20 transition-all cursor-pointer"
                >
                  <ShieldCheck size={24} />
                </motion.button>
              </div>
            </motion.div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <HeroHUD />
          </div>
        </div>
      </section>

      <section id="about" className="py-32">
        <SectionHeading>About Me</SectionHeading>
        <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-8 md:p-12 font-mono text-gray-300 leading-relaxed shadow-lg">
          <p className="mb-6 text-lg">I'm a student at <span className="text-white font-bold">Universidade Portucalense</span>, creating digital experiences that merge clean code with immersive design.</p>
          <div className="text-sm opacity-70 border-l-2 border-green-500 pl-4">
            <span className="text-purple-400">const</span> <span className="text-blue-400">mission</span> = <span className="text-green-400">"Build the bridge between logic and aesthetics"</span>;
          </div>
        </div>
      </section>

      <section id="skills" className="py-32">
        <SectionHeading>Tech Stack</SectionHeading>
        <div className="space-y-12">
          <div><h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-6 border-l-2 border-green-500 pl-3">Backend & Core</h3><div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">{techStack.backend.map(tech => <TechLogoCard key={tech.name} {...tech} />)}</div></div>
          <div><h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-6 border-l-2 border-blue-500 pl-3">Frontend & Web</h3><div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">{techStack.frontend.map(tech => <TechLogoCard key={tech.name} {...tech} />)}</div></div>
          <div><h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-6 border-l-2 border-purple-500 pl-3">Data & Tools</h3><div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">{[...techStack.data, ...techStack.design].map(tech => <TechLogoCard key={tech.name} {...tech} />)}</div></div>
        </div>
      </section>

      <section id="projects" className="py-32">
        <SectionHeading>Selected Works</SectionHeading>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData
            .filter(project => project.active === true) 
            .map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onClick={() => onSelectProject(project)} 
              />
            ))}
        </div>
      </section>
      
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-10" />

      <section id="contact" className="py-32 mb-20">
        <div className="bg-gradient-to-br from-[#051a10] via-[#0a0a0a] to-[#000] border border-green-500/20 rounded-3xl p-16 text-center relative overflow-hidden shadow-[0_0_50px_-12px_rgba(34,197,94,0.15)]">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500/50 to-transparent opacity-50" />
          <h2 className="text-4xl font-bold text-white mb-6 tracking-tight">Ready to collaborate?</h2>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">Let's build something extraordinary together.</p>
          <div className="flex justify-center gap-6 mt-8">
             <a href="mailto:rb6544758@gmail.com" className="p-4 bg-white/5 rounded-full hover:bg-white/10 hover:scale-110 transition-all text-white"><Mail size={24} /></a>
             <a href="https://github.com/barbosaz1" target="_blank" className="p-4 bg-white/5 rounded-full hover:bg-white/10 hover:scale-110 transition-all text-white"><Github size={24} /></a>
             <a href="https://www.linkedin.com/in/rodrigo-barbosa-1243b1397" target="_blank" className="p-4 bg-white/5 rounded-full hover:bg-white/10 hover:scale-110 transition-all text-white"><Linkedin size={24} /></a>
             <a href="/CV - Rodrigo Barbosa.pdf" download className="p-4 bg-green-600 rounded-full hover:bg-green-500 hover:scale-110 transition-all text-black shadow-lg shadow-green-900/20" title="Download CV"><Download size={24} /></a>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

const ProjectDetailsView = ({ project, onBack }) => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  // --- CORREÇÃO DE SEGURANÇA: Se o projeto não existir (erro de timing), não renderiza nada ---
  if (!project) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} 
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      className="max-w-5xl mx-auto px-4 md:px-12 pt-28 pb-20"
    >
      <button onClick={onBack} className="mb-8 flex items-center gap-2 text-gray-500 hover:text-green-400 transition-colors font-mono text-sm group">
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> BACK_TO_BASE
      </button>

      <motion.div layoutId={`card-container-${project.id}`} className="bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden mb-12 relative group">
        <div className="h-[400px] relative">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-90 z-10" />
          <motion.img layoutId={`card-image-${project.id}`} src={project.image} alt={project.title} className="w-full h-full object-cover" />
          <div className="absolute bottom-0 left-0 p-8 md:p-12 z-20">
             <motion.h1 layoutId={`card-title-${project.id}`} className="text-4xl md:text-6xl font-black text-white mb-2">{project.title}</motion.h1>
             <p className="text-xl text-green-400 font-mono">{project.subtitle}</p>
          </div>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2 space-y-10">
          <div><h3 className="text-xl font-bold text-white mb-4">Overview</h3><p className="text-gray-300 text-lg leading-relaxed">{project.longDescription}</p></div>
          <div className="bg-white/5 rounded-xl p-8 border border-white/5">
            <h3 className="text-green-400 font-mono font-bold mb-6 flex items-center gap-2"><Terminal size={18} /> System.features</h3>
            <ul className="space-y-4">
              {project.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-300"><CheckCircle2 size={18} className="text-green-500 mt-1 shrink-0" />{feature}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="space-y-8">
          <div className="bg-white/5 rounded-xl p-6 border border-white/5">
            <h3 className="text-white font-bold mb-4">Stack</h3>
            <div className="flex flex-wrap gap-2">{project.tags.map(tag => <span key={tag} className="px-3 py-1 bg-black text-green-400 text-xs rounded border border-green-500/20 font-mono">{tag}</span>)}</div>
          </div>
          <div className="flex flex-col gap-3">
             {project.links.live && project.links.live !== "" && (
               <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="w-full py-3 bg-green-600 hover:bg-green-500 text-black font-bold rounded-lg transition-all hover:scale-[1.02] flex justify-center items-center gap-2">
                 <ExternalLink size={18} /> Live Demo
               </a>
             )}
             {project.links.github && project.links.github !== "" && (
               <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="w-full py-3 bg-white/10 hover:bg-white/20 border border-white/10 text-white font-medium rounded-lg transition-all hover:scale-[1.02] flex justify-center items-center gap-2">
                 <Github size={18} /> Source Code
               </a>
             )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- APP ROOT ---
export default function Portfolio() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // --- ATIVA O TÍTULO ANIMADO EM LOOP (Suave) ---
  useTypewriterTitleLoop("Hi, I am Rodrigo 👋🏻");

  // --- HISTORY API HANDLING (BACK BUTTON) ---
  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state?.view === 'project') {
      } else {
        setCurrentView('home');
        setSelectedProject(null);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const navigateToProject = (project) => {
    window.history.pushState({ view: 'project', projectId: project.id }, '', `#project-${project.id}`);
    setSelectedProject(project);
    setCurrentView('project');
  };
  
  const navigateHome = () => { 
    if (currentView === 'project') {
       window.history.back();
    } else {
       setCurrentView('home'); 
       setTimeout(() => setSelectedProject(null), 500);
       window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-green-500/30 font-sans relative">
      <div className="fixed inset-0 pointer-events-none" 
        style={{ 
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
        }} 
      />
      <div className="fixed inset-0 pointer-events-none transition-opacity duration-300" style={{ background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(34, 197, 94, 0.08), transparent 40%)` }} />

      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-[#050505]/80 border-b border-white/5">
        <div className="flex justify-between items-center px-6 md:px-12 py-5 max-w-7xl mx-auto">
          <div className="text-xl font-bold font-mono cursor-pointer flex items-center gap-2 group" onClick={() => { navigateHome(); }}>
            <div className="p-1.5 bg-green-500/10 rounded-md border border-green-500/20 group-hover:border-green-500/50 transition-colors">
              <Terminal size={20} className="text-green-500" />
            </div>
            <span className="group-hover:text-green-400 transition-colors">Barbosa</span>
          </div>

          {currentView === 'home' ? (
            <div className="flex items-center gap-8">
              <div className="hidden md:flex gap-8 text-sm font-mono text-gray-400">
                {['About', 'Skills', 'Projects', 'Contact'].map((item, i) => (
                  <a key={item} href={`#${item.toLowerCase()}`} onClick={(e) => { e.preventDefault(); document.getElementById(item.toLowerCase())?.scrollIntoView({behavior:'smooth'}) }} className="hover:text-green-400 transition-colors">
                    <span className="text-green-500">0{i+1}</span> // {item}
                  </a>
                ))}
              </div>
              <a href="/CV - Rodrigo Barbosa.pdf" download className="hidden md:flex items-center gap-2 text-xs font-mono text-green-400 border border-green-500/30 px-3 py-1.5 rounded hover:bg-green-500/10 transition-colors">
                <Download size={14} /> CV
              </a>
            </div>
          ) : (
            <button onClick={navigateHome} className="text-sm font-mono text-gray-400 hover:text-white transition-colors flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"/> LIVE_VIEW
            </button>
          )}
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {currentView === 'home' ? (
          <HomeView key="home" onOpenTerminal={() => setIsTerminalOpen(true)} onSelectProject={navigateToProject} />
        ) : (
          <ProjectDetailsView key="project" project={selectedProject} onBack={navigateHome} />
        )}
      </AnimatePresence>

      <ScrollToTop />
      <SecretTerminalModal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />
    </div>
  );
}
