import React from 'react';
import { IoSearchOutline } from 'react-icons/io5';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  return (
    <div className="relative group">
      <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
        <IoSearchOutline className="text-slate-400 group-focus-within:text-wizard-gold transition-colors" size={20} />
      </div>
      <input
        type="text"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onSearch(e.currentTarget.value);
          }
        }}
        placeholder="Search the wizarding galaxy (Press Enter)..."
        className="w-full bg-white/[0.03] border border-white/10 text-white rounded-full py-5 pl-16 pr-8 focus:outline-none focus:ring-2 focus:ring-wizard-gold/20 focus:border-wizard-gold/40 transition-all backdrop-blur-2xl placeholder:text-slate-600 text-sm tracking-wide shadow-2xl"
      />
      <div className="absolute inset-y-0 right-4 flex items-center">
        <span className="text-[10px] text-slate-500 border border-slate-700 px-2 py-0.5 rounded bg-slate-900/50">⌘K</span>
      </div>
    </div>
  );
};

export default SearchBar;
