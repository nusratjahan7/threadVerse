'use client';

import Link from 'next/link';
import { FiArrowUpRight } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="w-full  text-zinc-400 border-t border-zinc-800/80 pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Footer Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 pb-16 items-start">
          
          {/* Left Column: Quick Links & Socials */}
          <div className="space-y-10">
            <div>
              <h3 className="text-[11px] font-semibold tracking-[0.25em] text-zinc-500 uppercase mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2.5 text-xs tracking-wider uppercase font-medium">
                {[
                  { name: 'Home', href: '/' },
                  { name: 'Collections', href: '/collections' },
                  { name: 'New Arrivals', href: '/new' },
                  { name: 'About Us', href: '/about' },
                ].map((item) => (
                  <li key={item.name}>
                    <Link 
                      href={item.href}
                      className="inline-flex items-center text-zinc-300 hover:text-white transition-colors duration-200 group"
                    >
                      {item.name} <span className="text-zinc-600 ml-1.5 group-hover:text-zinc-400 transition-colors">/</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-[11px] font-semibold tracking-[0.25em] text-zinc-500 uppercase mb-4">
                Social Media
              </h3>
              <div className="flex flex-col space-y-2.5 text-xs tracking-wider uppercase font-medium">
                {[
                  { name: 'Instagram', href: 'https://instagram.com' },
                  { name: 'Twitter / X', href: 'https://twitter.com' },
                  { name: 'LinkedIn', href: 'https://linkedin.com' },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center text-zinc-300 hover:text-white transition-colors duration-200 group"
                  >
                    {social.name}
                    <FiArrowUpRight className="w-3.5 h-3.5 ml-1 text-zinc-500 group-hover:text-white transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Center Column: Large Brand Header & Diamond Logo */}
          <div className="flex flex-col items-center justify-center text-center space-y-4 py-4 md:py-0">
            <p className="text-[10px] font-semibold tracking-[0.3em] text-zinc-500 uppercase">
              Spatial & Augmented Experience
            </p>
            
            {/* Geometric Diamond Logo Icon */}
            <div className="w-8 h-8 rotate-45 border-2 border-zinc-100 flex items-center justify-center overflow-hidden my-2">
              <div className="w-1/2 h-full bg-zinc-100 mr-auto" />
            </div>

            {/* Brand Title */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black  tracking-tighter text-zinc-100 uppercase leading-none select-none">
              THEARVERSE
            </h2>

            <p className="text-[11px] text-zinc-500  tracking-[0.2em] uppercase max-w-xs">
              Near-field & Digital Integration
            </p>
          </div>

          {/* Right Column: Contact Info */}
          <div className="space-y-10 md:text-right">
            <div>
              <h3 className="text-[11px] font-semibold tracking-[0.25em] text-zinc-500 uppercase mb-4">
                Contact Info
              </h3>
              <div className="space-y-2.5 text-xs tracking-wider text-zinc-300 font-medium">
                <p>
                  <a href="mailto:hello@thearverse.com" className="hover:text-white transition-colors">
                    hello@thearverse.com
                  </a>
                </p>
                <p className="text-zinc-400">
                  +1 (800) 275-8377
                </p>
                <p className="text-zinc-500 leading-relaxed md:ml-auto max-w-xs">
                  790 Madison Ave, New York <br /> NY 10021, United States
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-[11px] font-semibold tracking-[0.25em] text-zinc-500 uppercase mb-4">
                Press & Inquiries
              </h3>
              <p className="text-xs text-zinc-300 font-medium tracking-wider">
                <a href="mailto:press@thearverse.com" className="hover:text-white transition-colors">
                  press@thearverse.com
                </a>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Legal Section */}
        <div className="border-t border-zinc-900 pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] tracking-wider text-zinc-500 space-y-4 sm:space-y-0">
          <div>
            © 2026 — THEARVERSE. All rights reserved.
          </div>
          <div className="flex items-center space-x-6 uppercase font-medium">
            <Link href="/privacy" className="hover:text-zinc-300 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-zinc-300 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}