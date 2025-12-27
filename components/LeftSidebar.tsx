
import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { Project } from '../types';
import { Button } from './ui/Button';

interface LeftSidebarProps {
  projects: Project[];
  isLoading: boolean;
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({ projects, isLoading }) => {
  const [search, setSearch] = useState('');
  const [location, setLocation] = useLocation();

  const filtered = projects.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.client.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-64 border-r border-border bg-surface h-full flex flex-col">
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center font-bold text-background text-lg">I</div>
          <h1 className="font-bold tracking-tight text-white">ISI COMMAND</h1>
        </div>

        <Button className="w-full mb-6" size="sm">
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Project
        </Button>

        <div className="relative">
          <input 
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-background border border-border rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-primary outline-none"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-1">
        <h3 className="text-[10px] uppercase font-bold text-slate-500 px-2 mb-2">Recent Projects</h3>
        {isLoading ? (
          [1,2,3].map(i => <div key={i} className="h-10 bg-background/50 animate-pulse rounded-lg mb-1" />)
        ) : filtered.length > 0 ? (
          filtered.map(project => (
            <button
              key={project.id}
              onClick={() => setLocation(`/project/${project.id}`)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex flex-col gap-0.5 ${
                location === `/project/${project.id}` 
                  ? 'bg-primary/10 border border-primary/30 text-primary' 
                  : 'text-slate-400 hover:bg-white/5 border border-transparent hover:text-slate-200'
              }`}
            >
              <span className="font-medium truncate">{project.name}</span>
              <span className="text-[10px] opacity-60 uppercase">{project.client}</span>
            </button>
          ))
        ) : (
          <p className="text-center text-xs text-slate-600 mt-10">No projects found</p>
        )}
      </div>

      <div className="p-4 border-t border-border mt-auto">
        <div className="flex items-center gap-3 px-2 py-3">
          <div className="w-8 h-8 rounded-full bg-slate-800 border border-border" />
          <div className="flex flex-col">
            <span className="text-xs font-bold text-white">Senior Estimator</span>
            <span className="text-[10px] text-slate-500">ID: AD-9482</span>
          </div>
        </div>
      </div>
    </div>
  );
};
