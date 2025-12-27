
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { LeftSidebar } from '../components/LeftSidebar';
import { RightSidebar } from '../components/RightSidebar';
import { api } from '../lib/api';
import { queryKeys } from '../lib/query';
import { Button } from '../components/ui/Button';

const ProjectsPage: React.FC = () => {
  const { data: projects = [], isLoading } = useQuery({
    queryKey: queryKeys.projects,
    queryFn: api.projects.list,
    initialData: [
      { id: '1', name: 'Global Brand Refresh', client: 'Acme Corp', createdAt: '2023-11-01', updatedAt: '2023-11-05', stages: [] },
      { id: '2', name: 'Web3 Onboarding Flow', client: 'CryptoPay', createdAt: '2023-11-02', updatedAt: '2023-11-06', stages: [] },
      { id: '3', name: 'Smart Logistics AI', client: 'FastShip', createdAt: '2023-11-03', updatedAt: '2023-11-07', stages: [] }
    ]
  });

  const { data: health = [] } = useQuery({
    queryKey: queryKeys.health,
    queryFn: api.health.check,
    initialData: [
      { provider: 'Gemini', status: 'online', latency: 120, errorRate: 0.1 },
      { provider: 'Claude', status: 'online', latency: 240, errorRate: 0.5 },
      { provider: 'OpenAI', status: 'degraded', latency: 850, errorRate: 2.1 },
      { provider: 'Perplexity', status: 'online', latency: 310, errorRate: 0.0 }
    ]
  });

  return (
    <div className="flex h-full w-full bg-background overflow-hidden">
      <LeftSidebar projects={projects} isLoading={isLoading} />
      
      <main className="flex-1 flex flex-col items-center justify-center p-12 text-center bg-[#0C0D0F]">
        <div className="max-w-xl space-y-8 animate-in fade-in zoom-in-95 duration-700">
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-primary blur-3xl opacity-20" />
              <div className="relative w-24 h-24 bg-surface border border-primary/30 rounded-3xl rotate-12 flex items-center justify-center shadow-2xl">
                <span className="text-4xl font-black text-primary -rotate-12">ISI</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-4xl font-bold tracking-tight text-white">Intelligent Strategy Interface</h2>
            <p className="text-slate-400 leading-relaxed">
              Welcome back to the Command Center. Select a project from the sidebar to begin strategy formulation, estimations, and asset generation.
            </p>
          </div>

          <div className="flex items-center justify-center gap-4">
            <Button size="lg" className="px-10">New Strategy Session</Button>
            <Button variant="outline" size="lg" className="px-10">View Global Reports</Button>
          </div>

          <div className="grid grid-cols-3 gap-6 pt-12">
            {[
              { label: 'Active Projects', value: '12' },
              { label: 'Pending Reviews', value: '4' },
              { label: 'Avg Latency', value: '210ms' }
            ].map(stat => (
              <div key={stat.label} className="p-4 rounded-2xl bg-surface border border-border">
                <div className="text-2xl font-bold text-primary">{stat.value}</div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <RightSidebar health={health} usage={null} />
    </div>
  );
};

export default ProjectsPage;
