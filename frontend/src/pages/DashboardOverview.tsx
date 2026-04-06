import React from 'react';
import { useNavigate } from 'react-router-dom';
import { WealthHero } from '../components/WealthHero';
import { DebtSnowballSlider } from '../components/DebtSnowballSlider';
import { Sparkles, ArrowRight, Zap, TrendingUp, ShieldCheck, Target, ChevronRight, Activity } from 'lucide-react';
import { opportunityQueue, type OpportunityIcon } from '../frontend/data';

const iconMap: Record<OpportunityIcon, React.ComponentType<{ size?: number }>> = {
  'trending-up': TrendingUp,
  zap: Zap,
  'shield-check': ShieldCheck,
};

export const DashboardOverview: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-700 ease-out p-4 md:p-6 space-y-6">
      
      {/* 1. HERO SECTION */}
      <WealthHero />

      {/* 2. LIVE METRIC STRIP (New: High Impact, Zero Fluff) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Debt Freedom', value: 'Oct 2027', icon: Target, color: 'text-emerald-500' },
          { label: 'Interest Saved', value: '$12,402', icon: Activity, color: 'text-blue-500' },
          { label: 'Efficiency', value: '92%', icon: Zap, color: 'text-amber-500' },
          { label: 'Safety Net', value: '4.2 Months', icon: ShieldCheck, color: 'text-purple-500' },
        ].map((stat, i) => (
          <div key={i} className="ultra-glass border border-stroke-subtle p-3 rounded-xl flex items-center gap-3">
            <div className={`p-2 rounded-lg bg-black/5 ${stat.color}`}>
              <stat.icon size={16} />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-(--text-tertiary) font-bold">{stat.label}</p>
              <p className="text-sm font-bold text-(--text-primary)">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        {/* MAIN UTILITY AREA */}
        <div className="xl:col-span-8 space-y-6">
          {/* PRIMARY TOOL */}
          <div className="ultra-glass border border-stroke-subtle rounded-2xl overflow-hidden shadow-sm bg-white/50">
             <DebtSnowballSlider />
          </div>

          {/* 3. NEXT MILESTONE (New: Keeps user engaged) */}
          <div className="group relative overflow-hidden border border-stroke-subtle rounded-2xl p-5 bg-gradient-to-br from-emerald-500/5 to-transparent cursor-pointer hover:border-emerald-500/30 transition-all">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-tight text-emerald-600 mb-1">Upcoming Milestone</h4>
                <p className="text-lg font-semibold text-(--text-primary)">Pay off Chase Freedom Credit Card</p>
                <p className="text-sm text-(--text-tertiary)">$1,200 remaining • <span className="text-emerald-600 font-medium">ETA: 45 days</span></p>
              </div>
              <div className="h-12 w-12 rounded-full border-4 border-emerald-500/20 border-t-emerald-500 flex items-center justify-center text-[10px] font-bold">
                82%
              </div>
            </div>
          </div>
        </div>

        {/* 4. THE INTELLIGENCE QUEUE */}
        <aside className="xl:col-span-4 flex flex-col gap-4">
          <div className="ultra-glass border border-stroke-medium rounded-2xl p-5 flex flex-col h-fit bg-white/40">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center">
                  <Sparkles size={16} />
                </div>
                <div>
                  <h3 className="text-[12px] font-bold text-(--text-primary) uppercase tracking-tighter">Opportunities</h3>
                  <p className="text-[10px] text-(--text-tertiary) font-medium italic">AI Optimized Rank</p>
                </div>
              </div>
              <div className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-600 text-[10px] font-bold">LIVE</div>
            </div>

            <div className="space-y-2 mb-6">
              {opportunityQueue.map((action, index) => {
                const ActionIcon = iconMap[action.icon];
                return (
                <div 
                  key={index} 
                  className="group bg-white/60 hover:bg-white border border-stroke-subtle hover:border-stroke-medium rounded-xl p-3 transition-all cursor-pointer flex items-center justify-between"
                >
                  <div className="flex gap-3 items-center">
                    <div className={`p-2 rounded-lg bg-stone-100 ${action.color}`}>
                      <ActionIcon size={14} />
                    </div>
                    <div>
                      <p className="text-[12px] text-(--text-primary) font-bold leading-tight">{action.item}</p>
                      <p className="text-[10px] text-(--text-tertiary) font-mono tracking-tighter">{action.impact}</p>
                    </div>
                  </div>
                  <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-(--text-tertiary)" />
                </div>
              );})}
            </div>

            <button
              onClick={() => navigate('/dashboard/calculators')}
              className="w-full py-3.5 bg-black text-white hover:bg-zinc-800 transition-all text-[11px] font-bold rounded-xl flex items-center justify-center gap-2 group shadow-lg"
            >
              Execute All Strategies
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
            
            <p className="text-[9px] text-(--text-tertiary) text-center mt-4 font-bold tracking-widest uppercase opacity-60">
              Auto-Refresh Active
            </p>
          </div>
        </aside>

      </div>
    </div>
  );
};