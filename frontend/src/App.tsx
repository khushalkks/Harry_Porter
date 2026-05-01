import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/ui/Navbar';
import Home from './pages/Home';
import GalaxyExplorer from './pages/GalaxyExplorer';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-[#050507] text-slate-200">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explorer" element={<GalaxyExplorer />} />
            <Route path="/about" element={<div className="pt-32 text-center text-wizard-gold font-magic text-2xl">The Chamber of Secrets has been opened... (Coming Soon)</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
