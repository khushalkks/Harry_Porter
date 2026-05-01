import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose, IoFlashOutline, IoShieldCheckmarkOutline, IoHeartOutline } from 'react-icons/io5';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  characterName: string;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, characterName }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 200 }}
          className="fixed top-0 right-0 w-full md:w-[450px] h-full glass-card rounded-none border-l border-white/10 z-[110] p-10 overflow-y-auto"
        >
          <div className="flex justify-between items-center mb-12">
            <span className="text-wizard-gold text-[10px] font-bold uppercase tracking-[0.4em]">Neural Profile</span>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white"
            >
              <IoClose size={24} />
            </button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="magic-text text-5xl font-bold mb-2">{characterName || "Harry Potter"}</h2>
            <div className="flex items-center space-x-2 text-slate-500 text-xs font-medium uppercase tracking-widest mb-10">
              <span className="w-2 h-2 rounded-full bg-gryffindor"></span>
              <span>Gryffindor House</span>
              <span className="text-white/10">|</span>
              <span>Central Protagonist</span>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-12">
              <StatBox icon={<IoFlashOutline />} label="Power" value="98" color="text-yellow-400" />
              <StatBox icon={<IoShieldCheckmarkOutline />} label="Loyalty" value="100" color="text-green-400" />
              <StatBox icon={<IoHeartOutline />} label="Empathy" value="85" color="text-red-400" />
            </div>

            <section className="mb-12">
              <div className="flex justify-between items-end mb-6">
                <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em]">Semantic Proximity</h4>
                <span className="text-[10px] text-slate-500 uppercase">Vector Space Dist.</span>
              </div>
              <div className="space-y-6">
                <SimilarityBar label="Hermione Granger" value={94} color="bg-wizard-gold" />
                <SimilarityBar label="Ron Weasley" value={91} color="bg-wizard-gold" />
                <SimilarityBar label="Albus Dumbledore" value={76} color="bg-wizard-gold/50" />
              </div>
            </section>

            <section>
              <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-6">Dialogue Sentiment</h4>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/5 relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-wizard-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="flex items-center justify-between relative z-10">
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-white">Aggressive</div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-widest">Dominant Tone</div>
                  </div>
                  <div className="text-4xl font-light text-wizard-gold opacity-50">8.4</div>
                </div>
              </div>
            </section>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const StatBox: React.FC<{ icon: React.ReactNode, label: string, value: string, color: string }> = ({ icon, label, value, color }) => (
  <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-center group hover:bg-white/10 transition-colors">
    <div className={`text-xl mb-2 flex justify-center ${color}`}>{icon}</div>
    <div className="text-lg font-bold text-white mb-0.5">{value}</div>
    <div className="text-[8px] text-slate-500 uppercase tracking-widest font-bold">{label}</div>
  </div>
);

const SimilarityBar: React.FC<{ label: string, value: number, color: string }> = ({ label, value, color }) => (
  <div className="group">
    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-2">
      <span className="text-slate-400 group-hover:text-white transition-colors">{label}</span>
      <span className="text-wizard-gold">{value}%</span>
    </div>
    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className={`h-full ${color} shadow-[0_0_15px_rgba(212,175,55,0.3)]`}
      ></motion.div>
    </div>
  </div>
);

export default Sidebar;
