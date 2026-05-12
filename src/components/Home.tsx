import React from 'react';
import { motion } from 'motion/react';
import { Wind, Network, Search, ArrowRight } from 'lucide-react';

export default function Home({ onSelectTool }: { onSelectTool: (tool: 'causality' | 'inverse') => void }) {
  return (
    <div className="h-full flex flex-col items-center justify-center p-12 text-center relative overflow-hidden">
      {/* Decorative background elements */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 30, 0],
          opacity: [0.1, 0.3, 0.1]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 -left-20 w-96 h-96 bg-red-400 rounded-full blur-[100px]"
      />
      <motion.div 
        animate={{ 
          scale: [1.2, 1, 1.2],
          x: [0, -40, 0],
          y: [0, -20, 0],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-1/4 -right-20 w-80 h-80 bg-orange-400 rounded-full blur-[100px]"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.05, 0.15, 0.05]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/4 w-64 h-64 bg-green-400 rounded-full blur-[80px]"
      />
      <motion.div 
        animate={{ 
          scale: [1.1, 1, 1.1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 right-1/4 w-72 h-72 bg-purple-400 rounded-full blur-[90px]"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.25, 0.1]
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-0 left-1/3 w-80 h-80 bg-blue-400 rounded-full blur-[110px]"
      />

      <div className="max-w-3xl space-y-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div className="flex justify-center">
            <motion.div 
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.5 }}
              className="w-16 h-16 bg-ink rounded-full flex items-center justify-center mb-4 shadow-2xl"
            >
              <Wind className="text-bg w-8 h-8" />
            </motion.div>
          </div>
          <h1 className="text-7xl font-serif italic font-bold tracking-tight leading-tight">
            Meet <span className="text-accent underline decoration-line underline-offset-8">Causality</span>, <br />
            your strategic conscience.
          </h1>
          <p className="text-xl text-ink/60 max-w-xl mx-auto font-sans leading-relaxed">
            The AI that visualizes the unseen ripples of your decisions across decades and identifies the silent voices affected by change.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <ToolCard 
            icon={<Network className="w-8 h-8" />}
            title="Causality Maps"
            description="Visualize the multi-generational fallout of any single action."
            onClick={() => onSelectTool('causality')}
            colorClass="hover:border-red-500/50"
            iconColor="text-red-500"
          />
          <ToolCard 
            icon={<Search className="w-8 h-8" />}
            title="Inverse Search"
            description="Work backward from your goals to discover the required path."
            onClick={() => onSelectTool('inverse')}
            colorClass="hover:border-purple-500/50"
            iconColor="text-purple-500"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="pt-12 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.3em] font-mono opacity-30"
        >
          <span>Analysis System v1.0</span>
          <div className="w-1 h-1 bg-ink rounded-full" />
          <span>Real-time Inference</span>
        </motion.div>
      </div>
    </div>
  );
}

function ToolCard({ 
  icon, 
  title, 
  description, 
  onClick,
  colorClass = "hover:border-ink",
  iconColor = "text-accent"
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  onClick: () => void;
  colorClass?: string;
  iconColor?: string;
}) {
  return (
    <motion.button
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`glass p-10 rounded-[32px] text-left space-y-6 group border border-line ${colorClass} transition-all shadow-sm hover:shadow-2xl`}
    >
      <div className={`${iconColor} transition-colors opacity-80 group-hover:opacity-100`}>
        {icon}
      </div>
      <div className="space-y-2">
        <h3 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          {title}
          <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all text-accent" />
        </h3>
        <p className="text-sm opacity-50 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.button>
  );
}
