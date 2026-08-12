'use client';

import { useState } from 'react';
import Link from 'next/link';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import { AiOutlineAlignLeft } from 'react-icons/ai';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Collections', href: '/collections' },
    { name: 'New', href: '/new' },
  ];

  return (
   <div>
     <nav className="w-full  text-zinc-100 border-b border-zinc-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left: Mobile Menu Toggle & Desktop Navigation Links */}
          <div className="flex items-center space-x-8">
            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="md:hidden text-zinc-300 hover:text-white p-2 rounded-md focus:outline-none"
              aria-label="Toggle Navigation"
            >
              {isOpen ? <HiOutlineX className="w-6 h-6" /> : <HiOutlineMenu className="w-6 h-6" />}
            </button>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center space-x-8">
                <div>
                    <AiOutlineAlignLeft className='text-2xl' />
                </div>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-zinc-300 hover:text-white transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Center: Brand Logo */}
          <div className="flex-shrink-0 flex items-center justify-center">
            <Link href="/" className="flex items-center">
              {/* Diamond-style geometric icon matching the image */}
              <div className="w-6 h-6 rotate-45 border-2 border-zinc-100 flex items-center justify-center overflow-hidden">
                <div className="w-1/2 h-full bg-zinc-100 mr-auto" />
              </div>
            </Link>
          </div>

          {/* Right: Login & Register Buttons */}
          <div className="flex items-center space-x-3">
            <Link
              href="/login"
              className="text-xs sm:text-sm font-medium px-4 py-2 text-zinc-300 hover:text-white transition-colors duration-200"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="text-xs sm:text-sm font-medium px-5 py-2 rounded-full bg-zinc-100 text-zinc-950 hover:bg-zinc-200 transition-colors duration-200"
            >
              Register
            </Link>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden border-t border-zinc-800 bg-zinc-950">
          <div className="px-4 pt-3 pb-6 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block text-base font-medium text-zinc-300 hover:text-white transition-colors duration-200 py-1"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
   </div>
  );
}