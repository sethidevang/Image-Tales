'use client';

import { Github, Globe, Linkedin, Heart, ExternalLink } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-black text-white border-t-8 border-black py-16 px-4 md:px-8 mt-auto overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between gap-12">

        {/* Signature Branding */}
        <div className="flex flex-col space-y-6 max-w-md w-full">
          <div className="relative inline-block">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none bg-neo-accent text-black p-4 inline-block transform -rotate-1 border-4 border-white shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
              DEVANG <br /> SETHI
            </h2>
            <div className="absolute -top-4 -right-4 bg-neo-main text-black font-black px-3 py-1 text-xs md:text-sm uppercase transform rotate-12 border-2 border-black shadow-neo-sm">
              CREATOR
            </div>
          </div>

          <p className="text-xl md:text-2xl font-bold font-mono tracking-tight leading-snug">
            CRAFTING DIGITAL EXPERIENCES WITH RAW ENERGY AND AI.
          </p>

          <div className="flex items-center gap-2 text-sm font-black uppercase opacity-60">
            <Heart className="w-4 h-4 text-neo-secondary fill-neo-secondary" />
            <span>Built in 2025 for the bold.</span>
          </div>
        </div>

        {/* Links & Socials */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 w-full md:w-auto">
          <div className="flex flex-col space-y-4">
            <h3 className="text-xl font-black uppercase bg-white text-black inline-block px-3 py-1 w-fit border-2 border-neo-accent shadow-neo-sm transform rotate-1">
              CONNECT
            </h3>
            <div className="flex flex-col space-y-3 font-bold font-mono text-lg">
              <a href="https://github.com/sethidevang" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-neo-main transition-colors group">
                <Github className="w-5 h-5 group-hover:scale-125 transition-transform" />
                <span>GITHUB</span>
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100" />
              </a>
              <a href="https://devangsethi.vercel.app" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-neo-secondary transition-colors group">
                <Globe className="w-5 h-5 group-hover:scale-125 transition-transform" />
                <span>PORTFOLIO</span>
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100" />
              </a>
              <a href="https://linkedin.com/in/sethidevang" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-neo-accent transition-colors group">
                <Linkedin className="w-5 h-5 group-hover:scale-125 transition-transform" />
                <span>LINKEDIN</span>
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100" />
              </a>
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            <h3 className="text-xl font-black uppercase bg-white text-black inline-block px-3 py-1 w-fit border-2 border-neo-secondary shadow-neo-sm transform -rotate-1">
              PROJECT
            </h3>
            <div className="flex flex-col space-y-2 font-bold font-mono text-sm leading-tight opacity-70">
              <p>IMAGE TALES VERSION 2.0</p>
              <p>POWERED BY GEMINI 2.5 FLASH LITE</p>
              <p>NEO-BRUTALIST DESIGN SYSTEM</p>
              <p className="mt-4 text-xs opacity-50">© {currentYear} ALL RIGHTS RESERVED BY DEVANG SETHI.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Aesthetic Accents */}
      <div className="mt-20 border-t-4 border-zinc-800 pt-8 flex items-center justify-center opacity-30 pointer-events-none">
        <span className="text-[8vw] font-black uppercase italic tracking-tighter whitespace-nowrap overflow-hidden">
          STAY BOLD · STAY RAW
        </span>
      </div>
    </footer>
  );
}
