import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Target, ArrowUpCircle, Loader2, Sparkles, AlertCircle, ChevronDown } from 'lucide-react';
import { getInverseSearch } from '../lib/gemini';
import { InverseSearchResult } from '../types';

export default function InverseSearchTool() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<InverseSearchResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setLoading(true);
    try {
      const result = await getInverseSearch(input);
      setData(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getCardColor = (index: number) => {
    const colors = [
      'hover:border-indigo-500 hover:shadow-indigo-500/10',
      'hover:border-purple-500 hover:shadow-purple-500/10',
      'hover:border-pink-500 hover:shadow-pink-500/10',
      'hover:border-rose-500 hover:shadow-rose-500/10',
      'hover:border-orange-500 hover:shadow-orange-500/10',
      'hover:border-amber-500 hover:shadow-amber-500/10',
      'hover:border-emerald-500 hover:shadow-emerald-500/10',
      'hover:border-teal-500 hover:shadow-teal-500/10',
    ];
    return colors[index % colors.length];
  };

  const getStepIconColor = (index: number) => {
    const colors = ['bg-indigo-500', 'bg-purple-500', 'bg-pink-500', 'bg-rose-500', 'bg-orange-500', 'bg-amber-500', 'bg-emerald-500', 'bg-teal-500'];
    return colors[index % colors.length];
  };

  return (
    <div className="p-12 max-w-5xl mx-auto space-y-12">
      {/* Header Area */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Target size={16} className="text-accent" />
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] opacity-40">Causality AI • Target Determination</span>
        </div>
        <form onSubmit={handleSubmit} className="relative group">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What destination should Causality find the path to?"
            className="w-full bg-transparent border-b-2 border-line py-6 text-3xl font-serif italic outline-none focus:border-ink transition-all placeholder:opacity-20"
          />
          <button
            disabled={loading}
            className="absolute right-0 bottom-6 p-2 rounded-full hover:bg-ink hover:text-bg transition-all disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" size={24} /> : <ArrowUpCircle size={24} />}
          </button>
        </form>
      </div>

      {/* Results Area */}
      <div className="space-y-8 pb-32">
        <AnimatePresence>
          {data && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.steps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -4 }}
                    className={`glass p-8 rounded-[32px] border border-line flex flex-col justify-between group transition-all shadow-sm hover:shadow-xl ${getCardColor(index)}`}
                  >
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className={`w-8 h-8 rounded-full text-bg flex items-center justify-center font-mono text-[10px] shadow-sm ${getStepIconColor(index)}`}>
                          T-{data.steps.length - index}
                        </div>
                        {step.difficulty === 'high' && (
                          <div className="text-amber-600 flex items-center gap-1">
                            <Sparkles size={14} />
                            <span className="text-[10px] font-bold uppercase">Pivot Point</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="text-xl font-bold tracking-tight leading-snug group-hover:text-accent transition-colors">
                          {step.action}
                        </h4>
                        <p className="text-sm opacity-60 leading-relaxed italic border-l-2 border-accent/20 pl-4">
                          {step.rationale}
                        </p>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-line flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold tracking-widest opacity-40">Requirement</span>
                      <div className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded-full ${
                        step.difficulty === 'high' ? 'bg-red-500/10 text-red-500' :
                        step.difficulty === 'medium' ? 'bg-amber-500/10 text-amber-500' :
                        'bg-emerald-500/10 text-emerald-500'
                      }`}>
                        {step.difficulty}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Present Day Indicator */}
              <div className="pt-12 flex flex-col items-center justify-center text-ink/30">
                <ChevronDown className="animate-bounce mb-2" />
                <span className="text-[11px] font-mono uppercase tracking-[0.3em]">Present Day</span>
              </div>
            </motion.div>
          )}

          {!data && !loading && (
            <div className="h-64 flex flex-col items-center justify-center text-ink/20 text-center">
              <ArrowUpCircle size={48} strokeWidth={1} className="mb-4 text-ink/10" />
              <p className="font-serif italic text-xl">The path is only visible when we walk it backward.</p>
              <p className="text-[10px] uppercase tracking-widest mt-2">Define your destination to see the way</p>
            </div>
          )}

          {loading && (
            <div className="h-64 flex flex-col items-center justify-center text-ink/40 text-center animate-pulse">
              <Loader2 className="animate-spin mb-4" size={32} />
              <p className="font-serif italic text-xl">Traversing the chain of dependencies...</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
