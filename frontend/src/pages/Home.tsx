import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GiCrystalBall, GiStarShuriken, GiBrain } from 'react-icons/gi';

const Home: React.FC = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden bg-wizard-dark">
      {/* Premium Nebula Background */}
      <div className="nebula-bg" />
      
      {/* Floating Particles Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="glow-point absolute"
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%",
              opacity: 0 
            }}
            animate={{ 
              y: [null, "-20%"],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: Math.random() * 5 + 5, 
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-10 text-center max-w-5xl"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-wizard-gold/20 bg-wizard-gold/5 text-wizard-gold text-[10px] font-bold uppercase tracking-[0.3em] mb-8">
            AI-Powered Wizarding Analytics
          </span>
        </motion.div>
        
        <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-[1.1] tracking-tight">
          <span className="text-white">Unveil the</span><br />
          <span className="magic-text">Wizarding Galaxy</span>
        </h1>
        
        <p className="text-slate-400 text-lg md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed font-light">
          A high-dimensional journey through character relationships, 
          mapped by <span className="text-white font-medium">NLP neural networks</span> and visualized in a living 3D star-field.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link to="/explorer">
            <button className="btn-primary flex items-center group">
              Explore the Galaxy
              <GiStarShuriken className="ml-2 group-hover:rotate-180 transition-transform duration-700" />
            </button>
          </Link>
          <Link to="/about">
            <button className="btn-secondary group">
              View Methodology
              <span className="block h-0.5 w-0 group-hover:w-full bg-white/30 transition-all duration-300"></span>
            </button>
          </Link>
        </div>
      </motion.div>

      {/* Decorative Elements */}
      <div className="mt-32 w-full max-w-7xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            title="Neural Similarity" 
            desc="Dialogue patterns converted into 1536D vectors using state-of-the-art NLP models."
            icon={<GiBrain className="text-wizard-gold" />}
            index={0}
          />
          <FeatureCard 
            title="Living Universe" 
            desc="Real-time 3D rendering of character clusters based on narrative influence."
            icon={<GiCrystalBall className="text-wizard-gold" />}
            index={1}
          />
          <FeatureCard 
            title="Trait Mapping" 
            desc="AI-driven personality identification including aggression, loyalty, and humor."
            icon={<GiStarShuriken className="text-wizard-gold" />}
            index={2}
          />
        </div>
      </div>
    </div>
  );
};

const FeatureCard: React.FC<{ title: string; desc: string; icon: React.ReactNode; index: number }> = ({ title, desc, icon, index }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.5 + (index * 0.1) }}
    className="glass-card p-8 group relative overflow-hidden"
  >
    <div className="absolute top-0 right-0 w-32 h-32 bg-wizard-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-wizard-gold/10 transition-colors"></div>
    <div className="text-4xl mb-6 transform group-hover:scale-110 transition-transform duration-500">{icon}</div>
    <h3 className="text-white font-bold text-xl mb-3 tracking-wide">{title}</h3>
    <p className="text-slate-500 text-sm leading-relaxed group-hover:text-slate-400 transition-colors">{desc}</p>
  </motion.div>
);

export default Home;
