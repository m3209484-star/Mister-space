/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Network, Search, Wind, Github, Info, ChevronRight, Home as HomeIcon } from 'lucide-react';
import CausalityMapTool from './components/CausalityMapTool';
import InverseSearchTool from './components/InverseSearchTool';
import Home from './components/Home';

type Tool = 'home' | 'causality' | 'inverse';

export default function App() {
  const [activeTool, setActiveTool] = useState<Tool>('home');

  return (
    <div className="flex h-screen overflow-hidden bg-bg">
      {/* Sidebar */}
      <aside className="w-72 border-r border-line flex flex-col glass z-20">
        <div className="p-8 border-bottom border-line">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-ink rounded-full flex items-center justify-center">
              <Wind className="text-bg w-6 h-6" />
            </div>
            <h1 className="font-serif italic text-xl font-bold tracking-tight">Causality</h1>
          </div>
          <p className="text-[11px] uppercase tracking-widest opacity-50 font-mono">Impact Analysis System</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <SidebarItem 
            active={activeTool === 'home'} 
            onClick={() => setActiveTool('home')}
            icon={<HomeIcon size={18} />}
            label="Overview"
            description="System Dashboard"
            activeColor="bg-blue-600 shadow-blue-600/20"
          />
          <SidebarItem 
            active={activeTool === 'causality'} 
            onClick={() => setActiveTool('causality')}
            icon={<Network size={18} />}
            label="Causality Maps"
            description="Forecasting long-term fallout"
            activeColor="bg-red-600 shadow-red-600/20"
          />
          <SidebarItem 
            active={activeTool === 'inverse'} 
            onClick={() => setActiveTool('inverse')}
            icon={<Search size={18} />}
            label="Inverse Search"
            description="Backward path discovery"
            activeColor="bg-purple-600 shadow-purple-600/20"
          />
        </nav>

        <div className="p-8 border-t border-line space-y-4">
          <div className="flex items-center gap-4 text-ink/50 hover:text-ink transition-colors cursor-pointer">
            <Info size={16} />
            <span className="text-xs font-medium uppercase tracking-wider">Methodology</span>
          </div>
          <div className="flex items-center gap-4 text-ink/50 hover:text-ink transition-colors cursor-pointer">
            <Github size={16} />
            <span className="text-xs font-medium uppercase tracking-wider">Source</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 relative overflow-auto grid-bg">
        <AnimatePresence mode="wait">
          {activeTool === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full"
            >
              <Home onSelectTool={setActiveTool} />
            </motion.div>
          )}
          {activeTool === 'causality' && (
            <motion.div
              key="causality"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full"
            >
              <CausalityMapTool />
            </motion.div>
          )}
          {activeTool === 'inverse' && (
            <motion.div
              key="inverse"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full"
            >
              <InverseSearchTool />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function SidebarItem({ 
  active, 
  onClick, 
  icon, 
  label, 
  description,
  activeColor = 'bg-ink'
}: { 
  active: boolean; 
  onClick: () => void; 
  icon: React.ReactNode; 
  label: string; 
  description: string;
  activeColor?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-xl flex items-start gap-4 transition-all group ${
        active 
          ? `${activeColor} text-bg shadow-lg` 
          : 'hover:bg-line/5 text-ink/70 hover:text-ink'
      }`}
    >
      <div className={`mt-1 ${active ? 'text-white' : 'text-ink/40'}`}>
        {icon}
      </div>
      <div>
        <div className="font-bold text-sm tracking-tight flex items-center gap-2">
          {label}
          {active && <ChevronRight size={14} className="text-white/50" />}
        </div>
        <div className={`text-[10px] uppercase tracking-wider font-mono mt-0.5 opacity-60`}>
          {description}
        </div>
      </div>
    </button>
  );
}

