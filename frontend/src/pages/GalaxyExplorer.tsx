import React, { useState } from 'react';
import GalaxyScene from '../components/galaxy/GalaxyScene';
import Sidebar from '../components/ui/Sidebar';
import SearchBar from '../components/ui/SearchBar';
import { motion, AnimatePresence } from 'framer-motion';

const GalaxyExplorer: React.FC = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-wizard-dark">
      {/* 3D Scene */}
      <GalaxyScene onCharacterSelect={(name) => setSelectedCharacter(name)} />

      {/* UI Overlays */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-xl px-4 pointer-events-none">
        <div className="pointer-events-auto">
          <SearchBar onSearch={(q) => console.log('Search:', q)} />
        </div>
      </div>

      <Sidebar 
        isOpen={!!selectedCharacter} 
        onClose={() => setSelectedCharacter(null)}
        characterName={selectedCharacter || ""}
      />

      {/* HUD Info */}
      <div className="absolute bottom-8 left-8 glass-card p-4 pointer-events-none border-wizard-gold/20">
        <h2 className="text-wizard-gold font-bold text-sm uppercase tracking-widest mb-1">Navigation HUD</h2>
        <p className="text-slate-400 text-xs">Left Click: Rotate | Right Click: Pan | Scroll: Zoom</p>
        <div className="mt-4 flex space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-gryffindor"></div>
            <span className="text-[10px] text-slate-300">Gryffindor</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-slytherin"></div>
            <span className="text-[10px] text-slate-300">Slytherin</span>
          </div>
        </div>
      </div>

      {/* Galaxy Stats */}
      <div className="absolute top-24 right-8 text-right pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card p-6 border-white/5"
        >
          <div className="text-3xl font-bold text-white mb-1">150+</div>
          <div className="text-[10px] text-wizard-gold uppercase tracking-tighter">Nodes Analyzed</div>
          <div className="mt-4 text-xl font-bold text-white mb-1">0.89</div>
          <div className="text-[10px] text-wizard-gold uppercase tracking-tighter">Avg. Similarity</div>
        </motion.div>
      </div>
    </div>
  );
};

export default GalaxyExplorer;
