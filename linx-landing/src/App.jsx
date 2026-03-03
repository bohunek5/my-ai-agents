import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import { Shield, Github, Twitter, Linkedin, Facebook } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main>
        <Hero />
        <Features />
        <Pricing />
        <FAQ />
      </main>

      <footer className="py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 font-outfit font-bold text-xl mb-6">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span>Linx</span>
            </div>
            <p className="text-white/30 text-sm leading-relaxed mb-8">
              Protect your online world with the most advanced encryption technology available. Fast, reliable, and secure.
            </p>
            <div className="flex gap-4">
              <SocialLink Icon={Twitter} />
              <SocialLink Icon={Github} />
              <SocialLink Icon={Linkedin} />
              <SocialLink Icon={Facebook} />
            </div>
          </div>

          {[
            { title: "Product", links: ["Features", "Pricing", "Server Locations", "Download"] },
            { title: "Resources", links: ["Documentation", "Help Center", "Status", "Privacy Policy"] },
            { title: "Company", links: ["About Us", "Blog", "Careers", "Contact"] }
          ].map((col, i) => (
            <div key={i}>
              <h5 className="font-bold text-sm mb-6 uppercase tracking-widest">{col.title}</h5>
              <ul className="space-y-4">
                {col.links.map((link, j) => (
                  <li key={j}>
                    <a href="#" className="text-white/40 hover:text-primary text-sm transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/20">
          <div>© 2026 Linx VPN. All rights reserved.</div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function SocialLink({ Icon }) {
  return (
    <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-primary/20 hover:border-primary/30 transition-all group">
      <Icon className="w-5 h-5 text-white/30 group-hover:text-primary transition-colors" />
    </a>
  );
}

export default App;
