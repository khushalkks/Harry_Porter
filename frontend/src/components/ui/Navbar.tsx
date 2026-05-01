import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GiCrystalBall } from 'react-icons/gi';

const Navbar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] px-8 py-6 flex justify-between items-center transition-all duration-500">
      <Link to="/" className="flex items-center space-x-3 group">
        <div className="relative">
          <div className="absolute inset-0 bg-wizard-gold/20 blur-lg rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <GiCrystalBall className="text-wizard-gold text-3xl relative z-10 transition-transform duration-500 group-hover:rotate-[360deg]" />
        </div>
        <span className="magic-text text-2xl font-bold tracking-[0.2em] uppercase">Galaxy</span>
      </Link>
      
      <div className="hidden md:flex items-center space-x-12 px-8 py-3 glass-card rounded-full border-white/5">
        <NavLink to="/" active={location.pathname === '/'}>Core</NavLink>
        <NavLink to="/explorer" active={location.pathname === '/explorer'}>Explorer</NavLink>
        <NavLink to="/about" active={location.pathname === '/about'}>Archive</NavLink>
      </div>

      <div className="flex items-center space-x-4">
        <button className="text-[10px] font-bold tracking-[0.2em] text-slate-500 hover:text-wizard-gold transition-colors uppercase cursor-pointer">
          V1.0.4
        </button>
        <div className="w-px h-4 bg-white/10"></div>
        <button className="px-5 py-2 text-[10px] font-bold tracking-[0.2em] text-wizard-gold border border-wizard-gold/20 rounded-full hover:bg-wizard-gold/10 transition-all uppercase">
          Connect
        </button>
      </div>
    </nav>
  );
};

const NavLink: React.FC<{ to: string; active: boolean; children: React.ReactNode }> = ({ to, active, children }) => (
  <Link 
    to={to} 
    className={`text-[10px] font-bold tracking-[0.3em] uppercase transition-all duration-300 relative group ${active ? 'text-wizard-gold' : 'text-slate-400 hover:text-white'}`}
  >
    {children}
    {active && (
      <motion.span 
        layoutId="nav-active"
        className="absolute -bottom-2 left-0 w-full h-0.5 bg-wizard-gold"
        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
      />
    )}
  </Link>
);

export default Navbar;
