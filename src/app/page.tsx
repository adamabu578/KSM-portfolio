"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Download, CheckCircle2, ChevronRight, Menu, Folder, FileCode2 } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence, useInView } from 'framer-motion';

const Typewriter = ({ text, delay = 50, cursorClassName, startDelay = 0, hideCursorOnComplete = false }: { text: string, delay?: number, cursorClassName?: string, startDelay?: number, hideCursorOnComplete?: boolean }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(startDelay === 0);

  useEffect(() => {
    if (startDelay > 0) {
      const startTimeout = setTimeout(() => {
        setHasStarted(true);
      }, startDelay);
      return () => clearTimeout(startTimeout);
    }
  }, [startDelay]);

  useEffect(() => {
    if (!hasStarted) return;
    
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text, hasStarted]);

  const isComplete = currentIndex === text.length;

  return (
    <span className="whitespace-pre-line relative inline-flex items-end">
      {currentText}
      {(!isComplete || !hideCursorOnComplete) && (
        <motion.span 
          animate={{ opacity: [1, 0, 1] }} 
          transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
          className={`inline-block bg-[#FF6F4A] ml-1 ${cursorClassName || "w-[8px] md:w-[16px] h-[50px] md:h-[90px] mb-2 md:mb-4"}`}
        />
      )}
    </span>
  );
};

// Component to count up numbers
const Counter = ({ from = 0, to, duration = 2 }: { from?: number, to: number, duration?: number }) => {
  const [count, setCount] = useState(from);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  useEffect(() => {
    if (!isInView) return;
    let startTimestamp: number;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      setCount(Math.floor(progress * (to - from) + from));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [to, from, duration, isInView]);

  return <span ref={ref}>{count}</span>;
};

export default function Home() {
  const { scrollYProgress } = useScroll();
  const yHeroDeco = useTransform(scrollYProgress, [0, 0.5], [0, 200]);
  const rotateHeroDeco = useTransform(scrollYProgress, [0, 0.5], [-6, 10]);
  const [isFolderOpen, setIsFolderOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F5F5F5] text-[#1A3649] font-sans selection:bg-[#FF6F4A] selection:text-white">
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, type: "spring", damping: 20 }}
        className="sticky top-0 z-50 bg-white border-b border-[#E5E5E5] flex justify-between items-center px-6 md:px-10 py-4 w-full"
      >
        <div className="flex items-center space-x-2">
          <span className="text-4xl md:text-5xl font-display font-black tracking-tighter uppercase text-[#1A3649]">
            Adamu<span className="text-[#FF6F4A]">.</span>
          </span>
        </div>
        
        <div className="hidden md:flex space-x-12 text-[11px] font-bold uppercase tracking-[0.15em] text-[#1A3649]">
          <a href="#home" className="hover:text-[#FF6F4A] transition-colors hover:-translate-y-0.5 transform">Home</a>
          <a href="#services" className="hover:text-[#FF6F4A] transition-colors hover:-translate-y-0.5 transform">Services</a>
          <a href="#projects" className="hover:text-[#FF6F4A] transition-colors hover:-translate-y-0.5 transform">Works</a>
          <a href="#contact" className="hover:text-[#FF6F4A] transition-colors hover:-translate-y-0.5 transform">Contact</a>
        </div>
        
        <div className="flex items-center gap-6">
          <button className="md:hidden text-[#1A3649]">
            <Menu size={24} />
          </button>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <header id="home" className="relative w-full bg-[#1A3649] text-white overflow-hidden py-24 md:py-32 px-6 md:px-10 flex items-center min-h-[85vh]">
        {/* Subtle geometric background texture */}
        <motion.div 
          animate={{ backgroundPosition: ["0px 0px", "60px 60px"] }}
          transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
          className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center bg-[linear-gradient(45deg,#132836_25%,transparent_25%,transparent_75%,#132836_75%,#132836),linear-gradient(45deg,#132836_25%,transparent_25%,transparent_75%,#132836_75%,#132836)] bg-[length:60px_60px]"
        />
        
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="w-full md:w-1/2">
            <h2 className="text-xl md:text-2xl font-bold mb-4 tracking-tight text-[#FF6F4A] h-[32px] flex items-center">
              <Typewriter 
                text="Hi, I'm Adamu Abu" 
                delay={50} 
                cursorClassName="w-[4px] h-[24px] md:h-[28px] mb-0"
                hideCursorOnComplete={true}
              />
            </h2>
            
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-display uppercase leading-[0.85] tracking-tighter mb-8 text-white h-[180px] md:h-[220px]">
              <Typewriter 
                text={"FRONTEND\nDEVELOPER"} 
                delay={80} 
                startDelay={1000}
              />
            </h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="text-white/70 text-lg mb-10 max-w-md font-light leading-relaxed"
            >
              I am a developer based in Lagos, specializing in creating dynamic, responsive, and visually appealing websites. I focus on delivering seamless functionality and engaging user experiences.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.7 }}
              className="flex flex-wrap items-center gap-4"
            >
              <a href="/assets/Frontend-developer.pdf" className="inline-flex items-center gap-3 bg-[#FF6F4A] text-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform duration-300">
                Download CV
                <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                  <Download size={14} strokeWidth={3} />
                </motion.div>
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 border border-white/30 text-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-[#1A3649] transition-colors duration-300">
                Contact Me
              </a>
            </motion.div>
          </div>
          
          <div className="w-full md:w-1/2 flex justify-center lg:justify-end perspective-1000">
             {/* Profile Image */}
             <motion.div 
               style={{ y: yHeroDeco }}
               initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
               animate={{ opacity: 1, scale: 1, rotate: 0 }}
               transition={{ duration: 1.5, delay: 0.5, type: "spring", bounce: 0.4 }}
               className="relative w-full max-w-lg lg:max-w-xl aspect-square"
             >
               <div className="absolute inset-4 border-2 border-[#FF6F4A] rounded-2xl transform translate-x-4 translate-y-4"></div>
               <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-10 bg-[#112431]">
                 <Image 
                   src="/photo1.png" 
                   alt="Adamu Abu" 
                   fill
                   className="object-cover"
                   priority
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#1A3649]/80 via-transparent to-transparent"></div>
               </div>
             </motion.div>
          </div>
        </div>
      </header>

      {/* Bento Grid Layout - Experience & Stats */}
      <section id="services" className="w-full max-w-[1600px] mx-auto p-2 sm:p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
          
          {/* Left Block - Experience Area */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-1 lg:row-span-2 bg-[#EBEBEB] p-10 md:p-14 flex flex-col justify-center overflow-hidden group"
          >
            <div className="mb-12 relative z-10">
              <h3 className="text-sm font-bold uppercase tracking-widest text-[#FF6F4A] mb-2">Why Choose Me</h3>
              <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tighter leading-none group-hover:scale-105 transition-transform transform origin-left text-[#1A3649]">Experience Area</h2>
            </div>
            
            <div className="space-y-5 w-full relative z-10">
              {[
                { name: 'Web Development', val: 96 },
                { name: 'Software Developer', val: 90 },
                { name: 'HTML / CSS', val: 98 },
                { name: 'React / Next.js', val: 95 },
                { name: 'Tailwind CSS', val: 95 },
                { name: 'Responsive UI', val: 95 },
                { name: 'JavaScript / TypeScript', val: 90 },
                { name: 'Web Design', val: 85 }
              ].map((skill, idx) => (
                <div key={skill.name}>
                  <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider mb-3 text-[#1A3649]">
                    <span>{skill.name}</span>
                    <span>{skill.val}%</span>
                  </div>
                  <div className="w-full h-1 bg-[#DDDDDD] overflow-hidden">
                    <motion.div 
                      initial={{ x: "-100%" }}
                      whileInView={{ x: `${skill.val - 100}%` }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 1.5, delay: 0.2 + (idx * 0.1), ease: "easeOut" }}
                      className="w-full h-full bg-[#1A3649]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Top Right Block - Stats (Coral) */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 bg-[#FF6F4A] text-white p-10 md:p-14 flex flex-col justify-center min-h-[400px] hover:bg-[#e8603d] transition-colors"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 w-full h-full">
              <motion.div whileHover={{ scale: 1.1 }} className="flex flex-col justify-center transform origin-left">
                <div className="text-6xl md:text-8xl font-display font-black tracking-tighter mb-4">
                  <Counter to={3} duration={1.5} />+
                </div>
                <div className="text-xs font-bold uppercase tracking-widest text-white/80">Years Job<br/>Experience</div>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} className="flex flex-col justify-center transform origin-left">
                <div className="text-6xl md:text-8xl font-display font-black tracking-tighter mb-4">
                  <Counter to={10} duration={2} />+
                </div>
                <div className="text-xs font-bold uppercase tracking-widest text-white/80">Projects<br/>Completed</div>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} className="flex flex-col justify-center transform origin-left">
                <div className="text-6xl md:text-8xl font-display font-black tracking-tighter mb-4">
                  <Counter to={24} duration={2} />/7
                </div>
                <div className="text-xs font-bold uppercase tracking-widest text-white/80">Online<br/>Support</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Bottom Right Block - Skills List */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2 bg-white p-10 md:p-14 flex flex-col md:flex-row items-center justify-between min-h-[400px] border border-[#EEEEEE]"
          >
            <div className="md:w-1/3 mb-10 md:mb-0">
              <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tighter leading-none mb-4 text-[#1A3649]">Tech<br/>Stack</h2>
              <p className="text-xs font-bold uppercase tracking-widest text-[#FF6F4A]">Tools of the trade</p>
            </div>
            
            <div className="md:w-2/3 flex flex-wrap gap-4 justify-start md:justify-end">
              {['Next.js', 'React.js', 'JavaScript', 'Tailwind CSS', 'Shadcn UI', 'Git Version Control', 'UI/UX'].map((tech, idx) => (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.3 }}
                  key={tech} 
                  className="flex items-center gap-2 border border-[#E5E5E5] px-6 py-3 bg-[#F9F9F9] hover:bg-[#1A3649] hover:text-white hover:border-[#1A3649] transition-colors cursor-default shadow-sm hover:shadow-xl text-[#1A3649]"
                >
                  <CheckCircle2 size={16} />
                  <span className="text-[11px] font-bold uppercase tracking-wider">{tech}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="projects" className="py-24 md:py-32 w-full overflow-hidden bg-[#F5F5F5] min-h-[80vh]">
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-[1600px] mx-auto px-6 md:px-10 mb-16 flex flex-col items-center text-center gap-4"
        >
          <h3 className="text-sm font-bold uppercase tracking-widest text-[#FF6F4A]">Portfolio</h3>
          <h2 className="text-5xl md:text-7xl font-display font-black uppercase tracking-tighter leading-none text-[#1A3649]">
            My Amazing Works
          </h2>
          <p className="text-[#1A3649]/60 max-w-lg mt-4 font-light">Click the folder below to unlock and explore my recent projects.</p>
        </motion.div>
        
        <div className="w-full max-w-7xl mx-auto px-6 md:px-10 flex flex-col items-center">
          {/* The Folder UI */}
          <motion.div 
            onClick={() => setIsFolderOpen(!isFolderOpen)}
            className="cursor-pointer relative w-64 h-48 md:w-80 md:h-60 group z-20"
            style={{ perspective: 1200 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Back of folder */}
            <div className="absolute inset-0 bg-[#1A3649] rounded-lg shadow-2xl border border-[#1A3649]/80 rounded-tl-none">
              {/* Folder tab */}
              <div className="absolute -top-6 left-0 w-32 h-6 bg-[#1A3649] rounded-t-lg"></div>
            </div>
            
            {/* Folder contents peeking */}
            <motion.div 
              animate={{ y: isFolderOpen ? -60 : -10, opacity: isFolderOpen ? 1 : 0.2 }}
              className="absolute left-4 right-4 top-4 bottom-4 bg-white rounded shadow-inner border border-gray-200 flex flex-col gap-3 p-6"
            >
               <div className="h-3 w-full bg-[#E5E5E5] rounded"></div>
               <div className="h-3 w-3/4 bg-[#E5E5E5] rounded"></div>
               <div className="h-3 w-5/6 bg-[#E5E5E5] rounded"></div>
               <div className="h-3 w-1/2 bg-[#FF6F4A]/20 rounded mt-auto"></div>
            </motion.div>
            
            {/* Front of folder */}
            <motion.div 
              animate={{ rotateX: isFolderOpen ? -60 : 0 }}
              style={{ transformOrigin: "bottom" }}
              className="absolute inset-0 bg-[#FF6F4A] rounded-lg shadow-2xl flex items-center justify-center border-t border-white/20 z-10"
            >
               <div className="text-white flex flex-col items-center gap-2">
                 <Folder size={48} strokeWidth={1.5} className={isFolderOpen ? "opacity-50" : "opacity-100"} />
                 <span className="font-display font-bold text-xl tracking-widest uppercase">
                   {isFolderOpen ? "Close" : "My Project"}
                 </span>
               </div>
            </motion.div>
          </motion.div>

          {/* The Files (Projects) */}
          <AnimatePresence>
            {isFolderOpen && (
              <motion.div 
                initial={{ opacity: 0, height: 0, y: -50 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -50 }}
                transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
                className="w-full mt-24 flex gap-6 md:gap-8 p-4 overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth pb-16 rounded-xl border border-transparent"
              >
                {[
                  {
                    title: "SMATPAY WEB APP",
                    desc: "A fintech App which allow users to buy Data, airtime, TV subscription, pay bills online.",
                    stack: "React.js, JavaScript, Tailwind CSS"
                  },
                  {
                    title: "AI-POWERED TRACKER",
                    desc: "Track workouts, analyze form, and optimize gains using state-of-the-art artificial intelligence.",
                    stack: "Nextjs, JavaScript, Tailwind CSS"
                  },
                  {
                    title: "APRILFULL",
                    desc: "Africa's Premier WEB3 entertainment event where innovation meets creativity.",
                    stack: "React.js, Tailwind CSS"
                  },
                  {
                    title: "AUTOBID PLATFORM",
                    desc: "Automotive auction live bidding platform with real-time updates.",
                    stack: "Next JS, Tailwind CSS"
                  },
                  {
                    title: "LEOTEK SOLUTIONS",
                    desc: "Cloudbase call center solutions and value added services.",
                    stack: "Next JS, Tailwind CSS"
                  },
                  {
                    title: "HEXACORE BANKING",
                    desc: "Streamlined Solutions for Modern Banking. Empower workforce and enhance efficiency.",
                    stack: "Next JS, Tailwind CSS"
                  }
                ].map((project, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.3, x: idx % 2 === 0 ? -100 : 100, rotate: idx % 2 === 0 ? -25 : 25 }}
                    animate={{ opacity: 1, scale: 1, x: 0, rotate: 0 }}
                    whileHover={{ scale: 1.02, y: -5, zIndex: 30 }}
                    exit={{ opacity: 0, scale: 0.3, x: idx % 2 === 0 ? -100 : 100, rotate: 0 }}
                    transition={{ delay: idx * 0.1, type: "spring", stiffness: 120, damping: 14 }}
                    key={idx}
                    className="min-w-[85vw] md:min-w-[400px] lg:min-w-[450px] snap-center shrink-0 bg-white p-8 rounded-xl border border-[#E5E5E5] shadow-[0_10px_30px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)] transition-shadow group relative overflow-hidden flex flex-col h-full origin-center"
                  >
                    {/* File icon / header */}
                    <div className="flex justify-between items-start mb-8">
                       <div className="w-12 h-12 bg-[#F5F5F5] rounded-lg flex items-center justify-center text-[#1A3649] group-hover:bg-[#FF6F4A] group-hover:text-white transition-colors">
                         <FileCode2 size={24} />
                       </div>
                       <div className="text-[9px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full bg-[#1A3649]/5 text-[#1A3649]">
                         {project.stack.split(',')[0]}
                       </div>
                    </div>
                    
                    <h3 className="text-3xl font-display font-black uppercase tracking-tight leading-[1] mb-4 text-[#1A3649]">{project.title}</h3>
                    <p className="text-sm text-[#1A3649]/60 mb-8 flex-grow font-light">{project.desc}</p>
                    
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF6F4A] mb-6">
                      {project.stack}
                    </div>
                    
                    <button className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#1A3649] group-hover:text-[#FF6F4A] transition-colors duration-300">
                      Open File
                      <ChevronRight size={16} className="group-hover:translate-x-2 transition-transform" />
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Contact Section */}
      <footer id="contact" className="w-full bg-[#1A3649] text-white py-24 md:py-32 px-6 md:px-10 relative overflow-hidden">
        {/* Animated background elements */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          className="absolute -right-64 -bottom-64 w-[800px] h-[800px] rounded-full bg-[#FF6F4A] blur-3xl pointer-events-none" 
        />

        <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold uppercase tracking-widest text-[#FF6F4A] mb-6"
          >
            Let's Work Together
          </motion.h3>
          
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring" }}
            className="text-6xl md:text-8xl lg:text-[8rem] font-display font-black uppercase tracking-tighter leading-[0.85] mb-12 hover:tracking-normal transition-all duration-700"
          >
            Hire Me<br/>
            <span className="text-white/50">For The Next Projects.</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-white/70 text-lg mb-16 max-w-md font-light"
          >
            Reach out and let's bring your ideas to life.
          </motion.p>
          
          {/* Contact Form */}
          <motion.form 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="w-full max-w-2xl mx-auto mb-20 flex flex-col gap-6 text-left"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#FF6F4A]">Name</label>
                <input type="text" placeholder="John Doe" className="bg-white/5 border border-white/10 px-6 py-4 text-white focus:outline-none focus:border-[#FF6F4A] transition-colors rounded-none" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#FF6F4A]">Email</label>
                <input type="email" placeholder="john@example.com" className="bg-white/5 border border-white/10 px-6 py-4 text-white focus:outline-none focus:border-[#FF6F4A] transition-colors rounded-none" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#FF6F4A]">Message</label>
              <textarea rows={4} placeholder="Tell me about your project..." className="bg-white/5 border border-white/10 px-6 py-4 text-white focus:outline-none focus:border-[#FF6F4A] transition-colors resize-none rounded-none"></textarea>
            </div>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-4 bg-[#FF6F4A] text-white px-12 py-5 text-sm font-bold uppercase tracking-widest hover:bg-[#e8603d] transition-colors shadow-[0_0_40px_rgba(255,111,74,0.3)] self-center"
              type="button"
            >
              Send Message
            </motion.button>
          </motion.form>
          
          {/* Huge Animated Text Marquee */}
          <div className="w-full overflow-hidden flex whitespace-nowrap mb-8 select-none border-y border-white/5 py-4 w-[100vw] relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
             <motion.div
               animate={{ x: ["0%", "-50%"] }}
               transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
               className="flex whitespace-nowrap text-[6rem] md:text-[10rem] lg:text-[14rem] leading-none font-display font-black tracking-tighter text-white/5 hover:text-[#FF6F4A]/20 transition-colors duration-500 cursor-default"
             >
               <span className="pr-12">ADAMU.DEV</span>
               <span className="pr-12">ADAMU.DEV</span>
               <span className="pr-12">ADAMU.DEV</span>
               <span className="pr-12">ADAMU.DEV</span>
             </motion.div>
          </div>

          <div className="w-full flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-wider text-white/50">
            <div>© {new Date().getFullYear()} Adamu Abu. All rights reserved</div>
            <div className="flex space-x-8">
              <a href="#" className="hover:text-[#FF6F4A] transition-colors hover:-translate-y-1 transform inline-block">GitHub</a>
              <a href="#" className="hover:text-[#FF6F4A] transition-colors hover:-translate-y-1 transform inline-block">LinkedIn</a>
              <a href="#" className="hover:text-[#FF6F4A] transition-colors hover:-translate-y-1 transform inline-block">Twitter</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
