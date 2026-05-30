import React from 'react';
import { Search, Plus, UtensilsCrossed } from 'lucide-react';

interface HeaderProps {
  search: string;
  onSearchChange: (v: string) => void;
  onAdd: () => void;
  totalCount: number;
}

const Header: React.FC<HeaderProps> = ({ search, onSearchChange, onAdd, totalCount }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-stone-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
        {/* Top row */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500 shadow-md shadow-amber-200">
              <UtensilsCrossed className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-black text-stone-800 tracking-tight leading-none">
                Resto<span className="text-amber-500">Hub</span>
              </h1>
              <p className="text-xs text-stone-400 font-medium">
                {totalCount} restaurant{totalCount !== 1 ? 's' : ''}
              </p>
            </div>
          </div>

          <button
            onClick={onAdd}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold transition-all shadow-md shadow-amber-200 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Restaurant</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by name, address, or contact…"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-stone-200 focus:border-amber-400 outline-none text-sm text-stone-700 placeholder-stone-300 bg-stone-50 focus:bg-white transition-all"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;