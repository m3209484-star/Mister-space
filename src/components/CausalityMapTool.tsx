import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Terminal, Loader2, Users, AlertCircle, Network } from 'lucide-react';
import { getCausalityMap } from '../lib/gemini';
import { CausalityMap } from '../types';

export default function CausalityMapTool() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<CausalityMap | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setLoading(true);
    try {
      const result = await getCausalityMap(input);
      setData(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getStepColor = (index: number) => {
    const colors = [
      'border-blue-500 text-blue-500 bg-blue-50',
      'border-emerald-500 text-emerald-500 bg-emerald-50',
      'border-amber-500 text-amber-500 bg-amber-50',
      'border-orange-500 text-orange-500 bg-orange-50',
      'border-red-500 text-red-500 bg-red-50',
      'border-purple-500 text-purple-500 bg-purple-50',
      'border-pink-500 text-pink-500 bg-pink-50',
    ];
    return colors[index % colors.length];
  };

  const getBorderColor = (index: number) => {
    const colors = ['border-blue-500', 'border-emerald-500', 'border-amber-500', 'border-orange-500', 'border-red-500', 'border-purple-500', 'border-pink-500'];
    return colors[index % colors.length];
  };

  const getTextColor = (index: number) => {
    const colors = ['text-blue-500', 'text-emerald-500', 'text-amber-500', 'text-orange-500', 'text-red-500', 'text-purple-500', 'text-pink-500'];
    return colors[index % colors.length];
  };

  const getBgColor = (index: number) => {
    const colors = ['bg-blue-500/10', 'bg-emerald-500/10', 'bg-amber-500/10', 'bg-orange-500/10', 'bg-red-500/10', 'bg-purple-500/10', 'bg-pink-500/10'];
    return colors[index % colors.length];
  };

  return (
    <div className="p-12 max-w-5xl mx-auto space-y-12">
      {/* Header Area */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Terminal size={16} className="text-accent" />
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] opacity-40">Causality AI • System Input</span>
        </div>
        <form onSubmit={handleSubmit} className="relative group">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What action should Causality analyze?"
            className="w-full bg-transparent border-b-2 border-line py-6 text-3xl font-serif italic outline-none focus:border-ink transition-all placeholder:opacity-20"
          />
          <button
            disabled={loading}
            className="absolute right-0 bottom-6 p-2 rounded-full hover:bg-ink hover:text-bg transition-all disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" size={24} /> : <Send size={24} />}
          </button>
        </form>
      </div>

      {/* Results Area */}
      <div className="relative">
        <AnimatePresence>
          {data && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-24 pb-32"
            >
              {/* Timeline Root Line */}
              <div className="absolute left-[39px] top-0 bottom-0 w-[1px] bg-line z-0" />

              {data.effects.map((effect, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative grid grid-cols-[80px_1fr] gap-12 z-10"
                >
                  {/* Timeframe Marker */}
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-mono text-[10px] font-bold ${getStepColor(index)}`}>
                      {index + 1}
                    </div>
                    <div className={`mt-4 writing-vertical-rl font-mono text-[10px] uppercase tracking-widest opacity-60 whitespace-nowrap ${getTextColor(index)}`}>
                      {effect.timeframe}
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className="space-y-6">
                    <div className="space-y-2">
                       <h3 className="text-2xl font-serif leading-tight">
                        {effect.description}
                      </h3>
                    </div>

                    {/* Silent Stakeholder Card */}
                    <motion.div 
                      whileHover={{ scale: 1.02, y: -4 }}
                      className={`glass p-6 rounded-2xl border-l-[6px] shadow-sm space-y-4 ${getBorderColor(index)}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className={`flex items-center gap-2 py-1 px-3 rounded-full ${getBgColor(index)}`}>
                          <Users size={14} className={getTextColor(index)} />
                          <span className={`text-[10px] uppercase font-bold tracking-wider ${getTextColor(index)}`}>Silent Stakeholder</span>
                        </div>
                        {effect.silentStakeholder.urgency === 'high' && (
                          <div className="flex items-center gap-1 text-red-500">
                            <AlertCircle size={14} />
                            <span className="text-[10px] font-bold uppercase">Critical Impact</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-1">
                        <h4 className="font-bold text-lg">{effect.silentStakeholder.name}</h4>
                        <p className="text-sm opacity-70 leading-relaxed">
                          {effect.silentStakeholder.impact}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {!data && !loading && (
            <div className="h-64 flex flex-col items-center justify-center text-ink/20 text-center">
              <Network size={48} strokeWidth={1} className="mb-4" />
              <p className="font-serif italic text-xl">The future is a map waiting to be drawn by Causality.</p>
              <p className="text-[10px] uppercase tracking-widest mt-2">Enter an action to visualize the fallout</p>
            </div>
          )}

          {loading && (
            <div className="h-64 flex flex-col items-center justify-center text-ink/40 text-center animate-pulse">
              <Loader2 className="animate-spin mb-4" size={32} />
              <p className="font-serif italic text-xl">Calculating cascades across time...</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
