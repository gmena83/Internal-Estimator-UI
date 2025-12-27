
import React from 'react';
import { ProjectStage, StageStatus } from '../types';
import { Badge } from './ui/Badge';

interface StageProgressProps {
  stages: ProjectStage[];
}

const getStatusColor = (status: StageStatus) => {
  switch (status) {
    case 'done': return 'success';
    case 'running': return 'primary';
    case 'error': return 'error';
    case 'todo': return 'default';
    default: return 'default';
  }
};

export const StageProgress: React.FC<StageProgressProps> = ({ stages }) => {
  return (
    <div className="flex items-center justify-between w-full px-6 py-4 bg-surface/50 border-b border-border">
      {stages.map((stage, idx) => (
        <React.Fragment key={stage.id}>
          <div className="flex flex-col items-center gap-2 group">
            <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
              stage.status === 'done' ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' :
              stage.status === 'running' ? 'bg-primary animate-pulse shadow-[0_0_10px_rgba(26,213,230,0.5)]' :
              stage.status === 'error' ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' :
              'bg-slate-700'
            }`} />
            <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400 group-hover:text-slate-200">
              {stage.label}
            </span>
            <Badge variant={getStatusColor(stage.status)} className="scale-75">
              {stage.status.toUpperCase()}
            </Badge>
          </div>
          {idx < stages.length - 1 && (
            <div className={`flex-1 h-[1px] mx-4 ${
              stage.status === 'done' ? 'bg-green-500/50' : 'bg-slate-800'
            }`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
