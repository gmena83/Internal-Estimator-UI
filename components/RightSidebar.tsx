
import React from 'react';
import { ApiHealth, ProjectUsage } from '../types';
import { Badge } from './ui/Badge';

interface RightSidebarProps {
  health: ApiHealth[];
  usage: ProjectUsage | null;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({ health, usage }) => {
  return (
    <div className="w-72 border-l border-border bg-surface h-full flex flex-col overflow-y-auto">
      <div className="p-6 border-b border-border">
        <h3 className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-4">API Health</h3>
        <div className="space-y-4">
          {health.map((api) => (
            <div key={api.provider} className="flex items-center justify-between p-3 rounded-lg bg-background border border-border">
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-bold text-slate-200">{api.provider}</span>
                <span className="text-[10px] text-slate-500">{api.latency}ms latency</span>
              </div>
              <div className="flex flex-col items-end gap-1">
                <Badge variant={api.status === 'online' ? 'success' : 'warning'} className="scale-75 origin-right">
                  {api.status.toUpperCase()}
                </Badge>
                <span className="text-[9px] text-red-400/80">{api.errorRate}% err</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {usage && (
        <div className="p-6 border-b border-border">
          <h3 className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-4">Project Usage</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-bold">
                <span className="text-slate-400">TOKEN CONSUMPTION</span>
                <span className="text-primary">{usage.tokens.toLocaleString()}</span>
              </div>
              <div className="h-1.5 w-full bg-background rounded-full overflow-hidden border border-border">
                <div 
                  className="h-full bg-primary" 
                  style={{ width: `${(usage.tokens / usage.limit) * 100}%` }} 
                />
              </div>
            </div>
            
            <div className="p-4 rounded-xl bg-secondary/20 border border-secondary/30">
              <span className="text-[10px] text-secondary-foreground opacity-70 block mb-1">TOTAL ESTIMATED COST</span>
              <span className="text-xl font-bold text-primary">${usage.cost.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}

      <div className="p-6">
        <h3 className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-4">System Status</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span>Database Sync: Optimal</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span>PDF Engine: Ready</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span>Vector Index: Updating</span>
          </div>
        </div>
      </div>
    </div>
  );
};
