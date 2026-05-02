import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose, IoFlashOutline, IoShieldCheckmarkOutline, IoHeartOutline } from 'react-icons/io5';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  characterData: any;
}

// Helper to generate deterministic but dynamic-looking data based on name
const getCharacterMeta = (name: string) => {
  const nameLower = name.toLowerCase() || "";
  let house = "Ravenclaw";
  let houseColor = "bg-blue-500";
  let role = "Supporting Character";
  
  const gryffindors = ["harry", "ron", "hermione", "sirius", "hagrid", "mcgonagall", "neville", "ginny", "fred", "george"];
  const slytherins = ["draco", "voldemort", "snape", "bellatrix", "lucius", "umbridge"];
  const hufflepuffs = ["cedric"];
  
  if (gryffindors.some(n => nameLower.includes(n))) { house = "Gryffindor"; houseColor = "bg-red-500"; }
  else if (slytherins.some(n => nameLower.includes(n))) { house = "Slytherin"; houseColor = "bg-green-500"; }
  else if (hufflepuffs.some(n => nameLower.includes(n))) { house = "Hufflepuff"; houseColor = "bg-yellow-500"; }
  else if (nameLower.includes("dumbledore")) { house = "Hogwarts"; houseColor = "bg-wizard-gold"; role = "Headmaster"; }
  
  if (nameLower.includes("harry") || nameLower.includes("voldemort")) role = "Central Protagonist";
  else if (nameLower.includes("snape") || nameLower.includes("dumbledore") || nameLower.includes("hermione") || nameLower.includes("ron")) role = "Main Character";
  
  // Deterministic stats based on string length and char codes so they stay consistent
  const seed = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const power = 70 + (seed % 30);
  const loyalty = 60 + ((seed * 2) % 40);
  const empathy = 40 + ((seed * 3) % 60);

  return { house, houseColor, role, power, loyalty, empathy };
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, characterData }) => {
  const meta = characterData ? getCharacterMeta(characterData.name) : getCharacterMeta("");
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
            <h2 className="magic-text text-5xl font-bold mb-2">{characterData?.name || "Harry Potter"}</h2>
            <div className="flex items-center space-x-2 text-slate-500 text-xs font-medium uppercase tracking-widest mb-10">
              <span className={`w-2 h-2 rounded-full ${meta.houseColor}`}></span>
              <span>{meta.house} House</span>
              <span className="text-white/10">|</span>
              <span>{meta.role}</span>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-12">
              <StatBox icon={<IoFlashOutline />} label="Power" value={meta.power.toString()} color="text-yellow-400" />
              <StatBox icon={<IoShieldCheckmarkOutline />} label="Loyalty" value={meta.loyalty.toString()} color="text-green-400" />
              <StatBox icon={<IoHeartOutline />} label="Empathy" value={meta.empathy.toString()} color="text-red-400" />
            </div>

            <section className="mb-12">
              <div className="flex justify-between items-end mb-6">
                <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em]">Semantic Proximity</h4>
                <span className="text-[10px] text-slate-500 uppercase">Vector Space Dist.</span>
              </div>
              <div className="space-y-6">
                {characterData?.similar?.length > 0 ? (
                  characterData.similar.map((sim: any, idx: number) => {
                    const percentage = Math.round(sim.score * 100);
                    return (
                      <SimilarityBar 
                        key={idx} 
                        label={sim.name} 
                        value={percentage} 
                        color={idx === 0 ? "bg-wizard-gold" : "bg-wizard-gold/50"} 
                      />
                    );
                  })
                ) : (
                  <div className="text-slate-500 text-sm">No connections mapped yet.</div>
                )}
              </div>
            </section>

            <section>
              <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-6">Dialogue Sentiment</h4>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/5 relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-wizard-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="flex items-center justify-between relative z-10">
                  <div className="space-y-1">
                    <div className="text-xl font-bold text-white">{characterData?.sentiment_label || "Neutral"}</div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-widest">TextBlob Polarity</div>
                  </div>
                  <div className={`text-4xl font-light opacity-80 ${characterData?.sentiment_score < -0.05 ? "text-red-500" : "text-wizard-gold"}`}>
                    {characterData?.sentiment_score !== undefined ? characterData.sentiment_score.toFixed(2) : "0.00"}
                  </div>
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
