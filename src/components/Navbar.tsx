import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo.js';

const navLinks = [
  { name: 'Why LeadChoose', href: '/#differentiators' },
  { name: 'How It Works', href: '/#how-it-works' },

  { name: 'Free System Demo', href: '/request-demo' },

];

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
      
      // Update active link based on scroll position
      const sections = navLinks.map(link => link.href.replace('/#', ''));
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveLink(section);
            break;
          }
        }
      }
    };

    document.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'py-3' 
          : 'py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
        {/* Desktop Navigation - All elements in one container */}
        <div className="hidden md:flex items-center justify-between space-x-2 rounded-full bg-white/90 backdrop-blur-sm px-5 py-2 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:bg-white/95 group">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center mr-6 transition-transform duration-300 hover:scale-105"
            aria-label="LeadFlow"
          >
            <div className="overflow-hidden">
              <Logo />
            </div>
          </Link>
          
          {/* Navigation Links */}
          <div className="flex space-x-1">
            {navLinks.map((link) => {
              const isActive = activeLink === link.href.replace('/#', '');
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`
                    relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full
                    ${isActive 
                      ? 'text-red-600 bg-red-50' 
                      : 'text-gray-600 hover:text-red-600 hover:bg-red-50/70'
                    }
                    hover:-translate-y-0.5 hover:shadow-sm
                  `}
                >
                  {link.name}
                  <span className={`absolute bottom-1.5 left-1/2 transform -translate-x-1/2 h-1 bg-red-500 rounded-full transition-all duration-300 ${isActive ? 'w-1/3 opacity-100' : 'w-0 opacity-0'}`}></span>
                </a>
              );
            })}
          </div>
          
          {/* CTA Button */}
          <Link
            to="/join-waitlist"
            className="
              relative overflow-hidden ml-6 px-6 py-2.5 rounded-full 
              bg-gradient-to-r from-red-500 to-rose-500 
              text-white text-sm font-medium
              transition-all duration-300
              hover:shadow-lg hover:shadow-red-500/30
              hover:-translate-y-0.5
              focus:ring-2 focus:ring-red-500 focus:ring-offset-2
              group-hover:animate-pulse
            "
          >
            <span className="relative z-10">Join Waitlist</span>
            <span className="absolute inset-0 bg-gradient-to-r from-red-600 to-rose-600 opacity-0 transition-opacity duration-300 hover:opacity-100"></span>
          </Link>
        </div>
        
        {/* Mobile view with hamburger menu */}
        <div className="flex md:hidden items-center justify-between w-full">
          <Link 
            to="/" 
            className="flex items-center transition-transform duration-300 hover:scale-105"
          >
            <Logo />
          </Link>
          
          <button
            type="button"
            className="
              inline-flex items-center justify-center p-2 rounded-md 
              text-gray-700 bg-white/80 backdrop-blur-sm
              border border-gray-100 shadow-sm
              transition-all duration-300
              hover:text-red-500 hover:bg-white
              hover:shadow-md hover:scale-105
              focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500
            "
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {!isMenuOpen ? (
              <Menu className="block h-6 w-6 transition-transform duration-300 hover:rotate-90" aria-hidden="true" />
            ) : (
              <X className="block h-6 w-6 transition-transform duration-300 hover:rotate-90" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-100 transition-all duration-300 animate-fadeDown">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="
                  block px-3 py-2 rounded-md text-base font-medium 
                  text-gray-700 hover:text-red-600 hover:bg-red-50
                  transition-all duration-300 hover:translate-x-1
                "
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <Link
              to="/join-waitlist"
              className="
                block w-full text-center mt-3 px-4 py-2 rounded-full 
                bg-gradient-to-r from-red-500 to-rose-500 
                text-white text-base font-medium
                transition-all duration-300
                hover:shadow-md hover:shadow-red-500/20
                hover:from-red-600 hover:to-rose-600
                hover:translate-y-[-2px]
              "
              onClick={() => setIsMenuOpen(false)}
            >
              Join Waitlist
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};