import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Globe, Zap, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { marketIndexData, globalIndicesData, marketNewsData } from '../frontend/data';

export const DashboardMarket: React.FC = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-4">
       <div className="flex justify-between items-end">
         <div>
            <h2 className="text-2xl font-bold text-(--text-primary) tracking-wide">Market Pulse</h2>
            <p className="text-sm text-(--text-secondary) mt-1">Real-time domestic and global market intelligence.</p>
         </div>
         <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-stroke-medium bg-black/6 text-(--text-primary) text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-black/70 animate-pulse" />
            Market Open
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
           <motion.div className="ultra-glass p-4 rounded-2xl relative overflow-hidden">
              <div className="flex justify-between items-center mb-4">
                 <div>
                    <h3 className="text-base font-bold text-(--text-primary) flex items-center gap-2">
                       <TrendingUp className="text-(--text-primary)" size={16} strokeWidth={1.75} /> NIFTY 50
                    </h3>
                    <div className="flex items-baseline gap-3 mt-1">
                       <span className="text-2xl font-mono font-bold text-(--text-primary)">{Math.round(marketIndexData[19].nifty).toLocaleString('en-IN')}</span>
                       <span className="text-(--text-secondary) text-sm font-medium flex items-center">
                          <TrendingUp size={13} strokeWidth={1.75} className="mr-1" /> +142.50 (0.65%)
                       </span>
                    </div>
                 </div>
                 <div className="flex bg-black/6 rounded-md p-1 border border-stroke-subtle">
                    {['1D', '1W', '1M', '1Y'].map(t => (
                       <button key={t} className={`px-3 py-1 text-xs rounded-md ${t === '1D' ? 'bg-black/10 text-(--text-primary) font-medium shadow' : 'text-(--text-tertiary) hover:text-(--text-primary)'}`}>
                          {t}
                       </button>
                    ))}
                 </div>
              </div>

              <div className="h-64 w-full">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={marketIndexData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                       <defs>
                          <linearGradient id="colorNifty" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="var(--chart-line-primary)" stopOpacity={0.28}/>
                             <stop offset="95%" stopColor="var(--chart-line-primary)" stopOpacity={0}/>
                          </linearGradient>
                       </defs>
                       <XAxis dataKey="time" stroke="var(--chart-axis)" fontSize={10} tickLine={false} axisLine={false} />
                       <YAxis domain={['dataMin - 100', 'dataMax + 100']} hide />
                       <Tooltip 
                          contentStyle={{ backgroundColor: 'var(--chart-tooltip-bg)', borderRadius: '8px', border: '1px solid var(--chart-tooltip-border)' }}
                          itemStyle={{ fontFamily: 'var(--font-mono)', color: 'var(--chart-tooltip-text)' }}
                          formatter={(value) => [`₹${Math.round(Number(value)).toLocaleString('en-IN')}`, 'Index']}
                          labelStyle={{ color: 'var(--chart-tooltip-label)' }}
                       />
                       <Area type="monotone" dataKey="nifty" stroke="var(--chart-line-primary)" strokeWidth={2} fillOpacity={1} fill="url(#colorNifty)" />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>
           </motion.div>

           <h3 className="text-base font-bold text-(--text-primary) tracking-wide mt-2 border-b border-stroke-medium pb-2">Latest Intelligence</h3>
           <div className="space-y-3">
              {marketNewsData.map((news, idx) => (
                 <div key={idx} className="ultra-glass p-4 rounded-xl hover:bg-black/4 transition-colors cursor-pointer group flex gap-3 items-start">
                    <div className={`p-2 rounded-md shrink-0 mt-1 ${news.sentiment === 'positive' ? 'bg-black/8 text-(--text-primary)' : 'bg-black/6 text-(--text-secondary)'}`}>
                       <Zap size={14} strokeWidth={1.75} />
                    </div>
                    <div>
                       <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-(--text-secondary)">{news.source}</span>
                          <span className="text-xs text-(--text-tertiary)">{news.time}</span>
                       </div>
                       <p className="text-sm text-(--text-secondary) leading-relaxed group-hover:text-(--text-primary) transition-colors">{news.title}</p>
                    </div>
                 </div>
              ))}
           </div>
        </div>

        <div className="space-y-4">
           <div className="ultra-glass p-4 rounded-2xl">
              <h3 className="text-xs font-bold text-(--text-tertiary) uppercase tracking-widest mb-4 flex items-center gap-2">
                 <Globe size={14} strokeWidth={1.75} /> Global Markets
              </h3>
              <div className="space-y-3">
                 {globalIndicesData.map((idx, i) => (
                    <div key={i} className="flex flex-col p-3 rounded-lg bg-card-elevated border border-stroke-subtle">
                       <div className="flex justify-between items-center mb-1">
                          <span className="font-bold text-sm text-(--text-primary)">{idx.name}</span>
                          <span className={`${idx.up ? 'text-(--text-primary)' : 'text-(--text-tertiary)'} text-xs font-bold flex items-center`}>
                             {idx.up ? <ArrowUpRight size={12} strokeWidth={1.75} className="mr-0.5"/> : <ArrowDownRight size={12} strokeWidth={1.75} className="mr-0.5"/>} {idx.change}
                          </span>
                       </div>
                       <span className="font-mono text-(--text-tertiary) text-xs">{idx.value}</span>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};




